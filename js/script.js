const buttons = document.querySelector('.buttons');
// 닷을 포함한 prev,next 를 모두 감싸는 버튼의 컨테이너
const container = document.querySelector('.slider_container');
// 슬라이더의 일부분만 보여주는 컨테이너
const slider = document.querySelector('.slider_contents');
// width가 큰 모든 sliderContent가 들어있음
const buttonContainer = document.querySelector('.dot_container');
// dot 만들기 위한 dot 컨테이너라고 보면 됨
const sliderWidth = 1920;
// 슬라이더 한 장 한 장의 크기
const sliderLength = slider.childElementCount;
//ul의 자식의 갯수
let moveCheck = true;

for (let i = 0; i < sliderLength; i++) { //li 갯수만큼 반복
    const makeDiv = document.createElement('div'); //div 태그 생성
    makeDiv.classList.add('dot'); //생성한 div태그에 dot 이라는 클래스 부여 ex) <div class="dot"></div>
    buttonContainer.appendChild(makeDiv); //버튼 컨테이너 안에 방금 만든 노드 자식요소로 추가
    makeDiv.addEventListener('click', () => {
        // 생성한 dot 을 클릭했을때
        index = i + 1;
        // dot 의 인덱스는 0 번일때 슬라이드의 인덱스는 1번이 보여야하므로 슬라이더(index) 에 i+1을 대입해준것
        moveSlider(1000);
    })

}
buttonContainer.children[0].classList.add('slide_active'); // 첫번째 버튼 활성화
// 브라우저를 켰을 때 1번 li 가 보이니까 제일 처음 dot 에 색이 선택되어있어야함



const first = slider.firstElementChild.cloneNode(true);
// html로 추가하지 않고 노드복사 ul의 첫번째 자식복사
const last = slider.lastElementChild.cloneNode(true);
// html로 추가하지 않고 노드복사 ul의 마지막 자식복사

slider.appendChild(first);
// 마지막에 첫번째 자식 복사한걸 넣어줌
slider.insertBefore(last, slider.firstElementChild);
// ul의 첫번재에 마지막 자식 복사한거 넣어줌 
// ex ) 0 1 2 3 4 5 6 = 5 1 2 3 4 5 1

slider.style.width = slider.childElementCount * sliderWidth + 'px';
// ul의 스타일(너비)를 = ul의 자식갯수(li갯수) * 1000(li 하나하나의 width)

let index = 1;
// 처음 브라우저를 열었을 때 보이는 슬라이더의 인덱스는 1이어야 하니까 1을 대입함
container.children[0].style.transform = 'translateX(-' + (index * 1920) + 'px)';

buttons.children[0].addEventListener('click', prev);
buttons.children[1].addEventListener('click', next);

function prev() {
    if (moveCheck) {
        moveCheck = false;
        console.log(moveCheck);
        // 연속으로 눌러 에러가 나는 현상을 방지하기 위해 prev 버튼을 클릭하면 더 이상 클릭하지 못하게 막음
        index--;
        // prev 버튼이니 이전으로 가야하므로 --
        console.log(index);

        setTimeout(() => {
            if (index === 0) {
                // prev버튼을 눌러 인덱스가 0이 되었다면(노드 복사해서 appendChild로 넣어준 5번 화면이 되었다면)
                index = slider.childElementCount - 2;
                // 인덱스에 ul>li의 갯수에서 2를 뺀 (5번)을 대입해준다
                moveSlider(0);
            }
            moveCheck = true;
            // 왼쪽으로 가는 무빙이 끝난 후에 다시 prev 버튼을 클릭 할 수 있게 moveCheck 를 true로 바꿔줌

            console.log(index + "," + moveCheck);
        }, 1000)
        moveSlider(1000);
    }
}

function next() {
    if (moveCheck) {
        moveCheck = false;
        // 연속으로 눌러 에러가 나는 현상을 방지하기 위해 prev 버튼을 클릭하면 더 이상 클릭하지 못하게 막음
        index++;
        //  next 버튼이니 다음으로 가야하므로 ++
        console.log(index);

        setTimeout(() => {
            if (index === slider.childElementCount - 1) {
                // 버튼을 눌러 인덱스가 6이 되었다면(노드 복사해서 insertBefore(last, slider.firstElementChild);로 넣어준 1번 화면이 되었다면)
                index = 1;
                // 인덱스에 1을 대입해준다 (0번은 복사해서 넣은 5번화면이기에 1번대입)
                moveSlider(0);
            }
            console.log(index);
            moveCheck = true;
            // 오른쪽으로 가는 무빙이 끝난 후에 다시 next 버튼을 클릭 할 수 있게 moveCheck 를 true로 바꿔줌
        }, 1000)
        moveSlider(1000);
    }
}
function updateButtons() {
    for (let i = 0; i < sliderLength; i++) {
        buttonContainer.children[i].classList.remove('slide_active');
        // 닷을 담고있는 컨테이너의 모든 자식들한테서 active를 제거해놓음
    }
    if (index === 0) {
        // 인덱스가 0 과 같다면(5번 화면을 가리키고 있다면)
        buttonContainer.children[sliderLength - 1].classList.add('slide_active');
        // 닷을 담고있는 컨테이너의 자식 sliderLength = slider.childElementCount;(5)-1 = 4 즉 마지막 인덱스(4)를 가지고 있는 닷에 active를 붙여준다.
    } else if (index === sliderLength + 1) {
        // 인덱스가 (5+1) = 6 이라면 즉 숫자 1 화면이 보이고 있다면
        buttonContainer.children[0].classList.add('slide_active');
        // 닷을 담는 컨테이너의 첫번째 닷에 active붙여줌
    } else {
        buttonContainer.children[index - 1].classList.add('slide_active');
        // index-1 = 숫자1 화면이 보이려면 닷의 인덱스는 0번이 선택되어야하고 숫자 2 화면이 보이려면 닷의 인덱스는 1번이라서 index - 1
        // 닷을 담는 컨테이너의 자식의 index - 1 한 닷의 인덱스에 active 붙여준다
    }
}
function moveSlider(time) {
    // 매개변수로 써줘서 인수로 time을 넣어줌(어디에 넣든 값을 바꿀 수 있도록)
    slider.style.transition = time + 'ms';
    container.children[0].style.transform = 'translateX(-' + (index * 1920) + 'px)';

    updateButtons();
}

setInterval(() => {
    next();
}, 3000);




const containerFirst = document.getElementsByClassName("tema_tab_container")[0];
// container = 버튼들이 들어있는 ul
const controller = containerFirst.children[0];
// controller = 버튼들이 들어있는 ul의 첫번째 li
const liList = controller.children;
const temaTabBtn = document.getElementsByClassName("tema_tab_btn");

const temaArea = document.getElementsByClassName("tema_img_box")[0];
// textArea = 텍스트들이 들어있는 ul
const temaAreaUl = temaArea.children[0];
// textAreaUl = 텍스트들이 들어있는 ul의 첫번째 li
const temaAreaLi = temaAreaUl.children;

let n = 0;

for (let i = 0; i < liList.length; i++) {
    liList[i].index = i;

    liList[i].addEventListener("click", function (e) {
        e.preventDefault();
        n = e.currentTarget.index;


        for (let j = 0; j < liList.length; j++) {
            if (j == n) {
                liList[j].classList.add("on");
                temaAreaLi[j].classList.add("tab_active");
                temaTabBtn[j].classList.add("tab_color_active");
            }
            else {
                liList[j].classList.remove("on");
                temaAreaLi[j].classList.remove("tab_active");
                temaTabBtn[j].classList.remove("tab_color_active");
            }
        }

    });
};
