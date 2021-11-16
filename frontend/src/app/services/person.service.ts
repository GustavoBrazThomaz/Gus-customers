import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { Iperson } from './Iperson';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private htttpClient: HttpClient) { }

}
