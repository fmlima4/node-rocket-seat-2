import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions.js';

const app = fastify();

app.register(transactionsRoutes, {
  prefix: 'transactions'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on port 3333!');
  });