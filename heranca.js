function Animal() {
  this.barulho = '';
}

Animal.prototype = {
  fazerBarulho: function() {
    return this.barulho;
  }
};

function Pombo() {
  Animal.call(this);
  this.barulho = 'Pru pru';
};

function Cachorro() {
  Animal.call(this);
  this.barulho = 'Au au';
}

function Vaca() {
  Animal.call(this);
  this.barulho = 'Moo';
}

var pomboPrototype = new Animal();
Pombo.prototype = pomboPrototype;

var cachorroPrototype = new Animal();
Cachorro.prototype = cachorroPrototype;

var vacaPrototype = new Animal();
Vaca.prototype = vacaPrototype;


var pombo = new Pombo();
var cachorro = new Cachorro();
var vaca = new Vaca();

console.log(pombo.fazerBarulho());
console.log(cachorro.fazerBarulho());
console.log(vaca.fazerBarulho());
