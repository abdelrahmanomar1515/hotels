import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { MouseEvent, LatLngLiteral } from '@agm/core';
import { HotelsService } from '../services/hotels.service';
import { MapMarker } from '../models/map-marker';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Place } from '../models/here-autosuggest-response';

@Component({
  selector: 'app-hotels-map',
  templateUrl: './hotels-map.component.html',
  styleUrls: ['./hotels-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsMapComponent implements AfterViewInit {
  hotels$: Observable<MapMarker[]> = this.hotelsService.hotels$.pipe(
    map((hotels) =>
      hotels.map((hotel) => {
        return {
          lat: hotel.position && hotel.position[0],
          lng: hotel.position && hotel.position[1],
          label: hotel.title
        };
      })
    )
  );

  // google maps zoom level
  zoom = 12;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  constructor(private hotelsService: HotelsService) {}

  ngAfterViewInit() {
    this.hotelsService.locationChange({ lat: this.lat, lng: this.lng });
  }

  hotelTrackByFunction(index: number, item: Partial<Place>) {
    return item.id;
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  onCenterChange(event: LatLngLiteral) {
    this.hotelsService.locationChange(event);
  }
}
