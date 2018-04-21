$(function() {
	var size = $("#list li").size();
	for(var i = 1; i <= size; i++) {
		var li = "<li>" + i + "</li>"
		$("#btns").append(li);
	}
	//手动切换轮播图
	$("#list li").eq(0).show();
	$("#btns li").eq(0).addClass("oli");
	$("#btns li").mouseover(function() {
		$(this).addClass("oli").siblings().removeClass("oli");
		var index = $(this).index();
		i = index;
		$("#list li").eq(i).fadeIn(300).siblings().fadeOut(300);
	});
	//自动
	var i = 0;
	var t = setInterval(move, 3000);
	//向右
	function move() {
		i++;
		if(i == size) {
			i = 0;
		}
		$("#btns li").eq(i).addClass("oli").siblings().removeClass("oli");
		$("#list li").eq(i).fadeIn(300).siblings().fadeOut(300);
	}
	//向左
	function moveLeft() {
		i--;
		if(i == -1) {
			i = size - 1;
		}
		$("#btns li").eq(i).addClass("oli").siblings().removeClass("oli");
		$("#list li").eq(i).fadeIn(300).siblings().fadeOut(300);
	}
	//鼠标移入移除的时候	
	$("#banner").hover(function() {
		clearInterval(t);
	}, function() {
		t = setInterval(move, 3000);
	});
	$("#btn span").eq(0).click(function() {
		moveLeft();
	});
	$("#btn span").eq(1).click(function() {
		move();
	});
});