var getValueInarr = function(arr,key_name,value_name,key){
  for(let index = 0;index < arr.length;index++){
    let i = arr[index];
    if(i[value_name] == key ){
      return i[key_name];
    }
  }
}

//-
var minus=function(n,m){
  n=typeof n =="string"?n:numToString(n);
  m=typeof m =="string"?m:numToString(m);
  var F= n.indexOf(".")!=-1?handleNum(n):[n,0,0],
    S= m.indexOf(".")!=-1?handleNum(m):[m,0,0],
    l1=F[2],
    l2=S[2],
    L=l1>l2?l1:l2,
    T=Math.pow(10,L);
  return (F[0]*T+F[1]*T/Math.pow(10,l1)-S[0]*T-S[1]*T/Math.pow(10,l2))/T
}
// *
var multiply = function(n,m){
  n=typeof n =="string"?n:numToString(n);
  m=typeof m =="string"?m:numToString(m);
  var F= n.indexOf(".")!=-1?handleNum(n):[n,0,0],
    S= m.indexOf(".")!=-1?handleNum(m):[m,0,0],
    l1=F[2],
    l2=S[2],
    L=l1>l2?l1:l2,
    T=Math.pow(10,L);
  return ((F[0]*T+F[1]*T/Math.pow(10,l1))*(S[0]*T+S[1]*T/Math.pow(10,l2)))/T/T
}
// /
var  division = function(n,m){
  n=typeof n =="string"?n:numToString(n);
  m=typeof m =="string"?m:numToString(m);
  var F= n.indexOf(".")!=-1?handleNum(n):[n,0,0],
    S= m.indexOf(".")!=-1?handleNum(m):[m,0,0],
    l1=F[2],
    l2=S[2],
    L=l1>l2?l1:l2,
    T=Math.pow(10,L);
  return ((F[0]*T+F[1]*T/Math.pow(10,l1))/(S[0]*T+S[1]*T/Math.pow(10,l2)))
}
var numToString  = function(tempArray){
  if(Object.prototype.toString.call(tempArray) == "[object Array]"){
    var temp=tempArray.slice();
    for(var i,l=temp.length;i<l;i++){
      temp[i]=typeof temp[i] == "number"?temp[i].toString():temp[i];
    }
    return temp;
  }
  if(typeof tempArray=="number"){
    return tempArray.toString();
  }
  return []
}
//+
var  plus = function(n,m){
  n=typeof n =="string"?n:numToString(n);
  m=typeof m =="string"?m:numToString(m);
  var F= n.indexOf(".")!=-1?handleNum(n):[n,0,0],
    S= m.indexOf(".")!=-1?handleNum(m):[m,0,0],
    l1=F[2],
    l2=S[2],
    L=l1>l2?l1:l2,
    T=Math.pow(10,L);
  var num = (F[0]*T+F[1]*T/Math.pow(10,l1)+S[0]*T+S[1]*T/Math.pow(10,l2))/T;
  num = Number(num).toFixed(2);
  num = Number(num);
  return num;
}

var  handleNum = function(n){
  n=typeof n !=="string"?n+"":n;
  var temp= n.split(".");
  temp.push(temp[1].length);
  return temp
}


module.exports ={
  getValueInarr,
  tMath:{
    plus,
    minus,
    multiply,
    division
  },
}
