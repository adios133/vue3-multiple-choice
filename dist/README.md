#### description

choose list items with `ctrl` and `shift`

#### Usage

```js
// main.js
import { createApp } from "vue"
import {MultipleChoice} from "vue3-multiple-choice"
import 'vue3-multiple-choice/style.css'

const app = createApp(App)
app.use(MultipleChoice)
```



```vue

// component
<script setup >
import { reactive } from "vue"
const testList = reactive([])
const containerStyle = {
  display:"flex"
}
const defaultKeys = ["fff1"]
const selectKeys = reactive([])
</script>


<template>
  <MultipleChoice 
    v-model:selectedKeys="selectKeys"
    :dataSource="testList"
    :defaultKeys="defaultKeys"
    :containerStyle="containerStyle"
  >
    <template #item="{ itemData,isActived }">
      <div :class="{actived:isActived}">
        <!-- slot  -->
      </div>
    </template>
  </MultipleChoice>
</template>

.actived {
  /* your custom actived style   */
}
```

#### api

`dataSource`: your data list, every item required a unique string `key`, eg:

```js
//item 
{
    key:'123',
    // ...
}
```

`containerStyle`: container style object.

`defaultKeys`: default selected keys.

`selectedKeys`: selected keys.