<template>
  <div
    v-if="value.time"
    class="forecast-wrapper"
  >
    <div class="container">
      <OverviewCard
        v-for="(i, index) in value.time.length"
        :key="`day-${index}`"
        :class="{'selected' : selectedDay === i - 1}"
        :max-temp="value.temperature_2m_max[index]"
        :min-temp="value.temperature_2m_min[index]"
        :weather-code="value.weathercode[index]"
        :day="value.time[index]"
        @click="$emit('changeSelectedDay', i - 1)"
      />
    </div>
  </div>
</template>

<script>
import OverviewCard from './OverviewCard.vue'

export default {
  name:"ForecastView",

  components: {
    OverviewCard
  },

  props: {
    value: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: Number,
      default: 0
    }
  },
  
  emits: ["changeSelectedDay"]
}
</script>

<style lang="sass" scoped>
.forecast-wrapper
  background: white
  display: flex
  margin-top: 5px
  border-radius: 5px
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5)

.container
  display: flex
  flex-grow: 1
</style>