
const ul = document.querySelector('ul#guias')

async function load() {
    const res = await fetch("http://localhost:5000").then((content) => content.json())

    res.guias.map(({codigo, nome, foto, regiao}) => 
        loadGuias({codigo, nome, foto, regiao})) 
}

load()


function loadGuias({codigo, nome, foto, regiao}) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const trash = document.createElement('span')
    const imagemPessoa = new Image(80,80)
    imagemPessoa.src = foto
   

    a.innerHTML = nome
    trash.innerHTML = `\u{1F50D}`

    li.append(imagemPessoa)
    li.append(a)
    li.append(trash)
    ul.append(li)
}