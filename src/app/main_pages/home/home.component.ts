import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleService } from '@app/core';
import { AuthService } from '@app/services';
import { ADMIN_MENU_ITEMS } from "../../modules";
import { NbMenuItem } from "@nebular/theme";
import { ProjectCategoryService } from "../../services/admin/project-category.service";
import { ProjectCategory } from '../../models/admin/project-category';
import { pathJoin } from '../../core/utils';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  title: string;
  sub: any;
  menu: NbMenuItem[];

  constructor(
    private titleService: TitleService,
    private authService: AuthService,
    private categoryService: ProjectCategoryService,
    private http: HttpClient
  ) {
    this.title = 'CMS Ezi - Dashboard';
  }

  ngOnInit() {
    this.sub = this.titleService.titleSubject$.subscribe((newTitle: string) => setTimeout(() => this.title = newTitle));
    this.loadMenu();
  }

  loadMenu() {
    // Sử dụng menu tĩnh từ ADMIN_MENU_ITEMS
    this.menu = JSON.parse(JSON.stringify(ADMIN_MENU_ITEMS));

    // Vẫn gọi API để kiểm tra kết nối nhưng không còn gán vào menu con để tránh "dạng bay"
    const apiURL = pathJoin(['admin', 'project-categories']);
    this.http.get(apiURL).subscribe(() => { }, () => { });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
