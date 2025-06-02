const WIDTH = 30;
const HEIGHT = 16;
const NMINE = 99;

var setBoard = function() {
    var line = [];
    for(var i = 0; i < WIDTH; i++) {
        line.push(0);
    }

    var board = [];
    for(var i = 0; i < HEIGHT; i++) {
        line = [];
        for(var j = 0; j < WIDTH; j++) {
            line.push(0);
        }
        board.push(line);
    }

    var cnt = 0;
    var m, n;
    while(cnt < NMINE) {
        m = Math.floor(Math.random() * HEIGHT);
        n = Math.floor(Math.random() * WIDTH);
        if(board[m][n] >= 0) {
            board[m][n] = -44;
            cnt++;
            if(m > 0) {
                if(n > 0) {
                    board[m-1][n-1]++;
                }
                board[m-1][n]++;
                if(n < WIDTH-1) {
                    board[m-1][n+1]++;
                }
            }
            if(n > 0) {
                board[m][n-1]++;
            }
            if(n < WIDTH-1) {
                board[m][n+1]++;
            }
            if(m < HEIGHT-1) {
                if(n > 0) {
                    board[m+1][n-1]++;
                }
                board[m+1][n]++;
                if(n < WIDTH-1) {
                    board[m+1][n+1]++;
                }
            }
        }
        else {
            continue;
        }
    }
    return board;
}

var printBoard = function(board) {
    for(var i = 0; i < HEIGHT; i++) {
        for(var j = 0; j < WIDTH; j++) {
            if(board[i][j] < 0) {
                document.writeln("*");
            }
            else {
                document.writeln(board[i][j]);
            }
        }
        document.write("<br>");
    }
}