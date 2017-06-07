import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HttpService } from './shared/services/http.service';
import { LoginService } from './shared/services/login.service';
import { AdminCanActivate } from './shared/activators/admin.activate';
import { LoggedUserCanActivate } from './shared/activators/logged-user.activate';

import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'seed-universal'
    }),
    HttpModule,
    AppRoutingModule,
    LoginModule
  ],
  declarations: [AppComponent],
  providers: [
    LoggedUserCanActivate,
    AdminCanActivate,
    LoginService,
    {
      provide: Http,
      useFactory: customHttpFactory,
      deps: [XHRBackend, RequestOptions, Router]
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function customHttpFactory(backend: XHRBackend, options: RequestOptions, router: Router) {
  return new HttpService(backend, options, router);
}
