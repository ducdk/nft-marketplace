import { Rank } from './bitrace';

export interface TournamentObject {
  filter: Array<FilterObject>;
  filterSelected: FilterObject;
  sort: Array<SortObject>;
  sortSelected: SortObject;
  system: Array<SystemObject>;
  systemSelected: SystemObject;
}

export interface SortObject {
  id: number;
  key: string;
  name: string;
  active: boolean;
  icon?: any;
}

export interface FilterObject {
  id: number;
  key: string;
  name: string;
  active: boolean;
  icon?: any;
}

export interface SystemObject {
  id: number;
  key: string;
  name: string;
  active: boolean;
  icon?: any;
}

export interface TournamentListParams {
  status?: string;
  os?: string;
  sort?: string;
  page?: number;
  size?: number;
}

export interface Tournament {
  id?: number;
  startDate?: string;
  endDate?: string;
  thumbnail?: string;
  bannerBackground?: string;
  banner?: string;
  rule?: string;
  guide?: string;
  gas?: number;
  status?: number;
  countdownTimer?: number;
  name?: string;
  hover?: boolean;
  totalPrizes?: number;
  prizesInfo?: Array<any>;
  organization?: any;
  leaderBoard?: Array<Rank>;
  game?: any;
  slug?: string;
  joined?: boolean;
}
