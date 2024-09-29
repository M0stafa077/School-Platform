"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grades_model_1 = __importDefault(require("../Models/grades.model"));
function formatGradeDetails(oldObject) {
    return {
        subject: oldObject.subject,
        grade: oldObject.grade,
        teacher: oldObject.teacherName,
        teacherContact: oldObject.teacherContactInfo,
    };
}
function createStudentGradeObject(studentGrades) {
    return {
        studentId: studentGrades.studentId,
        studentName: studentGrades.studentName,
        grades: [formatGradeDetails(studentGrades)],
    };
}
async function organizeStudentGrades(oldFormattedData) {
    let studentsIds = [];
    let returnArray = [];
    return new Promise(async (resolve, reject) => {
        for (let i in oldFormattedData) {
            const currentStudent = returnArray.find((student) => student.studentId === oldFormattedData[i].studentId);
            if (currentStudent) {
                currentStudent.grades.push(formatGradeDetails(oldFormattedData[i]));
            }
            else {
                studentsIds.push(oldFormattedData[i].studentId);
                returnArray.push(createStudentGradeObject(oldFormattedData[i]));
            }
        }
        resolve(returnArray);
    });
}
class GradesController {
    static async getAllStudentsGrades(req, res) {
        grades_model_1.default.getAllGrades()
            .then(async (data) => {
            res.status(200).json(await organizeStudentGrades(data));
        })
            .catch((err) => {
            console.log(err.errCode);
            res.status(500).send("Internal error\nTry again later");
        });
    }
    static async getStudentGradesById(req, res) {
        const studentId = req.params.id;
        const modelResult = await grades_model_1.default.getStudentGradesById(studentId);
        if (modelResult.errCode) {
            if (modelResult.errCode === "DB_ERR") {
                res.status(404).send("Wrong Student Id");
            }
            else {
                res.status(500).send("Internal error\nTry again later");
            }
        }
        else {
            organizeStudentGrades(modelResult).then((finalData) => {
                res.status(200).json(finalData[0]);
            });
        }
    }
}
exports.default = GradesController;
