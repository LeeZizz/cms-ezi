import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '@app/core';
import { AuthService } from '@app/services';
import { ADMIN_MENU_ITEMS } from "../../modules";
import { MANAGER_MENU_ITEMS } from "../../modules/manager";
import { MEMBER_MENU_ITEMS } from "../../modules/member";
import { NbMenuItem } from "@nebular/theme";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  title: string;
  sub: any;
  menu: NbMenuItem[];

  constructor(private titleService: TitleService, private authService: AuthService) {
    this.title = 'CMS Ezi - Dashboard';
  }

  ngOnInit() {
    this.sub = this.titleService.titleSubject$.subscribe((newTitle: string) => setTimeout(() => this.title = newTitle));
    this.menu = [];
    this.menu.push(...ADMIN_MENU_ITEMS);
    this.menu.push(...MANAGER_MENU_ITEMS);
    this.menu.push(...MEMBER_MENU_ITEMS);

    /*
    this.authService.getRoles().forEach(role => {
      if (role === 'admin') {
        this.menu.push(...ADMIN_MENU_ITEMS);
      } else if (role === 'manager') {
        this.menu.push(...MANAGER_MENU_ITEMS);
      } else if (role === 'member') {
        this.menu.push(...MEMBER_MENU_ITEMS);
      }
    });
    */
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
