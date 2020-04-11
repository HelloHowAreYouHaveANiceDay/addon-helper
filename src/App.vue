<template>
  <div id="app">
    <button @click="selectPackage" class="button">select package</button>
    <b-table></b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { remote } from 'electron';
import { Manifest } from './Main/Manifest'
import FileService from './Main/FileService'
import path from 'path'
//@ts-ignore
import {Table} from 'buefy'

@Component({
  components: {
  }
})
export default class App extends Vue {

  async selectPackage(){
    const selectedPackage = remote.dialog.showOpenDialogSync({
      properties:['openDirectory']
    });
    console.log(selectedPackage)
    if(selectedPackage == undefined){
      // no folder is selected
      console.log(selectedPackage)
    } else {
      const manifestPath = path.join(selectedPackage[0],'manifest.json')
      console.log(manifestPath)
      const manifest = await FileService.readJson(manifestPath)   
      console.log(manifest)
    }
  }
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
