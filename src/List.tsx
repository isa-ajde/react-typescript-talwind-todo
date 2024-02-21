import {
  FaChevronRight,
  FaChevronDown,
  FaCheckCircle,
  FaRegCircle,
} from 'react-icons/fa'
import { FaRegStar, FaStar } from 'react-icons/fa6'
import { useEffect, useState, useRef } from 'react'

interface ListProps {
  item: { name: string; id: string; draw: boolean; star: boolean }[]
  setremoveID: React.Dispatch<React.SetStateAction<string>>
  handleTaskAdded: (a: {
    name: string
    id: string
    draw: boolean
    star: boolean
  }) => void
  handleStar: (a: {
    name: string
    id: string
    draw: boolean
    star: boolean
  }) => void
  handleValueUpdate: (a: {
    name: string | undefined
    id: string
    draw: boolean
    star: boolean
  }) => void
}

function List({
  item,
  setremoveID,
  handleTaskAdded,
  handleStar,
  handleValueUpdate,
}: ListProps) {
  const [chevron, setChevron] = useState<boolean>(false)
  const pRef = useRef<HTMLParagraphElement>(null)
  const [value, setValue] = useState<string | undefined>('')
  const [openEdit, setOpenEdit] = useState<string | null>(null)

  useEffect(() => {
    document.addEventListener('click', restorePlaceholder)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const restorePlaceholder = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement // HTMLElement olarak dönüştür
    if (!targetElement.classList.contains('buton-wrapper')) {
    }
  }

  const handleDraw = (id: string) => {
    const data = item.find((ıtem) => ıtem.id === id)
    if (data) {
      const newData = {
        name: data.name,
        id: data.id,
        draw: data.draw,
        star: data.star,
      }
      handleTaskAdded(newData)
    }
  }

  const handleStarTask = (id: string) => {
    const data = item.find((ıtem) => ıtem.id === id)

    if (data) {
      const newData = {
        name: data.name,
        id: data.id,
        draw: data.draw,
        star: data.star,
      }
      handleStar(newData)
    }
  }

  const handleValue = (id: string) => {
    const data = item.find((ıtem) => ıtem.id === id)
    if (data) {
      setValue(data.name)
    }
  }

  const handleValueTask = (id: string) => {
    const data = item.find((ıtem) => ıtem.id === id)

    if (data) {
      const newData = {
        name: value,
        id: data.id,
        draw: data.draw,
        star: data.star,
      }
      handleValueUpdate(newData)
    }
    setOpenEdit(null)
  }

  const countDrawTrue = (
    item: {
      name: string
      id: string
      draw: boolean
      star: boolean
    }[]
  ): number => {
    // Başlangıç değeri olarak 0'ı tanımla
    let count = 0

    // Her bir öğe üzerinde döngü yap ve draw değeri true ise count'u arttır
    item.map((item) => {
      if (item.draw === true) {
        count++
      }
      return null
    })

    // Sonuç olarak count'u döndür
    return count
  }

  return (
    <div className="mb-5">
      {/*  */}
      {item &&
        item.map(
          (
            i: { name: string; id: string; draw: boolean; star: boolean },
            index: number
          ) => {
            return (
              <div key={index} className="mt-3   ">
                {openEdit === i.id ? (
                  <div className="flex flex-col mb-2 pb-3 border-b-2">
                    <div className="bg-gray-700 hover:bg-gray-800 group p-2 rounded-md flex justify-between items-center w-full mb-2 ">
                      <div className="flex justify-center items-center w-full   ">
                        <span>
                          {i.draw ? (
                            <FaCheckCircle
                              onClick={() => handleDraw(i.id)}
                              className="text-blue-200 size-5 "
                            />
                          ) : (
                            <FaRegCircle
                              onClick={() => handleDraw(i.id)}
                              className="text-blue-200 size-5 "
                            />
                          )}
                        </span>

                        <input
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          type="text"
                          className="input-wrapper w-full p-2 bg-gray-700 group-hover:bg-gray-800  text-white tracking-wider  focus:border-transparent focus:outline-none "
                        />
                      </div>
                      <span>
                        {i.star ? (
                          <FaStar
                            onClick={() => handleStarTask(i.id)}
                            className="text-yellow-300 cursor-pointer size-7 mr-1  "
                          />
                        ) : (
                          <FaRegStar
                            onClick={() => handleStarTask(i.id)}
                            className="text-yellow-300 cursor-pointer size-7 mr-1  "
                          />
                        )}
                      </span>
                    </div>
                    <div className="buton-container grid grid-cols-3 items-center gap-1 ml-1 ">
                      <button
                        onClick={() => setOpenEdit(null)}
                        className="px-4 py-2 text-gray-300  bg-blue-900 hover:bg-blue-950 transition rounded-l-md "
                      >
                        iptal
                      </button>
                      <button
                        onClick={() => handleValueTask(i.id)}
                        className="px-4 py-2 text-gray-300  bg-green-900 hover:bg-green-950 transition "
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => setremoveID(i.id)}
                        className="px-4 py-2 text-gray-300 bg-red-900 hover:bg-red-950 transition rounded-r-md "
                      >
                        sil
                      </button>
                    </div>
                  </div>
                ) : (
                  //!------------------------------------------------------------------------------------------
                  //!------------------------------------------------------------------------------------------
                  i.draw === false && (
                    <div className="flex mb-2 ">
                      <div className="bg-gray-700 hover:bg-gray-800 p-2 rounded-l-md truncate cursor-default flex justify-center items-center w-full ">
                        <span>
                          {i.draw ? (
                            <FaCheckCircle
                              onClick={() => handleDraw(i.id)}
                              className="text-blue-200 size-5 "
                            />
                          ) : (
                            <FaRegCircle
                              onClick={() => handleDraw(i.id)}
                              className="text-blue-200 size-5 "
                            />
                          )}
                        </span>
                        <p
                          onClick={() => {
                            setOpenEdit(i.id)
                            handleValue(i.id)
                          }}
                          ref={pRef}
                          className={`truncate mx-3 w-full text-white  ${
                            i.draw && 'line-through italic '
                          } `}
                        >
                          {i.name}
                        </p>
                        <span>
                          {i.star ? (
                            <FaStar
                              onClick={() => handleStarTask(i.id)}
                              className="text-yellow-300 cursor-pointer size-7 mr-1  "
                            />
                          ) : (
                            <FaRegStar
                              onClick={() => handleStarTask(i.id)}
                              className="text-yellow-300 cursor-pointer size-7 mr-1 "
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          }
        )}
      {/*  */}
      <p className="mb-4">
        {countDrawTrue(item) > 0 && (
          <button
            onClick={() => setChevron(!chevron)}
            className="flex justify-center items-center gap-2 font-medium tracking-wider text-white border-2 hover:border-gray-700 transition   border-gray-600 px-4 py-1  rounded-md"
          >
            <span>{chevron ? <FaChevronDown /> : <FaChevronRight />}</span>
            Tamamlandı
            <span>{countDrawTrue(item)}</span>
          </button>
        )}
      </p>
      {/*  */}
      {item.map(
        (i: { id: string; draw: boolean; name: string; star: boolean }) => {
          return (
            i.draw === true && (
              <div>
                {chevron && (
                  <div className="flex mb-2 ">
                    <div className="bg-gray-700 hover:bg-gray-800 p-2 rounded-l-md truncate cursor-default flex justify-center items-center w-full ">
                      <span>
                        {i.draw ? (
                          <FaCheckCircle
                            onClick={() => handleDraw(i.id)}
                            className="text-blue-200 size-5 "
                          />
                        ) : (
                          <FaRegCircle
                            onClick={() => handleDraw(i.id)}
                            className="text-blue-200 size-5 "
                          />
                        )}
                      </span>
                      <p
                        onClick={() => {
                          setOpenEdit(i.id)
                          handleValue(i.id)
                        }}
                        ref={pRef}
                        className={`truncate mx-3 w-full text-white  ${
                          i.draw && 'line-through italic '
                        } `}
                      >
                        {i.name}
                      </p>
                      <span>
                        {i.star ? (
                          <FaStar
                            onClick={() => handleStarTask(i.id)}
                            className="text-yellow-300 cursor-pointer size-7 mr-1  "
                          />
                        ) : (
                          <FaRegStar
                            onClick={() => handleStarTask(i.id)}
                            className="text-yellow-300 cursor-pointer size-7 mr-1 "
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          )
        }
      )}
    </div>
  )
}

export default List
