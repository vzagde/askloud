function load_poll_list() {
	$("#poll_list_dynamic").html("");

	$.ajax({
		url: api_url+'get_polls_list',
		type: 'POST',
		crossDomain: true,
		data: {
			API_KEY: 'DEV_AZHAR_ASKLOUD',
		}
	}).done(function(res){
		var html = '';
		$.each(res.poll_list, function(index, value){
			html += '<div class="card facebook-card">'+
					'<div class="card-header">'+
					'<div class="facebook-avatar"><img src="https://eruditegroup.co.nz/wp-content/uploads/2016/07/profile-dummy3.png" width="34" height="34"></div>'+
					'<div class="facebook-name">'+value.user_data.username+'</div>'+
					'</div>'+
					'<div class="card-content">'+
					'<div class="card-content-inner">'+
					'<p class="font-17">'+value.poll_header+'</p>';
			if (value.poll_type == 1) {
				$.each(value.poll_options, function(i, v){
					html += '<div class="option_selection options_1 text-center col option'+i+'">'+v.poll_options+'</div>';
				})
			} else if (value.poll_type == 2) {
				$.each(value.poll_options, function(i, v) {
					html += '<div class="option_selection options_2 text-center col option'+i+'">'+v.poll_options+'</div>';
				})
			} else {
				html += '<span class="option_selection text-center col star1 bg-yellow">1</span>'+
                        '<span class="option_selection text-center col star2 bg-yellow">2</span>'+
                        '<span class="option_selection text-center col star3 bg-yellow">3</span>'+
                        '<span class="option_selection text-center col star4 bg-yellow">4</span>'+
                        '<span class="option_selection text-center col star5 bg-yellow">5</span>'+
                        '<span class="option_selection text-center col star6 bg-yellow">6</span>'+
                        '<span class="option_selection text-center col star7 bg-yellow">7</span>'+
                        '<span class="option_selection text-center col star8 bg-yellow">8</span>'+
                        '<span class="option_selection text-center col star9">9</span>'+
                        '<span class="option_selection text-center col star10">10</span>';
			}
			
			html += '<p class="color-gray">'+value.created_date+'</p>'+
					'</div>'+
					'</div>'+
					'<div class="card-footer">'+
					'<a href="#" class="link">Poll</a>'+
					'<a href="#" class="link">Share</a>'+
					'</div>'+
					'</div>';
		})

		$("#poll_list_dynamic").html(html);
		console.log(res);
	}).error(function(res){
		console.log(res);
	})
}

function goto_question(poll_type) {
	if (poll_type == 1) {
        mainView.router.load({
            url: 'create-multiple-options.html',
            query: {
                poll_type: 1,
                user_id: 1,
            },
            ignoreCache: true,
        });
	} else if (poll_type == 2) {
        mainView.router.load({
            url: 'create-a-b.html',
            query: {
                poll_type: 2,
                user_id: 1,
            },
            ignoreCache: true,
        });
	} else if (poll_type == 3) {
        mainView.router.load({
            url: 'create-rating.html',
            query: {
                poll_type: 3,
                user_id: 1,
            },
            ignoreCache: true,
        });
	} else {
		myApp.alert('There some error with the selection, Please select appropriate option!');
	}
}

function add_options_list() {
	var html = 	'<li>'+
                '<div class="item-content">'+
                '<div class="item-inner">'+
                '<div class="item-input item-input-field">'+
                '<input type="text" class="bg-green multiple_selection_option_input" placeholder="New Option">'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</li>';

    $("#option-list-append").append(html);
}

function submit_poll_rating() {
	if (!$("#input_poll_rating_text").val()) {
		myApp.alert('Please enter all poll details');
	} else {
		$.ajax({
			url: api_url+'create_poll',
			type: 'POST',
			crossDomain: true,
			data: {
				API_KEY: 'DEV_AZHAR_ASKLOUD',
				poll_type: 3,
				poll_que: $("#input_poll_rating_text").val(),
			}
		}).done(function(res){
			console.log(res);
			if (res.status == 'Success') {
				myApp.alert(res.api_msg);
				mainView.router.load({
		            url: 'dashboard.html',
		            query: {
		                poll_type: 3,
		                user_id: 1,
		            },
		            ignoreCache: true,
		        });
			} else {
				myApp.alert(res.api_msg);
			}
		}).error(function(res){
			console.log(res);
		})
	}
}

function submit_poll_a_b() {
	if (!$("#input_poll_a_b_text").val()) {
		myApp.alert('Please enter all poll details');
	} else {
		var option_arr = [];

		$.each($(".selection_option_input"), function(index, value){
			option_arr.push($(this).val());
		})

		if (option_arr.length !== 2) {
			myApp.alert('Please enter all poll details');
		} else {
			$.ajax({
				url: api_url+'create_poll',
				type: 'POST',
				crossDomain: true,
				data: {
					API_KEY: 'DEV_AZHAR_ASKLOUD',
					poll_type: 2,
					poll_que: $("#input_poll_a_b_text").val(),
					poll_options: option_arr,
				}
			}).done(function(res){
				console.log(res);
				if (res.status == 'Success') {
					myApp.alert(res.api_msg);
					mainView.router.load({
			            url: 'dashboard.html',
			            query: {
			                poll_type: 3,
			                user_id: 1,
			            },
			            ignoreCache: true,
			        });
				} else {
					myApp.alert(res.api_msg);
				}
			}).error(function(res){
				console.log(res);
			})
		}
	}
}

function submit_poll_multiple_options() {
	if (!$("#input_poll_multiple_options_text").val()) {
		myApp.alert('Please enter all poll details');
	} else {
		var option_arr = [];

		$.each($(".multiple_selection_option_input"), function(index, value){
			option_arr.push($(this).val());
		})

		if (option_arr.length < 2) {
			myApp.alert('Please enter all poll details');
		} else {
			$.ajax({
				url: api_url+'create_poll',
				type: 'POST',
				crossDomain: true,
				data: {
					API_KEY: 'DEV_AZHAR_ASKLOUD',
					poll_type: 1,
					poll_que: $("#input_poll_multiple_options_text").val(),
					poll_options: option_arr,
				}
			}).done(function(res){
				console.log(res);
				if (res.status == 'Success') {
					myApp.alert(res.api_msg);
					mainView.router.load({
			            url: 'dashboard.html',
			            query: {
			                poll_type: 3,
			                user_id: 1,
			            },
			            ignoreCache: true,
			        });
				} else {
					myApp.alert(res.api_msg);
				}
			}).error(function(res){
				console.log(res);
			})
		}
	}
}