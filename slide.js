document.getElementById("slide_box").style.height=document.querySelector('.slide_ul_box').clientHeight+'px';//给幻灯片外面的盒子赋值
window.onresize=function  () {
		document.getElementById("slide_box").style.height=document.querySelector('.slide_ul_box').clientHeight+'px';
	}
var start_clientx;//触摸开始的位置
var start_clienty;
var all_bai=document.getElementById('bai_box').children;
var all_slide=document.getElementById('slide_ul_box').children;
var next_distence;
var is_right;//判断像左/右拖动
document.getElementById('slide_box').ontouchstart=function(event){
	start_clientx=event.targetTouches[0]['clientX'];
	start_clienty=event.targetTouches[0]['clientY'];
	//console.log(this);
	this.addEventListener('touchmove',move_thing);
	this.addEventListener('touchend',end_thing);
	
	
}
function move_thing(event){
	//像左或右拖动判别
	if(event.targetTouches[0]['clientX']>start_clientx){
		is_right=true;
		}else{
			is_right=false;
		}
	
		
}

function end_thing(click_dis){
	//console.log(event);	
	//console.log(document.querySelector('.bai_box .back_color'));
	for(var i=0;i<all_bai.length;i++){//找出白点的索引，即幻灯片的索引
		if(all_bai[i].className=='back_color'){
			var cur_distence=i;
			if(click_dis>=0){
				next_distence=click_dis;
			}
			else if(is_right==true){
				next_distence=i+1;
			}else{
				next_distence=i-1;
			}
			all_bai[i].className='';//将当前的白点背景去掉
			//console.log(all_bai[i].className);
			//console.log(all_bai[i].previousElementSibling['className']);
			all_slide[i].style.display='none';//将当前幻灯片隐藏
			//console.log(all_slide[i].style.display);
		}	
	}
	if(next_distence==all_bai.length){
				next_distence=0;
			}
	if(next_distence<0){
		next_distence=all_bai.length-1;
	}
	all_bai[next_distence].className='back_color';//加点加上背景颜色
	all_slide[next_distence].style.display='block';//将下一张图片显示
	
	
}

	for(var j=0;j<all_bai.length;j++){//单击事件是在触摸拖动事件以外的
		all_bai[j].index=j;//标记点的位置，便于下一次查找，属性中并没有对应的索引
		all_bai[j].onclick=function(){//单击白点显示相应的图片
				end_thing(this.index);//调用函数
				 console.log(this.index);
			}
	}


	