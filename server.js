//const variables
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes.js');
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(apiRoutes);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
    console.info(`conecting to notes, please wait a moment `)
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    console.info(`conecting to index, please wait a moment `)
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
});
