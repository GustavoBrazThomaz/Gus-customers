import { Pagination } from './../../services/Pagination.model';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

import { Iperson } from './../../services/Iperson';
import { PersonService } from './../../services/person.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})

export class TabelaComponent implements OnInit {

  @ViewChild(MatSort)

  person: Iperson[] = [];
  pagination: Pagination

  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate', 'email', 'carrer', 'action'];
  dataSource: MatTableDataSource<any>
 
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(public PersonService: PersonService, public dialog: MatDialog) { }
  
   pageSlice = this.getPerson(0 , 10)

  ngOnInit(): void {
    this.pageSlice
  }

  OnPageChange(event){
    console.log(event)
    const startIndex = event.pageIndex * event.pageSize
    let endIndex = startIndex + event.pageSize

    this.pageSlice = this.getPerson(startIndex, endIndex)  
    console.log(startIndex)
    console.log(endIndex)
  }

  getPerson(page, size){
    this.PersonService.getPersonWithCarrer(page, size).subscribe(
      data => {
        this.person = data.content;  
      });
  }

  addPerson(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

