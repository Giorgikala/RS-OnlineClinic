import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { UserInterface } from '../userInterface';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private _header$ = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private primengConfig: PrimeNGConfig,
    private http: HttpService,
    private route: Router,
    private doctorsearch: DoctorService,
    private ht: HttpClient
  ) {}

  displayPosition: any | undefined;
  position: any;
  user;
  currentUser;
  admin;
  AllDoctors;
  searchTerm;
  filteredDoctors: any[] = [];
  nameFilter: string = '';

 

  filterDoctors() {
    this.doctorsearch.getFilteredDoctors(this.nameFilter).subscribe(
      (doctors) => {
        this.http.AllDoctors = doctors;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  Login() {
    this.http
      .Login(this.form.controls.email.value, this.form.controls.password.value)
      .subscribe((response: any) => {
        document.cookie = 'Token =' + response.token.myToken + ';';

        if (response.user) {
          this.user = JSON.stringify(response.user);
          localStorage.setItem('currentUser', this.user);
          alert('You Succefully Loged');
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.route.navigate(['/userdetail']);
        } else if (response.doctor) {
          this.user = JSON.stringify(response.doctor);
          localStorage.setItem('currentUser', this.user);
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.route.navigate(['/doctorpage']);
        } else if (response.admin) {
          this.admin = JSON.stringify(response.admin);
          localStorage.setItem('currentUser', this.admin);
          alert('Admin mode');
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.route.navigate(['/admin-table']);
        } else {
          this.route.navigate(['/doctorpage']);
        }
      });
  }

  ngOnInit(): void {
    this.filterDoctors();

    this.primengConfig.ripple = true;

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    if (this.currentUser.role == 'Admin') {
      this.admin = this.currentUser;
    }
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
