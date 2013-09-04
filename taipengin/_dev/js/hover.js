Hover = {
		
	// hover開始イベント
	onMouseenter: function(){
		$(this).addClass('hover');
	}
	//hover終了イベント
	,onMouseleave: function(){
		$(this).removeClass('hover');
	}
	// タッチ開始イベント
	,onTouchstart: function(){
		$(this).addClass('hover');
	}
	// タッチムーブイベント
	,onTouchmove: function(){
		$('.hover').removeClass('hover');
	}
	// タッチ終了イベント
	,onTouchend: function(){
		_.delay(function(){
			$('.hover').removeClass('hover');
		}, Def.TimeTouchEnd);
	}
};

