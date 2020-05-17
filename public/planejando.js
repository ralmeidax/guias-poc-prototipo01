const txtStartDate = document.querySelector('input#txtStartDate')
const txtEndDate = document.querySelector('input#txtEndDate')
const selDedicantes = document.querySelector('select#selDedicantes')
const btnAdd = document.querySelector('span#btnAdd')
const ulGuias = document.querySelector('ul#ulGuias')

let listaDedicantes = []

btnAdd.innerHTML = `\u{2795}`
btnAdd.addEventListener('click',addDedicantes)



function addDedicantes(){
    const dadosDedicante = selDedicantes.value.split('|')

    const idDedicante = dadosDedicante[0]
    const nomeDedicante = dadosDedicante[1]
    const fotoDedicante = dadosDedicante[2]
    const regiaoDedicante = dadosDedicante[3]


    const existInList = listaDedicantes.filter((item) => {
        if (item.codigo == idDedicante) {
            return item
        }
    })

    console.log('Na lista: ',existInList)

    if(existInList.length > 0 ){
        alert('Dedicante já adicionado!')
        return
    }
    
    //fabricar dedicante
    const dedicante = fabricarDedicante(idDedicante, nomeDedicante,fotoDedicante,txtStartDate.value,txtEndDate.value,regiaoDedicante)

    listaDedicantes.push(dedicante)

    console.log(listaDedicantes)

    const li = document.createElement('li')
    const imgFoto = new Image(50,50)
    const a = document.createElement('a')
    const span = document.createElement('span')

    imgFoto.src = fotoDedicante
    a.innerHTML = nomeDedicante
    span.innerHTML = `\u{1F5D1}`
    span.id = idDedicante
    
    //span.addEventListener('click',deleteDedicante(10))

    li.append(imgFoto)
    li.append(a)
    li.append(span)

    ulGuias.appendChild(li)




}

async function loadAPI(){
    const res = await fetch('http://localhost:5000').then((content) => content.json())

    res.guias.map((item)=>
        addItemInSelect(item))
}

loadAPI()


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

function deleteDedicante(id) {
    alert(id)
}