// ============================================================================
// 
// boss.js
// 
// ãƒœã‚¹ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ã‚’ç®¡ç†ã™ã‚‹ã‚¯ãƒ©ã‚¹ã€ãƒœã‚¹ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ã®ãƒ“ãƒƒãƒˆã‚’ç®¡ç†ã™ã‚‹ã‚¯ãƒ©ã‚¹ã‚’
// å«ã‚€ãƒ•ã‚¡ã‚¤ãƒ«ã§ã™ã€‚
// 
// ãƒ»Bossã‚¯ãƒ©ã‚¹
// ãƒ»Bitã‚¯ãƒ©ã‚¹
// ============================================================================

// - boss ---------------------------------------------------------------------
function Boss(){
	this.position = new Point();
	this.size = 0;
	this.life = 0;
	this.param = 0;
	this.alive = false;
}

Boss.prototype.set = function(p, size, life){
	// åº§æ¨™ã‚’ã‚»ãƒƒãƒˆ
	this.position.x = p.x;
	this.position.y = p.y;
	
	// ã‚µã‚¤ã‚ºã€è€ä¹…å€¤ã‚’ã‚»ãƒƒãƒˆ
	this.size = size;
	this.life = life;
	
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ãƒªã‚»ãƒƒãƒˆ
	this.param = 0;
	
	// ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	this.alive = true;
};

Boss.prototype.move = function(){
	var i, j;
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ã‚¤ãƒ³ã‚¯ãƒªãƒ¡ãƒ³ãƒˆ
	this.param++;
	
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã«å¿œã˜ã¦åˆ†å²
	switch(true){
		case this.param < 100:
			// ä¸‹æ–¹å‘ã¸ã¾ã£ã™ãé€²ã‚€
			this.position.y += 1.5;
			break;
		default:
			// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‹ã‚‰ãƒ©ã‚¸ã‚¢ãƒ³ã‚’æ±‚ã‚ã‚‹
			i = ((this.param - 100) % 360) * Math.PI / 180;
			
			// ãƒ©ã‚¸ã‚¢ãƒ³ã‹ã‚‰æ¨ªç§»å‹•é‡ã‚’ç®—å‡º
			j = screenCanvas.width / 2;
			this.position.x = j + Math.sin(i) * j;
			break;
	}
};


// - boss bit -----------------------------------------------------------------
function Bit(){
	this.position = new Point();
	this.parent = null;
	this.size = 0;
	this.life = 0;
	this.param = 0;
	this.alive = false;
}

Bit.prototype.set = function(parent, size, life, param){
	// æ¯ä½“ã¨ãªã‚‹ãƒœã‚¹ã‚’ã‚»ãƒƒãƒˆ
	this.parent = parent;
	
	// ã‚µã‚¤ã‚ºã€è€ä¹…å€¤ã‚’ã‚»ãƒƒãƒˆ
	this.size = size;
	this.life = life;
	
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã«åˆæœŸå€¤ã‚’ã‚»ãƒƒãƒˆ
	this.param = param;
	
	// ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	this.alive = true;
};

Bit.prototype.move = function(){
	var i, x, y;
	
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ã‚¤ãƒ³ã‚¯ãƒªãƒ¡ãƒ³ãƒˆ
	this.param++;
	
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‹ã‚‰ãƒ©ã‚¸ã‚¢ãƒ³ã‚’æ±‚ã‚ã‚‹
	i = (this.param % 360) * Math.PI / 180;
	
	// ãƒ©ã‚¸ã‚¢ãƒ³ã‹ã‚‰æ¨ªç§»å‹•é‡ã‚’ç®—å‡º
	x = Math.cos(i) * (this.parent.size + this.size + 20);
	y = Math.sin(i) * (this.parent.size + this.size + 20);
	this.position.x = this.parent.position.x + x;
	this.position.y = this.parent.position.y + y;
};

