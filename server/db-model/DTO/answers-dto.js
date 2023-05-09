
const AnswersModule =require('../../models/answers');
const AnswersDB = require('../answers-db');


const getAnswerDTO =async (questionId , defaultPoint) => {
 
    const answersObjs = await AnswersDB.getAnswersAsObjsArr(questionId);
    let answers = [], indicesOfCorrectAnswers = [], points = [];

    for(const answerObj of answersObjs){
        const {answer ,point , is_correct} = answerObj;
        answers.push(answer);
        if(is_correct) 
           indicesOfCorrectAnswers.push(answers.length - 1);
        points.push(point);
    }
        //answers_index  answer  is_correct    point 
       return new AnswersModule(answers,indicesOfCorrectAnswers,points,defaultPoint); 
        
}


module.exports = getAnswerDTO;