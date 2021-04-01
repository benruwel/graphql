import { Component, OnInit } from '@angular/core';
import { GetAllLiftsGQL, Lift } from '../../services/snow-tooth-gql.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'snow-tooth',
  templateUrl: './snow-tooth.component.html',
  styleUrls: ['./snow-tooth.component.css'],
})
export class SnowToothComponent implements OnInit {
  allLifts$ = this.getAllLiftsGQL.fetch().pipe(map((res) => res.data.allLifts));

  constructor(private getAllLiftsGQL: GetAllLiftsGQL) {}
  ngOnInit(): void {}
}
