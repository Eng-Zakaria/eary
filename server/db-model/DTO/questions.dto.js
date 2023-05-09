
const QuestionModule =require('../../models/question');
const QuestionDB = require('../question-db');
const answerDTO = require('./answers-dto');

const getQuestionDTO =async (examId,questionId) => {
     const questionBeforeProceed=await QuestionDB.getJustQuestion(examId,questionId);
     const {
        type,
        header,
        description,
        state,
        rank,
        file_path,
        icon_path,
        default_point,
        created_at,
        modified_at,
      } = questionBeforeProceed[0];
        let a= await answerDTO(questionId);
       return new QuestionModule(  await answerDTO(questionId),
       default_point,questionId,null,state,header,description,type,rank,file_path,icon_path,created_at,modified_at);        
       
}

const s = async() => {
 let q = await getQuestionDTO(51,21);
      console.log(  q.getAnswers());
}
s();

module.exports = getQuestionDTO;