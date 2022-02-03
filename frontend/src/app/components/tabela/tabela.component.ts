import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Pagination } from './../../services/Pagination.model';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

import { Iperson } from './../../services/Iperson';
import { PersonService } from './../../services/person.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface Filtro {
  value: string | "firstName";
  viewValue: string | "Nome";
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})

export class TabelaComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  myControl = new FormControl();
  options: string[] = [];
  
  filteredOptions: Observable<string[]>;

  selectedValue: string;
  filters: Filtro[] = [
    {value: 'firstName', viewValue: 'Nome'},
    {value: 'carrer', viewValue: 'Profissão'},
  ];

  person: Iperson[] = [];
  pagination: Pagination

  displayedColumns = ['id', 'firstName', 'lastName', 'carrer', 'action'];
  dataSource: MatTableDataSource<any>

  page: number = 0
  size: number = 10
  totalPage: number = 0 
  search: string = ""
  carrer: string = ''
  filtro: string = ''
  sort: string = ''
  sortParam: string = ""

  previous: boolean = false

  constructor(public PersonService: PersonService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    
    this.getPerson(this.page, this.size, this.filtro, this.carrer, this.sort, this.sortParam)
  }

  OnPageChange(event){

    this.page = event.pageIndex
    this.size = event.pageSize
    
    this.getPerson(this.page, this.size, this.filtro, this.carrer, this.sort, this.sortParam)
  }

  procurar(){
    this.carrer = this.search
   
    if(this.selectedValue == undefined){
      this.selectedValue = "firstName"
      this.filtro = this.selectedValue
    }else{
      this.filtro = this.selectedValue
      
    }

    this.getPerson(this.page, this.size, this.filtro, this.carrer, this.sort, this.sortParam)
  }

  getPerson(page, size, filtro ,carrer, sort, sortParam){
    this.PersonService.getPersonWithCarrer(page, size, filtro, carrer, sort, sortParam).subscribe(
      data => {
        
        this.person = data.data.content; 
        this.totalPage = data.data.totalElements 

        if( data.status === 200){
          this.previous = true
        }
      });
      
  }

  addPerson(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  } 

  deletePerson(id: number){
    const dialogRef = this.dialog.open(DeleteDialogComponent)

    dialogRef.afterClosed().subscribe(res => {
      if(res == "true"){
        this.PersonService.deletarPerson(id).subscribe(data =>{
        },
          error => {
            this.PersonService.showMessage("Erro ao deletar o cliente")
            console.error(error)
          }, () => {
            this.PersonService.showMessage("Cliente deletado com sucesso")
            window.location.reload()
          })
      }
    })
  }

  sortBy(event): void{
    this.sort = event.active
    this.sortParam = event.direction

    this.getPerson(this.page, this.size, this.filtro, this.carrer, this.sort, this.sortParam)
  }

}