const gameBoard = (function (){
    const gameBoardState = ['e','e','e',
                            'e','e','e',
                            'e','e','e'];
    const getGameBoardState = () => {
        return gameBoardState;
    };

    const players = [];
    const addPlayer = (player) => {
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
            console.log(`${players} is already full`);
        }
    };
    const getPlayers = () => {
        return players;
    };
    
    return {getGameBoardState, getPlayers, addPlayer};
})();

function createPlayer(name){
    const playerName = name;
    const getPlayerName = () => {
        return playerName;
    };

    const playerPiece = '';

    return {getPlayerName, playerPiece};
}

const playerOne = createPlayer('Player one');
gameBoard.addPlayer(playerOne);
const playerTwo = createPlayer('Player two');
gameBoard.addPlayer(playerTwo);