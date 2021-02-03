const express = require("express");
const courseController = require("../controllers/courseController");
const courseValidator = require("../controllers/courseValidator");
const Course = require("../models/Course");
const router = express.Router();

//UI routes
router.get("/listCourses", courseController.listCourses);
router.get("/createCourse", courseController.createCourse);
router.get("/fetchCourse/:id", courseController.fetchCourse);

//Process
router.post("/createCourse",courseValidator.createCourseValidator, courseController.createCourseProcess);
router.put("/updateCourse/:id", courseValidator.createCourseValidator, courseController.updateCourse);
router.delete("/deleteCourse/:id", courseController.deleteCourse);

module.exports = router;