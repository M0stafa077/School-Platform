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
    let studentInfo = {} as student|any;
    studentInfo.oldId = req.params.id;
    studentInfo.id = req.body.id;
    studentInfo.NID = req.body.Nid;
    studentInfo.Name = req.body.Name;
    studentInfo.phoneNumber = req.body.phoneNumber;
    studentInfo.department = req.body.department;
    studentInfo.dateOfBirth = req.body.dateOfBirth;

    const result = await StudentModel.updateInfo(studentInfo);
    if(result === true){
        res.status(200).send("Student info is updated successfully");
    }
    else if(result === false){
        res.status(404).send("No student with this id");
    }
    else{
        res.status(500).send("Student info was not updated");
    }
};
export const createNewStudent = async(req: Request, res: Response) => {
    let studentInfo: student = {} as student;
    // console.log(req.body);
    studentInfo.id = req.body.id;
    studentInfo.NID = req.body.Nid;
    studentInfo.Name = req.body.Name;
    studentInfo.phoneNumber = req.body.phoneNumber;
    studentInfo.department = req.body.department;
    studentInfo.dateOfBirth = req.body.dateOfBirth;

    StudentModel.create(studentInfo)
        .then(result => {
            res.status(201).send("Student Registered successfully");
        })
        .catch(error => {
            if(error === false){
                res.status(409).send("Student already exists");
            }
            else{
                res.status(500).send("Error adding the student info, try again later");
            }
        });
};
export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;
        const result = await StudentModel.delete(studentId);
        // console.log(result);
        if(result === true){
            res.status(200).send("Student info was deleted");
        }else if(result === false){
            res.status(404).send("Student info does not exist");
        }else{
            res.status(500).send("Error deleting the student info, try again later!");// error occured
        }
    } catch (error) {
        res.status(500);
    }
}
