import mongoose from "mongoose"
import userModel from "../models/userModel"
import tokenHelper from "../helpers/tokenHelper"

const user = mongoose.model("user", userModel)

function signup(req, res)
{
    const newUser = new user(req.body)
    newUser.save()
        .then(createdUser =>
        {
            const createdUserJson = createdUser.toJSON()
            tokenHelper.encodeToken({user_id: createdUserJson._id})
                .then(token =>
                {
                    res.send({...createdUserJson, token})
                })
                .catch(err =>
                {
                    res.status(500).send(err)
                })
        })
        .catch(err =>
        {
            res.status(400).send(err)
        })
}

function login(req, res)
{
    const {username, password} = req.body
    if (username && password)
    {
        user.findOne({username, password})
            .then(foundedUser =>
            {
                if (foundedUser)
                {
                    const foundedUserJson = foundedUser.toJSON()
                    tokenHelper.encodeToken({user_id: foundedUserJson._id})
                        .then(token =>
                        {
                            res.send({...foundedUserJson, token})
                        })
                        .catch(err =>
                        {
                            res.status(500).send(err)
                        })
                }
                else
                {
                    res.status(404).send({message: "کاربری با این مشخصات یافت نشد."})
                }
            })
            .catch(err =>
            {
                res.status(500).send(err)
            })
    }
    else
    {
        res.status(400).send({message: "لطفا نام کاربری و رمز عبور را ارسال کنید."})
    }
}

const userController = {
    signup,
    login,
}

export default userController