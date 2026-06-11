const jwt = require("jsonwebtoken")

require("dotenv").config();

const authMiddleware = function (req, res, next) {

    const authheader = req.headers.authorization

    if (!authheader) {
        return res.status(401).json({
            message: "token missing"
        })
    }

    const token = authheader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.data;


        next();
    }
    catch (error) {
        return res.status(401).json({
            message: "invlid token"
        })
    }

}


module.exports = authMiddleware