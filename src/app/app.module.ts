import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import {
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS,
  NamedOptions,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ListViewComponent } from './components/list-view/list-view.compoent';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { InMemoryCache } from '@apollo/client/core';
import { SnowToothComponent } from './components/snow-tooth/snow-tooth.component';
@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    DetailViewComponent,
    SnowToothComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory(httpLink: HttpLink): NamedOptions {
        return {
          spacex: {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: 'https://api.spacex.land/graphql',
            }),
          },
          snowTooth: {
            cache: new InMemoryCache(),
            link: httpLink.create({
              uri: 'http://snowtooth.moonhighway.com/',
            }),
          },
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
