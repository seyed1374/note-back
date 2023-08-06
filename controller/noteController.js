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
                console.log(token)
                const {user_id} = token || {}
                const newNote = new note({...req.body, user_id})
                newNote.save()
                    .then(createdNote =>
                    {
                        const createdNoteJson = createdNote.toJSON()
                        res.send(createdNoteJson)
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