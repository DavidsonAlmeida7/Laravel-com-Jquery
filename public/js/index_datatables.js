//Executado quando a pagina é carregada
$(document).ready( function () {
    $('#container-fluid').show('slide');
    $('#menu').menu();
    $('#menu').show('slide');
    inicializaPagina();
    datatables();
});

//configura o token para a segurança da aplicação - sem isso voçe não consegue criar e nem atualizar dados.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//datatables
function datatables() {
    var datatable = $('#table').DataTable({
        //filter: false, //desabilita as filtragens
        //paging: false, //paginação
        //lengthChange: false, //quantidade por pagina
        //ordering: false, //icone de ordenação desabilitado
        //info: false, //desabilita o texto das informação da paginação
        //processing: true,
        //serverSide: true,
        pageLength: 5, //quantidade padrão carregada
        lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
        ajax: "http://localhost:8000/clients_datatable",
        columns: [
            { 
                //title: 'ID',
                data: 'id' 
            },
            { 
                //title: 'Nome',
                data: 'name',
                //orderable: false, //desativa a ordenação da pagina quando clica
            },
            { 
                //title: 'E-mail',
                data: 'email' 
            },
            { 
                //title: 'CPF', 
                data: 'cpf', 
                render: function(data,type,row,meta){
                    return $.formatCpf(data);
                }
            },
            { 
                //title: 'Telefone', 
                data: 'phone', 
                render: function(data,type,row,meta){
                    return $.formatPhone(data);
                }
            },
            { 
                //title: 'Aniversário', 
                data: 'birthday', 
                render: function(data,type,row,meta){
                    return $.formatDate(data);
                }
            },
            { 
                //title: 'Estado Civil', 
                data: 'marital_status',
                //orderable: false,
                defaultContent: '<strong>Sem Estado Civil</strong>', 
                render: function(data,type,row,meta){
                    return $.formatMaritalStatus(data);
                }
            },
            {
                //title: 'Ações',
                data: null,
                render: function(data,type,row,meta){
                    return '<a id="botao-editar" href="javascript:void(0)">Editar</a> <a id="butao-deletar" href="javascript:void(0)">Excluir</a>';
                }
            },
        ],
        drawCallback: function () {
            //botoes editar e excluir
            $('#table>tbody>tr>td:last-child>a:first-child').button({
                icon: 'ui-icon-pencil',
                text: false
            });
            $('#table>tbody>tr>td:last-child>a:last-child').button({
                icon: 'ui-icon-trash',
                text: false
            });

            $('a').unbind('click');
            $('#table>tbody>tr>td:last-child>a:first-child').click(function() {
                var tr = $(this).closest('tr');
                var row = datatable.row(tr).data();
                $('input[name=id]').val(row.id);
                $('input[name=name]').val(row.name);
                $('input[name=email]').val(row.email);
                $('input[name=cpf]').val(row.cpf);
                $('input[name=phone]').val(row.phone);
                $('input[name=birthday]').val($.formatDate(row.birthday));
                $('select[name=marital_status]').val(row.marital_status);
                dialogAtualizar.dialog('open');
            });

            $('#table>tbody>tr>td:last-child>a:last-child').click(function() {
                var tr = $(this).closest('tr'),
                    index2 = tr.index(), //pega o indice apartir do elemento tr.
                    row = datatable.row(tr).data(); //recebe os dados do cliente em forma de objeto
                    //console.log(row.id);
                id = $('#delete-dialog').data('delete_id', row.id);
                index = $('#delete-dialog').data('delete_index', index2);
                dialogDelete.dialog('open');
            });
        },
        language: {
            info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Sem registros',
            infoFiltered: '(filtrados de _MAX_ registros)',
            emptyTable: 'Nenhum registro avaliado na tabela',
            zeroRecords: 'Nenhum registro encontrado para a busca',
            lengthMenu: 'Mostrando _MENU_ registros',
            searchPlaceholder: 'Buscar...',
            search: 'Digite sua busca completa:',
            paginate: {
                //first: '<<',
                //last: '>>',
                previous: 'Anterior',
                next: 'Próximo',
            }
        },
    });

    $('#nome_filtro').keyup(function(){
        datatable.columns(1).search(this.value).draw();
    });
    $('#email_filtro').keyup(function(){
        datatable.columns(2).search(this.value).draw();
    });
    $('#estado_civil_filtro').change(function(){
        datatable.columns(6).search(this.value).draw();
    });
    //$(".dataTables_filter").hide(); //esconde o filtro original do datatables
}

