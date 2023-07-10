const express = require('express');
const { Note, getNotes } = require('./models/notes');

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));


app.get('/', (clientRequestObj, serverResponseObject) => {
    serverResponseObject.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (clientRequestObj, serverResponseObject) => {
    // const notes = getNotes();

    serverResponseObject.sendFile(__dirname + '/public/notes.html');
});


app.post('/notes', (clientReq, serverRes) => {
    const newNote = new Note(clientReq.body);
    // const newTitle = new Note(clientReq.body.title);
   
    newNote.save();

    console.log(clientReq.body.note);
    console.log(clientReq.body.title);

    //have to respond back to the client to end the inifinite loop on the browser side 
    serverRes.redirect('/notes'); //send them back to the homepage so the browser doesnt sit in limbo
});

app.get('/notes/database', (clientRequestObj, serverResponseObject) => {
    const notes = getNotes();

    serverResponseObject.send(notes);

});


app.listen(3001, () => console.log('Server started on port 3001.'));