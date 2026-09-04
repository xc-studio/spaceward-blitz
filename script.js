"use strict";

let canvas;
let ctx;

let インポート = false;

let totalSecond = 0;

let 攻撃力 = 0;

let レベル;

let 総出現敵数;

let 撃墜数;

let コイン = 0;

let グレード = 0;

let 必要コイン数 = 100;

let number;

const crunch = new Audio("");

const oops = new Audio("");

const pew = new Audio("");

const playerimage = new Image();
playerimage.src = "assets/battleship.png";

const playerimage2 = new Image();
playerimage2.src = "assets/battleship2.png";

const bulletimage = new Image();
bulletimage.src = "assets/bullet.png";

const bulletimage2 = new Image();
bulletimage2.src = "assets/bullet2.png";

const medalimage1true = new Image();
medalimage1true.src = "assets/medal_1_true.png";

const medalimage2true = new Image();
medalimage2true.src = "assets/medal_2_true.png";

const medalimage3true = new Image();
medalimage3true.src = "assets/medal_3_true.png";

const medalimage1false = new Image();
medalimage1false.src = "assets/medal_1_false.png";

const medalimage2false = new Image();
medalimage2false.src = "assets/medal_2_false.png";

const medalimage3false = new Image();
medalimage3false.src = "assets/medal_3_false.png";

const enemyimage1 = new Image();
enemyimage1.src = "assets/enemyship1.png";

const enemyimage2 = new Image();
enemyimage2.src = "assets/enemy2.png";

const enemyimage3 = new Image();
enemyimage3.src = "assets/UFO1.png";

const enemyimage4 = new Image();
enemyimage4.src = "assets/UFO2.png";

const enemyimage5 = new Image();
enemyimage5.src = "https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/beam.png?v=1730187290507";

const enemyBullet1 = new Image();
enemyBullet1.src = "assets/enemyBullet.png";

const enemyBullet2 = new Image();
enemyBullet2.src = "assets/enemyBullet2.png";

const enemyBeam1 = new Image();
enemyBeam1.src = "https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/blaster.png?v=1730188061470";

const enemyimageArray = [
    {
        width: 64,
        height: 64,
        HP: 2,
        image: enemyimage1,
        周期: 100,
        弾丸ID: null,
        frame: null,
        atack: 10,
    },
    {
        width: 64,
        height: 64,
        HP: 5,
        image: enemyimage2,
        周期: 100,
        弾丸ID: null,
        frame: null,
        atack: 15,
    },
    {
        width: 64,
        height: 64,
        HP: 20,
        image: enemyimage3,
        周期: 100,
        弾丸ID: 3,
        frame: null,
        atack: 30,
    },
    {
        width: 32,
        height: 32,
        HP: null,
        image: enemyBullet1,
        周期: 100,
        弾丸ID: null,
        speed: 5,
        frame: 10,
        variX: null,
        variY: null,
        atack: 5,
    },
    {
        width: 64,
        height: 64,
        HP: 30,
        image: enemyimage4,
        周期: 200,
        弾丸ID: "a",
        frame: null,
        atack: 30,
    },
    {
        width: 32,
        height: 32,
        HP: null,
        image: enemyBullet2,
        周期: 100,
        弾丸ID: null,
        speed: 5,
        frame: 10,
        variX: null,
        variY: null,
        atack: 8,
    },
    {
        width: 32,
        height: 32,
        HP: null,
        image: enemyBullet1,
        周期: 100,
        弾丸ID: null,
        speed: 15,
        frame: 10,
        variX: null,
        variY: null,
        atack: 5,
    },
    {
        width: 64,
        height: 64,
        HP: null,
        image: enemyimage5,
        周期: 6,
        弾丸ID: "beam",
        speed: 5,
        frame: null,
        atack: 15,
        消滅秒数: 500,
    },
    {
        width: 64,
        height: 1400,
        HP: null,
        image: enemyBeam1,
        周期: 10,
        弾丸ID: "blaster",
        speed: 5,
        frame: null,
        atack: 3,
    },
    {
        width: 64,
        height: 64,
        HP: 20,
        image: enemyimage3,
        周期: 200,
        弾丸ID: 3,
        frame: null,
        atack: 30,
    },
];

const キャンバス幅 = 1200;
const キャンバス高さ = 675;

let playerX = 600;
let playerY = 337.5;

let playerX変化量 = 0;
let playerY変化量 = 0;

let タッチ移動先 = null;

let playerHP;

let 背景星空配列 = [];

for (let i = 0; i < 200; i++) {
    背景星空配列[i] = {
        x: 乱数生成(キャンバス幅),
        y: 乱数生成(キャンバス高さ),
        大きさ: 乱数生成(2) + 1,
    };
}

let 経過フレーム数 = 0;
let playerimageアニメーション = 0;

let 無敵フレーム数 = 0;

let 弾丸 = [];

let 敵 = [];

let 移動速度 = 0.5;

let 経過フレーム数start = 0;

