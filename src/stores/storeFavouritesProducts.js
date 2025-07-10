import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// composables
import { deepCloneObject } from '@/use/useDeepCloneObject'

// stores
import { useStoreProducts } from '@/stores/storeProducts'
import { useStoreAuth } from '@/stores/storeAuth'

// firestore database
import { db } from '@/js/firebase'

import { 
  onSnapshot, 
  doc, updateDoc, setDoc
} from 'firebase/firestore';

let favouritesProductsRef
let getFavProductsSnapshot = null

export const useStoreFavouritesProducts = defineStore('storeFavouritesProductsId', () => {

  const favouritesProducts = ref([])

  const init = () => {
    const storeAuth = useStoreAuth()
    // // initialize our database refs
    favouritesProductsRef = doc(db, 'users', storeAuth.user.id)
    getFavProducts()
  }

  const getFavProducts = async () => {
    const storeProducts = useStoreProducts()

    getFavProductsSnapshot = onSnapshot(favouritesProductsRef, (doc) => {
      let newFavouritesProducts = []

      newFavouritesProducts = doc.data().favouriteProducts

      favouritesProducts.value = storeProducts.products.list.filter(product => newFavouritesProducts.includes(product.id))
    }, error => {
      console.log(error.message);
    })
  }

  const addFavouriteProduct = async (productId) =>  {
    let favouritesProductsToFirebase = favouritesProducts.value.map(product => product.id)
    favouritesProductsToFirebase.push(productId)

    await setDoc(favouritesProductsRef, {
      favouriteProducts: favouritesProductsToFirebase
    })
  }

  const deleteFavouriteProduct = async (productId) => {
    let favouritesProductsToFirebase = favouritesProducts.value.map(product => product.id)
    favouritesProductsToFirebase.splice(favouritesProductsToFirebase.indexOf(productId),1)

    await updateDoc(favouritesProductsRef, {
      favouriteProducts: favouritesProductsToFirebase
    })
  }

  const clearFavProducts = () => {
    favouritesProducts.value = []
    if (getFavProductsSnapshot) getFavProductsSnapshot() // unsubscribe from any active listener
  }

  const countFavouritesProducts = computed(()=> favouritesProducts.value.length)

  return { init , favouritesProducts, addFavouriteProduct, deleteFavouriteProduct, clearFavProducts, countFavouritesProducts }
})
