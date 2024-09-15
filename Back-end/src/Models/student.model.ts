import { QueryError } from 'mysql2';
import { dbConnection } from '../database/database';
import { student } from '../Types/student.type';

export class StudentModel
{
    static async getAll(): Promise<Error | student[]>
    {
        return new Promise(async (resolve, reject) => {
            const sqlGetStudents = `select * from student`;
            await dbConnection.connect();
            dbConnection.query(sqlGetStudents, (err: QueryError | any, res: Array<student>) => {
                if(err){
                    reject(err);
                }
                // dbConnection.end();
                resolve(res);
            });
        });
    }
    static async create(studentInfo: student): Promise<boolean|Error>
    {
        return new Promise(async (resolve, reject) => {
            const sqlCreateStudent = `insert into student (id, Nid, name, phone_number, department_id) values ('${studentInfo.id}', '${studentInfo.NID}', '${studentInfo.Name}', '${studentInfo.phoneNumber}', '1');`;
            await dbConnection.connect();
            dbConnection.query(sqlCreateStudent, (err, _res) => {
                if(err){
                    reject(err);
                }
                // dbConnection.end();
                resolve(true);
            });
        });
    }
    static async delete(studentInfo: student): Promise<boolean|Error>{
        return new Promise(async (resolve, reject) => {
            const deleteQuery = `delete from student where id=${studentInfo.id}`;
            await dbConnection.connect();
            dbConnection.query(deleteQuery, (err, _res) => {
                if (err){
                    reject(err);
                }
                // dbConnection.end();
                resolve(true);
            });
        });
    }
    static async getById(id: string): Promise<student[] | QueryError | any>
    {
        try
        {
            return new Promise(async (resolve, reject) => {
                const getQueury = `select * from student where id=${id}`;
                await dbConnection.connect();
                dbConnection.query(getQueury, (err: QueryError | any, res: student[]) => {
                    if(err){
                        reject(err);
                    }   
                    // dbConnection.end();
                    resolve(res);
                })
            });
        } catch(err){
            console.log('Error in student model getting a student by an id');            
        }
    }
}
