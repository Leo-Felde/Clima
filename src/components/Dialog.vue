<template>
  <dialog
    ref="dialogElement"
    class="dialog-body"
  >
    <div
      v-if="!hideHeader"
      class="dialog-header"
    >
      <span class="dialog-header-title">
        {{ title }}
      </span>
      <button
        id="simple-close-btn"
        @click="closeDialog"
      >
        <mdicon
          name="close"
          size="20"
        />
      </button>
    </div>

    <div class="dialog-content">
      <slot />
    </div>

    <div class="dialog-actions">
      <button
        class="cancel"
        @click="closeDialog"
      >
        {{ closeBtnText }}
      </button>
      <slot name="actions" />
    </div>
  </dialog>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'Dialog',

  props: {
    modelValue: Boolean,
    hideHeader: Boolean,

    title: {
      type: String,
      default: 'Titulo'
    },

    closeBtnText: {
      type: String,
      default: 'Cancelar'
    }
  },

  emits: ["update:modelValue"],

  setup(props, context) {
    const showDialog = ref(props.modelValue)
    const dialogElement = ref(null)
    
    watch(() => props.modelValue, (newValue) => {
      showDialog.value = newValue
    })

    watch(() => showDialog.value, (value) => {
      context.emit('update:modelValue', value)

      if (value) {
        dialogElement.value.showModal()
      } else {
        dialogElement.value.close()
      }
    })

    const closeDialog = () => {
      showDialog.value = false
    }

    return {
      showDialog,
      dialogElement,
      closeDialog
    }
  }
}
</script>

<style lang="sass" scoped>
.dialog
  &-body
    border: 0px
    border-radius: 5px
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.5)
    padding: 0px
    min-width: 200px
  &-header
    border-bottom: 1px solid #8888886e
    display: flex
    justify-content: space-between
    padding: 5px
    &-title
      margin-top: auto
      margin-bottom: auto
  &-content
    padding: 5px
  &-actions
    padding: 5px
    border-top: 1px solid #8888886e
    display: flex
    .cancel
      margin-right: auto

#simple-close-btn
  border-radius: 50%
  height: 28px
  width: 28px
  &:hover, &:focus
    border: none
    background: #cacaca5e
</style>