import { DeleteDialogComponent } from './../tabela/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private PersonService: PersonService, 
    private  router: Router, 
    private route: ActivatedRoute,
    public dialog: MatDialog
    ) {}
    
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    
    this.PersonService.getPersonWithID(id).subscribe(person =>{
      this.person = person
    })
}

  atualizarProduto(): void{
    const id = this.route.snapshot.paramMap.get('id')
    
    this.PersonService.AtualizarPerson(id, this.person).subscribe( data =>{
      this.urlTabela()
    },error => {
      this.PersonService.showMessage('Erro ao Atualizar')
    },() => {
      this.PersonService.showMessage('Cliente Atualizado')
    })
    
  }

  deletePerson(id: number){
    const dialogRef = this.dialog.open(DeleteDialogComponent)
    
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
      if(res == "true"){
        this.PersonService.deletarPerson(id).subscribe(data =>{
        },
          error => {
            this.PersonService.showMessage("Erro ao deletar o cliente")
            console.error(error)
          }, () => {
            this.PersonService.showMessage("Cliente deletado com sucesso")
            this.urlTabela()
          })
      }
    })
    
  }

  cancel(): void{
    this.urlTabela()
  }

  urlTabela(): void{
    this.router.navigate(['/tabela'])
  }
}