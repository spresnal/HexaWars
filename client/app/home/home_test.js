'use strict';

//How to write tests --> http://jasmine.github.io/2.0/introduction.html
describe('myApp.home module', function() {

  beforeEach(module('myApp.home'));

  describe('home controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var homeCtrl = $controller('HomeCtrl');
      expect(homeCtrl).toBeDefined();
    }));

  });
});