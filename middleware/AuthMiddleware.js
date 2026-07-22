const jwt = require("jsonwebtoken")

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.send("token not found")
        }
        else {
            const decoded = jwt.verify(token, "secretkey")
            console.log(decoded)
            req.user = decoded
            next()

        }



    }
    catch (error) {
        res.status(401).send("Invalid Token");
    }
}



module.exports = AuthMiddleware