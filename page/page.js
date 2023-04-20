class PageInit {
    total = 0;
    size = 10;
    current = 1;
    showPage = 1;
    domElement = null;
    pageNum=1;
    max = 7;
    constructor(option) {
        if(!option.el) return console.warn('el属性必传，接收class,id,tag或dom')
        this.total = option.total || 0;
        this.size = option.size || 10;
        this.max = option.max || 7;
        this.pageNum = Math.ceil(this.total / this.size);
        this.change = option.change || null;
        const pageDom = typeof option.el === 'string' ? document.querySelector(option.el) : option.el;
        if(pageDom == null) return console.warn(option.el + '元素未找到')
        this.domElement = document.createElement('div');
        this.domElement.className = 'page';
        pageDom.appendChild(this.domElement)
        this.countPage()
    }
    countPage() {
        const _this = this;
        if(this.total === 0) return;
        this.domElement.innerHTML = '';
        if(this.pageNum > this.max) {
            this.showMax();
        } else {
            for(let i = 0; i < this.pageNum; i++) {
                const item = document.createElement('span');
                if(this.current == i + 1) item.className = 'page-item page-current';
                else item.className = 'page-item';
                item.textContent = i + 1;
                item.onclick = function(event) {
                    _this.pageChange(event,'page-current')
                    _this.current = i + 1;
                    if(typeof _this.change === 'function') _this.change(_this.current)
                }
                this.domElement.appendChild(item)
            }
        }
    }
    showMax() {
        this.domElement.innerHTML = '';
        const _this = this;
        // 后面更多显示
        const showQueen = _this.showPage + this.max < this.pageNum;
        // 前面更多显示
        const showAgo = _this.showPage > 1;
        if(!showQueen) _this.showPage = this.pageNum - this.max + 1
        if(!showAgo) _this.showPage = 1
        if(showAgo) {
            // 第一页
            const item = document.createElement('span');
            item.className = 'page-item';
            item.textContent = 1;
            item.onclick = function(event) {
                _this.pageChange(event,'page-current')
                _this.showPage = 1;
                _this.current = 1;
                if(typeof _this.change === 'function') _this.change(_this.current)
                _this.showMax();
            }
            this.domElement.appendChild(item)
            // 更多
            const more = document.createElement('span');
            more.className = 'page-item';
            more.textContent = '...';
            more.onclick = function(event) {
                _this.showPage -= _this.max;
                if(_this.showPage < 1) _this.showPage = 1;
                _this.current = _this.showPage
                if(typeof _this.change === 'function') _this.change(_this.current)
                _this.showMax()
            }
            this.domElement.appendChild(more)
        }
        
        for(let i = 0; i < this.max; i++) {
            let page = i + 1;
            if(showAgo) page= this.showPage + i
            if(!showQueen) page = this.pageNum - this.max + i + 1
            const item = document.createElement('span');
            if(this.current == page) item.className = 'page-item page-current';
            else item.className = 'page-item';
            item.textContent = page;
            item.onclick = function(event) {
                _this.pageChange(event,'page-current')
                _this.current = page;
                if(typeof _this.change === 'function') _this.change(_this.current)
            }
            this.domElement.appendChild(item)
        }
        
        if(showQueen) {
            // 更多
            const more = document.createElement('span');
            more.className = 'page-item';
            more.textContent = '...';
            more.onclick = function(event) {
                _this.showPage += _this.max;
                if(_this.showPage > _this.pageNum) _this.showPage = _this.pageNum;
                _this.current = _this.showPage
                if(typeof _this.change === 'function') _this.change(_this.current)
                _this.showMax()
            }
            this.domElement.appendChild(more)
            // 最后一页
            const item = document.createElement('span');
            item.className = 'page-item';
            item.textContent = _this.pageNum;
            item.onclick = function(event) {
                _this.pageChange(event,'page-current')
                _this.showPage = _this.pageNum;
                _this.current = _this.pageNum;
                if(typeof _this.change === 'function') _this.change(_this.current)
                _this.showMax();
            }
            this.domElement.appendChild(item)
        }
    }
    setPage(page) {
        this.current = page;
        this.showPage = page;
        if(typeof this.change === 'function') this.change(this.current)
        this.countPage()
    }
    // 切换分页样式
    pageChange(event, active = 'active') {
        const parent = event.target.parentNode;
        const childs = parent.querySelectorAll('.' + active);
        childs.forEach(item => {
            item.classList.remove(active)
        })
        if (!event.target.className.includes(active))
            event.target.classList.add(active)
    }
}