const http = require('http')
//const URL = require('url')
const content = require('./guias.json')
//const path = require('path')

const portNumber = 5000

http.createServer((req,res) => {

    res.writeHead(200,{
        'Access-Control-Allow-Origin': '*'
    })

    return res.end(JSON.stringify(content))

}).listen(portNumber,() => console.log(`Server Api is Running - Port: ${portNumber}`))