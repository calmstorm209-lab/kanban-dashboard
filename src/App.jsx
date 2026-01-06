import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import Aside from './components/aside/Aside'

function App() {
  const [showPopup, setShowPopup] = useState(false)

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved)
      : { todo: [], doing: [], done: [] }
  })

  const [dragItem, setDragItem] = useState(null)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const title = document.getElementById('t-name').value
    const desc = document.getElementById('t-desc').value
    const status = document.getElementById('t-status').value

    if (!title) return

    setTasks(prev => ({
      ...prev,
      [status]: [...prev[status], { title, desc }]
    }))

    setShowPopup(false)
    document.getElementById('t-name').value = ''
    document.getElementById('t-desc').value = ''
  }

  function onDragStart(task, from) {
    setDragItem({ task, from })
  }

  function onDrop(to) {
    if (!dragItem) return

    setTasks(prev => {
      const fromList = prev[dragItem.from].filter(
        t => t !== dragItem.task
      )
      const toList = [...prev[to], dragItem.task]

      return {
        ...prev,
        [dragItem.from]: fromList,
        [to]: toList
      }
    })

    setDragItem(null)
  }

  return (
    <div className="container">
      <div className="main-con">
        <Aside />

        <div className="con">
          <Header openPopup={() => setShowPopup(true)} />

          <div className="main">
            <div className="columnli">
              {['todo', 'doing', 'done'].map(key => (
                <div
                  className="fullc"
                  key={key}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => onDrop(key)}
                >
                  <div className={`column ${key}`}>
                    <div className="c-head">
                      <button className="cir"></button>
                      {key}
                    </div>

                    {tasks[key].map((t, i) => (
                      <div
                        className="task"
                        key={i} draggable onDragStart={() => onDragStart(t, key)}
                      >
                        <h6>{t.title}</h6>
                        <p>{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="fullc">
                <div className="createColumn">+ New column</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="overlay">
          <div className="create-task">
            <h2>Add New Task</h2>
            {/* <p onclick={sh}>X</p> */}

            <label>Title</label>
            <input id="t-name" />

            <label>Description</label>
            <input id="t-desc" />

            <label>Status</label>
            <select id="t-status">
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>

            <button className="createBtn" onClick={addTask}>
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
