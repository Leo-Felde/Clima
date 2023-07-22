<template>
  <div class="autocomplete">
    <label class="autocomplete-label"> {{ label }} </label>
    <input
      v-model="inputValue"
      class="autocomplete-input"
      :type="type"
      list="autocompleteData"
      @input="handleInput"
    >
    <datalist
      v-if="list.length > 0"
      id="autocompleteData"
    >
      <option
        v-for="(item, index) in list"
        :id="`autocomplete-list-item-${index}`"
        :key="`autoclt-list-item-${index}`"
        :value="item.text"
      >
        {{ item.text }}
      </option>
    </datalist>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AutocompleteCity',

  props: {
    label: {
      type: String,
      default: 'Selecionar'
    },

    type: {
      type: String,
      default: 'text'
    },

    list: {
      type: Array,
      default: () => ([])
    }
  },

  emits: ['search', 'clear', 'input'],

  setup (props, context) {
    const inputValue = ref('')

    const handleInput = () => {
      if (inputValue.value?.length > 2) {
        const selectedItem = props.list.find(obj => obj.text.includes(inputValue.value))
        if (selectedItem) {
          context.emit('input', selectedItem.value)
        } else {
          context.emit('search', inputValue.value)
        }
      } else if (inputValue.value?.length < 1) {
        context.emit('clear')
      }
    }

    return {
      inputValue,
      handleInput
    }
  },

}
</script>

<style lang="sass" scoped>
.autocomplete
  position: relative
  margin-top: 18px
  &-label
    position: absolute
    top: -16px
    font-size: 0.8rem
  &-list
    position: absolute
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5)
    height: 100%
    display: flex
    flex-direction: column
    max-height: 100px
    overflow-x: hidden
    overflow-y: auto
    background: white
</style>