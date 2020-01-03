import { Component, OnInit } from '@angular/core';
import { MouseEvent, LatLngLiteral } from '@agm/core';
import { HotelsService } from '../services/hotels.service';
import { MapMarker } from '../models/map-marker';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-hotels-map',
  templateUrl: './hotels-map.component.html',
  styleUrls: ['./hotels-map.component.scss']
})
export class HotelsMapComponent {
  hotels$: Observable<MapMarker[]> = this.hotelsService.hotels$.pipe(
    map((hotels) =>
      hotels
        .filter((hotel) => hotel.position)
        .map((hotel) => {
          return {
            lat: hotel.position && hotel.position[0],
            lng: hotel.position && hotel.position[1],
            label: hotel.title
          };
        })
    )
  );

  // google maps zoom level
  zoom = 8;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  constructor(private hotelsService: HotelsService) {}

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {}

  markerDragEnd(m: MapMarker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  onCenterChange(event: LatLngLiteral) {
    console.log(event);
    this.hotelsService.locationChange(event);
  }
}
