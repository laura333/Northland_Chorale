import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { AboutComponent } from './about/about.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ProductService } from './tickets/products/product.service';
import { CartService } from './tickets/cart/cart.service';
import { CartComponent } from './tickets/cart/cart.component';
import { SumPipe } from './tickets/cart/sum.pipe';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'about', component: AboutComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'cart', component: CartComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
      // TODO: 404 component and html { path: '**', component: PageNotFoundComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    AboutComponent,
    TicketsComponent,
    CartComponent,
    SumPipe
  ],
  providers: [ProductService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
