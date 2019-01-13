/*敌人类*/
/*虫子横向一格：100，纵向一格：70*/
/*速度在300-400之间*/
class Enemy {
	// 敌人的图片，用一个我们提供的工具函数来轻松的加载文件

	constructor(x, y) {
		this.y = y;
		this.x = x;
		this.speed = Math.round((Math.random() + 6) * 60);
		this.sprite = 'images/enemy-bug.png';
	}


	// 此为游戏必须的函数，用来更新敌人的位置
	// 参数: dt ，表示时间间隙
	update(dt) {
		// 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
		// 都是以同样的速度运行的
		this.x = this.x > 600 ? -100 : this.x + this.speed*dt;
	}

	// 此为游戏必须的函数，用来在屏幕上画出敌人，
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
/*玩家横向一格：100，纵向70*/
class Player {
	constructor(x, y) {
		this.sprite = 'images/char-boy.png';
		this.x = x;
		this.y = y;
	}

	update() {

	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	/*玩家根据键盘输入的↑↓←→移动*/
	handleInput(key) {
		if (this.x >= 0 && this.y >= 0 && this.x <= 400 && this.y <= 350) {
			switch (key) {
				case 'up':
					this.y -= 70;
					if (this.y === 0){
						alert('你赢啦！');
						this.y = 280;
					}
					break;
				case 'down':
					if (this.y < 350) {
						this.y += 70;
					}
					break;
				case 'left':
					if (this.x > 0) {
						this.x -= 100;
					}
					break;
				case 'right':
					if (this.x < 400) {
						this.x += 100;
					}
					break;
				default:
					break;
			}
		}
	}
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

/*随机生成虫子的y坐标*/
const randomY = () => {
	const array = [70, 140, 210];
	let index = Math.floor(Math.random() * array.length);
	return array[index];
};

/*实例化玩家*/
const player = new Player(200, 280);

/*实例化虫子*/
let allEnemies = [];
const initEnemies = function (count = 3) {
	for (let i = 0; i < count; i++) {
		allEnemies.push(new Enemy(-Math.round(Math.random() * 1000 + 100), randomY()));
	}
};
initEnemies(4);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
	const allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
