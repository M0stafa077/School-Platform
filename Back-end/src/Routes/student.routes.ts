import { Router } from "express";
import * as controllers from '../Controllers/student.controller'

const studentRoutes = Router();

studentRoutes.get('/', controllers.getAllStudent);
studentRoutes.route('/create')
    .get(controllers.getCreateView)
    .post(controllers.createNewStudent);
studentRoutes.route('/:id') 
    .get(controllers.getStudentById)
    .patch(controllers.updateStudentInfo);

studentRoutes.get('/delete-student', (req, res)=> {
    res.json({ message: "Delete a student" });
});    // View
studentRoutes.delete('/delete-student/:id', controllers.deleteStudent);

export default studentRoutes;
