import { QueryError, QueryResult } from 'mysql2/promise';
import { dbConnection } from '../database/database';
import { student } from '../Types/student.type';

export class StudentModel
{
    static async getAll(): Promise<Error | student[]| any>
    {
        return new Promise(async (resolve, reject) => {
            const sqlGetStudents = `select * from student`;
            await (await dbConnection).connect();
            // const students = await (await dbConnection).query(sqlGetStudents);
            // resolve(students[0]);
            (await dbConnection).query(sqlGetStudents)
                .then(result => {
                    // console.log(result);
                    resolve(result[0]);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
    static async create(studentInfo: student): Promise<boolean|Error>
    {
        return new Promise(async (resolve, reject) => {
            const sqlCreateStudent = `insert into student (id, Nid, name, phone_number, dateOfBirth, 
            department_symbol)\
            values (?, ?, ?, ?, ?, ?);`;
            await (await dbConnection).connect();
            try{
                (await dbConnection).query(sqlCreateStudent, [
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
                        // console.log(error.code);
                        if(error.code == 'ER_DUP_ENTRY')
                            reject(false);
                        else
                            reject(error);
                    });
            }catch(err){
                console.log("Error creating a new student record");
                reject(err);
            }
        });
    }
    static async delete(studentId: string): Promise<boolean|Error>{
        return new Promise(async (resolve, reject) => {
            const deleteQuery = `delete from student where id=?`;
            await (await dbConnection).connect();
            try{
                (await dbConnection).query(deleteQuery, [studentId])
                    .then((result: QueryResult|any) => {
                        // console.log(result);
                        if(result[0].affectedRows == 0)
                            resolve(false);
                        else
                            resolve(true);
                    })
                    .catch(error => {
                        console.log(error.code);
                        reject(error);
                    })
            }catch(err){
                console.log('Error deleting a student record\n' + err);
                reject(err);
            }
        });
    }
    static async getById(id: string): Promise<student[] | QueryError | any>
    {
        try
        {
            return new Promise(async (resolve, reject) => {
                const getQueury = `select * from student where id=?`;
                try{
                    await (await dbConnection).connect();
                    (await dbConnection).query(getQueury, [id])
                        .then(result => {
                            resolve(result[0]);
                        })
                        .catch(err => {
                            reject(err);
                        });
                }
                catch(error){
                    console.log("error connecting the the db");
                    reject(error);
                }
            });
        } catch(err){
            console.log('Error in student model getting a student by an id');            
        }
    }
    static async updateInfo(studentInfo: student|any): Promise<boolean|Error>{
        return new Promise(async (resolve, reject) => {
            const updateQuery = `update student set id=?, Nid=?, name=?, phone_number=?, dateOfBirth=? \
            , department_symbol=? where id=?;`;
            try{
                await (await dbConnection).connect();
            }
            catch(err){
                console.log("Error connecting the db");
                reject(err);
            }
            (await dbConnection).query(updateQuery, 
                [studentInfo.id,
                studentInfo.NID,
                studentInfo.Name,
                studentInfo.phoneNumber,
                studentInfo.dateOfBirth,
                studentInfo.department,
                studentInfo.oldId
                ])
                    .then((result: QueryResult|any) => {
                        if(result[0].affectedRows == 0)
                            resolve(false);
                        else
                            resolve(true);
                    })
                    .catch(err => {
                        // console.log(err);
                        resolve(err);
                    });
        })
    }
}
