<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use DB;

class TaskController extends Controller
{
    public function listaTudo(){
		return DB::select('select * from tasks');
	}

	public function lista($id){
		return DB::select('select * from tasks where codigo = ?', [$id]);
	}
 
	// Cadastrando pessoas
	public function novo(Request $request){
		$data = sizeof($_POST) > 0 ? $_POST : json_decode($request->getContent(), true); // Pega o post ou o raw
 
		$res = DB::insert('insert into tasks (titulo, situacao, descricao) values (?, ?, ?)', [$data['titulo'], $data['situacao'], $data['descricao']]); // Insert
 
		return ["status" => ($res)?'ok':'erro'];
	}
 
	// Editando pessoas
	public function editar($id, Request $request){
		$data = sizeof($_POST) > 0 ? $_POST : json_decode($request->getContent(), true); // Pega o post ou o raw
 
		$res = DB::update("update tasks set titulo = ?, situacao = ?, descricao = ? WHERE codigo = ?",[$data['titulo'], $data['situacao'], $data['descricao'], $id]); //Update
 
		return ["status" => ($res)?'ok':'erro'];
	}
 
	// Excluindo pessoas
	public function excluir($id){
		$res = DB::delete("delete from tasks WHERE codigo = ?", [$id]); //Excluir
 
		return ["status" => ($res)?'ok':'erro'];
	}
}