let ボタン = [
    {
        x: 50,
        y: 50,
        width: 200,
        height: 100,
        value: "ステージ1",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 300,
        y: 50,
        width: 200,
        height: 100,
        value: "ステージ2",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 550,
        y: 50,
        width: 200,
        height: 100,
        value: "ステージ3",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 50,
        y: 180,
        width: 200,
        height: 100,
        value: "ステージ4",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 300,
        y: 180,
        width: 200,
        height: 100,
        value: "ステージ5",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 550,
        y: 180,
        width: 200,
        height: 100,
        value: "ステージ6",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 800,
        y: 300,
        width: 300,
        height: 100,
        value: "グレードアップ",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 150,
        y: 320,
        width: 200,
        height: 100,
        value: "IMPORT",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
    {
        x: 450,
        y: 320,
        width: 200,
        height: 100,
        value: "EXPORT",
        fillColor: "#007700",
        strokeColor: "#00ff00",
        strokeWidth: 10,
    },
];

let メダル = [
    [
        {
            x: 20,
            boolean: false,
            imageTrue: medalimage1true,
            imageFalse: medalimage1false,
        },
        {
            x: 140,
            boolean: false,
            imageTrue: medalimage2true,
            imageFalse: medalimage2false,
        },
        {
            x: 260,
            boolean: false,
            imageTrue: medalimage3true,
            imageFalse: medalimage3false,
        },
    ],
    [
        {
            x: 20,
            boolean: false,
            imageTrue: medalimage1true,
            imageFalse: medalimage1false,
        },
        {
            x: 140,
            boolean: false,
            imageTrue: medalimage2true,
            imageFalse: medalimage2false,
        },
        {
            x: 260,
            boolean: false,
            imageTrue: medalimage3true,
            imageFalse: medalimage3false,
        },
    ],
    [
        {
            x: 20,
            boolean: false,
            imageTrue: medalimage1true,
            imageFalse: medalimage1false,
        },
        {
            x: 140,
            boolean: false,
            imageTrue: medalimage2true,
            imageFalse: medalimage2false,
        },
        {
            x: 260,
            boolean: false,
            imageTrue: medalimage3true,
            imageFalse: medalimage3false,
        },
    ],
    [
        {
            x: 20,
            boolean: false,
            imageTrue: medalimage1true,
            imageFalse: medalimage1false,
        },
        {
            x: 140,
            boolean: false,
            imageTrue: medalimage2true,
            imageFalse: medalimage2false,
        },
        {
            x: 260,
            boolean: false,
            imageTrue: medalimage3true,
            imageFalse: medalimage3false,
        },
    ],
    [
        {
            x: 20,
            boolean: false,
            imageTrue: medalimage1true,
            imageFalse: medalimage1false,
        },
        {
            x: 140,
            boolean: false,
            imageTrue: medalimage2true,
            imageFalse: medalimage2false,
        },
        {
            x: 260,
            boolean: false,
            imageTrue: medalimage3true,
            imageFalse: medalimage3false,
        },
    ],
    [
        {
            x: 20,
            boolean: false,
            imageTrue: medalimage1true,
            imageFalse: medalimage1false,
        },
        {
            x: 140,
            boolean: false,
            imageTrue: medalimage2true,
            imageFalse: medalimage2false,
        },
        {
            x: 260,
            boolean: false,
            imageTrue: medalimage3true,
            imageFalse: medalimage3false,
        },
    ],
];

let ボタンフラグ = "off";

let ゲームの状態 = "start";

const ホームボタン = {
    x: 20,
    y: 20,
    width: 70,
    height: 70,
    value: "X",
    fillColor: "#cc0000",
    strokeColor: "#ff5555",
    strokeWidth: 8,
};

const プレイボタン = {
    x: 930,
    y: 570,
    width: 230,
    height: 80,
    value: "PLAY",
    fillColor: "#007700",
    strokeColor: "#00ff00",
    strokeWidth: 8,
};

function ホームボタン内(pointX, pointY) {
    return (
        ホームボタン.x < pointX &&
        pointX < ホームボタン.x + ホームボタン.width &&
        ホームボタン.y < pointY &&
        pointY < ホームボタン.y + ホームボタン.height
    );
}

function プレイボタン内(pointX, pointY) {
    return (
        プレイボタン.x < pointX &&
        pointX < プレイボタン.x + プレイボタン.width &&
        プレイボタン.y < pointY &&
        pointY < プレイボタン.y + プレイボタン.height
    );
}

function ホームボタンを描く() {
    ctx.beginPath();
    ctx.fillStyle = ホームボタン.fillColor;
    ctx.strokeStyle = ホームボタン.strokeColor;
    ctx.lineWidth = ホームボタン.strokeWidth;
    ctx.rect(ホームボタン.x, ホームボタン.y, ホームボタン.width, ホームボタン.height);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "45px orbitron";
    ctx.fillText(ホームボタン.value, ホームボタン.x + ホームボタン.width / 2, ホームボタン.y + ホームボタン.height / 2);
}

function プレイボタンを描く() {
    ctx.beginPath();
    ctx.fillStyle = プレイボタン.fillColor;
    ctx.strokeStyle = プレイボタン.strokeColor;
    ctx.lineWidth = プレイボタン.strokeWidth;
    ctx.rect(プレイボタン.x, プレイボタン.y, プレイボタン.width, プレイボタン.height);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = プレイボタン.strokeColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "35px orbitron";
    ctx.fillText(プレイボタン.value, プレイボタン.x + プレイボタン.width / 2, プレイボタン.y + プレイボタン.height / 2);
}

function ホームへ戻る() {
    タッチ移動先 = null;
    playerX変化量 = 0;
    playerY変化量 = 0;
    ゲームの状態 = "start";
    ホーム画面();
}

function キャンバス座標を取得(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: ((evt.clientX - rect.left) / rect.width) * キャンバス幅,
        y: ((evt.clientY - rect.top) / rect.height) * キャンバス高さ,
    };
}

function タッチ座標を更新(evt) {
    if (ゲームの状態 !== "game" || evt.touches.length === 0) {
        return;
    }
    タッチ移動先 = キャンバス座標を取得(evt.touches[0]);
    evt.preventDefault();
}

