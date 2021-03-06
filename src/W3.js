import React, {useState} from 'react'

function W() {
  const [count, setCount] = useState(4)
  let [name, changeName] =useState('Ali')
  function minusOne() {
  setCount(count-1)
  }
  function plusOne() {
    setCount(count+1)
  }
  function yourName() {
    changeName('Hassan')
  }
  function hisName() {
    changeName('Gholi')
  }

  return (
    <div>
      <button onClick={minusOne}>-</button>
      <span><h2>{count}</h2></span>
      <button onClick={plusOne}>+</button>
      <div>
         
        <button onClick={yourName}>Change Name</button><br />
        <span>{name}</span> <br />
         <button onClick={hisName}>His Name</button><br />
        </div>
    </div>
  )
    }
export default W;