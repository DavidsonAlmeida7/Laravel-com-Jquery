//Executado quando a pagina é carregada
$(document).ready( function () {
    $('#container-fluid').show('slide');
    $('#menu').menu();
    $('#menu').show('slide');
    inicializaPagina();
});

//configura o token para a segurança da aplicação - sem isso voçe não consegue criar e nem atualizar dados.
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//lista clientes na pagina html
function listClients() {    
    var loading = '<tr><td colspan="6">Carregando...</td></tr>',
    empty = '<tr><td colspan="6">Nenhum registrado encontrado</td></tr>';
    var tbody = $('#table>tbody');
    tbody.html(loading);

    $.get('/clients_json', function(data){
        data.length ? tbody.empty() : tbody.html(empty);
        var btnView = $('<button/>').attr('type', 'button').html('Ver').width(50);
        var btnEdit = $('<button/>').attr('type', 'button').html('Editar').width(50);
        var btnDelete = $('<button/>').attr('type', 'button').html('Excluir').width(50);

        for (var key in data) {
            var tr = $('<tr/>'),
                row = data[key], //key => propriedade = id, name, cpf / data[key] => objeto trazendo cada valor de uma propriedade = 1, davidson, 111.222.333-44
                id = $('<td/>').html(row.id),
                name = $('<td/>').html(row.name),
                cpf = $('<td/>').html($.formatCpf(row.cpf)),
                email = $('<td/>').html(row.email),
                birthday = $('<td/>').html($.formatDate(row.birthday));

            var actions = $('<td/>');
            actions.append(btnView.clone())
                .append(btnEdit.clone())
                .append(btnDelete.clone());

            tr.data('client-id', row.id);
            //console.log(tr.data('client-id'));
            //console.log(row.id);

            tr.append(id)
                .append(name)
                .append(cpf)
                .append(email)
                .append(birthday)
                .append(actions);

            tbody.append(tr);
        }
        tbody
            .find('button:contains(Ver)').button({
            icon: 'ui-icon-person', 
            text: false
        })
        .click(function () {
            var button = $(this),
                tr = button.closest('tr'),
                id = tr.data('client-id');
            viewClient(id);
        });
        tbody
            .find('button:contains(Editar)').button({
            icon: 'ui-icon-pencil', 
            text: false
        })
        .click(function () {
            var button = $(this),
                tr = button.closest('tr'),
                id = tr.data('client-id');
            loadEditForm(id);
        });
        tbody
            .find('button:contains(Excluir)').button({
            icon: 'ui-icon-trash',
            text: false
        })
        .click(function () {
            var button = $(this),
                tr = button.closest('tr'),
                index = tr.index(), //pega o indice apartir do elemento tr.
                id = tr.data('client-id');
            $('#delete-dialog').data('delete_id', id);
            $('#delete-dialog').data('delete_index', index);
            dialogDelete.dialog('open');
        })
    }).fail(function () {
        showNotificationError('Não foi possível consultar os clientes');
    });
};

//Mostra dados do client especifico
function viewClient(id) {
    $.get('/clients/show/' + id, function(data){
            var tbody = $('#table-view>tbody');
            var client = data[0];

            $('#h1').html(client.name);
            var tr_id = $('<tr/>'),
                th_id = $('<th/>').html('ID'),
                id = $('<td/>').html(client.id),

                tr_name = $('<tr/>'),
                th_name = $('<th/>').html('Nome'),
                name = $('<td/>').html(client.name),

                tr_cpf = $('<tr/>'),
                th_cpf = $('<th/>').html('CPF'),
                cpf = $('<td/>').html($.formatCpf(client.cpf)),

                tr_email = $('<tr/>'),
                th_email = $('<th/>').html('E-mail'),
                email = $('<td/>').html(client.email),

                tr_phone = $('<tr/>'),
                th_phone = $('<th/>').html('Telefone'),
                phone = $('<td/>').html($.formatPhone(client.phone)),

                tr_birthday = $('<tr/>'),
                th_birthday = $('<th/>').html('Aniversário'),
                birthday = $('<td/>').html($.formatDate(client.birthday)),

                tr_marital_status = $('<tr/>'),
                th_marital_status = $('<th/>').html('Estado Civil'),
                marital_status = $('<td/>').html($.formatMaritalStatus(client.marital_status));

            tr_id.append(th_id).append(id);
            tr_name.append(th_name).append(name);
            tr_cpf.append(th_cpf).append(cpf);
            tr_email.append(th_email).append(email);
            tr_phone.append(th_phone).append(phone);
            tr_birthday.append(th_birthday).append(birthday);
            tr_marital_status.append(th_marital_status).append(marital_status);

            tbody.append(tr_id)
                .append(tr_name)
                .append(tr_cpf)
                .append(tr_email)
                .append(tr_phone)
                .append(tr_birthday)
                .append(tr_marital_status);
    });
    $('#content').hide('slide');
    $('#content-view').show('slide');
    $('#content-view>button').button({
        icon: 'ui-icon-plus'
    }).click(function () {
        loadEditForm(id);
    });
}

