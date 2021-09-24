import { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    //Verificando se o campo do input da task esta vazio, caso seja vazio não adiciona nova task
    if (!newTaskTitle) return;

    //Criando uma nova const para gerar o id random e armazenar os dados.
    const newTask ={
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    } 
    //Guardando as informações das task antigas com a mais recente em um array
    setTasks(oldTask => [...oldTask, newTask]);
    //Voltando o campo de input para vazio
    setNewTaskTitle('');   
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    //Mapeando o estado das tasks e alterando seu estado
    const checkTasks = tasks.map(tasks => tasks.id == id ? {
      ...tasks,
      isComplete: !tasks.isComplete
    } : tasks)
    setTasks(checkTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //Filtrando as tasks para removelas
    const deleteTasks = tasks.filter(tasks => tasks.id !== id);
    setTasks(deleteTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}