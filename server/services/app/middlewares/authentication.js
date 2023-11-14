const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;
        const payload = verifyToken(access_token);
        const findUser = await User.findByPk(payload.id);
        if (!findUser) {
            throw { name: "unauthorized" };
        }
        req.user = {
            id: findUser.id,
            email: findUser.email
        };
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;
