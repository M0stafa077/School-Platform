import { Request, Response } from "express";
import { student } from "../Types/student.type";
import { StudentModel } from "../Models/student.model";

export const getAllStudent = async (req: Request, res: Response) => {
    try{
        let students: student[] | Error = await StudentModel.getAll();
        res.json(students);
    }
    catch(err){
        console.log('Error retrieving all students');
        throw err;
    }
};
export const getStudentById = async(req: Request, res: Response) => {
    try{
        let studentInfo: student[] = await StudentModel.getById(req.params.id);
        if(studentInfo.length == 0)
            { throw new Error(); }
        res.json(studentInfo[0]);
    }
    catch(err) {
        console.log('Error retrieving a students by an id');
        res.status(404)
            .json({ message: `No Student with ID ${req.params.id}` });
    }
};
export const updateStudentInfo = async(req: Request, res: Response) => {

};
