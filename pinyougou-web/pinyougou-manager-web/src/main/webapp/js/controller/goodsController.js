/**运行商商家审核*/
app.controller("goodsController",function ($scope,$controller,baseService) {
    $controller("baseController",{$scope:$scope});

    //定义商品状态数组
    $scope.status=['未审核','已审核','审核未通过','关闭'];
    //定义搜索对象
    $scope.searchEntity={};
    //分页查询品牌信息
    $scope.search=function (page,rows) {
        baseService.findByPage("/goods/findByPage",page,rows,$scope.searchEntity).then(function (response) {
            $scope.dataList=response.data.rows;
            $scope.paginationConf.totalItems=response.data.total;
        });
    };

    /**审核商品,修改状态*/
    $scope.updateStatus=function (status) {
        if($scope.ids.length>0){
            //调用服务层
            baseService.sendGet("/goods/updateStatus?ids="+$scope.ids+"&status="+status)
                .then(function (response) {
                    if(response.data){
                        //重新加载数据
                        $scope.reload();
                        $scope.ids=[];
                    }else{
                        alert("修改失败!")
                    }
                });
        }
    };
    /**批量商品删除*/
    $scope.delete=function () {
        baseService.deleteById("/goods/delete",$scope.ids).then(function (response) {

            if ($scope.ids.length>0) {
                if (response.data) {
                    $scope.reload();
                    $scope.ids = [];
                } else {
                    alert("操作失败");
                }
            } else {
                alert("请选择你要删除的商品");
            }
        });
    }
});