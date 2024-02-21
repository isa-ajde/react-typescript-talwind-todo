import { useEffect, useState } from 'react'
import Form from './Form'
import List from './List'
import { getFromLocalStorage, setFromLocalStorage } from './utils'

function App() {
  const [item, setItem] = useState(getFromLocalStorage('task'))
  const [removeID, setremoveID] = useState<string>('')

  interface handleProps {
    name: string | undefined
    id: string
    draw: boolean
    star: boolean
  }

  const handleTaskAdded = (newValue: handleProps) => {
    let updatedTasks
    const existingTask = item.find(
      (task: { id: string }) => task.id === newValue.id
    )
    if (existingTask) {
      // eğer görev varsa güncelle
      updatedTasks = item.map((task: { id: string; draw: boolean }) => {
        if (task.id === newValue.id) {
          return { ...task, draw: !task.draw }
        }
        return task
      })
    } else {
      updatedTasks = [...item, { ...newValue, draw: false }]
    }

    setItem(updatedTasks)
    setFromLocalStorage('task', updatedTasks)
  }

  const handleStar = (newValue: handleProps) => {
    let updateTasks
    const existingTask = item.find(
      (ıtem: { id: string }) => ıtem.id === newValue.id
    )
    if (existingTask) {
      updateTasks = item.map((ıtem: { id: string; star: boolean }) => {
        if (ıtem.id === newValue.id) {
          return { ...ıtem, star: !ıtem.star }
        }
        return ıtem
      })
    } else {
      updateTasks = [...item, { ...newValue, star: false }]
    }

    setItem(updateTasks)
    setFromLocalStorage('task', updateTasks)
  }

  const handleValueUpdate = (newValue: handleProps) => {
    let updateTasks
    const existingTask = item.find(
      (ıtem: { id: string }) => ıtem.id === newValue.id
    )
    if (existingTask) {
      updateTasks = item.map((ıtem: { name: string; id: string }) => {
        if (ıtem.id === newValue.id) {
          return { ...ıtem, name: newValue.name }
        }
        return ıtem
      })
    } else {
      updateTasks = [...item, { ...newValue, name: item.name }]
    }
    setItem(updateTasks)
    setFromLocalStorage('task', updateTasks)
  }

  useEffect(() => {
    if (removeID) {
      const updatedItems = item.filter(
        (task: { id: string }) => task.id !== removeID
      )
      setItem(updatedItems)
      setFromLocalStorage('task', updatedItems)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeID])

  return (
    <div className="App flex flex-col justify-center h-screen  ">
      <div className="border-2 w-full p-1 bg-slate-500  rounded-lg  max-w-3xl sm:mx-auto ">
        <div className="  border-2 w-full p-7 bg-slate-500  rounded-md  max-w-3xl sm:mx-auto ">
          <List
            item={item}
            setremoveID={setremoveID}
            handleTaskAdded={handleTaskAdded}
            handleStar={handleStar}
            handleValueUpdate={handleValueUpdate}
          />
          <Form handleTaskAdded={handleTaskAdded} />
        </div>
      </div>
    </div>
  )
}

export default App
