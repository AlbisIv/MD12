import { Console } from 'console';
import React, { useState } from 'react';
import './ToDo4.scss';

// TODO Pievienot edit pogu, kas ļauj editot elementu
// TODO nostilot
// ! mainot all/in progress/completed progresa bārs neņem kopējo vērtību
// TODO
type TaskListDetails = {
  title: string,
  isDone:boolean,
  isBeingEdited:boolean,

};
const ToDo4 = () => {
  const [inputValue, setInputValue] = useState(''); // inputam
  const [TaskList, setTaskList] = useState<TaskListDetails[]>([]); // masīvam ar taskiem, ko mainam rādot
  const [ShowList, setShowList] = useState<TaskListDetails[]>([...TaskList]); // masīvs kurā ir visi elementi
  const calcProgress = (arr: any[]) => {
    const cloneArr = [...arr];
    let count = 0;
    for (let index = 0; index < cloneArr.length; index += 1) {
      if (cloneArr[index].isDone) {
        count += 1;
      }
    }

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
              setTaskList([...TaskList, ({ title: inputValue, isDone: false, isBeingEdited: false })]);
              setShowList([...TaskList, ({ title: inputValue, isDone: false, isBeingEdited: false })]);
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
                  console.log(event.target);

                  setTaskList(completed(parseInt(event.target.id, 10)));
                }}
              />
              {task.isDone ? <s>{task.title}</s> : task.title}
              <button
                id={`${index}`}
                onClick={() => {
                  setShowList(ShowList.filter((_, i) => (i !== index)));
                  setTaskList(TaskList.filter((_, i) => (i !== index)));
                }}
              >
                X
              </button>
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

export default ToDo4;
