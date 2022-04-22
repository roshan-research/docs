//= require ./all_nosearch
//= require ./app/_search
function Scroll(delay) {
    // scroll event occurs if the page is refreshed when scrollY > 0
    // this suggests that the browser scrolls to previous (before refresh) position
    this.initialY = scrollY;
    this.callbacks = {
        start  : null,
        scroll : null,
        end    : null,
    };
    this.timeout = {
        delay  : delay || 150,
        handle : null,
    };
    this.handler = Scroll.handler.bind(this);
    window.addEventListener("scroll", this.handler);
}

Scroll.handler = function (e) {
    if (this.initialY == 0) {
        if (this.timeout.handle == null) {
            if (this.callbacks.start) {
                this.callbacks.start.call(this, e);
            }
        }
        if (this.timeout.handle !== null) {
            clearTimeout(this.timeout.handle);
        }
        if (this.callbacks.scroll) {
            this.callbacks.scroll.call(this, e);
        }
        var self = this;
        this.timeout.handle = setTimeout(function () {
            self.timeout.handle = null;
            if (self.callbacks.end) {
                self.callbacks.end.call(self, e);
            }
        }, this.timeout.delay);
    } else {
        this.initialY = 0;
    }
};

Scroll.prototype.addEventListener = function (event, callback) {
    if (Object.keys(this.callbacks).includes(event)) {
        this.callbacks[event] = callback;
    } else {
        console.warn("Invalid scroll event: " + event);
    }
};

window.addEventListener('DOMContentLoaded',() => {

    let tocs = document.getElementsByClassName('toc-h1 toc-link active');

    let littleTOCs = document.getElementsByClassName("toc-h2 toc-link active");

    var sl = new Scroll(400);
    
    sl.addEventListener("start", function (e) {

        for(let i = 0; i < tocs.length; i++) {
            tocs[i].style.backgroundColor = 'transparent'
            tocs[i].style.color = 'black'
        }

        for(let i = 0; i < littleTOCs.length; i++) {
            littleTOCs[i].style.backgroundColor = 'transparent'
            littleTOCs[i].style.color = 'black'
        }

    });
    
    sl.addEventListener("scroll", function () {
        for(let i = 0; i < tocs.length; i++) {
            tocs[i].style.backgroundColor = 'transparent'
            tocs[i].style.color = 'black'
        }

        for(let i = 0; i < littleTOCs.length; i++) {
            littleTOCs[i].style.opacity = 'transparent'
            littleTOCs[i].style.color = 'black'
        }
    });
    

    sl.addEventListener("end", function () {

        for(let i = 0; i < tocs.length; i++) {
            tocs[i].style.backgroundColor = '#FF6200'
        }

        for(let i = 0; i < littleTOCs.length; i++) {
            littleTOCs[i].style.backgroundColor = '#FF6200'
        }
    });
});
