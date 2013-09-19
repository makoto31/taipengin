Util = {
	
	// タッチデバイス判定
	isTouchDevice: function(){
		var ret = false;
		
		var ua = navigator.userAgent;
		if ((ua.indexOf('iPhone') > 0)
			|| (ua.indexOf('iPad') > 0)
			|| (ua.indexOf('iPod') > 0)
			|| (ua.indexOf('Android') > 0)){
			ret = true;
		}
		
		return ret;
	}
	
	// タッチイベント
	,onClickTouch: function(aFunc){
		return function(){
			// ハイライトしてたら実行
			if($(this).hasClass('hover')){
				aFunc.apply(this);
			}
		};
	}
	
};