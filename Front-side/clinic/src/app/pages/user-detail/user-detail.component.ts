import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  @ViewChild(NavbarComponent) viewdata!: NavbarComponent;
  user: any;
  event;
  currnetUlr;
  saveData;
  calendaroptons: CalendarOptions;
  deleteData: any;

  constructor(
    private http: HttpService,
    private route: Router,
    private cookieservice: CookieService
  ) {}

  deletecookie() {
    localStorage.removeItem('currentUser');
    this.cookieservice.delete('Token');
    if (this.route.url === '/') {
      window.location.reload();
    } else {
      this.route.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }
  deleteReservation() {
    this.saveData.map((data) => {
      if (data[1] === this.deleteData[0]) {
        this.http
          .DeleteReservationUser({
            appointment: this.deleteData[0],
            userId: Number(this.user.id),
          })
          .subscribe((res) => {


          });
        window.location.reload();
      }
    })
  }

  ngOnInit() {
    this.saveData = [];
    this.deleteData = [];

    this.http.Getparameters().subscribe((resposne) => {
      this.user = resposne;
      this.event = JSON.parse(localStorage.getItem('currentUser'));
    });
    const userID = JSON.parse(localStorage.getItem('currentUser')).id;

    this.http.GetReservationId(userID).subscribe((res) => {
      const reservariton = Object.entries(res);
      this.saveData = reservariton;

      this.calendarOptions.events = this.saveData.map((arr) => {
        return {
          title: 'დაჯავშნილია ',
          start: arr[1],
          backgroundColor: 'blue',
        };
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
      right: 'timeGridWeek,timeGridDay,',
    },
  };
  eventsPromise: Promise<EventInput>;

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
    const clickdate = arg.dateStr;
    const index = this.saveData.indexOf(this.calendarOptions);
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
