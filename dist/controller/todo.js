"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.getTodo = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const uuid_1 = require("uuid");
const TODOS = [];
const createTodo = (req, res, next) => {
    // const text = req.body.text; TS doesnt know what req.body is, so we have to type it as follow:
    const text = req.body.text;
    const newTodo = new todo_1.Todo((0, uuid_1.v4)(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created a todo", todos: TODOS });
};
exports.createTodo = createTodo;
const getTodo = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodo = getTodo;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo!");
    }
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "updated", todos: TODOS });
};
exports.updateTodo = updateTodo;
const removeTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    delete TODOS[todoIndex];
    res.json({ message: "deleted", todos: TODOS });
};
exports.removeTodo = removeTodo;
