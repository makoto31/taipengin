
// ボタン設定
onButton = function(aThis, aFunc){
	
	var ret = null;
	
	if(Util.isTouchDevice()){
		ret = {touchend: Util.onClickTouch(aFunc), touchstart: Hover.onTouchstart};
		
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
		$(document).on({touchend: Hover.onTouchend});
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
		console.log('hoge!-1');
	});
	onButton($('#id-link2'), function(){
		console.log('hoge!-2');
	});
	onButton($('#id-link3'), function(){
		console.log('hoge!-3');
	});
	
	// イベントをオフにする例
	if(false){
		_.each($('.on-hover'), function(aData){
			offButton($(aData));
		});
	}
	
});