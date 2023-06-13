<template>
  <mdicon
    :name="iconName"
    :size="size"
  />
</template>

<script>
import { computed } from 'vue'

export default {
  props: {
    weatherCode: {
      type: Number,
      default: null
    },
    size: {
      type: [String, Number],
      default: 16
    }
  },

  setup (props) {
    const iconName = computed(() => {
      switch (props.weatherCode) {
        case 0:
        case 1:
          return 'weather-sunny'
        case 2:
          return 'weather-partly-cloudy'
        case 3:
          return 'clouds'
        case 45:
        case 48:
          return 'weather-fog'
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 80:
          return 'weather-partly-rainy'
        case 63:
        case 81:
          return 'weather-rainy'
        case 65:
        case 82:
          return 'weather-pouring'
        case 95:
        case 96:
        case 99:
          return 'weather-lightning'
        default:
          return 'help'
      }
    })

    return {iconName}
  }
}
</script>