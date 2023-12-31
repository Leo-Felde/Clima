<template>
  <div class="wrapper">
    <div id="view-card">
      <div class="title">
        <span class="city-name">
          Clima para 
          <span
            id="city-name-button"
            @click="showDialog = true"
          >
            {{ cityName }}
            <mdicon
              name="map-marker"
              size="18"
            />
          </span>
  
        </span>
        <span class="day-and-time">
          {{ currentDateTime }}
          <!-- <button @click="getWeatherData"> atualizar </button> -->
        </span>
      </div>

      <WeatherDetails
        :data="allData"
        :temp-preference="tempCelsius ? 'C' : 'F'"
        :selected-day="selectedDay"
        @change-temp-preference="changeTempPreference()"
      />
    </div>

    <Forecast
      :value="foreCastData"
      :selected-day="selectedDay"
      @change-selected-day="changeSelectedDay"
    />

    <DialogAutocompeteCity
      v-model="showDialog"
      @input="handleCityChange"
    />
  </div>
</template>

<script>
import { ref, onMounted  } from 'vue'

import Weather from '../api/weather'
import Forecast from './Forecast.vue'
import WeatherDetails from './WeatherDetails.vue'
import DialogAutocompeteCity from './DialogAutocompeteCity.vue'

export default {
  name: 'MainView',

  components: {
    Forecast,
    WeatherDetails,
    DialogAutocompeteCity
},

  setup () {
    const cityName = ref('Rebouças')
    const latitude = ref('-25.62')
    const longitude = ref('-50.69')
    const tempCelsius = ref(true)
    const currentDateTime = ref(null)
    const showDialog = ref(false)

    const allData = ref({})
    const foreCastData = ref({})
    const selectedDay = ref(0)


    onMounted(() => {
      getWeatherData()
    })

    const changeTempPreference = () => {
      tempCelsius.value = !tempCelsius.value
      getWeatherData()
    }

    const changeSelectedDay = (index) => {
      selectedDay.value = index
      updateDateTime()
    }

    const updateDateTime = () => {
      const currentDate = new Date()
      const selectedDate = allData.value?.daily ? new Date(`${allData.value.daily.time[selectedDay.value]}T00:00:00`) : new Date() // todo

      currentDate.setHours(0, 0, 0, 0)
      selectedDate.setHours(0, 0, 0, 0)
      
      if (currentDate.getTime() === selectedDate.getTime()) {
        currentDateTime.value = new Date().toLocaleTimeString(undefined, { weekday: 'long', hour: 'numeric', minute: 'numeric' })
      } else {
        currentDateTime.value = `${selectedDate.toLocaleString(undefined, { weekday: 'long' })} dia ${selectedDate.getDate()}`
      }
    }

    const getWeatherData = async () => {
      updateDateTime()

      try {
        const options = {
          latitude: latitude.value,
          longitude: longitude.value,
          current_weather: true,
          hourly: 'temperature_2m',
          daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max,winddirection_10m_dominant',
          timezone: 'America/Sao_Paulo',
          temperature_unit: tempCelsius.value ? 'celsius' : 'fahrenheit'
        }

        const resp = await Weather(options)
        allData.value = resp
        foreCastData.value = { ...allData.value.daily }
      } catch (err) {
        console.log('%cError while fetching weather data', 'color: red')
        console.log(err)
      }
    }

    const handleCityChange = (city) => {
      cityName.value = city.name
      longitude.value = city.longitude
      latitude.value = city.latitude
      getWeatherData()
    }

    return {
      cityName,
      tempCelsius,
      currentDateTime,
      allData,
      foreCastData,
      selectedDay,
      showDialog,
      changeTempPreference,
      changeSelectedDay,
      handleCityChange
    }
  }
}
</script>

<style lang="sass" scoped>
.wrapper
  margin-left: auto
  margin-right: auto
  margin-top: auto
  margin-bottom: auto
  min-width: 400px
  max-width: 500px
  width: 100%
  display: flex
  flex-direction: column

#view-card
  background: white
  padding-left: 10px
  padding-right: 10px
  padding-top: 10px
  padding-bottom: 10px
  border-radius: 5px
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5)

.title
  display: flex
  justify-content: space-between

.day-and-time
  display: flex
  flex-direction: column
  button
    background: none
    border: none
    cursor: pointer
    font-size: 1rem
    margin-bottom: auto

#city-name-button
  cursor: pointer
</style>