import { MetaConfig } from "./data";

export class Division {
  static calc(coins, currentDivision) {
    let divisions = MetaConfig.Divisions;
    divisions.sort((a, b) => {
      return a._id > b._id;
    });

    if (!currentDivision || currentDivision < 0) currentDivision = 0;
    var newDivision = currentDivision;
    var promoted = false;
    //Check promotion
    for (var i = 0; i < divisions.length; i++) {
      if (
        coins >= divisions[i].promotionThreshold &&
        newDivision < divisions[i]._id
      ) {
        promoted = true;
        newDivision = divisions[i]._id;
      }
    }

    //if not promoted check demotion
    if (!promoted) {
      for (i = 0; i < divisions.length; i++) {
        if (
          currentDivision === divisions[i]._id &&
          coins < divisions[i].demotionThreshold
        ) {
          newDivision = divisions[i]._id - 1;
          if (newDivision < 1) newDivision = 1;
          break;
        }
      }
    }
    return newDivision;
  }
}
