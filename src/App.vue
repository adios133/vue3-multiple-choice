<script setup lang="ts">
import { reactive,CSSProperties } from "vue"
import MultipleChoice from "./packages/MultipleChoice.vue"
type Item = {
  name: string
  id: string
  key: string,
  age:number
}
const testList = reactive<Item[]>([])
for (let i = 0; i < 20; i++) {
  testList.push({
    name: "凯哥",
    age:12+i,
    id: "134",
    key: "fff" + i,
  })
}
const containerStyle:CSSProperties = {
  display:"flex",
  flexWrap:'wrap'
}
const defaultKeys = ['fff1']
const selectKeys = reactive<string[]>([])
</script>

<template>
  <MultipleChoice v-model:selectedKeys="selectKeys" :dataSource="testList" :defaultKeys="defaultKeys" :containerStyle="containerStyle">
    <template #item="{ itemData,isActived }">
      <div :class="{actived:isActived}" >
        <span>{{itemData.name}}</span>
        <span>{{itemData.age}}</span>
      </div>
    </template>
  </MultipleChoice>
  <div class="anohter"></div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.actived {
  color: blueviolet;
}
.anohter {
  height: 600px;
  background-color: green;
}
</style>
