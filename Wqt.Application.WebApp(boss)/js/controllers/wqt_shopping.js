//商城首页
app.controller('shop_indexController',
    [
        '$scope', '$rootScope', '$state', '$wqtHttp', 'UserInfo', '$wqtLocals', '$interval', 'ServiceApi', '$window',
        'toaster', function ($scope,
            $rootScope,
            $state,
            $wqtHttp,
            UserInfo,
            $wqtLocals,
            $interval,
            ServiceApi,
            $window,
            toaster) {
            //请求数据
            var grid = {
                pager: {
                    totalItems: 0,
                    currentPage: 0,
                    maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {

                        grid.reflash();
                    }
                },
                rows: [],
                reflash: function () {
                    $wqtHttp.post({
                        url: ServiceApi.shopping.ShopCateogry,
                        data: {},
                        success: function (data) {
                            if (data.status.code != 0) {
                                toaster.pop("error", "系统错误", data.status.desc);
                            } else {
                                console.log(data);
                                $scope.Grid.pager.totalItems = data.result.records;
                                $scope.Grid.pager.currentPage = data.result.page;
                                $scope.productList = data.result;
                                $scope.$on('ngRepeatFinished',
                                    function (ngRepeatFinishedEvent) {
                                        console.log($('.shopHall .bos_select_content ul li'));
                                        $('.shopHall .bos_select_content ul li').on('click',
                                            function () {
                                                console.log($(this));
                                                var index = $(this).index();
                                                console.log(index);
                                                $("html, body").animate({
                                                    scrollTop: $("#BOS" + index).offset().top - 90
                                                },
                                                    { duration: 500, easing: "swing" });
                                                return false;
                                            });
                                    });
                                $('.bos_select_bottom').on('click',
                                    function () {
                                        $('.bos_select_content').slideToggle();
                                    })

                            }
                        },
                        error: function () {

                        }
                    })

                }
            }
            $scope.Grid = grid;
            $scope.btnSuccess = false;
            $scope.rowId = 0;
            $scope.Grid.reflash();
            $scope.shoppingDetail = function (Id) {
                $state.go('app.mall.gwgc.shoppingDetail', { id: Id })
            }
        }
    ]);
//购物详情
app.controller('ShoppingDetailCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {
            $scope.id = $stateParams.id;
            $scope.hasInput = false;
            $('.productBy').mouseenter(function () {
                $('.shopDetail .shopcarBox').css('right', "0px")
            });
            $('.shopcarBox div').mouseenter(function () {
                $(this).css('background', '#FF0036');
            }).mouseleave(function () {

                $(this).css('background', 'transparent');
            });
            $wqtHttp.post({
                url: ServiceApi.shopping.ProductDetail,
                data: { pid: $scope.id },
                success: function (data) {
                    if (data.status.code != 0) {
                        toaster.pop("error", data.status.desc);
                    } else {
                        console.log(data);
                        $scope.productDetail = data.result;
                        $scope.productDetail.count = 1;
                    }
                },
                error: function () {

                }
            });
            $scope.addShoppingCar = function () {
                //$state.go('app.mall.sjrz.shoppingSuccess');
                console.log($scope.id, $scope.productDetail.count)
                if ($scope.productDetail.count) {
                    $scope.hasInput = false;
                    $wqtHttp.post({
                        url: ServiceApi.shopping.AddShopCart,
                        data: { productId: $scope.id, count: $scope.productDetail.count },
                        success: function (data) {
                            if (data.status.code != 0) {
                                toaster.pop("error", data.status.desc);
                            } else {
                                console.log(data);
                                $state.go('app.mall.gwgc.shoppingSuccess');
                                //$scope.productDetail = data.result;
                            }
                        },
                        error: function () {

                        }
                    });

                } else {
                    $scope.hasInput = true;
                }
            }
        }]);
