import { useUser } from '../lib/hooks';
import TodoList from '../components/todo/todolist';

const Home = () => {
  const user = useUser();

  return <>{!user ? <div>Login to continue</div> : <TodoList />}</>;
};

export default Home;
