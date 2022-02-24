import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  Resource,
} from '../models/resource.model';
import { NewBooking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getResources() {
    return this.httpClient.get<Resource[]>(
      environment.bookingURL + '/Resource'
    );
  }


  createBooking(booking: NewBooking) {
    return this.httpClient.post<{ bookingId: number }>(
      environment.bookingURL + '/Booking',
      booking
    );
  }

  
}
