import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '@app/_services';
import { ResourceLoader } from '@angular/compiler';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

@Component({
  selector: 'app-pri-request',
  templateUrl: './pri-request.component.html',
  styleUrls: ['./pri-request.component.css']
})
export class PriRequestComponent {
  private empid="";
  displayedColumns: string[] =['EMPID', 'name', 'designation','Type','cert_id','duration','request'];
  private dataSource;
  public employees = [];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService

  ) { }
  private _url = 'http://10.10.11.145:8000/api/pi/emp/liveprincipal'

  ngOnInit() {
     this.http.get<PeriodicElement[]>(this._url)
      .subscribe(data =>{this.employees = data;
        this.dataSource = new MatTableDataSource(this.employees);
      });
    }

   
    yes(prop,flag){
      console.log({...prop,flag});
      this.http.post('http://10.10.11.145:8000/api/pi/emp/salary/approveprinci', {...prop,flag} ).subscribe(result => {alert(JSON.stringify(result))});
      

    }

    logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }

  
  }


