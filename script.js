let credits = 500;
let diamondsFound = 0;
let tiles = [];
const gameCost = 100; // Deduct 100 credits per game

function startGame() {
    if (credits >= gameCost) {
        document.getElementById('landing-page').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        credits -= gameCost;
        updateCreditDisplay();
        initializeTiles();
        createGameBoard();
    } else {
        alert("Not enough credits to start the game!");
    }
}

function initializeTiles() {
    tiles = Array(30).fill('💎').concat(Array(6).fill('💣'));
    tiles = shuffleArray(tiles);
}

function createGameBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    tiles.forEach((symbol, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.textContent = '?';
        tile.onclick = () => revealTile(index, tile);
        board.appendChild(tile);
    });
}

function revealTile(index, tile) {
    if (!tile.classList.contains('disabled')) {
        const symbol = tiles[index];
        tile.textContent = symbol;
        tile.classList.add('disabled');
        if (symbol === '💣') {
            document.getElementById('game-message').textContent = 'You hit a bomb! Game will reset.';
            document.getElementById('cashout-button').style.display = 'none';
            setTimeout(resetGame, 2000);
        } else {
            diamondsFound += 1;
            document.getElementById('game-message').textContent = `Diamonds Found: ${diamondsFound}`;
            document.getElementById('cashout-button').style.display = 'block';
        }
    }
}

function cashOut() {
    let winnings = diamondsFound * 0.5;
    credits += winnings + gameCost;
    diamondsFound = 0;
    updateCreditDisplay();
    document.getElementById('game-message').textContent = 'Cashed out! Credits added.';
    document.getElementById('cashout-button').style.display = 'none';
    resetGame();
}

function resetGame() {
    diamondsFound = 0;
    document.getElementById('game-message').textContent = '';
    initializeTiles();
    createGameBoard();
    document.getElementById('cashout-button').style.display = 'none';
}

function updateCreditDisplay() {
    document.getElementById('credit-count').textContent = `Credits: ${credits}`;
}

function contactAdmin() {
    document.getElementById('admin-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
