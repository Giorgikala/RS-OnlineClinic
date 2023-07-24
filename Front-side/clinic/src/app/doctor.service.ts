import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject, filter, retry } from 'rxjs';
import { Doctor } from './userInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'https://localhost:7067/api/Doctors/doctorss/'
  private apiUrlDelete = 'https://localhost:7067/api/Administrator'

  constructor(private http: HttpClient){

    
    
  }
  
  getFilteredDoctors(name: string): Observable<any[]> {
    const params = { name };
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getFilteredDoctorsByCategory(category: string): Observable<any[]> {
    const params = { category };
    return this.http.get<any[]>(this.apiUrl, { params });
  }
  DeleteDoctor(id:number): Observable<any[]>{
    const url = `${this.apiUrlDelete}/${id}`;
    return this.http.delete<any>(url);
  }
  
  
 
 

}

 





