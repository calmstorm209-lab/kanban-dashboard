import './header.css'
import dot from '../../assets/3Dot.png'

function Header({ openPopup }) {
  return (
    <div className="header">
      <div className="left">
        <h2>Platform launch</h2>
      </div>

      <div className="right">
        <button id="addTask" onClick={openPopup}>+ Add new task</button>
        <img src={dot} />
      </div>
    </div>
  )
}

export default Header
