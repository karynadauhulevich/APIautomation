import {User} from "../../helper/interface";
import{getUser, login,login2, signUp, deleteFunction, signUp2, deleteFunction2} from "../../helper/user";import * as supertest from "supertest";
const request = supertest ("http://localhost:8001/api/v1");

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
    it('should signup, login and delete user using .then',()=>{
        return signUp(user)
            .then((res)=>{
                expect(res.statusCode).toBe(201)
                expect(res.body.data.user.email).toBe(user.email)
                expect(res.body.status).toEqual('success')
                return login(user)
            })
            .then((loginRes=>{
                expect(loginRes.statusCode).toBe(200)
                expect(loginRes.body.status).toBe('success')
                cookie = loginRes.headers['set-cookie'][0].split(";")[0]
            }))
    })
    it('should signup, login and delete the user using .end (done callback)', (done) => {
        // Регистрация пользователя
        signUp2(user)
            .end((err, res) => {
                if (err) return done(err);

                // Проверяем успешную регистрацию
                console.log('GGGGG', res.body);
                expect(res.statusCode).toBe(201);
                expect(res.body.data.user.email).toEqual(user.email);

                // Выполняем логин
                login2(user)
                    .end((err, loginRes) => {
                        if (err) return done(err);

                        // Проверяем успешный логин
                        expect(loginRes.statusCode).toBe(200);
                        expect(loginRes.body.status).toBe("success");

                        // Получаем куки из заголовка
                        console.log("cookie", loginRes.headers["set-cookie"][0]);
                        const cookie = loginRes.headers["set-cookie"][0].split(";")[0];

                        // Вызываем функцию удаления пользователя
                        return deleteFunction2(cookie)
                            .end((err, deleteRes) => {
                                if (err) return done(err);

                                // Проверяем успешное удаление пользователя
                                expect(deleteRes.statusCode).toBe(200);
                                expect(deleteRes.body.message).toBe("User deleted successfully");

                                // Пробуем залогиниться после удаления
                                login2(user)
                                    .end((err, loginAfterDelete) => {
                                        if (err) return done(err);

                                        // Проверяем, что логин не удался после удаления
                                        expect(loginAfterDelete.statusCode).toBe(401);
                                        expect(loginAfterDelete.body.message).toBe("Incorrect email or password");

                                        // Закрываем тест
                                        done();
                                    });
                            });
                    });
            });
    });

})
})