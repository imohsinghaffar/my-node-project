import { Router } from 'express';
import { deleteTodos, getTodos, postTodos, updateTodos } from '../controllers/todoControllers.js';

const router = Router();


//POST request
router.post("/todo", postTodos);
  
  //GET request
  router.get("/get", getTodos);
  
  // //PATCH request
  router.patch("/update/:id", updateTodos);
  
  //DELETE request
  router.delete("/delete/:id", deleteTodos);

export default router;