window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = キャンバス幅;
    canvas.height = キャンバス高さ;
    インポート処理(getLocalStorage("save"));
    canvas.addEventListener("click", (evt) => {
        const point = キャンバス座標を取得(evt);
        if (ゲームの状態 !== "start" && ホームボタン内(point.x, point.y)) {
            ホームへ戻る();
            return;
        }
        if (
            typeof ゲームの状態 === "number" &&
            ゲームの状態 >= 1 &&
            ゲームの状態 <= 6 &&
            プレイボタン内(point.x, point.y)
        ) {
            ゲームスタート(ゲームの状態);
            return;
        }
        if (ゲームの状態 === "save") {
            ステージ選択(0);
        } else {
            if (ボタンフラグ === "on") {
                const point = キャンバス座標を取得(evt);
                const pointX = point.x;
                const pointY = point.y;
                let フラグ = true;
                for (let index = 0; index < ボタン.length; index++) {
                    if (
                        ボタン[index].x + ボタン[index].width > pointX &&
                        pointX > ボタン[index].x &&
                        ボタン[index].y + ボタン[index].height > pointY &&
                        pointY > ボタン[index].y
                    ) {
                        フラグ = false;
                        if (index === 6) {
                            ステージ選択("GradeUp");
                        } else if (index === 7) {
                            ステージ選択("Import");
                        } else if (index === 8) {
                            ステージ選択("Export");
                        } else {
                            ステージ選択(index + 1);
                        }
                    }
                }
                if (フラグ === true) {
                    ステージ選択(0);
                }
            }
        }
    });

    canvas.addEventListener("touchstart", タッチ座標を更新, { passive: false });
    canvas.addEventListener("touchmove", タッチ座標を更新, { passive: false });
    canvas.addEventListener("touchend", (evt) => {
        const point = キャンバス座標を取得(evt.changedTouches[0]);
        if (ゲームの状態 !== "start" && ホームボタン内(point.x, point.y)) {
            ホームへ戻る();
        }
        タッチ移動先 = null;
    });

    スタート画面();

    window.addEventListener("keydown", keydownfunc, true);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Right" || e.key === "ArrowRight") {
            playerX変化量 = 5;
        }
        if (e.key === "Left" || e.key === "ArrowLeft") {
            playerX変化量 = -5;
        }
        if (e.key === "Up" || e.key === "ArrowUp") {
            playerY変化量 = -5;
        }
        if (e.key === "Down" || e.key === "ArrowDown") {
            playerY変化量 = 5;
        }
        if (
            !(ゲームの状態 === "start") &&
            !(ゲームの状態 === "game") &&
            !(ゲームの状態 === "gameClear") &&
            !(ゲームの状態 === "save") &&
            !(ゲームの状態 === "save2")
        ) {
            if (e.key === "Enter" || e.key === 13) {
                ゲームスタート(ゲームの状態);
            }
        }
    });
    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            playerX変化量 = 0;
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            playerY変化量 = 0;
        }
        if (playerX変化量 === 0 && playerY変化量 === 0) {
            document.removeEventListener("touchmove", noscroll);
            document.removeEventListener("wheel", noscroll);
        }
    });
    document.getElementById("a").addEventListener("change", (e) => {});
    const submit = document.getElementById("a");
    submit.addEventListener("change", (e) => {
        var file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = () => {
            インポート処理(reader.result);
        };
    });
    document.getElementById("c").addEventListener("click", () => {
        if (ゲームの状態 === "save2") {
            copyToClipboard();
        }
    });
};

function copyToClipboard() {
    ゲームの状態 = "save2";
    setTimeout(消す, 1000);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    document.getElementById("d").innerHTML = "";
    document.getElementById("c").type = "hidden";
    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "40px orbitron";
    ctx.fillText("どこかをタップして戻る", 10, 620);
    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "50px orbitron";
    ctx.fillText("ファイルをダウンロードしてください。", 600, 150);
    セーブコード発行();
    const copytext = document.getElementById("d").textContent;
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(copytext).then(function () {
            ctx.beginPath();
            ctx.fillStyle = "#00ff00";
            ctx.font = "70px orbitron";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("ダウンロード成功", 300, 500);
        });
    } else {
        copytext.select();
        document.execCommand("copy");
        ctx.beginPath();
        ctx.fillStyle = "#ff5555";
        ctx.font = "70px orbitron";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("コピーに失敗しました", 300, 500);
    }
}

function 消す() {
    if (ゲームの状態 === "save2") {
        ゲームの状態 = "save2";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        document.getElementById("d").innerHTML = "";
        document.getElementById("c").type = "hidden";
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "40px orbitron";
        ctx.fillText("どこかをタップして戻る", 10, 620);
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "50px orbitron";
        ctx.fillText("ファイルをダウンロードしてください。", 600, 150);
        セーブコード発行();
    }
}

function 乱数生成(最大値) {
    return Math.floor(Math.random() * 最大値);
}

function 星空描画() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, キャンバス幅, キャンバス高さ);
    ctx.fill();
    for (const element of 背景星空配列) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(element.x, element.y, element.大きさ, 0, 360);
        ctx.fill();
    }
}

function 画面を描く() {
    if (ゲームの状態 !== "game") {
        return;
    }
    星空描画();
    弾を消す();
    if (無敵フレーム数 >= 15) {
        無敵フレーム数 = 0;
        敵.forEach((enemy, enemyIndex) => {
            if (
                playerX - 25 < enemy.x + enemy.width &&
                playerX + 25 > enemy.x &&
                playerY - 25 < enemy.y + enemy.height &&
                playerY + 25 > enemy.y
            ) {
                playerHP -= enemy.攻撃力;
                レベル = 0;
                if (playerHP <= 0) {
                    ゲームの状態 = "gameOver";
                }
            }
        });
    }
    ctx.beginPath();
    ctx.textAlign = "right";
    ctx.fillStyle = "white";
    ctx.fillText(`HP ${playerHP} / 200`, 1200, 650);
    if (タッチ移動先 !== null) {
        const xの差 = タッチ移動先.x - playerX;
        const yの差 = タッチ移動先.y - playerY;
        const 距離 = 距離を測る(xの差, yの差);
        const タッチ移動速度 = 8;
        if (距離 > 0) {
            const 移動量 = Math.min(タッチ移動速度, 距離);
            playerX += (xの差 / 距離) * 移動量;
            playerY += (yの差 / 距離) * 移動量;
        }
    } else {
        playerX += playerX変化量;
        playerY += playerY変化量;
    }
    playerX = Math.max(25, Math.min(キャンバス幅 - 25, playerX));
    playerY = Math.max(25, Math.min(キャンバス高さ - 25, playerY));

    経過フレーム数++;
    if (playerimageアニメーション === 1) {
        playerimageアニメーション === 0;
    } else {
        playerimageアニメーション === 1;
    }
    経過フレーム数 = 0;

    if (playerimageアニメーション === 0) {
        ctx.drawImage(playerimage, playerX - 25, playerY - 25);
    } else if (playerimageアニメーション === 1) {
        ctx.drawImage(playerimage2, playerX - 25, playerY - 25);
    }
    無敵フレーム数++;
    敵描画();
    レベルを描く();
    ホームボタンを描く();
    if (ゲームの状態 === "gameOver") {
        ゲームオーバー処理();
    } else if (ゲームの状態 === "gameClear") {
        ゲームクリア処理2(number);
    } else if (ゲームの状態 === "game") {
        requestAnimationFrame(画面を描く);
    }
}

