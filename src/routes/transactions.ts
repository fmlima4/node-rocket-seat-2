import type { FastifyInstance } from "fastify";
import z from "zod";
import { database } from "../database.js";

export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (request,reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debt'])
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        await database('trasactions').insert({
            id: crypto.randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        }).returning

        return reply.status(201).send();       
    });
}