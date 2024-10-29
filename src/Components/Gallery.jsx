import React from 'react'
import './gallery.css'
function Gallery({products = []}) {
  return (
    <ul className="products">
      {products.map((product) => {
        return (
          <li key={product.id} className="products__single">
            <img src={product.thumbnail} alt={product.title} />
            <span>{product.title}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default Gallery
