export const addGame = gamePanel => {
    const gameList = gamePanel.state.games;
  
    const game = {
      gameName: gamePanel.state.gameName,
      ign: gamePanel.state.ign
    };
  
    if (game.gameName.trim() !== "") {
      gameList.push(game)

    }
  
    gamePanel.setState({
      games: gameList
    });
  };
  
export const removeGame = (gamePanel, game) => {
  
    const filteredGames = gamePanel.state.games.filter(g => {
      return g !== game;
    });
  
    gamePanel.setState({
      games: filteredGames
    });
  };
  