import { TabelaComponent } from './components/tabela/tabela.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonUpdateComponent } from './components/person-update/person-update.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent,
},{
  path: "tabela",
  component: TabelaComponent
},{
  path: "tabela/person/:id",
  component: PersonUpdateComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
