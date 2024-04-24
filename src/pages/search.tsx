import {useState} from 'react';
import ProductCard from '../components/product-card';
const Search = () => {

  const [search,setSearch]=useState("");
  const [sort,setSort]=useState("");
  const [maxPrice,setMaxPrice]=useState(10000);
  const [category,setCategory]=useState("");
  const [page,setPage]=useState(1);
  const addToCartHandler =()=> {};

  const isPrevPage= page>1;
  const isNextPage=page<4;
  

  return (
    <div className='product-search-page'>
      <aside>
        <h2>Filters</h2>
        <div> 
          <h4>Sort</h4>

          <select value={sort} onChange={e=>setSort(e.target.value)}>
            <option value=''>None </option>
            <option value='asc'>Price(Low to High) </option>
            <option value='dsc'>Price(High to low) </option>
          </select>

        </div>
        
        <div>
          <h4>Max Price:{maxPrice || ""}</h4>
          <input type='range' min={100} max={100000} value={maxPrice} onChange={e=>setMaxPrice(e.target.value)}/>
        </div>

        <div> 
          <h4>Category</h4>

          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option value=''>All </option>
            <option value='laptop'> </option>
            <option value='camera'>Camera </option>
            <option value='game'>Game </option>
          </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input type='text' placeholder='search by name....' value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <div className='search-product-list'>
          <ProductCard
               productId="asdfasdf" 
               name='Macbook' 
               price={234} 
               stock={244} 
               handler={addToCartHandler} 
               photo="https://m.media-amazon.com/images/I/71TPda7cwUL._SX522_.jpg"
          />
        </div>
        <article>
          <button disabled={!isPrevPage} onClick={()=>setPage(prev=>prev-1)}>Previous</button>
          <span>
            {page} of {4}
          </span>
          <button disabled={!isNextPage} onClick={()=>setPage(next=>next+1)}>Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search;
