import { useState, useEffect } from 'react'
import './aside.css'
import group15 from '../../assets/Group 15.png'
import image from '../../assets/image.png'
import eye from '../../assets/eye.png'
import oEye from '../../assets/openeye.png'

function Aside() {
  const [dark, setDark] = useState(false)
  const [sideBar, setSideBar] = useState(true)

  useEffect(() => {
    document.documentElement.className = dark ? 'dark' : 'light'
  }, [dark])

  return (
    <div className="mainAside">
      <div className={`aside ${sideBar ? 'show' : 'hide'}`}>
        <div className="logo">
          <img src={group15} />
          <h1>Kanban</h1>
        </div>

        <div className="nav-bars">
          <div className="platform nav">
            <img src={image} />
            Platform launch
          </div>
        </div>

        <div className="mode-change" onClick={() => setDark(p => !p)}>
          <div className="sun"></div>
          <div className="toggle">
            <div className={dark ? 'dark-but' : 'light-but'}></div>
          </div>
          <div className="moon"></div>
        </div>

        <div className="hide-bar" onClick={() => setSideBar(p => !p)}>
          <img src={eye} />
          <p>Hide sidebar</p>
        </div>
      </div>

      <button className={`af-h ${sideBar ? 'hide' : 'show'}`} onClick={() => setSideBar(p => !p)}>
        <img src={oEye} />
      </button>
    </div>
  )
}

export default Aside
