const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { createToken } = require("../helpers/jwt");
class UserController {
    static async login(req, res, next) {
        const { email, password } = req.body;
        console.log(req.body);

        try {
            if (!email || !password) throw { name: "email_password" };
            const user = await User.findOne({ where: { email } });
            // If user not found
            if (!user) throw { name: "email_password" };

            const isValidPassword = bcrypt.compareSync(password, user.password);

            // If wrong password
            if (!isValidPassword) throw { name: "email_password" };

            const payload = { id: user.id, email: user.email };
            const token = createToken(payload);
            res.json({ access_token: token });
        } catch (err) {
            next(err);
        }
    }

    static async register(req, res, next) {
        const { email, password, phoneNumber, address } = req.body;

        try {
            const user = await User.create({ email, password, phoneNumber, address, role: "Admin" });
            res.status(201).json({ id: user.id, email: user.email });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;
