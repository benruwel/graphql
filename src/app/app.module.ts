import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import {
  APOLLO_NAMED_OPTIONS,
  APOLLO_OPTIONS,
  NamedOptions,
} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { AppComponent } from './app.component';
import { ColorsSearchComponent } from './components/colors-search/colors-search.component';
import { ListViewComponent } from './components/list-view/list-view.compoent';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { InMemoryCache } from '@apollo/client/core';
import { SnowToothComponent } from './components/snow-tooth/snow-tooth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ColorsSearchComponent,
    ListViewComponent,
    DetailViewComponent,
    SnowToothComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
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
