import { Router } from "express";
import { getTodo ,createTodo, updateTodo, removeTodo } from "../controller/todo";

const router = Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", removeTodo);

export default router;