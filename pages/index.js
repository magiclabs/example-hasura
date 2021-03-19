import { useUser } from '../lib/hooks';
import TodoList from '../components/todo/todolist';

const Home = () => {
  const user = useUser();

  return <>{user ? <TodoList /> : <div>Login to continue</div>}</>;
};

export default Home;
