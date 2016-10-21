// This is a JavaScript file

(function() {
    var app = angular.module('myApp', ['onsen', 'onsen.directives', 'ngTouch', 'angular-carousel']);
    
    //https://docs.monaca.io/en/reference/cordova_3.5/events/events/#backbutton

    //Sliding menu controller, swiping management
    app.controller('SlidingMenuController', function($scope){

        $scope.checkSlidingMenuStatus = function(){

            $scope.slidingMenu.on('postclose', function(){
                $scope.slidingMenu.setSwipeable(false);
            });
            $scope.slidingMenu.on('postopen', function(){
                $scope.slidingMenu.setSwipeable(true);
            });
        };
        
        $scope.checkSlidingMenuStatus();
    });
    
    //Home controller
    app.controller('HomeController', function($scope, $http) {
    });
    
    //Team Vote Controller
    app.controller('TeamVoteController', function($scope, $http) {
        
        $scope.pageload_TV = function () {
            
            //var qq = 'api/GetTeamMDataTeamId/' + pk_id + '/' + sessionStorage.getItem('teamvote_id');
            //ons.notification.alert({ message: qq, title: '批客節 qq' });
            
            var email = sessionStorage.getItem(userName);
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                headers['Content-Type'] = "content=text/html; charset=utf-8";
            }
            
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetTeamMDataTeamId/' + pk_id + '/' + sessionStorage.getItem('teamvote_id'),
                headers: headers
            }).then(function successCallback(response) {

                if  (response.data != null) {
                    
                    var result = response.data;
                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;
                    var team = result.Data[0];
                    
                    // $scope.teams = result.Data;
                    //ons.notification.alert({ message: JSON.stringify(result.Data) , title: '批客節' });
                    
                    if (team) {
                        $scope.team_name = team.team_name;
                        
                        if (team.product_photoUrl == '') {
                            $scope.product_photoUrl = 'images/noimage.png';
                        } else {
                            $scope.product_photoUrl = pictureUrl + team.product_photoUrl;
                        }
                        
                        if (team.introduction == '') {
                            $scope.introduction = '目前沒有介紹資料!';
                        } else {
                            $scope.introduction = team.introduction;
                        }
                        
                        if (team.team_photoUrl == '') {
                            $scope.team_photoUrl = 'images/noimage.png';
                        } else {
                            $scope.team_photoUrl = pictureUrl + team.team_photoUrl;
                        }
                        
                        if (team.product_photoUrl2 == '' || team.product_photoUrl2 == null) {
                            $scope.product_photoUrl2 = 'images/noimage.png';
                        } else {
                            $scope.product_photoUrl2 = pictureUrl + team.product_photoUrl2;
                        }
                        
                        if (team.product_photoUrl3 == '' || team.product_photoUrl3 == null) {
                            $scope.product_photoUrl3 = 'images/noimage.png';
                        } else {
                            $scope.product_photoUrl3 = pictureUrl + team.product_photoUrl3;
                        }
    
                        if (team.product_photoUrl4 == '' || team.product_photoUrl4 == null) {
                            $scope.product_photoUrl4 = 'images/noimage.png';
                        } else {
                            $scope.product_photoUrl4 = pictureUrl + team.product_photoUrl4;
                        }
    
                        $scope.vote_qty = team.vote_qty;
                        $scope.team_id = team.team_id;    
                    } else {
                        ons.notification.alert({ message: '查無隊伍詳細資訊!' , title: '批客節' });
                    }
                    
                } else {
                    ons.notification.alert({ message: '資料庫無回應!' , title: '批客節' });
                }
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節...' });
            });
            
        };
        
        $scope.AddVote = function() {
            
            var email = sessionStorage.getItem(userName);
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                //headers['Content-Type'] = "content=text/html; charset=utf-8";
            }
            
            var InsertVoteD = {
                PK_id : '01',
                clouduser_no: sessionStorage.getItem('clouduser_no'),
                team_id: sessionStorage.getItem('teamvote_id')
                //buy_date: Date.now.toString('yyyy-MM-dd HH:mm:ss')
            };
            
            //ons.notification.alert({ message: JSON.stringify(InsertVoteD) , title: '批客節' });
           // ons.notification.alert({ message: 'teamvote_id = ' + sessionStorage.getItem('teamvote_id') , title: '批客節 - 投票' });
            
            $http({
                method: 'POST',
                url: serviceUrl + 'api/InsertVoteD',
                data: InsertVoteD,
                headers: headers
            }).then(function successCallback(response) {

                if  (response.data != null) {
                    
                    var result = response.data;
                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;
                    
                    // $scope.teams = result.Data;
                    ons.notification.alert({ message: "" + RequestMessage , title: '批客節 - 投票' });
                                                        
                } else {
                    ons.notification.alert({ message: "" + JSON.stringify(response) , title: '批客節' });
                }
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節...' });
            });
        };
            
    });
    
    //Teams Controller
    app.controller('TeamsController', function($scope, $http) { 
        
        $scope.pageload = function () {
            
            var email = sessionStorage.getItem(userName);
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                headers['Content-Type'] = "content=text/html; charset=utf-8";
            }
            
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetTeamMData/' + pk_id + '/',
                headers: headers
            }).then(function successCallback(response) {

                if  (response.data != null) {
                    
                    var result = response.data;
                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;
                                    
                    $scope.teams = result.Data;
                    // ons.notification.alert({ message: JSON.stringify(result.Data) , title: '批客節' });
                                                        
                } else {
                    ons.notification.alert({ message: '查無隊伍資訊' , title: '批客節' });
                }
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
            });
        };
        
        $scope.setTeamVoteId = function(tid) {
            sessionStorage.setItem('teamvote_id', tid);
            //ons.notification.alert({ message: 'TeamVote ' + tid , title: '批客節' });
            //$scope.slidingMenu.setMainPage('aboutgame_3.html', {closeMenu: true});
        };
        
    });
    
    //Store controller
    app.controller('StoreController', function($scope, $http, $timeout, $httpParamSerializerJQLike){
        
        var store_id = sessionStorage.getItem('store_id');
        var email = sessionStorage.getItem(userName);
        var token = sessionStorage.getItem(tokenKey);
        
        /*
        // GoIn : sessionStorage.user = JSON.stringify($scope.user);
        // GoOut : $scope.user = JSON.parse(sessionStorage.user);
        angular.forEach(sessionStorage,function(value, key){
            ons.notification.alert({ message: key + ':' + value , title: 'sessionStorage' });
        });
        */
        
        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
            //headers['Content-Type'] = "content=text/html; charset=utf-8";
        }
        
        /*
        $http({
            method: 'GET',
            url: serviceUrl + 'api/GetStoreMData/' + pk_id + '/',
            headers: headers
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

        The response object has these properties:

            data – {string|Object} – The response body transformed with the transform functions.
            status – {number} – HTTP status code of the response.
            headers – {function([headerName])} – Header getter function.
            config – {Object} – The configuration object that was used to generate the request.
            statusText – {string} – HTTP status text of the response.
        */
        
        // loadStoreDetail(sessionStorage.getItem('store_id'));
        // loadbalance(sessionStorage.getItem(userName));

        $timeout(function(){
                    
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetStoreMDataStoreId/' + pk_id + '/' + store_id,
                headers: headers
            }).then(function successCallback(response) {

                if  (response.data != null) {
                    
                    var result = response.data;
                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;
                    var stores = result.Data;
                                    
                    for (var i = 0; i <= stores.length - 1 ; i++) {
                        // ons.notification.alert({ message: JSON.stringify(store[i]) , title: '批客節' });

                        $scope.imgUrl = pictureUrl + stores[i].photoUrl;
                        $scope.introduce_short = stores[i].introduce_short;
                        $scope.address = '地址: ' + stores[i].address;
                        $scope.tel_no = '電話: ' + stores[i].tel_no;
                        $scope.introduce = stores[i].introduce;
                        $scope.LonLat = '座標: ' + stores[i].lon_no + ',' + stores[i].lat_no;
                        /*
                        ons.notification.alert({ message: $scope.imgUrl , title: '批客節' });
                        var titleDiv = angular.element(document.getElementById('titleDiv'));
                        titleDiv.append('<img src="' + pictureUrl + stores[i].photoUrl + '" width="95%" align="center" />');
                        */
                    };
                    
                    if (sessionStorage.getItem('team_id') == 'null') {
                        $scope.balance = '未參賽';
                    } else {
                        $scope.loadBalance();
                    }

                } else {
                    ons.notification.alert({ message: '查無特約店家資訊' , title: '批客節' });
                }
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
            });
                        
        },100);
        
        $scope.AppCounter = function() {
            
            if (sessionStorage.getItem('team_id') == 'null') {
                ons.notification.alert({ message: '此功能僅供參賽人員使用!' , title: '批客節' });
                return false;
            }
            
            /*
            window.plugins.barcodeScanner.scan( function(result) {
                    alert("We got a barcode\n" +
                              "Result: " + result.text + "\n" +
                              "Format: " + result.format + "\n" +
                              "Cancelled: " + result.cancelled);
                }, function(error) {
                    alert("Scanning failed: " + error);
                }
            );
            */
            
            var _amt;
            var _team_id;
            var _store_id;
            var get_team_id = false;
            var get_store_id = false;
            
            ons.notification.prompt({
                message: '請直接輸入此次的購物金額',
                callback: function (results) {

                    _amt = results;
                    
                    // 防呆機制
                    if (results == '') { 
                        ons.notification.alert({ message: '未填金額!' , title: '批客節' });
                        return; 
                    }
                    if (results > $scope.balance) { 
                        ons.notification.alert({ message: '餘額不足!' , title: '批客節' });
                        return; 
                    }
                    
                    /*
                    navigator.notification.confirm(
                        'You are the winner!',  // message
                        onConfirm,              // callback to invoke with index of button pressed
                        'Game Over',            // title
                        'Restart,Exit'          // buttonLabels
                    );
                    */
                    
                    navigator.notification.confirm('購物金額為:NTD$' + _amt +'\n請掃描隊伍的QR Code!', ( function(btnLabel_T) {
                        
                        if (btnLabel_T==1) {
                            window.plugins.barcodeScanner.scan( function(result) {
                                /*
                                alert("We got a barcode\n" +
                                    "Result: " + result.text + "\n" +
                                    "Format: " + result.format + "\n" +
                                    "Cancelled: " + result.cancelled);
                                */    
                                _team_id = result.text;
                                get_team_id = !result.cancelled;
                                // navigator.notification.alert('get_team_id = ' + get_team_id);
                                
                                if (sessionStorage.getItem('team_id') != _team_id) {
                                    navigator.notification.alert('隊伍的QR Code錯誤!');
                                    get_team_id = false;
                                } else {
                                    navigator.notification.confirm('請掃描店家的QR Code!', (function (btnLabel_P) {
                                    
                                    if (btnLabel_P==1) {
                                        window.plugins.barcodeScanner.scan( function(result) {
                                            /*
                                            alert("We got a barcode\n" +
                                                "Result: " + result.text + "\n" +
                                                "Format: " + result.format + "\n" +
                                                "Cancelled: " + result.cancelled);
                                            */
                                            _store_id = result.text;
                                            get_store_id = !result.cancelled;
                                            
                                            if (sessionStorage.getItem('store_id') != _store_id) {
                                                navigator.notification.alert('店家的QR Code錯誤!' + sessionStorage.getItem('store_id'));
                                                get_store_id = false;
                                            };
                                                
                                            if ( get_team_id && get_store_id ) {
                                                
                                                var folio_d = {
                                                    PK_id: '01',
                                                    clouduser_no: sessionStorage.getItem('clouduser_no'),
                                                    team_id: _team_id,
                                                    //product_id: 'unknow',
                                                    qty: 1,
                                                    amt: parseInt(_amt),
                                                    //buy_date: Date.now.toString('yyyy-MM-dd HH:mm:ss'),
                                                    //ROWID: -1,
                                                    store_id: _store_id    //sessionStorage.getItem('store_id')
                                                };
                                                
                                                //var folio_p = $httpParamSerializerJQLike(folio_d);
                                                //alert(folio_p);
                                                                            
                                                // http://mis.ericsoft.com.tw:9003/api/InsertFolioD
                                                //InsertFolioD(folio_d);
                                                if (folio_d.amt > 0) {
                                                    $http({
                                                        method: 'POST',
                                                        url: serviceUrl + 'api/InsertFolioD',
                                                        data: folio_d,
                                                        headers: headers    // 注意次序，錯了會收不到！
                                                    }).then(function successCallback(response) {
                                                        var result = response.data;
                                                        var Version = result.Version;
                                                        var StatusCode = result.StatusCode;
                                                        var RequestMessage = result.RequestMessage;
                                                        
                                                        if (RequestMessage == '存檔成功') {
                                                            navigator.notification.alert(
                                                                "NTD:" + folio_d.amt + ' 已從您的錢包中扣除',
                                                                function () {}, '批客節!', '確定');
                                                        } else {
                                                            navigator.notification.alert(
                                                                "" + JSON.stringify(response.data),
                                                                function () {}, '批客節!', '確定');                                                    
                                                        };
                                                        
                                                    }, function errorCallback(response) {
                                                        ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
                                                    });
                                                }
                                                
                                                // reflash Team folio
                                                if (sessionStorage.getItem('team_id') == 'null') {
                                                    $scope.balance = '未參賽';
                                                } else {
                                                    $scope.loadBalance();
                                                }
                                                
                                            }
                
                                            }, function(error) {
                                                ons.notification.alert("Scanning failed: " + JSON.stringify(error));
                                                get_store_id = false;
                                            }
                                        );
                                    };
                                }), '批客節', 'OK,Cancel');
                                };
                                    
                                }, function(error) {
                                    ons.notification.alert("Scanning failed: " + JSON.stringify(error));
                                    get_team_id = false;
                                }
                            );
                            
                        };

                    }), '批客節', 'OK,Cancel');
                    //
                }
            });
            
        };
        
        $scope.InsertFolioD = function () {
            
            if (para.amt > 0) {
                $http({
                    method: 'POST',
                    url: serviceUrl + 'api/InsertFolioD',
                    headers: headers,
                    data: para
                }).then(function successCallback(response) {
                    var result = response.data;
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;

                    navigator.notification.alert(
                        "NTD:" + para.amt + ' 已從您的錢包中扣除',
                        function () {
                        },
                        '扣款成功!',
                        '確定');
                }, function errorCallback(response) {
                    ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
                });
            }
        };
                
        $scope.loadBalance = function() {
            
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetBalanceDataEmail/' + pk_id + '/' + email,
                headers: headers
            }).then(function successCallback(response) {
                var result = response.data;
                    
                var Version = result.Version;
                var StatusCode = result.StatusCode;
                var RequestMessage = result.RequestMessage;
                var data = result.Data;
                
                $scope.balance = data[0].balamt;
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
            });
                        
        };
        
        $scope.GetCloudUserInfo = function() {
            
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetCloudUserMDaTaEmail/' + pk_id + '/' + email,
                headers: headers
            }).then(function successCallback(response) {

                if  (response.data != null) {
                    
                    var result = response.data;
                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;
                    var CloudUser = result.Data[0];
                    
                    // ons.notification.alert({ message: "" + JSON.stringify(result.Data[0]) , title: '批客節' });
                    // ons.notification.alert({ message: CloudUser.team_id + ":" + CloudUser.Ewallet_id , title: '批客節' });
                                    
                    if (CloudUser.team_id == null) {
                        sessionStorage.setItem('team_id', 'null');
                        sessionStorage.setItem('Ewallet_id', 'null');
                    } else {
                        sessionStorage.setItem('team_id', CloudUser.team_id);
                        sessionStorage.setItem('Ewallet_id', CloudUser.Ewallet_id);
                    }
                    
                } else {
                    ons.notification.alert({ message: '查無 Team ID' , title: '批客節' });
                }
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
            });
            
        };
        
        $scope.storeload = function() {
             
             if (sessionStorage.getItem('team_id') == null) {
                 $scope.GetCloudUserInfo();
             } 
             //else
                //ons.notification.alert({ message: 'team_id = ' + sessionStorage.getItem('team_id') , title: '批客節' });
             
        };
                
    });

    //Map controller
    app.controller('MapController', function($scope, $compile, $http, $timeout){

        $scope.map;
        $scope.markers = [];
        $scope.markerId = 1;        
        
        //Map initialization  
        $timeout(function(){

            var latlng = new google.maps.LatLng(25.051000, 121.514600); //北緯,東經
            var myOptions = {
                zoom: 17,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions); 
            $scope.overlay = new google.maps.OverlayView();
            $scope.overlay.draw = function() {}; // empty function required
            $scope.overlay.setMap($scope.map);
            $scope.element = document.getElementById('map_canvas');
            /*
            $scope.hammertime = Hammer($scope.element).on("hold", function(event) {
                $scope.addOnClick(event);
            });
            */
            
            var email = sessionStorage.getItem(userName);
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                headers['Content-Type'] = "content=text/html; charset=utf-8";
            }
            
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetStoreMData/' + pk_id + '/',
                headers: headers
            }).then(function successCallback(response) {

                if  (response.data != null) {
                    
                    var result = response.data;
                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;
                    var stores = result.Data;
                                    
                    for (var i = 0; i <= stores.length - 1 ; i++) {
                      $scope.SetMark(stores[i].lat_no, stores[i].lon_no,stores[i].store_id, stores[i].store_title); 
                    }
                    
                } else {
                    ons.notification.alert({ message: '查無特約店家資訊' , title: '批客節' });
                }
                
            }, function errorCallback(response) {
                ons.notification.alert({ message: "" + response.statusText , title: '批客節' });
            });
            
            $scope.setCurrentLocation();
            
        },100);

        //Delete all Markers
        $scope.deleteAllMarkers = function(){

            if($scope.markers.length == 0){
                ons.notification.alert({
                    message: 'There are no markers to delete!!!'
                });
                return;
            }

            for (var i = 0; i < $scope.markers.length; i++) {

                //Remove the marker from Map                  
                $scope.markers[i].setMap(null);
            }

            //Remove the marker from array.
            $scope.markers.length = 0;
            $scope.markerId = 0;

            ons.notification.alert({
                message: 'All Markers deleted.'
            });   
        };

        $scope.rad = function(x) {
            return x * Math.PI / 180;
        };

        //Calculate the distance between the Markers
        $scope.calculateDistance = function(){

            if($scope.markers.length < 2){
                ons.notification.alert({
                    message: 'Insert at least 2 markers!!!'
                });
            }
            else{
                var totalDistance = 0;
                var partialDistance = [];
                partialDistance.length = $scope.markers.length - 1;

                for(var i = 0; i < partialDistance.length; i++){
                    var p1 = $scope.markers[i];
                    var p2 = $scope.markers[i+1];

                    var R = 6378137; // Earth’s mean radius in meter
                    var dLat = $scope.rad(p2.position.lat() - p1.position.lat());
                    var dLong = $scope.rad(p2.position.lng() - p1.position.lng());
                    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos($scope.rad(p1.position.lat())) * Math.cos($scope.rad(p2.position.lat())) *
                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    totalDistance += R * c / 1000; //distance in Km
                    partialDistance[i] = R * c / 1000;
                }


                ons.notification.confirm({
                    message: 'Do you want to see the partial distances?',
                    callback: function(idx) {

                        ons.notification.alert({
                            message: "The total distance is " + totalDistance.toFixed(1) + " km"
                        });

                        switch(idx) {
                            case 0:

                                break;
                            case 1:
                                for (var i = (partialDistance.length - 1); i >= 0 ; i--) {

                                    ons.notification.alert({
                                        message: "The partial distance from point " + (i+1) + " to point " + (i+2) + " is " + partialDistance[i].toFixed(1) + " km"
                                    });
                                }
                                break;
                        }
                    }
                });
            }
        };

        //Add single Marker
        $scope.addOnClick = function(event) {
            var x = event.gesture.center.pageX;
            var y = event.gesture.center.pageY-44;
            var point = new google.maps.Point(x, y);
            var coordinates = $scope.overlay.getProjection().fromContainerPixelToLatLng(point);

            var marker = new google.maps.Marker({
                position: coordinates,
                map: $scope.map
            });

            marker.id = $scope.markerId;
            $scope.markerId++;
            $scope.markers.push(marker);

            $timeout(function(){
                //Creation of the listener associated to the Markers click
            google.maps.event.addListener(marker, "click", function (e) {
                ons.notification.confirm({
                    message: 'Do you want to delete the marker?',
                    callback: function(idx) {
                        switch(idx) {
                            case 0:
                                ons.notification.alert({
                                    message: 'You pressed "Cancel".'
                                });
                                break;
                            case 1:
                                for (var i = 0; i < $scope.markers.length; i++) {
                                    if ($scope.markers[i].id == marker.id) {
                                        //Remove the marker from Map                  
                                        $scope.markers[i].setMap(null);

                                        //Remove the marker from array.
                                        $scope.markers.splice(i, 1);
                                    }
                                }
                                ons.notification.alert({
                                    message: 'Marker deleted.'
                                });
                                break;
                        }
                    }
                });
            });
            },1000);


        };
    
        //Add Picker Marker
        $scope.SetMark = function(lat, lng, sid, title) {
            if (sid == "") {                
                // 建立地標
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: $scope.map,
                    icon: 'images/ball.png',
                    title: "批客節"
                });
                // 觸碰地標
                google.maps.event.addListener(marker, "click", function (event) {
                    var infowindow = new google.maps.InfoWindow({
                        content: '<div>' + "目前位置!" + "</div>"
                    });
                    infowindow.open($scope.map, marker);
                    //navigator.vibrate(1000); // 震動 1 秒
                });
            } else {
                // 建立地標
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    map: $scope.map,
                    title: "特約商店"
                });
                
                var btnhtml = '<div id="markerDiv' + sid + '" onclick="sessionStorage.setItem(\'store_id\', \'' + sid + '\');app.slidingMenu.setMainPage(\'store.html\', {closeMenu: true})"> ' + title + ' </div>';
                // btnhtml = $compile(btnhtml)($scope);
                // btnhtml = $compile(btnhtml)($scope).outerHTML;
                
                // var contentString = '[' + title + ']<br /><button ng-click="storeDetail(\'' + sid + '\')"> ' + title + ' </button>';
                // contentString = $compile(contentString)($scope);
                                        
                // 觸碰地標
                google.maps.event.addListener(marker, "click", function (event) {
                    var infowindow = new google.maps.InfoWindow({
                        //content: '<b>' + title + '</b><br /><button onclick="app.AppServices.storeDetail(' + sid + ');">More...</button>'
                        content: btnhtml
                        //content: contentString
                        //content: '<b>' + title + '</b><br />' + temp
                        //content: '<div id="markerDiv' + sid + '"> ' + title + ' </div>'
                    });
                    infowindow.open($scope.map, marker);
                    //navigator.vibrate(1000); // 震動 1 秒
                });
                                
                //var markerDiv = angular.element(document.querySelector("#markerDiv" + sid));
                //markerDiv.on('onclick', $scope.storeDetail(sid));
                /*
                markerDiv.on('click', function(sid) {
                    ons.notification.alert({ message: 'store_id = ' + sid , title: '批客節' });
                    $scope.app.slidingMenu.setMainPage("store.html", {closeMenu: true});
                });
                */

                /*
                var btnhtml = '<button ng-click="storeDetail(' + sid + ');">More...</button>';
                var temp = $compile(btnhtml)($scope);
                angular.element(document.getElementById("markerDiv" + sid)).append(temp);
                ons.notification.alert({ message: 'SetMark ' + sid , title: '批客節' });
                */
            }
        };
        
        // 未完成
        $scope.storeDetail = function(sid) {
            ons.notification.alert({ message: 'store_id = ' + sid , title: '批客節' });
            // $scope.app.slidingMenu.setMainPage("store.html", {closeMenu: true});
        };
    
        // getstores_SetMark();
        $scope.getstores_SetMark = function() {
            var email = sessionStorage.getItem(userName);
            var token = sessionStorage.getItem(tokenKey);
            var headers = {};
            if (token) {
                headers.Authorization = 'Bearer ' + token;
                headers['Content-Type'] = "content=text/html; charset=utf-8";
            }
            
            $http({
                method: 'GET',
                url: serviceUrl + 'api/GetStoreMData/' + pk_id + '/',
                headers: headers
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                /*
                The response object has these properties:

                    data – {string|Object} – The response body transformed with the transform functions.
                    status – {number} – HTTP status code of the response.
                    headers – {function([headerName])} – Header getter function.
                    config – {Object} – The configuration object that was used to generate the request.
                    statusText – {string} – HTTP status text of the response.
                */
                if  (response.data != null) {
                    var result = response;                    
                    var Version = result.Version;
                    var StatusCode = result.StatusCode;
                    var RequestMessage = result.RequestMessage;

                    // var store = JSON.parse(result.Data);
                    var store = result.Data;

                    for (var i = 0; i <= store.length - 1 ; i++) {
                        //var tag = '<li><a href="#" onclick="storeDetail(\'' + store[i].store_id + '\')">';
                        //tag = tag + '<b>' + store[i].store_title + '</b> &nbsp;' + store[i].introduce_short;
                        //tag = tag + '</a></li>';
                        //$('#onsList').append(tag);

                        SetMark(store[i].lat_no, store[i].lon_no, store[i].store_id, store[i].store_title);
                    }
                }
                //else {
                //    $('#onsList').append('<ons-list-header>查無特約店家資訊</ons-list-header>')
                //}
                
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            
        };
        
        $scope.setCurrentLocation = function() {
            navigator.geolocation.getCurrentPosition(function onSuccess(position) {
                var Latitude = position.coords.latitude;
                var Longitude = position.coords.longitude;

                $scope.SetMark(Latitude, Longitude, '', '目前位置');
                
            }, function onError(error) {
                ons.notification.alert('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');

            }, { enableHighAccuracy: true, timeout: 30000 });
        };
    });
    
    //Login controller
    app.controller('LoginController', function($scope, $http, $httpParamSerializerJQLike){
        
        // $timeout(function(){ },5000);

        $scope.login = function () {

            var username = $scope.username + "@local";
            var password = $scope.password;
            
            // Make default password.
            if (password == null || password == '') { password = '123456'; }
            // ons.notification.alert({ message: username + ':' + password , title: '批客節' });
                    
            //Step 1. AccountNoCheck response newUser
            var checkUrl = serviceUrl + 'api/AccountNoCheck/' + pk_id + '/' + username;
            // var checkUrl_n = serviceUrl + '\napi/AccountNoCheck/\n' + pk_id + '/' + username
            // ons.notification.alert({ message: checkUrl_n , title: '批客節' });
            $http({
                method: 'GET',
                url: checkUrl,
            }).then(function successCallback(response) {
                /* 
                The response object has these properties:
                    data – {string|Object} – The response body transformed with the transform functions.
                    status – {number} – HTTP status code of the response.
                    headers – {function([headerName])} – Header getter function.
                    config – {Object} – The configuration object that was used to generate the request.
                    statusText – {string} – HTTP status text of the response.
                */
            
                var respData = response.data;
                if (!respData) {
                    ons.notification.alert({ message: 'API:x0218:' + response.status , title: '批客節' });
                    return false;
                }
                
                if (respData.RequestMessage) {
                    
                    var newUser = false;

                    if (respData.RequestMessage == "查詢成功") { 
                        sessionStorage.setItem('clouduser_no', respData.Data);
                        // ons.notification.alert({ message: sessionStorage.getItem('clouduser_no'), title: '批客節'});
                        newUser = false; 
                    } else { 
                        newUser = true; 
                    }
                    // ons.notification.alert({ message: '查詢成功:' + username + ':' + newUser.toString() , title: '批客節' });
                        
                    //Step 2. Check newUser Then GetToken or RegisterNewUser
                    if (!newUser) {

                        //step GetToken
                        var loginData = {
                            grant_type: 'password',
                            username: username,
                            password: password
                        };
                        var sdata = $httpParamSerializerJQLike(loginData);

                        $http({
                            method: 'POST',
                            url: serviceUrl + 'Token',
                            data: sdata,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).success(function (response) {
                            
                            // ons.notification.alert({ message: JSON.stringify(response), title: '批客節' });

                            if (response.access_token) {
                                sessionStorage.setItem(tokenKey, response.access_token);
                                //sessionStorage.setItem(userName, response.userName); // asp net identity 沒傳這個值
                                sessionStorage.setItem(userName, username);
                                
                                ons.notification.alert({ message: '登入成功', title: '批客節' });
                                // var content = document.querySelector('ons-splitter-content');
                                // content.load('map.html');
                                // $window.location.href = 'map.html';
                                // $scope.slidingMenu.setMainPage('login.html', {closeMenu: true});
                                // $scope.ons.navigator.pushPage('map.html');
                                // $scope.ons.slidingMenu.setMainPage('map.html');
                                // ons.slidingMenu.setMainPage('map.html', {closeMenu: true, animation: 'fade'})
                                // ons.slidingMenu.setSwipable(true);
                                // rootNavigator.resetToPage('map.html')
                                // loginPage.pushPage('map.html');
                                // ons.navigator.pushPage('map.html');
                                // app.slidingMenu.setMainPage('map.html', {closeMenu: true});
                                //$scope.pushPage('map.html');
                                //$scope.ons.slidingMenu.setMainPage("map.html", {closeMenu: true});
                                $scope.app.slidingMenu.setMainPage("main.html", {closeMenu: true});
                            }
                            
                        }).error(function (Errors) {
                            // ex:"{"error":"invalid_grant","error_description":"使用者名稱或密碼不正確。"}"
                            /* 
                            The response object has these properties:
                                data – {string|Object} – The response body transformed with the transform functions.
                                status – {number} – HTTP status code of the response.
                                headers – {function([headerName])} – Header getter function.
                                config – {Object} – The configuration object that was used to generate the request.
                                statusText – {string} – HTTP status text of the response.
                            */                            
                            if (Errors.error_description) {
                                ons.notification.alert({ message: "" + Errors.error_description, title: '批客節' });
                            } else ons.notification.alert({ message: 'API:' + JSON.stringify(Errors), title: '批客節' });
                        });

                    } else {
                    
                        // Step RegisterNewUser
                        var NewUserData = {};
                        NewUserData.Email = username;
                        NewUserData.Password = password;
                        NewUserData.ConfirmPassword = password;

                        $http.post(serviceUrl + 'api/Account/RegisterPK', NewUserData).success(function (result) {
                            var Version = result.Version;
                            var StatusCode = result.StatusCode;
                            var RequestMessage = result.RequestMessage;

                            if (StatusCode == '0') {

                                // Setp InsertCloudUserM
                                var para = {
                                    PK_id: pk_id,
                                    ID: result.Data,
                                    account_no: username,
                                    password: password,
                                    email: username
                                };

                                $http({
                                    method: 'POST',
                                    url: serviceUrl + 'api/InsertCloudUserM',
                                    data: para,
                                    cache: false
                                }).success(function (result) {
                                    var Version = result.Version;
                                    var StatusCode = result.StatusCode;
                                    var RequestMessage = result.RequestMessage;
                                }).error(function (err) {
                                    // ex:"{"error":"invalid_grant","error_description":"使用者名稱或密碼不正確。"}"
                                    var status = err.status;
                                    var statusText = err.statusText;
                                    var obj = JSON.parse(err.responseText);
                                    ons.notification.alert({ message: "" + obj.error_description, title: '批客節' });
                                    // navigator.notification.alert(err.responseText, null, 'token訊息', 'OK');
                                });

                                ons.notification.alert({ message: '新使用者建檔完成!', title: '批客節' });
                            } else {
                                ons.notification.alert({ message: 'API:' + RequestMessage, title: '批客節' });
                            }
                        }).error(function (err) {
                            // ex:"{"error":"invalid_grant","error_description":"使用者名稱或密碼不正確。"}"
                            var status = err.status;
                            var statusText = err.statusText;
                            var obj = JSON.parse(err.responseText);
                            ons.notification.alert({ message: "" + obj.error_description, title: '批客節' });
                            // navigator.notification.alert(err.responseText, null, 'token訊息', 'OK');
                        });
                    }
                }
                
            }, function errorCallback(response) {
                if (response) {
                    /* 
                    The response object has these properties:
                        data – {string|Object} – The response body transformed with the transform functions.
                        status – {number} – HTTP status code of the response.
                        headers – {function([headerName])} – Header getter function.
                        config – {Object} – The configuration object that was used to generate the request.
                        statusText – {string} – HTTP status text of the response.
                    */
                    var status = response.status;
                    if (status!=0) {
                        var statusText = response.statusText;
                        if (statusText) {
                            ons.notification.alert({ message: "" + statusText, title: '批客節' });
                        } else ons.notification.alert({ message: 'API:x0315:' + status, title: '批客節' });
                    }
                } else ons.notification.alert({ message: '預查時無法預期的錯誤!', title: '批客節' });
            });
        };
        
    });
    
    //Logout controller
    app.controller('LogoutController', function($scope, $http){
        
        $scope.logout = function () {
            sessionStorage.removeItem(tokenKey);
            sessionStorage.removeItem(userName);
            sessionStorage.removeItem('team_id');
            sessionStorage.removeItem('Ewallet_id');
            sessionStorage.removeItem('clouduser_no');
            
            // ToDo .... API 後端登出... 待補! By AERO 20160923
            
            ons.notification.alert({ message: 'Log Out' , title: '批客節' });

            $scope.app.slidingMenu.setMainPage("home.html", {closeMenu: true});
        };
        
    });
    
    //Gallery
    app.factory('GalleryData', function(){
        var data = {};
        
        data.items = [
            { src: "images/banner/banner1.jpg", href: "http://dd-toytown.anow.tw"},
            { src: "images/banner/banner2.jpg", href: "http://0225566888.tranews.com/"},
            { src: "images/banner/banner3.jpg", href: "http://www.7colors.com.tw/front/bin/home.phtml"},
            { src: "images/banner/banner4.jpg", href: "http://www.wei-wei.com.tw/"},
            { src: "images/banner/banner5.jpg", href: "http://www.viewtaiwan.com/place.php?v=illZ6QYbM6S"}

        ]; 
        
        return data;
    });

    //Gallery Controller
    app.controller('GalleryController', function($scope, GalleryData) {
            
        var items = GalleryData.items;

        function addSlides(target) {
            angular.forEach(items,function(item,index){
                target.push({
                    picture: item.src,
                    item: (index + 1)
                });
                
                //Load Banners
                //ons.notification.alert({ message: item.src + ':' + index , title: '批客節' });
            });
         };
        
        var access_token = sessionStorage.getItem(tokenKey);
        var userName = sessionStorage.getItem(userName);
        
        if (access_token != null) {
            $scope.slides = [];
            addSlides($scope.slides);
        } else {
            $scope.app.slidingMenu.setMainPage("home.html", {closeMenu: true});
            return false;
        }
    
    });
    
    //GEO location
    app.service('GetGEO', function () {
       
        var Latitude = undefined;
        var Longitude = undefined;
       
        // onMapSuccess  Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onMapSuccess  = function(position) {
            /*
            alert('Latitude: '          + position.coords.latitude          + '\n' +
                  'Longitude: '         + position.coords.longitude         + '\n' +
                  'Altitude: '          + position.coords.altitude          + '\n' +
                  'Accuracy: '          + position.coords.accuracy          + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                  'Heading: '           + position.coords.heading           + '\n' +
                  'Speed: '             + position.coords.speed             + '\n' +
                  'Timestamp: '         + position.timestamp                + '\n');
            */
            Latitude = position.coords.latitude;
            Longitude = position.coords.longitude;

            getMap(Latitude, Longitude);
        };
    
        // onError Callback receives a PositionError object
        //
        function onMapError(error) {
            
            ons.notification.alert('code: '    + error.code    + '\n' +
                                'message: ' + error.message + '\n');
        };
    
        // Call command "GetGEO.Read($scope);"
        function getMapLocation(scope) {
            
            navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, timeout: 30000 });        
        };
        
        // Get map by using coordinates
        function getMap(latitude, longitude) {
            /*
            var mapOptions = {
                center: new google.maps.LatLng(0, 0),
                zoom: 1,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        
            map = new google.maps.Map
            (document.getElementById("map"), mapOptions);
            */
        
            var latLong = new google.maps.LatLng(latitude, longitude);
        
            var marker = new google.maps.Marker({
                position: latLong,
                map: $scope.map,
                title: '目前位置'
            });
            
            /*
            marker.setMap(map);
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            */
        }
        
        // Success callback for watching your changing position
        var onMapWatchSuccess = function (position) {
        
            var updatedLatitude = position.coords.latitude;
            var updatedLongitude = position.coords.longitude;
        
            if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
        
                Latitude = updatedLatitude;
                Longitude = updatedLongitude;
        
                getMap(updatedLatitude, updatedLongitude);
            }
        }
            
        // Watch your changing position        
        function watchMapPosition() {
            
            return navigator.geolocation.watchPosition
            (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
        }
    });
    
    // AppServices
    app.service('AppServices', function () {
    return {

        Read: function (state) {
            return state += state;
        },

        Write: function (state) {
            return state += state;
        },
        Update: function (state) {
            state = state;
        },
        Delete: function () {
            state = null;
        }

    };
});

})();


/*
//pass your scope to your service
app.controller('MainController', function ($scope, router, notePad) {
    notePad.changeView($scope);
});

//munipulate your scope just like you would in a controller
app.service('notePad', function () {
    function changeView(scope) {
        scope.write = 'example';
    }
});
*/