function 弾丸発射() {
    pew.currentTime = 0;
    pew.play();
    弾丸[弾丸.length] = {
        x: playerX - 10,
        y: playerY - 25,
        種類: 0,
    };
    if (レベル >= 100) {
        弾丸[弾丸.length] = {
            x: playerX - 30,
            y: playerY - 25,
            種類: 0,
        };
        弾丸[弾丸.length] = {
            x: playerX + 10,
            y: playerY - 25,
            種類: 0,
        };
    }
    if (レベル >= 200) {
        弾丸[弾丸.length] = {
            x: playerX - 50,
            y: playerY - 25,
            種類: 0,
        };
        弾丸[弾丸.length] = {
            x: playerX + 30,
            y: playerY - 25,
            種類: 0,
        };
    }
    if (ゲームの状態 === "game") {
        setTimeout(弾丸発射, Math.floor(300 - (レベル / 999) * 150));
    }
}

function 敵生成(x, y, ID, 角度) {
    敵[敵.length] = {
        x: x,
        y: y,
        種類: ID,
        角度: 角度,
        width: enemyimageArray[ID].width,
        height: enemyimageArray[ID].height,
        体力: enemyimageArray[ID].HP,
        最大体力: enemyimageArray[ID].HP,
        フレーム: 0,
        間隔: enemyimageArray[ID].周期,
        弾丸ID: enemyimageArray[ID].弾丸ID,
        自機追尾フレーム数: enemyimageArray[ID].frame,
        speed: enemyimageArray[ID].speed,
        攻撃力: enemyimageArray[ID].atack,
        消えろ: 0,
    };
    if (enemyimageArray[ID].HP != null) {
        総出現敵数++;
    }
}

function 敵描画() {
    if (!(敵.length === 0)) {
        for (let index = 0; index < 敵.length; index++) {
            敵[index].フレーム = 敵[index].フレーム + 1;
            ctx.beginPath();
            ctx.save();
            ctx.translate(敵[index].x + 敵[index].width / 2, 敵[index].y + 敵[index].height / 2);
            ctx.rotate((敵[index].角度 * Math.PI) / 180);
            ctx.drawImage(enemyimageArray[敵[index].種類].image, -敵[index].width / 2, -敵[index].height / 2);
            ctx.beginPath();
            ctx.lineWidth = 6;
            ctx.restore();
            if (敵[index].体力 != null) {
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = "#909090";
                ctx.moveTo(敵[index].x + 敵[index].width / 2 - 50, 敵[index].y - 10);
                ctx.lineTo(敵[index].x + 敵[index].width / 2 + 50, 敵[index].y - 10);
                ctx.stroke();
                if (敵[index].体力 / 敵[index].最大体力 < 0.33333) {
                    ctx.strokeStyle = "#ff0000";
                } else if (敵[index].体力 / 敵[index].最大体力 < 0.66666) {
                    ctx.strokeStyle = "#ffff00";
                } else {
                    ctx.strokeStyle = "#00ff00";
                }
                ctx.beginPath();
                ctx.moveTo(敵[index].x + 敵[index].width / 2 - 50, 敵[index].y - 10);
                ctx.lineTo(
                    敵[index].x + 敵[index].width / 2 - 50 + (敵[index].体力 / 敵[index].最大体力) * 100,
                    敵[index].y - 10,
                );
                ctx.stroke();
            }
            if (敵[index].y + enemyimageArray[敵[index].種類].y > キャンバス高さ) {
                敵.splice(index, 1);
            }
            if (敵[index].フレーム == 敵[index].間隔 && 敵[index].弾丸ID != null) {
                敵[index].フレーム = 0;
                if (敵[index].弾丸ID === "a") {
                    敵生成(敵[index].x + 敵[index].width / 4, 敵[index].y + 敵[index].height / 4, 3, 180);
                    for (let dt = 0; dt <= 360; dt += 30) {
                        敵生成(敵[index].x, 敵[index].y, 5, dt);
                    }
                } else if (敵[index].弾丸ID === "beam") {
                    if (敵[index].消えろ === 0) {
                        敵生成(
                            敵[index].x + 敵[index].width / 4,
                            敵[index].y + 敵[index].height / 4,
                            8,
                            敵[index].角度,
                        );
                        敵[index].消えろ = 1;
                    } else {
                        敵.splice(index, 1);
                    }
                } else if (敵[index].弾丸ID === "blaster") {
                } else {
                    敵生成(
                        敵[index].x + 敵[index].width / 2,
                        敵[index].y + 敵[index].height / 2,
                        敵[index].弾丸ID,
                        180,
                    );
                }
            }
            if (敵[index].フレーム <= 敵[index].自機追尾フレーム数) {
                if (敵[index].種類 === 3 || 敵[index].種類 === 6) {
                    敵[index].variX =
                        ((playerX - 敵[index].x) / 距離を測る(playerX - 敵[index].x, 敵[index].y - playerY)) *
                        敵[index].speed;
                    敵[index].variY =
                        ((playerY - 敵[index].y) / 距離を測る(playerX - 敵[index].x, 敵[index].y - playerY)) *
                        敵[index].speed;
                } else if (敵[index].種類 === 5) {
                    敵[index].variX = 敵[index].speed * Math.cos(((敵[index].角度 - 90) * Math.PI) / 180);
                    敵[index].variY = 敵[index].speed * Math.sin(((敵[index].角度 - 90) * Math.PI) / 180);
                }
            }
            if (敵[index].種類 === 0 || 敵[index].種類 === 1) {
                敵[index].variX = 2 * Math.cos(((敵[index].角度 - 90) * Math.PI) / 180);
                敵[index].variY = 2 * Math.sin(((敵[index].角度 - 90) * Math.PI) / 180);
                敵[index].x += 敵[index].variX;
                敵[index].y += 敵[index].variY;
            } else if (敵[index].種類 === 3 || 敵[index].種類 === 5 || 敵[index].種類 === 6) {
                敵[index].x += 敵[index].variX;
                敵[index].y += 敵[index].variY;
            } else if (敵[index].種類 === 7 || 敵[index].種類 === 8) {
            } else if (敵[index].種類 === 9) {
                敵[index].y += 0.1;
            } else {
                敵[index].y = 敵[index].y + 移動速度;
            }
            if (
                敵[index].y >= 750 ||
                敵[index].x + 敵[index].width < 0 ||
                敵[index].x - 敵[index].width > canvas.width
            ) {
                敵.splice(index, 1);
            }
        }
    }
}

