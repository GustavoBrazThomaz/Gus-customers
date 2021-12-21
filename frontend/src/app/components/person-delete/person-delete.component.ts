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
  foto: string
  url: string | 'https://cdn.icon-icons.com/icons2/1674/PNG/512/person_110935.png'

  constructor(private personService: PersonService, 
    private  router: Router, 
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    
    
    this.personService.getPersonWithID(id).subscribe(person =>{
      this.person = person

      this.foto = this.person.firstName
      this.url = `https://robohash.org/${this.foto}.png?set=set5&bgset=bg1`
    })
  }

  delete(): void{

    this.personService.deletarPerson(this.person.id).subscribe(() => {
      this.urlTabela()
    })
    this.personService.showMessage('Produto Deletado')
  }

  cancel(): void{
    this.urlTabela()
  }

  urlTabela(): void{
    this.router.navigate(['/tabela'])
  }

}
