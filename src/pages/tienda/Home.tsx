//function Home() {
//  return (
//    <div>Home</div>
//  )
//}
//
//export default Home

//import ProductoCard from '../../components/ProductoCard'
//import { productos } from '../../data/productos'
//
//function Home() {
//  return (
//    <div className="container">
//      <ProductoCard
//        producto={productos[0]}
//        onAgregar={(codigo) => console.log(codigo)}
//      />
//    </div>
//  )
//}
//
//export default Home

import ListaProductos from '../../components/ListaProductos'
import { productos } from '../../data/productos'

function Home() {
  return (
    <div className="container">
      <ListaProductos
        productos={productos}
        onAgregar={(codigo) => console.log(codigo)}
      />
    </div>
  )
}

export default Home