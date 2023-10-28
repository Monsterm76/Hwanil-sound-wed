const frame = document.querySelector("section"); 
const lists = frame.querySelectorAll("article"); 

const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const audio = frame.querySelectorAll("audio");

let num = 0;


const deg = 45; 
const len = lists.length -1 ; // 순번이 0부터 시작하므로 전체 개수에서 1을 뺌 

let i = 0 ; 
let active = 0; 
function initMusic(){
    for( let el of audio ){
        el.pause();
        el.load();
        el.closest("article").querySelector(".pic").classList.remove("on");
    }
}


// 전달받은 리스트(lists)의 모든 요소를 처음에 비활성화 상태로 만들고, 인덱스(index)의 요소만을 활성화
function activation(index, lists){
    for( let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}

//article 개수만큼 반복 

for (let el of lists) {


    let pic = el.querySelector(".pic");  
    pic.style.backgroundImage = `url(../img/member${i+1}.jpg)`;

    //각 article 요소를 45도씩 회전하고 아래로 배치 
    el.style.transform = `rotate(${deg*i}deg) translateY(-100vh)`; 
    // rotate(${deg*i}deg) : 요소를 일정 각도로 회전
    // lists : article 개수 
    // translateY(-100vh) : 요소를 세로 방향으로 화면 높이의 100%만큼 위로 이동시킴
    
    // 첫 번째 반복에서 i는 0이므로: rotate(45 * 0)deg = rotate(0deg)
    // 두 번째 반복에서 i는 1이므로: rotate(45 * 1)deg = rotate(45deg)
    // 세 번째 반복에서 i는 2이므로: rotate(45 * 2)deg = rotate(90deg)
    i++; 

   
         //각 article 요소 안쪽의 재생, 정지, 처음부터 재생 버튼을 변수에 저장
         let play = el.querySelector(".play");
         let pause = el.querySelector(".pause");
         let load = el.querySelector(".load");
      //play버튼 클릭 시, 
      play.addEventListener("click", e=>{
          let isActive = e.currentTarget.closest("article").classList.contains("on");
       // paly 버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 추가하여 활성화 
              e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
           // paly 버튼부터 audio 요소까지 탐색한 음악 재생 
            e.currentTarget.closest("article").querySelector("audio").play(); 
                     
      });
  
      //pause버튼 클릭 시 
      pause.addEventListener("click", e=>{
                 
          let isActive = e.currentTarget.closest("article").classList.contains("on");
         // 클래스 on 제거하여 비활성화 
              e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
              e.currentTarget.closest("article").querySelector("audio").pause();
          
                  
      });
  
      //load버튼 클릭 시
      load.addEventListener("click", e=>{
          let isActive = e.currentTarget.closest("article").classList.contains("on");
      
              e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
              e.currentTarget.closest("article").querySelector("audio").load();   
              e.currentTarget.closest("article").querySelector("audio").play(); 
             
      });

}


//prev 버튼 클릭 시
prev.addEventListener("click", ()=>{
    initMusic();



    //num값을 증가시키며 frame 45도 만큼 증가시키며 시계 방향으로 계속 회전
    num++;  
    frame.style.transform = `rotate(${deg* num}deg)`;    
// 현재 패널의 순번이 0이면 다시 마지막 패널의 순번으로 변경
    // 그렇지 않으면 현재 패널 순번에서 1씩 감소시킴
    (active == 0 ) ? active = len : active--;
    activation(active, lists);   

});

//next 버튼 클릭시
next.addEventListener("click", ()=>{
    initMusic();


    //num값을 감소시키며 frame을 45도 만큼 감소시키며 반시계 방향으로 회전
    num--;   
    frame.style.transform = `rotate(${deg* num}deg)`;   

    (active == len ) ? active = 0 : active++; 
    activation(active, lists);
});