function 弾丸描画() {
    if (!(弾丸.length === 0)) {
        弾丸.forEach((弾丸e, 弾丸index) => {
            ctx.beginPath();
            if (弾丸e.種類 === 0) {
                ctx.drawImage(bulletimage, 弾丸e.x, 弾丸e.y, 20, 20);
                弾丸e.y = 弾丸e.y - 8;
                if (弾丸e.y < -32) {
                    弾丸.splice(弾丸index, 1);
                }
            } else if (弾丸e.種類 === 1) {
                ctx.drawImage(bulletimage2, 弾丸e.x, 弾丸e.y, 20, 20);
                弾丸e.y = 弾丸e.y - 12;
                if (弾丸e.y < -32) {
                    弾丸.splice(弾丸index, 1);
                }
            }
        });
    }
}

function noscroll(evt) {
    evt.preventDefault();
}

var keydownfunc = function (event) {
    var code = event.keyCode;
    switch (code) {
        case 37:
        case 38:
        case 39:
        case 40:
            event.preventDefault();
    }
};
function スタート画面() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "100px orbitron";
    ctx.fillText("SPACEWARD BLITZ", canvas.width / 2, canvas.height / 2 + 25);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "100px orbitron";
    ctx.fillText("SPACEWARD BLITZ", canvas.width / 2, canvas.height / 2 + 25);
    setTimeout(スタート画面2, 1500);
    //setTimeout(弾丸発射, 2000);
    //setTimeout(画面を描く, 2000);
}

function スタート画面2() {
    if (経過フレーム数 < 30) {
        経過フレーム数++;
        ctx.beginPath();
        ctx.fillStyle = "#00000010";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        requestAnimationFrame(スタート画面2);
    } else {
        ステージ選択(0);
    }
}

function 弾を消す() {
    弾丸.forEach((bullet, bulletIndex) => {
        敵.forEach((enemy, enemyIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + 5 > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + 20 > enemy.y
            ) {
                if (enemy.体力 !== null) {
                    弾丸.splice(bulletIndex, 1);
                    enemy.体力 -= 攻撃力;
                    playAudio(crunch);
                    if (enemy.体力 <= 0) {
                        レベル += enemy.最大体力;
                        if (レベル > 999) {
                            レベル = 999;
                        }
                        撃墜数++;
                        敵.splice(enemyIndex, 1);
                    }
                }
            }
        });
    });
    弾丸描画();
}

function ボタン生成() {
    ボタンフラグ = "on";
    for (let d = 0; d < ボタン.length; d++) {
        ctx.beginPath();
        ctx.fillStyle = ボタン[d].fillColor;
        ctx.strokeStyle = ボタン[d].strokeColor;
        ctx.lineWidth = ボタン[d].strokeWidth;
        ctx.rect(ボタン[d].x, ボタン[d].y, ボタン[d].width, ボタン[d].height);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = ボタン[d].strokeColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "35px orbitron";
        ctx.fillText(ボタン[d].value, ボタン[d].x + ボタン[d].width / 2, ボタン[d].y + ボタン[d].height / 2);
    }
}

function ホーム画面() {
    ボタンフラグ = "off";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "gold";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "60px orbitron";
    ctx.fillText(`COIN = ${コイン}`, 800, 50);
    ctx.beginPath();
    ctx.fillStyle = "silver";
    ctx.font = "50px orbitron";
    if (グレード === 999) {
        ctx.fillText("GRADE  MAX", 800, 120);
    } else {
        ctx.fillText(`GRADE ${グレード}`, 800, 120);
    }
    if (グレード < 999) {
        ctx.fillStyle = "#8888ff";
        ctx.fillText(`COST ${必要コイン数}`, 800, 180);
    }
    ボタン生成();
}

function ステージ選択(ステージID) {
    ゲームの状態 = ステージID;
    ホーム画面();
    if (typeof ステージID === "number") {
        ctx.beginPath();
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 10;
        ctx.moveTo(0, 450);
        ctx.lineTo(canvas.width, 450);
        ctx.stroke();
        document.getElementById("a").type = "hidden";
        document.getElementById("s").type = "hidden";
        document.getElementById("c").type = "hidden";
        document.getElementById("d").innerHTML = "";
        ホームステージ詳細(ステージID);
    }
    if (ステージID === "GradeUp") {
        document.getElementById("a").type = "hidden";
        document.getElementById("s").type = "hidden";
        document.getElementById("c").type = "hidden";
        document.getElementById("d").innerHTML = "";
        if (コイン >= 必要コイン数) {
            コイン -= 必要コイン数;
            グレード++;
            必要コイン数 = 100 + グレード;
            if (必要コイン数 > 999) {
                必要コイン数 = 999;
            }
            if (グレード > 999) {
                グレード = 999;
            }
            ホーム画面();
        } else {
            ctx.beginPath();
            ctx.fillStyle = "#007700";
            ctx.strokeStyle = "#00ff00";
            ctx.lineWidth = 20;
            ctx.rect(100, 187.5, 1000, 300);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = "#00ff00";
            ctx.font = "100px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("コインが足りません", 600, 337.5);
        }
    }
    if (ステージID === "Import") {
        ゲームの状態 = "save";
        インポート = true;
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        document.getElementById("a").type = "file";
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "40px orbitron";
        ctx.fillText("どこかをタップして戻る", 10, 620);
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "100px orbitron";
        ctx.fillText("セーブファイルを選択", 600, 150);
        document.getElementById("a").value = "";
        document.getElementById("d").innerHTML = "";
        document.getElementById("c").type = "hidden";
        document.getElementById("a").click();
    }
    if (ステージID === "Export") {
        ゲームの状態 = "save2";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();
        document.getElementById("d").innerHTML = "";
        document.getElementById("c").type = "hidden";
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = "40px orbitron";
        ctx.fillText("どこかをタップして戻る", 10, 620);
        ctx.beginPath();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "50px orbitron";
        ctx.fillText("ファイルをダウンロードしてください。", 600, 150);
        セーブコード発行();
    }
}

