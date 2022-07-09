import { defineComponent, ref, reactive, onMounted, onBeforeUnmount, openBlock, createElementBlock, normalizeStyle, Fragment, renderList, renderSlot } from "vue";
var MultipleChoice_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".multiple-list[data-v-68ad6478]{outline:0;cursor:pointer}.item[data-v-68ad6478]{user-select:none}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MultipleChoice",
  props: {
    dataSource: { type: Array, default: () => [] },
    containerStyle: { type: Object, default: () => ({}) },
    defaultKeys: { type: Array, default: () => [] },
    selectedKeys: { type: Array, default: () => [] }
  },
  emits: ["update:selectedKeys"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const list = ref(null);
    const selectItem = reactive([]);
    const ctrlStatus = ref(0);
    const shiftStatus = ref(0);
    function keydownEventHandler(e) {
      if (e.key === "Control") {
        ctrlStatus.value = 1;
      }
      if (e.key === "Shift") {
        shiftStatus.value = 1;
      }
    }
    function keyupEventHandler(e) {
      if (e.key === "Control") {
        ctrlStatus.value = 0;
      }
      if (e.key === "Shift") {
        shiftStatus.value = 0;
      }
    }
    onMounted(() => {
      list.value.addEventListener("keydown", keydownEventHandler);
      list.value.addEventListener("keyup", keyupEventHandler);
      list.value.addEventListener("blur", () => {
        selectItem.length = 0;
        emits("update:selectedKeys", selectItem);
      });
      if (selectItem.length)
        selectItem.length = 0;
      selectItem.push(...props.defaultKeys);
      emits("update:selectedKeys", selectItem);
    });
    onBeforeUnmount(() => {
      list.value.removeEventListener("keydown", keydownEventHandler);
      list.value.removeEventListener("keyup", keyupEventHandler);
    });
    const handleSelect = (item, index2) => {
      if (ctrlStatus.value) {
        selectItem.push(item.key);
      } else if (shiftStatus.value) {
        if (selectItem.length) {
          const start = props.dataSource.findIndex((el) => el.key === selectItem[selectItem.length - 1]);
          const end = index2;
          selectItem.length = 0;
          if (end > start) {
            selectItem.push(...props.dataSource.map((el) => el.key).slice(start, end + 1));
          } else {
            selectItem.push(...props.dataSource.map((el) => el.key).slice(end, start + 1));
          }
        } else {
          selectItem.push(item.key);
        }
      } else {
        selectItem.length = 0;
        selectItem.push(item.key);
      }
      emits("update:selectedKeys", selectItem);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "multiple-list",
        style: normalizeStyle(__props.containerStyle),
        ref_key: "list",
        ref: list,
        tabindex: "-1"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.dataSource, (item, index2) => {
          return openBlock(), createElementBlock("div", {
            class: "item",
            onClick: ($event) => handleSelect(item, index2)
          }, [
            renderSlot(_ctx.$slots, "item", {
              isActived: selectItem.includes(item.key),
              itemData: item
            }, void 0, true)
          ], 8, _hoisted_1);
        }), 256))
      ], 4);
    };
  }
});
var MultipleChoice = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-68ad6478"]]);
const components = [MultipleChoice];
const install = function(App, options) {
  components.forEach((component) => {
    App.component(component.name = "MultipleChoice", component);
  });
};
var index = { install };
export { MultipleChoice, index as default };
