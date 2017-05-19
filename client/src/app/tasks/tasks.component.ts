import { Component, OnInit } from '@angular/core';

import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = []; // responsável por alimentar a lista de tarefas
  task: Task; // responsável por transportar os dados do form de adição
  busy: Boolean; // responsável por habilitar/desabilitar submit do form de adição (evitar duplo envio)
  
  constructor(public tasksService: TasksService) {  }

  ngOnInit() { 
    this.retornarTasks();
    this.task = new Task(); 
    this.busy = false;
  }

  adicionarTask(form){
    this.busy = true;
    this.tasksService.adicionarTask(this.task).subscribe(res => { 
      if(res.status == "ok"){
        this.retornarTasks();
        this.task = new Task();
        this.busy = false;
      } 
    });
  }

  retornarTasks(){
    this.tasksService.retornarTasks().subscribe(data => {
      this.tasks = data;
    })
  }

  removerTask(codigo: Number){
    if(confirm("Você realmente deseja remover essa tarefa?")){
      this.tasksService.removerTask(codigo).subscribe(res => { if(res.status == "ok"){this.retornarTasks();} });
    }
  }

  alterarTask(_task: Task){
    this.tasksService.alterarTask(_task).subscribe(res => { if(res.status == "ok"){this.retornarTasks();} });
  }

  /*
   * Função específica para troca de situação, criada para evitar rotinas desnecessárias na alterarTask.
   */
  alterarSituacaoTask(_task: Task){
    if (_task.situacao == false) {
      _task.situacao = true;
    }else{
      _task.situacao = false;
    }
    this.alterarTask(_task);
  }

}

/*
 * Classe Task é a estrutura de todos os dados da tela de tasklist.
 */
export class Task {
  
  codigo: Number;
  titulo: String;
  descricao: String;
  situacao: Boolean;
  dataHoraCriacao: String; // A base automáticamente insere "CURRENT_TIMESTAMP" ao realizar o INSERT
  dataHoraEncerramento: String; // A base automáticamente insere "CURRENT_TIMESTAMP" ao realizar a troca de situação via trigger
  dataHoraUltimaAlteracao: String; // A base automáticamente insere "CURRENT_TIMESTAMP" ao realizar a mudança de dados via trigger


  constructor(){

    this.codigo = 0;
    this.titulo = '';
    this.descricao = '';
    this.situacao = false;
    this.dataHoraCriacao = '';
    this.dataHoraEncerramento = '';
    this.dataHoraUltimaAlteracao = '';
  }
}