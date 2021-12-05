import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Iperson } from './Iperson';

import { API_PATH } from 'src/environments/environment';
import { Pagination } from './Pagination.model'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
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

  public getPersonWithCarrer(page: number, size: number, carrer: string): Observable<Pagination>{
    return this.httpClient.get<Pagination>(API_PATH + '?page=' + page + '&size=' + size + '&carrer=' + carrer)
  }

  public getPersonWithID(id: string): Observable<Iperson>{
    return this.httpClient.get<Iperson>(`${API_PATH}/${id}`)
  }

  public postPerson(person: any): Observable<Iperson>{
    return this.httpClient.post<any>(API_PATH, person, this.httpOptions)
  }

  public AtualizarPerson(id: string, person: Iperson): Observable<Iperson>{
      return this.httpClient.put<Iperson>(`${API_PATH}/${id}`,person)
  }

  public deletarPerson(id: number): Observable<Iperson>{

    const url = `${API_PATH}/${id}`
    return this.httpClient.delete<any>(url)
  }

}