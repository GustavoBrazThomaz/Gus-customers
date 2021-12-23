import { Iperson } from './../../services/Iperson';
import { PersonService } from './../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.scss']
})
export class PersonDeleteComponent implements OnInit {

  person: Iperson;
  foto: string;
  url: string;
  loading: boolean = false;

  constructor(private personService: PersonService, 
    private  router: Router, 
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    
    
    this.personService.getPersonWithID(id).subscribe(person =>{
      this.person = person
      this.foto = this.person.firstName
      this.url = `https://robohash.org/${this.foto}.png?set=set5&bgset=bg1`
    }, error => console.error(error),
    () => {
      this.loading = true
    })
  }

  delete(): void{

    this.personService.deletarPerson(this.person.id).subscribe(res => {}, 
    error =>  this.personService.showMessage('Erro!!'),
    () =>  {
      this.personService.showMessage('Produto Deletado')
    this.urlTabela()
  })
  }

  cancel(): void{
    this.urlTabela()
  }

  urlTabela(): void{
    this.router.navigate(['/tabela'])
  }

}