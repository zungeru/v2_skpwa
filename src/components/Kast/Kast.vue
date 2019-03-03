<template>
  <!-- The Main Div -->
  <div class="sk-upload-main">

    <!-- The Loading Div -->
    <div v-if="loading" class="kast-loader"></div>

    <!-- The v-else to the Loading Div Above -->
    <div v-else>

      <!-- Div if Photo(s) Has Not Been Uploaded -->
      <div class="sk-upload-input" v-if="!picUploaded">
        <img src="../../assets/svg/share.svg" style="cursor: pointer;" @click="onPickFile">
        <br/><br/>
        <span @click="onPickFile">kast</span>
        <input
          type="file"
          style="display: none;"
          ref="fileInput"
          accept="image/*"
          multiple
          @change="onFilePicked">
      </div>

      <!-- Div if Photo(s) Has Been Uploaded -->
      <div class="sk-upload-form" v-if="picUploaded">
        <input
          type="file"
          style="display: none;"
          ref="fileUpdate"
          accept="image/*"
          multiple
          @change="onFilePicked">

          <ul>
            <draggable v-model="pics">
              <li v-for="p in pics" :key="p.id">
                  <img v-bind:src="p.url" height="65" />
              </li>
            </draggable>
          </ul>

          <hr>

          <form class="form-main" action="#">
            <div
              v-if="picsLength > 1"
              style="color: #696969; font-size: 14px; text-align: center;"
              >drag photos to reorder
            </div>
            <div class="change-photo">
              <span style="cursor: pointer;" @click="onPickFileChange">change photo<span v-if="picsLength > 1">s</span></span>
            </div>
            <div class="form-item">
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
            <div class="form-item">
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
            <div class="form-item">
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
            <div class="form-item">
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

<style>
.sk-upload-main{
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.sk-upload-input {
  margin-top: 60px;
  text-align: center;
  color: #2c3e50;
}
.sk-upload-input span {
  font-size: 25px;
  font-weight: 500;
  color: #ff0800;
  cursor: pointer;
}
.sk-upload-form {
  margin: 20px;
  color: #2c3e50;
}
ul {
  text-align: center;
  padding-right: 30px;
}
li {
  display: inline;
  padding: 5px;
  cursor: pointer;
    }
.form-main{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.change-photo{
  color: #ff0800;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  padding-top:10px;
  padding-bottom: 10px;
}
.form-item > label {
  font-size: 16px;
}
.form-item > p {
  margin: 0px;
  padding: 0px;
  color: #f50057;
}
.form-item > input  {
  width:100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  /* border: 2px solid rgb(245,0,87, .15); */
  border: 2px solid rgb(176,176,176, .35);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.form-item > textarea {
  width: 100%;
  height: 100px;
  padding: 10px 15px;
  box-sizing: border-box;
  /* border: 2px solid rgb(245,0,87, .15); */
  border: 2px solid rgb(176,176,176, .35);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  resize: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.kast-loader {
  margin-right: auto;
  margin-left: auto;
  margin-top: 75px;
  border: 7px solid #f3f3f3;
  border-radius: 50%;
  border-top: 7px solid #137E8D;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
