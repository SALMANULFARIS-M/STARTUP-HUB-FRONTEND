import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Slot {
  time: string;
  booked: boolean;
  selected?: boolean;
}

interface TrainingRoom {
  id: string;
  name: string;
  image: string;
  hourlyPrice: number;
  dailyPrice: number;
  slots: Slot[];
}

@Component({
  selector: 'app-training-rooms',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-rooms.component.html',
  styleUrl: './training-rooms.component.css'
})
export class TrainingRoomsComponent {

  constructor(private router: Router) { }
  rooms: TrainingRoom[] = [
    {
      id: 'TR1',
      name: 'Training Room Alpha',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095',
      hourlyPrice: 1000,
      dailyPrice: 5000,
      slots: [
        { time: '09:00 – 10:00', booked: false },
        { time: '10:00 – 11:00', booked: true },
        { time: '11:00 – 12:00', booked: false },
        { time: '14:00 – 15:00', booked: false }
      ]
    },
    {
      id: 'TR2',
      name: 'Training Room Beta',
      image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3',
      hourlyPrice: 1000,
      dailyPrice: 5000,
      slots: [
        { time: '09:00 – 10:00', booked: false },
        { time: '10:00 – 11:00', booked: false },
        { time: '11:00 – 12:00', booked: true },
        { time: '15:00 – 16:00', booked: false }
      ]
    }
  ];

  selectedRoom: TrainingRoom | null = null;
  bookingType: 'hourly' | 'daily' = 'hourly';

  selectRoom(room: TrainingRoom) {
    this.selectedRoom = room;
    room.slots.forEach(s => (s.selected = false));
  }

  toggleSlot(slot: Slot) {
    if (slot.booked || this.bookingType !== 'hourly') return;
    slot.selected = !slot.selected;
  }

  get selectedSlots(): Slot[] {
    return this.selectedRoom?.slots.filter(s => s.selected) || [];
  }

  get totalAmount(): number {
    if (!this.selectedRoom) return 0;

    return this.bookingType === 'daily'
      ? this.selectedRoom.dailyPrice
      : this.selectedSlots.length * this.selectedRoom.hourlyPrice;
  }
  proceedToPayment() {
    if (!this.selectedRoom) return;

    const bookingData = {
      type: 'TRAINING_ROOM',
      items: this.selectedSlots.map(s => ({
        slot: s.time
      })),
      amount: this.totalAmount,
      meta: {
        roomId: this.selectedRoom.id,
        roomName: this.selectedRoom.name,
        bookingType: this.bookingType // hourly / daily
      }
    };

    this.router.navigate(['/payment'], {
      state: { bookingData }
    });
  }


}
