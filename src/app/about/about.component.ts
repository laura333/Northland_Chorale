import { Component, OnInit } from '@angular/core';
import { Carousel } from './carousel';
import { IMAGES } from './images';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public images = IMAGES;

  constructor() { }

  ngOnInit() { }

}
