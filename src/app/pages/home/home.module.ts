import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HomeRoutingModule } from './home-routing.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListblogComponent } from './listblog/listblog.component';
import { AddblogComponent } from './addblog/addblog.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [HomeComponent, ListblogComponent, AddblogComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzCardModule,
    NzAvatarModule,
    FormsModule,
    HttpClientModule,
    HomeRoutingModule,
    EditorModule,
    QuillModule.forRoot({}),
  ],
})
export class HomeModule {}
