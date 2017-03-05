import { Component, OnInit, Renderer } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private renderer: Renderer) { }

  ngOnInit() {
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_MlnEwz9cJz5t78rk5wT4eS4v',
      image: "https://s3.amazonaws.com/stripe-uploads/acct_19q721CW6OOcqpDhmerchant-icon-1487890697833-note.png",
      locale: 'auto',
      token: function(token: any) {

        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'Northland Chorale',
      description: 'tickets to "30 Years of Broadway"',
      amount: 1500
    });
  }

}
