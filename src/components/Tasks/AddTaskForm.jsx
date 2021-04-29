import axios from 'axios';
import React, { useState } from 'react';

function AddTaskForm({ list, onAddTask }) {
  const [activeAddPopup, setActiveAddPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleAddPopup = () => {
    setActiveAddPopup(!activeAddPopup);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleAddPopup();
      })
      .catch(() => {
        alert('Ошибка при добавлении задачи');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='tasks__form'>
      {activeAddPopup ? (
        <div className='tasks__form-popup'>
          <input
            type='text'
            className='tasks__form-input field'
            placeholder='Текст задачи'
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <div className='tasks__form-btns'>
            <button disabled={isLoading} className='tasks__form-add button' onClick={addTask}>
              {isLoading ? 'Добавление задачи' : 'Добавить задачу'}
            </button>
            <button className='tasks__form-cancel button' onClick={toggleAddPopup}>
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <button className='tasks__form-new' onClick={toggleAddPopup}>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8 1V15'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M1 8H15'
              stroke='black'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Новая задача</span>
        </button>
      )}
    </div>
  );
}

export default AddTaskForm;
