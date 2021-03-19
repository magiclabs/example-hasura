import { DuotoneIcon, DuotoneIcons, Checkbox } from '@magiclabs/ui';

const TodoItem = ({ toggleCompleted, deleteTodo, todos }) => {
  return (
    <>
      {todos?.map((todo) => {
        return (
          <div className='todo-item-container' key={todo.id}>
            <div className='checkbox-todo-container'>
              <div
                className='toggle-icon'
                onClick={() => toggleCompleted(todo.id, !todo.is_completed)}
              >
                <Checkbox
                  checked={todo.is_completed}
                  color='primary'
                  onClick={() => toggleCompleted(todo.id, !todo.is_completed)}
                />
              </div>
              <div className={`todo ${todo.is_completed && 'completed'}`}>{todo.todo}</div>
            </div>
            <div className='delete-btn'>
              <DuotoneIcon
                inline
                type={DuotoneIcons.Remove}
                size={28}
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
          </div>
        );
      })}
      <style jsx>{`
        .todo-item-container,
        .checkbox-todo-container {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          box-sizing: border-box;
        }
        .todo-item-container {
          padding: 10px;
          border-bottom: 1px solid #dcdcdc;
          word-wrap: break-word;
          white-space: pre-wrap;
          word-break: normal;
        }
        .todo {
          line-height: 28px;
        }
        .toggle-icon {
          margin: 5px 14px 0 5px;
          cursor: pointer;
        }
        .completed {
          text-decoration: line-through;
          color: gray;
        }
        .delete-btn {
          padding: 4px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default TodoItem;
