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

  @ViewChild('paginator') paginator: MatPaginator;

  person: Iperson[] = [];
  pagination: Pagination

  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate', 'email', 'carrer', 'action'];
  dataSource: MatTableDataSource<any>

  page: number = 0
  size: number = 10
  totalPage: number

  constructor(public PersonService: PersonService, public dialog: MatDialog) { }
  
  pageSlice = this.getPerson(this.page, this.size)

  ngOnInit(): void {
    this.pageSlice
  }

  OnPageChange(event){

    this.page = event.pageIndex
    this.size = event.pageSize
    
    this.pageSlice = this.getPerson(this.page, this.size)
  }

  getPerson(page, size){
    this.PersonService.getPersonWithCarrer(page, size).subscribe(
      data => {
        this.person = data.content; 
        this.totalPage = data.totalElements 
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

