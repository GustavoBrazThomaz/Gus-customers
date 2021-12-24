import { MatDialogRef } from '@angular/material/dialog';
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

  person: Iperson;
  
  constructor(private personService: PersonService, 
    private  router: Router, 
    private route: ActivatedRoute,
    ) {}
    
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    
    this.personService.getPersonWithID(id).subscribe(person =>{
      this.person = person
    })
  
  console.log(id)
}
  
  atualizarProduto(): void{
    const id = this.route.snapshot.paramMap.get('id')
    
    this.personService.AtualizarPerson(id, this.person).subscribe( data =>{
      this.urlTabela()
    },error => {
      this.personService.showMessage('Erro ao Atualizar')
    },() => {
      this.personService.showMessage('Produto Atualizado')
    })
    
  }

  delete(): void{
    this.router.navigate(['tabela/delete/' + this.person.id])
  }

  cancel(): void{
    this.urlTabela()
  }

  urlTabela(): void{
    this.router.navigate(['/tabela'])
  }
}