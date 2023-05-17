import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from "../services/person/user.service";
import {UserDTO} from "../dto/UserDTO";
import {switchMap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser:UserDTO;
  constructor(private userService: UserService,private router: Router,private toastrService: ToastrService) {
    this.userService.getUserCurrent().subscribe(data=>{
        this.currentUser=data;
    })
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot) {
  //       if (this.currentUser){
  //         let authorized = false;
  //         if (route.data.roles){
  //           for (const role of this.currentUser.roles){
  //             if (route.data.roles && route.data.roles.indexOf(role.authority) !== -1){
  //               authorized = true;
  //               break;
  //             }
  //           }
  //           if (!authorized){
  //             this.router.navigate([""]);
  //             return false;
  //           }
  //         }
  //       }
  //   console.log(this.currentUser);
  //       this.router.navigate(["/login"]);
  //   return true;
  // }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.getUserCurrent().pipe(
      switchMap((currentUser: UserDTO) => {
        if (currentUser) {
          let authorized = false;
          if (route.data.roles) {
            for (const role of currentUser.roles) {
              if (
                route.data.roles &&
                route.data.roles.indexOf(role.authority) !== -1
              ) {
                authorized = true;
                break;
              }
            }
            if (!authorized) {
              this.toastrService.error("Bạn không có quyền truy cập vào")
              return of(false);
            }
          }
          return of(true);
        }
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
