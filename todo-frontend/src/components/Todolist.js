import { updateTodo, deleteTodo } from '../services/todoservices';

function TodoListCard({todos, setTodos, loading, setLoading, setError, setForm, setEditId}){
    const edittask = task =>{
        setEditId(task._id);
        setForm({
        message: task.message,
        start_date: task.start_date.slice(0, 10),
        due_date: task.due_date.slice(0, 10),
        });
    };

    const toggleActive = (task) => {
        const newStatus = !task.is_active;
        setLoading(true);
        updateTodo(task._id, { is_active: newStatus })
        .then(res => {
        setTodos(todos.map(t => t._id === task._id ? res.data.data : t));
        })
        .catch(res => setError(res.response.data.message))
        .finally(() => setLoading(false));
    };
  
    const deletetask = id => {
        setLoading(true);
        deleteTodo(id)
        .then(() => setTodos(todos.filter(t => t._id !== id)))
        .catch(res => setError(res.response.data.message))
        .finally(() => setLoading(false));
    }
  
    return (
    <div style={{display:'flex-row', alignItems: 'center'}}>
        {loading ? (<p>Loading tasks...</p>) : (
          <table style={{ paddingTop: 20, marginTop: 20 }}>
          <thead>
            <tr style={{ alignItems: 'center', paddingTop: 20, marginTop: 20, background: '#f0f0f0' }}>
              <th style={{ border: '1px solid #575757ff', padding: '10px' }}>Task</th>
              <th style={{ border: '1px solid #575757ff', padding: '10px' }}>Start Date</th>
              <th style={{ border: '1px solid #575757ff', padding: '10px' }}>Due Date</th>
              <th style={{ border: '1px solid #575757ff', padding: '10px' }}>Status</th>
              <th style={{ border: '1px solid #575757ff', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo._id }>
                <td style={{ border: '1px solid #575757ff', padding: '10px' }}>
                  {todo.is_active ? todo.message : <s>{todo.message}</s>}
                </td>
                <td style={{ border: '1px solid #575757ff', padding: '10px' }}>
                  {todo.is_active ? todo.start_date.slice(0, 10) : <s>{todo.start_date.slice(0, 10)}</s>}
                </td>
                <td style={{ border: '1px solid #575757ff', padding: '10px' }}>
                  {todo.is_active ? todo.due_date.slice(0, 10) : <s>{todo.due_date.slice(0, 10)}</s>}
                </td>
                <td style={{ border: '1px solid #575757ff', padding: '10px', textAlign: 'center' }}>
                  <input type="checkbox" checked={!todo.is_active} onChange={() => toggleActive(todo)}/>
                </td>
                <td style={{ border: '1px solid #575757ff', padding: '10px'}}>
                  <button onClick={() => edittask(todo)}>Edit</button>
                  <button onClick={() => deletetask(todo._id)} style={{ marginLeft: '3px'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        )}
        {todos.length === 0 && !loading && <p>No tasks yet. Add one above!</p>}
      </div>
    );
}

export default TodoListCard;