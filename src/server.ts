import fastify from 'fastify'
import { database } from './database.js';

const app = fastify();

app.get('/hello', async () => {

  const tables = await database('sqlite_schema')
  .select('name')
  .where('type', 'table');

  console.log(tables);  


  return 'Hello World';
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on port 3333!');
  });