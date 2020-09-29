import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HomeRoutingModule } from './home-routing.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListblogComponent } from './listblog/listblog.component';
import { AddblogComponent } from './addblog/addblog.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { QuillModule } from 'ngx-quill';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [HomeComponent, ListblogComponent, AddblogComponent],
  imports: [
    CommonModule,
    NzTableModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    IconsProviderModule,
    NzCardModule,
    NzAvatarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeRoutingModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzDatePickerModule,
    NzSelectModule,
    EditorModule,
    QuillModule.forRoot({}),
  ],
})
export class HomeModule {}
