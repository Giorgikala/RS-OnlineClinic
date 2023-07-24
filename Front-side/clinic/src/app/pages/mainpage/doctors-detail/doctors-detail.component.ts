import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-doctors-detail',
  templateUrl: './doctors-detail.component.html',
  styleUrls: ['./doctors-detail.component.css'],
})
export class DoctorsDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private htpp: HttpService,
    private router: Router
  ) {}

  saveData: any;
  id: any;
  Doctordetail: any;
  calendaroptons: CalendarOptions;
  user;

  ngOnInit() {
    this.saveData = [];
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.GetDoctorById(this.id);
    this.htpp.DoctorRegistrationDisplay(this.id).subscribe((response) => {
      const rs = Object.entries(response);

      this.calendarOptions.events = rs.map((res) => {
        return {
          title: 'დაჯავშნილია ',
          start: res[1],
          backgroundColor: 'green',
        };
      });
    });
  }

  GetDoctorById(id: any) {
    this.htpp.GetDoctorId(id).subscribe((res) => {
      this.Doctordetail = res;
      
    });
   
    
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'ka',
    slotMinTime: '09:00:00',
    slotMaxTime: '19:00:00',

    weekends: false,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      center: 'prev,next today',
      left: 'title',
      right: 'timeGridWeek,timeGridDay,listWeek',
    },
  };
  eventsPromise: Promise<EventInput>;

  handleDateClick(arg) {
    const clickdate = arg.dateStr;
    const index = this.saveData.indexOf(clickdate);
    if (index === -1) {
      this.saveData.push(clickdate);
    } else {
      this.saveData.splice(index, 1);
    }

    
    if (!localStorage.getItem('currentUser')) {
      alert('გთხოვთ გაიაროთ რეგისტრაციან ან ავტორიზაცია!!');
      return ;
    }
     this.user = JSON.parse(localStorage.getItem('currentUser'))
     if(this.user.role == 'Admin'){
      return ;
     }
    this.calendarOptions.events = this.saveData.map((date) => {


       this.htpp
       .Reservation({
         appointment: this.saveData[0],
         userId: Number(JSON.parse(localStorage.getItem('currentUser')).id),
 
         doctorId: Number(this.id),
       })
       .subscribe(() => {});
   


      return {
        title: 'დაჯავშნა ',
        start: date,
        backgroundColor: 'red',
      }
    });

  }


     

}
