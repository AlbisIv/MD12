import { Console } from 'console';
import React, { useState } from 'react';
import './ToDo5.scss';

// TODO pievienot select lauku ar 3 prioritātēm, kas tiek piešķirta elementam.
// TODO Pievienot edit pogu, kas ļauj editot elementu
// TODO nostilot
// ! mainot all/in progress/completed progresa bārs neņem kopējo vērtību
type TaskListDetails = {
  title: string,
  isDone:boolean,
  isBeingEdited:boolean,
  priority:string

};
const ToDo5 = () => {
  const [inputValue, setInputValue] = useState('');
  const [PriorityValue, setPriorityValue] = useState('Low'); // inputam
  const [TaskList, setTaskList] = useState<TaskListDetails[]>([]); // masīvam ar taskiem, ko mainam rādot
  const [ShowList, setShowList] = useState<TaskListDetails[]>([...TaskList]); // masīvs kurā ir visi elementi
  const [EditInputValue, setEditInputValue] = useState('');
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
      title: 'High Priority',
      onClick: () => {
        const isHigh = ShowList.filter((task) => task.priority === 'High');
        return (
          setTaskList(isHigh)
        );
      },
    },
    {
      title: 'Medium Priority',
      onClick: () => {
        const isHigh = ShowList.filter((task) => task.priority === 'Medium');
        return (
          setTaskList(isHigh)
        );
      },
    },
    {
      title: 'Low Priority',
      onClick: () => {
        const isHigh = ShowList.filter((task) => task.priority === 'Low');
        return (
          setTaskList(isHigh)
        );
      },
    },
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
  const isEdited = (index: number) => {
    const newtaskList = [...TaskList];
    newtaskList[index].isBeingEdited = !newtaskList[index].isBeingEdited;
    return newtaskList;
  };
  const editElement = (index: number, newValue: string) => {
    const newtaskList = [...TaskList];
    newtaskList[index].title = newValue;
    newtaskList[index].isBeingEdited = false;

    return newtaskList;
  };
  const cancelEdit = (index: number) => {
    const newtaskList = [...TaskList];
    newtaskList[index].isBeingEdited = false;

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
        <select
          onChange={(event) => setPriorityValue(event.target.value)}
          name="Priority"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={() => {
            if (inputValue) {
              setTaskList([...TaskList, ({
                title: inputValue, isDone: false, isBeingEdited: false, priority: PriorityValue,
              })]);
              setShowList([...TaskList, ({
                title: inputValue, isDone: false, isBeingEdited: false, priority: PriorityValue,
              })]);
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
          {TaskList.map((task, index) => {
            if (task.isBeingEdited) {
              return (
                <li>
                  <input
                    type="text"
                    onChange={(event) => setEditInputValue(event.target.value)}
                  />

                  <button
                    onClick={() => {
                      setTaskList(editElement(index, EditInputValue));
                      setEditInputValue('');
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setTaskList(cancelEdit(index));
                      setEditInputValue('');
                    }}
                  >
                    Cancel
                  </button>
                </li>
              );
            }
            return (
              <li
                className={task.priority}
                key={Math.random()}
              >
                <div
                  className="checkboxandtitle"
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
                </div>
                <div className="editandx">
                  <button
                    id={`${index}`}
                    onClick={() => {
                      setTaskList(isEdited(index));
                    }}
                  >
                    Labot
                  </button>
                  <button
                    id={`${index}`}
                    onClick={() => {
                      setShowList(ShowList.filter((_, i) => (i !== index)));
                      setTaskList(TaskList.filter((_, i) => (i !== index)));
                    }}
                  >
                    X
                  </button>
                </div>
              </li>

            );
          })}
        </ul>
        <div className="button__div">
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
    </div>
  );
};

export default ToDo5;
