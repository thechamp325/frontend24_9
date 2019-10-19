import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core'; 
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/_services';



export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

@Component({
  selector: 'app-liverequest',
  templateUrl: './liverequest.component.html',
  styleUrls: ['./liverequest.component.css']
})


export class LiverequestComponent {
  
  displayedColumns: string[] = ['EMPID', 'name', 'designation','Type','salaryid','duration','request'];
  private dataSource;
  public employees = [];
  formBuilder: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService

  ) { }
  
  
  private _url: string = 'http://10.10.11.131:8000/api/pi/emp/salary/';
  
  ngOnInit() {

    this.http.get<PeriodicElement[]>(this._url)
    .subscribe(data =>{this.employees = data;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
   
  yes(prop,flag){
     console.log({...prop,flag});
     this.http.post('http://10.10.11.145:8000/api/pi/emp/salary/approvehod_salary', {...prop,flag} ).subscribe(result => {alert(JSON.stringify(result))});
    
      this.ngOnInit();
    }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
