import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx'
import {Task} from './tasks.component'

@Injectable()
export class TasksService {

constructor(private http: Http) { }

private extractData(res) {

  if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return (res.json()) || {};
  }

  retornarTasks(): Observable<any> {
    return this.http.get('http://tasklistapi.esy.es/public/tasks').map(this.extractData);
  }

  retornarTask(codigo: Number): Observable<any> {
    return this.http.get('http://tasklistapi.esy.es/public/tasks/' + codigo).map(this.extractData);
  }

  adicionarTask(task: Task): Observable<any> {
    let options = JSON.stringify({ titulo: task.titulo, descricao: task.descricao, situacao: task.situacao });
    return this.http.post('http://tasklistapi.esy.es/public/tasks', options).map(this.extractData);
  }
  
  removerTask(codigo: Number): Observable<any> {
    return this.http.delete('http://tasklistapi.esy.es/public/tasks/' + codigo).map(this.extractData);
  }

  alterarTask(task: Task): Observable<any> {
    let options = JSON.stringify({ titulo: task.titulo, descricao: task.descricao, situacao: task.situacao });
    return this.http.put('http://tasklistapi.esy.es/public/tasks/' + task.codigo, options).map(this.extractData);
  }

}
