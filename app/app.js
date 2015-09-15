'use strict';

var game = angular.module('myApp', []);

game.factory('Quest', ['Hero', function (Hero) {

    function Quest(params) {
        this.name = undefined;
        this.time = 5;
        this.goldRew = 200;
        this.honorRew = 100;
        this.goldReq = 100;
        this.HonorReq = 50;
        this.level = 1;
        this.exp = 5;
        this.description = '';
        this.progress = 0;
        if (params) {
            this.set(params);
        }
    }

    Quest.prototype = {
        set: function (params) {
            angular.extend(this, params);
        },
        start: function(){
            var st = 0;
            var id = setInterval(function(){
                st = st + 0.2;
                this.progress = st/this.time;
                $scope.$apply();
                if(st >= this.time){
                    clearInterval(id);
                    this.finished();
                    $scope.hero.SaveState();
                    console.log("Quest",this.name, "finished");
                }

            }.bind(this),100);

            console.log("Quest",this.name, "started");

        },
        finished: function(){
            $scope.hero.gold += this.goldRew;
            $scope.hero.honor += this.honorRew;
            $scope.hero.exp += this.exp;
            $scope.$apply();
        }
    }

    return Quest;
}]);


game.factory('Hero', function () {

    function Hero(params) {
        this.name = undefined;
        this.speed = 1;
        this.strength = 1;
        this.magic = 1;
        this.armors = [];
        this.weapons = [];
        this.level = 1;
        this.class = undefined;
        this.age = 0;
        this.quests = [];
        this.gold = 0;
        this.honor = 0;
        this.exp = 0;
        this.goldMultiplier = 1;
        this.honorMultiplier = 1;
        this.speedMultiplier = 1;
        if (params) {
            this.set(params);
        }
    }

    Hero.prototype = {
        set: function (params) {
            angular.extend(this, params);
        },
        startQuest: function(quest){
            quest.start();
        },
        SaveState: function () {
            sessionStorage.Hero = angular.toJson($scope.hero);
        },

        RestoreState: function () {
            Hero = angular.fromJson(sessionStorage.userService);
        }
    }

    /**
     * Return the constructor function
     */
    return Hero;
});

game.controller('GameCtrl', ['$scope', 'Hero', 'Quest', function($scope, Hero, Quest) {

    $scope.hero = new Hero({name:'rachid', age:27, gold: 122});

    $scope.quests = [];
    $scope.quests.push(new Quest({name:'firstQuest', time:10 }));
    $scope.quests.push(new Quest({name:'secondQuest'}));

    window.$scope = $scope;

}]);