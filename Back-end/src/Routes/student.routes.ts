import { Router, Request, Response } from "express";
import * as controllers from '../Controllers/student.controller'

const studentRoutes = Router();

studentRoutes.get('/', controllers.getAllStudent);

studentRoutes.route('/create')
    .get(controllers.getCreateView)
    .post(controllers.createNewStudent);

studentRoutes.route('/:id') 
    .get(controllers.getStudentById)
    .delete(controllers.deleteStudent)
    .put(controllers.updateStudentInfo);

studentRoutes.get('/delete-student', (req: Request, res: Response)=> {
    res.json({ message: "Delete a student" });
});    // View

export default studentRoutes;
