<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount,PropType,CSSProperties } from "vue"
type Item = {
  key: string
  [index:string]:any
}
const props = defineProps({
  dataSource:{type:Array<Item>,default:()=>[]},
  containerStyle:{type: Object as PropType<CSSProperties>, default:()=>({})},
  defaultKeys:{type:Array<string>,default:()=>[]},
  selectedKeys:{type:Array<string>,default:()=>[]}
})
const emits = defineEmits<{
  (e:'update:selectedKeys',keys:Array<string>):void
}>()

const list = ref<HTMLElement | null>(null)
const selectItem = reactive<string[]>([])
const ctrlStatus = ref<number>(0)
const shiftStatus = ref<number>(0)
function keydownEventHandler(e: KeyboardEvent) {
  if (e.key === 'Control') {
    ctrlStatus.value = 1
  }
  if (e.key === 'Shift') {
    shiftStatus.value = 1
  }
}
function keyupEventHandler(e: KeyboardEvent) {
  if (e.key === 'Control') {
    ctrlStatus.value = 0
  }
  if (e.key === 'Shift') {
    shiftStatus.value = 0
  }
}
onMounted(() => {
  list.value!.addEventListener("keydown", keydownEventHandler)
  list.value!.addEventListener("keyup", keyupEventHandler)
  list.value!.addEventListener("blur", () => {
    selectItem.length = 0
    emits('update:selectedKeys',selectItem)
  })
  if (selectItem.length) selectItem.length = 0
  selectItem.push(...props.defaultKeys)
  emits('update:selectedKeys',selectItem)
})
onBeforeUnmount(() => {
  list.value!.removeEventListener("keydown", keydownEventHandler)
  list.value!.removeEventListener("keyup", keyupEventHandler)
})
const handleSelect = (item: Item,index:number,e:MouseEvent) => {
  e.stopPropagation()
  if (ctrlStatus.value) {
    selectItem.push(item.key)
  } else if (shiftStatus.value) {
    if (selectItem.length) {
      const start = props.dataSource.findIndex(el => el.key === selectItem[selectItem.length -1])
      const end = index
      selectItem.length = 0
      if (end > start) {
        selectItem.push(...props.dataSource.map(el => el.key).slice(start,end + 1))
      } else {
        selectItem.push(...props.dataSource.map(el => el.key).slice(end,start + 1))
      }
    } else {
      selectItem.push(item.key)
    }
  } else {
    selectItem.length = 0
    selectItem.push(item.key)
  }
  emits('update:selectedKeys',selectItem)
}
</script>

<template>
  <div class="multiple-list" :style="containerStyle" ref="list" tabindex="-1">
    <div
      class="item"
      v-for="(item, index) in dataSource"
      @click="handleSelect(item, index, $event)"
    >
      <slot
        name="item"
        :isActived="selectedKeys.includes(item.key)"
        :itemData="item"
      ></slot>
    </div>
  </div>
</template>

<style scoped>
.multiple-list {
  outline: 0;
  cursor: pointer;
}
.item {
  user-select: none;
}
</style>
