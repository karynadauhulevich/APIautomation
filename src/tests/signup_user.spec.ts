import * as supertest from "supertest";
import { expect } from '@jest/globals'
const request = supertest('http://localhost:8001/api/v1');

describe('User sign up',()=>{
    describe('POSITIVE TESTS',()=>{
        it.skip ('sign up', async()=>{
        const UserData ={
            name: "John Val",
            email: "efofko@example.com",
            password: "mypassword123",
            passwordConfirm: "mypassword123"
        }
       const res =  await request.post('/users/signup').send(UserData)
            expect(res.status).toBe(201)
        console.log(res.body)
    })
    })
    describe('NEGATIVE TESTS',()=>{
        it ('should not sign up the user without required field `name`', async()=>{
            const UserData= {
                email: "flsk@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            const res=await request.post('/users/signup').send(UserData)
            expect (res.body.message).toEqual( "Missing required fields: name")
            console.log(res.body.message)
            expect (res.body.error.statusCode).toEqual(400)
        })
        it('should not sign up the user without required field `email`', async()=>{
            const UserData= {
                name: "John Val",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            const res= await request.post('/users/signup').send(UserData)
            console.log(res.body)
            expect (res.body.error.statusCode).toEqual(400)
            expect (res.body.message).toEqual("Missing required fields: email")
        })
        it('should not sign up the user without required field `password`', async()=>{
            const UserData= {
                name: "John Val",
                email: "flsk@example.com",
                passwordConfirm: "mypassword123"
            }
            const res= await request.post('/users/signup').send(UserData)
            console.log(res.body)
            expect (res.body.error.statusCode).toEqual(400)
            expect (res.body.message).toEqual( "Missing required fields: password")
        })
        it('should not sign up the user without required field `passwordConfirm`', async()=>{
            const UserData= {
                name: "John Val",
                email: "flsk@example.com",
                password: "mypassword123",
            }
            const res= await request.post('/users/signup').send(UserData)
            console.log(res.body)
            expect (res.body.error.statusCode).toEqual(400)
            expect (res.body.message).toEqual("Missing required fields: passwordConfirm"
            )
        })
    })
})