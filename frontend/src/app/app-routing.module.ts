import { PersonFormComponent } from './components/person-form/person-form.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: "",
  component: HomeComponent,
},{
  path: "tabela",
  component: TabelaComponent
},{
  path: "tabela/person/:id",
  component: PersonFormComponent
},{
  path: 'tabela/search/:searchTerm',
  component: TabelaComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
