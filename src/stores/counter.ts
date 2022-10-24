import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    expand: false,
    video: [],
    src: "",
    item: "",
    active: 0,
    option: {
      lebal: "律媒团",
      value: "252896"
    }
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
    },
    changeOption(e: any) {
      this.option.lebal = e.lebal
      this.option.value = e.value
    }
  }
})
