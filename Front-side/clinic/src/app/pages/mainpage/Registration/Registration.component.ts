import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-Registration',
  templateUrl: './Registration.component.html',
  styleUrls: ['./Registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private httpService: HttpService, private route: Router) {}

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    personalid: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    randomcode: new FormControl('', Validators.required),
  });

  Register() {
    this.httpService
      .RegisterUser({
        firstName: this.form.controls.firstName.value,
        lastname: this.form.controls.lastname.value,
        personalId: this.form.controls.personalid.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        randomcode: this.form.controls.randomcode.value,
      })
      .subscribe((response: any) => {
      
          console.log(response);
          alert('წარმატებით გაიარეთ რეგისტრაცია');
          this.route.navigate(['/mainpage']);

      });
      console.log(this.form.value);
     
  }
  GetCode() {
    this.httpService
      .SentCode(this.form.controls.email.value )
      .subscribe((res: string) => {
        
      });
  }
  
  
  ngOnInit() {}
}
