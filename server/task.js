const { NotFound } = require('http-errors');

module.exports = async (fastify) => {
  fastify.post('/tasks', {
    preValidation: fastify.authenticate,
    handler: async (req, reply) => {
      const { title, listId, index } = req.body
      const result = fastify.getList(listId);

      if (!result) {
        throw new NotFound(`list with id '${listId}' not found`);
      }
  
      const task = {
        id: new Date().getTime(),
        title
      };

      result.list.tasks.splice(index, 0, task);  
      return { ...task, index, listId };
    }
  });

  fastify.patch('/tasks/:id', {
    preValidation: fastify.authenticate,
    handler: async (req, reply) => {
      const { id } = req.params;
      let newTask = req.body;

      const result = fastify.getTask(parseInt(id));
      if (!result) {
        throw new NotFound(`task with id '${id}' not found`);
      }

      let listId = result.listId;
      const { task, index } = result;

      if (newTask.listId) {
        const newListId = parseInt(newTask.listId);

        // move to new list
        if (newListId !== listId) {
          const listResult = fastify.getList(newListId);
          if (!listResult) {
            throw new NotFound(`list with id '${newListId}' not found`);
          }

          const { list: oldList } = fastify.getList(listId);
          oldList.tasks.splice(index, 1);

          const { list: newList } = listResult;
          newTask = {
            id,
            title: newTask.title
          };
          newList.tasks.splice(newTask.index, 0, newTask);
          listId = newListId;
        }
      } else {
        // update task
        task.title = newTask.title;
        newTask = task;
      }

      return { ...newTask, listId };
    }
  })
}
