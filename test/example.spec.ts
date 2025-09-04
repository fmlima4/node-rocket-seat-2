import { expect, it, beforeAll, afterAll, describe } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe('Transactions routes', () => {

    beforeAll(async () => {
        await app.ready()
    });
    
    afterAll(async () => {
        await app.close()
    });

    it('user create new transaction', async () => {
        const response = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 100,
            type: 'credit'
        })

        expect(response.statusCode).toBe(201)
    })  

    it('user can list all transactions', async () => {
        const createTransactionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 100,
            type: 'credit'
        })

        const cookies = createTransactionResponse.get('Set-Cookie') 

        const response = await request(app.server).get('/transactions').set('Cookie', cookies)
        console.log(response.body)
        expect(response.statusCode).toBe(200)
    })

    it('user can get a specific transaction', async () => {
        const createTransactionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 100,
            type: 'credit'
        })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await request(app.server).get('/transactions/1').set('Cookie', cookies)
        expect(response.statusCode).toBe(200)
    })

    it('user can get the summary of all transactions', async () => {
        const createTransactionResponse = await request(app.server).post('/transactions').send({
            title: 'New transaction',
            amount: 100,
            type: 'credit'
        })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const response = await request(app.server).get('/transactions/summary').set('Cookie', cookies)
        expect(response.statusCode).toBe(200)
    })  
})