//购物车
app.controller('ShoppingCarCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {
            $wqtHttp.post({
                url: ServiceApi.shopping.ShopCartInfo,
                data: {},
                success: function (data) {
                    if (data.status.code != 0) {
                        toaster.pop("error", data.status.desc);
                    } else {
                        console.log(data);
                        if (data.result && data.result.length > 0) {
                            $scope.hasGoods = true;
                        } else {
                            $scope.hasGoods = false;
                        }
                        $scope.productItems = data.result;
                        //数量加
                        $scope.add = function (id) {
                            angular.forEach($scope.productItems, function (item, index, array) {
                                if (item.productId === id) {
                                    item.count++;
                                    $wqtHttp.post({
                                        url: ServiceApi.shopping.EditShopCart,
                                        data: { productId: item.productId, count: item.count },
                                        success: function (data) {
                                            if (data.status.code != 0) {
                                                toaster.pop("error", data.status.desc);
                                            } else {
                                                console.log(data);
                                            }
                                        },
                                        error: function () {

                                        }
                                    });
                                }
                            })
                        };
                        //数量减
                        $scope.reduce = function (id) {
                            angular.forEach($scope.productItems, function (item, index, array) {
                                if (item.productId === id) {
                                    item.count--;
                                    $wqtHttp.post({
                                        url: ServiceApi.shopping.EditShopCart,
                                        data: { productId: item.productId, count: item.count },
                                        success: function (data) {
                                            if (data.status.code != 0) {
                                                toaster.pop("error", data.status.desc);
                                            } else {
                                                console.log(data);
                                            }
                                        },
                                        error: function () {

                                        }
                                    })
                                }
                            })
                        };
                        //输入框添加keydown事件，避免输入非正整数  
                        $scope.quantityKeydown = function (event) {
                            event = event || window.event;
                            var target = event.target || event.srcElement;
                            var keycode = event.keyCode;
                            if ((37 <= keycode && keycode <= 40) || (48 <= keycode && keycode <= 57) || (96 <= keycode && keycode <= 105) || keycode == 8) {
                                //方向键↑→ ↓←、数字键、backspace  
                            } else {
                                console.log(keycode); event.preventDefault();
                                return false;
                            }
                        };
                        //keyup事件，当输入数字为0时，重新刷新文本框内容 
                        $scope.quantityKeyup = function (event) {
                            event = event || window.event;
                            var target = event.target || event.srcElement;
                            var keycode = event.keyCode;
                            if (48 === keycode || 96 === keycode) {
                                target.value = parseInt(target.value);
                            }
                        };

                        //删除商品
                        $scope.delete = function (id) {
                            $scope.productItems.forEach(function (item, index) {
                                if (item.productId == id) {
                                    if (confirm("确定要从购物车中删除此商品？")) {
                                        $scope.productItems.splice(index, 1);
                                        if ($scope.productItems.length < 0) {
                                            $scope.hasGoods = false;
                                        }
                                        $wqtHttp.post({
                                            url: ServiceApi.shopping.EditShopCart,
                                            data: { productId: item.productId, count: 0 },
                                            success: function (data) {
                                                if (data.status.code != 0) {
                                                    toaster.pop("error", data.status.desc);
                                                } else {
                                                    console.log(data);
                                                }
                                            },
                                            error: function () {

                                            }
                                        });
                                        return;
                                    }
                                }
                            })
                        };

                        //计算总额
                        $scope.getTotalAmount = function () {
                            var totalAmount = 0;
                            angular.forEach($scope.productItems, function (item, index, array) {
                                totalAmount += item.count * item.price;
                            });
                            return totalAmount;
                        };
                    }
                },
                error: function () {

                }
            });
        }]);
