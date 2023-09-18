import noteController from "../controller/noteController"

function noteRouter(app)
{
    app.route("/note")
        .post((req, res) =>
        {
            noteController.addNote(req, res)
        })
        .get((req, res) =>
        {
            noteController.getNotes(req, res)
        })
        .patch((req, res) =>
        {
            noteController.updateNote(req, res)
        })
        .delete((req, res) =>
        {
            noteController.deleteNote(req, res)
        })
}

export default noteRouter