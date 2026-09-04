# ⚠NOTICE⚠

`NOTICE.md`ではコードを書く上で注意すべきことを書き留めたファイルです。プレイヤーは見る必要がないので飛ばしていいです。

### `script.js`上の注意

- `Array.forEach()`はなるべく使わず、`Array`の全要素に処理を適用したい場合は`for(let i = 0; i < Array.length; i++){statement}`で表す  
  **理由**  
  `Array.forEach()`は処理が遅くなるから。  
  
  **注意!**
  `for(let i = 0; i < Array.length; i++){statement}`ではうまく作動せず論理エラーになる場合がある。そういうときは`Array.forEach()`を使ってみても良いと思う。(というかやったほうがいいと思う)
