const http = require('http')
const URL = require('url')
const guias = require('./guias.json')
const agendamento = require('./agendamentos.json')
const path = require('path')
const fs = require('fs')

const portNumberApi1 = 5000
const portNumberApi2 = 3800

http.createServer((req,res) => {

    res.writeHead(200,{
        'Access-Control-Allow-Origin': '*'
    })

    return res.end(JSON.stringify(guias))

}).listen(portNumberApi1,() => console.log(`Server Api Guias is Running - Port: ${portNumberApi1}`))


http.createServer((req,res) => {
    const { codigo, nome, foto, dataInicio, dataFim, regiao, del } = URL.parse(req.url,true).query
    
    res.writeHead(200,{
        'Access-Control-Allow-Origin': '*'
    })

    //All Resources
    if(!codigo || !nome)
        return res.end(JSON.stringify(agendamento))

    //Delete
    if(del){
        console.log(`delete dedicante: ${codigo}`)
        agendamento.agendamentos = agendamento.agendamentos.filter(item => String(item.codigo) !== String(codigo))
        
        return writeFile((message) => {
            res.end(message)
        })
    }

    //Create
    agendamento.agendamentos.push({codigo, nome, foto, dataInicio, dataFim, regiao})
        console.log(`adding dedicante: ${codigo} - ${nome}`)
        return writeFile((message) => res.end(message))

}).listen(portNumberApi2,() => console.log(`Server Api Agendamento is Running - Port: ${portNumberApi2}`))


function writeFile(newPlanning){
    fs.writeFile(
        path.join(__dirname,'agendamentos.json'),
        JSON.stringify(agendamento,null,2),
        err => {
            if(err) throw err

            newPlanning(JSON.stringify({message: 'ok'}))
        }
    )
}