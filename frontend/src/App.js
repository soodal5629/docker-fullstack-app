import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [lists, setLists] = useState([])
  const [value, setValue] = useState("")
  
  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    
    axios.post('/api/value', {value: value})
      .then(response => {
        if(response.data.success) {
          console.log('response', response);
          setLists([...lists, response.data]); // 기존 lists에 새로운 data 넣어주기
          setValue("");
        } else{
          alert('값을 DB에 넣는데 실패했습니다.');
        }
      })
  }

  useEffect(() => {
    // 여기서 DB에 있는 데이터를 가져온다.
    axios.get('/api/values')
      .then(response => {
        console.log('response', response)
        setLists(response.data)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
          {lists && lists.map((list, index) => (
              <li key={index}>{list.value}</li> 
          ))}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text" 
              placeholder="입력해주세요..." 
              onChange={changeHandler}
              value={value} // State의 value로 컨트롤
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
