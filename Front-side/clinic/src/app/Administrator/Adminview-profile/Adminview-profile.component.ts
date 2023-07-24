import { Component, OnInit } from '@angular/core';
import { TabView } from 'primeng/tabview';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, ResolveStart } from '@angular/router';
import { renderScrollShim } from '@fullcalendar/core/internal';

@Component({
  selector: 'app-Adminview-profile',
  templateUrl: './Adminview-profile.component.html',
  styleUrls: ['./Adminview-profile.component.css'],
})
export class AdminviewProfileComponent implements OnInit {
  sidebarVisible: boolean;
  Doctors;
  id: any;
  Doctordetail;
  rs;
  calendaroptons: CalendarOptions;
  saveData: any;
  deleteData: any;

  constructor(private http: HttpService, private route: ActivatedRoute) {}

  DeleteReservation() {
    
    this.saveData.map(
      (data) => {
        if (data[1] === this.deleteData[0]) {
          console.log(data[1]);
          console.log(this.deleteData[0]);
          this.http
            .DeleteReservationDoctro({
              appointment: this.deleteData[0],
              doctorId: Number(this.id)
            })
            .subscribe((res) => {
              console.log(res);
            });
          window.location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    );
    debugger
  }

  ngOnInit() {
    this.saveData = [];
    this.deleteData = [];
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.GetDoctorById(this.id);
    });
    this.http.DoctorRegistrationDisplay(this.id).subscribe((response) => {
      const r = Object.entries(response);
      this.saveData = r;
      this.calendarOptions.events = this.saveData.map((response) => {
        return {
          title: 'დაჯავშნილია ',
          start: response[1],
          backgroundColor: 'green',
        };
      });
    });
  }

  GetDoctorById(id: any) {
    this.http.GetDoctorId(id).subscribe((res: any) => {
      this.Doctordetail = res;

    
      console.log(this.Doctordetail);
    });
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: 'ka',
    slotMinTime: '09:00:00',
    slotMaxTime: '19:00:00',
    // slotDuration: '01:00:00',
    // startTime: '09:00',
    // endTime: '17:00:00',

    weekends: false,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    events: [],
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
