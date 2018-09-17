// ============================================================================
// 
// common.js
// 
// æ±Žç”¨çš„ãªã‚¯ãƒ©ã‚¹ã®å®šç¾©ã‚’è¨˜è¿°ã—ãŸãƒ•ã‚¡ã‚¤ãƒ«ã§ã™ã€‚
// ã“ã®ãƒ•ã‚¡ã‚¤ãƒ«ã«ã¯ã€ä»¥ä¸‹ã®ã‚¯ãƒ©ã‚¹ãŒå«ã¾ã‚Œã¾ã™ã€‚
// 
// ãƒ»Pointã‚¯ãƒ©ã‚¹
// 
// ============================================================================

// - point --------------------------------------------------------------------
function Point(){
	this.x = 0;
	this.y = 0;
}

Point.prototype.distance = function(p){
	var q = new Point();
	q.x = p.x - this.x;
	q.y = p.y - this.y;
	return q;
};

Point.prototype.length = function(){
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Point.prototype.normalize = function(){
	var i = this.length();
	if(i > 0){
		var j = 1 / i;
		this.x *= j;
		this.y *= j;
	}
};



