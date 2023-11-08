
const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

note.get('/', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))

});


note.post('/', (req, res) => {

    const {title, text} = req.body

    if (title && text){
        
        const newtask = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newtask, './db/db.json');

        const response = {
            status: 'success',
            body: newtask,
        };
      
        res.json(response);
    } else {
      res.json('Error in entering task');
    }
  

});

note.delete('/:id', (req, res) => {

        const noteid = req.params.id;

        readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const list = json.filter((note) => note.id !== noteid);

            writeToFile('./db/db.json', list);

            res.json(`Success`);
        });


});

module.exports = note;