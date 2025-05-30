import { createTour, tourData } from "../../../helper/tour";
import { getUser, signUp } from "../../../helper/user";
import {connectToMongo, deleteTour, findTourName} from "../../../helper/MongoHelper";
const { MongoClient, Db, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

describe("MongoTour", () => {
    let connection: typeof MongoClient;
    let db: typeof Db;
    let cookie: string;

    beforeAll(async () => {
        const mongo = await connectToMongo(process.env.DATABASE_URL);
        connection = mongo.connection;
        db = mongo.db;
    })

    afterAll(async () => {
        await connection.close();
    });

    it("connect to MongoDB", async () => {
        const tours = db.collection("tours");
        console.log(tours, "=========Tours======");
        const tour = await tours.findOne({ name: "12345werhikmlkkm" });
        console.log(tour, "FFFIIINNNDD TTPPUUURR +++++");
    });

    it("create tour", async () => {
        const userData = getUser("admin");
        const res = await signUp(userData);
        cookie = res.headers["set-cookie"][0].split(";")[0];

        const data = tourData();
        const resp = await createTour(cookie, data);
        expect(resp.statusCode).toBe(201);
        expect(resp.body.data.name).toEqual(data.name)

        const tourDoc = await findTourName(data.name, db);
        console.log(tourDoc, "tour find");
        expect(tourDoc.name).toEqual(data.name)

        const deleteResult = await deleteTour(tourDoc._id , db);
        console.log(deleteResult, "DELETE ---");

        const findUser = await findTourName(data.name, db);
        expect(findUser).toBeNull();
    });
});



