export const formatCount = {
  methods: {
    roundToOne (num) {
      return Math.round(num * 10)/10
    },
    formatCount (num) {
      if(num >= 1000000) {
        return this.roundToOne(num/1000000)+'M'
      }
      if(num >= 1000) {
        return this.roundToOne(num/1000)+'K'
      }
      return this.roundToOne(num)
    }
  }
}
