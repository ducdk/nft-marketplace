export interface MenuItem {
  name: string;
  icon?: string;
  opentab?: boolean;
  action?: boolean;
  key: number;
  path: string;
  show: boolean;
  dataAnchor?: string;
  openPopup?: boolean | false;
  children?: MenuItem[];
}

export type MenuChild = Omit<MenuItem, 'children'>;

export type MenuList = MenuItem[];
