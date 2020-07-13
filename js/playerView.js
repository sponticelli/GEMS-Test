/* eslint-env jquery */

export class PlayerView {
  static printToConsole(player) {
    console.log(player.toString());
  }

  static printDelta(player) {
    $("#playerDelta tbody").append(
      "<tr><td>" +
        player.ID +
        "</td><td>" +
        player.Coins.Delta +
        "</td><td>" +
        player.Tokens.Delta +
        "</td><td>" +
        player.Division.Delta +
        "</td><td>" +
        (player.MatchWon.Delta + player.MatchLost.Delta) +
        "</td><td>" +
        player.MatchWon.Delta +
        "</td><td>" +
        player.MatchLost.Delta +
        "</td></tr>"
    );
  }

  static toString(player) {
    return (
      "ID: " +
      player.ID +
      "Coins: " +
      player.Coins.Value +
      " Tokens: " +
      player.Tokens.Value +
      " Div: " +
      player.Division.Value +
      " Matches: " +
      (player.MatchWon.Value + player.MatchLost.Value) +
      " Won: " +
      player.MatchWon.Value +
      " Lost: " +
      player.MatchLost.Value
    );
  }

  static deltaToString(player) {
    return (
      "Coins: " +
      player.Coins.Delta +
      " Tokens: " +
      player.Tokens.Delta +
      " Div: " +
      player.Division.Delta +
      " Matches: " +
      (player.MatchWon.Delta + player.MatchLost.Delta) +
      " Won: " +
      player.MatchWon.Delta +
      " Lost: " +
      player.MatchLost.Delta
    );
  }
}
