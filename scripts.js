const inputDialog = document.querySelector('.input-dialog');
const formSubmitBtn = document.querySelector('.submit-button');
const inputForm = document.querySelector('.input-form');
const playerOneName = document.querySelector('.player-one-name');
const playerTwoName = document.querySelector('.player-two-name');
const turnIndicator = document.querySelector('.turn-indicator');
const gameContainer = document.querySelector('.game-container');
const root = document.documentElement;
let playerOne;
let playerTwo;

window.addEventListener('load', () =>{
    inputDialog.showModal();
});

inputForm.addEventListener('submit', (e) => {
    let playerOneInputValidity = document.querySelector('#player-one-name-input').reportValidity();
    let playerTwoInputValidity = document.querySelector('#player-two-name-input').reportValidity();

    if(playerOneInputValidity && playerTwoInputValidity){
        e.preventDefault();

        let formData = new FormData(inputForm);
        playerOne = createPlayer(formData.get('player-one-name-input'), formData.get('player-one-color-input'));
        playerTwo = createPlayer(formData.get('player-two-name-input'), formData.get('player-two-color-input'));
        playerOne.playerPiece = 'x';
        playerTwo.playerPiece = 'o';
        playerOne.togglePlayerTurn();
        gameBoard.addPlayers(playerOne, playerTwo);
        playerOneName.textContent = playerOne.getPlayerName();
        playerTwoName.textContent = playerTwo.getPlayerName();
        root.style.setProperty('--player-one-color', playerOne.getPlayerColor());
        root.style.setProperty('--player-two-color', playerTwo.getPlayerColor());

        inputDialog.close();
        inputForm.reset();

        gameController.playTurn();
    }
});

const gameBoard = (function (){
    const gameBoardState = ['e','e','e',
                            'e','e','e',
                            'e','e','e'];
    const getGameBoardState = () => {
        return gameBoardState;
    };
    const alterGameBoardState = (index, newPiece) => {
        gameBoardState[index] = newPiece;
    };

    const players = [];
    const addPlayers = (playerA, playerB) => {
        players.push(playerA);
        players.push(playerB);
    };
    const getPlayers = () => {
        return players;
    };
    
    return {getGameBoardState, getPlayers, addPlayers, alterGameBoardState};
})();

function createPlayer(name, color){
    const playerName = name;
    const getPlayerName = () => {
        return playerName;
    };

    const playerPiece = '';

    let isTurn = false;
    const isPlayerTurn = () => {
        return isTurn;
    };
    const togglePlayerTurn = () => {
        if (isTurn){
            isTurn = false;
        }else{
            isTurn = true;
        }
    };

    const playerColor = color;
    const getPlayerColor = () => {
        return playerColor;
    };

    return {getPlayerName, playerPiece, isPlayerTurn, togglePlayerTurn, getPlayerColor};
}

const gameController = (function (){
    function handleClick(e){
        playerMove = parseInt(e.target.id);
        if (gameBoard.getGameBoardState()[playerMove] === 'e'){
            if (gameBoard.getPlayers()[0].isPlayerTurn()){
                gameBoard.alterGameBoardState(playerMove, gameBoard.getPlayers()[0].playerPiece);
                document.getElementById(`${playerMove}`).textContent = gameBoard.getPlayers()[0].playerPiece.toUpperCase();
                document.getElementById(`${playerMove}`).style.color = playerOne.getPlayerColor();
                if(gameController.checkWin()){
                    console.log(`Congratulations! ${gameBoard.getPlayers()[0].getPlayerName()} won! Please refresh to play again`);
                    turnIndicator.textContent = `Congratulations! ${gameBoard.getPlayers()[0].getPlayerName()} won! Please refresh to play again`;
                    gameContainer.removeEventListener('click', handleClick);
                    return;
                }else{
                    gameBoard.getPlayers()[0].togglePlayerTurn();
                    gameBoard.getPlayers()[1].togglePlayerTurn();
                    gameContainer.removeEventListener('click', handleClick);
                    gameController.playTurn();
                }
            }else{
                gameBoard.alterGameBoardState(playerMove, gameBoard.getPlayers()[1].playerPiece);
                document.getElementById(`${playerMove}`).textContent = gameBoard.getPlayers()[1].playerPiece.toUpperCase();
                document.getElementById(`${playerMove}`).style.color = playerTwo.getPlayerColor();
                if(gameController.checkWin()){
                    console.log(`Congratulations! ${gameBoard.getPlayers()[1].getPlayerName()} won! Please refresh to play again`);
                    turnIndicator.textContent = `Congratulations! ${gameBoard.getPlayers()[1].getPlayerName()} won! Please refresh to play again`;
                    gameContainer.removeEventListener('click', handleClick);
                    return;
                }else{
                    gameBoard.getPlayers()[0].togglePlayerTurn();
                    gameBoard.getPlayers()[1].togglePlayerTurn();
                    gameContainer.removeEventListener('click', handleClick);
                    gameController.playTurn();
                }
            }
        }else{
            turnIndicator.textContent = 'That place is already taken. Please try again';
            setTimeout(gameController.playTurn(), 3000);
        }
    }

    const playTurn = () => {
        if (gameBoard.getGameBoardState().toString().includes('e')){
            let currentPlayer;
            if (playerOne.isPlayerTurn()){
                currentPlayer = playerOne;
            }else{
                currentPlayer = playerTwo;
            }
            turnIndicator.textContent = `It's ${currentPlayer.getPlayerName()}'s turn`;
            let playerMove;
            gameContainer.addEventListener('click', handleClick);
        }else{
            turnIndicator.textContent = 'The game is a draw! Better luck next time';
        }
        return;
    }

    const checkWin = () => {
        const horWinA = [0, 1, 2];
        const horWinB = [3, 4, 5];
        const horWinC = [6, 7, 8];

        const vertWinA = [0, 3, 6];
        const vertWinB = [1, 4, 7];
        const vertWinC = [2, 5, 8];

        const diagWinA = [0, 4, 8];
        const diagWinB = [2, 4, 6];

        const winConditions = [horWinA, horWinB, horWinC, vertWinA, vertWinB, vertWinC, diagWinA, diagWinB];

        for (let i in winConditions){
            if (gameBoard.getGameBoardState()[winConditions[i][0]] === 'x' && gameBoard.getGameBoardState()[winConditions[i][1]] === 'x' && gameBoard.getGameBoardState()[winConditions[i][2]] === 'x'){
                return true;
            } else if (gameBoard.getGameBoardState()[winConditions[i][0]] === 'o' && gameBoard.getGameBoardState()[winConditions[i][1]] === 'o' && gameBoard.getGameBoardState()[winConditions[i][2]] === 'o'){
                return true;
            }
        }

        return false;
    };

    return {playTurn, checkWin};
}());