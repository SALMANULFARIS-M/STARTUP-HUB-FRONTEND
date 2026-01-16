import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processing',
  imports: [],
  templateUrl: './processing.component.html',
  styleUrl: './processing.component.css'
})
export class ProcessingComponent {
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const bookingData = nav?.extras?.state?.['bookingData'];
    setTimeout(() => {
      this.router.navigate(['/payment/success'], {
        state: { bookingData }
      });
    }, 2500);
  }

}
