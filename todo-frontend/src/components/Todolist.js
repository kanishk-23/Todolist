import { updateTodo, deleteTodo } from '../services/todoservices';
import { useState } from 'react';
import EditFormCard from './editform';
import Modal from './modalform';
import '../index.css';

function TodoListCard({todos, setTodos, loading, setLoading, setError}){
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [activeTodo, setActiveTodo] = useState('');
  
  const MAX_LEN = 15;
  const truncate = (text) =>
  text.length > MAX_LEN ? text.slice(0, MAX_LEN) + '…' : text;  

  const toggleActive = (task) => {
    const newStatus = !task.is_active;
    setLoading(true);
    updateTodo(task._id, { is_active: newStatus })
    .then(res => {
    setTodos(todos.map(t => t._id === task._id ? res.data.data : t));
    })
    .catch(res => setError(res.response?.data?.message || 'Server Error'))
    .finally(() => setLoading(false));
  };
  
  return (
    <div className='max-h-80 overflow-y-auto'>
      {loading ? (<p>Loading tasks...</p>) : (
        <table className='min-w-full border-collapse'>
          <thead className='sticky bg-blue-950 text-white'>
            <tr>
              <th className='top-0 px-1 py-1'>Task</th>
              <th className='top-0 px-1 py-1'>Start Date</th>
              <th className='top-0 px-1 py-1'>Due Date</th>
              <th className='top-0 px-1 py-1'>Status</th>
              <th className='top-0 px-1 py-1'>Actions</th>
            </tr>
          </thead>
          <tbody>
              {todos.map((todo) => (
                <tr key={todo._id }>
                  <td className='p-4'>
                    {todo.is_active ? truncate(todo.message) : <s>{truncate(todo.message)}</s>}
                  </td>
                  <td className='p-4'>
                    {todo.is_active ? todo.start_date.slice(0, 10) : <s>{todo.start_date.slice(0, 10)}</s>}
                  </td>
                  <td className='p-4'>
                    {todo.is_active ? todo.due_date.slice(0, 10) : <s>{todo.due_date.slice(0, 10)}</s>}
                  </td>
                  <td className='p-4'>
                    <input type="checkbox" checked={!todo.is_active} onChange={() => toggleActive(todo)}/>
                  </td>
                  <td className='flex border m-2'>
                    <button className='bg-green-500 mx-1' onClick={() => { setActiveTodo(todo); setModalMode('view'); setModalOpen(true); }}>View</button>
                    <button className='bg-yellow-500 mx-1' onClick={() => { setActiveTodo(todo); setModalMode('edit'); setModalOpen(true); }}>Edit</button>
                    <button className='bg-red-500 mx-1' onClick={() => { setActiveTodo(todo); setModalMode('delete'); setModalOpen(true); }}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {todos.length === 0 && !loading && <p>No tasks yet. Add one above!</p>}
      {modalOpen && activeTodo && (
        <Modal onClose={() => setModalOpen(false)}>
          
          {modalMode === 'view' && (
            <>
              <h3>View Task</h3>
              <p>{activeTodo.message}</p>
              <p>Start: {activeTodo.start_date.slice(0, 10)}</p>
              <p>Due: {activeTodo.due_date.slice(0, 10)}</p>
              <button onClick={() => setModalOpen(false)} className='bg-green-500'>Close</button>
            </>
          )}

          {modalMode === 'edit' && (
            <EditFormCard
              todo={activeTodo}
              onClose={() => setModalOpen(false)}
              onSave={(updated) => {
                setTodos(todos.map(t => t._id === updated._id ? updated : t));
                setModalOpen(false);
              }}
            />
          )}

          {modalMode === 'delete' && (
            <>
              <h3>Delete Task</h3>
              <div className=''>
                <p>Are you sure you want to delete this task?</p>
                <p><strong>{activeTodo.message}</strong></p>
                <div className='flex justify-between'>
                  <button onClick={() => { 
                    deleteTodo(activeTodo._id)
                    .then(() => {
                      setTodos(prev => prev.filter(t => t._id !== activeTodo._id));
                      setError('');
                    })
                    .catch(err => setError(err.response?.data?.message || 'Server Error'))
                    .finally(() => {
                      setLoading(false);
                      setModalOpen(false);});
                    }} className='bg-red-500 m-1'>
                  Yes, delete
                  </button>
                  <button onClick={() => setModalOpen(false)} className='bg-blue-500 m-1'>Cancel</button>
                </div>
              </div>
            </>
          )}
        </Modal>
      )}

    </div>
  );
}

export default TodoListCard;