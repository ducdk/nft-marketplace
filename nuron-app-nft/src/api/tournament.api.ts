import { TournamentListParams } from 'interface/tournament';
import { request } from './request';

export const apiTournamentList = (data: TournamentListParams) => request<any>('post', '/v1/tournaments', data);
export const apiTournamentTop = () => request<any>('get', '/v1/tournaments/priority=top');
export const apiTournamentSlug = (slug: string) => request<any>('get', `/v1/tournaments/${slug}`);
export const apiTournamentLeaderBoard = (id: string) => request<any>('get', `/v1/tournaments/leaderboard/${id}`);
export const apiTournamentStatistics = () => request<any>('get', `/v1/statistics/type=tournaments`);
