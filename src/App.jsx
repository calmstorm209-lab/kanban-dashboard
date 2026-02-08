import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/header/Header'
import Aside from './components/aside/Aside'

function App() {
  const [showPopup, setShowPopup] = useState(false)
  const [dragItem, setDragItem] = useState(null)

  const [showColumnPopup, setShowColumnPopup] = useState(false)
  const [newColumnName, setNewColumnName] = useState('')


  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('columns')
    return saved
      ? JSON.parse(saved)
      : { todo: [], doing: [], done: [] }
  })


function cancel(){

    setShowPopup(false);
}

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns))
  }, [columns])

  useEffect(() => {
    const handler = e => {
      const key = e.detail.name.toLowerCase().replace(/\s+/g, '-')
      setColumns(prev => (prev[key] ? prev : { ...prev, [key]: [] }))
    }

    window.addEventListener('addColumn', handler)
    return () => window.removeEventListener('addColumn', handler)
  }, [])

  function addTask() {
    const title = document.getElementById('t-name').value
    const desc = document.getElementById('t-desc').value
    const status = document.getElementById('t-status').value
    const subs = document.getElementById('t-subtasks').value

    if (!title) return

    const subtasks = subs
      ? subs.split(',').map(s => ({ title: s.trim(), done: false }))
      : []

    setColumns(prev => ({
      ...prev,
      [status]: [...prev[status], { title, desc, subtasks }]
    }))

    setShowPopup(false)
  }

  function onDragStart(task, from) {
    setDragItem({ task, from })
  }

  function onDrop(to) {
    if (!dragItem) return

    setColumns(prev => {
      const fromList = prev[dragItem.from].filter(t => t !== dragItem.task)
      const toList = [...prev[to], dragItem.task]
      return { ...prev, [dragItem.from]: fromList, [to]: toList }
    })

    setDragItem(null)
  }

  function addColumn() {
    if (!newColumnName.trim()) return

    const key = newColumnName
      .toLowerCase()

    setColumns(prev =>
      prev[key] ? prev : { ...prev, [key]: [] }
    )

    setNewColumnName('')
    setShowColumnPopup(false)
  }

return (
  <div className="container">
    <div className="main-con">
      <Aside />

      <div className="con">
        <Header openPopup={() => setShowPopup(true)} />

        <div className="main">
          <div className="columnli">

            <div className="fullc">
              <div
                className="createColumn"
                onClick={() => setShowColumnPopup(true)}
              >
                + New column
              </div>
            </div>

            {Object.keys(columns).map(key => (
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

                  {columns[key].map((t, i) => (
                    <div
                      className="task"
                      key={i}
                      draggable
                      onDragStart={() => onDragStart(t, key)}
                    >
                      <h6>{t.title}</h6>
                      <p>{t.desc}</p>

                      {t.subtasks?.length > 0 && (
                        <small>
                          {t.subtasks.filter(s => s.done).length} of {t.subtasks.length} subtasks
                        </small>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
    {showPopup && (
      <div className="overlay">
        <div className="create-task">
          <div id="hee">Add New Task             <p id="cancel" onClick={cancel}>x</p></div>
          

          <label>Title</label>
          <input id="t-name" />

          <label>Description</label>
          <input id="t-desc" />

          <label>Subtasks (comma separated)</label>
          <input id="t-subtasks" placeholder="Design, API, Testing" />

          <label>Status</label>
          <select id="t-status">
            {Object.keys(columns).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <button className="createBtn" onClick={addTask}>
            Create Task
          </button>
        </div>
      </div>
    )}
    {showColumnPopup && (
      <div className="overlay">
        <div className="create-task">
          <h2>Add New Column</h2>

          <label>Column Name</label>
          <input
            value={newColumnName}
            onChange={e => setNewColumnName(e.target.value)}
            placeholder="e.g. Review"
          />

          <button className="createBtn" onClick={addColumn}>
            Create Column
          </button>
        </div>
      </div>
    )}
  </div>
)
}
export default App
