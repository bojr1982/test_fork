import { NgModule } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomPaginator } from './custom/CustomPaginatorConfiguration';
import { LayoutUserModule } from './modules/layout-user/layout-user.module';
import { LoginModule } from './modules/login/login.module';
import { AuthenticationService } from './services/authentication.service';
@NgModule({
  declarations: [
    AppComponent,
  

  ],
  imports: [
    BrowserModule,
    LoginModule,
    LayoutUserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() },AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
