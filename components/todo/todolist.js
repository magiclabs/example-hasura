import { useState, useEffect } from 'react';
import AddTodoForm from './add-todo-form';
import TodoItem from './todo-item';
import { useUser } from '../../lib/hooks';

const TodoList = ({}) => {
  const user = useUser();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.issuer) return;
    getTodos();
  }, [user]);

  const queryHasura = async (query) => {
    try {
      setIsLoading(true);
      let res = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + user?.token,
        },
        body: JSON.stringify(query),
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getTodos = async () => {
    const getTodosQuery = {
      query: `{
        todos(where: {user_id: {_eq: "${user?.issuer}"}}, order_by: {is_completed: asc, id: asc}) {
          id
          task
          is_completed
        }
      }`,
    };
    try {
      let res = await queryHasura(getTodosQuery);
      let { data, error } = await res.json();
      error ? console.log(error) : data.todos && setTodos(data.todos);
    } catch (error) {
      console.log(`Error fetching todos: ${error}`);
    }
  };

  const toggleCompleted = async (id, isCompleted) => {
    const toggleCompletedQuery = {
      query: `mutation {
        update_todos(where: {id: {_eq: "${id}"}, user_id: {_eq: "${user?.issuer}"}}, _set: {is_completed: "${isCompleted}"}) {
          returning {
            id
          }
        }
      }`,
    };
    await queryHasura(toggleCompletedQuery);
    getTodos();
  };

  const deleteTodo = async (todoId) => {
    let deleteQuery = {
      query: `mutation {
        delete_todos(where: {id: {_eq: "${todoId}"}, user_id: {_eq: "${user?.issuer}"}}) {
          affected_rows
        }
      }`,
    };
    await queryHasura(deleteQuery);
    getTodos();
  };

  return (
    <div className='todo-list-container'>
      <AddTodoForm 
        getTodos={getTodos}
        isLoading={isLoading} 
        setIsLoading={setIsLoading} 
        />
      <TodoItem 
        todos={todos} 
        deleteTodo={deleteTodo} 
        toggleCompleted={toggleCompleted} 
        />
      <div className='number-of-tasks'>{`Tasks: ${todos?.length}`}</div>
      <style jsx>{`
        .todo-list-container {
          width: 90%;
          max-width: 32rem;
          margin: 0 auto;
          box-shadow: 0px 0px 6px 6px #eee;
          border-radius: 10px;
        }
        .number-of-tasks {
          color: gray;
          padding: 10px;
          margin: 4px 8px;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
