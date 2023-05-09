const { log } = require("console");
const { object } = require("joi");
const { appendObj } = require("./expand-map");
const { restart } = require("nodemon");


const appendObjToObjs = (objsArr, appendedObj) => {
    return objsArr.map((obj) => Object.assign(obj, obj, appendedObj));

}

// over loading
const appendObjToObjsWithFunction = (objsArr, appendedObj, MappedFunctions) => {
    let attrsVal = Object.entries(appendedObj);
    let funResult;
    objsArr.map((obj) => {
        for (let [key, value] of attrsVal) {
            funResult = MappedFunctions[key](value, funResult);
            let newObj = {}
            newObj[key] = funResult;

            Object.assign(obj, obj, newObj);

        }
    });
}

const adder = (value, lastReturn) => {
    if (lastReturn === undefined) {
        if (value) return value + 1;
        else return 0;
    }
    return lastReturn + 1;
}
const addRepeatedChars = (word = "", linkingStr, toConcat = []) => {
    let result = "";
    for (let i = 0; i < toConcat.length - 1; i++) {
        result += word + toConcat[i] + linkingStr
    }
    result += word + toConcat[toConcat.length - 1];
    return result;
}

const boundArrayString = (arrString) => {
    for (let i = 0; i < arrString.length; i++)
        arrString[i] = "\"" + arrString[i] + "\"";
    return arrString;
}

const twoDigits = (d) => {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

const toMysqlFormat = (dateObj) => {
    return dateObj.getUTCFullYear() + "-" + twoDigits(1 + dateObj.getUTCMonth()) + "-" + twoDigits(dateObj.getUTCDate()) + " " + twoDigits(dateObj.getHours()) + ":" + twoDigits(dateObj.getUTCMinutes()) + ":" + twoDigits(dateObj.getUTCSeconds());
};


const indexOfByAttrsValues = (arrayOfObjs, objComparison = {}) => {
    let cArrayOfObjs = arrayOfObjs;

    if (!Array.isArray(arrayOfObjs))
        cArrayOfObjs = [arrayOfObjs];

    objComparison = Object.entries(objComparison);
    let indices = [];

    for (const i in cArrayOfObjs) {
        let equal = false;
        for (const [key, value] of objComparison) {
            if (cArrayOfObjs[i].hasOwnProperty(key) && cArrayOfObjs[i][key] === value) {
                equal = true;
            } else {
                equal = false;
                break;
            }
        }
        if (equal)
            indices.push    (i);

    }
    return indices;
}
const appendAttrValToObjsArr = (objsArr, attr, value) => {
    objsArr.forEach((obj) => obj[attr] = value);
    return objsArr;
}
const appendAttrValToEachAttrObj = (obj,attr,value) =>{
Object.keys(obj).forEach((attrObj) =>{
        obj[attrObj][attr] = value;
})
return obj;
}

const isEmptyObject = (obj) =>{
    return JSON.stringify(obj) === '{}'
}
const deleteMultiAttrsVal = (objsArr, keys) => {
    for (const obj of objsArr) {
        keys.forEach(key => {
            delete obj[key];
        });
    }
    return objsArr;
}


const getJustHashedToTrue= (obj) =>{
    const trulyValues ={};
    const unTrulyValue = {};
    let allTrue = true;
    const keys = Object.keys(obj);

keys.forEach((key) => {
if(obj[key]){
trulyValues[key] = obj[key];
}
else {
allTrue = false;
unTrulyValue[key] = obj[key];
}
});
return [trulyValues,unTrulyValue,allTrue];
}


const boundToOBjsOfObj = (arrOfArr = [] , getOutIndex , nameOfAttr = []) => {
    let objResult = {} , result = {};
   arrOfArr.forEach((arr) => {
    let appendedObj = {};
    arr.forEach((val,index) => {
  
        if(index === getOutIndex){
            objResult[val] = appendedObj;
        }else{
            appendedObj[nameOfAttr[index]] = val;
        }
    })

   });
    result[nameOfAttr[getOutIndex]] = objResult;
    return result;
}


const mergeInOneShotAnswer = (objsArr = [] , skipKeys ={}) =>{
let wholeResult = [];
objsArr.map((obj) =>{
    let arr = [];
    if(isEmptyObject(skipKeys))
    Object.keys(obj).forEach((key) => arr.push(obj[key]));
    else 
    Object.keys(obj).forEach((key) => {if(!skipKeys[key]) arr.push(obj[key])});
    wholeResult.push(arr);
    
});
  return wholeResult;
};
const deleteObjsInCaseOf = (arrObjs =[] , deletedKeys) =>{
arrObjs.forEach((obj , index,array) => {
    
    if(hasKey(obj,deletedKeys)) array.splice(index,1);

});

}
const hasKey = (obj,keys) =>{
keys.forEach(key =>{
if(obj[key]) return true;
});
return false;
}

 
const getAllDataAttr = (objsArr=[] , attr)=>{
    let result = [];
objsArr.forEach((obj) => {
result.push(obj[attr]);

});
return getAllDataAttr;
}
module.exports = {
    getAllDataAttr,
    mergeInOneShotAnswer,
    appendObjToObjs,
    appendObjToObjsWithFunction,
    adder,
    indexOfByAttrsValues,
    deleteMultiAttrsVal,
    appendAttrValToObjsArr,
    addRepeatedChars,
    toMysqlFormat,
    boundArrayString,
    getJustHashedToTrue,
    appendAttrValToEachAttrObj,
    isEmptyObject ,
    deleteObjsInCaseOf

}