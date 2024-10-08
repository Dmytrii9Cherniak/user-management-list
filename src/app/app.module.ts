import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { UserTableListComponent } from './components/user-table-list/user-table-list.component';
import { ToastrModule } from 'ngx-toastr';
import { toastrConfig } from './configs/toastr.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { errorInterceptor } from './interceptors/error.interceptor';
import {
  SvgIconComponent
} from './components/custom-icon-component/custom-icon-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    UserTableListComponent,
    SvgIconComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrConfig),
    ReactiveFormsModule
  ],
  exports: [
    ModalComponent,
    SvgIconComponent
  ],
  providers: [
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
