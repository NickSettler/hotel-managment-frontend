import { APP_INITIALIZER, isDevMode, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { HomeViewComponent } from "./views/home-view/home-view.component";
import { DrawerComponent } from "./components/drawer/drawer.component";
import { AppReducers } from "./store/app.reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppEffects } from "./store/app.effects";
import { EffectsModule } from "@ngrx/effects";
import { ConfigService } from "./services/config.service";
import { HttpClientModule } from "@angular/common/http";
import { NgxMasonryModule } from "ngx-masonry";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeViewClientsComponent } from "./views/home-view/home-view-clients/home-view-clients.component";
import { ClientsViewComponent } from "./views/clients-view/clients-view.component";
import { ClientsListViewComponent } from "./views/clients-view/clients-list-view/clients-list-view.component";
import { ServicesViewComponent } from "./views/services-view/services-view.component";
import { ClientsFormComponent } from "./views/clients-form/clients-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReservationsViewComponent } from "./views/reservations-view/reservations-view.component";
import { ReservationsStatsViewComponent } from "./views/reservations-view/reservations-stats-view/reservations-stats-view.component";
import { ReservationsTableViewComponent } from "./views/reservations-view/reservations-table-view/reservations-table-view.component";
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { ChartDataTransformPipe } from "./pipes/chart-data-transform.pipe";

const startUpFactory = (configService: ConfigService) => {
  return () => configService.load().then(() => console.log("Config loaded"));
};

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home",
  },
  {
    path: "home",
    component: HomeViewComponent,
  },
  {
    path: "clients",
    component: ClientsViewComponent,
  },
  {
    path: "clients/table",
    component: ClientsListViewComponent,
  },
  {
    path: "clients/new",
    component: ClientsFormComponent,
  },
  {
    path: "reservations",
    component: ReservationsViewComponent,
  },
  {
    path: "reservations/table",
    component: ReservationsTableViewComponent,
  },
  {
    path: "reservations/stats",
    component: ReservationsStatsViewComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    DrawerComponent,
    HomeViewClientsComponent,
    ClientsViewComponent,
    ClientsListViewComponent,
    ServicesViewComponent,
    ClientsFormComponent,
    ReservationsViewComponent,
    ReservationsStatsViewComponent,
    ReservationsTableViewComponent,
    LineChartComponent,
    ChartDataTransformPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducers),
    EffectsModule.forRoot(AppEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    AppRoutingModule,
    RouterOutlet,
    RouterModule.forRoot(routes),
    NgxMasonryModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: startUpFactory,
      deps: [ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
