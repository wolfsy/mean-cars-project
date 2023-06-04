import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent {
  redirectToFacebook(): void {
    window.location.href = 'https://www.facebook.com';
  }

  redirectToTwitter(): void {
    window.location.href = 'https://www.twitter.com';
  }

  redirectToInstagram(): void {
    window.location.href = 'https://www.instagram.com';
  }
}
