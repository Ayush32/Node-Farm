/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const fs = require('fs');
const http = require('http')
const url = require('url')
// asynchronous non blocking code
// const fs = require('fs');
// fs.readFileSync('.input.txt', 'utf-8', (err,data) {
//     console.log(data);
// } )
// console.log('Reading File......')

// synchronous blocking code 
// const textOut = ` This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file  written')

//////////////////////
//server

// asynchronous way code, Non- Blocking code

// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err){
//         console.log('Error')
//     }
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//          console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("File is written 😄 🤣");

//             })
//     })  
// }) 
// });

// console.log('Will read file') 

const server = http.createServer((req, res) => {
    const pathName =  req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is the overview')
    }
    else if(pathName == '/products'){
        res.end('This is the Products')
    }
    else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end("<h1>page not found</h1>");
    }
    res.end('Hello From the server')
});
server.listen(8000, '127.0.0.1', () => {
    console.log('LIST TO REQUEST ON PORT 8000')
});



