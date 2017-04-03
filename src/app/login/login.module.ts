import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginRoutingModule
  ],
  exports: [],
  declarations: [LoginComponent],
  providers: [],
})
export class LoginModule { }
