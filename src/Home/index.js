import {useEffect, useState} from 'react'
import Menu from '../Menu'
import Card from '../Card'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const Home = () => {
  const [items, setItems] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [category, setCategory] = useState(0)

  const onCategory = i => {
    setCategory(i)
  }
  const onData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      )
      if (response.ok) {
        const data = await response.json()
        setItems(data[0].table_menu_list)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
      console.error(error)
    }
  }
  useEffect(() => {
    onData()
  }, [])

  return (
    <div>
      <>
        <Header />
        <Menu items={items} onCategory={onCategory} category={category} />
        {apiStatus === apiStatusConstants.success ? (
          <div>
            {Array.isArray(items[category].category_dishes) &&
              items[category].category_dishes.map(v => (
                <Card key={v.dish_id} item={v} />
              ))}
          </div>
        ) : null}
      </>
    </div>
  )
}
export default Home
