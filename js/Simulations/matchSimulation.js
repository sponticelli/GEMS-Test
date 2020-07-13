import { BaseSimulation } from "./baseSimulation.js";
import { random } from "../utils.js";

export class MatchSimulation extends BaseSimulation {
  constructor(params) {
    super(params);
    this.tableConfigs = params.Table;
  }

  execute(player) {
    super.execute();
    var cost = this.Table_Cost(player.Division.Value);
    if (
      player.Coins.Value >= cost.Coins &&
      player.Tokens.Value >= cost.Tokens
    ) {
      player.Coins.Value -= cost.Coins;
      player.Tokens.Value -= cost.Tokens;
      if (random(1, 100) > 50) {
        var prize = this.Table_Prize(player.Division.Value);
        player.MatchWon.Value++;
        player.Coins.Value += prize.Coins;
        player.Tokens.Value += prize.Tokens;
      } else {
        player.MatchLost.Value++;
      }
      player.updateDivision();
      return true;
    }
    return false;
  }

  Table_Cost(division) {
    for (var i = 0; i < this.tableConfigs.length; i++) {
      var table = this.tableConfigs[i];
      if (table.division === division) {
        return table.cost;
      }
    }

    return { Coins: Number.MAX_SAFE_INTEGER, Tokens: Number.MAX_SAFE_INTEGER };
  }

  Table_Prize(division) {
    var multi = { Coins: 0, Tokens: 0 };
    for (var i = 0; i < this.tableConfigs.length; i++) {
      var table = this.tableConfigs[i];
      if (table.division === division) {
        multi = table.winMulti;
        break;
      }
    }
    var cost = this.Table_Cost(division);
    return {
      Coins: cost.Coins * multi.Coins,
      Tokens: cost.Tokens * multi.Tokens
    };
  }
}
