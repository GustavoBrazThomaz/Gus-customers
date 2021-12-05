import { map, Observable, startWith } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  myControl = new FormControl();
  options: string[] = ['Engineer', 'Senior Developer', 'Sale'];
  filteredOptions: Observable<string[]>;

  person: Iperson[] = [];
  pagination: Pagination

  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate', 'email', 'carrer', 'action'];
  dataSource: MatTableDataSource<any>

  page: number = 0
  size: number = 10
  totalPage: number = 0 
  search: string = ""
  carrer: string = ''
  sort: string = ''
  sortParam: string = ""

  constructor(public PersonService: PersonService, public dialog: MatDialog, private router: Router) { }
  
  

  ngOnInit(): void {
    this.getPerson(this.page, this.size, this.carrer, this.sort, this.sortParam)

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  OnPageChange(event){

    this.page = event.pageIndex
    this.size = event.pageSize
    
    this.getPerson(this.page, this.size, this.carrer, this.sort, this.sortParam)
  }

  procurar(){
    this.carrer = this.search
    
    this.getPerson(this.page, this.size, this.carrer, this.sort, this.sortParam)
  }

  getPerson(page, size, carrer, sort, sortParam){
    this.PersonService.getPersonWithCarrer(page, size, carrer, sort, sortParam).subscribe(
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

  sortBy(event): void{
    this.sort = event.active
    this.sortParam = event.direction

    this.getPerson(this.page, this.size, this.carrer, this.sort, this.sortParam)
  }

}

