Def={TimeTouchEnd:150,TimeTouchMove:150};Hover={onMouseenter:function(){$(this).addClass("hover")},onMouseleave:function(){$(this).removeClass("hover")},onTouchstart:function(){$(this).addClass("hover")},onTouchmove:function(){$(".hover").removeClass("hover")},onTouchend:function(){_.delay(function(){$(".hover").removeClass("hover")},Def.TimeTouchEnd)}};onButton=function(b,a){var c=null,c=Util.isTouchDevice()?{touchend:Util.onClickTouch(a),touchstart:Hover.onTouchstart}:{click:a,mouseenter:Hover.onMouseenter,mouseleave:Hover.onMouseleave};b.on(c).addClass("on-hover")};offButton=function(b){var a=null,a=Util.isTouchDevice()?"touchstart touchend":"click mouseenter mouseleave";b.off(a).removeClass("on-hover")};
$(document).ready(function(){Util.isTouchDevice()&&($(document).on({touchend:Hover.onTouchend}),$(document).on({touchmove:_.throttle(Hover.onTouchmove,Def.TimeTouchMove)}));$("#id-logo").data("hoge",{hoge:"foo",foo:function(){console.log("foo!")}});onButton($("#id-logo"),function(){$(this).data("hoge").foo()});onButton($("#id-link1"),function(){location.href="http://images.apple.com/media/jp/iphone-5c/2013/10ba527a-1a10-3f70-aae814f8/feature/iphone5c-feature-jp-20130910_848x480.mp4"});onButton($("#id-link2"),
function(){console.log("hoge!-2");location.href="http://google.co.jp"});onButton($("#id-link3"),function(){console.log("hoge!-3");location.href="http://google.co.jp"})});Res={};Util={isTouchDevice:function(){var b=!1,a=navigator.userAgent;if(0<a.indexOf("iPhone")||0<a.indexOf("iPad")||0<a.indexOf("iPod")||0<a.indexOf("Android"))b=!0;return b},onClickTouch:function(b){return function(){$(this).hasClass("hover")&&b.apply(this)}}};var fuga=$("<div/>").addClass("cs-test").html('<video controls width="100%" height="240">,<source src="http://images.apple.com/media/jp/iphone-5c/2013/10ba527a-1a10-3f70-aae814f8/feature/iphone5c-feature-jp-20130910_848x480.mp4">,</video>');$("#id-content-body").append(fuga);var input=$('<input type="text"/>').css({width:"100%"});$("#id-content-body").append(input);
