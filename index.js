//Now we create express server
const express = require('express');
const path = require('node:path');
const app = express();
const filePath = path.join(__dirname, '/data/todos.json');
const port = 8000;
const fs = require('fs')
// require('dotenv').config;

app.use(express.json());

//Reading file
const readTodos = ()=>{
//2nd way
            const data = fs.readFileSync(filePath, 'utf-8');
            const parsedData = JSON.parse(data);
            return parsedData;
    }

//Adding each task in todo
const addTodo = (todo)=>{
    const todoList = readTodos();
    const newTodo = {...todo, id:todoList.length + 1};  
    todoList.push(newTodo)
    const stringifyData = JSON.stringify(todoList);
   fs.writeFileSync(filePath, stringifyData, 'utf-8'); //one way here both are correct
   
    // fs.writeFile(filePath, stringifyData, err =>{  //one way this
    //     if(err)
    //     {
    //         return false
    //     }
    //     return true
    // })
}


//POST request
app.post('/todo', (req,res)=>{
    const body =req.body;
    console.log(body)
    // console.log(body);  //we get undefined in console because we are not handling json data so for that we have to parse data.
    addTodo(body);
    return res.json({success:true})
});

//GET Method
app.get('/todos', (req,res)=>{
    const dataList = readTodos();
    return res.json({data:dataList});
});

// //PATCH Method
app.patch('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
  
    // Read file and parse
    const fileData = fs.readFileSync(filePath, 'utf-8');
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
    fs.writeFileSync(filePath, stringify, 'utf-8');
  
    res.send(`Todo with ID ${id} has been updated`);
  });
  


//DELETE Method
app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = fs.readFileSync(filePath, 'utf-8');

    const todos = JSON.parse(data);

    const filterData = todos.filter(todo=>todo.id!==id);

    const stringifyData = JSON.stringify(filterData);
    fs.writeFileSync(filePath, stringifyData, 'utf-8');

    res.send(`Record with id ${id} is deleted successfully`);
  });



app.listen(port, (req,res)=>{
    console.log('Server is running at port', port);
})