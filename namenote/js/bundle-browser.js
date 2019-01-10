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

},{"./dialog.es6":6,"./locale.es6":10,"./namenote.es6":15}],2:[function(require,module,exports){
'use strict';

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

window.namenote = _namenote.namenote;
window.T = _locale.locale.translate;
window.log = console.log.bind(window.console);
window.warn = console.warn.bind(window.console);
window.error = console.error.bind(window.console);
document.addEventListener("DOMContentLoaded", function () {
  _namenote.namenote.init();
});

},{"./locale.es6":10,"./namenote.es6":15}],3:[function(require,module,exports){
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

},{"./about-dialog.es6":1,"./dialog.es6":6,"./namenote.es6":15,"./side-bar.es6":24,"./tool-button.es6":27}],4:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./command.es6":3,"./project-manager.es6":18}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./command.es6":3,"./menu.es6":14,"./namenote.es6":15,"./recent-url.es6":20}],10:[function(require,module,exports){
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

},{"../js/lib/dictionary.js":30}],11:[function(require,module,exports){
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
var element; ////////////////////////////////////////////////////////////////

var MainView =
/*#__PURE__*/
function () {
  function MainView() {
    _classCallCheck(this, MainView);

    this.scale = 1;
  }

  _createClass(MainView, [{
    key: "init",
    value: function init() {
      var pageWidth = 1000;
      var pageHeight = 768;
      element = $('.main-view')[0];

      for (var j = 0; j < 100; j++) {
        for (var i = 0; i < 10; i++) {
          var page = document.createElement('div');
          page.style.width = pageWidth + "px";
          page.style.height = pageHeight + "px";
          page.style.backgroundColor = "white";
          var x = i * (pageWidth + 50) + 50;
          var y = j * (pageHeight + 50) + 50;
          page.style.position = 'absolute';
          page.style.left = x + "px";
          page.style.top = y + "px";
          var pageNumber = document.createElement('div');
          pageNumber.innerHTML = j * 10 + i + 1;
          pageNumber.style.position = 'absolute';
          pageNumber.style.left = pageWidth / 2 + 'px';
          pageNumber.style.top = pageHeight + 20 + 'px';
          page.appendChild(pageNumber);
          element.appendChild(page);
        }
      }
    }
  }]);

  return MainView;
}();

var mainView = new MainView();
exports.mainView = mainView;

},{"./namenote.es6":15}],12:[function(require,module,exports){
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

},{"./command.es6":3,"./html-menu.es6":9,"./menu-template.es6":13,"./menu.es6":14,"./project-manager.es6":18}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./html-menu.es6":9,"./menu-template.es6":13,"./namenote.es6":15,"./project-manager.es6":18,"./recent-url.es6":20}],15:[function(require,module,exports){
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
    this.mainView = _mainView.mainView;
    this.pageView = _pageView.pageView;
    this.textView = _textView.textView;
    this.projectManager = _projectManager.projectManager;
  }

  _createClass(Namenote, [{
    key: "init",
    value: function init() {
      _config.config.load();

      _shortcut.shortcut.load();

      _recentUrl.recentURL.load();

      _ui.ui.init();

      _mainView.mainView.init();

      _pageView.pageView.init();

      _textView.textView.init();

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

},{"./command.es6":3,"./config.es6":5,"./main-view.es6":11,"./page-view.es6":16,"./project-manager.es6":18,"./recent-url.es6":20,"./shortcut.es6":23,"./text-view.es6":25,"./ui.es6":28}],16:[function(require,module,exports){
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

},{"./namenote.es6":15}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"./project.es6":19,"./recent-url.es6":20}],19:[function(require,module,exports){
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

},{"./page.es6":17}],20:[function(require,module,exports){
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

},{"./menu.es6":14,"./project-manager.es6":18}],21:[function(require,module,exports){
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

},{"./command.es6":3,"./project-manager.es6":18}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./command.es6":3,"./shortcut-default.es6":22,"./ui.es6":28}],24:[function(require,module,exports){
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

},{"./config.es6":5}],25:[function(require,module,exports){
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

},{"./namenote.es6":15}],26:[function(require,module,exports){
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

},{"./config.es6":5,"./history-button.es6":7,"./menu-button.es6":12,"./scale-button.es6":21,"./tool-button.es6":27}],27:[function(require,module,exports){
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
            this.select('eraser');
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

},{"./command.es6":3,"./html-dropdown.es6":8}],28:[function(require,module,exports){
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

},{"./dialog.es6":6,"./menu.es6":14,"./side-bar.es6":24,"./tool-bar.es6":26,"./widget.es6":29}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9icm93c2VyLmVzNiIsImVzNi9jb21tYW5kLmVzNiIsImVzNi9jb25maWctZGVmYXVsdC5lczYiLCJlczYvY29uZmlnLmVzNiIsImVzNi9kaWFsb2cuZXM2IiwiZXM2L2hpc3RvcnktYnV0dG9uLmVzNiIsImVzNi9odG1sLWRyb3Bkb3duLmVzNiIsImVzNi9odG1sLW1lbnUuZXM2IiwiZXM2L2xvY2FsZS5lczYiLCJlczYvbWFpbi12aWV3LmVzNiIsImVzNi9tZW51LWJ1dHRvbi5lczYiLCJlczYvbWVudS10ZW1wbGF0ZS5lczYiLCJlczYvbWVudS5lczYiLCJlczYvbmFtZW5vdGUuZXM2IiwiZXM2L3BhZ2Utdmlldy5lczYiLCJlczYvcGFnZS5lczYiLCJlczYvcHJvamVjdC1tYW5hZ2VyLmVzNiIsImVzNi9wcm9qZWN0LmVzNiIsImVzNi9yZWNlbnQtdXJsLmVzNiIsImVzNi9zY2FsZS1idXR0b24uZXM2IiwiZXM2L3Nob3J0Y3V0LWRlZmF1bHQuZXM2IiwiZXM2L3Nob3J0Y3V0LmVzNiIsImVzNi9zaWRlLWJhci5lczYiLCJlczYvdGV4dC12aWV3LmVzNiIsImVzNi90b29sLWJhci5lczYiLCJlczYvdG9vbC1idXR0b24uZXM2IiwiZXM2L3VpLmVzNiIsImVzNi93aWRnZXQuZXM2IiwianMvbGliL2RpY3Rpb25hcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVNLFc7OztBQUNKLHlCQUFjO0FBQUE7O0FBQ1osU0FBSyxFQUFMLEdBQVUsY0FBVjtBQUNBLFNBQUssT0FBTCxHQUFlLElBQWY7QUFDRDs7Ozt5QkFFSSxPLEVBQVM7QUFDWixNQUFBLENBQUMsQ0FBQyxlQUFELENBQUQsQ0FBbUIsTUFBbkIsQ0FBMEI7QUFDeEIsUUFBQSxRQUFRLEVBQUUs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R1ksUUE5R1osd0JBK0dFLGdCQS9HRixFQStHb0IsSUEvR3BCLHdCQWdIRSxtQkFoSEYsRUFnSHVCLE1BaEh2Qix3QkFpSEUsZ0JBakhGLEVBaUhvQixNQWpIcEIsd0JBa0hFLGFBbEhGLEVBa0hpQixNQWxIakIsd0JBbUhFLGdCQW5IRixFQW1Ib0IsWUFuSHBCLHdCQXFIRSxPQXJIRixFQXFIVyxLQXJIWCx3QkFzSEUsc0RBdEhGLEVBc0gwRCxJQXRIMUQsd0JBdUhFLGVBdkhGLEVBdUhtQiwwQkF2SG5CLHdCQXdIRSxpREF4SEYsRUF3SHFELDJCQXhIckQsd0JBMEhFLDJCQTFIRixFQTBIK0IsdUJBMUgvQix3QkEySEUsZUEzSEYsRUEySG9CLGlCQTNIcEIsd0JBNEhFLHVCQTVIRixFQTRIMkIsaUJBNUgzQix3QkE2SEUsNEJBN0hGLEVBNkhnQyxrQkE3SGhDLHdCQThIRSx1Q0E5SEYsRUE4SDJDLGVBOUgzQyx3QkErSEUsY0EvSEYsRUErSGtCLElBL0hsQix3QkFnSUUsUUFoSUYsRUFnSVksSUFoSVosd0JBa0lFLHlCQWxJRixFQWtJNkIsa0JBbEk3QjtBQURpQixDQUFuQjtBQXVJQSxPQUFPLENBQUMsVUFBUixHQUFxQixVQUFyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuXG5jbGFzcyBBYm91dERpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSAnYWJvdXQtZGlhbG9nJ1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQodmVyc2lvbikge1xuICAgICQoJyNhYm91dC1kaWFsb2cnKS5kaWFsb2coe1xuICAgICAgYXV0b09wZW46IHRydWUsXG4gICAgICBwb3NpdGlvbjogeyBteTonY2VudGVyIGJvdHRvbScsIGF0OidjZW50ZXIgY2VudGVyJyB9LFxuICAgICAgdGl0bGU6IFQoJ0Fib3V0IE5hbWVub3RlJyksXG4gICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgIHdpZHRoOiA2MDAsXG4gICAgICBidXR0b25zOiB7IE9rOiB0aGlzLm9rIH0sXG4gICAgfSlcblxuICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsZS50cmFuc2xhdGVIVE1MKGBcbiAgICA8Y2VudGVyPlxuICAgICAgPGltZyBzcmM9Jy4vaW1nL25hbWVub3RlMTAyNC5wbmcnIHdpZHRoPVwiMTAwcHhcIiAvPlxuICAgICAgPGJyPlxuICAgICAgTmFtZW5vdGUgdiR7bmFtZW5vdGUudmVyc2lvbn1cbiAgICAgIDxicj48YnI+XG4gICAgICA8c21hbGw+Q29weXJpZ2h0IChjKSBGdW5pZ2U8L3NtYWxsPjwvY2VudGVyPmBcbiAgICApXG4gICAgXG4gICAgJCgnI2Fib3V0LWRpYWxvZycpLmh0bWwoc3RyaW5nKVxuICB9XG5cbiAgb2soKSB7XG4gICAgZGlhbG9nLmNsb3NlKClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBhYm91dERpYWxvZyA9IG5ldyBBYm91dERpYWxvZygpXG5cbmV4cG9ydCB7IGFib3V0RGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuXG5cbndpbmRvdy5uYW1lbm90ZSA9IG5hbWVub3RlXG5cbndpbmRvdy5UID0gbG9jYWxlLnRyYW5zbGF0ZVxud2luZG93LmxvZyA9IGNvbnNvbGUubG9nLmJpbmQod2luZG93LmNvbnNvbGUpXG53aW5kb3cud2FybiA9IGNvbnNvbGUud2Fybi5iaW5kKHdpbmRvdy5jb25zb2xlKVxud2luZG93LmVycm9yID0gY29uc29sZS5lcnJvci5iaW5kKHdpbmRvdy5jb25zb2xlKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xuICBuYW1lbm90ZS5pbml0KClcbn0pXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5pbXBvcnQgeyBhYm91dERpYWxvZyB9IGZyb20gJy4vYWJvdXQtZGlhbG9nLmVzNidcbmltcG9ydCB7IHNpZGVCYXIgfSBmcm9tICcuL3NpZGUtYmFyLmVzNidcbmltcG9ydCB7IHRvb2xCdXR0b24gfSBmcm9tICcuL3Rvb2wtYnV0dG9uLmVzNidcblxuY29uc3QgX3J1bk1haW4gPSAobWVzc2FnZSwgZGF0YSkgPT4ge1xuICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgbG9nKCdydW5NYWluJywgbWVzc2FnZSwgZGF0YSlcbiAgICBuYW1lbm90ZS5hcHAucnVuTWFpbihtZXNzYWdlLCBkYXRhKVxuXG4gIH0gZWxzZSB7XG4gICAgbG9nKGAke21lc3NhZ2V9OiBjYW5cXGB0IGV4ZWN1dGUgdGhpcyBjb21tYW5kIG9uIGJyb3dzZXIuYClcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIENvbW1hbmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgbG9nKCd1bmRvJylcbiAgfVxuXG4gIHJlZG8oKSB7XG4gICAgbG9nKCdyZWRvJylcbiAgfVxuXG4gIGFib3V0KCkge1xuICAgIGRpYWxvZy5vcGVuKGFib3V0RGlhbG9nKVxuICB9XG5cbiAgcGVuKGUpIHtcbiAgICBsb2coJ3BlbicpXG4gICAgdG9vbEJ1dHRvbi5zZWxlY3QoJ3BlbicpXG4gIH1cblxuICBlcmFzZXIoZSkge1xuICAgIGxvZygnZXJhc2VyJylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgnZXJhc2VyJylcbiAgfVxuXG4gIHRleHQoZSkge1xuICAgIGxvZygndGV4dCcpXG4gICAgdG9vbEJ1dHRvbi5zZWxlY3QoJ3RleHQnKVxuICB9XG5cbiAgc2lkZUJhcigpIHtcbiAgICBsb2coJ3NpZGVCYXInKVxuICAgIHNpZGVCYXIudG9nZ2xlKClcbiAgfVxuXG4gIHRvZ2dsZUVkaXRNb2RlKCkge31cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vL1xuICBcbiAgZG8oaXRlbSwgZGF0YSkge1xuICAgIGlmICh0aGlzW2l0ZW1dKSB7XG4gICAgICB0aGlzW2l0ZW1dKGRhdGEpXG4gICAgfVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy9cblxuICBkZXZlbG9wZXJUb29scygpIHtcbiAgICBfcnVuTWFpbignZGV2ZWxvcGVyVG9vbHMnKVxuICB9XG4gIFxuICBmdWxsU2NyZWVuKCkge1xuICAgIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICAgIF9ydW5NYWluKCdmdWxsU2NyZWVuJylcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cbiAgXG4gIHF1aXQoKSB7XG4gICAgX3J1bk1haW4oJ3F1aXQnKVxuICB9XG59XG5cbmNvbnN0IGNvbW1hbmQgPSBuZXcgQ29tbWFuZCgpXG5cbmV4cG9ydCB7IGNvbW1hbmQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbmZpZ0RlZmF1bHQgPSB7XG4gIHRvb2xCYXI6IHRydWUsXG4gIHNpZGVCYXI6IGZhbHNlLFxuICBzaWRlQmFyV2lkdGg6IDIwMCxcbiAgc2lkZUJhclBvc2l0aW9uOiAncmlnaHQnLFxuICBcbiAgZGVmYXVsdFBhdGg6IG51bGwsXG4gIGRlZmF1bHROYW1lOiBudWxsLFxuICBkZWZhdWx0QXV0aG9yOiBudWxsLFxufVxuXG5cbmV4cG9ydCB7IGNvbmZpZ0RlZmF1bHQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHQgfSBmcm9tICcuL2NvbmZpZy1kZWZhdWx0LmVzNidcblxuY2xhc3MgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9jb25maWcnKVxuICAgIHRoaXMuZGF0YSA9IChqc29uKSA/IEpTT04ucGFyc2UoanNvbikgOiAkLmV4dGVuZCh0cnVlLCB7fSwgY29uZmlnRGVmYXVsdClcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvY29uZmlnJywganNvbilcbiAgfVxuXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdEZWZhdWx0KVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cblxuICBnZXRWYWx1ZShrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmICh0aGlzLmRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhW2tleV1cblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWcoKVxuXG5leHBvcnQgeyBjb25maWcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIERpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cbiAgXG4gIGlzT3BlbigpIHtcbiAgICBmb3IgKGNvbnN0IHdpZGdldCBvZiAkKCcudWktZGlhbG9nLWNvbnRlbnQnKSkge1xuICAgICAgaWYgKCQod2lkZ2V0KS5kaWFsb2coJ2lzT3BlbicpKSB7XG5cdHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIFxuICBvcGVuKHdpZGdldCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHRoaXMuY2xvc2UoKVxuICAgIHRoaXMuY3VycmVudCA9IHdpZGdldFxuICAgIFxuICAgIGlmICghd2lkZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZWxlbWVudC5pZCA9IHdpZGdldC5pZFxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZGlhbG9nJ1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAkKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICAgIHdpZGdldC5lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cbiAgICB3aWRnZXQuaW5pdCgpXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBjb25zdCB3aWRnZXQgPSB0aGlzLmN1cnJlbnRcbiAgICBjb25zdCBlbGVtZW50ID0gd2lkZ2V0LmVsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgJCgnIycgKyB3aWRnZXQuaWQpLmRpYWxvZygnY2xvc2UnKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgfVxuICAgIHdpZGdldC5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxufVxuXG5jb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKClcblxuZXhwb3J0IHsgZGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5sZXQgdW5kb0J1dHRvblxubGV0IHJlZG9CdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIaXN0b3J5QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHVuZG9CdXR0b24gPSAkKCcjdW5kby1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3VuZG8tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb21tYW5kLnVuZG8oKVxuICAgICAgfVxuICAgIH0pWzBdXG5cbiAgICByZWRvQnV0dG9uID0gJCgnI3JlZG8tYnV0dG9uJykuaW1nQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9yZWRvLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29tbWFuZC5yZWRvKClcbiAgICAgIH1cbiAgICB9KVswXVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5jdXJyZW50XG4gICAgXG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIGNvbnN0IGhhc1VuZG8gPSAocHJvamVjdCkgPyBwcm9qZWN0Lmhpc3RvcnkuaGFzVW5kbygpIDogZmFsc2VcbiAgICAgIGNvbnN0IGhhc1JlZG8gPSAocHJvamVjdCkgPyBwcm9qZWN0Lmhpc3RvcnkuaGFzUmVkbygpIDogZmFsc2VcbiAgICAgICQodW5kb0J1dHRvbikuaW1nQnV0dG9uKCdkaXNhYmxlZCcsICFoYXNVbmRvKVxuICAgICAgJChyZWRvQnV0dG9uKS5pbWdCdXR0b24oJ2Rpc2FibGVkJywgIWhhc1JlZG8pXG5cbi8vICAgIE1lbnUudXBkYXRlSGlzdG9yeSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhpc3RvcnlCdXR0b24gPSBuZXcgSGlzdG9yeUJ1dHRvbigpXG5cbmV4cG9ydCB7IGhpc3RvcnlCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSFRNTERyb3Bkb3duIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG5cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgbG9nKCdvcGVuJywgZWxlbWVudClcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIH1cblxuICBjbG9zZShlbGVtZW50KSB7XG4gICAgbG9nKCdjbG9zZScpXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgXG4gIG1ha2UodGVtcGxhdGUsIGlkKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tY29udGVudCdcbiAgICBjb250ZW50LmlkID0gaWQgKyAnLWRyb3Bkb3duJ1xuICAgIFxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFske2lkfV1gXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxufVxuXG5jb25zdCBodG1sRHJvcGRvd24gPSBuZXcgSFRNTERyb3Bkb3duKClcblxuZXhwb3J0IHsgaHRtbERyb3Bkb3duIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSBhcyBuYXRpdmVNZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxubGV0IGJ1dHRvbnMgPSB7fVxubGV0IHRpbWVycyA9IHt9XG5sZXQgYmx1ckRlbGF5ID0gNTAwXG5cbmNvbnN0IGFkZEl0ZW1zID0gKG5vZGUsIGl0ZW1zKSA9PiB7XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGlmIChpdGVtLmxhYmVsKSB7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gYXBwZW5kS2V5KFQoaXRlbS5sYWJlbCksIGl0ZW0uYWNjZWxlcmF0b3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSAnLSdcbiAgICB9XG4gICAgbGkuYXBwZW5kQ2hpbGQoYXBwZW5kQXR0cmlidXRlKGRpdiwgaXRlbS5sYWJlbCwgaXRlbS5jbGljaykpXG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgYWRkSXRlbXMobGksIGl0ZW0uc3VibWVudSkgXG4gICAgfVxuXG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh1bClcbiAgfVxufVxuXG5jb25zdCBhcHBlbmRBdHRyaWJ1dGUgPSAoZGl2LCBkYXRhLCBjbGljaykgPT4ge1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBwLmlubmVySFRNTCA9IGRhdGFcbiAgICBwLnRpdGxlID0gY2xpY2sgfHwgJydcbiAgICBwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBkaXYuYXBwZW5kQ2hpbGQocClcbiAgfVxuICByZXR1cm4gZGl2XG59XG5cbmNvbnN0IGFwcGVuZEtleSA9IChzdHJpbmcsIGtleSwgY2hlY2spID0+IHtcbiAgY2hlY2sgPSAoY2hlY2spID8gJyYjeDI3MTQ7JyA6ICcnXG4gIGtleSA9IGNvbnZlcnRLZXkoa2V5KSB8fCAnJm5ic3A7JyBcblxuICBjb25zdCByZXN1bHQgPSBgXG4gICAgPGRpdiBjbGFzcz0nY2hlY2snPiR7Y2hlY2t9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz0nbGFiZWwnPiR7c3RyaW5nfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9J2tleSc+JHtrZXl9PC9kaXY+YFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGNvbnZlcnRLZXkgPSAoa2V5KSA9PiB7XG4gIGlmIChrZXkpIHtcbiAgICBpZiAoIW5hbWVub3RlLmlzTWFjKCkpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignQ29tbWFuZCtDdHJsK0YnKSA+PSAwKSByZXR1cm4gJydcbiAgICAgIFxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwsLywgJ1NoaWZ0K0NvbW1hJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLi8sICdTaGlmdCtQZXJpb2QnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NtZE9yQ3RybFxcKy8sICdDdHJsKycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0FsdFxcKy8sICdDdHJsK0FsdCsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJz8/PysnKVxuICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKClcblxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXCwvLCAnPCcpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXC4vLCAnPicpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ21kT3JDdHJsXFwrLywgJyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtBbHRcXCsvLCAnJiM4OTk3OyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJyYjODk2MzsmIzg5ODQ7JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcKy8sICcmIzg2Nzk7JylcbiAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIVE1MTWVudSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBcbiAgbWFrZSh0ZW1wbGF0ZSwgaWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1jb250ZW50J1xuICAgIGNvbnRlbnQuaWQgPSBpZCArICctZHJvcGRvd24nXG5cbiAgICBhZGRJdGVtcyhjb250ZW50LCB0ZW1wbGF0ZSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoY29udGVudC5jaGlsZE5vZGVzWzBdLCBpZClcbiAgICB9LCAxKVxuICAgXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxuXG4gIGFjdGl2YXRlKG1lbnUsIGlkKSB7XG4gICAgbWVudS5pZCA9IGlkICsgJy1tZW51J1xuICAgIGJ1dHRvbnNbaWRdID0gJCgnIycgKyBpZCArICctbWVudS1idXR0b24nKVxuICAgIHRpbWVyc1tpZF0gPSBudWxsXG5cbiAgICAkKG1lbnUpLm1lbnUoe1xuICAgICAgc2VsZWN0OiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0KGV2ZW50LCB1aSkpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKG1lbnUsIGlkKVxuICAgICAgICAgIGJ1dHRvbnNbaWRdLmltZ0J1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVxuXG4gICAgJChtZW51KS5vbignbWVudWZvY3VzJywgKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyc1tpZF0pXG4gICAgfSlcbiAgICBcbiAgICAkKG1lbnUpLm9uKCdtZW51Ymx1cicsICgpID0+IHtcbiAgICAgIGlmICghYnV0dG9uc1tpZF0uaW1nQnV0dG9uKCdsb2NrZWQnKSkgcmV0dXJuXG4gICAgICB0aW1lcnNbaWRdID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UobWVudSwgaWQpXG4gICAgICB9LCBibHVyRGVsYXkpXG4gICAgfSlcbiAgfVxuXG4gIGNvbGxhcHNlKG1lbnUsIGlkKSB7XG4gICAgJChtZW51KS5tZW51KCdjb2xsYXBzZUFsbCcsIG51bGwsIHRydWUpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKG1lbnUucGFyZW50Tm9kZSlcbiAgICAgIGJ1dHRvbnNbaWRdLmltZ0J1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgfSwgNTAwKVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG5cbiAgdXBkYXRlKGVsZW1lbnQpIHtcbiAgICBjb25zdCBtZW51ID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdXG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkLnJlcGxhY2UoLy0uKiQvLCAnJylcbiAgICB3YXJuKCdbaHRtbCBtZW51IHVwZGF0ZV0nLCBpZClcblxuICAgIGlmIChpZCA9PSAnZmlsZScpIHtcbiAgICAgIHRoaXMudXBkYXRlUmVjZW50cyhtZW51KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyhtZW51KVxuICAgICQobWVudSkubWVudSgncmVmcmVzaCcpXG4gIH1cblxuICB1cGRhdGVSZWNlbnRzKG1lbnUpIHtcbiAgICB3aGlsZSAobWVudS5jaGlsZE5vZGVzLmxlbmd0aCA+IDMpIHtcbiAgICAgIG1lbnUucmVtb3ZlQ2hpbGQobWVudS5jaGlsZE5vZGVzW21lbnUuY2hpbGROb2Rlcy5sZW5ndGggLSAxXSlcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBpdGVtXG4gICAgICBsaS5hcHBlbmRDaGlsZChhcHBlbmRBdHRyaWJ1dGUoZGl2LCBpdGVtLCAnb3BlblVSTCcpKVxuICAgICAgZGYuYXBwZW5kQ2hpbGQobGkpXG4gICAgfVxuICAgIG1lbnUuYXBwZW5kQ2hpbGQoZGYpXG4gIH1cblxuICB1cGRhdGVTdGF0ZXMobWVudSkge1xuICAgIGNvbnN0IGl0ZW1zID0gJChtZW51KS5maW5kKCdsaScpXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBjb25zdCBuYW1lID0gJChpdGVtKS5maW5kKCdwJylcbiAgICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBuYW1lWzBdLmlubmVySFRNTFxuICAgICAgICBjb25zdCBzdGF0ZSA9IG5hdGl2ZU1lbnUuZ2V0U3RhdGUobGFiZWwpXG4gICAgICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXN0YXRlLWRpc2FibGVkJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd1aS1zdGF0ZS1kaXNhYmxlZCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBzZWxlY3QoZXZlbnQsIHVpKSB7XG4gICAgY29uc3QgcCA9IHVpLml0ZW1bMF0gJiYgdWkuaXRlbVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpWzBdXG4gICAgaWYgKHApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBwLmlubmVySFRNTFxuICAgICAgY29uc3QgY2xpY2sgPSBwLnRpdGxlXG5cbiAgICAgIGlmIChjbGljaykge1xuICAgICAgICBlcnJvcihgJHtjbGlja31gLCBgJHtkYXRhfWApXG4gICAgICAgIGNvbW1hbmQuZG8oYCR7Y2xpY2t9YCwgYCR7ZGF0YX1gKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBodG1sTWVudSA9IG5ldyBIVE1MTWVudSgpXG5cbmV4cG9ydCB7IGh0bWxNZW51IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIExvY2FsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGRpY3Rpb25hcnkgPSByZXF1aXJlKCcuLi9qcy9saWIvZGljdGlvbmFyeS5qcycpLmRpY3Rpb25hcnlcbiAgICBcbiAgICBmb3IgKGxldCBrZXkgaW4gZGljdGlvbmFyeSkge1xuICAgICAgaWYgKG5hdmlnYXRvci5sYW5ndWFnZS5pbmRleE9mKGtleSkgPT0gMCAmJiBkaWN0aW9uYXJ5W2tleV0pIHtcbiAgICAgICAgY29uc3QgZGljdCA9IGRpY3Rpb25hcnlba2V5XVxuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IChzdHJpbmcpID0+IHtcbiAgICAgICAgICByZXR1cm4gZGljdFtzdHJpbmddIHx8IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJhbnNsYXRlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmdcbiAgfVxuICBcbiAgdHJhbnNsYXRlSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvVFxcKCguKj8pXFwpL2csIChhbGwsIG1hdGNoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUobWF0Y2gpXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBsb2NhbGUgPSBuZXcgTG9jYWxlKClcblxuZXhwb3J0IHsgbG9jYWxlIH1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcblxuLy8gJCgnLm1haW4tdmlldycpWzBdLnBhcmVudE5vZGUuc2Nyb2xsVG9wID0gLi4uXG5cbmxldCBlbGVtZW50XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWFpblZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNjYWxlID0gMVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBwYWdlV2lkdGggPSAxMDAwXG4gICAgY29uc3QgcGFnZUhlaWdodCA9IDc2OFxuICAgIGVsZW1lbnQgPSAkKCcubWFpbi12aWV3JylbMF1cbiAgICBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwMDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHBhZ2Uuc3R5bGUud2lkdGggPSBwYWdlV2lkdGggKyBcInB4XCJcbiAgICAgICAgcGFnZS5zdHlsZS5oZWlnaHQgPSBwYWdlSGVpZ2h0ICsgXCJweFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG5cbiAgICAgICAgY29uc3QgeCA9IGkgKiAocGFnZVdpZHRoICsgNTApICsgNTBcbiAgICAgICAgY29uc3QgeSA9IGogKiAocGFnZUhlaWdodCArIDUwKSArIDUwXG4gICAgICAgIHBhZ2Uuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHBhZ2Uuc3R5bGUubGVmdCA9IHggKyBcInB4XCJcbiAgICAgICAgcGFnZS5zdHlsZS50b3AgPSB5ICsgXCJweFwiXG5cbiAgICAgICAgY29uc3QgcGFnZU51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHBhZ2VOdW1iZXIuaW5uZXJIVE1MID0gaiAqIDEwICsgaSArIDFcbiAgICAgICAgcGFnZU51bWJlci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgcGFnZU51bWJlci5zdHlsZS5sZWZ0ID0gKHBhZ2VXaWR0aCAvIDIpICsgJ3B4J1xuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnRvcCA9IChwYWdlSGVpZ2h0ICsgMjApICsgJ3B4J1xuXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGFnZU51bWJlcilcbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChwYWdlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBtYWluVmlldyA9IG5ldyBNYWluVmlldygpXG5cbmV4cG9ydCB7IG1haW5WaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgaHRtbE1lbnUgfSBmcm9tICcuL2h0bWwtbWVudS5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuaW1wb3J0IHsgZmlsZU1lbnVUZW1wbGF0ZSwgb3RoZXJNZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuXG5sZXQgZmlsZUJ1dHRvblxubGV0IG90aGVyQnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWVudUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdXG4gIH1cblxuICBpbml0KCkge1xuICAgIGZpbGVCdXR0b24gPSAkKCcjZmlsZS1tZW51LWJ1dHRvbicpLmltZ0J1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZmlsZS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKGZpbGVNZW51VGVtcGxhdGUsICdmaWxlJylcbiAgICB9KVswXVxuXG4gICAgb3RoZXJCdXR0b24gPSAkKCcjb3RoZXItbWVudS1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL21lbnUtYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IHRoaXMuc2VsZWN0KGUpIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxNZW51Lm1ha2Uob3RoZXJNZW51VGVtcGxhdGUsICdvdGhlcicpXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKGZpbGVCdXR0b24sIG90aGVyQnV0dG9uKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG4gIFxuICBzZWxlY3QoZSkge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUuaW5kZXhPZignaW1nLWJ1dHRvbicpIDwgMCkgcmV0dXJuXG4gICAgaWYgKCQoZS50YXJnZXQpLmltZ0J1dHRvbignZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcpXG4gICAgICBjb25zdCBkcm9wZG93biA9ICQoYnV0dG9uKS5maW5kKCcuZHJvcGRvd24tY29udGVudCcpWzBdXG5cbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkID09IGUudGFyZ2V0LmlkKSB7XG4gICAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgICAgaHRtbE1lbnUudXBkYXRlKGRyb3Bkb3duKVxuICAgICAgICAgIFxuICAgICAgICAgICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgICAgaHRtbE1lbnUub3Blbihkcm9wZG93bilcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIGh0bWxNZW51LmNsb3NlKGRyb3Bkb3duKVxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgICBodG1sTWVudS5jbG9zZShkcm9wZG93bilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBtZW51QnV0dG9uID0gbmV3IE1lbnVCdXR0b24oKVxuXG5leHBvcnQgeyBtZW51QnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBtZW51VGVtcGxhdGUgPSBbXG4gIHsgbGFiZWw6ICdOYW1lbm90ZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0Fib3V0IE5hbWVub3RlIC4uLicsIGNsaWNrOiAnYWJvdXQnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgICAgIHsgbGFiZWw6ICdUYWJsZXQgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICd0YWJsZXRTZXR0aW5ncycgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdRdWl0IE5hbWVub3RlJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1FcIiwgY2xpY2s6ICdxdWl0JyB9LFxuICAgICAgXG4vLyAgICB7IGxhYmVsOiAnU2V0dGluZ3MnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICdSZXNldCBTZXR0aW5ncyB0byBEZWZhdWx0JywgY2xpY2s6ICdyZXNldFNldHRpbmdzJyB9LFxuLy9cdF0sXG4vLyAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6ICdOb3RlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnTmV3IC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtOXCIsIGNsaWNrOiAnb3Blbk5ld0RpYWxvZycgfSxcbiAgICAgIHsgbGFiZWw6ICdPcGVuIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtPXCIsIGNsaWNrOiAnb3BlbicgfSxcbiAgICAgIHsgbGFiZWw6ICdPcGVuIFJlY2VudCcsIHN1Ym1lbnU6IFtdIH0sXG5cbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbi8vICAgIHsgbGFiZWw6ICdDbG9zZScsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtXXCIsIGNsaWNrOiAnY2xvc2UnIH0sXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UgQWxsJywgY2xpY2s6ICdjbG9zZUFsbCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTXCIsIGNsaWNrOiAnc25hcHNob3QnIH0sXG5cdFxuLy8gICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuLy8gICAgeyBsYWJlbDogJ05vdGUgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdub3RlU2V0dGluZ3MnIH0sXG5cbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcblxuLy8gICAgeyBsYWJlbDogJ0ltcG9ydCcsXG4vL1x0c3VibWVudTogW1xuLy9cdCAgeyBsYWJlbDogJy50eHQgKFBsYWluIFRleHQpIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTaGlmdCtJXCIsIGNsaWNrOiAnaW1wb3J0VGV4dERpYWxvZycgfSxcbi8vXHRdLFxuLy8gICAgfSxcbiAgICAgIHsgbGFiZWw6ICdFeHBvcnQnLFxuXHRzdWJtZW51OiBbXG5cdCAgeyBsYWJlbDogJy5jc25mIChDTElQIFNUVURJTyBTdG9yeWJvYXJkKSAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrUFwiLCBjbGljazogJ2V4cG9ydENTTkZEaWFsb2cnIH0sXG5cdCAgeyBsYWJlbDogJy5wZGYgKFBERikgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1NoaWZ0K1BcIiwgY2xpY2s6ICdleHBvcnRQREZEaWFsb2cnIH0sXG5cdF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6IFwiRWRpdFwiLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6IFwiVW5kb1wiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrWlwiLCBzZWxlY3RvcjogXCJ1bmRvOlwiLCBjbGljazogJ3VuZG8nIH0sXG4gICAgICB7IGxhYmVsOiBcIlJlZG9cIiwgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1lcIiwgc2VsZWN0b3I6IFwicmVkbzpcIiwgY2xpY2s6ICdyZWRvJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiBcIkN1dFwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrWFwiLCBzZWxlY3RvcjogXCJjdXQ6XCIgfSxcbiAgICAgIHsgbGFiZWw6IFwiQ29weVwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQ1wiLCBzZWxlY3RvcjogXCJjb3B5OlwiIH0sXG4gICAgICB7IGxhYmVsOiBcIlBhc3RlXCIsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtWXCIsIHNlbGVjdG9yOiBcInBhc3RlOlwiIH0sXG5cbiAgICAgIHsgbGFiZWw6IFwiU2VsZWN0IEFsbFwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrQVwiLCBzZWxlY3RvcjogXCJzZWxlY3RBbGw6XCIsIGNsaWNrOiAnc2VsZWN0QWxsJyB9LFxuICAgIF1cbiAgfSxcbiAgeyBsYWJlbDogJ1BhZ2UnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBZGQnLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtpXCIsIGNsaWNrOiAnYXBwZW5kUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEZvcndhcmQnLCBhY2NlbGVyYXRvcjogXCJTaGlmdCsuXCIsIGNsaWNrOiAnbW92ZVBhZ2VGb3J3YXJkJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgQmFja3dhcmQnLCBhY2NlbGVyYXRvcjogXCJTaGlmdCssXCIsIGNsaWNrOiAnbW92ZVBhZ2VCYWNrd2FyZCcgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgdG8gQnVmZmVyJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQra1wiLCBjbGljazogJ2N1dFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtZXCIsIGNsaWNrOiAncGFzdGVQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ0VtcHR5IEJ1ZmZlcicsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0KzBcIiwgY2xpY2s6ICdlbXB0eVBhZ2UnIH0sXG4vLyAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbi8vICAgIHsgbGFiZWw6ICdGbGlwJywgYWNjZWxlcmF0b3I6IFwiSFwiLCBjbGljazogJ2ZsaXBQYWdlJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnRXh0cmFjdCBUZXh0JywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1RcIiwgY2xpY2s6ICdleHRyYWN0VGV4dCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIEltYWdlIEFzIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCstXCIsIGNsaWNrOiAnc2F2ZVBhZ2VJbWFnZScgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnVmlldycsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0Z1bGwgU2NyZWVuJywgYWNjZWxlcmF0b3I6ICdDdHJsK0NvbW1hbmQrRicsIGNsaWNrOiAnZnVsbFNjcmVlbicgfSwgXG4vLyAgICB7IGxhYmVsOiAnVG9vbCBCYXInLCBjbGljazogJ3Rvb2xCYXInIH0sIC8vYWNjZWxlcmF0b3I6IFwiQ29tbWFuZCtBbHQrSFwiLCBcbiAgICAgIHsgbGFiZWw6ICdTaWRlIEJhcicsIGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtBbHQrUycsIGNsaWNrOiAnc2lkZUJhcicgfSwgXG4gICAgICB7IGxhYmVsOiAnRGV2ZWxvcGVyIFRvb2xzJywgYWNjZWxlcmF0b3I6IFwiQ29tbWFuZCtBbHQrSlwiLCBjbGljazogJ2RldmVsb3BlclRvb2xzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1BhZ2UgTWFyZ2luJywgYWNjZWxlcmF0b3I6IFwiUlwiLCBjbGljazogJ3Nob3dNYXJnaW4nIH0sXG4gICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3cnLFxuXHRzdWJtZW51OiBbXG5cdCAgeyBsYWJlbDogJzInLCBjbGljazogJ3JvdzEnIH0sXG5cdCAgeyBsYWJlbDogJzQnLCBjbGljazogJ3JvdzInIH0sXG5cdCAgeyBsYWJlbDogJzYnLCBjbGljazogJ3JvdzMnIH0sXG5cdCAgeyBsYWJlbDogJzgnLCBjbGljazogJ3JvdzQnIH0sXG5cdF0sXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbi8qICBcbiAgeyBsYWJlbDogJ1dpbmRvdycsXG4gICAgc3VibWVudTogW1xuICAgIF0sXG4gIH0sXG4qL1xuXVxuXG5jb25zdCBmaWxlTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmV3IC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtOXCIsIGNsaWNrOiAnb3Blbk5ld0RpYWxvZycgfSxcbiAgeyBsYWJlbDogJ09wZW4gLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK09cIiwgY2xpY2s6ICdvcGVuJyB9LFxuICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5dXG5cbmNvbnN0IG90aGVyTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTm90ZScsXG4gICAgc3VibWVudTogW1xuLy8gICAgeyBsYWJlbDogJ0Nsb3NlJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1dcIiwgY2xpY2s6ICdjbG9zZScgfSxcbi8vICAgIHsgbGFiZWw6ICdDbG9zZSBBbGwnLCBjbGljazogJ2Nsb3NlQWxsJyB9LFxuICAgICAgeyBsYWJlbDogJ1NhdmUgU25hcHNob3QgQXMgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1NcIiwgY2xpY2s6ICdzbmFwc2hvdCcgfSxcblx0XG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrU2hpZnQrSVwiLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1BcIiwgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTaGlmdCtQXCIsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K2lcIiwgY2xpY2s6ICdhcHBlbmRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgRm9yd2FyZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0Ky5cIiwgY2xpY2s6ICdtb3ZlUGFnZUZvcndhcmQnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBCYWNrd2FyZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0KyxcIiwgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtLXCIsIGNsaWNrOiAnY3V0UGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K1lcIiwgY2xpY2s6ICdwYXN0ZVBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnRW1wdHkgQnVmZmVyJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQrMFwiLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ0V4dHJhY3QgVGV4dCcsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtUXCIsIGNsaWNrOiAnZXh0cmFjdFRleHQnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrLVwiLCBjbGljazogJ3NhdmVQYWdlSW1hZ2UnIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1ZpZXcnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdGdWxsIFNjcmVlbicsIGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtDdHJsK0YnLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgYWNjZWxlcmF0b3I6ICdDb21tYW5kK0FsdCtTJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBhY2NlbGVyYXRvcjogXCJDb21tYW5kK0FsdCtKXCIsIGNsaWNrOiAnZGV2ZWxvcGVyVG9vbHMnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUGFnZSBNYXJnaW4nLCBhY2NlbGVyYXRvcjogXCJSXCIsIGNsaWNrOiAnc2hvd01hcmdpbicgfSxcbiAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgUGFnZXMgcGVyIFJvdycsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnMicsIGNsaWNrOiAncm93MScgfSxcblx0ICB7IGxhYmVsOiAnNCcsIGNsaWNrOiAncm93MicgfSxcblx0ICB7IGxhYmVsOiAnNicsIGNsaWNrOiAncm93MycgfSxcblx0ICB7IGxhYmVsOiAnOCcsIGNsaWNrOiAncm93NCcgfSxcblx0XSxcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuLyogIFxuICB7IGxhYmVsOiAnV2luZG93JyxcbiAgICBzdWJtZW51OiBbXG4gICAgXSxcbiAgfSxcbiovXG4gIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnSGVscCcsIGNsaWNrOiAnYWJvdXQnIH0sXG5dXG5cbmV4cG9ydCB7IG1lbnVUZW1wbGF0ZSwgZmlsZU1lbnVUZW1wbGF0ZSwgb3RoZXJNZW51VGVtcGxhdGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBtZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCB0ZW1wbGF0ZVxubGV0IHN0YXRlcyA9IHt9XG5cbmNvbnN0IGZpbmRTdWJtZW51ID0gKHRlbXBsYXRlLCBsYWJlbCkgPT4ge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGVtcGxhdGUpIHtcbiAgICBpZiAoaXRlbS5sYWJlbCA9PSBsYWJlbCkge1xuICAgICAgcmV0dXJuIGl0ZW1cbiAgICB9XG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZFN1Ym1lbnUoaXRlbS5zdWJtZW51LCBsYWJlbClcbiAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3Qgc2V0U3RhdGUgPSAodGVtcGxhdGUsIGxhYmVsLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpdGVtID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsIGxhYmVsKVxuICBpZiAoaXRlbSkge1xuICAgIHZhbHVlID0gKHZhbHVlKSA/IHRydWUgOiBmYWxzZVxuXG4gICAgaXRlbS5lbmFibGVkID0gdmFsdWVcbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBpZiAoIXZhbHVlKSBkZWxldGUoaXRlbS5zdWJtZW51KVxuICAgIH1cbiAgICBzdGF0ZXNbbGFiZWxdID0gdmFsdWVcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRlbXBsYXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZW51VGVtcGxhdGUpKVxuICAgIHN0YXRlcyA9IHt9XG4gICAgd2FybignW25hdGl2ZSBtZW51IHVwZGF0ZV0nKVxuICAgIFxuICAgIHRoaXMudXBkYXRlUmVjZW50cyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnJlYnVpbGQodGVtcGxhdGUpXG4gIH1cblxuICByZWJ1aWxkKHRlbXBsYXRlKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnJlYnVpbGRNZW51KHRlbXBsYXRlKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJlY2VudHModGVtcGxhdGUpIHtcbiAgICBjb25zdCByZWNlbnRzID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsICdPcGVuIFJlY2VudCcpLnN1Ym1lbnVcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIHJlY2VudHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBpdGVtLCBkYXRhOiBpdGVtLCBjbGljazogJ29wZW5VUkwnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGlzQXBwID0gKG5hbWVub3RlLmFwcCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Z1bGwgU2NyZWVuJywgaXNBcHAgfHwgd2luZG93LmNocm9tZSlcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0RldmVsb3BlciBUb29scycsIGlzQXBwKVxuXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBjb25zdCBpc1Byb2plY3QgPSAocHJvamVjdCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Nsb3NlJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQ2xvc2UgQWxsJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLnBkZiAoUERGKSAuLi4nLCBpc1Byb2plY3QpXG4gICAgXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdBZGQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIHRvIEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1B1dCBCYWNrIGZyb20gQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRW1wdHkgQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSBGb3J3YXJkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSBCYWNrd2FyZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0V4dHJhY3QgVGV4dCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1NhdmUgSW1hZ2UgQXMgLi4uJywgaXNQcm9qZWN0KVxuXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdVbmRvJywgaXNQcm9qZWN0KSAvLyAmJiBwcm9qZWN0Lmhpc3RvcnkuaGFzVW5kbygpKVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnUmVkbycsIGlzUHJvamVjdCkgLy8gJiYgcHJvamVjdC5oaXN0b3J5Lmhhc1JlZG8oKSlcbiAgfVxuXG4gIGdldFN0YXRlKGxhYmVsKSB7XG4gICAgcmV0dXJuIHN0YXRlc1tsYWJlbF1cbiAgfVxufVxuXG5jb25zdCBtZW51ID0gbmV3IE1lbnUoKVxuXG5leHBvcnQgeyBtZW51IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyBzaG9ydGN1dCB9IGZyb20gJy4vc2hvcnRjdXQuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyB1aSB9IGZyb20gJy4vdWkuZXM2J1xuXG5pbXBvcnQgeyBtYWluVmlldyB9IGZyb20gJy4vbWFpbi12aWV3LmVzNidcbmltcG9ydCB7IHBhZ2VWaWV3IH0gZnJvbSAnLi9wYWdlLXZpZXcuZXM2J1xuaW1wb3J0IHsgdGV4dFZpZXcgfSBmcm9tICcuL3RleHQtdmlldy5lczYnXG5cbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE5hbWVub3RlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy52ZXJzaW9uID0gXCIyLjAuMC1hbHBoYS4xLWRlYnVnXCJcbiAgICB0aGlzLnRyaWFsID0gZmFsc2VcblxuICAgIHRoaXMuY29uZmlnID0gY29uZmlnXG4gICAgdGhpcy5zaG9ydGN1dCA9IHNob3J0Y3V0XG4gICAgdGhpcy5yZWNlbnRVUkwgPSByZWNlbnRVUkxcbiAgICBcbiAgICB0aGlzLmNvbW1hbmQgPSBjb21tYW5kXG4gICAgdGhpcy51aSA9IHVpXG5cbiAgICB0aGlzLm1haW5WaWV3ID0gbWFpblZpZXdcbiAgICB0aGlzLnBhZ2VWaWV3ID0gcGFnZVZpZXdcbiAgICB0aGlzLnRleHRWaWV3ID0gdGV4dFZpZXdcbiAgICBcbiAgICB0aGlzLnByb2plY3RNYW5hZ2VyID0gcHJvamVjdE1hbmFnZXJcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uZmlnLmxvYWQoKVxuICAgIHNob3J0Y3V0LmxvYWQoKVxuICAgIHJlY2VudFVSTC5sb2FkKClcbiAgICBcbiAgICB1aS5pbml0KClcblxuICAgIG1haW5WaWV3LmluaXQoKVxuICAgIHBhZ2VWaWV3LmluaXQoKVxuICAgIHRleHRWaWV3LmluaXQoKVxuICAgIFxuICAgIHRoaXMuaW5pdEJhc2VIYW5kbGVycygpXG4gIH1cblxuICBpbml0QmFzZUhhbmRsZXJzKCkge1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2coJ29ucmVzaXplJyxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgbG9nKCdjb250ZXh0bWVudScpXG4gICAgfVxuICB9XG5cbiAgaXNNYWMoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5jb25zdCBuYW1lbm90ZSA9IG5ldyBOYW1lbm90ZSgpXG5cbmV4cG9ydCB7IG5hbWVub3RlIH1cbiAgICBcbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFBhZ2VWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG59XG5cbmNvbnN0IHBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3KClcblxuZXhwb3J0IHsgcGFnZVZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGlkID0gMFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3BhZ2UgZGVzdHJ1Y3RvcicsIHRoaXMucGlkKVxuICB9XG59XG5cbmV4cG9ydCB7IFBhZ2UgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIHNlbGVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5jdXJyZW50ID0gcHJvamVjdFxuICAgIHJlY2VudFVSTC5hZGQocHJvamVjdC51cmwpXG4gIH1cblxuICBmaW5kSW5kZXgocHJvamVjdCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0udXJsID09IHByb2plY3QudXJsKSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMVxuICB9XG4gIFxuICBvcGVuKHVybCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgodXJsKVxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCh1cmwpXG4gICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICAgIHRoaXMuc2VsZWN0KHByb2plY3QpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByb2plY3QpXG4gICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHNbaW5kZXhdXG4gICAgICB0aGlzLnNlbGVjdChwcm9qZWN0KVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0KVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcm9qZWN0TWFuYWdlciA9IG5ldyBQcm9qZWN0TWFuYWdlclxuXG5leHBvcnQgeyBwcm9qZWN0TWFuYWdlciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gICAgdGhpcy5wYWdlcyA9IFtdXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3Byb2plY3QgZGVzdHJ1Y3RvcicsIHRoaXMudXJsKVxuICAgIFxuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2UuZGVzdHJ1Y3RvcigpXG4gICAgfSlcbiAgfVxuXG4gIGZpbmRJbmRleChwYWdlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wYWdlc1tpXS5waWQgPT0gcGFnZS5waWQpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cbn1cblxuZXhwb3J0IHsgUHJvamVjdCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuY29uc3QgbWF4ID0gMTBcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBSZWNlbnRVUkwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL3JlY2VudC11cmwnKVxuICAgIHRoaXMuZGF0YSA9IChqc29uKSA/IEpTT04ucGFyc2UoanNvbikgOiBbXVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJywganNvbilcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbWVudS51cGRhdGUoKVxuICAgIH0sIDUwMClcbiAgfVxuXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cblxuICBhZGQodXJsKSB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcigodmFsdWUpID0+IHZhbHVlICE9IHVybClcbiAgICB0aGlzLmRhdGEudW5zaGlmdCh1cmwpXG5cbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IG1heCkge1xuICAgICAgdGhpcy5kYXRhLmxlbmd0aCA9IG1heFxuICAgIH1cbiAgICB0aGlzLnNhdmUoKVxuICB9XG59XG5cbmNvbnN0IHJlY2VudFVSTCA9IG5ldyBSZWNlbnRVUkwoKVxuXG5leHBvcnQgeyByZWNlbnRVUkwgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCBxdWlja1pvb21CdXR0b25cbmxldCB6b29tQnV0dG9uXG5sZXQgdW56b29tQnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2NhbGVCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcXVpY2tab29tQnV0dG9uID0gJCgnI3Jvdy1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL21hZ25pZmllci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC5xdWlja1pvb20oKSB9XG4gICAgfSlbMF1cblxuICAgIHpvb21CdXR0b24gPSAkKCcjem9vbS1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3pvb20tYnV0dG9uLnBuZycsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC56b29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICB1bnpvb21CdXR0b24gPSAkKCcjdW56b29tLWJ1dHRvbicpLmltZ0J1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW56b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQudW56b29tKCkgfVxuICAgIH0pWzBdXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBjb25zdCBxdWlja1pvb20gPSAocHJvamVjdCkgPyBwcm9qZWN0LnZpZXcucXVpY2tab29tIDogZmFsc2VcbiAgICBcbiAgICAkKHF1aWNrWm9vbUJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnLCBxdWlja1pvb20pXG4gICAgJCh6b29tQnV0dG9uKS5pbWdCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG4gICAgJCh1bnpvb21CdXR0b24pLmltZ0J1dHRvbignZGlzYWJsZWQnLCAhcXVpY2tab29tKVxuICB9XG59XG5cbmNvbnN0IHNjYWxlQnV0dG9uID0gbmV3IFNjYWxlQnV0dG9uKClcblxuZXhwb3J0IHsgc2NhbGVCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHNob3J0Y3V0RGVmYXVsdCA9IHtcbiAgdW5kbzogWydjb21tYW5kK3onLCAnY3RybCt6JywgJ251bS8nLCAnLCddLFxuICByZWRvOiBbJ2NvbW1hbmQreScsICdjdHJsK3knLCAnbnVtKicsICcuJ10sXG4gIHpvb206IFsnWycsICdxJywgJ251bXBsdXMnXSxcbiAgdW56b29tOiBbJ10nLCAnYScsICdudW1taW51cyddLFxuICB0b2dnbGVUb29sOiBbJ3gnLCAnbnVtLicsICcvJ10sXG5cbiAgb3Blbk5ld0RpYWxvZzogWydjb21tYW5kK24nLCAnYWx0K24nXSxcbiAgb3BlbjogWydjb21tYW5kK28nLCAnYWx0K28nXSxcbiAgY2xvc2U6IFsnY29tbWFuZCt3JywgJ2FsdCt3J10sXG4gIHF1aXQ6IFsnY29tbWFuZCtxJywgJ2FsdCtxJ10sXG4gIHJlbG9hZDogWydjb21tYW5kK3NoaWZ0K3InXSxcblxuICBleHBvcnRDU05GRGlhbG9nOiBbJ2NvbW1hbmQrcCcsICdhbHQrcCddLFxuICBleHBvcnRQREZEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtwJywgJ2FsdCtzaGlmdCtwJ10sXG4gIGltcG9ydFRleHREaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIHNhdmVQYWdlSW1hZ2U6IFsnY29tbWFuZCstJywgJ2FsdCstJ10sXG4gIGV4dHJhY3RUZXh0OiBbJ2NvbW1hbmQrdCcsICdhbHQrdCddLFxuXG4gIC8vbWFyZ2luU2V0dGluZ3NEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIFxuICBwYWdlTGVmdDogJ2xlZnQnLFxuICBwYWdlUmlnaHQ6ICdyaWdodCcsXG4gIHBhZ2VVcDogJ3VwJywgICAgICBcbiAgcGFnZURvd246ICdkb3duJywgIFxuXG4gIHNlbGVjdEFsbDogJ2N0cmwrYScsXG4gIHVuc2VsZWN0OiAnY3RybCtkJyxcbiAgbWVyZ2VUZXh0OiAnY3RybCtlJyxcbiAgXG4gIHNpZGVCYXI6ICdjb21tYW5kK2FsdCtzJyxcbiAgZGV2ZWxvcGVyVG9vbHM6ICdjb21tYW5kK2FsdCtqJyxcbiAgdG9vbEJhcjogJ2NvbW1hbmQrYWx0K2gnLFxuXG4gIHBlbjogJ3AnLFxuICBlcmFzZXI6ICdlJyxcbiAgdGV4dDogJ3QnLFxuXG4gIC8vXG4gIC8vIFBhZ2Ugc2hvcnRjdXRzXG4gIC8vXG4gIFxuICBpbnNlcnRQYWdlOiAnc2hpZnQraScsXG4gIGR1cGxpY2F0ZVBhZ2U6ICdzaGlmdCtkJyxcblxuICBzaG93TWFyZ2luOiAncicsXG4vL2ZsaXBQYWdlOiAnaCcsXG4gIGFwcGVuZFBhZ2U6ICdzaGlmdCthJyxcbiAgY3V0UGFnZTogJ3NoaWZ0K2snLFxuICBwYXN0ZVBhZ2U6ICdzaGlmdCt5JyxcbiAgZW1wdHlQYWdlOiAnc2hpZnQrMCcsXG4gIG1vdmVQYWdlTGVmdDogJzwnLFxuICBtb3ZlUGFnZVJpZ2h0OiAnPicsXG4gIHJvdzE6ICdzaGlmdCsxJyxcbiAgcm93MjogJ3NoaWZ0KzInLFxuICByb3czOiAnc2hpZnQrMycsXG4gIHJvdzQ6ICdzaGlmdCs0JyxcblxuICAvL1xuICAvLyBUZXh0IHNob3J0Y3V0cyAoY2FuIGJlIHVzZWQgd2hpbGUgdGV4dCBlZGl0aW5nKVxuICAvL1xuICBcbiAgdG9nZ2xlRWRpdE1vZGU6ICdjdHJsK2cnLFxuICBhZGRGb250U2l6ZTogJ2N0cmwrLicsXG4gIHN1YnRyYWN0Rm9udFNpemU6ICdjdHJsKywnLFxuICB0b2dnbGVEaXJlY3Rpb246ICdjdHJsK10nLFxuICBjdXRUZXh0OiAnYmFja3NwYWNlJyxcbiAgbmV4dFRleHQ6ICd0YWInLFxuICBwcmV2VGV4dDogJ3NoaWZ0K3RhYicsXG59XG5cbmV4cG9ydCB7IHNob3J0Y3V0RGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuLy9pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXREZWZhdWx0IH0gZnJvbSAnLi9zaG9ydGN1dC1kZWZhdWx0LmVzNidcbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG4vKlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5lczYnXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmVzNidcbiovXG5cbmltcG9ydCB7IHVpIH0gZnJvbSAnLi91aS5lczYnXG5cbmNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cblxuICAgIE1vdXNldHJhcC5hZGRLZXljb2Rlcyh7XG4gICAgICAxMDc6ICdudW1wbHVzJyxcbiAgICAgIDEwOTogJ251bW1pbnVzJyxcbiAgICAgIDExMDogJ251bS4nLFxuICAgICAgMTExOiAnbnVtLycsXG4gICAgICAxMDY6ICdudW0qJyxcbiAgICB9KVxuXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbihlLCBlbGVtZW50LCBjb21ibykge1xuLypcbiAgICAgIGlmIChUZXh0LmlzRWRpdGFibGUoZWxlbWVudCkpIHtcbiAgICAgICAgbG9nKCdrZXljb2RlPScsIGUua2V5Q29kZSwgZSlcblxuXHRpZiAoZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLm1ldGFLZXkpIHtcblx0ICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXHQgIGNhc2UgNzE6ICAvLyBjdHJsK2dcblx0ICBjYXNlIDE4ODogLy8gY3RybCssXG5cdCAgY2FzZSAxOTA6IC8vIGN0cmwrLlxuXHQgIGNhc2UgMjIxOiAvLyBjdHJsK11cblx0ICAgIHJldHVybiBmYWxzZVxuXHQgIH1cblx0fVxuXG5cdGlmIChlLmtleUNvZGUgPT0gOSkgeyAvLyBUQUJcblx0ICByZXR1cm4gZmFsc2Vcblx0fVxuXHRyZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4qL1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9zaG9ydGN1dCcpXG4gICAgdGhpcy5kYXRhID0ganNvbiA/IEpTT04ucGFyc2UoanNvbikgOiBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dERlZmF1bHQpXG4gICAgdGhpcy5iaW5kKClcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvc2hvcnRjdXQnLCBqc29uKVxuICB9XG4gIFxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc2hvcnRjdXREZWZhdWx0KVxuICAgIHRoaXMuc2F2ZSgpXG5cbiAgICBNb3VzZXRyYXAucmVzZXQoKVxuICAgIHRoaXMuYmluZCgpXG4gIH1cblxuICBiaW5kKCkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5kYXRhKSB7XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmRhdGFbaXRlbV1cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kW2l0ZW1dXG5cbiAgICAgIGlmIChpdGVtID09ICdkZXZlbG9wZXJUb29scycpIGNvbnRpbnVlXG5cbiAgICAgIGlmIChoYW5kbGVyKSB7XG5cdGxvZyhgJyR7aXRlbX1gKVxuICAgICAgICBcblx0TW91c2V0cmFwLmJpbmQoa2V5LCAoZSkgPT4ge1xuXHQgIGNvbW1hbmQucHJldiA9IGNvbW1hbmQuY3VycmVudFxuXHQgIGNvbW1hbmQuY3VycmVudCA9IGl0ZW1cblx0ICBsb2coYCoke2l0ZW19KmApXG4gICAgICAgICAgXG5cdCAgaGFuZGxlcigpXG5cdCAgcmV0dXJuICh1aS5kaWFsb2cuaXNPcGVuKCkpID8gdHJ1ZSA6IGZhbHNlXG5cblx0fSwgJ2tleWRvd24nKVxuXG4gICAgICB9IGVsc2Uge1xuXHRsb2coYCcke2l0ZW19Jzogbm8gc3VjaCBjb21tYW5kYClcbiAgICAgIH1cbiAgICB9XG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgQ29udHJvbGxlci5jbGVhck1vdmUoKVxuLy8gICAgcmV0dXJuIGZhbHNlO1xuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnZW50ZXInLCAoZSkgPT4ge1xuLy8gICAgaWYgKHVpLmRpYWxvZy5pc09wZW4oKSkgcmV0dXJuIHRydWVcbi8vICAgIGNvbW1hbmQucXVpY2tab29tKClcbi8vICAgIHJldHVybiBmYWxzZVxuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgaWYgKCFDb250cm9sbGVyLmlzTW92ZWQoKSkge1xuLy9cdGNvbW1hbmQucXVpY2tab29tKCk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSwgJ2tleXVwJylcbiAgfVxufVxuXG5jb25zdCBzaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCgpXG5cbmV4cG9ydCB7IHNob3J0Y3V0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5cbmxldCBtaW5XaWR0aCA9IDE1MFxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFNpZGVCYXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnLnNwbGl0LXBhbmUnKS5zcGxpdFBhbmUoKVxuICAgICQoJy5zcGxpdC1wYW5lJykub24oJ2RpdmlkZXJkcmFnZW5kJywgKGUpID0+IHsgLy8gb3IgJ3NwbGl0cGFuZXJlc2l6ZSdcbiAgICAgIHRoaXMub25EaXZpZGVyRHJhZ0VuZCgpXG4gICAgfSlcbiAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKClcbiAgfVxuICBcbiAgdXBkYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhciA9IHZhbHVlXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgbGV0IHdpZHRoID0gKHZhbHVlKSA/IGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA6IDBcbiAgICBpZiAoY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uID09ICdyaWdodCcpIHtcbiAgICAgIHdpZHRoID0gJCgnLnNwbGl0LXBhbmUnKS53aWR0aCgpIC0gd2lkdGggKyAxXG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgICAgaWYgKHdpZHRoIDwgbWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGhcbiAgICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG4gICAgfVxuICAgICQoJy5zcGxpdC1wYW5lJykuc3BsaXRQYW5lKCdmaXJzdENvbXBvbmVudFNpemUnLCB3aWR0aClcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZSghY29uZmlnLmRhdGEuc2lkZUJhcilcbiAgfVxuXG4gIHVwZGF0ZVBvc2l0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb25cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb24gPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGNvbnN0IG1haW5WaWV3ID0gJCgnLm1haW4tdmlldycpXG4gICAgY29uc3Qgc2lkZUJhciA9ICQoJy5zaWRlLWJhcicpXG5cbiAgICBpZiAodmFsdWUgPT0gJ2xlZnQnKSB7XG4gICAgICAkKCcjbGVmdC1jb21wb25lbnQnKS5hcHBlbmQoc2lkZUJhcilcbiAgICAgICQoJyNyaWdodC1jb21wb25lbnQnKS5hcHBlbmQobWFpblZpZXcpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JpZ2h0LWNvbXBvbmVudCcpLmFwcGVuZChzaWRlQmFyKVxuICAgICAgJCgnI2xlZnQtY29tcG9uZW50JykuYXBwZW5kKG1haW5WaWV3KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIG9uRGl2aWRlckRyYWdFbmQoKSB7XG4gICAgbGV0IHdpZHRoID0gJCgnLnNpZGUtYmFyJykud2lkdGgoKVxuXG4gICAgY29uc3QgbWF4V2lkdGggPSAkKCcuc3BsaXQtcGFuZScpLndpZHRoKCkgLSBtaW5XaWR0aCAtIDFcbiAgICBpZiAod2lkdGggPCBtaW5XaWR0aCkgd2lkdGggPSBtaW5XaWR0aFxuICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG5cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyV2lkdGggPSBwYXJzZUludCh3aWR0aClcbiAgICBjb25maWcuZGF0YS5zaWRlQmFyID0gdHJ1ZVxuICAgIGNvbmZpZy5zYXZlKClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhciA9IG5ldyBTaWRlQmFyKClcblxuZXhwb3J0IHsgc2lkZUJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUZXh0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxufVxuXG5jb25zdCB0ZXh0VmlldyA9IG5ldyBUZXh0VmlldygpXG5cbmV4cG9ydCB7IHRleHRWaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyBzY2FsZUJ1dHRvbiB9IGZyb20gJy4vc2NhbGUtYnV0dG9uLmVzNidcbmltcG9ydCB7IGhpc3RvcnlCdXR0b24gfSBmcm9tICcuL2hpc3RvcnktYnV0dG9uLmVzNidcbmltcG9ydCB7IHRvb2xCdXR0b24gfSBmcm9tICcuL3Rvb2wtYnV0dG9uLmVzNidcbmltcG9ydCB7IG1lbnVCdXR0b24gfSBmcm9tICcuL21lbnUtYnV0dG9uLmVzNidcblxuY2xhc3MgVG9vbEJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzY2FsZUJ1dHRvbi5pbml0KClcbiAgICBoaXN0b3J5QnV0dG9uLmluaXQoKVxuICAgIHRvb2xCdXR0b24uaW5pdCgpXG4gICAgbWVudUJ1dHRvbi5pbml0KClcblxuICAgIHRoaXMudXBkYXRlKClcbiAgICB0aGlzLnVwZGF0ZUJ1dHRvbnMoKVxuICB9XG4gIFxuICB1cGRhdGVCdXR0b25zKCkge1xuICAgIHNjYWxlQnV0dG9uLnVwZGF0ZSgpXG4gICAgaGlzdG9yeUJ1dHRvbi51cGRhdGUoKVxuICAgIHRvb2xCdXR0b24udXBkYXRlKClcbiAgICBtZW51QnV0dG9uLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEudG9vbEJhclxuICAgIGNvbmZpZy5kYXRhLnRvb2xCYXIgPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgICQoJyN0b29sLWJhcicpLmNzcygnZGlzcGxheScsIHZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAkKCcjbWFpbicpLmNzcygnaGVpZ2h0JywgdmFsdWUgPyAnY2FsYygxMDAlIC0gMzdweCknIDogJzEwMCUnKVxuICAgICQoJyNtYWluJykuY3NzKCd0b3AnLCB2YWx1ZSA/ICczN3B4JyA6ICcwJylcblxuICAgIC8vVmlldy5vblJlc2l6ZSgpXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGUoIWNvbmZpZy5kYXRhLnRvb2xCYXIpXG4gIH1cbn1cblxuY29uc3QgdG9vbEJhciA9IG5ldyBUb29sQmFyKCk7XG5cbmV4cG9ydCB7IHRvb2xCYXIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgaHRtbERyb3Bkb3duIH0gZnJvbSAnLi9odG1sLWRyb3Bkb3duLmVzNidcblxubGV0IHBlbkJ1dHRvblxubGV0IGVyYXNlckJ1dHRvblxubGV0IHRleHRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUb29sQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcGVuQnV0dG9uID0gJCgnI3Blbi1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3Blbi1idXR0b24ucG5nJyxcbiAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1nQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3BlbicpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCdwZW5Ecm9wRG93bicsICdwZW4nKVxuICAgIH0pWzBdXG4gICAgXG4gICAgZXJhc2VyQnV0dG9uID0gJCgnI2VyYXNlci1idXR0b24nKS5pbWdCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL2VyYXNlci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1nQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ2VyYXNlcicpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCdlcmFzZXJEcm9wRG93bicsICdlcmFzZXInKVxuICAgIH0pWzBdXG5cbiAgICB0ZXh0QnV0dG9uID0gJCgnI3RleHQtYnV0dG9uJykuaW1nQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy90ZXh0LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWdCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdCgndGV4dCcpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCd0ZXh0RHJvcERvd24nLCAndGV4dCcpXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKHBlbkJ1dHRvbiwgZXJhc2VyQnV0dG9uLCB0ZXh0QnV0dG9uKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG5cbiAgc2VsZWN0KHRvb2wpIHtcbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcpXG4gICAgICBjb25zdCBkcm9wZG93biA9ICQoYnV0dG9uKS5maW5kKCcuZHJvcGRvd24tY29udGVudCcpWzBdXG4gICAgICBcbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkLmluZGV4T2YodG9vbCkgPT0gMCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWdCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1nQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCB0b29sQnV0dG9uID0gbmV3IFRvb2xCdXR0b24oKVxuXG5leHBvcnQgeyB0b29sQnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyB3aWRnZXQgfSBmcm9tICcuL3dpZGdldC5lczYnXG5pbXBvcnQgeyB0b29sQmFyIH0gZnJvbSAnLi90b29sLWJhci5lczYnXG5pbXBvcnQgeyBzaWRlQmFyIH0gZnJvbSAnLi9zaWRlLWJhci5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1lbnUgPSBtZW51XG4gICAgdGhpcy5kaWFsb2cgPSBkaWFsb2dcbiAgICB0aGlzLnRvb2xCYXIgPSB0b29sQmFyXG4gICAgdGhpcy5zaWRlQmFyID0gc2lkZUJhclxuICB9XG4gIFxuICBpbml0KCkge1xuICAgIG1lbnUuaW5pdCgpXG4gICAgZGlhbG9nLmluaXQoKVxuICAgIHRvb2xCYXIuaW5pdCgpXG4gICAgc2lkZUJhci5pbml0KClcbiAgICBcbiAgICAkKCcuc3BsaXQtcGFuZScpLmNzcygnb3BhY2l0eScsIDEpXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdG9vbEJhci51cGRhdGUoKVxuICAgIHNpZGVCYXIudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCB1aSA9IG5ldyBVSSgpXG5cbmV4cG9ydCB7IHVpIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBXaWRnZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXRJbWdCdXR0b24oKVxuICB9XG5cbiAgaW5pdEltZ0J1dHRvbigpIHtcbiAgICAkLndpZGdldCgnbmFtZW5vdGUuaW1nQnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICB3aWR0aDogJzI0cHgnLFxuICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgXG4gICAgICBfY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdpbWctYnV0dG9uJylcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoJHt0aGlzLm9wdGlvbnMuc3JjfSlgKVxuXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2Zsb2F0JywgdGhpcy5vcHRpb25zLmZsb2F0KVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCd3aWR0aCcsIHRoaXMub3B0aW9ucy53aWR0aClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnaGVpZ2h0JywgdGhpcy5vcHRpb25zLmhlaWdodClcbiAgICAgICAgdGhpcy5sb2NrZWQodGhpcy5vcHRpb25zLmxvY2tlZClcbiAgICAgICAgdGhpcy5kaXNhYmxlZCh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpXG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50KSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50WzBdLmFwcGVuZENoaWxkKHRoaXMub3B0aW9ucy5jb250ZW50KVxuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudFxuICAgICAgICAgIFxuICAgICAgICAgIGNvbnRlbnQudGl0bGUgPSBcIlwiXG4gICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5mbG9hdCA9PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLnJpZ2h0ID0gXCIwXCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGljayA9IHRoaXMub3B0aW9ucy5jbGlja1xuICAgICAgICBpZiAoY2xpY2spIHRoaXMuZWxlbWVudC5vbignY2xpY2snLCBjbGljaylcbiAgICAgIH0sXG5cbiAgICAgIGxvY2tlZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnMubG9ja2VkXG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmxvY2tlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuXHQgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfSBlbHNlIHtcblx0ICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGRpc2FibGVkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXNhYmxlZFxuICAgICAgXG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXNhYmxlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuXHQgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnb2ZmJylcbiAgICAgICAgfSBlbHNlIHtcblx0ICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ29mZicpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KClcblxuZXhwb3J0IHsgd2lkZ2V0IH1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGljdGlvbmFyeSA9IHtcbiAgXCJqYVwiOiB7XG4gICAgXCJOYW1lbm90ZVwiOiBcIk5hbWVub3RlXCIsXG4gICAgXCJBYm91dCBOYW1lbm90ZVwiOiBcIk5hbWVub3RlIOOBq+OBpOOBhOOBplwiLFxuICAgIFwiQWJvdXQgTmFtZW5vdGUgLi4uXCI6IFwiTmFtZW5vdGUg44Gr44Gk44GE44GmIC4uLlwiLFxuICAgIFwiSGVscFwiOiBcIuODmOODq+ODl1wiLFxuICAgIFwiU2V0dGluZ3NcIjogXCLnkrDlooPoqK3lrppcIixcbiAgICBcIlNldHRpbmdzIC4uLlwiOiBcIueSsOWig+ioreWumiAuLi5cIixcbiAgICBcIlRhYmxldCBTZXR0aW5nc1wiOiBcIuethuWcp+iqv+aVtFwiLFxuICAgIFwiVGFibGV0IFNldHRpbmdzIC4uLlwiOiBcIuethuWcp+iqv+aVtCAuLi5cIixcbiAgICBcIlF1aXQgTmFtZW5vdGVcIjogXCJOYW1lbm90ZSDjgpLntYLkuoZcIixcbiAgICBcIk5vdGVcIjogXCLjg47jg7zjg4hcIixcbiAgICBcIkZpbGVcIjogXCLjg5XjgqHjgqTjg6tcIixcbiAgICBcIk9wZW4gLi4uXCI6IFwi6ZaL44GPIC4uLlwiLFxuICAgIFwiT3BlblwiOiBcIuODjuODvOODiOOCkumWi+OBj1wiLFxuICAgIFwiTmV3IC4uLlwiOiBcIuaWsOimjyAuLi5cIixcbiAgICBcIk5ld1wiOiBcIuaWsOimj+ODjuODvOODiFwiLFxuICAgIFwiQ2xvc2VcIjogXCLplonjgZjjgotcIixcbiAgICBcIkNsb3NlIEFsbFwiOiBcIuOBmeOBueOBpuOCkumWieOBmOOCi1wiLFxuICAgIFwiTm90ZSBTZXR0aW5ncyAuLi5cIjogXCLjg47jg7zjg4joqK3lrpogLi4uXCIsXG4gICAgXCJFeHBvcnRcIjogXCLmm7jjgY3lh7rjgZdcIixcbiAgICBcIkltcG9ydFwiOiBcIuiqreOBv+i+vOOBv1wiLFxuICAgIFwiLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLlwiOiBcIi5jc25mIChDTElQIFNUVURJTyDjg43jg7zjg6Djg5XjgqHjgqTjg6spIC4uLlwiLFxuICAgIFwiLnBkZiAoUERGKSAuLi5cIjogXCIucGRmIChQREYpIC4uLlwiLFxuICAgIFwiLnR4dCAoUGxhaW4gVGV4dCkgLi4uXCI6IFwiLnR4dCAo44OG44Kt44K544OI44OV44Kh44Kk44OrKSAuLi5cIixcbiAgICBcIlNhdmVcIjogXCLkv53lrZhcIixcbiAgICBcIlNhdmUgQXMgLi4uXCI6IFwi5ZCN5YmN44KS44Gk44GR44Gm5L+d5a2YIC4uLlwiLFxuICAgIFwiU2F2ZSBBc1wiOiBcIuWQjeWJjeOCkuOBpOOBkeOBpuS/neWtmFwiLFxuICAgIFwiU2F2ZSBTbmFwc2hvdCBBcyAuLi5cIjogXCLjgrnjg4rjg4Pjg5fjgrfjg6fjg4Pjg4jjgpLkv53lrZggLi4uXCIsXG4gICAgXCJFZGl0XCI6IFwi57eo6ZuGXCIsXG4gICAgXCJVbmRvXCI6IFwi5Y+W44KK5raI44GXXCIsXG4gICAgXCJSZWRvXCI6IFwi44KE44KK55u044GXXCIsXG4gICAgXCJDdXRcIjogXCLliIfjgorlj5bjgopcIixcbiAgICBcIkNvcHlcIjogXCLjgrPjg5Tjg7xcIixcbiAgICBcIlBhc3RlXCI6IFwi6LK844KK5LuY44GRXCIsXG4gICAgXCJTZWxlY3QgQWxsXCI6IFwi44GZ44G544Gm44KS6YG45oqeXCIsXG5cbiAgICBcIlBhZ2VcIjogXCLjg5rjg7zjgrhcIixcbiAgICBcIkFkZFwiOiBcIui/veWKoFwiLFxuICAgIFwiTW92ZSB0byBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgavlhaXjgozjgotcIixcbiAgICBcIlB1dCBCYWNrIGZyb20gQnVmZmVyXCI6IFwi44OQ44OD44OV44Kh44GL44KJ5oi744GZXCIsXG4gICAgXCJFbXB0eSBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgpLnqbrjgavjgZnjgotcIixcbiAgICBcIkR1cGxpY2F0ZVwiOiBcIuikh+ijveOCkui/veWKoFwiLFxuICAgIFwiTW92ZSBGb3J3YXJkXCI6IFwi5YmN44Gr56e75YuVXCIsXG4gICAgXCJNb3ZlIEJhY2t3YXJkXCI6IFwi5b6M44KN44Gr56e75YuVXCIsXG4gICAgXCJGbGlwXCI6IFwi5bem5Y+z5Y+N6Lui44GX44Gm6KGo56S6XCIsXG4gICAgXCJTYXZlIEltYWdlIEFzIC4uLlwiOiBcIuOCpOODoeODvOOCuOOCkuS/neWtmCAuLi5cIixcbiAgICBcIlNhdmUgSW1hZ2VcIjogXCLjgqTjg6Hjg7zjgrjjgpLkv53lrZhcIixcbiAgICBcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJWaWV3XCI6IFwi6KGo56S6XCIsXG4gICAgXCJUb29sIEJhclwiOiBcIuODhOODvOODq+ODkOODvFwiLFxuICAgIFwiU2lkZSBCYXJcIjogXCLjgrXjgqTjg4njg5Djg7xcIixcbiAgICBcIkRldmVsb3BlciBUb29sc1wiOiBcIuODh+ODmeODreODg+ODkeODvCDjg4Tjg7zjg6tcIixcbiAgICBcIkZ1bGwgU2NyZWVuXCI6IFwi44OV44Or44K544Kv44Oq44O844OzXCIsXG4gICAgXCJQYWdlIE1hcmdpblwiOiBcIuS9meeZvVwiLFxuICAgIFwiTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3dcIjogXCIx6KGM44GC44Gf44KK44Gu44Oa44O844K45pWwXCIsXG4gICAgXG4gICAgXCJXaW5kb3dcIjogXCLjgqbjgqPjg7Pjg4njgqZcIixcbiAgICBcIkV4dHJhY3QgVGV4dFwiOiBcIuODhuOCreOCueODiOOCkuaKveWHulwiLFxuICAgIFwiT3BlbiBSZWNlbnRcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjgpLplovjgY9cIixcbiAgICBcIkNsZWFyIFJlY2VudCBOb3RlIExpc3RcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjga7jg6rjgrnjg4jjgpLmtojljrtcIixcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJNYWtpbmcgQ1NORiAuLi5cIjogXCJDU05G44OV44Kh44Kk44Or44KS5L2c5oiQ5LitIC4uLlwiLFxuICAgIFwiT25saW5lIFN0b3JhZ2VcIjogXCLjgqrjg7Pjg6njgqTjg7Pjgrnjg4jjg6zjg7zjgrhcIixcblxuICAgIFwiU1wiOiBcIuWwj1wiLFxuICAgIFwiTVwiOiBcIuS4rVwiLFxuICAgIFwiTFwiOiBcIuWkp1wiLFxuICAgIFwiUHJlc3N1cmVcIjogXCLnrYblnKdcIixcbiAgICBcIlZlcnRpY2FsXCI6IFwi57im5pu444GNXCIsXG4gICAgXCJIb3Jpem9udGFsXCI6IFwi5qiq5pu444GNXCIsXG5cbiAgICBcIk5ldyBub3RlYm9va1wiOiBcIuaWsOimj+ODjuODvOODiFwiLFxuICAgIFwiTm90ZWJvb2sgbmFtZVwiOiBcIuODjuODvOODiOWQjVwiLFxuICAgIFwiRm9sZGVyXCI6IFwi5L+d5a2Y5YWIXCIsXG4gICAgXCJDaG9vc2UgZm9sZGVyLi4uXCI6IFwi5Y+C54WnLi4uXCIsXG4gICAgXCJOdW1iZXIgb2YgcGFnZXNcIjogXCLjg5rjg7zjgrjmlbBcIixcbiAgICBcIlRlbXBsYXRlXCI6IFwi44OG44Oz44OX44Os44O844OIXCIsXG4gICAgXCJNYW5nYVwiOiBcIua8q+eUu1wiLFxuICAgIFwiQmluZGluZyBwb2ludFwiOiBcIue2tOOBmOOCi+S9jee9rlwiLFxuICAgIFwiTGVmdCBiaW5kaW5nXCI6IFwi5bem57a044GY44CAXCIsXG4gICAgXCJSaWdodCBiaW5kaW5nXCI6IFwi5Y+z57a044GY44CAXCIsXG4gICAgXCJTdGFydCBwYWdlXCI6IFwi6ZaL5aeL44Oa44O844K4XCIsXG4gICAgXCJGcm9tIGxlZnRcIjogXCLlt6bjg5rjg7zjgrhcIixcbiAgICBcIkZyb20gcmlnaHRcIjogXCLlj7Pjg5rjg7zjgrhcIixcbiAgICBcIlBhZ2VzXCI6IFwi44Oa44O844K4XCIsXG4gICAgXCJBbGxcIjogXCLjgZnjgbnjgaZcIixcbiAgICBcIkN1cnJlbnQgcGFnZVwiOiBcIumBuOaKnuOBleOCjOOBn+ODmuODvOOCuFwiLFxuICAgIFwiUmFuZ2VcIjogXCLnr4Tlm7LmjIflrppcIixcbiAgICBcIlNjYWxlXCI6IFwi5ouh5aSnL+e4ruWwj1wiLFxuICAgIFwiQ3VzdG9tXCI6IFwi44Kr44K544K/44OgXCIsXG4gICAgXCJUZXh0IGNvbG9yXCI6IFwi44OG44Kt44K544OI44Gu6ImyXCIsXG4gICAgXCIxMDAlXCI6IFwiQjXllYbmpa3oqoznlKgoQjTjgrXjgqTjgrrljp/nqL/nlKjntJkvQTTku5XkuIrjgYzjgoopXCIsXG4gICAgXCI4MiVcIjogXCJBNeWQjOS6uuiqjOeUqChBNOOCteOCpOOCuuWOn+eov+eUqOe0mS9CNeS7leS4iuOBjOOCiilcIixcbiAgICBcIk5hbWUgY2hhbmdlciBjb21wYXRpYmxlXCI6IFwi44K544OI44O844Oq44O844Ko44OH44Kj44K/55So44ON44O844Og44OB44Kn44Oz44K444Oj44O85LqS5o+bXCIsXG5cbiAgICBcIkV4cG9ydCBDTElQIFNUVURJTyBTdG9yeWJvYXJkXCI6IFwiQ0xJUCBTVFVESU8g44ON44O844Og5pu444GN5Ye644GXXCIsXG4gICAgXCJFeHBvcnQgUERGXCI6IFwiUERG5pu444GN5Ye644GXXCIsXG4gICAgXCJJbXBvcnQgUGxhaW4gVGV4dFwiOiBcIuODhuOCreOCueODiOiqreOBv+i+vOOBv1wiLFxuICAgIFwiUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdFwiOiBcIuWIneacn+ioreWumuOBq+aIu+OBmVwiLFxuXG4gICAgXCJGaWxlIG5hbWVcIjogXCLjg5XjgqHjgqTjg6vlkI1cIixcbiAgICBcIkR1cGxpY2F0ZSBub3RlIG5hbWUuXCI6IFwi5ZCM44GY5ZCN5YmN44Gu44OO44O844OI44GM44GC44KK44G+44GZ44CCXCIsXG4gICAgXCJEdXBsaWNhdGUgZmlsZSBuYW1lLlwiOiBcIuWQjOOBmOWQjeWJjeOBruODleOCoeOCpOODq+OBjOOBguOCiuOBvuOBmeOAglwiLFxuICAgIFwiRmlsZSBub3QgZm91bmQuXCI6IFwi44OV44Kh44Kk44Or44GM6KaL44Gk44GL44KK44G+44Gb44KT44CCXCIsXG4gICAgXCJTYXZlIGVycm9yLlwiOiBcIuOCu+ODvOODluOBp+OBjeOBvuOBm+OCk+OAglwiLFxuICAgIFwiU2VsZWN0IGZpbGUgdG8gaW1wb3J0XCI6IFwi6Kqt44G/6L6844KA44OV44Kh44Kk44Or44KS6YG45oqe44GX44Gm44GP44Gg44GV44GEXCIsXG4gICAgXCJDb21wcmVzc2luZ1wiOiBcIuWcp+e4ruS4rVwiLFxuICAgIFwiUmVuZGVyaW5nXCI6IFwi5L2c5oiQ5LitXCIsXG5cbiAgICBcIkZvcm1hdFwiOiBcIuODleOCqeODvOODnuODg+ODiFwiLFxuICAgIFwiTGluZSBzZXBhcmF0b3JcIjogXCLmlLnooYxcIixcbiAgICBcIkJhbGxvb24gc2VwYXJhdG9yXCI6IFwi5pS544K744Oq44OVXCIsXG4gICAgXCJQYWdlIHNlcGFyYXRvclwiOiBcIuaUueODmuODvOOCuFwiLFxuICAgIFwiQ29tbWVudCBrZXlcIjogXCLjgrPjg6Hjg7Pjg4hcIixcbiAgICBcIkNob29zZSBmaWxlLi4uXCI6IFwi44OV44Kh44Kk44Or44KS6YG45oqeLi4uXCIsXG4gICAgXG4gICAgXCJUcmlhbFwiOiBcIuippueUqOeJiFwiLFxuICAgIFwiV2VsY29tZSB0byB0aGUgdHJpYWwgdmVyc2lvbiBvZiBOYW1lbm90ZS5cXG5Zb3UgaGF2ZSBcIjogXCLjgYLjgahcIixcbiAgICBcIiBkYXkocykgbGVmdC5cIjogXCLml6XjgZDjgonjgYToqabnlKjjgafjgY3jgb7jgZnjgIJcXG7jgYLjgorjgYzjgajjgYbjgZTjgZbjgYTjgb7jgZnvvIFcIiwgXG4gICAgXCJXZSdyZSBzb3JyeSwgYnV0IHlvdXIgdHJpYWwgcGVyaW9kIGhhcyBleHBpcmVkLlwiOiBcIuippueUqOacn+mWk+e1guS6huOBl+OBvuOBl+OBn+OAglxcbuOBguOCiuOBjOOBqOOBhuOBlOOBluOBhOOBvuOBl+OBn++8gVwiLCBcblxuICAgIFwiWm9vbSBzbWFsbCB0ZXh0cyBvbiBpbnB1dFwiOiBcIuWwj+OBleOBhOODhuOCreOCueODiOOCkue3qOmbhuOBmeOCi+OBqOOBjeOBr+aLoeWkp+ihqOekuuOBmeOCi1wiLFxuICAgIFwiVXNlIFF1aWNrbGluZVwiIDogXCLplbfmirzjgZfjgafnm7Tnt5rjg4Tjg7zjg6vjgavliIfjgormm7/jgYjjgotcIixcbiAgICBcIkRpc2FibGUgd2ludGFiIGRyaXZlclwiOiBcIldpbnRhYuODieODqeOCpOODkOOCkuS9v+OCj+OBquOBhFwiLFxuICAgIFwiRGlzYWJsZSBtb3VzZSB3aGVlbCBzY3JvbGxcIjogXCLjg57jgqbjgrnjg5vjgqTjg7zjg6vjgafjgrnjgq/jg63jg7zjg6vjgZfjgarjgYRcIixcbiAgICBcIkNsaWNrIE9LIHRvIHJlc3RvcmUgZGVmYXVsdCBzZXR0aW5ncy5cIjogXCLjg4fjg5Xjgqnjg6vjg4jjga7oqK3lrprjgavmiLvjgZfjgb7jgZlcIixcbiAgICBcIlBlbiBwcmVzc3VyZVwiOiBcIuethuWcp1wiLFxuICAgIFwiT3V0cHV0XCI6IFwi5Ye65YqbXCIsXG4gICAgXG4gICAgXCJFbmFibGUgSmFwYW5lc2UgT3B0aW9uc1wiOiBcIuaXpeacrOiqnueUqOOBruOCquODl+OCt+ODp+ODs+OCkuacieWKueOBq+OBmeOCi1wiXG4gIH1cbn1cblxuZXhwb3J0cy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeVxuIl19
