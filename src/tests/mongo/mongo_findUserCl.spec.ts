import { getUser, signUp } from "../../../helper/user";
import {connectToMongo, deleteUserById, findUserMng, findUserMngID } from "../../../helper/MongoHelper";
import { MongoClient, Db, ObjectId } from "mongodb";
const dotenv = require("dotenv");
dotenv.config();

let connection: MongoClient;
let db: Db;

describe("MongoDB connection", () => {
    beforeAll(async () => {
        ({ connection, db } = await connectToMongo(process.env.DATABASE_URL!));
    });

    afterAll(async () => {
        await connection.close();
    });

    it("Connect to the collection and find user", async () => {
       const user = await findUserMng("Eleazar", db)
        console.log(user);
    });

    it("Create new user with imported data", async () => {
        const userImport = getUser("admin");
        console.log(userImport, "userImport");
        try {
            const res = await signUp(userImport);
            expect(res.statusCode).toBe(201);
            console.log(res.body);
            const userData = await findUserMng(userImport.name , db)
            console.log(userData, "userData");

            if (!userData) {
                throw new Error("User not found in the database");
            }

            expect(userData.name).toEqual(userImport.name);
            expect(userData.email).toEqual(userImport.email.toLowerCase());
            expect(userData.role).toBe("admin");
            expect(userData._id.toString()).toEqual(res.body.data.user._id);

            const deleteData = await deleteUserById(userData._id, db)
            console.log(deleteData, "deleteData");

            const findUser = await findUserMngID (userData._id,db);
            console.log(findUser, "findUser");
            expect(findUser).toBe(null);
            expect(findUser).toBeNull();
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    });
});
