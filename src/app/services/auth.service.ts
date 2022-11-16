import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
// import {
//   Auth,
//   signInWithEmailAndPassword,
//   authState,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   UserInfo,
//   UserCredential,
// } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth:AngularFireAuth, public router:Router) { }

  login(email: any, password: any):Observable<any>{
    return  from(this.auth.signInWithEmailAndPassword(email, password))
    
  }

  signUp(email: any, password: any, name:any,lastName: any,signUpAs: any, userName:any):Observable<any>{
    return from (this.auth.createUserWithEmailAndPassword(email, password))
  }
 
}
