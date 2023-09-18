import mongoose from "mongoose"

const noteModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: "enter user_id",
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
})

export default noteModel