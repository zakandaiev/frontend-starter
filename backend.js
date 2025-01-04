import Fastify from 'fastify';

const fastify = Fastify({
  logger: false,
});

fastify.addHook('onRequest', async (request, reply) => {
  reply.header('Access-Control-Allow-Origin', '*');
  reply.header('Access-Control-Allow-Methods', '*');

  reply.type('application/json');

  reply.code(200);
});

fastify.get('/', async (request) => {
  // eslint-disable-next-line
  console.log(request.params);

  return {
    status: 'success',
    payload: 'backend test',
  };
});

try {
  await fastify.listen({ port: 4173 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
