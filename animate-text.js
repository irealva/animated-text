var TxtType = function(el, toRotate, period) {
    var el = document.getElementById("animate-text-wrap");
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick(el);

    this.isDeleting = false;
    this.shouldErase = false;
};

TxtType.prototype.tick = function(el) {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.shouldErase) {
        console.log("erase");
        this.txt = '';
        this.shouldErase = false;
        el.className = 'wrap';
    }
    else if (this.isDeleting) {
        // this.txt = fullTxt.substring(0, this.txt.length - 1);
        // var el = document.getElementById("animate-text-wrap");

        el.className += " strikethrough";
        this.shouldErase = true;
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    // if (this.isDeleting) {
    //     delta /= 2;
    // }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period / 2;
        this.isDeleting = true;
    }
    else if (this.shouldErase) {
        delta = this.period / 4;
    }
    else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        // delta = 500;
    }

    setTimeout(function() {
        that.tick(el);
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid rgba(90,90,90,0.95) }";
    document.body.appendChild(css);
};
