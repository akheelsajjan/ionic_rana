import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { ILoginCredential } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginFormGroup: FormGroup;

  constructor(
    formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router
  ) {
    this.loginFormGroup = formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],

    })
   }

  ngOnInit() {
   
  }

  login(){
    const loginCredentials:ILoginCredential = this.loginFormGroup.value;
    this.loginService.login(loginCredentials)
    .then(
      (authData)=>{
        console.log(authData);
        this.router.navigate(['/tabs'])
      },
    )
    .catch((autherror)=>{
      console.log(autherror)
    })
  }

}
