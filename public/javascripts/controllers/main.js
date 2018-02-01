/**
 * Created by Raj Chandra on 31-01-2018.
 */
var app = angular.module("quizApp",[]);

app.controller('mainController',['$scope','$http','$location','$rootScope',function ($scope,$http,$location,$rootScope) {
    // This global object holds the question numeber of the current participant.
    $rootScope.data = {
        questionNumber : 1,
        total : 0,
        summary : []
    };
    $rootScope.resData;

    $scope.getQuestion = function(){
        $http.post('/questions',$rootScope.data).then(successCallback, errorCallback);

        function successCallback(response) {
            $scope.question = response.data;
        }
        function errorCallback(error) {
            console.log(error);
        }
    };

    $scope.verifyAnswer = function(){
        console.log($rootScope.resData.answer);
        $scope.sendData = {
            answer : "all of these",
            questionNumber : $rootScope.data.questionNumber
        };
        $http.post('/verify',$scope.sendData).then(successCallback, errorCallback);

        function successCallback(response) {
            $scope.verifiedData = response.data;
            $rootScope.data.questionNumber +=1;
            if($scope.verifiedData.code==1){
                $rootScope.data.total +=1;
                var summaryData = {
                    question : $scope.question,
                    // answered : $scope.resData.answer,
                    correctAns : $scope.verifiedData.ans,
                    status : $scope.verifiedData.code
                };
                $rootScope.data.summary.push(summaryData);
            }
            else{
                var summaryData = {
                    question : $scope.question,
                    // answered : $scope.resData.answer,
                    correctAns : $scope.verifiedData.ans,
                    status : $scope.verifiedData.code
                };
                $rootScope.data.summary.push(summaryData);
            }
            if($rootScope.data.questionNumber < 6){
                $scope.getQuestion();
            }
        }
        function errorCallback(error) {
            console.log("Data could not be Obtained !" + error);
        }
    }

    $scope.showSummary = function(){

    }
}]);