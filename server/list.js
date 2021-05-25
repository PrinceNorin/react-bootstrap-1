module.exports = async (fastify) => {
  fastify.patch('/list/:id', {
    preValidation: fastify.authenticate,
    handler: async (req, reply) => {
      const { id } = req.params;
      const { board } = fastify.internalData;
      const { index } = req.body;
  
      const currentListIndex = board.lists.findIndex(list => list.id === parseInt(id));
      const currentList = board.lists[currentListIndex];
      const moveList = board.lists[index];
  
      board.lists[currentListIndex] = moveList;
      board.lists[index] = currentList;
  
      return { success: true };
    }
  });
}
