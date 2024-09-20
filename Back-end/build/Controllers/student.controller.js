"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.createNewStudent = exports.getCreateView = exports.updateStudentInfo = exports.getStudentById = exports.getAllStudent = void 0;
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
const getCreateView = (req, res) => {
    res.status(200).send('Create a new student');
};
exports.getCreateView = getCreateView;
const createNewStudent = async (req, res) => {
    let studentInfo = {};
    console.log(req.body);
    studentInfo.id = req.body.id;
    studentInfo.NID = req.body.Nid;
    studentInfo.Name = req.body.Name;
    studentInfo.phoneNumber = req.body.phoneNumber;
    studentInfo.department = req.body.department;
    studentInfo.dateOfBirth = req.body.dateOfBirth;
    const result = await student_model_1.StudentModel.create(studentInfo);
    if (result) {
        res.status(201).send("Student Registered successfully");
    }
    else {
        res.status(500).send("Student was not added");
    }
};
exports.createNewStudent = createNewStudent;
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const result = await student_model_1.StudentModel.delete(studentId);
        if (result === true) {
            res.status(200).send("Student info was deleted");
        }
        else {
            res.status(404).send("Student info does not exist");
        }
    }
    catch (error) {
        res.status(500);
    }
};
exports.deleteStudent = deleteStudent;
