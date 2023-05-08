const validations = require('./global-validations');
const ExamDB = require('../db-model/exam-db');

const validExam = async (req,res,nxt)=>{
    if(!validations.isNumber(req.examId))
        res.status(403).json({msg : "INVALID EXAM ID : ID must be numerical value"});
    else{
        const [valid,invalid,allValid] = await ExamDB.validExams(req.userId,req.examId);
    if(!allValid){
    res.status(403).json({msg : "you have input invalid exam(s)","valid" : valid ,"invalid" : invalid});
    }else{
        req.validExamId = req.idExam;
        nxt();
    }
}
}


module.exports = validExam;
