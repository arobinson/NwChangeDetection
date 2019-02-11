import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NwDefaultComponent } from './nw-default/nw-default.component';
import { NwHeaderComponent } from './nw-header/nw-header.component';
import { NwLogsComponent } from './nw-logs/nw-logs.component';
import { NwMouseComponent } from './nw-mouse/nw-mouse.component';
import { NwPushComponent } from './nw-push/nw-push.component';

@NgModule({
  declarations: [
    AppComponent,
    NwLogsComponent,
    NwDefaultComponent,
    NwHeaderComponent,
    NwMouseComponent,
    NwPushComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
