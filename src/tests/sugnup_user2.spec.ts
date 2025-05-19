import * as supertest from 'supertest'
import {faker} from "@faker-js/faker"
const request = supertest ("http://localhost:8001/api/v1")
import {Response} from 'superagent'
interface UserData{
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}
describe ('USER SIGN UP',() => {
    describe ('POSITIVE TESTING with async await', ()=>{
        it ("should sign up a new user", async()=>{
            const UserData = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            try {
                const res = await request.post('/users/signup').send(UserData)
                expect(res.status).toBe(201)
                expect(res.body.data.user.name).toEqual(UserData.name)
                expect(res.body.token).toBeDefined()
                expect(typeof res.body.token).toBe('string')
            }
            catch (error){
                console.error("Error during sign up:" , error)
                throw error
            }
            })
        })
    describe('POSITIVE TESTING with .then', ()=>{
        it ("should sign up a new user", async()=>{
            const UserData = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            return request.post('/users/signup').send(UserData)
                .expect(201)
                .then((res)=>{
                    expect(res.status).toBe(201)
                    expect(res.body.data.user.name).toEqual(UserData.name)
                    expect(res.body.token).toBeDefined()
                    expect(typeof res.body.token).toBe('string')
                })
                .catch ((error)=>{
                console.error("Error during sign up:" , error)
                throw error
            })
        })
    })
    describe ('POSITIVE TESTING with .end and done()', ()=>{
        it ("should sign up a new user", (done)=>{
        const UserData = {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            password: "mypassword123",
            passwordConfirm: "mypassword123"
        }
         request.post('/users/signup').send(UserData)
            .expect(201)
            .end((err, res)=>{
                if(err) {
                    console.error("Error during sign up:" , err)
                    return done()
                }
                try{
                expect(res.status).toBe(201)
                expect(res.body.data.user.name).toEqual(UserData.name)
                expect(res.body.token).toBeDefined()
                expect(typeof res.body.token).toBe('string')
                done()
            } catch (err) {
                    console.error("Error during sign up:", err)
                    done(err)
                }
            })
    })
    })
    describe('NEGATIVE TESTS All Required Fields Missing', () => {
        it('should not sign up a new user async await', async () => {
            const UserData = {};
            const res = await request.post('/users/signup').send(UserData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Missing required fields: name, email, password, passwordConfirm');
        });

        it('should sign up a new user try and catch, async()', async () => {
            const UserData = {};
            try {
                const res = await request.post('/users/signup').send(UserData);
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Missing required fields: name, email, password, passwordConfirm');
            } catch (error) {
                console.error("Error during sign up:", error);
                throw error;
            }
        });

        it('should not sign up a new user .then', () => {
            const UserData = {};
            return request.post('/users/signup').send(UserData)
                .expect(400)
                .then((res) => {
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.message).toEqual('Missing required fields: name, email, password, passwordConfirm');
                })
                .catch((error) => {
                    console.error("Error during sign up:", error);
                    throw error;
                });
        });

        it('should sign up a new user using done', (done) => {
            const UserData = {};
            request.post('/users/signup').send(UserData)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        console.error("Error during sign up:", err);
                        return done();
                    }
                    try {
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.message).toEqual('Missing required fields: name, email, password, passwordConfirm');
                        done();
                    } catch (err) {
                        console.error('Error during sign up:', err);
                        done(err);
                    }
                });
        });
    });
       describe('NEGATIVE TESTS Name is missing', () => {
           it ('should not sign up user using async',async()=>{
               const UserData = {
                   email: faker.internet.email(),
                   password: "mypassword123",
                   passwordConfirm: "mypassword123"
               };
               const res = await request.post('/users/signup').send(UserData);
               expect (res.statusCode).toEqual(400);
               expect (res.body.message).toEqual('Missing required fields: name');
           })
           it ('should sign up a new user using try and catch',async()=>{
               const UserData = {
                   email: faker.internet.email(),
                   password: "mypassword123",
                   passwordConfirm: "mypassword123"
               };
               try{
                   const res = await request.post('/users/signup').send(UserData);
                   expect (res.statusCode).toEqual(400);
                   expect (res.body.message).toEqual('Missing required fields: name');
               }
               catch(err){
                   console.error('Error during sign up:', err);
                   throw err
               }
           })
           it('should sign up a new user using then',async()=>{
               const UserData = {
                   email: faker.internet.email(),
                   password: "mypassword123",
                   passwordConfirm: "mypassword123"
               };
               request.post('/users/signup').send(UserData)
               .expect(400)
                   .then((res)=>{
                       expect(res.statusCode).toEqual(400);
                       expect(res.body.message).toEqual('Missing required fields: name');
                   })
                   .catch((err)=>{
                       console.error("Error during sign up:", err);
                       throw err
                   })
           })
           it('should sign up a new user using done and end',(done)=>{
               const UserData = {
                   email: faker.internet.email(),
                   password: "mypassword123",
                   passwordConfirm: "mypassword123"
               };
               request.post('/users/signup').send(UserData)
               .expect(400)
                   .end((err, res)=>{
                       if (err) {
                           console.error("Error during sign up:", err);
                           return done(err);
                       }
                       try{
                           expect(res.statusCode).toEqual(400);
                           expect(res.body.message).toEqual('Missing required fields: name');
                           done()
                       }
                       catch(err){
                           console.error('Error during sign up:', err);
                           done(err)
                       }
                   })
           })
       })
    describe ('NEGATIVE TESTS missing email',()=>{
        it ('should sign up user using async',async()=>{
            const UserData = {
                name: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            const res = await request.post('/users/signup').send(UserData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Missing required fields: email')

        })
        it ('should sign up a new user using then',async()=>{
            const UserData = {
                name: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            request.post('/users/signup').send(UserData)
            .expect(400)
                .then((res)=>{
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.message).toEqual('Missing required fields: email');
                })
                .catch((err)=>{
                    console.error('Error during sign up:', err);
                    throw err
                })
        })
        it ('should sign up a new user using try and catch',async()=>{
            const UserData = {
                name: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            try{
                const res = await request.post('/users/signup').send(UserData);
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Missing required fields: email');
            }
            catch(err){
                console.error('Error during sign up:', err);
                throw err
            }
        })
        it ('should sign up a new user using done',(done)=>{
            const UserData = {
                name: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            request.post('/users/signup').send(UserData)
            .expect(400)
                .end((err, res)=>{
                    if(err) {
                        console.error("Error during sign up:", err);
                        return done(err)
                    }
                    try{
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.message).toEqual('Missing required fields: email');
                        done()
                    }
                    catch(err){
                        console.error('Error during sign up:', err);
                        done(err)
                    }
                })
        })
    })
    describe('NEGATIVE TESTS missing password',()=>{
        it ('should sign up a new user using async',async()=>{
            const UserData = {
                name: faker.internet.email(),
                passwordConfirm: "mypassword123",
                email: faker.internet.email()
            }
             const res = await request.post('/users/signup').send(UserData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Missing required fields: password');

        })
        it ('should sign up a new user using then',async()=>{
            const UserData = {
                name: faker.internet.email(),
                passwordConfirm: "mypassword123",
                email: faker.internet.email()
            }
            request.post('/users/signup').send(UserData)
            .expect(400)
                .then((res)=>{
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.message).toEqual('Missing required fields: password');
                })
                .catch((err)=>{
                    console.error('Error during sign up:', err);
                    throw err
                })
        })
        it ('should sign up a new user using catch ',async()=>{
            const UserData = {
                name: faker.internet.email(),
                passwordConfirm: "mypassword123",
                email: faker.internet.email()
            }
            try{
                const res = await request.post('/users/signup').send(UserData);
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Missing required fields: password');
            }
            catch(err){
                console.error('Error during sign up:', err);
                throw err
            }
        })
        it ('should sign up a new user using done ',(done)=>{
            const UserData = {
                name: faker.internet.email(),
                passwordConfirm: "mypassword123",
                email: faker.internet.email()
            }
            request.post('/users/signup').send(UserData)
            .expect(400)
                .end((err,res) =>{
                    if(err){
                        console.error('Error during sign up:', err);
                        return done(err)
                    }
                    try{
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.message).toEqual('Missing required fields: password');
                        done()
                    }
                    catch(err){
                        console.error('Error during sign up:', err);
                        done(err)
                    }


                })
        })
    })
    describe ('NEGATIVE TESTS missing password confirmation',()=>{
        it ('should sign up a new user using async',async()=>{
            const UserData = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: '9494'
            }
            const res = await request.post('/users/signup').send(UserData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Missing required fields: passwordConfirm');
        })
        it ('should sign up a new user using then',async()=>{
            const UserData = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: '9494'
            }
            request.post('/users/signup').send(UserData)
                .expect(400)
                .then((res)=>{
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.message).toEqual('Missing required fields: passwordConfirm');
                })
                .catch((err)=>{
                    console.error('Error during sign up:', err);
                    throw err
                })
        })
        it ('should sign up a new user using done',(done)=>{
            const UserData = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: '9494'
            }
            request.post('/users/signup').send(UserData)
            .expect(400)
                .end((err,res)=>{
                    if(err){
                        console.error('Error during sign up:', err);
                        return done(err)
                    }
                    try{
                        expect(res.statusCode).toEqual(400);
                        expect(res.body.message).toEqual('Missing required fields: passwordConfirm');
                        done()
                    }
                    catch(err){
                        console.error('Error during sign up:', err);
                        done()
                    }
                })
        })
        it ('should sign up a new user using catch try',async()=>{
            const UserData = {
                name: faker.person.firstName(),
                email: faker.internet.email(),
                password: '9494'
            }
            try{
                const res = await request.post('/users/signup').send(UserData);
                expect(res.statusCode).toEqual(400);
                expect(res.body.message).toEqual('Missing required fields: passwordConfirm');
            }
            catch(err){
                console.error('Error during sign up:', err);
                throw err
            }
        })
    })
})
