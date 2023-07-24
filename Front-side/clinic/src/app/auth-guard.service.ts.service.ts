import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceTsService implements CanActivate {

  constructor(private rs: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot, 
     ): boolean | UrlTree | 
     Observable<boolean | UrlTree> | Promise<boolean 
     | UrlTree> {

    if(localStorage.getItem('currentUser')){
      return true;
    }
    else{
       alert("გთხოვთ გიაროთ რეგისტრაცია!")
        this.rs.navigate(['/registration']);
     
      return false;
    }

  }
}
