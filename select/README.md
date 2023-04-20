# select.js 使用说明

select 是一个自执行函数，自动将 class 类名中有 k-select 的 select 下拉框替换为 select 组件

### select 属性说明

| 属性        | 类型     | 值           |
| ----------- | -------- | ------------ |
| placeholder | string   | 输入框提示语 |
| name        | string   | 原生 name 值 |
| onchange    | function | 数据变化事件 |

### 代码示例

```
  <select class="k-select" onchange="change(event)"></select>
  <srcipt src="./select.js"></script>
```
