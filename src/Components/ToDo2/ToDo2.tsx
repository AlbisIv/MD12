import { Console } from 'console';
import React, { useState } from 'react';
import './ToDo2.scss';

// TODO Pielikt X pogu, kas izdzēš kartiņu
// TODO nostilot
// TODO mainot all/in progress/completed progresa bārs neņem kopējo vērtību
type TaskListDetails = {
  title: string,
  isDone:boolean,
};
const ToDo2 = () => {
  const [inputValue, setInputValue] = useState(''); // inputam
  const [TaskList, setTaskList] = useState<TaskListDetails[]>([]); // masīvam ar taskiem, ko mainam rādot
  const [ShowList, setShowList] = useState<TaskListDetails[]>([...TaskList]); // masīvs kurā ir visi elementi
  const calcProgress = (arr: any[]) => {
    const cloneArr = [...arr];
    console.log(cloneArr);
    let count = 0;
    for (let index = 0; index < cloneArr.length; index += 1) {
      if (cloneArr[index].isDone) {
        count += 1;
      }
    }
    console.log(count / cloneArr.length);

    return count / cloneArr.length;
  };
  const Buttonlist = [
    {
      title: 'All',
      onClick: () => setTaskList(ShowList),
    },
    {
      title: 'In progress',
      onClick: () => {
        const tasksInProgress = ShowList.filter((task) => !task.isDone);
        return (
          setTaskList(tasksInProgress)
        );
      },
    },
    {
      title: 'Completed',
      onClick: () => {
        const tasksDone = ShowList.filter((task) => task.isDone);
        return (
          setTaskList(tasksDone)
        );
      },
    },
  ];
  const completed = (index: number) => {
    const newtaskList = [...TaskList];
    newtaskList[index].isDone = !newtaskList[index].isDone;
    return newtaskList;
  };
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
              setTaskList([...TaskList, ({ title: inputValue, isDone: false })]);
              setShowList([...TaskList, ({ title: inputValue, isDone: false })]);
              setInputValue('');
            }
          }}
        >
          Add
        </button>
        <div className="progress__parent">
          <div
            className="progress"
            style={{ width: `${calcProgress(TaskList) * 100}%` }}
          >
            <></>
          </div>
        </div>
        <ul>
          {TaskList.map((task, index) => (
            <li
              key={Math.random()}
            >
              <input
                type="checkbox"
                id={`${index}`}
                checked={(task.isDone)}
                onChange={(event) => {
                  setTaskList(completed(parseInt(event.target.id, 10)));
                }}
              />
              {task.isDone ? <s>{task.title}</s> : task.title}
            </li>

          ))}
        </ul>
        {Buttonlist.map((btn) => (
          <button
            key={Math.random()}
            onClick={btn.onClick}
          >
            {btn.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToDo2;
