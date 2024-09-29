import { Router } from "express";
import GradesController from "../Controllers/grades.controller";

const gradesRoutes = Router();

gradesRoutes.get("/", GradesController.getAllStudentsGrades);
gradesRoutes.get("/:id", GradesController.getStudentGradesById);

export default gradesRoutes;
