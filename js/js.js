
var myScroll,pullDownEl,pullDownOffset,pullUpEl,pullUpOffset,generatedCount=0;
    function loaded(){
    setTimeout(function(){
        pullDownEl=document.getElementById("pullDown");
        pullUpEl=document.getElementById("pullUp");
        pullDownOffset=pullDownEl.offsetHeight;
        pullUpOffset=pullUpEl.offsetHeight;
        myScroll=new iScroll(wrapper,{
            useTransition:true,
            topOffset:pullDownOffset,
            scrollbars:true,
            mouseWheel:true,
            onScrollMove:function(){
                if(this.y>5&&!pullDownEl.className.match("flip")){
                    pullDownEl.className="flip";
                    // 获取pullDownEl下面的第一个类名为pullDownLabel的元素
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="松手加载";
                    this.minScrollY=0;
                }else if(this.y<5&&pullDownEl.className.match("flip")){
                    pullDownEl.className="";
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="下拉刷新";
                }else if(this.y<(this.maxScrollY-5)&&!pullUpEl.className.match("flip")){
                    pullUpEl.className="flip";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="松手刷新";
                    this.maxScrollY=this.maxScrollY;
                }else if(this.y>(this.maxScrollY+5)&&pullUpEl.className.match("flip")){
                    pullUpEl.className="";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="上拉加载更多";
                    this.maxScrollY=pullUpOffset;
                }
            },
            onScrollEnd:function(){
                if(pullDownEl.className.match("flip")){
                    pullDownEl.className="loading";
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="正在加载...";
                    pullDownAction();
                }else if(pullUpEl.className.match("flip")){
                    pullUpEl.className="loading";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="正在加载...";
                    pullUpAction();
                }
            },
            onRefresh:function(){
                if(pullDownEl.className.match("loading")){
                    pullDownEl.className="";
                    pullDownEl.querySelector(".pullDownLabel").innerHTML="下拉刷新";
                }else if(pullUpEl.className.match("loading")){
                    pullUpEl.className="";
                    pullUpEl.querySelector(".pullUpLabel").innerHTML="上拉加载更多";
                }
            },
        });
        loadAction();
        console.log(myScroll);
    },100)
}
// 下拉刷新当前数据
function pullDownAction(){
    setTimeout(function(){
        myScroll.refresh();
    },400)
}
// 上拉加载贡多数据
function pullUpAction(){
    setTimeout(function(){
        $.ajax({
            url: 'js/data.json',
            type: 'get',
            success:function(data){
                console.log(data)
                var str = '';
                $.each(data,function(i,val){
                    str+=
                     '<div class="main_big">'+
                    '<dl>'+
                    '<dt><img src="'+val.imgs+'" alt=""></dt>'+
                    ' <dd>'+
                    '<h4>'+val.tit+'</h4>'+
                    '<div class="sell"><span>'+val.hot+'</span><b><em>'+val.money+'</em>起 <i class="fa fa-angle-right"></i></b></div>'+
                    ' <div class="defined"><span>'+val.selll+'</span><span>'+val.nums+'</span><b>'+val.kuai+'</b></div>'+
                    '<div class="park">'+val.parks+'</div>'+
                    '</dd>'+
                    '</dl>'+
                    '</div>'

                });
                console.log(str);
                $('.main').append(str);
            }

        });
        myScroll.refresh();// 初始化数据
    },400)
}
function loadAction(){
   $.ajax({
            url: 'js/data.json',
            type: 'get',
            success:function(data){
                console.log(data)
                var str = '';
                $.each(data,function(i,val){
                    str+=
                     '<div class="main_big">'+
                    '<dl>'+
                    '<dt><img src="'+val.imgs+'" alt=""></dt>'+
                       ' <dd>'+
                        '<h4>'+val.tit+'</h4>'+
                        '<div class="sell"><span>'+val.hot+'</span><b><em>'+val.money+'</em>起 <i class="fa fa-angle-right"></i></b></div>'+
                   ' <div class="defined"><span>'+val.selll+'</span><span>'+val.nums+'</span><b>'+val.kuai+'</b></div>'+
                    '<div class="park">'+val.parks+'</div>'+
                    '</dd>'+
                    '</dl>'+
                    '</div>'

                });
                console.log(str);
                $('.main').append(str);
            }

        });
    myScroll.refresh();// 初始化数据
}
window.addEventListener("load",loaded,false);