//função para inicializar na pagina
var dialogSave, dialogAtualizar, dialogDelete;
function inicializaPagina() {
    dialogSave = $('#client-dialog')
        .dialog({
            autoOpen: false,
            height: 600,
            width: 600,
            modal: true,
            title: 'Cria novo Cliente',
            buttons: {
                "Salvar": saveClient,
                "Cancelar": function () {
                    dialogSave.dialog('close');
                }
            },
            close: function () {
                $('#client-dialog>form')[0].reset();
                $('#client-dialog>form').find('input[type=hidden]').val("");
            }
        });
    dialogAtualizar = $('#client-dialog2')
        .dialog({
            autoOpen: false,
            height: 600,
            width: 600,
            modal: true,
            title: 'Atualizar cliente',
            buttons: {
                "Atualizar": saveClient,
                "Cancelar": function () {
                    dialogAtualizar.dialog('close');
                }
            },
            close: function () {
                $('#client-dialog>form')[0].reset();
                $('#client-dialog>form').find('input[type=hidden]').val("");
            }
        });
    dialogDelete = $('#delete-dialog')
        .dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            modal: true,
            buttons: {
                "OK": deleteClient,
                "Cancelar": function () {
                    $(this).dialog('close');
                }
            }
        });
    $('#client-dialog>form').on('submit', function (event) {
        event.preventDefault(); //cancela o evento e chama o saveclient abaixo...
        saveClient();
    })
    $('#button-novo').button({
        icon: 'ui-icon-plus'
    }).click(function () {
        dialogSave.dialog('open');
    });
    $('input[name=cpf]').mask('000.000.000-00');
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    $('input[name=phone]').mask(SPMaskBehavior, spOptions);
    $('input[name=birthday]').datepicker({
        dateFormat: 'dd/mm/yy',
        showAnim: 'clip',
        numberOfMonths: 1,
        showButtonPanel: true,
    });
    $('#content').show('slide');
    $('#content-view').hide('slide');
}

//Função para salvar clientes
function saveClient() {
    var data = $('#client-dialog>form').serializeObject(),
        data_atualizar = $('#client-dialog2>form').serializeObject(),
        id = $('input[name=id]').val(),
        url;
    console.log(data); //mostra como é passado os dados com serialize.

    data.cpf = data.cpf.replace(/[^0-9]/g, '');
    data.phone = data.phone.replace(/[^0-9]/g, '');
    data.birthday = data.birthday.split('/').reverse().join('-');

    data_atualizar.cpf = data_atualizar.cpf.replace(/[^0-9]/g, '');
    data_atualizar.phone = data_atualizar.phone.replace(/[^0-9]/g, '');
    data_atualizar.birthday = data_atualizar.birthday.split('/').reverse().join('-');

    if (id == "") {
        url = '/clients/store';
        delete data.id;

        $.post(url, data)
        .done(function () {
            dialogSave.dialog('close');
            $('#table').DataTable().ajax.reload();
        })
        .fail(function () {
            showNotificationError(id == "" ? 'Não foi possível inserir o cliente' : 'Não foi possível alterar o cliente');
        });
    } else {
        url = '/clients/update/' + id;

        $.post(url, data_atualizar)
        .done(function () {
            dialogAtualizar.dialog('close');
            $('#table').DataTable().ajax.reload();
        })
        .fail(function () {
            showNotificationError(id == "" ? 'Não foi possível inserir o cliente' : 'Não foi possível alterar o cliente');
        });
    }
}

//Funçao para deletar clientes
function deleteClient() {
    var id = $('#delete-dialog').data('delete_id'),
        index = $('#delete-dialog').data('delete_index');
        console.log(id);
    $.post('/clients/destroy/' + id) //{id: id} => id que vai ser enviado é igual ao id que iniciamos na variavel
        .done(function () {
            $('#table>tbody tr').eq(index).remove(); //pega esse indice e remove
            dialogDelete.dialog('close');
            $('#table').DataTable().ajax.reload();
        })
        .fail(function () {
            showNotificationError('Não foi possível excluir este cliente');
        });
}

//função de notificação de error
function showNotificationError(text) {
    new PNotify({
        title: 'Mensagem de erro',
        text: text,
        styling: 'brighttheme',
        type: 'error'
    });
}

//função de carregamento do modal
function showLoading(text){
    new PNotify({
        text: text,
        styling: 'brighttheme',
        type: 'info',
        hide: false,
        addclass: 'stack-modal',
        stack: {
            dir1: 'down',
            dir2: 'right',
            modal: true,
            overlay_close: true
        }
    });
}
