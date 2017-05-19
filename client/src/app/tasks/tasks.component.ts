import { Component, OnInit } from '@angular/core';

import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  task: Task;
  busy: Boolean;
  
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
    this.tasksService.alterarTask(_task).subscribe(res => { if(res.status == "ok"){} });
  }

  alterarSituacaoTask(_task: Task){
    _task.situacao = !_task.situacao;
    this.alterarTask(_task);
  }

}

export class Task {
  
  codigo: Number;
  titulo: String;
  descricao: String;
  situacao: Boolean;
  dataHoraCriacao: String;
  dataHoraEncerramento: String;
  dataHoraUltimaAlteracao: String;


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