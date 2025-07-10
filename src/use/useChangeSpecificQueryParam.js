import { deepCloneObject } from './useDeepCloneObject'


export function changeSpecificQueryParam(queryParamToDelete, route, router, valueToChange = undefined) { 
  let queryObject = deepCloneObject(route.query)

  queryObject[queryParamToDelete] = valueToChange
  router.replace({query: queryObject})
}