import {faker} from "@faker-js/faker"
import * as supertest from "supertest"
import {User} from "./interface";
const request = supertest ("http://localhost:8001/api/v1");

export function getUserSignUp() {
    const user = createUser()
    const password = 'test1234'
    return{
        name:user.username,
        email:user.email.toLowerCase(),
        password:password,
        passwordConfirm:password,

    }
}

export function createUser(){
    return {
        username: faker.internet.username(),
        email: faker.internet.email(),
    }
}
export function signUp (user:User){
    return request.post('/users/signup').send(user)
        .expect(201)
}
export function signUp2 (user: Partial<User>){
    return request.post('/users/signup').send(user)
        .expect(400)
}
export function signUp3 (user:User):Promise <any> {
    return new Promise((resolve, reject)=>{
        request.post('/users/signup').send(user)
            .end((err,res) =>{
                if(err)reject(err)
                    else resolve(res)

            })
    })
}