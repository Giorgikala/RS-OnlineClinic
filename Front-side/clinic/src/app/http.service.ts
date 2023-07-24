import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DoctorService } from './doctor.service';

const httpOptions = {
 Headers: new HttpHeaders({
   'Accept-Language': 'ka'
 })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 category: string;
 name: string;
 AllDoctors: any;
  
   headers = new HttpHeaders({'Content-Type': 'application/json'})
   headersUtf = new HttpHeaders({'Content-Type': 'application/json;charset=utf-8', "Accept-Charset": "UTF-8"})
   .set('Accept-Language', 'ka');


   
  
  
  
  constructor(private http: HttpClient, private doctorService: DoctorService) { 
    
  }
  RegisterDoctor(DoctorObj: any){
    return this.http.post('https://localhost:7067/api/Doctors', DoctorObj)}
   
 
  


  RegisterUser(data: any){
    return this.http.post('https://localhost:7067/api/Auth/register', data )
  }
  SentCode(addressMail: string){
    return this.http.post(`https://localhost:7067/api/Auth/SentCode?addressMail=${addressMail}`, {
 })
  }

  GetAllDoctors(){
    // this.doctorService.updateFilteredDoctors(d);
    return this.http.get('https://localhost:7067/api/Doctors/doctorss/' )
  }

  GetDoctorId(id: any){
    return this.http.get('https://localhost:7067/api/Doctors/'+ id, 
    { headers:new HttpHeaders({
      "Authorization": 'Bearer ' + document.cookie.split(';').
      find(cookie =>
        cookie.startsWith("Token="))
        ?.split('=')[1]
    })})
  }
Login(email: any | null, password: any | null){
  const rs = {email: email, password: password};

  
  return this.http.post('https://localhost:7067/api/Auth/login', rs,)
}

Getparameters(){
  return this.http.get('https://localhost:7067/api/Auth/GetParameters',
  { headers:new HttpHeaders({
    "Authorization": 'Bearer ' + document.cookie.split(';').
    find(cookie =>
      cookie.startsWith("Token="))
      ?.split('=')[1]
  })})
}


DeleteDoctor(id: number){
  return this.http.delete('https://localhost:7067/api/Administrator/' + id)
}

Reservation(body: object){
  return this.http.post('https://localhost:7067/api/Reservation', body)
}
GetReservationId(id: number){
  return this.http.get('https://localhost:7067/api/Reservation/' + id)
}

DoctorRegistrationDisplay(id:number){
  return this.http.get('https://localhost:7067/api/Reservation/api/doctor/' + id )
}

DeleteReservationUser(body: object){
  return this.http.delete('https://localhost:7067/api/Reservation/DeleteUserReserve',
   {headers: this.headers,
   body:body})
}

DeleteReservationDoctro(body: object){
  return this.http.delete('https://localhost:7067/api/Reservation/DeleteReserve',
   {headers:this.headers,
   body:body})
}
  
}
