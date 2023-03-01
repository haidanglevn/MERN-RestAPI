import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  // const text = req.body.text; TS doesnt know what req.body is, so we have to type it as follow:
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);
  res.status(201).json({ message: "Create the todo", createTodo: newTodo });
};

export const getTodo: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};
