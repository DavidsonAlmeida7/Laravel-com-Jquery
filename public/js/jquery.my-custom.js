//função para formatar do telefone
$.formatPhone = function (phone) {
    if (!phone || phone.length < 10 || phone.length > 11) {
        return phone;
    }

    var numDigits = phone.length == 10 ? 6 : 7;
    return '(' + phone.substring(0, 2) + 
        ') ' +
        phone.substring(2, numDigits) + 
        '-' + 
        phone.substring(numDigits, phone.length);
};

//formata o cpf
$.formatCpf = function (cpf) {
    if (!cpf || cpf.length < 11) {
        return cpf;
    }

    return cpf.substring(0, 3) +
        '.' +
        cpf.substring(3, 6) +
        '.' +
        cpf.substring(6, 9) +
        '-' +
        cpf.substring(9, 11);
};

//formata a data
$.formatDate = function (date) { //YYYY-MM-DD
    if (!date || date.length < 10 || date.length > 10) {
        return date;
    }

    var dateArray = date.split('-');
    return new Date(dateArray[0],parseInt(dateArray[1])-1,dateArray[2]).toLocaleDateString();
};

//formata o status
$.formatMaritalStatus = function (maritalStatus) { //1 - Solteiro, 2 - Casado, 3 - Divorciado
    switch (parseInt(maritalStatus)){
        case 1:
            return "Solteiro";
        case 2:
            return "Casado";
        case 3:
            return "Divorciado";
    }
};

//função plugin para pegar os dados e transformar em objeto javascript
//Ex: {FirstName:Mickey LastName:Mouse}
//[{name: 'cpf',value:''}] --- antes
//{cpf: '000',name:'davidson'} ----- Resultado
$.fn.serializeObject = function(){
    var formArray = $(this).serializeArray();
    var result = {};

    for(var i = 0; i< formArray.length; i++){
        result[formArray[i]['name']] = formArray[i]['value'];
    }
    return result;
};