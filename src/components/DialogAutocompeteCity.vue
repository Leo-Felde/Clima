<template>
  <Dialog
    v-model="show"
    hide-header
    close-btn-text="fechar"
  >
    <AutocompleteCity
      v-if="show"
      @input="$emit('input', $event)"
    />
  </Dialog>
</template>

<script>
import { ref, watch } from 'vue'

import Dialog from './Dialog.vue'
import AutocompleteCity from './AutocompleteCity.vue'

export default {
  name: 'DialogAutocompleteCity',

  components: {
    Dialog,
    AutocompleteCity
  },

  props: {
    modelValue: Boolean
  },

  emits: ['input'],

  setup (props) {
    const show = ref(props.modelValue)

    watch(() => props.modelValue, (newValue) => {
      show.value = newValue
    })

    return {
      show
    }
  }

}
</script>

<style>

</style>