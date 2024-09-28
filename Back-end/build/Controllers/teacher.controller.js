"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const teacher_model_1 = require("../Models/teacher.model");
class TeacherController {
    static async getAllTeachers(req, res) {
        teacher_model_1.TeacherModel.getAll()
            .then(data => {
            if (Array(data).length != 0)
                res.status(200).json(data);
            else
                res.status(204).send("No teachers in the database");
        })
            .catch(err => {
            res.status(500).send("Error\n" + err);
        });
    }
    static async createTeacher(req, res) {
        const teacherInfo = {};
        try {
            teacherInfo.Name = req.body.name;
            teacherInfo.phoneNumber = req.body.phone_number;
            teacherInfo.dateOfBirth = req.body.dateOfBirth;
            teacherInfo.username = req.body.username;
            teacherInfo.password = await bcrypt_1.default.hash(req.body.password, 10);
            teacherInfo.department = req.body.department;
        }
        catch (err) {
            console.log("Error parsing the request body");
            return res.status(500).send("Internal error\nTry again later");
        }
        teacher_model_1.TeacherModel.create(teacherInfo)
            .then(state => {
            if (state) {
                return res.status(201).send("Successfully added");
            }
            else {
                return res.status(409).send("Duplicate Entry");
            }
        })
            .catch(err => {
            console.log(err);
            return res.status(500).send("Internal error\nTry again later");
        });
    }
    static async deleteTeacher(req, res) {
        const username = req.params.username;
        teacher_model_1.TeacherModel.delete(username)
            .then(state => {
            if (state) {
                res.status(200).send("Deleted Successfully");
            }
            else {
                res.status(404).send("Wrong username");
            }
        })
            .catch(err => {
            res.status(500).send("Internal error\nTry again later");
        });
    }
    static async getByUsername(req, res) {
        const username = req.params.username;
        teacher_model_1.TeacherModel.getByUsername(username)
            .then(data => {
            res.status(200).json(data);
        })
            .catch(err => {
            if (err === false)
                res.status(404).send("wrong username");
            else
                res.status(500).send("Internal error\nTry again later");
        });
    }
    static async updateTeacher(req, res) {
        const teacherInfo = {};
        try {
            teacherInfo.Name = req.body.name;
            teacherInfo.phoneNumber = req.body.phone_number;
            teacherInfo.dateOfBirth = req.body.dateOfBirth;
            teacherInfo.username = req.body.username;
            teacherInfo.password = await bcrypt_1.default.hash(req.body.password, 10);
            teacherInfo.department = req.body.department;
        }
        catch (err) {
            console.log("%cError parsing the request body", "color: red;");
            return res.status(500).send("Internal error\nTry again later");
        }
        teacher_model_1.TeacherModel.updateInfo(teacherInfo)
            .then(() => {
            res.status(200).send("Updated successfully");
        })
            .catch(err => {
            if (err === false)
                res.status(404).send("Wrong data");
            else
                res.status(500).send("Internal error\nTry again later");
        });
    }
}
exports.TeacherController = TeacherController;
