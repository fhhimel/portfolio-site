// controllers/todoController.js
const Todo = require("../models/Todo");

const todoController = {
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createTodo: async (req, res) => {
    try {
      const { title, description } = req.body;
      const todo = new Todo({ title, description });
      await todo.save();
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const todo = await Todo.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
      );
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = todoController;
