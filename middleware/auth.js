const jwt = require('jsonwebtoken');

const TOKEN_KEY = "RANDOM_KEY";

function authenticationToken(req, res, next) {
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        });
    }
    jwt.verify(token, TOKEN_KEY, (err, user) => {
        if (err) return res.status(401).send({ message: "Unauthorized" });
        req.user = user.data;
        next
    })


}
function generateAccessToken(userModel) {
    return jwt.sign({ data: userModel }, token, {
        expiresIn: '1h'
    })
}
module.exports = {
    authenticationToken,
    generateAccessToken
}