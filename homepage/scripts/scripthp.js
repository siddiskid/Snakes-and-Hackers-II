const abab=document.getElementById('initial')
const islands = document.getElementById('islands')
const logo = document.getElementById('logotop')
const ticc = document.getElementById('tictictic')
const p2 = document.getElementById('i1')

function showislands(){
    abab.hidden = true
    islands.style.display = 'flex'
    logo.style.display = 'block'
}

function startlevel1(){
    islands.style.display = 'none'
    ticc.style.display = 'block'
}

function startlevel2(){
    console.log('works')
}
