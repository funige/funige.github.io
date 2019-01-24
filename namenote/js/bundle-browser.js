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

},{"./dialog.es6":6,"./locale.es6":11,"./namenote.es6":16}],2:[function(require,module,exports){
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

},{"./locale.es6":11,"./namenote.es6":16}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = void 0;

var _namenote = require("./namenote.es6");

var _dialog = require("./dialog.es6");

var _aboutDialog = require("./about-dialog.es6");

var _divider = require("./divider.es6");

var _toolButton = require("./tool-button.es6");

var _sideBarTab = require("./side-bar-tab.es6");

var _projectManager = require("./project-manager.es6");

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

      _divider.divider.toggle();
    }
  }, {
    key: "showPageView",
    value: function showPageView() {
      $('.page-view').show();
      $('.text-view').hide();

      _sideBarTab.sideBarTab.select('page');
    }
  }, {
    key: "showTextView",
    value: function showTextView() {
      $('.page-view').hide();
      $('.text-view').show();

      _sideBarTab.sideBarTab.select('text');
    }
  }, {
    key: "openDialog",
    value: function openDialog() {
      if (_namenote.namenote.app) {
        _namenote.namenote.app.openDialog().then(function (url) {
          warn("open '".concat(url, "'..."));

          _projectManager.projectManager.open(url);
        }).then(function (project) {//warn('project=', project)
        }).catch(function (error) {
          if (error) {
            _namenote.namenote.app.showMessageBox({
              type: 'error',
              message: error
            });
          }
        });
      }
    }
  }, {
    key: "openNewDialog",
    value: function openNewDialog() {
      warn('open new dialog..');
    }
  }, {
    key: "close",
    value: function close() {
      _projectManager.projectManager.close();
    }
  }, {
    key: "zoom",
    value: function zoom() {
      log('zoom');
    }
  }, {
    key: "unzoom",
    value: function unzoom() {
      log('unzoom');
    }
  }, {
    key: "dockLeft",
    value: function dockLeft() {
      _divider.divider.setPosition('left');
    }
  }, {
    key: "dockRight",
    value: function dockRight() {
      _divider.divider.setPosition('right');
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

},{"./about-dialog.es6":1,"./dialog.es6":6,"./divider.es6":7,"./namenote.es6":16,"./project-manager.es6":19,"./side-bar-tab.es6":25,"./tool-button.es6":30}],4:[function(require,module,exports){
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
exports.divider = void 0;

var _config = require("./config.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var minWidth = 180; ////////////////////////////////////////////////////////////////

var Divider =
/*#__PURE__*/
function () {
  function Divider() {
    _classCallCheck(this, Divider);
  }

  _createClass(Divider, [{
    key: "init",
    value: function init() {
      var _this = this;

      $('.split-pane').splitPane();
      $('.split-pane').on('dividerdragend', function (e) {
        // or 'splitpaneresize'
        _this.onDividerDragEnd();
      });
      this.setPosition();
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
    key: "setPosition",
    value: function setPosition(value) {
      if (value == undefined) value = _config.config.data.sideBarPosition;
      _config.config.data.sideBarPosition = value;

      _config.config.save();

      var main = $('.main');
      var sideBar = $('.sidebar');

      if (value == 'left') {
        $('#left-component').append(sideBar);
        $('#right-component').append(main);
      } else {
        $('#right-component').append(sideBar);
        $('#left-component').append(main);
      }

      this.update();
    }
  }, {
    key: "onDividerDragEnd",
    value: function onDividerDragEnd() {
      var width = $('.sidebar').width();
      var maxWidth = $('.split-pane').width() - minWidth - 1;
      if (width < minWidth) width = minWidth;
      if (width > maxWidth) width = maxWidth;
      _config.config.data.sideBarWidth = parseInt(width);
      _config.config.data.sideBar = true;

      _config.config.save();

      this.update();
    }
  }]);

  return Divider;
}();

var divider = new Divider();
exports.divider = divider;

},{"./config.es6":5}],8:[function(require,module,exports){
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
      undoButton = $('#undo-button').imageButton({
        src: 'img/undo-button.png',
        float: 'left',
        disabled: true,
        click: function click(e) {
          _command.command.undo();
        }
      })[0];
      redoButton = $('#redo-button').imageButton({
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
        $(undoButton).imageButton('disabled', !hasUndo);
        $(redoButton).imageButton('disabled', !hasRedo); //    Menu.updateHistory()
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
            buttons[id].imageButton('locked', false);
          }
        }.bind(this)
      });
      $(menu).on('menufocus', function () {
        clearTimeout(timers[id]);
      });
      $(menu).on('menublur', function () {
        if (!buttons[id].imageButton('locked')) return;
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

        buttons[id].imageButton('locked', false);
      }, 500);
    } ////////////////

  }, {
    key: "update",
    value: function update(element) {
      var menu = element.childNodes[0];
      var id = element.id.replace(/-.*$/, ''); //  warn('[html menu update]', id)

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

},{"../js/lib/dictionary.js":33}],12:[function(require,module,exports){
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
      element = $('.main')[0];

      for (var j = 0; j < 100; j++) {
        for (var i = 0; i < 10; i++) {
          var page = document.createElement('div');
          page.style.width = pageWidth + "px";
          page.style.height = pageHeight + "px";
          page.style.backgroundColor = "white";
          page.style.outline = "1px solid rgba(0,0,0,0.3)";
          var x = i * (pageWidth + 50) + 50;
          var y = j * (pageHeight + 50) + 50;
          page.style.position = 'absolute';
          page.style.left = x + "px";
          page.style.top = y + "px";
          page.style.transformOrigin = "top left";
          page.style.transform = "scale(1.0)";
          var pageNumber = document.createElement('div');
          pageNumber.innerHTML = j * 10 + i + 1 + "ページ";
          pageNumber.style.fontSize = '12px'; // 11px以下は変わらない

          pageNumber.style.position = 'absolute';
          pageNumber.style.left = pageWidth / 2 + 'px';
          pageNumber.style.top = pageHeight + 20 + 'px';
          page.appendChild(pageNumber);
          element.appendChild(page);
        }
      }
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "setProject",
    value: function setProject(project) {
      this.project = project;

      if (project) {} else {}

      this.update();
    }
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
var otherButton;
var sidebarButton; ////////////////////////////////////////////////////////////////

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
      fileButton = $('#file-menu-button').imageButton({
        src: 'img/file-button.png',
        float: 'left',
        click: function (e) {
          this.select(e);
        }.bind(this),
        content: _htmlMenu.htmlMenu.make(_menuTemplate.fileMenuTemplate, 'file')
      })[0];
      otherButton = $('#other-menu-button').imageButton({
        src: 'img/menu-button.png',
        float: 'right',
        click: function (e) {
          this.select(e);
        }.bind(this),
        content: _htmlMenu.htmlMenu.make(_menuTemplate.otherMenuTemplate, 'other')
      })[0];
      sidebarButton = $('#sidebar-menu-button').imageButton({
        src: 'img/menu-button.png',
        float: 'right',
        click: function (e) {
          this.select(e);
        }.bind(this),
        content: _htmlMenu.htmlMenu.make(_menuTemplate.sidebarMenuTemplate, 'sidebar'),
        contentParent: $('body')[0]
      })[0];
      this.buttons.push(fileButton, otherButton, sidebarButton);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "select",
    value: function select(e) {
      if (e.target.className.indexOf('img-button') < 0) return;
      if ($(e.target).imageButton('disabled')) return;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          var locked = $(button).imageButton('locked');
          var instance = $(button).imageButton('instance');
          var dropdown = instance.options.content;

          if (button && button.id == e.target.id) {
            if (!locked) {
              _htmlMenu.htmlMenu.update(dropdown);

              $(button).imageButton('locked', true);

              if (instance.options.contentParent) {
                instance.updateContentPosition();
              }

              _htmlMenu.htmlMenu.open(dropdown);
            } else {
              $(button).imageButton('locked', false);

              _htmlMenu.htmlMenu.close(dropdown);
            }
          } else {
            if (locked) {
              $(button).imageButton('locked', false);

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
exports.sidebarMenuTemplate = exports.otherMenuTemplate = exports.fileMenuTemplate = exports.menuTemplate = void 0;
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
    click: 'openDialog'
  }, {
    label: 'Open Recent',
    submenu: []
  }, {
    type: 'separator'
  }, {
    label: 'Close',
    accelerator: "CmdOrCtrl+W",
    click: 'close'
  }, //    { label: 'Close All', click: 'closeAll' },
  //    { type: 'separator' },
  //    { label: 'Note Settings ...', click: 'noteSettings' },
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
    label: 'Zoom In',
    accelerator: '[',
    click: 'zoom'
  }, {
    label: 'Zoom Out',
    accelerator: ']',
    click: 'unzoom'
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
  click: 'openDialog'
}, {
  type: 'separator'
}];
exports.fileMenuTemplate = fileMenuTemplate;
var otherMenuTemplate = [{
  label: 'Note',
  submenu: [{
    label: 'Close',
    accelerator: "CmdOrCtrl+W",
    click: 'close'
  }, //    { label: 'Close All', click: 'closeAll' },
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
    label: 'Zoom In',
    accelerator: '[',
    click: 'zoom'
  }, {
    label: 'Zoom Out',
    accelerator: ']',
    click: 'unzoom'
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
var sidebarMenuTemplate = [{
  label: 'サイドバーの位置',
  submenu: [{
    label: '左',
    click: 'dockLeft'
  }, {
    label: '右',
    click: 'dockRight'
  }]
}];
exports.sidebarMenuTemplate = sidebarMenuTemplate;

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

},{"./command.es6":3,"./config.es6":5,"./main-view.es6":12,"./page-view.es6":17,"./project-manager.es6":19,"./recent-url.es6":21,"./shortcut.es6":24,"./text-view.es6":27,"./ui.es6":31}],17:[function(require,module,exports){
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

var _project = require("./project.es6");

var _recentUrl = require("./recent-url.es6");

var _menu = require("./menu.es6");

var _title = require("./title.es6");

var _mainView = require("./main-view.es6");

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
      if (project) {
        var index = this.findIndex(project.url);

        if (index < 0) {
          this.projects.push(project);
        }

        _recentUrl.recentURL.add(project.url);
      }

      this.current = project;

      _mainView.mainView.setProject(project);

      _title.title.set(project ? project.name() : null);

      _menu.menu.update();
    }
  }, {
    key: "findIndex",
    value: function findIndex(url) {
      for (var i = 0; i < this.projects.length; i++) {
        if (this.projects[i].url == url) {
          return i;
        }
      }

      return -1;
    }
  }, {
    key: "open",
    value: function open(url) {
      var index = this.findIndex(url);
      var project = index >= 0 ? this.projects[index] : new _project.Project(url);
      this.select(project);
      return Promise.resolve(project);
    }
  }, {
    key: "close",
    value: function close(project) {
      warn('[close]', project);
      if (!project) project = this.current;
      if (!project) return;
      var index = this.findIndex(project.url);

      if (index >= 0) {
        this.projects.splice(index, 1);

        if (project == this.current) {
          this.select(this.projects[this.projects.length - 1]);
        }

        project.destructor();
      }
    }
  }]);

  return ProjectManager;
}();

