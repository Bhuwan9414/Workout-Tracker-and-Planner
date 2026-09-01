const errorMiddleware = (err, res, req, next) => {

    res.status(500).json({

        success: false,
        message: err.message

    })

}

module.exports = errorMiddleware