import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgxElectronModule } from 'ngx-electron';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [WelcomeRoutingModule, NzTableModule, BrowserModule,
    NgxElectronModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
