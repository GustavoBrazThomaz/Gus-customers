import { Router } from '@angular/router';
import { PersonService } from './../../services/person.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
  public PersonForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    private rest: PersonService,
    private  router: Router
  ) { }

  ngOnInit(): void {
    this.PersonForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      carrer:['', [Validators.required]]
    })
  }

  createPerson(){
    let newDate: moment.Moment = moment.utc(this.PersonForm.value.birthDate).local()
    this.PersonForm.value.birthDate = newDate.format("YYYY-MM-DD")
    this.rest.postPerson(this.PersonForm.value).subscribe(result => {
      this.router.navigate(['/tabela'])
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
    this.PersonForm.reset;
  }

}
