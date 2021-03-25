import AddTodoForm from './add-todo-form';
import TodoItem from './todo-item';
import TodoListActions from './todolist-actions';
import { useState, useEffect } from 'react';
import { useUser } from '../../lib/hooks';

const TodoList = ({}) => {
  const [todoAdded, setTodoAdded] = useState(false); // refresh todos once a new todo is added
  const user = useUser();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.issuer) {
      if (todoAdded) return setTodoAdded(false); // prevent double fetching of todos
      getTodos();
    }
  }, [todoAdded, user]);

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
          todo
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

  const clearCompleted = async () => {
    let clearCompletedQuery = {
      query: `mutation {
        delete_todos(where: {is_completed: {_eq: true}, user_id: {_eq: "${user?.issuer}"}}) 
        {
          returning {
            id
          }
        }
      }`,
    };
    await queryHasura(clearCompletedQuery);
    getTodos();
  };

  const showActive = async () => {
    let showActiveQuery = {
      query: `{
        todos(where: {user_id: {_eq: "${user?.issuer}"}, is_completed: {_eq: false}}) {
          id
          todo
          is_completed
        }
      }`,
    };
    let res = await queryHasura(showActiveQuery);
    let { data, error } = await res.json();
    error ? console.log(error) : data.todos && setTodos(data.todos);
  };

  const showCompleted = async () => {
    let showCompletedQuery = {
      query: `{
        todos(where: {user_id: {_eq: "${user?.issuer}"}, is_completed: {_eq: true}}) {
          id
          todo
          is_completed
        }
      }`,
    };
    let res = await queryHasura(showCompletedQuery);
    let { data, error } = await res.json();
    error ? console.log(error) : data.todos && setTodos(data.todos);
  };

  return (
    <div className='todo-list-container'>
      <AddTodoForm setTodoAdded={setTodoAdded} isLoading={isLoading} setIsLoading={setIsLoading} />
      <TodoItem todos={todos} deleteTodo={deleteTodo} toggleCompleted={toggleCompleted} />
      <TodoListActions
        todos={todos?.length}
        getTodos={getTodos}
        showAll={getTodos}
        showActive={showActive}
        showCompleted={showCompleted}
        clearCompleted={clearCompleted}
      />
      <style jsx>{`
        .todo-list-container {
          width: 90%;
          max-width: 32rem;
          margin: 0 auto;
          box-shadow: 0px 0px 6px 6px #eee;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default TodoList;
