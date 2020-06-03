<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;

class ClientController extends Controller
{
    //Carrega a lista de clientes no banco formato json
    public function indexJson(Request $request)
    {
        if ($request->ajax()) {
            $clients = Client::all();
            return response()->json($clients);
        }
        //return view('client.index');
    }

    //Carrega a view de cliente/index.
    public function index()
    {
        return view('client.index');
    }

    //Carrega a lista de clientes no banco no formato DataTables
    public function indexDatatable()
    {
        if (Request()->ajax()) {
            $clients = Client::all();
            return response()->json(['data' => $clients]);
        }
        return view('client.index_datatable');
    }

    //Armazena o cliente recém-criado no banco
    public function store(Request $request)
    {
        $client_json = Client::create($request->all());
    }

    //Exibe o client especificado.
    public function show($client)
    {
        $client_json = Client::find($client);
        return response()->json([$client_json]);
    }

    //Carrega Form para editar client
    public function edit($client)
    {
        $client_json = Client::find($client);
        return response()->json([$client_json]);
    }

    //Atualiza cliente
    public function update(Request $request, Client $client)
    {
        $client->update($request->all());
    }

    //Deleta cliente do banco
    public function destroy(Client $client)
    {
        $client->delete();
    }
}
