import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafeHtmlPipe} from './safe-html.pipe';
import {DateTimeFormatPipe} from './date-time-format.pipe';
import {SafeUrlPipe} from './safe-url.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SafeHtmlPipe,
    DateTimeFormatPipe,
    SafeUrlPipe,
  ],
  exports: [
    SafeHtmlPipe,
    DateTimeFormatPipe,
    SafeUrlPipe,
  ],
})
export class PipesModule {
}
