const { getLastCandles } = require("./services/getCandles");
const { getMovingAvgValue, getMovingAvgArray } = require("./services/movingAverage");

let now = new Date().getTime();
let startTime = new Date("07/13/2021 09:04:00 AM").getTime();
let millis = startTime - now + 20;

let minute = 60000;

let sym = "AXSUSDT";
console.log(sym);

let principal = 1000;
let usdt = principal;
let bought = false;
let swit = 0;
let count = 0;

setTimeout(() => {
  repeatEveryMinute();
}, millis);

function repeatEveryMinute() {
  trade1();
  startTime += minute;
  let millis = startTime - new Date().getTime();
  setTimeout(repeatEveryMinute, millis);
}

async function trade() {
  let presentTime = new Date().getTime();
  const candles = await getLastCandles(sym, "1m", 100, presentTime);

  movingAvg1 = getMovingAvgValue(candles, 44);
  movingAvg2 = getMovingAvgValue(candles, 46);

  let price = parseFloat(candles[candles.length - 1][4]);
  if (movingAvg1 < movingAvg2) swit = 1;
  if (swit == 0) return;
  if (!bought && movingAvg1 > movingAvg2) {
    bought = true;
    noOfCoins = (0.99925 * usdt) / price;
    count++;
    console.log("Bought & total: " + noOfCoins * price + "count: " + count);
    usdt = 0;
  } else if (bought && movingAvg2 > movingAvg1) {
    bought = false;
    usdt = 0.99925 * noOfCoins * price;
    count++;
    console.log("Sold & total =" + usdt + "count: " + count);
    noOfCoins = 0;
  }
}

async function trade1() {
  let presentTime = new Date().getTime();
  const candles = await getLastCandles(sym, "15m", 500, presentTime);

  let movingAvg = getMovingAvgArray(candles, 10)
  let price = parseFloat(candles[candles.length - 1][4]);
  let len = movingAvg.length;

  if(!bought && movingAvg[len - 1] > movingAvg[len - 2]){
    bought = true;
    noOfCoins = (0.999 * usdt) / price;
    count++;
    console.log("Bought & total: " + noOfCoins * price + " count: " + count);
    usdt = 0;
  }else if(bought && movingAvg[len - 1] < movingAvg[len - 2]){
    bought = false;
    usdt = 0.999 * noOfCoins * price;
    count++;
    console.log(`Sold & total = ${usdt} count: ${count}`);
    noOfCoins = 0;
  }
}
