const validate = function (schema) {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if(!result.success){

            return res.status(400).json({

                message:"invalid inputs"

            })
        }

        req.validatedData = result.data;

        next();

    }

}




module.exports = validate;