function ホームステージ詳細(ステージ番号) {
    ctx.beginPath();
    ctx.font = "40px orbitron";
    ctx.fillStyle = "#007700";
    if (1 <= ステージ番号 && ステージ番号 <= 6) {
        ctx.rect(30, 495, ctx.measureText("MEDAL").width, 10);
        ctx.fill();
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("MEDAL", 30, 500);
        ctx.fillText(`STAGE${ステージ番号}`, 500, 500);
        for (let ru = 0; ru < メダル[ステージ番号 - 1].length; ru++) {
            ctx.beginPath();
            if (メダル[ステージ番号 - 1][ru].boolean === true) {
                ctx.drawImage(メダル[ステージ番号 - 1][ru].imageTrue, メダル[ステージ番号 - 1][ru].x, 550);
            } else {
                ctx.drawImage(メダル[ステージ番号 - 1][ru].imageFalse, メダル[ステージ番号 - 1][ru].x, 550);
            }
        }
        プレイボタンを描く();
    } else if (ステージ番号 === 0) {
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.fillText("ステージが選択されていません", 50, 500);
        ctx.fillText("ステージを選択して下さい", 50, 580);
        ctx.drawImage(medalimage1true, 650, 480, 60, 60);
        ctx.fillStyle = "white";
        ctx.fillText("= ノーダメージ", 715, 520);
        ctx.drawImage(medalimage2true, 650, 545, 60, 60);
        ctx.fillText("= 100%撃墜", 715, 585);
        ctx.drawImage(medalimage3true, 650, 610, 60, 60);
        ctx.fillText("= 50%以上撃墜", 715, 650);
    }
}

async function 待つ(ms) {
    let フレイム = 0;
    let Msecond = ms * 0.2;
    while (フレイム <= Msecond) {
        if (ゲームの状態 === "game") {
            await oneMS待つ();
            フレイム++;
        } else {
            break;
        }
    }
    return new Promise((resolve) => setTimeout(resolve, 1));
}

function oneMS待つ() {
    return new Promise((resolve) => setTimeout(resolve, 1));
}

function 角度を図る(x, y) {
    return (Math.atan2(y, x) * 180) / Math.PI + 90;
}

function 距離を測る(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

function レベルを描く() {
    ctx.beginPath();
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.font = "50px orbitron";
    ctx.fillStyle = "white";
    ctx.fillText("Level " + レベル, 0, キャンバス高さ - 25);
}

function ゲームオーバー処理() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    星空描画();
    ctx.fillStyle = "crimson";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.font = "170px orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.strokeText("Game Over", canvas.width / 2, canvas.height / 2);

    let savetext = "";
    let Grade = グレード;
    savetext = `${savetext}${String(Math.floor(Grade / 100))}`;
    Grade -= Math.floor(Grade / 100) * 100;
    savetext = `${savetext}${String(Math.floor(Grade / 10))}`;
    Grade -= Math.floor(Grade / 10) * 10;
    savetext = `${savetext}${Grade}`;
    for (let d = 0; d < 6; d++) {
        if (メダル[d][0].boolean === false) {
            if (メダル[d][1].boolean === false) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}0`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}3`;
                }
            } else if (メダル[d][1].boolean === true) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}2`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}6`;
                }
            }
        } else if (メダル[d][0].boolean === true) {
            if (メダル[d][1].boolean === false) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}1`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}5`;
                }
            } else if (メダル[d][1].boolean === true) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}4`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}7`;
                }
            }
        }
    }
    let Coin = コイン;
    savetext = `${savetext}${String(Math.floor(Coin / 100))}`;
    Coin -= Math.floor(Coin / 100) * 100;
    savetext = `${savetext}${String(Math.floor(Coin / 10))}`;
    Coin -= Math.floor(Coin / 10) * 10;
    savetext = `${savetext}${Coin}`;
    setLocalStorage("save", savetext);
    setTimeout(ホーム画面, 1500);
}

async function インポート処理(str) {
    if (isNumber(str) === true) {
        if (str.length === 12) {
            let boolean判定 = true;
            for (let d = 0; d < 6; d++) {
                if (Number(str.substr(d + 3, 1)) >= 8) {
                    boolean判定 = false;
                }
            }
            if (boolean判定 === true) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = "#00ff00";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = "120px orbitron";
                ctx.fillText("Success!", 600, 150);
                グレード = Number(str.substr(0, 1)) * 100 + Number(str.substr(1, 1)) * 10 + Number(str.substr(2, 1));
                必要コイン数 = 100 + グレード;
                if (必要コイン数 > 999) {
                    必要コイン数 = 999;
                }
                for (let d = 0; d < 6; d++) {
                    メダルインポート(d, Number(str.substr(d + 3, 1)));
                }
                コイン = Number(str.substr(9, 1)) * 100 + Number(str.substr(10, 1)) * 10 + Number(str.substr(11, 1));
            } else {
                アラート処理();
            }
        } else {
            アラート処理();
        }
    } else {
        if (str !== "") {
            アラート処理();
        }
    }
    ctx.beginPath();
    ctx.fillStyle = "#00ff00";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = "40px orbitron";
    ctx.fillText("どこかをタップして戻る", 10, 620);
    document.getElementById("a").value = "";
}

function isNumber(str) {
    if (/^\d+$/.test(str)) {
        return true;
    } else {
        return false;
    }
}

function メダルインポート(index, array) {
    if (array === 0) {
        メダル[index][0].boolean = false;
        メダル[index][1].boolean = false;
        メダル[index][2].boolean = false;
    } else if (array === 1) {
        メダル[index][0].boolean = true;
        メダル[index][1].boolean = false;
        メダル[index][2].boolean = false;
    } else if (array === 2) {
        メダル[index][0].boolean = false;
        メダル[index][1].boolean = true;
        メダル[index][2].boolean = false;
    } else if (array === 3) {
        メダル[index][0].boolean = false;
        メダル[index][1].boolean = false;
        メダル[index][2].boolean = true;
    } else if (array === 4) {
        メダル[index][0].boolean = true;
        メダル[index][1].boolean = true;
        メダル[index][2].boolean = false;
    } else if (array === 5) {
        メダル[index][0].boolean = true;
        メダル[index][1].boolean = false;
        メダル[index][2].boolean = true;
    } else if (array === 6) {
        メダル[index][0].boolean = false;
        メダル[index][1].boolean = true;
        メダル[index][2].boolean = true;
    } else if (array === 7) {
        メダル[index][0].boolean = true;
        メダル[index][1].boolean = true;
        メダル[index][2].boolean = true;
    }
}

