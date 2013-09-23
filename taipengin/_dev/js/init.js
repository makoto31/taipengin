
// ボタン設定
onButton = function(aThis, aFunc){
	
	var ret = null;
	
	// タッチデバイス
	if(Util.isTouchDevice()){
		ret = {touchstart: Hover.onTouchstart, touchend: Hover.onTouchend(aFunc)};
		
	// PC用
	}else{
		ret = {click: aFunc, mouseenter: Hover.onMouseenter, mouseleave: Hover.onMouseleave};
	}
	
	aThis.on(ret).addClass('on-hover');
};

// ボタン解除
offButton = function(aThis){
	
	var ret = null;
	
	if(Util.isTouchDevice()){
		ret = 'touchstart touchend';
	}else{
		ret = 'click mouseenter mouseleave';
	}
	
	aThis.off(ret).removeClass('on-hover');
};


$(document).ready(function(){
	
	// タッチデバイス
	if(Util.isTouchDevice()){
		// hover解除処理登録
		$(document).on({touchmove: _.throttle(Hover.onTouchmove, Def.TimeTouchMove)});
	}
	
	// ロゴ
	$('#id-logo').data('hoge', {hoge:'foo'
								,foo: function(){
									console.log('foo!');
								}});
	onButton($('#id-logo'), function(){
		var data = $(this).data('hoge');
		data.foo();
	});
	
	// リンク
	onButton($('#id-link1'), function(){
		location.href = 'http://images.apple.com/media/jp/iphone-5c/2013/10ba527a-1a10-3f70-aae814f8/feature/iphone5c-feature-jp-20130910_848x480.mp4';
	});
	onButton($('#id-link2'), function(){
		console.log('hoge!-2');
		location.href = 'http://google.co.jp';
	});
	onButton($('#id-link3'), function(){
		console.log('hoge!-3');
		location.href = 'http://google.co.jp';
	});
	
	// イベントをオフにする例
	if(false){
		_.each($('.on-hover'), function(aData){
			offButton($(aData));
		});
	}
	
});