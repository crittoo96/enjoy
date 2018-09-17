// ============================================================================
// 
// main.js
// 
// ãƒ¡ã‚¤ãƒ³ãƒ«ãƒ¼ãƒãƒ³ã‚’è¨˜è¿°ã—ãŸãƒ•ã‚¡ã‚¤ãƒ«ã§ã™ã€‚
// javascriptãƒ•ã‚¡ã‚¤ãƒ«ã®ãªã‹ã§ä¸€ç•ªæœ€å¾Œã«èª­ã¿è¾¼ã¾ã‚Œã€onloadã‚¤ãƒ™ãƒ³ãƒˆã«ã‚ˆã£ã¦å‹•ä½œã‚’
// é–‹å§‹ã™ã‚‹ã‚ˆã†ã«å®Ÿè£…ã•ã‚Œã¦ã„ã¾ã™ã€‚
// ã¾ãŸã‚¤ãƒ™ãƒ³ãƒˆé–¢é€£ã®å‡¦ç†ã‚‚ã“ã®ãƒ•ã‚¡ã‚¤ãƒ«ã«å«ã¾ã‚Œã¦ã„ã¾ã™ã€‚
// 
// ============================================================================

// - global -------------------------------------------------------------------
var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;
var counter = 0;
var score = 0;
var message = '';

// - const --------------------------------------------------------------------
var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';
var ENEMY_MAX_COUNT = 10;
var ENEMY_SHOT_COLOR = 'rgba(255, 0, 255, 0.75)';
var ENEMY_SHOT_MAX_COUNT = 100;
var BOSS_COLOR = 'rgba(128, 128, 128, 0.75)';
var BOSS_BIT_COLOR = 'rgba(64, 64, 64, 0.75)';
var BOSS_BIT_COUNT = 5;

