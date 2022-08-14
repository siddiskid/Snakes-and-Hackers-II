const startbtn = document.getElementById('startbtn') 

startbtn.onclick = ()=>{
    localStorage.setItem('firstlevelcompleted', 'false')
    localStorage.setItem('secondlevelcompleted', 'false')
    localStorage.setItem('thirdlevelcompleted', 'false')
    window.location.href='index.html'
}