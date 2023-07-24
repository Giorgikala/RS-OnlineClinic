import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  es: any;

  constructor() {}
  ngOnInit() {}

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
    events: [
      { title: 'დაჯავშნილია ', date: '2023-04-20' },
      { title: 'დაჯავშნილია ', date: '2023-04-19' },
      { title: 'დასვენების დღე', date: '2023-05-31' },
    ],
  };
  eventsPromise: Promise<EventInput>;

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }
}