// - main ---------------------------------------------------------------------
window.onload = function(){
	// æ±Žç”¨å¤‰æ•°
	var i, j;
	var p = new Point();
	
	// ã‚¹ã‚¯ãƒªãƒ¼ãƒ³ã®åˆæœŸåŒ–
	screenCanvas = document.getElementById('screen');
	screenCanvas.width = 500;
	screenCanvas.height = 500;
	
	// è‡ªæ©Ÿã®åˆæœŸä½ç½®ã‚’ä¿®æ­£
	mouse.x = screenCanvas.width / 2;
	mouse.y = screenCanvas.height - 20;
	
	// 2dã‚³ãƒ³ãƒ†ã‚­ã‚¹ãƒˆ
	ctx = screenCanvas.getContext('2d');
	
	// ã‚¤ãƒ™ãƒ³ãƒˆã®ç™»éŒ²
	screenCanvas.addEventListener('mousemove', mouseMove, true);
	screenCanvas.addEventListener('mousedown', mouseDown, true);
	window.addEventListener('keydown', keyDown, true);
	
	// ãã®ä»–ã®ã‚¨ãƒ¬ãƒ¡ãƒ³ãƒˆé–¢é€£
	info = document.getElementById('info');
	
	// è‡ªæ©ŸåˆæœŸåŒ–
	var chara = new Character();
	chara.init(10);
	
	// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆåˆæœŸåŒ–
	var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
	for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
		charaShot[i] = new CharacterShot();
	}
	
	// ã‚¨ãƒãƒŸãƒ¼åˆæœŸåŒ–
	var enemy = new Array(ENEMY_MAX_COUNT);
	for(i = 0; i < ENEMY_MAX_COUNT; i++){
		enemy[i] = new Enemy();
	}
	
	// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆåˆæœŸåŒ–
	var enemyShot = new Array(ENEMY_SHOT_MAX_COUNT);
	for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
		enemyShot[i] = new EnemyShot();
	}
	
	// ãƒœã‚¹åˆæœŸåŒ–
	var boss = new Boss();
	
	// ãƒœã‚¹ã®ãƒ“ãƒƒãƒˆã‚’åˆæœŸåŒ–
	var bit = new Array(BOSS_BIT_COUNT);
	for(i = 0; i < BOSS_BIT_COUNT; i++){
		bit[i] = new Bit();
	}
	
	// ãƒ¬ãƒ³ãƒ€ãƒªãƒ³ã‚°å‡¦ç†ã‚’å‘¼ã³å‡ºã™
	(function(){
		// ã‚«ã‚¦ãƒ³ã‚¿ã‚’ã‚¤ãƒ³ã‚¯ãƒªãƒ¡ãƒ³ãƒˆ
		counter++;
		
		// screenã‚¯ãƒªã‚¢
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
		
		// è‡ªæ©Ÿ ---------------------------------------------------------------
		// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
		ctx.beginPath();
		
		// è‡ªæ©Ÿã®ä½ç½®ã‚’è¨­å®š
		chara.position.x = mouse.x;
		chara.position.y = mouse.y;
		
		// è‡ªæ©Ÿã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
		ctx.arc(
			chara.position.x,
			chara.position.y,
			chara.size,
			0, Math.PI * 2, false
		);
		
		// è‡ªæ©Ÿã®è‰²ã‚’è¨­å®šã™ã‚‹
		ctx.fillStyle = CHARA_COLOR;
		
		// è‡ªæ©Ÿã‚’æã
		ctx.fill();
		
		// fireãƒ•ãƒ©ã‚°ã®å€¤ã«ã‚ˆã‚Šåˆ†å²
		if(fire){
			// ã™ã¹ã¦ã®è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
			for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
				// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆãŒæ—¢ã«ç™ºå°„ã•ã‚Œã¦ã„ã‚‹ã‹ãƒã‚§ãƒƒã‚¯
				if(!charaShot[i].alive){
					// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’æ–°è¦ã«ã‚»ãƒƒãƒˆ
					charaShot[i].set(chara.position, 3, 5);
					
					// ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
					break;
				}
			}
			// ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã—ã¦ãŠã
			fire = false;
		}
		
		// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆ -------------------------------------------------------
		// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
		ctx.beginPath();
		
		// ã™ã¹ã¦ã®è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
		for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
			// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆãŒæ—¢ã«ç™ºå°„ã•ã‚Œã¦ã„ã‚‹ã‹ãƒã‚§ãƒƒã‚¯
			if(charaShot[i].alive){
				// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’å‹•ã‹ã™
				charaShot[i].move();
				
				// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
				ctx.arc(
					charaShot[i].position.x,
					charaShot[i].position.y,
					charaShot[i].size,
					0, Math.PI * 2, false
                );

				
				// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
				ctx.closePath();
			}
		}
		
		// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã®è‰²ã‚’è¨­å®šã™ã‚‹
		ctx.fillStyle = CHARA_SHOT_COLOR;
		
		// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’æã
		ctx.fill();
		
		// ã‚¨ãƒãƒŸãƒ¼ã®å‡ºç¾ç®¡ç† -------------------------------------------------
		// 1000 ãƒ•ãƒ¬ãƒ¼ãƒ ç›®ã¾ã§ã¯ 100 ãƒ•ãƒ¬ãƒ¼ãƒ ã«ä¸€åº¦å‡ºç¾ã•ã›ã‚‹
		// if(counter % 100 === 0 && counter < 1000){
		// 	// ã™ã¹ã¦ã®ã‚¨ãƒãƒŸãƒ¼ã‚’èª¿æŸ»ã™ã‚‹
		// 	for(i = 0; i < ENEMY_MAX_COUNT; i++){
		// 		// ã‚¨ãƒãƒŸãƒ¼ã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
		// 		if(!enemy[i].alive){
		// 			// ã‚¿ã‚¤ãƒ—ã‚’æ±ºå®šã™ã‚‹ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’ç®—å‡º
		// 			j = (counter % 200) / 100;
					
		// 			// ã‚¿ã‚¤ãƒ—ã«å¿œã˜ã¦åˆæœŸä½ç½®ã‚’æ±ºã‚ã‚‹
		// 			var enemySize = 15;
		// 			p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j
		// 			p.y = screenCanvas.height / 2;
					
		// 			// ã‚¨ãƒãƒŸãƒ¼ã‚’æ–°è¦ã«ã‚»ãƒƒãƒˆ
		// 			enemy[i].set(p, enemySize, j);
					
		// 			// 1ä½“å‡ºç¾ã•ã›ãŸã®ã§ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
		// 			break;
		// 		}
		// 	}
		if(counter === 10){
			// 1000 ãƒ•ãƒ¬ãƒ¼ãƒ ç›®ã«ãƒœã‚¹ã‚’å‡ºç¾ã•ã›ã‚‹
			p.x = screenCanvas.width / 2;
			p.y = -80;
			boss.set(p, 50, 30);
			
			// åŒæ™‚ã«ãƒ“ãƒƒãƒˆã‚‚å‡ºç¾ã•ã›ã‚‹
			for(i = 0; i < BOSS_BIT_COUNT; i++){
				j = 360 / BOSS_BIT_COUNT;
				bit[i].set(boss, 15, 5, i * j);
			}
		}
		
		// ã‚«ã‚¦ãƒ³ã‚¿ãƒ¼ã®å€¤ã«ã‚ˆã£ã¦ã‚·ãƒ¼ãƒ³åˆ†å²
		switch(true){
			// ã‚«ã‚¦ãƒ³ã‚¿ãƒ¼ãŒ70ã‚ˆã‚Šå°ã•ã„
			case counter < 70:
				message = 'READY...';
				break;
			
			// ã‚«ã‚¦ãƒ³ã‚¿ãƒ¼ãŒ100ã‚ˆã‚Šå°ã•ã„
			case counter < 100:
				message = 'GO!!';
				break;
			
			// ã‚«ã‚¦ãƒ³ã‚¿ãƒ¼ãŒ100ä»¥ä¸Š
			default:
				message = '';
				
				// ã‚¨ãƒãƒŸãƒ¼ ---------------------------------------------------
				// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
				ctx.beginPath();
				
				// ã™ã¹ã¦ã®ã‚¨ãƒãƒŸãƒ¼ã‚’èª¿æŸ»ã™ã‚‹
				for(i = 0; i < ENEMY_MAX_COUNT; i++){
					// ã‚¨ãƒãƒŸãƒ¼ã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
					if(enemy[i].alive){
						// ã‚¨ãƒãƒŸãƒ¼ã‚’å‹•ã‹ã™
						enemy[i].move();
						
						// ã‚¨ãƒãƒŸãƒ¼ã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
						ctx.arc(
							enemy[i].position.x,
							enemy[i].position.y,
							enemy[i].size,
							0, Math.PI * 2, false
						);
						
						// ã‚·ãƒ§ãƒƒãƒˆã‚’æ‰“ã¤ã‹ã©ã†ã‹ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã®å€¤ã‹ã‚‰ãƒã‚§ãƒƒã‚¯
						if(enemy[i].param % 30 === 0){
							// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
							for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
								if(!enemyShot[j].alive){
									// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’æ–°è¦ã«ã‚»ãƒƒãƒˆã™ã‚‹
									p = enemy[i].position.distance(chara.position);
									p.normalize();
									enemyShot[j].set(enemy[i].position, p, 5, 5);
									
									// 1å€‹å‡ºç¾ã•ã›ãŸã®ã§ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
									break;
								}
							}
						}
						
						// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
						ctx.closePath();
					}
				}
				
				// ã‚¨ãƒãƒŸãƒ¼ã®è‰²ã‚’è¨­å®šã™ã‚‹
				ctx.fillStyle = ENEMY_COLOR;
				
				// ã‚¨ãƒãƒŸãƒ¼ã‚’æã
				ctx.fill();
				
				// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆ -------------------------------------------
				// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
				ctx.beginPath();
				
				// ã™ã¹ã¦ã®ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
				for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
					// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆãŒæ—¢ã«ç™ºå°„ã•ã‚Œã¦ã„ã‚‹ã‹ãƒã‚§ãƒƒã‚¯
					if(enemyShot[i].alive){
						// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’å‹•ã‹ã™
						enemyShot[i].move();
						
						// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
						ctx.arc(
							enemyShot[i].position.x,
							enemyShot[i].position.y,
							enemyShot[i].size,
							0, Math.PI * 2, false
						);
						
						// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
						ctx.closePath();
					}
				}
				
				// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã®è‰²ã‚’è¨­å®šã™ã‚‹
				ctx.fillStyle = ENEMY_SHOT_COLOR;
				
				// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’æã
				ctx.fill();
				
				// ãƒœã‚¹ -------------------------------------------------------
				// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
				ctx.beginPath();
				
				// ãƒœã‚¹ã®å‡ºç¾ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
				if(boss.alive){
					// ãƒœã‚¹ã‚’å‹•ã‹ã™
					boss.move();
					
					// ãƒœã‚¹ã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
					ctx.arc(
						boss.position.x,
						boss.position.y,
						boss.size,
						0, Math.PI * 2, false
					);
					
					// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
					ctx.closePath();
				}
				
				// ãƒœã‚¹ã®è‰²ã‚’è¨­å®šã™ã‚‹
				ctx.fillStyle = BOSS_COLOR;
				
				// ãƒœã‚¹ã‚’æã
				ctx.fill();
				
				// ãƒ“ãƒƒãƒˆ -------------------------------------------
				// ãƒ‘ã‚¹ã®è¨­å®šã‚’é–‹å§‹
				
				// ã™ã¹ã¦ã®ãƒ“ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
				for(i = 0; i < BOSS_BIT_COUNT; i++){
                    // ãƒ“ãƒƒãƒˆã®å‡ºç¾ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
					if(bit[i].alive){
						// ãƒ“ãƒƒãƒˆã‚’å‹•ã‹ã™
						bit[i].move();
						
                        // ãƒ“ãƒƒãƒˆã‚’æããƒ‘ã‚¹ã‚’è¨­å®š
                        ctx.beginPath();
                        ctx.moveTo(boss.position.x,
                            boss.position.y);
                        ctx.lineTo(bit[i].position.x, bit[i].position.y);
                        ctx.stroke();
                        ctx.closePath();
                    // ãƒ“ãƒƒãƒˆã®è‰²ã‚’è¨­å®šã™ã‚‹
				// ctx.fillStyle = BOSS_BIT_COLOR;
				
                // ãƒ“ãƒƒãƒˆã‚’æã
                ctx.fillStyle = BOSS_COLOR;
				ctx.fill();
                        
                        ctx.beginPath();
						ctx.arc(
							bit[i].position.x,
							bit[i].position.y,
							bit[i].size,
							0, Math.PI * 2, false
						);
						ctx.closePath();
                    // ãƒ“ãƒƒãƒˆã®è‰²ã‚’è¨­å®šã™ã‚‹
				ctx.fillStyle = BOSS_BIT_COLOR;
				
				// ãƒ“ãƒƒãƒˆã‚’æã
				ctx.fill();
						// ã‚·ãƒ§ãƒƒãƒˆã‚’æ‰“ã¤ã‹ã©ã†ã‹ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã®å€¤ã‹ã‚‰ãƒã‚§ãƒƒã‚¯
						// if(bit[i].param % 25 === 0){
						// 	// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
						// 	for(j = 0; j < ENEMY_SHOT_MAX_COUNT; j++){
						// 		if(!enemyShot[j].alive){
						// 			// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã‚’æ–°è¦ã«ã‚»ãƒƒãƒˆã™ã‚‹
						// 			p = bit[i].position.distance(chara.position);
						// 			p.normalize();
						// 			enemyShot[j].set(bit[i].position, p, 4, 1.5);
									
						// 			// 1å€‹å‡ºç¾ã•ã›ãŸã®ã§ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
						// 			break;
						// 		}
						// 	}
						// }
						
						// ãƒ‘ã‚¹ã‚’ã„ã£ãŸã‚“é–‰ã˜ã‚‹
                    }
                    
				}
				
				
				// è¡çªåˆ¤å®š ---------------------------------------------------
				// ã™ã¹ã¦ã®è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã‚’èª¿æŸ»ã™ã‚‹
				for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
					// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
					if(charaShot[i].alive){
						// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã¨ã‚¨ãƒãƒŸãƒ¼ã¨ã®è¡çªåˆ¤å®š
						for(j = 0; j < ENEMY_MAX_COUNT; j++){
							// ã‚¨ãƒãƒŸãƒ¼ã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
							if(enemy[j].alive){
								// ã‚¨ãƒãƒŸãƒ¼ã¨è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã¨ã®è·é›¢ã‚’è¨ˆæ¸¬
								p = enemy[j].position.distance(charaShot[i].position);
								if(p.length() < enemy[j].size){
									// è¡çªã—ã¦ã„ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
									enemy[j].alive = false;
									charaShot[i].alive = false;
									
									// ã‚¹ã‚³ã‚¢ã‚’æ›´æ–°ã™ã‚‹ãŸã‚ã«ã‚¤ãƒ³ã‚¯ãƒªãƒ¡ãƒ³ãƒˆ
									score++;
									
									// è¡çªãŒã‚ã£ãŸã®ã§ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
									break;
								}
							}
						}
						
						// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã¨ãƒœã‚¹ãƒ“ãƒƒãƒˆã¨ã®è¡çªåˆ¤å®š
						for(j = 0; j < BOSS_BIT_COUNT; j++){
							// ãƒ“ãƒƒãƒˆã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
							if(bit[j].alive){
								// ãƒ“ãƒƒãƒˆã¨è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã¨ã®è·é›¢ã‚’è¨ˆæ¸¬
								p = bit[j].position.distance(charaShot[i].position);
								if(p.length() < bit[j].size){
									// è¡çªã—ã¦ã„ãŸã‚‰è€ä¹…å€¤ã‚’ãƒ‡ã‚¯ãƒªãƒ¡ãƒ³ãƒˆã™ã‚‹
									bit[j].life--;
									
									// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
									charaShot[i].alive = false;
									
									// è€ä¹…å€¤ãŒãƒžã‚¤ãƒŠã‚¹ã«ãªã£ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
									if(bit[j].life < 0){
										bit[j].alive = false;
										score += 3;
									}
									
									// è¡çªãŒã‚ã£ãŸã®ã§ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
									break;
								}
							}
						}
						
						// ãƒœã‚¹ã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
						if(boss.alive){
							// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã¨ãƒœã‚¹ã¨ã®è¡çªåˆ¤å®š
							p = boss.position.distance(charaShot[i].position);
							if(p.length() < boss.size){
								// è¡çªã—ã¦ã„ãŸã‚‰è€ä¹…å€¤ã‚’ãƒ‡ã‚¯ãƒªãƒ¡ãƒ³ãƒˆã™ã‚‹
								boss.life--;
								
								// è‡ªæ©Ÿã‚·ãƒ§ãƒƒãƒˆã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
								charaShot[i].alive = false;
								
								// è€ä¹…å€¤ãŒãƒžã‚¤ãƒŠã‚¹ã«ãªã£ãŸã‚‰ã‚¯ãƒªã‚¢
								if(boss.life < 0){
									score += 10;
									run = false;
									message = 'CLEAR !!';
								}
							}
						}
					}
				}
				
				// è‡ªæ©Ÿã¨ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã¨ã®è¡çªåˆ¤å®š
				for(i = 0; i < ENEMY_SHOT_MAX_COUNT; i++){
					// ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã®ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’ãƒã‚§ãƒƒã‚¯
					if(enemyShot[i].alive){
						// è‡ªæ©Ÿã¨ã‚¨ãƒãƒŸãƒ¼ã‚·ãƒ§ãƒƒãƒˆã¨ã®è·é›¢ã‚’è¨ˆæ¸¬
						p = chara.position.distance(enemyShot[i].position);
						if(p.length() < chara.size){
							// è¡çªã—ã¦ã„ãŸã‚‰ç”Ÿå­˜ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
							chara.alive = false;
							
							// è¡çªãŒã‚ã£ãŸã®ã§ãƒ‘ãƒ©ãƒ¡ãƒ¼ã‚¿ã‚’å¤‰æ›´ã—ã¦ãƒ«ãƒ¼ãƒ—ã‚’æŠœã‘ã‚‹
							run = false;
							message = 'GAME OVER !!';
							break;
						}
					}
				}
				break;
		}
		
		// HTMLã‚’æ›´æ–°
		info.innerHTML = 'SCORE: ' + (score * 100) + ' ' + message;
		
		// ãƒ•ãƒ©ã‚°ã«ã‚ˆã‚Šå†å¸°å‘¼ã³å‡ºã—
		if(run){setTimeout(arguments.callee, fps);}
	})();
};


// - event --------------------------------------------------------------------
function mouseMove(event){
	// ãƒžã‚¦ã‚¹ã‚«ãƒ¼ã‚½ãƒ«åº§æ¨™ã®æ›´æ–°
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

function mouseDown(event){
	// ãƒ•ãƒ©ã‚°ã‚’ç«‹ã¦ã‚‹
	fire = true;
}

function keyDown(event){
	// ã‚­ãƒ¼ã‚³ãƒ¼ãƒ‰ã‚’å–å¾—
	var ck = event.keyCode;
	
	// Escã‚­ãƒ¼ãŒæŠ¼ã•ã‚Œã¦ã„ãŸã‚‰ãƒ•ãƒ©ã‚°ã‚’é™ã‚ã™
	if(ck === 27){run = false;}
}


