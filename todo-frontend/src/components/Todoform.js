import { createTodo } from '../services/todoservices';
import '../index.css';

function TodoFormCard({ form, setForm, todos, setTodos, setLoading, setError}) {
    const handleSubmit = () => {
        setLoading(true);
        const request = createTodo(form);
        
        request.then(res => {
            setTodos([...todos, res.data.data]);
            setForm({ message: '', start_date: '', due_date: '', is_active: true });
            setError('');
        })
        .catch(res => setError(res.response?.data?.message || 'Server Error'))
        .finally(() => setLoading(false));
    };

    return (
        <>
            <div className = "flex items-center justify-center py-1 my-1">
                <input className="border border-#575757ff-200 p-3 my-1" placeholder='Task' value={form.message} onChange={e => setForm({...form, message: e.target.value})}></input>
                <input className="border border-#575757ff-200 p-3 my-1" placeholder='Start Date' type='date' value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})}></input>
                <input className="border border-#575757ff-200 p-3 my-1" placeholder='Due Date' type='date' value={form.due_date} onChange={e => setForm({...form, due_date: e.target.value})}></input>
                <button className="border border-#575757ff-200 p-3 my-1 bg-green-400" type='submit' onClick={handleSubmit}>Add Task</button>
            </div>
        </>
    );
}

export default TodoFormCard;