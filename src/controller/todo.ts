import { RequestHandler } from "express";
import { TodoModel } from "../models/todo";
import Todo from "../models/todo";

const TODOS:typeof Todo[] = []
export const createTodo: RequestHandler = async (req, res, next) => {
    try {
        const data : TodoModel = req.body;
        console.log("data ", data);
        let todos = await Todo.create(data);
        return res.status(200).json({ message: "Created a todo", data: todos });
    }
    catch(err:any) {
        return res.status(500).json({message: err.message})
    }

  // const text = req.body.text; TS doesnt know what req.body is, so we have to type it as follow:
  /* const text = (req.body as { text: string }).text;
  const newTodo = new Todo(uuidv4(), text);
  TODOS.push(newTodo);
  res.status(201).json({ message: "Created a todo", todos: TODOS }); */
};

export const getTodo: RequestHandler = async (req, res, next) => {
    try {
      let todos = await Todo.find({});
      return res.status(200).json({ data: todos });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
};

export const updateTodo: RequestHandler= async (req, res, next) => {
    try {
      const { id } = req.params;
      let todos = await Todo.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "updated", data: todos });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
}
export const removeTodo: RequestHandler= async (req, res, next) => {
    try {
      const { id } = req.params;
      let todos = await Todo.findByIdAndDelete(id);
      return res.status(200).json({ message: "deleted", data: todos });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
}

