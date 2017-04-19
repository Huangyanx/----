/**
 * Created by Administrator on 2017/3/23.
 */

$('.dropdown[hover="1"]').mouseover(function() {
    $(this).addClass('open');
}).mouseout(function() {
    $(this).removeClass('open');
});
$('.show_right[hover="1"]').mouseover(function() {
    $(this).addClass('open');
}).mouseout(function() {
    $(this).removeClass('open');
});
$(function () {
    $('#mycarousel').carousel({
        'interval':6000
    });
    $('#carousel').carousel({
        'interval':2000
    })

})
$(function  () {
    $('[data-toggle="tooltip"]').tooltip();
})

$(window).scroll(function () {
  /* console.log($(this));
   console.log($(this).scrollY);
   console.log($(this).scrollTop+'头部');*/
    console.log(this.scrollY);
    if(this.scrollY > 800&&this.scrollY <5100 ){
        console.log($('#scroll_floor'));
        $('#scroll_floor').show();

    }else {
        console.log($('#scroll_floor'));
        $('#scroll_floor').hide();
    }
})