process.env.NODE_ENV = "test";

const request = require('supertest');
const app = require('./app')
let items = require('./fakeDb')

let test1 = {name: 'popsicle', price: 1.45}

beforeEach(function(){
    items.push(test1);
});

afterEach(function(){
    items.length = 0;
})

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [test1]})
    })
})

describe("POST /items", () => {
    test("create an item", async () => {
        const res = await request(app)
        .post("/items")
        .send({name: 'cheerios', price: 3.40});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({items: {name: 'cheerios', price: 3.40} })
    })
})

describe("GET /items/:name", () => {
    test("find an item", async () => {
        const res = await request(app).get(`/items/${test1.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: test1})
    })
})

describe("Patch /items/:name", () => {
    test("update an item", async () => {
        const res = await request(app)
        .patch(`/items/${test1.name}`)
        .send({name: 'bread', price: 1.25});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item: {name: 'bread', price: 1.25}})
    })
})

describe("Delete /items/:name", () => {
    test("delete an item", async () => {
        const res = await request(app).delete(`/items/${test1.name}`)
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"})
    })
})