// Valorile si tabloul
var board = [];
var size = 50;
var interval;

// tabloul cu toate celulele moarte
for (var i = 0; i < size; i++) {
    board[i] = [];
    for (var j = 0; j < size; j++) {
        board[i][j] = 0;
    }
}

// afisare tablou
function displayBoard() {
    var boardHtml = '';
    for (var i = 0; i < size; i++) {
        boardHtml += '<div class="row">';
        for (var j = 0; j < size; j++) {
            // stabileste daca celula este vie
            boardHtml += '<div' + (board[i][j] ? ' class="alive"' : '') + ' onclick="toggleCell(' + i + ', ' + j + ')"></div>';
        }
        boardHtml += '</div>';
    }
   
    document.getElementById('board').innerHTML = boardHtml;
}

// stabileste starea celulei
function toggleCell(x, y) {
    board[x][y] = 1 - board[x][y]; // schimba celula din vie in moarta si invers
    displayBoard(); // afiseaza tabloul
}

// actualizeaza tabloul
function updateBoard() {
    var newBoard = JSON.parse(JSON.stringify(board)); 

    // citeste celulele din tablou
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var aliveNeighbours = 0; // numarul de vecini vii

          
            for (var x = Math.max(0, i - 1); x <= Math.min(size - 1, i + 1); x++) {
                for (var y = Math.max(0, j - 1); y <= Math.min(size - 1, j + 1); y++) {
                    aliveNeighbours += board[x][y]; // calculeaza numarul de vecini vii a celulei
                }
            }

            aliveNeighbours -= board[i][j]; // scade numarul celulei curente

            // regulile jocului
            if (board[i][j] === 1 && aliveNeighbours < 2) newBoard[i][j] = 0;
            else if (board[i][j] === 1 && aliveNeighbours > 3) newBoard[i][j] = 0;
            else if (board[i][j] === 0 && aliveNeighbours === 3) newBoard[i][j] = 1;
        }
    }

    board = newBoard; // schimba celulele si afiseaza noua generatie
}

// butonul de start
function startGame() {
    interval = setInterval(function() {
        updateBoard();
        displayBoard();
    }, 1000);
}

// butonul de stop
function stopGame() {
    clearInterval(interval);
    interval = null; 
}

// butonul de completare aleatorie a tablei
function random() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            board[i][j] = Math.round(Math.random());
        }
    }
    displayBoard();
}

// butonul centeu curatirea tablei
function clearBoard() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            board[i][j] = 0;
        }
    }
    displayBoard();
}

// afiseaza tabla
displayBoard();