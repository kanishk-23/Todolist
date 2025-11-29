import { useEffect, useState } from 'react';
import { getTodos} from './services/todoservices';
import TodoFormCard from './components/Todoform';
import TodoListCard from './components/Todolist';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({message:'',start_date:'', due_date:''});

  useEffect(()=>{
    setLoading(true);
    getTodos()
      .then(res => setTodos(res.data.data))
      .catch(res => setError(res.response.error.message))
      .finally(() => setLoading(false));
  },[]);

  return(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 20 }}>TO DO LIST</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <TodoFormCard
        form={form}
        setForm={setForm}
        todos={todos}
        setTodos={setTodos}
        editId={editId}
        setEditId={setEditId}
        setLoading={setLoading}
        setError={setError}
      />

      <TodoListCard
        todos={todos}
        setTodos={setTodos}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
        setForm={setForm}
        setEditId={setEditId}
      />

    </div>
  );
}
export default App;
