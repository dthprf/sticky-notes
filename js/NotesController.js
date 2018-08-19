class NotesController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        let allNotes = this.model.getNotes();
        this.view.renderNotes(allNotes);
        this.initNewNoteButton(this.model, this.view);
        this.initNotesEditEvent(this.model);
        this.initDeleteButton(this.model, this.view);
        this.initClearLocalStorage();
    }

    initNewNoteButton(model, view) {
        document.getElementById('newNoteButton').addEventListener('click', function () {

            let note = model.createNewNote();
            let noteNode = view.generateNote(note);
            view.appendNote(noteNode);

            let title = noteNode.getElementsByClassName('title');

            title[0].addEventListener('blur', function() {
                let updatedTitle = this.value;
                let noteId = this.parentElement.id;
                model.editTitle(updatedTitle, noteId);
            })

            let desc = noteNode.getElementsByClassName('desc');

            desc[0].addEventListener('blur', function() {
                let updatedDesc = this.value;
                let noteId = this.parentElement.id;
                model.editDesc(updatedDesc, noteId);
            })
        
            let delButton = noteNode.getElementsByClassName('fas');

            delButton[0].addEventListener('click', function () {
                let noteId = this.parentElement.id;
                model.deleteNote(noteId);
                view.deleteNote(noteId);
            })
           
        });
    }

    initDeleteButton(model, view) {
        let delButtons = document.getElementsByClassName('fas');

        for(var i = 0; i < delButtons.length; i++) {
            delButtons[i].addEventListener('click', function () {               
                let noteId = this.parentElement.id;
                model.deleteNote(noteId);
                view.deleteNote(noteId);
            });
        }
    }

    initNotesEditEvent(model) {
        let titles = document.getElementsByClassName('title');
        let descs = document.getElementsByClassName('desc');

        for (var i = 0; i < titles.length; i++) {
            titles[i].addEventListener('blur', function () {
                let updatedTitle = this.value;
                let noteId = this.parentElement.id;
                model.editTitle(updatedTitle, noteId);
            });
        }

        for (var i = 0; i < descs.length; i++) {
            descs[i].addEventListener('blur', function () {
                let updatedDesc = this.value;
                let noteId = this.parentElement.id;
                model.editDesc(updatedDesc, noteId);
            });
        }
    }

    initClearLocalStorage() {
        let clearStorageButton = document.getElementById('clear');
        clearStorageButton.addEventListener('click', function () {
            let emptyArray = {};
            localStorage.setItem('notes', JSON.stringify(emptyArray));
        });
    }
}
