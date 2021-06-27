function getMovingAvgArray(arr, lengthOfMAarray, MAindex) {
  let startIndex = arr.length - lengthOfMAarray;
  let sum = 0;
  for (let i = startIndex - MAindex; i < startIndex; i++) {
    sum += parseFloat(arr[i]);
  }
  let result = [];
  for (let i = startIndex; i < arr.length; i++) {
    sum += parseFloat(arr[i] - arr[i - MAindex]);
    result.push(parseFloat(sum / MAindex));
  }
  return result;
}

function getMovingAvgValue(arr, MAindex){
	let startIndex = arr.length - 1;
	let sum = 0;
	for(let i = startIndex - MAindex; i < startIndex; i++){
		sum += parseFloat(arr[i][4]);
	}
	return sum / MAindex;
}

module.exports = {
  getMovingAvgArray,
	getMovingAvgValue
};