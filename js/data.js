export var MetaConfig = {
  Divisions: [
    {
      _id: 2,
      demotionThreshold: 40000,
      promotionThreshold: 75000
    },
    {
      _id: 4,
      demotionThreshold: 1000000,
      promotionThreshold: 2500000
    },
    {
      _id: 3,
      demotionThreshold: 250000,
      promotionThreshold: 500000
    },
    {
      _id: 5,
      demotionThreshold: 6500000,
      promotionThreshold: 12500000
    },
    {
      _id: 1,
      demotionThreshold: 0,
      promotionThreshold: 50000
    },
    {
      _id: 6,
      demotionThreshold: 82000000,
      promotionThreshold: 100000000
    },
    {
      _id: 0,
      demotionThreshold: -999999999,
      promotionThreshold: 0
    },
    {
      _id: 7,
      demotionThreshold: 400000000,
      promotionThreshold: 500000000
    },
    {
      _id: 8,
      demotionThreshold: 900000000,
      promotionThreshold: 1000000000
    }
  ],
  Table: [
    {
      _id: "Table0",
      cost: { Coins: 2500, Tokens: 4 },
      winMulti: { Coins: 2, Tokens: 1.25 },
      division: 0
    },
    {
      _id: "Table1",
      cost: { Coins: 2500, Tokens: 4 },
      winMulti: { Coins: 2, Tokens: 1.25 },
      division: 1
    },
    {
      _id: "Table2",
      cost: { Coins: 50000, Tokens: 4 },
      winMulti: { Coins: 1.8, Tokens: 1.25 },
      division: 2
    },
    {
      _id: "Table3",
      cost: { Coins: 250000, Tokens: 8 },
      winMulti: { Coins: 1.8, Tokens: 1.25 },
      division: 3
    },
    {
      _id: "Table4",
      cost: { Coins: 1000000, Tokens: 8 },
      winMulti: { Coins: 1.7, Tokens: 1.25 },
      division: 4
    },
    {
      _id: "Table5",
      cost: { Coins: 3000000, Tokens: 8 },
      winMulti: { Coins: 1.5, Tokens: 1.25 },
      division: 5
    },
    {
      _id: "Table6",
      cost: { Coins: 10000000, Tokens: 10 },
      winMulti: { Coins: 1.5, Tokens: 1.25 },
      division: 6
    },
    {
      _id: "Table7",
      cost: { Coins: 20000000, Tokens: 15 },
      winMulti: { Coins: 1.5, Tokens: 1.14 },
      division: 7
    },
    {
      _id: "Table8",
      cost: { Coins: 20000000, Tokens: 15 },
      winMulti: { Coins: 1.5, Tokens: 1.14 },
      division: 8
    }
  ]
};

export var SimConfig = {
  NumPlayers: 1000,
  NumMatches: 100,
  PlayerInfo: {
    Coins: { min: 100000, max: 1000000 },
    Tokens: { min: 50, max: 500 }
  }
};
