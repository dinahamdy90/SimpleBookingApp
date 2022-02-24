import { Component, OnInit, ViewChild } from '@angular/core';
import { Resource } from '../shared/models/resource.model';
import { BookingService } from '../shared/services/booking.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  @ViewChild('closebutton') closebutton:any;
  resourceList:any = [];
  modalTitle:any;
  activateAddBooking:boolean = false;
  resource:any;
  successdisplay="none";
  successMessage="Booking Succeeded";
 
   constructor(
     private _bookingService: BookingService
   ) {}

  ngOnInit(): void {
    this.getResources();
  }

      // table functions
  getResources() {
    this._bookingService
      .getResources()
      .subscribe((res: Resource[]) => {
        this.resourceList = res;
      });
  }
  OpenBooking(resource: Resource)
  {
    this.successdisplay="none";
this.modalTitle=resource.name;
this.activateAddBooking = true;
this.resource = resource;

  }


  closeClick(){
    this.activateAddBooking=false;
  }

  onClose(bookingId:number): void {
    this.activateAddBooking = false;
    this.closebutton.nativeElement.click();
    this.successdisplay="block";
    console.log("EMAIL SENT TO admin@admin.com FOR CREATED BOOKING WITH ID " + bookingId);
  }

}
