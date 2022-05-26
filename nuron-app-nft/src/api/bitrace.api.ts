import { request } from './request';

export const apiBitraceRanks = (bitraceId: number) => request<any>('get', `/v1/bit_races/${bitraceId}/ranks`);
export const apiBitraceWeekly = (weeklyId: number) => request<any>('get', `/v1/bit_races/weekly?id=${weeklyId}`);
export const apiBitraceStatusActive = () => request<any>('get', '/v1/bit_races/status=active');
export const apiBitraceStatusFinished = (data: any) => request<any>('post', '/v1/bit_races/status=finished', data);
export const apiBitraceTopFinished = (bitRaceId: number, data: any) =>
  request<any>('get', `/v1/bit_races/${bitRaceId}/prize`, data);
export const apiBitraceStatistics = () => request<any>('get', `/v1/statistics/type=bitraces`);
