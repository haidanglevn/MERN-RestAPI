import { Router } from "express";
import { getTodo ,createTodo } from "../controller/todo";

const router = Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.patch("/:id");
router.delete("/:id");

export default router;