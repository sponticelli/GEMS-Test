/* eslint-env jquery */

import { MatchSimulation } from "./Simulations/matchSimulation.js";
import { PlayerView } from "./Player/playerView.js";
import { PlayerFactory } from "./Player/playerFactory.js";
import { MetaConfig, SimConfig } from "./data.js";
import { Graph } from "./graph";
import { Counter } from "./Stats/counter";

export function Simulate() {
  const maxPlayers = SimConfig.NumPlayers;
  const maxMatches = SimConfig.NumMatches;

  var cumulatedDelta = {
    Coins: 0,
    Tokens: 0,
    Division: 0,
    MatchWon: 0,
    MatchLost: 0
  };

  const counter = new Counter();

  const matchSimulation = new MatchSimulation(MetaConfig);

  for (var i = 0; i < maxPlayers; i++) {
    let player = PlayerFactory.CreateRandom(i, SimConfig.PlayerInfo);

    counter.add("tokens", 0, player.Tokens.Value);
    counter.add("coins", 0, player.Coins.Value);
    counter.add("division", 0, player.Division.Value);

    for (var j = 0; j < maxMatches; j++) {
      if (matchSimulation.execute(player)) {
        counter.add("matches", j + 1, 1);
      }
      counter.add("tokens", j + 1, player.Tokens.Value);
      counter.add("coins", j + 1, player.Coins.Value);
      counter.add("division", j + 1, player.Division.Value);
    }
    PlayerView.printDelta(player);
    var delta = player.delta();

    for (let key in delta) {
      cumulatedDelta[key] += delta[key];
    }
  }

  const graph = new Graph(() => {
    //Tokens
    graph.drawSingleLineChart(
      counter.getTimedAvgValues("tokens", maxPlayers),
      ["X", "Tokens"],
      "Time",
      "Tokens",
      "chart_div_avgtokens",
      "#f1f8e9"
    );

    //Division
    graph.drawSingleLineChart(
      counter.getTimedAvgValues("division", maxPlayers),
      ["X", "Division"],
      "Time",
      "Division",
      "chart_div_avgdivision",
      "#F0F8FF"
    );
    //Coins
    graph.drawSingleLineChart(
      counter.getTimedAvgValues("coins", maxPlayers),
      ["X", "Coins"],
      "Time",
      "Coins",
      "chart_div_avgcoins",
      "#FFFFE0"
    );

    //Matches
    graph.drawSingleLineChart(
      counter.getTimedValues("matches"),
      ["X", "Matches"],
      "Time",
      "Matches",
      "chart_div_avgmatches",
      "#f3f3f3"
    );
  });

  $("#playerDelta tfoot").append(
    "<tr><th>&nbsp;</th><th>" +
      Math.round(cumulatedDelta.Coins / maxPlayers) +
      "</th><th>" +
      Math.round(cumulatedDelta.Tokens / maxPlayers) +
      "</th><th>" +
      Math.round(cumulatedDelta.Division / maxPlayers) +
      "</th><th>" +
      Math.round(
        (cumulatedDelta.MatchWon + cumulatedDelta.MatchLost) / maxPlayers
      ) +
      "</th><th>" +
      Math.round(cumulatedDelta.MatchWon / maxPlayers) +
      "</th><th>" +
      Math.round(cumulatedDelta.MatchLost / maxPlayers) +
      "</th></tr>"
  );
}
