const notes = require('express').Router();
const { readFromFile, readAndWriteFile, deleteFile } = require('../utils/fsutils');
const uuid = require('../utils/uuid');

notes.get('/', (req, res) => {
    console.info(`${req.method} request received`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.info(`${req.method} request received`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndWriteFile(newNote, './db/db.json');
        console.info(`new note added`)
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    } else {
        res.error('we were unable to add your note at this moment');
    }
});

notes.delete('/:note_id', (req, res) => {
    const ID = req.params.note_id
    deleteFile('./db/db.json', ID)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
  
  })
  
  module.exports = notes;