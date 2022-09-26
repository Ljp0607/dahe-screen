import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    expand: false,
    src: "",
    item: ""
  }),
  actions: {
    changeSrc(e: string) {
      this.src = e
    },
    changeExpand() {
      this.expand = !this.expand
    },
    changeItem(e: any) {
      this.item = e
    }
  }
})
