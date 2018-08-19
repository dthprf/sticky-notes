class NotesView {
    constructor(model) {
        this.model = model;
    }

    generateNote(noteModel) {
        let note = document.createElement('li');
        note.id = noteModel.id;
        note.className = 'note';

        let title = document.createElement('textarea');
        title.className = 'title';
        title.rows = '1';
        let titleTextNode = document.createTextNode(noteModel.title);

        let desc = document.createElement('textarea');
        desc.className = 'desc';
        desc.rows = '7';
        let descTextNode = document.createTextNode(noteModel.desc);
      
        let deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt';                  
       
        title.appendChild(titleTextNode);
        desc.appendChild(descTextNode);
        note.appendChild(title);
        note.appendChild(desc);
        note.appendChild(deleteIcon);

        return note;
    }

    appendNote(note) {
        document.getElementById('notesContainer').appendChild(note);
    }

    renderNotes(allNotes) {
        for (var property in allNotes) {
            if (allNotes.hasOwnProperty(property)) {
                let noteNode = this.generateNote(allNotes[property]);
                this.appendNote(noteNode);
            }
        }
    }

    deleteNote(noteId) {
        let noteToDelete = document.getElementById(noteId);
        noteToDelete.parentNode.removeChild(noteToDelete);
    }
}
