import { random } from "../utils.js";
import { Player } from "./player.js";

export class PlayerFactory {
  static CreateRandom(id, params) {
    var player = new Player(
      id,
      random(params.Coins.min, params.Coins.max),
      random(params.Tokens.min, params.Tokens.max)
    );
    return player;
  }
}
