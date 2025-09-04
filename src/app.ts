import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions.js';
import fastifyCookie from '@fastify/cookie';

const app = fastify();

app.register(fastifyCookie)
app.register(transactionsRoutes, {
  prefix: 'transactions'
})

export { app }