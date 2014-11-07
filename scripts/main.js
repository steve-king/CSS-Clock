function Clock(){
	
	var clock = this,
		$clock = $('#clock'),
		animatedElements = [];
	
	this.init = function(){
				
		clock.setCurrentTime();
		$('.hand_hour, .hand_min, .hand_sec').show();
		clock.start();	
		
	}
	
	this.setCurrentTime = function(){

		// Get date, hours, mins, seconds
		var date	= new Date(),
			secs	= date.getSeconds(),
			mins	= date.getMinutes() + ( secs / 60 ),
			hours 	= date.getHours() + ( mins / 60 );
		
		//console.log(hours+':'+mins+':'+secs	);
		
		// Calculate degrees of rotation needed for each	
		var secDegs		= (360/60) * secs,
			minDegs		= (360/60) * mins,
			hourDegs 	= (360/12) * hours;
			
		
		// Apply CSS rotation to the hand containing divs
		clock.transformRotate($('.hand_hour'), hourDegs);
		clock.transformRotate($('.hand_min'), minDegs);
		clock.transformRotate($('.hand_sec'), secDegs);
		
			
	}
	
	this.stop = function(){
		$clock.removeClass('is_running');
		$clock.addClass('is_paused');
	}
	
	this.start = function(){
		$clock.addClass('is_running');
		$clock.removeClass('is_paused');
	}
	
	this.currentTime = function(){
		clock.reset();
		clock.setCurrentTime();
		clock.start();
	}
	
	this.reset = function(){
		
		clock.stop();
		$clock.addClass('is_paused');
		
		var degrees = 0;
		
		clock.transformRotate($('.hand_hour, .hand_min, .hand_sec'), degrees);
		clock.transformRotate($('.hand_sec').find('.rotator'), degrees);
		clock.transformRotate($('.hand_sec').find('.ticker'), degrees);
	}
	
	this.transformRotate = function($item, degrees){
		
		$item.css({
			'-webkit-transform' : 'rotate('+degrees+'deg)',
			'-moz-transform' 	: 'rotate('+degrees+'deg)',
			'-o-transform' 		: 'rotate('+degrees+'deg)',
			'transform' 		: 'rotate('+degrees+'deg)'
		});
		
	}
}

jQuery(document).ready(function($){
	
	
	var clock = new Clock();
	clock.init();
	
	//$('.hand_hour, .hand_min, .hand_sec').show();
	
	$('.btn_stop').click(clock.stop);
	$('.btn_start').click(clock.start);
	$('.btn_reset').click(clock.reset);	
	$('.btn_current').click(clock.currentTime);		
});

