<template>
  <div class="weather-data">
    <div class="overview">
      <weatherIcon
        :weather-code="selectedDayData.weathercode"
        size="48"
      />
      <span class="temp-details">
        <div
          v-if="selectedDayData.temperature_2m_max"
          :class="{'max' : !selectedDayData.temperature_2m_min}"
        >
          <span v-if="!selectedDayData.temperature_2m_min">
            {{ selectedDayData.temperature_2m_max }}°
          </span>
          <span v-else>
            {{ Math.trunc(selectedDayData.temperature_2m_min + selectedDayData.temperature_2m_max) / 2 }}
          </span>
        </div>
        <button @click="$emit('changeTempPreference')"> {{ tempPreference }} </button>
      </span>
    </div>

    <div class="details">
      <span class="current-weather">
        {{ formatWeatherCode(selectedDayData.weathercode) }}
      </span>
      <div class="sub-details">
        vento: {{ selectedDayData.windspeed }}km/h {{ formatWindDirection(selectedDayData.winddirection) }}
        <br>
        chance de chuva: {{ selectedDayData.precipitation_probability_max }}%
      </div>
    </div>
  </div>
  
  <Sparkline
    :data="sparkLineData"
    :labels="sparkLineLabels"
  />
</template>

<script>
import { computed, ref, watch } from 'vue'
import { formatWeatherCode, formatWindDirection } from '../utils/weatherUtils'

import weatherIcon from './weatherIcon.vue'
import Sparkline from './Sparkline.vue'

export default {
  name:"DetailedView",

  components: {
    weatherIcon,
    Sparkline
  },

  props: {
    data: {
      type: Object,
      default: () => {}
    },
    tempPreference: {
      type: String,
      default: 'C'
    },
    selectedDay: {
      type: Number,
      default: 0
    }
  },
  emits: ["changeTempPreference"],

  setup (props) {
    const dailyData = ref({})

    const sparkLineData = ref([])
    const sparkLineLabels = ref([])
    
    const selectedDayData = computed(() => {
      if (!dailyData.value.time) return {}
      
      return {
        precipitation_probability_max: dailyData.value.precipitation_probability_max[props.selectedDay],
        temperature_2m_max: dailyData.value.temperature_2m_max[props.selectedDay],
        temperature_2m_min: dailyData.value.temperature_2m_min[props.selectedDay],
        weathercode: dailyData.value.weathercode[props.selectedDay],
        windspeed: dailyData.value.windspeed_10m_max[props.selectedDay],
        winddirection: dailyData.value.winddirection_10m_dominant[props.selectedDay],
        time: dailyData.value.time[props.selectedDay]
      }
    });

    watch(() => {
      return props.data
    }, () => {
      formatDailyData()
      getSparklineData()
    })

    watch(() => {
      return props.selectedDay
    }, () => {
      getSparklineData()
    })    

    const getSparklineData = () => {
      const indexes = getIndexesByDate(props.data.hourly.time, props.data.daily.time[props.selectedDay])
      
      sparkLineData.value = indexes.map(index => props.data.hourly.temperature_2m[index])
      sparkLineLabels.value = indexes.map(index => props.data.hourly.time[index].slice(11))
    }

    const getIndexesByDate = (array, targetDate) => {
      const targetDateString = targetDate.split('T')[0];
      const indexes = [];

      array.forEach((value, index) => {
        const datePart = value.split('T')[0];
        if (datePart === targetDateString) {
          indexes.push(index);
        }
      });

      return indexes.filter((_, index) => (index + 1) % 3 === 0)
    }

    const formatDailyData = () => {
      dailyData.value = JSON.parse(JSON.stringify(props.data.daily))

      const todaysIndex = 0
      dailyData.value.temperature_2m_max[todaysIndex] = props.data.current_weather.temperature
      dailyData.value.temperature_2m_min[todaysIndex] = undefined
      dailyData.value.windspeed_10m_max[todaysIndex] = props.data.current_weather.windspeed
      dailyData.value.winddirection_10m_dominant[todaysIndex] = props.data.current_weather.winddirection
    }


    return {
      selectedDayData,
      dailyData,
      sparkLineData,
      sparkLineLabels,
      formatWeatherCode,
      formatWindDirection
    };
  }
}
</script>

<style lang="sass" scoped>
.weather-data
  display: flex
  .overview
    display: flex
    margin-top: 10px
    .material-design-icon 
      margin-right: 10px
    .temp-details
      margin-top: auto
      margin-bottom: auto
      margin-left: 5px
      font-size: 2rem
      display: flex
      .min
        font-size: 1.5rem
        margin-top: auto
        margin-bottom: auto
        font-size: 1.2rem
  .details
    margin-top: auto
    margin-left: auto
    margin-bottom: auto
    .sub-details
      font-size: 0.8rem


</style>