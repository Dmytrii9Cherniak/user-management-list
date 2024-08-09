import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { UserTableListComponent } from './components/user-table-list/user-table-list.component';
import { ToastrModule } from 'ngx-toastr';
import { toastrConfig } from './configs/toastr.config';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    UserTableListComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(toastrConfig),
  ],
  exports: [
    ModalComponent
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
