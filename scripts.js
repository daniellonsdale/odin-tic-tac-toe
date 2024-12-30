const gameBoard = (function (){
    const gameBoardState = ['e','e','e',
                            'e','e','e',
                            'e','e','e'];
    const getGameBoardState = () => {
        return gameBoardState;
    };

    const players = [];
    const addPlayer = (player) => {
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

    return {getPlayerName};
}