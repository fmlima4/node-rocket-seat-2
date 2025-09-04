import type { FastifyInstance } from "fastify";
import z from "zod";
import { database } from "../database.js";
import { randomUUID } from "node:crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id.js";

export async function transactionsRoutes(app: FastifyInstance) {
    //app.addHook('preHandler', checkSessionIdExists) // all routes will be checked for session id

    app.get('/', async (request, reply) => {
        const sessionId = request.cookies.sessionId

        const transactions = await database('transactions').select().where('session_id', sessionId)
        return reply.status(200).send({transactions})
    })

    app.get('/:id', async (request, reply) => {
        const sessionId = request.cookies.sessionId

        const getTransactionParamsSchema = z.object({
            id: z.string()
        })

        const { id } = getTransactionParamsSchema.parse(request.params)
        const transaction = await database('transactions').where('id', id).where('session_id', sessionId).first()
        return reply.status(200).send(transaction)
    })

    app.get('/summary', async (request, reply) => {
        const sessionId = request.cookies.sessionId

        const summary = await database('transactions').sum('amount', { as: 'amount' }).where('type', 'credit').where('session_id', sessionId).first()
        return reply.status(200).send({summary})
    })

    app.post('/', async (request,reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debt'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            })
        }

        const [transaction] = await database('transactions').insert({ 
            title,
            amount: type === 'credit' ? amount : amount * -1,
            type,
            session_id: sessionId
        }).returning('*') 

        return reply.status(201).send(transaction);
    });
}