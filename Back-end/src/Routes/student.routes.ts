import { Router } from "express";
import * as controllers from '../Controllers/student.controller'

const studentRoutes = Router();

studentRoutes.get('/', controllers.getAllStudent);
studentRoutes.route('/create')
    .get()
    /*
     */
    .post();
studentRoutes.route('/:id') 
    .get(controllers.getStudentById)
    .patch(controllers.updateStudentInfo);

studentRoutes.get('/delete')
studentRoutes.get('/delete/:id')

export default studentRoutes;
