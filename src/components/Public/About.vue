<template>
  <div class="">
    <div id="loading" ref="logoDiv">
    </div>

    <h3>About View</h3>
    <h3>Spheell About Style Kast...Blah,Blah</h3>
    <h3>Sign Up</h3>
    <h3>Log In</h3>
    <div v-for="x in 15">
      <h3>Content {{x}}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: 'styleKast'
    }
  },
  methods: {
    animate () {
      for (let i=0; i<this.logo.length; i++) {
        let wrapText = "<span>" + this.logo.charAt(i) + "</span>"
        this.appendLogo(i, wrapText)
      }
    },
    appendLogo(interval, text){
      let vm = this
      let delay = 250 + (75*interval)
      setTimeout(function(){
        vm.$refs.logoDiv.innerHTML += text
      },delay)
      if (interval === 8 ){
        setTimeout(function(){
          console.log('ALL DONE')
        },delay+500)
      }
    }
  },
  mounted () {
    this.animate()
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  }
}
</script>

<style>
#loading {
  color: #137E8D;
  font-size: 32px;
  padding-top: 150px;
  padding-bottom: 150px;
  text-align: center;
}
</style>
