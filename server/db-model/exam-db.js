const MySql = require('./db');
const objExpanded = require('../util/Helper-methods/expand-obj');

module.exports = class ExamDB {
        constructor() {
            if (this instanceof examDB) {
                throw new Error('A static class cannot be instantiated');
            }
        }

        static async saveExams(creatorId, exams = []) {

            objExpanded.appendAttrValToObjsArr(exams, 'id_creator', creatorId);
            let keysAndColumns = ['id_creator', 'header', 'description', 'duration_mins', 'difficultly', 'total_score'];
            const result = await MySql.bulkInsert('exams', exams, keysAndColumns, keysAndColumns);
            return result;
        }
        static async changeState(creatorId, examId, newState) {
            const result = await MySql.updateColumnValue('exams', "exam_id", examId, 'id_creator', creatorId, 'state', newState);
            return result;
        }
        static async renewActiveExam(creatorId, examId) {
            const result = await MySql.updateColumnValue('exams', 'exam_id', examId, 'id_creator', creatorId, 'actived_at', objExpanded.toMysqlFormat(new Date()));
            return result;
        }
        static async makeExamsActive(creatorId, examIds) {
            let finalResult = {};
            for (const id of examIds) {
                finalResult[id] = [];
                finalResult[id].push(await ExamDB.changeState(creatorId, id, 'ACTIVE'));
                finalResult[id].push(await ExamDB.renewActiveExam(creatorId, id));
            }
            return finalResult;
        }
        static async makeExamsDisActive(creatorId, examIds) {
            let finalResult = {};
            for (const id of examIds) {
                finalResult[id] = [];
                finalResult[id].push(await ExamDB.changeState(creatorId, id, 'MAINTAINED'));
                finalResult[id].push(await ExamDB.renewActiveExam(creatorId, id));
            }
            return finalResult;
        }
        static async updateExams(creatorId, exams) {
            let finalResult = {};
            for (const exam of exams) {
                const examId = exam['exam_id'];
                delete exam['exam_id'];
                let keysAndColumns = Object.keys(exam);
                finalResult[examId] = await MySql.update('exams', exam, keysAndColumns, keysAndColumns,
                    `exam_id = ${examId} AND id_creator = ${creatorId}`);
            }
            return finalResult;
        }
        static async deleteExams(creatorId, examIds) {
            const result = await MySql.deleteByArr('exams', `id_creator = ${creatorId}`, 'exam_id', examIds);
            return result;
        }
        static async getStateExams(states = [], exceptStates = [], existCommand, ...valuesForExistCommand) {
            let command = existCommand || `SELECT * FROM exams WHERE 1=1`;

            if (states.length > 0) {
                objExpanded.boundArrayString(states);
                command += " AND ( " + objExpanded.addRepeatedChars(` state = `, ` OR `, states);
                command += ')';
            }
            if (exceptStates.length > 0) {
                objExpanded.boundArrayString(exceptStates);
                command += " AND (" + objExpanded.addRepeatedChars(` state != `, ` AND `, exceptStates);
                command += ')';
            }

            const [result] = await MySql.pool.query(command, valuesForExistCommand);
            return result;
        }
        static async getExamsForCreator(creatorId, states, exceptStates) {
            console.log(creatorId);
            let command = `SELECT * FROM exams WHERE id_creator = ?`;
           
            if (states || exceptStates) {
                let result = await ExamDB.getStateExams(states, exceptStates, command, creatorId);
               
                return result;
            } else {
                const [result] = await MySql.pool.query(command, [creatorId])
                console.log(result);
                return result;
            }

        }


    }
    /*
    let exams = [{
            'exam_id': 3,
            'header': 'abcd',
            'duration_mins': 113,
            'difficultly': 'ea112sy',
            'total_score': 1
        },
        {
            'exam_id': 4,
            'header': 'akdfjdlkf',
            'duration_mins': 2113333,
            'difficultly': 'ha1321rd',
            'total_score': 2
        },
        {
            'exam_id': 5,
            'duration_mins': 1123,
            'difficultly': 'd123',
            'total_score': 123
        },
        {
            'exam_id': 6,
            'duration_mins': 144,
            'difficultly': 'ea132sy',
            'total_score': 4
        }
    ]
    let test = async() => {
        const result = await ExamDB.getStateExams(['MAINTAINED', 'IN_CREATION']);
        return result;
    }
    let test2 = async() => {
        const result4 = await test();
        console.log(JSON.stringify(result4));
    }
    test2();*/