// ============================================================================
// 
// character.js
// 
// è‡ªæ©Ÿã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ã®ã‚·ãƒ§ãƒƒãƒˆã‚„ã‚¨ãƒãƒŸãƒ¼ã‚­ãƒ£ãƒ©ã‚¯ã‚¿ãƒ¼ã®æŒ™å‹•ã‚’ç®¡ç†ã™ã‚‹ã‚¯ãƒ©ã‚¹ã‚’è¨˜è¿°
// ã—ãŸãƒ•ã‚¡ã‚¤ãƒ«ã§ã™ã€‚ã“ã®ãƒ•ã‚¡ã‚¤ãƒ«ã«ã¯ä»¥ä¸‹ã®ã‚¯ãƒ©ã‚¹ãŒå«ã¾ã‚Œã¾ã™ã€‚
// 
// ãƒ»Characterã‚¯ãƒ©ã‚¹
// ãƒ»CharacterShotã‚¯ãƒ©ã‚¹
// ãƒ»Enemyã‚¯ãƒ©ã‚¹
// ãƒ»EnemyShotã‚¯ãƒ©ã‚¹
// ============================================================================

// - character ----------------------------------------------------------------
function Character(){
	this.position = new Point();
	this.size = 0;
}

Character.prototype.init = function(size){
	this.size = size;
};


// - character shot -----------------------------------------------------------
function CharacterShot(){
	this.position = new Point();
	this.size = 0;
	this.speed = 0;
	this.alive = false;
}

CharacterShot.prototype.set = function(p, size, speed){
	// åº§æ¨™ã‚’ã‚»ãƒƒãƒˆ
	this.position.x = p.x;
	this.position.y = p.y;
	
	// ã‚µã‚¤ã‚ºã€ã‚¹ãƒ”ãƒ¼ãƒ‰ã‚’ã‚»ãƒƒãƒˆ
	this.size = size;
	this.speed = speed;
	
	// ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	this.alive = true;
};

CharacterShot.prototype.move = function(){
	// åº§æ¨™ã‚’çœŸä¸Šã«speedåˆ†ã ã‘ç§»å‹•ã•ã›ã‚‹
	this.position.y -= this.speed;
	
	// ä¸€å®šä»¥ä¸Šã®åº§æ¨™ã«åˆ°é”ã—ã¦ã„ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
	if(this.position.y < -this.size){
		this.alive = false;
	}
};


// - enemy --------------------------------------------------------------------
function Enemy(){
	this.position = new Point();
	this.size = 0;
	this.type = 0;
	this.param = 0;
	this.alive = false;
}

Enemy.prototype.set = function(p, size, type){
	// åº§æ¨™ã‚’ã‚»ãƒƒãƒˆ
	this.position.x = p.x;
	this.position.y = p.y;
	
	// ã‚µã‚¤ã‚ºã€ã‚¿ã‚¤ãƒ—ã‚’ã‚»ãƒƒãƒˆ
	this.size = size;
	this.type = type;
	
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ãƒªã‚»ãƒƒãƒˆ
	this.param = 0;
	
	// ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	this.alive = true;
};

Enemy.prototype.move = function(){
	// ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ã‚¤ãƒ³ã‚¯ãƒªãƒ¡ãƒ³ãƒˆ
	this.param++;
	
	// ã‚¿ã‚¤ãƒ—ã«å¿œã˜ã¦åˆ†å²
	switch(this.type){
		case 0:
			// X æ–¹å‘ã¸ã¾ã£ã™ãé€²ã‚€
			this.position.x += 2;
			
			// ã‚¹ã‚¯ãƒªãƒ¼ãƒ³ã®å³ç«¯ã‚ˆã‚Šå¥¥ã«åˆ°é”ã—ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
			if(this.position.x > this.size + screenCanvas.width){
				this.alive = false;
			}
			break;
		case 1:
			// ãƒžã‚¤ãƒŠã‚¹ X æ–¹å‘ã¸ã¾ã£ã™ãé€²ã‚€
			this.position.x -= 2;
			
			// ã‚¹ã‚¯ãƒªãƒ¼ãƒ³ã®å·¦ç«¯ã‚ˆã‚Šå¥¥ã«åˆ°é”ã—ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
			if(this.position.x < -this.size){
				this.alive = false;
			}
			break;
	}
};


// - enemy shot ---------------------------------------------------------------
function EnemyShot(){
	this.position = new Point();
	this.vector = new Point();
	this.size = 0;
	this.speed = 0;
	this.alive = false;
}

EnemyShot.prototype.set = function(p, vector, size, speed){
	// åº§æ¨™ã€ãƒ™ã‚¯ãƒˆãƒ«ã‚’ã‚»ãƒƒãƒˆ
	this.position.x = p.x;
	this.position.y = p.y;
	this.vector.x = vector.x;
	this.vector.y = vector.y;
	
	// ã‚µã‚¤ã‚ºã€ã‚¹ãƒ”ãƒ¼ãƒ‰ã‚’ã‚»ãƒƒãƒˆ
	this.size = size;
	this.speed = speed;
	
	// ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	this.alive = true;
};

EnemyShot.prototype.move = function(){
	// åº§æ¨™ã‚’ãƒ™ã‚¯ãƒˆãƒ«ã«å¿œã˜ã¦speedåˆ†ã ã‘ç§»å‹•ã•ã›ã‚‹
	this.position.x += this.vector.x * this.speed;
	this.position.y += this.vector.y * this.speed;
	
	// ä¸€å®šä»¥ä¸Šã®åº§æ¨™ã«åˆ°é”ã—ã¦ã„ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
	if(
	   this.position.x < -this.size ||
	   this.position.y < -this.size ||
	   this.position.x > this.size + screenCanvas.width ||
	   this.position.y > this.size + screenCanvas.height
	){
		this.alive = false;
	}
};



