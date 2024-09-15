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
            const sqlCreateStudent = `insert into student (id, Nid, name, phone_number, department_id) values ('${studentInfo.id}', '${studentInfo.NID}', '${studentInfo.Name}', '${studentInfo.phoneNumber}', '1');`;
            await database_1.dbConnection.connect();
            database_1.dbConnection.query(sqlCreateStudent, (err, _res) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
        });
    }
    static async delete(studentInfo) {
        return new Promise(async (resolve, reject) => {
            const deleteQuery = `delete from student where id=${studentInfo.id}`;
            await database_1.dbConnection.connect();
            database_1.dbConnection.query(deleteQuery, (err, _res) => {
                if (err) {
                    reject(err);
                }
                resolve(true);
            });
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
