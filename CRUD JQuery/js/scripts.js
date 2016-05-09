// Empty JS for your own code to be here
var produtos = [];

$(document).ready(function() {

  var id = 0;

  $("#submit").click(function() {
    var nome = $("#nome").val();
    var desc = $("#desc").val();
    var preco = $("#preco").val();

    if(nome.length < 2 && !$("#erroNome").length) {
      var message = "<li id='erroNome' style='color: red;'>"
                  + "Nome não pode ter menos que dois caracteres"
                  + "</li>";
      $("#errors").append(message);
    }

    if(desc.length < 5 && !$("#erroDesc").length) {
      var message = "<li id='erroDesc' style='color: red;'>"
                  + "Descrição não pode ter menos que cinco caracteres"
                  + "</li>";
      $("#errors").append(message);
    }

    if(preco.length < 0.05 && !$("#erroPreco").length) {
      var message = "<li id='erroPreco' style='color: red;'>"
                  + "Preço não pode ser menor que R$ 0.05"
                  + "</li>";
      $("#errors").append(message);
    }

    if(nome.length >= 2 && desc.length >= 5 && preco >= 0.05) {
      var produto = {'id': id,'nome': nome, 'desc': desc, 'preco': preco};
      produtos.push(produto);
      id++;

      $("#produtos").append("<tr id='" + produto.id +"'>"
                          + "<td>" + produto.nome + "</td>"
                          + "<td>" + produto.desc + "</td>"
                          + "<td> R$ " + produto.preco + "</td>"
                          + "<td>"
                              + "<button class='btn btn-danger' data-id='"
                              + produto.id +"'>"
                              + "Apagar</button></td>"
                          +"</tr>");

        for(var i = 0; i < $("#errors").length; i++) {
          $("#errors")[i].remove();
        }
    }



  });

});

$(document).on('click', '.btn-danger', function(){
  var id = $(this).attr('data-id');

  for(var i = 0; i < produtos.length; i++) {
    if(produtos[i].id == id) {
      produtos.pop(produtos[i]);
      $("#" + id).remove();
    }
  }
});
