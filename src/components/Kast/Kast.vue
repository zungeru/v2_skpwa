<template>
  <!-- The Main Div -->
  <div class="sk-auto-side-margin sk-main-padding">

    <!-- The Loading Div -->
    <div v-if="loading" class="sk-loader"></div>

    <!-- The v-else to the Loading Div Above -->
    <div v-else>

      <!-- Div if Photo(s) Has Not Been Uploaded -->
      <div class="sk-no-content-main" v-if="!picUploaded">
        <img src="../../assets/svg/share.svg" style="cursor: pointer;" @click="onPickFile">
        <br/><br/>
        <span class="sk-kast-link" @click="onPickFile">kast</span>
        <input
          type="file"
          style="display: none;"
          ref="fileInput"
          accept="image/*"
          multiple
          @change="onFilePicked">
      </div>

      <!-- Div if Photo(s) Has Been Uploaded -->
      <div style="margin: 20px;" v-if="picUploaded">
        <input
          type="file"
          style="display: none;"
          ref="fileUpdate"
          accept="image/*"
          multiple
          @change="onFilePicked">

          <ul style="text-align: center; padding-right: 30px;">
            <draggable v-model="pics">
              <li
                  v-for="p in pics"
                  :key="p.id"
                  style="display: inline; padding: 5px; cursor: pointer;" >
                  <img v-bind:src="p.url" height="50" />
              </li>
            </draggable>
          </ul>

          <form class="sk-auto-side-margin sk-form" action="#">
            <hr>
            <div
              v-if="picsLength > 1"
              style="color: #696969; font-size: 14px; text-align: center;"
              >drag photos to reorder
            </div>
            <div class="sk-gray-note">
              <span style="cursor: pointer;" @click="onPickFileChange">change photo<span v-if="picsLength > 1">s</span></span>
            </div>
            <div class="sk-form-item">
              <label for="piece">piece</label><span>&nbsp;({{pieceCharsLeft()}})</span>
              <input
                type="text"
                name="piece"
                id="piece"
                maxlength="40"
                placeholder="max 40 chars"
                @input="$v.piece.$touch()"
                v-model="piece">
                <p v-if="!$v.piece.required && $v.piece.$dirty"> field required</p>
            </div>
            <br/>
            <div class="sk-form-item">
              <label for="price">price</label>
              <input
                name="price"
                id="price"
                placeholder="(ex: 99.00)"
                @input="$v.price.$touch()"
                v-model="price">
                <p v-if="!$v.price.required && $v.price.$dirty"> field required</p>
                <p v-if="!$v.price.decimal && $v.price.$dirty"> enter a dollar amount</p>
            </div>
            <br/>
            <div class="sk-form-item">
              <label for="place">place</label>
              <input
                type="text"
                name="place"
                placeholder="link (url) or address (irl)"
                id="place"
                @input="$v.place.$touch()"
                v-model="place">
                <p v-if="!$v.place.required && $v.place.$dirty"> field required</p>
            </div>
            <br/>
            <div class="sk-form-item">
              <label for="style-note">style note </label><span>&nbsp;({{noteCharsLeft()}})</span>
              <textarea
                type="text"
                name="style-note"
                id="style-note"
                maxlength="200"
                placeholder="max 200 chars"
                @input="$v.note.$touch()"
                v-model="note">
              </textarea>
              <p v-if="!$v.note.required && $v.note.$dirty"> field required</p>
            </div>
            <br/>
            <div>
              <button
                class="mdl-button mdl-button--raised mdl-button--colored"
                :disabled="$v.$invalid || pics.length === 0"
                @click.prevent="onSubmit">
                submit
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { required, maxLength, decimal } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      pics: [],
      picsLength: 0,
      picUploaded: false,
      // picUploaded: true,
      piece: '',
      price: '',
      place: '',
      note: '',
      loading: false
    }
  },
  components: {
    draggable
  },
  validations: {
    piece: {
      required,
      maxLen: maxLength(40)
    },
    note: {
      required,
      maxLen: maxLength(200)
    },
    price: {
      required,
      decimal
    },
    place: {
      required
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onPickFileChange () {
      // sometimes '' instead of null works in IE11, need to check this
      this.$refs.fileUpdate.value = null
      this.pics = []
      this.picsLength = 0
      this.$refs.fileUpdate.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      // this.picsLength = event.target.files.length
      if (files[0]) {
        this.pics.push({'id': 0, 'file': files[0], url: ''})
        this.picsLength++
      }
      if (files[1]) {
        this.pics.push({'id': 1, 'file': files[1], url: ''})
        this.picsLength++
      }
      if (files[2]) {
        this.pics.push({'id': 2, 'file': files[2], url: ''})
        this.picsLength++
      }

      for (let c of this.pics) {
        this.fileReader(c)
      }
      console.log(this.pics)
    },
    fileReader (file) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          file['url'] = fileReader.result
          if (this.pics.length === this.picsLength) {
            this.picUploaded = true
          }
        })
        fileReader.readAsDataURL(file['file'])
    },
    pieceCharsLeft () {
      return this.$v.piece.$params.maxLen.max - this.piece.length
    },
    noteCharsLeft() {
      return this.$v.note.$params.maxLen.max - this.note.length
    },
    onSubmit () {
      this.loading = true
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('piece', this.piece)
      fd.append('price', this.price)
      fd.append('place', this.place)
      fd.append('note', this.note)
      fd.append('pic_1', this.pics[0]['file'])
      fd.append('pic_2', (this.pics[1] ? this.pics[1]['file'] : null))
      fd.append('pic_3', (this.pics[2] ? this.pics[2]['file'] : null))

      // let vm = this
      axios.post('http://localhost:5000/post/create', fd, {
        headers:
          {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          this.pics = []
          this.picsLength = 0
          this.picUploaded = false
          this.piece = ''
          this.price = ''
          this.place = ''
          this.note = ''
          this.$v.$reset()
          this.loading = false
          if(res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if(res.data.skStatus === 'Pass') {
            this.$router.push({ name: 'post', params: { post_id: res.data.post_id } })
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  beforeRouteEnter (to, from, next) {
    const now = (new Date()).getTime()
    const expDate = (new Date(localStorage.getItem('expirationDate'))).getTime()
    const noToken = !localStorage.getItem('token')
    if ( (noToken) || (now >= expDate) ) {
      next('/login')
    } else {
      next()
    }
  }
}
</script>
