/**
 * Created by Administrator on 2017/1/16.
 */
window.onload=function () {
    var btn=document.querySelector('.box_btn  .more_btn');
    var skew=document.querySelector('.skew_box');
    var right=document.querySelector('.right_side');
    var left_s=1;
    btn.onclick=function () {
        //显示更多信息的框显示
        if (left_s==1){
             show_more(0,0,0);
        }else {
             show_more(-25,-50,1);
        }
    }
    var close=document.querySelector('.img_box img');
    close.onclick=function(){
       show_more(-25,-50,1);
    }
	function show_more(jiao,wid,is_l){
		 skew.style.transform="skew("+jiao+"deg, 0deg)";
        right.style.right=wid+'vw';
        left_s=is_l;
	}
	
    var noti_btn=document.querySelector('.box_btn .noti_btn');
    var get_noti=document.querySelector('.get_noti');
	var noti_shadow= document.querySelector('.noti_shadow');
    noti_btn.onclick=function () {
        //发送邮件框显示
        if( get_noti.style.display=='block'){
           closeNoti("none");;
        }else {
            closeNoti("block");
        }
        var close_noti=get_noti.firstElementChild;
        close_noti.onclick=function () {
           closeNoti("none");
        }
		noti_shadow.onclick=function(){
			closeNoti("none");
		}
    }
	function closeNoti(state) {
		get_noti.style.display=state;
        noti_shadow.style.display= state ;
	}


    //倒计时
    function showTime() {
        var time=document.getElementById('time');
        var new_time=new Date(2018,09,21,00,00,00);
        var cur_time=new Date();
        var  rest_time=new_time.getTime()-cur_time.getTime();
        //计算出相差天数
        var days=Math.floor(rest_time/(24*3600*1000));

        //计算出小时数
        var leave1=rest_time%(24*3600*1000);  //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));

        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));

        //计算相差秒数
        var leave3=leave2%(60*1000);     //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);
        time.innerHTML=days+' Days '+hours+' h '+minutes+' m '+seconds+'s';
    }
   setInterval(showTime,1000);

    //星星动画
    var mycanvas=document.getElementById('mycanvas');
    mycanvas.width=window.innerWidth;
    mycanvas.height=window.innerHeight;
    var canvasContext=mycanvas.getContext('2d');
    var timer;
    var x=[],y=[],num=10;
    for (var i=0;i<60;i++){
        x.push(Math.ceil(Math.random()*900));
        y.push(Math.ceil(Math.random()*700));
    }
    console.log(x[0]);
    var star={}//star对象
    star.outerRad=5;
    star.size=80;//星星移动的距离   根据这个数来确定
    star.innerRad=12;
    star.points=5
    star.scale=0  //scale第一个是对宽度缩放，第二个是高度
    function drawStar() {
        canvasContext.clearRect(0,0,mycanvas.width,mycanvas.height);//清除画布
        var smallCan =document.createElement('canvas');
        smallCan.width=window.innerWidth;
        smallCan.height=window.innerHeight;
        var  smallCanvas= smallCan.getContext('2d');


        smallCanvas.translate(star.size/8,star.size/8)
        smallCanvas.translate(-star.size/8,-star.size/8)
        smallCanvas.scale(star.scale,star.scale)

       for (var i=0;i<star.points * 2;i++){
           var  rotation = i * Math.PI / star.points;
           var  rad = i % 2 === 0 ? star.outerRad : star.innerRad;
           smallCanvas.lineTo((star.size / 2) + rad * Math.cos(rotation), (star.size / 2) + rad * Math.sin(rotation));
       }
       smallCanvas.fillStyle="#00c8aa";
      smallCanvas.strokeStyle="#00c8aa"; //边框颜色

        smallCanvas.fill()
        smallCanvas.stroke();
        // 结束绘制
        smallCanvas.restore();
        for (var j=0;j<num;j++){
            canvasContext.drawImage(smallCan,x[j],y[j]);//x y 星星出现的位置，即星星移动到的位置
        }

    }
    function showAnimate () {
        if (star.scale<1) {
            star.scale+=0.1;
        }else if (star.size>300){
           num=Math.ceil(Math.random()*40);
            for (var i=0;i<60;i++){
                x.push(Math.ceil(Math.random()*900));
                y.push(Math.ceil(Math.random()*700));
            }
          console.log(num);
            star.scale=0;
            star.size=40;
        }
       else{
            star.size+=1;
        }
        drawStar();
    }
    showAnimate();
   timer= setInterval(showAnimate,100);

}