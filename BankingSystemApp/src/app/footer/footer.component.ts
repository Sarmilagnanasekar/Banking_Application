import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone:false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();  // Dynamically set current year

  // Scroll to top functionality
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
