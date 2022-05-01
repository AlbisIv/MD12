import React, { useState } from 'react';
import './ToDo1.scss';

const tasks:any [] = [];
const ToDo1 = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="container">
      <div className="inputandbtn">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          type="text"
          placeholder="Add new task..."
        />
        <button
          onClick={() => {
            if (inputValue) {
              tasks.push(inputValue);
              setInputValue('');
            }
          }}
        >
          Add
        </button>

        <ul>
          {tasks.map((task) => (
            <li
              key={Math.random()}
            >
              {task}
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDo1;
