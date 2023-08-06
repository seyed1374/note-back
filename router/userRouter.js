import userController from "../controller/userController"

function userRouter(app)
{
    app.route("/signup")
        .post((req, res) =>
        {
            userController.signup(req, res)
        })

    app.route("/login")
        .post((req, res) =>
        {
            userController.login(req, res)
        })
}

export default userRouter