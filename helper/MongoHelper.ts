import { MongoClient, Db, ObjectId } from "mongodb";

export async function connectToMongo (mongoUrl: string)  {
    const connection = await MongoClient.connect(mongoUrl);
    const db = connection.db();
    return { connection, db };
}

export function findUserMng (name?: string, db?: Db){
     return db.collection("users").findOne({ name });
}

export async function deleteUserById(userId: ObjectId, db: Db) {
    return db.collection("users").deleteOne({ _id: userId });
}

export function findUserMngID (userId: ObjectId, db?: Db){
    return db.collection("users").findOne({ userId });
}

export function findTourName(name:string, db: Db){
    return db.collection("tours").findOne({name:name});
}

export function deleteTour(tourId:ObjectId, db: Db){
    return db.collection("tours").deleteOne({ _id:tourId});
}