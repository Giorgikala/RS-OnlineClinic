import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/categories.service';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor } from 'src/app/userInterface';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent implements OnInit {
  searchDoctor: any;
  img: any = this.route.snapshot.paramMap.get('id');
  isLoading = false;
  CategoryDoctor: any;
  viewArr: number = 0;

  searchResults: Doctor[] = [];
  searchTerm: string = '';
  AllDoctors;


  categoryFilter: string = '';
  filteredDoctors: any[] = [];

  constructor(
    public http: HttpService,
    private route: ActivatedRoute,
    private categoryServcie: CategoriesService,
    private DoctorService: DoctorService
  ) {}

  loadData() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  public ChangePlace(itemId: number) {
    const itemIndex = this.http.AllDoctors.findIndex(
      (item) => item.id === itemId
    );
    const temp = this.http.AllDoctors[itemIndex];
    this.http.AllDoctors[itemIndex] = this.http.AllDoctors[0];
    this.http.AllDoctors[0] = temp;
  }


  filterDoctors(cetegory) {
    this.DoctorService.getFilteredDoctorsByCategory(cetegory).subscribe(
      (doctors) => {
        this.http.AllDoctors = doctors;
      },
      (error) => {
        console.log('Error:', error);
      }
    ), complete =>{
      
    };
  }

  view(id) {
    this.img;
    this.viewArr++;
    localStorage.setItem('viewCount', this.viewArr.toString());
  }

  ngOnInit() {
    const doctroView = localStorage.getItem('viewCount');
    this.viewArr = doctroView ? parseInt(doctroView) : 0;

    this.http.GetAllDoctors().subscribe((response: any) => {
      this.http.AllDoctors = response;
      console.log(this.http.AllDoctors);
    });
    this.loadData();
  }

 
}
