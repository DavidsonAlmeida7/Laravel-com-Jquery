@extends('layouts.app')

@section('title', 'Clients - jquery crud')

@section('content')

<div class="container-fluid" id="container-fluid" style="display: none;">
    <div class="row">
        <div class="col-md-2">
            <ul id="menu" style="display: none;">
                <li class="ui-state-disabled"><div>Clientes</div></li>
                <li>
                    <div>
                        <span class="ui-icon ui-icon-person"></span>
                        <a href="{{ route('client.index') }}">Usando Crud Jquery</a>
                    </div>
                </li>
                <li>
                    <div>
                        <span class="ui-icon ui-icon-person"></span>
                        <a href="{{ route('client.index_datatable') }}">Usando DataTables</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-md-10">
            <!--------------------------------- CONTEUDO -------------------------------------->
            <div id="content" style="display: none;">
                <h1>Meus clientes - Usando Crud Jquery</h1>
                <button type="button" id="button-novo">Novo</button>
                <table id="table" class="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>E-mail</th>
                        <th>Aniver.</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>

            <div id="content-view">
                <h1 id="h1">Cliente</h1>
                <button type="button">Editar</button>
                <table id="table-view" class="table table-striped">
                    <tbody>
                        
                    </tbody>
                </table>
            </div>

            <div id="client-dialog" title="Cliente">
                <form>
                    <input type="hidden" name="id">
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Nome" required>
                    </div>
                    <div class="form-group">
                        <label for="name">CPF</label>
                        <input type="text" class="form-control" id="cpf" name="cpf" placeholder="CPF" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefone</label>
                        <input type="text" class="form-control" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="birthday">Aniversário</label>
                        <input type="text" class="form-control" id="birthday" name="birthday" required>
                    </div>
                    <div class="form-group">
                        <label for="marital_status">Estado Civil</label>
                        <select class="form-control" id="marital_status" name="marital_status" required>
                            <option value="1">Solteiro</option>
                            <option value="2">Casado</option>
                            <option value="3">Divorciado</option>
                        </select>
                    </div>
            
                    <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
                </form>
            </div>

            <div id="client-dialog2" title="Cliente">
                <form>
                    <input type="hidden" name="id">
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Nome" required>
                    </div>
                    <div class="form-group">
                        <label for="name">CPF</label>
                        <input type="text" class="form-control" id="cpf" name="cpf" placeholder="CPF" required>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefone</label>
                        <input type="text" class="form-control" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="birthday">Aniversário</label>
                        <input type="text" class="form-control" id="birthday" name="birthday" required>
                    </div>
                    <div class="form-group">
                        <label for="marital_status">Estado Civil</label>
                        <select class="form-control" id="marital_status" name="marital_status" required>
                            <option value="1">Solteiro</option>
                            <option value="2">Casado</option>
                            <option value="3">Divorciado</option>
                        </select>
                    </div>
            
                    <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
                </form>
            </div>
            
            <div id="delete-dialog" title="Exclusão de cliente">
                <p><span class="ui-icon ui-icon-alert"></span>Deseja excluir este cliente</p>
            </div>
            <!--------------------------------- final -------------------------------------->
        </div>
    </div>
</div>

@stop

@section('scripts')

<script src="{{ asset('js/client_crud.js') }}"></script>

@endsection