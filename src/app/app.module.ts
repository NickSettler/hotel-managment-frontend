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
import { ClientsTableViewComponent } from "./views/clients-view/clients-table-view/clients-table -view.component";
import { ServicesViewComponent } from "./views/services-view/services-view.component";
import { ClientsFormComponent } from "./views/clients-form/clients-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReservationsViewComponent } from "./views/reservations-view/reservations-view.component";
import { ReservationsStatsViewComponent } from "./views/reservations-view/reservations-stats-view/reservations-stats-view.component";
import { ReservationsTableViewComponent } from "./views/reservations-view/reservations-table-view/reservations-table-view.component";
import { LineChartComponent } from "./components/line-chart/line-chart.component";
import { ChartDataTransformPipe } from "./pipes/chart-data-transform.pipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ClientViewComponent } from "./views/clients-view/clients-table-view/client-view/client-view.component";
import { FilterDataByFuncPipe } from "./pipes/filter-data-by-func.pipe";
import { EmptyToNullDirective } from "./directives/empty-to-null.directive";
import { ErrorFormatterPipe } from "./pipes/error-formatter.pipe";
import { SuitesViewComponent } from "./views/suites-view/suites-view.component";
import { SuitesCapacityViewComponent } from "./views/suites-view/suites-capacity-view/suites-capacity-view.component";
import { JoinCollectionPipe } from "./pipes/join-collection.pipe";
import { MapCollectionPipe } from "./pipes/map-collection.pipe";
import { SuitesTableViewComponent } from "./views/suites-view/suites-table-view/suites-table-view.component";
import { SuiteViewComponent } from "./views/suites-view/suites-table-view/suite-view/suite-view.component";
import { FindCollectionPipe } from "./pipes/find-collection.pipe";
import { StopPropagationDirective } from "./directives/stop-propagation.directive";
import { SuiteDropdownMenuComponent } from "./components/suite-dropdown-menu/suite-dropdown-menu.component";
import { ReservationsFormComponent } from "./views/reservations-form/reservations-form.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { SuitesFormComponent } from "./views/suites-form/suites-form.component";
import { SuiteTypesTableViewComponent } from "./views/suites-view/suite-types-table-view/suite-types-table-view.component";
import { SuiteTypesFormComponent } from "./views/suite-types-form/suite-types-form.component";

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
    component: ClientsTableViewComponent,
  },
  {
    path: "clients/form",
    component: ClientsFormComponent,
  },
  {
    path: "clients/form/:passport",
    component: ClientsFormComponent,
  },
  {
    path: "clients/view/:passport",
    component: ClientViewComponent,
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
  {
    path: "reservations/form",
    component: ReservationsFormComponent,
  },
  {
    path: "reservations/form/:id",
    component: ReservationsFormComponent,
  },
  {
    path: "suites",
    component: SuitesViewComponent,
  },
  {
    path: "suites/capacity",
    component: SuitesCapacityViewComponent,
  },
  {
    path: "suites/table",
    component: SuitesTableViewComponent,
  },
  {
    path: "suites/types",
    component: SuiteTypesTableViewComponent,
  },
  {
    path: "suites/types/form",
    component: SuiteTypesFormComponent,
  },
  {
    path: "suites/types/form/:id",
    component: SuiteTypesFormComponent,
  },
  {
    path: "suites/form",
    component: SuitesFormComponent,
  },
  {
    path: "suites/:suiteNumber",
    component: SuiteViewComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    DrawerComponent,
    HomeViewClientsComponent,
    ClientsViewComponent,
    ClientsTableViewComponent,
    ServicesViewComponent,
    ClientsFormComponent,
    ReservationsViewComponent,
    ReservationsStatsViewComponent,
    ReservationsTableViewComponent,
    LineChartComponent,
    ChartDataTransformPipe,
    ClientViewComponent,
    FilterDataByFuncPipe,
    EmptyToNullDirective,
    ErrorFormatterPipe,
    SuitesViewComponent,
    SuitesCapacityViewComponent,
    JoinCollectionPipe,
    MapCollectionPipe,
    SuitesTableViewComponent,
    SuiteViewComponent,
    FindCollectionPipe,
    StopPropagationDirective,
    SuiteDropdownMenuComponent,
    ReservationsFormComponent,
    SuitesFormComponent,
    SuiteTypesTableViewComponent,
    SuiteTypesFormComponent,
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
    NgSelectModule,
    FormsModule,
    FontAwesomeModule,
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
