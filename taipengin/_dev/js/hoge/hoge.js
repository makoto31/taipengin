
var fuga = $('<div/>').addClass('cs-test').html([
                                                 '<video controls width="100%" height="240">'
                                                 ,'<source src="http://images.apple.com/media/jp/iphone-5c/2013/10ba527a-1a10-3f70-aae814f8/feature/iphone5c-feature-jp-20130910_848x480.mp4">'
                                                 ,'</video>'
                                                 ].join());
$('#id-content-body').append(fuga);

var input = $('<input type="text"/>').css({
										'width': '100%'
										});

$('#id-content-body').append(input);
