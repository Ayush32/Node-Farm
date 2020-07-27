/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const fs = require('fs');
const http = require('http')
const url = require('url');

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
// synchronous code
// api sending route

const replaceTemplate = (temp, product) => {
    let output  = temp.replace(/{% PRODUCTNAME %}/g, product.productName)
    output = output.replace(/{% IMAGE %}/g, product.image);
    output = output.replace(/{% PRICE %}/g, product.price);
    output = output.replace(/{% QUANTITY %}/g, product.quantity);
    output = output.replace(/{% FROM %}/g, product.from);
    output = output.replace(/{% NUTRIENTS %}/g, product.nutrients);
    output = output.replace(/{% DESCRIPTION %}/g, product.description);
    output = output.replace(/{% ID %}/g, product.id);

    if(!product.organic)
    output = output.replace(/{% NOT_ORGANIC %}/g, 'not-organic');
    return output;
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);
// / /
const server = http.createServer((req, res) => {
    const pathName = req.url;

    // overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            "Content-type": "text/html"
        });

        const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
        const output = tempOverview.replace('{% PRODUCT_CARDS %}', cardsHtml);
        // console.log(cardsHtml)
        res.end(output)
    }
    // product page
    else if (pathName === '/product') {

        res.end('This is the Products')
    }
    // API
    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    }
    // Not found
    else {
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