//购物车详情
app.controller('ShoppingCarDetailCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {

            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {
                        //  alert(this.currentPage);
                        console.log(this.currentPage);

                        grid.reflash();
                    }
                },
                rows: [],
                reflash: function () {
                    //获取收货地址
                    $wqtHttp.post(
                        {
                            url: ServiceApi.shopping.DeliveryAddressList,
                            data: {},
                            success: function (data) {
                                if (data.status.code != 0) {
                                    console.log(data);
                                    toaster.pop("error", data.status.desc);
                                } else {
                                    console.log(data);
                                    $scope.AddressList = data.result.rows;


                                }
                            },
                            error: function () {
                                //$scope.logining = false;
                            }
                        });
                    //获取购物列表
                    $wqtHttp.post(
                        {
                            url: ServiceApi.shopping.ShopCartInfo,
                            data: {},
                            success: function (data) {
                                if (data.status.code != 0) {
                                    console.log(data);
                                    toaster.pop("error", data.status.desc);
                                } else {
                                    console.log(data);
                                    $scope.productItems = data.result;
                                    $scope.getTotalAmount = function () {
                                        var totalAmount = 0;
                                        angular.forEach($scope.productItems, function (item, index, array) {
                                            totalAmount += item.count * item.price;
                                        });
                                        return totalAmount;
                                    };
                                }
                            },
                            error: function () {
                                //$scope.logining = false;
                            }
                        });
                }
            }
            $scope.Grid = grid;
            $scope.Grid.reflash();

            //新建收货地址
            $scope.addAddress = function () {
                var urlId = UserInfo.get().userid;
                $state.go('app.mall.address.index', { returnUrl: urlId })
            };

            //提交订单
            $scope.createOrder = {}
            $scope.placeOrder = function (addList, productItems) {
                console.log($scope.createOrder);
                var productIdArr = [];
                if (!$scope.createOrder.DeliveryAddressId) {
                    for (var i = 0; i < addList.length; i++) {
                        if (addList[i].isDefault) {
                            $scope.createOrder.DeliveryAddressId = addList[i].id;
                        }
                    }
                };
                for (var i = 0; i < productItems.length; i++) {

                    productIdArr.push(productItems[i].productId);
                    var productTotalId = productIdArr.join("/");
                }

                $scope.createOrder.productId = productTotalId;
                $wqtHttp.post(
                    {
                        url: ServiceApi.shopping.CreateOrder,
                        data: $scope.createOrder,
                        success: function (data) {

                            if (data.status.code === '0') {

                                $state.go('app.mall.order.index');
                            }
                        },
                        error: function () {
                            //$scope.logining = false;
                        }
                    });

            }
        }]);
//我的订单
app.controller('ShoppingOrderCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {
 
            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {
                        //  alert(this.currentPage);
                        console.log(this.currentPage);

                        grid.reflash();
                    }
                },
                rows: [],
                reflash: function () {

                    $wqtHttp.post(
                        {
                            url: ServiceApi.shopping.OrderList,
                            data: {},
                            success: function (data) {
                                if (data.status.code != 0) {
                                    console.log(data);
                                    toaster.pop("error", data.status.desc);
                                } else {
                                    console.log(data);
                                    $scope.orderList = data.result.rows;
                                }
                            },
                            error: function () {
                                //$scope.logining = false;
                            }
                        });
                }
            }

            $scope.Grid = grid;
            $scope.Grid.reflash();
        }]);
//新建收货地址
app.controller('AddAddressCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {
            $scope.returnUrl = $stateParams.returnUrl;

            console.log($scope.returnUrl)
            $scope.AddAddress = function (isValid) {
                if (isValid) {
                    $wqtHttp.post(
                        {
                            url: ServiceApi.shopping.CreateDeliveryAddress,
                            data: $scope.address,
                            success: function (data) {
                                if (data.status.code != 0) {
                                    console.log(data);
                                    toaster.pop("error", data.status.desc);
                                } else {
                                    console.log(data);
                                    if ($scope.returnUrl) {
                                        $state.go('app.mall.shopcar.detail');
                                        $scope.steps.step1 = true;
                                        $scope.steps.step2 = false;
                                    }
                                }
                            },
                            error: function () {
                                //$scope.logining = false;
                            }
                        });
                } else {

                }
            }

        }]);
