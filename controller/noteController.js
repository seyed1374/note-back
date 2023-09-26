import mongoose from "mongoose"
import noteModel from "../models/noteModel"
import tokenHelper from "../helpers/tokenHelper"

const note = mongoose.model("note", noteModel)

function addNote(req, res)
{
    const encodedToken = req.headers.authorization
    if (encodedToken)
    {
        tokenHelper.decodeToken(encodedToken)
            .then(token =>
            {
                const {user_id} = token || {}
                const newNote = new note({...req.body, user_id})
                newNote.save()
                    .then(createdNote =>
                    {
                        const createdNoteJson = createdNote.toJSON()
                        res.send(createdNoteJson)
                    })
                    .catch(err =>
                    {
                        res.status(400).send({message: err})
                    })
            })
            .catch(err =>
            {
                res.status(403).send({message: err})
            })
    }
    else
    {
        res.status(401).send({message: "لطفا توکن خود را ارسال کنید."})
    }
}

function getNotes(req, res)
{
    const encodedToken = req.headers.authorization
    if (encodedToken)
    {
        tokenHelper.decodeToken(encodedToken)
            .then(token =>
            {
                const {user_id} = token || {}
                note.find({user_id})
                    .then(foundedNotes =>
                    {
                        if (foundedNotes)
                        {
                            res.send(foundedNotes.reverse())
                        }
                        else
                        {
                            res.status(404).send({message: "نت با این مشخصات یافت نشد."})
                        }
                    })
            })
            .catch(err =>
            {
                res.status(403).send({message: err})
            })
    }
    else
    {
        res.status(401).send({message: "لطفا توکن خود را ارسال کنید."})
    }
}

function updateNote(req, res)
{
    const {note_id, text, title} = req.body
    const encodedToken = req.headers.authorization
    if (encodedToken)
    {
        tokenHelper.decodeToken(encodedToken)
            .then(token =>
            {
                const {user_id} = token || {}
                note.findOneAndUpdate({user_id, _id: note_id}, {text, title}, {new: true, runValidators: true})
                    .then(foundedNote =>
                    {
                        if (foundedNote) res.send(foundedNote)
                        else res.status(404).send({message: "همچین نوتی یافت نشد"})
                    })
                    .catch(err =>
                    {
                        res.status(400).send({message: err})
                    })
            })
            .catch(err =>
            {
                res.status(403).send({message: err})
            })
    }
    else
    {
        res.status(401).send({message: "لطفا توکن خود را ارسال کنید."})
    }
}

function deleteNote(req, res)
{
    const {note_id} = req.body
    const encodedToken = req.headers.authorization
    if (encodedToken)
    {
        tokenHelper.decodeToken(encodedToken)
            .then(token =>
            {
                const {user_id} = token || {}
                note.deleteOne({user_id, _id: note_id})
                    .then(deletedNote =>
                    {
                        if (deletedNote)
                        {
                            res.send(deletedNote)
                        }
                        else
                        {
                            res.status(400).send({message: "همچین نوتی یافت نشد"})
                        }
                    })
                    .catch(err =>
                    {
                        res.status(400).send({message: err})
                    })
            })
            .catch(err =>
            {
                res.status(403).send({message: err})
            })
    }
    else
    {
        res.status(401).send({message: "لطفا توکن خود را ارسال کنید."})
    }
}

const noteController = {
    addNote,
    getNotes,
    updateNote,
    deleteNote,
}
export default noteController