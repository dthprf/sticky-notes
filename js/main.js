function main() {
    var model = new StickyNotesModel();
    var view = new NotesView(model);

    var controller = new NotesController(model, view);
    controller.init();
}