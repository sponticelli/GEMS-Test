/* eslint-env jquery */
/*global google*/
/*eslint no-undef: "error"*/

import { MatchSimulation } from "./Simulations/matchSimulation.js";
import { PlayerView } from "./playerView.js";
import { PlayerFactory } from "./playerFactory.js";
import { MetaConfig, SimConfig } from "./data.js";

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

  var avgTokens = [];
  var avgCoins = [];
  var avgMatches = [];
  var avgDivision = [];
  for (var i = 0; i <= maxMatches; i++) {
    avgTokens.push([i, 0]);
    avgCoins.push([i, 0]);
    avgMatches.push([i, 0]);
    avgDivision.push([i, 0]);
  }

  const matchSimulation = new MatchSimulation(MetaConfig);

  for (i = 0; i < maxPlayers; i++) {
    let player = PlayerFactory.CreateRandom(i, SimConfig.PlayerInfo);
    avgTokens[0] = [0, avgTokens[0][1] + player.Tokens.Value];
    avgCoins[0] = [0, avgCoins[0][1] + player.Coins.Value];
    avgDivision[0] = [0, avgDivision[0][1] + player.Division.Value];

    for (var j = 0; j < maxMatches; j++) {
      if (matchSimulation.execute(player)) {
        avgMatches[j + 1] = [j + 1, avgMatches[j + 1][1] + 1];
      }
      avgTokens[j + 1] = [j + 1, avgTokens[j + 1][1] + player.Tokens.Value];
      avgCoins[j + 1] = [j + 1, avgCoins[j + 1][1] + player.Coins.Value];
      avgDivision[j + 1] = [
        j + 1,
        avgDivision[j + 1][1] + player.Division.Value
      ];
    }
    PlayerView.printDelta(player);
    var delta = player.delta();

    for (let key in delta) {
      cumulatedDelta[key] += delta[key];
    }
  }

  for (i = 0; i <= maxMatches; i++) {
    avgTokens[i] = [i, avgTokens[i][1] / maxPlayers];
    avgCoins[i] = [i, avgCoins[i][1] / maxPlayers];
    avgDivision[i] = [i, avgDivision[i][1] / maxPlayers];
    //avgMatches[i] = [i, avgMatches[i][1] / maxPlayers];
  }

  google.charts.setOnLoadCallback(() => {
    drawTokens(avgTokens);
    drawCoins(avgCoins);
    drawMatches(avgMatches);
    drawDivision(avgDivision);
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

function drawDivision(rows) {
  drawLineChart(
    rows,
    ["X", "Division"],
    "Time",
    "Division",
    "chart_div_avgdivision",
    "#F0F8FF"
  );
}

function drawTokens(rows) {
  drawLineChart(
    rows,
    ["X", "Tokens"],
    "Time",
    "Tokens",
    "chart_div_avgtokens",
    "#f1f8e9"
  );
}

function drawCoins(rows) {
  drawLineChart(
    rows,
    ["X", "Coins"],
    "Time",
    "Coins",
    "chart_div_avgcoins",
    "#FFFFE0"
  );
}

function drawMatches(rows) {
  drawLineChart(
    rows,
    ["X", "Matches"],
    "Time",
    "Matches",
    "chart_div_avgmatches",
    "#f3f3f3"
  );
}

function drawLineChart(
  rows,
  columns,
  hAxis,
  vAxis,
  elementId,
  backgroundColor
) {
  var data = new google.visualization.DataTable();

  for (var i = 0; i < columns.length; i++) {
    data.addColumn("number", columns[i]);
  }

  data.addRows(rows);

  var options = {
    hAxis: {
      title: hAxis
    },
    vAxis: {
      title: vAxis
    },
    backgroundColor: backgroundColor
  };

  var chart = new google.visualization.LineChart(
    document.getElementById(elementId)
  );
  chart.draw(data, options);
}
