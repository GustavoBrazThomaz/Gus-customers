import { Iperson } from './Iperson';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { Pagination } from './Pagination.model'
import { Observable } from 'rxjs';

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

  public getPersonWithID(id: string): Observable<Pagination>{
    return this.httpClient.get<Pagination>(API_PATH + id)
  }

  public postPerson(person: any): Observable<Iperson>{
    return this.httpClient.post<any>(API_PATH, person, this.httpOptions)
  }

  public AtualizarPerson(id: any): Observable<Iperson>{
    return this.httpClient.put<any>(`${API_PATH} / ${id}`, id, this.httpOptions)
  }

  public deletarPerson(id: string): Observable<Iperson>{

    const url = `${API_PATH}/${id}`
    return this.httpClient.delete<any>(url)
  }
}