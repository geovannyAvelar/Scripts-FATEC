var app = angular.module('app', []);

app.controller('controller', function($scope, $http) {

  $scope.setProduto = function(produto) {
    $scope.produto = angular.copy(produto);
  };

  $scope.salvarProduto = function() {
    $http.post('http://localhost:8080/produto/create', $scope.produto)
    .then(function (response) {
      if(response.statusText == 'OK') {
        $scope.mensagem = 'Produto salvo';
        $scope.atualizarLista();
        $scope.resetForm();
      }
    });
  };

  $scope.atualizarLista = function() {
    $http.get('http://localhost:8080/produto/all')
    .then(function (response) {
      if(response.statusText == 'OK') {
          $scope.produtos = response.data;
      }
    });
  };

  $scope.apagarProduto = function(id) {

    if(confirm("Tem certeza?")) {
      $http.post('http://localhost:8080/produto/delete', id)
      .then(function (response) {
        if(response.statusText = "OK") {
          $scope.atualizarLista();
        }
      });
    }

  };

  $scope.resetForm = function() {
    $scope.produto = undefined;
    $scope.form.$setUntouched();
  };

  $scope.atualizarLista();

});
