const util = require('util');
const fs = require('fs');
const readFromFile = util.promisify(fs.readFile);


const readAndWriteFile = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content);
            writeToFile(file, parsedData)
            console.log("content")
        }
    })
}


const getNoteIndex = (parsedData, noteId) => {
    for (let i = 0; i < parsedData.length; i++) {
        if (parsedData[i].id == noteId) {
            return i
        }
    }
}



function writeToFile(fileName, content) {
    fs.writeFile(fileName, JSON.stringify(content, null, 2), (err) => err ? console.error(err) : console.info(`\n User Input logged to ${fileName}`))
}
module.exports = { readAndWriteFile, readFromFile }