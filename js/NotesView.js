export default class NotesView {


    // constructor take in root element html 'div class:"notes" id="app"' passed in notes view so that the View code where HTML gets rendered knows where to put data. Parameter will be an empty object by default if nothing is passed into it'{}'. Object-destructuring - 'onNoteSelect,onNoteAdd, onNoteEdit, onNoteDelete' inside the constructor, you can directly grab the value of the keys of the object that has been passed in.
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root; // to save the data
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

        // use JS to render out the view, first render out initial html for application 
        // innerHTML set against root element 

        this.root.innerHTML = `
            
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note..." >
                <textarea class="notes__body">Take Note...</textarea>
            </div>
        `;

        // click listener for button to add new note. 

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        //event listener for when user clicks on add note
        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        //event listener for input field - whenever user exits out (clicks away from) of input field or text area - a onNoteEdit event is tiggered 

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {  //blur event - when user Exits out of input field
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody); // pass through arguments to onNoteEdit function.
            });
        });

        this.updateNotePreviewVisibility(false);
    }  
    // update view to present note on main body of page and highlight (using highlight css class) selected note on sidebar when clicked on.
    
    _createListItemHTML(id, title,body, updated){    // underscore used to note that it's a PRIVATE method - creates string for HTML sidebar item
        const MAX_BODY_LENGTH = 60; // max length before three dots to shorten body length

            // ? if body.length is more than 60 "MAX_BODY_lENGTH" ellipsis is added, otherwise it is not added.

            // ? ".toLocaleString" - formats date time to local date format: dateStyle set to full, timeStyle set to shortened 

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""} 
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, {dateStyle: "full", timeStyle: "short"})} 
                </div>

            </div>
        `;
    }

    // update List of notes in sidebar:
    updateNoteList(notes) {

        //grab list of notes container
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list, set to empty string to clear HTML:
        notesListContainer.innerHTML = "";

        // Insert HTML for each note:
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated))  // Pass through all values from note object of array. The notes in "updateNoteList(notes)" is what is inside the local storage. Pass through array - creating HTML for each note.

            notesListContainer.insertAdjacentHTML("beforeend", html);  // insert HTML before end of container
        }

        // Add select/delete events for each list item/note
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);   // onNoteSelect function is triggered. ID passed  through so other code knows what user has selected. "note-id" in div container above is converted to camelCase, used in this function.
            });

            // delete note function, using double click event
            noteListItem.addEventListener("dblclick",() => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete){
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note){
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => { // if any existing notes were selected and is shown visibly (background colour, bold text) - then it's going to be removed
            
            noteListItem.classList.remove("notes__list-item--selected"); 
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected"); // choosing list item in sidebar "list-item" using attribute selector (square brackets) with note id of what is passed in as the active note. ".classList.add("note__List-item--selected")" - modifier class added to show background and bold text.

    }

    updateNotePreviewVisibility(visible){
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}












