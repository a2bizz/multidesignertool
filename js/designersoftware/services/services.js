'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('assets/phones/:phoneId', {}, {
      query: {method:'GET', params:{phoneId:'phones.json'}, isArray:true}
    });
  }]);
