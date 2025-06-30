const http = require('http');
const port = 3000;

const fs = require('fs')

const server = http.createServer((req,res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Node http server</h1>');
    res.end();
});

server.listen(port,()=>{
    console.log('Server is listening at', port)
})

fs.writeFile('textfile.txt','Hello this is text file', (err)=>{
        if(err)
        {
            console.log('Error in Writing file', err)
        }
        else
        {
            console.log('File write Successfully');
        }
})

fs.readFile('textfile.txt', 'utf8', (err, data)=>{
        if(err)
        {
            console.log('File not found', err);
        }
        else{
            console.log('Your file data is:', data)
        }
})

fs.appendFile('textfile.txt', '\n This is new line added in the exisiting file', (err)=>{
    if(err)
    {
        console.log('Data is not appended', err);
    }
    else{
        console.log('Data updated successfully')
    }
})

fs.readFile('textfile.txt', 'utf8', (err, data)=>{
    if(err)
    {
        console.log('File is not readable');
    }
    else
    {
        console.log('Updated file:', data);
    }
})