export interface GameObject {
  search: string;
  system: Array<SystemGameObject>;
  sort: Array<SortGameObject>;
  gerne: Array<TagObject>;
  gameStoreGerne: Array<TagObject>;
}

export interface FilterGameObject {
  system: Array<SystemGameObject>;
  sort: Array<SortGameObject>;
}

export interface SortGameObject {
  id: number;
  key: string;
  name: string;
  active: boolean;
  icon?: any;
}

export interface SystemGameObject {
  id: number;
  key: string;
  name: string;
  active: boolean;
  icon?: any;
}

export interface GameListParams {
  key?: string;
  os?: string;
  tag?: Array<number>;
  slugs?: Array<string>;
  sort?: string;
  page?: number;
  size?: number;
}

export interface TagsObject {
  tag: Array<TagObject>;
}

export interface TagObject {
  id: number;
  slug: string;
  name: string;
  description?: string;
  type?: number;
  active?: boolean;
}

export interface SearchGame {
  search: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  appleStoreLink: string;
  googleStoreLink: string;
  iosAvailable: boolean;
  androidAvailable: boolean;
  thumbnail: string;
  description?: string;
  rate: number;
  download: number;
}
