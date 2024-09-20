"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const database_1 = require("../database/database");
class StudentModel {
    static async getAll() {
        return new Promise(async (resolve, reject) => {
            const sqlGetStudents = `select * from student`;
            await database_1.dbConnection.connect();
            database_1.dbConnection.query(sqlGetStudents, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }
    static async create(studentInfo) {
        return new Promise(async (resolve, reject) => {
            const sqlCreateStudent = `insert into student (id, Nid, name, phone_number, dateOfBirth, 
            department_symbol)\
            values ('${studentInfo.id}', '${studentInfo.NID}', '${studentInfo.Name}', \
            '${studentInfo.phoneNumber}', '${studentInfo.dateOfBirth}', '${studentInfo.department}');`;
            try {
                await database_1.dbConnection.connect();
                database_1.dbConnection.query(sqlCreateStudent, (err, _res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(true);
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
            const deleteQuery = `delete from student where id=${studentId}`;
            await database_1.dbConnection.connect();
            try {
                database_1.dbConnection.query(deleteQuery, (err, _res) => {
                    if (err) {
                        reject(err);
                    }
                    if (_res.affectedRows == 0) {
                        resolve(false);
                    }
                    resolve(true);
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
                const getQueury = `select * from student where id=${id}`;
                await database_1.dbConnection.connect();
                database_1.dbConnection.query(getQueury, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    database_1.dbConnection.end();
                    resolve(res);
                });
            });
        }
        catch (err) {
            console.log('Error in student model getting a student by an id');
        }
    }
}
exports.StudentModel = StudentModel;
