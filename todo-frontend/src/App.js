import './App.css';
import { useEffect, useState } from 'react';
import { getTodos} from './services/todoservices';
import TodoFormCard from './components/Todoform';
import TodoListCard from './components/Todolist';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({message:'',start_date:'', due_date:''});

  useEffect(()=>{
    setLoading(true);
    getTodos()
      .then(res => setTodos(res.data.data))
      .catch(res => setError(res.response?.error?.message || 'Server Error'))
      .finally(() => setLoading(false));
  },[]);

  return(
    <div className="flex items-center bg-green-200 min-h-screen">
      <div className="max-w-2xl bg-white rounded-xl p-4 m-2">
        <>
          <h1 className="flex justify-center text-4xl font-bold">TO DO LIST</h1>
          {error && <p className="flex justify-center text-red-500 text-lg">{error}</p>}
          {loading && <p>Loading...</p>}
        </>

        <div className="mb-5">
          <TodoFormCard
            form={form}
            setForm={setForm}
            todos={todos}
            setTodos={setTodos}
            setLoading={setLoading}
            setError={setError}
          />
        </div>
        
        <div>
          <TodoListCard
            todos={todos}
            setTodos={setTodos}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
          />
        </div>

      </div>
    </div>
  );
}
export default App;
