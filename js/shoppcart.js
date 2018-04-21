$(function() {

	$(".header").load("header1.html",function(){			
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
	$(".shoppcart-footer").load("footer.html");
	var str = "";
	//cookie操作
	function getCookie(name) {
		var str = document.cookie;
		var arr = str.split("; ");
		for(var i = 0; i < arr.length; i++) {
			var arr1 = arr[i].split("=");
			if(arr1[0] === name) {
				return arr1[1];
			}
		}
	}

	function setCookie(name, val, day) {
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + day);
		document.cookie = name + "=" + val + ";expires=" + oDate + ";path=/";
	}

	function removeCookie(name) {
		setCookie(name, 1, -1);
	}
	var cook = getCookie("nam");
	cook = JSON.parse(cook);
	//加	
	$(".cartul").on("click", ".add", function() {
		var sum = $(this).prev().val();
		var dan = $(this).prev().prev().prev().html();
		nu = dan.split("￥")[1]
		sum++;
		$(this).prev().val(sum);
		var mon = (nu * sum).toFixed(2);
		$(this).next().html("￥" + mon);
		var id = $(this).parent().attr("data-url");
		getCookie("name");
		for(var i in cook) {
			if(id === i) {
				cook[i] = sum;
			}
		}
		setCookie("nam", JSON.stringify(cook), 7);
	});
	//减
	$(".cartul").on("click", ".sub", function() {
		var sum = $(this).next().val();
		var dan = $(this).prev().html();
		nu = dan.split("￥")[1];
		if(sum <= 1) {
			sum = 1;
		} else {
			sum--;
		}
		$(this).next().val(sum);
		var mon = (nu * sum).toFixed(2);
		$(this).next().next().next().html("￥" + mon);
		var id = $(this).parent().attr("data-url");
		getCookie("name");
		for(var i in cook) {
			if(id === i) {
				cook[i] = sum;
			}
		}
		setCookie("nam", JSON.stringify(cook), 7);
	})
	//全选
	$("#checkAll").click(function() {
		$(".cartul input").prop("checked", $(this).prop("checked"));
	});

	$(".cartul").on("click", "#check", function() {
		if($("#check:checked").length == $(".cartul #check").length) {
			$("#checkAll").prop("checked", true);
		} else {
			$("#checkAll").prop("checked", false);
		}
	});
	//结算全选	
	$("#checkA").click(function() {
		$(".cartul input").prop("checked", $(this).prop("checked"));
	});
	$(".cartul").on("click", "#check", function() {
		if($("#check:checked").length == $(".cartul #check").length) {
			$("#checkA").prop("checked", true);//prop获取在匹配的元素集中的第一个元素的属性值。
		} else {
			$("#checkA").prop("checked", false);
		}

	});
	$(".cart").on("click", "input", function() {
		Sum();
	});
	//结算定位
	function Sum() {
		var arr = $(".cartul #check");
//		console.log(arr.length)
		var num = 0;
		//数量
		var mon = 0;
		//总价
		arr.each(function(index) {
			if($(this).is(":checked")) {
				num += parseInt($(this).parent().find(".tex").val());
				mon += parseInt($(this).parent().find(".cartmoney").html().split("￥")[1]);
				
			}
		
			$(this).parent().parent().next().find($(".span1")).html(num + "件");
			$(this).parent().parent().next().find($(".span2")).html("￥" + mon.toFixed(2));
			$(".coun").html(num);

		})


	}
	//删除
	$(".cartul").on("click", ".cartdelt", function() {
		var id = $(this).parent().attr("data-url");
		getCookie("name");
		for(var i in cook) {
			if(id === i) {
				delete cook[i];
			}
		}
		$(this).parent().remove();
		setCookie("nam", JSON.stringify(cook), 7);	
		Sum();
		if($(".cartul li").length===0){
			$(".span1").html("0件")
			$(".span2").html("￥0.00")
			$(".coun").html("0")
		}
		
	});
	function add() {
		var cont = 0;
		var a = [
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00725585&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00725321&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00718507&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717303&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717307&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717320&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717324&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717449&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717308&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717326&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717317&callback=?",
			"https://www.3.cn/bup/index_new.php?app=Bi&action=get_sku&groupId=00717328&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717331&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717365&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717366&callback=?",
			"https://www.3.cn/bup/index_new.php?app=Bi&action=get_sku&groupId=00717396&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717442&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717443&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717445&callback=?",
			"https://ai.jd.com/General?app=Bi&action=get_sku&groupId=00717447&callback=?"
		]
		for(var i = 0; i < a.length; i++) {
			cont++;
			$.getJSON(a[i], function(data) {
				data = data.DATA.data[0].skuData;
				for(var j = 0; j < data.length; j++) {
					for(var k in cook) {
						if(data[j].skuId == k) {
							str += '<li data-url=' + data[j].skuId + '><input type="checkbox" id="check" checked="checked"/><img src=' + data[j].image + '><p class="carnam">' + data[j].name + '</p><p class="carmone">￥' + parseInt(data[j].pcpPrice).toFixed(2) + '</p><input type="button" value="-" class="sub"><input type="text" value=' + cook[k] + ' class="tex"><input type="button" value="+" class="add"><p class="cartmoney">￥' + parseInt(data[j].pcpPrice * cook[k]).toFixed(2) + '</p><p class="cartdelt">删除</p></li>'
							cook[k].delete;
						}
					}
				}
				$(".cartul").html(str);

				//进来第一时间刷新总数量和总金额
				Sum();

			});
			if(cont == a.length) {
				Sum();
			}
		}

	}
	add();
});