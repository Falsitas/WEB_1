const WIDTH = 30;
const HEIGHT = 16;
const NMINE = 99;

let MineBoard = {
    width: WIDTH,
    height: HEIGHT,
    nMine: NMINE,
    board: [],
    setBoard: function() {
        // initialize board
        this.board = [];
        let line = [];
        for(let i = 0; i < this.height; i++) {
            line = [];
            for(let j = 0; j < this.width; j++) {
                line.push(0);
            }
            this.board.push(line);
        }

        // arrange mines and count adjacent cells
        let cnt = 0;
        let m, n;
        while(cnt < this.nMine) {
            m = Math.floor(Math.random() * this.height);
            n = Math.floor(Math.random() * this.width);
            if(this.board[m][n] >= 0) {
                this.board[m][n] = -44;
                cnt++;
                if(m > 0) {
                    if(n > 0) {
                        this.board[m-1][n-1]++;
                    }
                    this.board[m-1][n]++;
                    if(n < this.width-1) {
                        this.board[m-1][n+1]++;
                    }
                }
                if(n > 0) {
                    this.board[m][n-1]++;
                }
                if(n < this.width-1) {
                    this.board[m][n+1]++;
                }
                if(m < this.height-1) {
                    if(n > 0) {
                        this.board[m+1][n-1]++;
                    }
                    this.board[m+1][n]++;
                    if(n < this.width-1) {
                        this.board[m+1][n+1]++;
                    }
                }
            }
            else {
                continue;
            }
        }
    },
    printBoard: function() {
        // create table
        let table = document.createElement("table");
        document.querySelector("body").appendChild(table);

        // append row, col data from board
        let row, col;
        for(let i = 0; i < this.height; i++) {
            row = document.createElement("tr");
            for(let j = 0; j < this.width; j++) {
                col = document.createElement("td");
                if(this.board[i][j] < 0) {
                    col.innerHTML = 'X';
                }
                else {
                    col.innerHTML = this.board[i][j];
                }
                col.style.tableLayout = "fixed";
                col.style.width = "25px";
                col.style.height = "25px";
                col.style.border = "1px solid";
                col.style.textAlign = "center";
                row.appendChild(col);
            }
            table.appendChild(row);
        }
    },
    displayBoard: function() {
        let line = [];
        let buttons = [];

        // create table
        let table = document.createElement("table");
        document.querySelector("body").appendChild(table);

        // append row, col data from board
        let row, col, button;
        for(let i = 0; i < this.height; i++) {
            row = document.createElement("tr");
            for(let j = 0; j < this.width; j++) {
                button = document.createElement("input")
                button.type = "button";
                button.style.backgroundColor = "#04AA6D";
                button.style.color = "black";
                button.style.width = "24px";
                button.style.height = "24px";
                button.style.display = "block";
                button.style.border = "0px";
                button.id = i + "," + j;

                button.style.transitionDuration = "0.4s";
                button.addEventListener("mouseover", () => {
                    document.getElementById(i + "," + j).style.backgroundColor = "#D1F0DE";
                });
                button.addEventListener("mouseleave", () => {
                    document.getElementById(i + "," + j).style.backgroundColor = "#04AA6D";
                });
                button.addEventListener("click", () => {
                    let target = document.getElementById(i + "," + j);
                    if(this.openCell(i,j) < 0) {
                        this.endGame();
                    }
                });

                col = document.createElement("td");
                col.appendChild(button);
                col.style.tableLayout = "fixed";
                col.style.width = "25px";
                col.style.height = "25px";
                col.style.border = "1px solid";
                col.style.textAlign = "center";
                row.appendChild(col);
            }
            table.appendChild(row);
        }
    },
    openCell: function(i, j) {
        let target = document.getElementById(i + "," + j);
        if(target.disabled === true) {
            return this.board[i][j];
        }
        target.disabled = true;
        target.style.backgroundColor = "white";
        target.addEventListener("mouseover", () => {
            document.getElementById(i + "," + j).style.backgroundColor = "#FFFFFF";
        });
        target.addEventListener("mouseleave", () => {
            document.getElementById(i + "," + j).style.backgroundColor = "#FFFFFF";
        });
        if(this.board[i][j] < 0) {
            target.value = 'X';
            return -1;
        }
        else if(this.board[i][j] === 0) {
            this.span(i, j);
            return this.board[i][j];
        }
        else {
            target.value = this.board[i][j];
            return this.board[i][j];
        }
    },
    span: function(m, n) {
        if(m > 0) {
            if(n > 0) {
                this.openCell(m-1, n-1);
            }
            this.openCell(m-1, n);
            if(n < this.width-1) {
                this.openCell(m-1, n+1);
            }
        }
        if(n > 0) {
            this.openCell(m, n-1);
        }
        if(n < this.width-1) {
            this.openCell(m, n+1);
        }
        if(m < this.height-1) {
            if(n > 0) {
                this.openCell(m+1, n-1);
            }
            this.openCell(m+1, n);
            if(n < this.width-1) {
                this.openCell(m+1, n+1);
            }
        }
    },
    endGame: function() {
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                document.getElementById(i + "," + j).disabled = true;
            }
        }
    }
}

let playMineSweeper = function() {
    let b1 = document.getElementById("playbutton");
    if(b1.value === "play") {
        b1.value = "replay";
    }
    else if(b1.value === "replay") {
        document.querySelector("table").remove();
    }
    MineBoard.setBoard();
    MineBoard.displayBoard();
    // MineBoard.printBoard();
}