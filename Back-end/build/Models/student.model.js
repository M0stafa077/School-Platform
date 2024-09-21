"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const database_1 = require("../database/database");
class StudentModel {
    static async getAll() {
        return new Promise(async (resolve, reject) => {
            const sqlGetStudents = `select * from student`;
            await (await database_1.dbConnection).connect();
            (await database_1.dbConnection).query(sqlGetStudents)
                .then(result => {
                resolve(result[0]);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    static async create(studentInfo) {
        return new Promise(async (resolve, reject) => {
            const sqlCreateStudent = `insert into student (id, Nid, name, phone_number, dateOfBirth, 
            department_symbol)\
            values (?, ?, ?, ?, ?, ?);`;
            await (await database_1.dbConnection).connect();
            try {
                (await database_1.dbConnection).query(sqlCreateStudent, [
                    studentInfo.id,
                    studentInfo.NID,
                    studentInfo.Name,
                    studentInfo.phoneNumber,
                    studentInfo.dateOfBirth,
                    studentInfo.department
                ])
                    .then(result => {
                    resolve(true);
                })
                    .catch(error => {
                    if (error.code == 'ER_DUP_ENTRY')
                        reject(false);
                    else
                        reject(error);
                });
            }
            catch (err) {
                console.log("Error creating a new student record");
                reject(err);
            }
        });
    }
    static async delete(studentId) {
        return new Promise(async (resolve, reject) => {
            const deleteQuery = `delete from student where id=?`;
            await (await database_1.dbConnection).connect();
            try {
                (await database_1.dbConnection).query(deleteQuery, [studentId])
                    .then((result) => {
                    if (result[0].affectedRows == 0)
                        resolve(false);
                    else
                        resolve(true);
                })
                    .catch(error => {
                    console.log(error.code);
                    reject(error);
                });
            }
            catch (err) {
                console.log('Error deleting a student record\n' + err);
                reject(err);
            }
        });
    }
    static async getById(id) {
        try {
            return new Promise(async (resolve, reject) => {
                const getQueury = `select * from student where id=?`;
                try {
                    await (await database_1.dbConnection).connect();
                    (await database_1.dbConnection).query(getQueury, [id])
                        .then(result => {
                        resolve(result[0]);
                    })
                        .catch(err => {
                        reject(err);
                    });
                }
                catch (error) {
                    console.log("error connecting the the db");
                    reject(error);
                }
            });
        }
        catch (err) {
            console.log('Error in student model getting a student by an id');
        }
    }
    static async updateInfo(studentInfo) {
        return new Promise(async (resolve, reject) => {
            const updateQuery = `update student set id=?, Nid=?, name=?, phone_number=?, dateOfBirth=? \
            , department_symbol=? where id=?;`;
            try {
                await (await database_1.dbConnection).connect();
            }
            catch (err) {
                console.log("Error connecting the db");
                reject(err);
            }
            (await database_1.dbConnection).query(updateQuery, [studentInfo.id,
                studentInfo.NID,
                studentInfo.Name,
                studentInfo.phoneNumber,
                studentInfo.dateOfBirth,
                studentInfo.department,
                studentInfo.oldId
            ])
                .then((result) => {
                if (result[0].affectedRows == 0)
                    resolve(false);
                else
                    resolve(true);
            })
                .catch(err => {
                resolve(err);
            });
        });
    }
}
exports.StudentModel = StudentModel;
