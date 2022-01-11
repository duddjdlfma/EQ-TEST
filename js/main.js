const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 10;

let total_num = [];
let num = 0;

function score(qIdx, total){
    var resultDesc = document.querySelector('.resultDesc');

    total_num.push(parseInt(total));
    
    const result_num = total_num.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);

    // console.log(result_num); //점수

    if(result_num <= 24){
        resultDesc.innerHTML = "자신의 감정과 타인의 입장을 고려하지 못하는 정서적 장님.";
    }else if(25 <= result_num <= 49){
        resultDesc.innerHTML = "자신과 타인의 정서는 물론 그 상황과 처지에 대해 무감각한 편.";
    }else if(50 <= result_num <= 74){
        resultDesc.innerHTML = "자신과 타인의 정서에 무딘 편.";
    }else if(75 <= result_num <= 99){
        resultDesc.innerHTML = "정서와 감정 능력의 부족으로 문제를 겪을 우려가 약간 있다.";
    }else if(100 <= result_num <= 124){
        resultDesc.innerHTML = "평균수준.";
    }else if(125 <= result_num <= 149){
        resultDesc.innerHTML = "평균이상. 감정의 절제와 타인의 처지에 예민한 편.";
    }else if(150 <= result_num <= 174){
        resultDesc.innerHTML = "감성/정서지능은 높은 편. 신념을 향해서 나가되 대인관계 능력이 좋아서 인기를 얻을 수 있다.";
    }else if(175 <= result_num <= 199){
        resultDesc.innerHTML = "대단히 높은 감성/정서지능의 소유자, 타인의 감정에 예민하고 자신의 정서와 감정 통제 능력이 있다.";
    }else if(result_num == 200){
        resultDesc.innerHTML = "당신은 EQ천재, 완벽한 감성/정서지능의 소유자.";
    }

    // console.log(a);
}


function addAnswer(answerText, qIdx, total){

    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button'); //버튼을 새로 생성
    answer.classList.add('answerList'); //새로 만든 버튼에 answerList라는 클래스 이름을 부여
    a.appendChild(answer); //answerBox 안에 버튼을 넣음
    answer.innerHTML = answerText; //버튼 내용을 넣음 
    answer.classList.add('fadeIn');

    answer.addEventListener("click", function(e){  //버튼을 클릭했을 때
        // total_num.push(total);
        score(qIdx, total);
        
        // for(let i=0; i<total_num.length; i++){
        //     resultDesc.innerHTML(total_num[i]);
        // }

        // console.log(typeof(total_num));

        var children = document.querySelectorAll('.answerList'); //answerList라는 이름을 가진 클래스는 children라고 선언
        for(let i = 0; i < children.length; i++){ //children 숫자만큼 반복
            children[i].disabled = true; //모든 버튼들이 비활성화 되고
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => { //0.45초 뒤
          for(let i = 0; i < children.length; i++){ //children 숫자만큼 반복
            children[i].style.display = 'none'; // 모든 버튼이 사라짐
        }
        goNext(++qIdx);
    
        }, 450 ); 
        
        
    }, false);

}

function goNext(qIdx){ // qna 값 넣어줄 함수
    var q = document.querySelector('.qBox'); //qBox를 q로 선언

    if(qIdx == 10){
        // console.log('끝');
        qna.style.animation = "fadeOut 1s";

        setTimeout(()=>{
            qna.style.display = "none";
            result.style.animation = "fadeIn 1s";

            setTimeout(()=>{
            result.style.display = "block";
            },500);
            
        },500);
        
    }else{
        q.innerHTML = qnaList[qIdx].q; // q를 date.js파일에 qnaList오브젝트.q를 불러와서 내용 수정
        
        for(let i in qnaList[qIdx].a){ // i < qnaList[qidx].a에 숫자만큼 실행
            addAnswer(qnaList[qIdx].a[i].answer, qIdx, qnaList[qIdx].a[i].type); //a.버튼 내용들을 가지고 addAnswer함수 실행
        }
    }
    let status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint) * (qIdx+1) + "%";


}

function begin(){ //시작하기 버튼을 클릭하면 실행
    main.style.animation = "fadeOut 1s"; //main섹션을 1초 동안 서서히 숨기기
    setTimeout(() => { // 0.45초가 지난 뒤 실행
        qna.style.animation = "fadeIn 1s"; //qna섹션을 1초 동안 서서히 나타나기
        setTimeout(() => { //0.45초가 지난 뒤 실행
            main.style.display = "none"; // main섹션을 완전 사라지게
            qna.style.display = "block"; // main섹션이 사라지고 나타나게
        }, 450);
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
    
}




