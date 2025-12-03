import { createTodo, updateTodo } from '../services/todoservices';

function TodoFormCard({ form, setForm, todos, setTodos, editId, setEditId, setLoading, setError}) {
    const cancelEdit = () => {
        setEditId(null);
        setForm({ message: '', start_date: '', due_date: '' });
        setError('');
    };
  
    const handleSubmit = () => {
        setLoading(true);
        const request = editId ? updateTodo(editId, form) : createTodo(form);
        
        request.then(res => {
        if (editId) {
            setTodos(todos.map(t => t._id === editId ? res.data.data : t));
            setEditId(null);
        } else {
            setTodos([...todos, res.data.data]);
        }
        setForm({ message: '', start_date: '', due_date: '', is_active: true });
        setError('');
        })
        .catch(res => setError(res.response?.data?.message || 'Server Error'))
        .finally(() => setLoading(false));
    };

    return (
        <div style={{alignItems: 'center', paddingTop: 20, marginTop: 20  }}>
            <input style={{border: '1px solid #575757ff', padding: '10px', marginTop: 20}} placeholder='Task' value={form.message} onChange={e => setForm({...form, message: e.target.value})}></input>
            <input style={{border: '1px solid #575757ff', padding: '10px', marginTop: 20}} placeholder='Start Date' type='date' value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})}></input>
            <input style={{border: '1px solid #575757ff', padding: '10px', marginTop: 20}} placeholder='Due Date' type='date' value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})}></input>
            <button style={{border: '1px solid #575757ff', padding: '10px', marginTop: 20 }} type='submit' onClick={handleSubmit}>{editId ? 'Update Task' : 'Add Task'}</button>
            {editId && (<button style={{border: '1px solid #575757ff', padding: '10px', marginTop: 20 }} type='button' onClick={cancelEdit}>Cancel</button>)}
        </div>
    );
}

export default TodoFormCard;