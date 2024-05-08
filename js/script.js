// Start up application => NotesAPI refers to NotesAPI class created in line 1 of NotesAPI.js
// import NotesAPI from "./NotesAPI.js"




// NotesAPI.saveNote({
//     id:448728,
//     title: "Title has changed",
//     body: "Coke can."
// });

// NotesAPI.deleteNote(524302);

// console.log(NotesAPI.getAllNotes())

// import NotesView from "./NotesView.js";

import App from "./App.js"

const root = document.getElementById("app"); //getting root app object
const app = new App(root);

// when user for example clicks on note in sidebar this view is going to call the function that is passed into the constructor.
// const view = new NotesView(app, {
//     onNoteSelect(){
//         console.log("Note has been Selected")
//     }
// })


// const view = new NotesView(app, {

    // can communicate with other parts of code which use the view to pass data in and out using event style functions.

    // onNoteAdd(){
    //     console.log("Let's add a new note!")
    // },

    // onNoteSelect(id){
    //     console.log("Note Selected: " + id);    //call view.updateActiveNote by ID
//     },

//     onNoteDelete(id){
//         console.log("Note DELETED: " + id);
//     },

//     onNoteEdit(newTitle, newBody){
//         console.log(newTitle);
//         console.log(newBody);

//     }
// });

// const notes = NotesAPI.getAllNotes();

// view.updateNoteList(notes);
// view.updateActiveNote(notes[0]);