process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../app");
const Book = require("../models/book");

const db = require("../db")




let testBook;
beforeEach(async () => {
    let book = await Book.create({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
    })
    // let invoices = await db.query(`INSERT INTO invoices ()`)
    testBook = book
    // testInvoice = invoices.rows[0]
})

afterEach(async () => {
    await db.query(`DELETE FROM books`)
})

afterAll(async () => {
    await db.end()
})

describe("testing books", () => {
    test("TEST", () => {
        console.log(testBook);
        expect(1).toBe(1);
    })
})

describe("testing /books routes", () => {
    test("body matches db", async () => {
        const response = await request(app).get(`/books`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            "books": [{
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
            }]
        })
    })

    test("creating a new book", async () => {
        const response = await request(app).post("/books").send({
            "isbn": "1",
            "amazon_url": "http://a.co",
            "author": "Matthew",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
        })
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            "book": {
                "isbn": "1",
                "amazon_url": "http://a.co",
                "author": "Matthew",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
            }
        })
    })
})