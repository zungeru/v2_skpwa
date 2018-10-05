<template>
  <div class="sk-upload-main">
    <div class="sk-upload-input" v-if="!picUploaded">
      <button class="mdl-button mdl-button--raised mdl-button--colored" @click="onPickFile">
        Kast
      </button>
      <input
        type="file"
        style="display: none;"
        ref="fileInput"
        accept="image/*"
        multiple
        @change="onFilePicked">
    </div>
    <div class="sk-upload-form" v-if="picUploaded">
        <ul>
          <draggable v-model="pics">
            <li v-for="p in pics" :key="p.id">
                <img v-bind:src="p.url" height="65" />
            </li>
          </draggable>
        </ul>
        <hr>
        <form class="form-main" action="#" >
          <div
            v-if="picsLength > 1"
            style="color: #595959; font-size: 14px; text-align: center;"
            >drag photos to reorder
          </div>
          <div class="form-item">
            <label for="piece">piece</label>
            <input
              type="text"
              name="piece"
              id="piece"
              required
              v-model="piece">
          </div>
          <br>
          <div class="form-item">
            <label for="price">price</label>
            <input
              type="number"
              min="0.00"
              step="0.01"
              name="price"
              id="price"
              required
              v-model="price">
          </div>
          <br>
          <div class="form-item">
            <label for="place">place</label>
            <input
              type="text"
              name="place"
              id="place"
              required
              v-model="place">
          </div>
          <br>
          <div class="form-item">
            <label for="style-note">style note </label>
            <textarea
              type="text"
              name="style-note"
              id="style-note"
              v-model="note">
            </textarea>
          </div>
          <div>
            <button
              class="mdl-button mdl-button--primary"
              @click.prevent="onSubmit">
              submit
            </button>
          </div>
        </form>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
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
      note: ''
    }
  },
  components: {
    draggable
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      this.picsLength = event.target.files.length
      if (files[0]) {
        this.pics.push({'id': 0, 'file': files[0], url: ''})
      }
      if (files[1]) {
        this.pics.push({'id': 1, 'file': files[1], url: ''})
      }
      if (files[2]) {
        this.pics.push({'id': 2, 'file': files[2], url: ''})
      }

      for (let c of this.pics) {
        this.fileReader(c)
      }
      console.log(this.pics)
    },
    fileReader (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          file['url'] = fileReader.result
          if (this.pics.length === this.picsLength) {
            this.picUploaded = true
          }
        })
        fileReader.readAsDataURL(file['file'])
      })
    },
    onSubmit () {
      const fd = new FormData()
      fd.append('piece', this.piece)
      fd.append('price', this.price)
      fd.append('place', this.place)
      fd.append('note', this.note)
      fd.append('pic_1', this.pics[0]['file'], this.pics[0]['file'].name)
      fd.append('pic_2', (this.pics[1] ? this.pics[1]['file'] : null), (this.pics[1] ? this.pics[1]['file'].name : 'none_1'))
      fd.append('pic_3', (this.pics[2] ? this.pics[2]['file'] : null), (this.pics[2] ? this.pics[2]['file'].name : 'none_2'))
      console.log(fd)
      axios.post('http://localhost:5000/upload', fd, { headers: {'Content-Type': 'multipart/form-data'} })
        .then(res => {
          console.log(res)
        })
        .catch(error => console.log(error))
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
.form-item > label {
  font-size: 16px;
}
.form-item > input  {
  width:100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 2px solid rgb(245,0,87, .15);
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
  border: 2px solid rgb(245,0,87, .15);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  resize: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>
