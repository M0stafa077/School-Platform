import { QueryError } from "mysql2";
import { dbConnection } from "../database/database";
import { teacher } from "../Types/teacher.type";

export class TeacherModel {
    static async getAll(): Promise<teacher[]|QueryError|any>{
        return new Promise(async (resolve, reject) => {
            const readQuery = `select * from teacher;`;
            try{
                await (await dbConnection).connect();
                (await dbConnection).query(readQuery)
                    .then(data => {
                        resolve(data[0]);
                    })
                    .catch(err => {
                        reject(new Error("wrong username"));
                    });
            } 
            catch(err){
                reject(err);
            }
        });
    }
    static async getByUsername(username: string): Promise<teacher|boolean>{
        return new Promise(async(resolve, reject) => {
            const readQuery = `select name, phone_number, dateOfBirth, username, password,
            department_symbol from teacher where username = ?;`;
            await (await dbConnection).connect();
            (await dbConnection).query(readQuery, [username])
                .then((result: any) => {
                    if(result[0][0])
                        resolve(result[0][0]);
                    else
                        reject(false);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    static async create(teacherInfo: teacher): Promise<boolean>{
        return new Promise(async (resolve, reject) => {
            const createQuery = `insert into teacher (name, phone_number, dateOfBirth, username, password,
            department_symbol) values (?, ?, ?, ?, ?, ?);`;
            await (await dbConnection).connect();
            (await dbConnection).query(createQuery, [
                    teacherInfo.Name, teacherInfo.phoneNumber,
                    teacherInfo.dateOfBirth, teacherInfo.username,
                    teacherInfo.password, teacherInfo.department
                ])
                    .then(result => {
                        resolve(true);
                    })
                    .catch(err => {
                        if(err.code == 'ER_DUP_ENTRY')
                            resolve(false);
                        else
                            reject(err);
                    });
        });
    }
    static async delete(username: string): Promise<boolean>{
        return new Promise(async(resolve, reject) => {
            const deleteQuery = `delete from teacher where username = ?;`;
            await (await dbConnection).connect();
            (await dbConnection).query(deleteQuery, [username])
                .then((result: any) => {
                    if(result[0].affectedRows === 0)
                        resolve(false);
                    else
                        resolve(true);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    static async updateInfo(teacherInfo: teacher): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            const updateQuery = `update teacher set name=?, phone_number=?, dateOfBirth=?, 
            password=?, department_symbol=? where username=?;`;
            await (await dbConnection).connect();
            (await dbConnection).query(updateQuery, 
                [
                    teacherInfo.Name, teacherInfo.phoneNumber, teacherInfo.dateOfBirth,
                    teacherInfo.password, teacherInfo.department, teacherInfo.username
                ])
                    .then((result: any) => {
                        if(result[0].affectedRows != 0)
                            resolve(true);
                        else
                            reject(false);
                    })
                    .catch(err => {
                        reject(err);   
                    });
        });
    }
}
