import Styles from "../Pages/ProductPage.module.css"
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../Redux/ProductReducer/action';
import { SideBarJewelry } from '../Components/SideBarJewelry';
import { useParams, useSearchParams } from 'react-router-dom';
import SideBarWatches from '../Components/SideBarWatches';
import ProductCard from '../Components/ProductCard';
import Navbar from '../Components/Navbar';
import ProductImg from '../product-image/ProductImg.png'
import Footer from '../Components/Footer';
import Pagination from '../Components/Pegination';
const ProductPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { name } = useParams()
  const [searchParams] = useSearchParams()

  let { products, isError, isLoading, totalPages } = useSelector((store: any) => {
    return {
      products: store.productReducer.products,
      isLoading: store.productReducer.isLoading,
      isError: store.productReducer.isError,
      totalPages: store.productReducer.totalPages
    }
  }, shallowEqual);

  useEffect(() => {
    let paramsObj = {};
    if (name === "Jewelry" || "Watches") {
      paramsObj = {
        params: {
          _limit: 12,
          _page: page,
          name: name,
          category: searchParams.getAll("category"),
          brand: searchParams.getAll("brand"),
          _sort: searchParams.get("order") && "price",
          _order: searchParams.get("order"),
          q: searchParams.getAll("search"),
        },
      };
    } else {
      paramsObj = {

        params: {
          _limit: 12,
          _page: page,
          category: name,
          brand: searchParams.getAll("brand"),
          _sort: searchParams.get("order") && "price",
          _order: searchParams.get("order"),
          q: searchParams.getAll("search"),
        },
      };
    }
    dispatch(getProducts(paramsObj))

  }, [searchParams, page, name, dispatch])

  return (
    <div>
      <Navbar />

      <img src={ProductImg} alt="" style={{width:"100%",height:"400px",objectFit:"fill" }} />
      
       <div className={Styles.productsection}>
 {name === "Watches" ? 
 <div ><SideBarWatches /></div>
 : <div ><SideBarJewelry /></div>}
      
 
        <div className={Styles.productlist}>
          {isError && <h1>Error Occurs</h1>}
          {isLoading && <h1>Loading...</h1>}
          {products.length > 0 &&
            products.map((ele: any) => (<ProductCard key={ele.id} {...ele} />
            ))}

        </div>


        </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      {/* ==========================   Sort && filter   ========================================= */}
     
 
   {/* ========================== */} 
      <div>
        <Footer />
      </div>
     
    </div>
  )
}


export default ProductPage
