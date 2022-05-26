export interface Rank {
  id: number;
  userId: string;
  avatar?: string;
  nickName?: string;
  userName?: string;
  statusBitRace?: string;
  name?: string;
  bitStarAmount?: number;
  numberBitStar?: number;
  placementText?: string;
  rank?: number;
  numberOfPlace?: number;
  prizeValue?: number;
  bestScore?: number;
  prizeRank?: number;
  prize?: number;
  score?: number;
}

export interface BitRace {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  guide: string;
  statusBitRace: string;
  countdownTimer: number;
  totalPrizes: number;
  prizes: Array<Prize>;
  weekPrizes: Array<Prize>;
  userBitRacePrizes: Array<Rank>;
  weeks: Array<BitRaceWeek>;
}

export interface Prize {
  id: number;
  rank: number;
  placementText: string;
  numberOfPlace: number;
  prizeValue: number;
}

export interface BitRaceWeek {
  id: number;
  endDate: string;
  name: string;
  startDate: string;
  totalPrizes: number;
  statusBitRace: string;
}
