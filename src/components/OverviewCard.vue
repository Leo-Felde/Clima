<template>
  <div
    class="overview-card"
    @click="$emit('click', $event)"
  >
    {{ shortndDay }}

    <weatherIcon
      :weather-code="weatherCode"
      size="32"
    />

    <div class="temp-details">
      <span class="max">
        {{ Math.trunc(maxTemp) }}°
      </span>
      <span class="min">
        {{ Math.trunc(minTemp) }}°
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { formatWeatherCode, formatWindDirection } from '../utils/weatherUtils'

import weatherIcon from './weatherIcon.vue';

export default {
  name:"DayOverviewCard",

  components: {
    weatherIcon
  },

  props: {
    maxTemp: {
      type: Number,
      default: null
    },
    minTemp: {
      type: Number,
      default: null
    },
    weatherCode: {
      type: Number,
      default: null
    },

    day: {
      type: String,
      default: null
    }
  },
  
  emits: ["click"],

  setup (props) {
    const formattedDirection = computed(() => {
      return formatWindDirection(props.windDirection);
    });
    
    const formattedWeather = computed(() => {
      return formatWeatherCode(props.weatherCode);
    });

    const shortndDay = computed(() => {
      const date = new Date(props.day + 'T00:00:00')
      const options = { weekday: 'short' }
      return date.toLocaleString(undefined, options)
    })

    return {
      formattedDirection,
      formattedWeather,
      shortndDay
    };
  }
}
</script>

<style lang="sass" scoped>
.overview-card
  flex-grow: 1
  border-radius: 5px
  display: flex
  flex-direction: column
  font-size: 0.9rem
  cursor: pointer
  &:hover
    background: #dedede
  &.selected
    background: #f4f4f4
</style>