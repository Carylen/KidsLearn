const router = require("express").Router();
const scoreRepos = require("../score/scoreRepository");
const asgRepos = require("../assignment/asgRepository");
const studentRepos = require("../student/studentRepository")

/** ------------------------ ASSIGNMENT HANDLER ------------------------ */
router.post("/uploadAsg", async (req, res) => {
  try {
    // Get req body
    const { title } = req.body;

    const newAsg = await asgRepos.createAsg(title);

    res.status(200).json({ data: newAsg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/listAsg", async (req, res) => {
  const assignments = await asgRepos.getAll();

  if (assignments.message) {
    return res.status(404).json({ message: assignments.message });
  }
  return res.status(200).json({ assignments });
});

router.put("/update")

router.delete("/deleteAsg/:id", async(req, res) => {
    const asgId = parseInt(req.params.id)
    const deletedAsg = await asgRepos.deleteAsg(asgId)

    if(deletedAsg.message){
        return res.status(404).json({ message : deletedAsg.message })
    }
    return res.status(200).json( deletedAsg )
})

/* ------------------------ STUDENTS HANDLER ------------------------ */
router.get("/listStudents", async(req, res) => {
    const students = await studentRepos.getAllStudent()

    if(students.message){
        return res.status(404).json(students.message)
    }
    return res.status(200).json(students)
})

router.delete("/deleteStudent/:id", async(req, res) => {
    const studentId = parseInt(req.params.id)
    const deletedStudent = await studentRepos.deleteStudent(studentId)

    if(deletedStudent.message){
        return res.status(404).json(deletedStudent.message)
    }
    return res.status(200).json(deletedStudent)
})
/* ------------------------ SCORES HANDLER ------------------------ */
router.get("/listScores", async (req, res) => {
  try {
    const scores = await scoreRepos.getAllScores();
    if (scores.message) {
      res.send("Data Not Found!");
    }

    res.status(200).send(scores);
  } catch (error) {
    console.error(error);
    res.status(400).send("Client Error");
  }
});

router.put("/updateScores/:id", async (req, res) => {
    // Get ID
    const scoreId = parseInt(req.params.id);
    // Get req body with filled newScore
    const { newScore } = req.body;
    // console.log(scoreId)
    const updatedScore = await scoreRepos.editScore(scoreId, newScore);
    if (updatedScore.message) {
      // res.status(404).send(`Cannot Find Score with ID : ${scoreId}`)
      // throw new Error(`Canot find Score with ID : ${scoreId}`)
      return res.status(404).json({ message: updatedScore.message });
    }
    return res.status(200).json(updatedScore);
});

router.delete("/deleteScore/:id", async (req, res) => {
  try {
    const { scoreId } = req.body;
    const deleteScore = await scoreRepos.destroyScore(scoreId);

    res.status(200).json({ message: deleteScore.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
