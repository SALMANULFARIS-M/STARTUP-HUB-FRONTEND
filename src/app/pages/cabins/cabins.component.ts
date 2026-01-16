import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Cabin {
  id: string;
  name: string;
  image: string;
  hourly: number;
  daily: number;
  monthly: number;
  isBooked: boolean;
}

@Component({
  selector: 'app-cabins',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cabins.component.html',
  styleUrl: './cabins.component.css'
})
export class CabinsComponent {
  constructor(private fb: FormBuilder, private router: Router) { }
  cabins: Cabin[] = [
    {
      id: 'C1',
      name: 'Dubai Cabin',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      hourly: 1000,
      daily: 5000,
      monthly: 40000,
      isBooked: false
    },
    {
      id: 'C2',
      name: 'Tokyo Cabin',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
      hourly: 1000,
      daily: 5000,
      monthly: 42000,
      isBooked: false
    }
  ];

  selectedCabin: Cabin | null = null;
  bookingType: 'hourly' | 'daily' | 'monthly' = 'monthly';

  setBookingType(type: any) {
    this.bookingType = type;
  }
  selectCabin(cabin: Cabin) {
    if (cabin.isBooked) return;
    this.selectedCabin = cabin;
  }

  get totalAmount(): number {
    if (!this.selectedCabin) return 0;

    return this.bookingType === 'hourly'
      ? this.selectedCabin.hourly
      : this.bookingType === 'daily'
        ? this.selectedCabin.daily
        : this.selectedCabin.monthly;
  }
  proceedToPayment() {
    if (!this.selectedCabin) return;

    const bookingData = {
      type: 'CABIN',
      items: [{
        cabinId: this.selectedCabin.id,
        name: this.selectedCabin.name
      }],
      amount: this.totalAmount,
      meta: {
        bookingType: this.bookingType // hourly / daily / monthly
      }
    };

    this.router.navigate(['/payment'], {
      state: { bookingData }
    });
  }


}
