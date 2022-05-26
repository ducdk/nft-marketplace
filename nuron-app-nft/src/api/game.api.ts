import { request } from './request';
import { GameListParams } from 'interface/game';

export const apiGameList = (data: GameListParams) => request<any>('post', '/v1/games', data);
export const apiGameTagList = () => request<any>('get', '/v1/games/tags');
export const apiPlatformStatistics = () => request<any>('get', `/v1/statistics/type=platform`);
