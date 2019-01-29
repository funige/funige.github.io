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

window.PX = function (x) {
  return x + 'px';
};

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
          warn("openDialog '".concat(url, "'..."));

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
      this.preventScrollFreeze();
      this.scale = 1;
      var pageWidth = 1000;
      var pageHeight = 768;

      for (var j = 0; j < 10; j++) {
        for (var i = 0; i < 10; i++) {
          var page = document.createElement('div');
          page.style.width = PX(pageWidth);
          page.style.height = PX(pageHeight);
          page.style.backgroundColor = "white";
          page.style.outline = "1px solid rgba(0,0,0,0.3)";
          var x = i * (pageWidth + 50) + 50;
          var y = j * (pageHeight + 50) + 50;
          page.style.position = 'absolute';
          page.style.left = PX(x);
          page.style.top = PX(y);
          page.style.transformOrigin = "top left";
          page.style.transform = "scale(1.0)";
          var pageNumber = document.createElement('div');
          pageNumber.innerHTML = j * 10 + i + 1 + "ページ";
          pageNumber.style.fontSize = '12px'; // 11px以下は変わらない

          pageNumber.style.position = 'absolute';
          pageNumber.style.left = PX(pageWidth / 2);
          pageNumber.style.top = PX(pageHeight + 20);
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
        log(scrollTop, '->', e.currentTarget.scrollHeight, '-', e.target.offsetHeight, ':', $('#main')[0].offsetHeight);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9icm93c2VyLmVzNiIsImVzNi9jb21tYW5kLmVzNiIsImVzNi9jb25maWctZGVmYXVsdC5lczYiLCJlczYvY29uZmlnLmVzNiIsImVzNi9kaWFsb2cuZXM2IiwiZXM2L2RpdmlkZXIuZXM2IiwiZXM2L2hpc3RvcnktYnV0dG9uLmVzNiIsImVzNi9odG1sLWRyb3Bkb3duLmVzNiIsImVzNi9odG1sLW1lbnUuZXM2IiwiZXM2L2xvY2FsZS5lczYiLCJlczYvbWFpbi12aWV3LmVzNiIsImVzNi9tZW51LWJ1dHRvbi5lczYiLCJlczYvbWVudS10ZW1wbGF0ZS5lczYiLCJlczYvbWVudS5lczYiLCJlczYvbmFtZW5vdGUuZXM2IiwiZXM2L3BhZ2Utdmlldy5lczYiLCJlczYvcGFnZS5lczYiLCJlczYvcHJvamVjdC1tYW5hZ2VyLmVzNiIsImVzNi9wcm9qZWN0LmVzNiIsImVzNi9yZWNlbnQtdXJsLmVzNiIsImVzNi9zaG9ydGN1dC1kZWZhdWx0LmVzNiIsImVzNi9zaG9ydGN1dC5lczYiLCJlczYvc2lkZS1iYXItdGFiLmVzNiIsImVzNi9zaWRlLWJhci5lczYiLCJlczYvdGV4dC12aWV3LmVzNiIsImVzNi90aXRsZS5lczYiLCJlczYvdG9vbC1iYXIuZXM2IiwiZXM2L3Rvb2wtYnV0dG9uLmVzNiIsImVzNi91aS5lczYiLCJlczYvdmlldy1idXR0b24uZXM2IiwiZXM2L3ZpZXcuZXM2IiwiZXM2L3dpZGdldC5lczYiLCJqcy9saWIvZGljdGlvbmFyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRU0sVzs7O0FBQ0oseUJBQWM7QUFBQTs7QUFDWixTQUFLLEVBQUwsR0FBVSxjQUFWO0FBQ0EsU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNEOzs7O3lCQUVJLE8sRUFB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Qix3QkE4R0UsV0E5R0YsRUE4R2UsT0E5R2Ysd0JBK0dFLHNCQS9HRixFQStHMEIsZ0JBL0cxQix3QkFnSEUsc0JBaEhGLEVBZ0gwQixpQkFoSDFCLHdCQWlIRSxpQkFqSEYsRUFpSHFCLGVBakhyQix3QkFrSEUsa0JBbEhGLEVBa0hzQixlQWxIdEIsd0JBbUhFLGFBbkhGLEVBbUhpQixXQW5IakIsd0JBb0hFLHVCQXBIRixFQW9IMkIsbUJBcEgzQix3QkFxSEUsYUFySEYsRUFxSGlCLEtBckhqQix3QkFzSEUsV0F0SEYsRUFzSGUsS0F0SGYsd0JBd0hFLFFBeEhGLEVBd0hZLFFBeEhaLHdCQXlIRSxnQkF6SEYsRUF5SG9CLElBekhwQix3QkEwSEUsbUJBMUhGLEVBMEh1QixNQTFIdkIsd0JBMkhFLGdCQTNIRixFQTJIb0IsTUEzSHBCLHdCQTRIRSxhQTVIRixFQTRIaUIsTUE1SGpCLHdCQTZIRSxnQkE3SEYsRUE2SG9CLFlBN0hwQix3QkErSEUsT0EvSEYsRUErSFcsS0EvSFgsd0JBZ0lFLHNEQWhJRixFQWdJMEQsSUFoSTFELHdCQWlJRSxlQWpJRixFQWlJbUIsMEJBakluQix3QkFrSUUsaURBbElGLEVBa0lxRCwyQkFsSXJELHdCQW9JRSwyQkFwSUYsRUFvSStCLHVCQXBJL0Isd0JBcUlFLGVBcklGLEVBcUlvQixpQkFySXBCLHdCQXNJRSx1QkF0SUYsRUFzSTJCLGlCQXRJM0Isd0JBdUlFLDRCQXZJRixFQXVJZ0Msa0JBdkloQyx3QkF3SUUsdUNBeElGLEVBd0kyQyxlQXhJM0Msd0JBeUlFLGNBeklGLEVBeUlrQixJQXpJbEIsd0JBMElFLFFBMUlGLEVBMElZLElBMUlaLHdCQTRJRSx5QkE1SUYsRUE0STZCLGtCQTVJN0I7QUFEaUIsQ0FBbkI7QUFpSkEsT0FBTyxDQUFDLFVBQVIsR0FBcUIsVUFBckIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcblxuY2xhc3MgQWJvdXREaWFsb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlkID0gJ2Fib3V0LWRpYWxvZydcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsXG4gIH1cblxuICBpbml0KHZlcnNpb24pIHtcbiAgICAkKCcjYWJvdXQtZGlhbG9nJykuZGlhbG9nKHtcbiAgICAgIGF1dG9PcGVuOiB0cnVlLFxuICAgICAgcG9zaXRpb246IHsgbXk6J2NlbnRlciBib3R0b20nLCBhdDonY2VudGVyIGNlbnRlcicgfSxcbiAgICAgIHRpdGxlOiBUKCdBYm91dCBOYW1lbm90ZScpLFxuICAgICAgbW9kYWw6IHRydWUsXG4gICAgICB3aWR0aDogNjAwLFxuICAgICAgYnV0dG9uczogeyBPazogdGhpcy5vayB9LFxuICAgIH0pXG5cbiAgICBjb25zdCBzdHJpbmcgPSBsb2NhbGUudHJhbnNsYXRlSFRNTChgXG4gICAgPGNlbnRlcj5cbiAgICAgIDxpbWcgc3JjPScuL2ltZy9uYW1lbm90ZTEwMjQucG5nJyB3aWR0aD1cIjEwMHB4XCIgLz5cbiAgICAgIDxicj5cbiAgICAgIE5hbWVub3RlIHYke25hbWVub3RlLnZlcnNpb259XG4gICAgICA8YnI+PGJyPlxuICAgICAgPHNtYWxsPkNvcHlyaWdodCAoYykgRnVuaWdlPC9zbWFsbD48L2NlbnRlcj5gXG4gICAgKVxuICAgIFxuICAgICQoJyNhYm91dC1kaWFsb2cnKS5odG1sKHN0cmluZylcbiAgfVxuXG4gIG9rKCkge1xuICAgIGRpYWxvZy5jbG9zZSgpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgYWJvdXREaWFsb2cgPSBuZXcgQWJvdXREaWFsb2coKVxuXG5leHBvcnQgeyBhYm91dERpYWxvZyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcblxuXG53aW5kb3cubmFtZW5vdGUgPSBuYW1lbm90ZVxud2luZG93LlQgPSBsb2NhbGUudHJhbnNsYXRlXG53aW5kb3cuUFggPSAoeCkgPT4geCArICdweCdcblxud2luZG93LmxvZyA9IGNvbnNvbGUubG9nLmJpbmQod2luZG93LmNvbnNvbGUpXG53aW5kb3cud2FybiA9IGNvbnNvbGUud2Fybi5iaW5kKHdpbmRvdy5jb25zb2xlKVxud2luZG93LmVycm9yID0gY29uc29sZS5lcnJvci5iaW5kKHdpbmRvdy5jb25zb2xlKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xuICBuYW1lbm90ZS5pbml0KClcbn0pXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5pbXBvcnQgeyBhYm91dERpYWxvZyB9IGZyb20gJy4vYWJvdXQtZGlhbG9nLmVzNidcbmltcG9ydCB7IGRpdmlkZXIgfSBmcm9tICcuL2RpdmlkZXIuZXM2J1xuaW1wb3J0IHsgdG9vbEJ1dHRvbiB9IGZyb20gJy4vdG9vbC1idXR0b24uZXM2J1xuaW1wb3J0IHsgc2lkZUJhclRhYiB9IGZyb20gJy4vc2lkZS1iYXItdGFiLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5jb25zdCBfcnVuTWFpbiA9IChtZXNzYWdlLCBkYXRhKSA9PiB7XG4gIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICBsb2coJ3J1bk1haW4nLCBtZXNzYWdlLCBkYXRhKVxuICAgIG5hbWVub3RlLmFwcC5ydW5NYWluKG1lc3NhZ2UsIGRhdGEpXG5cbiAgfSBlbHNlIHtcbiAgICBsb2coYCR7bWVzc2FnZX06IGNhblxcYHQgZXhlY3V0ZSB0aGlzIGNvbW1hbmQgb24gYnJvd3Nlci5gKVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgdW5kbygpIHtcbiAgICBsb2coJ3VuZG8nKVxuICB9XG5cbiAgcmVkbygpIHtcbiAgICBsb2coJ3JlZG8nKVxuICB9XG5cbiAgYWJvdXQoKSB7XG4gICAgZGlhbG9nLm9wZW4oYWJvdXREaWFsb2cpXG4gIH1cblxuICBwZW4oZSkge1xuICAgIGxvZygncGVuJylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgncGVuJylcbiAgfVxuXG4gIGVyYXNlcihlKSB7XG4gICAgbG9nKCdlcmFzZXInKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCdlcmFzZXInKVxuICB9XG5cbiAgdGV4dChlKSB7XG4gICAgbG9nKCd0ZXh0JylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgndGV4dCcpXG4gIH1cblxuICBzaWRlQmFyKCkge1xuICAgIGxvZygnc2lkZUJhcicpXG4gICAgZGl2aWRlci50b2dnbGUoKVxuICB9XG5cbiAgc2hvd1BhZ2VWaWV3KCkge1xuICAgICQoJy5wYWdlLXZpZXcnKS5zaG93KClcbiAgICAkKCcudGV4dC12aWV3JykuaGlkZSgpXG4gICAgc2lkZUJhclRhYi5zZWxlY3QoJ3BhZ2UnKVxuICB9XG5cbiAgc2hvd1RleHRWaWV3KCkge1xuICAgICQoJy5wYWdlLXZpZXcnKS5oaWRlKClcbiAgICAkKCcudGV4dC12aWV3Jykuc2hvdygpXG4gICAgc2lkZUJhclRhYi5zZWxlY3QoJ3RleHQnKVxuICB9XG4gIFxuICBvcGVuRGlhbG9nKCkge1xuICAgIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICAgIG5hbWVub3RlLmFwcC5vcGVuRGlhbG9nKCkudGhlbigodXJsKSA9PiB7XG4gICAgICAgIHdhcm4oYG9wZW5EaWFsb2cgJyR7dXJsfScuLi5gKVxuICAgICAgICBwcm9qZWN0TWFuYWdlci5vcGVuKHVybClcblxuICAgICAgfSkudGhlbigocHJvamVjdCkgPT4ge1xuICAgICAgICAvL3dhcm4oJ3Byb2plY3Q9JywgcHJvamVjdClcbiAgICAgICAgXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgbmFtZW5vdGUuYXBwLnNob3dNZXNzYWdlQm94KHtcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvclxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgb3Blbih1cmwpIHtcbiAgICBsb2coJ29wZW4uLi4nKVxuICAgIHByb2plY3RNYW5hZ2VyLm9wZW4odXJsKVxuICB9XG5cbiAgb3Blbk5ld0RpYWxvZygpIHtcbiAgICB3YXJuKCdvcGVuIG5ldyBkaWFsb2cuLicpXG4gIH1cbiAgXG4gIGNsb3NlKCkge1xuICAgIHByb2plY3RNYW5hZ2VyLmNsb3NlKClcbiAgfVxuXG4gIHpvb20oKSB7XG4gICAgbG9nKCd6b29tJylcbiAgfVxuXG4gIHVuem9vbSgpIHtcbiAgICBsb2coJ3Vuem9vbScpXG4gIH1cblxuICBkb2NrTGVmdCgpIHtcbiAgICBkaXZpZGVyLnNldFBvc2l0aW9uKCdsZWZ0JylcbiAgfVxuXG4gIGRvY2tSaWdodCgpIHtcbiAgICBkaXZpZGVyLnNldFBvc2l0aW9uKCdyaWdodCcpXG4gIH1cblxuICBcbiAgdG9nZ2xlRWRpdE1vZGUoKSB7fVxuICBcbiAgLy8vLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBkbyhpdGVtLCBkYXRhKSB7XG4gICAgaWYgKHRoaXNbaXRlbV0pIHtcbiAgICAgIHRoaXNbaXRlbV0oZGF0YSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGRldmVsb3BlclRvb2xzKCkge1xuICAgIF9ydW5NYWluKCdkZXZlbG9wZXJUb29scycpXG4gIH1cbiAgXG4gIGZ1bGxTY3JlZW4oKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgX3J1bk1haW4oJ2Z1bGxTY3JlZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuICBcbiAgcXVpdCgpIHtcbiAgICBfcnVuTWFpbigncXVpdCcpXG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgbG9jYXRpb24ucmVsb2FkKClcbiAgfVxufVxuXG5jb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmQoKVxuXG5leHBvcnQgeyBjb21tYW5kIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjb25maWdEZWZhdWx0ID0ge1xuICB0b29sQmFyOiB0cnVlLFxuICBzaWRlQmFyOiBmYWxzZSxcbiAgc2lkZUJhcldpZHRoOiAyMDAsXG4gIHNpZGVCYXJQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgXG4gIGRlZmF1bHRQYXRoOiBudWxsLFxuICBkZWZhdWx0TmFtZTogbnVsbCxcbiAgZGVmYXVsdEF1dGhvcjogbnVsbCxcbn1cblxuXG5leHBvcnQgeyBjb25maWdEZWZhdWx0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWdEZWZhdWx0IH0gZnJvbSAnLi9jb25maWctZGVmYXVsdC5lczYnXG5cbmNsYXNzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YSA9IFtdXG4gIH1cblxuICBsb2FkKCkge1xuICAgIGNvbnN0IGpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZW5vdGUvY29uZmlnJylcbiAgICB0aGlzLmRhdGEgPSAoanNvbikgPyBKU09OLnBhcnNlKGpzb24pIDogJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZ0RlZmF1bHQpXG4gIH1cblxuICBzYXZlKCkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWVub3RlL2NvbmZpZycsIGpzb24pXG4gIH1cblxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnRGVmYXVsdClcbiAgICB0aGlzLnNhdmUoKVxuICB9XG5cbiAgZ2V0VmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAodGhpcy5kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldXG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBjb25maWcgPSBuZXcgQ29uZmlnKClcblxuZXhwb3J0IHsgY29uZmlnIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBEaWFsb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cblxuICBpbml0KCkge1xuICB9XG4gIFxuICBpc09wZW4oKSB7XG4gICAgZm9yIChjb25zdCB3aWRnZXQgb2YgJCgnLnVpLWRpYWxvZy1jb250ZW50JykpIHtcbiAgICAgIGlmICgkKHdpZGdldCkuZGlhbG9nKCdpc09wZW4nKSkge1xuXHRyZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBcbiAgb3Blbih3aWRnZXQpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50KSB0aGlzLmNsb3NlKClcbiAgICB0aGlzLmN1cnJlbnQgPSB3aWRnZXRcbiAgICBcbiAgICBpZiAoIXdpZGdldC5lbGVtZW50KSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGVsZW1lbnQuaWQgPSB3aWRnZXQuaWRcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2RpYWxvZydcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gJzAnO1xuICAgICAgJCgnYm9keScpWzBdLmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgICB3aWRnZXQuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB9XG4gICAgd2lkZ2V0LmluaXQoKVxuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgY29uc3Qgd2lkZ2V0ID0gdGhpcy5jdXJyZW50XG4gICAgY29uc3QgZWxlbWVudCA9IHdpZGdldC5lbGVtZW50XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICQoJyMnICsgd2lkZ2V0LmlkKS5kaWFsb2coJ2Nsb3NlJylcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KVxuICAgIH1cbiAgICB3aWRnZXQuZWxlbWVudCA9IG51bGxcbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cbn1cblxuY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZygpXG5cbmV4cG9ydCB7IGRpYWxvZyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuaW1wb3J0IHsgdmlld0J1dHRvbiB9IGZyb20gJy4vdmlldy1idXR0b24uZXM2J1xuXG5sZXQgbWluV2lkdGggPSAxODBcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBEaXZpZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgICQoJy5zcGxpdC1wYW5lJykuc3BsaXRQYW5lKClcbiAgICAkKCcuc3BsaXQtcGFuZScpLm9uKCdkaXZpZGVyZHJhZ2VuZCcsIChlKSA9PiB7IC8vIG9yICdzcGxpdHBhbmVyZXNpemUnXG4gICAgICB0aGlzLm9uRGl2aWRlckRyYWdFbmQoKVxuICAgIH0pXG4gICAgdGhpcy5zZXRQb3NpdGlvbigpXG4gIH1cblxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBsb2coJ1t1cGRhdGVdJylcbiAgICBcbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB2YWx1ZSA9IGNvbmZpZy5kYXRhLnNpZGVCYXJcbiAgICBjb25maWcuZGF0YS5zaWRlQmFyID0gdmFsdWVcbiAgICBjb25maWcuc2F2ZSgpXG5cbiAgICBsZXQgd2lkdGggPSAodmFsdWUpID8gY29uZmlnLmRhdGEuc2lkZUJhcldpZHRoIDogMFxuICAgIGlmIChjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb24gPT0gJ3JpZ2h0Jykge1xuICAgICAgd2lkdGggPSAkKCcuc3BsaXQtcGFuZScpLndpZHRoKCkgLSB3aWR0aCArIDFcbiAgICB9XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gJCgnLnNwbGl0LXBhbmUnKS53aWR0aCgpIC0gbWluV2lkdGggLSAxXG4gICAgICBpZiAod2lkdGggPCBtaW5XaWR0aCkgd2lkdGggPSBtaW5XaWR0aFxuICAgICAgaWYgKHdpZHRoID4gbWF4V2lkdGgpIHdpZHRoID0gbWF4V2lkdGhcbiAgICB9XG5cbiAgICAkKCcuc3BsaXQtcGFuZScpLnNwbGl0UGFuZSgnZmlyc3RDb21wb25lbnRTaXplJywgd2lkdGgpXG4gICAgdmlld0J1dHRvbi51cGRhdGUoKVxuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudXBkYXRlKCFjb25maWcuZGF0YS5zaWRlQmFyKVxuICB9XG5cbiAgc2V0UG9zaXRpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB2YWx1ZSA9IGNvbmZpZy5kYXRhLnNpZGVCYXJQb3NpdGlvblxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXJQb3NpdGlvbiA9IHZhbHVlXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgY29uc3QgbWFpblZpZXcgPSAkKCcubWFpbi12aWV3JylcbiAgICBjb25zdCBzaWRlQmFyID0gJCgnLnNpZGViYXInKVxuXG4gICAgaWYgKHZhbHVlID09ICdsZWZ0Jykge1xuICAgICAgJCgnI2xlZnQtY29tcG9uZW50JykuYXBwZW5kKHNpZGVCYXIpXG4gICAgICAkKCcjcmlnaHQtY29tcG9uZW50JykuYXBwZW5kKG1haW5WaWV3KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNyaWdodC1jb21wb25lbnQnKS5hcHBlbmQoc2lkZUJhcilcbiAgICAgICQoJyNsZWZ0LWNvbXBvbmVudCcpLmFwcGVuZChtYWluVmlldylcbiAgICB9XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG4gIFxuICBvbkRpdmlkZXJEcmFnRW5kKCkge1xuICAgIGxvZyhcIltkaXZpZGVyIGRyYWcgZW5kXVwiKVxuICAgIGxldCB3aWR0aCA9ICQoJy5zaWRlYmFyJykud2lkdGgoKVxuXG4gICAgY29uc3QgbWF4V2lkdGggPSAkKCcuc3BsaXQtcGFuZScpLndpZHRoKCkgLSBtaW5XaWR0aCAtIDFcbiAgICBpZiAod2lkdGggPCBtaW5XaWR0aCkgd2lkdGggPSBtaW5XaWR0aFxuICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG5cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyV2lkdGggPSBwYXJzZUludCh3aWR0aClcbiAgICBjb25maWcuZGF0YS5zaWRlQmFyID0gdHJ1ZVxuICAgIGNvbmZpZy5zYXZlKClcbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3QgZGl2aWRlciA9IG5ldyBEaXZpZGVyKClcblxuZXhwb3J0IHsgZGl2aWRlciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcblxubGV0IHVuZG9CdXR0b25cbmxldCByZWRvQnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSGlzdG9yeUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB1bmRvQnV0dG9uID0gJCgnI3VuZG8tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3VuZG8tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb21tYW5kLnVuZG8oKVxuICAgICAgfVxuICAgIH0pWzBdXG5cbiAgICByZWRvQnV0dG9uID0gJCgnI3JlZG8tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3JlZG8tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb21tYW5kLnJlZG8oKVxuICAgICAgfVxuICAgIH0pWzBdXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBcbiAgICBpZiAocHJvamVjdCkge1xuICAgICAgY29uc3QgaGFzVW5kbyA9IChwcm9qZWN0KSA/IHByb2plY3QuaGlzdG9yeS5oYXNVbmRvKCkgOiBmYWxzZVxuICAgICAgY29uc3QgaGFzUmVkbyA9IChwcm9qZWN0KSA/IHByb2plY3QuaGlzdG9yeS5oYXNSZWRvKCkgOiBmYWxzZVxuICAgICAgJCh1bmRvQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhaGFzVW5kbylcbiAgICAgICQocmVkb0J1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIWhhc1JlZG8pXG5cbi8vICAgIE1lbnUudXBkYXRlSGlzdG9yeSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhpc3RvcnlCdXR0b24gPSBuZXcgSGlzdG9yeUJ1dHRvbigpXG5cbmV4cG9ydCB7IGhpc3RvcnlCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSFRNTERyb3Bkb3duIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG5cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgbG9nKCdvcGVuJywgZWxlbWVudClcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIH1cblxuICBjbG9zZShlbGVtZW50KSB7XG4gICAgbG9nKCdjbG9zZScpXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgXG4gIG1ha2UodGVtcGxhdGUsIGlkKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tY29udGVudCdcbiAgICBjb250ZW50LmlkID0gaWQgKyAnLWRyb3Bkb3duJ1xuICAgIFxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFske2lkfV1gXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxufVxuXG5jb25zdCBodG1sRHJvcGRvd24gPSBuZXcgSFRNTERyb3Bkb3duKClcblxuZXhwb3J0IHsgaHRtbERyb3Bkb3duIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSBhcyBuYXRpdmVNZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxubGV0IGJ1dHRvbnMgPSB7fVxubGV0IHRpbWVycyA9IHt9XG5sZXQgYmx1ckRlbGF5ID0gNTAwXG5cbmNvbnN0IGFkZEl0ZW1zID0gKG5vZGUsIGl0ZW1zKSA9PiB7XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGlmIChpdGVtLmxhYmVsKSB7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gYXBwZW5kS2V5KFQoaXRlbS5sYWJlbCksIGl0ZW0uYWNjZWxlcmF0b3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSAnLSdcbiAgICB9XG4gICAgbGkuYXBwZW5kQ2hpbGQoYXBwZW5kQXR0cmlidXRlKGRpdiwgaXRlbS5sYWJlbCwgaXRlbS5jbGljaykpXG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgYWRkSXRlbXMobGksIGl0ZW0uc3VibWVudSkgXG4gICAgfVxuXG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh1bClcbiAgfVxufVxuXG5jb25zdCBhcHBlbmRBdHRyaWJ1dGUgPSAoZGl2LCBkYXRhLCBjbGljaykgPT4ge1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBwLmlubmVySFRNTCA9IGRhdGFcbiAgICBwLnRpdGxlID0gY2xpY2sgfHwgJydcbiAgICBwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBkaXYuYXBwZW5kQ2hpbGQocClcbiAgfVxuICByZXR1cm4gZGl2XG59XG5cbmNvbnN0IGFwcGVuZEtleSA9IChzdHJpbmcsIGtleSwgY2hlY2spID0+IHtcbiAgY2hlY2sgPSAoY2hlY2spID8gJyYjeDI3MTQ7JyA6ICcnXG4gIGtleSA9IGNvbnZlcnRLZXkoa2V5KSB8fCAnJm5ic3A7JyBcblxuICBjb25zdCByZXN1bHQgPSBgXG4gICAgPGRpdiBjbGFzcz0nY2hlY2snPiR7Y2hlY2t9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz0nbGFiZWwnPiR7c3RyaW5nfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9J2tleSc+JHtrZXl9PC9kaXY+YFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGNvbnZlcnRLZXkgPSAoa2V5KSA9PiB7XG4gIGlmIChrZXkpIHtcbiAgICBpZiAoIW5hbWVub3RlLmlzTWFjKCkpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignQ29tbWFuZCtDdHJsK0YnKSA+PSAwKSByZXR1cm4gJydcbiAgICAgIFxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwsLywgJ1NoaWZ0K0NvbW1hJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLi8sICdTaGlmdCtQZXJpb2QnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NtZE9yQ3RybFxcKy8sICdDdHJsKycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0FsdFxcKy8sICdDdHJsK0FsdCsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJz8/PysnKVxuICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKClcblxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXCwvLCAnPCcpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXC4vLCAnPicpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ21kT3JDdHJsXFwrLywgJyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtBbHRcXCsvLCAnJiM4OTk3OyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJyYjODk2MzsmIzg5ODQ7JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcKy8sICcmIzg2Nzk7JylcbiAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIVE1MTWVudSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBcbiAgbWFrZSh0ZW1wbGF0ZSwgaWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1jb250ZW50J1xuICAgIGNvbnRlbnQuaWQgPSBpZCArICctZHJvcGRvd24nXG5cbiAgICBhZGRJdGVtcyhjb250ZW50LCB0ZW1wbGF0ZSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoY29udGVudC5jaGlsZE5vZGVzWzBdLCBpZClcbiAgICB9LCAxKVxuICAgXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxuXG4gIGFjdGl2YXRlKG1lbnUsIGlkKSB7XG4gICAgbWVudS5pZCA9IGlkICsgJy1tZW51J1xuICAgIGJ1dHRvbnNbaWRdID0gJCgnIycgKyBpZCArICctbWVudS1idXR0b24nKVxuICAgIHRpbWVyc1tpZF0gPSBudWxsXG5cbiAgICAkKG1lbnUpLm1lbnUoe1xuICAgICAgc2VsZWN0OiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0KGV2ZW50LCB1aSkpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKG1lbnUsIGlkKVxuICAgICAgICAgIGJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIH0pXG5cbiAgICAkKG1lbnUpLm9uKCdtZW51Zm9jdXMnLCAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJzW2lkXSlcbiAgICB9KVxuICAgIFxuICAgICQobWVudSkub24oJ21lbnVibHVyJywgKCkgPT4ge1xuICAgICAgaWYgKCFidXR0b25zW2lkXS5pbWFnZUJ1dHRvbignbG9ja2VkJykpIHJldHVyblxuICAgICAgdGltZXJzW2lkXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxhcHNlKG1lbnUsIGlkKVxuICAgICAgfSwgYmx1ckRlbGF5KVxuICAgIH0pXG4gIH1cblxuICBjb2xsYXBzZShtZW51LCBpZCkge1xuICAgICQobWVudSkubWVudSgnY29sbGFwc2VBbGwnLCBudWxsLCB0cnVlKVxuICAgIG1lbnUucGFyZW50Tm9kZS5zdHlsZS5vcGFjaXR5ID0gJzAuMDEnXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKG1lbnUucGFyZW50Tm9kZSlcbiAgICAgIGJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICB9LCA1MDApXG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy9cblxuICB1cGRhdGUoZWxlbWVudCkge1xuICAgIGNvbnN0IG1lbnUgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF1cbiAgICBjb25zdCBpZCA9IGVsZW1lbnQuaWQucmVwbGFjZSgvLS4qJC8sICcnKVxuLy8gIHdhcm4oJ1todG1sIG1lbnUgdXBkYXRlXScsIGlkKVxuXG4gICAgaWYgKGlkID09ICdmaWxlJykge1xuICAgICAgdGhpcy51cGRhdGVSZWNlbnRzKG1lbnUpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlU3RhdGVzKG1lbnUpXG4gICAgJChtZW51KS5tZW51KCdyZWZyZXNoJylcbiAgfVxuXG4gIGlzU2VwYXJhdG9yKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKGl0ZW0uY2hpbGROb2Rlc1swXSAmJiBpdGVtLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MICE9ICctJykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBcbiAgdXBkYXRlUmVjZW50cyhtZW51KSB7XG4gICAgd2hpbGUgKCF0aGlzLmlzU2VwYXJhdG9yKG1lbnUuY2hpbGROb2Rlc1syXSkpIHtcbiAgICAgIG1lbnUucmVtb3ZlQ2hpbGQobWVudS5jaGlsZE5vZGVzWzJdKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNlbnRVUkwuZGF0YSkge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInVpLWljb24gdWktaWNvbi1ub3RlXCI+PC9zcGFuPicgKyBpdGVtXG4gICAgICBsaS5hcHBlbmRDaGlsZChhcHBlbmRBdHRyaWJ1dGUoZGl2LCBpdGVtLCAnb3BlbicpKVxuICAgICAgZGYuYXBwZW5kQ2hpbGQobGkpXG4gICAgfVxuICAgIC8vICBtZW51LmFwcGVuZENoaWxkKGRmKVxuICAgIG1lbnUuaW5zZXJ0QmVmb3JlKGRmLCBtZW51LmNoaWxkTm9kZXNbMl0pXG4gIH1cblxuICB1cGRhdGVTdGF0ZXMobWVudSkge1xuICAgIGNvbnN0IGl0ZW1zID0gJChtZW51KS5maW5kKCdsaScpXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBjb25zdCBuYW1lID0gJChpdGVtKS5maW5kKCdwJylcbiAgICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBuYW1lWzBdLmlubmVySFRNTFxuICAgICAgICBjb25zdCBzdGF0ZSA9IG5hdGl2ZU1lbnUuZ2V0U3RhdGUobGFiZWwpXG4gICAgICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXN0YXRlLWRpc2FibGVkJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd1aS1zdGF0ZS1kaXNhYmxlZCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBzZWxlY3QoZXZlbnQsIHVpKSB7XG4gICAgY29uc3QgcCA9IHVpLml0ZW1bMF0gJiYgdWkuaXRlbVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpWzBdXG4gICAgaWYgKHApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBwLmlubmVySFRNTFxuICAgICAgY29uc3QgY2xpY2sgPSBwLnRpdGxlXG5cbiAgICAgIGlmIChjbGljaykge1xuICAgICAgICBlcnJvcihgJHtjbGlja31gLCBgJHtkYXRhfWApXG4gICAgICAgIGNvbW1hbmQuZG8oYCR7Y2xpY2t9YCwgYCR7ZGF0YX1gKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBodG1sTWVudSA9IG5ldyBIVE1MTWVudSgpXG5cbmV4cG9ydCB7IGh0bWxNZW51IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIExvY2FsZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGRpY3Rpb25hcnkgPSByZXF1aXJlKCcuLi9qcy9saWIvZGljdGlvbmFyeS5qcycpLmRpY3Rpb25hcnlcbiAgICBcbiAgICBmb3IgKGxldCBrZXkgaW4gZGljdGlvbmFyeSkge1xuICAgICAgaWYgKG5hdmlnYXRvci5sYW5ndWFnZS5pbmRleE9mKGtleSkgPT0gMCAmJiBkaWN0aW9uYXJ5W2tleV0pIHtcbiAgICAgICAgY29uc3QgZGljdCA9IGRpY3Rpb25hcnlba2V5XVxuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IChzdHJpbmcpID0+IHtcbiAgICAgICAgICByZXR1cm4gZGljdFtzdHJpbmddIHx8IHN0cmluZ1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJhbnNsYXRlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmdcbiAgfVxuICBcbiAgdHJhbnNsYXRlSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvVFxcKCguKj8pXFwpL2csIChhbGwsIG1hdGNoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUobWF0Y2gpXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBsb2NhbGUgPSBuZXcgTG9jYWxlKClcblxuZXhwb3J0IHsgbG9jYWxlIH1cblxuXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcuZXM2J1xuXG4vLyAkKCcubWFpbi12aWV3JylbMF0ucGFyZW50Tm9kZS5zY3JvbGxUb3AgPSAuLi5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBNYWluVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZWxlbWVudCA9ICQoJy5tYWluLXZpZXcnKVswXVxuICAgIHRoaXMucHJldmVudFNjcm9sbEZyZWV6ZSgpXG4gICAgdGhpcy5zY2FsZSA9IDFcblxuICAgIGNvbnN0IHBhZ2VXaWR0aCA9IDEwMDBcbiAgICBjb25zdCBwYWdlSGVpZ2h0ID0gNzY4XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcGFnZS5zdHlsZS53aWR0aCA9IFBYKHBhZ2VXaWR0aClcbiAgICAgICAgcGFnZS5zdHlsZS5oZWlnaHQgPSBQWChwYWdlSGVpZ2h0KVxuICAgICAgICBwYWdlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIlxuICAgICAgICBwYWdlLnN0eWxlLm91dGxpbmUgPSBcIjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMylcIlxuXG4gICAgICAgIGNvbnN0IHggPSBpICogKHBhZ2VXaWR0aCArIDUwKSArIDUwXG4gICAgICAgIGNvbnN0IHkgPSBqICogKHBhZ2VIZWlnaHQgKyA1MCkgKyA1MFxuICAgICAgICBwYWdlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBwYWdlLnN0eWxlLmxlZnQgPSBQWCh4KVxuICAgICAgICBwYWdlLnN0eWxlLnRvcCA9IFBYKHkpXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJ0b3AgbGVmdFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjApXCJcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBwYWdlTnVtYmVyLmlubmVySFRNTCA9IChqICogMTAgKyBpICsgMSkgKyBcIuODmuODvOOCuFwiXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUuZm9udFNpemUgPSAnMTJweCcgLy8gMTFweOS7peS4i+OBr+WkieOCj+OCieOBquOBhFxuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLmxlZnQgPSBQWChwYWdlV2lkdGggLyAyKVxuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnRvcCA9IFBYKHBhZ2VIZWlnaHQgKyAyMClcblxuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKHBhZ2VOdW1iZXIpXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYWdlKVxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG4gIFxuICBzZXRQcm9qZWN0KHByb2plY3QpIHtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICB9IGVsc2Uge1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3QgbWFpblZpZXcgPSBuZXcgTWFpblZpZXcoKVxuXG5leHBvcnQgeyBtYWluVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmltcG9ydCB7IGZpbGVNZW51VGVtcGxhdGUsXG4gICAgICAgICBvdGhlck1lbnVUZW1wbGF0ZSxcbiAgICAgICAgIHNpZGViYXJNZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuXG5sZXQgZmlsZUJ1dHRvblxubGV0IG90aGVyQnV0dG9uXG5sZXQgc2lkZWJhckJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnVCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBmaWxlQnV0dG9uID0gJCgnI2ZpbGUtbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZmlsZS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKGZpbGVNZW51VGVtcGxhdGUsICdmaWxlJylcbiAgICB9KVswXVxuLypcbiAgICBvdGhlckJ1dHRvbiA9ICQoJyNvdGhlci1tZW51LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9tZW51LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKG90aGVyTWVudVRlbXBsYXRlLCAnb3RoZXInKVxuICAgIH0pWzBdXG4qL1xuICAgIHNpZGViYXJCdXR0b24gPSAkKCcjc2lkZWJhci1tZW51LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9tZW51LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKHNpZGViYXJNZW51VGVtcGxhdGUsICdzaWRlYmFyJyksXG4gICAgICBjb250ZW50UGFyZW50OiAkKCdib2R5JylbMF1cbiAgICB9KVswXVxuXG4gICAgdGhpcy5idXR0b25zLnB1c2goZmlsZUJ1dHRvbiwgc2lkZWJhckJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuICBcbiAgc2VsZWN0KGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ2ltZy1idXR0b24nKSA8IDApIHJldHVyblxuICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJylcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gJChidXR0b24pLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpXG4gICAgICBjb25zdCBkcm9wZG93biA9IGluc3RhbmNlLm9wdGlvbnMuY29udGVudFxuICAgICAgXG4gICAgICBpZiAoYnV0dG9uICYmIGJ1dHRvbi5pZCA9PSBlLnRhcmdldC5pZCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgIGh0bWxNZW51LnVwZGF0ZShkcm9wZG93bilcbiAgICAgICAgICBcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgICAgaWYgKGluc3RhbmNlLm9wdGlvbnMuY29udGVudFBhcmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudXBkYXRlQ29udGVudFBvc2l0aW9uKClcbiAgICAgICAgICB9XG4gICAgICAgICAgaHRtbE1lbnUub3Blbihkcm9wZG93bilcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgICAgaHRtbE1lbnUuY2xvc2UoZHJvcGRvd24pXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgICAgaHRtbE1lbnUuY2xvc2UoZHJvcGRvd24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgbWVudUJ1dHRvbiA9IG5ldyBNZW51QnV0dG9uKClcblxuZXhwb3J0IHsgbWVudUJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgbWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmFtZW5vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBYm91dCBOYW1lbm90ZSAuLi4nLCBjbGljazogJ2Fib3V0JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1NldHRpbmdzIC4uLicsIGNsaWNrOiAnc2V0dGluZ3MnIH0sXG4gICAgICB7IGxhYmVsOiAnVGFibGV0IFNldHRpbmdzIC4uLicsIGNsaWNrOiAndGFibGV0U2V0dGluZ3MnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUXVpdCBOYW1lbm90ZScsIGNsaWNrOiAncXVpdCcgfSxcbiAgICAgIFxuLy8gICAgeyBsYWJlbDogJ1NldHRpbmdzJyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdCcsIGNsaWNrOiAncmVzZXRTZXR0aW5ncycgfSxcbi8vXHRdLFxuLy8gICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnTm90ZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ05ldyAuLi4nLCBjbGljazogJ29wZW5OZXdEaWFsb2cnIH0sXG4gICAgICB7IGxhYmVsOiAnT3BlbiAuLi4nLCBjbGljazogJ29wZW5EaWFsb2cnIH0sXG4gICAgICB7IGxhYmVsOiAnT3BlbiBSZWNlbnQnLCBzdWJtZW51OiBbXSB9LFxuXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnQ2xvc2UnLCBjbGljazogJ2Nsb3NlJyB9LFxuLy8gICAgeyBsYWJlbDogJ0Nsb3NlIEFsbCcsIGNsaWNrOiAnY2xvc2VBbGwnIH0sXG5cdFxuLy8gICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuLy8gICAgeyBsYWJlbDogJ05vdGUgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdub3RlU2V0dGluZ3MnIH0sXG5cbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGNsaWNrOiAnc25hcHNob3QnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiBcIkVkaXRcIixcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiBcIlVuZG9cIiwgc2VsZWN0b3I6IFwidW5kbzpcIiwgY2xpY2s6ICd1bmRvJyB9LFxuICAgICAgeyBsYWJlbDogXCJSZWRvXCIsIHNlbGVjdG9yOiBcInJlZG86XCIsIGNsaWNrOiAncmVkbycgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogXCJDdXRcIiwgc2VsZWN0b3I6IFwiY3V0OlwiIH0sXG4gICAgICB7IGxhYmVsOiBcIkNvcHlcIiwgc2VsZWN0b3I6IFwiY29weTpcIiB9LFxuICAgICAgeyBsYWJlbDogXCJQYXN0ZVwiLCBzZWxlY3RvcjogXCJwYXN0ZTpcIiB9LFxuXG4gICAgICB7IGxhYmVsOiBcIlNlbGVjdCBBbGxcIiwgc2VsZWN0b3I6IFwic2VsZWN0QWxsOlwiLCBjbGljazogJ3NlbGVjdEFsbCcgfSxcbiAgICBdXG4gIH0sXG4gIHsgbGFiZWw6ICdQYWdlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQWRkJywgY2xpY2s6ICdhcHBlbmRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgRm9yd2FyZCcsIGNsaWNrOiAnbW92ZVBhZ2VGb3J3YXJkJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgQmFja3dhcmQnLCBjbGljazogJ21vdmVQYWdlQmFja3dhcmQnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIHRvIEJ1ZmZlcicsIGNsaWNrOiAnY3V0UGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGNsaWNrOiAncGFzdGVQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ0VtcHR5IEJ1ZmZlcicsIGNsaWNrOiAnZW1wdHlQYWdlJyB9LFxuLy8gICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4vLyAgICB7IGxhYmVsOiAnRmxpcCcsIGNsaWNrOiAnZmxpcFBhZ2UnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdFeHRyYWN0IFRleHQnLCBjbGljazogJ2V4dHJhY3RUZXh0JyB9LFxuICAgICAgeyBsYWJlbDogJ1NhdmUgSW1hZ2UgQXMgLi4uJywgY2xpY2s6ICdzYXZlUGFnZUltYWdlJyB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6ICdWaWV3JyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnRnVsbCBTY3JlZW4nLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuLy8gICAgeyBsYWJlbDogJ1Rvb2wgQmFyJywgY2xpY2s6ICd0b29sQmFyJyB9LFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBjbGljazogJ2RldmVsb3BlclRvb2xzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1pvb20gSW4nLCBjbGljazogJ3pvb20nIH0sIFxuICAgICAgeyBsYWJlbDogJ1pvb20gT3V0JywgY2xpY2s6ICd1bnpvb20nIH0sIFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1BhZ2UgTWFyZ2luJywgY2xpY2s6ICdzaG93TWFyZ2luJyB9LFxuICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBQYWdlcyBwZXIgUm93Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcyJywgY2xpY2s6ICdyb3cxJyB9LFxuXHQgIHsgbGFiZWw6ICc0JywgY2xpY2s6ICdyb3cyJyB9LFxuXHQgIHsgbGFiZWw6ICc2JywgY2xpY2s6ICdyb3czJyB9LFxuXHQgIHsgbGFiZWw6ICc4JywgY2xpY2s6ICdyb3c0JyB9LFxuXHRdLFxuICAgICAgfVxuICAgIF0sXG4gIH0sXG5dXG5cbmNvbnN0IGZpbGVNZW51VGVtcGxhdGUgPSBbXG4gIHsgbGFiZWw6ICdOZXcgLi4uJywgY2xpY2s6ICdvcGVuTmV3RGlhbG9nJyB9LFxuICB7IGxhYmVsOiAnT3BlbiAuLi4nLCBjbGljazogJ29wZW5EaWFsb2cnIH0sXG4gIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgeyBsYWJlbDogJ05vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdDbG9zZScsIGNsaWNrOiAnY2xvc2UnIH0sXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UgQWxsJywgY2xpY2s6ICdjbG9zZUFsbCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGNsaWNrOiAnc25hcHNob3QnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGNsaWNrOiAnYXBwZW5kUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEZvcndhcmQnLCBjbGljazogJ21vdmVQYWdlRm9yd2FyZCcgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEJhY2t3YXJkJywgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBjbGljazogJ2N1dFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBjbGljazogJ3Bhc3RlUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdFbXB0eSBCdWZmZXInLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ0V4dHJhY3QgVGV4dCcsIGNsaWNrOiAnZXh0cmFjdFRleHQnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBjbGljazogJ3NhdmVQYWdlSW1hZ2UnIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1ZpZXcnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdGdWxsIFNjcmVlbicsIGNsaWNrOiAnZnVsbFNjcmVlbicgfSwgXG4gICAgICB7IGxhYmVsOiAnU2lkZSBCYXInLCBjbGljazogJ3NpZGVCYXInIH0sIFxuICAgICAgeyBsYWJlbDogJ0RldmVsb3BlciBUb29scycsIGNsaWNrOiAnZGV2ZWxvcGVyVG9vbHMnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnWm9vbSBJbicsIGNsaWNrOiAnem9vbScgfSwgXG4gICAgICB7IGxhYmVsOiAnWm9vbSBPdXQnLCBjbGljazogJ3Vuem9vbScgfSwgXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUGFnZSBNYXJnaW4nLCBjbGljazogJ3Nob3dNYXJnaW4nIH0sXG4gICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3cnLFxuXHRzdWJtZW51OiBbXG5cdCAgeyBsYWJlbDogJzInLCBjbGljazogJ3JvdzEnIH0sXG5cdCAgeyBsYWJlbDogJzQnLCBjbGljazogJ3JvdzInIH0sXG5cdCAgeyBsYWJlbDogJzYnLCBjbGljazogJ3JvdzMnIH0sXG5cdCAgeyBsYWJlbDogJzgnLCBjbGljazogJ3JvdzQnIH0sXG5cdF0sXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbiAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gIHsgbGFiZWw6ICdTZXR0aW5ncyAuLi4nLCBjbGljazogJ3NldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnVGFibGV0IFNldHRpbmdzIC4uLicsIGNsaWNrOiAndGFibGV0U2V0dGluZ3MnIH0sXG4gIHsgbGFiZWw6ICdIZWxwJywgY2xpY2s6ICdhYm91dCcgfSxcbl1cblxuY29uc3Qgc2lkZWJhck1lbnVUZW1wbGF0ZSA9IFtcbiAgeyBsYWJlbDogJ+OCteOCpOODieODkOODvOOBruS9jee9ricsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ+W3picsIGNsaWNrOiAnZG9ja0xlZnQnIH0sXG4gICAgICB7IGxhYmVsOiAn5Y+zJywgY2xpY2s6ICdkb2NrUmlnaHQnIH0sXG4gICAgXSxcbiAgfSxcbl1cblxuZXhwb3J0IHsgbWVudVRlbXBsYXRlLCBmaWxlTWVudVRlbXBsYXRlLCBzaWRlYmFyTWVudVRlbXBsYXRlIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbWVudVRlbXBsYXRlIH0gZnJvbSAnLi9tZW51LXRlbXBsYXRlLmVzNidcbmltcG9ydCB7IHJlY2VudFVSTCB9IGZyb20gJy4vcmVjZW50LXVybC5lczYnXG5pbXBvcnQgeyBodG1sTWVudSB9IGZyb20gJy4vaHRtbC1tZW51LmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5sZXQgdGVtcGxhdGVcbmxldCBzdGF0ZXMgPSB7fVxuXG5jb25zdCBmaW5kU3VibWVudSA9ICh0ZW1wbGF0ZSwgbGFiZWwpID0+IHtcbiAgZm9yIChjb25zdCBpdGVtIG9mIHRlbXBsYXRlKSB7XG4gICAgaWYgKGl0ZW0ubGFiZWwgPT0gbGFiZWwpIHtcbiAgICAgIHJldHVybiBpdGVtXG4gICAgfVxuICAgIGlmIChpdGVtLnN1Ym1lbnUpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbmRTdWJtZW51KGl0ZW0uc3VibWVudSwgbGFiZWwpXG4gICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbmNvbnN0IHNldFN0YXRlID0gKHRlbXBsYXRlLCBsYWJlbCwgdmFsdWUpID0+IHtcbiAgY29uc3QgaXRlbSA9IGZpbmRTdWJtZW51KHRlbXBsYXRlLCBsYWJlbClcbiAgaWYgKGl0ZW0pIHtcbiAgICB2YWx1ZSA9ICh2YWx1ZSkgPyB0cnVlIDogZmFsc2VcblxuICAgIGl0ZW0uZW5hYmxlZCA9IHZhbHVlXG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgaWYgKCF2YWx1ZSkgZGVsZXRlKGl0ZW0uc3VibWVudSlcbiAgICB9XG4gICAgc3RhdGVzW2xhYmVsXSA9IHZhbHVlXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBNZW51IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0ZW1wbGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVudVRlbXBsYXRlKSlcbiAgICBzdGF0ZXMgPSB7fVxuICAgIFxuICAgIHRoaXMudXBkYXRlUmVjZW50cyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnJlYnVpbGQodGVtcGxhdGUpXG4gIH1cblxuICByZWJ1aWxkKHRlbXBsYXRlKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnJlYnVpbGRNZW51KHRlbXBsYXRlKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJlY2VudHModGVtcGxhdGUpIHtcbiAgICBjb25zdCByZWNlbnRzID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsICdPcGVuIFJlY2VudCcpLnN1Ym1lbnVcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIHJlY2VudHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBpdGVtLCBkYXRhOiBpdGVtLCBjbGljazogJ29wZW5VUkwnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGlzQXBwID0gKG5hbWVub3RlLmFwcCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Z1bGwgU2NyZWVuJywgaXNBcHAgfHwgd2luZG93LmNocm9tZSlcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0RldmVsb3BlciBUb29scycsIGlzQXBwKVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnT3BlbiAuLi4nLCBpc0FwcClcblxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5jdXJyZW50XG4gICAgY29uc3QgaXNQcm9qZWN0ID0gKHByb2plY3QpID8gdHJ1ZSA6IGZhbHNlXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdDbG9zZScsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Nsb3NlIEFsbCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1NhdmUgU25hcHNob3QgQXMgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLnR4dCAoUGxhaW4gVGV4dCkgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJy5wZGYgKFBERikgLi4uJywgaXNQcm9qZWN0KVxuICAgIFxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQWRkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSB0byBCdWZmZXInLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0VtcHR5IEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ01vdmUgRm9yd2FyZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ01vdmUgQmFja3dhcmQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdFeHRyYWN0IFRleHQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdTYXZlIEltYWdlIEFzIC4uLicsIGlzUHJvamVjdClcblxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnVW5kbycsIGlzUHJvamVjdCkgLy8gJiYgcHJvamVjdC5oaXN0b3J5Lmhhc1VuZG8oKSlcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1JlZG8nLCBpc1Byb2plY3QpIC8vICYmIHByb2plY3QuaGlzdG9yeS5oYXNSZWRvKCkpXG4gIH1cblxuICBnZXRTdGF0ZShsYWJlbCkge1xuICAgIHJldHVybiBzdGF0ZXNbbGFiZWxdXG4gIH1cbn1cblxuY29uc3QgbWVudSA9IG5ldyBNZW51KClcblxuZXhwb3J0IHsgbWVudSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXQgfSBmcm9tICcuL3Nob3J0Y3V0LmVzNidcbmltcG9ydCB7IHJlY2VudFVSTCB9IGZyb20gJy4vcmVjZW50LXVybC5lczYnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgdWkgfSBmcm9tICcuL3VpLmVzNidcblxuaW1wb3J0IHsgbWFpblZpZXcgfSBmcm9tICcuL21haW4tdmlldy5lczYnXG5pbXBvcnQgeyBwYWdlVmlldyB9IGZyb20gJy4vcGFnZS12aWV3LmVzNidcbmltcG9ydCB7IHRleHRWaWV3IH0gZnJvbSAnLi90ZXh0LXZpZXcuZXM2J1xuXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBOYW1lbm90ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyc2lvbiA9IFwiMi4wLjAtYWxwaGEuMi1kZWJ1Z1wiXG4gICAgdGhpcy50cmlhbCA9IGZhbHNlXG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ1xuICAgIHRoaXMuc2hvcnRjdXQgPSBzaG9ydGN1dFxuICAgIHRoaXMucmVjZW50VVJMID0gcmVjZW50VVJMXG4gICAgXG4gICAgdGhpcy5jb21tYW5kID0gY29tbWFuZFxuICAgIHRoaXMudWkgPSB1aVxuXG4gICAgdGhpcy5tYWluVmlldyA9IG1haW5WaWV3XG4gICAgdGhpcy5wYWdlVmlldyA9IHBhZ2VWaWV3XG4gICAgdGhpcy50ZXh0VmlldyA9IHRleHRWaWV3XG4gICAgXG4gICAgdGhpcy5wcm9qZWN0TWFuYWdlciA9IHByb2plY3RNYW5hZ2VyXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbmZpZy5sb2FkKClcbiAgICBzaG9ydGN1dC5sb2FkKClcbiAgICByZWNlbnRVUkwubG9hZCgpXG4gICAgXG4gICAgdWkuaW5pdCgpXG5cbiAgICBtYWluVmlldy5pbml0KClcbiAgICBwYWdlVmlldy5pbml0KClcbiAgICB0ZXh0Vmlldy5pbml0KClcbiAgICBcbiAgICB0aGlzLmluaXRCYXNlSGFuZGxlcnMoKVxuICB9XG5cbiAgaW5pdEJhc2VIYW5kbGVycygpIHtcbiAgICB3aW5kb3cub25yZXNpemUgPSAoZSkgPT4ge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgbG9nKCdvbnJlc2l6ZScsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIHdpbmRvdy5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgICAgIGxvZygnY29udGV4dG1lbnUnKVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gIHByZXZlbnRTY3JvbGxGcmVlemUodmlldykge1xuICAgIGNvbnN0IHNjcm9sbGVyID0gJCh2aWV3LmVsZW1lbnQpLnBhcmVudCgpXG4gICAgdmlldy5sYXN0WSA9IDBcblxuICAgIHNjcm9sbGVyLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgICAgdmlldy5sYXN0WSA9IGUudG91Y2hlc1swXS5jbGllbnRZXG4gICAgICBsb2coJ3N0YXJ0JylcbiAgICB9KVxuICAgIFxuICAgIHNjcm9sbGVyLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBjb25zdCB0b3AgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gJChlLmN1cnJlbnRUYXJnZXQpLnNjcm9sbFRvcCgpXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSAodmlldy5sYXN0WSAtIHRvcCkgPCAwID8gJ3VwJzogJ2Rvd24nXG4gICAgICBsb2coZGlyZWN0aW9uKVxuICAgIH0pXG4gIH1cbiAgKi8gIFxuXG4gIGlzTWFjKCkge1xuICAgIHJldHVybiBuYXZpZ2F0b3IucGxhdGZvcm0uaW5kZXhPZignTWFjJylcbiAgfVxufVxuXG5jb25zdCBuYW1lbm90ZSA9IG5ldyBOYW1lbm90ZSgpXG5cbmV4cG9ydCB7IG5hbWVub3RlIH1cbiAgICBcbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3LmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQYWdlVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuZWxlbWVudCA9ICQoJy5wYWdlLXZpZXcnKVswXVxuICAgIHRoaXMucHJldmVudFNjcm9sbEZyZWV6ZSgpXG4gIH1cbn1cblxuY29uc3QgcGFnZVZpZXcgPSBuZXcgUGFnZVZpZXcoKVxuXG5leHBvcnQgeyBwYWdlVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5waWQgPSAwXG4gIH1cblxuICBkZXN0cnVjdG9yKCkge1xuICAgIGxvZygncGFnZSBkZXN0cnVjdG9yJywgdGhpcy5waWQpXG4gIH1cbn1cblxuZXhwb3J0IHsgUGFnZSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5pbXBvcnQgeyB0aXRsZSB9IGZyb20gJy4vdGl0bGUuZXM2J1xuaW1wb3J0IHsgdmlld0J1dHRvbiB9IGZyb20gJy4vdmlldy1idXR0b24uZXM2J1xuXG5pbXBvcnQgeyBtYWluVmlldyB9IGZyb20gJy4vbWFpbi12aWV3LmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIHNlbGVjdChwcm9qZWN0KSB7XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgocHJvamVjdC51cmwpXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KVxuICAgICAgfVxuICAgICAgcmVjZW50VVJMLmFkZChwcm9qZWN0LnVybClcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jdXJyZW50ID0gcHJvamVjdFxuICAgIG1haW5WaWV3LnNldFByb2plY3QocHJvamVjdClcbiAgICB0aXRsZS5zZXQocHJvamVjdCA/IHByb2plY3QubmFtZSgpIDogbnVsbClcblxuICAgIG1lbnUudXBkYXRlKClcbiAgICB2aWV3QnV0dG9uLnVwZGF0ZSgpXG4gIH1cblxuICBmaW5kSW5kZXgodXJsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS51cmwgPT0gdXJsKSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMVxuICB9XG4gIFxuICBvcGVuKHVybCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgodXJsKVxuICAgIGNvbnN0IHByb2plY3QgPSAoaW5kZXggPj0gMCkgPyB0aGlzLnByb2plY3RzW2luZGV4XSA6IG5ldyBQcm9qZWN0KHVybClcblxuICAgIHRoaXMuc2VsZWN0KHByb2plY3QpXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0KVxuICB9XG4gIFxuICBjbG9zZShwcm9qZWN0KSB7XG4gICAgd2FybignW2Nsb3NlXScsIHByb2plY3QpXG4gICAgaWYgKCFwcm9qZWN0KSBwcm9qZWN0ID0gdGhpcy5jdXJyZW50XG4gICAgaWYgKCFwcm9qZWN0KSByZXR1cm5cblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgocHJvamVjdC51cmwpXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgaWYgKHByb2plY3QgPT0gdGhpcy5jdXJyZW50KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMucHJvamVjdHNbdGhpcy5wcm9qZWN0cy5sZW5ndGggLSAxXSlcbiAgICAgIH1cbiAgICAgIHByb2plY3QuZGVzdHJ1Y3RvcigpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHByb2plY3RNYW5hZ2VyID0gbmV3IFByb2plY3RNYW5hZ2VyXG5cbmV4cG9ydCB7IHByb2plY3RNYW5hZ2VyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmwucmVwbGFjZSgvXFxcXC9nLCAnLycpXG5cbiAgICB0aGlzLnBhZ2VzID0gW11cbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cblxuICBkZXN0cnVjdG9yKCkge1xuICAgIGxvZygncHJvamVjdCBkZXN0cnVjdG9yJywgdGhpcy51cmwpXG4gICAgXG4gICAgdGhpcy5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgcGFnZS5kZXN0cnVjdG9yKClcbiAgICB9KVxuICB9XG5cbiAgZmluZEluZGV4KHBhZ2UpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnBhZ2VzW2ldLnBpZCA9PSBwYWdlLnBpZCkge1xuICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICh0aGlzLnVybCkgPyB0aGlzLnVybC5yZXBsYWNlKC9eLipcXC8vLCAnJykgOiBUKCdVbnRpdGxlZCcpXG4gIH1cbn1cblxuZXhwb3J0IHsgUHJvamVjdCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuY29uc3QgbWF4ID0gMTBcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBSZWNlbnRVUkwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL3JlY2VudC11cmwnKVxuICAgIHRoaXMuZGF0YSA9IChqc29uKSA/IEpTT04ucGFyc2UoanNvbikgOiBbXVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJywganNvbilcbiAgfVxuXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICAgIHRoaXMuc2F2ZSgpXG5cbi8vICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBtZW51LnVwZGF0ZSgpXG4vLyAgfSwgNTAwKVxuICB9XG5cbiAgYWRkKHVybCkge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPSB1cmwpXG4gICAgdGhpcy5kYXRhLnVuc2hpZnQodXJsKVxuXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiBtYXgpIHtcbiAgICAgIHRoaXMuZGF0YS5sZW5ndGggPSBtYXhcbiAgICB9XG4gICAgdGhpcy5zYXZlKClcbiAgfVxufVxuXG5jb25zdCByZWNlbnRVUkwgPSBuZXcgUmVjZW50VVJMKClcblxuZXhwb3J0IHsgcmVjZW50VVJMIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBzaG9ydGN1dERlZmF1bHQgPSB7XG4gIHVuZG86IFsnY29tbWFuZCt6JywgJ2N0cmwreicsICdudW0vJywgJywnXSxcbiAgcmVkbzogWydjb21tYW5kK3knLCAnY3RybCt5JywgJ251bSonLCAnLiddLFxuICB6b29tOiBbJ1snLCAncScsICdudW1wbHVzJ10sXG4gIHVuem9vbTogWyddJywgJ2EnLCAnbnVtbWludXMnXSxcbiAgdG9nZ2xlVG9vbDogWyd4JywgJ251bS4nLCAnLyddLFxuXG4gIG9wZW5OZXdEaWFsb2c6IFsnY29tbWFuZCtuJywgJ2FsdCtuJ10sXG4gIG9wZW5EaWFsb2c6IFsnY29tbWFuZCtvJywgJ2FsdCtvJ10sXG4gIFxuICBjbG9zZTogWydjb21tYW5kK3cnLCAnYWx0K3cnXSxcbiAgcXVpdDogWydjb21tYW5kK3EnLCAnYWx0K3EnXSxcbiAgcmVsb2FkOiBbJ2NvbW1hbmQrc2hpZnQrciddLFxuXG4gIGV4cG9ydENTTkZEaWFsb2c6IFsnY29tbWFuZCtwJywgJ2FsdCtwJ10sXG4gIGV4cG9ydFBERkRpYWxvZzogWydjb21tYW5kK3NoaWZ0K3AnLCAnYWx0K3NoaWZ0K3AnXSxcbiAgaW1wb3J0VGV4dERpYWxvZzogWydjb21tYW5kK3NoaWZ0K2knLCAnYWx0K3NoaWZ0K2knXSxcbiAgc2F2ZVBhZ2VJbWFnZTogWydjb21tYW5kKy0nLCAnYWx0Ky0nXSxcbiAgZXh0cmFjdFRleHQ6IFsnY29tbWFuZCt0JywgJ2FsdCt0J10sXG5cbiAgLy9tYXJnaW5TZXR0aW5nc0RpYWxvZzogWydjb21tYW5kK3NoaWZ0K2knLCAnYWx0K3NoaWZ0K2knXSxcbiAgXG4gIHBhZ2VMZWZ0OiAnbGVmdCcsXG4gIHBhZ2VSaWdodDogJ3JpZ2h0JyxcbiAgcGFnZVVwOiAndXAnLCAgICAgIFxuICBwYWdlRG93bjogJ2Rvd24nLCAgXG5cbiAgc2VsZWN0QWxsOiAnY3RybCthJyxcbiAgdW5zZWxlY3Q6ICdjdHJsK2QnLFxuICBtZXJnZVRleHQ6ICdjdHJsK2UnLFxuICBcbiAgc2lkZUJhcjogJzEnLFxuICBkZXZlbG9wZXJUb29sczogJ2NvbW1hbmQrYWx0K2onLFxuICB0b29sQmFyOiAnY29tbWFuZCthbHQraCcsXG5cbiAgcGVuOiAncCcsXG4gIGVyYXNlcjogJ2UnLFxuICB0ZXh0OiAndCcsXG5cbiAgLy9cbiAgLy8gUGFnZSBzaG9ydGN1dHNcbiAgLy9cbiAgXG4gIGluc2VydFBhZ2U6ICdzaGlmdCtpJyxcbiAgZHVwbGljYXRlUGFnZTogJ3NoaWZ0K2QnLFxuXG4gIHNob3dNYXJnaW46ICdyJyxcbi8vZmxpcFBhZ2U6ICdoJyxcbiAgYXBwZW5kUGFnZTogJ3NoaWZ0K2EnLFxuICBjdXRQYWdlOiAnc2hpZnQraycsXG4gIHBhc3RlUGFnZTogJ3NoaWZ0K3knLFxuICBlbXB0eVBhZ2U6ICdzaGlmdCswJyxcbiAgbW92ZVBhZ2VMZWZ0OiAnPCcsXG4gIG1vdmVQYWdlUmlnaHQ6ICc+JyxcbiAgcm93MTogJ3NoaWZ0KzEnLFxuICByb3cyOiAnc2hpZnQrMicsXG4gIHJvdzM6ICdzaGlmdCszJyxcbiAgcm93NDogJ3NoaWZ0KzQnLFxuXG4gIC8vXG4gIC8vIFRleHQgc2hvcnRjdXRzIChjYW4gYmUgdXNlZCB3aGlsZSB0ZXh0IGVkaXRpbmcpXG4gIC8vXG4gIFxuICB0b2dnbGVFZGl0TW9kZTogJ2N0cmwrZycsXG4gIGFkZEZvbnRTaXplOiAnY3RybCsuJyxcbiAgc3VidHJhY3RGb250U2l6ZTogJ2N0cmwrLCcsXG4gIHRvZ2dsZURpcmVjdGlvbjogJ2N0cmwrXScsXG4gIGN1dFRleHQ6ICdiYWNrc3BhY2UnLFxuICBuZXh0VGV4dDogJ3RhYicsXG4gIHByZXZUZXh0OiAnc2hpZnQrdGFiJyxcbn1cblxuZXhwb3J0IHsgc2hvcnRjdXREZWZhdWx0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vL2ltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBzaG9ydGN1dERlZmF1bHQgfSBmcm9tICcuL3Nob3J0Y3V0LWRlZmF1bHQuZXM2J1xuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5cbi8qXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi90ZXh0LmVzNidcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuZXM2J1xuKi9cblxuaW1wb3J0IHsgdWkgfSBmcm9tICcuL3VpLmVzNidcblxuY2xhc3MgU2hvcnRjdXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuXG4gICAgTW91c2V0cmFwLmFkZEtleWNvZGVzKHtcbiAgICAgIDEwNzogJ251bXBsdXMnLFxuICAgICAgMTA5OiAnbnVtbWludXMnLFxuICAgICAgMTEwOiAnbnVtLicsXG4gICAgICAxMTE6ICdudW0vJyxcbiAgICAgIDEwNjogJ251bSonLFxuICAgIH0pXG5cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKGUsIGVsZW1lbnQsIGNvbWJvKSB7XG4vKlxuICAgICAgaWYgKFRleHQuaXNFZGl0YWJsZShlbGVtZW50KSkge1xuICAgICAgICBsb2coJ2tleWNvZGU9JywgZS5rZXlDb2RlLCBlKVxuXG5cdGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUubWV0YUtleSkge1xuXHQgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG5cdCAgY2FzZSA3MTogIC8vIGN0cmwrZ1xuXHQgIGNhc2UgMTg4OiAvLyBjdHJsKyxcblx0ICBjYXNlIDE5MDogLy8gY3RybCsuXG5cdCAgY2FzZSAyMjE6IC8vIGN0cmwrXVxuXHQgICAgcmV0dXJuIGZhbHNlXG5cdCAgfVxuXHR9XG5cblx0aWYgKGUua2V5Q29kZSA9PSA5KSB7IC8vIFRBQlxuXHQgIHJldHVybiBmYWxzZVxuXHR9XG5cdHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiovXG4gICAgfVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL3Nob3J0Y3V0JylcbiAgICB0aGlzLmRhdGEgPSBqc29uID8gSlNPTi5wYXJzZShqc29uKSA6IE9iamVjdC5hc3NpZ24oe30sIHNob3J0Y3V0RGVmYXVsdClcbiAgICB0aGlzLmJpbmQoKVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9zaG9ydGN1dCcsIGpzb24pXG4gIH1cbiAgXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dERlZmF1bHQpXG4gICAgdGhpcy5zYXZlKClcblxuICAgIE1vdXNldHJhcC5yZXNldCgpXG4gICAgdGhpcy5iaW5kKClcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgZm9yIChsZXQgaXRlbSBpbiB0aGlzLmRhdGEpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZGF0YVtpdGVtXVxuICAgICAgY29uc3QgaGFuZGxlciA9IGNvbW1hbmRbaXRlbV1cblxuICAgICAgaWYgKGl0ZW0gPT0gJ2RldmVsb3BlclRvb2xzJykgY29udGludWVcblxuICAgICAgaWYgKGhhbmRsZXIpIHtcblx0bG9nKGAnJHtpdGVtfWApXG4gICAgICAgIFxuXHRNb3VzZXRyYXAuYmluZChrZXksIChlKSA9PiB7XG5cdCAgY29tbWFuZC5wcmV2ID0gY29tbWFuZC5jdXJyZW50XG5cdCAgY29tbWFuZC5jdXJyZW50ID0gaXRlbVxuXHQgIGxvZyhgKiR7aXRlbX0qYClcbiAgICAgICAgICBcblx0ICBoYW5kbGVyKClcblx0ICByZXR1cm4gKHVpLmRpYWxvZy5pc09wZW4oKSkgPyB0cnVlIDogZmFsc2VcblxuXHR9LCAna2V5ZG93bicpXG5cbiAgICAgIH0gZWxzZSB7XG5cdGxvZyhgJyR7aXRlbX0nOiBubyBzdWNoIGNvbW1hbmRgKVxuICAgICAgfVxuICAgIH1cblxuLy8gIE1vdXNldHJhcC5iaW5kKCdzcGFjZScsIChlKSA9PiB7XG4vLyAgICBDb250cm9sbGVyLmNsZWFyTW92ZSgpXG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSlcblxuLy8gIE1vdXNldHJhcC5iaW5kKCdlbnRlcicsIChlKSA9PiB7XG4vLyAgICBpZiAodWkuZGlhbG9nLmlzT3BlbigpKSByZXR1cm4gdHJ1ZVxuLy8gICAgY29tbWFuZC5xdWlja1pvb20oKVxuLy8gICAgcmV0dXJuIGZhbHNlXG4vLyAgfSlcblxuLy8gIE1vdXNldHJhcC5iaW5kKCdzcGFjZScsIChlKSA9PiB7XG4vLyAgICBpZiAoIUNvbnRyb2xsZXIuaXNNb3ZlZCgpKSB7XG4vL1x0Y29tbWFuZC5xdWlja1pvb20oKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiBmYWxzZTtcbi8vICB9LCAna2V5dXAnKVxuICB9XG59XG5cbmNvbnN0IHNob3J0Y3V0ID0gbmV3IFNob3J0Y3V0KClcblxuZXhwb3J0IHsgc2hvcnRjdXQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG5sZXQgcGFnZUJ1dHRvblxubGV0IHRleHRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBTaWRlQmFyVGFiIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcGFnZUJ1dHRvbiA9ICQoJyNwYWdlLXZpZXctYnV0dG9uJykudGV4dEJ1dHRvbih7XG4gICAgICB0ZXh0OiBUKCdQYWdlcycpLFxuICAgICAgbG9ja2VkOiB0cnVlLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnRleHRCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICBjb21tYW5kLnNob3dQYWdlVmlldygpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVswXVxuXG4gICAgdGV4dEJ1dHRvbiA9ICQoJyN0ZXh0LXZpZXctYnV0dG9uJykudGV4dEJ1dHRvbih7XG4gICAgICB0ZXh0OiBUKCdUZXh0cycpLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnRleHRCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICBjb21tYW5kLnNob3dUZXh0VmlldygpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVswXVxuXG4gICAgdGhpcy5idXR0b25zLnB1c2gocGFnZUJ1dHRvbiwgdGV4dEJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuXG4gIHNlbGVjdChuYW1lKSB7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBjb25zdCBsb2NrZWQgPSAkKGJ1dHRvbikudGV4dEJ1dHRvbignbG9ja2VkJylcblxuICAgICAgaWYgKGJ1dHRvbiAmJiBidXR0b24uaWQuaW5kZXhPZihuYW1lKSA9PSAwKSB7XG4gICAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikudGV4dEJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhclRhYiA9IG5ldyBTaWRlQmFyVGFiKClcblxuZXhwb3J0IHsgc2lkZUJhclRhYiB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgc2lkZUJhclRhYiB9IGZyb20gJy4vc2lkZS1iYXItdGFiLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBTaWRlQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHNpZGVCYXJUYWIuaW5pdCgpXG4gIH1cbiAgXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIHNpZGVCYXJUYWIudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCBzaWRlQmFyID0gbmV3IFNpZGVCYXIoKVxuXG5leHBvcnQgeyBzaWRlQmFyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVGV4dFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSAkKCcudGV4dC12aWV3JylbMF1cbiAgICB0aGlzLnByZXZlbnRTY3JvbGxGcmVlemUoKVxuICB9XG59XG5cbmNvbnN0IHRleHRWaWV3ID0gbmV3IFRleHRWaWV3KClcblxuZXhwb3J0IHsgdGV4dFZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5cbmNsYXNzIFRpdGxlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldCgpXG4gIH1cbiAgXG4gIHNldCh0aXRsZSkge1xuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHRpdGxlID0gKG5hbWVub3RlLnRyaWFsKSA/IGAke1QoJ05hbWVub3RlJyl9ICR7VCgnVHJpYWwnKX1gIDogVCgnTmFtZW5vdGUnKVxuICAgIH1cbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBuYW1lbm90ZS5hcHAuc2V0VGl0bGUodGl0bGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGVcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgdGl0bGUgPSBuZXcgVGl0bGUoKVxuXG5leHBvcnQgeyB0aXRsZSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuaW1wb3J0IHsgdmlld0J1dHRvbiB9IGZyb20gJy4vdmlldy1idXR0b24uZXM2J1xuaW1wb3J0IHsgaGlzdG9yeUJ1dHRvbiB9IGZyb20gJy4vaGlzdG9yeS1idXR0b24uZXM2J1xuaW1wb3J0IHsgdG9vbEJ1dHRvbiB9IGZyb20gJy4vdG9vbC1idXR0b24uZXM2J1xuaW1wb3J0IHsgbWVudUJ1dHRvbiB9IGZyb20gJy4vbWVudS1idXR0b24uZXM2J1xuXG5jbGFzcyBUb29sQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHZpZXdCdXR0b24uaW5pdCgpXG4gICAgaGlzdG9yeUJ1dHRvbi5pbml0KClcbiAgICB0b29sQnV0dG9uLmluaXQoKVxuICAgIG1lbnVCdXR0b24uaW5pdCgpXG5cbiAgICB0aGlzLnVwZGF0ZSgpXG4gICAgdGhpcy51cGRhdGVCdXR0b25zKClcbiAgfVxuICBcbiAgdXBkYXRlQnV0dG9ucygpIHtcbiAgICB2aWV3QnV0dG9uLnVwZGF0ZSgpXG4gICAgaGlzdG9yeUJ1dHRvbi51cGRhdGUoKVxuICAgIHRvb2xCdXR0b24udXBkYXRlKClcbiAgICBtZW51QnV0dG9uLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEudG9vbEJhclxuICAgIGNvbmZpZy5kYXRhLnRvb2xCYXIgPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgICQoJyN0b29sYmFyJykuY3NzKCdkaXNwbGF5JywgdmFsdWUgPyAnYmxvY2snIDogJ25vbmUnKVxuICAgICQoJyNtYWluJykuY3NzKCdoZWlnaHQnLCB2YWx1ZSA/ICdjYWxjKDEwMCUgLSAzN3B4KScgOiAnMTAwJScpXG4gICAgJCgnI21haW4nKS5jc3MoJ3RvcCcsIHZhbHVlID8gJzM3cHgnIDogJzAnKVxuXG4gICAgLy9WaWV3Lm9uUmVzaXplKClcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZSghY29uZmlnLmRhdGEudG9vbEJhcilcbiAgfVxufVxuXG5jb25zdCB0b29sQmFyID0gbmV3IFRvb2xCYXIoKTtcblxuZXhwb3J0IHsgdG9vbEJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBodG1sRHJvcGRvd24gfSBmcm9tICcuL2h0bWwtZHJvcGRvd24uZXM2J1xuXG5sZXQgcGVuQnV0dG9uXG5sZXQgZXJhc2VyQnV0dG9uXG5sZXQgdGV4dEJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFRvb2xCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBwZW5CdXR0b24gPSAkKCcjcGVuLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9wZW4tYnV0dG9uLnBuZycsXG4gICAgICBsb2NrZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3BlbicpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCdwZW5Ecm9wRG93bicsICdwZW4nKVxuICAgIH0pWzBdXG4gICAgXG4gICAgZXJhc2VyQnV0dG9uID0gJCgnI2VyYXNlci1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZXJhc2VyLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KCdlcmFzZXInKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgnZXJhc2VyRHJvcERvd24nLCAnZXJhc2VyJylcbiAgICB9KVswXVxuXG4gICAgdGV4dEJ1dHRvbiA9ICQoJyN0ZXh0LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy90ZXh0LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbERyb3Bkb3duLm1ha2UoJ3RleHREcm9wRG93bicsICd0ZXh0JylcbiAgICB9KVswXVxuXG4gICAgdGhpcy5idXR0b25zLnB1c2gocGVuQnV0dG9uLCBlcmFzZXJCdXR0b24sIHRleHRCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cblxuICBzZWxlY3QobmFtZSkge1xuICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgY29uc3QgbG9ja2VkID0gJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnKVxuICAgICAgXG4gICAgICBpZiAoYnV0dG9uICYmIGJ1dHRvbi5pZC5pbmRleE9mKG5hbWUpID09IDApIHtcbiAgICAgICAgaWYgKCFsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRvb2xCdXR0b24gPSBuZXcgVG9vbEJ1dHRvbigpXG5cbmV4cG9ydCB7IHRvb2xCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHdpZGdldCB9IGZyb20gJy4vd2lkZ2V0LmVzNidcbmltcG9ydCB7IGRpdmlkZXIgfSBmcm9tICcuL2RpdmlkZXIuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5pbXBvcnQgeyB0aXRsZSB9IGZyb20gJy4vdGl0bGUuZXM2J1xuXG5pbXBvcnQgeyB0b29sQmFyIH0gZnJvbSAnLi90b29sLWJhci5lczYnXG5pbXBvcnQgeyBzaWRlQmFyIH0gZnJvbSAnLi9zaWRlLWJhci5lczYnXG5cbmNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZW51ID0gbWVudVxuICAgIHRoaXMuZGl2aWRlciA9IGRpdmlkZXJcbiAgICB0aGlzLmRpYWxvZyA9IGRpYWxvZ1xuXG4gICAgdGhpcy50b29sQmFyID0gdG9vbEJhclxuICAgIHRoaXMuc2lkZUJhciA9IHNpZGVCYXJcbiAgfVxuICBcbiAgaW5pdCgpIHtcbiAgICBtZW51LmluaXQoKVxuICAgIHRpdGxlLmluaXQoKVxuICAgIGRpdmlkZXIuaW5pdCgpXG4gICAgZGlhbG9nLmluaXQoKVxuXG4gICAgdG9vbEJhci5pbml0KClcbiAgICBzaWRlQmFyLmluaXQoKVxuXG4gICAgJCgnLnNwbGl0LXBhbmUnKS5jc3MoJ29wYWNpdHknLCAxKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuLy8gIHRvb2xCYXIudXBkYXRlKClcbi8vICBzaWRlQmFyLnVwZGF0ZSgpXG5cbi8vICBkaXZpZGVyLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3QgdWkgPSBuZXcgVUkoKVxuXG5leHBvcnQgeyB1aSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcblxubGV0IHF1aWNrWm9vbUJ1dHRvblxubGV0IHpvb21CdXR0b25cbmxldCB1bnpvb21CdXR0b25cbmxldCBzcGxpdEJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFZpZXdCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcXVpY2tab29tQnV0dG9uID0gJCgnI3Jvdy1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWFnbmlmaWVyLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyBjb21tYW5kLnF1aWNrWm9vbSgpIH1cbiAgICB9KVswXVxuXG4gICAgem9vbUJ1dHRvbiA9ICQoJyN6b29tLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy96b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQuem9vbSgpIH1cbiAgICB9KVswXVxuXG4gICAgdW56b29tQnV0dG9uID0gJCgnI3Vuem9vbS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW56b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQudW56b29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICBzcGxpdEJ1dHRvbiA9ICQoJyNzcGxpdC1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW56b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyBjb21tYW5kLnNpZGVCYXIoKSB9XG4gICAgfSlbMF1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIGNvbnN0IHF1aWNrWm9vbSA9IHByb2plY3QgLy8ocHJvamVjdCkgPyBwcm9qZWN0LnZpZXcucXVpY2tab29tIDogZmFsc2VcbiAgICBcbiAgICAkKHpvb21CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFwcm9qZWN0KVxuICAgICQodW56b29tQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhcHJvamVjdClcbiAgICAkKHF1aWNrWm9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG5cbiAgICAkKHF1aWNrWm9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHF1aWNrWm9vbSlcbiAgICAkKHNwbGl0QnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgY29uZmlnLmRhdGEuc2lkZUJhcilcbiAgfVxufVxuXG5jb25zdCB2aWV3QnV0dG9uID0gbmV3IFZpZXdCdXR0b24oKVxuXG5leHBvcnQgeyB2aWV3QnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHByZXZlbnRTY3JvbGxGcmVlemUoKSB7XG4gICAgdGhpcy5sYXN0WSA9IDBcblxuICAgIGNvbnN0IHNjcm9sbGVyID0gJCh0aGlzLmVsZW1lbnQpLnBhcmVudCgpXG4gICAgc2Nyb2xsZXIub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICB0aGlzLmxhc3RZID0gZS50b3VjaGVzWzBdLmNsaWVudFlcbiAgICB9LmJpbmQodGhpcykpXG4gICAgXG4gICAgc2Nyb2xsZXIub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnN0IHRvcCA9IGUudG91Y2hlc1swXS5jbGllbnRZXG5cbiAgICAgIGNvbnN0IHNjcm9sbFRvcCA9ICQoZS5jdXJyZW50VGFyZ2V0KS5zY3JvbGxUb3AoKVxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gKHRoaXMubGFzdFkgLSB0b3ApIDwgMCA/ICd1cCc6ICdkb3duJ1xuXG4gICAgICBsb2coc2Nyb2xsVG9wLCAnLT4nLCBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsSGVpZ2h0LCAnLScsIGUudGFyZ2V0Lm9mZnNldEhlaWdodCwgJzonLCAkKCcjbWFpbicpWzBdLm9mZnNldEhlaWdodClcbiAgICAgIFxuICAgICAgaWYgKHNjcm9sbFRvcCA9PT0gMCAmJiBkaXJlY3Rpb24gPT09IFwidXBcIikge1xuICAgICAgICBsb2coJ3ByZXZlbnQgdXAuLicpXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPj0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGUudGFyZ2V0Lm9mZnNldEhlaWdodCAmJiBkaXJlY3Rpb24gPT09IFwiZG93blwiKSB7XG4gICAgICAgIGxvZygncHJldmVudCBkb3duLi4nKVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdFkgPSB0b3A7XG4gICAgfS5iaW5kKHRoaXMpKVxuICB9XG59XG5cbmV4cG9ydCB7IFZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIFdpZGdldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdEltYWdlQnV0dG9uKClcbiAgICB0aGlzLmluaXRUZXh0QnV0dG9uKClcbiAgfVxuXG4gIGluaXRUZXh0QnV0dG9uKCkge1xuICAgICQud2lkZ2V0KCduYW1lbm90ZS50ZXh0QnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgIH0sXG5cbiAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ3RleHQtYnV0dG9uJylcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnZmxvYXQnLCB0aGlzLm9wdGlvbnMuZmxvYXQpXG4gICAgICAgIHRoaXMubG9ja2VkKHRoaXMub3B0aW9ucy5sb2NrZWQpXG4gICAgICAgIHRoaXMuZWxlbWVudC50ZXh0KHRoaXMub3B0aW9ucy50ZXh0KVxuXG4gICAgICAgIGNvbnN0IGNsaWNrID0gdGhpcy5vcHRpb25zLmNsaWNrXG4gICAgICAgIGlmIChjbGljaykgdGhpcy5lbGVtZW50Lm9uKCdjbGljaycsIGNsaWNrKVxuICAgICAgfSxcblxuICAgICAgbG9ja2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5sb2NrZWRcblxuICAgICAgICB0aGlzLm9wdGlvbnMubG9ja2VkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KVxuICB9XG4gIFxuICBpbml0SW1hZ2VCdXR0b24oKSB7XG4gICAgJC53aWRnZXQoJ25hbWVub3RlLmltYWdlQnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICB3aWR0aDogJzI0cHgnLFxuICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgXG4gICAgICBfY3JlYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdpbWctYnV0dG9uJylcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoJHt0aGlzLm9wdGlvbnMuc3JjfSlgKVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCdmbG9hdCcsIHRoaXMub3B0aW9ucy5mbG9hdClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpXG5cbiAgICAgICAgdGhpcy5sb2NrZWQodGhpcy5vcHRpb25zLmxvY2tlZClcbiAgICAgICAgdGhpcy5kaXNhYmxlZCh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnQpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgICBjb250ZW50LnRpdGxlID0gXCJcIlxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmxvYXQgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgY29udGVudC5zdHlsZS5yaWdodCA9IFwiMFwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50UGFyZW50IHx8IHRoaXMuZWxlbWVudFswXVxuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFBhcmVudCkge1xuICAgICAgICAgICAgLy8gU2hvdWxkIHJlY2FsYyBtZW51IHBvc3Rpb24gb24gb3BlblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsaWNrID0gdGhpcy5vcHRpb25zLmNsaWNrXG4gICAgICAgIGlmIChjbGljaykgdGhpcy5lbGVtZW50Lm9uKCdjbGljaycsIGNsaWNrKVxuICAgICAgfSxcblxuICAgICAgbG9ja2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5sb2NrZWRcblxuICAgICAgICB0aGlzLm9wdGlvbnMubG9ja2VkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9IGVsc2Uge1xuXHQgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5vcHRpb25zLmRpc2FibGVkXG4gICAgICBcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdvZmYnKVxuICAgICAgICB9IGVsc2Uge1xuXHQgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnb2ZmJylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlQ29udGVudFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgY29uc3QgY29udGVudFdpZHRoID0gdGhpcy5vcHRpb25zLmNvbnRlbnRXaWR0aCB8fCAxNTBcblxuICAgICAgICBjb25zdCB3aWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcbiAgICAgICAgY29uc3QgbGVmdCA9IChyZWN0LnggKyBjb250ZW50V2lkdGgpIDwgd2lkdGggPyByZWN0LnggOiB3aWR0aCAtIGNvbnRlbnRXaWR0aFxuICAgICAgICBjb250ZW50LnN0eWxlLmxlZnQgPSAobGVmdCAtIDIpICsgJ3B4J1xuICAgICAgICBjb250ZW50LnN0eWxlLnRvcCA9ICg2NCArIDIpICsgJ3B4J1xuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoKVxuXG5leHBvcnQgeyB3aWRnZXQgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkaWN0aW9uYXJ5ID0ge1xuICBcImphXCI6IHtcbiAgICBcIk5hbWVub3RlXCI6IFwiTmFtZW5vdGVcIixcbiAgICBcIkFib3V0IE5hbWVub3RlXCI6IFwiTmFtZW5vdGUg44Gr44Gk44GE44GmXCIsXG4gICAgXCJBYm91dCBOYW1lbm90ZSAuLi5cIjogXCJOYW1lbm90ZSDjgavjgaTjgYTjgaYgLi4uXCIsXG4gICAgXCJIZWxwXCI6IFwi44OY44Or44OXXCIsXG4gICAgXCJTZXR0aW5nc1wiOiBcIueSsOWig+ioreWumlwiLFxuICAgIFwiU2V0dGluZ3MgLi4uXCI6IFwi55Kw5aKD6Kit5a6aIC4uLlwiLFxuICAgIFwiVGFibGV0IFNldHRpbmdzXCI6IFwi562G5Zyn6Kq/5pW0XCIsXG4gICAgXCJUYWJsZXQgU2V0dGluZ3MgLi4uXCI6IFwi562G5Zyn6Kq/5pW0IC4uLlwiLFxuICAgIFwiUXVpdCBOYW1lbm90ZVwiOiBcIk5hbWVub3RlIOOCkue1guS6hlwiLFxuICAgIFwiTm90ZVwiOiBcIuODjuODvOODiFwiLFxuICAgIFwiRmlsZVwiOiBcIuODleOCoeOCpOODq1wiLFxuICAgIFwiT3BlbiAuLi5cIjogXCLplovjgY8gLi4uXCIsXG4gICAgXCJPcGVuXCI6IFwi44OO44O844OI44KS6ZaL44GPXCIsXG4gICAgXCJOZXcgLi4uXCI6IFwi5paw6KaPIC4uLlwiLFxuICAgIFwiTmV3XCI6IFwi5paw6KaP44OO44O844OIXCIsXG4gICAgXCJDbG9zZVwiOiBcIumWieOBmOOCi1wiLFxuICAgIFwiQ2xvc2UgQWxsXCI6IFwi44GZ44G544Gm44KS6ZaJ44GY44KLXCIsXG4gICAgXCJOb3RlIFNldHRpbmdzIC4uLlwiOiBcIuODjuODvOODiOioreWumiAuLi5cIixcbiAgICBcIkV4cG9ydFwiOiBcIuabuOOBjeWHuuOBl1wiLFxuICAgIFwiSW1wb3J0XCI6IFwi6Kqt44G/6L6844G/XCIsXG4gICAgXCIuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uXCI6IFwiLmNzbmYgKENMSVAgU1RVRElPIOODjeODvOODoOODleOCoeOCpOODqykgLi4uXCIsXG4gICAgXCIucGRmIChQREYpIC4uLlwiOiBcIi5wZGYgKFBERikgLi4uXCIsXG4gICAgXCIudHh0IChQbGFpbiBUZXh0KSAuLi5cIjogXCIudHh0ICjjg4bjgq3jgrnjg4jjg5XjgqHjgqTjg6spIC4uLlwiLFxuICAgIFwiU2F2ZVwiOiBcIuS/neWtmFwiLFxuICAgIFwiU2F2ZSBBcyAuLi5cIjogXCLlkI3liY3jgpLjgaTjgZHjgabkv53lrZggLi4uXCIsXG4gICAgXCJTYXZlIEFzXCI6IFwi5ZCN5YmN44KS44Gk44GR44Gm5L+d5a2YXCIsXG4gICAgXCJTYXZlIFNuYXBzaG90IEFzIC4uLlwiOiBcIuODkOODg+OCr+OCouODg+ODl+OCkuS/neWtmCAuLi5cIixcbiAgICBcIkVkaXRcIjogXCLnt6jpm4ZcIixcbiAgICBcIlVuZG9cIjogXCLlj5bjgormtojjgZdcIixcbiAgICBcIlJlZG9cIjogXCLjgoTjgornm7TjgZdcIixcbiAgICBcIkN1dFwiOiBcIuWIh+OCiuWPluOCilwiLFxuICAgIFwiQ29weVwiOiBcIuOCs+ODlOODvFwiLFxuICAgIFwiUGFzdGVcIjogXCLosrzjgorku5jjgZFcIixcbiAgICBcIlNlbGVjdCBBbGxcIjogXCLjgZnjgbnjgabjgpLpgbjmip5cIixcblxuICAgIFwiUGFnZVwiOiBcIuODmuODvOOCuFwiLFxuICAgIFwiQWRkXCI6IFwi6L+95YqgXCIsXG4gICAgXCJNb3ZlIHRvIEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOBq+WFpeOCjOOCi1wiLFxuICAgIFwiUHV0IEJhY2sgZnJvbSBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgYvjgonmiLvjgZlcIixcbiAgICBcIkVtcHR5IEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOCkuepuuOBq+OBmeOCi1wiLFxuICAgIFwiRHVwbGljYXRlXCI6IFwi6KSH6KO944KS6L+95YqgXCIsXG4gICAgXCJNb3ZlIEZvcndhcmRcIjogXCLliY3jgavnp7vli5VcIixcbiAgICBcIk1vdmUgQmFja3dhcmRcIjogXCLlvozjgo3jgavnp7vli5VcIixcbiAgICBcIkZsaXBcIjogXCLlt6blj7Plj43ou6LjgZfjgabooajnpLpcIixcbiAgICBcIlNhdmUgSW1hZ2UgQXMgLi4uXCI6IFwi44Kk44Oh44O844K444KS5L+d5a2YIC4uLlwiLFxuICAgIFwiU2F2ZSBJbWFnZVwiOiBcIuOCpOODoeODvOOCuOOCkuS/neWtmFwiLFxuICAgIFxuICAgIFwiVW50aXRsZWRcIjogXCLlkI3np7DmnKroqK3lrppcIixcbiAgICBcIlZpZXdcIjogXCLooajnpLpcIixcbiAgICBcIlRvb2wgQmFyXCI6IFwi44OE44O844Or44OQ44O8XCIsXG4gICAgXCJTaWRlIEJhclwiOiBcIuOCteOCpOODieODkOODvFwiLFxuICAgIFwiRGV2ZWxvcGVyIFRvb2xzXCI6IFwi44OH44OZ44Ot44OD44OR44O8IOODhOODvOODq1wiLFxuICAgIFwiRnVsbCBTY3JlZW5cIjogXCLjg5Xjg6vjgrnjgq/jg6rjg7zjg7NcIixcbiAgICBcIlBhZ2UgTWFyZ2luXCI6IFwi5L2Z55m9XCIsXG4gICAgXCJOdW1iZXIgb2YgUGFnZXMgcGVyIFJvd1wiOiBcIjHooYzjgYLjgZ/jgorjga7jg5rjg7zjgrjmlbBcIixcbiAgICBcIlpvb20gSW5cIjogXCLmi6HlpKdcIixcbiAgICBcIlpvb20gT3V0XCI6IFwi57iu5bCPXCIsXG4gICAgXG4gICAgXCJXaW5kb3dcIjogXCLjgqbjgqPjg7Pjg4njgqZcIixcbiAgICBcIkV4dHJhY3QgVGV4dFwiOiBcIuODhuOCreOCueODiOOCkuaKveWHulwiLFxuICAgIFwiT3BlbiBSZWNlbnRcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjgpLplovjgY9cIixcbiAgICBcIkNsZWFyIFJlY2VudCBOb3RlIExpc3RcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjga7jg6rjgrnjg4jjgpLmtojljrtcIixcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJNYWtpbmcgQ1NORiAuLi5cIjogXCJDU05G44OV44Kh44Kk44Or44KS5L2c5oiQ5LitIC4uLlwiLFxuICAgIFwiT25saW5lIFN0b3JhZ2VcIjogXCLjgqrjg7Pjg6njgqTjg7Pjgrnjg4jjg6zjg7zjgrhcIixcblxuICAgIFwiUGFnZXNcIjogXCLjg5rjg7zjgrhcIixcbiAgICBcIlRleHRzXCI6IFwi44OG44Kt44K544OIXCIsXG5cbiAgICBcIlNpZGUgQmFyIFBvc2l0aW9uXCI6IFwi44K144Kk44OJ44OQ44O844Gu5L2N572uXCIsXG4gICAgXCJMZWZ0XCI6IFwi5bemXCIsXG4gICAgXCJSaWdodFwiOiBcIuWPs1wiLFxuICAgIFxuICAgIFwiU1wiOiBcIuWwj1wiLFxuICAgIFwiTVwiOiBcIuS4rVwiLFxuICAgIFwiTFwiOiBcIuWkp1wiLFxuICAgIFwiUHJlc3N1cmVcIjogXCLnrYblnKdcIixcbiAgICBcIlZlcnRpY2FsXCI6IFwi57im5pu444GNXCIsXG4gICAgXCJIb3Jpem9udGFsXCI6IFwi5qiq5pu444GNXCIsXG5cbiAgICBcIk5ldyBub3RlYm9va1wiOiBcIuaWsOimj+ODjuODvOODiFwiLFxuICAgIFwiTm90ZWJvb2sgbmFtZVwiOiBcIuODjuODvOODiOWQjVwiLFxuICAgIFwiRm9sZGVyXCI6IFwi5L+d5a2Y5YWIXCIsXG4gICAgXCJDaG9vc2UgZm9sZGVyLi4uXCI6IFwi5Y+C54WnLi4uXCIsXG4gICAgXCJOdW1iZXIgb2YgcGFnZXNcIjogXCLjg5rjg7zjgrjmlbBcIixcbiAgICBcIlRlbXBsYXRlXCI6IFwi44OG44Oz44OX44Os44O844OIXCIsXG4gICAgXCJNYW5nYVwiOiBcIua8q+eUu1wiLFxuICAgIFwiQmluZGluZyBwb2ludFwiOiBcIue2tOOBmOOCi+S9jee9rlwiLFxuICAgIFwiTGVmdCBiaW5kaW5nXCI6IFwi5bem57a044GY44CAXCIsXG4gICAgXCJSaWdodCBiaW5kaW5nXCI6IFwi5Y+z57a044GY44CAXCIsXG4gICAgXCJTdGFydCBwYWdlXCI6IFwi6ZaL5aeL44Oa44O844K4XCIsXG4gICAgXCJGcm9tIGxlZnRcIjogXCLlt6bjg5rjg7zjgrhcIixcbiAgICBcIkZyb20gcmlnaHRcIjogXCLlj7Pjg5rjg7zjgrhcIixcbiAgICBcIlBhZ2VzXCI6IFwi44Oa44O844K4XCIsXG4gICAgXCJBbGxcIjogXCLjgZnjgbnjgaZcIixcbiAgICBcIkN1cnJlbnQgcGFnZVwiOiBcIumBuOaKnuOBleOCjOOBn+ODmuODvOOCuFwiLFxuICAgIFwiUmFuZ2VcIjogXCLnr4Tlm7LmjIflrppcIixcbiAgICBcIlNjYWxlXCI6IFwi5ouh5aSnL+e4ruWwj1wiLFxuICAgIFwiQ3VzdG9tXCI6IFwi44Kr44K544K/44OgXCIsXG4gICAgXCJUZXh0IGNvbG9yXCI6IFwi44OG44Kt44K544OI44Gu6ImyXCIsXG4gICAgXCIxMDAlXCI6IFwiQjXllYbmpa3oqoznlKgoQjTjgrXjgqTjgrrljp/nqL/nlKjntJkvQTTku5XkuIrjgYzjgoopXCIsXG4gICAgXCI4MiVcIjogXCJBNeWQjOS6uuiqjOeUqChBNOOCteOCpOOCuuWOn+eov+eUqOe0mS9CNeS7leS4iuOBjOOCiilcIixcbiAgICBcIk5hbWUgY2hhbmdlciBjb21wYXRpYmxlXCI6IFwi44K544OI44O844Oq44O844Ko44OH44Kj44K/55So44ON44O844Og44OB44Kn44Oz44K444Oj44O85LqS5o+bXCIsXG5cbiAgICBcIkV4cG9ydCBDTElQIFNUVURJTyBTdG9yeWJvYXJkXCI6IFwiQ0xJUCBTVFVESU8g44ON44O844Og5pu444GN5Ye644GXXCIsXG4gICAgXCJFeHBvcnQgUERGXCI6IFwiUERG5pu444GN5Ye644GXXCIsXG4gICAgXCJJbXBvcnQgUGxhaW4gVGV4dFwiOiBcIuODhuOCreOCueODiOiqreOBv+i+vOOBv1wiLFxuICAgIFwiUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdFwiOiBcIuWIneacn+ioreWumuOBq+aIu+OBmVwiLFxuXG4gICAgXCJGaWxlIG5hbWVcIjogXCLjg5XjgqHjgqTjg6vlkI1cIixcbiAgICBcIkR1cGxpY2F0ZSBub3RlIG5hbWUuXCI6IFwi5ZCM44GY5ZCN5YmN44Gu44OO44O844OI44GM44GC44KK44G+44GZ44CCXCIsXG4gICAgXCJEdXBsaWNhdGUgZmlsZSBuYW1lLlwiOiBcIuWQjOOBmOWQjeWJjeOBruODleOCoeOCpOODq+OBjOOBguOCiuOBvuOBmeOAglwiLFxuICAgIFwiRmlsZSBub3QgZm91bmQuXCI6IFwi44OV44Kh44Kk44Or44GM6KaL44Gk44GL44KK44G+44Gb44KT44CCXCIsXG4gICAgXCJGaWxlIG9wZW4gZXJyb3IuXCI6IFwi44GT44Gu44OV44Kh44Kk44Or44Gv6ZaL44GR44G+44Gb44KT44CCXCIsXG4gICAgXCJTYXZlIGVycm9yLlwiOiBcIuOCu+ODvOODluOBp+OBjeOBvuOBm+OCk+OAglwiLFxuICAgIFwiU2VsZWN0IGZpbGUgdG8gaW1wb3J0XCI6IFwi6Kqt44G/6L6844KA44OV44Kh44Kk44Or44KS6YG45oqe44GX44Gm44GP44Gg44GV44GEXCIsXG4gICAgXCJDb21wcmVzc2luZ1wiOiBcIuWcp+e4ruS4rVwiLFxuICAgIFwiUmVuZGVyaW5nXCI6IFwi5L2c5oiQ5LitXCIsXG5cbiAgICBcIkZvcm1hdFwiOiBcIuODleOCqeODvOODnuODg+ODiFwiLFxuICAgIFwiTGluZSBzZXBhcmF0b3JcIjogXCLmlLnooYxcIixcbiAgICBcIkJhbGxvb24gc2VwYXJhdG9yXCI6IFwi5pS544K744Oq44OVXCIsXG4gICAgXCJQYWdlIHNlcGFyYXRvclwiOiBcIuaUueODmuODvOOCuFwiLFxuICAgIFwiQ29tbWVudCBrZXlcIjogXCLjgrPjg6Hjg7Pjg4hcIixcbiAgICBcIkNob29zZSBmaWxlLi4uXCI6IFwi44OV44Kh44Kk44Or44KS6YG45oqeLi4uXCIsXG4gICAgXG4gICAgXCJUcmlhbFwiOiBcIuippueUqOeJiFwiLFxuICAgIFwiV2VsY29tZSB0byB0aGUgdHJpYWwgdmVyc2lvbiBvZiBOYW1lbm90ZS5cXG5Zb3UgaGF2ZSBcIjogXCLjgYLjgahcIixcbiAgICBcIiBkYXkocykgbGVmdC5cIjogXCLml6XjgZDjgonjgYToqabnlKjjgafjgY3jgb7jgZnjgIJcXG7jgYLjgorjgYzjgajjgYbjgZTjgZbjgYTjgb7jgZnvvIFcIiwgXG4gICAgXCJXZSdyZSBzb3JyeSwgYnV0IHlvdXIgdHJpYWwgcGVyaW9kIGhhcyBleHBpcmVkLlwiOiBcIuippueUqOacn+mWk+e1guS6huOBl+OBvuOBl+OBn+OAglxcbuOBguOCiuOBjOOBqOOBhuOBlOOBluOBhOOBvuOBl+OBn++8gVwiLCBcblxuICAgIFwiWm9vbSBzbWFsbCB0ZXh0cyBvbiBpbnB1dFwiOiBcIuWwj+OBleOBhOODhuOCreOCueODiOOCkue3qOmbhuOBmeOCi+OBqOOBjeOBr+aLoeWkp+ihqOekuuOBmeOCi1wiLFxuICAgIFwiVXNlIFF1aWNrbGluZVwiIDogXCLplbfmirzjgZfjgafnm7Tnt5rjg4Tjg7zjg6vjgavliIfjgormm7/jgYjjgotcIixcbiAgICBcIkRpc2FibGUgd2ludGFiIGRyaXZlclwiOiBcIldpbnRhYuODieODqeOCpOODkOOCkuS9v+OCj+OBquOBhFwiLFxuICAgIFwiRGlzYWJsZSBtb3VzZSB3aGVlbCBzY3JvbGxcIjogXCLjg57jgqbjgrnjg5vjgqTjg7zjg6vjgafjgrnjgq/jg63jg7zjg6vjgZfjgarjgYRcIixcbiAgICBcIkNsaWNrIE9LIHRvIHJlc3RvcmUgZGVmYXVsdCBzZXR0aW5ncy5cIjogXCLjg4fjg5Xjgqnjg6vjg4jjga7oqK3lrprjgavmiLvjgZfjgb7jgZlcIixcbiAgICBcIlBlbiBwcmVzc3VyZVwiOiBcIuethuWcp1wiLFxuICAgIFwiT3V0cHV0XCI6IFwi5Ye65YqbXCIsXG4gICAgXG4gICAgXCJFbmFibGUgSmFwYW5lc2UgT3B0aW9uc1wiOiBcIuaXpeacrOiqnueUqOOBruOCquODl+OCt+ODp+ODs+OCkuacieWKueOBq+OBmeOCi1wiXG4gIH1cbn1cblxuZXhwb3J0cy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeVxuIl19
