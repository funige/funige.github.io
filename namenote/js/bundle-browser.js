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
    key: "open",
    value: function open(url) {
      log('open...');

      _projectManager.projectManager.open(url);
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
  }, {
    key: "reload",
    value: function reload() {
      location.reload();
    }
  }]);

  return Command;
}();

var command = new Command();
exports.command = command;

},{"./about-dialog.es6":1,"./dialog.es6":6,"./divider.es6":7,"./namenote.es6":16,"./project-manager.es6":19,"./side-bar-tab.es6":24,"./tool-button.es6":29}],4:[function(require,module,exports){
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

var _viewButton = require("./view-button.es6");

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
      log('[update]');
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

      _viewButton.viewButton.update();
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

      var mainView = $('.main-view');
      var sideBar = $('.sidebar');

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
      log("[divider drag end]");
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

},{"./config.es6":5,"./view-button.es6":31}],8:[function(require,module,exports){
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
      element.style.opacity = '1';
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
      menu.parentNode.style.opacity = '0.01';
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
    key: "isSeparator",
    value: function isSeparator(item) {
      if (item) {
        if (item.childNodes[0] && item.childNodes[0].innerHTML != '-') {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "updateRecents",
    value: function updateRecents(menu) {
      while (!this.isSeparator(menu.childNodes[2])) {
        menu.removeChild(menu.childNodes[2]);
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
          div.innerHTML = '<span class="ui-icon ui-icon-note"></span>' + item;
          li.appendChild(appendAttribute(div, item, 'open'));
          df.appendChild(li);
        } //  menu.appendChild(df)

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

      menu.insertBefore(df, menu.childNodes[2]);
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

},{"../js/lib/dictionary.js":34}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainView = void 0;

var _namenote = require("./namenote.es6");

var _view = require("./view.es6");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// $('.main-view')[0].parentNode.scrollTop = ...
////////////////////////////////////////////////////////////////
var MainView =
/*#__PURE__*/
function (_View) {
  _inherits(MainView, _View);

  function MainView() {
    _classCallCheck(this, MainView);

    return _possibleConstructorReturn(this, _getPrototypeOf(MainView).call(this));
  }

  _createClass(MainView, [{
    key: "init",
    value: function init() {
      this.element = $('.main-view')[0];
      this.scale = 1;
      this.preventScrollFreeze();
      var pageWidth = 1000;
      var pageHeight = 768;

      for (var j = 0; j < 10; j++) {
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
          this.element.appendChild(page);
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
}(_view.View);

var mainView = new MainView();
exports.mainView = mainView;

},{"./namenote.es6":16,"./view.es6":32}],13:[function(require,module,exports){
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
      /*
          otherButton = $('#other-menu-button').imageButton({
            src: 'img/menu-button.png',
            float: 'right',
            click: function(e) { this.select(e) }.bind(this),
            content: htmlMenu.make(otherMenuTemplate, 'other')
          })[0]
      */

      sidebarButton = $('#sidebar-menu-button').imageButton({
        src: 'img/menu-button.png',
        float: 'right',
        click: function (e) {
          this.select(e);
        }.bind(this),
        content: _htmlMenu.htmlMenu.make(_menuTemplate.sidebarMenuTemplate, 'sidebar'),
        contentParent: $('body')[0]
      })[0];
      this.buttons.push(fileButton, sidebarButton);
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
exports.sidebarMenuTemplate = exports.fileMenuTemplate = exports.menuTemplate = void 0;
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
    click: 'quit'
  }]
}, {
  label: 'Note',
  submenu: [{
    label: 'New ...',
    click: 'openNewDialog'
  }, {
    label: 'Open ...',
    click: 'openDialog'
  }, {
    label: 'Open Recent',
    submenu: []
  }, {
    type: 'separator'
  }, {
    label: 'Close',
    click: 'close'
  }, //    { label: 'Close All', click: 'closeAll' },
  //    { type: 'separator' },
  //    { label: 'Note Settings ...', click: 'noteSettings' },
  {
    label: 'Save Snapshot As ...',
    click: 'snapshot'
  }, {
    type: 'separator'
  }, //    { label: 'Import',
  //	submenu: [
  //	  { label: '.txt (Plain Text) ...', click: 'importTextDialog' },
  //	],
  //    },
  {
    label: 'Export',
    submenu: [{
      label: '.csnf (CLIP STUDIO Storyboard) ...',
      click: 'exportCSNFDialog'
    }, {
      label: '.pdf (PDF) ...',
      click: 'exportPDFDialog'
    }]
  }]
}, {
  label: "Edit",
  submenu: [{
    label: "Undo",
    selector: "undo:",
    click: 'undo'
  }, {
    label: "Redo",
    selector: "redo:",
    click: 'redo'
  }, {
    type: "separator"
  }, {
    label: "Cut",
    selector: "cut:"
  }, {
    label: "Copy",
    selector: "copy:"
  }, {
    label: "Paste",
    selector: "paste:"
  }, {
    label: "Select All",
    selector: "selectAll:",
    click: 'selectAll'
  }]
}, {
  label: 'Page',
  submenu: [{
    label: 'Add',
    click: 'appendPage'
  }, {
    label: 'Move Forward',
    click: 'movePageForward'
  }, {
    label: 'Move Backward',
    click: 'movePageBackward'
  }, {
    type: "separator"
  }, {
    label: 'Move to Buffer',
    click: 'cutPage'
  }, {
    label: 'Put Back from Buffer',
    click: 'pastePage'
  }, {
    label: 'Empty Buffer',
    click: 'emptyPage'
  }, //    { type: "separator" },
  //    { label: 'Flip', click: 'flipPage' },
  {
    type: "separator"
  }, {
    label: 'Extract Text',
    click: 'extractText'
  }, {
    label: 'Save Image As ...',
    click: 'savePageImage'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Full Screen',
    click: 'fullScreen'
  }, //    { label: 'Tool Bar', click: 'toolBar' },
  {
    label: 'Side Bar',
    click: 'sideBar'
  }, {
    label: 'Developer Tools',
    click: 'developerTools'
  }, {
    type: 'separator'
  }, {
    label: 'Zoom In',
    click: 'zoom'
  }, {
    label: 'Zoom Out',
    click: 'unzoom'
  }, {
    type: 'separator'
  }, {
    label: 'Page Margin',
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
  click: 'openNewDialog'
}, {
  label: 'Open ...',
  click: 'openDialog'
}, {
  type: 'separator'
}, {
  label: 'Note',
  submenu: [{
    label: 'Close',
    click: 'close'
  }, //    { label: 'Close All', click: 'closeAll' },
  {
    label: 'Save Snapshot As ...',
    click: 'snapshot'
  }, {
    type: 'separator'
  }, //    { label: 'Import',
  //	submenu: [
  //	  { label: '.txt (Plain Text) ...', click: 'importTextDialog' },
  //	],
  //    },
  {
    label: 'Export',
    submenu: [{
      label: '.csnf (CLIP STUDIO Storyboard) ...',
      click: 'exportCSNFDialog'
    }, {
      label: '.pdf (PDF) ...',
      click: 'exportPDFDialog'
    }]
  }]
}, {
  label: 'Page',
  submenu: [{
    label: 'Add',
    click: 'appendPage'
  }, {
    label: 'Move Forward',
    click: 'movePageForward'
  }, {
    label: 'Move Backward',
    click: 'movePageBackward'
  }, {
    type: "separator"
  }, {
    label: 'Move to Buffer',
    click: 'cutPage'
  }, {
    label: 'Put Back from Buffer',
    click: 'pastePage'
  }, {
    label: 'Empty Buffer',
    click: 'emptyPage'
  }, {
    type: "separator"
  }, {
    label: 'Extract Text',
    click: 'extractText'
  }, {
    label: 'Save Image As ...',
    click: 'savePageImage'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Full Screen',
    click: 'fullScreen'
  }, {
    label: 'Side Bar',
    click: 'sideBar'
  }, {
    label: 'Developer Tools',
    click: 'developerTools'
  }, {
    type: 'separator'
  }, {
    label: 'Zoom In',
    click: 'zoom'
  }, {
    label: 'Zoom Out',
    click: 'unzoom'
  }, {
    type: 'separator'
  }, {
    label: 'Page Margin',
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
}, {
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
exports.fileMenuTemplate = fileMenuTemplate;
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
      setState(template, 'Open ...', isApp);
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

    this.version = "2.0.0-alpha.2-debug";
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
    /*
    preventScrollFreeze(view) {
      const scroller = $(view.element).parent()
      view.lastY = 0
       scroller.on('touchstart', function(e) {
        view.lastY = e.touches[0].clientY
        log('start')
      })
      
      scroller.on('touchmove', function(e) {
        const top = e.touches[0].clientY
        const scrollTop = $(e.currentTarget).scrollTop()
        const direction = (view.lastY - top) < 0 ? 'up': 'down'
        log(direction)
      })
    }
    */

  }, {
    key: "isMac",
    value: function isMac() {
      return navigator.platform.indexOf('Mac');
    }
  }]);

  return Namenote;
}();

var namenote = new Namenote();
exports.namenote = namenote;

},{"./command.es6":3,"./config.es6":5,"./main-view.es6":12,"./page-view.es6":17,"./project-manager.es6":19,"./recent-url.es6":21,"./shortcut.es6":23,"./text-view.es6":26,"./ui.es6":30}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageView = void 0;

var _view = require("./view.es6");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

////////////////////////////////////////////////////////////////
var PageView =
/*#__PURE__*/
function (_View) {
  _inherits(PageView, _View);

  function PageView() {
    _classCallCheck(this, PageView);

    return _possibleConstructorReturn(this, _getPrototypeOf(PageView).call(this));
  }

  _createClass(PageView, [{
    key: "init",
    value: function init() {
      this.element = $('.page-view')[0];
      this.preventScrollFreeze();
    }
  }]);

  return PageView;
}(_view.View);

var pageView = new PageView();
exports.pageView = pageView;

},{"./view.es6":32}],18:[function(require,module,exports){
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

var _viewButton = require("./view-button.es6");

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

      _viewButton.viewButton.update();
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

},{"./main-view.es6":12,"./menu.es6":15,"./project.es6":20,"./recent-url.es6":21,"./title.es6":27,"./view-button.es6":31}],20:[function(require,module,exports){
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
  sideBar: '1',
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

},{"./command.es6":3,"./shortcut-default.es6":22,"./ui.es6":30}],24:[function(require,module,exports){
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

},{"./command.es6":3}],25:[function(require,module,exports){
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

},{"./side-bar-tab.es6":24}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textView = void 0;

var _namenote = require("./namenote.es6");

var _view = require("./view.es6");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

////////////////////////////////////////////////////////////////
var TextView =
/*#__PURE__*/
function (_View) {
  _inherits(TextView, _View);

  function TextView() {
    _classCallCheck(this, TextView);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextView).call(this));
  }

  _createClass(TextView, [{
    key: "init",
    value: function init() {
      this.element = $('.text-view')[0];
      this.preventScrollFreeze();
    }
  }]);

  return TextView;
}(_view.View);

var textView = new TextView();
exports.textView = textView;

},{"./namenote.es6":16,"./view.es6":32}],27:[function(require,module,exports){
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

},{"./namenote.es6":16}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toolBar = void 0;

var _config = require("./config.es6");

var _viewButton = require("./view-button.es6");

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
      _viewButton.viewButton.init();

      _historyButton.historyButton.init();

      _toolButton.toolButton.init();

      _menuButton.menuButton.init();

      this.update();
      this.updateButtons();
    }
  }, {
    key: "updateButtons",
    value: function updateButtons() {
      _viewButton.viewButton.update();

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

},{"./config.es6":5,"./history-button.es6":8,"./menu-button.es6":13,"./tool-button.es6":29,"./view-button.es6":31}],29:[function(require,module,exports){
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

},{"./command.es6":3,"./html-dropdown.es6":9}],30:[function(require,module,exports){
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

},{"./dialog.es6":6,"./divider.es6":7,"./menu.es6":15,"./side-bar.es6":25,"./title.es6":27,"./tool-bar.es6":28,"./widget.es6":33}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewButton = void 0;

var _command = require("./command.es6");

var _projectManager = require("./project-manager.es6");

var _config = require("./config.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var quickZoomButton;
var zoomButton;
var unzoomButton;
var splitButton; ////////////////////////////////////////////////////////////////

var ViewButton =
/*#__PURE__*/
function () {
  function ViewButton() {
    _classCallCheck(this, ViewButton);
  }

  _createClass(ViewButton, [{
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
      splitButton = $('#split-button').imageButton({
        src: 'img/unzoom-button.png',
        float: 'right',
        click: function click(e) {
          _command.command.sideBar();
        }
      })[0];
    }
  }, {
    key: "update",
    value: function update() {
      var project = _projectManager.projectManager.current;
      var quickZoom = project; //(project) ? project.view.quickZoom : false

      $(zoomButton).imageButton('disabled', !project);
      $(unzoomButton).imageButton('disabled', !project);
      $(quickZoomButton).imageButton('disabled', !project);
      $(quickZoomButton).imageButton('locked', quickZoom);
      $(splitButton).imageButton('locked', _config.config.data.sideBar);
    }
  }]);

  return ViewButton;
}();

var viewButton = new ViewButton();
exports.viewButton = viewButton;

},{"./command.es6":3,"./config.es6":5,"./project-manager.es6":19}],32:[function(require,module,exports){
'use strict'; ////////////////////////////////////////////////////////////////

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View() {
    _classCallCheck(this, View);
  }

  _createClass(View, [{
    key: "preventScrollFreeze",
    value: function preventScrollFreeze() {
      this.lastY = 0;
      var scroller = $(this.element).parent();
      scroller.on('touchstart', function (e) {
        this.lastY = e.touches[0].clientY;
      }.bind(this));
      scroller.on('touchmove', function (e) {
        var top = e.touches[0].clientY;
        var scrollTop = $(e.currentTarget).scrollTop();
        var direction = this.lastY - top < 0 ? 'up' : 'down';

        if (scrollTop === 0 && direction === "up") {
          log('prevent up..');
          e.preventDefault();
        } else if (scrollTop >= e.currentTarget.scrollHeight - e.target.offsetHeight && direction === "down") {
          log('prevent down..');
          e.preventDefault();
        }

        this.lastY = top;
      }.bind(this));
    }
  }]);

  return View;
}();

exports.View = View;

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9icm93c2VyLmVzNiIsImVzNi9jb21tYW5kLmVzNiIsImVzNi9jb25maWctZGVmYXVsdC5lczYiLCJlczYvY29uZmlnLmVzNiIsImVzNi9kaWFsb2cuZXM2IiwiZXM2L2RpdmlkZXIuZXM2IiwiZXM2L2hpc3RvcnktYnV0dG9uLmVzNiIsImVzNi9odG1sLWRyb3Bkb3duLmVzNiIsImVzNi9odG1sLW1lbnUuZXM2IiwiZXM2L2xvY2FsZS5lczYiLCJlczYvbWFpbi12aWV3LmVzNiIsImVzNi9tZW51LWJ1dHRvbi5lczYiLCJlczYvbWVudS10ZW1wbGF0ZS5lczYiLCJlczYvbWVudS5lczYiLCJlczYvbmFtZW5vdGUuZXM2IiwiZXM2L3BhZ2Utdmlldy5lczYiLCJlczYvcGFnZS5lczYiLCJlczYvcHJvamVjdC1tYW5hZ2VyLmVzNiIsImVzNi9wcm9qZWN0LmVzNiIsImVzNi9yZWNlbnQtdXJsLmVzNiIsImVzNi9zaG9ydGN1dC1kZWZhdWx0LmVzNiIsImVzNi9zaG9ydGN1dC5lczYiLCJlczYvc2lkZS1iYXItdGFiLmVzNiIsImVzNi9zaWRlLWJhci5lczYiLCJlczYvdGV4dC12aWV3LmVzNiIsImVzNi90aXRsZS5lczYiLCJlczYvdG9vbC1iYXIuZXM2IiwiZXM2L3Rvb2wtYnV0dG9uLmVzNiIsImVzNi91aS5lczYiLCJlczYvdmlldy1idXR0b24uZXM2IiwiZXM2L3ZpZXcuZXM2IiwiZXM2L3dpZGdldC5lczYiLCJqcy9saWIvZGljdGlvbmFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRU0sVzs7O0FBQ0oseUJBQWM7QUFBQTs7QUFDWixTQUFLLEVBQUwsR0FBVSxjQUFWO0FBQ0EsU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNEOzs7O3lCQUVJLE8sRUFB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SEUsZ0JBekhGLEVBeUhvQixJQXpIcEIsd0JBMEhFLG1CQTFIRixFQTBIdUIsTUExSHZCLHdCQTJIRSxnQkEzSEYsRUEySG9CLE1BM0hwQix3QkE0SEUsYUE1SEYsRUE0SGlCLE1BNUhqQix3QkE2SEUsZ0JBN0hGLEVBNkhvQixZQTdIcEIsd0JBK0hFLE9BL0hGLEVBK0hXLEtBL0hYLHdCQWdJRSxzREFoSUYsRUFnSTBELElBaEkxRCx3QkFpSUUsZUFqSUYsRUFpSW1CLDBCQWpJbkIsd0JBa0lFLGlEQWxJRixFQWtJcUQsMkJBbElyRCx3QkFvSUUsMkJBcElGLEVBb0krQix1QkFwSS9CLHdCQXFJRSxlQXJJRixFQXFJb0IsaUJBcklwQix3QkFzSUUsdUJBdElGLEVBc0kyQixpQkF0STNCLHdCQXVJRSw0QkF2SUYsRUF1SWdDLGtCQXZJaEMsd0JBd0lFLHVDQXhJRixFQXdJMkMsZUF4STNDLHdCQXlJRSxjQXpJRixFQXlJa0IsSUF6SWxCLHdCQTBJRSxRQTFJRixFQTBJWSxJQTFJWix3QkE0SUUseUJBNUlGLEVBNEk2QixrQkE1STdCO0FBRGlCLENBQW5CO0FBaUpBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFVBQXJCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBsb2NhbGUgfSBmcm9tICcuL2xvY2FsZS5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5cbmNsYXNzIEFib3V0RGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZCA9ICdhYm91dC1kaWFsb2cnXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCh2ZXJzaW9uKSB7XG4gICAgJCgnI2Fib3V0LWRpYWxvZycpLmRpYWxvZyh7XG4gICAgICBhdXRvT3BlbjogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiB7IG15OidjZW50ZXIgYm90dG9tJywgYXQ6J2NlbnRlciBjZW50ZXInIH0sXG4gICAgICB0aXRsZTogVCgnQWJvdXQgTmFtZW5vdGUnKSxcbiAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgd2lkdGg6IDYwMCxcbiAgICAgIGJ1dHRvbnM6IHsgT2s6IHRoaXMub2sgfSxcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RyaW5nID0gbG9jYWxlLnRyYW5zbGF0ZUhUTUwoYFxuICAgIDxjZW50ZXI+XG4gICAgICA8aW1nIHNyYz0nLi9pbWcvbmFtZW5vdGUxMDI0LnBuZycgd2lkdGg9XCIxMDBweFwiIC8+XG4gICAgICA8YnI+XG4gICAgICBOYW1lbm90ZSB2JHtuYW1lbm90ZS52ZXJzaW9ufVxuICAgICAgPGJyPjxicj5cbiAgICAgIDxzbWFsbD5Db3B5cmlnaHQgKGMpIEZ1bmlnZTwvc21hbGw+PC9jZW50ZXI+YFxuICAgIClcbiAgICBcbiAgICAkKCcjYWJvdXQtZGlhbG9nJykuaHRtbChzdHJpbmcpXG4gIH1cblxuICBvaygpIHtcbiAgICBkaWFsb2cuY2xvc2UoKVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGFib3V0RGlhbG9nID0gbmV3IEFib3V0RGlhbG9nKClcblxuZXhwb3J0IHsgYWJvdXREaWFsb2cgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBsb2NhbGUgfSBmcm9tICcuL2xvY2FsZS5lczYnXG5cblxud2luZG93Lm5hbWVub3RlID0gbmFtZW5vdGVcblxud2luZG93LlQgPSBsb2NhbGUudHJhbnNsYXRlXG53aW5kb3cubG9nID0gY29uc29sZS5sb2cuYmluZCh3aW5kb3cuY29uc29sZSlcbndpbmRvdy53YXJuID0gY29uc29sZS53YXJuLmJpbmQod2luZG93LmNvbnNvbGUpXG53aW5kb3cuZXJyb3IgPSBjb25zb2xlLmVycm9yLmJpbmQod2luZG93LmNvbnNvbGUpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCl7XG4gIG5hbWVub3RlLmluaXQoKVxufSlcblxuXG5cblxuXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcbmltcG9ydCB7IGFib3V0RGlhbG9nIH0gZnJvbSAnLi9hYm91dC1kaWFsb2cuZXM2J1xuaW1wb3J0IHsgZGl2aWRlciB9IGZyb20gJy4vZGl2aWRlci5lczYnXG5pbXBvcnQgeyB0b29sQnV0dG9uIH0gZnJvbSAnLi90b29sLWJ1dHRvbi5lczYnXG5pbXBvcnQgeyBzaWRlQmFyVGFiIH0gZnJvbSAnLi9zaWRlLWJhci10YWIuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmNvbnN0IF9ydW5NYWluID0gKG1lc3NhZ2UsIGRhdGEpID0+IHtcbiAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgIGxvZygncnVuTWFpbicsIG1lc3NhZ2UsIGRhdGEpXG4gICAgbmFtZW5vdGUuYXBwLnJ1bk1haW4obWVzc2FnZSwgZGF0YSlcblxuICB9IGVsc2Uge1xuICAgIGxvZyhgJHttZXNzYWdlfTogY2FuXFxgdCBleGVjdXRlIHRoaXMgY29tbWFuZCBvbiBicm93c2VyLmApXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBDb21tYW5kIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICB1bmRvKCkge1xuICAgIGxvZygndW5kbycpXG4gIH1cblxuICByZWRvKCkge1xuICAgIGxvZygncmVkbycpXG4gIH1cblxuICBhYm91dCgpIHtcbiAgICBkaWFsb2cub3BlbihhYm91dERpYWxvZylcbiAgfVxuXG4gIHBlbihlKSB7XG4gICAgbG9nKCdwZW4nKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCdwZW4nKVxuICB9XG5cbiAgZXJhc2VyKGUpIHtcbiAgICBsb2coJ2VyYXNlcicpXG4gICAgdG9vbEJ1dHRvbi5zZWxlY3QoJ2VyYXNlcicpXG4gIH1cblxuICB0ZXh0KGUpIHtcbiAgICBsb2coJ3RleHQnKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCd0ZXh0JylcbiAgfVxuXG4gIHNpZGVCYXIoKSB7XG4gICAgbG9nKCdzaWRlQmFyJylcbiAgICBkaXZpZGVyLnRvZ2dsZSgpXG4gIH1cblxuICBzaG93UGFnZVZpZXcoKSB7XG4gICAgJCgnLnBhZ2UtdmlldycpLnNob3coKVxuICAgICQoJy50ZXh0LXZpZXcnKS5oaWRlKClcbiAgICBzaWRlQmFyVGFiLnNlbGVjdCgncGFnZScpXG4gIH1cblxuICBzaG93VGV4dFZpZXcoKSB7XG4gICAgJCgnLnBhZ2UtdmlldycpLmhpZGUoKVxuICAgICQoJy50ZXh0LXZpZXcnKS5zaG93KClcbiAgICBzaWRlQmFyVGFiLnNlbGVjdCgndGV4dCcpXG4gIH1cbiAgXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLm9wZW5EaWFsb2coKS50aGVuKCh1cmwpID0+IHtcbiAgICAgICAgd2Fybihgb3BlbiAnJHt1cmx9Jy4uLmApXG4gICAgICAgIHByb2plY3RNYW5hZ2VyLm9wZW4odXJsKVxuXG4gICAgICB9KS50aGVuKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIC8vd2FybigncHJvamVjdD0nLCBwcm9qZWN0KVxuICAgICAgICBcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBuYW1lbm90ZS5hcHAuc2hvd01lc3NhZ2VCb3goe1xuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvcGVuKHVybCkge1xuICAgIGxvZygnb3Blbi4uLicpXG4gICAgcHJvamVjdE1hbmFnZXIub3Blbih1cmwpXG4gIH1cblxuICBvcGVuTmV3RGlhbG9nKCkge1xuICAgIHdhcm4oJ29wZW4gbmV3IGRpYWxvZy4uJylcbiAgfVxuICBcbiAgY2xvc2UoKSB7XG4gICAgcHJvamVjdE1hbmFnZXIuY2xvc2UoKVxuICB9XG5cbiAgem9vbSgpIHtcbiAgICBsb2coJ3pvb20nKVxuICB9XG5cbiAgdW56b29tKCkge1xuICAgIGxvZygndW56b29tJylcbiAgfVxuXG4gIGRvY2tMZWZ0KCkge1xuICAgIGRpdmlkZXIuc2V0UG9zaXRpb24oJ2xlZnQnKVxuICB9XG5cbiAgZG9ja1JpZ2h0KCkge1xuICAgIGRpdmlkZXIuc2V0UG9zaXRpb24oJ3JpZ2h0JylcbiAgfVxuXG4gIFxuICB0b2dnbGVFZGl0TW9kZSgpIHt9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy9cbiAgXG4gIGRvKGl0ZW0sIGRhdGEpIHtcbiAgICBpZiAodGhpc1tpdGVtXSkge1xuICAgICAgdGhpc1tpdGVtXShkYXRhKVxuICAgIH1cbiAgfVxuICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgZGV2ZWxvcGVyVG9vbHMoKSB7XG4gICAgX3J1bk1haW4oJ2RldmVsb3BlclRvb2xzJylcbiAgfVxuICBcbiAgZnVsbFNjcmVlbigpIHtcbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBfcnVuTWFpbignZnVsbFNjcmVlbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfVxuICB9XG4gIFxuICBxdWl0KCkge1xuICAgIF9ydW5NYWluKCdxdWl0JylcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKVxuICB9XG59XG5cbmNvbnN0IGNvbW1hbmQgPSBuZXcgQ29tbWFuZCgpXG5cbmV4cG9ydCB7IGNvbW1hbmQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGNvbmZpZ0RlZmF1bHQgPSB7XG4gIHRvb2xCYXI6IHRydWUsXG4gIHNpZGVCYXI6IGZhbHNlLFxuICBzaWRlQmFyV2lkdGg6IDIwMCxcbiAgc2lkZUJhclBvc2l0aW9uOiAncmlnaHQnLFxuICBcbiAgZGVmYXVsdFBhdGg6IG51bGwsXG4gIGRlZmF1bHROYW1lOiBudWxsLFxuICBkZWZhdWx0QXV0aG9yOiBudWxsLFxufVxuXG5cbmV4cG9ydCB7IGNvbmZpZ0RlZmF1bHQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZ0RlZmF1bHQgfSBmcm9tICcuL2NvbmZpZy1kZWZhdWx0LmVzNidcblxuY2xhc3MgQ29uZmlnIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9jb25maWcnKVxuICAgIHRoaXMuZGF0YSA9IChqc29uKSA/IEpTT04ucGFyc2UoanNvbikgOiAkLmV4dGVuZCh0cnVlLCB7fSwgY29uZmlnRGVmYXVsdClcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvY29uZmlnJywganNvbilcbiAgfVxuXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdEZWZhdWx0KVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cblxuICBnZXRWYWx1ZShrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgIGlmICh0aGlzLmRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhW2tleV1cblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGNvbmZpZyA9IG5ldyBDb25maWcoKVxuXG5leHBvcnQgeyBjb25maWcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIERpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cbiAgXG4gIGlzT3BlbigpIHtcbiAgICBmb3IgKGNvbnN0IHdpZGdldCBvZiAkKCcudWktZGlhbG9nLWNvbnRlbnQnKSkge1xuICAgICAgaWYgKCQod2lkZ2V0KS5kaWFsb2coJ2lzT3BlbicpKSB7XG5cdHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIFxuICBvcGVuKHdpZGdldCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnQpIHRoaXMuY2xvc2UoKVxuICAgIHRoaXMuY3VycmVudCA9IHdpZGdldFxuICAgIFxuICAgIGlmICghd2lkZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZWxlbWVudC5pZCA9IHdpZGdldC5pZFxuICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSAnZGlhbG9nJ1xuICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSAnMCc7XG4gICAgICAkKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgICAgIHdpZGdldC5lbGVtZW50ID0gZWxlbWVudFxuICAgIH1cbiAgICB3aWRnZXQuaW5pdCgpXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBjb25zdCB3aWRnZXQgPSB0aGlzLmN1cnJlbnRcbiAgICBjb25zdCBlbGVtZW50ID0gd2lkZ2V0LmVsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgJCgnIycgKyB3aWRnZXQuaWQpLmRpYWxvZygnY2xvc2UnKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgfVxuICAgIHdpZGdldC5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxufVxuXG5jb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKClcblxuZXhwb3J0IHsgZGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyB2aWV3QnV0dG9uIH0gZnJvbSAnLi92aWV3LWJ1dHRvbi5lczYnXG5cbmxldCBtaW5XaWR0aCA9IDE4MFxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIERpdmlkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnLnNwbGl0LXBhbmUnKS5zcGxpdFBhbmUoKVxuICAgICQoJy5zcGxpdC1wYW5lJykub24oJ2RpdmlkZXJkcmFnZW5kJywgKGUpID0+IHsgLy8gb3IgJ3NwbGl0cGFuZXJlc2l6ZSdcbiAgICAgIHRoaXMub25EaXZpZGVyRHJhZ0VuZCgpXG4gICAgfSlcbiAgICB0aGlzLnNldFBvc2l0aW9uKClcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIGxvZygnW3VwZGF0ZV0nKVxuICAgIFxuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEuc2lkZUJhclxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXIgPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGxldCB3aWR0aCA9ICh2YWx1ZSkgPyBjb25maWcuZGF0YS5zaWRlQmFyV2lkdGggOiAwXG4gICAgaWYgKGNvbmZpZy5kYXRhLnNpZGVCYXJQb3NpdGlvbiA9PSAncmlnaHQnKSB7XG4gICAgICB3aWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIHdpZHRoICsgMVxuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgbWF4V2lkdGggPSAkKCcuc3BsaXQtcGFuZScpLndpZHRoKCkgLSBtaW5XaWR0aCAtIDFcbiAgICAgIGlmICh3aWR0aCA8IG1pbldpZHRoKSB3aWR0aCA9IG1pbldpZHRoXG4gICAgICBpZiAod2lkdGggPiBtYXhXaWR0aCkgd2lkdGggPSBtYXhXaWR0aFxuICAgIH1cblxuICAgICQoJy5zcGxpdC1wYW5lJykuc3BsaXRQYW5lKCdmaXJzdENvbXBvbmVudFNpemUnLCB3aWR0aClcbiAgICB2aWV3QnV0dG9uLnVwZGF0ZSgpXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGUoIWNvbmZpZy5kYXRhLnNpZGVCYXIpXG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uID0gdmFsdWVcbiAgICBjb25maWcuc2F2ZSgpXG5cbiAgICBjb25zdCBtYWluVmlldyA9ICQoJy5tYWluLXZpZXcnKVxuICAgIGNvbnN0IHNpZGVCYXIgPSAkKCcuc2lkZWJhcicpXG5cbiAgICBpZiAodmFsdWUgPT0gJ2xlZnQnKSB7XG4gICAgICAkKCcjbGVmdC1jb21wb25lbnQnKS5hcHBlbmQoc2lkZUJhcilcbiAgICAgICQoJyNyaWdodC1jb21wb25lbnQnKS5hcHBlbmQobWFpblZpZXcpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JpZ2h0LWNvbXBvbmVudCcpLmFwcGVuZChzaWRlQmFyKVxuICAgICAgJCgnI2xlZnQtY29tcG9uZW50JykuYXBwZW5kKG1haW5WaWV3KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIG9uRGl2aWRlckRyYWdFbmQoKSB7XG4gICAgbG9nKFwiW2RpdmlkZXIgZHJhZyBlbmRdXCIpXG4gICAgbGV0IHdpZHRoID0gJCgnLnNpZGViYXInKS53aWR0aCgpXG5cbiAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgIGlmICh3aWR0aCA8IG1pbldpZHRoKSB3aWR0aCA9IG1pbldpZHRoXG4gICAgaWYgKHdpZHRoID4gbWF4V2lkdGgpIHdpZHRoID0gbWF4V2lkdGhcblxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA9IHBhcnNlSW50KHdpZHRoKVxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXIgPSB0cnVlXG4gICAgY29uZmlnLnNhdmUoKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCBkaXZpZGVyID0gbmV3IERpdmlkZXIoKVxuXG5leHBvcnQgeyBkaXZpZGVyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5sZXQgdW5kb0J1dHRvblxubGV0IHJlZG9CdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIaXN0b3J5QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHVuZG9CdXR0b24gPSAkKCcjdW5kby1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW5kby1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbW1hbmQudW5kbygpXG4gICAgICB9XG4gICAgfSlbMF1cblxuICAgIHJlZG9CdXR0b24gPSAkKCcjcmVkby1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvcmVkby1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGNvbW1hbmQucmVkbygpXG4gICAgICB9XG4gICAgfSlbMF1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIFxuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICBjb25zdCBoYXNVbmRvID0gKHByb2plY3QpID8gcHJvamVjdC5oaXN0b3J5Lmhhc1VuZG8oKSA6IGZhbHNlXG4gICAgICBjb25zdCBoYXNSZWRvID0gKHByb2plY3QpID8gcHJvamVjdC5oaXN0b3J5Lmhhc1JlZG8oKSA6IGZhbHNlXG4gICAgICAkKHVuZG9CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFoYXNVbmRvKVxuICAgICAgJChyZWRvQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhaGFzUmVkbylcblxuLy8gICAgTWVudS51cGRhdGVIaXN0b3J5KClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaGlzdG9yeUJ1dHRvbiA9IG5ldyBIaXN0b3J5QnV0dG9uKClcblxuZXhwb3J0IHsgaGlzdG9yeUJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIVE1MRHJvcGRvd24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cblxuICBvcGVuKGVsZW1lbnQpIHtcbiAgICBsb2coJ29wZW4nLCBlbGVtZW50KVxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBsb2coJ2Nsb3NlJylcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBcbiAgbWFrZSh0ZW1wbGF0ZSwgaWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1jb250ZW50J1xuICAgIGNvbnRlbnQuaWQgPSBpZCArICctZHJvcGRvd24nXG4gICAgXG4gICAgY29udGVudC5pbm5lckhUTUwgPSBgWyR7aWR9XWBcbiAgICByZXR1cm4gY29udGVudFxuICB9XG59XG5cbmNvbnN0IGh0bWxEcm9wZG93biA9IG5ldyBIVE1MRHJvcGRvd24oKVxuXG5leHBvcnQgeyBodG1sRHJvcGRvd24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHJlY2VudFVSTCB9IGZyb20gJy4vcmVjZW50LXVybC5lczYnXG5pbXBvcnQgeyBtZW51IGFzIG5hdGl2ZU1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuXG5sZXQgYnV0dG9ucyA9IHt9XG5sZXQgdGltZXJzID0ge31cbmxldCBibHVyRGVsYXkgPSA1MDBcblxuY29uc3QgYWRkSXRlbXMgPSAobm9kZSwgaXRlbXMpID0+IHtcbiAgY29uc3QgdWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykge1xuICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgaWYgKGl0ZW0ubGFiZWwpIHtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBhcHBlbmRLZXkoVChpdGVtLmxhYmVsKSwgaXRlbS5hY2NlbGVyYXRvcilcbiAgICB9IGVsc2Uge1xuICAgICAgZGl2LmlubmVySFRNTCA9ICctJ1xuICAgIH1cbiAgICBsaS5hcHBlbmRDaGlsZChhcHBlbmRBdHRyaWJ1dGUoZGl2LCBpdGVtLmxhYmVsLCBpdGVtLmNsaWNrKSlcbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBhZGRJdGVtcyhsaSwgaXRlbS5zdWJtZW51KSBcbiAgICB9XG5cbiAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICBub2RlLmFwcGVuZENoaWxkKHVsKVxuICB9XG59XG5cbmNvbnN0IGFwcGVuZEF0dHJpYnV0ZSA9IChkaXYsIGRhdGEsIGNsaWNrKSA9PiB7XG4gIGlmIChkYXRhKSB7XG4gICAgY29uc3QgcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICAgIHAuaW5uZXJIVE1MID0gZGF0YVxuICAgIHAudGl0bGUgPSBjbGljayB8fCAnJ1xuICAgIHAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIGRpdi5hcHBlbmRDaGlsZChwKVxuICB9XG4gIHJldHVybiBkaXZcbn1cblxuY29uc3QgYXBwZW5kS2V5ID0gKHN0cmluZywga2V5LCBjaGVjaykgPT4ge1xuICBjaGVjayA9IChjaGVjaykgPyAnJiN4MjcxNDsnIDogJydcbiAga2V5ID0gY29udmVydEtleShrZXkpIHx8ICcmbmJzcDsnIFxuXG4gIGNvbnN0IHJlc3VsdCA9IGBcbiAgICA8ZGl2IGNsYXNzPSdjaGVjayc+JHtjaGVja308L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPSdsYWJlbCc+JHtzdHJpbmd9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz0na2V5Jz4ke2tleX08L2Rpdj5gXG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgY29udmVydEtleSA9IChrZXkpID0+IHtcbiAgaWYgKGtleSkge1xuICAgIGlmICghbmFtZW5vdGUuaXNNYWMoKSkge1xuICAgICAgaWYgKGtleS5pbmRleE9mKCdDb21tYW5kK0N0cmwrRicpID49IDApIHJldHVybiAnJ1xuICAgICAgXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXCwvLCAnU2hpZnQrQ29tbWEnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwuLywgJ1NoaWZ0K1BlcmlvZCcpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ21kT3JDdHJsXFwrLywgJ0N0cmwrJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9Db21tYW5kXFwrQWx0XFwrLywgJ0N0cmwrQWx0KycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0N0cmxcXCsvLCAnPz8/KycpXG4gICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLC8sICc8JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLi8sICc+JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9DbWRPckN0cmxcXCsvLCAnJiM4OTg0OycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0FsdFxcKy8sICcmIzg5OTc7JiM4OTg0OycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0N0cmxcXCsvLCAnJiM4OTYzOyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrLywgJyYjODY3OTsnKVxuICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEhUTUxNZW51IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG5cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gJzEnXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICB9XG5cbiAgY2xvc2UoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9XG4gIFxuICBtYWtlKHRlbXBsYXRlLCBpZCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duLWNvbnRlbnQnXG4gICAgY29udGVudC5pZCA9IGlkICsgJy1kcm9wZG93bidcblxuICAgIGFkZEl0ZW1zKGNvbnRlbnQsIHRlbXBsYXRlKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5hY3RpdmF0ZShjb250ZW50LmNoaWxkTm9kZXNbMF0sIGlkKVxuICAgIH0sIDEpXG4gICBcbiAgICByZXR1cm4gY29udGVudFxuICB9XG5cbiAgYWN0aXZhdGUobWVudSwgaWQpIHtcbiAgICBtZW51LmlkID0gaWQgKyAnLW1lbnUnXG4gICAgYnV0dG9uc1tpZF0gPSAkKCcjJyArIGlkICsgJy1tZW51LWJ1dHRvbicpXG4gICAgdGltZXJzW2lkXSA9IG51bGxcblxuICAgICQobWVudSkubWVudSh7XG4gICAgICBzZWxlY3Q6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3QoZXZlbnQsIHVpKSkge1xuICAgICAgICAgIHRoaXMuY29sbGFwc2UobWVudSwgaWQpXG4gICAgICAgICAgYnV0dG9uc1tpZF0uaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlcblxuICAgICQobWVudSkub24oJ21lbnVmb2N1cycsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcnNbaWRdKVxuICAgIH0pXG4gICAgXG4gICAgJChtZW51KS5vbignbWVudWJsdXInLCAoKSA9PiB7XG4gICAgICBpZiAoIWJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnKSkgcmV0dXJuXG4gICAgICB0aW1lcnNbaWRdID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY29sbGFwc2UobWVudSwgaWQpXG4gICAgICB9LCBibHVyRGVsYXkpXG4gICAgfSlcbiAgfVxuXG4gIGNvbGxhcHNlKG1lbnUsIGlkKSB7XG4gICAgJChtZW51KS5tZW51KCdjb2xsYXBzZUFsbCcsIG51bGwsIHRydWUpXG4gICAgbWVudS5wYXJlbnROb2RlLnN0eWxlLm9wYWNpdHkgPSAnMC4wMSdcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2xvc2UobWVudS5wYXJlbnROb2RlKVxuICAgICAgYnV0dG9uc1tpZF0uaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgIH0sIDUwMClcbiAgfVxuICBcbiAgLy8vLy8vLy8vLy8vLy8vL1xuXG4gIHVwZGF0ZShlbGVtZW50KSB7XG4gICAgY29uc3QgbWVudSA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXVxuICAgIGNvbnN0IGlkID0gZWxlbWVudC5pZC5yZXBsYWNlKC8tLiokLywgJycpXG4vLyAgd2FybignW2h0bWwgbWVudSB1cGRhdGVdJywgaWQpXG5cbiAgICBpZiAoaWQgPT0gJ2ZpbGUnKSB7XG4gICAgICB0aGlzLnVwZGF0ZVJlY2VudHMobWVudSlcbiAgICB9XG4gICAgdGhpcy51cGRhdGVTdGF0ZXMobWVudSlcbiAgICAkKG1lbnUpLm1lbnUoJ3JlZnJlc2gnKVxuICB9XG5cbiAgaXNTZXBhcmF0b3IoaXRlbSkge1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5jaGlsZE5vZGVzWzBdICYmIGl0ZW0uY2hpbGROb2Rlc1swXS5pbm5lckhUTUwgIT0gJy0nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIFxuICB1cGRhdGVSZWNlbnRzKG1lbnUpIHtcbiAgICB3aGlsZSAoIXRoaXMuaXNTZXBhcmF0b3IobWVudS5jaGlsZE5vZGVzWzJdKSkge1xuICAgICAgbWVudS5yZW1vdmVDaGlsZChtZW51LmNoaWxkTm9kZXNbMl0pXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGRmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHJlY2VudFVSTC5kYXRhKSB7XG4gICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBkaXYuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidWktaWNvbiB1aS1pY29uLW5vdGVcIj48L3NwYW4+JyArIGl0ZW1cbiAgICAgIGxpLmFwcGVuZENoaWxkKGFwcGVuZEF0dHJpYnV0ZShkaXYsIGl0ZW0sICdvcGVuJykpXG4gICAgICBkZi5hcHBlbmRDaGlsZChsaSlcbiAgICB9XG4gICAgLy8gIG1lbnUuYXBwZW5kQ2hpbGQoZGYpXG4gICAgbWVudS5pbnNlcnRCZWZvcmUoZGYsIG1lbnUuY2hpbGROb2Rlc1syXSlcbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcyhtZW51KSB7XG4gICAgY29uc3QgaXRlbXMgPSAkKG1lbnUpLmZpbmQoJ2xpJylcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSAkKGl0ZW0pLmZpbmQoJ3AnKVxuICAgICAgaWYgKG5hbWUgJiYgbmFtZS5sZW5ndGggPT0gMSkge1xuICAgICAgICBjb25zdCBsYWJlbCA9IG5hbWVbMF0uaW5uZXJIVE1MXG4gICAgICAgIGNvbnN0IHN0YXRlID0gbmF0aXZlTWVudS5nZXRTdGF0ZShsYWJlbClcbiAgICAgICAgaWYgKHN0YXRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgndWktc3RhdGUtZGlzYWJsZWQnKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3VpLXN0YXRlLWRpc2FibGVkJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy9cbiAgXG4gIHNlbGVjdChldmVudCwgdWkpIHtcbiAgICBjb25zdCBwID0gdWkuaXRlbVswXSAmJiB1aS5pdGVtWzBdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwJylbMF1cbiAgICBpZiAocCkge1xuICAgICAgY29uc3QgZGF0YSA9IHAuaW5uZXJIVE1MXG4gICAgICBjb25zdCBjbGljayA9IHAudGl0bGVcblxuICAgICAgaWYgKGNsaWNrKSB7XG4gICAgICAgIGVycm9yKGAke2NsaWNrfWAsIGAke2RhdGF9YClcbiAgICAgICAgY29tbWFuZC5kbyhgJHtjbGlja31gLCBgJHtkYXRhfWApXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGh0bWxNZW51ID0gbmV3IEhUTUxNZW51KClcblxuZXhwb3J0IHsgaHRtbE1lbnUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTG9jYWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZGljdGlvbmFyeSA9IHJlcXVpcmUoJy4uL2pzL2xpYi9kaWN0aW9uYXJ5LmpzJykuZGljdGlvbmFyeVxuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBkaWN0aW9uYXJ5KSB7XG4gICAgICBpZiAobmF2aWdhdG9yLmxhbmd1YWdlLmluZGV4T2Yoa2V5KSA9PSAwICYmIGRpY3Rpb25hcnlba2V5XSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeVtrZXldXG4gICAgICAgIHRoaXMudHJhbnNsYXRlID0gKHN0cmluZykgPT4ge1xuICAgICAgICAgIHJldHVybiBkaWN0W3N0cmluZ10gfHwgc3RyaW5nXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cmFuc2xhdGUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG4gIFxuICB0cmFuc2xhdGVIVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC9UXFwoKC4qPylcXCkvZywgKGFsbCwgbWF0Y2gpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZShtYXRjaClcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGxvY2FsZSA9IG5ldyBMb2NhbGUoKVxuXG5leHBvcnQgeyBsb2NhbGUgfVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldy5lczYnXG5cbi8vICQoJy5tYWluLXZpZXcnKVswXS5wYXJlbnROb2RlLnNjcm9sbFRvcCA9IC4uLlxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1haW5WaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gJCgnLm1haW4tdmlldycpWzBdXG4gICAgdGhpcy5zY2FsZSA9IDFcblxuICAgIHRoaXMucHJldmVudFNjcm9sbEZyZWV6ZSgpXG5cbiAgICBjb25zdCBwYWdlV2lkdGggPSAxMDAwXG4gICAgY29uc3QgcGFnZUhlaWdodCA9IDc2OFxuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHBhZ2Uuc3R5bGUud2lkdGggPSBwYWdlV2lkdGggKyBcInB4XCJcbiAgICAgICAgcGFnZS5zdHlsZS5oZWlnaHQgPSBwYWdlSGVpZ2h0ICsgXCJweFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG4gICAgICAgIHBhZ2Uuc3R5bGUub3V0bGluZSA9IFwiMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4zKVwiXG5cbiAgICAgICAgY29uc3QgeCA9IGkgKiAocGFnZVdpZHRoICsgNTApICsgNTBcbiAgICAgICAgY29uc3QgeSA9IGogKiAocGFnZUhlaWdodCArIDUwKSArIDUwXG4gICAgICAgIHBhZ2Uuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHBhZ2Uuc3R5bGUubGVmdCA9IHggKyBcInB4XCJcbiAgICAgICAgcGFnZS5zdHlsZS50b3AgPSB5ICsgXCJweFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJ0b3AgbGVmdFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjApXCJcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBwYWdlTnVtYmVyLmlubmVySFRNTCA9IChqICogMTAgKyBpICsgMSkgKyBcIuODmuODvOOCuFwiXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUuZm9udFNpemUgPSAnMTJweCcgLy8gMTFweOS7peS4i+OBr+WkieOCj+OCieOBquOBhFxuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLmxlZnQgPSAocGFnZVdpZHRoIC8gMikgKyAncHgnXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUudG9wID0gKHBhZ2VIZWlnaHQgKyAyMCkgKyAncHgnXG5cbiAgICAgICAgcGFnZS5hcHBlbmRDaGlsZChwYWdlTnVtYmVyKVxuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQocGFnZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuICBcbiAgc2V0UHJvamVjdChwcm9qZWN0KSB7XG4gICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdFxuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgfSBlbHNlIHtcbiAgICB9XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG59XG5cbmNvbnN0IG1haW5WaWV3ID0gbmV3IE1haW5WaWV3KClcblxuZXhwb3J0IHsgbWFpblZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBodG1sTWVudSB9IGZyb20gJy4vaHRtbC1tZW51LmVzNidcbmltcG9ydCB7IG1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuXG5pbXBvcnQgeyBmaWxlTWVudVRlbXBsYXRlLFxuICAgICAgICAgb3RoZXJNZW51VGVtcGxhdGUsXG4gICAgICAgICBzaWRlYmFyTWVudVRlbXBsYXRlIH0gZnJvbSAnLi9tZW51LXRlbXBsYXRlLmVzNidcblxubGV0IGZpbGVCdXR0b25cbmxldCBvdGhlckJ1dHRvblxubGV0IHNpZGViYXJCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBNZW51QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgZmlsZUJ1dHRvbiA9ICQoJyNmaWxlLW1lbnUtYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL2ZpbGUtYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShmaWxlTWVudVRlbXBsYXRlLCAnZmlsZScpXG4gICAgfSlbMF1cbi8qXG4gICAgb3RoZXJCdXR0b24gPSAkKCcjb3RoZXItbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWVudS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShvdGhlck1lbnVUZW1wbGF0ZSwgJ290aGVyJylcbiAgICB9KVswXVxuKi9cbiAgICBzaWRlYmFyQnV0dG9uID0gJCgnI3NpZGViYXItbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWVudS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShzaWRlYmFyTWVudVRlbXBsYXRlLCAnc2lkZWJhcicpLFxuICAgICAgY29udGVudFBhcmVudDogJCgnYm9keScpWzBdXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKGZpbGVCdXR0b24sIHNpZGViYXJCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cbiAgXG4gIHNlbGVjdChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdpbWctYnV0dG9uJykgPCAwKSByZXR1cm5cbiAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJykpIHJldHVyblxuXG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBjb25zdCBsb2NrZWQgPSAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcpXG4gICAgICBjb25zdCBpbnN0YW5jZSA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKVxuICAgICAgY29uc3QgZHJvcGRvd24gPSBpbnN0YW5jZS5vcHRpb25zLmNvbnRlbnRcbiAgICAgIFxuICAgICAgaWYgKGJ1dHRvbiAmJiBidXR0b24uaWQgPT0gZS50YXJnZXQuaWQpIHtcbiAgICAgICAgaWYgKCFsb2NrZWQpIHtcbiAgICAgICAgICBodG1sTWVudS51cGRhdGUoZHJvcGRvd24pXG4gICAgICAgICAgXG4gICAgICAgICAgJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICAgIGlmIChpbnN0YW5jZS5vcHRpb25zLmNvbnRlbnRQYXJlbnQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnVwZGF0ZUNvbnRlbnRQb3NpdGlvbigpXG4gICAgICAgICAgfVxuICAgICAgICAgIGh0bWxNZW51Lm9wZW4oZHJvcGRvd24pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIGh0bWxNZW51LmNsb3NlKGRyb3Bkb3duKVxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIGh0bWxNZW51LmNsb3NlKGRyb3Bkb3duKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG1lbnVCdXR0b24gPSBuZXcgTWVudUJ1dHRvbigpXG5cbmV4cG9ydCB7IG1lbnVCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG1lbnVUZW1wbGF0ZSA9IFtcbiAgeyBsYWJlbDogJ05hbWVub3RlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQWJvdXQgTmFtZW5vdGUgLi4uJywgY2xpY2s6ICdhYm91dCcgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdTZXR0aW5ncyAuLi4nLCBjbGljazogJ3NldHRpbmdzJyB9LFxuICAgICAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1F1aXQgTmFtZW5vdGUnLCBjbGljazogJ3F1aXQnIH0sXG4gICAgICBcbi8vICAgIHsgbGFiZWw6ICdTZXR0aW5ncycsXG4vL1x0c3VibWVudTogW1xuLy9cdCAgeyBsYWJlbDogJ1Jlc2V0IFNldHRpbmdzIHRvIERlZmF1bHQnLCBjbGljazogJ3Jlc2V0U2V0dGluZ3MnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ05vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdOZXcgLi4uJywgY2xpY2s6ICdvcGVuTmV3RGlhbG9nJyB9LFxuICAgICAgeyBsYWJlbDogJ09wZW4gLi4uJywgY2xpY2s6ICdvcGVuRGlhbG9nJyB9LFxuICAgICAgeyBsYWJlbDogJ09wZW4gUmVjZW50Jywgc3VibWVudTogW10gfSxcblxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ0Nsb3NlJywgY2xpY2s6ICdjbG9zZScgfSxcbi8vICAgIHsgbGFiZWw6ICdDbG9zZSBBbGwnLCBjbGljazogJ2Nsb3NlQWxsJyB9LFxuXHRcbi8vICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbi8vICAgIHsgbGFiZWw6ICdOb3RlIFNldHRpbmdzIC4uLicsIGNsaWNrOiAnbm90ZVNldHRpbmdzJyB9LFxuXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBjbGljazogJ3NuYXBzaG90JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuXG4vLyAgICB7IGxhYmVsOiAnSW1wb3J0Jyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnLnR4dCAoUGxhaW4gVGV4dCkgLi4uJywgY2xpY2s6ICdpbXBvcnRUZXh0RGlhbG9nJyB9LFxuLy9cdF0sXG4vLyAgICB9LFxuICAgICAgeyBsYWJlbDogJ0V4cG9ydCcsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLicsIGNsaWNrOiAnZXhwb3J0Q1NORkRpYWxvZycgfSxcblx0ICB7IGxhYmVsOiAnLnBkZiAoUERGKSAuLi4nLCBjbGljazogJ2V4cG9ydFBERkRpYWxvZycgfSxcblx0XSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogXCJFZGl0XCIsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogXCJVbmRvXCIsIHNlbGVjdG9yOiBcInVuZG86XCIsIGNsaWNrOiAndW5kbycgfSxcbiAgICAgIHsgbGFiZWw6IFwiUmVkb1wiLCBzZWxlY3RvcjogXCJyZWRvOlwiLCBjbGljazogJ3JlZG8nIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6IFwiQ3V0XCIsIHNlbGVjdG9yOiBcImN1dDpcIiB9LFxuICAgICAgeyBsYWJlbDogXCJDb3B5XCIsIHNlbGVjdG9yOiBcImNvcHk6XCIgfSxcbiAgICAgIHsgbGFiZWw6IFwiUGFzdGVcIiwgc2VsZWN0b3I6IFwicGFzdGU6XCIgfSxcblxuICAgICAgeyBsYWJlbDogXCJTZWxlY3QgQWxsXCIsIHNlbGVjdG9yOiBcInNlbGVjdEFsbDpcIiwgY2xpY2s6ICdzZWxlY3RBbGwnIH0sXG4gICAgXVxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGNsaWNrOiAnYXBwZW5kUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEZvcndhcmQnLCBjbGljazogJ21vdmVQYWdlRm9yd2FyZCcgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEJhY2t3YXJkJywgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBjbGljazogJ2N1dFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBjbGljazogJ3Bhc3RlUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdFbXB0eSBCdWZmZXInLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbi8vICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuLy8gICAgeyBsYWJlbDogJ0ZsaXAnLCBjbGljazogJ2ZsaXBQYWdlJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnRXh0cmFjdCBUZXh0JywgY2xpY2s6ICdleHRyYWN0VGV4dCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIEltYWdlIEFzIC4uLicsIGNsaWNrOiAnc2F2ZVBhZ2VJbWFnZScgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnVmlldycsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0Z1bGwgU2NyZWVuJywgY2xpY2s6ICdmdWxsU2NyZWVuJyB9LCBcbi8vICAgIHsgbGFiZWw6ICdUb29sIEJhcicsIGNsaWNrOiAndG9vbEJhcicgfSxcbiAgICAgIHsgbGFiZWw6ICdTaWRlIEJhcicsIGNsaWNrOiAnc2lkZUJhcicgfSwgXG4gICAgICB7IGxhYmVsOiAnRGV2ZWxvcGVyIFRvb2xzJywgY2xpY2s6ICdkZXZlbG9wZXJUb29scycgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdab29tIEluJywgY2xpY2s6ICd6b29tJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdab29tIE91dCcsIGNsaWNrOiAndW56b29tJyB9LCBcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdQYWdlIE1hcmdpbicsIGNsaWNrOiAnc2hvd01hcmdpbicgfSxcbiAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgUGFnZXMgcGVyIFJvdycsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnMicsIGNsaWNrOiAncm93MScgfSxcblx0ICB7IGxhYmVsOiAnNCcsIGNsaWNrOiAncm93MicgfSxcblx0ICB7IGxhYmVsOiAnNicsIGNsaWNrOiAncm93MycgfSxcblx0ICB7IGxhYmVsOiAnOCcsIGNsaWNrOiAncm93NCcgfSxcblx0XSxcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuXVxuXG5jb25zdCBmaWxlTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmV3IC4uLicsIGNsaWNrOiAnb3Blbk5ld0RpYWxvZycgfSxcbiAgeyBsYWJlbDogJ09wZW4gLi4uJywgY2xpY2s6ICdvcGVuRGlhbG9nJyB9LFxuICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gIHsgbGFiZWw6ICdOb3RlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQ2xvc2UnLCBjbGljazogJ2Nsb3NlJyB9LFxuLy8gICAgeyBsYWJlbDogJ0Nsb3NlIEFsbCcsIGNsaWNrOiAnY2xvc2VBbGwnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBjbGljazogJ3NuYXBzaG90JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuXG4vLyAgICB7IGxhYmVsOiAnSW1wb3J0Jyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnLnR4dCAoUGxhaW4gVGV4dCkgLi4uJywgY2xpY2s6ICdpbXBvcnRUZXh0RGlhbG9nJyB9LFxuLy9cdF0sXG4vLyAgICB9LFxuICAgICAgeyBsYWJlbDogJ0V4cG9ydCcsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLicsIGNsaWNrOiAnZXhwb3J0Q1NORkRpYWxvZycgfSxcblx0ICB7IGxhYmVsOiAnLnBkZiAoUERGKSAuLi4nLCBjbGljazogJ2V4cG9ydFBERkRpYWxvZycgfSxcblx0XSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1BhZ2UnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBZGQnLCBjbGljazogJ2FwcGVuZFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBGb3J3YXJkJywgY2xpY2s6ICdtb3ZlUGFnZUZvcndhcmQnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBCYWNrd2FyZCcsIGNsaWNrOiAnbW92ZVBhZ2VCYWNrd2FyZCcgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgdG8gQnVmZmVyJywgY2xpY2s6ICdjdXRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ1B1dCBCYWNrIGZyb20gQnVmZmVyJywgY2xpY2s6ICdwYXN0ZVBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnRW1wdHkgQnVmZmVyJywgY2xpY2s6ICdlbXB0eVBhZ2UnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdFeHRyYWN0IFRleHQnLCBjbGljazogJ2V4dHJhY3RUZXh0JyB9LFxuICAgICAgeyBsYWJlbDogJ1NhdmUgSW1hZ2UgQXMgLi4uJywgY2xpY2s6ICdzYXZlUGFnZUltYWdlJyB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6ICdWaWV3JyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnRnVsbCBTY3JlZW4nLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBjbGljazogJ2RldmVsb3BlclRvb2xzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1pvb20gSW4nLCBjbGljazogJ3pvb20nIH0sIFxuICAgICAgeyBsYWJlbDogJ1pvb20gT3V0JywgY2xpY2s6ICd1bnpvb20nIH0sIFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1BhZ2UgTWFyZ2luJywgY2xpY2s6ICdzaG93TWFyZ2luJyB9LFxuICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBQYWdlcyBwZXIgUm93Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcyJywgY2xpY2s6ICdyb3cxJyB9LFxuXHQgIHsgbGFiZWw6ICc0JywgY2xpY2s6ICdyb3cyJyB9LFxuXHQgIHsgbGFiZWw6ICc2JywgY2xpY2s6ICdyb3czJyB9LFxuXHQgIHsgbGFiZWw6ICc4JywgY2xpY2s6ICdyb3c0JyB9LFxuXHRdLFxuICAgICAgfVxuICAgIF0sXG4gIH0sXG4gIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnSGVscCcsIGNsaWNrOiAnYWJvdXQnIH0sXG5dXG5cbmNvbnN0IHNpZGViYXJNZW51VGVtcGxhdGUgPSBbXG4gIHsgbGFiZWw6ICfjgrXjgqTjg4njg5Djg7zjga7kvY3nva4nLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICflt6YnLCBjbGljazogJ2RvY2tMZWZ0JyB9LFxuICAgICAgeyBsYWJlbDogJ+WPsycsIGNsaWNrOiAnZG9ja1JpZ2h0JyB9LFxuICAgIF0sXG4gIH0sXG5dXG5cbmV4cG9ydCB7IG1lbnVUZW1wbGF0ZSwgZmlsZU1lbnVUZW1wbGF0ZSwgc2lkZWJhck1lbnVUZW1wbGF0ZSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IG1lbnVUZW1wbGF0ZSB9IGZyb20gJy4vbWVudS10ZW1wbGF0ZS5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgaHRtbE1lbnUgfSBmcm9tICcuL2h0bWwtbWVudS5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcblxubGV0IHRlbXBsYXRlXG5sZXQgc3RhdGVzID0ge31cblxuY29uc3QgZmluZFN1Ym1lbnUgPSAodGVtcGxhdGUsIGxhYmVsKSA9PiB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiB0ZW1wbGF0ZSkge1xuICAgIGlmIChpdGVtLmxhYmVsID09IGxhYmVsKSB7XG4gICAgICByZXR1cm4gaXRlbVxuICAgIH1cbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBmaW5kU3VibWVudShpdGVtLnN1Ym1lbnUsIGxhYmVsKVxuICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG5jb25zdCBzZXRTdGF0ZSA9ICh0ZW1wbGF0ZSwgbGFiZWwsIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGl0ZW0gPSBmaW5kU3VibWVudSh0ZW1wbGF0ZSwgbGFiZWwpXG4gIGlmIChpdGVtKSB7XG4gICAgdmFsdWUgPSAodmFsdWUpID8gdHJ1ZSA6IGZhbHNlXG5cbiAgICBpdGVtLmVuYWJsZWQgPSB2YWx1ZVxuICAgIGlmIChpdGVtLnN1Ym1lbnUpIHtcbiAgICAgIGlmICghdmFsdWUpIGRlbGV0ZShpdGVtLnN1Ym1lbnUpXG4gICAgfVxuICAgIHN0YXRlc1tsYWJlbF0gPSB2YWx1ZVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWVudSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGVtcGxhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1lbnVUZW1wbGF0ZSkpXG4gICAgc3RhdGVzID0ge31cbiAgICBcbiAgICB0aGlzLnVwZGF0ZVJlY2VudHModGVtcGxhdGUpXG4gICAgdGhpcy51cGRhdGVTdGF0ZXModGVtcGxhdGUpXG4gICAgdGhpcy5yZWJ1aWxkKHRlbXBsYXRlKVxuICB9XG5cbiAgcmVidWlsZCh0ZW1wbGF0ZSkge1xuICAgIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICAgIG5hbWVub3RlLmFwcC5yZWJ1aWxkTWVudSh0ZW1wbGF0ZSlcbiAgICB9XG4gIH1cblxuICB1cGRhdGVSZWNlbnRzKHRlbXBsYXRlKSB7XG4gICAgY29uc3QgcmVjZW50cyA9IGZpbmRTdWJtZW51KHRlbXBsYXRlLCAnT3BlbiBSZWNlbnQnKS5zdWJtZW51XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIHJlY2VudFVSTC5kYXRhKSB7XG4gICAgICByZWNlbnRzLnB1c2goe1xuICAgICAgICBsYWJlbDogaXRlbSwgZGF0YTogaXRlbSwgY2xpY2s6ICdvcGVuVVJMJ1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTdGF0ZXModGVtcGxhdGUpIHtcbiAgICBjb25zdCBpc0FwcCA9IChuYW1lbm90ZS5hcHApID8gdHJ1ZSA6IGZhbHNlXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdGdWxsIFNjcmVlbicsIGlzQXBwIHx8IHdpbmRvdy5jaHJvbWUpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdEZXZlbG9wZXIgVG9vbHMnLCBpc0FwcClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ09wZW4gLi4uJywgaXNBcHApXG5cbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIGNvbnN0IGlzUHJvamVjdCA9IChwcm9qZWN0KSA/IHRydWUgOiBmYWxzZVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQ2xvc2UnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdDbG9zZSBBbGwnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJy50eHQgKFBsYWluIFRleHQpIC4uLicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJy5jc25mIChDTElQIFNUVURJTyBTdG9yeWJvYXJkKSAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcucGRmIChQREYpIC4uLicsIGlzUHJvamVjdClcbiAgICBcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0FkZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ01vdmUgdG8gQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdFbXB0eSBCdWZmZXInLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIEZvcndhcmQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIEJhY2t3YXJkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRXh0cmFjdCBUZXh0JywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBpc1Byb2plY3QpXG5cbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1VuZG8nLCBpc1Byb2plY3QpIC8vICYmIHByb2plY3QuaGlzdG9yeS5oYXNVbmRvKCkpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdSZWRvJywgaXNQcm9qZWN0KSAvLyAmJiBwcm9qZWN0Lmhpc3RvcnkuaGFzUmVkbygpKVxuICB9XG5cbiAgZ2V0U3RhdGUobGFiZWwpIHtcbiAgICByZXR1cm4gc3RhdGVzW2xhYmVsXVxuICB9XG59XG5cbmNvbnN0IG1lbnUgPSBuZXcgTWVudSgpXG5cbmV4cG9ydCB7IG1lbnUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcbmltcG9ydCB7IHNob3J0Y3V0IH0gZnJvbSAnLi9zaG9ydGN1dC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHVpIH0gZnJvbSAnLi91aS5lczYnXG5cbmltcG9ydCB7IG1haW5WaWV3IH0gZnJvbSAnLi9tYWluLXZpZXcuZXM2J1xuaW1wb3J0IHsgcGFnZVZpZXcgfSBmcm9tICcuL3BhZ2Utdmlldy5lczYnXG5pbXBvcnQgeyB0ZXh0VmlldyB9IGZyb20gJy4vdGV4dC12aWV3LmVzNidcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTmFtZW5vdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlcnNpb24gPSBcIjIuMC4wLWFscGhhLjItZGVidWdcIlxuICAgIHRoaXMudHJpYWwgPSBmYWxzZVxuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB0aGlzLnNob3J0Y3V0ID0gc2hvcnRjdXRcbiAgICB0aGlzLnJlY2VudFVSTCA9IHJlY2VudFVSTFxuICAgIFxuICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmRcbiAgICB0aGlzLnVpID0gdWlcblxuICAgIHRoaXMubWFpblZpZXcgPSBtYWluVmlld1xuICAgIHRoaXMucGFnZVZpZXcgPSBwYWdlVmlld1xuICAgIHRoaXMudGV4dFZpZXcgPSB0ZXh0Vmlld1xuICAgIFxuICAgIHRoaXMucHJvamVjdE1hbmFnZXIgPSBwcm9qZWN0TWFuYWdlclxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25maWcubG9hZCgpXG4gICAgc2hvcnRjdXQubG9hZCgpXG4gICAgcmVjZW50VVJMLmxvYWQoKVxuICAgIFxuICAgIHVpLmluaXQoKVxuXG4gICAgbWFpblZpZXcuaW5pdCgpXG4gICAgcGFnZVZpZXcuaW5pdCgpXG4gICAgdGV4dFZpZXcuaW5pdCgpXG4gICAgXG4gICAgdGhpcy5pbml0QmFzZUhhbmRsZXJzKClcbiAgfVxuXG4gIGluaXRCYXNlSGFuZGxlcnMoKSB7XG4gICAgd2luZG93Lm9ucmVzaXplID0gKGUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGxvZygnb25yZXNpemUnLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0KTtcbiAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICB3aW5kb3cub25jb250ZXh0bWVudSA9IChlKSA9PiB7XG4gICAgICBsb2coJ2NvbnRleHRtZW51JylcbiAgICB9XG4gIH1cblxuICAvKlxuICBwcmV2ZW50U2Nyb2xsRnJlZXplKHZpZXcpIHtcbiAgICBjb25zdCBzY3JvbGxlciA9ICQodmlldy5lbGVtZW50KS5wYXJlbnQoKVxuICAgIHZpZXcubGFzdFkgPSAwXG5cbiAgICBzY3JvbGxlci5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZpZXcubGFzdFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuICAgICAgbG9nKCdzdGFydCcpXG4gICAgfSlcbiAgICBcbiAgICBzY3JvbGxlci5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgY29uc3QgdG9wID0gZS50b3VjaGVzWzBdLmNsaWVudFlcbiAgICAgIGNvbnN0IHNjcm9sbFRvcCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5zY3JvbGxUb3AoKVxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gKHZpZXcubGFzdFkgLSB0b3ApIDwgMCA/ICd1cCc6ICdkb3duJ1xuICAgICAgbG9nKGRpcmVjdGlvbilcbiAgICB9KVxuICB9XG4gICovICBcblxuICBpc01hYygpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnBsYXRmb3JtLmluZGV4T2YoJ01hYycpXG4gIH1cbn1cblxuY29uc3QgbmFtZW5vdGUgPSBuZXcgTmFtZW5vdGUoKVxuXG5leHBvcnQgeyBuYW1lbm90ZSB9XG4gICAgXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZVZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSAkKCcucGFnZS12aWV3JylbMF1cbiAgICB0aGlzLnByZXZlbnRTY3JvbGxGcmVlemUoKVxuICB9XG59XG5cbmNvbnN0IHBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3KClcblxuZXhwb3J0IHsgcGFnZVZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGlkID0gMFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3BhZ2UgZGVzdHJ1Y3RvcicsIHRoaXMucGlkKVxuICB9XG59XG5cbmV4cG9ydCB7IFBhZ2UgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IG1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuaW1wb3J0IHsgdGl0bGUgfSBmcm9tICcuL3RpdGxlLmVzNidcbmltcG9ydCB7IHZpZXdCdXR0b24gfSBmcm9tICcuL3ZpZXctYnV0dG9uLmVzNidcblxuaW1wb3J0IHsgbWFpblZpZXcgfSBmcm9tICcuL21haW4tdmlldy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gW11cbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cblxuICBzZWxlY3QocHJvamVjdCkge1xuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHByb2plY3QudXJsKVxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICAgIH1cbiAgICAgIHJlY2VudFVSTC5hZGQocHJvamVjdC51cmwpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuY3VycmVudCA9IHByb2plY3RcbiAgICBtYWluVmlldy5zZXRQcm9qZWN0KHByb2plY3QpXG4gICAgdGl0bGUuc2V0KHByb2plY3QgPyBwcm9qZWN0Lm5hbWUoKSA6IG51bGwpXG5cbiAgICBtZW51LnVwZGF0ZSgpXG4gICAgdmlld0J1dHRvbi51cGRhdGUoKVxuICB9XG5cbiAgZmluZEluZGV4KHVybCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0udXJsID09IHVybCkge1xuICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTFcbiAgfVxuICBcbiAgb3Blbih1cmwpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHVybClcbiAgICBjb25zdCBwcm9qZWN0ID0gKGluZGV4ID49IDApID8gdGhpcy5wcm9qZWN0c1tpbmRleF0gOiBuZXcgUHJvamVjdCh1cmwpXG5cbiAgICB0aGlzLnNlbGVjdChwcm9qZWN0KVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJvamVjdClcbiAgfVxuICBcbiAgY2xvc2UocHJvamVjdCkge1xuICAgIHdhcm4oJ1tjbG9zZV0nLCBwcm9qZWN0KVxuICAgIGlmICghcHJvamVjdCkgcHJvamVjdCA9IHRoaXMuY3VycmVudFxuICAgIGlmICghcHJvamVjdCkgcmV0dXJuXG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHByb2plY3QudXJsKVxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGlmIChwcm9qZWN0ID09IHRoaXMuY3VycmVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLnByb2plY3RzW3RoaXMucHJvamVjdHMubGVuZ3RoIC0gMV0pXG4gICAgICB9XG4gICAgICBwcm9qZWN0LmRlc3RydWN0b3IoKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcm9qZWN0TWFuYWdlciA9IG5ldyBQcm9qZWN0TWFuYWdlclxuXG5leHBvcnQgeyBwcm9qZWN0TWFuYWdlciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gICAgdGhpcy5wYWdlcyA9IFtdXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3Byb2plY3QgZGVzdHJ1Y3RvcicsIHRoaXMudXJsKVxuICAgIFxuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2UuZGVzdHJ1Y3RvcigpXG4gICAgfSlcbiAgfVxuXG4gIGZpbmRJbmRleChwYWdlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wYWdlc1tpXS5waWQgPT0gcGFnZS5waWQpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBuYW1lKCkge1xuICAgIHJldHVybiAodGhpcy51cmwpID8gdGhpcy51cmwucmVwbGFjZSgvXi4qXFwvLywgJycpIDogVCgnVW50aXRsZWQnKVxuICB9XG59XG5cbmV4cG9ydCB7IFByb2plY3QgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmNvbnN0IG1heCA9IDEwXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUmVjZW50VVJMIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJylcbiAgICB0aGlzLmRhdGEgPSAoanNvbikgPyBKU09OLnBhcnNlKGpzb24pIDogW11cbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvcmVjZW50LXVybCcsIGpzb24pXG4gIH1cblxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgICB0aGlzLnNhdmUoKVxuXG4vLyAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbWVudS51cGRhdGUoKVxuLy8gIH0sIDUwMClcbiAgfVxuXG4gIGFkZCh1cmwpIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgIT0gdXJsKVxuICAgIHRoaXMuZGF0YS51bnNoaWZ0KHVybClcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gbWF4KSB7XG4gICAgICB0aGlzLmRhdGEubGVuZ3RoID0gbWF4XG4gICAgfVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cbn1cblxuY29uc3QgcmVjZW50VVJMID0gbmV3IFJlY2VudFVSTCgpXG5cbmV4cG9ydCB7IHJlY2VudFVSTCB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3Qgc2hvcnRjdXREZWZhdWx0ID0ge1xuICB1bmRvOiBbJ2NvbW1hbmQreicsICdjdHJsK3onLCAnbnVtLycsICcsJ10sXG4gIHJlZG86IFsnY29tbWFuZCt5JywgJ2N0cmwreScsICdudW0qJywgJy4nXSxcbiAgem9vbTogWydbJywgJ3EnLCAnbnVtcGx1cyddLFxuICB1bnpvb206IFsnXScsICdhJywgJ251bW1pbnVzJ10sXG4gIHRvZ2dsZVRvb2w6IFsneCcsICdudW0uJywgJy8nXSxcblxuICBvcGVuTmV3RGlhbG9nOiBbJ2NvbW1hbmQrbicsICdhbHQrbiddLFxuICBvcGVuRGlhbG9nOiBbJ2NvbW1hbmQrbycsICdhbHQrbyddLFxuICBcbiAgY2xvc2U6IFsnY29tbWFuZCt3JywgJ2FsdCt3J10sXG4gIHF1aXQ6IFsnY29tbWFuZCtxJywgJ2FsdCtxJ10sXG4gIHJlbG9hZDogWydjb21tYW5kK3NoaWZ0K3InXSxcblxuICBleHBvcnRDU05GRGlhbG9nOiBbJ2NvbW1hbmQrcCcsICdhbHQrcCddLFxuICBleHBvcnRQREZEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtwJywgJ2FsdCtzaGlmdCtwJ10sXG4gIGltcG9ydFRleHREaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIHNhdmVQYWdlSW1hZ2U6IFsnY29tbWFuZCstJywgJ2FsdCstJ10sXG4gIGV4dHJhY3RUZXh0OiBbJ2NvbW1hbmQrdCcsICdhbHQrdCddLFxuXG4gIC8vbWFyZ2luU2V0dGluZ3NEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIFxuICBwYWdlTGVmdDogJ2xlZnQnLFxuICBwYWdlUmlnaHQ6ICdyaWdodCcsXG4gIHBhZ2VVcDogJ3VwJywgICAgICBcbiAgcGFnZURvd246ICdkb3duJywgIFxuXG4gIHNlbGVjdEFsbDogJ2N0cmwrYScsXG4gIHVuc2VsZWN0OiAnY3RybCtkJyxcbiAgbWVyZ2VUZXh0OiAnY3RybCtlJyxcbiAgXG4gIHNpZGVCYXI6ICcxJyxcbiAgZGV2ZWxvcGVyVG9vbHM6ICdjb21tYW5kK2FsdCtqJyxcbiAgdG9vbEJhcjogJ2NvbW1hbmQrYWx0K2gnLFxuXG4gIHBlbjogJ3AnLFxuICBlcmFzZXI6ICdlJyxcbiAgdGV4dDogJ3QnLFxuXG4gIC8vXG4gIC8vIFBhZ2Ugc2hvcnRjdXRzXG4gIC8vXG4gIFxuICBpbnNlcnRQYWdlOiAnc2hpZnQraScsXG4gIGR1cGxpY2F0ZVBhZ2U6ICdzaGlmdCtkJyxcblxuICBzaG93TWFyZ2luOiAncicsXG4vL2ZsaXBQYWdlOiAnaCcsXG4gIGFwcGVuZFBhZ2U6ICdzaGlmdCthJyxcbiAgY3V0UGFnZTogJ3NoaWZ0K2snLFxuICBwYXN0ZVBhZ2U6ICdzaGlmdCt5JyxcbiAgZW1wdHlQYWdlOiAnc2hpZnQrMCcsXG4gIG1vdmVQYWdlTGVmdDogJzwnLFxuICBtb3ZlUGFnZVJpZ2h0OiAnPicsXG4gIHJvdzE6ICdzaGlmdCsxJyxcbiAgcm93MjogJ3NoaWZ0KzInLFxuICByb3czOiAnc2hpZnQrMycsXG4gIHJvdzQ6ICdzaGlmdCs0JyxcblxuICAvL1xuICAvLyBUZXh0IHNob3J0Y3V0cyAoY2FuIGJlIHVzZWQgd2hpbGUgdGV4dCBlZGl0aW5nKVxuICAvL1xuICBcbiAgdG9nZ2xlRWRpdE1vZGU6ICdjdHJsK2cnLFxuICBhZGRGb250U2l6ZTogJ2N0cmwrLicsXG4gIHN1YnRyYWN0Rm9udFNpemU6ICdjdHJsKywnLFxuICB0b2dnbGVEaXJlY3Rpb246ICdjdHJsK10nLFxuICBjdXRUZXh0OiAnYmFja3NwYWNlJyxcbiAgbmV4dFRleHQ6ICd0YWInLFxuICBwcmV2VGV4dDogJ3NoaWZ0K3RhYicsXG59XG5cbmV4cG9ydCB7IHNob3J0Y3V0RGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuLy9pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXREZWZhdWx0IH0gZnJvbSAnLi9zaG9ydGN1dC1kZWZhdWx0LmVzNidcbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG4vKlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5lczYnXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmVzNidcbiovXG5cbmltcG9ydCB7IHVpIH0gZnJvbSAnLi91aS5lczYnXG5cbmNsYXNzIFNob3J0Y3V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cblxuICAgIE1vdXNldHJhcC5hZGRLZXljb2Rlcyh7XG4gICAgICAxMDc6ICdudW1wbHVzJyxcbiAgICAgIDEwOTogJ251bW1pbnVzJyxcbiAgICAgIDExMDogJ251bS4nLFxuICAgICAgMTExOiAnbnVtLycsXG4gICAgICAxMDY6ICdudW0qJyxcbiAgICB9KVxuXG4gICAgTW91c2V0cmFwLnByb3RvdHlwZS5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbihlLCBlbGVtZW50LCBjb21ibykge1xuLypcbiAgICAgIGlmIChUZXh0LmlzRWRpdGFibGUoZWxlbWVudCkpIHtcbiAgICAgICAgbG9nKCdrZXljb2RlPScsIGUua2V5Q29kZSwgZSlcblxuXHRpZiAoZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5ICYmICFlLm1ldGFLZXkpIHtcblx0ICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuXHQgIGNhc2UgNzE6ICAvLyBjdHJsK2dcblx0ICBjYXNlIDE4ODogLy8gY3RybCssXG5cdCAgY2FzZSAxOTA6IC8vIGN0cmwrLlxuXHQgIGNhc2UgMjIxOiAvLyBjdHJsK11cblx0ICAgIHJldHVybiBmYWxzZVxuXHQgIH1cblx0fVxuXG5cdGlmIChlLmtleUNvZGUgPT0gOSkgeyAvLyBUQUJcblx0ICByZXR1cm4gZmFsc2Vcblx0fVxuXHRyZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlXG4qL1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9zaG9ydGN1dCcpXG4gICAgdGhpcy5kYXRhID0ganNvbiA/IEpTT04ucGFyc2UoanNvbikgOiBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dERlZmF1bHQpXG4gICAgdGhpcy5iaW5kKClcbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvc2hvcnRjdXQnLCBqc29uKVxuICB9XG4gIFxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgc2hvcnRjdXREZWZhdWx0KVxuICAgIHRoaXMuc2F2ZSgpXG5cbiAgICBNb3VzZXRyYXAucmVzZXQoKVxuICAgIHRoaXMuYmluZCgpXG4gIH1cblxuICBiaW5kKCkge1xuICAgIGZvciAobGV0IGl0ZW0gaW4gdGhpcy5kYXRhKSB7XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLmRhdGFbaXRlbV1cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSBjb21tYW5kW2l0ZW1dXG5cbiAgICAgIGlmIChpdGVtID09ICdkZXZlbG9wZXJUb29scycpIGNvbnRpbnVlXG5cbiAgICAgIGlmIChoYW5kbGVyKSB7XG5cdGxvZyhgJyR7aXRlbX1gKVxuICAgICAgICBcblx0TW91c2V0cmFwLmJpbmQoa2V5LCAoZSkgPT4ge1xuXHQgIGNvbW1hbmQucHJldiA9IGNvbW1hbmQuY3VycmVudFxuXHQgIGNvbW1hbmQuY3VycmVudCA9IGl0ZW1cblx0ICBsb2coYCoke2l0ZW19KmApXG4gICAgICAgICAgXG5cdCAgaGFuZGxlcigpXG5cdCAgcmV0dXJuICh1aS5kaWFsb2cuaXNPcGVuKCkpID8gdHJ1ZSA6IGZhbHNlXG5cblx0fSwgJ2tleWRvd24nKVxuXG4gICAgICB9IGVsc2Uge1xuXHRsb2coYCcke2l0ZW19Jzogbm8gc3VjaCBjb21tYW5kYClcbiAgICAgIH1cbiAgICB9XG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgQ29udHJvbGxlci5jbGVhck1vdmUoKVxuLy8gICAgcmV0dXJuIGZhbHNlO1xuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnZW50ZXInLCAoZSkgPT4ge1xuLy8gICAgaWYgKHVpLmRpYWxvZy5pc09wZW4oKSkgcmV0dXJuIHRydWVcbi8vICAgIGNvbW1hbmQucXVpY2tab29tKClcbi8vICAgIHJldHVybiBmYWxzZVxuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgaWYgKCFDb250cm9sbGVyLmlzTW92ZWQoKSkge1xuLy9cdGNvbW1hbmQucXVpY2tab29tKCk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSwgJ2tleXVwJylcbiAgfVxufVxuXG5jb25zdCBzaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCgpXG5cbmV4cG9ydCB7IHNob3J0Y3V0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcblxubGV0IHBhZ2VCdXR0b25cbmxldCB0ZXh0QnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2lkZUJhclRhYiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdXG4gIH1cblxuICBpbml0KCkge1xuICAgIHBhZ2VCdXR0b24gPSAkKCcjcGFnZS12aWV3LWJ1dHRvbicpLnRleHRCdXR0b24oe1xuICAgICAgdGV4dDogVCgnUGFnZXMnKSxcbiAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS50ZXh0QnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgY29tbWFuZC5zaG93UGFnZVZpZXcoKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlbMF1cblxuICAgIHRleHRCdXR0b24gPSAkKCcjdGV4dC12aWV3LWJ1dHRvbicpLnRleHRCdXR0b24oe1xuICAgICAgdGV4dDogVCgnVGV4dHMnKSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS50ZXh0QnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgY29tbWFuZC5zaG93VGV4dFZpZXcoKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKHBhZ2VCdXR0b24sIHRleHRCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cblxuICBzZWxlY3QobmFtZSkge1xuICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgY29uc3QgbG9ja2VkID0gJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcpXG5cbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkLmluZGV4T2YobmFtZSkgPT0gMCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS50ZXh0QnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHNpZGVCYXJUYWIgPSBuZXcgU2lkZUJhclRhYigpXG5cbmV4cG9ydCB7IHNpZGVCYXJUYWIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHNpZGVCYXJUYWIgfSBmcm9tICcuL3NpZGUtYmFyLXRhYi5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2lkZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzaWRlQmFyVGFiLmluaXQoKVxuICB9XG4gIFxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBzaWRlQmFyVGFiLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhciA9IG5ldyBTaWRlQmFyKClcblxuZXhwb3J0IHsgc2lkZUJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFRleHRWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gJCgnLnRleHQtdmlldycpWzBdXG4gICAgdGhpcy5wcmV2ZW50U2Nyb2xsRnJlZXplKClcbiAgfVxufVxuXG5jb25zdCB0ZXh0VmlldyA9IG5ldyBUZXh0VmlldygpXG5cbmV4cG9ydCB7IHRleHRWaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG5jbGFzcyBUaXRsZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXQoKVxuICB9XG4gIFxuICBzZXQodGl0bGUpIHtcbiAgICBpZiAoIXRpdGxlKSB7XG4gICAgICB0aXRsZSA9IChuYW1lbm90ZS50cmlhbCkgPyBgJHtUKCdOYW1lbm90ZScpfSAke1QoJ1RyaWFsJyl9YCA6IFQoJ05hbWVub3RlJylcbiAgICB9XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnNldFRpdGxlKHRpdGxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRpdGxlID0gbmV3IFRpdGxlKClcblxuZXhwb3J0IHsgdGl0bGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcbmltcG9ydCB7IHZpZXdCdXR0b24gfSBmcm9tICcuL3ZpZXctYnV0dG9uLmVzNidcbmltcG9ydCB7IGhpc3RvcnlCdXR0b24gfSBmcm9tICcuL2hpc3RvcnktYnV0dG9uLmVzNidcbmltcG9ydCB7IHRvb2xCdXR0b24gfSBmcm9tICcuL3Rvb2wtYnV0dG9uLmVzNidcbmltcG9ydCB7IG1lbnVCdXR0b24gfSBmcm9tICcuL21lbnUtYnV0dG9uLmVzNidcblxuY2xhc3MgVG9vbEJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB2aWV3QnV0dG9uLmluaXQoKVxuICAgIGhpc3RvcnlCdXR0b24uaW5pdCgpXG4gICAgdG9vbEJ1dHRvbi5pbml0KClcbiAgICBtZW51QnV0dG9uLmluaXQoKVxuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIHRoaXMudXBkYXRlQnV0dG9ucygpXG4gIH1cbiAgXG4gIHVwZGF0ZUJ1dHRvbnMoKSB7XG4gICAgdmlld0J1dHRvbi51cGRhdGUoKVxuICAgIGhpc3RvcnlCdXR0b24udXBkYXRlKClcbiAgICB0b29sQnV0dG9uLnVwZGF0ZSgpXG4gICAgbWVudUJ1dHRvbi51cGRhdGUoKVxuICB9XG4gIFxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB2YWx1ZSA9IGNvbmZpZy5kYXRhLnRvb2xCYXJcbiAgICBjb25maWcuZGF0YS50b29sQmFyID0gdmFsdWVcbiAgICBjb25maWcuc2F2ZSgpXG5cbiAgICAkKCcjdG9vbGJhcicpLmNzcygnZGlzcGxheScsIHZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAkKCcjbWFpbicpLmNzcygnaGVpZ2h0JywgdmFsdWUgPyAnY2FsYygxMDAlIC0gMzdweCknIDogJzEwMCUnKVxuICAgICQoJyNtYWluJykuY3NzKCd0b3AnLCB2YWx1ZSA/ICczN3B4JyA6ICcwJylcblxuICAgIC8vVmlldy5vblJlc2l6ZSgpXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGUoIWNvbmZpZy5kYXRhLnRvb2xCYXIpXG4gIH1cbn1cblxuY29uc3QgdG9vbEJhciA9IG5ldyBUb29sQmFyKCk7XG5cbmV4cG9ydCB7IHRvb2xCYXIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgaHRtbERyb3Bkb3duIH0gZnJvbSAnLi9odG1sLWRyb3Bkb3duLmVzNidcblxubGV0IHBlbkJ1dHRvblxubGV0IGVyYXNlckJ1dHRvblxubGV0IHRleHRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUb29sQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcGVuQnV0dG9uID0gJCgnI3Blbi1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvcGVuLWJ1dHRvbi5wbmcnLFxuICAgICAgbG9ja2VkOiB0cnVlLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KCdwZW4nKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgncGVuRHJvcERvd24nLCAncGVuJylcbiAgICB9KVswXVxuICAgIFxuICAgIGVyYXNlckJ1dHRvbiA9ICQoJyNlcmFzZXItYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL2VyYXNlci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdCgnZXJhc2VyJylcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbERyb3Bkb3duLm1ha2UoJ2VyYXNlckRyb3BEb3duJywgJ2VyYXNlcicpXG4gICAgfSlbMF1cblxuICAgIHRleHRCdXR0b24gPSAkKCcjdGV4dC1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdGV4dC1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdCgndGV4dCcpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCd0ZXh0RHJvcERvd24nLCAndGV4dCcpXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKHBlbkJ1dHRvbiwgZXJhc2VyQnV0dG9uLCB0ZXh0QnV0dG9uKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG5cbiAgc2VsZWN0KG5hbWUpIHtcbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJylcbiAgICAgIFxuICAgICAgaWYgKGJ1dHRvbiAmJiBidXR0b24uaWQuaW5kZXhPZihuYW1lKSA9PSAwKSB7XG4gICAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCB0b29sQnV0dG9uID0gbmV3IFRvb2xCdXR0b24oKVxuXG5leHBvcnQgeyB0b29sQnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyB3aWRnZXQgfSBmcm9tICcuL3dpZGdldC5lczYnXG5pbXBvcnQgeyBkaXZpZGVyIH0gZnJvbSAnLi9kaXZpZGVyLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcbmltcG9ydCB7IG1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuaW1wb3J0IHsgdGl0bGUgfSBmcm9tICcuL3RpdGxlLmVzNidcblxuaW1wb3J0IHsgdG9vbEJhciB9IGZyb20gJy4vdG9vbC1iYXIuZXM2J1xuaW1wb3J0IHsgc2lkZUJhciB9IGZyb20gJy4vc2lkZS1iYXIuZXM2J1xuXG5jbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWVudSA9IG1lbnVcbiAgICB0aGlzLmRpdmlkZXIgPSBkaXZpZGVyXG4gICAgdGhpcy5kaWFsb2cgPSBkaWFsb2dcblxuICAgIHRoaXMudG9vbEJhciA9IHRvb2xCYXJcbiAgICB0aGlzLnNpZGVCYXIgPSBzaWRlQmFyXG4gIH1cbiAgXG4gIGluaXQoKSB7XG4gICAgbWVudS5pbml0KClcbiAgICB0aXRsZS5pbml0KClcbiAgICBkaXZpZGVyLmluaXQoKVxuICAgIGRpYWxvZy5pbml0KClcblxuICAgIHRvb2xCYXIuaW5pdCgpXG4gICAgc2lkZUJhci5pbml0KClcblxuICAgICQoJy5zcGxpdC1wYW5lJykuY3NzKCdvcGFjaXR5JywgMSlcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbi8vICB0b29sQmFyLnVwZGF0ZSgpXG4vLyAgc2lkZUJhci51cGRhdGUoKVxuXG4vLyAgZGl2aWRlci51cGRhdGUoKVxuICB9XG59XG5cbmNvbnN0IHVpID0gbmV3IFVJKClcblxuZXhwb3J0IHsgdWkgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5cbmxldCBxdWlja1pvb21CdXR0b25cbmxldCB6b29tQnV0dG9uXG5sZXQgdW56b29tQnV0dG9uXG5sZXQgc3BsaXRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBWaWV3QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHF1aWNrWm9vbUJ1dHRvbiA9ICQoJyNyb3ctYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL21hZ25pZmllci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC5xdWlja1pvb20oKSB9XG4gICAgfSlbMF1cblxuICAgIHpvb21CdXR0b24gPSAkKCcjem9vbS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvem9vbS1idXR0b24ucG5nJyxcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyBjb21tYW5kLnpvb20oKSB9XG4gICAgfSlbMF1cblxuICAgIHVuem9vbUJ1dHRvbiA9ICQoJyN1bnpvb20tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3Vuem9vbS1idXR0b24ucG5nJyxcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyBjb21tYW5kLnVuem9vbSgpIH1cbiAgICB9KVswXVxuXG4gICAgc3BsaXRCdXR0b24gPSAkKCcjc3BsaXQtYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3Vuem9vbS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC5zaWRlQmFyKCkgfVxuICAgIH0pWzBdXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBjb25zdCBxdWlja1pvb20gPSBwcm9qZWN0IC8vKHByb2plY3QpID8gcHJvamVjdC52aWV3LnF1aWNrWm9vbSA6IGZhbHNlXG4gICAgXG4gICAgJCh6b29tQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhcHJvamVjdClcbiAgICAkKHVuem9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG4gICAgJChxdWlja1pvb21CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFwcm9qZWN0KVxuXG4gICAgJChxdWlja1pvb21CdXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBxdWlja1pvb20pXG4gICAgJChzcGxpdEJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGNvbmZpZy5kYXRhLnNpZGVCYXIpXG4gIH1cbn1cblxuY29uc3Qgdmlld0J1dHRvbiA9IG5ldyBWaWV3QnV0dG9uKClcblxuZXhwb3J0IHsgdmlld0J1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBwcmV2ZW50U2Nyb2xsRnJlZXplKCkge1xuICAgIHRoaXMubGFzdFkgPSAwXG5cbiAgICBjb25zdCBzY3JvbGxlciA9ICQodGhpcy5lbGVtZW50KS5wYXJlbnQoKVxuICAgIHNjcm9sbGVyLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgdGhpcy5sYXN0WSA9IGUudG91Y2hlc1swXS5jbGllbnRZXG4gICAgfS5iaW5kKHRoaXMpKVxuICAgIFxuICAgIHNjcm9sbGVyLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBjb25zdCB0b3AgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuXG4gICAgICBjb25zdCBzY3JvbGxUb3AgPSAkKGUuY3VycmVudFRhcmdldCkuc2Nyb2xsVG9wKClcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9ICh0aGlzLmxhc3RZIC0gdG9wKSA8IDAgPyAndXAnOiAnZG93bidcblxuICAgICAgaWYgKHNjcm9sbFRvcCA9PT0gMCAmJiBkaXJlY3Rpb24gPT09IFwidXBcIikge1xuICAgICAgICBsb2coJ3ByZXZlbnQgdXAuLicpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPj0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUudGFyZ2V0Lm9mZnNldEhlaWdodCAmJiBkaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGxvZygncHJldmVudCBkb3duLi4nKVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdFkgPSB0b3A7XG4gICAgfS5iaW5kKHRoaXMpKVxuICB9XG59XG5cbmV4cG9ydCB7IFZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIFdpZGdldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdEltYWdlQnV0dG9uKClcbiAgICB0aGlzLmluaXRUZXh0QnV0dG9uKClcbiAgfVxuXG4gIGluaXRUZXh0QnV0dG9uKCkge1xuICAgICQud2lkZ2V0KCduYW1lbm90ZS50ZXh0QnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgIH0sXG5cbiAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ3RleHQtYnV0dG9uJylcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnZmxvYXQnLCB0aGlzLm9wdGlvbnMuZmxvYXQpXG4gICAgICAgIHRoaXMubG9ja2VkKHRoaXMub3B0aW9ucy5sb2NrZWQpXG4gICAgICAgIHRoaXMuZWxlbWVudC50ZXh0KHRoaXMub3B0aW9ucy50ZXh0KVxuXG4gICAgICAgIGNvbnN0IGNsaWNrID0gdGhpcy5vcHRpb25zLmNsaWNrXG4gICAgICAgIGlmIChjbGljaykgdGhpcy5lbGVtZW50Lm9uKCdjbGljaycsIGNsaWNrKVxuICAgICAgfSxcblxuICAgICAgbG9ja2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5sb2NrZWRcblxuICAgICAgICB0aGlzLm9wdGlvbnMubG9ja2VkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KVxuICB9XG4gIFxuICBpbml0SW1hZ2VCdXR0b24oKSB7XG4gICAgJC53aWRnZXQoJ25hbWVub3RlLmltYWdlQnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICB3aWR0aDogJzI0cHgnLFxuICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgXG4gICAgICBfY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdpbWctYnV0dG9uJylcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoJHt0aGlzLm9wdGlvbnMuc3JjfSlgKVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCdmbG9hdCcsIHRoaXMub3B0aW9ucy5mbG9hdClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpXG5cbiAgICAgICAgdGhpcy5sb2NrZWQodGhpcy5vcHRpb25zLmxvY2tlZClcbiAgICAgICAgdGhpcy5kaXNhYmxlZCh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnQpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgICBjb250ZW50LnRpdGxlID0gXCJcIlxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmxvYXQgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgY29udGVudC5zdHlsZS5yaWdodCA9IFwiMFwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50UGFyZW50IHx8IHRoaXMuZWxlbWVudFswXVxuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFBhcmVudCkge1xuICAgICAgICAgICAgLy8gU2hvdWxkIHJlY2FsYyBtZW51IHBvc3Rpb24gb24gb3BlblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsaWNrID0gdGhpcy5vcHRpb25zLmNsaWNrXG4gICAgICAgIGlmIChjbGljaykgdGhpcy5lbGVtZW50Lm9uKCdjbGljaycsIGNsaWNrKVxuICAgICAgfSxcblxuICAgICAgbG9ja2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5sb2NrZWRcblxuICAgICAgICB0aGlzLm9wdGlvbnMubG9ja2VkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9IGVsc2Uge1xuXHQgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5vcHRpb25zLmRpc2FibGVkXG4gICAgICBcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdvZmYnKVxuICAgICAgICB9IGVsc2Uge1xuXHQgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnb2ZmJylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlQ29udGVudFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgY29uc3QgY29udGVudFdpZHRoID0gdGhpcy5vcHRpb25zLmNvbnRlbnRXaWR0aCB8fCAxNTBcblxuICAgICAgICBjb25zdCB3aWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcbiAgICAgICAgY29uc3QgbGVmdCA9IChyZWN0LnggKyBjb250ZW50V2lkdGgpIDwgd2lkdGggPyByZWN0LnggOiB3aWR0aCAtIGNvbnRlbnRXaWR0aFxuICAgICAgICBjb250ZW50LnN0eWxlLmxlZnQgPSAobGVmdCAtIDIpICsgJ3B4J1xuICAgICAgICBjb250ZW50LnN0eWxlLnRvcCA9ICg2NCArIDIpICsgJ3B4J1xuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoKVxuXG5leHBvcnQgeyB3aWRnZXQgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkaWN0aW9uYXJ5ID0ge1xuICBcImphXCI6IHtcbiAgICBcIk5hbWVub3RlXCI6IFwiTmFtZW5vdGVcIixcbiAgICBcIkFib3V0IE5hbWVub3RlXCI6IFwiTmFtZW5vdGUg44Gr44Gk44GE44GmXCIsXG4gICAgXCJBYm91dCBOYW1lbm90ZSAuLi5cIjogXCJOYW1lbm90ZSDjgavjgaTjgYTjgaYgLi4uXCIsXG4gICAgXCJIZWxwXCI6IFwi44OY44Or44OXXCIsXG4gICAgXCJTZXR0aW5nc1wiOiBcIueSsOWig+ioreWumlwiLFxuICAgIFwiU2V0dGluZ3MgLi4uXCI6IFwi55Kw5aKD6Kit5a6aIC4uLlwiLFxuICAgIFwiVGFibGV0IFNldHRpbmdzXCI6IFwi562G5Zyn6Kq/5pW0XCIsXG4gICAgXCJUYWJsZXQgU2V0dGluZ3MgLi4uXCI6IFwi562G5Zyn6Kq/5pW0IC4uLlwiLFxuICAgIFwiUXVpdCBOYW1lbm90ZVwiOiBcIk5hbWVub3RlIOOCkue1guS6hlwiLFxuICAgIFwiTm90ZVwiOiBcIuODjuODvOODiFwiLFxuICAgIFwiRmlsZVwiOiBcIuODleOCoeOCpOODq1wiLFxuICAgIFwiT3BlbiAuLi5cIjogXCLplovjgY8gLi4uXCIsXG4gICAgXCJPcGVuXCI6IFwi44OO44O844OI44KS6ZaL44GPXCIsXG4gICAgXCJOZXcgLi4uXCI6IFwi5paw6KaPIC4uLlwiLFxuICAgIFwiTmV3XCI6IFwi5paw6KaP44OO44O844OIXCIsXG4gICAgXCJDbG9zZVwiOiBcIumWieOBmOOCi1wiLFxuICAgIFwiQ2xvc2UgQWxsXCI6IFwi44GZ44G544Gm44KS6ZaJ44GY44KLXCIsXG4gICAgXCJOb3RlIFNldHRpbmdzIC4uLlwiOiBcIuODjuODvOODiOioreWumiAuLi5cIixcbiAgICBcIkV4cG9ydFwiOiBcIuabuOOBjeWHuuOBl1wiLFxuICAgIFwiSW1wb3J0XCI6IFwi6Kqt44G/6L6844G/XCIsXG4gICAgXCIuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uXCI6IFwiLmNzbmYgKENMSVAgU1RVRElPIOODjeODvOODoOODleOCoeOCpOODqykgLi4uXCIsXG4gICAgXCIucGRmIChQREYpIC4uLlwiOiBcIi5wZGYgKFBERikgLi4uXCIsXG4gICAgXCIudHh0IChQbGFpbiBUZXh0KSAuLi5cIjogXCIudHh0ICjjg4bjgq3jgrnjg4jjg5XjgqHjgqTjg6spIC4uLlwiLFxuICAgIFwiU2F2ZVwiOiBcIuS/neWtmFwiLFxuICAgIFwiU2F2ZSBBcyAuLi5cIjogXCLlkI3liY3jgpLjgaTjgZHjgabkv53lrZggLi4uXCIsXG4gICAgXCJTYXZlIEFzXCI6IFwi5ZCN5YmN44KS44Gk44GR44Gm5L+d5a2YXCIsXG4gICAgXCJTYXZlIFNuYXBzaG90IEFzIC4uLlwiOiBcIuODkOODg+OCr+OCouODg+ODl+OCkuS/neWtmCAuLi5cIixcbiAgICBcIkVkaXRcIjogXCLnt6jpm4ZcIixcbiAgICBcIlVuZG9cIjogXCLlj5bjgormtojjgZdcIixcbiAgICBcIlJlZG9cIjogXCLjgoTjgornm7TjgZdcIixcbiAgICBcIkN1dFwiOiBcIuWIh+OCiuWPluOCilwiLFxuICAgIFwiQ29weVwiOiBcIuOCs+ODlOODvFwiLFxuICAgIFwiUGFzdGVcIjogXCLosrzjgorku5jjgZFcIixcbiAgICBcIlNlbGVjdCBBbGxcIjogXCLjgZnjgbnjgabjgpLpgbjmip5cIixcblxuICAgIFwiUGFnZVwiOiBcIuODmuODvOOCuFwiLFxuICAgIFwiQWRkXCI6IFwi6L+95YqgXCIsXG4gICAgXCJNb3ZlIHRvIEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOBq+WFpeOCjOOCi1wiLFxuICAgIFwiUHV0IEJhY2sgZnJvbSBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgYvjgonmiLvjgZlcIixcbiAgICBcIkVtcHR5IEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOCkuepuuOBq+OBmeOCi1wiLFxuICAgIFwiRHVwbGljYXRlXCI6IFwi6KSH6KO944KS6L+95YqgXCIsXG4gICAgXCJNb3ZlIEZvcndhcmRcIjogXCLliY3jgavnp7vli5VcIixcbiAgICBcIk1vdmUgQmFja3dhcmRcIjogXCLlvozjgo3jgavnp7vli5VcIixcbiAgICBcIkZsaXBcIjogXCLlt6blj7Plj43ou6LjgZfjgabooajnpLpcIixcbiAgICBcIlNhdmUgSW1hZ2UgQXMgLi4uXCI6IFwi44Kk44Oh44O844K444KS5L+d5a2YIC4uLlwiLFxuICAgIFwiU2F2ZSBJbWFnZVwiOiBcIuOCpOODoeODvOOCuOOCkuS/neWtmFwiLFxuICAgIFxuICAgIFwiVW50aXRsZWRcIjogXCLlkI3np7DmnKroqK3lrppcIixcbiAgICBcIlZpZXdcIjogXCLooajnpLpcIixcbiAgICBcIlRvb2wgQmFyXCI6IFwi44OE44O844Or44OQ44O8XCIsXG4gICAgXCJTaWRlIEJhclwiOiBcIuOCteOCpOODieODkOODvFwiLFxuICAgIFwiRGV2ZWxvcGVyIFRvb2xzXCI6IFwi44OH44OZ44Ot44OD44OR44O8IOODhOODvOODq1wiLFxuICAgIFwiRnVsbCBTY3JlZW5cIjogXCLjg5Xjg6vjgrnjgq/jg6rjg7zjg7NcIixcbiAgICBcIlBhZ2UgTWFyZ2luXCI6IFwi5L2Z55m9XCIsXG4gICAgXCJOdW1iZXIgb2YgUGFnZXMgcGVyIFJvd1wiOiBcIjHooYzjgYLjgZ/jgorjga7jg5rjg7zjgrjmlbBcIixcbiAgICBcIlpvb20gSW5cIjogXCLmi6HlpKdcIixcbiAgICBcIlpvb20gT3V0XCI6IFwi57iu5bCPXCIsXG4gICAgXG4gICAgXCJXaW5kb3dcIjogXCLjgqbjgqPjg7Pjg4njgqZcIixcbiAgICBcIkV4dHJhY3QgVGV4dFwiOiBcIuODhuOCreOCueODiOOCkuaKveWHulwiLFxuICAgIFwiT3BlbiBSZWNlbnRcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjgpLplovjgY9cIixcbiAgICBcIkNsZWFyIFJlY2VudCBOb3RlIExpc3RcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjga7jg6rjgrnjg4jjgpLmtojljrtcIixcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJNYWtpbmcgQ1NORiAuLi5cIjogXCJDU05G44OV44Kh44Kk44Or44KS5L2c5oiQ5LitIC4uLlwiLFxuICAgIFwiT25saW5lIFN0b3JhZ2VcIjogXCLjgqrjg7Pjg6njgqTjg7Pjgrnjg4jjg6zjg7zjgrhcIixcblxuICAgIFwiUGFnZXNcIjogXCLjg5rjg7zjgrhcIixcbiAgICBcIlRleHRzXCI6IFwi44OG44Kt44K544OIXCIsXG5cbiAgICBcIlNpZGUgQmFyIFBvc2l0aW9uXCI6IFwi44K144Kk44OJ44OQ44O844Gu5L2N572uXCIsXG4gICAgXCJMZWZ0XCI6IFwi5bemXCIsXG4gICAgXCJSaWdodFwiOiBcIuWPs1wiLFxuICAgIFxuICAgIFwiU1wiOiBcIuWwj1wiLFxuICAgIFwiTVwiOiBcIuS4rVwiLFxuICAgIFwiTFwiOiBcIuWkp1wiLFxuICAgIFwiUHJlc3N1cmVcIjogXCLnrYblnKdcIixcbiAgICBcIlZlcnRpY2FsXCI6IFwi57im5pu444GNXCIsXG4gICAgXCJIb3Jpem9udGFsXCI6IFwi5qiq5pu444GNXCIsXG5cbiAgICBcIk5ldyBub3RlYm9va1wiOiBcIuaWsOimj+ODjuODvOODiFwiLFxuICAgIFwiTm90ZWJvb2sgbmFtZVwiOiBcIuODjuODvOODiOWQjVwiLFxuICAgIFwiRm9sZGVyXCI6IFwi5L+d5a2Y5YWIXCIsXG4gICAgXCJDaG9vc2UgZm9sZGVyLi4uXCI6IFwi5Y+C54WnLi4uXCIsXG4gICAgXCJOdW1iZXIgb2YgcGFnZXNcIjogXCLjg5rjg7zjgrjmlbBcIixcbiAgICBcIlRlbXBsYXRlXCI6IFwi44OG44Oz44OX44Os44O844OIXCIsXG4gICAgXCJNYW5nYVwiOiBcIua8q+eUu1wiLFxuICAgIFwiQmluZGluZyBwb2ludFwiOiBcIue2tOOBmOOCi+S9jee9rlwiLFxuICAgIFwiTGVmdCBiaW5kaW5nXCI6IFwi5bem57a044GY44CAXCIsXG4gICAgXCJSaWdodCBiaW5kaW5nXCI6IFwi5Y+z57a044GY44CAXCIsXG4gICAgXCJTdGFydCBwYWdlXCI6IFwi6ZaL5aeL44Oa44O844K4XCIsXG4gICAgXCJGcm9tIGxlZnRcIjogXCLlt6bjg5rjg7zjgrhcIixcbiAgICBcIkZyb20gcmlnaHRcIjogXCLlj7Pjg5rjg7zjgrhcIixcbiAgICBcIlBhZ2VzXCI6IFwi44Oa44O844K4XCIsXG4gICAgXCJBbGxcIjogXCLjgZnjgbnjgaZcIixcbiAgICBcIkN1cnJlbnQgcGFnZVwiOiBcIumBuOaKnuOBleOCjOOBn+ODmuODvOOCuFwiLFxuICAgIFwiUmFuZ2VcIjogXCLnr4Tlm7LmjIflrppcIixcbiAgICBcIlNjYWxlXCI6IFwi5ouh5aSnL+e4ruWwj1wiLFxuICAgIFwiQ3VzdG9tXCI6IFwi44Kr44K544K/44OgXCIsXG4gICAgXCJUZXh0IGNvbG9yXCI6IFwi44OG44Kt44K544OI44Gu6ImyXCIsXG4gICAgXCIxMDAlXCI6IFwiQjXllYbmpa3oqoznlKgoQjTjgrXjgqTjgrrljp/nqL/nlKjntJkvQTTku5XkuIrjgYzjgoopXCIsXG4gICAgXCI4MiVcIjogXCJBNeWQjOS6uuiqjOeUqChBNOOCteOCpOOCuuWOn+eov+eUqOe0mS9CNeS7leS4iuOBjOOCiilcIixcbiAgICBcIk5hbWUgY2hhbmdlciBjb21wYXRpYmxlXCI6IFwi44K544OI44O844Oq44O844Ko44OH44Kj44K/55So44ON44O844Og44OB44Kn44Oz44K444Oj44O85LqS5o+bXCIsXG5cbiAgICBcIkV4cG9ydCBDTElQIFNUVURJTyBTdG9yeWJvYXJkXCI6IFwiQ0xJUCBTVFVESU8g44ON44O844Og5pu444GN5Ye644GXXCIsXG4gICAgXCJFeHBvcnQgUERGXCI6IFwiUERG5pu444GN5Ye644GXXCIsXG4gICAgXCJJbXBvcnQgUGxhaW4gVGV4dFwiOiBcIuODhuOCreOCueODiOiqreOBv+i+vOOBv1wiLFxuICAgIFwiUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdFwiOiBcIuWIneacn+ioreWumuOBq+aIu+OBmVwiLFxuXG4gICAgXCJGaWxlIG5hbWVcIjogXCLjg5XjgqHjgqTjg6vlkI1cIixcbiAgICBcIkR1cGxpY2F0ZSBub3RlIG5hbWUuXCI6IFwi5ZCM44GY5ZCN5YmN44Gu44OO44O844OI44GM44GC44KK44G+44GZ44CCXCIsXG4gICAgXCJEdXBsaWNhdGUgZmlsZSBuYW1lLlwiOiBcIuWQjOOBmOWQjeWJjeOBruODleOCoeOCpOODq+OBjOOBguOCiuOBvuOBmeOAglwiLFxuICAgIFwiRmlsZSBub3QgZm91bmQuXCI6IFwi44OV44Kh44Kk44Or44GM6KaL44Gk44GL44KK44G+44Gb44KT44CCXCIsXG4gICAgXCJGaWxlIG9wZW4gZXJyb3IuXCI6IFwi44GT44Gu44OV44Kh44Kk44Or44Gv6ZaL44GR44G+44Gb44KT44CCXCIsXG4gICAgXCJTYXZlIGVycm9yLlwiOiBcIuOCu+ODvOODluOBp+OBjeOBvuOBm+OCk+OAglwiLFxuICAgIFwiU2VsZWN0IGZpbGUgdG8gaW1wb3J0XCI6IFwi6Kqt44G/6L6844KA44OV44Kh44Kk44Or44KS6YG45oqe44GX44Gm44GP44Gg44GV44GEXCIsXG4gICAgXCJDb21wcmVzc2luZ1wiOiBcIuWcp+e4ruS4rVwiLFxuICAgIFwiUmVuZGVyaW5nXCI6IFwi5L2c5oiQ5LitXCIsXG5cbiAgICBcIkZvcm1hdFwiOiBcIuODleOCqeODvOODnuODg+ODiFwiLFxuICAgIFwiTGluZSBzZXBhcmF0b3JcIjogXCLmlLnooYxcIixcbiAgICBcIkJhbGxvb24gc2VwYXJhdG9yXCI6IFwi5pS544K744Oq44OVXCIsXG4gICAgXCJQYWdlIHNlcGFyYXRvclwiOiBcIuaUueODmuODvOOCuFwiLFxuICAgIFwiQ29tbWVudCBrZXlcIjogXCLjgrPjg6Hjg7Pjg4hcIixcbiAgICBcIkNob29zZSBmaWxlLi4uXCI6IFwi44OV44Kh44Kk44Or44KS6YG45oqeLi4uXCIsXG4gICAgXG4gICAgXCJUcmlhbFwiOiBcIuippueUqOeJiFwiLFxuICAgIFwiV2VsY29tZSB0byB0aGUgdHJpYWwgdmVyc2lvbiBvZiBOYW1lbm90ZS5cXG5Zb3UgaGF2ZSBcIjogXCLjgYLjgahcIixcbiAgICBcIiBkYXkocykgbGVmdC5cIjogXCLml6XjgZDjgonjgYToqabnlKjjgafjgY3jgb7jgZnjgIJcXG7jgYLjgorjgYzjgajjgYbjgZTjgZbjgYTjgb7jgZnvvIFcIiwgXG4gICAgXCJXZSdyZSBzb3JyeSwgYnV0IHlvdXIgdHJpYWwgcGVyaW9kIGhhcyBleHBpcmVkLlwiOiBcIuippueUqOacn+mWk+e1guS6huOBl+OBvuOBl+OBn+OAglxcbuOBguOCiuOBjOOBqOOBhuOBlOOBluOBhOOBvuOBl+OBn++8gVwiLCBcblxuICAgIFwiWm9vbSBzbWFsbCB0ZXh0cyBvbiBpbnB1dFwiOiBcIuWwj+OBleOBhOODhuOCreOCueODiOOCkue3qOmbhuOBmeOCi+OBqOOBjeOBr+aLoeWkp+ihqOekuuOBmeOCi1wiLFxuICAgIFwiVXNlIFF1aWNrbGluZVwiIDogXCLplbfmirzjgZfjgafnm7Tnt5rjg4Tjg7zjg6vjgavliIfjgormm7/jgYjjgotcIixcbiAgICBcIkRpc2FibGUgd2ludGFiIGRyaXZlclwiOiBcIldpbnRhYuODieODqeOCpOODkOOCkuS9v+OCj+OBquOBhFwiLFxuICAgIFwiRGlzYWJsZSBtb3VzZSB3aGVlbCBzY3JvbGxcIjogXCLjg57jgqbjgrnjg5vjgqTjg7zjg6vjgafjgrnjgq/jg63jg7zjg6vjgZfjgarjgYRcIixcbiAgICBcIkNsaWNrIE9LIHRvIHJlc3RvcmUgZGVmYXVsdCBzZXR0aW5ncy5cIjogXCLjg4fjg5Xjgqnjg6vjg4jjga7oqK3lrprjgavmiLvjgZfjgb7jgZlcIixcbiAgICBcIlBlbiBwcmVzc3VyZVwiOiBcIuethuWcp1wiLFxuICAgIFwiT3V0cHV0XCI6IFwi5Ye65YqbXCIsXG4gICAgXG4gICAgXCJFbmFibGUgSmFwYW5lc2UgT3B0aW9uc1wiOiBcIuaXpeacrOiqnueUqOOBruOCquODl+OCt+ODp+ODs+OCkuacieWKueOBq+OBmeOCi1wiXG4gIH1cbn1cblxuZXhwb3J0cy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeVxuIl19
