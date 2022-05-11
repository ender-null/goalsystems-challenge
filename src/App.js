import { useState } from "react";

const App = () => {

  const [list, setList] = useState([
    {
      title: 'task #1',
      editing: false,
      completed: false,
    },
    {
      title: 'task #2',
      editing: false,
      completed: false,
    },
    {
      title: 'task #3',
      editing: false,
      completed: false,
    }
  ]);
  const [input, setInput] = useState('')
  const [itemInput, setItemInput] = useState('')

  const isItemSelected = (item) => {
    return item.completed;
  }

  const toggleAll = () => {
    const _list = [...list];
    setList(_list.map(item => {
      return { ...item, completed: allItemsCompleted() }
    }))
  }

  const toggle = (item) => {
    const _list = [...list];
    _list[list.indexOf(item)].completed = !isItemSelected(item)
    setList(_list)
  }

  const destroy = (item) => {
    const _list = [...list];
    _list.splice(list.indexOf(item), 1)
    setList(_list)
    if (isItemSelected(item)) {
      toggle(item)
    }
  }

  const count = () => {
    return list.reduce((previous, current) => {
      console.log(previous, current)
      return 0
    })
  }

  const clearCompleted = () => {
    const _list = [...list];
    _list.forEach(item => {
      if (item.completed) {
        _list.splice(_list.indexOf(item), 1)
      }
    })
    setList(_list)
  }

  const allItemsCompleted = () => {
    let completed = 0
    list.forEach(item => {
      if (item.completed) {
        completed += 1;
      }
    })
    return list.length === completed
  }

  const itemClassName = (item) => {
    if (item.editing) {
      return 'editing'
    } else if (isItemSelected(item)) {
      return 'completed'
    }
    return ''
  }

  const itemClick = (item, event) => {
    console.log(item, event.detail)
    if (event.detail === 1) {
      toggle(item)
    } else
      if (event.detail === 2) {
        item.editing = true
        setItemInput(item.title)
      }
  }

  const itemSave = (item) => {
    console.log(item)
    const _list = [...list]
    _list.splice(_list.indexOf(item), 1, itemInput)
    console.log(list, _list, itemInput)
    setList(_list)
    setItemInput('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!list.includes(input)) {
        setList([...list, input])
        setInput('')
      }
    } else if (event.key === 'Escape') {
      setInput('')
    }
  }

  const handleKeyDownItem = (event, item) => {
    if (event.key === 'Enter') {
      if (itemInput.length) {
        itemSave(item)
      } else {
        destroy(item)
      }
    }
  }

  return (
    <div className='todoapp'>
      <header>
        <h1>TODOS</h1>
      </header>
      <div className='new-todo'>
        <input onKeyDown={(e) => handleKeyDown(e)} onInput={e => setInput(e.target.value)} className='new-todo' value={input} autoFocus />
      </div>

      {list.length > 0 && <main id='main' className='main'>
        <input type='checkbox' id='toggle-all' className='toggle-all' onChange={() => toggleAll()} checked={allItemsCompleted()} />
        <label htmlFor='toggle-all' />
        <ul className='todo-list'>
          {list.map((item, i) => <li onClick={(e) => itemClick(item, e)} key={`task-${i}`} className={itemClassName(item)}>
            <div className="view">
              <input className='toggle' type='checkbox' id={`task-${i}`} checked={isItemSelected(item)} />
              <label htmlFor={`task-${i}`}>{item.title}</label>
              <i className='destroy' onClick={() => destroy(item)} />
            </div>
            <input value={itemInput} onInput={e => setItemInput(e.target.value)} className='edit' onBlur={() => itemSave(item)} onKeyDown={(e) => handleKeyDownItem(e, item)} type='text' />
          </li>)}
        </ul>
      </main>}

      {list.length > 0 && <footer id='footer' className='footer'>
        <span className='todo-count'>
          <strong>{count()}</strong> items left
        </span>
        <ul className='filters'>
          <li><a href="/" className='selected'>All</a></li>
          <li><a href="/active">Active</a></li>
          <li><a href="/completed">Completed</a></li>
        </ul>
        <button onClick={() => clearCompleted()} className='clear-completed'>Clear completed</button>
      </footer>}
    </div>
  );
}

export default App;
