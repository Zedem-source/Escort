const { user } = require('../models/users.model');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

async function register(params, callback) {
    if (params.email === undefined) {
        return callback({
            message: "L'adresse mail est obligatoire"
        });
    }
    let isUserExist = await user.findOne({ email: params.email });
    if (isUserExist) {
        return callback({
            message: "Cet email est deja utilisé pour un autre compte"
        });
    }

    const salt = bcrypt.genSaltSync(10);
    params.password = bcrypt.hashSync(params.password, salt);
    const userSchema = user(params);
    userSchema
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })

}
async function login({ email, password }, callback) {
    const userModel = await user.find({ email });
    if (userModel != null) {
        if (bcrypt.compareSync(password, userModel.password)) {
            const token = auth.generateAccessToken(userModel.toJSON());
            return callback(null, { ...userModel.toJSON(), token });
        } else {
            return callback({
                message: "Invalid email/password"
            });
        }
    } else {
        return callback({
            message: "Invalid email/password"
        });
    }
}
module.exports = {
    register,
    login
}


