import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, StoreModule.forRoot({}, {}), AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
