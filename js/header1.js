$(function() {
	$(".header").on("click", ".bts", function() {
		if($("#bt").val() !== "") {
			window.location.href = "list.html?" + $("#bt").val();
		} else {
			window.location.href = "list.html?" + $("#bt").attr("placeholder");
		}
	});
	
$("#bt").bind("input property", function() {
	
			$.getJSON("https://suggest.taobao.com/sug?code=utf-8&q=" + $("#bt").val() + "&callback=?", function(data) {
				var str = "";
				var data = data.result;
				data.forEach(function(item) {
					str += "<li>" + item[0] + "</li>"
					$(".search").show().html(str);
				});
			});
		});
		$(".search").on("mouseover", "li", function() {
			$(this).css({
				"background": "#ccc"
			}).siblings().css({
				"background": "#fff"
			});
		});
		$(".search").on("click", "li", function() {
			var str = $(this).html();
			$("#bt").val(str);
			$(".search").css("display", "none");
		});
});