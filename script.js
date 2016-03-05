function gerarListener() {

  var obj = {count: 0};
  var listeners = [];

  obj.adicionarOuvinte = function(f) {
    listeners.push(f);
  }

  function exec() {
    for(var i = 0; i < listeners.length; i++) {
      listeners[i]();
      obj.count++;
      console.log(obj.count);
    }
  }

  obj.exec = exec;
  return obj;

}

var o = new gerarListener();

window.onload = function() {
  o.adicionarOuvinte( function() {
    console.log('Rodando função 1');
  });

  o.exec();
  o.exec();

};
