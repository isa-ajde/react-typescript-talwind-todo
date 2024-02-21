import { FaPlus, FaRegCircle } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'

interface FormProps {
  handleTaskAdded: (a: {
    name: string
    id: string
    draw: boolean
    star: boolean
  }) => void
}

function Form({ handleTaskAdded }: FormProps) {
  const [ıcon, setIcon] = useState<boolean>(false)
  let inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState<string>('')

  const remowAtribute = () => {
    setIcon(true)
    if (inputRef.current) {
      inputRef.current.removeAttribute('placeholder')
    }
  }

  const restorePlaceholder = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement // HTMLElement olarak dönüştür
    if (!targetElement.classList.contains('input-wrapper')) {
      if (inputRef.current && !inputRef.current.value) {
        inputRef.current.setAttribute('placeholder', 'Görev ekle') // Input değeri boşsa, placeholder'ı geri getir
        setIcon(false)
      }
    }
  }

  const handleClick = () => {
    const ıtemValue = {
      name: value,
      id: nanoid(),
      draw: false,
      star: false,
    }
    if (value.trim() !== '') {
      handleTaskAdded(ıtemValue)
      setValue('')
    }
  }

  useEffect(() => {
    document.addEventListener('click', restorePlaceholder)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="input-wrapper group hover:bg-gray-700 flex flex-row transition justify-center items-center  bg-gray-600 px-3 rounded-lg   ">
        <span>
          {ıcon ? (
            <FaRegCircle
              title="Ekle"
              className="text-white size-6"
              onClick={handleClick}
            />
          ) : (
            <FaPlus className="text-white size-6" />
          )}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-wrapper w-full p-2 bg-gray-600  group-hover:bg-gray-700 transition text-white tracking-wider  focus:border-transparent focus:outline-none "
          placeholder="Görev ekle"
          onFocus={remowAtribute}
          ref={inputRef}
        />
      </div>
    </div>
  )
}

export default Form
