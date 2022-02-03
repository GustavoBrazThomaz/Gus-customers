import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Iperson } from './Iperson';

import { API_PATH } from 'src/environments/environment';
import { Pagination } from './Pagination.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  httpOptionsPost = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  httpOptions = {
    headers: new HttpHeaders({
      'status-code': 'status'
    })
  }

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top' 
    })
  }

  public getPersonWithCarrer(page: number, size: number, filtro: string ,carrer: string, sort: string, sortParam: string,): Observable<any>{

    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json')

    return this.httpClient.get<any>(API_PATH + '?page=' + page + '&size=' + size + `&${filtro}=` + carrer + '&sort=' + sort + '&direction=' + sortParam, {observe: 'response'})
    .pipe(
      map((response) => ({data: response.body , status: response.status}))
    )
  }

  public getPersonWithID(id: string): Observable<Iperson>{
    return this.httpClient.get<Iperson>(`${API_PATH}/${id}`)
  }

  public postPerson(person: any): Observable<Iperson>{
    return this.httpClient.post<any>(API_PATH, person, this.httpOptionsPost)
  }

  public AtualizarPerson(id: string, person: Iperson): Observable<Iperson>{
      return this.httpClient.put<Iperson>(`${API_PATH}/${id}`,person)
  }

  public deletarPerson(id: number): Observable<Iperson>{

    const url = `${API_PATH}/${id}`
    return this.httpClient.delete<any>(url)
  }

}