<template>
  <Autocomplete
    label="Cidade"
    :list="responseList"
    @search="getCity"
    @clear="clearList"
    @input="$emit('input', $event)"
  />
</template>

<script>
import { ref  } from 'vue'
import Geolocation from '../api/geolocation'
import Autocomplete from './Autocomplete'
export default {
  name: 'AutocompleteCity',

  components: {
    Autocomplete
  },

  emits: ['input'],

  setup () {
    const responseList = ref([])
  
    const getCity = async (input) => {
      try {
        const options = {
          name: input,
          language: 'pt',
          count: 10
        }

        const resp = await Geolocation(options)
        if (resp.results.length > 0) {
          const formatedCityList = resp.results.map(city => {
            return { text: `${city.name}, ${city.admin1} (${city.country_code})`, value: { latitude: city.latitude, longitude: city.longitude, name: city.name } }
          })
          responseList.value = formatedCityList
        }
        console.log(responseList.value)

      } catch (err) {
        console.log('%cError while fetching city data', 'color: red')
        console.log(err)
      }
    }

    const clearList = () => {
      responseList.value = []
    }

    return {
      responseList,
      getCity,
      clearList
    }
  },

}
</script>
