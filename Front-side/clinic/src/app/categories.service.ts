import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService   {
  Doctors: any = [];

  constructor(private http: HttpClient, private ht: HttpService) {}
  private selectedCategorySubject = new BehaviorSubject<any | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  getDoctorsByCategory(item: number): [] {
    return this.Doctors.filter((item) => item.id === item);
  }
  setSelecteCatagery(item: any) {
    this.selectedCategorySubject.next(item);
  }

  
}
