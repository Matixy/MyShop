/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHeart, faCartShopping, faUser, faMagnifyingGlass, faSort, faFilter, faStar } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faHeart, faCartShopping, faUser, faMagnifyingGlass, faSort, faFilter, faFacebook, faGoogle, faStar)

export { FontAwesomeIcon }