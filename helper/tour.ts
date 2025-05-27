import * as supertest from 'supertest';
import {faker} from "@faker-js/faker";
const request = supertest('http://localhost:8001/api/v1')
export function tourData () {
        const randomName = createRandomName();
        return {
                name: randomName.name,
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
                        coordinates: [-74.005974, 40.712776], // [longitude, latitude]
                }
        }
}

export function getTourDataWithout(field: string) {
        const data = {
                name: faker.string.uuid(),
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
        };

        delete data[field];
        return data;
}

export function createRandomName(){
        return {
                name: faker.string.uuid()
        }
}
export function createTour(cookie?: string, data?: any) {
        return request.post('/tours')
            .set("Cookie", cookie)
            .send(data)
}

