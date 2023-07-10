const fs = require('fs');                            // Import the fs module for file system operations
const { v4 } = require('uuid');                       // Import the v4 function from the uuid module to generate unique IDs
const path = require('path');                         // Import the path module for working with file and directory paths
const DB_PATH = path.join(__dirname, '../db/notes.json');  // Define the file path to the database JSON file to store the notes

function getNotes() {
    const notes = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));  // Read the notes JSON file and parse its contents to an array
    return notes;                                               // Return the array of notes
}

class Note {
    constructor({ note, title }) { // Generate an object to store the note information
        this.id = v4();            // Generate a unique ID for the note using uuid library's v4 function
        this.note = note;          // Assign the provided note value to the note property of the Note class
        this.title = title;        // Assign the provided title value to the title property of the Note class
    }

    save() {
        const notes = getNotes();                       // Get the current array of notes from the JSON file

        notes.push(this);                               // Push the current Note class to the notes array

        fs.writeFile(DB_PATH, JSON.stringify(notes, null, 2), err => {
            if (err) throw err;                          // If there is an error, throw it

            console.log('Note saved successfully');      // Log a success message indicating the note was saved
        });
    }
}

module.exports = { Note: Note, getNotes: getNotes };    // Export the Note class and getNotes function for use in the server.js file
