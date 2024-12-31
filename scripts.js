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
    const addPlayer = (player) => {
        //Allow p1 (player one) to choose piece and assign remaining to p2
        if(players.length === 0){
            let playerChoice = prompt("Choose your piece: x or o");
            console.log(`Player one will be ${playerChoice}`);
            player.playerPiece = playerChoice;
            player.togglePlayerTurn();
        }else if(players.length === 1 && players[0].playerPiece === 'x'){
            console.log('Player two will be o')
            player.playerPiece = 'o';
        }else if(players.length === 1 && players[0].playerPiece === 'o'){
            console.log('Player two will be x')
            player.playerPiece = 'x';
        }

        if(players.length < 2){
            players.push(player);
            console.log(`${player} added to ${players}`);
        }else{
            console.log(`Two players are already in the game`);
        }
    };
    const getPlayers = () => {
        return players;
    };
    
    return {getGameBoardState, getPlayers, addPlayer, alterGameBoardState};
})();

function createPlayer(){
    const playerName = prompt('Choose your name');
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

    return {getPlayerName, playerPiece, isPlayerTurn, togglePlayerTurn};
}

const gameController = (function (){
    const playTurn = () => {
        if (gameBoard.getGameBoardState().toString().includes('e')){
            let playerMove = parseInt(prompt('Where would you like to place your piece (1-9)'));
            playerMove--;
            if (gameBoard.getGameBoardState()[playerMove] === 'e'){
                if (gameBoard.getPlayers()[0].isPlayerTurn()){
                    gameBoard.alterGameBoardState(playerMove, gameBoard.getPlayers()[0].playerPiece);
                    if(gameController.checkWin()){
                        console.log(`Congratulations! ${gameBoard.getPlayers()[0].getPlayerName()} won! Please refresh to play again`);
                    }else{
                        gameBoard.getPlayers()[0].togglePlayerTurn();
                        gameBoard.getPlayers()[1].togglePlayerTurn();
                        gameController.playTurn();
                    }
                }else{
                    gameBoard.alterGameBoardState(playerMove, gameBoard.getPlayers()[1].playerPiece);
                    if(gameController.checkWin()){
                        console.log(`Congratulations! ${gameBoard.getPlayers()[1].getPlayerName()} won! Please refresh to play again`);
                    }else{
                        gameBoard.getPlayers()[0].togglePlayerTurn();
                        gameBoard.getPlayers()[1].togglePlayerTurn();
                        gameController.playTurn();
                    }
                }
            }else{
                console.log('That place is already taken. Please try again');
                gameController.playTurn();
            }
        }else{
            console.log('The game is a draw! Better luck next time');
        }
        return;
    }

    const checkWin = () => {
        const xWinHorOne =      ['x','x','x',
                                'e','e','e',
                                'e','e','e'];
        const xWinHorTwo =      ['e','e','e',
                                'x','x','x',
                                'e','e','e'];
        const xWinHorThree =     ['e','e','e',
                                'e','e','e',
                                'x','x','x'];
        const oWinHorOne =      ['o','o','o',
                                'e','e','e',
                                'e','e','e'];
        const oWinHorTwo =      ['e','e','e',
                                'o','o','o',
                                'e','e','e'];
        const oWinHorThree =     ['e','e','e',
                                'e','e','e',
                                'o','o','o'];
        const xWinVertOne =      ['x','e','e',
                                'x','e','e',
                                'x','e','e'];
        const xWinVertTwo =      ['e','x','e',
                                'e','x','e',
                                'e','x','e'];
        const xWinVertThree =     ['e','e','x',
                                'e','e','x',
                                'e','e','x'];
        const oWinVertOne =      ['o','e','e',
                                'o','e','e',
                                'o','e','e'];
        const oWinVertTwo =      ['e','o','e',
                                'e','o','e',
                                'e','o','e'];
        const oWinVertThree =     ['e','e','o',
                                'e','e','o',
                                'e','e','o'];
        const xWinDiagOne =      ['x','e','e',
                                'e','x','e',
                                'e','e','x'];
        const xWinDiagTwo =      ['e','e','x',
                                'e','x','e',
                                'x','e','e'];
        const oWinDiagOne =      ['o','e','e',
                                'e','o','e',
                                'e','e','o'];
        const oWinDiagTwo =      ['e','e','o',
                                'e','o','e',
                                'o','e','e'];
        const winConditions = [xWinHorOne, xWinHorTwo, xWinHorThree, oWinHorOne, oWinHorTwo, oWinHorThree, xWinVertOne, xWinVertTwo, xWinVertThree, oWinVertOne, oWinVertTwo, oWinVertThree, xWinDiagOne, xWinDiagTwo, oWinDiagOne, oWinDiagTwo];

        let gameBoardStateMapX = gameBoard.getGameBoardState().map((x) => {
            if (x !== 'x'){
                return x = 'e';
            }else{
                return x = 'x';
            }
        });
        let gameBoardStateMapO = gameBoard.getGameBoardState().map((x) => {
            if (x !== 'o'){
                return x = 'e';
            }else{
                return x = 'o';
            }
        });

        for (let i in winConditions){
            if(winConditions[i].toString() === gameBoardStateMapX.toString() || winConditions[i].toString() === gameBoardStateMapO.toString()){
                 return true;
            }
        }
        return false;
    };

    return {playTurn, checkWin};
}());

/* const playerOne = createPlayer();
gameBoard.addPlayer(playerOne);
const playerTwo = createPlayer();
gameBoard.addPlayer(playerTwo);
gameController.playTurn(); */