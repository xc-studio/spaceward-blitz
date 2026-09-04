# _Library.md_

ここには敵の配列などを追加して編集しやすいようにするものである。
#### ステージを作るときにどの敵がどこにあるかがわかりやすくなる

- `enemyImageArray`のライブラリー
  - 0 番目 **enemyShip1**
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/enemyship1.png?v=1727675918452">
    width: 64  
    height: 64  
    スピード速め
    
  - 1 番目 **enemyShip2**
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/enemy2.png?v=1727676031855">
    width: 64  
    height: 64  
    スピード速め
    
  - 2 番目 **UFO1**
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/UFO1.png?v=1727677023926">
    width: 64  
    height: 64  
    周期: 100frame  
    弾丸ID: 3 番目 enemyBullet1
    
  - 3 番目 **enemyBullet1**
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/enemyBullet1.png?v=1728047822759">
    width: 32  
    height: 32  
    speed: 5  
    **※これは弾丸です。体力がなく体力メソッドには`null`が入っています**  
    
    _プレイヤーの方を最初に向き後はその方向に行きます_
    
  - 4 番目 **UFO2**
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/UFO2.png?v=1727685904680">
    width: 64  
    height: 64  
    周期: 75frame  
    弾丸ID: a  
    **⚠特別記号  
      "a"はenemyBullet1を一つとenemyBullet2を等間隔で12個位配置する特別なプロパティです**
    
  - 5 番目 **enemyBullet2**  
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/enemyBullet2.png?v=1728355454115">
    width: 32  
    height: 32  
    speed: 5  
    **※これは弾丸です。体力はありません。この先弾丸である場合"弾丸"とだけ表示します**  
    
    _決められた方向に行きます  
    回転要素で指定します_
  
  - 6 番目 **enemyBullet3**
    <img src="https://cdn.glitch.global/dbe0dd5a-594b-4eea-8f44-fca4b4042a12/enemyBullet1.png?v=1728047822759">
    width: 32  
    height: 32  
    speed: 15  
    **弾丸** 
    
    _enemyBullet1とほぼ一緒で唯一違うのはスピードだけです。三倍速いです。_
    
