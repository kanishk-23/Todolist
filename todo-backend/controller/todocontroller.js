const Todo = require('../model/todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ success: true, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new todo
exports.createNewTodo = async (req, res) => {
  try {
    const data = req.body;
    // Basic validations
    if (data.Id) return res.status(400).json({ success: false, message: 'Id not required' });
    if (!data.message) return res.status(400).json({ success: false, message: 'No message/task provided' });
    if (!data.due_date) return res.status(400).json({ success: false, message: 'No due date provided' });
    if (!data.start_date) return res.status(400).json({ success: false, message: 'No start date provided' });

    // Date parsing and validation
    const startDate = new Date(data.start_date);
    const dueDate = new Date(data.due_date);
    if (isNaN(startDate.getTime()) || isNaN(dueDate.getTime()))
      return res.status(400).json({ success: false, message: 'Invalid date format. Please use YYYY-MM-DD.' });
    if (startDate > dueDate)
      return res.status(400).json({ success: false, message: 'Start date must not be after due date.' });

    // Set is_active if due date is passed
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const is_active = dueDate < currentDate ? false : true;

    // Create and save new todo
    const newTodo = new Todo({
      message: data.message,
      due_date: dueDate,
      start_date: startDate,
      is_active: is_active
    });
    await newTodo.save();

    res.status(201).json({ success: true, message: 'Task created successfully', data: newTodo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update todo by ID
exports.updateTodoById = async (req, res) => {
  try{
    const { id } = req.params;
    const data = req.body;

    // Don't allow Id in update
    if ('Id' in data)  return res.status(400).json({ 
      success: false, message: 'Id cannot be modified'
    });

    // Restricted modification of fields
    const allowedFields = ['message', 'due_date', 'start_date', 'is_active'];
    // Reject any extra fields not in allowedFields
    const keys = Object.keys(data);
    for (const key of keys){
      if (!allowedFields.includes(key))  return res.status(400).json({
        success: false, message: `Field '${key}' cannot be modified or does not exist`
      });
    }

    // Fetch existing todo
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ success: false, message: 'Task not found' });

    // Apply updates and validate dates
    if ('start_date' in data || 'due_date' in data) {
      const newStartDate = 'start_date' in data ? new Date(data.start_date) : todo.start_date;
      const newDueDate = 'due_date' in data ? new Date(data.due_date) : todo.due_date;
      if (isNaN(newStartDate.getTime()) || isNaN(newDueDate.getTime())){
        return res.status(400).json({ success: false, message: 'Invalid date format. Use YYYY-MM-DD.' });
      }  
      if (newStartDate > newDueDate){
        return res.status(400).json({ success: false, message: 'Start date must not be after due date.' });
      }
      todo.start_date = newStartDate;
      todo.due_date = newDueDate;
    }

    if ('message' in data) todo.message = data.message;
    if ('is_active' in data) todo.is_active = data.is_active;

    // Optionally auto-update is_active if due_date is passed
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (todo.due_date < currentDate) todo.is_active = false;
    await todo.save();
    res.status(200).json({ success: true, message: 'Task updated successfully', data: todo });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Delete todo by ID
exports.deleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ success: false, message: 'Task not found' });
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};