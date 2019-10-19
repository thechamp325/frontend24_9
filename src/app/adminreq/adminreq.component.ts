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
  selector: 'app-adminreq',
  templateUrl: './adminreq.component.html',
  styleUrls: ['./adminreq.component.css']
})
export class AdminreqComponent implements OnInit {

 
  displayedColumns: string[] = ['EMPID', 'name', 'lastname', 'designation','Type','salaryid','request'];
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
  
  
  private _url: string = 'http://10.10.13.205:8080/api/pi/emp/livehod';
  
  ngOnInit() {

    this.http.get<PeriodicElement[]>(this._url)
    .subscribe(data =>{this.employees = data;
        this.dataSource = new MatTableDataSource(this.employees);
      });
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
   
  yes(prop){
     console.log(prop);
     this.http.post('http://10.10.13.205:8080/api/pi/emp', prop ).subscribe(result => {alert(result)})
     
  }

  
  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

}
