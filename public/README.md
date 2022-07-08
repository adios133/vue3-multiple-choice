#### Usage

```vue
<script setup >
import { reactive } from "vue"
import {MultipleChoice} from "vue3-multiple-choice"
import 'vue3-multiple-choice/style.css'
const testList = reactive([])
const containerStyle = {
  display:"flex"
}
</script>


<template>
  <MultipleChoice :dataSource="testList" :containerStyle="containerStyle">
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

`dataSource`: your datalist, every item required a unique string `key`, eg:

```js
//item 
{
    key:'123',
    // ...
}
```

`containerStyle`: containerStyle object.