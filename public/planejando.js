const txtStartDate = document.querySelector('input#txtStartDate')
const txtEndDate = document.querySelector('input#txtEndDate')
const selDedicantes = document.querySelector('select#selDedicantes')
const btnAdd = document.querySelector('span#btnAdd')
const ulGuias = document.querySelector('ul#ulGuias')

let listaDedicantes = []

btnAdd.innerHTML = `\u{2795}`
btnAdd.addEventListener('click',addDedicantes)



function addDedicantes(){
    /*
    const dadosDedicante = selDedicantes.value.split('|')
    const idDedicante = dadosDedicante[0]
    const nomeDedicante = dadosDedicante[1]
    const fotoDedicante = dadosDedicante[2]
    const regiaoDedicante = dadosDedicante[3]
    */

    const [codigo, nome, foto, regiao] = selDedicantes.value.split('|')

    const existInList = listaDedicantes.filter((item) => {
        if (item.codigo == codigo) {
            return item
        }
    })

    console.log('Na lista: ',existInList)

    if(existInList.length > 0 ){
        alert('Dedicante já adicionado!')
        return
    }
    
    //fabricar dedicante
    let dataInicio = txtStartDate.value
    let dataFim = txtEndDate.value
    
    //Gravando no arquivo via API
    apiAddPlanning({codigo,nome,foto,dataInicio,dataFim,regiao})


}
    
function addPlanning({codigo, nome, foto, dataInicio, dataFim, regiao}){
    const dedicante = fabricarDedicante(codigo, nome,foto,dataInicio,dataFim,regiao)

    //inserindo no Array de Dedicantes
    listaDedicantes.push(dedicante)
    console.log(listaDedicantes)

 

    //Inserindo na página HTML
    const li = document.createElement('li')
    const imgFoto = new Image(50,50)
    const a = document.createElement('a')
    const span = document.createElement('span')
    const divParent = document.createElement('div')
    const divDates = document.createElement('div')

    imgFoto.src = foto
    a.innerHTML = nome
    span.innerHTML = `\u{1F5D1}`
    span.id = codigo

    divDates.style = 'font-size: 0.8rem;text-align: right'
    divDates.innerHTML = `<strong>Início:</strong> ${dataInicio} <br>`
    divDates.innerHTML += `<strong>Fim:</strong> ${dataFim}`

    divParent.appendChild(divDates) 
    
    span.onclick = () => deleteDedicante(span)

    li.append(imgFoto)
    li.append(a)
    li.append(divParent)
    li.append(span)

    ulGuias.appendChild(li)

}

async function loadAPISelect(){
    const res = await fetch('http://localhost:5000').then((content) => content.json())

    res.guias.map((item)=>
        addItemInSelect(item))
}

loadAPISelect()

async function loadAPIPlanning() {
    const res = await fetch('http://localhost:3800').then((content) => content.json())

    res.agendamentos.map((item) =>
        addPlanning(item))
}

loadAPIPlanning()


//inserir as pessoas no select
function addItemInSelect(item) {
    const optionItem = document.createElement('option')
    optionItem.text = item.nome
    optionItem.value = `${item.codigo}|${item.nome}|${item.foto}|${item.regiao}`
    selDedicantes.appendChild(optionItem)
}

function fabricarDedicante(codigo,nome,foto,dataInicio,dataFim,regiao){
    let dedicante = {}
    
    dedicante.codigo = codigo
    dedicante.nome = nome
    dedicante.foto = foto
    dedicante.dataInicio = dataInicio
    dedicante.dataFim = dataFim
    dedicante.regiao = regiao

    return dedicante
}

function deleteDedicante(element) {
    
    if(confirm('Você tem certeza que deseja excluir o dedicante?')){
        element.parentNode.remove()
        
        let codigo = element.id

        apiDelPlanning({codigo})

        listaDedicantes = listaDedicantes.filter((item) => {
            if(!(item.codigo == element.id)) return item
        })
    }
        
}

async function apiAddPlanning({codigo, nome, foto, dataInicio, dataFim, regiao}){
    const urlApi = new URL('http://localhost:3800')
    urlApi.search = new URLSearchParams({codigo, nome, foto, dataInicio, dataFim, regiao }).toString()
    await fetch(urlApi)
}

async function apiDelPlanning({codigo,nome, foto, dataInicio, dataFim, regiao}){
    const urlApi = new URL('http://localhost:3800')
    urlApi.search = new URLSearchParams({codigo,nome, foto, dataInicio, dataFim, del:1}).toString()
    await fetch(urlApi)
}