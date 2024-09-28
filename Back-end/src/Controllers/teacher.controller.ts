import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { TeacherModel } from "../Models/teacher.model";
import { teacher } from "../Types/teacher.type";

export class TeacherController{
    static async getAllTeachers(req: Request, res: Response){
        TeacherModel.getAll()
            .then(data => {
                if(Array(data).length != 0)
                    res.status(200).json(data);
                else
                    res.status(204).send("No teachers in the database");
            })
            .catch(err => {
                res.status(500).send("Error\n" + err);
            });
    }
    static async createTeacher(req: Request, res: Response) {
        const teacherInfo: teacher = {} as teacher;
        try{
            teacherInfo.Name = req.body.name; 
            teacherInfo.phoneNumber = req.body.phone_number; 
            teacherInfo.dateOfBirth = req.body.dateOfBirth; 
            teacherInfo.username = req.body.username; 
            teacherInfo.password = await bcrypt.hash(req.body.password, 10);
            teacherInfo.department = req.body.department; 
        } catch(err) {
            console.log("Error parsing the request body");
            return res.status(500).send("Internal error\nTry again later");
        }
        TeacherModel.create(teacherInfo)
            .then(state => {
                if(state){
                    return res.status(201).send("Successfully added");
                } else{
                    return res.status(409).send("Duplicate Entry");
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send("Internal error\nTry again later");
            });
    }
    static async deleteTeacher(req: Request, res: Response) {
        const username = req.params.username;
        TeacherModel.delete(username)
            .then(state => {
                if(state){
                    res.status(200).send("Deleted Successfully");
                }
                else{
                    res.status(404).send("Wrong username");
                }
            })
            .catch(err => {
                res.status(500).send("Internal error\nTry again later");
            });
    }
    static async getByUsername(req: Request, res: Response) {
        const username = req.params.username;
        TeacherModel.getByUsername(username)
            .then(data => {
                res.status(200).json(data);
            })
            .catch(err => {
                if(err === false)
                    res.status(404).send("wrong username");
                else
                    res.status(500).send("Internal error\nTry again later");
            });
    }
    static async updateTeacher(req: Request, res: Response) {
        const teacherInfo: teacher = {} as teacher;
        try{
            teacherInfo.Name = req.body.name; 
            teacherInfo.phoneNumber = req.body.phone_number; 
            teacherInfo.dateOfBirth = req.body.dateOfBirth; 
            teacherInfo.username = req.body.username; 
            teacherInfo.password = await bcrypt.hash(req.body.password, 10);
            teacherInfo.department = req.body.department; 
        } catch(err) {
            console.log("%cError parsing the request body", "color: red;");
            return res.status(500).send("Internal error\nTry again later");
        }
        TeacherModel.updateInfo(teacherInfo)
            .then(() => {
                res.status(200).send("Updated successfully");
            })
            .catch(err => {
                if(err === false)
                    res.status(404).send("Wrong data");
                else
                    res.status(500).send("Internal error\nTry again later");
            })
    }
}