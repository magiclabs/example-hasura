import { TextButton } from '@magiclabs/ui';

const TodoListActions = ({ todos, getTodos, showActive, showCompleted, clearCompleted }) => {
  return (
    <>
      <div className='list-info-container'>
        <div className='todos-counter'>{todos === 1 ? '1 item' : `${todos} items`}</div>
        <div className='filter-btns'>
          <div className='filter-btn'>
            <TextButton color='primary' size='sm' onClick={() => getTodos()}>
              All
            </TextButton>
          </div>
          <div className='filter-btn'>
            <TextButton color='primary' size='sm' onClick={() => showActive()}>
              Active
            </TextButton>
          </div>
          <div className='filter-btn'>
            <TextButton color='primary' size='sm' onClick={() => showCompleted()}>
              Completed
            </TextButton>
          </div>
        </div>
        <div className='clear-btn'>
          <TextButton color='error' size='sm' onClick={() => clearCompleted()}>
            Clear Completed
          </TextButton>
        </div>
        <style jsx>{`
          .list-info-container {
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;
          }
          .todos-counter {
            color: gray;
            padding: 5px;
            margin: 4px 8px;
          }
          .filter-btns {
            display: flex;
          }
          .filter-btn {
            margin: 0 8px;
          }
          .filter-btns,
          .clear-btn {
            line-height: 36px;
          }
          .clear-btn {
            margin-right: 10px;
          }
          @media only screen and (max-width: 500px) {
            .list-info-container {
              display: block;
              text-align: center;
            }
            .filter-btns {
              margin: 0 65px;
            }
            .filter-btn {
              margin: auto;
            }
            .clear-btn {
              margin: 0px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default TodoListActions;
