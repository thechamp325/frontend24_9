import { Component, OnInit, /*Input*/ } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError } from 'rxjs';
import { IEmployee } from '@app/employee';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf/dist/jspdf.node.debug.js';
import { Template } from '@angular/compiler/src/render3/r3_ast';


export interface xyz {
  id : string ,
  name: string,
}

@Component({
  selector: 'app-salary', 
  templateUrl: './salary.component.html',
  
  styleUrls: ['./salary.component.css'],
  // template:
  // <div class ="notification is-primary">
  //   <h3>Salary</h3>
  //   Say {{message}}
  // </div>
})
export class SalaryComponent {

   
  public employees = [];
  public errorMsg;
  // @Input() message:string;
  constructor(private http:HttpClient) { }
  
  private _url: string = 'http://10.10.11.58:8000/api/pi/emp/salary_check/?Employee_ID=Emp01&salaryid=Emp012019-07-25';

  ngOnInit() {
  
    this.http.get<IEmployee[]>(this._url)
    .subscribe(data => this.employees = data);
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

  // public convert()
  // {
  //   var data = document.getElementById('pdf');

  //   html2canvas(data).then(canvas => {
  //   //necessary setting
  //   var imgWidth = 208;
  //   var pageHeight = 295;
  //   var imgHeight = canvas.height * imgWidth / canvas.width;
  //   var heightLeft = imgHeight;

  //   const contentDataURL = canvas.toDataURL('image/png')
  //   let pdf = new jspdf('p', 'mm', 'a4');//A4 size page of pdf
  //   var position = 0;
  //   pdf.addImage(contentDataURL, 'PNG', 0 , position , imgWidth , imgHeight)
  //   pdf.save('fi.pdf');//generated pdf
  //   });
  // }

  public convert() 
{
    var data = document.getElementById('pdf');
    html2canvas(document.body).then(canvas => 
        {
        // Few necessary setting options
        var imgWidth = 250;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF
        var position = -17;
        pdf.addImage(contentDataURL, 'PNG', 0, -15, pageHeight, heightLeft);
        pdf.save('MYPdf.pdf'); // Generated PDF 

    });


}

// public convert(){
//   var doc = new jsPDF();
//   var imgData = 'data:image/jpeg;base64,'+ Base64.encode('Koala.jpeg');
//   console.log(imgData);
//   doc.setFontSize(40);
//   doc.text(30, 20, 'Hello world!');
//   doc.addImage(imgData, 'JPEG', 15, 40, 180, 160);
//   doc.output('datauri');
// }


}
