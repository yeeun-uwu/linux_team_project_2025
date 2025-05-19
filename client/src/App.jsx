import './App.css'
import { useEffect, useState } from 'react';

function App() {

  //flask 연결 테스트 코드 
  const [data, setData] = useState({ members: [] });

  useEffect(() => {
    fetch("/api/users")
      .then(res => {
        if (!res.ok) throw new Error("API 요청 실패");
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h1>test 중</h1>
      <div>
        {data.members.map((u) => <p key={u.id}>{u.name}</p>)}
      </div>
    </>
  );
}

export default App;
