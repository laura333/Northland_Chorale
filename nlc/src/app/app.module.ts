import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AboutComponent } from './about/about.component';
// import { TicketsComponent } from './tickets/tickets.component';

/* Feature Modules */
// import { TicketModule } from './tickets/tickets.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent
    // TicketsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      // { path: 'tickets', component: TicketsComponent },
      { path: 'welcome', component: WelcomeComponent },
      // { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      // { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
      // TODO: 404 component and html { path: '**', component: PageNotFoundComponent },
    ]),
    // TicketModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
