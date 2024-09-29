import { dbConnection } from "../database/database";

export default class GradesModel {
    static async getAllGrades(): Promise<Array<object>> {
        return new Promise(async (resolve, reject) => {
            const readQuery = `SELECT student.id AS studentId, student.name AS studentName, 
                subject.name AS subject, grades.grade AS grade, teacher.name AS teacherName, 
                teacher.phone_number AS "teacherContactInfo" 
                FROM student 
                INNER JOIN grades
                ON student.id = grades.student_id
                INNER JOIN subject
                ON grades.subject_id = subject.id
                INNER JOIN teacher
                ON subject.teacher_id = teacher.id;`;
            try {
                await (await dbConnection).connect();
                (await dbConnection)
                    .query(readQuery)
                    .then((result: Array<any>) => {
                        resolve(result[0]);
                    })
                    .catch((err) => {
                        reject({ err, errCode: "DB_ERR" });
                    });
            } catch (err) {
                console.log(err);
                reject({ err, errCode: "CONN_ERR" });
            }
        });
    }
    static async getStudentGradesById(studentId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const readQuery = `SELECT student.id AS studentId, student.name AS studentName, 
                subject.name AS subject, grades.grade AS grade, teacher.name AS teacherName, 
                teacher.phone_number AS "teacherContactInfo" 
                FROM student 
                INNER JOIN grades
                ON student.id = grades.student_id
                INNER JOIN subject
                ON grades.subject_id = subject.id
                INNER JOIN teacher
                ON subject.teacher_id = teacher.id
                WHERE student.id = ?;`;
            try {
                await (await dbConnection).connect();
                (await dbConnection)
                    .query(readQuery, [studentId])
                    .then((result) => {
                        resolve(result[0]);
                    })
                    .catch((err) => {
                        reject({ err, errCode: "DB_ERR" });
                    });
            } catch (err) {
                console.log(err);
                reject({ err, errCode: "CONN_ERR" });
            }
        });
    }
}
