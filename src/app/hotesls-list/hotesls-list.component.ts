import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HotelsService } from '../services/hotels.service';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-hotesls-list',
  templateUrl: './hotesls-list.component.html',
  styleUrls: ['./hotesls-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoteslsListComponent {
  hotels$: Observable<Hotel[]> = this.hotelsService.hotels$.pipe(
    tap((el) => console.log(el))
  );
  constructor(public hotelsService: HotelsService) {}
}
