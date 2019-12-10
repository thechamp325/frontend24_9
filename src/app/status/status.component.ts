import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError } from 'rxjs';
import { IEmployee } from '@app/employee';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/_services';


export interface xyz {
  id : string ,
  name: string,
}

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  displayedColumns: string[] = ['Type','HOD','Principal', 'Admin','request'];
  
  public employees = [];
  public errorMsg;
  constructor(
    
    private http: HttpClient,
           private router: Router,
           private authenticationService: AuthenticationService,
           private userService: UserService
           
  ) { } 

  
  private _url: string ='http://10.10.11.137:8000/api/pi/emp/salary_check?Employee_ID=Emp01';
  private dataSource;
  ngOnInit() {
  
  //   this.http.get<IEmployee[]>(this._url)
  //   .subscribe(data => {this.employees = data;
  //     this.dataSource = new MatTableDataSource(this.employees);
  //   });
   }


  getstatus() {
    var empid = document.getElementById('emp').nodeValue;
    this.http.get<IEmployee[]>('http://10.10.11.137:8000/api/pi/emp/salary_check?Employee_ID=Emp01&salaryid=Emp012019-07-24')
    .subscribe(data => {this.employees = data;
      this.dataSource = new MatTableDataSource(this.employees);
    });
  }
  
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

}
