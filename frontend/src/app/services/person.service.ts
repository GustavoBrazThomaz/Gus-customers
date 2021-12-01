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
  constructor(private httpClient: HttpClient) { }

  public getPersonWithCarrer(carrer: string): Observable<Pagination>{
    return this.httpClient.get<Pagination>(API_PATH + '?carrer=' + carrer)
  }

  public getPersonWithID(id: string): Observable<Iperson>{
    return this.httpClient.get<Iperson>(`${API_PATH}/${id}`)
  }

  public postPerson(person: any): Observable<Iperson>{
    return this.httpClient.post<any>(API_PATH, person, this.httpOptions)
  }

  public AtualizarPerson(id: any): Observable<Iperson>{
    return this.httpClient.put<any>(`${API_PATH} / ${id}`, id)
  }

  public deletarPerson(id: number): Observable<Iperson>{

    const url = `${API_PATH}/${id}`
    return this.httpClient.delete<any>(url)
  }

  public paginacao(carrer: string, size: string, pages: string) {
    return this.httpClient.get<any>(API_PATH + '?carrer=' + carrer + '&' + 'size=' + size + '&' + 'page=' + pages)
  }
}