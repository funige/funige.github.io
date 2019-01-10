(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aboutDialog = void 0;

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

var _dialog = require("./dialog.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AboutDialog =
/*#__PURE__*/
function () {
  function AboutDialog() {
    _classCallCheck(this, AboutDialog);

    this.id = 'about-dialog';
    this.element = null;
  }

  _createClass(AboutDialog, [{
    key: "init",
    value: function init(version) {
      $('#about-dialog').dialog({
        autoOpen: true,
        position: {
          my: 'center bottom',
          at: 'center center'
        },
        title: T('About Namenote'),
        modal: true,
        width: 600,
        buttons: {
          Ok: this.ok
        }
      });

      var string = _locale.locale.translateHTML("\n    <center>\n      <img src='./img/namenote1024.png' width=\"100px\" />\n      <br>\n      Namenote v".concat(_namenote.namenote.version, "\n      <br><br>\n      <small>Copyright (c) Funige</small></center>"));

      $('#about-dialog').html(string);
    }
  }, {
    key: "ok",
    value: function ok() {
      _dialog.dialog.close();

      return false;
    }
  }]);

  return AboutDialog;
}();

var aboutDialog = new AboutDialog();
exports.aboutDialog = aboutDialog;

},{"./dialog.es6":7,"./locale.es6":11,"./namenote.es6":16}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window$require = window.require('electron'),
    ipcRenderer = _window$require.ipcRenderer;

var fs = window.require('fs-extra');

var path = window.require('path'); //const { app, dialog } = window.require('electron').remote
////////////////////////////////////////////////////////////////


var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.hoge = 'hoge';
  }

  _createClass(App, [{
    key: "rebuildMenu",
    value: function rebuildMenu(data) {
      ipcRenderer.send('rebuild-menu', JSON.stringify(data));
    }
  }, {
    key: "runMain",
    value: function runMain(message, data) {
      ipcRenderer.send(message, data);
    }
  }]);

  return App;
}();

var app = new App();
exports.app = app;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = void 0;

var _namenote = require("./namenote.es6");

var _dialog = require("./dialog.es6");

var _aboutDialog = require("./about-dialog.es6");

var _sideBar2 = require("./side-bar.es6");

var _toolButton = require("./tool-button.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _runMain = function _runMain(message, data) {
  if (_namenote.namenote.app) {
    log('runMain', message, data);

    _namenote.namenote.app.runMain(message, data);
  } else {
    log("".concat(message, ": can`t execute this command on browser."));
  }
}; ////////////////////////////////////////////////////////////////


