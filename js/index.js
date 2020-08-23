let cardList = document.querySelector(".cardList");
        let cardsNum = 16;

        // 카드리스트 만드는 함수
        function createLis(num) {
            let value=0;
            let unshuffledList = [];
            for(let i=0;i<num;i++){
                let li = document.createElement("li");
                li.value=`${(i/2)}`;
                unshuffledList.push(li);
                // css 효과를 주기 위해, li 안에 두 개의 div를 넣어주기
                for(let j=0;j<2;j++){
                    let div = document.createElement("div");   
                    li.appendChild(div);
                }
            }

            // list shuffle해서 생성하기
            let shuffledList = unshuffledList.sort(function(){return 0.5-Math.random()})
            shuffledList.forEach(item=>{cardList.appendChild(item)});
        }

        // 카드 만들기 함수 실행!
        createLis(cardsNum);

        let cards = document.querySelectorAll(".cardList li");
        let lifeUl = document.querySelector(".lifeList .lifeCount")
        let compareArray = [];
        let life=10;

        // life 수에 따라서 하트 생성
        function makeLife(){
            // life 수의 변화 감지 전 미리 life를 초기화 시켜두고 => 이후에 다시 감지 재설정할 수 있게 해둠.
            let lifeList = document.querySelectorAll(".lifeList .lifeCount li");
                lifeList.forEach(li=>{
                    li.remove();
                })
            for(let i=0;i<life;i++){
                // createElement를 처음에 외부변수로 설정해뒀었는데 element가 하나만 생겨나는 현상이 발생!!
                // 외부에 선언해두면 이미 생성이 된 것으로 파악, 더 이상 설정이 되지 않는 것 같다.
                // 해결법: for문 안에 createElement변수를 설정해둠.
                let lifeLiElement = document.createElement("li");
                let lifeIconElement = document.createElement("i");
                lifeUl.appendChild(lifeLiElement).appendChild(lifeIconElement).classList.add("xi-heart");
            }
        }
        makeLife();

        cards.forEach(card=>{
            //Css를 주기 위해 각 div에 클래스 부여하기
            card.childNodes[0].classList.add("front","cardFace");
            card.childNodes[1].classList.add("back","cardFace");
            card.addEventListener("click",(e)=>{
                if(card.classList.contains("on") || card.classList.contains("complete")) return;
                card.classList.add("on");
                compareArray.push(card)
                // 비교하려는 카드 갯수가 홀수인지 짝수인지 구분 => 해당 카드를 비교할 때인지 아닌지 구분
                if(compareArray.length%2==0){
                    if(compareArray[0].value != compareArray[1].value){
                        // 비교하는 카드의 value값이 다른 경우
                        compareArray=[];
                        document.querySelectorAll(".on").forEach(item=>setTimeout(function(){
                            item.classList.remove("on");
                        },1000))
                        life--;
                        makeLife();
                        setTimeout(function(){
                            if(life==0){
                            alert("You lose!");
                            e.preventDefault();
                            location.reload();           
                            }
                        },500)
                    } else {
                        // 비교하는 카드의 value값이 같은 경우
                        compareArray.forEach(item=>setTimeout(function(){
                            compareArray=[];
                            item.classList.add("complete"); 
                            item.classList.remove("on");
                            let completeCards = document.querySelectorAll(".cardList li.complete");
                            // 카드가 모두 맞춰졌는지 확인!
                            if(cards.length === completeCards.length){
                                alert("You Win!")
                                e.preventDefault();
                                location.reload();
                            }
                        },500))
                    }
                    // 어떤 에러 발생을 방지시키기 위해서....
                    e.preventDefault();    
                }
            })
        });
        
        //배경 포지션
        let positions=["-14px -30px","-189px -35px","-554px -30px","-722px -24px","-9px -223px","-370px -220px","-729px -224px","-726px -416px"];
        cards.forEach(card=>{
            card.childNodes[1].style.backgroundPosition = positions[card.value]
        })