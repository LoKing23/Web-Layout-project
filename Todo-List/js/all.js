//全域變數
//data

let data =[
  {
    complete:false,
    content: '消滅蜘蛛'
  },{
    complete: true,
    content: '打LOL'
  },{
    complete: true,
    content: '練習寫to-do list'
  }
];
const cancel = document.querySelectorAll('.cancel');
//pagination狀態
let paginationStatus = 'all';

const todoNum = document.querySelector('.todoNum');
//將計算後的待完成渲染至HTML
function renderTodoNum(){
  let num = accTodo();
  todoNum.textContent = `${num} 個待完成項目`
}
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
  let addNewClass = `clickStyle `;
  addNewClass += status;
  if(status == 'showAll'){
    paginationStatus = 'all';
    showTodo.setAttribute('class','showTodo');
    showCompleted.setAttribute('class','showCompleted');
  }else if(status == 'showTodo'){
    paginationStatus = 'todo';
    showCompleted.setAttribute('class','showCompleted');
    showAll.setAttribute('class','showAll');
  }else if(status == 'showCompleted'){
    paginationStatus =  'completed';
    showTodo.setAttribute('class','showTodo');
    showAll.setAttribute('class','showAll');
  }
  e.target.setAttribute('class',addNewClass);
  renderData();
})
//cleanCompleted 清除已完成
const cleanCompleted = document.querySelector('.cleanCompleted');
cleanCompleted.addEventListener('click',function(e){
  cleanCompletedData();
  renderData();
})


// 將data渲染至網頁
function renderData(show=paginationStatus){
  let str='';
  if(show=="all"){
    data.forEach(function(item,index){
      if(item.complete){
        str+=`<li>
                <i class="fas fa-check" data-num="${index}"></i>
                <div class="jcsb">
                  <p class="line-through color-lighten-black">${item.content}</p>
                  <div class="cancel" data-num="${index}">
                    <img class='cancelClick'data-num="${index}" src="cancel.jpeg" alt="cancel">
                  </div>
                </div>
              </li>`;
      }else{
        str+=`<li>
                <div class="checkBox" data-num="${index}"></div>
                <div class="jcsb">
                  <p>${item.content}</p>
                  <div class="cancel" data-num="${index}">
                      <img class='cancelClick'data-num="${index}" src="cancel.jpeg" alt="cancel">
                  </div>
                </div>
              </li>`;
      }
      });
  }else if(show=='todo'){
    data.forEach(function(item,index){
      if(!item.complete){
        str+=`<li>
                <div class="checkBox" data-num="${index}"></div>
                  <div class="jcsb">
                    <p>${item.content}</p>
                    <div class="cancel" data-num="${index}">
                      <img class='cancelClick'data-num="${index}" src="cancel.jpeg" alt="cancel">
                    </div>
                  </div>
              </li>`;
      }
      console.log(str);
    })
  }else if(show=='completed'){
    data.forEach(function(item,index){
      if(item.complete){
        str+=`<li>
                <i class="fas fa-check" data-num="${index}"></i>
                <div class="jcsb">
                  <p class="line-through color-lighten-black">${item.content}</p>
                  <div class="cancel"><img  class='cancelClick'data-num="${index}" src="cancel.jpeg" alt="cancel"></div>
                </div>
              </li>`
      }
    })
  }
  renderTodoNum();
  list.innerHTML = str;
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

function accTodo(){
  let num = 0;
  data.forEach(function(item,index){
    if(!item.complete){
      num++;
    }
  })
  return num;
}
//點擊照片刪除項目事件
list.addEventListener('click',function(e){
  let cancelImg = e.target;
  if(cancelImg.getAttribute('class')=='cancelClick'){
    let bye = -1;
    bye = cancelImg.getAttribute('data-num')
    data.splice(bye,1);
    renderData();
  }
})

renderData();
//mouseenter事件

/*//我投降 
cancel.addEventListener('mouseenter',function(e){
  console.log(e.target.getAttribute('data-num'));
  //cancel.innerHTML=`<img src="cancel.jpeg" alt="cancel">`;
})
//mouseleave事件
cancel.addEventListener('mouseleave',function(e){
  console.log(e.target.getAttribute('data-num'));
  //cancel.innerHTML="";
}) */

