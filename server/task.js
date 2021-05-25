module.exports = async (fastify) => {
  fastify.post('/tasks', {
    preValidation: fastify.authenticate,
    handler: async (req, reply) => {
      const { title, listId, index } = req.body
      const { board } = fastify.internalData;
  
      const currentListIndex = board.lists.findIndex(list => list.id === listId);
      const currentList = board.lists[currentListIndex];
      const task = {
        id: new Date().getTime(),
        title
      };

      currentList.tasks.splice(index, 0, task);  
      return { ...task, index, listId };
    }
  });
}
