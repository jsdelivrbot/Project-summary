angular.module('app')
    .run(function ($templateCache) {
        $templateCache.put("template/date/selectdatestart.html",
            "<div class=\"input-group\">\n" +
            "<input type=\"text\" disabled class=\"form-control calendarInput\" my-language=\"true\"  datepicker-popup=\"{{format}}\" ng-model=\"queryObj.queryData.startTime\" is-open=opened datepicker-options=\"dateOptions\" ng-required=\"true\" close-text={{close}} clear-text={{clear}} current-Text={{current}}>\n" +
            "<span class=\"input-group-btn\">\n" +
            "<button type=\"button\" class=\"btn btn-default btn-calendar\" ng-click=\"openStart($event)\">\n" +
            "<i class=\"glyphicon glyphicon-calendar\"></i>\n" +
            "</button>\n" +
            "</span>\n" +
            "</div> " +
            " "
        );
    })
    .run(function ($templateCache) {
        $templateCache.put("template/date/selectdateend.html",
            "<div class=\"input-group\">\n" +
            "<input type=\"text\" disabled class=\"form-control calendarInput\" my-language=\"true\"  datepicker-popup=\"{{format}}\" ng-model=\"queryObj.queryData.endTime\" is-open=opened datepicker-options=\"dateOptions\" ng-required=\"true\" close-text={{close}} clear-text={{clear}} current-Text={{current}}>\n" +
            "<span class=\"input-group-btn\">\n" +
            "<button type=\"button\" class=\"btn btn-default btn-calendar \" ng-click=\"openStart($event)\">\n" +
            "<i class=\"glyphicon glyphicon-calendar\"></i>\n" +
            "</button>\n" +
            "</span>\n" +
            "</div> " +
            " "
        );
    })
    .run(function ($templateCache) {
        $templateCache.put("template/date/selectdate.html",
            "<div>" +
            "<div class=\"form-group col-sm-3 col-md-4\">" +
            "<label class=\"control-label col-sm-4 col-md-4 datestyle\"><font><font translate=\"QUERY.startTime\">开始时间：</font></font></label>" +
            " <div class=\"col-sm-8\">" +
            "<div class=\"input-group\">\n" +
            "<input type=\"text\" disabled class=\"form-control calendarInput\" my-language=\"true\"  datepicker-popup=\"{{format}}\" ng-model=\"queryObj.queryData.startTime\" is-open=\"startPopupOpened\" datepicker-options=\"startDateOptions\" ng-required=\"true\" close-text=\"关闭\" current-text=\"今天\">\n" +
            "<span class=\"input-group-btn\">\n" +
            "<button type=\"button\" class=\"btn btn-default btn-calendar \" ng-click=\"startOpen()\">\n" +
            "<i class=\"glyphicon glyphicon-calendar\"></i>\n" +
            "</button>\n" +
            "</span>\n" +
            "</div> " +
            "</div>" +
            "</div>" +
            "<div class=\"form-group col-sm-3 col-md-4\">" +
            "<label class=\"control-label col-sm-4 col-md-4 datestyle\"><font><font translate=\"QUERY.endTime\">结束时间：</font></font></label>" +
            " <div class=\"col-sm-8\">" +
            "<div class=\"input-group\">\n" +
            "<input type=\"text\" disabled class=\"form-control calendarInput\" my-language=\"true\"  datepicker-popup=\"{{format}}\" ng-model=\"queryObj.queryData.endTime\" is-open=\"endPopupOpened\" datepicker-options=\"endDateOptions\" ng-required=\"true\" close-text=\"关闭\" current-text=\"今天\">\n" +
            "<span class=\"input-group-btn\">\n" +
            "<button type=\"button\" class=\"btn btn-default btn-calendar \" ng-click=\"endOpen()\">\n" +
            "<i class=\"glyphicon glyphicon-calendar\"></i>\n" +
            "</button>\n" +
            "</span>\n" +
            "</div> " +
            "</div>" +
            "</div>" +
            "</div>" +
            " "
        );
    })
    .run(function ($templateCache) {
        $templateCache.put("template/date/search.html",
            "<div class=\"form-group col-sm-2 text-center\">\n" +
            "<button type=\"button\" ng-click=\"query()\"  class=\"btn btn-primary btn-query\" ng-class=\"{'active': btnSuccess, 'disabled': btnSuccess }\">\n" +
            "<span class=\"text\">\n" +
            "<i class=\"fa fa-search\"></i>&nbsp;{{'BUTTON.query'|translate}}" +
            "</span>"+
            "<span class=\"text-active\">" +
            "<i class=\"fa fa-search\"></i>&nbsp;{{'BUTTON.querying'|translate}}" +
            "<i ng-class=\"{'fa': true, 'fa-spin': true, 'fa-spinner': true, 'hide': true, 'show': btnSuccess, 'inline': btnSuccess }\" id=\"spin\"></i>"+
            "</span>"+
            "</button>"+
            "</div> " +
            " "
        );
    })
    .run(function ($templateCache) {
		$templateCache.put("template/date/tablelistdatashow.html",
            " <div ng-show=\"noData\">\n" +
            "<div class=\"alert tablenodata\" role=\"alert\">\n" +
            " <span class=\"sr-only\"></span><span translate=\"PAGINATION.nodata\">没有找到您想要的数据！</span>" +
            " </div>" +
            "</div>" +
            ""
        );
    })
	.run(function ($templateCache) {
		$templateCache.put("template/date/nation.html",
            "<div class=\"row\">" +
            "<div id=\"global_location\" data-url=\"../../api/Data.min.json\">" +
            "<div class=\"col-md-4\">"+
            "<select  class=\"form-control country select\" data-first-title=\"选择国家\" ng-model=\"selectedCountry\"></select>" +
            "</div>" +
            "<div class=\"col-md-4\">" +
            "<select  class=\"form-control state select\" data-required=\"true\" ng-model=\"selectedState\"></select>" +
            "</div>" +
            "<div class=\"col-md-4\">" +
            "<select  class=\"form-control city select\" data-required=\"true\" ng-model=\"selectedCity\"></select>" +
            "</div>" +
            "<div class=\"col-md-4\">" +
            "<select  class=\"form-control region select\" data-required=\"true\" ng-model=\"selectedRegion\"></select>" +
            "</div>" +
            "</div>" +
            "</div>" +
            ""
		);
    })
    .run(function ($templateCache) {
        $templateCache.put("template/date/tablelistfooter.html",
            '<footer class="panel-footer">' +
            '<div class="row">' +
            '<div class="col-lg-12 text-center" ng-hide="noData">' +
            '<pagination total-items="totalItems" max-size="maxSize" previous-text="<" next-text=">" ng-model="currentPage" ng-change="pageChanged()" class="m-t-none m-b"></pagination>' +
            '</div>' +
            '</div>' +
            '</footer>'
        );
    })
    //日历选择指令
    .directive('selectdatestart', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'AECM',
            template: $templateCache.get("template/date/selectdatestart.html"),
            replace: true,
            scope: true,
            controller: function ($scope) {

                var calendar = {
                    disabled: function (date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    },
                    toggleMin: function (date, mode) {

                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    },
                    openStart: function ($event) {

                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.opened = true;
                        console.log($scope);
                        //$($event.currentTarget).parent().siblings('input').attr('is-open', true);
                        //$scope.opened2 = false;


                    },
                    openEnd: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.opened = false;
                        //$scope.opened2 = true;
                    },
                    dateOptions: {
                        formatDay: 'dd',
                        formatMonth: 'MM',
                        formatYear: 'yyyy',
                        startingDay: 1,


                    },
                    formats: ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],

                }
                $scope.disabled = calendar.disabled;
                $scope.toggleMin = calendar.toggleMin;
                $scope.openStart = calendar.openStart;
                $scope.openEnd = calendar.openEnd;
                $scope.dateOptions = calendar.dateOptions;
                $scope.toggleMin();
                $scope.format = calendar.formats[0];
                //  alert($scope.format);
            },
            link: function (scope, el, attr) {


            }
        };
    }])
    .directive('selectdateend', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'AECM',
            template: $templateCache.get("template/date/selectdateend.html"),
            replace: true,
            scope: true,
            controller: function ($scope) {

                var calendar = {
                    disabled: function (date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    },
                    toggleMin: function (date, mode) {
                        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
                    },
                    openStart: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.opened = true;
                        //$($event.currentTarget).parent().siblings('input').attr('is-open', true);
                        //$scope.opened2 = false;


                    },
                    openEnd: function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.opened = false;
                        //$scope.opened2 = true;
                    },
                    dateOptions: {
                        formatDay: 'dd',
                        formatMonth: 'MM',
                        formatYear: 'yyyy',
                        startingDay: 1,

                    },
                    formats: ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'],

                }
                $scope.disabled = calendar.disabled;
                $scope.toggleMin = calendar.toggleMin;
                $scope.openStart = calendar.openStart;
                $scope.openEnd = calendar.openEnd;
                $scope.dateOptions = calendar.dateOptions;
                $scope.toggleMin();
                $scope.format = calendar.formats[0];
            },
            link: function (scope, el, attr) {


            }
        };
    }])
    .directive('selectdate', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'AECM',
            template: $templateCache.get("template/date/selectdate.html"),
            replace: true,
            scope: true,
            controller: function ($scope, $timeout) {
                var date = new Date();
                $scope.startDateOptions = {
                    formatYear: 'yy',
                    minDate: $scope.queryObj.queryData.endTime,
                    startingDay: 1
                };

                $scope.endDateOptions = {
                    formatYear: 'yy',
                    minDate: $scope.queryObj.queryData.startTime,
                    maxDate: '',
                    startingDay: 1
                };

                $scope.$watch('queryObj.queryData.startTime', function (newValue, oldValue) {
                    //$scope.minEndDate = newValue;
                    console.log('startTime', newValue);
                    $scope.endDateOptions.minDate = newValue;

                });
                $scope.$watch('queryObj.queryData.endTime', function (newValue, oldValue) {
                    //$scope.maxStartDate = newValue;
                    console.log('endTime', newValue);
                    $scope.startDateOptions.maxDate = newValue;

                });
                $scope.startOpen = function () {
                    $timeout(function () {
                        $scope.startPopupOpened = true;

                    });

                };
                $scope.endOpen = function () {
                    $timeout(function () {
                        $scope.endPopupOpened = true;

                    })

                };
                $scope.startPopupOpened = false;
                $scope.endPopupOpened = false;

            },
            link: function (scope, el, attr) {


            }
        };
    }])

    //中英文切换变量值改变指令
    .directive('myLanguage', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                attr.myLanguage = angular.equals(attr.myLanguage, 'true');
                var language = localStorage.NG_TRANSLATE_LANG_KEY;
                //console.log(el[0].attributes);
                if (language == 'en') {
                    scope.last = "<< 上一页"
                    scope.next = "下一页 >>"
                    scope.close = "关闭"
                    scope.clear = "清除"
                    scope.current = "今天"
                    scope.placeholder = "会员编号/会员名称"
                    scope.mymessage = "我的留言"
                    scope.unreadmessage = "未读留言"
                    scope.Dynamic = "动态收益明细"
                    scope.static = "静态收益明细"
                } else {
                    scope.last = "<< Previous"
                    scope.next = "next >>"
                    scope.close = "close"
                    scope.clear = "clear"
                    scope.current = "today"
                    scope.placeholder = "Member number/member name"
                    scope.mymessage = "My message"
                    scope.unreadmessage = "Unread messages"
                    scope.Dynamic = "Dynamic revenue breakdown"
                    scope.static = "Static revenue detail"
                }

                //alert(typeof attr.myLanguage);
            }
        };
    }])
    //ng-repeat监听渲染完成指令
    .directive('onFinish', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                //console.log(scope);
                if (scope.$last === true) {
                    $timeout(function () {
                        //这里element, 就是ng-repeat渲染的最后一个元素
                        scope.$emit('ngRepeatFinished', element);
                    });
                }
            }
        };
    })
    //回车查询ng指令
    .directive('ngEnter', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function ($scope, element, attrs, controller) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        $scope.$apply(function () {
                            $scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }
                });
            }
        }
    })
    //图片放大
    .directive('enlargePic', function () {
        //<span style="font-family: Arial, Helvetica, sans-serif;">enlargePic指令名称，写在需要用到的地方img中即可实现放大图片</span>
        return {
            restrict: "AE",
            link: function (scope, elem) {
                elem.bind('click', function ($event) {
                    var img = $event.srcElement || $event.target;
                    angular.element(document.querySelector(".mask"))[0].style.display = "block";
					angular.element(document.querySelector(".bigPic"))[0].src = img.src;
					angular.element(document.querySelector(".bigPic"))[0].style.width = '100%';
					angular.element(document.querySelector(".bigPic"))[0].style.height = '100%';
					angular.element(document.querySelector(".bigPic"))[0].style.maxHeight = '600px';
					angular.element(document.querySelector(".bigPic"))[0].style.marginLeft = '-50%';
					angular.element(document.querySelector(".bigPic"))[0].style.marginTop = '-50%';
					angular.element(document.querySelector(".bigPic"))[0].style.border = '5px solid #fff';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.width = 'auto';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.height = 'auto';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.zIndex = "999999";
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.top = '50%';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.left = '50%';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.marginLeft = '0';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.marginTop = '0';
					angular.element(document.querySelector(".big-pic-wrap"))[0].style.backgroundColor = 'transparent';

					angular.element(document.querySelector(".close-pic"))[0].style.display = 'none';
                })
            }
        }
    })
    .directive('closePic', function () {
        return {
            restrict: "AE",
            link: function (scope, elem) {
                elem.bind('click', function ($event) {
                    angular.element(document.querySelector(".mask"))[0].style.display = "none";
                })
            }
        }
    })
    //查询
    .directive('search', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'AECM',
            template: $templateCache.get("template/date/search.html"),
            replace: true,
            scope: false,
            controller: function ($scope) {
                $scope.btnSuccess = false;
                $scope.query = function () {
                    $scope.btnSuccess = true;
                    $scope.prizeTypequrey = "Field_" + $scope.SelectVal;
                    console.log($scope.queryObj.queryData);
                    var StarTime = null;
                    var endTime = null;
                    if ($scope.queryObj.queryData && $scope.queryObj.queryData != null) {
                        //查询字段
                        if ($scope.queryObj.queryData.startTime) {
                            var StarTime = new Date($scope.queryObj.queryData.startTime);
                            $scope.queryObj.queryData.startTime = StarTime.getFullYear() + '-' + (StarTime.getMonth() + 1) + '-' + StarTime.getDate();

                        }
                        if ($scope.queryObj.queryData.endTime) {
                            var EndTime = new Date($scope.queryObj.queryData.endTime);
                            $scope.queryObj.queryData.endTime = EndTime.getFullYear() + '-' + (EndTime.getMonth() + 1) + '-' + EndTime.getDate();
                        }
                        if ($scope.prizeTypequrey) {
                            console.log($scope.prizeTypequrey)
                            $scope.queryObj.queryData.field = $scope.prizeTypequrey;
                        };
                        if ($scope.FinaicaSetType) {
                            queryObj.queryData.financialId = $scope.FinaicaSetType;
                        };
                        if ($scope.CurrencyType) {
                            queryObj.queryData.currencyId = $scope.CurrencyType;
                        };
                        if ($scope.Description) {
                            queryObj.queryData.description = $scope.Description;
                        };
                        if ($scope.Grid) {
                            $scope.Grid.reflash();
                        } else {
                            $scope.GetGrid();
                        }
                    } else {
                        $scope.btnSuccess = false;
                        toaster.pop("error", "请选择查询条件");
                    }
                }
            },
            link: function (scope, el, attr) {


            }
        };
	}])
	.directive('tablelistfooter', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
		return {
			restrict: 'AECM',
			template: $templateCache.get("template/date/tablelistfooter.html"),
			replace: true,
			scope: false,
			controller: function ($scope) {
				$scope.maxSize = 5; 
				$scope.pageChanged = function () {
					$scope.queryObj.page = $scope.currentPage;
					$scope.GetGrid();
				};
			},
			link: function (scope, el, attr) {

			}
		};
	}])
    //表格有无数据提示
	.directive('tablelistdatashow', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'AECM',
			template: $templateCache.get("template/date/tablelistdatashow.html"),
            replace: true,
            scope: false,
			controller: function ($scope) {
				$scope.tablelistdatashow = function () {
					if ($scope.totalItems == 0) {
						$scope.noData = true;
					} else {
						$scope.noData = false;
					}
				}
            },
            link: function (scope, el, attr) {


            }
        };
    }])
    //多地区选择
    .directive('nationalselect', ['uiLoad', '$document', '$templateCache', '$window', '$wqtHttp', 'UserInfo', 'ServiceApi', function (uiLoad, $document, $templateCache, $window, $wqtHttp, UserInfo, ServiceApi) {
        return {
            restrict: 'AECM',
            template: $templateCache.get("template/date/nation.html"),
            replace: true,
            controller: function ($scope, $timeout) {
                

            },
            link: function (scope, el, attr) {
                uiLoad.load(['vendor/jquery/national/jquery.cxselect.min.js'])
                    .then(function () {
                        console.log(attr);
                        $('#global_location').cxSelect({
                            selects: ['country', 'state', 'city', 'region'],
                            nodata: 'none'
                        });
                    });
            }
        };
    }])
