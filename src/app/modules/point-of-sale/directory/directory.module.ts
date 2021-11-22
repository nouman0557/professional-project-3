import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { DirectoryRouting } from './directory.routing';
import { ViewDirectoryComponent } from './view-directory/view-directory.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as index from './index';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CollapseModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';


@NgModule({
  imports: [
    CommonModule,
    DirectoryRouting,
    CarouselModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  declarations: [DirectoryComponent, index.directoryComponents]
})
export class DirectoryModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://18.133.56.191/graphql'}),
      cache: new InMemoryCache()
    });
  }
}
