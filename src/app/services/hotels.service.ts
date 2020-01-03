import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LatLngLiteral } from "@agm/core";
import { environment } from "src/environments/environment";
import { DiscoverResponse } from "../models/here-autosuggest-response";
import { Subject, Observable } from "rxjs";
import { debounceTime, switchMap, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HotelsService {
  private _hotelsRequested = new Subject<LatLngLiteral>();

  hotels$: Observable<any[]> = this._hotelsRequested.asObservable().pipe(
    debounceTime(400),
    switchMap(location => this._getHotels(location)),
    map(res => res.results)
  );

  constructor(private http: HttpClient) {}

  locationChange(location: LatLngLiteral) {
    this._hotelsRequested.next(location);
  }

  private _getHotels({ lat, lng }: LatLngLiteral) {
    const params = {
      apiKey: environment.hereAPIKey,
      at: `${lat},${lng}`,
      q: "hotel"
    };
    return this.http.get<DiscoverResponse>(
      `https://places.sit.ls.hereapi.com/places/v1/autosuggest`,
      { params }
    );
  }
}
