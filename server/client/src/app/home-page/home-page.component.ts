import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('1000ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class HomePageComponent {
  activeSlideIndex = 0;

  slides = [
    {
      imageUrl: 'assets/automotive1.jpg',
      altText: 'Slide 1', 
      title: 'Quality Automotive Services', 
      description: 'Experience top-notch automotive services with our team of skilled technicians.'
    },
    { 
      imageUrl: 'assets/automotive2.jpg', 
      altText: 'Slide 2', 
      title: 'Reliable and Efficient Vehicles', 
      description: 'Discover our wide range of reliable and fuel-efficient vehicles tailored to your needs.' 
    },
    { 
      imageUrl: 'assets/automotive3.jpg', 
      altText: 'Slide 3', 
      title: 'Stay Safe on the Road', 
      description: 'Learn about the latest safety features and technologies that ensure a secure driving experience.' 
    }
  ];

  nextSlide(): void {
    this.activeSlideIndex++;
  }

  prevSlide(): void {
    this.activeSlideIndex--;
  }
}
