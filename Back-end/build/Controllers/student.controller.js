"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStudentInfo = exports.getStudentById = exports.getAllStudent = void 0;
const student_model_1 = require("../Models/student.model");
const getAllStudent = async (req, res) => {
    try {
        let students = await student_model_1.StudentModel.getAll();
        res.json(students);
    }
    catch (err) {
        console.log('Error retrieving all students');
        throw err;
    }
};
exports.getAllStudent = getAllStudent;
const getStudentById = async (req, res) => {
    try {
        let studentInfo = await student_model_1.StudentModel.getById(req.params.id);
        if (studentInfo.length == 0) {
            throw new Error();
        }
        res.json(studentInfo[0]);
    }
    catch (err) {
        console.log('Error retrieving a students by an id');
        res.status(404)
            .json({ message: `No Student with ID ${req.params.id}` });
    }
};
exports.getStudentById = getStudentById;
const updateStudentInfo = async (req, res) => {
};
exports.updateStudentInfo = updateStudentInfo;