//收货地址列表
app.controller('AddressListCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {
            var grid = {
                pager: {
                    totalItems: 0, currentPage: 0, maxSize: 5,
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },
                    pageChanged: function () {
                        //  alert(this.currentPage);
                        console.log(this.currentPage);

                        grid.reflash();
                    }
                },
                rows: [],
                reflash: function (listData) {
                    $wqtHttp.post(
                        {
                            url: ServiceApi.shopping.DeliveryAddressList,
                            data: listData,
                            success: function (data) {
                                if (data.status.code != 0) {
                                    console.log(data);
                                    toaster.pop("error", data.status.desc);
                                } else {
                                    console.log(data);
                                    //默认值文字
                                    var isDefaultArr = ['是', '否'];
                                    for (var i = 0; i < data.result.rows.length; i++) {
                                        if (data.result.rows[i].isDefault) {
                                            data.result.rows[i].isDefaultText = isDefaultArr[0]
                                        } else {
                                            data.result.rows[i].isDefaultText = isDefaultArr[1]
                                        }
                                    }

                                    $scope.AddressList = data.result.rows;

                                    //删除列表
                                    $scope.delete = function (id) {
                                        $scope.AddressList.forEach(function (item, index) {
                                            if (item.id == id) {
                                                if (confirm("确定要删除？")) {

                                                    //还需调删除接口
                                                    $wqtHttp.post({
                                                        url: ServiceApi.shopping.DeleteDeliveryAddress,
                                                        data: { aId: id },
                                                        success: function (data) {
                                                            if (data.status.code != 0) {
                                                                toaster.pop("error", data.status.desc);
                                                            } else {
                                                                console.log(data);
                                                                $scope.AddressList.splice(index, 1);
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    };

                                    //设为默认地址
                                    $scope.default = function (id) {
                                        //$scope.Grid.reflash(id);
                                        //还需调设置默认地址接口
                                        $wqtHttp.post({
                                            url: ServiceApi.shopping.DeleteDeliveryAddress,
                                            data: { aId: id },
                                            success: function (data) {
                                                if (data.status.code != 0) {
                                                    toaster.pop("error", data.status.desc);
                                                } else {
                                                    console.log(data);
                                                    $scope.AddressList.forEach(function (item, index) {
                                                        if (item.id == id) {
                                                            console.log($scope.AddressList[index].isDefault);
                                                            $scope.AddressList[index].isDefault = !$scope.AddressList[index].isDefault;
                                                            $scope.AddressList[index].isDefaultText = '是';

                                                        }
                                                    })
                                                }
                                            }
                                        })


                                    }

                                }
                            },
                            error: function () {
                                //$scope.logining = false;
                            }
                        });
                }
            }

            $scope.Grid = grid;
            $scope.Grid.reflash();

            //操作 编辑
            $scope.edit = function (id) {
                $state.go('app.mall.address.editAddress', { AddId: id });
            }



        }]);
//编辑收货地址
app.controller('EditAddressCtrl',
    [
        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {
            var AddId = $stateParams.AddId;
            console.log(AddId);
            $scope.address = {};
            $scope.address.aId = AddId;
            //确认
            $scope.confirm = function () {
                $wqtHttp.post(
                    {
                        url: ServiceApi.shopping.EditDeliveryAddress,
                        data: $scope.address,
                        success: function (data) {
                            if (data.status.code != 0) {
                                console.log(data);
                                toaster.pop("error", data.status.desc);
                            } else {
                                console.log(data);
                                $state.go('app.mall.address.index');
                            }
                        },
                        error: function () {
                            //$scope.logining = false;
                        }
                    });
            }
            //返回
            $scope.back = function () {
                $state.go('app.mall.address.index');
            }
        }]);

////订单详情
//app.controller('OrderDetail',
//    [
//        '$scope', '$timeout', '$http', '$state', '$stateParams', '$wqtHttp', 'UserInfo', 'ServiceApi', 'toaster',
//        function ($scope, $timeout, $http, $state, $stateParams, $wqtHttp, UserInfo, ServiceApi, toaster) {

//            alert(1);

//        }]).config(function ($routeProvider) {
//            $routeProvider.when("/Shop.OrderDetail",
//                {
//                    templateUrl: "tpl/app_dashboard_v1.html",
//                    controller:"OrderDetail"
//                });
//        });