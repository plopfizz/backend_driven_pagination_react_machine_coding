import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import Gallery from './Components/Gallery'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const fetchImages = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://dummyjson.com/products?limit=100')
      if (!response.ok) {
        throw new Error('Unknown error occurred')
      }
      const data = await response.json()
      if (data && data.products.length > 0) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error('Fetch error:', error) // Log the error for debugging
    } finally {
      setLoading(false) // Set loading to false after fetch completes or errors out
    }
  }
  const handlePageNavigation = (e, isPrev) => {
    if (isPrev) {
      setPage(page - 1)
    } else {
      setPage(page + 1)
    }
    e.stopPropogation()
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <>
      {!loading && (
        <div className="Gallery">
          <h3>Gallery Component</h3>
          <Gallery products={products.slice(page * 10 - 10, 10 * page)} />
          {products.length > 0 && (
            <div className="pagination">
              <button onClick={() => handlePageNavigation(e, true)}>⏮️</button>
              <span>{page}</span>
              <button onClick={() => handlePageNavigation(e, false)}>⏭️</button>
            </div>
          )}
        </div>
      )}
      {loading && <div>Loading...</div>}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
