import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DoctorService } from 'src/app/doctor.service';

@Component({
  selector: 'app-Admin-table',
  templateUrl: './Admin-table.component.html',
  styleUrls: ['./Admin-table.component.css'],
})
export class AdminTableComponent implements OnInit {
  Doctors: any;
  id: any;
  Doctordetail;
  isLoading = false;
  doctorId;

  constructor(
    private http: HttpService,
    private router: ActivatedRoute,
    private ht: HttpClient,
    private DoctorService: DoctorService,

    private cookieservice: CookieService,
    private route: Router
  ) {}

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
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

  ngOnInit() {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.http.GetAllDoctors().subscribe((data) => {
      this.Doctors = data;
      console.log(this.Doctors);
    });
    this.loadData();
  }

  GetDoctorById(id: any) {
    this.http.GetDoctorId(id).subscribe((res) => {
      this.Doctordetail = res;
    });
    console.log(this.Doctordetail);
  }
 
  deleteDoctor(id: number) {
    this.DoctorService.DeleteDoctor(id).subscribe(
      () => {
        alert('Doctor deleted successfully.');
        window.location.reload();
        this.Doctordetail(); // Refresh the doctors list after deletion
      },
      error => {
        console.log('Error:', error);
      }
    );
  }
}
