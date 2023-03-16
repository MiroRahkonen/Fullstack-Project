const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req,res)=>{
    /*if(req.url === '/'){
        //Reading content of the index page and sending it to client
        fs.readFile(path.join('./','views','index.html'),(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(data)
        })
    }

    if(req.url === '/api/users'){
        const users = [
            {name: 'Random user', age: 30},
            {name: 'Another user', age: 12}
        ];
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(users));
    }*/

    // File path of html page
    let filePath = path.join('./','views', req.url === '/' ? 'index.html' : req.url);

    //Type of file
    let extname = path.extname(filePath)

    // Initial content type
    let contentType = 'text/html';

    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;

    }

    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code == 'ENOENT'){
                // Page not found
                fs.readFile(path.join('./','views','404.html'),(err,content)=>{
                    res.writeHead(200,{'Content-Type': 'text.html'});
                    res.end(content,'utf8');
                })
            }
            else{
                // Other errors
                res.writeHead(500);
                res.end(`Server  Error: ${err.code}`);
            }
        } 
        else{
            // Success
            res.writeHead(200,{'Content-Type': contentType});
            res.end(content,'utf8');
        }


    })
})


const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});