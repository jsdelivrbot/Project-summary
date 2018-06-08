console.log = function () { };
//推荐网络图
app.controller('TJNetorkController',
    [
        '$scope', '$totalModel',
        function ($scope, $totalModel) {
			

        }]);

//安置网络图
app.controller('AzNetController',
    [
        '$scope', '$totalModel', 
        function ($scope, $totalModel) {

    }]);


function SyncLoadTreeForNetwork($totalModel,$scope, url, usercode, objNode, getNodeItemFun) {
    $totalModel.$wqtHttp.post({
        url: url,
        data: {
            userCode: usercode//userInfo.usercode 
        },
		success: function (data) {
            if (data.status.code != 0) {
                //console.log(data);
                $totalModel.toaster.pop("error", data.status.desc);
            } else {
                console.log(data);
                if (data.result.length == 0) {
                    console.log(1);
                    $totalModel.toaster.pop("warning", $totalModel.T.T('PAGE.wlgl.tjszt.noData'));
                }
                var children = [];
                function GetNext(item) {
                    if (item.childrenCount > 0) {
                        return [1];
                    } else {
                        return [];
                    }
                }
                for (var i = 0; i < data.result.length; i++) {
                    var item = data.result[i];
                    var node = getNodeItemFun(item);
                    node.children = GetNext(item);
                    node.haschild = item.childrenCount > 0;
                    
                    node.code = item.userCode;
                    node.onSelect = function (branch) {
                        console.log(branch)
                        if (branch.haschild) {
                            branch.children = [];
                            SyncLoadTreeForNetwork($totalModel, $scope, url, branch.code, branch.children, getNodeItemFun);
                        }
                        $scope.output = branch.data;
                    }
                    objNode.push(node);
                    console.log('objNode', objNode);
                }
            }
        }
    });
}

//安置树状图
app.controller('AZSZTController',
    [
        '$scope', '$totalModel',
        function ($scope, $totalModel) {
            // 树数据
            var userInfo = $totalModel.UserInfo.get();
            var treeArr = [];
            SyncLoadTreeForNetwork(
                $totalModel,
                $scope,
                $totalModel.ServiceApi.MarketManage.GetMemberAzsztSync,
                userInfo.usercode,
                treeArr,
                function (item) {

                    return {
                        label: item.nickName + ' [' + item.userCode + ']',
                        data: {
                            definition1: $totalModel.T.T('PAGE.wlgl.azszt.usercode') + item.jDUserCode + '',
                            definition2: $totalModel.T.T('PAGE.wlgl.azszt.position') + item.jDPosition + '',
                            definition3: $totalModel.T.T('PAGE.wlgl.azszt.date') + item.jiHuoDate + ''
                        }
                    };
                });
            $scope.my_data = treeArr; //treedata_avm;
        }]);
//推荐树状图
app.controller('TjController',
    [
        '$scope', '$totalModel',
        function ($scope, $totalModel) {
            // 树数据
            var userInfo = $totalModel.UserInfo.get();
            var treeArr = [];
            SyncLoadTreeForNetwork(
                $totalModel,
                $scope,
                $totalModel.ServiceApi.MarketManage.GetMemberTjsztSync,
                userInfo.usercode,
                treeArr,
                function (item) {
                    return {
                        label: item.nickName + ' [' + item.userCode + ']',
                        data: {
                            definition1: $totalModel.T.T('PAGE.wlgl.tjszt.usercode') + item.tJUserCode + '',
                            
                            definition3: $totalModel.T.T('PAGE.wlgl.tjszt.date') + item.jiHuoDate + ''
                        }
                    };
                });
            $scope.my_data = treeArr; //treedata_avm;

        }]);