import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-doctor-registration',
  templateUrl: './doctor-registration.component.html',
  styleUrls: ['./doctor-registration.component.css'],
})
export class DoctorRegistrationComponent implements OnInit {
  @ViewChild ('myForm') myForm: ElementRef;
  constructor(
    private http: HttpService,
    private route: Router,
    private ht: HttpClient,
    private formbuilder: FormBuilder
  ) {}
  ngOnInit(): void {
  
 
  }
  submit(){
    const formData = new FormData();
    const formElement = this.myForm.nativeElement as HTMLFormElement;

    const firstName = (formElement.elements.namedItem('Firstname') as HTMLInputElement)?.value;
    const lastName = (formElement.elements.namedItem('Lastname') as HTMLInputElement)?.value;
    const personalId = (formElement.elements.namedItem('Personalid') as HTMLInputElement)?.value;
    const email = (formElement.elements.namedItem('Email') as HTMLInputElement)?.value;
    const password = (formElement.elements.namedItem('Password') as HTMLInputElement)?.value;
    const category = (formElement.elements.namedItem('Category') as HTMLInputElement)?.value;
    
    const Photo = (formElement.elements.namedItem("Photo") as HTMLInputElement)?.files[0];
    const cv = (formElement.elements.namedItem("Cv") as HTMLInputElement)?.files[0];

    formData.append('Firstname', firstName);
    formData.append('Lastname', lastName);
    formData.append('Personalid', personalId);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('Category', category);
    formData.append('Photo', Photo);
    formData.append('Cv', cv);

    return this.http.RegisterDoctor(formData).subscribe(x =>
      console.log(x)
      
     
    
    , err => console.log(err));
    

    
    



  }





  // this.form = new FormGroup({
  //   Firstname: new FormControl('', Validators.required),
  //   Lastname: new FormControl('', Validators.required),
  //   Photo: new FormControl('', Validators.required),
  //   Email: new FormControl('', Validators.required),
  //   Password: new FormControl('', Validators.required),
  //   Cv: new FormControl('', Validators.required),
  //   Category: new FormControl('', Validators.required),
  //   Personalid: new FormControl('', Validators.required),
  // });

  // createDataForm(data: any) {
  //   let formdata = new FormData();
  //   for (const key in data) {
  //     formdata.append(key, data[key]);
  //   }
  //   return formdata;
  // }

  // sumbit() {
  //   const form = {
  //     Firstname: this.form.get('Firstname').value,
  //     Lastname: this.form.get('Lastname').value,
  //     Photo: this.form.get('Photo').value,
  //     Email: this.form.get('Email').value,
  //     Password: this.form.get('Password').value,
  //     Cv: this.form.get('Cv').value,
  //     Category: this.form.get('Category').value,
  //     Personalid: this.form.get('Personalid').value,
  //   };
  //   this.http
  //     .RegisterDoctor(this.createDataForm(form))

  //     .subscribe((res) => {
  //       console.log(form);
  //       alert('Uploaded Successfully.');
  //     });







  //   // console.log(this.form);
  // }
  // registerDoctor(){

  //   this.http.RegisterDoctor({
  //     FirstName: this.form.controls.FirstName.value,
  //     Lastname: this.form.controls.Lastname.value,
  //     Photo: this.form.controls.Photo.value,
  //     Email: this.form.controls.Email.value,
  //     Cv: this.form.controls.Cv.value,
  //     Personalid: this.form.controls.Personalid.value,
  //     Password: this.form.controls.Password.value,
  //     Category: this.form.controls.Category.value,
  //   }

  //   ).subscribe((response: any) => {

  //     console.log(response);
  //     alert('წარმატებით გაიარეთ ექიმის რეგისტრაცია');
  //     this.route.navigate(['mainpage']);

  // });
}
