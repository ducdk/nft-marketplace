export interface NotificationState {
  notificationList: Notifications[];
  hasMore: boolean;
  unreadCount: number;
  notiParamsQuery: NotiParamsQuery;
}

export interface Notifications {
  unRead?: boolean;
  avatar: string;
  createdAt: string;
  id: string;
  title: string;
  description: string;
}

export interface NotiParamsQuery {
  page: number;
  size: number;
}
