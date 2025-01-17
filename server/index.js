const fs = require('fs');
const util = require('util');
const { resolve } = require('path');
const readFile = util.promisify(fs.readFile);
const { Unauthorized } = require('http-errors');
const fastify = require('fastify')({
  logger: true
});

fastify.register(require('fastify-cors'), {
  origin: '*',
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: [
    'Authorization',
    'Content-Type'
  ]
});

fastify.register(require('fastify-jwt'), {
  secret: 'secret123',
  sign: {
    expiresIn: '7d'
  }
});

fastify.register((fastify, _options, next) => {
  fastify.get('/verify', {
    handler: (req, reply) => {
      reply.send(req.user);
    },
    preValidation: fastify.authenticate
  });

  next();
});

fastify.post('/token', (req, reply) => {
  const { email, password } = req.body;
  if (email !== 'admin@example.com' || password !== 'admin') {
    throw new Unauthorized('Invalid username or password');
  }

  const payload = {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com'
  };

  reply.send({ token: fastify.jwt.sign({ payload }) });
});

fastify.decorate('authenticate', async (req, _reply) => {
  try {
    await req.jwtVerify()
  } catch (err) {
    if (err.statusCode) {
      throw err;
    }
    throw new Unauthorized(e.message);
  }
});

fastify.decorate('getList', (id) => {
  const { lists } = fastify.internalData.board;
  const index = lists.findIndex(list => list.id === id);
  if (index !== -1) {
    return {
      index,
      list: lists[index]
    };
  }
});

fastify.decorate('getTask', (id) => {
  const { board } = fastify.internalData;
  for (let i = 0; i < board.lists.length; i++) {
    const tasks = board.lists[i].tasks || [];
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
      return {
        listId: board.lists[i].id,
        index: taskIndex,
        task: tasks[taskIndex]
      }
    }
  }
});

fastify.register(require('./board'));
fastify.register(require('./list'));
fastify.register(require('./task'));

const start = async () => {
  try {
    const file = resolve(__dirname, 'data', 'board.json');
    const data = await readFile(file);
    fastify.decorate('internalData', { board: JSON.parse(data) });

    await fastify.listen(3001);
  } catch (err) {
    fastify.log(err);
    process.exit(1);
  }
}

start();
