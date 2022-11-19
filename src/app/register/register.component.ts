import { Component, OnInit } from "@angular/core";
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passowrd = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;
    if (passowrd && confirmPassword && passowrd !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  isSubmited = false;

  signupForm = new FormGroup(
    {
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl(""),
      userName: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      confirmPassword: new FormControl("", Validators.required),
      signUpAs: new FormControl("0", Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  constructor(private router: Router, public authSerivce:AuthService, private toast: HotToastService) {}

  ngOnInit(): void {}

  get name() {
    return this.signupForm.get("firstName");
  }

  get lastName() {
    return this.signupForm.get("lastName");
  }

  get userName() {
    return this.signupForm.get("userName");
  }

  get email() {
    return this.signupForm.get("email");
  }

  get password() {
    return this.signupForm.get("password");
  }

  get confirmPassword() {
    return this.signupForm.get("confirmPassword");
  }

  get signupAs() {
    return this.signupForm.get("signUpAs");
  }

  submit() {
    this.isSubmited = true
    console.log('the data...', this.signupForm.value);
    
    if (!this.signupForm.valid) return;
    // const firstName = this.name
    // const lastName = this.lastName;
    // const signUpAs = this.signupAs;
    // const userName = this.userName
    // const email = this.email;
    // const password = this.password
    const { firstName, lastName, userName, email, password, signUpAs } =
      this.signupForm.value;
      this.authSerivce.signUp(email, password).pipe(
       switchMap(({user: {uid}}) => this.authSerivce.addUser({uid,firstName, lastName, userName,signUpAs, email})),
        this.toast.observe({
          success: 'Signed up successfully',
          loading: 'Signing up...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      ).subscribe(()=>{
        this.router.navigate(['/layout'])
      })
  }
}
