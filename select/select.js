/**
 * 自定义下拉框
 * @param {event} event 点击元素实例
 * @param {string} active 点击选中class类名
 * @author kong
 * @date 23-4-12
 */
(function (object) {
  const selects = document.querySelectorAll('select.k-select');
  selects.forEach((item) => {
    object.createSelect(item);
  });
})({
  // 创建新的select选择器，隐藏原本的
  createSelect(select) {
    const newSelect = document.createElement('div');
    newSelect.className = 'k-select';
    if (select.hasAttribute('disabled')) newSelect.setAttribute('disabled', true);
    newSelect.innerHTML += this.createInput(select);
    newSelect.innerHTML += this.createDrop(select);
    // select.style.display = 'none';
    select.parentNode.insertBefore(newSelect, select);
    select.parentNode.removeChild(select);
    newSelect.onclick = this.selectClick.bind(this);
  },
  // 创建input框
  createInput(select) {
    const checked = select.querySelector('[checked]'),
      name = select.getAttribute('name'),
      change = select.getAttribute('onchange'),
      placeholder = select.getAttribute('placeholder');
    return `<div class="k-select-input">
        <input data-type="label" value="${checked?.innerHTML ?? ''}" placeholder="${placeholder}" readonly />
        <input data-type="value" name="${name}" value="${checked?.value ?? ''}" ${
      change ? ' onchange="' + change + '"' : ''
    } style="display: none;">
        <svg t="1681377731493" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3785" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32">
            <path d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z" fill="#ffffff" p-id="3786"></path>
        </svg>
    </div>`;
  },
  // 创建下拉框
  createDrop(select) {
    const options = select.children;
    let html = `<ul class="k-select-drop">`;
    for (let i = 0; i < options.length; i++) {
      if (options[i].hasAttribute('checked')) {
        html += `<li class="k-select-drop-item active" data-value="${options[i].value}">${options[i].innerHTML}</li>`;
      } else {
        html += `<li class="k-select-drop-item" data-value="${options[i].value}">${options[i].innerHTML}</li>`;
      }
    }
    html += `</ul>`;
    return html;
  },
  // 点击下拉框
  selectClick(event) {
    event = event || window.event;
    const parent = this.getParent(event.target, '.k-select');
    if (parent.hasAttribute('disabled') || !parent) return event.stopPropagation();
    if (!parent.classList.contains('unfold')) {
      this.documentClick(event);
      event.stopPropagation(); // 阻止冒泡，避免全局点击触发
      parent.classList.add('unfold');
      document.addEventListener('click', this.documentClick);
    }
    // 当点击的是下拉选项时
    if (event.target.classList.contains('k-select-drop-item')) {
      this.activeTab(event, 'active'); // 选中选项
      const input = parent.querySelector('input[data-type="label"]');
      input.value = event.target.innerHTML;
      const valInput = parent.querySelector('input[data-type="value"]');
      valInput.value = event.target.getAttribute('data-value');
      if (valInput.hasAttribute('onchange')) valInput.onchange(valInput);
    }
  },
  /**
   * 点击元素选中方法
   */
  activeTab(event, active = 'active') {
    event = event || window.event;
    const parent = event.target.parentNode;
    const childs = parent.querySelectorAll('.' + active);
    childs.forEach((item) => {
      item.classList.remove(active);
    });
    if (!event.target.className.includes(active)) event.target.classList.add(active);
  },
  // 监听全局点击
  documentClick(event) {
    event = event || window.event;
    document.removeEventListener('click', this.documentClick);
    const select = document.querySelector('.k-select.unfold');
    select && select.classList.remove('unfold');
    event.stopPropagation();
  },

  // 查找指定父级（递归查找，直至body）
  getParent(dom, target) {
    const type = target.includes('.') ? 'class' : target.includes('#') ? 'id' : 'tag';
    const obj = {
      class: function (parent) {
        let str = target.replace('.', '');
        return parent.classList.contains(str);
      },
      id: function (parent) {
        let str = target.replace('.', '');
        return parent.id == str;
      },
      tag: function (parent) {
        return parent.toLowerCase() == target;
      },
    };
    function fn(dom) {
      let parent = dom.parentNode;
      if (obj[type](parent)) return parent;
      if (parent.nodeName.toLowerCase() == 'body') return null;
      return fn(parent);
    }
    return fn(dom);
  },
});
