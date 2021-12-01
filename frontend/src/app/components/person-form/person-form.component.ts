import { Iperson } from './../../services/Iperson';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  person!: Iperson;

  constructor(private personService: PersonService, 
    private  router: Router, 
    private route: ActivatedRoute,) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if(typeof id === 'string'){
    this.personService.getPersonWithID(id).subscribe(person =>{
      this.person = person
    })
  }
  console.log(id)
}
  
  atualizarProduto(): void{
    this.personService.AtualizarPerson(this.person).subscribe(() => {
      this.router.navigate(["/tabela"])
    })
  }

  delete(): void{
    if(typeof this.person !== undefined){
    this.personService.deletarPerson(this.person.id).subscribe(() => {
      this.router.navigate(["/tabela"])
    })
  }
  }

  cancel(): void{
    this.router.navigate(["/tabela"])
  }
}