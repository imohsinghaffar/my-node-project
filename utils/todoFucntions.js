import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, './data/todos.json');

export const readTodos = async()=>{
        const response = await fs.promises.readFile(filePath, 'utf-8'); //2nd way:simple and short
        return JSON.parse(response);
    }

    //Sync way of adding task to todo
    // const addTodo = async(todo)=>{
    //     const todoList = await readTodos();
    //     const newTodo = {...todo, id:todoList.length + 1};  
    //     todoList.push(newTodo)
    //     const stringifyData = JSON.stringify(todoList);
    //    fs.writeFileSync(filePath, stringifyData, 'utf-8'); //one way here both are correct
    // }

// async way of adding task to todo
export const addTodo = async(todo)=>{
        const todoList = await readTodos();
        const newTodo = {...todo, id:uuidv4()};
        todoList.push(newTodo);
        const stringifyData = JSON.stringify(todoList); //must care here, change data to object from todoList not newTodo its already object
        await fs.promises.writeFile(filePath, stringifyData, 'utf-8');
    }

   
    


