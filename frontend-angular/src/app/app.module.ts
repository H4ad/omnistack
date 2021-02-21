import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpAsyncFactory } from './factories/http-async/http-async.factory';
import { HttpAsyncService } from './services/http-async/http-async.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HttpAsyncService, useFactory: httpAsyncFactory, deps: [HttpClient] },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
