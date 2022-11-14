import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [
    {title: 'First Slide', short: 'First Slide Description', src: "https://picsum.photos/id/102/900/500"},
    {title: 'Second Slide', short: 'Second Slide Description', src: "https://picsum.photos/id/1020/900/500"},
    {title: 'Third Slide', short: 'Third Slide Description', src: "https://picsum.photos/id/1024/900/500"},
    {title: 'Forth Slide', short: 'Forth Slide Description', src: "https://picsum.photos/id/102/900/500"},
    {title: 'Fifth Slide', short: 'Fifth Slide Description', src: "https://picsum.photos/id/1020/900/500"},
    {title: 'Sixth Slide', short: 'Sixth Slide Description', src: "https://picsum.photos/id/1024/900/500"}

  ];
  

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": true,
    "arrows": true,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
   
  constructor(config: NgbCarouselConfig) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  slides = [342, 453, 846, 855, 234, 564, 744, 243];


  addSlide() {
    this.slides.push(488)
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  ngOnInit(): void {
  }

}
