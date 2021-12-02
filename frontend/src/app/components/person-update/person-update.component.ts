import { Iperson } from './../../services/Iperson';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';


@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styleUrls: ['./person-update.component.scss']
})
export class PersonUpdateComponent implements OnInit {

  person!: Iperson;

  constructor(private personService: PersonService, 
    private  router: Router, 
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(typeof id === 'number'){
    this.personService.getPersonWithID(id).subscribe(person =>{
      this.person = person
    })
  }
}
  
  atualizarProduto(): void{}

  delete(): void{}

  cancel(): void{
    this.router.navigate(["/tabela"])
  }
}
