"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRoutes = void 0;
const express_1 = require("express");
const teacher_controller_1 = require("../Controllers/teacher.controller");
exports.teacherRoutes = (0, express_1.Router)();
exports.teacherRoutes.route('/')
    .get(teacher_controller_1.TeacherController.getAllTeachers)
    .post(teacher_controller_1.TeacherController.createTeacher)
    .put(teacher_controller_1.TeacherController.updateTeacher);
exports.teacherRoutes.route("/:username")
    .get(teacher_controller_1.TeacherController.getByUsername)
    .delete(teacher_controller_1.TeacherController.deleteTeacher);
