var cityNumber = 6;
var Algorithm = 1;
//algotith == 0 || 1; 
var cities = [];
var Gpath = [];
var Gdistance = null;
var cPath = [];
var cDistance = 0;
var newBool = true;
var percentage = 0;
var numLoops = 0;
var setOrder;
var isNotEnd = true;
function Distance(x1,y1,x2,y2){
  let difX = x2-x1;
  let difY = y2-y1;
  return Math.sqrt((difX*difX)+(difY*difY));
}
function factorial(num){
  if(num == 1){
    return 1;
  }else{
    return num * factorial(num-1)
  }
}
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  for(let i =0;i<cityNumber;i++){
    let radius = 10;
    let x = random(radius,width-radius)
    let y = random(radius+20,height-radius)
    cities.push(new City(x,y,i,radius))
    cPath.push(i)
  }
  setOrder = new Array(cPath.length-1).fill(0);
}

function draw() {
  let path = undefined;
  background(255)
  for(let city of cities){
    city.draw();
  }
  if(Algorithm == 0){
    path = find();
  }
  if(Algorithm == 1 && isNotEnd){
    path = find2();
    numLoops++
  }
  let percentage = ((numLoops/factorial(cityNumber))*100).toFixed(cityNumber/2);
  stroke(0)
  strokeWeight(1)
  fill(0)
  textSize(20)
  text(`${percentage}%`,6,20)
  if(path != undefined){
    dislength(path)
  }
  stroke(0)
  strokeWeight(5)
  for(let i = 0;i<Gpath.length-1;i++){
    line(Gpath[i].x,Gpath[i].y,Gpath[i+1].x,Gpath[i+1].y)
  }
}

function isRepeated(arr){
  for (let i = 0; i < arr.length; i++) {
    let isBool = false;
    for(let j = i;j<arr.length;j++){
      if(arr[i] == arr[j] && i != j){
        isBool = true;
      }
    }
    if(isBool){
      return true;
    }
  }
  return false;
}

function find(){
  let path = cPath;
  if(numLoops == 0){
    numLoops++;
  }
    while(newBool){

        let isAllMatch = true;
        for(let j =0;j<path.length;j++){
            if(path.length-1 != path[j]){
                isAllMatch = false;
            }
        }
        if(isAllMatch){
            newBool = false;
            break;
        }
        path[path.length-1]++;
        for (let i = path.length-1; i >= 0; i--) {
            if(path[i] > path.length-1 && i>0){
                path[i] = 0;
                path[i-1]+= 1;
            }
        }
        
        if(!isRepeated(path)){
          cPath = path;
          numLoops++;
          return path;
          //console.log(path);
        }
        //console.log(path);
    }
}
function find2(){

  let innerBool = false; 
  for (let i = 0; i < setOrder.length; i++) {
    if(setOrder[i] != setOrder.length-i){
      innerBool = true;
    }
  }
  if(!innerBool){
    isNotEnd = false
  };
  
  function possibleCombo(path){
    let newPath = [];
    let num = 0;
    function combo(path){
        //console.log(path);
        if (path.length <= 1) {
            if(path.length == 0){
                return ;
            }
            newPath.push(...path.slice(0,1));
        }else{

            let temp = path[0];
            path[0] = path[setOrder[num]];
            path[setOrder[num]] = temp;
            newPath.push(...path.slice(0,1));
            num++;
            combo(path.slice(1,))
        }
    }
    combo(path)
    return newPath;
}

  let len = setOrder.length;
  for(let i = len-1;i>=0;i--){
    if(setOrder[i] > len-i && i != 0){
        setOrder[i] = 0;
        setOrder[i-1]++;
    }
  }
  //console.log(setOrder)
  let tempPath = possibleCombo(cPath);
  setOrder[len-1]++;
  return tempPath;
}
const binearySearch = (array,key) =>{
  let mid = Math.floor(array.length/2);
  if(array.length == 1){
    return array[0];
}
  //console.log(`mid : ${mid}`);
  if (mid >= 1) {
      if (array[mid].name == key) {
          return array[mid]
      } else if (array[mid].name < key) {
          //console.log(` searching in ${array.slice(mid)}`);
          binearySearch(array.slice(mid),key);
      }else if (array[mid].name > key) {
          //console.log(` searching in ${array.slice(0,mid)}`);
          binearySearch(array.slice(0,mid),key);
      };
  } else {
      console.log(`${key} not found`);
  }
  

};

function dislength(path){
  let tempPath = [];
  let distance = 0;
  let maxI = path.length;
  let maxJ = cities.length;

  for(let i=0;i<path.length;i++){
    binearySearch(cities,path[i]);
  }

  for(let i =0;i<maxI;i++){
    for(let j = 0;j<maxJ;j++){
      if(path[i] == cities[j].name){
        tempPath[i] = cities[j];
      }
    }
  };
  stroke(255,0,0);
  strokeWeight(3)
  for(let i = 0;i<tempPath.length-1;i++){
    line(tempPath[i].x,tempPath[i].y,tempPath[i+1].x,tempPath[i+1].y)
  }
  for(let i = 0;i<tempPath.length-1;i++){
    distance += Distance(tempPath[i].x,tempPath[i].y,tempPath[i+1].x,tempPath[i+1].y)
  }
  if(Gdistance > distance||Gdistance == null){
    Gpath = tempPath;
    Gdistance = distance;
  }
  //console.log(path,distance);
  //console.log(Gpath,Gdistance);
}


//styling below

var rangeBar = document.getElementById("cityRange");
var cityNum = document.getElementById("cityNumViewer");

rangeBar.addEventListener("change",(event)=>{
  cityNum.innerText = event.target.value;
  cityNumber = event.target.value;
  noLoop()
  Algorithm = 1;
  cities = [];
  Gpath = [];
  Gdistance = null;
  cPath = [];
  cDistance = 0;
  newBool = true;
  percentage = 0;
  numLoops = 0;
  setOrder;
  isNotEnd = true;
  setup()
  loop()
})
document.body.addEventListener("click",()=>{
  noLoop()
  Algorithm = 1;
  cities = [];
  Gpath = [];
  Gdistance = null;
  cPath = [];
  cDistance = 0;
  newBool = true;
  percentage = 0;
  numLoops = 0;
  setOrder;
  isNotEnd = true;
  setup()
  loop()
})
window.addEventListener("resize",()=>{
  noLoop()
  Algorithm = 1;
  cities = [];
  Gpath = [];
  Gdistance = null;
  cPath = [];
  cDistance = 0;
  newBool = true;
  percentage = 0;
  numLoops = 0;
  setOrder;
  isNotEnd = true;
  setup()
  loop()
})