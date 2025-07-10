import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

// stores
import { useStoreFavouritesProducts } from '@/stores/storeFavouritesProducts'

// auth
import { auth, GoogleAuthProvider, googleProvider } from '@/js/firebase'
import { 
  createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged,  
  signInWithPopup } from 'firebase/auth'

export const useStoreAuth = defineStore('storeAuth', () => {

  const user = ref({})

  const init = () => {
    const storeFavouritesProducts = useStoreFavouritesProducts()

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value.id = firebaseUser.uid
        user.value.email = firebaseUser.email
        user.value.displayName = firebaseUser.displayName || firebaseUser.email.split('@')[0]
        storeFavouritesProducts.init()
      } else {
        user.value = {}
        storeFavouritesProducts.clearFavProducts()
      }
    })
  }

  const registerUser = (credentials) => {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User: ', user)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const loginUser = (credentials) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const setUserToken = (token) => {
    user.value.token = token
  }

  const loginGoogleUser = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setUserToken(credential.accessToken)
      }).catch((error) => {
        console.log(error);
      });
  }
          
  const logoutUser = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    })
  }

  return { user, init, registerUser, loginUser, loginGoogleUser, logoutUser }
})
