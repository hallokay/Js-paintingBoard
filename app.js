
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('controls_color');
const range = document.getElementById('control_range');
const modeBtn = document.getElementById('control_mode');
const saveBtn = document.getElementById('control_save');

const INITIAL_COLOR = "#000";

canvas.width = 500;
canvas.height = 300;

// 기본 배경 하얀색으로 만들어주기
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}
function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;  
    //페인팅 지점을 정해줘야되기때문에 필요
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    //내가 클릭하고 움직이면 이부분은 작동하지 않아
    //시작점을 정하기위해 보이지 않는 선(좌표)이 따라다니는 것

    } else {
        ctx.lineTo(x, y);
        // 경로의 마지막점에 눈에 보이는 선을 그릴 시작점
        ctx.stroke();
    };
}   


function handleCanvasFill(){
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    //만약 filling 이 true이면 채우기를 실행하는 거니까
    // 아니면 계속 브러시로 됨
}

function handleCM(e) {
    e.preventDefault();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    //캔버스 색 채우기
    canvas.addEventListener('click', handleCanvasFill);
    //마우스 우클릭 기본 메뉴 없애기
    canvas.addEventListener('contextmenu', handleCM)

} 


// 색 바꾸기

function handleColorClick(e) {
   const color = e.target.style.backgroundColor;
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
}

// 브러시 크기 조절

function handleRangeChage(e){
    const brushSize = e.target.value;
    ctx.lineWidth = brushSize;
}

if(range) {
    range.addEventListener('input', handleRangeChage);
}

// 색채우기버튼
function handleModeBtn() {
    if(filling === true){
        filling = false;
        modeBtn.innerText = 'paint'; 
    } else {
        filling = true;
        modeBtn.innerText = 'brush'
    }
}

if(modeBtn) {
    modeBtn.addEventListener('click', handleModeBtn)
}



// 이미지 저장
function saveImg(){
    // 그림판을 이미지로 가져오기
    const img = canvas.toDataURL();
    //가상의 a태그 만든다
    const link = document.createElement('a');
    //경로를 캔버스 경로로 넣어준다
    link.href = img;
    //다운로드 이름을 정한다
    link.download = 'userImg';
    //임의로 클릭을 준다
    link.click();
}
if(saveBtn) {
     saveBtn.addEventListener('click', saveImg)
}