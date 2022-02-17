const Router = require('express').Router();
const { readFromFile, readAndWriteFile } = require('../utils/fsutils');


Router.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

Router.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };

        readAndWriteFile(newNote, './db/db.json');
        console.info(`new note added`)
        readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    } else {
        res.error('we were unable to add your note at this moment');
    }
});

  
module.exports = Router;