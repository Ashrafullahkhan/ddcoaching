import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor( public router:Router) { }

  ngOnInit(): void {
  }

  get email(){
    return this.logingForm.get("email")
  }
  get password(){
    return this.logingForm.get('password')
  }

  submit(){
    this.isSubmited = true;
    if(!this.logingForm.valid){
      return;
    } 
    const {email, password} = this.logingForm?.value;
  }

}
