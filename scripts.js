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
        let playerMove = parseInt(prompt('Where would you like to place your piece (0-8)'));
        if (gameBoard.getPlayers()[0].isPlayerTurn()){
            gameBoard.alterGameBoardState(playerMove, gameBoard.getPlayers()[0].playerPiece);
            gameController.checkWin();
        }else{
            gameBoard.alterGameBoardState(playerMove, gameBoard.getPlayers()[1].playerPiece);
            gameController.checkWin();
        }
    }

    const checkWin = () => {
        return;
    };

    return {playTurn, checkWin};
}());

const playerOne = createPlayer();
gameBoard.addPlayer(playerOne);
const playerTwo = createPlayer();
gameBoard.addPlayer(playerTwo);