import express from "express"
import userRouter from "./router/userRouter"
import mongoose from "mongoose"
import data from "./data/data"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

mongoose.Promise = global.Promise
mongoose.connect(data.dbCredential, {useNewUrlParser: true}).then(() => console.log("connected to db"))

userRouter(app)

app.listen(data.port, () => console.log("server is running..."))