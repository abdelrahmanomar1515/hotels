import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLngLiteral } from '@agm/core';
import { environment } from 'src/environments/environment';
import { DiscoverResponse } from '../models/here-autosuggest-response';
import { Subject, Observable, EMPTY } from 'rxjs';
import { debounceTime, switchMap, map, catchError, tap } from 'rxjs/operators';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private loadingSubject = new Subject<boolean>();
  private hotelsRequested = new Subject<LatLngLiteral>();

  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  hotels$: Observable<Hotel[]> = this.hotelsRequested.asObservable().pipe(
    debounceTime(400),
    tap(() => this.loadingSubject.next(true)),
    switchMap((location) =>
      this.getHotels(location).pipe(catchError((error) => EMPTY))
    ),
    map(
      (res) =>
        (res.results &&
          (res.results.filter((hotel) => hotel.position) as Hotel[])) ||
        []
    ),
    tap(() => this.loadingSubject.next(false))
  );

  constructor(private http: HttpClient) {}

  locationChange(location: LatLngLiteral) {
    this.hotelsRequested.next(location);
  }

  private getHotels({ lat, lng }: LatLngLiteral) {
    const params = {
      apiKey: environment.hereAPIKey,
      at: `${lat},${lng}`,
      q: 'hotel'
    };
    return this.http.get<DiscoverResponse>(
      `https://places.sit.ls.hereapi.com/places/v1/autosuggest`,
      { params }
    );
  }
}