function セーブコード発行() {
    let savetext = "";
    let Grade = グレード;
    savetext = `${savetext}${String(Math.floor(Grade / 100))}`;
    Grade -= Math.floor(Grade / 100) * 100;
    savetext = `${savetext}${String(Math.floor(Grade / 10))}`;
    Grade -= Math.floor(Grade / 10) * 10;
    savetext = `${savetext}${Grade}`;
    for (let d = 0; d < 6; d++) {
        if (メダル[d][0].boolean === false) {
            if (メダル[d][1].boolean === false) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}0`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}3`;
                }
            } else if (メダル[d][1].boolean === true) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}2`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}6`;
                }
            }
        } else if (メダル[d][0].boolean === true) {
            if (メダル[d][1].boolean === false) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}1`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}5`;
                }
            } else if (メダル[d][1].boolean === true) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}4`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}7`;
                }
            }
        }
    }
    let Coin = コイン;
    savetext = `${savetext}${String(Math.floor(Coin / 100))}`;
    Coin -= Math.floor(Coin / 100) * 100;
    savetext = `${savetext}${String(Math.floor(Coin / 10))}`;
    Coin -= Math.floor(Coin / 10) * 10;
    savetext = `${savetext}${Coin}`;
    document.getElementById("d").innerText = savetext;
    let ary = savetext.split("");
    let blob = new Blob(ary, { type: "text/plan" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "spaceward-blitz-savecode.save";
    link.click();
}

function アラート処理() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.font = "120px orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("error", 600, 150);
    ctx.font = "50px orbitron";
    ctx.fillText("不正なコードです", 600, 300);
}

function ゲームクリア処理() {
    if (ゲームの状態 == "game") {
        ゲームの状態 = "gameClear";
    }
}

function ゲームクリア処理2(ステージ名) {
    let 撃墜率;
    if (総出現敵数 === 0) {
        撃墜率 = 0;
    } else {
        撃墜率 = Math.floor((撃墜数 / 総出現敵数) * 100);
    }
    if (撃墜数 / 総出現敵数 === 1) {
        撃墜率 = 100;
    }
    let ノーダメ = 0;
    if (playerHP === 200) {
        ノーダメ = 50;
    }
    コイン += ステージ名 * 撃墜率 + ノーダメ;
    if (コイン > 999) {
        コイン = 999;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    星空描画();
    ctx.fillStyle = "lime";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.font = "170px orbitron";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Clear", canvas.width / 2, 200);
    ctx.strokeText("Game Clear", canvas.width / 2, 200);
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.font = "80px orbitron";
    ctx.textAlign = "left";
    ctx.fillText(`撃墜率 ${撃墜率}%`, 350, 350);
    ctx.strokeText(`撃墜率 ${撃墜率}%`, 350, 350);
    if (playerHP === 200) {
        メダル[ステージ名 - 1][0].boolean = true;
    }
    if (撃墜率 >= 50) {
        メダル[ステージ名 - 1][2].boolean = true;
    }
    if (撃墜率 === 100) {
        メダル[ステージ名 - 1][1].boolean = true;
    }
    if (メダル[ステージ名 - 1][0].boolean === true) {
        ctx.drawImage(medalimage1true, 250, 450, 100, 100);
    } else {
        ctx.drawImage(medalimage1false, 250, 450, 100, 100);
    }
    if (メダル[ステージ名 - 1][1].boolean === true) {
        ctx.drawImage(medalimage2true, 550, 450, 100, 100);
    } else {
        ctx.drawImage(medalimage2false, 550, 450, 100, 100);
    }
    if (メダル[ステージ名 - 1][2].boolean === true) {
        ctx.drawImage(medalimage3true, 850, 450, 100, 100);
    } else {
        ctx.drawImage(medalimage3false, 850, 450, 100, 100);
    }

    let savetext = "";
    let Grade = グレード;
    savetext = `${savetext}${String(Math.floor(Grade / 100))}`;
    Grade -= Math.floor(Grade / 100) * 100;
    savetext = `${savetext}${String(Math.floor(Grade / 10))}`;
    Grade -= Math.floor(Grade / 10) * 10;
    savetext = `${savetext}${Grade}`;
    for (let d = 0; d < 6; d++) {
        if (メダル[d][0].boolean === false) {
            if (メダル[d][1].boolean === false) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}0`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}3`;
                }
            } else if (メダル[d][1].boolean === true) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}2`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}6`;
                }
            }
        } else if (メダル[d][0].boolean === true) {
            if (メダル[d][1].boolean === false) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}1`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}5`;
                }
            } else if (メダル[d][1].boolean === true) {
                if (メダル[d][2].boolean === false) {
                    savetext = `${savetext}4`;
                } else if (メダル[d][2].boolean === true) {
                    savetext = `${savetext}7`;
                }
            }
        }
    }
    let Coin = コイン;
    savetext = `${savetext}${String(Math.floor(Coin / 100))}`;
    Coin -= Math.floor(Coin / 100) * 100;
    savetext = `${savetext}${String(Math.floor(Coin / 10))}`;
    Coin -= Math.floor(Coin / 10) * 10;
    savetext = `${savetext}${Coin}`;
    setLocalStorage("save", savetext);
    setTimeout(ホーム画面, 2500);
}

function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
}

