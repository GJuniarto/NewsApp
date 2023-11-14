const User = require("../models/User");

class UserController {
    static async create(req, res, next) {
        const { email, password, username, phoneNumber, address } = req.body;
        try {
            if (!email) throw { name: "Email is required!" };
            // const findUser = await User.findByEmail(email);
            // if (findUser) throw { name: "Email is registered!" };
            if (!password) throw { name: "Password is required!" };
            const hashPassword = require("bcryptjs").hashSync(password, 8);
            const role = "User";
            const user = await User.create({ email, password: hashPassword, username, phoneNumber, address, role });
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static async findAll(req, res, next) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static async findById(req, res, next) {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        const id = req.params.id;
        try {
            const user = await User.delete(id);
            res.json({ message: `Success delete user with id ${id}` });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
