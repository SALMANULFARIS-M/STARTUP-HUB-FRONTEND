import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Seat {
  seatId: string;     // S1, S2 ...
  row: string;        // A, B, C
  number: number;     // 1, 2, 3
  price: number;      // 3000
  isBooked: boolean;
  selected?: boolean;
}

interface SeatRow {
  label: string;      // ROW A
  seats: Seat[];
}

@Component({
  selector: 'app-seats',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './seats.component.html',
  styleUrl: './seats.component.css'
})
export class SeatsComponent {
  /** RAW SEATS FROM BACKEND */
  seats: Seat[] = [];

  /** UI GROUPED ROWS */
  seatRows: SeatRow[] = [];

  /** SELECTED SEATS */
  selectedSeats: Seat[] = [];
  bookingForm: FormGroup;


  constructor(private fb: FormBuilder,private router:Router) {
    /** BOOKING FORM */
    this.bookingForm = this.fb.group({
      companyName: ['', Validators.required],
      contactName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchSeats();
  }

  /** MOCK BACKEND RESPONSE */
  fetchSeats() {
    // 🔴 Replace this with API later
    const totalSeats = 396;

    const temp: Seat[] = [];

    for (let i = 1; i <= totalSeats; i++) {
      const rowLetter = String.fromCharCode(65 + Math.floor((i - 1) / 20));
      temp.push({
        seatId: `S${i}`,
        row: rowLetter,
        number: i,
        price: 3000,
        isBooked: Math.random() < 0.15
      });
    }

    this.seats = temp;
    this.buildRows();
  }

  /** GROUP SEATS INTO ROWS */
  buildRows() {
    const map = new Map<string, Seat[]>();

    this.seats.forEach(seat => {
      if (!map.has(seat.row)) map.set(seat.row, []);
      map.get(seat.row)!.push(seat);
    });

    this.seatRows = Array.from(map.entries()).map(
      ([row, seats]) => ({
        label: `ROW ${row}`,
        seats
      })
    );
  }

  /** TOGGLE SEAT */
  toggleSeat(seat: Seat) {
    if (seat.isBooked) return;

    seat.selected = !seat.selected;

    this.selectedSeats = this.seats.filter(s => s.selected);
  }

  /** TOTAL AMOUNT */
  get totalAmount(): number {
    return this.selectedSeats.reduce((sum, s) => sum + s.price, 0);
  }

  /** SUBMIT BOOKING */
submitBooking() {
  if (this.bookingForm.invalid || this.selectedSeats.length === 0) return;

  const bookingData = {
    type: 'SEAT',
    items: this.selectedSeats.map(s => ({
      seatId: s.seatId,
      price: s.price
    })),
    amount: this.totalAmount,
    meta: {
      ...this.bookingForm.value
    }
  };

  this.router.navigate(['/payment'], {
    state: { bookingData }
  });
}


}
