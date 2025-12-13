import { updateTodo } from '../services/todoservices';
import { useState } from 'react';

function EditFormCard({ todo, onClose, onSave}) {
     const [form, setForm] = useState({
        message: todo.message,
        start_date: todo.start_date.slice(0, 10),
        due_date: todo.due_date.slice(0, 10),
    });
    const [saving, setSaving] = useState(false);
    const [localError, setLocalError] = useState('');
    
    const handleSubmit = () => {
        setSaving(true);
        if(!form.message){
            setLocalError('Task is required');
            return;
        }
        const request = updateTodo(todo._id,form);
        request.then(res => {
            onSave(res.data.data)
            setLocalError('');
            
        })
        .catch(res => setLocalError(res.response?.data?.message || 'Server Error'))
        .finally(() => setSaving(false));
    };

    return (
        <div className="flex flex-col items-center p-5 m-5">
            <h3 className="text-lg font-semibold">EDIT TASK</h3>
            {localError && ( <p className="text-red-500">{localError}</p>)}
            <div className="w-full mt-4">
                <textarea className="w-full min-h-[80px] border border-gray-500 p-2 rounded" value={form.message} 
                onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <div className="w-full mt-4 flex gap-4">
                <input className="flex-1 border border-gray-500 rounded" placeholder="Start Date" type="date" value={form.start_date} 
                onChange={e => setForm({ ...form, start_date: e.target.value })}/>
                <input className="flex-1 border border-gray-500 rounded" placeholder="Due Date" type="date" value={form.due_date}
                onChange={e => setForm({ ...form, due_date: e.target.value })}/>
            </div>
            <div className="w-full mt-5 flex justify-between">
                <button className="bg-green-500 px-3 py-1 rounded" type="button" onClick={handleSubmit}> Done </button>
                <button className="bg-blue-500 px-3 py-1 rounded" type="button" onClick={onClose}> Cancel </button>
            </div>
        </div>
    );
}

export default EditFormCard;