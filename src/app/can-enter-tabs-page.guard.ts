import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class CanEnterTabsPageGuard implements CanActivate {

  constructor(private AngularFireAuth:AngularFireAuth, private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AngularFireAuth.authState.pipe(
      map((auth)=>{
        if(!auth){
          this.router.navigate(['/tabs'])
          return false
        }else{
          return true
        }
      })
    )
  }
  
}
