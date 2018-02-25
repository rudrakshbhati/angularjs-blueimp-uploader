var app = angular.module("application", [])

app.config([
    '$interpolateProvider',
    function($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]);


app.component("uploader",{
    templateUrl: '/static/uploader.html',
    controller: uploaderController    
});

// templateUrl: "uploader.html",


function uploaderController($scope){      
    $scope.title = 'Upload videos with Blueimp';
    $scope.message = '';    
    var urlWistia = 'https://upload.wistia.com/?api_password=';
    var apiPassword = '6f8cc2ad9480bb0f55f8b8f438b026c2a026e624af0a947ec0dfd98ef52dd1ff';
    $scope.cssprogress = { 'width' : '0%', background : '#ff7400'};    
  
    angular.element('#fileupload').fileupload({                        
        url : urlWistia + apiPassword,        
        add: function (e, data) {                               
            data.submit();
        },
        start: function(e){            
            $scope.cssprogress = {'width' : '0%', background : '#ff7400'};                        
            $scope.message = 'Uploading file...';         
            $scope.$apply();
        },
        progress: function (e, data) {          
            var progress = parseInt(data.loaded / data.total * 100, 10);            
            $scope.cssprogress = {'width' : progress + '%', background : '#ff7400'};
            $scope.$apply();
        },
        done: function (e, data) {                                                                
            $scope.cssprogress = {'width' : '100%', background : '#5cb85c'};       
            var container = angular.element(document.querySelector('#video-container'));
            container.append('<div class="wistia_embed wistia_async_' + data.result.hashed_id + ' video-item"></div>');            
            $scope.message = 'Your file has been uploaded!';
            $scope.$apply();            
        },
        fail: function(e, data){                        
            $scope.cssprogress = {'width' : '100%', background : 'red'};
            $scope.message = 'An error has occurred: "' + data.errorThrown + '".' + ' Please check if Wistia account exceeded uploaded videos limit.';
            $scope.$apply();
        }
    });  
}