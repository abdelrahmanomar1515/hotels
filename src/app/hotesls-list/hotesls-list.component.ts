import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';
import { tap } from 'rxjs/operators';
import { Place } from '../models/here-autosuggest-response';

@Component({
  selector: 'app-hotesls-list',
  templateUrl: './hotesls-list.component.html',
  styleUrls: ['./hotesls-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoteslsListComponent {
  loading$: Observable<boolean> = this.hotelsService.loading$;
  hotels$: Observable<Hotel[]> = this.hotelsService.hotels$.pipe(
    tap((el) => console.log(el))
  );

  constructor(public hotelsService: HotelsService) {}

  hotelTrackByFunction(index: number, item: Partial<Hotel>) {
    return item.id;
  }
}
