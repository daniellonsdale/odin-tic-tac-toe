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

function createPlayer(name){
    const playerName = name;
    const getPlayerName = () => {
        return playerName;
    };

    const playerPiece = '';

    return {getPlayerName, playerPiece};
}

const gameController = (function (){
    const playerTurn = '';
    const getPlayerTurn = () => {
        return playerTurn;
    };
    const togglePlayerTurn = () => {
        if (playerTurn === ''){
            playerTurn = playerOne.playerPiece;
        }else if(playerTurn === playerOne.playerPiece){
            playerTurn = playerTwo.playerPiece;
        }else if(playerTurn === playerTwo.playerPiece){
            playerTurn = playerOne.playerPiece;
        }else{
            console.log('An error has occured when toggling player turn wihtin the gameController');
        }
    };
    
}());

//allow players to choose name via prompts
const playerOne = createPlayer('Player one');
gameBoard.addPlayer(playerOne);
const playerTwo = createPlayer('Player two');
gameBoard.addPlayer(playerTwo);