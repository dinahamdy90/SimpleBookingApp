import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwError } from 'rxjs';
import { NewBooking } from '../shared/models/booking.model';
import { BookingService } from '../shared/services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  @Input() resource:any;
  @Output() closeModel: EventEmitter<number> = new EventEmitter<number>();
  dateFrom: string =new Date().toISOString();
  dateTo: string =new Date().toISOString();
  quantity: number =1;
  errordisplay="none";
  errorMessage="";

  constructor(private _bookingService: BookingService) { }

  ngOnInit(): void {
  }

  bookResource(){
    var newBooking : NewBooking = 
    {
      dateFrom:this.dateFrom,
      dateTo:this.dateTo,
      bookedQuantity:this.quantity,
      resourceId:this.resource.id
    };
      this._bookingService.createBooking(newBooking).subscribe(res =>{
       // alert(res.bookingId.toString());
       this.errordisplay="none";
        this.closeModel.emit(res.bookingId);
      },(error: HttpErrorResponse) => {
        this.errordisplay="block";
        switch (error.status) {
          case 400:
            {
              if(error.error.errorcode == "QuantityUnavailable")
              {
                this.errorMessage = `Error: Quantity not available`;
              }
              else if(error.error.errorcode)
              {
                this.errorMessage = `Error: ${error.status} ${error.error.errorcode}`;
              }
              else if (error.error.errors)
              {
                this.errorMessage='Error: Validation errors occurred'
              }
              return throwError(this.errorMessage);
            }
          default: {

            this.errorMessage = `Error: ${error.status} ${error.message}`;

            return throwError(this.errorMessage);
          }
        }
       
      }
      )
  }

}
