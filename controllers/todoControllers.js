import { addTodo, readTodos } from "../utils/todoFucntions.js";
import express from 'express';
const app = express();
app.use(express.json());
import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '../utils/data/todos.json')

export const postTodos =  async(req, res) => {
    const body = req.body;
    try {
      await addTodo(body);
      return res.json({ success: true, message: 'Data is posted successfully.' });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Error saving data.' });
  }
  };

  export const getTodos = async (req, res) => {
    const dataList = await readTodos();
    return res.json({ data: dataList, success: true });
  };

  export const updateTodos = (req, res) => {
    const id = req.params.id;
    const body = req.body;
  
    // Read file and parse
    const fileData = fs.readFileSync(filePath, "utf-8");
    const todoList = JSON.parse(fileData);
  
    // Update the todo inside the array
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...body };
      }
      return todo;
    });

    // Write the full updated array back to file
    const stringify = JSON.stringify(updatedTodos);
    fs.writeFileSync(filePath, stringify, "utf-8");
  
    res.send(`Todo with ID ${id} has been updated`);
  };

  export const deleteTodos = (req, res) => {
    const id = req.params.id;
    const data = fs.readFileSync(filePath, "utf-8");
  
    const todos = JSON.parse(data);
  
    const filterData = todos.filter((todo) => todo.id !== id);

    const todoExists = todos.some(todo => todo.id === id);
  
    if (todoExists) {
      const stringifyData = JSON.stringify(filterData);
      fs.writeFileSync(filePath, stringifyData, "utf-8");
      res.send(`Record with id ${id} is deleted successfully`);
    } else {
      res.status(500).send(`Record with id ${id} does not exist`);
    }
  }