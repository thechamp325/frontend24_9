import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '@app/_services';

import { User } from '@app/_models';

import EmpData from '@app/shared/EmpData';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserService } from '@app/_services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  form: FormGroup;
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];


  constructor(private formBuilder: FormBuilder, 
    private http: HttpClient,
     private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
     
     ) { 
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
     }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit() {

    this.form = this.formBuilder.group({
      empid:     [this.currentUser.firstName, Validators.required],
      from_month:     ['', Validators.required],
      to_month:     ['', Validators.required],
    });
  }

  Submit(){
    console.log(this.form.value);
    this.http.post('http://10.10.11.137:8080/api/pi/emp/salary_certificate', this.form.value, ).subscribe(result => {alert(result)})
   
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
