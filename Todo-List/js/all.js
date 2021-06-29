//全域變數
//data
let data =[
  {
    complete:false,
    content: '早上掃地'
  },{
    complete: true,
    content: '晚上吃飽飽'
  },{
    complete: false,
    content: '下午睡覺'
  }
];
//pagination狀態
let paginationStatus = 'all';

//click事件
//list 完成代辦事項
const list = document.querySelector('.list');
list.addEventListener('click',function(e){
  if(e.target.getAttribute('class')=="checkBox"){
    let index = e.target.getAttribute('data-num');
    data[index].complete = true;
    renderData();
  }
})
//plusBtn 輸入代辦事項
const listInput = document.querySelector('.listInput');
const plusBtn = document.querySelector('.plusBtn');
plusBtn.addEventListener('click',function(e){
  if(listInput.value==""){
    alert('沒事做不要亂按餒');
    return;
  }
  let bj4 = {complete:false};
  bj4.content = listInput.value;
  data.push(bj4);
  renderData();
})
//showList 顯示代辦事項
const showList = document.querySelector('.showList');
const showTodo = document.querySelector('.showTodo');
const showCompleted = document.querySelector('.showCompleted');
const showAll = document.querySelector('.showAll');
showList.addEventListener('click',function(e){
  let status = e.target.getAttribute('class');
  if(status == 'showAll'){
    paginationStatus = 'all';
  }else if(status == 'showTodo'){
    paginationStatus = 'todo';
  }else if(status == 'showCompleted'){
    paginationStatus =  'completed';
  }
  renderData();
})
//cleanCompleted 清除已完成
const cleanCompleted = document.querySelector('.cleanCompleted');
cleanCompleted.addEventListener('click',function(e){
  cleanCompletedData();
  renderData();
})
//function()
// 將data渲染至網頁
function renderData(show=paginationStatus){
  let str='';
  if(show=="all"){
    data.forEach(function(item,index){
      if(item.complete){
        str+=`<li><i class="fas fa-check" data-num="${index}"></i><p class="line-through color-lighten-black">${item.content}</p><div class="cancel_area"></div></li>`;
      }else{
        str+=`<li><div class="checkBox" data-num="${index}"></div><p>${item.content}</p><div class="cancel_area"></div></li>`;
      }
      });
  }else if(show=='todo'){
    data.forEach(function(item,index){
      if(!item.complete){
        str+=`<li><div class="checkBox" data-num="${index}"></div><p>${item.content}</p><div class="cancel_area"></div></li>`;
      }
      console.log(str);
    })
  }else if(show=='completed'){
    data.forEach(function(item,index){
      if(item.complete){
        str+=`<li><i class="fas fa-check" data-num="${index}"></i><p class="line-through color-lighten-black">${item.content}</p><div class="cancel_area"></div></li>`
      }
    })
  }

  list.innerHTML = str;
  renderTodoNum();
}
//清除data內已完成項目
function cleanCompletedData(){
  let dota=[];
  data.forEach(function(item,index,arr){
    if(!item.complete){
      dota.push(item);
    }
  })
  data=dota;
}
//計算有幾個待完成項目
const todoNum = document.querySelector('.todoNum');
function accTodo(){
  let num = 0;
  data.forEach(function(item,index){
    if(!item.complete){
      num++;
    }
  })
  return num;
}
//將計算後的待完成渲染至HTML
function renderTodoNum(){
  let num = accTodo();
  todoNum.textContent = `${num} 個待完成項目`
}
renderData();

