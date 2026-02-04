/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core';
import {ThemeModule} from './@theme';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbSidebarModule,
  NbTimepickerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {GuardService, InterceptorService, TitleService, ToasterService} from './core';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import {NbDateFnsDateModule} from "@nebular/date-fns";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ConfirmationPopoverModule.forRoot(),
    NbIconModule,
    AngularMultiSelectModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDateFnsDateModule.forRoot({}),
  ],
  bootstrap: [AppComponent],
  providers: [
    TitleService,
    GuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    ToasterService,
  ],
})
export class AppModule {
}
