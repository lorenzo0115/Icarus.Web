import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { USER_ROLE } from 'src/app/types';

declare const $: any;

// Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
  auth: boolean;
  fontAwesome: boolean;
  role?: USER_ROLE[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
}

// Menu Items
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard',
    auth: true,
    fontAwesome: false,
    role: [USER_ROLE.ADMIN, USER_ROLE.COMPANY, USER_ROLE.CUSTOMER],
  },
  {
    path: '/company',
    title: 'Company',
    type: 'sub',
    icontype: 'business',
    auth: true,
    fontAwesome: false,
    role: [USER_ROLE.ADMIN, USER_ROLE.COMPANY],
    collapse: 'company',
    children: [
      { path: 'site', title: 'Site', ab: 'S' },
      { path: 'estimate', title: 'Estimate', ab: 'E' },
    ],
  },
  {
    path: '/customer',
    title: 'Customer',
    type: 'sub',
    icontype: 'pageview',
    auth: true,
    fontAwesome: false,
    role: [USER_ROLE.ADMIN, USER_ROLE.CUSTOMER],
    collapse: 'customer',
    children: [
      { path: 'site', title: 'Site', ab: 'S' },
      { path: 'estimate', title: 'Estimate', ab: 'E' },
    ],
  },
  // {
  //   path: '/company',
  //   title: 'Companies',
  //   type: 'link',
  //   icontype: 'business',
  //   auth: true,
  //   fontAwesome: false,
  //   role: [USER_ROLE.ADMIN, USER_ROLE.COMPANY],
  // },
  // {
  //   path: '/customer/site',
  //   title: 'Sites',
  //   type: 'link',
  //   icontype: 'pageview',
  //   auth: true,
  //   fontAwesome: false,
  //   role: [USER_ROLE.ADMIN, USER_ROLE.CUSTOMER],
  // },
  // {
  //   path: '/estimate',
  //   title: 'Estimates',
  //   type: 'link',
  //   icontype: 'fas fa-file-invoice-dollar',
  //   auth: true,
  //   fontAwesome: true,
  //   role: [USER_ROLE.ADMIN, USER_ROLE.CUSTOMER],
  // },
];
@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ps: any;
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
      this.ps = new PerfectScrollbar(elemSidebar);
    }
  }
  updatePS(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      this.ps.update();
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
