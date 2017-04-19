var img = document.getElementById('img');
var text = document.getElementById('text');
var li = document.querySelectorAll('.quan li');
var pre = document.getElementById('pre');
var next = document.getElementById('next');
var enlarge = document.querySelectorAll('.enlrge');
var num = 0,
	timer = 0;
var arr_img = ['images/lun_1.jpg', 'images/lun_2.jpg', 'images/lun_3.jpg'];
var arr_text = ['全家养生', '养身健康', '瑜伽'];

function fn() {
	img.src = arr_img[num];
	text.innerHTML = arr_text[num];
	li[num].id = 'dian';
}
/*轮播图实现*/
function time() {
	timer = setInterval(function() {
		for(var i = 0; i < li.length; i++) {
			li[i].index = i; //标记第几个
			li[i].id = ''; //将ID name清空
			li[i].onclick = function() {
				for(var i = 0; i < li.length; i++) {
					li[i].id = ''; //将ID name清空
				}
				num = this.index;
				fn();
			}
		}
		var preNum = num - 1;
		if(preNum < 0) {
			preNum = 2;
		}
		//点击出现上一张图片
		pre.onclick = function() {
			for(var i = 0; i < li.length; i++) {
				li[i].id = ''; //将ID name清空
			}
			img.src = arr_img[preNum];
			text.innerHTML = arr_text[preNum];
			li[preNum].id = 'dian';
		}
		fn();
		num++;
		if(num > li.length - 1) num = 0;
		//点击出现下一张图片
		next.onclick = function() {
			for(var i = 0; i < li.length; i++) {
				li[i].id = ''; //将ID name清空
			}
			fn();
		}

	}, 2000);
}
time();
img.onmouseover = function() {
	clearInterval(timer);
}
img.onmouseout = function() {
	time();
}

/*鼠标放上去图变大 （多张图片）*/
for(var i = 0; i < enlarge.length; i++) {
	var timestart = 0;
	enlarge[i].timestart = null;
	console.log(enlarge[i]);
	enlarge[i].onmouseover = function() {
		move(this,+1,160);

	}
	enlarge[i].onmouseout = function() {
		move(this,-1,150);
	}
}

function move(obj,opt,zhi) {
	clearInterval(obj.timestart);
	obj.timestart = setInterval(function() {
		if(obj.offsetWidth == zhi) {
			clearInterval(obj.timestart);
		}else{
			obj.style.width = obj.offsetWidth + opt + 'px';
			obj.style.height = obj.offsetHeight + opt + 'px';
			console.log(obj.offsetHeight);
		}
	}, 25);
}

/*分享*/
var move_time = null;
var ways = document.getElementById('ways');
ways.onmouseover = function() {
	startmove(this, -5, 35);
}
ways.onmouseout = function() {
	startmove(this, +5, 265);
}

function startmove(obj, spped, iTirmer) {
	clearInterval(move_time);
	move_time = setInterval(function() {
		if(obj.offsetLeft==iTirmer) {
			clearInterval(move_time);
		} else {
			obj.style.left =obj.offsetLeft + spped + "px";
		}

	}, 10)
}