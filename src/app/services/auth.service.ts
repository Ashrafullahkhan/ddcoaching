import { Injectable } from "@angular/core";
// import {
//   Auth,
//   signInWithEmailAndPassword,
//   authState,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   UserInfo,
//   UserCredential,
// } from '@angular/fire/auth';
import { from, Observable, of, switchMap } from "rxjs";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from "@angular/fire/firestore";
import { profileUser } from "../models/user-profile";
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  UserProfile,
  GoogleAuthProvider,
} from "@angular/fire/auth";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    public auth: Auth,
    public router: Router,
    public firestore: Firestore,
    public afAuth: AngularFireAuth
  ) {}

  currentUser$ = authState(this.auth);
  userName:any;
  withGoogle = false;
  signUp(email: any, password: any): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: any, password: any): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  get currentUserProfile$(): Observable<profileUser | null> {
    return this.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, "users", user?.uid);
        return docData(ref) as Observable<profileUser>;
      })
    );
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  addUser(user: profileUser): Observable<any> {
    const ref = doc(this.firestore, "users", user?.uid);
    return from(setDoc(ref, user));
  }
  updateUser(user: profileUser): Observable<any> {
    const ref = doc(this.firestore, "users", user?.uid);
    return from(updateDoc(ref, { ...user }));
  }

  loginWithGoogle() {
    return this.authLogin(new GoogleAuthProvider());
  }

  authLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.withGoogle = true;
      this.userName = res.user?.displayName
      console.log("ther res is: ", res);
      this.router.navigate(["layout"]);
    });
  }
}
