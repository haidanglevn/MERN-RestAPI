"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.getTodo = exports.createTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const TODOS = [];
const createTodo = async (req, res, next) => {
    try {
        const data = req.body;
        console.log("data ", data);
        let todos = await todo_1.default.create(data);
        return res.status(200).json({ message: "Created a todo", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
    // const text = req.body.text; TS doesnt know what req.body is, so we have to type it as follow:
    /* const text = (req.body as { text: string }).text;
    const newTodo = new Todo(uuidv4(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: "Created a todo", todos: TODOS }); */
};
exports.createTodo = createTodo;
const getTodo = async (req, res, next) => {
    try {
        let todos = await todo_1.default.find({});
        return res.status(200).json({ data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getTodo = getTodo;
const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        let todos = await todo_1.default.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ message: "updated", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateTodo = updateTodo;
const removeTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        let todos = await todo_1.default.findByIdAndDelete(id);
        return res.status(200).json({ message: "deleted", data: todos });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.removeTodo = removeTodo;
