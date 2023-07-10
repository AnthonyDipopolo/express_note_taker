const outputEl = document.querySelector('#note-output');       // Get the element with the ID 'note-output'
const inputTitle = document.querySelector('.input-title');     // Get the element with the class 'input-title'
const inputNote = document.querySelector('.input');            // Get the element with the class 'input'
const clearBtn = document.querySelector('#clear-btn');         // Get the element with the ID 'clear-btn'
const saveBtn = document.querySelector('#save-button');        // Get the element with the ID 'save-button'
const invisbleBtn = document.querySelector('#invisble-btn');   // Get the element with the ID 'invisble-btn'

function outputNotes() {
    fetch('/notes/database')                                    // Make a GET request to the '/notes/database' endpoint
        .then(res => res.json())                                // Convert the response to JSON
        .then(data => {                                         // Process the JSON data
            console.log(data, 'got data');

            if (data.length) {
                outputEl.innerHTML = '';                        // Clear the existing content inside 'outputEl'

                data.forEach(noteObj => {       // Display the note content of each note object and display the title of each note object
                    outputEl.insertAdjacentHTML('beforeend', `
                        <div class="notes-main note">
                            <h1>${noteObj.title}</h1>            
                            <p>${noteObj.note}</p>              
                        </div>
                    `);
                });

                // Add event listeners to note boxes
                const noteBoxes = document.querySelectorAll('.notes-main.note');
                noteBoxes.forEach(noteBox => {
                    noteBox.addEventListener('click', () => {
                        const title = noteBox.querySelector('h1').textContent;  // Get the clicked note's title
                        const note = noteBox.querySelector('p').textContent;    // Get the clicked note's content
                        inputTitle.value = title;                                 // Set the input title value to the clicked note's title
                        inputNote.value = note;                                   // Set the input note value to the clicked note's content
                    });
                });
            }
        });
}

function clearInputs() {
    inputTitle.value = '';                                          // Clear the value of the input title box
    inputNote.value = '';                                           // Clear the value of the input note box
}

outputNotes();                                                     // Call the outputNotes function to display notes on page load

clearBtn.addEventListener('click', clearInputs);                   // Add event listener to the clear button to clear inputs
saveBtn.addEventListener('click', () => {
    invisbleBtn.click();                                            // Trigger a click on the invisible button when save button is clicked
});
