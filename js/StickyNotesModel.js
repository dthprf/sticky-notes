class StickyNotesModel {
    constructor() {
        this.allNotes = {};
        this.init();
    }

    getNotesFromLocalStorage() {
        let noNotes = {};
        let storedNotes = JSON.parse(localStorage.getItem('notes'));
        
        if(storedNotes !== null) {
            return storedNotes;

            } else {
                return noNotes;
            }
    }

    sendNotesToLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.allNotes));
    }

    init() {
        this.allNotes = this.getNotesFromLocalStorage();
    }

    addNote(newNote) {
        let id = newNote.id;
        this.allNotes[id] = newNote;
        this.sendNotesToLocalStorage();
    }

    deleteNote(noteId) {
        delete this.allNotes[noteId];
        this.sendNotesToLocalStorage();
    }

    getNotes() {
        return this.allNotes;
    }

    generateNoteId() {
        let uniqueId = Date.now();
        return '' + uniqueId;
    }

    createNewNote() {
        const emptyTitle = 'Add title';
        const emptyDesc = 'Edit your note description';
        let note = new Note(emptyTitle, emptyDesc, this.generateNoteId());
        this.addNote(note);

        return note;
    }

    editTitle(newTitle, noteId) {
        this.allNotes[noteId].title = newTitle;
        this.sendNotesToLocalStorage();
    }

    editDesc(newDescription, noteId) {
        let note = this.allNotes[noteId].desc = newDescription;
        this.sendNotesToLocalStorage();
    }

    generateNoteObjects(noteNode) {
        let aElement = noteNode.getElementsByTagName('a');
        let noteDetails = aElement[0];
        let title = noteDetails.firstElementChild;
        let details = noteDetails.childNodes;
        let noteObject = new Note(details[0].value, details[1].value);

        return noteObject;
    }
}