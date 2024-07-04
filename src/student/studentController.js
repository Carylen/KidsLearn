const express = require("express");
const studentsServices = require("./studentService");
const { authUser, validation } = require("../middleware/auth");
const {
  studentLogin,
  studentRegister,
  studentProfile,
} = require("../middleware/userValidations");
const routerAsg = require("../assignment/asgController");
const routerScore = require("../score/scoreController");

const router = express.Router();

router.post("/register", studentRegister(), validation, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const regist = await studentsServices.register(name, email, password, role);
    // If ERROR
    if (regist.message) {
      res.json({ message: regist.message }).status(401);
    }
    // IF !ERROR, THEN Return User and Status(OK)
    else {
      res.send(regist).status(201);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/login", studentLogin(), validation, async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await studentsServices.login(email, password);
    // IF ERROR
    if (token.message) {
      res.json({ message: token.message });
    }
    // IF !ERROR
    else {
      res.json({ token });
    }
  } catch (error) {
    return { message: error.message };
  }
});

/** ------------------------ AFTER STUDENT LOGIN ------------------------ */

router.get("/", authUser, async (req, res) => {
  res.json({
    userId: req.user.userId,
    userName: req.user.userName,
    userEmail: req.user.userEmail,
    userScores: req.user.userScores,
  });
});

router.get("/details/:id", authUser, async (req, res) => {
  const studentId = parseInt(req.params.id);

  const student = await studentsServices.findStudentById(studentId);
  if (student.message) {
    return res.status(400).json({ message: student.message });
  }
  res.send(student);
});

router.put("/details/:id", authUser, studentProfile(), validation, async (req, res) => {
  const studentId = parseInt(req.params.id);
    // console.log(`req.id = ${req.user.userId}, req.params.id = ${req.params.id}`)
  if(req.user.userId != studentId){
    return res.status(400).json({ message : `Forbidden! Cannot update profile.` })
  }
  const { newName } = req.body;
  if (newName.length == 0) {
    return res.status(400).json({ message: `Name is empty` });
  }
  const updatedProfile = await studentsServices.updateStudentProfile(
    studentId,
    newName
  );
  if (updatedProfile.message) {
    return res.status(400).json({ message: updatedProfile.message });
  }
  return res.status(200).json(updatedProfile);
});

router.use("/asg", routerAsg);
router.use("/scores", routerScore), (module.exports = router);
