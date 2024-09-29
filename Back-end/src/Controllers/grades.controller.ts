import { Request, Response } from "express";
import GradesModel from "../Models/grades.model";

type Grade = {
    studentId: string;
    studentName: string;
    grades: Array<{
        subject: string;
        grade: string;
        teacher: string;
        teacherContact: string;
    }>;
};
function formatGradeDetails(oldObject: any) {
    return {
        subject: oldObject.subject,
        grade: oldObject.grade,
        teacher: oldObject.teacherName,
        teacherContact: oldObject.teacherContactInfo,
    };
}
function createStudentGradeObject(studentGrades: any): Grade {
    return {
        studentId: studentGrades.studentId,
        studentName: studentGrades.studentName,
        grades: [formatGradeDetails(studentGrades)],
    } as Grade;
}
async function organizeStudentGrades(
    oldFormattedData: any
): Promise<Grade | any> {
    let studentsIds: Array<string> = [];
    let returnArray: Array<Grade> = [];
    return new Promise(async (resolve, reject) => {
        for (let i in oldFormattedData) {
            const currentStudent = returnArray.find(
                (student) => student.studentId === oldFormattedData[i].studentId
            );
            if (currentStudent) {
                currentStudent.grades.push(
                    formatGradeDetails(oldFormattedData[i])
                );
            } else {
                studentsIds.push(oldFormattedData[i].studentId);
                returnArray.push(createStudentGradeObject(oldFormattedData[i]));
            }
        }
        resolve(returnArray);
    });
}
export default class GradesController {
    static async getAllStudentsGrades(req: Request, res: Response) {
        GradesModel.getAllGrades()
            .then(async (data) => {
                res.status(200).json(await organizeStudentGrades(data));
            })
            .catch((err) => {
                console.log(err.errCode);
                res.status(500).send("Internal error\nTry again later");
            });
    }
    static async getStudentGradesById(req: Request, res: Response) {
        const studentId = req.params.id;
        const modelResult = await GradesModel.getStudentGradesById(studentId);
        if (modelResult.errCode) {
            if (modelResult.errCode === "DB_ERR") {
                res.status(404).send("Wrong Student Id");
            } else {
                res.status(500).send("Internal error\nTry again later");
            }
        } else {
            organizeStudentGrades(modelResult).then((finalData) => {
                res.status(200).json(finalData[0]);
            });
        }
    }
}
