const designContainer = document.querySelector(".game_container");
const designs = document.querySelectorAll(".design");
const playBtn = document.querySelector(".play");
const reloadBtn = document.querySelector(".reload");
const gameArea = document.querySelector(".game_area");
const lifeInfo = document.querySelector(".life");
const scoreInfo = document.querySelector(".score");
const gameOver = document.querySelector(".game_over");

let life = 5;
let score = 0;
let enemySelectedSrc = "./svgs/cherrybomb-remix.svg";

playBtn.addEventListener("click", () => {
    designContainer.style.transform = "translateY(-100vh)";
});

reloadBtn.addEventListener("click", () => {
    const enemies = gameArea.querySelectorAll(".enemy");
    if(enemies.length){ return false}
    gameOver.classList.remove("active");
    life = 5;
    score = 0;
    updateScore();
    const timerId = setInterval(() => {
        if(life === 0){
            updateScore();
            gameOver.classList.add("active");
            return clearInterval(timerId);
        }
        generateEnemies();

    }, 600);
});

designs.forEach(design => {
    design.addEventListener("click", () => {
        const enemy = design.querySelector("img");
        enemySelectedSrc = enemy.attributes["data-image"].value;
        reloadBtn.style.display = "flex";
        const timerId = setInterval(() => {
            if(life === 0){
                updateScore();
                gameOver.classList.add("active");
                return clearInterval(timerId);
            }
            generateEnemies();

        }, 600);
        return designContainer.style.transform = "translateY(-200vh)";
    });
});

const generateEnemies = () => {
    const div = document.createElement("div");
    div.classList.add("enemy");
    const img = document.createElement("img");
    img.src = enemySelectedSrc;
    img.alt = "Enemy";
    div.appendChild(img);
    const leftPos = Math.floor(Math.random() * 80);
    div.style.left = leftPos + "%";

    gameArea.appendChild(div);
    div.addEventListener("click", () => {
        
        if(life > 0){
		div.remove();
		score += 1
		updateScore();
	};
        
    });
    div.addEventListener("animationend", () => {
        life -= 1;
        if(life < 0){ life = 0}
        div.remove();
        updateScore();
    });
}   
const updateScore = () => {
    lifeInfo.textContent = `Life: ${life}`;
    scoreInfo.textContent = `Score: ${score}`;
}
