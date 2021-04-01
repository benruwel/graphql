import { Component, OnInit } from '@angular/core';
import { PastLaunchesListGQL } from '../../services/spacex-gql.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  pastLaunches$ = this.pastLaunchesService
    .fetch({ limit: 30 })
    .pipe(map((res) => res.data.launchesPast));

  constructor(private pastLaunchesService: PastLaunchesListGQL) {}
  ngOnInit(): void {}
}