async function ゲームスタート(番号) {
    ボタンフラグ = "off";
    number = 番号;
    ゲームの状態 = "game";
    攻撃力 = 1;
    レベル = グレード;
    playerHP = 200;
    総出現敵数 = 0;
    撃墜数 = 0;
    弾丸 = [];
    敵 = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    画面を描く();
    弾丸発射();
    if (number === 1) {
        await 待つ(1000);
        for (let df = 0; df < 10; df++) {
            敵生成(200, -64, 0, 180);
            await 待つ(1000);
        }
        for (let df = 0; df < 10; df++) {
            敵生成(800, -64, 0, 180);
            await 待つ(1000);
        }
        敵生成(100, -64, 2, 180);
        await 待つ(12000);
        敵生成(300, -64, 2, 180);
        await 待つ(12000);
        敵生成(500, -64, 2, 180);
        await 待つ(12000);
        for (let df = 1; df < 8; df++) {
            敵生成(df * 120, -64, 0, 180);
            await 待つ(1000);
        }
        await 待つ(2000);
        for (let df = 8; df > 1; df--) {
            敵生成(df * 120, -64, 0, 180);
            await 待つ(1000);
        }
        await 待つ(2000);
        for (let df = 1; df < 8; df++) {
            敵生成(df * 120, -64, 1, 180);
            await 待つ(1500);
        }
        await 待つ(2000);
        for (let df = 8; df > 1; df--) {
            敵生成(df * 120, -64, 1, 180);
            await 待つ(1500);
        }
        await 待つ(5000);
    } else if (number === 2) {
        await 待つ(1000);
        敵生成(100, -64, 0, 180);
        await 待つ(2000);
        敵生成(600, -64, 0, 180);
        await 待つ(2000);
        敵生成(300, -64, 0, 180);
        await 待つ(2000);
        敵生成(800, -64, 2, 180);
        await 待つ(15000);
        敵生成(500, -64, 2, 180);
        await 待つ(15000);
        敵生成(300, -64, 2, 180);
        await 待つ(15000);
        敵生成(100, -64, 2, 180);
        await 待つ(15000);
        for (let dr = 0; dr <= 6; dr++) {
            敵生成(300, 20, 5, dr * 30 + 90);
        }
        await 待つ(1000);
        for (let dr = 0; dr <= 6; dr++) {
            敵生成(900, 20, 5, dr * 30 + 90);
        }
        await 待つ(1000);
        for (let dr = 0; dr <= 6; dr++) {
            敵生成(600, 20, 5, dr * 30 + 90);
        }
        await 待つ(5000);
        敵生成(600, -64, 4, 180);
        await 待つ(15000);
        for (let fr = 100; fr <= 1200; fr += 200) {
            for (let dr = 0; dr <= 6; dr++) {
                敵生成(fr, 20, 5, dr * 30 + 90);
            }
        }
        敵生成(300, -64, 2, 180);
        await 待つ(7000);
        敵生成(900, -64, 2, 180);
        await 待つ(25000);
    } else if (number === 3) {
        await 待つ(1000);
        for (let f = 100; f < 1200; f += 200) {
            for (let d = 0; d < 360; d += 30) {
                敵生成(f, 0, 5, d);
            }
        }
        await 待つ(5000);
        for (let f = 0; f < 1200; f += 200) {
            for (let d = 0; d < 360; d += 30) {
                敵生成(f, 0, 5, d);
            }
        }
        for (let d = 0; d < 6; d++) {
            敵生成(50, -64, 0, d * 2 + 120);
            await 待つ(1500);
            敵生成(1150, -64, 0, 240 - d * 2);
            await 待つ(1500);
        }
        await 待つ(2500);
        for (let d = 0; d < 80; d++) {
            敵生成(Math.random() * canvas.width, 0, 6, 0);
            await 待つ(100);
        }
        await 待つ(1500);
        for (let d = 0; d < 18; d++) {
            敵生成(d * 64 + 24, -64, 9, 180);
        }
        await 待つ(100000);
        for (let i = 0; i < 30; i++) {
            let u = Math.floor(Math.random() * 2) * 1200;
            let y = Math.floor(Math.random() * 27) * 25;
            for (let d = 0; d < 360; d += 30) {
                敵生成(u, y, 5, d);
            }
            await 待つ(500);
        }
        await 待つ(4000);
        for (let i = 0; i < 100; i++) {
            敵生成(0, Math.floor(Math.random() * 135) * 5, 5, 90);
            await 待つ(100);
            敵生成(1200, Math.floor(Math.random() * 135) * 5, 5, 270);
            await 待つ(100);
        }
    } else if (number === 4) {
        await 待つ(1000);
        qw();
        we();
        await 待つ(25000);
        qw();
        for (let i = 0; i < 7; i++) {
            敵生成(Math.floor(Math.random() * 20) * 60, -64, 0, 180);
            await 待つ(2000);
        }
        await 待つ(5000);
    } else if (number === 5) {
        for (let d = 0; d < 18; d++) {
            敵生成(d * 64 + 24, -64, 2, 180);
        }
        for (let i = 0; i < 5; i++) {
            for (let f = 100; f < 1200; f += 200) {
                for (let d = 0; d < 360; d += 30) {
                    敵生成(f, 0, 5, d);
                }
            }
            await 待つ(2500);
            for (let f = 0; f < 1200; f += 200) {
                for (let d = 0; d < 360; d += 30) {
                    敵生成(f, 0, 5, d);
                }
            }
            await 待つ(2500);
        }
        we();
        for (let i = 0; i < 10; i++) {
            敵生成(Math.floor(Math.random() * 20) * 60, -64, 0, 180);
            await 待つ(2000);
        }
        for (let i = 0; i < 10; i++) {
            敵生成(Math.floor(Math.random() * 20) * 60, -64, 4, 180);
            await 待つ(4000);
        }
    } else if (number === 6) {
        for (let i = 0; i < 100; i++) {
            敵生成(0, Math.floor(Math.random() * 135) * 5, 5, 90);
            await 待つ(100);
            敵生成(1200, Math.floor(Math.random() * 135) * 5, 5, 270);
            await 待つ(100);
        }
    }
    ゲームクリア処理();
}

async function qw() {
    for (let i = 0; i < 30; i++) {
        let u = Math.floor(Math.random() * 2) * 1200;
        let y = Math.floor(Math.random() * 27) * 25;
        for (let d = 0; d < 360; d += 30) {
            敵生成(u, y, 5, d);
        }
        await 待つ(500);
    }
}

async function we() {
    for (let i = 0; i < 50; i++) {
        敵生成(0, Math.floor(Math.random() * 135) * 5, 5, 90);
        await 待つ(200);
        敵生成(1200, Math.floor(Math.random() * 135) * 5, 5, 270);
        await 待つ(200);
    }
}

function setLocalStorage(key, value) {
    //localStorage.removeItem(key);
    localStorage.setItem(key, value);
}

function getLocalStorage(key) {
    const obj = localStorage.getItem(key);
    return obj;
}
