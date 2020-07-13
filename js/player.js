import { NumericValue } from "./numericValue.js";
import { Division_Calc } from "./division.js";

export class Player {
  constructor(id, coins, tokens) {
    this.ID = id;
    this.Coins = new NumericValue(coins);
    this.Tokens = new NumericValue(tokens);
    this.Division = new NumericValue(Division_Calc(coins));
    this.MatchWon = new NumericValue(0);
    this.MatchLost = new NumericValue(0);
  }

  updateDivision() {
    this.Division.Value = Division_Calc(this.Coins.Value);
  }

  delta() {
    return {
      Coins: this.Coins.Delta,
      Tokens: this.Tokens.Delta,
      Division: this.Division.Delta,
      MatchWon: this.MatchWon.Delta,
      MatchLost: this.MatchLost.Delta
    };
  }
}
