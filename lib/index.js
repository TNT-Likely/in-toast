require('./index.css');

function Toast(msg, time, callback) {
  if (!(this instanceof Toast)) {
    return new Toast(msg, time, callback);
  }

  if (typeof msg == 'object') {
    callback = msg.callback;
    time = msg.time || msg.duration;
    msg = msg.msg;
  }

  if (typeof time == 'function') {
    callback = time;
    time = 1200;
  }

  this.msg = msg;
  this.callback = callback;
  this.time = time || 1200;

  this.init();
}

Toast.prototype = {
  constructor: Toast,

  init: function() {
    var el;

    el = document.createElement('div');
    el.innerHTML = this.msg;
    el.className = 'toast-msg';

    // remove old toast
    var oldToast = document.getElementsByClassName('toast-msg')[0]
    oldToast && oldToast.parentNode && oldToast.parentNode.removeChild(oldToast)

    document.body.appendChild(el);

    this.el = el;
    this.show();
  },

  show: function() {
    var el = this.el;
    el.classList.add('toast-msg-show')

    var self = this;
    var time = self.time;

    // tap to hide
    el.addEventListener('click', function() {
      self.hide();
    });


    setTimeout(function() {
      self.hide();
    }, time);
  },

  hide: function() {
    var el = this.el;

    var callback = this.callback;

    if (typeof callback == 'function') {
      callback.call(this, el);
    }

    el.classList.remove('toast-msg-show');

    var rmClass = function() {
      el.classList.remove('toast-msg-show');
    };

    el.addEventListener('transitionend', rmClass);
    el.addEventListener('webkitTransitionEnd', rmClass);
  }
};

module.exports = Toast;
