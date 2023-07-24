import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './pages/mainpage/Registration/Registration.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { DoctorsDetailComponent } from './pages/mainpage/doctors-detail/doctors-detail.component';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CookieService } from 'ngx-cookie-service';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { DoctorRegistrationComponent } from './pages/doctor-registration/doctor-registration.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DoctorPageComponent } from './pages/doctor-page/doctor-page.component';
import { AuthGuardServiceTsService } from './auth-guard.service.ts.service';
import { AdminTableComponent } from './Administrator/Admin-table/Admin-table.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from "primeng/tabview";
import { AdminviewProfileComponent } from './Administrator/Adminview-profile/Adminview-profile.component';
import { SidebarModule } from 'primeng/sidebar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { registerLocaleData } from '@angular/common';









@NgModule({
  declarations: [	
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegistrationComponent,
    MainpageComponent,
    DoctorsDetailComponent,
    UserDetailComponent,
    DoctorRegistrationComponent,
    CalendarComponent,
    DoctorPageComponent,
    AdminTableComponent,
    AdminviewProfileComponent
    

    

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    TableModule,
    TabViewModule,
    SidebarModule,
    ProgressSpinnerModule
   



  
    
  
   
  ],
  providers: [AuthGuardServiceTsService,],
  bootstrap: [AppComponent,]
})
export class AppModule { }
