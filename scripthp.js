const head = document.getElementsByTagName('HEAD')[0]
linkk1 = document.createElement('link')
linkk2 = document.createElement('link')
linkk3 = document.createElement('link')

ab = localStorage.getItem('firstlevelcompleted')
cd = localStorage.getItem('secondlevelcompleted')
ef = localStorage.getItem('thirdlevelcompleted')

if (ab=='true'){
    document.getElementById('ii2').src='images/p2.png'
    linkk1.rel = 'stylesheet'
    linkk1.type = 'text/css'
    linkk1.href = 'styles/p2hover.css'
    head.appendChild(linkk1)
}

if (cd == 'true'){
    document.getElementById('ii3').src='images/p3.png'
    linkk2.rel = 'stylesheet'
    linkk2.type = 'text/css'
    linkk2.href = 'styles/p3hover.css'
    head.appendChild(linkk2)
}

if (ef == 'true'){
    document.getElementById('ii4').src='images/p4.png'
    linkk3.rel = 'stylesheet'
    linkk3.type = 'text/css'
    linkk3.href = 'styles/p4hover.css'
    head.appendChild(linkk3)
}