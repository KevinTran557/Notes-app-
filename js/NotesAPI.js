//Methods to access notes
export default class NotesAPI{
    static getAllNotes(){ // retrieve all notes 
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]"); //if no notes on system empty array is given

    // sort algorithm to display most recent note/ updated time stamp. In descending order. Most Recent updated not will appear first in array. 'Sort()' takes a comparison function as an argument. comparison function takes in parameters 'a' and 'b' - 2 elements in array being compared. inside comparison function - new 'Date' object is created for the 'updated' timestamps for both 'a' and 'b'. then compares the 2 'Date' objects using '>' if 'a' timestamp is greater than 'b' updated timestamp returns '-1' indicating that 'a' should come before 'b' in sorted array. Otherwise if 'b' updated timestamp is greater than 'a' it returns '1' indicating 'b' should come before 'a' in sorted array. 
    
        return notes.sort((a,b)=>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        }); 
    }

    static saveNote(noteToSave){ //update and insert new note
        const notes = NotesAPI.getAllNotes();

         // grab existing object of note to update
        const existing = notes.find(note => note.id == noteToSave.id); //whatever Id is passed, it is compared against each existing note "note.id", if it finds the note with that ID then its stored in "existing" const object.

        // Edit/Update (If existing note with same ID passed through its going to update or update) otherwise it will be an insert

        if(existing){
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();

        }else{ //same code from below.
            noteToSave.id=Math.floor(Math.random() * 1000000); 
            noteToSave.updated = new Date().toISOString(); 
            notes.push(noteToSave);
        }
// -----------------------------------------------------------------------------------------------------
        // noteToSave.id=Math.floor(Math.random() * 1000000) ;   add id and updated time stamp to notes

        // noteToSave.updated = new Date().toISOString();  create new date object of current time - '.toISOString' to give ISO timestamp format

        // notes.push(noteToSave) adding notes to save to the list of notes
// -----------------------------------------------------------------------------------------------------

        localStorage.setItem("notesapp-notes", JSON.stringify(notes)); // re-save local storage key, override existing entry

       
    }

    static deleteNote(id){ // take in ID of note to delete 
        const notes = NotesAPI.getAllNotes();

        const newNotes = notes.filter(note => note.id != id); // get every note that does not have ID which is passed in. Current notes lenght - 1, as note ID passed in will match 1 ID. - Everything but the note ID you passed in.

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes)) //re-save all local storage keys overriding existing entry with, with chosen ID - local storage key deleted. 
    }
}