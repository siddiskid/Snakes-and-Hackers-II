const wintxt = document.getElementById('win'),
ldtxt = document.getElementById('ld'),
rsltbxw = document.querySelector(".resultw"),
plybrd = document.getElementById('container'),
rsltbxld = document.querySelector(".resultld"),
baba = document.getElementById('baba'),
strtbx = document.getElementById('strtbx');

baba.onclick = () =>{
    plybrd.style.display = 'flex'
    strtbx.style.display = 'none'
}

/**
 * @jQuery version
 */
function Game() {
    this.rows = 6;
    this.columns = 7;
    this.status = 0;
    this.depth = 4;
    this.score = 100000,
    this.round = 0;
    this.winning_array = [];
    this.iterations = 0;
    
    that = this;

    that.init();
}

Game.prototype.init = function() {

    var game_board = new Array(that.rows);
    for (var i = 0; i < game_board.length; i++) {
        game_board[i] = new Array(that.columns);

        for (var j = 0; j < game_board[i].length; j++) {
            game_board[i][j] = null;
        }
    }

    this.board = new Board(this, game_board, 0);

    var game_board = "<col/><col/><col/><col/><col/><col/><col/>";
    for (var i = 0; i < that.rows; i++) {
        game_board += "<tr>";
        for (var j = 0; j < that.columns; j++) {
            game_board += "<td class='empty'></td>";
        }
        game_board += "</tr>";
    }

    document.getElementById('game_board').innerHTML = game_board;

    var td = document.getElementById('game_board').getElementsByTagName("td");

    for (var i = 0; i < td.length; i++) {
        if (td[i].addEventListener) {
            td[i].addEventListener('click', that.act, false);
        } else if (td[i].attachEvent) {
            td[i].attachEvent('click', that.act)
        }
    }
}

/**
 * On-click event
 */
Game.prototype.act = function(e) {
    var element = e.target || window.event.srcElement;

    if (!($('#coin').is(":animated"))) {
        if (that.round == 0) {
            that.place(element.cellIndex);
        }
    }
}

/**
 * Place coin
 */
Game.prototype.place = function(column) {

    if (that.board.score() != that.score && that.board.score() != -that.score && !that.board.isFull()) {
        for (var y = that.rows - 1; y >= 0; y--) {
            if (document.getElementById('game_board').rows[y].cells[column].className == 'empty') {
                if (that.round == 1) {
                    var coin_x = column * 51;
                    var coin_y = y * 51;
                    $('#coin').attr('class', 'cpu-coin').css({'left': coin_x}).fadeIn('fast').animate({'top': coin_y + 'px'}, 700, 'easeOutBounce', function() {
                        document.getElementById('game_board').rows[y].cells[column].className = 'coin cpu-coin';
                        $('#coin').hide().css({'top': '0px'});
                        
                        if (!that.board.place(column)) {
                            return alert("Invalid move!");
                        }

                        that.round = that.switchRound(that.round);
                        that.updateStatus();
                    });
                } else {
                    var coin_x = column * 51;
                    var coin_y = y * 51;
                    $('#coin').attr('class', 'human-coin').css({'left': coin_x}).fadeIn('fast').animate({'top': coin_y + 'px'}, 700, 'easeOutBounce', function() {
                        document.getElementById('game_board').rows[y].cells[column].className = 'coin human-coin';
                        $('#coin').hide().css({'top': '0px'});
                        that.generateComputerDecision();
                        
                        if (!that.board.place(column)) {
                            return alert("Invalid move!");
                        }

                        that.round = that.switchRound(that.round);
                        that.updateStatus();
                    });
                }
                break;
            }
        }
    }
}

Game.prototype.generateComputerDecision = function() {
    if (that.board.score() != that.score && that.board.score() != -that.score && !that.board.isFull()) {
        that.iterations = 0;
        document.getElementById('loading').style.display = "block";

        setTimeout(function() {

            var startzeit = new Date().getTime();

            var ai_move = that.maximizePlay(that.board, that.depth);

            var laufzeit = new Date().getTime() - startzeit;

            that.place(ai_move[0]);

            document.getElementById('loading').style.display = "none";
        }, 100);
    }
}

/**
 * Algorithm
 * Minimax principle
 */
Game.prototype.maximizePlay = function(board, depth, alpha, beta) {

    var score = board.score();

    if (board.isFinished(depth, score)) return [null, score];

    var max = [null, -99999];

    for (var column = 0; column < that.columns; column++) {
        var new_board = board.copy();

        if (new_board.place(column)) {

            that.iterations++;

            var next_move = that.minimizePlay(new_board, depth - 1, alpha, beta);

            if (max[0] == null || next_move[1] > max[1]) {
                max[0] = column;
                max[1] = next_move[1];
                alpha = next_move[1];
            }

            if (alpha >= beta) return max;
        }
    }

    return max;
}

Game.prototype.minimizePlay = function(board, depth, alpha, beta) {
    var score = board.score();

    if (board.isFinished(depth, score)) return [null, score];

    var min = [null, 99999];

    for (var column = 0; column < that.columns; column++) {
        var new_board = board.copy();

        if (new_board.place(column)) {

            that.iterations++;

            var next_move = that.maximizePlay(new_board, depth - 1, alpha, beta);

            if (min[0] == null || next_move[1] < min[1]) {
                min[0] = column;
                min[1] = next_move[1];
                beta = next_move[1];
            }

            if (alpha >= beta) return min;
        }
    }
    return min;
}

Game.prototype.switchRound = function(round) {

    if (round == 0) {
        return 1;
    } else {
        return 0;
    }
}

Game.prototype.updateStatus = function() {

    if (that.board.score() == -that.score) {
        that.status = 1;
        that.markWin();
    }

    if (that.board.score() == that.score) {
        that.status = 2;
        that.markWin();
    }

    if (that.board.isFull()) {
        that.status = 3;
    }

    var html = document.getElementById('status');
    // if (that.status == 0) {
    //     html.className = "status-running";
    //     html.innerHTML = "In Progress";
    // }
    if (that.status == 1) { win
        wintxt.innerHTML = 'You beat Galatron!'
        localStorage.setItem('thirdlevelcompleted', 'true')
        setTimeout(()=>{
            rsltbxw.classList.add("show");
            plybrd.style.display= 'none';
        }, 700);
    }
    if (that.status == 2) {
        ldtxt.innerHTML = 'You lost! <br> "You will never take these games back from me"'
        setTimeout(()=>{
            rsltbxld.classList.add("show");
            plybrd.style.display= 'none';
        }, 700);
    } 
    if (that.status == 3){
        ldtxt.innerHTML = 'You drew!'
        setTimeout(()=>{
            rsltbxld.classList.add("show");
            plybrd.style.display= 'none';
        }, 700);
    }
}

Game.prototype.markWin = function() {
    for (var i = 0; i < that.winning_array.length; i++) {
        var name = document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className;
        document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className = name + " win";
    }
}

Game.prototype.restartGame = function() {       
    that.status = 0;
    that.round = 0;
    that.init();
    rsltbxld.classList.remove("show");
    plybrd.style.display= 'block';
    that.updateStatus();

    $('td').hover(function() {
        $(this).parents('table').find('col:eq('+$(this).index()+')').toggleClass('hover');
    });
}

/**
 * Start game
 */
function Start() {
    window.Game = new Game();

    $('td').hover(function() {
        $(this).parents('table').find('col:eq('+$(this).index()+')').toggleClass('hover');
    });
}

window.onload = function() {
    Start()
};
