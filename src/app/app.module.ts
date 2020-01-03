import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AgmCoreModule } from "@agm/core";
import { HotelsMapComponent } from "./hotels-map/hotels-map.component";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [AppComponent, HotelsMapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyA6Uy3lAf60fvCHHQaDHmXBHyGAd9VEH5w"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
