const mysql = require('mysql2');
const dotenv = require('dotenv');
const { log } = require('console');

dotenv.config();

module.exports = class MySql {
    constructor() {
        if (this instanceof MySql) {
            throw new Error('A static class cannot be instantiated');
        }
    }
    static pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,

    }).promise();


    static processDataObjsToArray(objsArr, keys) {

        return objsArr.map(obj =>
            keys.map(key => {
                if (obj[key] || obj[key] === 0) return obj[key];
            })
        );

    }
    static boundObjsValuesToArray(objsArr) {
        return objsArr.map((obj) => Object.values(obj));
    }

    static mapColumnsToObjValues(obj, keys, columns) {
        return keys.map((key, index) => {
            if (!(typeof obj[key] == 'string')) return `${columns[index]} = ${obj[key]}`;
            else return `${columns[index]} = '${obj[key]}'`;
        });
    }

    static bulkInsert = async(table, objsArr, keys, columns) => {
        let queryInsert = `INSERT INTO ${table}  (${columns.join(',')}) VALUES ?`;
        let values = null;

        if (!keys)
            values = MySql.boundObjsValuesToArray(objsArr);
        else
            values = MySql.processDataObjsToArray(objsArr, keys);

        const [result] = await MySql.pool.query(queryInsert, [values]);
        return [result.insertId, result.affectedRows];
    }

    static update = async(table, obj, keys, columns, conditions) => {
        let queryUpdate = `UPDATE ${table} SET ${MySql.mapColumnsToObjValues(obj,keys,columns)} WHERE ${conditions}`;
        const [result] = await MySql.pool.query(queryUpdate);
        return [result.insertId, result.affectedRows];
    }

    static deleteByArr = async(table, condition, columnForArr, array) => {
        let queryDelete = `DELETE FROM ${table} WHERE ${condition} AND ${columnForArr} IN (${array.join(',')})`;
        const [result] = await MySql.pool.query(queryDelete);
        return [result.insertId, result.affectedRows];
    }

    static async updateColumnValue(table, primaryColumnName, primaryValue, conditionalKey, conditionalVal, columnName, value) {
        let changeState = `UPDATE ${table} SET ${columnName} = ?  WHERE ${primaryColumnName}= ? AND ${conditionalKey} = ?`
        const [result] = await MySql.pool.query(changeState, [value, primaryValue, conditionalVal]);
        return [result.insertId, result.affectedRows];
    }
    static validForeignKey(tablePrimaryKey, primaryColumnName, primaryKey, foreignKeyColumnName, foreignKey) {
        return new Promise(async(resolve, reject) => {
            const query = `SELECT ${primaryColumnName} FROM ${tablePrimaryKey} WHERE ${foreignKeyColumnName}= ? AND ${primaryColumnName}= ?`;
            const [result] = await MySql.pool.query(query, [foreignKey, primaryKey]);

            if (result[0]) {
                console.log('in foreignKeyTrue');
                resolve(true);

            } else {
                console.log('in foreignKeyFale');

                reject(false);
            }
        });

    }
    static checkState(table, primaryColumnName, primaryKey, stateColumnName, state) {
        return new Promise(async(resolve, reject) => {
            const query = `SELECT ${stateColumnName} FROM ${table} WHERE ${primaryColumnName} = ? AND ${stateColumnName} = ?`;
            const [result] = await MySql.pool.query(query, [primaryKey, state]);

            if (result[0]) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }

}