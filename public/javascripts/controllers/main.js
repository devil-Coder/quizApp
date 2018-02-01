/**
 * Created by Raj Chandra on 31-01-2018.
 */
var app = angular.module("quizApp",[]);

app.controller('mainController',['$scope','$http','$rootScope',function ($scope,$http,$rootScope) {
    // This global object holds the question numeber of the current participant.
    $rootScope.data = {
        questionNumber : 1,
        total : 0,
        summary : []
    };
   // function to fetch the questions
    $scope.getQuestion = function(){
        $http.post('/questions',$rootScope.data).then(successCallback, errorCallback);

        function successCallback(response) {
            $scope.question = response.data;
        }
        function errorCallback(error) {
            console.log(error);
        }
    };
    //function to verify the answer
    $scope.verifyAnswer = function(){
        //data to be send for verifying the answer
        $scope.sendData = {
            answer : $scope.answer,
            questionNumber : $rootScope.data.questionNumber
        };
        //sending request
        $http.post('/verify',$scope.sendData).then(successCallback, errorCallback);
        //if no error in http request
        function successCallback(response) {
            $scope.verifiedData = response.data;
            //Increasing the question number in any case
            $rootScope.data.questionNumber +=1;
            //if answer is correct increase the total
            if($scope.verifiedData.code==1){
                $rootScope.data.total +=1;
            }
            //push the summary of the current question
            var summaryData = {
                question : $scope.question,
                answered : $scope.answer,
                correctAns : $scope.verifiedData.ans,
                status : $scope.verifiedData.code
            };
            $rootScope.data.summary.push(summaryData);
            //send the next question
            if($rootScope.data.questionNumber < 6){
                $scope.getQuestion();
            }
        }
        //if error in http request ,console the error
        function errorCallback(error) {
            console.log("Data could not be Obtained !" + error);
        }
    }
}]);