//Função para salvar clientes
function saveClient() {
    var data = $('#client-dialog>form').serializeObject(),
        id = $('input[name=id]').val(),
        url;
    console.log(data); //mostra como é passado os dados com serialize.

    data.cpf = data.cpf.replace(/[^0-9]/g, '');
    data.phone = data.phone.replace(/[^0-9]/g, '');
    //12/07/2017 -> 2017-07-12
    data.birthday = data.birthday.split('/').reverse().join('-');

    if (id == "") {
        url = '/clients/store';
        delete data.id;
    } else {
        url = '/clients/update/' + id;
    }

    $.post(url, data)
        .done(function () {
            dialogSave.dialog('close');
            listClients();
        })
        .fail(function () {
            showNotificationError(id == "" ? 'Não foi possível inserir o cliente' : 'Não foi possível alterar o cliente');
        });
}

//Funçao para deletar clientes
function deleteClient() {
    var id = $('#delete-dialog').data('delete_id'),
        index = $('#delete-dialog').data('delete_index');
    $.post('/clients/destroy/' + id) //{id: id} => id que vai ser enviado é igual ao id que iniciamos na variavel
        .done(function () {
            $('#table>tbody tr').eq(index).remove(); //pega esse indice e remove
            dialogDelete.dialog('close');
        })
        .fail(function () {
            showNotificationError('Não foi possível excluir este cliente');
        });
}

//Função para Editar clientes
function loadEditForm(id) {
    //console.log(id);
    showLoading('Carregando cliente...');
    $.get('/clients/edit/' + id, function (data) {
        //console.log(data);
        PNotify.removeAll();
        var client = data[0]; //pega uma posição só ou seja pega o primeiro elemento do DOM.
        $('input[name=id]').val(client.id);
        $('input[name=name]').val(client.name);
        $('input[name=email]').val(client.email);
        $('input[name=cpf]').val(client.cpf);
        $('input[name=phone]').val(client.phone);
        $('input[name=birthday]').val($.formatDate(client.birthday));
        $('select[name=marital_status]').val(client.marital_status);
        dialogAtualizar.dialog('open');
    }).fail(function () {
        PNotify.removeAll();
        setTimeout(function(){
            showNotificationError('Não foi possível carregar este cliente');
        },1000);
    });
}

//função para inicialização da pagina html
var dialogSave, dialogAtualizar, dialogDelete;
function inicializaPagina() {
    dialogSave = $('#client-dialog')
        .dialog({
            autoOpen: false,
            height: 500,
            width: 500,
            modal: true,
            title: 'Cria novo Cliente',
            buttons: {
                "Salvar cliente": saveClient,
                "Cancelar": function () {
                    //$(this).dialog('close'); //mesma coisa do codigo abaixo...
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
            height: 500,
            width: 500,
            modal: true,
            title: 'Atualizar cliente',
            buttons: {
                "Salvar cliente": saveClient,
                "Cancelar": function () {
                    //$(this).dialog('close'); //mesma coisa do codigo abaixo...
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
    });
    $('#content').show('slide');
    $('#content-view').hide('slide');
    listClients();
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

//function teste() {
//    /*$.get("{{ route('clients.json') }}", function(data) {
//        console.log(data);
//    });*/
//
//    $.ajax({
//        url: "clients",
//        type : 'GET',
//        dataType: 'JSON',
//        success:function(data){
//            console.log(data);
//        },
//        error:function(){
//            console.log('Error');
//        }
//    });
//}