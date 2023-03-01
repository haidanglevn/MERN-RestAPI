import { RequestHandler } from "express";
import { Todo } from "../models/todo";
import {v4 as uuidv4} from "uuid";
const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  // const text = req.body.text; TS doesnt know what req.body is, so we have to type it as follow:
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(uuidv4(), text);
  TODOS.push(newTodo);
  res.status(201).json({ message: "Created a todo", todos: TODOS });
};

export const getTodo: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const updatedText = (req.body as {text: string}).text;
    const todoIndex = TODOS.findIndex((todo)=> todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error("Could not find todo!")
    }
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
    res.json({message: "updated", todos: TODOS})
}

export const removeTodo: RequestHandler<{id: string}> = (req,res,next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo)=> todo.id === todoId);

    delete TODOS[todoIndex];
    res.json({message: "deleted", todos: TODOS})
}    