import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSubmited = false;
  logingForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  constructor(public authService:AuthService, public router:Router, private toast: HotToastService,) { }

  isSignedIn = false;
  ngOnInit(): void {
  }

  get email(){
    return this.logingForm.get("email")
  }
  get password(){
    return this.logingForm.get('password')
  }

  submit() {
    const { email, password } = this.logingForm.value;

    if (!this.logingForm.valid || !email || !password) {
      return;
    }

    this.authService
    .login(email, password)
    .pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: 'Logging in...',
        error: "Invalied Username or Password",
      })
    )
    .subscribe(() => {
      this.router.navigate(['/layout']);
    });
  
    
  }
  naviage(){
    this.router.navigate(['/sing'])
  }


}
