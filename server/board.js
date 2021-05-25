module.exports = (fastify, options, done) => {
  fastify.get('/board', {
    preValidation: fastify.authenticate,
    handler: async (req, reply) => {
      return fastify.internalData.board;
    }
  });

  done();
}
