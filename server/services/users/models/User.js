const { ObjectId } = require("mongodb");
const { getDB } = require("../config/connection");

class User {
    static async create(data) {
        try {
            return await getDB().collection("Users").insertOne(data);
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            return await getDB().collection("Users").find().toArray();
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            return await getDB()
                .collection("Users")
                .findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            return await getDB()
                .collection("Users")
                .deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            return await getDB().collection("Users").findOne({ email });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
