import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { CookieService } from 'ngx-cookie-service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { retry } from 'rxjs';

@Component({
  selector: 'app-doctor-page',
  templateUrl: './doctor-page.component.html',
  styleUrls: ['./doctor-page.component.css'],
})
export class DoctorPageComponent implements OnInit {
  constructor(
    private http: HttpService,
    private route: Router,
    private cookie: CookieService
  ) {}
  @ViewChild('calendar') fullCalendar: FullCalendarComponent;

  CalendarValues;
  doctor: any;
  category;
  reservation;
  calendaroptons: CalendarOptions;
  saveData: any;
  deleteData: any;

  deletecookie() {
    localStorage.removeItem('currentUser');
    this.cookie.delete('Token');
    if (this.route.url === '/') {
      window.location.reload();
    } else {
      this.route.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  DeleteReservation() {
    this.saveData.map((data) => {
      if (data[1] === this.deleteData[0]) {
        console.log(data[1]);
        console.log(this.deleteData[0]);
        this.http
          .DeleteReservationDoctro({
            appointment: this.deleteData[0],
            doctorId: Number(this.doctor.id),
          })
          .subscribe((res) => {});
        window.location.reload();
      }
    });
  }

  ngOnInit() {
    this.saveData = [];
    this.deleteData = [];

    this.http.Getparameters().subscribe((resposne) => {
      this.doctor = resposne;

      this.http
        .DoctorRegistrationDisplay(this.doctor.id)
        .subscribe((response) => {
          const rs = Object.entries(response);
          this.saveData = rs;

          this.calendarOptions.events = this.saveData.map((res) => {
            return {
              title: 'დაჯავშნილია ',
              start: res[1],
              backgroundColor: 'green',
            };
          });
        });
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'ka',

    weekends: false,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
  };

  eventsPromise: Promise<EventInput>;

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
    const clickdate = arg.dateStr;

    const index = this.saveData.indexOf(clickdate);
    if (index === -1) {
      this.saveData.push(clickdate);
    } else {
      this.saveData.splice(index, 1);
    }
    this.deleteData[0] = arg.dateStr;

    this.calendarOptions.events = this.deleteData.map((data) => {
      return {
        title: 'წაშლა',
        start: data,
        backgroundColor: 'red',
      };
    });
  }
}
