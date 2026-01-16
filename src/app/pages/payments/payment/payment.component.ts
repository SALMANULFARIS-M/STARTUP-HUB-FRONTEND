import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent {
  bookingData: any;
  amount = 0;
  selectedMethod: 'upi' | 'card' | 'netbanking' | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.bookingData = nav?.extras?.state?.['bookingData'];

    if (!this.bookingData) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.amount = this.bookingData.amount;
  }

  proceed() {
    if (!this.selectedMethod) return;

    this.router.navigate(['/payment/processing'], {
      state: { bookingData: this.bookingData }
    });
  }
}
