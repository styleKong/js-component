# page.js 使用说明

new PageInit(option)是一个构造函数，里面初始化了一个分页类；接受一个 object 对象参数

### option 说明

| 属性   | 类型            | 值               |
| ------ | --------------- | ---------------- |
| el     | Element\|string | 分页组件父元素   |
| total  | number          | 数据总条数       |
| size   | number          | 每页数据条数     |
| max    | number          | 显示的最大页码   |
| change | function        | 页码变化回调函数 |

### 实例方法

| 方法    | 作用                           |
| ------- | ------------------------------ |
| setPage | 设置页码，通常用于重置页码为 1 |

### 代码示例

```
  <script src="./page.js"></script>
  const page = new PageInit({
      el: '.page-box', // 分页组件父元素
      total: 1000,  // 数据总条数
      size: 10, // 每页数据条数
      change(page) { // 页码变化执行
          console.log(page)
      }
  })
```
