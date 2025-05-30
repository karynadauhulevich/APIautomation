import {deleteFunction, getUser, signUp} from "../../helper/user";
import {createTour, getTourDataWithout, tourData} from "../../helper/tour";
import * as supertest from "supertest";

const request = supertest('http://localhost:8001/api/v1');
let cookie: string;

describe('CREATE TOUR', () => {
    beforeAll(async () => {
        const USER = await getUser("admin");
        const res = await signUp(USER);
        cookie = res.headers['set-cookie'][0].split(";")[0];
    });
    afterAll(async()=>{
        const deleteRes = await deleteFunction(cookie)
        console.log("Delete message", deleteRes.body.message)
    })
describe("POSITIVE TESTS", () => {
    it.skip("create tour", async () => {
        const userImport = getUser("admin");
        console.log("USER Import", userImport);
        await signUp(userImport).then((res) => {
            expect(res.statusCode).toBe(201);
            expect(res.body.data.user.email).toEqual(userImport.email.toLowerCase());
            cookie = res.headers['set-cookie'][0].split(";")[0];
        });

        await request
            .post("/tours")
            .set("Cookie", cookie)
            .send({
                name: "TourForn75",
                duration: 10,
                description: "Could be",
                maxGroupSize: 10,
                summary: "Test tour",
                difficulty: "easy",
                price: 100,
                rating: 4.8,
                imageCover: "tour-3-cover.jpg",
                ratingsAverage: 4.9,
                guides: [],
                startDates: ["2024-04-04"],
                startLocation: {
                    type: "Point",
                    coordinates: [-74.005974, 40.712776],
                },
            }).then(tourRes => {
                console.log(tourRes.body, 'TOURREEESS');
                expect(tourRes.statusCode).toBe(201);
                expect(tourRes.body.data.difficulty).toBe("easy");
            });
    });

    it("create tour using async", async () => {
        const data = tourData();
        const resp = await createTour(cookie, data);
        expect(resp.statusCode).toBe(201);
        expect(resp.body.data.description).toEqual(data.description);
    });

    it("create tour using async, catch try", async () => {
        try {
            const data = tourData();
            const resp = await createTour(cookie, data);
            console.log("CREATE TOUR RESPONSE:", resp.body);
            expect(resp.statusCode).toBe(201);
            expect(resp.body.data.description).toEqual(data.description);
            expect(resp.body.data.name).toEqual(data.name);
        } catch (error) {
            console.error("Error during create tour", error);
            throw error;
        }
    });

    it("create tour using then", (done) => {
        const data = tourData();
        createTour(cookie, data)
            .then((resp) => {
                console.log("CREATE TOUR RESPONSE:", resp.body);
                expect(resp.statusCode).toBe(201);
                expect(resp.body.data.description).toEqual(data.description);
                expect(resp.body.data.name).toEqual(data.name);
                done();
            })
            .catch((error) => {
                done(error);
            });
    });
    it("create tour using done", (done) => {
        const data = tourData();
        createTour(cookie, data)
            .expect(201)
            .end((err,resp)=>{
                if(err) return done(err)
                expect(resp.body.data.description).toEqual(data.description);
                expect(resp.body.data.name).toEqual(data.name);
                done()

            })
})
})
    describe('NEGATIVE TESTS NO NAME', () => {
        it ('should not sign up user using async catch try',async()=>{
           try {
               const data = getTourDataWithout("name")
               const resp = await createTour(cookie, data)
               expect(resp.statusCode).toBe(400);
               expect(resp.body.message).toEqual("A tour must have a name");
           }
           catch(err){
               console.error("Error during create tour", err);
               throw err;
           }
        })
        it ('should not sign up user using then',(done)=>{
                const data = getTourDataWithout("name")
                createTour(cookie, data)
                    .then((resp)=>{
                expect(resp.statusCode).toBe(400);
                expect(resp.body.message).toEqual("A tour must have a name");
                 done()
        })
        })
        it ('should not sign up user using done end',(done)=>{
            const data = getTourDataWithout("name")
            createTour(cookie, data)
                .end((err, resp)=>{
                    if(err) return done(err)
                    expect(resp.statusCode).toBe(400);
                    expect(resp.body.message).toEqual("A tour must have a name");
                    done()
                })
        })
    })
    describe('NEGATIVE TESTS EMPTY BODY', () => {
        it ('should not sign up user using async catch try',async()=>{
            try {
                const resp = await createTour(cookie)
                expect(resp.statusCode).toBe(400);
                expect(resp.body.message).toEqual("Request body cannot be empty");
            }
            catch(err){
                console.error("Error during create tour", err);
                throw err;
            }
        })
        it("should not sign up user using then done", (done)=>{
            createTour(cookie)
                .expect(400)
                .then((res)=>{
                    expect(res.statusCode).toBe(400);
                    expect(res.body.message).toEqual("Request body cannot be empty");

                })
                .catch((err)=>{
                    console.error("Error during create tour", err);
                })
            done()
        })
        it('should sign up user using end',(done)=>{
            createTour(cookie)
                .end((err,resp)=>{
                    if(err)return done(err)
                    try {
                        expect(resp.statusCode).toBe(400);
                        expect(resp.body.message).toEqual("Request body cannot be empty");
                    }
                    catch(err){
                        console.error("Error during create tour", err);
                        throw err;
                    }
                    done()
                })
        })
    })
             describe('NEGATIVE TESTS unauthorised user', () => {
                 it('should not sign up user using async catch try',async()=>{
                     const data = getTourDataWithout("name")
                     const resp = await createTour('rkrkrkrkrk',data)
                     try{
                         expect(resp.statusCode).toBe(401);
                         expect(resp.body.message).toEqual("You are not logged in! Please log in to get access.");
                     }
                     catch(err){
                         console.error("Error during create tour", err);
                         throw err;
                     }
                 })
                 it('should not sign up user using end done',(done)=>{
                     const data = getTourDataWithout("name")
                     createTour('rkrkrkrkrk',data)
                         .end((err, resp)=>{
                             if(err) {return done(err)}
                             expect(resp.statusCode).toBe(401);
                             expect(resp.body.message).toEqual("You are not logged in! Please log in to get access.");
                             done()
                         })
                 })
                 it('should not sign up user using then done',(done)=>{
                     const data = getTourDataWithout("name")
                     createTour('rkrkrkrkrk',data)
                         .then((resp)=>{
                             expect(resp.statusCode).toBe(401);
                             expect(resp.body.message).toEqual("You are not logged in! Please log in to get access.");
                             done()
                         })
                 })


             })
    });


