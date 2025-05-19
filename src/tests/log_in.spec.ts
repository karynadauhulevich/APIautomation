import {User} from "../../helper/interface";
import{getUser, login, signUp, deleteFunction, signUp2} from "../../helper/user";
//import * as supertest from "supertest";
//const request = supertest ("http://localhost:8001/api/v1");

describe ("USER SIGNUP AND LOGIN", ()=>{
    const user:User = getUser("admin")
    let cookie: string;
describe ("POSITIVE TESTING",()=>{
    it("should signup, login and delete user", async()=>{
        try {
            //SignUp
            const res = await signUp2(user)
            expect(res.statusCode).toBe(201)
            expect(res.body.data.user.email).toBe(user.email)
            expect(res.body.status).toEqual('success')
            console.log('FFFFFFFFFf',res.body)
            //login user
            const loginRes = await login(user)
            expect(loginRes.statusCode).toBe(200)
            expect(loginRes.body.status).toBe('success')
            cookie = loginRes.headers['set-cookie'][0].split(";")[0]
            //delete user
            const deleteRes = await deleteFunction(cookie)
            expect(deleteRes.statusCode).toBe(200)
            expect(deleteRes.body.message).toBe('User deleted successfully')
            //login
            const loginAfterDeletion = await login(user)
            expect(loginAfterDeletion.statusCode).toBe(401)
            expect(loginAfterDeletion.body.message).toBe('Incorrect email or password')
        }
        catch (error){
            console.error("Error during sign up:" , error)
            throw error
        }

        })
    })
})