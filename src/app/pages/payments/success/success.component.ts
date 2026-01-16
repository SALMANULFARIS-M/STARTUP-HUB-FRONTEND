import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css'
})
export class SuccessComponent {
  bookingData: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.bookingData = nav?.extras?.state?.['bookingData'];
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
