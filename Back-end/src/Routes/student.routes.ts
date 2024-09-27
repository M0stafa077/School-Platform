import { Router, Request, Response } from "express";
import * as controllers from '../Controllers/student.controller'

const studentRoutes = Router();

studentRoutes.route('/')
    .get(controllers.getAllStudent)
    .post(controllers.createNewStudent);

studentRoutes.route('/:id') 
    .get(controllers.getStudentById)
    .delete(controllers.deleteStudent)
    .put(controllers.updateStudentInfo);


export default studentRoutes;
