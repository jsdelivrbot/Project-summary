app.controller('AbnTestController', function($scope, $timeout) {
    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.my_tree_handler = function(branch) {
      var _ref;
      $scope.output = "You selected: " + branch.label;
      if ((_ref = branch.data) != null ? _ref.description : void 0) {
        return $scope.output += '(' + branch.data.description + ')';
      }
    };
    apple_selected = function(branch) {
      return $scope.output = "APPLE! : " + branch.label;
    };
    treedata_avm = [
      {
        label: '【Zaopanshou】-【正式会员】-【5】',
        data: {
          definition: "ID:11; 邮箱号: 30624324@163.com; 手机号码: 18549526659; 等级: 3",
        },
        onSelect: function(branch) {
          return $scope.output = branch.data.definition;
        },
        children: [
          {
            label: '【EE】-【正式会员】',
            data: {
              definition: "ID:33; 邮箱号: 30624324@163.com; 手机号码: 18549526659; 等级: 3",
            },
            onSelect: function(branch) {
              return $scope.output = branch.data.definition;
            }
          }, {
            label: '【FF】-【正式会员】',
            data: {
              definition: "ID:44; 邮箱号: 30624324@163.com; 手机号码: 18549526659; 等级: 3",
            },
            onSelect: function(branch) {
              return $scope.output = branch.data.definition;
            },
            children: [
              {
                label: '【xx】-【正式会员】',
                data: {
                  definition: "ID:55; 邮箱号: 30624324@163.com; 手机号码: 18549526659; 等级: 3",
                },
                onSelect: function(branch) {
                  return $scope.output = branch.data.definition;
                }
              }, {
                label: '【GG】-【正式会员】',
                data: {
                  definition: "ID:66; 邮箱号: 30624324@163.com; 手机号码: 18549526659; 等级: 3",
                },
                onSelect: function(branch) {
                  return $scope.output = branch.data.definition;
                }
              }, {
                label: '【HH】-【正式会员】',
                data: {
                  definition: "ID:77; 邮箱号: 30624324@163.com; 手机号码: 18549526659; 等级: 3",
                },
                onSelect: function(branch) {
                  return $scope.output = branch.data.definition;
                }
              }
            ]
          }
        ]
      }
    ];
    treedata_geography = [
      {
        label: 'North America',
        children: [
          {
            label: 'Canada',
            children: ['Toronto', 'Vancouver']
          }, {
            label: 'USA',
            children: ['New York', 'Los Angeles']
          }, {
            label: 'Mexico',
            children: ['Mexico City', 'Guadalajara']
          }
        ]
      }, {
        label: 'South America',
        children: [
          {
            label: 'Venezuela',
            children: ['Caracas', 'Maracaibo']
          }, {
            label: 'Brazil',
            children: ['Sao Paulo', 'Rio de Janeiro']
          }, {
            label: 'Argentina',
            children: ['Buenos Aires', 'Cordoba']
          }
        ]
      }
    ];
    $scope.my_data = treedata_avm;
    $scope.my_tree = tree = {};
    // $scope.try_async_load = function() {
    //   $scope.my_data = [];
    //   $scope.doing_async = true;
    //   return $timeout(function() {
    //     if (Math.random() < 0.5) {
    //       $scope.my_data = treedata_avm;
    //     } else {
    //       $scope.my_data = treedata_geography;
    //     }
    //     $scope.doing_async = false;
    //     console.log(tree);
    //     return tree.expand_all();
    //   }, 1000);
    // };
    return $scope.try_adding_a_branch = function() {
      var b;
      b = tree.get_selected_branch();
      return tree.add_branch(b, {
        label: 'New Branch',
        data: {
          something: 42,
          "else": 43
        }
      });
    };
});