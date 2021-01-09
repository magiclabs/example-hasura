import { useUser } from '../lib/hooks';
import Layout from '../components/layout';
import TodoList from '../components/todo/todolist';

const Home = () => {
  const user = useUser();
  return <Layout>{user ? <TodoList /> : <div>Log in to continue</div>}</Layout>;
};

export default Home;
