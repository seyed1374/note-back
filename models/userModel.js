import mongoose from "mongoose"

const userModel = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        required: "enter username!",
    },
    password: {
        type: String,
        minlength: 6,
        required: "enter password!",
    },
    full_name: {
        type: String,
    },
})

export default userModel