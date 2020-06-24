export enum MAP_TYPE {
  SATELLITE = 'satellite',
}

export enum TREE_CATEGORY {
  UNKNOWN = 'unknown',
  SITE = 'site',
  ESTIMATE = 'estimate',
}

export enum TREE_RATING {
  GOOD = 'Good',
  FAIR = 'Fair',
  POOR = 'Poor',
  DEAD = 'Dead',
  VERY_POOR = 'Very Poor',
}

export interface DropdownLink {
  title: string;
  iconClass?: string;
  routerLink?: string;
}

export enum NavItemType {
  Sidebar = 1, // Only ever shown on sidebar
  NavbarLeft = 2, // Left-aligned icon-only link on navbar in desktop mode, shown above sidebar items on collapsed sidebar in mobile mode
  NavbarRight = 3, // Right-aligned link on navbar in desktop mode, shown above sidebar items on collapsed sidebar in mobile mode
}

export interface NavItem {
  type: NavItemType;
  title: string;
  routerLink?: string;
  iconClass?: string;
  numNotifications?: number;
  dropdownItems?: (DropdownLink | 'separator')[];
}

export interface IImage {
  id: number;
  note: string;
  thumbUrl: string;
  fullUrl: string;
  isDefault: boolean;
}
