import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './pages/mainpage/Registration/Registration.component';
import { DoctorsDetailComponent } from './pages/mainpage/doctors-detail/doctors-detail.component';

import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { DoctorRegistrationComponent } from './pages/doctor-registration/doctor-registration.component';
import { DoctorPageComponent } from './pages/doctor-page/doctor-page.component';
import { AuthGuardServiceTsService } from './auth-guard.service.ts.service';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { AdminTableComponent } from './Administrator/Admin-table/Admin-table.component';
import { AdminviewProfileComponent } from './Administrator/Adminview-profile/Adminview-profile.component';


const routes: Routes = [

  {path: '', component: MainpageComponent, },
  {path: 'registration', component: RegistrationComponent, },
  {path: 'detail/:id', component: DoctorsDetailComponent, },
  {path: 'userdetail', component: UserDetailComponent, 
      canActivate: [AuthGuardServiceTsService]  },
  {path: 'doctorregistration', component: DoctorRegistrationComponent},
  {path: 'doctorpage', component: DoctorPageComponent,},
  {path: 'admin-table', component: AdminTableComponent,
       canActivate: [AuthGuardServiceTsService]},
  {path: 'admin-view/:id', component:AdminviewProfileComponent,
       canActivate: [AuthGuardServiceTsService]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
