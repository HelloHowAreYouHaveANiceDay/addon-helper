<template>
  <div id="app">
    <button @click="selectPackage" class="button">add package</button>
    <b-tabs v-model="activeTab">
      <b-tab-item v-for="(c,i) in container" :label="c.name" :key="i">
        <b-table :data="c.packages" >
          <template slot-scope="props">
            <b-table-column field="name" label="name">
              {{props.row.name}}
            </b-table-column>
            <b-table-column field="version" label="version">
              {{props.row.version}}
            </b-table-column>
            <b-table-column field="target" label="target">
              {{props.row.target}}
            </b-table-column>
            <b-table-column field="files" label="files">
              {{props.row.files.length}}
            </b-table-column>
            <b-table-column label="install">
              <a @click="install(i, props)" class="button">install</a>
            </b-table-column>
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>
    <b-table></b-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Manifest } from './Main/Manifest'
const {remote, ipcRenderer} = require('electron')
import path from 'path'
//@ts-ignore
import {Table} from 'buefy'

@Component({
  components: {
  }
})
export default class App extends Vue {
  container: Manifest[] = []
  activeTab: number = 0;
  
  async selectPackage(){
    const selectedPackage = remote.dialog.showOpenDialogSync({
      properties:['openDirectory']
    });
    if(selectedPackage == undefined){
      // no folder is selected
      console.log(selectedPackage)
    } else {
      const manifestPath = path.join(selectedPackage[0],'manifest.json')
      const manifest = await ipcRenderer.invoke('read-package', manifestPath)
      const p = {
       localPath: selectedPackage[0]
      }
      this.container.push(Object.assign({}, manifest, p));
    }
  }

  async install(manifest: number,e:{index:number, row:object}){
    const container = this.container[manifest]
    const packagePath = path.join(container.localPath, e.row.directory)
    const p = container.packages[e.index];
    // update diretory with the full path
    p.directory = packagePath
    const install = await ipcRenderer.invoke('install-package', p)
    console.log(install);
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
