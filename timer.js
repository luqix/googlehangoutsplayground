function CountDownTimer(duration) {
	this.duration = duration;
	this.tickFns = [];
	this.running = false;
}

CountDownTimer.prototype.start = function() {
	if(this.running) {
		return;
	}

	this.running = true;
	var start = Date.now(),
		that = this,
		diff, obj;

		(function timer() {
			diff = that.duration - (((Date.now() - start) / 1000) | 0);

			if(diff > 0) {
				setTimeout(timer);
			} else {
				diff = 0;
				that.running = false;
			}

			obj = CountDownTimer.parse(diff);
			that.tickFns.forEach(function(fn) {
				fn.call(this, obj.minutes, obj.seconds);
			}, that);
		}());
};

CountDownTimer.prototype.onTick = function(fn) {
	if(typeof fn === 'function') {
		this.tickFns.push(fn);
	}
	return this;
}

CountDownTimer.prototype.expired = function() {
	return !this.running;
}

CountDownTimer.parse = function(seconds) {
	return {
		'minutes': (seconds / 60 ) | 0,
		'seconds': (seconds % 60) | 0
	};
};