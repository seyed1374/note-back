import jwt from "jsonwebtoken"
import data from "../data/data"

function encodeToken(payload)
{
    return new Promise((resolve, reject) =>
        jwt.sign(payload, data.tokenSign, {algorithm: "HS512"}, (err, token) =>
        {
            if (err)
            {
                reject(err)
            }
            else
            {
                resolve(token)
            }
        }),
    )
}

const decodeToken = (token) =>
{
    return new Promise((resolve, reject) =>
        jwt.verify(token, data.tokenSign, {algorithm: "HS512"}, (err, payload) =>
        {
            if (err)
            {
                reject(err)
            }
            else
            {
                resolve(payload)
            }
        }),
    )
}

const tokenHelper = {
    encodeToken,
    decodeToken,
}

export default tokenHelper