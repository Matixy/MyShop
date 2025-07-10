import { useStoreFavouritesProducts } from '@/stores/storeFavouritesProducts.js'
import { useStoreAuth } from '@/stores/storeAuth.js'

export function handleFavouriteClick (e, product, router) {
  const storeAuth = useStoreAuth()
  const storeFavouritesProducts = useStoreFavouritesProducts()

  e.stopPropagation()
  if (!storeAuth.user.id) {
    router.push({name: 'user'})
  } else {
    if (storeFavouritesProducts.favouritesProducts.includes(product)) {
      storeFavouritesProducts.deleteFavouriteProduct(product.id)
    } else {
      storeFavouritesProducts.addFavouriteProduct(product.id)
    }
  }
}