/**
 * Created by Administrator on 2017/3/14.
 */
;(function () {
    var music=document.getElementById('music');
    var $add_task=$('.add-task');
    var $ul=$('.task-list');
    var task_list=store.get('tip')||[];
    var  new_arr=store.get('arr')||[];
    init();//初始化

/*提交标题*/
    $add_task.on('submit',function (eve) {
            eve.preventDefault();
            var obj={};
            obj.cont=$add_task.find('input').val();
            if (!obj.cont) return;
            task_list.unshift(obj);
            new_arr.unshift(null);
            add_task()
            $add_task.find('input').val(null);
    })
    /*列出所有的li的标题*/
    function init() {
        task_list=store.get('tip')||[];
        new_arr=store.get('arr')||[];
        var k = 0;
       // console.log(k);
        $ul.html(null);
        for (var i in task_list){
           if (task_list[i].complete) continue;
            $ul.append(list_li(task_list[i],i));
			k++;
        }
        for (var j in new_arr){
            if ( new_arr[j]==null) continue;
            $ul.append(list_li(new_arr[j],j));
            $('.task-list .task-item').eq(k).addClass('completed');
            k++;
        }
        delete_li();   /*删除选中的li*/
        edit_detail();   /*显示编辑详情页面*/
        check();
        se_all();
        clock_time()
	
    }
    /*列出所有的li的标题的HTML（初始化时的HTML标签）*/
    function list_li(task_list,i) {
            var li=` <li class="task-item">
                <input type="checkbox"`+(task_list.complete ? 'checked':null)+` class="complete">
                <span class="task-content">${task_list.cont}</span>
            <div class="fr">
                <span class="action delete" data-index="${i}">删除</span>
                <span class="action detail">详细</span>
                </div>
                </li>`;
    return li;
}
    /*放入本地，并更新*//*object为要放数组进去的对象，arr为原json，complete_arr为完成json*/
    function add_task() {
        store.set('tip',task_list);
        store.set('arr',new_arr);
        init();
    }
    /*删除选中的li*/
    function delete_li() {

        $('.action.delete').on('click',function () {
            var index=$(this).data('index');
            var sure=confirm('确定删除吗？');
            if (sure){
                task_list.splice(index,1);
                new_arr.splice(index,1);
                add_task();
            }
        })
    }
    /*显示编辑详情页面*/
    function edit_detail() {
        var index;
        $('.action.detail').on('click',function () {
            index=$(this).siblings(0).data('index');
            $('.task-detail-mask').show();
            $('.task-detail').show();
            $('.task-detail .content').html(task_list[index].cont);//赋值
            $('.task-detail .edit_title').val(task_list[index].cont);//赋值

           var content=task_list[index].content||null;
                $('.input-item textarea').val(content);//赋值
            var time=task_list[index].time||null;

                $('.remind.input-item .datetime').val(time);//赋值
            $('.task-detail .content').on('dblclick',function () {
                /*双击显示标题*/
               $(this).hide();
                $('.task-detail .edit_title').show().focus().blur(function () {
                    $(this).hide();
                    $('.task-detail .content').show().text($(this).val());
                });
            });
			//点击更新，提交
           update(index);
           /* edit_title();*/
            $('.task-detail .close').on('click', close_detail);//关闭详情页面
			date_time();/*时间编写  引入*/
            

        })


    }
    /*隐藏详情页面*/
    function close_detail() {
         $('.task-detail-mask').hide();
         $('.task-detail').hide();
        index=null;
        $('.task-detail .content').text(null);/*清空*/
        $('.input-item textarea').val(null);
        $('.remind.input-item .datetime').val(null);
      /*  $('.task-list').on('click',function () {
            $('.task-detail-mask').hide();
            $('.task-detail').hide();
        })
*/
    }
    /*双击编辑标题*/
    function edit_title() {
        $('.task-detail .content').ondblclick(function () {
            $('.task-detail .content').hide();
            $('.task-detail .edit_title').show();
        });
    }
    function update(index) {
        $('.form.up ').on('submit',function (eve) {
            eve.preventDefault();
            var newObj={};
            newObj.cont= $('.task-detail .content').text();
            newObj.content=$('.input-item textarea').val();
            newObj.time=$('.remind.input-item .datetime').val();
            task_list[index]=newObj;
			new_arr[index]=null;
			close_detail();
            add_task();
            
        })
    }
    function se_all() {
        $('.delete_all_box .all').on('click',function () {
            $('.task-item .complete').prop('checked','checked');
            for (var i in new_arr){
                new_arr[i]=task_list[i];
                task_list[i].complete=true;
            }
            add_task();
            $('.delete_all_box .delete_all').on('click',function () {
                new_arr=[];  /*删除所有*/
                task_list=[];
                add_task();
            })
        });
        $('.delete_all_box .no_all').on('click',function () {
            $(' .task-item .complete').prop('checked',false);
            for (var i in new_arr){
                new_arr[i]=null;
                task_list[i].complete=false;
            }
            add_task();
        })


    }
    /*选中*/
    function check() {
        $('.task-item .complete').on('click',function () {
            var index=$(this).siblings(3).children(0).data('index');
            if(task_list[index].complete){
                var obj=task_list[index];
                obj.complete=false;
                new_arr[index]=null;
                $('.task-list .task-item').eq(index).removeClass('completed');
            }else {
                var obj=task_list[index];
                obj.complete=true;
                new_arr[index]=task_list[index];
                /* $('.task-list .task-item').eq(index).addClass('completed');*/
            }
           add_task();
        })
    }
    /*提醒*/
function date_time() {
    $.datetimepicker.setLocale('ch');
    $('.datetimepicker').datetimepicker({
        i18n:{
            de:{
                months:[
                    '1月','2月','3月','4月',
                    '5月','6月','7月','8月',
                    '9月','10月','11月','12月',
                ],
                dayOfWeek:[
                    "So.", "Mo", "Di", "Mi",
                    "Do", "Fr", "Sa.",
                ]
            }
        },
    });
}
/*提醒*/
function clock_time() {
    var timer=null;
    var cur_time=new Date().getTime();
   /* var is_close=[task_list.length];*/
    setInterval(function () {
        for (var i in task_list){
            if (!task_list[i].time||task_list[i].complete) continue;
            var end_time=(new Date(task_list[i].time)).getTime();
            console.log(end_time);
            if (end_time-cur_time<=1){
                console.log('时间到了');
                task_list[i].complete=true;
               /* task_list[i].clock=true*/
                new_arr[i]=task_list[i];
                add_task();
                /*msg显示*/
                show_msg(task_list[i].cont);
                /*播放音乐*/
                play_music();
                clearInterval(timer);
            }

        }
    },1000);
}
function show_msg(content) {
    $('.msg').show();
    $('.msg .msg-content').text(content);
    $('.anchor.confirmed').on('click',function () {
        $('.msg').hide();
        music.pause();
    })
    
}
function play_music() {
    music.play();
    setTimeout(function () {
        music.pause();
    },150000);
}


}())