var projectManager = new ProjectManager();
exports.projectManager = projectManager;

},{"./main-view.es6":12,"./menu.es6":15,"./project.es6":20,"./recent-url.es6":21,"./title.es6":28}],20:[function(require,module,exports){
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
  }, {
    key: "name",
    value: function name() {
      return this.url ? this.url.replace(/^.*\//, '') : T('Untitled');
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
    }
  }, {
    key: "resetStorage",
    value: function resetStorage() {
      this.data = [];
      this.save(); //  setTimeout(() => {

      _menu.menu.update(); //  }, 500)

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
      quickZoomButton = $('#row-button').imageButton({
        src: 'img/magnifier-button.png',
        float: 'right',
        click: function click(e) {
          _command.command.quickZoom();
        }
      })[0];
      zoomButton = $('#zoom-button').imageButton({
        src: 'img/zoom-button.png',
        disabled: true,
        float: 'right',
        click: function click(e) {
          _command.command.zoom();
        }
      })[0];
      unzoomButton = $('#unzoom-button').imageButton({
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
      $(quickZoomButton).imageButton('locked', quickZoom);
      $(zoomButton).imageButton('disabled', !project);
      $(unzoomButton).imageButton('disabled', !quickZoom);
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
  openDialog: ['command+o', 'alt+o'],
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

},{"./command.es6":3,"./shortcut-default.es6":23,"./ui.es6":31}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideBarTab = void 0;

var _command = require("./command.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var pageButton;
var textButton; ////////////////////////////////////////////////////////////////

var SideBarTab =
/*#__PURE__*/
function () {
  function SideBarTab() {
    _classCallCheck(this, SideBarTab);

    this.buttons = [];
  }

  _createClass(SideBarTab, [{
    key: "init",
    value: function init() {
      pageButton = $('#page-view-button').textButton({
        text: T('Pages'),
        locked: true,
        click: function (e) {
          if ($(e.target).textButton('instance')) {
            _command.command.showPageView();
          }
        }.bind(this)
      })[0];
      textButton = $('#text-view-button').textButton({
        text: T('Texts'),
        click: function (e) {
          if ($(e.target).textButton('instance')) {
            _command.command.showTextView();
          }
        }.bind(this)
      })[0];
      this.buttons.push(pageButton, textButton);
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "select",
    value: function select(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          var locked = $(button).textButton('locked');

          if (button && button.id.indexOf(name) == 0) {
            if (!locked) {
              $(button).textButton('locked', true);
            }
          } else {
            if (locked) {
              $(button).textButton('locked', false);
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

  return SideBarTab;
}();

var sideBarTab = new SideBarTab();
exports.sideBarTab = sideBarTab;

},{"./command.es6":3}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideBar = void 0;

var _sideBarTab = require("./side-bar-tab.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var SideBar =
/*#__PURE__*/
function () {
  function SideBar() {
    _classCallCheck(this, SideBar);
  }

  _createClass(SideBar, [{
    key: "init",
    value: function init() {
      _sideBarTab.sideBarTab.init();
    }
  }, {
    key: "update",
    value: function update(value) {
      _sideBarTab.sideBarTab.update();
    }
  }]);

  return SideBar;
}();

var sideBar = new SideBar();
exports.sideBar = sideBar;

},{"./side-bar-tab.es6":25}],27:[function(require,module,exports){
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

},{"./namenote.es6":16}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title = void 0;

var _namenote = require("./namenote.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Title =
/*#__PURE__*/
function () {
  function Title() {
    _classCallCheck(this, Title);
  }

  _createClass(Title, [{
    key: "init",
    value: function init() {
      this.set();
    }
  }, {
    key: "set",
    value: function set(title) {
      if (!title) {
        title = _namenote.namenote.trial ? "".concat(T('Namenote'), " ").concat(T('Trial')) : T('Namenote');
      }

      if (_namenote.namenote.app) {
        _namenote.namenote.app.setTitle(title);
      } else {
        document.title = title;
      }
    }
  }]);

  return Title;
}();

var title = new Title();
exports.title = title;

},{"./namenote.es6":16}],29:[function(require,module,exports){
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

      $('#toolbar').css('display', value ? 'block' : 'none');
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

},{"./config.es6":5,"./history-button.es6":8,"./menu-button.es6":13,"./scale-button.es6":22,"./tool-button.es6":30}],30:[function(require,module,exports){
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
      penButton = $('#pen-button').imageButton({
        src: 'img/pen-button.png',
        locked: true,
        float: 'left',
        click: function (e) {
          if ($(e.target).imageButton('instance')) {
            this.select('pen');
          }
        }.bind(this),
        content: _htmlDropdown.htmlDropdown.make('penDropDown', 'pen')
      })[0];
      eraserButton = $('#eraser-button').imageButton({
        src: 'img/eraser-button.png',
        float: 'left',
        click: function (e) {
          if ($(e.target).imageButton('instance')) {
            this.select('eraser');
          }
        }.bind(this),
        content: _htmlDropdown.htmlDropdown.make('eraserDropDown', 'eraser')
      })[0];
      textButton = $('#text-button').imageButton({
        src: 'img/text-button.png',
        float: 'left',
        click: function (e) {
          if ($(e.target).imageButton('instance')) {
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
    value: function select(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var button = _step.value;
          var locked = $(button).imageButton('locked');

          if (button && button.id.indexOf(name) == 0) {
            if (!locked) {
              $(button).imageButton('locked', true);
            }
          } else {
            if (locked) {
              $(button).imageButton('locked', false);
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

},{"./command.es6":3,"./html-dropdown.es6":9}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui = void 0;

var _widget = require("./widget.es6");

var _divider = require("./divider.es6");

var _dialog = require("./dialog.es6");

var _menu = require("./menu.es6");

var _title = require("./title.es6");

var _toolBar = require("./tool-bar.es6");

var _sideBar = require("./side-bar.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);

    this.menu = _menu.menu;
    this.divider = _divider.divider;
    this.dialog = _dialog.dialog;
    this.toolBar = _toolBar.toolBar;
    this.sideBar = _sideBar.sideBar;
  }

  _createClass(UI, [{
    key: "init",
    value: function init() {
      _menu.menu.init();

      _title.title.init();

      _divider.divider.init();

      _dialog.dialog.init();

      _toolBar.toolBar.init();

      _sideBar.sideBar.init();

      $('.split-pane').css('opacity', 1);
    }
  }, {
    key: "update",
    value: function update() {//  toolBar.update()
      //  sideBar.update()
      //  divider.update()
    }
  }]);

  return UI;
}();

var ui = new UI();
exports.ui = ui;

},{"./dialog.es6":6,"./divider.es6":7,"./menu.es6":15,"./side-bar.es6":26,"./title.es6":28,"./tool-bar.es6":29,"./widget.es6":32}],32:[function(require,module,exports){
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

    this.initImageButton();
    this.initTextButton();
  }

  _createClass(Widget, [{
    key: "initTextButton",
    value: function initTextButton() {
      $.widget('namenote.textButton', {
        options: {
          float: 'left',
          height: '24px',
          locked: false
        },
        _create: function _create() {
          this.element.addClass('text-button');
          this.element.css('float', this.options.float);
          this.locked(this.options.locked);
          this.element.text(this.options.text);
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
        }
      });
    }
  }, {
    key: "initImageButton",
    value: function initImageButton() {
      $.widget('namenote.imageButton', {
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
            var content = this.options.content;
            content.title = "";

            if (this.options.float == 'right') {
              content.style.right = "0";
            }

            var parent = this.options.contentParent || this.element[0];
            parent.appendChild(content);

            if (this.options.contentParent) {// Should recalc menu postion on open
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
        },
        updateContentPosition: function updateContentPosition() {
          var rect = this.element[0].getBoundingClientRect();
          var content = this.options.content;
          var contentWidth = this.options.contentWidth || 150;
          var width = document.body.clientWidth;
          var left = rect.x + contentWidth < width ? rect.x : width - contentWidth;
          content.style.left = left - 2 + 'px';
          content.style.top = 64 + 2 + 'px';
        }
      });
    }
  }]);

  return Widget;
}();

var widget = new Widget();
exports.widget = widget;

},{}],33:[function(require,module,exports){
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
    "Save Snapshot As ...": "バックアップを保存 ...",
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
    "Zoom In": "拡大",
    "Zoom Out": "縮小",
    "Window": "ウィンドウ",
    "Extract Text": "テキストを抽出",
    "Open Recent": "最近使用したノートを開く",
    "Clear Recent Note List": "最近使用したノートのリストを消去"
  }, _defineProperty(_ja, "Untitled", "名称未設定"), _defineProperty(_ja, "Making CSNF ...", "CSNFファイルを作成中 ..."), _defineProperty(_ja, "Online Storage", "オンラインストレージ"), _defineProperty(_ja, "Pages", "ページ"), _defineProperty(_ja, "Texts", "テキスト"), _defineProperty(_ja, "Side Bar Position", "サイドバーの位置"), _defineProperty(_ja, "Left", "左"), _defineProperty(_ja, "Right", "右"), _defineProperty(_ja, "S", "小"), _defineProperty(_ja, "M", "中"), _defineProperty(_ja, "L", "大"), _defineProperty(_ja, "Pressure", "筆圧"), _defineProperty(_ja, "Vertical", "縦書き"), _defineProperty(_ja, "Horizontal", "横書き"), _defineProperty(_ja, "New notebook", "新規ノート"), _defineProperty(_ja, "Notebook name", "ノート名"), _defineProperty(_ja, "Folder", "保存先"), _defineProperty(_ja, "Choose folder...", "参照..."), _defineProperty(_ja, "Number of pages", "ページ数"), _defineProperty(_ja, "Template", "テンプレート"), _defineProperty(_ja, "Manga", "漫画"), _defineProperty(_ja, "Binding point", "綴じる位置"), _defineProperty(_ja, "Left binding", "左綴じ　"), _defineProperty(_ja, "Right binding", "右綴じ　"), _defineProperty(_ja, "Start page", "開始ページ"), _defineProperty(_ja, "From left", "左ページ"), _defineProperty(_ja, "From right", "右ページ"), _defineProperty(_ja, "Pages", "ページ"), _defineProperty(_ja, "All", "すべて"), _defineProperty(_ja, "Current page", "選択されたページ"), _defineProperty(_ja, "Range", "範囲指定"), _defineProperty(_ja, "Scale", "拡大/縮小"), _defineProperty(_ja, "Custom", "カスタム"), _defineProperty(_ja, "Text color", "テキストの色"), _defineProperty(_ja, "100%", "B5商業誌用(B4サイズ原稿用紙/A4仕上がり)"), _defineProperty(_ja, "82%", "A5同人誌用(A4サイズ原稿用紙/B5仕上がり)"), _defineProperty(_ja, "Name changer compatible", "ストーリーエディタ用ネームチェンジャー互換"), _defineProperty(_ja, "Export CLIP STUDIO Storyboard", "CLIP STUDIO ネーム書き出し"), _defineProperty(_ja, "Export PDF", "PDF書き出し"), _defineProperty(_ja, "Import Plain Text", "テキスト読み込み"), _defineProperty(_ja, "Reset Settings to Default", "初期設定に戻す"), _defineProperty(_ja, "File name", "ファイル名"), _defineProperty(_ja, "Duplicate note name.", "同じ名前のノートがあります。"), _defineProperty(_ja, "Duplicate file name.", "同じ名前のファイルがあります。"), _defineProperty(_ja, "File not found.", "ファイルが見つかりません。"), _defineProperty(_ja, "File open error.", "このファイルは開けません。"), _defineProperty(_ja, "Save error.", "セーブできません。"), _defineProperty(_ja, "Select file to import", "読み込むファイルを選択してください"), _defineProperty(_ja, "Compressing", "圧縮中"), _defineProperty(_ja, "Rendering", "作成中"), _defineProperty(_ja, "Format", "フォーマット"), _defineProperty(_ja, "Line separator", "改行"), _defineProperty(_ja, "Balloon separator", "改セリフ"), _defineProperty(_ja, "Page separator", "改ページ"), _defineProperty(_ja, "Comment key", "コメント"), _defineProperty(_ja, "Choose file...", "ファイルを選択..."), _defineProperty(_ja, "Trial", "試用版"), _defineProperty(_ja, "Welcome to the trial version of Namenote.\nYou have ", "あと"), _defineProperty(_ja, " day(s) left.", "日ぐらい試用できます。\nありがとうございます！"), _defineProperty(_ja, "We're sorry, but your trial period has expired.", "試用期間終了しました。\nありがとうございました！"), _defineProperty(_ja, "Zoom small texts on input", "小さいテキストを編集するときは拡大表示する"), _defineProperty(_ja, "Use Quickline", "長押しで直線ツールに切り替える"), _defineProperty(_ja, "Disable wintab driver", "Wintabドライバを使わない"), _defineProperty(_ja, "Disable mouse wheel scroll", "マウスホイールでスクロールしない"), _defineProperty(_ja, "Click OK to restore default settings.", "デフォルトの設定に戻します"), _defineProperty(_ja, "Pen pressure", "筆圧"), _defineProperty(_ja, "Output", "出力"), _defineProperty(_ja, "Enable Japanese Options", "日本語用のオプションを有効にする"), _ja)
};
exports.dictionary = dictionary;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9icm93c2VyLmVzNiIsImVzNi9jb21tYW5kLmVzNiIsImVzNi9jb25maWctZGVmYXVsdC5lczYiLCJlczYvY29uZmlnLmVzNiIsImVzNi9kaWFsb2cuZXM2IiwiZXM2L2RpdmlkZXIuZXM2IiwiZXM2L2hpc3RvcnktYnV0dG9uLmVzNiIsImVzNi9odG1sLWRyb3Bkb3duLmVzNiIsImVzNi9odG1sLW1lbnUuZXM2IiwiZXM2L2xvY2FsZS5lczYiLCJlczYvbWFpbi12aWV3LmVzNiIsImVzNi9tZW51LWJ1dHRvbi5lczYiLCJlczYvbWVudS10ZW1wbGF0ZS5lczYiLCJlczYvbWVudS5lczYiLCJlczYvbmFtZW5vdGUuZXM2IiwiZXM2L3BhZ2Utdmlldy5lczYiLCJlczYvcGFnZS5lczYiLCJlczYvcHJvamVjdC1tYW5hZ2VyLmVzNiIsImVzNi9wcm9qZWN0LmVzNiIsImVzNi9yZWNlbnQtdXJsLmVzNiIsImVzNi9zY2FsZS1idXR0b24uZXM2IiwiZXM2L3Nob3J0Y3V0LWRlZmF1bHQuZXM2IiwiZXM2L3Nob3J0Y3V0LmVzNiIsImVzNi9zaWRlLWJhci10YWIuZXM2IiwiZXM2L3NpZGUtYmFyLmVzNiIsImVzNi90ZXh0LXZpZXcuZXM2IiwiZXM2L3RpdGxlLmVzNiIsImVzNi90b29sLWJhci5lczYiLCJlczYvdG9vbC1idXR0b24uZXM2IiwiZXM2L3VpLmVzNiIsImVzNi93aWRnZXQuZXM2IiwianMvbGliL2RpY3Rpb25hcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVNLFc7OztBQUNKLHlCQUFjO0FBQUE7O0FBQ1osU0FBSyxFQUFMLEdBQVUsY0FBVjtBQUNBLFNBQUssT0FBTCxHQUFlLElBQWY7QUFDRDs7Ozt5QkFFSSxPLEVBQVM7QUFDWixNQUFBLENB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QTVHRixFQTRHK0IsU0E1Ry9CLHdCQThHRSxXQTlHRixFQThHZSxPQTlHZix3QkErR0Usc0JBL0dGLEVBK0cwQixnQkEvRzFCLHdCQWdIRSxzQkFoSEYsRUFnSDBCLGlCQWhIMUIsd0JBaUhFLGlCQWpIRixFQWlIcUIsZUFqSHJCLHdCQWtIRSxrQkFsSEYsRUFrSHNCLGVBbEh0Qix3QkFtSEUsYUFuSEYsRUFtSGlCLFdBbkhqQix3QkFvSEUsdUJBcEhGLEVBb0gyQixtQkFwSDNCLHdCQXFIRSxhQXJIRixFQXFIaUIsS0FySGpCLHdCQXNIRSxXQXRIRixFQXNIZSxLQXRIZix3QkF3SEUsUUF4SEYsRUF3SFksUUF4SFosd0JBeUhFLGdCQXpIRixFQXlIb0IsSUF6SHBCLHdCQTBIRSxtQkExSEYsRUEwSHVCLE1BMUh2Qix3QkEySEUsZ0JBM0hGLEVBMkhvQixNQTNIcEIsd0JBNEhFLGFBNUhGLEVBNEhpQixNQTVIakIsd0JBNkhFLGdCQTdIRixFQTZIb0IsWUE3SHBCLHdCQStIRSxPQS9IRixFQStIVyxLQS9IWCx3QkFnSUUsc0RBaElGLEVBZ0kwRCxJQWhJMUQsd0JBaUlFLGVBaklGLEVBaUltQiwwQkFqSW5CLHdCQWtJRSxpREFsSUYsRUFrSXFELDJCQWxJckQsd0JBb0lFLDJCQXBJRixFQW9JK0IsdUJBcEkvQix3QkFxSUUsZUFySUYsRUFxSW9CLGlCQXJJcEIsd0JBc0lFLHVCQXRJRixFQXNJMkIsaUJBdEkzQix3QkF1SUUsNEJBdklGLEVBdUlnQyxrQkF2SWhDLHdCQXdJRSx1Q0F4SUYsRUF3STJDLGVBeEkzQyx3QkF5SUUsY0F6SUYsRUF5SWtCLElBeklsQix3QkEwSUUsUUExSUYsRUEwSVksSUExSVosd0JBNElFLHlCQTVJRixFQTRJNkIsa0JBNUk3QjtBQURpQixDQUFuQjtBQWlKQSxPQUFPLENBQUMsVUFBUixHQUFxQixVQUFyQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuXG5jbGFzcyBBYm91dERpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSAnYWJvdXQtZGlhbG9nJ1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQodmVyc2lvbikge1xuICAgICQoJyNhYm91dC1kaWFsb2cnKS5kaWFsb2coe1xuICAgICAgYXV0b09wZW46IHRydWUsXG4gICAgICBwb3NpdGlvbjogeyBteTonY2VudGVyIGJvdHRvbScsIGF0OidjZW50ZXIgY2VudGVyJyB9LFxuICAgICAgdGl0bGU6IFQoJ0Fib3V0IE5hbWVub3RlJyksXG4gICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgIHdpZHRoOiA2MDAsXG4gICAgICBidXR0b25zOiB7IE9rOiB0aGlzLm9rIH0sXG4gICAgfSlcblxuICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsZS50cmFuc2xhdGVIVE1MKGBcbiAgICA8Y2VudGVyPlxuICAgICAgPGltZyBzcmM9Jy4vaW1nL25hbWVub3RlMTAyNC5wbmcnIHdpZHRoPVwiMTAwcHhcIiAvPlxuICAgICAgPGJyPlxuICAgICAgTmFtZW5vdGUgdiR7bmFtZW5vdGUudmVyc2lvbn1cbiAgICAgIDxicj48YnI+XG4gICAgICA8c21hbGw+Q29weXJpZ2h0IChjKSBGdW5pZ2U8L3NtYWxsPjwvY2VudGVyPmBcbiAgICApXG4gICAgXG4gICAgJCgnI2Fib3V0LWRpYWxvZycpLmh0bWwoc3RyaW5nKVxuICB9XG5cbiAgb2soKSB7XG4gICAgZGlhbG9nLmNsb3NlKClcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBhYm91dERpYWxvZyA9IG5ldyBBYm91dERpYWxvZygpXG5cbmV4cG9ydCB7IGFib3V0RGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuXG5cbndpbmRvdy5uYW1lbm90ZSA9IG5hbWVub3RlXG5cbndpbmRvdy5UID0gbG9jYWxlLnRyYW5zbGF0ZVxud2luZG93LmxvZyA9IGNvbnNvbGUubG9nLmJpbmQod2luZG93LmNvbnNvbGUpXG53aW5kb3cud2FybiA9IGNvbnNvbGUud2Fybi5iaW5kKHdpbmRvdy5jb25zb2xlKVxud2luZG93LmVycm9yID0gY29uc29sZS5lcnJvci5iaW5kKHdpbmRvdy5jb25zb2xlKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xuICBuYW1lbm90ZS5pbml0KClcbn0pXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5pbXBvcnQgeyBhYm91dERpYWxvZyB9IGZyb20gJy4vYWJvdXQtZGlhbG9nLmVzNidcbmltcG9ydCB7IGRpdmlkZXIgfSBmcm9tICcuL2RpdmlkZXIuZXM2J1xuaW1wb3J0IHsgdG9vbEJ1dHRvbiB9IGZyb20gJy4vdG9vbC1idXR0b24uZXM2J1xuaW1wb3J0IHsgc2lkZUJhclRhYiB9IGZyb20gJy4vc2lkZS1iYXItdGFiLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5jb25zdCBfcnVuTWFpbiA9IChtZXNzYWdlLCBkYXRhKSA9PiB7XG4gIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICBsb2coJ3J1bk1haW4nLCBtZXNzYWdlLCBkYXRhKVxuICAgIG5hbWVub3RlLmFwcC5ydW5NYWluKG1lc3NhZ2UsIGRhdGEpXG5cbiAgfSBlbHNlIHtcbiAgICBsb2coYCR7bWVzc2FnZX06IGNhblxcYHQgZXhlY3V0ZSB0aGlzIGNvbW1hbmQgb24gYnJvd3Nlci5gKVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgdW5kbygpIHtcbiAgICBsb2coJ3VuZG8nKVxuICB9XG5cbiAgcmVkbygpIHtcbiAgICBsb2coJ3JlZG8nKVxuICB9XG5cbiAgYWJvdXQoKSB7XG4gICAgZGlhbG9nLm9wZW4oYWJvdXREaWFsb2cpXG4gIH1cblxuICBwZW4oZSkge1xuICAgIGxvZygncGVuJylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgncGVuJylcbiAgfVxuXG4gIGVyYXNlcihlKSB7XG4gICAgbG9nKCdlcmFzZXInKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCdlcmFzZXInKVxuICB9XG5cbiAgdGV4dChlKSB7XG4gICAgbG9nKCd0ZXh0JylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgndGV4dCcpXG4gIH1cblxuICBzaWRlQmFyKCkge1xuICAgIGxvZygnc2lkZUJhcicpXG4gICAgZGl2aWRlci50b2dnbGUoKVxuICB9XG5cbiAgc2hvd1BhZ2VWaWV3KCkge1xuICAgICQoJy5wYWdlLXZpZXcnKS5zaG93KClcbiAgICAkKCcudGV4dC12aWV3JykuaGlkZSgpXG4gICAgc2lkZUJhclRhYi5zZWxlY3QoJ3BhZ2UnKVxuICB9XG5cbiAgc2hvd1RleHRWaWV3KCkge1xuICAgICQoJy5wYWdlLXZpZXcnKS5oaWRlKClcbiAgICAkKCcudGV4dC12aWV3Jykuc2hvdygpXG4gICAgc2lkZUJhclRhYi5zZWxlY3QoJ3RleHQnKVxuICB9XG4gIFxuICBvcGVuRGlhbG9nKCkge1xuICAgIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICAgIG5hbWVub3RlLmFwcC5vcGVuRGlhbG9nKCkudGhlbigodXJsKSA9PiB7XG4gICAgICAgIHdhcm4oYG9wZW4gJyR7dXJsfScuLi5gKVxuICAgICAgICBwcm9qZWN0TWFuYWdlci5vcGVuKHVybClcblxuICAgICAgfSkudGhlbigocHJvamVjdCkgPT4ge1xuICAgICAgICAvL3dhcm4oJ3Byb2plY3Q9JywgcHJvamVjdClcbiAgICAgICAgXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgbmFtZW5vdGUuYXBwLnNob3dNZXNzYWdlQm94KHtcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgb3Blbk5ld0RpYWxvZygpIHtcbiAgICB3YXJuKCdvcGVuIG5ldyBkaWFsb2cuLicpXG4gIH1cbiAgXG4gIGNsb3NlKCkge1xuICAgIHByb2plY3RNYW5hZ2VyLmNsb3NlKClcbiAgfVxuXG4gIHpvb20oKSB7XG4gICAgbG9nKCd6b29tJylcbiAgfVxuXG4gIHVuem9vbSgpIHtcbiAgICBsb2coJ3Vuem9vbScpXG4gIH1cblxuICBkb2NrTGVmdCgpIHtcbiAgICBkaXZpZGVyLnNldFBvc2l0aW9uKCdsZWZ0JylcbiAgfVxuXG4gIGRvY2tSaWdodCgpIHtcbiAgICBkaXZpZGVyLnNldFBvc2l0aW9uKCdyaWdodCcpXG4gIH1cblxuICBcbiAgdG9nZ2xlRWRpdE1vZGUoKSB7fVxuICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBkbyhpdGVtLCBkYXRhKSB7XG4gICAgaWYgKHRoaXNbaXRlbV0pIHtcbiAgICAgIHRoaXNbaXRlbV0oZGF0YSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGRldmVsb3BlclRvb2xzKCkge1xuICAgIF9ydW5NYWluKCdkZXZlbG9wZXJUb29scycpXG4gIH1cbiAgXG4gIGZ1bGxTY3JlZW4oKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgX3J1bk1haW4oJ2Z1bGxTY3JlZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuICBcbiAgcXVpdCgpIHtcbiAgICBfcnVuTWFpbigncXVpdCcpXG4gIH1cbn1cblxuY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kKClcblxuZXhwb3J0IHsgY29tbWFuZCB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgY29uZmlnRGVmYXVsdCA9IHtcbiAgdG9vbEJhcjogdHJ1ZSxcbiAgc2lkZUJhcjogZmFsc2UsXG4gIHNpZGVCYXJXaWR0aDogMjAwLFxuICBzaWRlQmFyUG9zaXRpb246ICdyaWdodCcsXG4gIFxuICBkZWZhdWx0UGF0aDogbnVsbCxcbiAgZGVmYXVsdE5hbWU6IG51bGwsXG4gIGRlZmF1bHRBdXRob3I6IG51bGwsXG59XG5cblxuZXhwb3J0IHsgY29uZmlnRGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnRGVmYXVsdCB9IGZyb20gJy4vY29uZmlnLWRlZmF1bHQuZXM2J1xuXG5jbGFzcyBDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL2NvbmZpZycpXG4gICAgdGhpcy5kYXRhID0gKGpzb24pID8gSlNPTi5wYXJzZShqc29uKSA6ICQuZXh0ZW5kKHRydWUsIHt9LCBjb25maWdEZWZhdWx0KVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9jb25maWcnLCBqc29uKVxuICB9XG5cbiAgcmVzZXRTdG9yYWdlKCkge1xuICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ0RlZmF1bHQpXG4gICAgdGhpcy5zYXZlKClcbiAgfVxuXG4gIGdldFZhbHVlKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFba2V5XVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29uZmlnID0gbmV3IENvbmZpZygpXG5cbmV4cG9ydCB7IGNvbmZpZyB9XG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgRGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuICBcbiAgaXNPcGVuKCkge1xuICAgIGZvciAoY29uc3Qgd2lkZ2V0IG9mICQoJy51aS1kaWFsb2ctY29udGVudCcpKSB7XG4gICAgICBpZiAoJCh3aWRnZXQpLmRpYWxvZygnaXNPcGVuJykpIHtcblx0cmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgXG4gIG9wZW4od2lkZ2V0KSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkgdGhpcy5jbG9zZSgpXG4gICAgdGhpcy5jdXJyZW50ID0gd2lkZ2V0XG4gICAgXG4gICAgaWYgKCF3aWRnZXQuZWxlbWVudCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBlbGVtZW50LmlkID0gd2lkZ2V0LmlkXG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdkaWFsb2cnXG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9ICcwJztcbiAgICAgICQoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgICAgd2lkZ2V0LmVsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuICAgIHdpZGdldC5pbml0KClcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGNvbnN0IHdpZGdldCA9IHRoaXMuY3VycmVudFxuICAgIGNvbnN0IGVsZW1lbnQgPSB3aWRnZXQuZWxlbWVudFxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAkKCcjJyArIHdpZGdldC5pZCkuZGlhbG9nKCdjbG9zZScpXG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICB9XG4gICAgd2lkZ2V0LmVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG59XG5cbmNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coKVxuXG5leHBvcnQgeyBkaWFsb2cgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcblxubGV0IG1pbldpZHRoID0gMTgwXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgRGl2aWRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAkKCcuc3BsaXQtcGFuZScpLnNwbGl0UGFuZSgpXG4gICAgJCgnLnNwbGl0LXBhbmUnKS5vbignZGl2aWRlcmRyYWdlbmQnLCAoZSkgPT4geyAvLyBvciAnc3BsaXRwYW5lcmVzaXplJ1xuICAgICAgdGhpcy5vbkRpdmlkZXJEcmFnRW5kKClcbiAgICB9KVxuICAgIHRoaXMuc2V0UG9zaXRpb24oKVxuICB9XG5cbiAgdXBkYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhciA9IHZhbHVlXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgbGV0IHdpZHRoID0gKHZhbHVlKSA/IGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA6IDBcbiAgICBpZiAoY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uID09ICdyaWdodCcpIHtcbiAgICAgIHdpZHRoID0gJCgnLnNwbGl0LXBhbmUnKS53aWR0aCgpIC0gd2lkdGggKyAxXG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgICAgaWYgKHdpZHRoIDwgbWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGhcbiAgICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG4gICAgfVxuICAgICQoJy5zcGxpdC1wYW5lJykuc3BsaXRQYW5lKCdmaXJzdENvbXBvbmVudFNpemUnLCB3aWR0aClcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZSghY29uZmlnLmRhdGEuc2lkZUJhcilcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb25cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb24gPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGNvbnN0IG1haW4gPSAkKCcubWFpbicpXG4gICAgY29uc3Qgc2lkZUJhciA9ICQoJy5zaWRlYmFyJylcblxuICAgIGlmICh2YWx1ZSA9PSAnbGVmdCcpIHtcbiAgICAgICQoJyNsZWZ0LWNvbXBvbmVudCcpLmFwcGVuZChzaWRlQmFyKVxuICAgICAgJCgnI3JpZ2h0LWNvbXBvbmVudCcpLmFwcGVuZChtYWluKVxuXG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNyaWdodC1jb21wb25lbnQnKS5hcHBlbmQoc2lkZUJhcilcbiAgICAgICQoJyNsZWZ0LWNvbXBvbmVudCcpLmFwcGVuZChtYWluKVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIG9uRGl2aWRlckRyYWdFbmQoKSB7XG4gICAgbGV0IHdpZHRoID0gJCgnLnNpZGViYXInKS53aWR0aCgpXG5cbiAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgIGlmICh3aWR0aCA8IG1pbldpZHRoKSB3aWR0aCA9IG1pbldpZHRoXG4gICAgaWYgKHdpZHRoID4gbWF4V2lkdGgpIHdpZHRoID0gbWF4V2lkdGhcblxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA9IHBhcnNlSW50KHdpZHRoKVxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXIgPSB0cnVlXG4gICAgY29uZmlnLnNhdmUoKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCBkaXZpZGVyID0gbmV3IERpdmlkZXIoKVxuXG5leHBvcnQgeyBkaXZpZGVyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5sZXQgdW5kb0J1dHRvblxubGV0IHJlZG9CdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIaXN0b3J5QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHVuZG9CdXR0b24gPSAkKCcjdW5kby1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW5kby1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbW1hbmQudW5kbygpXG4gICAgICB9XG4gICAgfSlbMF1cblxuICAgIHJlZG9CdXR0b24gPSAkKCcjcmVkby1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvcmVkby1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbW1hbmQucmVkbygpXG4gICAgICB9XG4gICAgfSlbMF1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIFxuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICBjb25zdCBoYXNVbmRvID0gKHByb2plY3QpID8gcHJvamVjdC5oaXN0b3J5Lmhhc1VuZG8oKSA6IGZhbHNlXG4gICAgICBjb25zdCBoYXNSZWRvID0gKHByb2plY3QpID8gcHJvamVjdC5oaXN0b3J5Lmhhc1JlZG8oKSA6IGZhbHNlXG4gICAgICAkKHVuZG9CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFoYXNVbmRvKVxuICAgICAgJChyZWRvQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhaGFzUmVkbylcblxuLy8gICAgTWVudS51cGRhdGVIaXN0b3J5KClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaGlzdG9yeUJ1dHRvbiA9IG5ldyBIaXN0b3J5QnV0dG9uKClcblxuZXhwb3J0IHsgaGlzdG9yeUJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIVE1MRHJvcGRvd24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cblxuICBvcGVuKGVsZW1lbnQpIHtcbiAgICBsb2coJ29wZW4nLCBlbGVtZW50KVxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBsb2coJ2Nsb3NlJylcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBcbiAgbWFrZSh0ZW1wbGF0ZSwgaWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1jb250ZW50J1xuICAgIGNvbnRlbnQuaWQgPSBpZCArICctZHJvcGRvd24nXG4gICAgXG4gICAgY29udGVudC5pbm5lckhUTUwgPSBgWyR7aWR9XWBcbiAgICByZXR1cm4gY29udGVudFxuICB9XG59XG5cbmNvbnN0IGh0bWxEcm9wZG93biA9IG5ldyBIVE1MRHJvcGRvd24oKVxuXG5leHBvcnQgeyBodG1sRHJvcGRvd24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHJlY2VudFVSTCB9IGZyb20gJy4vcmVjZW50LXVybC5lczYnXG5pbXBvcnQgeyBtZW51IGFzIG5hdGl2ZU1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuXG5sZXQgYnV0dG9ucyA9IHt9XG5sZXQgdGltZXJzID0ge31cbmxldCBibHVyRGVsYXkgPSA1MDBcblxuY29uc3QgYWRkSXRlbXMgPSAobm9kZSwgaXRlbXMpID0+IHtcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaWYgKGl0ZW0ubGFiZWwpIHtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBhcHBlbmRLZXkoVChpdGVtLmxhYmVsKSwgaXRlbS5hY2NlbGVyYXRvcilcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2LmlubmVySFRNTCA9ICctJ1xuICAgIH1cbiAgICBsaS5hcHBlbmRDaGlsZChhcHBlbmRBdHRyaWJ1dGUoZGl2LCBpdGVtLmxhYmVsLCBpdGVtLmNsaWNrKSlcbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBhZGRJdGVtcyhsaSwgaXRlbS5zdWJtZW51KSBcbiAgICB9XG5cbiAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICBub2RlLmFwcGVuZENoaWxkKHVsKVxuICB9XG59XG5cbmNvbnN0IGFwcGVuZEF0dHJpYnV0ZSA9IChkaXYsIGRhdGEsIGNsaWNrKSA9PiB7XG4gIGlmIChkYXRhKSB7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHAuaW5uZXJIVE1MID0gZGF0YVxuICAgIHAudGl0bGUgPSBjbGljayB8fCAnJ1xuICAgIHAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKVxuICB9XG4gIHJldHVybiBkaXZcbn1cblxuY29uc3QgYXBwZW5kS2V5ID0gKHN0cmluZywga2V5LCBjaGVjaykgPT4ge1xuICBjaGVjayA9IChjaGVjaykgPyAnJiN4MjcxNDsnIDogJydcbiAga2V5ID0gY29udmVydEtleShrZXkpIHx8ICcmbmJzcDsnIFxuXG4gIGNvbnN0IHJlc3VsdCA9IGBcbiAgICA8ZGl2IGNsYXNzPSdjaGVjayc+JHtjaGVja308L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPSdsYWJlbCc+JHtzdHJpbmd9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz0na2V5Jz4ke2tleX08L2Rpdj5gXG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgY29udmVydEtleSA9IChrZXkpID0+IHtcbiAgaWYgKGtleSkge1xuICAgIGlmICghbmFtZW5vdGUuaXNNYWMoKSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKCdDb21tYW5kK0N0cmwrRicpID49IDApIHJldHVybiAnJ1xuICAgICAgXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXCwvLCAnU2hpZnQrQ29tbWEnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwuLywgJ1NoaWZ0K1BlcmlvZCcpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ21kT3JDdHJsXFwrLywgJ0N0cmwrJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9Db21tYW5kXFwrQWx0XFwrLywgJ0N0cmwrQWx0KycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0N0cmxcXCsvLCAnPz8/KycpXG4gICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLC8sICc8JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLi8sICc+JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9DbWRPckN0cmxcXCsvLCAnJiM4OTg0OycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0FsdFxcKy8sICcmIzg5OTc7JiM4OTg0OycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0N0cmxcXCsvLCAnJiM4OTYzOyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrLywgJyYjODY3OTsnKVxuICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEhUTUxNZW51IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG5cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICB9XG5cbiAgY2xvc2UoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9XG4gIFxuICBtYWtlKHRlbXBsYXRlLCBpZCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duLWNvbnRlbnQnXG4gICAgY29udGVudC5pZCA9IGlkICsgJy1kcm9wZG93bidcblxuICAgIGFkZEl0ZW1zKGNvbnRlbnQsIHRlbXBsYXRlKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0ZShjb250ZW50LmNoaWxkTm9kZXNbMF0sIGlkKVxuICAgIH0sIDEpXG4gICBcbiAgICByZXR1cm4gY29udGVudFxuICB9XG5cbiAgYWN0aXZhdGUobWVudSwgaWQpIHtcbiAgICBtZW51LmlkID0gaWQgKyAnLW1lbnUnXG4gICAgYnV0dG9uc1tpZF0gPSAkKCcjJyArIGlkICsgJy1tZW51LWJ1dHRvbicpXG4gICAgdGltZXJzW2lkXSA9IG51bGxcblxuICAgICQobWVudSkubWVudSh7XG4gICAgICBzZWxlY3Q6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3QoZXZlbnQsIHVpKSkge1xuICAgICAgICAgIHRoaXMuY29sbGFwc2UobWVudSwgaWQpXG4gICAgICAgICAgYnV0dG9uc1tpZF0uaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlcblxuICAgICQobWVudSkub24oJ21lbnVmb2N1cycsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcnNbaWRdKVxuICAgIH0pXG4gICAgXG4gICAgJChtZW51KS5vbignbWVudWJsdXInLCAoKSA9PiB7XG4gICAgICBpZiAoIWJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnKSkgcmV0dXJuXG4gICAgICB0aW1lcnNbaWRdID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UobWVudSwgaWQpXG4gICAgICB9LCBibHVyRGVsYXkpXG4gICAgfSlcbiAgfVxuXG4gIGNvbGxhcHNlKG1lbnUsIGlkKSB7XG4gICAgJChtZW51KS5tZW51KCdjb2xsYXBzZUFsbCcsIG51bGwsIHRydWUpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKG1lbnUucGFyZW50Tm9kZSlcbiAgICAgIGJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICB9LCA1MDApXG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy9cblxuICB1cGRhdGUoZWxlbWVudCkge1xuICAgIGNvbnN0IG1lbnUgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF1cbiAgICBjb25zdCBpZCA9IGVsZW1lbnQuaWQucmVwbGFjZSgvLS4qJC8sICcnKVxuLy8gIHdhcm4oJ1todG1sIG1lbnUgdXBkYXRlXScsIGlkKVxuXG4gICAgaWYgKGlkID09ICdmaWxlJykge1xuICAgICAgdGhpcy51cGRhdGVSZWNlbnRzKG1lbnUpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlU3RhdGVzKG1lbnUpXG4gICAgJChtZW51KS5tZW51KCdyZWZyZXNoJylcbiAgfVxuXG4gIHVwZGF0ZVJlY2VudHMobWVudSkge1xuICAgIHdoaWxlIChtZW51LmNoaWxkTm9kZXMubGVuZ3RoID4gMykge1xuICAgICAgbWVudS5yZW1vdmVDaGlsZChtZW51LmNoaWxkTm9kZXNbbWVudS5jaGlsZE5vZGVzLmxlbmd0aCAtIDFdKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNlbnRVUkwuZGF0YSkge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVySFRNTCA9IGl0ZW1cbiAgICAgIGxpLmFwcGVuZENoaWxkKGFwcGVuZEF0dHJpYnV0ZShkaXYsIGl0ZW0sICdvcGVuVVJMJykpXG4gICAgICBkZi5hcHBlbmRDaGlsZChsaSlcbiAgICB9XG4gICAgbWVudS5hcHBlbmRDaGlsZChkZilcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcyhtZW51KSB7XG4gICAgY29uc3QgaXRlbXMgPSAkKG1lbnUpLmZpbmQoJ2xpJylcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSAkKGl0ZW0pLmZpbmQoJ3AnKVxuICAgICAgaWYgKG5hbWUgJiYgbmFtZS5sZW5ndGggPT0gMSkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IG5hbWVbMF0uaW5uZXJIVE1MXG4gICAgICAgIGNvbnN0IHN0YXRlID0gbmF0aXZlTWVudS5nZXRTdGF0ZShsYWJlbClcbiAgICAgICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndWktc3RhdGUtZGlzYWJsZWQnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3VpLXN0YXRlLWRpc2FibGVkJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy9cbiAgXG4gIHNlbGVjdChldmVudCwgdWkpIHtcbiAgICBjb25zdCBwID0gdWkuaXRlbVswXSAmJiB1aS5pdGVtWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJylbMF1cbiAgICBpZiAocCkge1xuICAgICAgY29uc3QgZGF0YSA9IHAuaW5uZXJIVE1MXG4gICAgICBjb25zdCBjbGljayA9IHAudGl0bGVcblxuICAgICAgaWYgKGNsaWNrKSB7XG4gICAgICAgIGVycm9yKGAke2NsaWNrfWAsIGAke2RhdGF9YClcbiAgICAgICAgY29tbWFuZC5kbyhgJHtjbGlja31gLCBgJHtkYXRhfWApXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGh0bWxNZW51ID0gbmV3IEhUTUxNZW51KClcblxuZXhwb3J0IHsgaHRtbE1lbnUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTG9jYWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZGljdGlvbmFyeSA9IHJlcXVpcmUoJy4uL2pzL2xpYi9kaWN0aW9uYXJ5LmpzJykuZGljdGlvbmFyeVxuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBkaWN0aW9uYXJ5KSB7XG4gICAgICBpZiAobmF2aWdhdG9yLmxhbmd1YWdlLmluZGV4T2Yoa2V5KSA9PSAwICYmIGRpY3Rpb25hcnlba2V5XSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeVtrZXldXG4gICAgICAgIHRoaXMudHJhbnNsYXRlID0gKHN0cmluZykgPT4ge1xuICAgICAgICAgIHJldHVybiBkaWN0W3N0cmluZ10gfHwgc3RyaW5nXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cmFuc2xhdGUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG4gIFxuICB0cmFuc2xhdGVIVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC9UXFwoKC4qPylcXCkvZywgKGFsbCwgbWF0Y2gpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZShtYXRjaClcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGxvY2FsZSA9IG5ldyBMb2NhbGUoKVxuXG5leHBvcnQgeyBsb2NhbGUgfVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG4vLyAkKCcubWFpbi12aWV3JylbMF0ucGFyZW50Tm9kZS5zY3JvbGxUb3AgPSAuLi5cblxubGV0IGVsZW1lbnRcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBNYWluVmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc2NhbGUgPSAxXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHBhZ2VXaWR0aCA9IDEwMDBcbiAgICBjb25zdCBwYWdlSGVpZ2h0ID0gNzY4XG4gICAgZWxlbWVudCA9ICQoJy5tYWluJylbMF1cbiAgICBcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwMDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHBhZ2Uuc3R5bGUud2lkdGggPSBwYWdlV2lkdGggKyBcInB4XCJcbiAgICAgICAgcGFnZS5zdHlsZS5oZWlnaHQgPSBwYWdlSGVpZ2h0ICsgXCJweFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG4gICAgICAgIHBhZ2Uuc3R5bGUub3V0bGluZSA9IFwiMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4zKVwiXG5cbiAgICAgICAgY29uc3QgeCA9IGkgKiAocGFnZVdpZHRoICsgNTApICsgNTBcbiAgICAgICAgY29uc3QgeSA9IGogKiAocGFnZUhlaWdodCArIDUwKSArIDUwXG4gICAgICAgIHBhZ2Uuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHBhZ2Uuc3R5bGUubGVmdCA9IHggKyBcInB4XCJcbiAgICAgICAgcGFnZS5zdHlsZS50b3AgPSB5ICsgXCJweFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJ0b3AgbGVmdFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjApXCJcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBwYWdlTnVtYmVyLmlubmVySFRNTCA9IChqICogMTAgKyBpICsgMSkgKyBcIuODmuODvOOCuFwiXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUuZm9udFNpemUgPSAnMTJweCcgLy8gMTFweOS7peS4i+OBr+WkieOCj+OCieOBquOBhFxuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLmxlZnQgPSAocGFnZVdpZHRoIC8gMikgKyAncHgnXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUudG9wID0gKHBhZ2VIZWlnaHQgKyAyMCkgKyAncHgnXG5cbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChwYWdlTnVtYmVyKVxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKHBhZ2UpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG4gIFxuICBzZXRQcm9qZWN0KHByb2plY3QpIHtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICB9IGVsc2Uge1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3QgbWFpblZpZXcgPSBuZXcgTWFpblZpZXcoKVxuXG5leHBvcnQgeyBtYWluVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmltcG9ydCB7IGZpbGVNZW51VGVtcGxhdGUsXG4gICAgICAgICBvdGhlck1lbnVUZW1wbGF0ZSxcbiAgICAgICAgIHNpZGViYXJNZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuXG5sZXQgZmlsZUJ1dHRvblxubGV0IG90aGVyQnV0dG9uXG5sZXQgc2lkZWJhckJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnVCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBmaWxlQnV0dG9uID0gJCgnI2ZpbGUtbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZmlsZS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKGZpbGVNZW51VGVtcGxhdGUsICdmaWxlJylcbiAgICB9KVswXVxuXG4gICAgb3RoZXJCdXR0b24gPSAkKCcjb3RoZXItbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWVudS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShvdGhlck1lbnVUZW1wbGF0ZSwgJ290aGVyJylcbiAgICB9KVswXVxuXG4gICAgc2lkZWJhckJ1dHRvbiA9ICQoJyNzaWRlYmFyLW1lbnUtYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL21lbnUtYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IHRoaXMuc2VsZWN0KGUpIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxNZW51Lm1ha2Uoc2lkZWJhck1lbnVUZW1wbGF0ZSwgJ3NpZGViYXInKSxcbiAgICAgIGNvbnRlbnRQYXJlbnQ6ICQoJ2JvZHknKVswXVxuICAgIH0pWzBdXG5cbiAgICB0aGlzLmJ1dHRvbnMucHVzaChmaWxlQnV0dG9uLCBvdGhlckJ1dHRvbiwgc2lkZWJhckJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuICBcbiAgc2VsZWN0KGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ2ltZy1idXR0b24nKSA8IDApIHJldHVyblxuICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJylcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gJChidXR0b24pLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpXG4gICAgICBjb25zdCBkcm9wZG93biA9IGluc3RhbmNlLm9wdGlvbnMuY29udGVudFxuICAgICAgXG4gICAgICBpZiAoYnV0dG9uICYmIGJ1dHRvbi5pZCA9PSBlLnRhcmdldC5pZCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgIGh0bWxNZW51LnVwZGF0ZShkcm9wZG93bilcbiAgICAgICAgICBcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgICAgaWYgKGluc3RhbmNlLm9wdGlvbnMuY29udGVudFBhcmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudXBkYXRlQ29udGVudFBvc2l0aW9uKClcbiAgICAgICAgICB9XG4gICAgICAgICAgaHRtbE1lbnUub3Blbihkcm9wZG93bilcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgICAgaHRtbE1lbnUuY2xvc2UoZHJvcGRvd24pXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgICAgaHRtbE1lbnUuY2xvc2UoZHJvcGRvd24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgbWVudUJ1dHRvbiA9IG5ldyBNZW51QnV0dG9uKClcblxuZXhwb3J0IHsgbWVudUJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgbWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmFtZW5vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBYm91dCBOYW1lbm90ZSAuLi4nLCBjbGljazogJ2Fib3V0JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1NldHRpbmdzIC4uLicsIGNsaWNrOiAnc2V0dGluZ3MnIH0sXG4gICAgICB7IGxhYmVsOiAnVGFibGV0IFNldHRpbmdzIC4uLicsIGNsaWNrOiAndGFibGV0U2V0dGluZ3MnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUXVpdCBOYW1lbm90ZScsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtRXCIsIGNsaWNrOiAncXVpdCcgfSxcbiAgICAgIFxuLy8gICAgeyBsYWJlbDogJ1NldHRpbmdzJyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdCcsIGNsaWNrOiAncmVzZXRTZXR0aW5ncycgfSxcbi8vXHRdLFxuLy8gICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnTm90ZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ05ldyAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrTlwiLCBjbGljazogJ29wZW5OZXdEaWFsb2cnIH0sXG4gICAgICB7IGxhYmVsOiAnT3BlbiAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrT1wiLCBjbGljazogJ29wZW5EaWFsb2cnIH0sXG4gICAgICB7IGxhYmVsOiAnT3BlbiBSZWNlbnQnLCBzdWJtZW51OiBbXSB9LFxuXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnQ2xvc2UnLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrV1wiLCBjbGljazogJ2Nsb3NlJyB9LFxuLy8gICAgeyBsYWJlbDogJ0Nsb3NlIEFsbCcsIGNsaWNrOiAnY2xvc2VBbGwnIH0sXG5cdFxuLy8gICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuLy8gICAgeyBsYWJlbDogJ05vdGUgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdub3RlU2V0dGluZ3MnIH0sXG5cbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTXCIsIGNsaWNrOiAnc25hcHNob3QnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrU2hpZnQrSVwiLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1BcIiwgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTaGlmdCtQXCIsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiBcIkVkaXRcIixcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiBcIlVuZG9cIiwgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1pcIiwgc2VsZWN0b3I6IFwidW5kbzpcIiwgY2xpY2s6ICd1bmRvJyB9LFxuICAgICAgeyBsYWJlbDogXCJSZWRvXCIsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtZXCIsIHNlbGVjdG9yOiBcInJlZG86XCIsIGNsaWNrOiAncmVkbycgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogXCJDdXRcIiwgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1hcIiwgc2VsZWN0b3I6IFwiY3V0OlwiIH0sXG4gICAgICB7IGxhYmVsOiBcIkNvcHlcIiwgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK0NcIiwgc2VsZWN0b3I6IFwiY29weTpcIiB9LFxuICAgICAgeyBsYWJlbDogXCJQYXN0ZVwiLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrVlwiLCBzZWxlY3RvcjogXCJwYXN0ZTpcIiB9LFxuXG4gICAgICB7IGxhYmVsOiBcIlNlbGVjdCBBbGxcIiwgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK0FcIiwgc2VsZWN0b3I6IFwic2VsZWN0QWxsOlwiLCBjbGljazogJ3NlbGVjdEFsbCcgfSxcbiAgICBdXG4gIH0sXG4gIHsgbGFiZWw6ICdQYWdlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQWRkJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQraVwiLCBjbGljazogJ2FwcGVuZFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBGb3J3YXJkJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQrLlwiLCBjbGljazogJ21vdmVQYWdlRm9yd2FyZCcgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEJhY2t3YXJkJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQrLFwiLCBjbGljazogJ21vdmVQYWdlQmFja3dhcmQnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIHRvIEJ1ZmZlcicsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K2tcIiwgY2xpY2s6ICdjdXRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ1B1dCBCYWNrIGZyb20gQnVmZmVyJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQrWVwiLCBjbGljazogJ3Bhc3RlUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdFbXB0eSBCdWZmZXInLCBhY2NlbGVyYXRvcjogXCJTaGlmdCswXCIsIGNsaWNrOiAnZW1wdHlQYWdlJyB9LFxuLy8gICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4vLyAgICB7IGxhYmVsOiAnRmxpcCcsIGFjY2VsZXJhdG9yOiBcIkhcIiwgY2xpY2s6ICdmbGlwUGFnZScgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ0V4dHJhY3QgVGV4dCcsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtUXCIsIGNsaWNrOiAnZXh0cmFjdFRleHQnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrLVwiLCBjbGljazogJ3NhdmVQYWdlSW1hZ2UnIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1ZpZXcnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdGdWxsIFNjcmVlbicsIGFjY2VsZXJhdG9yOiAnQ3RybCtDb21tYW5kK0YnLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuLy8gICAgeyBsYWJlbDogJ1Rvb2wgQmFyJywgY2xpY2s6ICd0b29sQmFyJyB9LCAvL2FjY2VsZXJhdG9yOiBcIkNvbW1hbmQrQWx0K0hcIiwgXG4gICAgICB7IGxhYmVsOiAnU2lkZSBCYXInLCBhY2NlbGVyYXRvcjogJ0NvbW1hbmQrQWx0K1MnLCBjbGljazogJ3NpZGVCYXInIH0sIFxuICAgICAgeyBsYWJlbDogJ0RldmVsb3BlciBUb29scycsIGFjY2VsZXJhdG9yOiBcIkNvbW1hbmQrQWx0K0pcIiwgY2xpY2s6ICdkZXZlbG9wZXJUb29scycgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdab29tIEluJywgYWNjZWxlcmF0b3I6ICdbJywgY2xpY2s6ICd6b29tJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdab29tIE91dCcsIGFjY2VsZXJhdG9yOiAnXScsIGNsaWNrOiAndW56b29tJyB9LCBcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdQYWdlIE1hcmdpbicsIGFjY2VsZXJhdG9yOiBcIlJcIiwgY2xpY2s6ICdzaG93TWFyZ2luJyB9LFxuICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBQYWdlcyBwZXIgUm93Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcyJywgY2xpY2s6ICdyb3cxJyB9LFxuXHQgIHsgbGFiZWw6ICc0JywgY2xpY2s6ICdyb3cyJyB9LFxuXHQgIHsgbGFiZWw6ICc2JywgY2xpY2s6ICdyb3czJyB9LFxuXHQgIHsgbGFiZWw6ICc4JywgY2xpY2s6ICdyb3c0JyB9LFxuXHRdLFxuICAgICAgfVxuICAgIF0sXG4gIH0sXG4vKiAgXG4gIHsgbGFiZWw6ICdXaW5kb3cnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICBdLFxuICB9LFxuKi9cbl1cblxuY29uc3QgZmlsZU1lbnVUZW1wbGF0ZSA9IFtcbiAgeyBsYWJlbDogJ05ldyAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrTlwiLCBjbGljazogJ29wZW5OZXdEaWFsb2cnIH0sXG4gIHsgbGFiZWw6ICdPcGVuIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtPXCIsIGNsaWNrOiAnb3BlbkRpYWxvZycgfSxcbiAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuXVxuXG5jb25zdCBvdGhlck1lbnVUZW1wbGF0ZSA9IFtcbiAgeyBsYWJlbDogJ05vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdDbG9zZScsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtXXCIsIGNsaWNrOiAnY2xvc2UnIH0sXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UgQWxsJywgY2xpY2s6ICdjbG9zZUFsbCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTXCIsIGNsaWNrOiAnc25hcHNob3QnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrU2hpZnQrSVwiLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgYWNjZWxlcmF0b3I6IFwiQ21kT3JDdHJsK1BcIiwgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtTaGlmdCtQXCIsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K2lcIiwgY2xpY2s6ICdhcHBlbmRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgRm9yd2FyZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0Ky5cIiwgY2xpY2s6ICdtb3ZlUGFnZUZvcndhcmQnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBCYWNrd2FyZCcsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0KyxcIiwgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBhY2NlbGVyYXRvcjogXCJTaGlmdCtLXCIsIGNsaWNrOiAnY3V0UGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGFjY2VsZXJhdG9yOiBcIlNoaWZ0K1lcIiwgY2xpY2s6ICdwYXN0ZVBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnRW1wdHkgQnVmZmVyJywgYWNjZWxlcmF0b3I6IFwiU2hpZnQrMFwiLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ0V4dHJhY3QgVGV4dCcsIGFjY2VsZXJhdG9yOiBcIkNtZE9yQ3RybCtUXCIsIGNsaWNrOiAnZXh0cmFjdFRleHQnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBhY2NlbGVyYXRvcjogXCJDbWRPckN0cmwrLVwiLCBjbGljazogJ3NhdmVQYWdlSW1hZ2UnIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1ZpZXcnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdGdWxsIFNjcmVlbicsIGFjY2VsZXJhdG9yOiAnQ29tbWFuZCtDdHJsK0YnLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgYWNjZWxlcmF0b3I6ICdDb21tYW5kK0FsdCtTJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBhY2NlbGVyYXRvcjogXCJDb21tYW5kK0FsdCtKXCIsIGNsaWNrOiAnZGV2ZWxvcGVyVG9vbHMnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnWm9vbSBJbicsIGFjY2VsZXJhdG9yOiAnWycsIGNsaWNrOiAnem9vbScgfSwgXG4gICAgICB7IGxhYmVsOiAnWm9vbSBPdXQnLCBhY2NlbGVyYXRvcjogJ10nLCBjbGljazogJ3Vuem9vbScgfSwgXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUGFnZSBNYXJnaW4nLCBhY2NlbGVyYXRvcjogXCJSXCIsIGNsaWNrOiAnc2hvd01hcmdpbicgfSxcbiAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgUGFnZXMgcGVyIFJvdycsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnMicsIGNsaWNrOiAncm93MScgfSxcblx0ICB7IGxhYmVsOiAnNCcsIGNsaWNrOiAncm93MicgfSxcblx0ICB7IGxhYmVsOiAnNicsIGNsaWNrOiAncm93MycgfSxcblx0ICB7IGxhYmVsOiAnOCcsIGNsaWNrOiAncm93NCcgfSxcblx0XSxcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuLyogIFxuICB7IGxhYmVsOiAnV2luZG93JyxcbiAgICBzdWJtZW51OiBbXG4gICAgXSxcbiAgfSxcbiovXG4gIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnSGVscCcsIGNsaWNrOiAnYWJvdXQnIH0sXG5dXG5cbmNvbnN0IHNpZGViYXJNZW51VGVtcGxhdGUgPSBbXG4gIHsgbGFiZWw6ICfjgrXjgqTjg4njg5Djg7zjga7kvY3nva4nLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICflt6YnLCBjbGljazogJ2RvY2tMZWZ0JyB9LFxuICAgICAgeyBsYWJlbDogJ+WPsycsIGNsaWNrOiAnZG9ja1JpZ2h0JyB9LFxuICAgIF0sXG4gIH0sXG5dXG5cbmV4cG9ydCB7IG1lbnVUZW1wbGF0ZSwgZmlsZU1lbnVUZW1wbGF0ZSwgb3RoZXJNZW51VGVtcGxhdGUsIHNpZGViYXJNZW51VGVtcGxhdGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBtZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCB0ZW1wbGF0ZVxubGV0IHN0YXRlcyA9IHt9XG5cbmNvbnN0IGZpbmRTdWJtZW51ID0gKHRlbXBsYXRlLCBsYWJlbCkgPT4ge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGVtcGxhdGUpIHtcbiAgICBpZiAoaXRlbS5sYWJlbCA9PSBsYWJlbCkge1xuICAgICAgcmV0dXJuIGl0ZW1cbiAgICB9XG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZFN1Ym1lbnUoaXRlbS5zdWJtZW51LCBsYWJlbClcbiAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3Qgc2V0U3RhdGUgPSAodGVtcGxhdGUsIGxhYmVsLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpdGVtID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsIGxhYmVsKVxuICBpZiAoaXRlbSkge1xuICAgIHZhbHVlID0gKHZhbHVlKSA/IHRydWUgOiBmYWxzZVxuXG4gICAgaXRlbS5lbmFibGVkID0gdmFsdWVcbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBpZiAoIXZhbHVlKSBkZWxldGUoaXRlbS5zdWJtZW51KVxuICAgIH1cbiAgICBzdGF0ZXNbbGFiZWxdID0gdmFsdWVcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRlbXBsYXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZW51VGVtcGxhdGUpKVxuICAgIHN0YXRlcyA9IHt9XG4gICAgXG4gICAgdGhpcy51cGRhdGVSZWNlbnRzKHRlbXBsYXRlKVxuICAgIHRoaXMudXBkYXRlU3RhdGVzKHRlbXBsYXRlKVxuICAgIHRoaXMucmVidWlsZCh0ZW1wbGF0ZSlcbiAgfVxuXG4gIHJlYnVpbGQodGVtcGxhdGUpIHtcbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBuYW1lbm90ZS5hcHAucmVidWlsZE1lbnUodGVtcGxhdGUpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUmVjZW50cyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IHJlY2VudHMgPSBmaW5kU3VibWVudSh0ZW1wbGF0ZSwgJ09wZW4gUmVjZW50Jykuc3VibWVudVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNlbnRVUkwuZGF0YSkge1xuICAgICAgcmVjZW50cy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IGl0ZW0sIGRhdGE6IGl0ZW0sIGNsaWNrOiAnb3BlblVSTCdcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU3RhdGVzKHRlbXBsYXRlKSB7XG4gICAgY29uc3QgaXNBcHAgPSAobmFtZW5vdGUuYXBwKSA/IHRydWUgOiBmYWxzZVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRnVsbCBTY3JlZW4nLCBpc0FwcCB8fCB3aW5kb3cuY2hyb21lKVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRGV2ZWxvcGVyIFRvb2xzJywgaXNBcHApXG5cbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIGNvbnN0IGlzUHJvamVjdCA9IChwcm9qZWN0KSA/IHRydWUgOiBmYWxzZVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQ2xvc2UnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdDbG9zZSBBbGwnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJy50eHQgKFBsYWluIFRleHQpIC4uLicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJy5jc25mIChDTElQIFNUVURJTyBTdG9yeWJvYXJkKSAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcucGRmIChQREYpIC4uLicsIGlzUHJvamVjdClcbiAgICBcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0FkZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ01vdmUgdG8gQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdFbXB0eSBCdWZmZXInLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIEZvcndhcmQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIEJhY2t3YXJkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRXh0cmFjdCBUZXh0JywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBpc1Byb2plY3QpXG5cbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1VuZG8nLCBpc1Byb2plY3QpIC8vICYmIHByb2plY3QuaGlzdG9yeS5oYXNVbmRvKCkpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdSZWRvJywgaXNQcm9qZWN0KSAvLyAmJiBwcm9qZWN0Lmhpc3RvcnkuaGFzUmVkbygpKVxuICB9XG5cbiAgZ2V0U3RhdGUobGFiZWwpIHtcbiAgICByZXR1cm4gc3RhdGVzW2xhYmVsXVxuICB9XG59XG5cbmNvbnN0IG1lbnUgPSBuZXcgTWVudSgpXG5cbmV4cG9ydCB7IG1lbnUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcbmltcG9ydCB7IHNob3J0Y3V0IH0gZnJvbSAnLi9zaG9ydGN1dC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHVpIH0gZnJvbSAnLi91aS5lczYnXG5cbmltcG9ydCB7IG1haW5WaWV3IH0gZnJvbSAnLi9tYWluLXZpZXcuZXM2J1xuaW1wb3J0IHsgcGFnZVZpZXcgfSBmcm9tICcuL3BhZ2Utdmlldy5lczYnXG5pbXBvcnQgeyB0ZXh0VmlldyB9IGZyb20gJy4vdGV4dC12aWV3LmVzNidcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTmFtZW5vdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlcnNpb24gPSBcIjIuMC4wLWFscGhhLjEtZGVidWdcIlxuICAgIHRoaXMudHJpYWwgPSBmYWxzZVxuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB0aGlzLnNob3J0Y3V0ID0gc2hvcnRjdXRcbiAgICB0aGlzLnJlY2VudFVSTCA9IHJlY2VudFVSTFxuICAgIFxuICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmRcbiAgICB0aGlzLnVpID0gdWlcblxuICAgIHRoaXMubWFpblZpZXcgPSBtYWluVmlld1xuICAgIHRoaXMucGFnZVZpZXcgPSBwYWdlVmlld1xuICAgIHRoaXMudGV4dFZpZXcgPSB0ZXh0Vmlld1xuICAgIFxuICAgIHRoaXMucHJvamVjdE1hbmFnZXIgPSBwcm9qZWN0TWFuYWdlclxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25maWcubG9hZCgpXG4gICAgc2hvcnRjdXQubG9hZCgpXG4gICAgcmVjZW50VVJMLmxvYWQoKVxuICAgIFxuICAgIHVpLmluaXQoKVxuXG4gICAgbWFpblZpZXcuaW5pdCgpXG4gICAgcGFnZVZpZXcuaW5pdCgpXG4gICAgdGV4dFZpZXcuaW5pdCgpXG4gICAgXG4gICAgdGhpcy5pbml0QmFzZUhhbmRsZXJzKClcbiAgfVxuXG4gIGluaXRCYXNlSGFuZGxlcnMoKSB7XG4gICAgd2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvZygnb25yZXNpemUnLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IChlKSA9PiB7XG4gICAgICBsb2coJ2NvbnRleHRtZW51JylcbiAgICB9XG4gIH1cblxuICBpc01hYygpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbmNvbnN0IG5hbWVub3RlID0gbmV3IE5hbWVub3RlKClcblxuZXhwb3J0IHsgbmFtZW5vdGUgfVxuICAgIFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZVZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cbn1cblxuY29uc3QgcGFnZVZpZXcgPSBuZXcgUGFnZVZpZXcoKVxuXG5leHBvcnQgeyBwYWdlVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5waWQgPSAwXG4gIH1cblxuICBkZXN0cnVjdG9yKCkge1xuICAgIGxvZygncGFnZSBkZXN0cnVjdG9yJywgdGhpcy5waWQpXG4gIH1cbn1cblxuZXhwb3J0IHsgUGFnZSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5pbXBvcnQgeyB0aXRsZSB9IGZyb20gJy4vdGl0bGUuZXM2J1xuXG5pbXBvcnQgeyBtYWluVmlldyB9IGZyb20gJy4vbWFpbi12aWV3LmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIHNlbGVjdChwcm9qZWN0KSB7XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgocHJvamVjdC51cmwpXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KVxuICAgICAgfVxuICAgICAgcmVjZW50VVJMLmFkZChwcm9qZWN0LnVybClcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jdXJyZW50ID0gcHJvamVjdFxuICAgIG1haW5WaWV3LnNldFByb2plY3QocHJvamVjdClcbiAgICB0aXRsZS5zZXQocHJvamVjdCA/IHByb2plY3QubmFtZSgpIDogbnVsbClcbiAgICBtZW51LnVwZGF0ZSgpXG4gIH1cblxuICBmaW5kSW5kZXgodXJsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS51cmwgPT0gdXJsKSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMVxuICB9XG4gIFxuICBvcGVuKHVybCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgodXJsKVxuICAgIGNvbnN0IHByb2plY3QgPSAoaW5kZXggPj0gMCkgPyB0aGlzLnByb2plY3RzW2luZGV4XSA6IG5ldyBQcm9qZWN0KHVybClcblxuICAgIHRoaXMuc2VsZWN0KHByb2plY3QpXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0KVxuICB9XG5cbiAgY2xvc2UocHJvamVjdCkge1xuICAgIHdhcm4oJ1tjbG9zZV0nLCBwcm9qZWN0KVxuICAgIGlmICghcHJvamVjdCkgcHJvamVjdCA9IHRoaXMuY3VycmVudFxuICAgIGlmICghcHJvamVjdCkgcmV0dXJuXG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHByb2plY3QudXJsKVxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGlmIChwcm9qZWN0ID09IHRoaXMuY3VycmVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLnByb2plY3RzW3RoaXMucHJvamVjdHMubGVuZ3RoIC0gMV0pXG4gICAgICB9XG4gICAgICBwcm9qZWN0LmRlc3RydWN0b3IoKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcm9qZWN0TWFuYWdlciA9IG5ldyBQcm9qZWN0TWFuYWdlclxuXG5leHBvcnQgeyBwcm9qZWN0TWFuYWdlciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gICAgdGhpcy5wYWdlcyA9IFtdXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3Byb2plY3QgZGVzdHJ1Y3RvcicsIHRoaXMudXJsKVxuICAgIFxuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2UuZGVzdHJ1Y3RvcigpXG4gICAgfSlcbiAgfVxuXG4gIGZpbmRJbmRleChwYWdlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wYWdlc1tpXS5waWQgPT0gcGFnZS5waWQpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBuYW1lKCkge1xuICAgIHJldHVybiAodGhpcy51cmwpID8gdGhpcy51cmwucmVwbGFjZSgvXi4qXFwvLywgJycpIDogVCgnVW50aXRsZWQnKVxuICB9XG59XG5cbmV4cG9ydCB7IFByb2plY3QgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmNvbnN0IG1heCA9IDEwXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUmVjZW50VVJMIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJylcbiAgICB0aGlzLmRhdGEgPSAoanNvbikgPyBKU09OLnBhcnNlKGpzb24pIDogW11cbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvcmVjZW50LXVybCcsIGpzb24pXG4gIH1cblxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgICB0aGlzLnNhdmUoKVxuXG4vLyAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbWVudS51cGRhdGUoKVxuLy8gIH0sIDUwMClcbiAgfVxuXG4gIGFkZCh1cmwpIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgIT0gdXJsKVxuICAgIHRoaXMuZGF0YS51bnNoaWZ0KHVybClcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gbWF4KSB7XG4gICAgICB0aGlzLmRhdGEubGVuZ3RoID0gbWF4XG4gICAgfVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cbn1cblxuY29uc3QgcmVjZW50VVJMID0gbmV3IFJlY2VudFVSTCgpXG5cbmV4cG9ydCB7IHJlY2VudFVSTCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcblxubGV0IHF1aWNrWm9vbUJ1dHRvblxubGV0IHpvb21CdXR0b25cbmxldCB1bnpvb21CdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBTY2FsZUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBxdWlja1pvb21CdXR0b24gPSAkKCcjcm93LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9tYWduaWZpZXItYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQucXVpY2tab29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICB6b29tQnV0dG9uID0gJCgnI3pvb20tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3pvb20tYnV0dG9uLnBuZycsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC56b29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICB1bnpvb21CdXR0b24gPSAkKCcjdW56b29tLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy91bnpvb20tYnV0dG9uLnBuZycsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC51bnpvb20oKSB9XG4gICAgfSlbMF1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIGNvbnN0IHF1aWNrWm9vbSA9IChwcm9qZWN0KSA/IHByb2plY3Qudmlldy5xdWlja1pvb20gOiBmYWxzZVxuICAgIFxuICAgICQocXVpY2tab29tQnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgcXVpY2tab29tKVxuICAgICQoem9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG4gICAgJCh1bnpvb21CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFxdWlja1pvb20pXG4gIH1cbn1cblxuY29uc3Qgc2NhbGVCdXR0b24gPSBuZXcgU2NhbGVCdXR0b24oKVxuXG5leHBvcnQgeyBzY2FsZUJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3Qgc2hvcnRjdXREZWZhdWx0ID0ge1xuICB1bmRvOiBbJ2NvbW1hbmQreicsICdjdHJsK3onLCAnbnVtLycsICcsJ10sXG4gIHJlZG86IFsnY29tbWFuZCt5JywgJ2N0cmwreScsICdudW0qJywgJy4nXSxcbiAgem9vbTogWydbJywgJ3EnLCAnbnVtcGx1cyddLFxuICB1bnpvb206IFsnXScsICdhJywgJ251bW1pbnVzJ10sXG4gIHRvZ2dsZVRvb2w6IFsneCcsICdudW0uJywgJy8nXSxcblxuICBvcGVuTmV3RGlhbG9nOiBbJ2NvbW1hbmQrbicsICdhbHQrbiddLFxuICBvcGVuRGlhbG9nOiBbJ2NvbW1hbmQrbycsICdhbHQrbyddLFxuICBcbiAgY2xvc2U6IFsnY29tbWFuZCt3JywgJ2FsdCt3J10sXG4gIHF1aXQ6IFsnY29tbWFuZCtxJywgJ2FsdCtxJ10sXG4gIHJlbG9hZDogWydjb21tYW5kK3NoaWZ0K3InXSxcblxuICBleHBvcnRDU05GRGlhbG9nOiBbJ2NvbW1hbmQrcCcsICdhbHQrcCddLFxuICBleHBvcnRQREZEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtwJywgJ2FsdCtzaGlmdCtwJ10sXG4gIGltcG9ydFRleHREaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIHNhdmVQYWdlSW1hZ2U6IFsnY29tbWFuZCstJywgJ2FsdCstJ10sXG4gIGV4dHJhY3RUZXh0OiBbJ2NvbW1hbmQrdCcsICdhbHQrdCddLFxuXG4gIC8vbWFyZ2luU2V0dGluZ3NEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIFxuICBwYWdlTGVmdDogJ2xlZnQnLFxuICBwYWdlUmlnaHQ6ICdyaWdodCcsXG4gIHBhZ2VVcDogJ3VwJywgICAgICBcbiAgcGFnZURvd246ICdkb3duJywgIFxuXG4gIHNlbGVjdEFsbDogJ2N0cmwrYScsXG4gIHVuc2VsZWN0OiAnY3RybCtkJyxcbiAgbWVyZ2VUZXh0OiAnY3RybCtlJyxcbiAgXG4gIHNpZGVCYXI6ICdjb21tYW5kK2FsdCtzJyxcbiAgZGV2ZWxvcGVyVG9vbHM6ICdjb21tYW5kK2FsdCtqJyxcbiAgdG9vbEJhcjogJ2NvbW1hbmQrYWx0K2gnLFxuXG4gIHBlbjogJ3AnLFxuICBlcmFzZXI6ICdlJyxcbiAgdGV4dDogJ3QnLFxuXG4gIC8vXG4gIC8vIFBhZ2Ugc2hvcnRjdXRzXG4gIC8vXG4gIFxuICBpbnNlcnRQYWdlOiAnc2hpZnQraScsXG4gIGR1cGxpY2F0ZVBhZ2U6ICdzaGlmdCtkJyxcblxuICBzaG93TWFyZ2luOiAncicsXG4vL2ZsaXBQYWdlOiAnaCcsXG4gIGFwcGVuZFBhZ2U6ICdzaGlmdCthJyxcbiAgY3V0UGFnZTogJ3NoaWZ0K2snLFxuICBwYXN0ZVBhZ2U6ICdzaGlmdCt5JyxcbiAgZW1wdHlQYWdlOiAnc2hpZnQrMCcsXG4gIG1vdmVQYWdlTGVmdDogJzwnLFxuICBtb3ZlUGFnZVJpZ2h0OiAnPicsXG4gIHJvdzE6ICdzaGlmdCsxJyxcbiAgcm93MjogJ3NoaWZ0KzInLFxuICByb3czOiAnc2hpZnQrMycsXG4gIHJvdzQ6ICdzaGlmdCs0JyxcblxuICAvL1xuICAvLyBUZXh0IHNob3J0Y3V0cyAoY2FuIGJlIHVzZWQgd2hpbGUgdGV4dCBlZGl0aW5nKVxuICAvL1xuICBcbiAgdG9nZ2xlRWRpdE1vZGU6ICdjdHJsK2cnLFxuICBhZGRGb250U2l6ZTogJ2N0cmwrLicsXG4gIHN1YnRyYWN0Rm9udFNpemU6ICdjdHJsKywnLFxuICB0b2dnbGVEaXJlY3Rpb246ICdjdHJsK10nLFxuICBjdXRUZXh0OiAnYmFja3NwYWNlJyxcbiAgbmV4dFRleHQ6ICd0YWInLFxuICBwcmV2VGV4dDogJ3NoaWZ0K3RhYicsXG59XG5cbmV4cG9ydCB7IHNob3J0Y3V0RGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuLy9pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXREZWZhdWx0IH0gZnJvbSAnLi9zaG9ydGN1dC1kZWZhdWx0LmVzNidcbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG4vKlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5lczYnXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmVzNidcbiovXG5cbmltcG9ydCB7IHVpIH0gZnJvbSAnLi91aS5lczYnXG5cbmNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cblxuICAgIE1vdXNldHJhcC5hZGRLZXljb2Rlcyh7XG4gICAgICAxMDc6ICdudW1wbHVzJyxcbiAgICAgIDEwOTogJ251bW1pbnVzJyxcbiAgICAgIDExMDogJ251bS4nLFxuICAgICAgMTExOiAnbnVtLycsXG4gICAgICAxMDY6ICdudW0qJyxcbiAgICB9KVxuXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbihlLCBlbGVtZW50LCBjb21ibykge1xuLypcbiAgICAgIGlmIChUZXh0LmlzRWRpdGFibGUoZWxlbWVudCkpIHtcbiAgICAgICAgbG9nKCdrZXljb2RlPScsIGUua2V5Q29kZSwgZSlcblxuXHRpZiAoZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLm1ldGFLZXkpIHtcblx0ICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXHQgIGNhc2UgNzE6ICAvLyBjdHJsK2dcblx0ICBjYXNlIDE4ODogLy8gY3RybCssXG5cdCAgY2FzZSAxOTA6IC8vIGN0cmwrLlxuXHQgIGNhc2UgMjIxOiAvLyBjdHJsK11cblx0ICAgIHJldHVybiBmYWxzZVxuXHQgIH1cblx0fVxuXG5cdGlmIChlLmtleUNvZGUgPT0gOSkgeyAvLyBUQUJcblx0ICByZXR1cm4gZmFsc2Vcblx0fVxuXHRyZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4qL1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9zaG9ydGN1dCcpXG4gICAgdGhpcy5kYXRhID0ganNvbiA/IEpTT04ucGFyc2UoanNvbikgOiBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dERlZmF1bHQpXG4gICAgdGhpcy5iaW5kKClcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvc2hvcnRjdXQnLCBqc29uKVxuICB9XG4gIFxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc2hvcnRjdXREZWZhdWx0KVxuICAgIHRoaXMuc2F2ZSgpXG5cbiAgICBNb3VzZXRyYXAucmVzZXQoKVxuICAgIHRoaXMuYmluZCgpXG4gIH1cblxuICBiaW5kKCkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5kYXRhKSB7XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmRhdGFbaXRlbV1cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kW2l0ZW1dXG5cbiAgICAgIGlmIChpdGVtID09ICdkZXZlbG9wZXJUb29scycpIGNvbnRpbnVlXG5cbiAgICAgIGlmIChoYW5kbGVyKSB7XG5cdGxvZyhgJyR7aXRlbX1gKVxuICAgICAgICBcblx0TW91c2V0cmFwLmJpbmQoa2V5LCAoZSkgPT4ge1xuXHQgIGNvbW1hbmQucHJldiA9IGNvbW1hbmQuY3VycmVudFxuXHQgIGNvbW1hbmQuY3VycmVudCA9IGl0ZW1cblx0ICBsb2coYCoke2l0ZW19KmApXG4gICAgICAgICAgXG5cdCAgaGFuZGxlcigpXG5cdCAgcmV0dXJuICh1aS5kaWFsb2cuaXNPcGVuKCkpID8gdHJ1ZSA6IGZhbHNlXG5cblx0fSwgJ2tleWRvd24nKVxuXG4gICAgICB9IGVsc2Uge1xuXHRsb2coYCcke2l0ZW19Jzogbm8gc3VjaCBjb21tYW5kYClcbiAgICAgIH1cbiAgICB9XG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgQ29udHJvbGxlci5jbGVhck1vdmUoKVxuLy8gICAgcmV0dXJuIGZhbHNlO1xuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnZW50ZXInLCAoZSkgPT4ge1xuLy8gICAgaWYgKHVpLmRpYWxvZy5pc09wZW4oKSkgcmV0dXJuIHRydWVcbi8vICAgIGNvbW1hbmQucXVpY2tab29tKClcbi8vICAgIHJldHVybiBmYWxzZVxuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgaWYgKCFDb250cm9sbGVyLmlzTW92ZWQoKSkge1xuLy9cdGNvbW1hbmQucXVpY2tab29tKCk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSwgJ2tleXVwJylcbiAgfVxufVxuXG5jb25zdCBzaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCgpXG5cbmV4cG9ydCB7IHNob3J0Y3V0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcblxubGV0IHBhZ2VCdXR0b25cbmxldCB0ZXh0QnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2lkZUJhclRhYiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdXG4gIH1cblxuICBpbml0KCkge1xuICAgIHBhZ2VCdXR0b24gPSAkKCcjcGFnZS12aWV3LWJ1dHRvbicpLnRleHRCdXR0b24oe1xuICAgICAgdGV4dDogVCgnUGFnZXMnKSxcbiAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS50ZXh0QnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgY29tbWFuZC5zaG93UGFnZVZpZXcoKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlbMF1cblxuICAgIHRleHRCdXR0b24gPSAkKCcjdGV4dC12aWV3LWJ1dHRvbicpLnRleHRCdXR0b24oe1xuICAgICAgdGV4dDogVCgnVGV4dHMnKSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS50ZXh0QnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgY29tbWFuZC5zaG93VGV4dFZpZXcoKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKHBhZ2VCdXR0b24sIHRleHRCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cblxuICBzZWxlY3QobmFtZSkge1xuICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgY29uc3QgbG9ja2VkID0gJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcpXG5cbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkLmluZGV4T2YobmFtZSkgPT0gMCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS50ZXh0QnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHNpZGVCYXJUYWIgPSBuZXcgU2lkZUJhclRhYigpXG5cbmV4cG9ydCB7IHNpZGVCYXJUYWIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHNpZGVCYXJUYWIgfSBmcm9tICcuL3NpZGUtYmFyLXRhYi5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2lkZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzaWRlQmFyVGFiLmluaXQoKVxuICB9XG4gIFxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBzaWRlQmFyVGFiLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhciA9IG5ldyBTaWRlQmFyKClcblxuZXhwb3J0IHsgc2lkZUJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUZXh0VmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxufVxuXG5jb25zdCB0ZXh0VmlldyA9IG5ldyBUZXh0VmlldygpXG5cbmV4cG9ydCB7IHRleHRWaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG5jbGFzcyBUaXRsZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXQoKVxuICB9XG4gIFxuICBzZXQodGl0bGUpIHtcbiAgICBpZiAoIXRpdGxlKSB7XG4gICAgICB0aXRsZSA9IChuYW1lbm90ZS50cmlhbCkgPyBgJHtUKCdOYW1lbm90ZScpfSAke1QoJ1RyaWFsJyl9YCA6IFQoJ05hbWVub3RlJylcbiAgICB9XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnNldFRpdGxlKHRpdGxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRpdGxlID0gbmV3IFRpdGxlKClcblxuZXhwb3J0IHsgdGl0bGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcbmltcG9ydCB7IHNjYWxlQnV0dG9uIH0gZnJvbSAnLi9zY2FsZS1idXR0b24uZXM2J1xuaW1wb3J0IHsgaGlzdG9yeUJ1dHRvbiB9IGZyb20gJy4vaGlzdG9yeS1idXR0b24uZXM2J1xuaW1wb3J0IHsgdG9vbEJ1dHRvbiB9IGZyb20gJy4vdG9vbC1idXR0b24uZXM2J1xuaW1wb3J0IHsgbWVudUJ1dHRvbiB9IGZyb20gJy4vbWVudS1idXR0b24uZXM2J1xuXG5jbGFzcyBUb29sQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHNjYWxlQnV0dG9uLmluaXQoKVxuICAgIGhpc3RvcnlCdXR0b24uaW5pdCgpXG4gICAgdG9vbEJ1dHRvbi5pbml0KClcbiAgICBtZW51QnV0dG9uLmluaXQoKVxuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIHRoaXMudXBkYXRlQnV0dG9ucygpXG4gIH1cbiAgXG4gIHVwZGF0ZUJ1dHRvbnMoKSB7XG4gICAgc2NhbGVCdXR0b24udXBkYXRlKClcbiAgICBoaXN0b3J5QnV0dG9uLnVwZGF0ZSgpXG4gICAgdG9vbEJ1dHRvbi51cGRhdGUoKVxuICAgIG1lbnVCdXR0b24udXBkYXRlKClcbiAgfVxuICBcbiAgdXBkYXRlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS50b29sQmFyXG4gICAgY29uZmlnLmRhdGEudG9vbEJhciA9IHZhbHVlXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgJCgnI3Rvb2xiYXInKS5jc3MoJ2Rpc3BsYXknLCB2YWx1ZSA/ICdibG9jaycgOiAnbm9uZScpXG4gICAgJCgnI21haW4nKS5jc3MoJ2hlaWdodCcsIHZhbHVlID8gJ2NhbGMoMTAwJSAtIDM3cHgpJyA6ICcxMDAlJylcbiAgICAkKCcjbWFpbicpLmNzcygndG9wJywgdmFsdWUgPyAnMzdweCcgOiAnMCcpXG5cbiAgICAvL1ZpZXcub25SZXNpemUoKVxuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudXBkYXRlKCFjb25maWcuZGF0YS50b29sQmFyKVxuICB9XG59XG5cbmNvbnN0IHRvb2xCYXIgPSBuZXcgVG9vbEJhcigpO1xuXG5leHBvcnQgeyB0b29sQmFyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IGh0bWxEcm9wZG93biB9IGZyb20gJy4vaHRtbC1kcm9wZG93bi5lczYnXG5cbmxldCBwZW5CdXR0b25cbmxldCBlcmFzZXJCdXR0b25cbmxldCB0ZXh0QnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVG9vbEJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdXG4gIH1cblxuICBpbml0KCkge1xuICAgIHBlbkJ1dHRvbiA9ICQoJyNwZW4tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3Blbi1idXR0b24ucG5nJyxcbiAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdCgncGVuJylcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbERyb3Bkb3duLm1ha2UoJ3BlbkRyb3BEb3duJywgJ3BlbicpXG4gICAgfSlbMF1cbiAgICBcbiAgICBlcmFzZXJCdXR0b24gPSAkKCcjZXJhc2VyLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9lcmFzZXItYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ2VyYXNlcicpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCdlcmFzZXJEcm9wRG93bicsICdlcmFzZXInKVxuICAgIH0pWzBdXG5cbiAgICB0ZXh0QnV0dG9uID0gJCgnI3RleHQtYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3RleHQtYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3RleHQnKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgndGV4dERyb3BEb3duJywgJ3RleHQnKVxuICAgIH0pWzBdXG5cbiAgICB0aGlzLmJ1dHRvbnMucHVzaChwZW5CdXR0b24sIGVyYXNlckJ1dHRvbiwgdGV4dEJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuXG4gIHNlbGVjdChuYW1lKSB7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBjb25zdCBsb2NrZWQgPSAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcpXG4gICAgICBcbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkLmluZGV4T2YobmFtZSkgPT0gMCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgdG9vbEJ1dHRvbiA9IG5ldyBUb29sQnV0dG9uKClcblxuZXhwb3J0IHsgdG9vbEJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgd2lkZ2V0IH0gZnJvbSAnLi93aWRnZXQuZXM2J1xuaW1wb3J0IHsgZGl2aWRlciB9IGZyb20gJy4vZGl2aWRlci5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcbmltcG9ydCB7IHRpdGxlIH0gZnJvbSAnLi90aXRsZS5lczYnXG5cbmltcG9ydCB7IHRvb2xCYXIgfSBmcm9tICcuL3Rvb2wtYmFyLmVzNidcbmltcG9ydCB7IHNpZGVCYXIgfSBmcm9tICcuL3NpZGUtYmFyLmVzNidcblxuY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm1lbnUgPSBtZW51XG4gICAgdGhpcy5kaXZpZGVyID0gZGl2aWRlclxuICAgIHRoaXMuZGlhbG9nID0gZGlhbG9nXG5cbiAgICB0aGlzLnRvb2xCYXIgPSB0b29sQmFyXG4gICAgdGhpcy5zaWRlQmFyID0gc2lkZUJhclxuICB9XG4gIFxuICBpbml0KCkge1xuICAgIG1lbnUuaW5pdCgpXG4gICAgdGl0bGUuaW5pdCgpXG4gICAgZGl2aWRlci5pbml0KClcbiAgICBkaWFsb2cuaW5pdCgpXG5cbiAgICB0b29sQmFyLmluaXQoKVxuICAgIHNpZGVCYXIuaW5pdCgpXG5cbiAgICAkKCcuc3BsaXQtcGFuZScpLmNzcygnb3BhY2l0eScsIDEpXG4gIH1cblxuICB1cGRhdGUoKSB7XG4vLyAgdG9vbEJhci51cGRhdGUoKVxuLy8gIHNpZGVCYXIudXBkYXRlKClcblxuLy8gIGRpdmlkZXIudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCB1aSA9IG5ldyBVSSgpXG5cbmV4cG9ydCB7IHVpIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBXaWRnZXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluaXRJbWFnZUJ1dHRvbigpXG4gICAgdGhpcy5pbml0VGV4dEJ1dHRvbigpXG4gIH1cblxuICBpbml0VGV4dEJ1dHRvbigpIHtcbiAgICAkLndpZGdldCgnbmFtZW5vdGUudGV4dEJ1dHRvbicsIHtcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgaGVpZ2h0OiAnMjRweCcsXG4gICAgICAgIGxvY2tlZDogZmFsc2UsXG4gICAgICB9LFxuXG4gICAgICBfY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCd0ZXh0LWJ1dHRvbicpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2Zsb2F0JywgdGhpcy5vcHRpb25zLmZsb2F0KVxuICAgICAgICB0aGlzLmxvY2tlZCh0aGlzLm9wdGlvbnMubG9ja2VkKVxuICAgICAgICB0aGlzLmVsZW1lbnQudGV4dCh0aGlzLm9wdGlvbnMudGV4dClcblxuICAgICAgICBjb25zdCBjbGljayA9IHRoaXMub3B0aW9ucy5jbGlja1xuICAgICAgICBpZiAoY2xpY2spIHRoaXMuZWxlbWVudC5vbignY2xpY2snLCBjbGljaylcbiAgICAgIH0sXG5cbiAgICAgIGxvY2tlZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnMubG9ja2VkXG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmxvY2tlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSlcbiAgfVxuICBcbiAgaW5pdEltYWdlQnV0dG9uKCkge1xuICAgICQud2lkZ2V0KCduYW1lbm90ZS5pbWFnZUJ1dHRvbicsIHtcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgd2lkdGg6ICcyNHB4JyxcbiAgICAgICAgaGVpZ2h0OiAnMjRweCcsXG4gICAgICAgIGxvY2tlZDogZmFsc2UsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gIFxuICAgICAgX2NyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnaW1nLWJ1dHRvbicpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCR7dGhpcy5vcHRpb25zLnNyY30pYClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnZmxvYXQnLCB0aGlzLm9wdGlvbnMuZmxvYXQpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ3dpZHRoJywgdGhpcy5vcHRpb25zLndpZHRoKVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCdoZWlnaHQnLCB0aGlzLm9wdGlvbnMuaGVpZ2h0KVxuXG4gICAgICAgIHRoaXMubG9ja2VkKHRoaXMub3B0aW9ucy5sb2NrZWQpXG4gICAgICAgIHRoaXMuZGlzYWJsZWQodGhpcy5vcHRpb25zLmRpc2FibGVkKVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50KSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50XG4gICAgICAgICAgY29udGVudC50aXRsZSA9IFwiXCJcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZsb2F0ID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUucmlnaHQgPSBcIjBcIlxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudFBhcmVudCB8fCB0aGlzLmVsZW1lbnRbMF1cbiAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGVudClcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRQYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNob3VsZCByZWNhbGMgbWVudSBwb3N0aW9uIG9uIG9wZW5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGljayA9IHRoaXMub3B0aW9ucy5jbGlja1xuICAgICAgICBpZiAoY2xpY2spIHRoaXMuZWxlbWVudC5vbignY2xpY2snLCBjbGljaylcbiAgICAgIH0sXG5cbiAgICAgIGxvY2tlZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnMubG9ja2VkXG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmxvY2tlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuXHQgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfSBlbHNlIHtcblx0ICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGRpc2FibGVkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXNhYmxlZFxuICAgICAgXG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXNhYmxlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuXHQgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnb2ZmJylcbiAgICAgICAgfSBlbHNlIHtcblx0ICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ29mZicpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZUNvbnRlbnRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50XG4gICAgICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9IHRoaXMub3B0aW9ucy5jb250ZW50V2lkdGggfHwgMTUwXG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXG4gICAgICAgIGNvbnN0IGxlZnQgPSAocmVjdC54ICsgY29udGVudFdpZHRoKSA8IHdpZHRoID8gcmVjdC54IDogd2lkdGggLSBjb250ZW50V2lkdGhcbiAgICAgICAgY29udGVudC5zdHlsZS5sZWZ0ID0gKGxlZnQgLSAyKSArICdweCdcbiAgICAgICAgY29udGVudC5zdHlsZS50b3AgPSAoNjQgKyAyKSArICdweCdcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KClcblxuZXhwb3J0IHsgd2lkZ2V0IH1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGljdGlvbmFyeSA9IHtcbiAgXCJqYVwiOiB7XG4gICAgXCJOYW1lbm90ZVwiOiBcIk5hbWVub3RlXCIsXG4gICAgXCJBYm91dCBOYW1lbm90ZVwiOiBcIk5hbWVub3RlIOOBq+OBpOOBhOOBplwiLFxuICAgIFwiQWJvdXQgTmFtZW5vdGUgLi4uXCI6IFwiTmFtZW5vdGUg44Gr44Gk44GE44GmIC4uLlwiLFxuICAgIFwiSGVscFwiOiBcIuODmOODq+ODl1wiLFxuICAgIFwiU2V0dGluZ3NcIjogXCLnkrDlooPoqK3lrppcIixcbiAgICBcIlNldHRpbmdzIC4uLlwiOiBcIueSsOWig+ioreWumiAuLi5cIixcbiAgICBcIlRhYmxldCBTZXR0aW5nc1wiOiBcIuethuWcp+iqv+aVtFwiLFxuICAgIFwiVGFibGV0IFNldHRpbmdzIC4uLlwiOiBcIuethuWcp+iqv+aVtCAuLi5cIixcbiAgICBcIlF1aXQgTmFtZW5vdGVcIjogXCJOYW1lbm90ZSDjgpLntYLkuoZcIixcbiAgICBcIk5vdGVcIjogXCLjg47jg7zjg4hcIixcbiAgICBcIkZpbGVcIjogXCLjg5XjgqHjgqTjg6tcIixcbiAgICBcIk9wZW4gLi4uXCI6IFwi6ZaL44GPIC4uLlwiLFxuICAgIFwiT3BlblwiOiBcIuODjuODvOODiOOCkumWi+OBj1wiLFxuICAgIFwiTmV3IC4uLlwiOiBcIuaWsOimjyAuLi5cIixcbiAgICBcIk5ld1wiOiBcIuaWsOimj+ODjuODvOODiFwiLFxuICAgIFwiQ2xvc2VcIjogXCLplonjgZjjgotcIixcbiAgICBcIkNsb3NlIEFsbFwiOiBcIuOBmeOBueOBpuOCkumWieOBmOOCi1wiLFxuICAgIFwiTm90ZSBTZXR0aW5ncyAuLi5cIjogXCLjg47jg7zjg4joqK3lrpogLi4uXCIsXG4gICAgXCJFeHBvcnRcIjogXCLmm7jjgY3lh7rjgZdcIixcbiAgICBcIkltcG9ydFwiOiBcIuiqreOBv+i+vOOBv1wiLFxuICAgIFwiLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLlwiOiBcIi5jc25mIChDTElQIFNUVURJTyDjg43jg7zjg6Djg5XjgqHjgqTjg6spIC4uLlwiLFxuICAgIFwiLnBkZiAoUERGKSAuLi5cIjogXCIucGRmIChQREYpIC4uLlwiLFxuICAgIFwiLnR4dCAoUGxhaW4gVGV4dCkgLi4uXCI6IFwiLnR4dCAo44OG44Kt44K544OI44OV44Kh44Kk44OrKSAuLi5cIixcbiAgICBcIlNhdmVcIjogXCLkv53lrZhcIixcbiAgICBcIlNhdmUgQXMgLi4uXCI6IFwi5ZCN5YmN44KS44Gk44GR44Gm5L+d5a2YIC4uLlwiLFxuICAgIFwiU2F2ZSBBc1wiOiBcIuWQjeWJjeOCkuOBpOOBkeOBpuS/neWtmFwiLFxuICAgIFwiU2F2ZSBTbmFwc2hvdCBBcyAuLi5cIjogXCLjg5Djg4Pjgq/jgqLjg4Pjg5fjgpLkv53lrZggLi4uXCIsXG4gICAgXCJFZGl0XCI6IFwi57eo6ZuGXCIsXG4gICAgXCJVbmRvXCI6IFwi5Y+W44KK5raI44GXXCIsXG4gICAgXCJSZWRvXCI6IFwi44KE44KK55u044GXXCIsXG4gICAgXCJDdXRcIjogXCLliIfjgorlj5bjgopcIixcbiAgICBcIkNvcHlcIjogXCLjgrPjg5Tjg7xcIixcbiAgICBcIlBhc3RlXCI6IFwi6LK844KK5LuY44GRXCIsXG4gICAgXCJTZWxlY3QgQWxsXCI6IFwi44GZ44G544Gm44KS6YG45oqeXCIsXG5cbiAgICBcIlBhZ2VcIjogXCLjg5rjg7zjgrhcIixcbiAgICBcIkFkZFwiOiBcIui/veWKoFwiLFxuICAgIFwiTW92ZSB0byBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgavlhaXjgozjgotcIixcbiAgICBcIlB1dCBCYWNrIGZyb20gQnVmZmVyXCI6IFwi44OQ44OD44OV44Kh44GL44KJ5oi744GZXCIsXG4gICAgXCJFbXB0eSBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgpLnqbrjgavjgZnjgotcIixcbiAgICBcIkR1cGxpY2F0ZVwiOiBcIuikh+ijveOCkui/veWKoFwiLFxuICAgIFwiTW92ZSBGb3J3YXJkXCI6IFwi5YmN44Gr56e75YuVXCIsXG4gICAgXCJNb3ZlIEJhY2t3YXJkXCI6IFwi5b6M44KN44Gr56e75YuVXCIsXG4gICAgXCJGbGlwXCI6IFwi5bem5Y+z5Y+N6Lui44GX44Gm6KGo56S6XCIsXG4gICAgXCJTYXZlIEltYWdlIEFzIC4uLlwiOiBcIuOCpOODoeODvOOCuOOCkuS/neWtmCAuLi5cIixcbiAgICBcIlNhdmUgSW1hZ2VcIjogXCLjgqTjg6Hjg7zjgrjjgpLkv53lrZhcIixcbiAgICBcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJWaWV3XCI6IFwi6KGo56S6XCIsXG4gICAgXCJUb29sIEJhclwiOiBcIuODhOODvOODq+ODkOODvFwiLFxuICAgIFwiU2lkZSBCYXJcIjogXCLjgrXjgqTjg4njg5Djg7xcIixcbiAgICBcIkRldmVsb3BlciBUb29sc1wiOiBcIuODh+ODmeODreODg+ODkeODvCDjg4Tjg7zjg6tcIixcbiAgICBcIkZ1bGwgU2NyZWVuXCI6IFwi44OV44Or44K544Kv44Oq44O844OzXCIsXG4gICAgXCJQYWdlIE1hcmdpblwiOiBcIuS9meeZvVwiLFxuICAgIFwiTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3dcIjogXCIx6KGM44GC44Gf44KK44Gu44Oa44O844K45pWwXCIsXG4gICAgXCJab29tIEluXCI6IFwi5ouh5aSnXCIsXG4gICAgXCJab29tIE91dFwiOiBcIue4ruWwj1wiLFxuICAgIFxuICAgIFwiV2luZG93XCI6IFwi44Km44Kj44Oz44OJ44KmXCIsXG4gICAgXCJFeHRyYWN0IFRleHRcIjogXCLjg4bjgq3jgrnjg4jjgpLmir3lh7pcIixcbiAgICBcIk9wZW4gUmVjZW50XCI6IFwi5pyA6L+R5L2/55So44GX44Gf44OO44O844OI44KS6ZaL44GPXCIsXG4gICAgXCJDbGVhciBSZWNlbnQgTm90ZSBMaXN0XCI6IFwi5pyA6L+R5L2/55So44GX44Gf44OO44O844OI44Gu44Oq44K544OI44KS5raI5Y67XCIsXG4gICAgXCJVbnRpdGxlZFwiOiBcIuWQjeensOacquioreWumlwiLFxuICAgIFwiTWFraW5nIENTTkYgLi4uXCI6IFwiQ1NORuODleOCoeOCpOODq+OCkuS9nOaIkOS4rSAuLi5cIixcbiAgICBcIk9ubGluZSBTdG9yYWdlXCI6IFwi44Kq44Oz44Op44Kk44Oz44K544OI44Os44O844K4XCIsXG5cbiAgICBcIlBhZ2VzXCI6IFwi44Oa44O844K4XCIsXG4gICAgXCJUZXh0c1wiOiBcIuODhuOCreOCueODiFwiLFxuXG4gICAgXCJTaWRlIEJhciBQb3NpdGlvblwiOiBcIuOCteOCpOODieODkOODvOOBruS9jee9rlwiLFxuICAgIFwiTGVmdFwiOiBcIuW3plwiLFxuICAgIFwiUmlnaHRcIjogXCLlj7NcIixcbiAgICBcbiAgICBcIlNcIjogXCLlsI9cIixcbiAgICBcIk1cIjogXCLkuK1cIixcbiAgICBcIkxcIjogXCLlpKdcIixcbiAgICBcIlByZXNzdXJlXCI6IFwi562G5ZynXCIsXG4gICAgXCJWZXJ0aWNhbFwiOiBcIue4puabuOOBjVwiLFxuICAgIFwiSG9yaXpvbnRhbFwiOiBcIuaoquabuOOBjVwiLFxuXG4gICAgXCJOZXcgbm90ZWJvb2tcIjogXCLmlrDopo/jg47jg7zjg4hcIixcbiAgICBcIk5vdGVib29rIG5hbWVcIjogXCLjg47jg7zjg4jlkI1cIixcbiAgICBcIkZvbGRlclwiOiBcIuS/neWtmOWFiFwiLFxuICAgIFwiQ2hvb3NlIGZvbGRlci4uLlwiOiBcIuWPgueFpy4uLlwiLFxuICAgIFwiTnVtYmVyIG9mIHBhZ2VzXCI6IFwi44Oa44O844K45pWwXCIsXG4gICAgXCJUZW1wbGF0ZVwiOiBcIuODhuODs+ODl+ODrOODvOODiFwiLFxuICAgIFwiTWFuZ2FcIjogXCLmvKvnlLtcIixcbiAgICBcIkJpbmRpbmcgcG9pbnRcIjogXCLntrTjgZjjgovkvY3nva5cIixcbiAgICBcIkxlZnQgYmluZGluZ1wiOiBcIuW3pue2tOOBmOOAgFwiLFxuICAgIFwiUmlnaHQgYmluZGluZ1wiOiBcIuWPs+e2tOOBmOOAgFwiLFxuICAgIFwiU3RhcnQgcGFnZVwiOiBcIumWi+Wni+ODmuODvOOCuFwiLFxuICAgIFwiRnJvbSBsZWZ0XCI6IFwi5bem44Oa44O844K4XCIsXG4gICAgXCJGcm9tIHJpZ2h0XCI6IFwi5Y+z44Oa44O844K4XCIsXG4gICAgXCJQYWdlc1wiOiBcIuODmuODvOOCuFwiLFxuICAgIFwiQWxsXCI6IFwi44GZ44G544GmXCIsXG4gICAgXCJDdXJyZW50IHBhZ2VcIjogXCLpgbjmip7jgZXjgozjgZ/jg5rjg7zjgrhcIixcbiAgICBcIlJhbmdlXCI6IFwi56+E5Zuy5oyH5a6aXCIsXG4gICAgXCJTY2FsZVwiOiBcIuaLoeWkpy/nuK7lsI9cIixcbiAgICBcIkN1c3RvbVwiOiBcIuOCq+OCueOCv+ODoFwiLFxuICAgIFwiVGV4dCBjb2xvclwiOiBcIuODhuOCreOCueODiOOBruiJslwiLFxuICAgIFwiMTAwJVwiOiBcIkI15ZWG5qWt6KqM55SoKEI044K144Kk44K65Y6f56i/55So57SZL0E05LuV5LiK44GM44KKKVwiLFxuICAgIFwiODIlXCI6IFwiQTXlkIzkurroqoznlKgoQTTjgrXjgqTjgrrljp/nqL/nlKjntJkvQjXku5XkuIrjgYzjgoopXCIsXG4gICAgXCJOYW1lIGNoYW5nZXIgY29tcGF0aWJsZVwiOiBcIuOCueODiOODvOODquODvOOCqOODh+OCo+OCv+eUqOODjeODvOODoOODgeOCp+ODs+OCuOODo+ODvOS6kuaPm1wiLFxuXG4gICAgXCJFeHBvcnQgQ0xJUCBTVFVESU8gU3Rvcnlib2FyZFwiOiBcIkNMSVAgU1RVRElPIOODjeODvOODoOabuOOBjeWHuuOBl1wiLFxuICAgIFwiRXhwb3J0IFBERlwiOiBcIlBERuabuOOBjeWHuuOBl1wiLFxuICAgIFwiSW1wb3J0IFBsYWluIFRleHRcIjogXCLjg4bjgq3jgrnjg4joqq3jgb/ovrzjgb9cIixcbiAgICBcIlJlc2V0IFNldHRpbmdzIHRvIERlZmF1bHRcIjogXCLliJ3mnJ/oqK3lrprjgavmiLvjgZlcIixcblxuICAgIFwiRmlsZSBuYW1lXCI6IFwi44OV44Kh44Kk44Or5ZCNXCIsXG4gICAgXCJEdXBsaWNhdGUgbm90ZSBuYW1lLlwiOiBcIuWQjOOBmOWQjeWJjeOBruODjuODvOODiOOBjOOBguOCiuOBvuOBmeOAglwiLFxuICAgIFwiRHVwbGljYXRlIGZpbGUgbmFtZS5cIjogXCLlkIzjgZjlkI3liY3jga7jg5XjgqHjgqTjg6vjgYzjgYLjgorjgb7jgZnjgIJcIixcbiAgICBcIkZpbGUgbm90IGZvdW5kLlwiOiBcIuODleOCoeOCpOODq+OBjOimi+OBpOOBi+OCiuOBvuOBm+OCk+OAglwiLFxuICAgIFwiRmlsZSBvcGVuIGVycm9yLlwiOiBcIuOBk+OBruODleOCoeOCpOODq+OBr+mWi+OBkeOBvuOBm+OCk+OAglwiLFxuICAgIFwiU2F2ZSBlcnJvci5cIjogXCLjgrvjg7zjg5bjgafjgY3jgb7jgZvjgpPjgIJcIixcbiAgICBcIlNlbGVjdCBmaWxlIHRvIGltcG9ydFwiOiBcIuiqreOBv+i+vOOCgOODleOCoeOCpOODq+OCkumBuOaKnuOBl+OBpuOBj+OBoOOBleOBhFwiLFxuICAgIFwiQ29tcHJlc3NpbmdcIjogXCLlnKfnuK7kuK1cIixcbiAgICBcIlJlbmRlcmluZ1wiOiBcIuS9nOaIkOS4rVwiLFxuXG4gICAgXCJGb3JtYXRcIjogXCLjg5Xjgqnjg7zjg57jg4Pjg4hcIixcbiAgICBcIkxpbmUgc2VwYXJhdG9yXCI6IFwi5pS56KGMXCIsXG4gICAgXCJCYWxsb29uIHNlcGFyYXRvclwiOiBcIuaUueOCu+ODquODlVwiLFxuICAgIFwiUGFnZSBzZXBhcmF0b3JcIjogXCLmlLnjg5rjg7zjgrhcIixcbiAgICBcIkNvbW1lbnQga2V5XCI6IFwi44Kz44Oh44Oz44OIXCIsXG4gICAgXCJDaG9vc2UgZmlsZS4uLlwiOiBcIuODleOCoeOCpOODq+OCkumBuOaKni4uLlwiLFxuICAgIFxuICAgIFwiVHJpYWxcIjogXCLoqabnlKjniYhcIixcbiAgICBcIldlbGNvbWUgdG8gdGhlIHRyaWFsIHZlcnNpb24gb2YgTmFtZW5vdGUuXFxuWW91IGhhdmUgXCI6IFwi44GC44GoXCIsXG4gICAgXCIgZGF5KHMpIGxlZnQuXCI6IFwi5pel44GQ44KJ44GE6Kmm55So44Gn44GN44G+44GZ44CCXFxu44GC44KK44GM44Go44GG44GU44GW44GE44G+44GZ77yBXCIsIFxuICAgIFwiV2UncmUgc29ycnksIGJ1dCB5b3VyIHRyaWFsIHBlcmlvZCBoYXMgZXhwaXJlZC5cIjogXCLoqabnlKjmnJ/plpPntYLkuobjgZfjgb7jgZfjgZ/jgIJcXG7jgYLjgorjgYzjgajjgYbjgZTjgZbjgYTjgb7jgZfjgZ/vvIFcIiwgXG5cbiAgICBcIlpvb20gc21hbGwgdGV4dHMgb24gaW5wdXRcIjogXCLlsI/jgZXjgYTjg4bjgq3jgrnjg4jjgpLnt6jpm4bjgZnjgovjgajjgY3jga/mi6HlpKfooajnpLrjgZnjgotcIixcbiAgICBcIlVzZSBRdWlja2xpbmVcIiA6IFwi6ZW35oq844GX44Gn55u057ea44OE44O844Or44Gr5YiH44KK5pu/44GI44KLXCIsXG4gICAgXCJEaXNhYmxlIHdpbnRhYiBkcml2ZXJcIjogXCJXaW50YWLjg4njg6njgqTjg5DjgpLkvb/jgo/jgarjgYRcIixcbiAgICBcIkRpc2FibGUgbW91c2Ugd2hlZWwgc2Nyb2xsXCI6IFwi44Oe44Km44K544Ob44Kk44O844Or44Gn44K544Kv44Ot44O844Or44GX44Gq44GEXCIsXG4gICAgXCJDbGljayBPSyB0byByZXN0b3JlIGRlZmF1bHQgc2V0dGluZ3MuXCI6IFwi44OH44OV44Kp44Or44OI44Gu6Kit5a6a44Gr5oi744GX44G+44GZXCIsXG4gICAgXCJQZW4gcHJlc3N1cmVcIjogXCLnrYblnKdcIixcbiAgICBcIk91dHB1dFwiOiBcIuWHuuWKm1wiLFxuICAgIFxuICAgIFwiRW5hYmxlIEphcGFuZXNlIE9wdGlvbnNcIjogXCLml6XmnKzoqp7nlKjjga7jgqrjg5fjgrfjg6fjg7PjgpLmnInlirnjgavjgZnjgotcIlxuICB9XG59XG5cbmV4cG9ydHMuZGljdGlvbmFyeSA9IGRpY3Rpb25hcnlcbiJdfQ==
