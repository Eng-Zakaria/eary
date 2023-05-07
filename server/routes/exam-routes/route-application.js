const express = require('express');
const appExamRouter = express.Router();
const ExamDB = require('../../db-model/exam-db');
const QuestionDB = require('../../db-model/question-db');
const MySql = require('../../db-model/db');


appExamRouter.route("/").all((req, res, nx) => {
    console.log('in route of the applicators');
    nx();
})
appExamRouter.route("/").get(async(req, res) => {
    const exams = await ExamDB.getStateExams(["ACTIVITED"]);
    res.status(200).json(exams);
})

appExamRouter.get("/", async(req, res) => {
    try {
        console.log(req.creatorId);
 console.log("here in deeeepepeee");
        const questionsWithAnswers = await QuestionDB.getStatesQuestionsWithoutCorrectAnswers(req.creatorId, 1);

        res.status(200).json(questionsWithAnswers);
    } catch (error) {
        res.status(403).json([]);
    }
});
/*appExamRouter.post("/:examId/submit", async(req, res) => {

});
*/
appExamRouter.get("/:examId/questions/:questionId", async(req, res) => {
    try {
        const justQuestionWithAnswers = await QuestionDB.getJustQuestionWithoutCorrectAnswers(req.params.examId, req.params.questionId);
        res.status(200).json(justQuestionWithAnswers);
    } catch (error) {
        res.status(403).json({});
    }
});
appExamRouter.get("/questions/:questionId/answers", async(req, res) => {
    try {
        const answersWithoutCorrectlyOnes = await QuestionDB.getAnswersWithoutCorrectAnswer(req.params.questionId);
        res.status(200).json(answersWithoutCorrectlyOnes);
    } catch (error) {
        res.status(403).json([]);

    }
});
module.exports = appExamRouter;