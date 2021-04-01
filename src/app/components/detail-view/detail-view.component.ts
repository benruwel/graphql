import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Launch,
  LaunchDetailsGQL,
  LaunchRocketFirstStageCore,
} from '../../services/spacex-gql.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApolloBase } from 'apollo-angular';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css'],
})
export class DetailViewComponent implements OnInit {
  private apollo: ApolloBase;

  launchDetails$: Observable<Launch> = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      return this.launchDetails.fetch({ id });
    }),
    map((res) => res.data.launch)
  );
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetails: LaunchDetailsGQL
  ) {}
  ngOnInit(): void {}
}
