const outputEl = document.querySelector('#note-output');
const inputTitle = document.querySelector('.input-title');
const inputNote = document.querySelector('.input');
const clearBtn = document.querySelector('#clear-btn');
const saveBtn = document.querySelector('#save-button');
const invisbleBtn = document.querySelector('#invisble-btn');

function outputNotes() {
    fetch('/notes/database')
        .then(res => res.json())
        .then(data => {
            console.log(data, 'got data');

            if (data.length) {
                outputEl.innerHTML = '';

                data.forEach(noteObj => {
                    outputEl.insertAdjacentHTML('beforeend', `
                        <div class="notes-main note">
                            <h1>${noteObj.title}</h1>
                            <p>${noteObj.note}</p>
                        </div>
                    `);
                });

                // Add notes back to input
                const noteBoxes = document.querySelectorAll('.notes-main.note');
                noteBoxes.forEach(noteBox => {
                    noteBox.addEventListener('click', () => {
                        const title = noteBox.querySelector('h1').textContent;
                        const note = noteBox.querySelector('p').textContent;
                        inputTitle.value = title;
                        inputNote.value = note;
                    });
                });
            };
        });
};



function clearInputs() {
    inputTitle.value = '';
    inputNote.value = '';
};

outputNotes();

clearBtn.addEventListener('click', clearInputs);
saveBtn.addEventListener('click', () => {
    invisbleBtn.click();
});