var Command =
/*#__PURE__*/
function () {
  function Command() {
    _classCallCheck(this, Command);
  }

  _createClass(Command, [{
    key: "undo",
    value: function undo() {
      log('undo');
    }
  }, {
    key: "redo",
    value: function redo() {
      log('redo');
    }
  }, {
    key: "about",
    value: function about() {
      _dialog.dialog.open(_aboutDialog.aboutDialog);
    }
  }, {
    key: "pen",
    value: function pen(e) {
      log('pen');

      _toolButton.toolButton.select('pen');
    }
  }, {
    key: "eraser",
    value: function eraser(e) {
      log('eraser');

      _toolButton.toolButton.select('eraser');
    }
  }, {
    key: "text",
    value: function text(e) {
      log('text');

      _toolButton.toolButton.select('text');
    }
  }, {
    key: "sideBar",
    value: function sideBar() {
      log('sideBar');

      _sideBar2.sideBar.toggle();
    }
  }, {
    key: "toggleEditMode",
    value: function toggleEditMode() {} //////////////////

  }, {
    key: "do",
    value: function _do(item, data) {
      if (this[item]) {
        this[item](data);
      }
    } //////////////////

  }, {
    key: "developerTools",
    value: function developerTools() {
      _runMain('developerTools');
    }
  }, {
    key: "fullScreen",
    value: function fullScreen() {
      if (_namenote.namenote.app) {
        _runMain('fullScreen');
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  }, {
    key: "quit",
    value: function quit() {
      _runMain('quit');
    }
  }]);

  return Command;
}();

var command = new Command();
exports.command = command;

},{"./about-dialog.es6":1,"./dialog.es6":7,"./namenote.es6":16,"./side-bar.es6":25,"./tool-button.es6":28}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDefault = void 0;
var configDefault = {
  toolBar: true,
  sideBar: false,
  sideBarWidth: 200,
  sideBarPosition: 'right',
  defaultPath: null,
  defaultName: null,
  defaultAuthor: null
};
exports.configDefault = configDefault;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _configDefault = require("./config-default.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Config =
/*#__PURE__*/
function () {
  function Config() {
    _classCallCheck(this, Config);

    this.data = [];
  }

  _createClass(Config, [{
    key: "load",
    value: function load() {
      var json = localStorage.getItem('namenote/config');
      this.data = json ? JSON.parse(json) : $.extend(true, {}, _configDefault.configDefault);
    }
  }, {
    key: "save",
    value: function save() {
      var json = JSON.stringify(this.data);
      localStorage.setItem('namenote/config', json);
    }
  }, {
    key: "resetStorage",
    value: function resetStorage() {
      this.data = Object.assign({}, _configDefault.configDefault);
      this.save();
    }
  }, {
    key: "getValue",
    value: function getValue(key, defaultValue) {
      if (this.data[key] !== undefined) {
        return this.data[key];
      } else {
        return defaultValue;
      }
    }
  }]);

  return Config;
}();

var config = new Config();
exports.config = config;

},{"./config-default.es6":4}],6:[function(require,module,exports){
'use strict';

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

var _app = require("./app.es6");

window.namenote = _namenote.namenote;
window.T = _locale.locale.translate;
window.log = console.log.bind(window.console);
window.warn = console.warn.bind(window.console);
window.error = console.error.bind(window.console);
document.addEventListener("DOMContentLoaded", function () {
  _namenote.namenote.app = _app.app;

  _namenote.namenote.init();
});

},{"./app.es6":2,"./locale.es6":11,"./namenote.es6":16}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dialog = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dialog =
/*#__PURE__*/
function () {
  function Dialog() {
    _classCallCheck(this, Dialog);

    this.current = null;
  }

  _createClass(Dialog, [{
    key: "init",
    value: function init() {}
  }, {
    key: "isOpen",
    value: function isOpen() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = $('.ui-dialog-content')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var widget = _step.value;

          if ($(widget).dialog('isOpen')) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: "open",
    value: function open(widget) {
      if (this.current) this.close();
      this.current = widget;

      if (!widget.element) {
        var element = document.createElement('div');
        element.id = widget.id;
        element.className = 'dialog';
        element.style.top = '0';
        $('body')[0].appendChild(element);
        widget.element = element;
      }

      widget.init();
    }
  }, {
    key: "close",
    value: function close() {
      var widget = this.current;
      var element = widget.element;

      if (element) {
        $('#' + widget.id).dialog('close');
        element.parentNode.removeChild(element);
      }

      widget.element = null;
      this.current = null;
    }
  }]);

  return Dialog;
}();

var dialog = new Dialog();
exports.dialog = dialog;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.historyButton = void 0;

var _command = require("./command.es6");

var _projectManager = require("./project-manager.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var undoButton;
var redoButton; ////////////////////////////////////////////////////////////////

var HistoryButton =
/*#__PURE__*/
function () {
  function HistoryButton() {
    _classCallCheck(this, HistoryButton);
  }

  _createClass(HistoryButton, [{
    key: "init",
    value: function init() {
      undoButton = $('#undo-button').imgButton({
        src: 'img/undo-button.png',
        float: 'left',
        disabled: true,
        click: function click(e) {
          _command.command.undo();
        }
      })[0];
      redoButton = $('#redo-button').imgButton({
        src: 'img/redo-button.png',
        float: 'left',
        disabled: true,
        click: function click(e) {
          _command.command.redo();
        }
      })[0];
    }
  }, {
    key: "update",
    value: function update() {
      var project = _projectManager.projectManager.current;

      if (project) {
        var hasUndo = project ? project.history.hasUndo() : false;
        var hasRedo = project ? project.history.hasRedo() : false;
        $(undoButton).imgButton('disabled', !hasUndo);
        $(redoButton).imgButton('disabled', !hasRedo); //    Menu.updateHistory()
      }
    }
  }]);

  return HistoryButton;
}();

var historyButton = new HistoryButton();
exports.historyButton = historyButton;

},{"./command.es6":3,"./project-manager.es6":19}],9:[function(require,module,exports){
'use strict'; ////////////////////////////////////////////////////////////////

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlDropdown = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HTMLDropdown =
/*#__PURE__*/
function () {
  function HTMLDropdown() {
    _classCallCheck(this, HTMLDropdown);
  }

  _createClass(HTMLDropdown, [{
    key: "init",
    value: function init() {}
  }, {
    key: "open",
    value: function open(element) {
      log('open', element);
      element.style.display = 'block';
    }
  }, {
    key: "close",
    value: function close(element) {
      log('close');
      element.style.display = 'none';
    }
  }, {
    key: "make",
    value: function make(template, id) {
      var content = document.createElement('div');
      content.className = 'dropdown-content';
      content.id = id + '-dropdown';
      content.innerHTML = "[".concat(id, "]");
      return content;
    }
  }]);

  return HTMLDropdown;
}();

var htmlDropdown = new HTMLDropdown();
exports.htmlDropdown = htmlDropdown;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlMenu = void 0;

var _namenote = require("./namenote.es6");

var _command = require("./command.es6");

var _recentUrl = require("./recent-url.es6");

var _menu = require("./menu.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var buttons = {};
var timers = {};
var blurDelay = 500;

var addItems = function addItems(node, items) {
  var ul = document.createElement('ul');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var li = document.createElement('li');
      var div = document.createElement('div');

      if (item.label) {
        div.innerHTML = appendKey(T(item.label), item.accelerator);
      } else {
        div.innerHTML = '-';
      }

      li.appendChild(appendAttribute(div, item.label, item.click));

      if (item.submenu) {
        addItems(li, item.submenu);
      }

      ul.appendChild(li);
      node.appendChild(ul);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

var appendAttribute = function appendAttribute(div, data, click) {
  if (data) {
    var p = document.createElement('p');
    p.innerHTML = data;
    p.title = click || '';
    p.style.display = 'none';
    div.appendChild(p);
  }

  return div;
};

var appendKey = function appendKey(string, key, check) {
  check = check ? '&#x2714;' : '';
  key = convertKey(key) || '&nbsp;';
  var result = "\n    <div class='check'>".concat(check, "</div>\n    <div class='label'>").concat(string, "</div>\n    <div class='key'>").concat(key, "</div>");
  return result;
};

var convertKey = function convertKey(key) {
  if (key) {
    if (!_namenote.namenote.isMac()) {
      if (key.indexOf('Command+Ctrl+F') >= 0) return '';
      key = key.replace(/Shift\+\,/, 'Shift+Comma');
      key = key.replace(/Shift\+\./, 'Shift+Period');
      key = key.replace(/CmdOrCtrl\+/, 'Ctrl+');
      key = key.replace(/Command\+Alt\+/, 'Ctrl+Alt+');
      key = key.replace(/Command\+Ctrl\+/, '???+');
      key = key.toUpperCase();
    } else {
      key = key.replace(/Shift\+\,/, '<');
      key = key.replace(/Shift\+\./, '>');
      key = key.replace(/CmdOrCtrl\+/, '&#8984;');
      key = key.replace(/Command\+Alt\+/, '&#8997;&#8984;');
      key = key.replace(/Command\+Ctrl\+/, '&#8963;&#8984;');
      key = key.replace(/Shift\+/, '&#8679;');
      key = key.toUpperCase();
    }
  }

  return key;
}; ////////////////////////////////////////////////////////////////


var HTMLMenu =
/*#__PURE__*/
function () {
  function HTMLMenu() {
    _classCallCheck(this, HTMLMenu);
  }

  _createClass(HTMLMenu, [{
    key: "init",
    value: function init() {}
  }, {
    key: "open",
    value: function open(element) {
      element.style.display = 'block';
    }
  }, {
    key: "close",
    value: function close(element) {
      element.style.display = 'none';
    }
  }, {
    key: "make",
    value: function make(template, id) {
      var _this = this;

      var content = document.createElement('div');
      content.className = 'dropdown-content';
      content.id = id + '-dropdown';
      addItems(content, template);
      setTimeout(function () {
        _this.activate(content.childNodes[0], id);
      }, 1);
      return content;
    }
  }, {
    key: "activate",
    value: function activate(menu, id) {
      var _this2 = this;

      menu.id = id + '-menu';
      buttons[id] = $('#' + id + '-menu-button');
      timers[id] = null;
      $(menu).menu({
        select: function (event, ui) {
          if (this.select(event, ui)) {
            this.collapse(menu, id);
            buttons[id].imgButton('locked', false);
          }
        }.bind(this)
      });
      $(menu).on('menufocus', function () {
        clearTimeout(timers[id]);
      });
      $(menu).on('menublur', function () {
        if (!buttons[id].imgButton('locked')) return;
        timers[id] = setTimeout(function () {
          _this2.collapse(menu, id);
        }, blurDelay);
      });
    }
  }, {
    key: "collapse",
    value: function collapse(menu, id) {
      var _this3 = this;

      $(menu).menu('collapseAll', null, true);
      setTimeout(function () {
        _this3.close(menu.parentNode);

        buttons[id].imgButton('locked', false);
      }, 500);
    } ////////////////

  }, {
    key: "update",
    value: function update(element) {
      var menu = element.childNodes[0];
      var id = element.id.replace(/-.*$/, '');
      warn('[html menu update]', id);

      if (id == 'file') {
        this.updateRecents(menu);
      }

      this.updateStates(menu);
      $(menu).menu('refresh');
    }
  }, {
    key: "updateRecents",
    value: function updateRecents(menu) {
      while (menu.childNodes.length > 3) {
        menu.removeChild(menu.childNodes[menu.childNodes.length - 1]);
      }

      var df = document.createDocumentFragment();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _recentUrl.recentURL.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          var li = document.createElement('li');
          var div = document.createElement('div');
          div.innerHTML = item;
          li.appendChild(appendAttribute(div, item, 'openURL'));
          df.appendChild(li);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      menu.appendChild(df);
    }
  }, {
    key: "updateStates",
    value: function updateStates(menu) {
      var items = $(menu).find('li');
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;
          var name = $(item).find('p');

          if (name && name.length == 1) {
            var label = name[0].innerHTML;

            var state = _menu.menu.getState(label);

            if (state !== undefined) {
              if (state) {
                item.classList.remove('ui-state-disabled');
              } else {
                item.classList.add('ui-state-disabled');
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    } ////////////////

  }, {
    key: "select",
    value: function select(event, ui) {
      var p = ui.item[0] && ui.item[0].getElementsByTagName('p')[0];

      if (p) {
        var data = p.innerHTML;
        var click = p.title;

        if (click) {
          error("".concat(click), "".concat(data));

          _command.command.do("".concat(click), "".concat(data));

          return true;
        }
      }

      return false;
    }
  }]);

  return HTMLMenu;
}();

var htmlMenu = new HTMLMenu();
exports.htmlMenu = htmlMenu;

},{"./command.es6":3,"./menu.es6":15,"./namenote.es6":16,"./recent-url.es6":21}],11:[function(require,module,exports){
'use strict'; ////////////////////////////////////////////////////////////////

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locale = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Locale =
/*#__PURE__*/
function () {
  function Locale() {
    var _this = this;

    _classCallCheck(this, Locale);

    var dictionary = require('../js/lib/dictionary.js').dictionary;

    for (var key in dictionary) {
      if (navigator.language.indexOf(key) == 0 && dictionary[key]) {
        var _ret = function () {
          var dict = dictionary[key];

          _this.translate = function (string) {
            return dict[string] || string;
          };

          return "break";
        }();

        if (_ret === "break") break;
      }
    }
  }

  _createClass(Locale, [{
    key: "translate",
    value: function translate(string) {
      return string;
    }
  }, {
    key: "translateHTML",
    value: function translateHTML(html) {
      var _this2 = this;

      return html.replace(/T\((.*?)\)/g, function (all, match) {
        return _this2.translate(match);
      });
    }
  }]);

  return Locale;
}();

var locale = new Locale();
exports.locale = locale;

},{"../js/lib/dictionary.js":31}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainView = void 0;

var _namenote = require("./namenote.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// $('.main-view')[0].parentNode.scrollTop = ...
////////////////////////////////////////////////////////////////
var MainView =
/*#__PURE__*/
function () {
  function MainView() {
    _classCallCheck(this, MainView);

    this.scale = 1;
  }

  _createClass(MainView, [{
    key: "init",
    value: function init() {}
  }]);

  return MainView;
}();

var mainView = new MainView();
exports.mainView = mainView;

},{"./namenote.es6":16}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menuButton = void 0;

var _command = require("./command.es6");

var _projectManager = require("./project-manager.es6");

var _htmlMenu = require("./html-menu.es6");

var _menu = require("./menu.es6");

var _menuTemplate = require("./menu-template.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fileButton;
var otherButton; ////////////////////////////////////////////////////////////////

var MenuButton =
/*#__PURE__*/
function () {
  function MenuButton() {
    _classCallCheck(this, MenuButton);

    this.buttons = [];
  }

  _createClass(MenuButton, [{
    key: "init",
    value: function init() {
      fileButton = $('#file-menu-button').imgButton({
        src: 'img/file-button.png',
        float: 'left',
        click: function (e) {
          this.select(e);
        }.bind(this),
        content: _htmlMenu.htmlMenu.make(_menuTemplate.fileMenuTemplate, 'file')
      })[0];
      otherButton = $('#other-menu-button').imgButton({
        src: 'img/menu-button.png',
        float: 'right',
        click: function (e) {
          this.select(e);
        }.bind(this),
        content: _htmlMenu.htmlMenu.make(_menuTemplate.otherMenuTemplate, 'other')
      })[0];
      this.buttons.push(fileButton, otherButton);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "select",
    value: function select(e) {
      if (e.target.className.indexOf('img-button') < 0) return;
      if ($(e.target).imgButton('disabled')) return;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          var locked = $(button).imgButton('locked');
          var dropdown = $(button).find('.dropdown-content')[0];

          if (button && button.id == e.target.id) {
            if (!locked) {
              _htmlMenu.htmlMenu.update(dropdown);

              $(button).imgButton('locked', true);

              _htmlMenu.htmlMenu.open(dropdown);
            } else {
              $(button).imgButton('locked', false);

              _htmlMenu.htmlMenu.close(dropdown);
            }
          } else {
            if (locked) {
              $(button).imgButton('locked', false);

              _htmlMenu.htmlMenu.close(dropdown);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return MenuButton;
}();

var menuButton = new MenuButton();
exports.menuButton = menuButton;

},{"./command.es6":3,"./html-menu.es6":10,"./menu-template.es6":14,"./menu.es6":15,"./project-manager.es6":19}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otherMenuTemplate = exports.fileMenuTemplate = exports.menuTemplate = void 0;
var menuTemplate = [{
  label: 'Namenote',
  submenu: [{
    label: 'About Namenote ...',
    click: 'about'
  }, {
    type: 'separator'
  }, {
    label: 'Settings ...',
    click: 'settings'
  }, {
    label: 'Tablet Settings ...',
    click: 'tabletSettings'
  }, {
    type: 'separator'
  }, {
    label: 'Quit Namenote',
    accelerator: "CmdOrCtrl+Q",
    click: 'quit'
  }]
}, {
  label: 'Note',
  submenu: [{
    label: 'New ...',
    accelerator: "CmdOrCtrl+N",
    click: 'openNewDialog'
  }, {
    label: 'Open ...',
    accelerator: "CmdOrCtrl+O",
    click: 'open'
  }, {
    label: 'Open Recent',
    submenu: []
  }, {
    type: 'separator'
  }, //    { label: 'Close', accelerator: "CmdOrCtrl+W", click: 'close' },
  //    { label: 'Close All', click: 'closeAll' },
  {
    label: 'Save Snapshot As ...',
    accelerator: "CmdOrCtrl+S",
    click: 'snapshot'
  }, //    { type: 'separator' },
  //    { label: 'Note Settings ...', click: 'noteSettings' },
  {
    type: 'separator'
  }, //    { label: 'Import',
  //	submenu: [
  //	  { label: '.txt (Plain Text) ...', accelerator: "CmdOrCtrl+Shift+I", click: 'importTextDialog' },
  //	],
  //    },
  {
    label: 'Export',
    submenu: [{
      label: '.csnf (CLIP STUDIO Storyboard) ...',
      accelerator: "CmdOrCtrl+P",
      click: 'exportCSNFDialog'
    }, {
      label: '.pdf (PDF) ...',
      accelerator: "CmdOrCtrl+Shift+P",
      click: 'exportPDFDialog'
    }]
  }]
}, {
  label: "Edit",
  submenu: [{
    label: "Undo",
    accelerator: "CmdOrCtrl+Z",
    selector: "undo:",
    click: 'undo'
  }, {
    label: "Redo",
    accelerator: "CmdOrCtrl+Y",
    selector: "redo:",
    click: 'redo'
  }, {
    type: "separator"
  }, {
    label: "Cut",
    accelerator: "CmdOrCtrl+X",
    selector: "cut:"
  }, {
    label: "Copy",
    accelerator: "CmdOrCtrl+C",
    selector: "copy:"
  }, {
    label: "Paste",
    accelerator: "CmdOrCtrl+V",
    selector: "paste:"
  }, {
    label: "Select All",
    accelerator: "CmdOrCtrl+A",
    selector: "selectAll:",
    click: 'selectAll'
  }]
}, {
  label: 'Page',
  submenu: [{
    label: 'Add',
    accelerator: "Shift+i",
    click: 'appendPage'
  }, {
    label: 'Move Forward',
    accelerator: "Shift+.",
    click: 'movePageForward'
  }, {
    label: 'Move Backward',
    accelerator: "Shift+,",
    click: 'movePageBackward'
  }, {
    type: "separator"
  }, {
    label: 'Move to Buffer',
    accelerator: "Shift+k",
    click: 'cutPage'
  }, {
    label: 'Put Back from Buffer',
    accelerator: "Shift+Y",
    click: 'pastePage'
  }, {
    label: 'Empty Buffer',
    accelerator: "Shift+0",
    click: 'emptyPage'
  }, //    { type: "separator" },
  //    { label: 'Flip', accelerator: "H", click: 'flipPage' },
  {
    type: "separator"
  }, {
    label: 'Extract Text',
    accelerator: "CmdOrCtrl+T",
    click: 'extractText'
  }, {
    label: 'Save Image As ...',
    accelerator: "CmdOrCtrl+-",
    click: 'savePageImage'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Full Screen',
    accelerator: 'Ctrl+Command+F',
    click: 'fullScreen'
  }, //    { label: 'Tool Bar', click: 'toolBar' }, //accelerator: "Command+Alt+H", 
  {
    label: 'Side Bar',
    accelerator: 'Command+Alt+S',
    click: 'sideBar'
  }, {
    label: 'Developer Tools',
    accelerator: "Command+Alt+J",
    click: 'developerTools'
  }, {
    type: 'separator'
  }, {
    label: 'Page Margin',
    accelerator: "R",
    click: 'showMargin'
  }, {
    label: 'Number of Pages per Row',
    submenu: [{
      label: '2',
      click: 'row1'
    }, {
      label: '4',
      click: 'row2'
    }, {
      label: '6',
      click: 'row3'
    }, {
      label: '8',
      click: 'row4'
    }]
  }]
}];
exports.menuTemplate = menuTemplate;
var fileMenuTemplate = [{
  label: 'New ...',
  accelerator: "CmdOrCtrl+N",
  click: 'openNewDialog'
}, {
  label: 'Open ...',
  accelerator: "CmdOrCtrl+O",
  click: 'open'
}, {
  type: 'separator'
}];
exports.fileMenuTemplate = fileMenuTemplate;
var otherMenuTemplate = [{
  label: 'Note',
  submenu: [//    { label: 'Close', accelerator: "CmdOrCtrl+W", click: 'close' },
  //    { label: 'Close All', click: 'closeAll' },
  {
    label: 'Save Snapshot As ...',
    accelerator: "CmdOrCtrl+S",
    click: 'snapshot'
  }, {
    type: 'separator'
  }, //    { label: 'Import',
  //	submenu: [
  //	  { label: '.txt (Plain Text) ...', accelerator: "CmdOrCtrl+Shift+I", click: 'importTextDialog' },
  //	],
  //    },
  {
    label: 'Export',
    submenu: [{
      label: '.csnf (CLIP STUDIO Storyboard) ...',
      accelerator: "CmdOrCtrl+P",
      click: 'exportCSNFDialog'
    }, {
      label: '.pdf (PDF) ...',
      accelerator: "CmdOrCtrl+Shift+P",
      click: 'exportPDFDialog'
    }]
  }]
}, {
  label: 'Page',
  submenu: [{
    label: 'Add',
    accelerator: "Shift+i",
    click: 'appendPage'
  }, {
    label: 'Move Forward',
    accelerator: "Shift+.",
    click: 'movePageForward'
  }, {
    label: 'Move Backward',
    accelerator: "Shift+,",
    click: 'movePageBackward'
  }, {
    type: "separator"
  }, {
    label: 'Move to Buffer',
    accelerator: "Shift+K",
    click: 'cutPage'
  }, {
    label: 'Put Back from Buffer',
    accelerator: "Shift+Y",
    click: 'pastePage'
  }, {
    label: 'Empty Buffer',
    accelerator: "Shift+0",
    click: 'emptyPage'
  }, {
    type: "separator"
  }, {
    label: 'Extract Text',
    accelerator: "CmdOrCtrl+T",
    click: 'extractText'
  }, {
    label: 'Save Image As ...',
    accelerator: "CmdOrCtrl+-",
    click: 'savePageImage'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Full Screen',
    accelerator: 'Command+Ctrl+F',
    click: 'fullScreen'
  }, {
    label: 'Side Bar',
    accelerator: 'Command+Alt+S',
    click: 'sideBar'
  }, {
    label: 'Developer Tools',
    accelerator: "Command+Alt+J",
    click: 'developerTools'
  }, {
    type: 'separator'
  }, {
    label: 'Page Margin',
    accelerator: "R",
    click: 'showMargin'
  }, {
    label: 'Number of Pages per Row',
    submenu: [{
      label: '2',
      click: 'row1'
    }, {
      label: '4',
      click: 'row2'
    }, {
      label: '6',
      click: 'row3'
    }, {
      label: '8',
      click: 'row4'
    }]
  }]
},
/*  
  { label: 'Window',
    submenu: [
    ],
  },
*/
{
  type: "separator"
}, {
  label: 'Settings ...',
  click: 'settings'
}, {
  label: 'Tablet Settings ...',
  click: 'tabletSettings'
}, {
  label: 'Help',
  click: 'about'
}];
exports.otherMenuTemplate = otherMenuTemplate;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.menu = void 0;

var _namenote = require("./namenote.es6");

var _menuTemplate = require("./menu-template.es6");

var _recentUrl = require("./recent-url.es6");

var _htmlMenu = require("./html-menu.es6");

var _projectManager = require("./project-manager.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var template;
var states = {};

var findSubmenu = function findSubmenu(template, label) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = template[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (item.label == label) {
        return item;
      }

      if (item.submenu) {
        var result = findSubmenu(item.submenu, label);
        if (result) return result;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

var setState = function setState(template, label, value) {
  var item = findSubmenu(template, label);

  if (item) {
    value = value ? true : false;
    item.enabled = value;

    if (item.submenu) {
      if (!value) delete item.submenu;
    }

    states[label] = value;
  }
}; ////////////////////////////////////////////////////////////////


var Menu =
/*#__PURE__*/
function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, [{
    key: "init",
    value: function init() {
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      template = JSON.parse(JSON.stringify(_menuTemplate.menuTemplate));
      states = {};
      warn('[native menu update]');
      this.updateRecents(template);
      this.updateStates(template);
      this.rebuild(template);
    }
  }, {
    key: "rebuild",
    value: function rebuild(template) {
      if (_namenote.namenote.app) {
        _namenote.namenote.app.rebuildMenu(template);
      }
    }
  }, {
    key: "updateRecents",
    value: function updateRecents(template) {
      var recents = findSubmenu(template, 'Open Recent').submenu;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _recentUrl.recentURL.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var item = _step2.value;
          recents.push({
            label: item,
            data: item,
            click: 'openURL'
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "updateStates",
    value: function updateStates(template) {
      var isApp = _namenote.namenote.app ? true : false;
      setState(template, 'Full Screen', isApp || window.chrome);
      setState(template, 'Developer Tools', isApp);
      var project = _projectManager.projectManager.current;
      var isProject = project ? true : false;
      setState(template, 'Close', isProject);
      setState(template, 'Close All', isProject);
      setState(template, 'Save Snapshot As ...', isProject);
      setState(template, '.txt (Plain Text) ...', isProject);
      setState(template, '.csnf (CLIP STUDIO Storyboard) ...', isProject);
      setState(template, '.pdf (PDF) ...', isProject);
      setState(template, 'Add', isProject);
      setState(template, 'Move to Buffer', isProject);
      setState(template, 'Put Back from Buffer', isProject);
      setState(template, 'Empty Buffer', isProject);
      setState(template, 'Move Forward', isProject);
      setState(template, 'Move Backward', isProject);
      setState(template, 'Extract Text', isProject);
      setState(template, 'Save Image As ...', isProject);
      setState(template, 'Undo', isProject); // && project.history.hasUndo())

      setState(template, 'Redo', isProject); // && project.history.hasRedo())
    }
  }, {
    key: "getState",
    value: function getState(label) {
      return states[label];
    }
  }]);

  return Menu;
}();

var menu = new Menu();
exports.menu = menu;

},{"./html-menu.es6":10,"./menu-template.es6":14,"./namenote.es6":16,"./project-manager.es6":19,"./recent-url.es6":21}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namenote = void 0;

var _config = require("./config.es6");

var _shortcut = require("./shortcut.es6");

var _recentUrl = require("./recent-url.es6");

var _command = require("./command.es6");

var _ui = require("./ui.es6");

var _mainView = require("./main-view.es6");

var _pageView = require("./page-view.es6");

var _textView = require("./text-view.es6");

var _projectManager = require("./project-manager.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var Namenote =
/*#__PURE__*/
function () {
  function Namenote() {
    _classCallCheck(this, Namenote);

    this.version = "2.0.0-alpha.1-debug";
    this.trial = false;
    this.config = _config.config;
    this.shortcut = _shortcut.shortcut;
    this.recentURL = _recentUrl.recentURL;
    this.command = _command.command;
    this.ui = _ui.ui;
    this.projectManager = _projectManager.projectManager;
  }

  _createClass(Namenote, [{
    key: "init",
    value: function init() {
      _config.config.load();

      _shortcut.shortcut.load();

      _recentUrl.recentURL.load();

      _ui.ui.init();

      this.initBaseHandlers();
    }
  }, {
    key: "initBaseHandlers",
    value: function initBaseHandlers() {
      window.onresize = function (e) {
        setTimeout(function () {
          log('onresize', document.body.clientWidth, document.body.clientHeight);
        }, 100);
      };

      window.oncontextmenu = function (e) {
        log('contextmenu');
      };
    }
  }, {
    key: "isMac",
    value: function isMac() {
      return true;
    }
  }]);

  return Namenote;
}();

var namenote = new Namenote();
exports.namenote = namenote;

},{"./command.es6":3,"./config.es6":5,"./main-view.es6":12,"./page-view.es6":17,"./project-manager.es6":19,"./recent-url.es6":21,"./shortcut.es6":24,"./text-view.es6":26,"./ui.es6":29}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageView = void 0;

var _namenote = require("./namenote.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var PageView =
/*#__PURE__*/
function () {
  function PageView() {
    _classCallCheck(this, PageView);
  }

  _createClass(PageView, [{
    key: "init",
    value: function init() {}
  }]);

  return PageView;
}();

var pageView = new PageView();
exports.pageView = pageView;

},{"./namenote.es6":16}],18:[function(require,module,exports){
'use strict'; ////////////////////////////////////////////////////////////////

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Page =
/*#__PURE__*/
function () {
  function Page() {
    _classCallCheck(this, Page);

    this.pid = 0;
  }

  _createClass(Page, [{
    key: "destructor",
    value: function destructor() {
      log('page destructor', this.pid);
    }
  }]);

  return Page;
}();

exports.Page = Page;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.projectManager = void 0;

var _project2 = require("./project.es6");

var _recentUrl = require("./recent-url.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var ProjectManager =
/*#__PURE__*/
function () {
  function ProjectManager() {
    _classCallCheck(this, ProjectManager);

    this.projects = [];
    this.current = null;
  }

  _createClass(ProjectManager, [{
    key: "select",
    value: function select(project) {
      this.current = project;

      _recentUrl.recentURL.add(project.url);
    }
  }, {
    key: "findIndex",
    value: function findIndex(project) {
      for (var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].url == project.url) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "open",
    value: function open(url) {
      var index = this.findIndex(url);

      if (index < 0) {
        var project = new _project2.Project(url);
        this.projects.push(project);
        this.select(project);
        return Promise.resolve(project);
      } else {
        var _project = this.projects[index];
        this.select(_project);
        return Promise.resolve(_project);
      }
    }
  }]);

  return ProjectManager;
}();

var projectManager = new ProjectManager();
exports.projectManager = projectManager;

},{"./project.es6":20,"./recent-url.es6":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Project = void 0;

var _page = require("./page.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var Project =
/*#__PURE__*/
function () {
  function Project(url) {
    _classCallCheck(this, Project);

    this.url = url.replace(/\\/g, '/');
    this.pages = [];
    this.current = null;
  }

  _createClass(Project, [{
    key: "destructor",
    value: function destructor() {
      log('project destructor', this.url);
      this.pages.forEach(function (page) {
        page.destructor();
      });
    }
  }, {
    key: "findIndex",
    value: function findIndex(page) {
      for (var i = 0; i < this.pages.length; i++) {
        if (this.pages[i].pid == page.pid) {
          return i;
        }
      }

      return -1;
    }
  }]);

  return Project;
}();

exports.Project = Project;

},{"./page.es6":18}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recentURL = void 0;

var _projectManager = require("./project-manager.es6");

var _menu = require("./menu.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var max = 10; ////////////////////////////////////////////////////////////////

var RecentURL =
/*#__PURE__*/
function () {
  function RecentURL() {
    _classCallCheck(this, RecentURL);

    this.data = [];
  }

  _createClass(RecentURL, [{
    key: "load",
    value: function load() {
      var json = localStorage.getItem('namenote/recent-url');
      this.data = json ? JSON.parse(json) : [];
    }
  }, {
    key: "save",
    value: function save() {
      var json = JSON.stringify(this.data);
      localStorage.setItem('namenote/recent-url', json);
      setTimeout(function () {
        _menu.menu.update();
      }, 500);
    }
  }, {
    key: "resetStorage",
    value: function resetStorage() {
      this.data = [];
      this.save();
    }
  }, {
    key: "add",
    value: function add(url) {
      this.data = this.data.filter(function (value) {
        return value != url;
      });
      this.data.unshift(url);

      if (this.data.length > max) {
        this.data.length = max;
      }

      this.save();
    }
  }]);

  return RecentURL;
}();

var recentURL = new RecentURL();
exports.recentURL = recentURL;

},{"./menu.es6":15,"./project-manager.es6":19}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scaleButton = void 0;

var _command = require("./command.es6");

var _projectManager = require("./project-manager.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var quickZoomButton;
var zoomButton;
var unzoomButton; ////////////////////////////////////////////////////////////////

var ScaleButton =
/*#__PURE__*/
function () {
  function ScaleButton() {
    _classCallCheck(this, ScaleButton);
  }

  _createClass(ScaleButton, [{
    key: "init",
    value: function init() {
      quickZoomButton = $('#row-button').imgButton({
        src: 'img/magnifier-button.png',
        float: 'right',
        click: function click(e) {
          _command.command.quickZoom();
        }
      })[0];
      zoomButton = $('#zoom-button').imgButton({
        src: 'img/zoom-button.png',
        disabled: true,
        float: 'right',
        click: function click(e) {
          _command.command.zoom();
        }
      })[0];
      unzoomButton = $('#unzoom-button').imgButton({
        src: 'img/unzoom-button.png',
        disabled: true,
        float: 'right',
        click: function click(e) {
          _command.command.unzoom();
        }
      })[0];
    }
  }, {
    key: "update",
    value: function update() {
      var project = _projectManager.projectManager.current;
      var quickZoom = project ? project.view.quickZoom : false;
      $(quickZoomButton).imgButton('locked', quickZoom);
      $(zoomButton).imgButton('disabled', !project);
      $(unzoomButton).imgButton('disabled', !quickZoom);
    }
  }]);

  return ScaleButton;
}();

var scaleButton = new ScaleButton();
exports.scaleButton = scaleButton;

},{"./command.es6":3,"./project-manager.es6":19}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortcutDefault = void 0;
var shortcutDefault = {
  undo: ['command+z', 'ctrl+z', 'num/', ','],
  redo: ['command+y', 'ctrl+y', 'num*', '.'],
  zoom: ['[', 'q', 'numplus'],
  unzoom: [']', 'a', 'numminus'],
  toggleTool: ['x', 'num.', '/'],
  openNewDialog: ['command+n', 'alt+n'],
  open: ['command+o', 'alt+o'],
  close: ['command+w', 'alt+w'],
  quit: ['command+q', 'alt+q'],
  reload: ['command+shift+r'],
  exportCSNFDialog: ['command+p', 'alt+p'],
  exportPDFDialog: ['command+shift+p', 'alt+shift+p'],
  importTextDialog: ['command+shift+i', 'alt+shift+i'],
  savePageImage: ['command+-', 'alt+-'],
  extractText: ['command+t', 'alt+t'],
  //marginSettingsDialog: ['command+shift+i', 'alt+shift+i'],
  pageLeft: 'left',
  pageRight: 'right',
  pageUp: 'up',
  pageDown: 'down',
  selectAll: 'ctrl+a',
  unselect: 'ctrl+d',
  mergeText: 'ctrl+e',
  sideBar: 'command+alt+s',
  developerTools: 'command+alt+j',
  toolBar: 'command+alt+h',
  pen: 'p',
  eraser: 'e',
  text: 't',
  //
  // Page shortcuts
  //
  insertPage: 'shift+i',
  duplicatePage: 'shift+d',
  showMargin: 'r',
  //flipPage: 'h',
  appendPage: 'shift+a',
  cutPage: 'shift+k',
  pastePage: 'shift+y',
  emptyPage: 'shift+0',
  movePageLeft: '<',
  movePageRight: '>',
  row1: 'shift+1',
  row2: 'shift+2',
  row3: 'shift+3',
  row4: 'shift+4',
  //
  // Text shortcuts (can be used while text editing)
  //
  toggleEditMode: 'ctrl+g',
  addFontSize: 'ctrl+.',
  subtractFontSize: 'ctrl+,',
  toggleDirection: 'ctrl+]',
  cutText: 'backspace',
  nextText: 'tab',
  prevText: 'shift+tab'
};
exports.shortcutDefault = shortcutDefault;

},{}],24:[function(require,module,exports){
'use strict'; //import { namenote } from './namenote.es6'

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortcut = void 0;

var _shortcutDefault = require("./shortcut-default.es6");

var _command = require("./command.es6");

var _ui = require("./ui.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Shortcut =
/*#__PURE__*/
function () {
  function Shortcut() {
    _classCallCheck(this, Shortcut);

    this.data = [];
    Mousetrap.addKeycodes({
      107: 'numplus',
      109: 'numminus',
      110: 'num.',
      111: 'num/',
      106: 'num*'
    });

    Mousetrap.prototype.stopCallback = function (e, element, combo) {
      /*
            if (Text.isEditable(element)) {
              log('keycode=', e.keyCode, e)
      
      	if (e.ctrlKey && !e.shiftKey && !e.metaKey) {
      	  switch (e.keyCode) {
      	  case 71:  // ctrl+g
      	  case 188: // ctrl+,
      	  case 190: // ctrl+.
      	  case 221: // ctrl+]
      	    return false
      	  }
      	}
      
      	if (e.keyCode == 9) { // TAB
      	  return false
      	}
      	return true
            }
            return false
      */
    };
  }

  _createClass(Shortcut, [{
    key: "load",
    value: function load() {
      var json = localStorage.getItem('namenote/shortcut');
      this.data = json ? JSON.parse(json) : Object.assign({}, _shortcutDefault.shortcutDefault);
      this.bind();
    }
  }, {
    key: "save",
    value: function save() {
      var json = JSON.stringify(this.data);
      localStorage.setItem('namenote/shortcut', json);
    }
  }, {
    key: "resetStorage",
    value: function resetStorage() {
      this.data = Object.assign({}, _shortcutDefault.shortcutDefault);
      this.save();
      Mousetrap.reset();
      this.bind();
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      var _loop = function _loop(item) {
        var key = _this.data[item];
        var handler = _command.command[item];
        if (item == 'developerTools') return "continue";

        if (handler) {
          log("'".concat(item));
          Mousetrap.bind(key, function (e) {
            _command.command.prev = _command.command.current;
            _command.command.current = item;
            log("*".concat(item, "*"));
            handler();
            return _ui.ui.dialog.isOpen() ? true : false;
          }, 'keydown');
        } else {
          log("'".concat(item, "': no such command"));
        }
      };

      for (var item in this.data) {
        var _ret = _loop(item);

        if (_ret === "continue") continue;
      } //  Mousetrap.bind('space', (e) => {
      //    Controller.clearMove()
      //    return false;
      //  })
      //  Mousetrap.bind('enter', (e) => {
      //    if (ui.dialog.isOpen()) return true
      //    command.quickZoom()
      //    return false
      //  })
      //  Mousetrap.bind('space', (e) => {
      //    if (!Controller.isMoved()) {
      //	command.quickZoom();
      //    }
      //    return false;
      //  }, 'keyup')

    }
  }]);

  return Shortcut;
}();

var shortcut = new Shortcut();
exports.shortcut = shortcut;

},{"./command.es6":3,"./shortcut-default.es6":23,"./ui.es6":29}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideBar = void 0;

var _config = require("./config.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var minWidth = 150; ////////////////////////////////////////////////////////////////

var SideBar =
/*#__PURE__*/
function () {
  function SideBar() {
    _classCallCheck(this, SideBar);
  }

  _createClass(SideBar, [{
    key: "init",
    value: function init() {
      var _this = this;

      $('.split-pane').splitPane();
      $('.split-pane').on('dividerdragend', function (e) {
        // or 'splitpaneresize'
        _this.onDividerDragEnd();
      });
      this.updatePosition();
    }
  }, {
    key: "update",
    value: function update(value) {
      if (value == undefined) value = _config.config.data.sideBar;
      _config.config.data.sideBar = value;

      _config.config.save();

      var width = value ? _config.config.data.sideBarWidth : 0;

      if (_config.config.data.sideBarPosition == 'right') {
        width = $('.split-pane').width() - width + 1;
      }

      if (value) {
        var maxWidth = $('.split-pane').width() - minWidth - 1;
        if (width < minWidth) width = minWidth;
        if (width > maxWidth) width = maxWidth;
      }

      $('.split-pane').splitPane('firstComponentSize', width);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.update(!_config.config.data.sideBar);
    }
  }, {
    key: "updatePosition",
    value: function updatePosition(value) {
      if (value == undefined) value = _config.config.data.sideBarPosition;
      _config.config.data.sideBarPosition = value;

      _config.config.save();

      var mainView = $('.main-view');
      var sideBar = $('.side-bar');

      if (value == 'left') {
        $('#left-component').append(sideBar);
        $('#right-component').append(mainView);
      } else {
        $('#right-component').append(sideBar);
        $('#left-component').append(mainView);
      }

      this.update();
    }
  }, {
    key: "onDividerDragEnd",
    value: function onDividerDragEnd() {
      var width = $('.side-bar').width();
      var maxWidth = $('.split-pane').width() - minWidth - 1;
      if (width < minWidth) width = minWidth;
      if (width > maxWidth) width = maxWidth;
      _config.config.data.sideBarWidth = parseInt(width);
      _config.config.data.sideBar = true;

      _config.config.save();

      this.update();
    }
  }]);

  return SideBar;
}();

var sideBar = new SideBar();
exports.sideBar = sideBar;

},{"./config.es6":5}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textView = void 0;

var _namenote = require("./namenote.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var TextView =
/*#__PURE__*/
function () {
  function TextView() {
    _classCallCheck(this, TextView);
  }

  _createClass(TextView, [{
    key: "init",
    value: function init() {}
  }]);

  return TextView;
}();

var textView = new TextView();
exports.textView = textView;

},{"./namenote.es6":16}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toolBar = void 0;

var _config = require("./config.es6");

var _scaleButton = require("./scale-button.es6");

var _historyButton = require("./history-button.es6");

var _toolButton = require("./tool-button.es6");

var _menuButton = require("./menu-button.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToolBar =
/*#__PURE__*/
function () {
  function ToolBar() {
    _classCallCheck(this, ToolBar);
  }

  _createClass(ToolBar, [{
    key: "init",
    value: function init() {
      _scaleButton.scaleButton.init();

      _historyButton.historyButton.init();

      _toolButton.toolButton.init();

      _menuButton.menuButton.init();

      this.update();
      this.updateButtons();
    }
  }, {
    key: "updateButtons",
    value: function updateButtons() {
      _scaleButton.scaleButton.update();

      _historyButton.historyButton.update();

      _toolButton.toolButton.update();

      _menuButton.menuButton.update();
    }
  }, {
    key: "update",
    value: function update(value) {
      if (value == undefined) value = _config.config.data.toolBar;
      _config.config.data.toolBar = value;

      _config.config.save();

      $('#tool-bar').css('display', value ? 'block' : 'none');
      $('#main').css('height', value ? 'calc(100% - 37px)' : '100%');
      $('#main').css('top', value ? '37px' : '0'); //View.onResize()
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.update(!_config.config.data.toolBar);
    }
  }]);

  return ToolBar;
}();

var toolBar = new ToolBar();
exports.toolBar = toolBar;

},{"./config.es6":5,"./history-button.es6":8,"./menu-button.es6":13,"./scale-button.es6":22,"./tool-button.es6":28}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toolButton = void 0;

var _command = require("./command.es6");

var _htmlDropdown = require("./html-dropdown.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var penButton;
var eraserButton;
var textButton; ////////////////////////////////////////////////////////////////

var ToolButton =
/*#__PURE__*/
function () {
  function ToolButton() {
    _classCallCheck(this, ToolButton);

    this.buttons = [];
  }

  _createClass(ToolButton, [{
    key: "init",
    value: function init() {
      penButton = $('#pen-button').imgButton({
        src: 'img/pen-button.png',
        locked: true,
        float: 'left',
        click: function (e) {
          if ($(e.target).imgButton('instance')) {
            this.select('pen');
          }
        }.bind(this),
        content: _htmlDropdown.htmlDropdown.make('penDropDown', 'pen')
      })[0];
      eraserButton = $('#eraser-button').imgButton({
        src: 'img/eraser-button.png',
        float: 'left',
        click: function (e) {
          if ($(e.target).imgButton('instance')) {
            this.select('text');
          }
        }.bind(this),
        content: _htmlDropdown.htmlDropdown.make('eraserDropDown', 'eraser')
      })[0];
      textButton = $('#text-button').imgButton({
        src: 'img/text-button.png',
        float: 'left',
        click: function (e) {
          if ($(e.target).imgButton('instance')) {
            this.select('text');
          }
        }.bind(this),
        content: _htmlDropdown.htmlDropdown.make('textDropDown', 'text')
      })[0];
      this.buttons.push(penButton, eraserButton, textButton);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "select",
    value: function select(tool) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          var locked = $(button).imgButton('locked');
          var dropdown = $(button).find('.dropdown-content')[0];

          if (button && button.id.indexOf(tool) == 0) {
            if (!locked) {
              $(button).imgButton('locked', true);
            }
          } else {
            if (locked) {
              $(button).imgButton('locked', false);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return ToolButton;
}();

var toolButton = new ToolButton();
exports.toolButton = toolButton;

},{"./command.es6":3,"./html-dropdown.es6":9}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui = void 0;

var _widget = require("./widget.es6");

var _toolBar = require("./tool-bar.es6");

var _sideBar = require("./side-bar.es6");

var _dialog = require("./dialog.es6");

var _menu = require("./menu.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);

    this.menu = _menu.menu;
    this.dialog = _dialog.dialog;
    this.toolBar = _toolBar.toolBar;
    this.sideBar = _sideBar.sideBar;
  }

  _createClass(UI, [{
    key: "init",
    value: function init() {
      _menu.menu.init();

      _dialog.dialog.init();

      _toolBar.toolBar.init();

      _sideBar.sideBar.init();

      $('.split-pane').css('opacity', 1);
    }
  }, {
    key: "update",
    value: function update() {
      _toolBar.toolBar.update();

      _sideBar.sideBar.update();
    }
  }]);

  return UI;
}();

var ui = new UI();
exports.ui = ui;

},{"./dialog.es6":7,"./menu.es6":15,"./side-bar.es6":25,"./tool-bar.es6":27,"./widget.es6":30}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.widget = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Widget =
/*#__PURE__*/
function () {
  function Widget() {
    _classCallCheck(this, Widget);

    this.initImgButton();
  }

  _createClass(Widget, [{
    key: "initImgButton",
    value: function initImgButton() {
      $.widget('namenote.imgButton', {
        options: {
          float: 'left',
          width: '24px',
          height: '24px',
          locked: false,
          disabled: false
        },
        _create: function _create() {
          this.element.addClass('img-button');
          this.element.css('background-image', "url(".concat(this.options.src, ")"));
          this.element.css('float', this.options.float);
          this.element.css('width', this.options.width);
          this.element.css('height', this.options.height);
          this.locked(this.options.locked);
          this.disabled(this.options.disabled);

          if (this.options.content) {
            this.element[0].appendChild(this.options.content);
            var content = this.options.content;
            content.title = "";

            if (this.options.float == 'right') {
              content.style.right = "0";
            }
          }

          var click = this.options.click;
          if (click) this.element.on('click', click);
        },
        locked: function locked(value) {
          if (value === undefined) return this.options.locked;
          this.options.locked = value;

          if (value) {
            this.element.addClass('locked');
          } else {
            this.element.removeClass('locked');
          }
        },
        disabled: function disabled(value) {
          if (value === undefined) return this.options.disabled;
          this.options.disabled = value;

          if (value) {
            this.element.addClass('off');
          } else {
            this.element.removeClass('off');
          }
        }
      });
    }
  }]);

  return Widget;
}();

var widget = new Widget();
exports.widget = widget;

},{}],31:[function(require,module,exports){
'use strict';

var _ja;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dictionary = {
  "ja": (_ja = {
    "Namenote": "Namenote",
    "About Namenote": "Namenote について",
    "About Namenote ...": "Namenote について ...",
    "Help": "ヘルプ",
    "Settings": "環境設定",
    "Settings ...": "環境設定 ...",
    "Tablet Settings": "筆圧調整",
    "Tablet Settings ...": "筆圧調整 ...",
    "Quit Namenote": "Namenote を終了",
    "Note": "ノート",
    "File": "ファイル",
    "Open ...": "開く ...",
    "Open": "ノートを開く",
    "New ...": "新規 ...",
    "New": "新規ノート",
    "Close": "閉じる",
    "Close All": "すべてを閉じる",
    "Note Settings ...": "ノート設定 ...",
    "Export": "書き出し",
    "Import": "読み込み",
    ".csnf (CLIP STUDIO Storyboard) ...": ".csnf (CLIP STUDIO ネームファイル) ...",
    ".pdf (PDF) ...": ".pdf (PDF) ...",
    ".txt (Plain Text) ...": ".txt (テキストファイル) ...",
    "Save": "保存",
    "Save As ...": "名前をつけて保存 ...",
    "Save As": "名前をつけて保存",
    "Save Snapshot As ...": "スナップショットを保存 ...",
    "Edit": "編集",
    "Undo": "取り消し",
    "Redo": "やり直し",
    "Cut": "切り取り",
    "Copy": "コピー",
    "Paste": "貼り付け",
    "Select All": "すべてを選択",
    "Page": "ページ",
    "Add": "追加",
    "Move to Buffer": "バッファに入れる",
    "Put Back from Buffer": "バッファから戻す",
    "Empty Buffer": "バッファを空にする",
    "Duplicate": "複製を追加",
    "Move Forward": "前に移動",
    "Move Backward": "後ろに移動",
    "Flip": "左右反転して表示",
    "Save Image As ...": "イメージを保存 ...",
    "Save Image": "イメージを保存",
    "Untitled": "名称未設定",
    "View": "表示",
    "Tool Bar": "ツールバー",
    "Side Bar": "サイドバー",
    "Developer Tools": "デベロッパー ツール",
    "Full Screen": "フルスクリーン",
    "Page Margin": "余白",
    "Number of Pages per Row": "1行あたりのページ数",
    "Window": "ウィンドウ",
    "Extract Text": "テキストを抽出",
    "Open Recent": "最近使用したノートを開く",
    "Clear Recent Note List": "最近使用したノートのリストを消去"
  }, _defineProperty(_ja, "Untitled", "名称未設定"), _defineProperty(_ja, "Making CSNF ...", "CSNFファイルを作成中 ..."), _defineProperty(_ja, "Online Storage", "オンラインストレージ"), _defineProperty(_ja, "S", "小"), _defineProperty(_ja, "M", "中"), _defineProperty(_ja, "L", "大"), _defineProperty(_ja, "Pressure", "筆圧"), _defineProperty(_ja, "Vertical", "縦書き"), _defineProperty(_ja, "Horizontal", "横書き"), _defineProperty(_ja, "New notebook", "新規ノート"), _defineProperty(_ja, "Notebook name", "ノート名"), _defineProperty(_ja, "Folder", "保存先"), _defineProperty(_ja, "Choose folder...", "参照..."), _defineProperty(_ja, "Number of pages", "ページ数"), _defineProperty(_ja, "Template", "テンプレート"), _defineProperty(_ja, "Manga", "漫画"), _defineProperty(_ja, "Binding point", "綴じる位置"), _defineProperty(_ja, "Left binding", "左綴じ　"), _defineProperty(_ja, "Right binding", "右綴じ　"), _defineProperty(_ja, "Start page", "開始ページ"), _defineProperty(_ja, "From left", "左ページ"), _defineProperty(_ja, "From right", "右ページ"), _defineProperty(_ja, "Pages", "ページ"), _defineProperty(_ja, "All", "すべて"), _defineProperty(_ja, "Current page", "選択されたページ"), _defineProperty(_ja, "Range", "範囲指定"), _defineProperty(_ja, "Scale", "拡大/縮小"), _defineProperty(_ja, "Custom", "カスタム"), _defineProperty(_ja, "Text color", "テキストの色"), _defineProperty(_ja, "100%", "B5商業誌用(B4サイズ原稿用紙/A4仕上がり)"), _defineProperty(_ja, "82%", "A5同人誌用(A4サイズ原稿用紙/B5仕上がり)"), _defineProperty(_ja, "Name changer compatible", "ストーリーエディタ用ネームチェンジャー互換"), _defineProperty(_ja, "Export CLIP STUDIO Storyboard", "CLIP STUDIO ネーム書き出し"), _defineProperty(_ja, "Export PDF", "PDF書き出し"), _defineProperty(_ja, "Import Plain Text", "テキスト読み込み"), _defineProperty(_ja, "Reset Settings to Default", "初期設定に戻す"), _defineProperty(_ja, "File name", "ファイル名"), _defineProperty(_ja, "Duplicate note name.", "同じ名前のノートがあります。"), _defineProperty(_ja, "Duplicate file name.", "同じ名前のファイルがあります。"), _defineProperty(_ja, "File not found.", "ファイルが見つかりません。"), _defineProperty(_ja, "Save error.", "セーブできません。"), _defineProperty(_ja, "Select file to import", "読み込むファイルを選択してください"), _defineProperty(_ja, "Compressing", "圧縮中"), _defineProperty(_ja, "Rendering", "作成中"), _defineProperty(_ja, "Format", "フォーマット"), _defineProperty(_ja, "Line separator", "改行"), _defineProperty(_ja, "Balloon separator", "改セリフ"), _defineProperty(_ja, "Page separator", "改ページ"), _defineProperty(_ja, "Comment key", "コメント"), _defineProperty(_ja, "Choose file...", "ファイルを選択..."), _defineProperty(_ja, "Trial", "試用版"), _defineProperty(_ja, "Welcome to the trial version of Namenote.\nYou have ", "あと"), _defineProperty(_ja, " day(s) left.", "日ぐらい試用できます。\nありがとうございます！"), _defineProperty(_ja, "We're sorry, but your trial period has expired.", "試用期間終了しました。\nありがとうございました！"), _defineProperty(_ja, "Zoom small texts on input", "小さいテキストを編集するときは拡大表示する"), _defineProperty(_ja, "Use Quickline", "長押しで直線ツールに切り替える"), _defineProperty(_ja, "Disable wintab driver", "Wintabドライバを使わない"), _defineProperty(_ja, "Disable mouse wheel scroll", "マウスホイールでスクロールしない"), _defineProperty(_ja, "Click OK to restore default settings.", "デフォルトの設定に戻します"), _defineProperty(_ja, "Pen pressure", "筆圧"), _defineProperty(_ja, "Output", "出力"), _defineProperty(_ja, "Enable Japanese Options", "日本語用のオプションを有効にする"), _ja)
};
exports.dictionary = dictionary;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9hcHAuZXM2IiwiZXM2L2NvbW1hbmQuZXM2IiwiZXM2L2NvbmZpZy1kZWZhdWx0LmVzNiIsImVzNi9jb25maWcuZXM2IiwiZXM2L2Rlc2t0b3AuZXM2IiwiZXM2L2RpYWxvZy5lczYiLCJlczYvaGlzdG9yeS1idXR0b24uZXM2IiwiZXM2L2h0bWwtZHJvcGRvd24uZXM2IiwiZXM2L2h0bWwtbWVudS5lczYiLCJlczYvbG9jYWxlLmVzNiIsImVzNi9tYWluLXZpZXcuZXM2IiwiZXM2L21lbnUtYnV0dG9uLmVzNiIsImVzNi9tZW51LXRlbXBsYXRlLmVzNiIsImVzNi9tZW51LmVzNiIsImVzNi9uYW1lbm90ZS5lczYiLCJlczYvcGFnZS12aWV3LmVzNiIsImVzNi9wYWdlLmVzNiIsImVzNi9wcm9qZWN0LW1hbmFnZXIuZXM2IiwiZXM2L3Byb2plY3QuZXM2IiwiZXM2L3JlY2VudC11cmwuZXM2IiwiZXM2L3NjYWxlLWJ1dHRvbi5lczYiLCJlczYvc2hvcnRjdXQtZGVmYXVsdC5lczYiLCJlczYvc2hvcnRjdXQuZXM2IiwiZXM2L3NpZGUtYmFyLmVzNiIsImVzNi90ZXh0LXZpZXcuZXM2IiwiZXM2L3Rvb2wtYmFyLmVzNiIsImVzNi90b29sLWJ1dHRvbi5lczYiLCJlczYvdWkuZXM2IiwiZXM2L3dpZGdldC5lczYiLCJqcy9saWIvZGljdGlvbmFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRU0sVzs7O0FBQ0oseUJBQWM7QUFBQTs7QUFDWixTQUFLLEVBQUwsR0FBVSxjQUFWO0FBQ0EsU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNEOzs7O3lCQUVJLE8sRUFBUztBQUNaLE1BQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixNQUFuQixDQUEwQjtBQUN4QixR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QTBHRSx1QkExR0YsRUEwRzJCLG1CQTFHM0Isd0JBMkdFLGFBM0dGLEVBMkdpQixLQTNHakIsd0JBNEdFLFdBNUdGLEVBNEdlLEtBNUdmLHdCQThHRSxRQTlHRixFQThHWSxRQTlHWix3QkErR0UsZ0JBL0dGLEVBK0dvQixJQS9HcEIsd0JBZ0hFLG1CQWhIRixFQWdIdUIsTUFoSHZCLHdCQWlIRSxnQkFqSEYsRUFpSG9CLE1BakhwQix3QkFrSEUsYUFsSEYsRUFrSGlCLE1BbEhqQix3QkFtSEUsZ0JBbkhGLEVBbUhvQixZQW5IcEIsd0JBcUhFLE9BckhGLEVBcUhXLEtBckhYLHdCQXNIRSxzREF0SEYsRUFzSDBELElBdEgxRCx3QkF1SEUsZUF2SEYsRUF1SG1CLDBCQXZIbkIsd0JBd0hFLGlEQXhIRixFQXdIcUQsMkJBeEhyRCx3QkEwSEUsMkJBMUhGLEVBMEgrQix1QkExSC9CLHdCQTJIRSxlQTNIRixFQTJIb0IsaUJBM0hwQix3QkE0SEUsdUJBNUhGLEVBNEgyQixpQkE1SDNCLHdCQTZIRSw0QkE3SEYsRUE2SGdDLGtCQTdIaEMsd0JBOEhFLHVDQTlIRixFQThIMkMsZUE5SDNDLHdCQStIRSxjQS9IRixFQStIa0IsSUEvSGxCLHdCQWdJRSxRQWhJRixFQWdJWSxJQWhJWix3QkFrSUUseUJBbElGLEVBa0k2QixrQkFsSTdCO0FBRGlCLENBQW5CO0FBdUlBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFVBQXJCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBsb2NhbGUgfSBmcm9tICcuL2xvY2FsZS5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5cbmNsYXNzIEFib3V0RGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZCA9ICdhYm91dC1kaWFsb2cnXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCh2ZXJzaW9uKSB7XG4gICAgJCgnI2Fib3V0LWRpYWxvZycpLmRpYWxvZyh7XG4gICAgICBhdXRvT3BlbjogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiB7IG15OidjZW50ZXIgYm90dG9tJywgYXQ6J2NlbnRlciBjZW50ZXInIH0sXG4gICAgICB0aXRsZTogVCgnQWJvdXQgTmFtZW5vdGUnKSxcbiAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgd2lkdGg6IDYwMCxcbiAgICAgIGJ1dHRvbnM6IHsgT2s6IHRoaXMub2sgfSxcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RyaW5nID0gbG9jYWxlLnRyYW5zbGF0ZUhUTUwoYFxuICAgIDxjZW50ZXI+XG4gICAgICA8aW1nIHNyYz0nLi9pbWcvbmFtZW5vdGUxMDI0LnBuZycgd2lkdGg9XCIxMDBweFwiIC8+XG4gICAgICA8YnI+XG4gICAgICBOYW1lbm90ZSB2JHtuYW1lbm90ZS52ZXJzaW9ufVxuICAgICAgPGJyPjxicj5cbiAgICAgIDxzbWFsbD5Db3B5cmlnaHQgKGMpIEZ1bmlnZTwvc21hbGw+PC9jZW50ZXI+YFxuICAgIClcbiAgICBcbiAgICAkKCcjYWJvdXQtZGlhbG9nJykuaHRtbChzdHJpbmcpXG4gIH1cblxuICBvaygpIHtcbiAgICBkaWFsb2cuY2xvc2UoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGFib3V0RGlhbG9nID0gbmV3IEFib3V0RGlhbG9nKClcblxuZXhwb3J0IHsgYWJvdXREaWFsb2cgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHsgaXBjUmVuZGVyZXIgfSA9IHdpbmRvdy5yZXF1aXJlKCdlbGVjdHJvbicpXG5jb25zdCBmcyA9IHdpbmRvdy5yZXF1aXJlKCdmcy1leHRyYScpXG5jb25zdCBwYXRoID0gd2luZG93LnJlcXVpcmUoJ3BhdGgnKVxuXG4vL2NvbnN0IHsgYXBwLCBkaWFsb2cgfSA9IHdpbmRvdy5yZXF1aXJlKCdlbGVjdHJvbicpLnJlbW90ZVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEFwcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaG9nZSA9ICdob2dlJ1xuICB9XG5cbiAgcmVidWlsZE1lbnUoZGF0YSkge1xuICAgIGlwY1JlbmRlcmVyLnNlbmQoJ3JlYnVpbGQtbWVudScsIEpTT04uc3RyaW5naWZ5KGRhdGEpKVxuICB9XG4gIFxuICBydW5NYWluKG1lc3NhZ2UsIGRhdGEpIHtcbiAgICBpcGNSZW5kZXJlci5zZW5kKG1lc3NhZ2UsIGRhdGEpXG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpXG5cbmV4cG9ydCB7IGFwcCB9XG5cblxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuaW1wb3J0IHsgYWJvdXREaWFsb2cgfSBmcm9tICcuL2Fib3V0LWRpYWxvZy5lczYnXG5pbXBvcnQgeyBzaWRlQmFyIH0gZnJvbSAnLi9zaWRlLWJhci5lczYnXG5pbXBvcnQgeyB0b29sQnV0dG9uIH0gZnJvbSAnLi90b29sLWJ1dHRvbi5lczYnXG5cbmNvbnN0IF9ydW5NYWluID0gKG1lc3NhZ2UsIGRhdGEpID0+IHtcbiAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgIGxvZygncnVuTWFpbicsIG1lc3NhZ2UsIGRhdGEpXG4gICAgbmFtZW5vdGUuYXBwLnJ1bk1haW4obWVzc2FnZSwgZGF0YSlcblxuICB9IGVsc2Uge1xuICAgIGxvZyhgJHttZXNzYWdlfTogY2FuXFxgdCBleGVjdXRlIHRoaXMgY29tbWFuZCBvbiBicm93c2VyLmApXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICB1bmRvKCkge1xuICAgIGxvZygndW5kbycpXG4gIH1cblxuICByZWRvKCkge1xuICAgIGxvZygncmVkbycpXG4gIH1cblxuICBhYm91dCgpIHtcbiAgICBkaWFsb2cub3BlbihhYm91dERpYWxvZylcbiAgfVxuXG4gIHBlbihlKSB7XG4gICAgbG9nKCdwZW4nKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCdwZW4nKVxuICB9XG5cbiAgZXJhc2VyKGUpIHtcbiAgICBsb2coJ2VyYXNlcicpXG4gICAgdG9vbEJ1dHRvbi5zZWxlY3QoJ2VyYXNlcicpXG4gIH1cblxuICB0ZXh0KGUpIHtcbiAgICBsb2coJ3RleHQnKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCd0ZXh0JylcbiAgfVxuXG4gIHNpZGVCYXIoKSB7XG4gICAgbG9nKCdzaWRlQmFyJylcbiAgICBzaWRlQmFyLnRvZ2dsZSgpXG4gIH1cblxuICB0b2dnbGVFZGl0TW9kZSgpIHt9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy9cbiAgXG4gIGRvKGl0ZW0sIGRhdGEpIHtcbiAgICBpZiAodGhpc1tpdGVtXSkge1xuICAgICAgdGhpc1tpdGVtXShkYXRhKVxuICAgIH1cbiAgfVxuICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgZGV2ZWxvcGVyVG9vbHMoKSB7XG4gICAgX3J1bk1haW4oJ2RldmVsb3BlclRvb2xzJylcbiAgfVxuICBcbiAgZnVsbFNjcmVlbigpIHtcbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBfcnVuTWFpbignZnVsbFNjcmVlbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfVxuICB9XG4gIFxuICBxdWl0KCkge1xuICAgIF9ydW5NYWluKCdxdWl0JylcbiAgfVxufVxuXG5jb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmQoKVxuXG5leHBvcnQgeyBjb21tYW5kIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjb25maWdEZWZhdWx0ID0ge1xuICB0b29sQmFyOiB0cnVlLFxuICBzaWRlQmFyOiBmYWxzZSxcbiAgc2lkZUJhcldpZHRoOiAyMDAsXG4gIHNpZGVCYXJQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgXG4gIGRlZmF1bHRQYXRoOiBudWxsLFxuICBkZWZhdWx0TmFtZTogbnVsbCxcbiAgZGVmYXVsdEF1dGhvcjogbnVsbCxcbn1cblxuXG5leHBvcnQgeyBjb25maWdEZWZhdWx0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWdEZWZhdWx0IH0gZnJvbSAnLi9jb25maWctZGVmYXVsdC5lczYnXG5cbmNsYXNzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YSA9IFtdXG4gIH1cblxuICBsb2FkKCkge1xuICAgIGNvbnN0IGpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZW5vdGUvY29uZmlnJylcbiAgICB0aGlzLmRhdGEgPSAoanNvbikgPyBKU09OLnBhcnNlKGpzb24pIDogJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZ0RlZmF1bHQpXG4gIH1cblxuICBzYXZlKCkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWVub3RlL2NvbmZpZycsIGpzb24pXG4gIH1cblxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnRGVmYXVsdClcbiAgICB0aGlzLnNhdmUoKVxuICB9XG5cbiAgZ2V0VmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAodGhpcy5kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldXG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBjb25maWcgPSBuZXcgQ29uZmlnKClcblxuZXhwb3J0IHsgY29uZmlnIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuaW1wb3J0IHsgYXBwIH0gZnJvbSAnLi9hcHAuZXM2J1xuXG5cbndpbmRvdy5uYW1lbm90ZSA9IG5hbWVub3RlXG5cbndpbmRvdy5UID0gbG9jYWxlLnRyYW5zbGF0ZVxud2luZG93LmxvZyA9IGNvbnNvbGUubG9nLmJpbmQod2luZG93LmNvbnNvbGUpXG53aW5kb3cud2FybiA9IGNvbnNvbGUud2Fybi5iaW5kKHdpbmRvdy5jb25zb2xlKVxud2luZG93LmVycm9yID0gY29uc29sZS5lcnJvci5iaW5kKHdpbmRvdy5jb25zb2xlKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xuICBuYW1lbm90ZS5hcHAgPSBhcHBcbiAgbmFtZW5vdGUuaW5pdCgpXG59KVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIERpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cbiAgXG4gIGlzT3BlbigpIHtcbiAgICBmb3IgKGNvbnN0IHdpZGdldCBvZiAkKCcudWktZGlhbG9nLWNvbnRlbnQnKSkge1xuICAgICAgaWYgKCQod2lkZ2V0KS5kaWFsb2coJ2lzT3BlbicpKSB7XG5cdHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIFxuICBvcGVuKHdpZGdldCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHRoaXMuY2xvc2UoKVxuICAgIHRoaXMuY3VycmVudCA9IHdpZGdldFxuICAgIFxuICAgIGlmICghd2lkZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZWxlbWVudC5pZCA9IHdpZGdldC5pZFxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZGlhbG9nJ1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAkKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICAgIHdpZGdldC5lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cbiAgICB3aWRnZXQuaW5pdCgpXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBjb25zdCB3aWRnZXQgPSB0aGlzLmN1cnJlbnRcbiAgICBjb25zdCBlbGVtZW50ID0gd2lkZ2V0LmVsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgJCgnIycgKyB3aWRnZXQuaWQpLmRpYWxvZygnY2xvc2UnKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgfVxuICAgIHdpZGdldC5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxufVxuXG5jb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKClcblxuZXhwb3J0IHsgZGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5sZXQgdW5kb0J1dHRvblxubGV0IHJlZG9CdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIaXN0b3J5QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHVuZG9CdXR0b24gPSAkKCcjdW5kby1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3VuZG8tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb21tYW5kLnVuZG8oKVxuICAgICAgfVxuICAgIH0pWzBdXG5cbiAgICByZWRvQnV0dG9uID0gJCgnI3JlZG8tYnV0dG9uJykuaW1nQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9yZWRvLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29tbWFuZC5yZWRvKClcbiAgICAgIH1cbiAgICB9KVswXVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5jdXJyZW50XG4gICAgXG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIGNvbnN0IGhhc1VuZG8gPSAocHJvamVjdCkgPyBwcm9qZWN0Lmhpc3RvcnkuaGFzVW5kbygpIDogZmFsc2VcbiAgICAgIGNvbnN0IGhhc1JlZG8gPSAocHJvamVjdCkgPyBwcm9qZWN0Lmhpc3RvcnkuaGFzUmVkbygpIDogZmFsc2VcbiAgICAgICQodW5kb0J1dHRvbikuaW1nQnV0dG9uKCdkaXNhYmxlZCcsICFoYXNVbmRvKVxuICAgICAgJChyZWRvQnV0dG9uKS5pbWdCdXR0b24oJ2Rpc2FibGVkJywgIWhhc1JlZG8pXG5cbi8vICAgIE1lbnUudXBkYXRlSGlzdG9yeSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhpc3RvcnlCdXR0b24gPSBuZXcgSGlzdG9yeUJ1dHRvbigpXG5cbmV4cG9ydCB7IGhpc3RvcnlCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSFRNTERyb3Bkb3duIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG5cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgbG9nKCdvcGVuJywgZWxlbWVudClcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIH1cblxuICBjbG9zZShlbGVtZW50KSB7XG4gICAgbG9nKCdjbG9zZScpXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgXG4gIG1ha2UodGVtcGxhdGUsIGlkKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tY29udGVudCdcbiAgICBjb250ZW50LmlkID0gaWQgKyAnLWRyb3Bkb3duJ1xuICAgIFxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFske2lkfV1gXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxufVxuXG5jb25zdCBodG1sRHJvcGRvd24gPSBuZXcgSFRNTERyb3Bkb3duKClcblxuZXhwb3J0IHsgaHRtbERyb3Bkb3duIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSBhcyBuYXRpdmVNZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxubGV0IGJ1dHRvbnMgPSB7fVxubGV0IHRpbWVycyA9IHt9XG5sZXQgYmx1ckRlbGF5ID0gNTAwXG5cbmNvbnN0IGFkZEl0ZW1zID0gKG5vZGUsIGl0ZW1zKSA9PiB7XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGlmIChpdGVtLmxhYmVsKSB7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gYXBwZW5kS2V5KFQoaXRlbS5sYWJlbCksIGl0ZW0uYWNjZWxlcmF0b3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSAnLSdcbiAgICB9XG4gICAgbGkuYXBwZW5kQ2hpbGQoYXBwZW5kQXR0cmlidXRlKGRpdiwgaXRlbS5sYWJlbCwgaXRlbS5jbGljaykpXG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgYWRkSXRlbXMobGksIGl0ZW0uc3VibWVudSkgXG4gICAgfVxuXG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh1bClcbiAgfVxufVxuXG5jb25zdCBhcHBlbmRBdHRyaWJ1dGUgPSAoZGl2LCBkYXRhLCBjbGljaykgPT4ge1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBwLmlubmVySFRNTCA9IGRhdGFcbiAgICBwLnRpdGxlID0gY2xpY2sgfHwgJydcbiAgICBwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBkaXYuYXBwZW5kQ2hpbGQocClcbiAgfVxuICByZXR1cm4gZGl2XG59XG5cbmNvbnN0IGFwcGVuZEtleSA9IChzdHJpbmcsIGtleSwgY2hlY2spID0+IHtcbiAgY2hlY2sgPSAoY2hlY2spID8gJyYjeDI3MTQ7JyA6ICcnXG4gIGtleSA9IGNvbnZlcnRLZXkoa2V5KSB8fCAnJm5ic3A7JyBcblxuICBjb25zdCByZXN1bHQgPSBgXG4gICAgPGRpdiBjbGFzcz0nY2hlY2snPiR7Y2hlY2t9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz0nbGFiZWwnPiR7c3RyaW5nfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9J2tleSc+JHtrZXl9PC9kaXY+YFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGNvbnZlcnRLZXkgPSAoa2V5KSA9PiB7XG4gIGlmIChrZXkpIHtcbiAgICBpZiAoIW5hbWVub3RlLmlzTWFjKCkpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignQ29tbWFuZCtDdHJsK0YnKSA+PSAwKSByZXR1cm4gJydcbiAgICAgIFxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwsLywgJ1NoaWZ0K0NvbW1hJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLi8sICdTaGlmdCtQZXJpb2QnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NtZE9yQ3RybFxcKy8sICdDdHJsKycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0FsdFxcKy8sICdDdHJsK0FsdCsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJz8/PysnKVxuICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKClcblxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXCwvLCAnPCcpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXC4vLCAnPicpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ21kT3JDdHJsXFwrLywgJyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtBbHRcXCsvLCAnJiM4OTk3OyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJyYjODk2MzsmIzg5ODQ7JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcKy8sICcmIzg2Nzk7JylcbiAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIVE1MTWVudSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBcbiAgbWFrZSh0ZW1wbGF0ZSwgaWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1jb250ZW50J1xuICAgIGNvbnRlbnQuaWQgPSBpZCArICctZHJvcGRvd24nXG5cbiAgICBhZGRJdGVtcyhjb250ZW50LCB0ZW1wbGF0ZSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoY29udGVudC5jaGlsZE5vZGVzWzBdLCBpZClcbiAgICB9LCAxKVxuICAgXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxuXG4gIGFjdGl2YXRlKG1lbnUsIGlkKSB7XG4gICAgbWVudS5pZCA9IGlkICsgJy1tZW51J1xuICAgIGJ1dHRvbnNbaWRdID0gJCgnIycgKyBpZCArICctbWVudS1idXR0b24nKVxuICAgIHRpbWVyc1tpZF0gPSBudWxsXG5cbiAgICAkKG1lbnUpLm1lbnUoe1xuICAgICAgc2VsZWN0OiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0KGV2ZW50LCB1aSkpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKG1lbnUsIGlkKVxuICAgICAgICAgIGJ1dHRvbnNbaWRdLmltZ0J1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVxuXG4gICAgJChtZW51KS5vbignbWVudWZvY3VzJywgKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyc1tpZF0pXG4gICAgfSlcbiAgICBcbiAgICAkKG1lbnUpLm9uKCdtZW51Ymx1cicsICgpID0+IHtcbiAgICAgIGlmICghYnV0dG9uc1tpZF0uaW1nQnV0dG9uKCdsb2NrZWQnKSkgcmV0dXJuXG4gICAgICB0aW1lcnNbaWRdID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UobWVudSwgaWQpXG4gICAgICB9LCBibHVyRGVsYXkpXG4gICAgfSlcbiAgfVxuXG4gIGNvbGxhcHNlKG1lbnUsIGlkKSB7XG4gICAgJChtZW51KS5tZW51KCdjb2xsYXBzZUFsbCcsIG51bGwsIHRydWUpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKG1lbnUucGFyZW50Tm9kZSlcbiAgICAgIGJ1dHRvbnNbaWRdLmltZ0J1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgfSwgNTAwKVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG5cbiAgdXBkYXRlKGVsZW1lbnQpIHtcbiAgICBjb25zdCBtZW51ID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdXG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkLnJlcGxhY2UoLy0uKiQvLCAnJylcbiAgICB3YXJuKCdbaHRtbCBtZW51IHVwZGF0ZV0nLCBpZClcblxuICAgIGlmIChpZCA9PSAnZmlsZScpIHtcbiAgICAgIHRoaXMudXBkYXRlUmVjZW50cyhtZW51KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyhtZW51KVxuICAgICQobWVudSkubWVudSgncmVmcmVzaCcpXG4gIH1cblxuICB1cGRhdGVSZWNlbnRzKG1lbnUpIHtcbiAgICB3aGlsZSAobWVudS5jaGlsZE5vZGVzLmxlbmd0aCA+IDMpIHtcbiAgICAgIG1lbnUucmVtb3ZlQ2hpbGQobWVudS5jaGlsZE5vZGVzW21lbnUuY2hpbGROb2Rlcy5sZW5ndGggLSAxXSlcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBpdGVtXG4gICAgICBsaS5hcHBlbmRDaGlsZChhcHBlbmRBdHRyaWJ1dGUoZGl2LCBpdGVtLCAnb3BlblVSTCcpKVxuICAgICAgZGYuYXBwZW5kQ2hpbGQobGkpXG4gICAgfVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQoZGYpXG4gIH1cblxuICB1cGRhdGVTdGF0ZXMobWVudSkge1xuICAgIGNvbnN0IGl0ZW1zID0gJChtZW51KS5maW5kKCdsaScpXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBjb25zdCBuYW1lID0gJChpdGVtKS5maW5kKCdwJylcbiAgICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBuYW1lWzBdLmlubmVySFRNTFxuICAgICAgICBjb25zdCBzdGF0ZSA9IG5hdGl2ZU1lbnUuZ2V0U3RhdGUobGFiZWwpXG4gICAgICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXN0YXRlLWRpc2FibGVkJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd1aS1zdGF0ZS1kaXNhYmxlZCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBzZWxlY3QoZXZlbnQsIHVpKSB7XG4gICAgY29uc3QgcCA9IHVpLml0ZW1bMF0gJiYgdWkuaXRlbVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpWzBdXG4gICAgaWYgKHApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBwLmlubmVySFRNTFxuICAgICAgY29uc3QgY2xpY2sgPSBwLnRpdGxlXG5cbiAgICAgIGlmIChjbGljaykge1xuICAgICAgICBlcnJvcihgJHtjbGlja31gLCBgJHtkYXRhfWApXG4gICAgICAgIGNvbW1hbmQuZG8oYCR7Y2xpY2t9YCwgYCR7ZGF0YX1gKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBodG1sTWVudSA9IG5ldyBIVE1MTWVudSgpXG5cbmV4cG9ydCB7IGh0bWxNZW51IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIExvY2FsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGRpY3Rpb25hcnkgPSByZXF1aXJlKCcuLi9qcy9saWIvZGljdGlvbmFyeS5qcycpLmRpY3Rpb25hcnlcbiAgICBcbiAgICBmb3IgKGxldCBrZXkgaW4gZGljdGlvbmFyeSkge1xuICAgICAgaWYgKG5hdmlnYXRvci5sYW5ndWFnZS5pbmRleE9mKGtleSkgPT0gMCAmJiBkaWN0aW9uYXJ5W2tleV0pIHtcbiAgICAgICAgY29uc3QgZGljdCA9IGRpY3Rpb25hcnlba2V5XVxuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IChzdHJpbmcpID0+IHtcbiAgICAgICAgICByZXR1cm4gZGljdFtzdHJpbmddIHx8IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJhbnNsYXRlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmdcbiAgfVxuICBcbiAgdHJhbnNsYXRlSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvVFxcKCguKj8pXFwpL2csIChhbGwsIG1hdGNoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUobWF0Y2gpXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBsb2NhbGUgPSBuZXcgTG9jYWxlKClcblxuZXhwb3J0IHsgbG9jYWxlIH1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcblxuLy8gJCgnLm1haW4tdmlldycpWzBdLnBhcmVudE5vZGUuc2Nyb2xsVG9wID0gLi4uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWFpblZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjYWxlID0gMVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxufVxuXG5jb25zdCBtYWluVmlldyA9IG5ldyBNYWluVmlldygpXG5cbmV4cG9ydCB7IG1haW5WaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgaHRtbE1lbnUgfSBmcm9tICcuL2h0bWwtbWVudS5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuaW1wb3J0IHsgZmlsZU1lbnVUZW1wbGF0ZSwgb3RoZXJNZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuXG5sZXQgZmlsZUJ1dHRvblxubGV0IG90aGVyQnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWVudUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdXG4gIH1cblxuICBpbml0KCkge1xuICAgIGZpbGVCdXR0b24gPSAkKCcjZmlsZS1tZW51LWJ1dHRvbicpLmltZ0J1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZmlsZS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKGZpbGVNZW51VGVtcGxhdGUsICdmaWxlJylcbiAgICB9KVswXVxuXG4gICAgb3RoZXJCdXR0b24gPSAkKCcjb3RoZXItbWVudS1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL21lbnUtYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IHRoaXMuc2VsZWN0KGUpIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxNZW51Lm1ha2Uob3RoZXJNZW51VGVtcGxhdGUsICdvdGhlcicpXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKGZpbGVCdXR0b24sIG90aGVyQnV0dG9uKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG4gIFxuICBzZWxlY3QoZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignaW1nLWJ1dHRvbicpIDwgMCkgcmV0dXJuXG4gICAgaWYgKCQoZS50YXJnZXQpLmltZ0J1dHRvbignZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcpXG4gICAgICBjb25zdCBkcm9wZG93biA9ICQoYnV0dG9uKS5maW5kKCcuZHJvcGRvd24tY29udGVudCcpWzBdXG5cbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkID09IGUudGFyZ2V0LmlkKSB7XG4gICAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgICAgaHRtbE1lbnUudXBkYXRlKGRyb3Bkb3duKVxuICAgICAgICAgIFxuICAgICAgICAgICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgICAgaHRtbE1lbnUub3Blbihkcm9wZG93bilcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIGh0bWxNZW51LmNsb3NlKGRyb3Bkb3duKVxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgICBodG1sTWVudS5jbG9zZShkcm9wZG93bilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBtZW51QnV0dG9uID0gbmV3IE1lbnVCdXR0b24oKVxuXG5leHBvcnQgeyBtZW51QnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtZW51VGVtcGxhdGUgPSBbXG4gIHsgbGFiZWw6ICdOYW1lbm90ZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0Fib3V0IE5hbWVub3RlIC4uLicsIGNsaWNrOiAnYWJvdXQnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgICAgIHsgbGFiZWw6ICdUYWJsZXQgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICd0YWJsZXRTZXR0aW5ncycgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdRdWl0IE5hbWVub3RlJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1FcIiwgY2xpY2s6ICdxdWl0JyB9LFxuICAgICAgXG4vLyAgICB7IGxhYmVsOiAnU2V0dGluZ3MnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICdSZXNldCBTZXR0aW5ncyB0byBEZWZhdWx0JywgY2xpY2s6ICdyZXNldFNldHRpbmdzJyB9LFxuLy9cdF0sXG4vLyAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6ICdOb3RlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnTmV3IC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtOXCIsIGNsaWNrOiAnb3Blbk5ld0RpYWxvZycgfSxcbiAgICAgIHsgbGFiZWw6ICdPcGVuIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtPXCIsIGNsaWNrOiAnb3BlbicgfSxcbiAgICAgIHsgbGFiZWw6ICdPcGVuIFJlY2VudCcsIHN1Ym1lbnU6IFtdIH0sXG5cbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbi8vICAgIHsgbGFiZWw6ICdDbG9zZScsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtXXCIsIGNsaWNrOiAnY2xvc2UnIH0sXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UgQWxsJywgY2xpY2s6ICdjbG9zZUFsbCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTXCIsIGNsaWNrOiAnc25hcHNob3QnIH0sXG5cdFxuLy8gICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuLy8gICAgeyBsYWJlbDogJ05vdGUgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdub3RlU2V0dGluZ3MnIH0sXG5cbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcblxuLy8gICAgeyBsYWJlbDogJ0ltcG9ydCcsXG4vL1x0c3VibWVudTogW1xuLy9cdCAgeyBsYWJlbDogJy50eHQgKFBsYWluIFRleHQpIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTaGlmdCtJXCIsIGNsaWNrOiAnaW1wb3J0VGV4dERpYWxvZycgfSxcbi8vXHRdLFxuLy8gICAgfSxcbiAgICAgIHsgbGFiZWw6ICdFeHBvcnQnLFxuXHRzdWJtZW51OiBbXG5cdCAgeyBsYWJlbDogJy5jc25mIChDTElQIFNUVURJTyBTdG9yeWJvYXJkKSAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrUFwiLCBjbGljazogJ2V4cG9ydENTTkZEaWFsb2cnIH0sXG5cdCAgeyBsYWJlbDogJy5wZGYgKFBERikgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1NoaWZ0K1BcIiwgY2xpY2s6ICdleHBvcnRQREZEaWFsb2cnIH0sXG5cdF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6IFwiRWRpdFwiLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6IFwiVW5kb1wiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrWlwiLCBzZWxlY3RvcjogXCJ1bmRvOlwiLCBjbGljazogJ3VuZG8nIH0sXG4gICAgICB7IGxhYmVsOiBcIlJlZG9cIiwgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1lcIiwgc2VsZWN0b3I6IFwicmVkbzpcIiwgY2xpY2s6ICdyZWRvJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiBcIkN1dFwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrWFwiLCBzZWxlY3RvcjogXCJjdXQ6XCIgfSxcbiAgICAgIHsgbGFiZWw6IFwiQ29weVwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQ1wiLCBzZWxlY3RvcjogXCJjb3B5OlwiIH0sXG4gICAgICB7IGxhYmVsOiBcIlBhc3RlXCIsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtWXCIsIHNlbGVjdG9yOiBcInBhc3RlOlwiIH0sXG5cbiAgICAgIHsgbGFiZWw6IFwiU2VsZWN0IEFsbFwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQVwiLCBzZWxlY3RvcjogXCJzZWxlY3RBbGw6XCIsIGNsaWNrOiAnc2VsZWN0QWxsJyB9LFxuICAgIF1cbiAgfSxcbiAgeyBsYWJlbDogJ1BhZ2UnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBZGQnLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtpXCIsIGNsaWNrOiAnYXBwZW5kUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEZvcndhcmQnLCBhY2NlbGVyYXRvcjogXCJTaGlmdCsuXCIsIGNsaWNrOiAnbW92ZVBhZ2VGb3J3YXJkJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgQmFja3dhcmQnLCBhY2NlbGVyYXRvcjogXCJTaGlmdCssXCIsIGNsaWNrOiAnbW92ZVBhZ2VCYWNrd2FyZCcgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgdG8gQnVmZmVyJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQra1wiLCBjbGljazogJ2N1dFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtZXCIsIGNsaWNrOiAncGFzdGVQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ0VtcHR5IEJ1ZmZlcicsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0KzBcIiwgY2xpY2s6ICdlbXB0eVBhZ2UnIH0sXG4vLyAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbi8vICAgIHsgbGFiZWw6ICdGbGlwJywgYWNjZWxlcmF0b3I6IFwiSFwiLCBjbGljazogJ2ZsaXBQYWdlJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnRXh0cmFjdCBUZXh0JywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1RcIiwgY2xpY2s6ICdleHRyYWN0VGV4dCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIEltYWdlIEFzIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCstXCIsIGNsaWNrOiAnc2F2ZVBhZ2VJbWFnZScgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnVmlldycsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0Z1bGwgU2NyZWVuJywgYWNjZWxlcmF0b3I6ICdDdHJsK0NvbW1hbmQrRicsIGNsaWNrOiAnZnVsbFNjcmVlbicgfSwgXG4vLyAgICB7IGxhYmVsOiAnVG9vbCBCYXInLCBjbGljazogJ3Rvb2xCYXInIH0sIC8vYWNjZWxlcmF0b3I6IFwiQ29tbWFuZCtBbHQrSFwiLCBcbiAgICAgIHsgbGFiZWw6ICdTaWRlIEJhcicsIGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtBbHQrUycsIGNsaWNrOiAnc2lkZUJhcicgfSwgXG4gICAgICB7IGxhYmVsOiAnRGV2ZWxvcGVyIFRvb2xzJywgYWNjZWxlcmF0b3I6IFwiQ29tbWFuZCtBbHQrSlwiLCBjbGljazogJ2RldmVsb3BlclRvb2xzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1BhZ2UgTWFyZ2luJywgYWNjZWxlcmF0b3I6IFwiUlwiLCBjbGljazogJ3Nob3dNYXJnaW4nIH0sXG4gICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3cnLFxuXHRzdWJtZW51OiBbXG5cdCAgeyBsYWJlbDogJzInLCBjbGljazogJ3JvdzEnIH0sXG5cdCAgeyBsYWJlbDogJzQnLCBjbGljazogJ3JvdzInIH0sXG5cdCAgeyBsYWJlbDogJzYnLCBjbGljazogJ3JvdzMnIH0sXG5cdCAgeyBsYWJlbDogJzgnLCBjbGljazogJ3JvdzQnIH0sXG5cdF0sXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbi8qICBcbiAgeyBsYWJlbDogJ1dpbmRvdycsXG4gICAgc3VibWVudTogW1xuICAgIF0sXG4gIH0sXG4qL1xuXVxuXG5jb25zdCBmaWxlTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmV3IC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtOXCIsIGNsaWNrOiAnb3Blbk5ld0RpYWxvZycgfSxcbiAgeyBsYWJlbDogJ09wZW4gLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK09cIiwgY2xpY2s6ICdvcGVuJyB9LFxuICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5dXG5cbmNvbnN0IG90aGVyTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTm90ZScsXG4gICAgc3VibWVudTogW1xuLy8gICAgeyBsYWJlbDogJ0Nsb3NlJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1dcIiwgY2xpY2s6ICdjbG9zZScgfSxcbi8vICAgIHsgbGFiZWw6ICdDbG9zZSBBbGwnLCBjbGljazogJ2Nsb3NlQWxsJyB9LFxuICAgICAgeyBsYWJlbDogJ1NhdmUgU25hcHNob3QgQXMgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1NcIiwgY2xpY2s6ICdzbmFwc2hvdCcgfSxcblx0XG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrU2hpZnQrSVwiLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1BcIiwgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTaGlmdCtQXCIsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K2lcIiwgY2xpY2s6ICdhcHBlbmRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgRm9yd2FyZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0Ky5cIiwgY2xpY2s6ICdtb3ZlUGFnZUZvcndhcmQnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBCYWNrd2FyZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0KyxcIiwgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtLXCIsIGNsaWNrOiAnY3V0UGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K1lcIiwgY2xpY2s6ICdwYXN0ZVBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnRW1wdHkgQnVmZmVyJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQrMFwiLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ0V4dHJhY3QgVGV4dCcsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtUXCIsIGNsaWNrOiAnZXh0cmFjdFRleHQnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrLVwiLCBjbGljazogJ3NhdmVQYWdlSW1hZ2UnIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1ZpZXcnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdGdWxsIFNjcmVlbicsIGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtDdHJsK0YnLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgYWNjZWxlcmF0b3I6ICdDb21tYW5kK0FsdCtTJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBhY2NlbGVyYXRvcjogXCJDb21tYW5kK0FsdCtKXCIsIGNsaWNrOiAnZGV2ZWxvcGVyVG9vbHMnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUGFnZSBNYXJnaW4nLCBhY2NlbGVyYXRvcjogXCJSXCIsIGNsaWNrOiAnc2hvd01hcmdpbicgfSxcbiAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgUGFnZXMgcGVyIFJvdycsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnMicsIGNsaWNrOiAncm93MScgfSxcblx0ICB7IGxhYmVsOiAnNCcsIGNsaWNrOiAncm93MicgfSxcblx0ICB7IGxhYmVsOiAnNicsIGNsaWNrOiAncm93MycgfSxcblx0ICB7IGxhYmVsOiAnOCcsIGNsaWNrOiAncm93NCcgfSxcblx0XSxcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuLyogIFxuICB7IGxhYmVsOiAnV2luZG93JyxcbiAgICBzdWJtZW51OiBbXG4gICAgXSxcbiAgfSxcbiovXG4gIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnSGVscCcsIGNsaWNrOiAnYWJvdXQnIH0sXG5dXG5cbmV4cG9ydCB7IG1lbnVUZW1wbGF0ZSwgZmlsZU1lbnVUZW1wbGF0ZSwgb3RoZXJNZW51VGVtcGxhdGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBtZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCB0ZW1wbGF0ZVxubGV0IHN0YXRlcyA9IHt9XG5cbmNvbnN0IGZpbmRTdWJtZW51ID0gKHRlbXBsYXRlLCBsYWJlbCkgPT4ge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGVtcGxhdGUpIHtcbiAgICBpZiAoaXRlbS5sYWJlbCA9PSBsYWJlbCkge1xuICAgICAgcmV0dXJuIGl0ZW1cbiAgICB9XG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZFN1Ym1lbnUoaXRlbS5zdWJtZW51LCBsYWJlbClcbiAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3Qgc2V0U3RhdGUgPSAodGVtcGxhdGUsIGxhYmVsLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpdGVtID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsIGxhYmVsKVxuICBpZiAoaXRlbSkge1xuICAgIHZhbHVlID0gKHZhbHVlKSA/IHRydWUgOiBmYWxzZVxuXG4gICAgaXRlbS5lbmFibGVkID0gdmFsdWVcbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBpZiAoIXZhbHVlKSBkZWxldGUoaXRlbS5zdWJtZW51KVxuICAgIH1cbiAgICBzdGF0ZXNbbGFiZWxdID0gdmFsdWVcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRlbXBsYXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZW51VGVtcGxhdGUpKVxuICAgIHN0YXRlcyA9IHt9XG4gICAgd2FybignW25hdGl2ZSBtZW51IHVwZGF0ZV0nKVxuICAgIFxuICAgIHRoaXMudXBkYXRlUmVjZW50cyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnJlYnVpbGQodGVtcGxhdGUpXG4gIH1cblxuICByZWJ1aWxkKHRlbXBsYXRlKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnJlYnVpbGRNZW51KHRlbXBsYXRlKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJlY2VudHModGVtcGxhdGUpIHtcbiAgICBjb25zdCByZWNlbnRzID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsICdPcGVuIFJlY2VudCcpLnN1Ym1lbnVcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIHJlY2VudHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBpdGVtLCBkYXRhOiBpdGVtLCBjbGljazogJ29wZW5VUkwnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGlzQXBwID0gKG5hbWVub3RlLmFwcCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Z1bGwgU2NyZWVuJywgaXNBcHAgfHwgd2luZG93LmNocm9tZSlcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0RldmVsb3BlciBUb29scycsIGlzQXBwKVxuXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBjb25zdCBpc1Byb2plY3QgPSAocHJvamVjdCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Nsb3NlJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQ2xvc2UgQWxsJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLnBkZiAoUERGKSAuLi4nLCBpc1Byb2plY3QpXG4gICAgXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdBZGQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIHRvIEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1B1dCBCYWNrIGZyb20gQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRW1wdHkgQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSBGb3J3YXJkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSBCYWNrd2FyZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0V4dHJhY3QgVGV4dCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1NhdmUgSW1hZ2UgQXMgLi4uJywgaXNQcm9qZWN0KVxuXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdVbmRvJywgaXNQcm9qZWN0KSAvLyAmJiBwcm9qZWN0Lmhpc3RvcnkuaGFzVW5kbygpKVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnUmVkbycsIGlzUHJvamVjdCkgLy8gJiYgcHJvamVjdC5oaXN0b3J5Lmhhc1JlZG8oKSlcbiAgfVxuXG4gIGdldFN0YXRlKGxhYmVsKSB7XG4gICAgcmV0dXJuIHN0YXRlc1tsYWJlbF1cbiAgfVxufVxuXG5jb25zdCBtZW51ID0gbmV3IE1lbnUoKVxuXG5leHBvcnQgeyBtZW51IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyBzaG9ydGN1dCB9IGZyb20gJy4vc2hvcnRjdXQuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyB1aSB9IGZyb20gJy4vdWkuZXM2J1xuXG5pbXBvcnQgeyBtYWluVmlldyB9IGZyb20gJy4vbWFpbi12aWV3LmVzNidcbmltcG9ydCB7IHBhZ2VWaWV3IH0gZnJvbSAnLi9wYWdlLXZpZXcuZXM2J1xuaW1wb3J0IHsgdGV4dFZpZXcgfSBmcm9tICcuL3RleHQtdmlldy5lczYnXG5cbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE5hbWVub3RlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gXCIyLjAuMC1hbHBoYS4xLWRlYnVnXCJcbiAgICB0aGlzLnRyaWFsID0gZmFsc2VcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnXG4gICAgdGhpcy5zaG9ydGN1dCA9IHNob3J0Y3V0XG4gICAgdGhpcy5yZWNlbnRVUkwgPSByZWNlbnRVUkxcbiAgICBcbiAgICB0aGlzLmNvbW1hbmQgPSBjb21tYW5kXG4gICAgdGhpcy51aSA9IHVpXG5cbiAgICB0aGlzLnByb2plY3RNYW5hZ2VyID0gcHJvamVjdE1hbmFnZXJcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uZmlnLmxvYWQoKVxuICAgIHNob3J0Y3V0LmxvYWQoKVxuICAgIHJlY2VudFVSTC5sb2FkKClcbiAgICBcbiAgICB1aS5pbml0KClcblxuICAgIHRoaXMuaW5pdEJhc2VIYW5kbGVycygpXG4gIH1cblxuICBpbml0QmFzZUhhbmRsZXJzKCkge1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2coJ29ucmVzaXplJyxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgbG9nKCdjb250ZXh0bWVudScpXG4gICAgfVxuICB9XG5cbiAgaXNNYWMoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5jb25zdCBuYW1lbm90ZSA9IG5ldyBOYW1lbm90ZSgpXG5cbmV4cG9ydCB7IG5hbWVub3RlIH1cbiAgICBcbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFBhZ2VWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG59XG5cbmNvbnN0IHBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3KClcblxuZXhwb3J0IHsgcGFnZVZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGlkID0gMFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3BhZ2UgZGVzdHJ1Y3RvcicsIHRoaXMucGlkKVxuICB9XG59XG5cbmV4cG9ydCB7IFBhZ2UgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIHNlbGVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gcHJvamVjdFxuICAgIHJlY2VudFVSTC5hZGQocHJvamVjdC51cmwpXG4gIH1cblxuICBmaW5kSW5kZXgocHJvamVjdCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0udXJsID09IHByb2plY3QudXJsKSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMVxuICB9XG4gIFxuICBvcGVuKHVybCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgodXJsKVxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCh1cmwpXG4gICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICAgIHRoaXMuc2VsZWN0KHByb2plY3QpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByb2plY3QpXG4gICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHNbaW5kZXhdXG4gICAgICB0aGlzLnNlbGVjdChwcm9qZWN0KVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0KVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcm9qZWN0TWFuYWdlciA9IG5ldyBQcm9qZWN0TWFuYWdlclxuXG5leHBvcnQgeyBwcm9qZWN0TWFuYWdlciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gICAgdGhpcy5wYWdlcyA9IFtdXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3Byb2plY3QgZGVzdHJ1Y3RvcicsIHRoaXMudXJsKVxuICAgIFxuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2UuZGVzdHJ1Y3RvcigpXG4gICAgfSlcbiAgfVxuXG4gIGZpbmRJbmRleChwYWdlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wYWdlc1tpXS5waWQgPT0gcGFnZS5waWQpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cbn1cblxuZXhwb3J0IHsgUHJvamVjdCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuY29uc3QgbWF4ID0gMTBcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBSZWNlbnRVUkwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL3JlY2VudC11cmwnKVxuICAgIHRoaXMuZGF0YSA9IChqc29uKSA/IEpTT04ucGFyc2UoanNvbikgOiBbXVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJywganNvbilcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbWVudS51cGRhdGUoKVxuICAgIH0sIDUwMClcbiAgfVxuXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cblxuICBhZGQodXJsKSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcigodmFsdWUpID0+IHZhbHVlICE9IHVybClcbiAgICB0aGlzLmRhdGEudW5zaGlmdCh1cmwpXG5cbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IG1heCkge1xuICAgICAgdGhpcy5kYXRhLmxlbmd0aCA9IG1heFxuICAgIH1cbiAgICB0aGlzLnNhdmUoKVxuICB9XG59XG5cbmNvbnN0IHJlY2VudFVSTCA9IG5ldyBSZWNlbnRVUkwoKVxuXG5leHBvcnQgeyByZWNlbnRVUkwgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCBxdWlja1pvb21CdXR0b25cbmxldCB6b29tQnV0dG9uXG5sZXQgdW56b29tQnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2NhbGVCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcXVpY2tab29tQnV0dG9uID0gJCgnI3Jvdy1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL21hZ25pZmllci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC5xdWlja1pvb20oKSB9XG4gICAgfSlbMF1cblxuICAgIHpvb21CdXR0b24gPSAkKCcjem9vbS1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3pvb20tYnV0dG9uLnBuZycsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC56b29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICB1bnpvb21CdXR0b24gPSAkKCcjdW56b29tLWJ1dHRvbicpLmltZ0J1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW56b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQudW56b29tKCkgfVxuICAgIH0pWzBdXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBjb25zdCBxdWlja1pvb20gPSAocHJvamVjdCkgPyBwcm9qZWN0LnZpZXcucXVpY2tab29tIDogZmFsc2VcbiAgICBcbiAgICAkKHF1aWNrWm9vbUJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnLCBxdWlja1pvb20pXG4gICAgJCh6b29tQnV0dG9uKS5pbWdCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG4gICAgJCh1bnpvb21CdXR0b24pLmltZ0J1dHRvbignZGlzYWJsZWQnLCAhcXVpY2tab29tKVxuICB9XG59XG5cbmNvbnN0IHNjYWxlQnV0dG9uID0gbmV3IFNjYWxlQnV0dG9uKClcblxuZXhwb3J0IHsgc2NhbGVCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHNob3J0Y3V0RGVmYXVsdCA9IHtcbiAgdW5kbzogWydjb21tYW5kK3onLCAnY3RybCt6JywgJ251bS8nLCAnLCddLFxuICByZWRvOiBbJ2NvbW1hbmQreScsICdjdHJsK3knLCAnbnVtKicsICcuJ10sXG4gIHpvb206IFsnWycsICdxJywgJ251bXBsdXMnXSxcbiAgdW56b29tOiBbJ10nLCAnYScsICdudW1taW51cyddLFxuICB0b2dnbGVUb29sOiBbJ3gnLCAnbnVtLicsICcvJ10sXG5cbiAgb3Blbk5ld0RpYWxvZzogWydjb21tYW5kK24nLCAnYWx0K24nXSxcbiAgb3BlbjogWydjb21tYW5kK28nLCAnYWx0K28nXSxcbiAgY2xvc2U6IFsnY29tbWFuZCt3JywgJ2FsdCt3J10sXG4gIHF1aXQ6IFsnY29tbWFuZCtxJywgJ2FsdCtxJ10sXG4gIHJlbG9hZDogWydjb21tYW5kK3NoaWZ0K3InXSxcblxuICBleHBvcnRDU05GRGlhbG9nOiBbJ2NvbW1hbmQrcCcsICdhbHQrcCddLFxuICBleHBvcnRQREZEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtwJywgJ2FsdCtzaGlmdCtwJ10sXG4gIGltcG9ydFRleHREaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIHNhdmVQYWdlSW1hZ2U6IFsnY29tbWFuZCstJywgJ2FsdCstJ10sXG4gIGV4dHJhY3RUZXh0OiBbJ2NvbW1hbmQrdCcsICdhbHQrdCddLFxuXG4gIC8vbWFyZ2luU2V0dGluZ3NEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIFxuICBwYWdlTGVmdDogJ2xlZnQnLFxuICBwYWdlUmlnaHQ6ICdyaWdodCcsXG4gIHBhZ2VVcDogJ3VwJywgICAgICBcbiAgcGFnZURvd246ICdkb3duJywgIFxuXG4gIHNlbGVjdEFsbDogJ2N0cmwrYScsXG4gIHVuc2VsZWN0OiAnY3RybCtkJyxcbiAgbWVyZ2VUZXh0OiAnY3RybCtlJyxcbiAgXG4gIHNpZGVCYXI6ICdjb21tYW5kK2FsdCtzJyxcbiAgZGV2ZWxvcGVyVG9vbHM6ICdjb21tYW5kK2FsdCtqJyxcbiAgdG9vbEJhcjogJ2NvbW1hbmQrYWx0K2gnLFxuXG4gIHBlbjogJ3AnLFxuICBlcmFzZXI6ICdlJyxcbiAgdGV4dDogJ3QnLFxuXG4gIC8vXG4gIC8vIFBhZ2Ugc2hvcnRjdXRzXG4gIC8vXG4gIFxuICBpbnNlcnRQYWdlOiAnc2hpZnQraScsXG4gIGR1cGxpY2F0ZVBhZ2U6ICdzaGlmdCtkJyxcblxuICBzaG93TWFyZ2luOiAncicsXG4vL2ZsaXBQYWdlOiAnaCcsXG4gIGFwcGVuZFBhZ2U6ICdzaGlmdCthJyxcbiAgY3V0UGFnZTogJ3NoaWZ0K2snLFxuICBwYXN0ZVBhZ2U6ICdzaGlmdCt5JyxcbiAgZW1wdHlQYWdlOiAnc2hpZnQrMCcsXG4gIG1vdmVQYWdlTGVmdDogJzwnLFxuICBtb3ZlUGFnZVJpZ2h0OiAnPicsXG4gIHJvdzE6ICdzaGlmdCsxJyxcbiAgcm93MjogJ3NoaWZ0KzInLFxuICByb3czOiAnc2hpZnQrMycsXG4gIHJvdzQ6ICdzaGlmdCs0JyxcblxuICAvL1xuICAvLyBUZXh0IHNob3J0Y3V0cyAoY2FuIGJlIHVzZWQgd2hpbGUgdGV4dCBlZGl0aW5nKVxuICAvL1xuICBcbiAgdG9nZ2xlRWRpdE1vZGU6ICdjdHJsK2cnLFxuICBhZGRGb250U2l6ZTogJ2N0cmwrLicsXG4gIHN1YnRyYWN0Rm9udFNpemU6ICdjdHJsKywnLFxuICB0b2dnbGVEaXJlY3Rpb246ICdjdHJsK10nLFxuICBjdXRUZXh0OiAnYmFja3NwYWNlJyxcbiAgbmV4dFRleHQ6ICd0YWInLFxuICBwcmV2VGV4dDogJ3NoaWZ0K3RhYicsXG59XG5cbmV4cG9ydCB7IHNob3J0Y3V0RGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuLy9pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXREZWZhdWx0IH0gZnJvbSAnLi9zaG9ydGN1dC1kZWZhdWx0LmVzNidcbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG4vKlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5lczYnXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmVzNidcbiovXG5cbmltcG9ydCB7IHVpIH0gZnJvbSAnLi91aS5lczYnXG5cbmNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cblxuICAgIE1vdXNldHJhcC5hZGRLZXljb2Rlcyh7XG4gICAgICAxMDc6ICdudW1wbHVzJyxcbiAgICAgIDEwOTogJ251bW1pbnVzJyxcbiAgICAgIDExMDogJ251bS4nLFxuICAgICAgMTExOiAnbnVtLycsXG4gICAgICAxMDY6ICdudW0qJyxcbiAgICB9KVxuXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbihlLCBlbGVtZW50LCBjb21ibykge1xuLypcbiAgICAgIGlmIChUZXh0LmlzRWRpdGFibGUoZWxlbWVudCkpIHtcbiAgICAgICAgbG9nKCdrZXljb2RlPScsIGUua2V5Q29kZSwgZSlcblxuXHRpZiAoZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLm1ldGFLZXkpIHtcblx0ICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXHQgIGNhc2UgNzE6ICAvLyBjdHJsK2dcblx0ICBjYXNlIDE4ODogLy8gY3RybCssXG5cdCAgY2FzZSAxOTA6IC8vIGN0cmwrLlxuXHQgIGNhc2UgMjIxOiAvLyBjdHJsK11cblx0ICAgIHJldHVybiBmYWxzZVxuXHQgIH1cblx0fVxuXG5cdGlmIChlLmtleUNvZGUgPT0gOSkgeyAvLyBUQUJcblx0ICByZXR1cm4gZmFsc2Vcblx0fVxuXHRyZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4qL1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9zaG9ydGN1dCcpXG4gICAgdGhpcy5kYXRhID0ganNvbiA/IEpTT04ucGFyc2UoanNvbikgOiBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dERlZmF1bHQpXG4gICAgdGhpcy5iaW5kKClcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvc2hvcnRjdXQnLCBqc29uKVxuICB9XG4gIFxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc2hvcnRjdXREZWZhdWx0KVxuICAgIHRoaXMuc2F2ZSgpXG5cbiAgICBNb3VzZXRyYXAucmVzZXQoKVxuICAgIHRoaXMuYmluZCgpXG4gIH1cblxuICBiaW5kKCkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5kYXRhKSB7XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmRhdGFbaXRlbV1cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kW2l0ZW1dXG5cbiAgICAgIGlmIChpdGVtID09ICdkZXZlbG9wZXJUb29scycpIGNvbnRpbnVlXG5cbiAgICAgIGlmIChoYW5kbGVyKSB7XG5cdGxvZyhgJyR7aXRlbX1gKVxuICAgICAgICBcblx0TW91c2V0cmFwLmJpbmQoa2V5LCAoZSkgPT4ge1xuXHQgIGNvbW1hbmQucHJldiA9IGNvbW1hbmQuY3VycmVudFxuXHQgIGNvbW1hbmQuY3VycmVudCA9IGl0ZW1cblx0ICBsb2coYCoke2l0ZW19KmApXG4gICAgICAgICAgXG5cdCAgaGFuZGxlcigpXG5cdCAgcmV0dXJuICh1aS5kaWFsb2cuaXNPcGVuKCkpID8gdHJ1ZSA6IGZhbHNlXG5cblx0fSwgJ2tleWRvd24nKVxuXG4gICAgICB9IGVsc2Uge1xuXHRsb2coYCcke2l0ZW19Jzogbm8gc3VjaCBjb21tYW5kYClcbiAgICAgIH1cbiAgICB9XG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgQ29udHJvbGxlci5jbGVhck1vdmUoKVxuLy8gICAgcmV0dXJuIGZhbHNlO1xuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnZW50ZXInLCAoZSkgPT4ge1xuLy8gICAgaWYgKHVpLmRpYWxvZy5pc09wZW4oKSkgcmV0dXJuIHRydWVcbi8vICAgIGNvbW1hbmQucXVpY2tab29tKClcbi8vICAgIHJldHVybiBmYWxzZVxuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgaWYgKCFDb250cm9sbGVyLmlzTW92ZWQoKSkge1xuLy9cdGNvbW1hbmQucXVpY2tab29tKCk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSwgJ2tleXVwJylcbiAgfVxufVxuXG5jb25zdCBzaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCgpXG5cbmV4cG9ydCB7IHNob3J0Y3V0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5cbmxldCBtaW5XaWR0aCA9IDE1MFxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFNpZGVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnLnNwbGl0LXBhbmUnKS5zcGxpdFBhbmUoKVxuICAgICQoJy5zcGxpdC1wYW5lJykub24oJ2RpdmlkZXJkcmFnZW5kJywgKGUpID0+IHsgLy8gb3IgJ3NwbGl0cGFuZXJlc2l6ZSdcbiAgICAgIHRoaXMub25EaXZpZGVyRHJhZ0VuZCgpXG4gICAgfSlcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKClcbiAgfVxuICBcbiAgdXBkYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhciA9IHZhbHVlXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgbGV0IHdpZHRoID0gKHZhbHVlKSA/IGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA6IDBcbiAgICBpZiAoY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uID09ICdyaWdodCcpIHtcbiAgICAgIHdpZHRoID0gJCgnLnNwbGl0LXBhbmUnKS53aWR0aCgpIC0gd2lkdGggKyAxXG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgICAgaWYgKHdpZHRoIDwgbWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGhcbiAgICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG4gICAgfVxuICAgICQoJy5zcGxpdC1wYW5lJykuc3BsaXRQYW5lKCdmaXJzdENvbXBvbmVudFNpemUnLCB3aWR0aClcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZSghY29uZmlnLmRhdGEuc2lkZUJhcilcbiAgfVxuXG4gIHVwZGF0ZVBvc2l0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb25cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb24gPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGNvbnN0IG1haW5WaWV3ID0gJCgnLm1haW4tdmlldycpXG4gICAgY29uc3Qgc2lkZUJhciA9ICQoJy5zaWRlLWJhcicpXG5cbiAgICBpZiAodmFsdWUgPT0gJ2xlZnQnKSB7XG4gICAgICAkKCcjbGVmdC1jb21wb25lbnQnKS5hcHBlbmQoc2lkZUJhcilcbiAgICAgICQoJyNyaWdodC1jb21wb25lbnQnKS5hcHBlbmQobWFpblZpZXcpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JpZ2h0LWNvbXBvbmVudCcpLmFwcGVuZChzaWRlQmFyKVxuICAgICAgJCgnI2xlZnQtY29tcG9uZW50JykuYXBwZW5kKG1haW5WaWV3KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIG9uRGl2aWRlckRyYWdFbmQoKSB7XG4gICAgbGV0IHdpZHRoID0gJCgnLnNpZGUtYmFyJykud2lkdGgoKVxuXG4gICAgY29uc3QgbWF4V2lkdGggPSAkKCcuc3BsaXQtcGFuZScpLndpZHRoKCkgLSBtaW5XaWR0aCAtIDFcbiAgICBpZiAod2lkdGggPCBtaW5XaWR0aCkgd2lkdGggPSBtaW5XaWR0aFxuICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG5cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyV2lkdGggPSBwYXJzZUludCh3aWR0aClcbiAgICBjb25maWcuZGF0YS5zaWRlQmFyID0gdHJ1ZVxuICAgIGNvbmZpZy5zYXZlKClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhciA9IG5ldyBTaWRlQmFyKClcblxuZXhwb3J0IHsgc2lkZUJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUZXh0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxufVxuXG5jb25zdCB0ZXh0VmlldyA9IG5ldyBUZXh0VmlldygpXG5cbmV4cG9ydCB7IHRleHRWaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyBzY2FsZUJ1dHRvbiB9IGZyb20gJy4vc2NhbGUtYnV0dG9uLmVzNidcbmltcG9ydCB7IGhpc3RvcnlCdXR0b24gfSBmcm9tICcuL2hpc3RvcnktYnV0dG9uLmVzNidcbmltcG9ydCB7IHRvb2xCdXR0b24gfSBmcm9tICcuL3Rvb2wtYnV0dG9uLmVzNidcbmltcG9ydCB7IG1lbnVCdXR0b24gfSBmcm9tICcuL21lbnUtYnV0dG9uLmVzNidcblxuY2xhc3MgVG9vbEJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzY2FsZUJ1dHRvbi5pbml0KClcbiAgICBoaXN0b3J5QnV0dG9uLmluaXQoKVxuICAgIHRvb2xCdXR0b24uaW5pdCgpXG4gICAgbWVudUJ1dHRvbi5pbml0KClcblxuICAgIHRoaXMudXBkYXRlKClcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKVxuICB9XG4gIFxuICB1cGRhdGVCdXR0b25zKCkge1xuICAgIHNjYWxlQnV0dG9uLnVwZGF0ZSgpXG4gICAgaGlzdG9yeUJ1dHRvbi51cGRhdGUoKVxuICAgIHRvb2xCdXR0b24udXBkYXRlKClcbiAgICBtZW51QnV0dG9uLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEudG9vbEJhclxuICAgIGNvbmZpZy5kYXRhLnRvb2xCYXIgPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgICQoJyN0b29sLWJhcicpLmNzcygnZGlzcGxheScsIHZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAkKCcjbWFpbicpLmNzcygnaGVpZ2h0JywgdmFsdWUgPyAnY2FsYygxMDAlIC0gMzdweCknIDogJzEwMCUnKVxuICAgICQoJyNtYWluJykuY3NzKCd0b3AnLCB2YWx1ZSA/ICczN3B4JyA6ICcwJylcblxuICAgIC8vVmlldy5vblJlc2l6ZSgpXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGUoIWNvbmZpZy5kYXRhLnRvb2xCYXIpXG4gIH1cbn1cblxuY29uc3QgdG9vbEJhciA9IG5ldyBUb29sQmFyKCk7XG5cbmV4cG9ydCB7IHRvb2xCYXIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgaHRtbERyb3Bkb3duIH0gZnJvbSAnLi9odG1sLWRyb3Bkb3duLmVzNidcblxubGV0IHBlbkJ1dHRvblxubGV0IGVyYXNlckJ1dHRvblxubGV0IHRleHRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUb29sQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcGVuQnV0dG9uID0gJCgnI3Blbi1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3Blbi1idXR0b24ucG5nJyxcbiAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1nQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3BlbicpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCdwZW5Ecm9wRG93bicsICdwZW4nKVxuICAgIH0pWzBdXG4gICAgXG4gICAgZXJhc2VyQnV0dG9uID0gJCgnI2VyYXNlci1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL2VyYXNlci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1nQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3RleHQnKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgnZXJhc2VyRHJvcERvd24nLCAnZXJhc2VyJylcbiAgICB9KVswXVxuXG4gICAgdGV4dEJ1dHRvbiA9ICQoJyN0ZXh0LWJ1dHRvbicpLmltZ0J1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdGV4dC1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1nQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3RleHQnKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgndGV4dERyb3BEb3duJywgJ3RleHQnKVxuICAgIH0pWzBdXG5cbiAgICB0aGlzLmJ1dHRvbnMucHVzaChwZW5CdXR0b24sIGVyYXNlckJ1dHRvbiwgdGV4dEJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuXG4gIHNlbGVjdCh0b29sKSB7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBjb25zdCBsb2NrZWQgPSAkKGJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnKVxuICAgICAgY29uc3QgZHJvcGRvd24gPSAkKGJ1dHRvbikuZmluZCgnLmRyb3Bkb3duLWNvbnRlbnQnKVswXVxuICAgICAgXG4gICAgICBpZiAoYnV0dG9uICYmIGJ1dHRvbi5pZC5pbmRleE9mKHRvb2wpID09IDApIHtcbiAgICAgICAgaWYgKCFsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLmltZ0J1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgdG9vbEJ1dHRvbiA9IG5ldyBUb29sQnV0dG9uKClcblxuZXhwb3J0IHsgdG9vbEJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgd2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQuZXM2J1xuaW1wb3J0IHsgdG9vbEJhciB9IGZyb20gJy4vdG9vbC1iYXIuZXM2J1xuaW1wb3J0IHsgc2lkZUJhciB9IGZyb20gJy4vc2lkZS1iYXIuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZW51ID0gbWVudVxuICAgIHRoaXMuZGlhbG9nID0gZGlhbG9nXG4gICAgdGhpcy50b29sQmFyID0gdG9vbEJhclxuICAgIHRoaXMuc2lkZUJhciA9IHNpZGVCYXJcbiAgfVxuICBcbiAgaW5pdCgpIHtcbiAgICBtZW51LmluaXQoKVxuICAgIGRpYWxvZy5pbml0KClcbiAgICB0b29sQmFyLmluaXQoKVxuICAgIHNpZGVCYXIuaW5pdCgpXG4gICAgXG4gICAgJCgnLnNwbGl0LXBhbmUnKS5jc3MoJ29wYWNpdHknLCAxKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRvb2xCYXIudXBkYXRlKClcbiAgICBzaWRlQmFyLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3QgdWkgPSBuZXcgVUkoKVxuXG5leHBvcnQgeyB1aSB9XG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgV2lkZ2V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0SW1nQnV0dG9uKClcbiAgfVxuXG4gIGluaXRJbWdCdXR0b24oKSB7XG4gICAgJC53aWRnZXQoJ25hbWVub3RlLmltZ0J1dHRvbicsIHtcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgd2lkdGg6ICcyNHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMjRweCcsXG4gICAgICAgIGxvY2tlZDogZmFsc2UsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gIFxuICAgICAgX2NyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnaW1nLWJ1dHRvbicpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCR7dGhpcy5vcHRpb25zLnNyY30pYClcblxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCdmbG9hdCcsIHRoaXMub3B0aW9ucy5mbG9hdClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpXG4gICAgICAgIHRoaXMubG9ja2VkKHRoaXMub3B0aW9ucy5sb2NrZWQpXG4gICAgICAgIHRoaXMuZGlzYWJsZWQodGhpcy5vcHRpb25zLmRpc2FibGVkKVxuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudCkge1xuICAgICAgICAgIHRoaXMuZWxlbWVudFswXS5hcHBlbmRDaGlsZCh0aGlzLm9wdGlvbnMuY29udGVudClcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgICBcbiAgICAgICAgICBjb250ZW50LnRpdGxlID0gXCJcIlxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmxvYXQgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgY29udGVudC5zdHlsZS5yaWdodCA9IFwiMFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xpY2sgPSB0aGlzLm9wdGlvbnMuY2xpY2tcbiAgICAgICAgaWYgKGNsaWNrKSB0aGlzLmVsZW1lbnQub24oJ2NsaWNrJywgY2xpY2spXG4gICAgICB9LFxuXG4gICAgICBsb2NrZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5vcHRpb25zLmxvY2tlZFxuXG4gICAgICAgIHRoaXMub3B0aW9ucy5sb2NrZWQgPSB2YWx1ZVxuICAgICAgICBpZiAodmFsdWUpIHtcblx0ICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ2xvY2tlZCcpXG4gICAgICAgIH0gZWxzZSB7XG5cdCAgdGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBkaXNhYmxlZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnMuZGlzYWJsZWRcbiAgICAgIFxuICAgICAgICB0aGlzLm9wdGlvbnMuZGlzYWJsZWQgPSB2YWx1ZVxuICAgICAgICBpZiAodmFsdWUpIHtcblx0ICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ29mZicpXG4gICAgICAgIH0gZWxzZSB7XG5cdCAgdGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKCdvZmYnKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pXG4gIH1cbn1cblxuY29uc3Qgd2lkZ2V0ID0gbmV3IFdpZGdldCgpXG5cbmV4cG9ydCB7IHdpZGdldCB9XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRpY3Rpb25hcnkgPSB7XG4gIFwiamFcIjoge1xuICAgIFwiTmFtZW5vdGVcIjogXCJOYW1lbm90ZVwiLFxuICAgIFwiQWJvdXQgTmFtZW5vdGVcIjogXCJOYW1lbm90ZSDjgavjgaTjgYTjgaZcIixcbiAgICBcIkFib3V0IE5hbWVub3RlIC4uLlwiOiBcIk5hbWVub3RlIOOBq+OBpOOBhOOBpiAuLi5cIixcbiAgICBcIkhlbHBcIjogXCLjg5jjg6vjg5dcIixcbiAgICBcIlNldHRpbmdzXCI6IFwi55Kw5aKD6Kit5a6aXCIsXG4gICAgXCJTZXR0aW5ncyAuLi5cIjogXCLnkrDlooPoqK3lrpogLi4uXCIsXG4gICAgXCJUYWJsZXQgU2V0dGluZ3NcIjogXCLnrYblnKfoqr/mlbRcIixcbiAgICBcIlRhYmxldCBTZXR0aW5ncyAuLi5cIjogXCLnrYblnKfoqr/mlbQgLi4uXCIsXG4gICAgXCJRdWl0IE5hbWVub3RlXCI6IFwiTmFtZW5vdGUg44KS57WC5LqGXCIsXG4gICAgXCJOb3RlXCI6IFwi44OO44O844OIXCIsXG4gICAgXCJGaWxlXCI6IFwi44OV44Kh44Kk44OrXCIsXG4gICAgXCJPcGVuIC4uLlwiOiBcIumWi+OBjyAuLi5cIixcbiAgICBcIk9wZW5cIjogXCLjg47jg7zjg4jjgpLplovjgY9cIixcbiAgICBcIk5ldyAuLi5cIjogXCLmlrDopo8gLi4uXCIsXG4gICAgXCJOZXdcIjogXCLmlrDopo/jg47jg7zjg4hcIixcbiAgICBcIkNsb3NlXCI6IFwi6ZaJ44GY44KLXCIsXG4gICAgXCJDbG9zZSBBbGxcIjogXCLjgZnjgbnjgabjgpLplonjgZjjgotcIixcbiAgICBcIk5vdGUgU2V0dGluZ3MgLi4uXCI6IFwi44OO44O844OI6Kit5a6aIC4uLlwiLFxuICAgIFwiRXhwb3J0XCI6IFwi5pu444GN5Ye644GXXCIsXG4gICAgXCJJbXBvcnRcIjogXCLoqq3jgb/ovrzjgb9cIixcbiAgICBcIi5jc25mIChDTElQIFNUVURJTyBTdG9yeWJvYXJkKSAuLi5cIjogXCIuY3NuZiAoQ0xJUCBTVFVESU8g44ON44O844Og44OV44Kh44Kk44OrKSAuLi5cIixcbiAgICBcIi5wZGYgKFBERikgLi4uXCI6IFwiLnBkZiAoUERGKSAuLi5cIixcbiAgICBcIi50eHQgKFBsYWluIFRleHQpIC4uLlwiOiBcIi50eHQgKOODhuOCreOCueODiOODleOCoeOCpOODqykgLi4uXCIsXG4gICAgXCJTYXZlXCI6IFwi5L+d5a2YXCIsXG4gICAgXCJTYXZlIEFzIC4uLlwiOiBcIuWQjeWJjeOCkuOBpOOBkeOBpuS/neWtmCAuLi5cIixcbiAgICBcIlNhdmUgQXNcIjogXCLlkI3liY3jgpLjgaTjgZHjgabkv53lrZhcIixcbiAgICBcIlNhdmUgU25hcHNob3QgQXMgLi4uXCI6IFwi44K544OK44OD44OX44K344On44OD44OI44KS5L+d5a2YIC4uLlwiLFxuICAgIFwiRWRpdFwiOiBcIue3qOmbhlwiLFxuICAgIFwiVW5kb1wiOiBcIuWPluOCiua2iOOBl1wiLFxuICAgIFwiUmVkb1wiOiBcIuOChOOCiuebtOOBl1wiLFxuICAgIFwiQ3V0XCI6IFwi5YiH44KK5Y+W44KKXCIsXG4gICAgXCJDb3B5XCI6IFwi44Kz44OU44O8XCIsXG4gICAgXCJQYXN0ZVwiOiBcIuiyvOOCiuS7mOOBkVwiLFxuICAgIFwiU2VsZWN0IEFsbFwiOiBcIuOBmeOBueOBpuOCkumBuOaKnlwiLFxuXG4gICAgXCJQYWdlXCI6IFwi44Oa44O844K4XCIsXG4gICAgXCJBZGRcIjogXCLov73liqBcIixcbiAgICBcIk1vdmUgdG8gQnVmZmVyXCI6IFwi44OQ44OD44OV44Kh44Gr5YWl44KM44KLXCIsXG4gICAgXCJQdXQgQmFjayBmcm9tIEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOBi+OCieaIu+OBmVwiLFxuICAgIFwiRW1wdHkgQnVmZmVyXCI6IFwi44OQ44OD44OV44Kh44KS56m644Gr44GZ44KLXCIsXG4gICAgXCJEdXBsaWNhdGVcIjogXCLopIfoo73jgpLov73liqBcIixcbiAgICBcIk1vdmUgRm9yd2FyZFwiOiBcIuWJjeOBq+enu+WLlVwiLFxuICAgIFwiTW92ZSBCYWNrd2FyZFwiOiBcIuW+jOOCjeOBq+enu+WLlVwiLFxuICAgIFwiRmxpcFwiOiBcIuW3puWPs+WPjei7ouOBl+OBpuihqOekulwiLFxuICAgIFwiU2F2ZSBJbWFnZSBBcyAuLi5cIjogXCLjgqTjg6Hjg7zjgrjjgpLkv53lrZggLi4uXCIsXG4gICAgXCJTYXZlIEltYWdlXCI6IFwi44Kk44Oh44O844K444KS5L+d5a2YXCIsXG4gICAgXG4gICAgXCJVbnRpdGxlZFwiOiBcIuWQjeensOacquioreWumlwiLFxuICAgIFwiVmlld1wiOiBcIuihqOekulwiLFxuICAgIFwiVG9vbCBCYXJcIjogXCLjg4Tjg7zjg6vjg5Djg7xcIixcbiAgICBcIlNpZGUgQmFyXCI6IFwi44K144Kk44OJ44OQ44O8XCIsXG4gICAgXCJEZXZlbG9wZXIgVG9vbHNcIjogXCLjg4fjg5njg63jg4Pjg5Hjg7wg44OE44O844OrXCIsXG4gICAgXCJGdWxsIFNjcmVlblwiOiBcIuODleODq+OCueOCr+ODquODvOODs1wiLFxuICAgIFwiUGFnZSBNYXJnaW5cIjogXCLkvZnnmb1cIixcbiAgICBcIk51bWJlciBvZiBQYWdlcyBwZXIgUm93XCI6IFwiMeihjOOBguOBn+OCiuOBruODmuODvOOCuOaVsFwiLFxuICAgIFxuICAgIFwiV2luZG93XCI6IFwi44Km44Kj44Oz44OJ44KmXCIsXG4gICAgXCJFeHRyYWN0IFRleHRcIjogXCLjg4bjgq3jgrnjg4jjgpLmir3lh7pcIixcbiAgICBcIk9wZW4gUmVjZW50XCI6IFwi5pyA6L+R5L2/55So44GX44Gf44OO44O844OI44KS6ZaL44GPXCIsXG4gICAgXCJDbGVhciBSZWNlbnQgTm90ZSBMaXN0XCI6IFwi5pyA6L+R5L2/55So44GX44Gf44OO44O844OI44Gu44Oq44K544OI44KS5raI5Y67XCIsXG4gICAgXCJVbnRpdGxlZFwiOiBcIuWQjeensOacquioreWumlwiLFxuICAgIFwiTWFraW5nIENTTkYgLi4uXCI6IFwiQ1NORuODleOCoeOCpOODq+OCkuS9nOaIkOS4rSAuLi5cIixcbiAgICBcIk9ubGluZSBTdG9yYWdlXCI6IFwi44Kq44Oz44Op44Kk44Oz44K544OI44Os44O844K4XCIsXG5cbiAgICBcIlNcIjogXCLlsI9cIixcbiAgICBcIk1cIjogXCLkuK1cIixcbiAgICBcIkxcIjogXCLlpKdcIixcbiAgICBcIlByZXNzdXJlXCI6IFwi562G5ZynXCIsXG4gICAgXCJWZXJ0aWNhbFwiOiBcIue4puabuOOBjVwiLFxuICAgIFwiSG9yaXpvbnRhbFwiOiBcIuaoquabuOOBjVwiLFxuXG4gICAgXCJOZXcgbm90ZWJvb2tcIjogXCLmlrDopo/jg47jg7zjg4hcIixcbiAgICBcIk5vdGVib29rIG5hbWVcIjogXCLjg47jg7zjg4jlkI1cIixcbiAgICBcIkZvbGRlclwiOiBcIuS/neWtmOWFiFwiLFxuICAgIFwiQ2hvb3NlIGZvbGRlci4uLlwiOiBcIuWPgueFpy4uLlwiLFxuICAgIFwiTnVtYmVyIG9mIHBhZ2VzXCI6IFwi44Oa44O844K45pWwXCIsXG4gICAgXCJUZW1wbGF0ZVwiOiBcIuODhuODs+ODl+ODrOODvOODiFwiLFxuICAgIFwiTWFuZ2FcIjogXCLmvKvnlLtcIixcbiAgICBcIkJpbmRpbmcgcG9pbnRcIjogXCLntrTjgZjjgovkvY3nva5cIixcbiAgICBcIkxlZnQgYmluZGluZ1wiOiBcIuW3pue2tOOBmOOAgFwiLFxuICAgIFwiUmlnaHQgYmluZGluZ1wiOiBcIuWPs+e2tOOBmOOAgFwiLFxuICAgIFwiU3RhcnQgcGFnZVwiOiBcIumWi+Wni+ODmuODvOOCuFwiLFxuICAgIFwiRnJvbSBsZWZ0XCI6IFwi5bem44Oa44O844K4XCIsXG4gICAgXCJGcm9tIHJpZ2h0XCI6IFwi5Y+z44Oa44O844K4XCIsXG4gICAgXCJQYWdlc1wiOiBcIuODmuODvOOCuFwiLFxuICAgIFwiQWxsXCI6IFwi44GZ44G544GmXCIsXG4gICAgXCJDdXJyZW50IHBhZ2VcIjogXCLpgbjmip7jgZXjgozjgZ/jg5rjg7zjgrhcIixcbiAgICBcIlJhbmdlXCI6IFwi56+E5Zuy5oyH5a6aXCIsXG4gICAgXCJTY2FsZVwiOiBcIuaLoeWkpy/nuK7lsI9cIixcbiAgICBcIkN1c3RvbVwiOiBcIuOCq+OCueOCv+ODoFwiLFxuICAgIFwiVGV4dCBjb2xvclwiOiBcIuODhuOCreOCueODiOOBruiJslwiLFxuICAgIFwiMTAwJVwiOiBcIkI15ZWG5qWt6KqM55SoKEI044K144Kk44K65Y6f56i/55So57SZL0E05LuV5LiK44GM44KKKVwiLFxuICAgIFwiODIlXCI6IFwiQTXlkIzkurroqoznlKgoQTTjgrXjgqTjgrrljp/nqL/nlKjntJkvQjXku5XkuIrjgYzjgoopXCIsXG4gICAgXCJOYW1lIGNoYW5nZXIgY29tcGF0aWJsZVwiOiBcIuOCueODiOODvOODquODvOOCqOODh+OCo+OCv+eUqOODjeODvOODoOODgeOCp+ODs+OCuOODo+ODvOS6kuaPm1wiLFxuXG4gICAgXCJFeHBvcnQgQ0xJUCBTVFVESU8gU3Rvcnlib2FyZFwiOiBcIkNMSVAgU1RVRElPIOODjeODvOODoOabuOOBjeWHuuOBl1wiLFxuICAgIFwiRXhwb3J0IFBERlwiOiBcIlBERuabuOOBjeWHuuOBl1wiLFxuICAgIFwiSW1wb3J0IFBsYWluIFRleHRcIjogXCLjg4bjgq3jgrnjg4joqq3jgb/ovrzjgb9cIixcbiAgICBcIlJlc2V0IFNldHRpbmdzIHRvIERlZmF1bHRcIjogXCLliJ3mnJ/oqK3lrprjgavmiLvjgZlcIixcblxuICAgIFwiRmlsZSBuYW1lXCI6IFwi44OV44Kh44Kk44Or5ZCNXCIsXG4gICAgXCJEdXBsaWNhdGUgbm90ZSBuYW1lLlwiOiBcIuWQjOOBmOWQjeWJjeOBruODjuODvOODiOOBjOOBguOCiuOBvuOBmeOAglwiLFxuICAgIFwiRHVwbGljYXRlIGZpbGUgbmFtZS5cIjogXCLlkIzjgZjlkI3liY3jga7jg5XjgqHjgqTjg6vjgYzjgYLjgorjgb7jgZnjgIJcIixcbiAgICBcIkZpbGUgbm90IGZvdW5kLlwiOiBcIuODleOCoeOCpOODq+OBjOimi+OBpOOBi+OCiuOBvuOBm+OCk+OAglwiLFxuICAgIFwiU2F2ZSBlcnJvci5cIjogXCLjgrvjg7zjg5bjgafjgY3jgb7jgZvjgpPjgIJcIixcbiAgICBcIlNlbGVjdCBmaWxlIHRvIGltcG9ydFwiOiBcIuiqreOBv+i+vOOCgOODleOCoeOCpOODq+OCkumBuOaKnuOBl+OBpuOBj+OBoOOBleOBhFwiLFxuICAgIFwiQ29tcHJlc3NpbmdcIjogXCLlnKfnuK7kuK1cIixcbiAgICBcIlJlbmRlcmluZ1wiOiBcIuS9nOaIkOS4rVwiLFxuXG4gICAgXCJGb3JtYXRcIjogXCLjg5Xjgqnjg7zjg57jg4Pjg4hcIixcbiAgICBcIkxpbmUgc2VwYXJhdG9yXCI6IFwi5pS56KGMXCIsXG4gICAgXCJCYWxsb29uIHNlcGFyYXRvclwiOiBcIuaUueOCu+ODquODlVwiLFxuICAgIFwiUGFnZSBzZXBhcmF0b3JcIjogXCLmlLnjg5rjg7zjgrhcIixcbiAgICBcIkNvbW1lbnQga2V5XCI6IFwi44Kz44Oh44Oz44OIXCIsXG4gICAgXCJDaG9vc2UgZmlsZS4uLlwiOiBcIuODleOCoeOCpOODq+OCkumBuOaKni4uLlwiLFxuICAgIFxuICAgIFwiVHJpYWxcIjogXCLoqabnlKjniYhcIixcbiAgICBcIldlbGNvbWUgdG8gdGhlIHRyaWFsIHZlcnNpb24gb2YgTmFtZW5vdGUuXFxuWW91IGhhdmUgXCI6IFwi44GC44GoXCIsXG4gICAgXCIgZGF5KHMpIGxlZnQuXCI6IFwi5pel44GQ44KJ44GE6Kmm55So44Gn44GN44G+44GZ44CCXFxu44GC44KK44GM44Go44GG44GU44GW44GE44G+44GZ77yBXCIsIFxuICAgIFwiV2UncmUgc29ycnksIGJ1dCB5b3VyIHRyaWFsIHBlcmlvZCBoYXMgZXhwaXJlZC5cIjogXCLoqabnlKjmnJ/plpPntYLkuobjgZfjgb7jgZfjgZ/jgIJcXG7jgYLjgorjgYzjgajjgYbjgZTjgZbjgYTjgb7jgZfjgZ/vvIFcIiwgXG5cbiAgICBcIlpvb20gc21hbGwgdGV4dHMgb24gaW5wdXRcIjogXCLlsI/jgZXjgYTjg4bjgq3jgrnjg4jjgpLnt6jpm4bjgZnjgovjgajjgY3jga/mi6HlpKfooajnpLrjgZnjgotcIixcbiAgICBcIlVzZSBRdWlja2xpbmVcIiA6IFwi6ZW35oq844GX44Gn55u057ea44OE44O844Or44Gr5YiH44KK5pu/44GI44KLXCIsXG4gICAgXCJEaXNhYmxlIHdpbnRhYiBkcml2ZXJcIjogXCJXaW50YWLjg4njg6njgqTjg5DjgpLkvb/jgo/jgarjgYRcIixcbiAgICBcIkRpc2FibGUgbW91c2Ugd2hlZWwgc2Nyb2xsXCI6IFwi44Oe44Km44K544Ob44Kk44O844Or44Gn44K544Kv44Ot44O844Or44GX44Gq44GEXCIsXG4gICAgXCJDbGljayBPSyB0byByZXN0b3JlIGRlZmF1bHQgc2V0dGluZ3MuXCI6IFwi44OH44OV44Kp44Or44OI44Gu6Kit5a6a44Gr5oi744GX44G+44GZXCIsXG4gICAgXCJQZW4gcHJlc3N1cmVcIjogXCLnrYblnKdcIixcbiAgICBcIk91dHB1dFwiOiBcIuWHuuWKm1wiLFxuICAgIFxuICAgIFwiRW5hYmxlIEphcGFuZXNlIE9wdGlvbnNcIjogXCLml6XmnKzoqp7nlKjjga7jgqrjg5fjgrfjg6fjg7PjgpLmnInlirnjgavjgZnjgotcIlxuICB9XG59XG5cbmV4cG9ydHMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnlcbiJdfQ==
