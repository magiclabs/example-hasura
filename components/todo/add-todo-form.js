import { useState } from 'react';
import { useUser } from '../../lib/hooks';
import { Input, Icon, MonochromeIcons, useToast } from '@magiclabs/ui';

const AddTodoForm = ({ setTodoAdded, isLoading, setIsLoading }) => {
  const { token, issuer } = useUser({ redirectTo: '/login' }); // redirect user to /login if not logged in
  const [todo, setTodo] = useState('');
  const { createToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo) return addToast();
    setIsLoading(true);
    await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(addTodoQuery),
    });
    setTodo('');
    setIsLoading(false);
    setTodoAdded(true);
  };

  const addToast = () => {
    createToast({ message: 'Task cannot be empty', type: 'error', lifespan: 2000 });
  };

  const addTodoQuery = {
    query: `mutation {
      insert_todos_one(object: {todo: "${todo}", user_id: "${issuer}"}) {
        todo
      }
    }`,
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Enter your task'
          size='lg'
          type='text'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          prefix={<Icon inline type={MonochromeIcons.CaretRight} color={'#888'} size={26} />}
          suffix={
            isLoading && (
              <img
                height='20px'
                src={'https://media.tenor.com/images/9da8a7cec33307a43306a32e54fbaca0/tenor.gif'}
              />
            )
          }
        />
      </form>
    </>
  );
};

export default AddTodoForm;

// Add below if I can add custom CSS to the <Icon> spinner

// !isLoading && <Icon inline type={MonochromeIcons.Spinner} color={'#6851ff'} size={22} />

// @-moz-keyframes spin {
//   from { -moz-transform: rotate(0deg); }
//   to { -moz-transform: rotate(360deg); }
// }
// @-webkit-keyframes spin {
//   from { -webkit-transform: rotate(0deg); }
//   to { -webkit-transform: rotate(360deg); }
// }
// @keyframes spin {
//   from {transform:rotate(0deg);}
//   to {transform:rotate(360deg);}
// }
