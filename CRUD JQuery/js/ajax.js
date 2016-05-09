$(document).ready(function() {
  carregarProdutos();

  $("#submit").click(function() {
    if(validar()) {
      cadastrarProduto($("#nome").val(),
                       $("#desc").val(),
                       $("#preco").val());
      limparCampos();
      limparMensagensErro();
    } else {
      mostrarMensagensDeErro();
    }

  });

});

$(document).on('click', '.btn-danger', function(){
  var id = $(this).attr('data-id');
  removerProduto(id);
});

function cadastrarProduto(nome, descricao, preco) {
  $.ajax({
    method: 'POST',
    contentType : 'application/json',
    url: 'http://localhost:8080/produto/create',
    data: JSON.stringify({"nome": nome, "descricao": descricao, "preco": preco})
  }).
    done(function(data) {
      limparTabela();
      carregarProdutos();
    });
}

function validar() {
  var nome = $("#nome").val();
  var desc = $("#desc").val();
  var preco = $("#preco").val();

  if(nome.length >= 2 &&
    desc.length >= 5 &&
    preco >= 0.05) {
      return true;
  }

  return false;

}

function mostrarMensagensDeErro() {
  var nome = $("#nome").val();
  var desc = $("#desc").val();
  var preco = $("#preco").val();

  if(nome.length < 2 && !$("#erroNome").length) {
    var message = "<p id='erroNome' class='text-danger'>"
                + "Nome não pode ter menos que dois caracteres"
                + "</p>";
    $(".nome").addClass('has-error');
    $(".nome").append(message);
  }

  if(desc.length < 5 && !$("#erroDesc").length) {
    var message = "<p id='erroDesc' class='text-danger'>"
                + "Descrição não pode ter menos que cinco caracteres"
                + "</p>";
    $(".descricao").addClass('has-error');
    $(".descricao").append(message);
  }

  if(preco.length < 0.05 && !$("#erroPreco").length) {
    var message = "<div id='erroPreco' class='text-danger'>"
                + "Preço não pode ser menor que R$ 0.05"
                + "</div>";
    $(".preco").addClass('has-error');
    $(".preco").append(message);
  }

}

function limparMensagensErro() {
  $("#erroNome").remove();
  $(".nome").removeClass('has-error');
  $("#erroDesc").remove();
  $(".descricao").removeClass('has-error');
  $("#erroPreco").remove();
  $(".preco").removeClass('has-error');
}

function limparCampos() {
  $("#nome").val('');
  $("#desc").val('');
  $("#preco").val('');
}

function carregarProdutos() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/produto/all'
  }).
    done(function(data) {
      limparTabela();
      desenharTabela(data);
    });
}

function removerProduto(id) {
  $.ajax({
    method: 'POST',
    contentType : 'application/json',
    url: 'http://localhost:8080/produto/delete',
    data: id
  }).
    done(function(data) {
      if(data.result == 'success') {
        $("#" + id).remove();
      }
    });
}

function desenharTabela(data) {
  for(var i = 0; i < data.length; i++) {
    $("#produtos").append("<tr id='" + data[i].id + "'>"
                              + "<td>"
                              + data[i].nome
                              + "</td>"
                              + "<td>"
                              + data[i].descricao
                              + "</td>"
                              + "<td>"
                              + data[i].preco
                              + "</td>"
                              + "<td>"
                                + "<button type='button' data-id='"
                                            + data[i].id
                                          + "' class='btn btn-danger'>"
                                  + "Apagar"
                                + "</button>"
                              + "</td>"
                          + "</tr>");
  }

}

function limparTabela() {
  $("#produtos tr").remove();
}
