import { Router } from "express";
import { TeacherController } from "../Controllers/teacher.controller";

export const teacherRoutes = Router();

teacherRoutes.route('/')
    .get(TeacherController.getAllTeachers)
    .post(TeacherController.createTeacher)
    .put(TeacherController.updateTeacher);

teacherRoutes.route("/:username")
    .get(TeacherController.getByUsername)
    .delete(TeacherController.deleteTeacher);
