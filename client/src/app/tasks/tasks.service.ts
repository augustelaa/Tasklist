import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx'
import {Task} from './tasks.component'

@Injectable()
export class TasksService {

  backend_url: string; // Variável criada para facilitar futuras mudanças

constructor(private http: Http) { this.backend_url = 'http://tasklistapi.esy.es/public/tasks'; }

private extractData(res) {

  if (res.status < 200 || res.status >= 300) {
      throw new Error('Não foi possível intermediar o acesso ao backend. Código do erro: ' + res.status);
    }
    return (res.json()) || {};
  }

  retornarTasks(): Observable<any> {
    return this.http.get(this.backend_url).map(this.extractData);
  }

  adicionarTask(task: Task): Observable<any> {
    let options = JSON.stringify({ titulo: task.titulo, descricao: task.descricao, situacao: task.situacao });
    return this.http.post(this.backend_url, options).map(this.extractData);
  }
  
  removerTask(codigo: Number): Observable<any> {
    return this.http.delete(this.backend_url + '/' + codigo).map(this.extractData);
  }

  alterarTask(task: Task): Observable<any> {
    let options = JSON.stringify({ titulo: task.titulo, descricao: task.descricao, situacao: task.situacao });
    return this.http.put(this.backend_url + '/' + task.codigo, options).map(this.extractData);
  }

}
