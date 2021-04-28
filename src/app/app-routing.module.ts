import { ColorsSearchComponent } from './components/colors-search/colors-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.compoent';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { SnowToothComponent } from './components/snow-tooth/snow-tooth.component';

const routes: Routes = [
  { path: '', component: ListViewComponent },
  { path: 'snow-tooth', component: SnowToothComponent },
  { path: 'search', component: ColorsSearchComponent },
  { path: ':id', component: DetailViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
