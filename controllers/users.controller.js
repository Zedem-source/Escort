const { userService } = require('../services/users.service');

exports.register = (req, res, next) => {
    userService.register(req.body, (error, result) => {
        if (error) {
            next(error)
        } else {
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
    })
}
exports.login = (req, res, next) => {
    const { email, password } = req.body;
    userService.login({ email, password }, (error, result) => {
        if (error) {
            next(error)
        } else {
            return res.status(200).send({
                message: "Success",
                data: result
            })
        }
    })
}