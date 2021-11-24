import { FormDialogComponent } from '../form-dialog/form-dialog.component';

import { Iperson } from './../../services/Iperson';
import { PersonService } from './../../services/person.service';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
})

export class TabelaComponent implements OnInit {

  person: Iperson[] = [];

  displayedColumns = ['id', 'firstName', 'lastName', 'birthDate', 'email', 'carrer', 'action'];

  
  constructor(public PersonService: PersonService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(){
    this.PersonService.getPersonWithCarrer('Senior Developer').subscribe(
      data => {
        this.person = data.content;
        console.log(this.person)
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

