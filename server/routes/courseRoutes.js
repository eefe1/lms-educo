const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authController = require("../controllers/authController");

/**
 * App Routes
 */
router.get('/', courseController.homepage);
router.get('/paths', courseController.explorePaths);
router.get('/course/:id', courseController.exploreCourse);
router.get('/path/:id', courseController.explorePathsById);
router.post('/search', courseController.searchCourse);

router.get('/explore-latest', courseController.exploreLatest);
router.get('/submit-course', courseController.submitCourse);
router.post('/submit-course', courseController.submitCourseOnPost);

/**
 * Auth Routes
 */
router.get("/login", authController.login_get);
router.get("/login",  authController.login_get);
router.post("/login",  authController.login_post);
router.get("/signup",  authController.signup_get);
router.post("/signup",  authController.signup_post);
router.get("/logout",  authController.logout_get);

module.exports = router;