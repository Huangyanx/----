

angular.module("my_dj",["ngRoute","ui.bootstrap"])

	.controller("mainController",function  ($scope) {
		$scope.pageClass = 'page-home'; 
		
	}) 
	.factory("productService",function ($http) { 
		var cartList=[];
		var goodsList=[];
		return{
			getGoods:function(id,callback){  
				if(id!=null&&goodsList[0]){ 
 					callback(goodsList[id]);
 					return;
				}
				$http.get("data/goods.json").then(function (rtnData) { 
					 goodsList=rtnData.data;
					 callback(rtnData.data);
				}); 
			},
			setCart:function (item) { 
				cartList.push(angular.extend({quantity: 1}, item)); //angular 为对象添加一个属性 
			},
			getCart:function () { 
				return cartList;

			}
		}  
	})
	.controller("goods_detailedController",function ($scope,$http,productService,$routeParams) {  
		productService.getGoods($routeParams.id,function (current_goods) {
			 $scope.current_goods=current_goods;
		});  
	})
	.controller("loginController",function  ($scope,$window) {
		change=null;change.own=true
		$scope.changeColor=function (event) {
			console.log($(event.target));
		}

		$scope.pageClass = 'page-login';
 		$scope.doReg=function  () {
 			$window.sessionStorage['uinfo']=JSON.stringify($scope.uinfo);
 			// 使用的时候，需把json字符串转换为对象
 			var uinfo_object= JSON.parse($window.sessionStorage.uinfo);
 		}

	})
	.controller("loginController",function  ($scope,$window) {
		 $scope.changeColor=function () { 
		 	console.log("123456");
		 	$scope.isChange=true;
		 }
	})
	.controller("goodsController",function  ($scope,$http,$rootScope,$window,productService) { 
			 productService.getGoods(null,function (data) {
			 	 $scope.goodsList=data;
			 })  
		    $scope.open = function (size) {
			    //这里很关键,是打开模态框的过程
			    var modalInstance = $uibModal.open({
			      templateUrl: 'template/cart.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
			      controller: 'cartControl',//这是模态框的控制器,是用来控制模态框的
			      size: size,//模态框的大小尺寸
			      resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
			        items: function () {//items是一个回调函数
			          return $scope.cart;//这个值会被模态框的控制器获取到
			        }
			      }
		    })
		} 
		$scope.addCart=function  (goodsItem) {
			// 首先点击的是哪一个商品
			var found = false; 
			productService.getCart().forEach(function (item) {
				if (item.id === goodsItem.id) {
					item.quantity++;
					found = true;  
				}
			}); 
			if (!found) { 
				productService.setCart(goodsItem); 
			}  
			$rootScope.cartCount=productService.getCart().length;
		} 
		$rootScope.checkout = function () {
			$modal.open({
				templateUrl: 'cart.html',
				controller: 'cartController' 
			});
		};
	})
	.controller('cartController', function($scope,$rootScope,productService){
		$scope.cartList= productService.getCart();
		$scope.getCartPrice = function () {
			var total = 0;
			$scope.cartList.forEach(function (product) {
				total += product.goodsPrice * product.quantity;
			});
			return total.toFixed(2);
		};
	}) 
	.controller('registerController', function($scope,$rootScope,productService){
		 
	}) 
	.config(function  ($routeProvider) {
		$routeProvider
		.when('/',{
			templateUrl:"template/index.html",
            controller: 'mainController'
		})
		.when('/login',{
			templateUrl:"template/login.html",
            controller: 'loginController'
		})
		.when('/register',{
			templateUrl:"template/register.html",
            controller: 'registerController' 
		})
		.when('/find',{
			templateUrl:"template/find.html",
            controller: 'goodsController'

		})
		.when('/goods_detailed/:id',{
			templateUrl:"template/goods_detailed.html",
            controller: 'goods_detailedController'

		})
		.when('/cart',{
			templateUrl:"template/cart.html",
            controller: 'cartController'

		}) 
		.otherwise('redirectTo:/') 
	})

