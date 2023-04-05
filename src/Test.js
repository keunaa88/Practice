import {useState, useTransition, useDeferredValue } from "react";


function Test() {
    let [name, setName] = useState('')
    let array = new Array(10000).fill(0); //성능저하 테스트
    let [isPending, startTransition] = useTransition()
    //startTransition은 함수. 이걸로 성능 저하가 있는걸 감싸주면 됨
    //startTransition 안에 있는 내용이 처리중일때 isPending이 true
    
    let state = useDeferredValue(name)
    //여기 넣은값(즉, state)에 변동사항이 생기면 늦게 처리해줌

    return (
        <div className = "App">
            {name}
            <input onChange={(e) => {
                startTransition(() => {
                    setName(e.target.value)
                }) 
                }} />
                {  
                isPending ? '로딩중' :
                array.map(() => {
                    return <div>{name}</div>
                })
            }
        </div>
       
    )
}

export default Test