const slctbx = document.querySelector(".strtbx"),
slctbtnx = slctbx.querySelector(".startbtn .baba"),
plybrd = document.querySelector(".board"),
players = document.querySelector(".players"),
allbx = document.querySelectorAll("section span"),
rsltbxw = document.querySelector(".resultw"),
rsltbxld = document.querySelector(".resultld"),
wtxt = rsltbxw.querySelector(".win"),
ldtxt = rsltbxld.querySelector(".ld"),
rbtnw = rsltbxw.querySelector("button"),
rbtnld = rsltbxld.querySelector("button");
bwin= false
window.onload = ()=>{
    for (let i = 0; i < allbx.length; i++) {
       allbx[i].setAttribute("onclick", "clickedBox(this)");
    }
}
slctbtnx.onclick = ()=>{
    slctbx.classList.add("hide");
    plybrd.classList.add("show");
}

let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X",
runBot = true;
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    plybrd.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}
function bot(){
    let array = [];
    if(runBot){
        playerSign = "O";
        for (let i = 0; i < allbx.length; i++) {
            if(allbx[i].childElementCount == 0){
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if(array.length > 0){
            if(players.classList.contains("player")){ 
                playerSign = "X";
                allbx[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                allbx[randomBox].setAttribute("id", playerSign);
                players.classList.add("active");
            }else{
                allbx[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                allbx[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allbx[randomBox].style.pointerEvents = "none";
        plybrd.style.pointerEvents = "auto";
        playerSign = "X";
    }
}
function getIdVal(classname){
    return document.querySelector(".b" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){
    if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
        runBot = false;
        bot(runBot);
        
        if (playerSign == 'X'){
            localStorage.setItem('firstlevelcompleted', 'true')
            wtxt.innerHTML = `You beat Galatron! <br>
            "I was just warming up, see if you can beat me in the next one"`;
            setTimeout(()=>{
                rsltbxw.classList.add("show");
                plybrd.classList.remove("show");
            }, 700);
        } else {
            bwin = true
            ldtxt.innerHTML = `You lost!`;
            setTimeout(()=>{
                rsltbxld.classList.add("show");
                plybrd.classList.remove("show");
            }, 700);
        }
    }else{
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false;
            bwin =true
            bot(runBot);
            setTimeout(()=>{
                rsltbxld.classList.add("show");
                plybrd.classList.remove("show");
            }, 700);
            ldtxt.textContent = "Match has been drawn!";
        }
    }
}

if (bwin == false){
    rbtnw.onclick = ()=>{
        window.location.href = '../planets.html'
    }
}