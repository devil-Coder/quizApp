/**
 * Created by Raj Chandra on 31-01-2018.
 */
var app = angular.module("quizApp",[]);

app.controller('mainController',['$scope','$http','$location','$rootScope',function ($scope,$http,$location,$rootScope) {
    console.log("controller loaded..");
    $scope.verifyAnswer = function(){

    }
}]);