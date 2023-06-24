import { Table } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import { changeName, changeAge } from './../store/userSlice.js';
import { changeCount, subCount } from './../store.js';
import { memo, useMemo, useState} from 'react';

let Child = memo(function Child(props) {
    console.log('child 인디 제 랜더링', {props})
    return <div>cart의  자식임</div>
})

function fun() {
    console.log('func 함수')
    return '100'
}

function Cart() {
    console.log('cart인디 제 랜더링')

    // useEffect html랜더링 후
    // useMemo html랜더링 중 
    let result = useMemo(() => {return fun()}, []);  //렌더링 시 1회만 실행됨.
    

    // 장바구니 데이터, 카트에만 필요한게 아니라 여기저기서  필요함?
    // 어디서 만들어야 할까? -> 최상위 컴포넌트인 APP에서 만들어야 함.
    // 리덕스 사용하면 props 없이 state 공유 가능

    let state = useSelector((state) => { return state })
    let dispatch = useDispatch();

    let [count, setCount] = useState(0);

    return (
        <div>
            <Child></Child>
            { count }
            <button onClick = {() => { setCount(count+1) }}>[+]</button> 
            {state.user.name}의 장바구니 : 몇짤?{state.user.age}
            <button onClick={() => dispatch(changeAge(10))}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    { state.cart.map((item, i) => {
                        return (
                            <tr key = {i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td>안녕</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(changeCount(item.id));
                                    }}>+</button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(subCount(item.id));
                                    }}>-</button>
                                </td>
                            </tr>
                        ) 
                    })}
                    
                </tbody>
            </Table>
        </div>
    );
}

export default Cart