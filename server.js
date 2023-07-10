const express = require('express'); // Import the express module

const { Note, getNotes } = require('./models/notes'); // Import the Note class and getNotes function from the ./models/notes js

const app = express(); // Create a new Express application

app.use(express.static('./public')); // Serve static files from the ./public directory
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data in requests

app.get('/', (clientRequestObj, serverResponseObject) => {
    serverResponseObject.sendFile(__dirname + '/public/index.html'); // Send the index.html file when the root URL is accessed
});

app.get('/notes', (clientRequestObj, serverResponseObject) => {
    serverResponseObject.sendFile(__dirname + '/public/notes.html'); // Send the notes.html file when the /notes URL is accessed
});

app.post('/notes', (clientReq, serverRes) => {
    const newNote = new Note(clientReq.body); // Create a new Note object with the request body data
    newNote.save(); // Save the new note to the database through the save function

    console.log(clientReq.body.note); // Log the note content to the console
    console.log(clientReq.body.title); // Log the note title to the console

    serverRes.redirect('/notes'); // Redirect the client to the '/notes' URL to so the client side isn't looking for what to do next 
});

app.get('/notes/database', (clientRequestObj, serverResponseObject) => {
    const notes = getNotes(); // Retrieve the notes from the notes.json database
    serverResponseObject.send(notes); // Send the notes as the response
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
 // Start the server and listen on port 3001 locally 

