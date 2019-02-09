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

////////////////////////////////////////////////////////////////
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
      var _this = this;

      return new Promise(function (resolve, reject) {
        var buttons = {};
        buttons[T('Ok')] = resolve;

        var string = _locale.locale.translateHTML("\n        <center>\n          <img src='./img/namenote1024.png' width=\"100px\" />\n          <br>\n          Namenote v".concat(_namenote.namenote.version, "\n          <br><br>\n          <small>Copyright (c) Funige</small>\n        </center>"));

        $(_this.element).html(string);
        $(_this.element).dialog({
          autoOpen: false,
          position: {
            my: 'center center',
            at: 'center center'
          },
          title: T('About Namenote'),
          modal: true,
          width: 600,
          buttons: buttons
        });
      });
    }
  }]);

  return AboutDialog;
}();

var aboutDialog = new AboutDialog();
exports.aboutDialog = aboutDialog;

},{"./dialog.es6":6,"./locale.es6":12,"./namenote.es6":18}],2:[function(require,module,exports){
'use strict';

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

window.namenote = _namenote.namenote;
window.T = _locale.locale.translate;

window.PX = function (x) {
  return x + 'px';
};

window.LOG = console.log.bind(window.console);
window.WARN = console.warn.bind(window.console);
window.ERROR = console.error.bind(window.console);
document.addEventListener("DOMContentLoaded", function () {
  _namenote.namenote.init();
});

},{"./locale.es6":12,"./namenote.es6":18}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.command = void 0;

var _namenote = require("./namenote.es6");

var _divider = require("./divider.es6");

var _toolButton = require("./tool-button.es6");

var _sideBarTab = require("./side-bar-tab.es6");

var _projectManager = require("./project-manager.es6");

var _flash = require("./flash.es6");

var _dialog = require("./dialog.es6");

var _aboutDialog = require("./about-dialog.es6");

var _messageBox = require("./message-box.es6");

var _openNewDialog2 = require("./open-new-dialog.es6");

var _tabletSettingsDialog = require("./tablet-settings-dialog.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _runMain = function _runMain(message, data) {
  if (_namenote.namenote.app) {
    LOG('runMain', message, data);

    _namenote.namenote.app.runMain(message, data);
  } else {
    LOG("".concat(message, ": can`t execute this command on browser."));
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
      LOG('undo');
    }
  }, {
    key: "redo",
    value: function redo() {
      LOG('redo');
    }
  }, {
    key: "auth",
    value: function auth(options) {
      _dialog.dialog.open(_messageBox.messageBox, {
        title: 'Authenticate',
        message: 'Namenote would like access to the files in your Dropbox.',
        ok: 'Connect to Dropbox',
        cancel: 'Cancel'
      }).then(function (responce) {
        _dialog.dialog.current.showProgress(T('Connecting ...'));

        var Dropbox = require('dropbox').Dropbox;

        var dbx = new Dropbox({
          clientId: 'cex5vkoxd9nwj48'
        });
        var authUrl = dbx.getAuthenticationUrl('http://localhost:8080/namenote/auth');

        _flash.flash.save(options);

        location.href = authUrl;
      }).catch(function (error) {
        if (error) _dialog.dialog.open(_messageBox.messageBox, {
          type: 'error',
          message: error
        });
      });
    }
  }, {
    key: "about",
    value: function about() {
      _dialog.dialog.open(_aboutDialog.aboutDialog).then(function () {
        _dialog.dialog.close();
      });
    }
  }, {
    key: "pen",
    value: function pen(e) {
      LOG('pen');

      _toolButton.toolButton.select('pen');
    }
  }, {
    key: "eraser",
    value: function eraser(e) {
      LOG('eraser');

      _toolButton.toolButton.select('eraser');
    }
  }, {
    key: "text",
    value: function text(e) {
      LOG('text');

      _toolButton.toolButton.select('text');
    }
  }, {
    key: "sideBar",
    value: function sideBar() {
      LOG('sideBar');

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
    key: "openNewDialog",
    value: function openNewDialog() {
      _dialog.dialog.open(_openNewDialog2.openNewDialog).then(function () {
        _dialog.dialog.close();
      }).catch(function (error) {
        if (error) {
          _dialog.dialog.open(_messageBox.messageBox, {
            type: 'error',
            message: error
          }).then(function () {
            _dialog.dialog.close();
          });
        }
      });
    }
  }, {
    key: "openDialog",
    value: function openDialog() {
      if (_namenote.namenote.app) {
        _namenote.namenote.app.openDialog().then(function (url) {
          WARN("openDialog '".concat(url, "'..."));

          _projectManager.projectManager.open(url);
        }).then(function (project) {
          WARN('[project]', project);
        }).catch(function (error) {
          if (error) _dialog.dialog.open(_messageBox.messageBox, {
            type: 'error',
            message: error
          });
        });
      } else {
        var accessToken = localStorage.getItem('namenote/raw_token');

        if (accessToken) {
          var fetch = require('isomorphic-fetch'); // or another library of choice.


          var Dropbox = require('dropbox').Dropbox;

          var dbx = new Dropbox({
            fetch: fetch,
            accessToken: accessToken
          });
          dbx.filesListFolder({
            path: ''
          }).then(function (response) {
            console.log(response);
          }).catch(function (error) {
            console.log(error);
          });
          return; ///////////////////////////////////////////////////////////////
        } else {
          return this.auth(['openDialog']);
        }
      }
    }
  }, {
    key: "open",
    value: function open(url) {
      if (_namenote.namenote.app) {
        WARN("open '".concat(url, "'..."));

        _projectManager.projectManager.open(url).then(function (project) {
          WARN('[project]', project);
        }).catch(function (error) {
          if (error) _dialog.dialog.open(_messageBox.messageBox, {
            type: 'error',
            message: error
          });
        });
      } else {
        return this.auth(['open', url]);
      }
    }
  }, {
    key: "close",
    value: function close() {
      _projectManager.projectManager.close();
    }
  }, {
    key: "zoom",
    value: function zoom() {
      LOG('zoom');
    }
  }, {
    key: "unzoom",
    value: function unzoom() {
      LOG('unzoom');
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
    value: function toggleEditMode() {}
  }, {
    key: "tabletSettings",
    value: function tabletSettings() {
      _dialog.dialog.open(_tabletSettingsDialog.tabletSettingsDialog).then(function () {
        _dialog.dialog.close();
      }).catch(function () {
        _dialog.dialog.close();
      });
    } //////////////////

  }, {
    key: "do",
    value: function _do(item, data) {
      if (item && this[item]) {
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

},{"./about-dialog.es6":1,"./dialog.es6":6,"./divider.es6":7,"./flash.es6":8,"./message-box.es6":17,"./namenote.es6":18,"./open-new-dialog.es6":19,"./project-manager.es6":22,"./side-bar-tab.es6":27,"./tablet-settings-dialog.es6":29,"./tool-button.es6":33,"dropbox":39,"isomorphic-fetch":40}],4:[function(require,module,exports){
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
    value: function open(widget, options) {
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

      setTimeout(function () {
        $(widget.element).dialog('open');
      }, 200);
      return widget.init(options);
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
      LOG('[update]');
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
      LOG("[divider drag end]");
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

},{"./config.es6":5,"./view-button.es6":35}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flash = void 0;

var _command = require("./command.es6");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var Flash =
/*#__PURE__*/
function () {
  function Flash() {
    _classCallCheck(this, Flash);
  }

  _createClass(Flash, [{
    key: "save",
    value: function save(item, data) {
      var json = JSON.stringify([item, data]);
      localStorage.setItem('namenote/flash', json);
    }
  }, {
    key: "load",
    value: function load() {
      var json = localStorage.getItem('namenote/flash');
      localStorage.removeItem('namenote/flash');

      if (json) {
        var options = JSON.parse(json);

        _command.command.do.apply(_command.command, _toConsumableArray(options));
      }
    }
  }]);

  return Flash;
}();

var flash = new Flash();
exports.flash = flash;

},{"./command.es6":3}],9:[function(require,module,exports){
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

},{"./command.es6":3,"./project-manager.es6":22}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
          LOG("".concat(click), "".concat(data));

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

},{"./command.es6":3,"./menu.es6":16,"./namenote.es6":18,"./recent-url.es6":24}],12:[function(require,module,exports){
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

},{"../js/lib/dictionary.js":38}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MainView = void 0;

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

  function MainView(element) {
    var _this;

    _classCallCheck(this, MainView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MainView).call(this, element));

    _this.init();

    return _this;
  }

  _createClass(MainView, [{
    key: "init",
    value: function init() {
      this.scale = 1;
      /*    
          const pageWidth = 1000
          const pageHeight = 768
      
          for (let j = 0; j < 10; j++) {
            for (let i = 0; i < 10; i++) {
              const page = document.createElement('div')
              page.style.width = PX(pageWidth)
              page.style.height = PX(pageHeight)
              page.style.backgroundColor = "white"
              page.style.outline = "1px solid rgba(0,0,0,0.3)"
      
              const x = i * (pageWidth + 50) + 50
              const y = j * (pageHeight + 50) + 50
              page.style.position = 'absolute'
              page.style.left = PX(x)
              page.style.top = PX(y)
              page.style.transformOrigin = "top left"
              page.style.transform = "scale(1.0)"
              
              const pageNumber = document.createElement('div')
              pageNumber.innerHTML = (j * 10 + i + 1) + "ページ"
              pageNumber.style.fontSize = '12px' // 11px以下は変わらない
              pageNumber.style.position = 'absolute'
              pageNumber.style.left = PX(pageWidth / 2)
              pageNumber.style.top = PX(pageHeight + 20)
      
              page.appendChild(pageNumber)
              this.element.appendChild(page)
          }
          }
      */
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

exports.MainView = MainView;

},{"./namenote.es6":18,"./view.es6":36}],14:[function(require,module,exports){
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

},{"./command.es6":3,"./html-menu.es6":11,"./menu-template.es6":15,"./menu.es6":16,"./project-manager.es6":22}],15:[function(require,module,exports){
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
  }, //    { label: 'Close', click: 'close' },
  //    { label: 'Close All', click: 'closeAll' },
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
  submenu: [//    { label: 'Close', click: 'close' },
  //    { label: 'Close All', click: 'closeAll' },
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
  label: 'About Namenote ...',
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

},{}],16:[function(require,module,exports){
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
      setState(template, 'Developer Tools', isApp); //  setState(template, 'Open ...', isApp)

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

},{"./html-menu.es6":11,"./menu-template.es6":15,"./namenote.es6":18,"./project-manager.es6":22,"./recent-url.es6":24}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageBox = void 0;

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

var _dialog = require("./dialog.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var headerImage = {
  confirm: './img/checked.png',
  error: './img/exclamation-mark.png' ////////////////////////////////////////////////////////////////

};

var MessageBox =
/*#__PURE__*/
function () {
  function MessageBox() {
    _classCallCheck(this, MessageBox);

    this.id = 'message-box';
    this.element = null;
  }

  _createClass(MessageBox, [{
    key: "init",
    value: function init(options) {
      var _this = this;

      options = options || {};
      return new Promise(function (resolve, reject) {
        var buttons = {};
        buttons[T(options.ok || 'Ok')] = resolve;

        if (options.cancel) {
          buttons[T(options.cancel || 'Cancel')] = reject;
        }

        var string = _locale.locale.translateHTML("\n        <div class='message-box'><p>\n          ".concat(_this.getHeader(options), "\n          ").concat(_this.getMessage(options), "\n        </p></div>\n        <div class='dialog-message'></div>"));

        $(_this.element).html(string);
        $(_this.element).dialog({
          autoOpen: false,
          position: {
            my: 'center center',
            at: 'center center'
          },
          title: T(options.title || ''),
          modal: true,
          width: options.width || 350,
          buttons: buttons
        });
      });
    }
  }, {
    key: "getMessage",
    value: function getMessage(options) {
      return T(options.message) || '';
    }
  }, {
    key: "getHeader",
    value: function getHeader(options) {
      if (headerImage[options.type]) {
        return "<img src=\"".concat(headerImage[options.type], "\" width=\"48px\" /><br><br>");
      } else {
        return '';
      }
    }
  }, {
    key: "showProgress",
    value: function showProgress(message) {
      var div = $(this.element).find('.dialog-message');
      div.html(message);
    }
  }]);

  return MessageBox;
}();

var messageBox = new MessageBox();
exports.messageBox = messageBox;

},{"./dialog.es6":6,"./locale.es6":12,"./namenote.es6":18}],18:[function(require,module,exports){
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

var _flash = require("./flash.es6");

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

    this.version = "2.0.0-alpha.3-debug";
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
      this.mainView = new _mainView.MainView($('.main-view')[0]);
      this.pageView = new _pageView.PageView($('.page-view')[0]);
      this.textView = new _textView.TextView($('.text-view')[0]);

      _flash.flash.load();
    }
  }, {
    key: "initBaseHandlers",
    value: function initBaseHandlers() {
      window.onresize = function (e) {
        setTimeout(function () {
          LOG('onresize', document.body.clientWidth, document.body.clientHeight);

          _ui.ui.update();
        }, 100);
      };

      window.oncontextmenu = function (e) {
        LOG('contextmenu');
        return false;
      };
    }
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

},{"./command.es6":3,"./config.es6":5,"./flash.es6":8,"./main-view.es6":13,"./page-view.es6":20,"./project-manager.es6":22,"./recent-url.es6":24,"./shortcut.es6":26,"./text-view.es6":30,"./ui.es6":34}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openNewDialog = void 0;

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

var _dialog = require("./dialog.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

////////////////////////////////////////////////////////////////
var OpenNewDialog =
/*#__PURE__*/
function () {
  function OpenNewDialog() {
    _classCallCheck(this, OpenNewDialog);

    this.id = 'open-new-dialog';
    this.element = null;
  }

  _createClass(OpenNewDialog, [{
    key: "init",
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var buttons = {};
        buttons[T('Ok')] = resolve;
        buttons[T('Cancel')] = reject;

        var string = _locale.locale.translateHTML("\n        <table>\n          <tr><td>T(Notebook name):\n            <td><input name='name' class='name' type='text' value='' />\n\t  \n          <tr><td>T(Folder):\n            <td><input name='dir' class='dir' type='text' value='' disabled />\n\t    <input name='ref' class='ref' type='button' value='T(Choose folder...)' />\n\n          <tr><td>T(Number of pages):\n            <td><input name='count' class='count' type='text' value=8 /><br>\n\n          <tr><td style='height: 1em;'>\n          <tr><td>T(Template):\n\t    <td><select name='tmpl' class='tmpl'>\n\t      <option value='Manga'>T(Manga)</select>\n\n          <tr><td>T(Binding point):\n            <td><label><input name='bind' type='radio' value=0>T(Left binding)</label>\n            <label><input name='bind' type='radio' checked value=1>T(Right binding)</label>\n\n          <tr><td>T(Start page):\n            <td><label><input name='start' type='radio' value=0 checked>T(From left)</label>\n\t    <label><input name='start' type='radio' value=1>T(From right)</label>\n\n            <input type='submit' style='display: none' />\n        </table>");

        $(_this.element).html("<form id='open-new'>".concat(string, "</form>"));
        $(_this.element).dialog({
          autoOpen: false,
          position: {
            my: 'center center',
            at: 'center center'
          },
          title: T('New'),
          modal: true,
          width: 550,
          buttons: buttons
        });
      });
    }
  }, {
    key: "saveParams",
    value: function saveParams() {}
  }]);

  return OpenNewDialog;
}();

var openNewDialog = new OpenNewDialog();
exports.openNewDialog = openNewDialog;

},{"./dialog.es6":6,"./locale.es6":12,"./namenote.es6":18}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageView = void 0;

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

  function PageView(element) {
    var _this;

    _classCallCheck(this, PageView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PageView).call(this, element));

    _this.init();

    return _this;
  }

  _createClass(PageView, [{
    key: "init",
    value: function init() {}
  }]);

  return PageView;
}(_view.View);

exports.PageView = PageView;

},{"./view.es6":36}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{"./main-view.es6":13,"./menu.es6":16,"./project.es6":23,"./recent-url.es6":24,"./title.es6":31,"./view-button.es6":35}],23:[function(require,module,exports){
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

},{"./page.es6":21}],24:[function(require,module,exports){
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

},{"./menu.es6":16,"./project-manager.es6":22}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
'use strict'; //import { namenote } from './namenote.es6'

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortcut = void 0;

var _shortcutDefault = require("./shortcut-default.es6");

var _command = require("./command.es6");

var _dialog = require("./dialog.es6");

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
              LOG('keycode=', e.keyCode, e)
      
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
          LOG("'".concat(item));
          Mousetrap.bind(key, function (e) {
            _command.command.prev = _command.command.current;
            _command.command.current = item;

            if (!_dialog.dialog.isOpen()) {
              LOG("*".concat(item, "*"));
              handler();
            }

            return false; //	  handler()
            //	  return (dialog.isOpen()) ? true : false
          }, 'keydown');
        } else {
          LOG("'".concat(item, "': no such command"));
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
      //    if (dialog.isOpen()) return true
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

},{"./command.es6":3,"./dialog.es6":6,"./shortcut-default.es6":25}],27:[function(require,module,exports){
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

},{"./command.es6":3}],28:[function(require,module,exports){
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

},{"./side-bar-tab.es6":27}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabletSettingsDialog = void 0;

var _namenote = require("./namenote.es6");

var _locale = require("./locale.es6");

var _config = require("./config.es6");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var width = 200;
var d = 15;

function decodePosition(string) {
  var array = string.split(',');
  var x = parseFloat(array[0] || 0);
  var y = parseFloat(array[1] || 0);
  return {
    left: x * width - d,
    top: (1.0 - y) * width - d
  };
}

function encodePosition(id) {
  var e = document.getElementById(id);
  var x = (parseFloat(e.style.left || 0) + d) / width;
  var y = (parseFloat(e.style.top || 0) + d) / width;
  return "".concat(x, ",").concat(1.0 - y);
} ////////////////////////////////////////////////////////////////


var TabletSettingsDialog =
/*#__PURE__*/
function () {
  function TabletSettingsDialog() {
    _classCallCheck(this, TabletSettingsDialog);

    this.id = 'tablet-settings-dialog';
    this.element = null;
  }

  _createClass(TabletSettingsDialog, [{
    key: "init",
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var buttons = {};
        buttons[T('Ok')] = resolve;
        buttons[T('Cancel')] = reject;

        var string = _locale.locale.translateHTML("\n        <div style=\"width:300px; height:250px; font-size:12px;\">\n          <div id=\"tablet-curve-container\">\n            <canvas id=\"tablet-curve\" width=\"".concat(width, "px\" height=\"").concat(width, "px\" style=\"width:").concat(width, "px; height:").concat(width, "px; border: 1px solid black\"></canvas>\n\n            <div style=\"top:-15px; left:-205px; width: 200px; text-align:right;\">100%</div>\n            <div style=\"top:85px; left:-205px; width: 200px; text-align:right;\">T(Output)</div>\n            <div style=\"top:185px; left:-205px; width: 200px; text-align:right;\">0%</div>\n\n            <div style=\"left:0px; top:200px;\">0%</div>\n            <div style=\"left:100px; top:200px;\">T(Pen pressure)</div>\n            <div style=\"left:200px; top:200px;\">100%</div>\n\n            <div class=\"control-point\" id=\"tablet-curve-left\"><div></div></div>\n            <div class=\"control-point\" id=\"tablet-curve-right\"><div></div></div>\n            <div class=\"control-point\" id=\"tablet-curve-center\"><div></div></div>\n          </div>\n        </div>\n        <input type='submit' style='display: none' />\n        <input name='reset' class='reset' type='button' value='T(Reset Settings to Default)' />"));

        $(_this.element).html("<form id='tablet-settings'>".concat(string, "</form>"));
        $(_this.element).dialog({
          autoOpen: false,
          position: {
            my: 'center center',
            at: 'center center'
          },
          title: T('Tablet Settings'),
          modal: true,
          width: 360,
          buttons: buttons,
          open: function open() {
            $(this).parent().find('button:nth-child(1)').focus();
          }
        });
      });
    }
  }, {
    key: "saveParams",
    value: function saveParams() {}
  }]);

  return TabletSettingsDialog;
}();

var tabletSettingsDialog = new TabletSettingsDialog();
/*
const tabletSettingsDialog = {
  
  init: () => {
    $('#tablet-settings-dialog').dialog({
      autoOpen: true,
      position: { at:'center top+150px' },
      title: T('Tablet Settings'),
      modal: true,
      width: 360,
      buttons: { Ok: tabletSettingsDialog.ok, Cancel: tabletSettingsDialog.cancel },
      open: function() {
        $(this).parent().find('button:nth-child(1)').focus();
      }
o    })

    const string = locale.translateHTML(`
    <div style="width:300px; height:250px; font-size:12px;">
      <div id="tablet-curve-container">
        <canvas id="tablet-curve" width="${width}px" height="${width}px" style="width:${width}px; height:${width}px; border: 1px solid black"></canvas>

        <div style="top:-15px; left:-205px; width: 200px; text-align:right;">100%</div>
        <div style="top:85px; left:-205px; width: 200px; text-align:right;">T(Output)</div>
        <div style="top:185px; left:-205px; width: 200px; text-align:right;">0%</div>

        <div style="left:0px; top:200px;">0%</div>
        <div style="left:100px; top:200px;">T(Pen pressure)</div>
        <div style="left:200px; top:200px;">100%</div>

        <div class="control-point" id="tablet-curve-left" style="left:100px; top:-10px"><div></div></div>
        <div class="control-point" id="tablet-curve-right" style="left:200px; top:-20px;"><div></div></div>
        <div class="control-point" id="tablet-curve-center" style="left:0px; top:0px"><div></div></div>
      </div>
    </div>
    <input type='submit' style='display: none' />
    <input name='reset' class='reset' type='button' value='T(Reset Settings to Default)' />
    `)

    $('#tablet-settings-dialog').html(`<form id='tablet'>${string}</form>`)
    $('#tablet').on('submit', function() { return tabletSettingsDialog.ok() })
    document.forms['tablet'].reset.onclick = () => {
      tabletSettingsDialog.resetSettings()
    }
    
    $('#tablet-curve-left').draggable({
      axis: "y",
      drag: function(event, ui) {
        ui.position.top = helper.limit(ui.position.top, - d, width - d)
        tabletSettingsDialog.updateCanvas()
      }
    })
    $('#tablet-curve-right').draggable({
      axis: "y",
      drag: function(event, ui) {
        ui.position.top = helper.limit(ui.position.top, -d, width - d)
        tabletSettingsDialog.updateCanvas()
      }
    })
    $('#tablet-curve-center').draggable({
      drag: function(event, ui) {
        ui.position.top = helper.limit(ui.position.top, -d, width - d)
        ui.position.left = helper.limit(ui.position.left, -d, width - d)
        tabletSettingsDialog.updateCanvas()
      }
    })

    tabletSettingsDialog.initForm()
  },

  ok: () => {
    const curveLeft = encodePosition('tablet-curve-left')
    const curveRight = encodePosition('tablet-curve-right')
    const curveCenter = encodePosition('tablet-curve-center')
    config.data.tabletCurveLeft = curveLeft
    config.data.tabletCurveRight = curveRight
    config.data.tabletCurveCenter = curveCenter
    config.save()

    config.precalculatePressure();
    
    helper.closeDialog(tabletSettingsDialog)
    //$(tabletSettingsDialog.element).dialog('close')
    return false
  },

  cancel: () => {
    helper.closeDialog(tabletSettingsDialog)
    //$(tabletSettingsDialog.element).dialog('close')
  },

  initForm: () => {
    const curveLeft = config.getValue('tabletCurveLeft', '0,0')
    const curveRight = config.getValue('tabletCurveRight', '1,1')
    const curveCenter = config.getValue('tabletCurveCenter', '0.5,0.5')
    $('#tablet-curve-left').css(decodePosition(curveLeft))
    $('#tablet-curve-right').css(decodePosition(curveRight))
    $('#tablet-curve-center').css(decodePosition(curveCenter))
    tabletSettingsDialog.updateCanvas()
  },

  resetSettings: () => {
    config.data.tabletCurveLeft = '0,0'
    config.data.tabletCurveRight = '1,1'
    config.data.tabletCurveCenter = '0.5,0.5'
    config.save()
    
    tabletSettingsDialog.initForm()
  },
  
  show: () => {
    helper.openDialog(tabletSettingsDialog)
  },

  updateCanvas: () => {
    const canvas = $('#tablet-curve')[0]
    const ctx = canvas.getContext('2d')

    const left = document.getElementById('tablet-curve-left')
    const right = document.getElementById('tablet-curve-right')
    const center = document.getElementById('tablet-curve-center')
    const x0 = parseFloat(left.style.left) + d
    const y0 = parseFloat(left.style.top) + d
    const x1 = parseFloat(center.style.left) + d
    const y1 = parseFloat(center.style.top) + d
    const x2 = parseFloat(right.style.left) + d
    const y2 = parseFloat(right.style.top) + d

    ctx.clearRect(0, 0, width, width)
    ctx.lineWidth = 1

    ctx.beginPath()
    ctx.strokeStyle = '#ccc'
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.moveTo(x0, y0)
    ctx.quadraticCurveTo(x1, y1, x2, y2)
    ctx.stroke()
  },
}


export { tabletSettingsDialog }
*/

exports.tabletSettingsDialog = tabletSettingsDialog;

},{"./config.es6":5,"./locale.es6":12,"./namenote.es6":18}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextView = void 0;

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

  function TextView(element) {
    var _this;

    _classCallCheck(this, TextView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextView).call(this, element));

    _this.init();

    return _this;
  }

  _createClass(TextView, [{
    key: "init",
    value: function init() {}
  }]);

  return TextView;
}(_view.View);

exports.TextView = TextView;

},{"./namenote.es6":18,"./view.es6":36}],31:[function(require,module,exports){
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

},{"./namenote.es6":18}],32:[function(require,module,exports){
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

},{"./config.es6":5,"./history-button.es6":9,"./menu-button.es6":14,"./tool-button.es6":33,"./view-button.es6":35}],33:[function(require,module,exports){
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

},{"./command.es6":3,"./html-dropdown.es6":10}],34:[function(require,module,exports){
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
    value: function update() {
      WARN('[ui update]');

      _divider.divider.update(); //  toolBar.update()
      //  sideBar.update()
      //  divider.update()

    }
  }]);

  return UI;
}();

var ui = new UI();
exports.ui = ui;

},{"./dialog.es6":6,"./divider.es6":7,"./menu.es6":16,"./side-bar.es6":28,"./title.es6":31,"./tool-bar.es6":32,"./widget.es6":37}],35:[function(require,module,exports){
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

},{"./command.es6":3,"./config.es6":5,"./project-manager.es6":22}],36:[function(require,module,exports){
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
  function View(element) {
    _classCallCheck(this, View);

    this.element = element;
    this.preventScrollFreeze();
  }

  _createClass(View, [{
    key: "preventScrollFreeze",
    value: function preventScrollFreeze() {
      this.lastX = 0;
      this.lastY = 0;
      var scroller = $(this.element).parent();
      scroller.on('touchstart', function (e) {
        this.lastX = e.touches[0].clientX;
        this.lastY = e.touches[0].clientY;
      }.bind(this));
      scroller.on('touchmove', function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        var width = this.element.offsetWidth;
        var height = this.element.offsetHeight;
        var scrollTop = $(e.currentTarget).scrollTop();
        var scrollLeft = $(e.currentTarget).scrollLeft();
        var dirY = this.lastY - y < 0 ? 'up' : 'down';
        var dirX = this.lastX - x < 0 ? 'left' : 'right';

        if (scrollTop === 0) {
          if (dirY === "up") e.preventDefault();
        } else if (scrollTop >= e.currentTarget.scrollHeight - height) {
          if (dirY === "down") e.preventDefault();
        }

        if (scrollLeft === 0) {
          if (dirX === "left") e.preventDefault();
        } else if (scrollLeft >= e.currentTarget.scrollWidth - width) {
          if (dirX === "right") e.preventDefault();
        }

        this.lastX = x;
        this.lastY = y;
      }.bind(this));
    }
  }]);

  return View;
}();

exports.View = View;

},{}],37:[function(require,module,exports){
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
          width: '28px',
          height: '28px',
          locked: false,
          disabled: false
        },
        _create: function _create() {
          //      this.element.addClass('img-button')
          //      this.element.css('background-image', `url(${this.options.src})`)
          //      this.element.css('background', '#eeffdd')
          this.element.css('float', this.options.float);
          this.element.css('width', this.options.width);
          this.element.css('height', this.options.height);
          this.element.attr('title', T(this.element.attr('title')));
          this.element.html("<img src='".concat(this.options.src, "' />")); //      WARN(this.element.html())

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

},{}],38:[function(require,module,exports){
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
    "Window": "ウィンドウ",
    "Extract Text": "テキストを抽出",
    "Open Recent": "最近使用したノートを開く",
    "Clear Recent Note List": "最近使用したノートのリストを消去"
  }, _defineProperty(_ja, "Untitled", "名称未設定"), _defineProperty(_ja, "Making CSNF ...", "CSNFファイルを作成中 ..."), _defineProperty(_ja, "Online Storage", "オンラインストレージ"), _defineProperty(_ja, "Namenote would like access to the files in your Dropbox.", "Namenote は Dropbox にデータを保存します。<br>接続しますか？"), _defineProperty(_ja, "Authenticate", "認証"), _defineProperty(_ja, "Connect to Dropbox", "Dropbox に接続"), _defineProperty(_ja, "Cancel", "キャンセル"), _defineProperty(_ja, "Connecting ...", "接続中 ..."), _defineProperty(_ja, "Texts", "テキスト"), _defineProperty(_ja, "Side Bar Position", "サイドバーの位置"), _defineProperty(_ja, "Left", "左"), _defineProperty(_ja, "Right", "右"), _defineProperty(_ja, "S", "小"), _defineProperty(_ja, "M", "中"), _defineProperty(_ja, "L", "大"), _defineProperty(_ja, "Pressure", "筆圧"), _defineProperty(_ja, "Vertical", "縦書き"), _defineProperty(_ja, "Horizontal", "横書き"), _defineProperty(_ja, "New notebook", "新規ノート"), _defineProperty(_ja, "Notebook name", "ノート名"), _defineProperty(_ja, "Folder", "保存先"), _defineProperty(_ja, "Choose folder...", "参照..."), _defineProperty(_ja, "Number of pages", "ページ数"), _defineProperty(_ja, "Template", "テンプレート"), _defineProperty(_ja, "Manga", "漫画"), _defineProperty(_ja, "Binding point", "綴じる位置"), _defineProperty(_ja, "Left binding", "左綴じ　"), _defineProperty(_ja, "Right binding", "右綴じ　"), _defineProperty(_ja, "Start page", "開始ページ"), _defineProperty(_ja, "From left", "左ページ"), _defineProperty(_ja, "From right", "右ページ"), _defineProperty(_ja, "Pages", "ページ"), _defineProperty(_ja, "All", "すべて"), _defineProperty(_ja, "Current page", "選択されたページ"), _defineProperty(_ja, "Range", "範囲指定"), _defineProperty(_ja, "Scale", "拡大/縮小"), _defineProperty(_ja, "Custom", "カスタム"), _defineProperty(_ja, "Text color", "テキストの色"), _defineProperty(_ja, "100%", "B5商業誌用(B4サイズ原稿用紙/A4仕上がり)"), _defineProperty(_ja, "82%", "A5同人誌用(A4サイズ原稿用紙/B5仕上がり)"), _defineProperty(_ja, "Name changer compatible", "ストーリーエディタ用ネームチェンジャー互換"), _defineProperty(_ja, "Export CLIP STUDIO Storyboard", "CLIP STUDIO ネーム書き出し"), _defineProperty(_ja, "Export PDF", "PDF書き出し"), _defineProperty(_ja, "Import Plain Text", "テキスト読み込み"), _defineProperty(_ja, "Reset Settings to Default", "初期設定に戻す"), _defineProperty(_ja, "File name", "ファイル名"), _defineProperty(_ja, "Duplicate note name.", "同じ名前のノートがあります。"), _defineProperty(_ja, "Duplicate file name.", "同じ名前のファイルがあります。"), _defineProperty(_ja, "File not found.", "ファイルが見つかりません。"), _defineProperty(_ja, "File open error.", "このファイルは開けません。"), _defineProperty(_ja, "Save error.", "セーブできません。"), _defineProperty(_ja, "Select file to import", "読み込むファイルを選択してください"), _defineProperty(_ja, "Compressing", "圧縮中"), _defineProperty(_ja, "Rendering", "作成中"), _defineProperty(_ja, "Format", "フォーマット"), _defineProperty(_ja, "Line separator", "改行"), _defineProperty(_ja, "Balloon separator", "改セリフ"), _defineProperty(_ja, "Page separator", "改ページ"), _defineProperty(_ja, "Comment key", "コメント"), _defineProperty(_ja, "Choose file...", "ファイルを選択..."), _defineProperty(_ja, "Trial", "試用版"), _defineProperty(_ja, "Welcome to the trial version of Namenote.\nYou have ", "あと"), _defineProperty(_ja, " day(s) left.", "日ぐらい試用できます。\nありがとうございます！"), _defineProperty(_ja, "We're sorry, but your trial period has expired.", "試用期間終了しました。\nありがとうございました！"), _defineProperty(_ja, "Zoom small texts on input", "小さいテキストを編集するときは拡大表示する"), _defineProperty(_ja, "Use Quickline", "長押しで直線ツールに切り替える"), _defineProperty(_ja, "Disable wintab driver", "Wintabドライバを使わない"), _defineProperty(_ja, "Disable mouse wheel scroll", "マウスホイールでスクロールしない"), _defineProperty(_ja, "Click OK to restore default settings.", "デフォルトの設定に戻します"), _defineProperty(_ja, "Pen pressure", "筆圧"), _defineProperty(_ja, "Output", "出力"), _defineProperty(_ja, "Menu", "メニュー"), _defineProperty(_ja, "Pen", "ペン"), _defineProperty(_ja, "Eraser", "消しゴム"), _defineProperty(_ja, "Text", "テキスト"), _defineProperty(_ja, "Zoom In", "ズームイン"), _defineProperty(_ja, "Zoom Out", "ズームアウト"), _defineProperty(_ja, "Quick Zoom", "クイックズーム"), _defineProperty(_ja, "Enable Japanese Options", "日本語用のオプションを有効にする"), _ja)
};
exports.dictionary = dictionary;

},{}],39:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Dropbox=t()}(this,function(){"use strict";function e(){return"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope||"undefined"==typeof module||"undefined"!=typeof window}function t(e){return"https://"+e+".dropboxapi.com/2/"}function r(e){return JSON.stringify(e).replace(/[\u007f-\uffff]/g,function(e){return"\\u"+("000"+e.charCodeAt(0).toString(16)).slice(-4)})}function n(e){var t=e.length;if(t%4>0)throw Error("Invalid string. Length must be a multiple of 4");return"="===e[t-2]?2:"="===e[t-1]?1:0}var i={};i.authTokenFromOauth1=function(e){return this.request("auth/token/from_oauth1",e,"app","api","rpc")},i.authTokenRevoke=function(e){return this.request("auth/token/revoke",e,"user","api","rpc")},i.contactsDeleteManualContacts=function(e){return this.request("contacts/delete_manual_contacts",e,"user","api","rpc")},i.contactsDeleteManualContactsBatch=function(e){return this.request("contacts/delete_manual_contacts_batch",e,"user","api","rpc")},i.filePropertiesPropertiesAdd=function(e){return this.request("file_properties/properties/add",e,"user","api","rpc")},i.filePropertiesPropertiesOverwrite=function(e){return this.request("file_properties/properties/overwrite",e,"user","api","rpc")},i.filePropertiesPropertiesRemove=function(e){return this.request("file_properties/properties/remove",e,"user","api","rpc")},i.filePropertiesPropertiesSearch=function(e){return this.request("file_properties/properties/search",e,"user","api","rpc")},i.filePropertiesPropertiesSearchContinue=function(e){return this.request("file_properties/properties/search/continue",e,"user","api","rpc")},i.filePropertiesPropertiesUpdate=function(e){return this.request("file_properties/properties/update",e,"user","api","rpc")},i.filePropertiesTemplatesAddForTeam=function(e){return this.request("file_properties/templates/add_for_team",e,"team","api","rpc")},i.filePropertiesTemplatesAddForUser=function(e){return this.request("file_properties/templates/add_for_user",e,"user","api","rpc")},i.filePropertiesTemplatesGetForTeam=function(e){return this.request("file_properties/templates/get_for_team",e,"team","api","rpc")},i.filePropertiesTemplatesGetForUser=function(e){return this.request("file_properties/templates/get_for_user",e,"user","api","rpc")},i.filePropertiesTemplatesListForTeam=function(e){return this.request("file_properties/templates/list_for_team",e,"team","api","rpc")},i.filePropertiesTemplatesListForUser=function(e){return this.request("file_properties/templates/list_for_user",e,"user","api","rpc")},i.filePropertiesTemplatesRemoveForTeam=function(e){return this.request("file_properties/templates/remove_for_team",e,"team","api","rpc")},i.filePropertiesTemplatesRemoveForUser=function(e){return this.request("file_properties/templates/remove_for_user",e,"user","api","rpc")},i.filePropertiesTemplatesUpdateForTeam=function(e){return this.request("file_properties/templates/update_for_team",e,"team","api","rpc")},i.filePropertiesTemplatesUpdateForUser=function(e){return this.request("file_properties/templates/update_for_user",e,"user","api","rpc")},i.fileRequestsCreate=function(e){return this.request("file_requests/create",e,"user","api","rpc")},i.fileRequestsGet=function(e){return this.request("file_requests/get",e,"user","api","rpc")},i.fileRequestsList=function(e){return this.request("file_requests/list",e,"user","api","rpc")},i.fileRequestsUpdate=function(e){return this.request("file_requests/update",e,"user","api","rpc")},i.filesAlphaGetMetadata=function(e){return this.request("files/alpha/get_metadata",e,"user","api","rpc")},i.filesAlphaUpload=function(e){return this.request("files/alpha/upload",e,"user","content","upload")},i.filesCopyV2=function(e){return this.request("files/copy_v2",e,"user","api","rpc")},i.filesCopy=function(e){return this.request("files/copy",e,"user","api","rpc")},i.filesCopyBatchV2=function(e){return this.request("files/copy_batch_v2",e,"user","api","rpc")},i.filesCopyBatch=function(e){return this.request("files/copy_batch",e,"user","api","rpc")},i.filesCopyBatchCheckV2=function(e){return this.request("files/copy_batch/check_v2",e,"user","api","rpc")},i.filesCopyBatchCheck=function(e){return this.request("files/copy_batch/check",e,"user","api","rpc")},i.filesCopyReferenceGet=function(e){return this.request("files/copy_reference/get",e,"user","api","rpc")},i.filesCopyReferenceSave=function(e){return this.request("files/copy_reference/save",e,"user","api","rpc")},i.filesCreateFolderV2=function(e){return this.request("files/create_folder_v2",e,"user","api","rpc")},i.filesCreateFolder=function(e){return this.request("files/create_folder",e,"user","api","rpc")},i.filesCreateFolderBatch=function(e){return this.request("files/create_folder_batch",e,"user","api","rpc")},i.filesCreateFolderBatchCheck=function(e){return this.request("files/create_folder_batch/check",e,"user","api","rpc")},i.filesDeleteV2=function(e){return this.request("files/delete_v2",e,"user","api","rpc")},i.filesDelete=function(e){return this.request("files/delete",e,"user","api","rpc")},i.filesDeleteBatch=function(e){return this.request("files/delete_batch",e,"user","api","rpc")},i.filesDeleteBatchCheck=function(e){return this.request("files/delete_batch/check",e,"user","api","rpc")},i.filesDownload=function(e){return this.request("files/download",e,"user","content","download")},i.filesDownloadZip=function(e){return this.request("files/download_zip",e,"user","content","download")},i.filesGetMetadata=function(e){return this.request("files/get_metadata",e,"user","api","rpc")},i.filesGetPreview=function(e){return this.request("files/get_preview",e,"user","content","download")},i.filesGetTemporaryLink=function(e){return this.request("files/get_temporary_link",e,"user","api","rpc")},i.filesGetTemporaryUploadLink=function(e){return this.request("files/get_temporary_upload_link",e,"user","api","rpc")},i.filesGetThumbnail=function(e){return this.request("files/get_thumbnail",e,"user","content","download")},i.filesGetThumbnailBatch=function(e){return this.request("files/get_thumbnail_batch",e,"user","content","rpc")},i.filesListFolder=function(e){return this.request("files/list_folder",e,"user","api","rpc")},i.filesListFolderContinue=function(e){return this.request("files/list_folder/continue",e,"user","api","rpc")},i.filesListFolderGetLatestCursor=function(e){return this.request("files/list_folder/get_latest_cursor",e,"user","api","rpc")},i.filesListFolderLongpoll=function(e){return this.request("files/list_folder/longpoll",e,"noauth","notify","rpc")},i.filesListRevisions=function(e){return this.request("files/list_revisions",e,"user","api","rpc")},i.filesMoveV2=function(e){return this.request("files/move_v2",e,"user","api","rpc")},i.filesMove=function(e){return this.request("files/move",e,"user","api","rpc")},i.filesMoveBatchV2=function(e){return this.request("files/move_batch_v2",e,"user","api","rpc")},i.filesMoveBatch=function(e){return this.request("files/move_batch",e,"user","api","rpc")},i.filesMoveBatchCheckV2=function(e){return this.request("files/move_batch/check_v2",e,"user","api","rpc")},i.filesMoveBatchCheck=function(e){return this.request("files/move_batch/check",e,"user","api","rpc")},i.filesPermanentlyDelete=function(e){return this.request("files/permanently_delete",e,"user","api","rpc")},i.filesPropertiesAdd=function(e){return this.request("files/properties/add",e,"user","api","rpc")},i.filesPropertiesOverwrite=function(e){return this.request("files/properties/overwrite",e,"user","api","rpc")},i.filesPropertiesRemove=function(e){return this.request("files/properties/remove",e,"user","api","rpc")},i.filesPropertiesTemplateGet=function(e){return this.request("files/properties/template/get",e,"user","api","rpc")},i.filesPropertiesTemplateList=function(e){return this.request("files/properties/template/list",e,"user","api","rpc")},i.filesPropertiesUpdate=function(e){return this.request("files/properties/update",e,"user","api","rpc")},i.filesRestore=function(e){return this.request("files/restore",e,"user","api","rpc")},i.filesSaveUrl=function(e){return this.request("files/save_url",e,"user","api","rpc")},i.filesSaveUrlCheckJobStatus=function(e){return this.request("files/save_url/check_job_status",e,"user","api","rpc")},i.filesSearch=function(e){return this.request("files/search",e,"user","api","rpc")},i.filesUpload=function(e){return this.request("files/upload",e,"user","content","upload")},i.filesUploadSessionAppendV2=function(e){return this.request("files/upload_session/append_v2",e,"user","content","upload")},i.filesUploadSessionAppend=function(e){return this.request("files/upload_session/append",e,"user","content","upload")},i.filesUploadSessionFinish=function(e){return this.request("files/upload_session/finish",e,"user","content","upload")},i.filesUploadSessionFinishBatch=function(e){return this.request("files/upload_session/finish_batch",e,"user","api","rpc")},i.filesUploadSessionFinishBatchCheck=function(e){return this.request("files/upload_session/finish_batch/check",e,"user","api","rpc")},i.filesUploadSessionStart=function(e){return this.request("files/upload_session/start",e,"user","content","upload")},i.paperDocsArchive=function(e){return this.request("paper/docs/archive",e,"user","api","rpc")},i.paperDocsCreate=function(e){return this.request("paper/docs/create",e,"user","api","upload")},i.paperDocsDownload=function(e){return this.request("paper/docs/download",e,"user","api","download")},i.paperDocsFolderUsersList=function(e){return this.request("paper/docs/folder_users/list",e,"user","api","rpc")},i.paperDocsFolderUsersListContinue=function(e){return this.request("paper/docs/folder_users/list/continue",e,"user","api","rpc")},i.paperDocsGetFolderInfo=function(e){return this.request("paper/docs/get_folder_info",e,"user","api","rpc")},i.paperDocsList=function(e){return this.request("paper/docs/list",e,"user","api","rpc")},i.paperDocsListContinue=function(e){return this.request("paper/docs/list/continue",e,"user","api","rpc")},i.paperDocsPermanentlyDelete=function(e){return this.request("paper/docs/permanently_delete",e,"user","api","rpc")},i.paperDocsSharingPolicyGet=function(e){return this.request("paper/docs/sharing_policy/get",e,"user","api","rpc")},i.paperDocsSharingPolicySet=function(e){return this.request("paper/docs/sharing_policy/set",e,"user","api","rpc")},i.paperDocsUpdate=function(e){return this.request("paper/docs/update",e,"user","api","upload")},i.paperDocsUsersAdd=function(e){return this.request("paper/docs/users/add",e,"user","api","rpc")},i.paperDocsUsersList=function(e){return this.request("paper/docs/users/list",e,"user","api","rpc")},i.paperDocsUsersListContinue=function(e){return this.request("paper/docs/users/list/continue",e,"user","api","rpc")},i.paperDocsUsersRemove=function(e){return this.request("paper/docs/users/remove",e,"user","api","rpc")},i.sharingAddFileMember=function(e){return this.request("sharing/add_file_member",e,"user","api","rpc")},i.sharingAddFolderMember=function(e){return this.request("sharing/add_folder_member",e,"user","api","rpc")},i.sharingChangeFileMemberAccess=function(e){return this.request("sharing/change_file_member_access",e,"user","api","rpc")},i.sharingCheckJobStatus=function(e){return this.request("sharing/check_job_status",e,"user","api","rpc")},i.sharingCheckRemoveMemberJobStatus=function(e){return this.request("sharing/check_remove_member_job_status",e,"user","api","rpc")},i.sharingCheckShareJobStatus=function(e){return this.request("sharing/check_share_job_status",e,"user","api","rpc")},i.sharingCreateSharedLink=function(e){return this.request("sharing/create_shared_link",e,"user","api","rpc")},i.sharingCreateSharedLinkWithSettings=function(e){return this.request("sharing/create_shared_link_with_settings",e,"user","api","rpc")},i.sharingGetFileMetadata=function(e){return this.request("sharing/get_file_metadata",e,"user","api","rpc")},i.sharingGetFileMetadataBatch=function(e){return this.request("sharing/get_file_metadata/batch",e,"user","api","rpc")},i.sharingGetFolderMetadata=function(e){return this.request("sharing/get_folder_metadata",e,"user","api","rpc")},i.sharingGetSharedLinkFile=function(e){return this.request("sharing/get_shared_link_file",e,"user","content","download")},i.sharingGetSharedLinkMetadata=function(e){return this.request("sharing/get_shared_link_metadata",e,"user","api","rpc")},i.sharingGetSharedLinks=function(e){return this.request("sharing/get_shared_links",e,"user","api","rpc")},i.sharingListFileMembers=function(e){return this.request("sharing/list_file_members",e,"user","api","rpc")},i.sharingListFileMembersBatch=function(e){return this.request("sharing/list_file_members/batch",e,"user","api","rpc")},i.sharingListFileMembersContinue=function(e){return this.request("sharing/list_file_members/continue",e,"user","api","rpc")},i.sharingListFolderMembers=function(e){return this.request("sharing/list_folder_members",e,"user","api","rpc")},i.sharingListFolderMembersContinue=function(e){return this.request("sharing/list_folder_members/continue",e,"user","api","rpc")},i.sharingListFolders=function(e){return this.request("sharing/list_folders",e,"user","api","rpc")},i.sharingListFoldersContinue=function(e){return this.request("sharing/list_folders/continue",e,"user","api","rpc")},i.sharingListMountableFolders=function(e){return this.request("sharing/list_mountable_folders",e,"user","api","rpc")},i.sharingListMountableFoldersContinue=function(e){return this.request("sharing/list_mountable_folders/continue",e,"user","api","rpc")},i.sharingListReceivedFiles=function(e){return this.request("sharing/list_received_files",e,"user","api","rpc")},i.sharingListReceivedFilesContinue=function(e){return this.request("sharing/list_received_files/continue",e,"user","api","rpc")},i.sharingListSharedLinks=function(e){return this.request("sharing/list_shared_links",e,"user","api","rpc")},i.sharingModifySharedLinkSettings=function(e){return this.request("sharing/modify_shared_link_settings",e,"user","api","rpc")},i.sharingMountFolder=function(e){return this.request("sharing/mount_folder",e,"user","api","rpc")},i.sharingRelinquishFileMembership=function(e){return this.request("sharing/relinquish_file_membership",e,"user","api","rpc")},i.sharingRelinquishFolderMembership=function(e){return this.request("sharing/relinquish_folder_membership",e,"user","api","rpc")},i.sharingRemoveFileMember=function(e){return this.request("sharing/remove_file_member",e,"user","api","rpc")},i.sharingRemoveFileMember2=function(e){return this.request("sharing/remove_file_member_2",e,"user","api","rpc")},i.sharingRemoveFolderMember=function(e){return this.request("sharing/remove_folder_member",e,"user","api","rpc")},i.sharingRevokeSharedLink=function(e){return this.request("sharing/revoke_shared_link",e,"user","api","rpc")},i.sharingSetAccessInheritance=function(e){return this.request("sharing/set_access_inheritance",e,"user","api","rpc")},i.sharingShareFolder=function(e){return this.request("sharing/share_folder",e,"user","api","rpc")},i.sharingTransferFolder=function(e){return this.request("sharing/transfer_folder",e,"user","api","rpc")},i.sharingUnmountFolder=function(e){return this.request("sharing/unmount_folder",e,"user","api","rpc")},i.sharingUnshareFile=function(e){return this.request("sharing/unshare_file",e,"user","api","rpc")},i.sharingUnshareFolder=function(e){return this.request("sharing/unshare_folder",e,"user","api","rpc")},i.sharingUpdateFileMember=function(e){return this.request("sharing/update_file_member",e,"user","api","rpc")},i.sharingUpdateFolderMember=function(e){return this.request("sharing/update_folder_member",e,"user","api","rpc")},i.sharingUpdateFolderPolicy=function(e){return this.request("sharing/update_folder_policy",e,"user","api","rpc")},i.teamLogGetEvents=function(e){return this.request("team_log/get_events",e,"team","api","rpc")},i.teamLogGetEventsContinue=function(e){return this.request("team_log/get_events/continue",e,"team","api","rpc")},i.usersGetAccount=function(e){return this.request("users/get_account",e,"user","api","rpc")},i.usersGetAccountBatch=function(e){return this.request("users/get_account_batch",e,"user","api","rpc")},i.usersGetCurrentAccount=function(e){return this.request("users/get_current_account",e,"user","api","rpc")},i.usersGetSpaceUsage=function(e){return this.request("users/get_space_usage",e,"user","api","rpc")};for(var s=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},o=function(){function e(e,t){for(var r=0;t.length>r;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},c=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,s=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,s=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),p=function(e){return 3*e.length/4-n(e)},f=function(e){var t,r,i,s,o,u=e.length;s=n(e),o=new d(3*u/4-s),r=s>0?u-4:u;var a=0;for(t=0;r>t;t+=4)i=m[e.charCodeAt(t)]<<18|m[e.charCodeAt(t+1)]<<12|m[e.charCodeAt(t+2)]<<6|m[e.charCodeAt(t+3)],o[a++]=i>>16&255,o[a++]=i>>8&255,o[a++]=255&i;return 2===s?(i=m[e.charCodeAt(t)]<<2|m[e.charCodeAt(t+1)]>>4,o[a++]=255&i):1===s&&(i=m[e.charCodeAt(t)]<<10|m[e.charCodeAt(t+1)]<<4|m[e.charCodeAt(t+2)]>>2,o[a++]=i>>8&255,o[a++]=255&i),o},h=function(e){for(var t,r=e.length,n=r%3,i="",s=[],o=0,u=r-n;u>o;o+=16383)s.push(function(e,t,r){for(var n=[],i=t;r>i;i+=3)n.push(function(e){return l[e>>18&63]+l[e>>12&63]+l[e>>6&63]+l[63&e]}((e[i]<<16)+(e[i+1]<<8)+e[i+2]));return n.join("")}(e,o,o+16383>u?u:o+16383));return 1===n?(i+=l[(t=e[r-1])>>2],i+=l[t<<4&63],i+="=="):2===n&&(i+=l[(t=(e[r-2]<<8)+e[r-1])>>10],i+=l[t>>4&63],i+=l[t<<2&63],i+="="),s.push(i),s.join("")},l=[],m=[],d="undefined"!=typeof Uint8Array?Uint8Array:Array,g="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_=0;64>_;++_)l[_]=g[_],m[g.charCodeAt(_)]=_;m[45]=62,m[95]=63;var b={byteLength:p,toByteArray:f,fromByteArray:h},v={read:function(e,t,r,n,i){var s,o,u=8*i-n-1,a=(1<<u)-1,c=a>>1,p=-7,f=r?i-1:0,h=r?-1:1,l=e[t+f];for(f+=h,s=l&(1<<-p)-1,l>>=-p,p+=u;p>0;s=256*s+e[t+f],f+=h,p-=8);for(o=s&(1<<-p)-1,s>>=-p,p+=n;p>0;o=256*o+e[t+f],f+=h,p-=8);if(0===s)s=1-c;else{if(s===a)return o?NaN:1/0*(l?-1:1);o+=Math.pow(2,n),s-=c}return(l?-1:1)*o*Math.pow(2,s-n)},write:function(e,t,r,n,i,s){var o,u,a,c=8*s-i-1,p=(1<<c)-1,f=p>>1,h=23===i?5.960464477539062e-8:0,l=n?0:s-1,m=n?1:-1,d=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(u=isNaN(t)?1:0,o=p):(o=Math.floor(Math.log(t)/Math.LN2),1>t*(a=Math.pow(2,-o))&&(o--,a*=2),2>(t+=1>o+f?h*Math.pow(2,1-f):h/a)*a||(o++,a/=2),p>o+f?1>o+f?(u=t*Math.pow(2,f-1)*Math.pow(2,i),o=0):(u=(t*a-1)*Math.pow(2,i),o+=f):(u=0,o=p));i>=8;e[r+l]=255&u,l+=m,u/=256,i-=8);for(o=o<<i|u,c+=i;c>0;e[r+l]=255&o,l+=m,o/=256,c-=8);e[r+l-m]|=128*d}},y=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e,t){function r(e){if(e>C)throw new RangeError("Invalid typed array length");var t=new Uint8Array(e);return t.__proto__=n.prototype,t}function n(e,t,r){if("number"==typeof e){if("string"==typeof t)throw Error("If encoding is specified then the first argument must be a string");return o(e)}return i(e,t,r)}function i(e,t,i){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return S(e)?function(e,t,r){if(0>t||t>e.byteLength)throw new RangeError("'offset' is out of bounds");if(t+(r||0)>e.byteLength)throw new RangeError("'length' is out of bounds");var i;i=void 0===t&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,t):new Uint8Array(e,t,r);return i.__proto__=n.prototype,i}(e,t,i):"string"==typeof e?function(e,t){"string"==typeof t&&""!==t||(t="utf8");if(!n.isEncoding(t))throw new TypeError('"encoding" must be a valid string encoding');var i=0|c(e,t),s=r(i),o=s.write(e,t);o!==i&&(s=s.slice(0,o));return s}(e,t):function(e){if(n.isBuffer(e)){var t=0|a(e.length),i=r(t);return 0===i.length?i:(e.copy(i,0,0,t),i)}if(e){if(L(e)||"length"in e)return"number"!=typeof e.length||E(e.length)?r(0):u(e);if("Buffer"===e.type&&Array.isArray(e.data))return u(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e)}function s(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(0>e)throw new RangeError('"size" argument must not be negative')}function o(e){return s(e),r(0>e?0:0|a(e))}function u(e){for(var t=0>e.length?0:0|a(e.length),n=r(t),i=0;t>i;i+=1)n[i]=255&e[i];return n}function a(e){if(e>=C)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+C.toString(16)+" bytes");return 0|e}function c(e,t){if(n.isBuffer(e))return e.length;if(L(e)||S(e))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(var i=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return w(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return k(e).length;default:if(i)return w(e).length;t=(""+t).toLowerCase(),i=!0}}function p(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function f(e,t,r,i,s){if(0===e.length)return-1;if("string"==typeof r?(i=r,r=0):r>2147483647?r=2147483647:-2147483648>r&&(r=-2147483648),r=+r,E(r)&&(r=s?0:e.length-1),0>r&&(r=e.length+r),e.length>r){if(0>r){if(!s)return-1;r=0}}else{if(s)return-1;r=e.length-1}if("string"==typeof t&&(t=n.from(t,i)),n.isBuffer(t))return 0===t.length?-1:h(e,t,r,i,s);if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?s?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):h(e,[t],r,i,s);throw new TypeError("val must be string, number or Buffer")}function h(e,t,r,n,i){function s(e,t){return 1===o?e[t]:e.readUInt16BE(t*o)}var o=1,u=e.length,a=t.length;if(void 0!==n&&("ucs2"===(n=(n+"").toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(2>e.length||2>t.length)return-1;o=2,u/=2,a/=2,r/=2}var c;if(i){var p=-1;for(c=r;u>c;c++)if(s(e,c)===s(t,-1===p?0:c-p)){if(-1===p&&(p=c),c-p+1===a)return p*o}else-1!==p&&(c-=c-p),p=-1}else for(r+a>u&&(r=u-a),c=r;c>=0;c--){for(var f=!0,h=0;a>h;h++)if(s(e,c+h)!==s(t,h)){f=!1;break}if(f)return c}return-1}function l(e,t,r,n){return A(function(e){for(var t=[],r=0;e.length>r;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function m(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;r>i;){var s=e[i],o=null,u=s>239?4:s>223?3:s>191?2:1;if(r>=i+u){var a,c,p,f;switch(u){case 1:128>s&&(o=s);break;case 2:128==(192&(a=e[i+1]))&&(f=(31&s)<<6|63&a)>127&&(o=f);break;case 3:c=e[i+2],128==(192&(a=e[i+1]))&&128==(192&c)&&(f=(15&s)<<12|(63&a)<<6|63&c)>2047&&(55296>f||f>57343)&&(o=f);break;case 4:c=e[i+2],p=e[i+3],128==(192&(a=e[i+1]))&&128==(192&c)&&128==(192&p)&&(f=(15&s)<<18|(63&a)<<12|(63&c)<<6|63&p)>65535&&1114112>f&&(o=f)}}null===o?(o=65533,u=1):o>65535&&(n.push((o-=65536)>>>10&1023|55296),o=56320|1023&o),n.push(o),i+=u}return function(e){var t=e.length;if(U>=t)return String.fromCharCode.apply(String,e);var r="",n=0;for(;t>n;)r+=String.fromCharCode.apply(String,e.slice(n,n+=U));return r}(n)}function d(e,t,r){if(e%1!=0||0>e)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function g(e,t,r,i,s,o){if(!n.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>s||o>t)throw new RangeError('"value" argument is out of bounds');if(r+i>e.length)throw new RangeError("Index out of range")}function _(e,t,r,n,i,s){if(r+n>e.length)throw new RangeError("Index out of range");if(0>r)throw new RangeError("Index out of range")}function y(e,t,r,n,i){return t=+t,r>>>=0,i||_(e,0,r,4),v.write(e,t,r,n,23,4),r+4}function q(e,t,r,n,i){return t=+t,r>>>=0,i||_(e,0,r,8),v.write(e,t,r,n,52,8),r+8}function w(e,t){t=t||1/0;for(var r,n=e.length,i=null,s=[],o=0;n>o;++o){if((r=e.charCodeAt(o))>55295&&57344>r){if(!i){if(r>56319){(t-=3)>-1&&s.push(239,191,189);continue}if(o+1===n){(t-=3)>-1&&s.push(239,191,189);continue}i=r;continue}if(56320>r){(t-=3)>-1&&s.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(t-=3)>-1&&s.push(239,191,189);if(i=null,128>r){if(0>(t-=1))break;s.push(r)}else if(2048>r){if(0>(t-=2))break;s.push(r>>6|192,63&r|128)}else if(65536>r){if(0>(t-=3))break;s.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(r>=1114112)throw Error("Invalid code point");if(0>(t-=4))break;s.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return s}function k(e){return b.toByteArray(function(e){if(2>(e=e.trim().replace(R,"")).length)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function A(e,t,r,n){for(var i=0;n>i&&(i+r<t.length&&i<e.length);++i)t[i+r]=e[i];return i}function S(e){return e instanceof ArrayBuffer||null!=e&&null!=e.constructor&&"ArrayBuffer"===e.constructor.name&&"number"==typeof e.byteLength}function L(e){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)}function E(e){return e!=e}t.Buffer=n,t.SlowBuffer=function(e){return+e!=e&&(e=0),n.alloc(+e)},t.INSPECT_MAX_BYTES=50;var C=2147483647;t.kMaxLength=C,(n.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}())||void 0===console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&n[Symbol.species]===n&&Object.defineProperty(n,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),n.poolSize=8192,n.from=function(e,t,r){return i(e,t,r)},n.prototype.__proto__=Uint8Array.prototype,n.__proto__=Uint8Array,n.alloc=function(e,t,n){return function(e,t,n){return s(e),e>0&&void 0!==t?"string"==typeof n?r(e).fill(t,n):r(e).fill(t):r(e)}(e,t,n)},n.allocUnsafe=function(e){return o(e)},n.allocUnsafeSlow=function(e){return o(e)},n.isBuffer=function(e){return null!=e&&!0===e._isBuffer},n.compare=function(e,t){if(!n.isBuffer(e)||!n.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,i=t.length,s=0,o=Math.min(r,i);o>s;++s)if(e[s]!==t[s]){r=e[s],i=t[s];break}return i>r?-1:r>i?1:0},n.isEncoding=function(e){switch((e+"").toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},n.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return n.alloc(0);var r;if(void 0===t)for(t=0,r=0;e.length>r;++r)t+=e[r].length;var i=n.allocUnsafe(t),s=0;for(r=0;e.length>r;++r){var o=e[r];if(!n.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(i,s),s+=o.length}return i},n.byteLength=c,n.prototype._isBuffer=!0,n.prototype.swap16=function(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;e>t;t+=2)p(this,t,t+1);return this},n.prototype.swap32=function(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;e>t;t+=4)p(this,t,t+3),p(this,t+1,t+2);return this},n.prototype.swap64=function(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;e>t;t+=8)p(this,t,t+7),p(this,t+1,t+6),p(this,t+2,t+5),p(this,t+3,t+4);return this},n.prototype.toString=function(){var e=this.length;return 0===e?"":0===arguments.length?m(this,0,e):function(e,t,r){var n=!1;if((void 0===t||0>t)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),0>=r)return"";if(r>>>=0,(t>>>=0)>=r)return"";for(e||(e="utf8");;)switch(e){case"hex":return function(e,t,r){var n=e.length;t&&t>=0||(t=0),(!r||0>r||r>n)&&(r=n);for(var i="",s=t;r>s;++s)i+=function(e){return 16>e?"0"+e.toString(16):e.toString(16)}(e[s]);return i}(this,t,r);case"utf8":case"utf-8":return m(this,t,r);case"ascii":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;r>i;++i)n+=String.fromCharCode(127&e[i]);return n}(this,t,r);case"latin1":case"binary":return function(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;r>i;++i)n+=String.fromCharCode(e[i]);return n}(this,t,r);case"base64":return function(e,t,r){return b.fromByteArray(0===t&&r===e.length?e:e.slice(t,r))}(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r){for(var n=e.slice(t,r),i="",s=0;n.length>s;s+=2)i+=String.fromCharCode(n[s]+256*n[s+1]);return i}(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}.apply(this,arguments)},n.prototype.equals=function(e){if(!n.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===n.compare(this,e)},n.prototype.inspect=function(){var e="",r=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(e+=" ... ")),"<Buffer "+e+">"},n.prototype.compare=function(e,t,r,i,s){if(!n.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===i&&(i=0),void 0===s&&(s=this.length),0>t||r>e.length||0>i||s>this.length)throw new RangeError("out of range index");if(i>=s&&t>=r)return 0;if(i>=s)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,i>>>=0,s>>>=0,this===e)return 0;for(var o=s-i,u=r-t,a=Math.min(o,u),c=this.slice(i,s),p=e.slice(t,r),f=0;a>f;++f)if(c[f]!==p[f]){o=c[f],u=p[f];break}return u>o?-1:o>u?1:0},n.prototype.includes=function(e,t,r){return-1!==this.indexOf(e,t,r)},n.prototype.indexOf=function(e,t,r){return f(this,e,t,r,!0)},n.prototype.lastIndexOf=function(e,t,r){return f(this,e,t,r,!1)},n.prototype.write=function(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-t;if((void 0===r||r>i)&&(r=i),e.length>0&&(0>r||0>t)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var s=!1;;)switch(n){case"hex":return function(e,t,r,n){var i=e.length-(r=+r||0);n?(n=+n)>i&&(n=i):n=i;var s=t.length;if(s%2!=0)throw new TypeError("Invalid hex string");n>s/2&&(n=s/2);for(var o=0;n>o;++o){var u=parseInt(t.substr(2*o,2),16);if(E(u))return o;e[r+o]=u}return o}(this,e,t,r);case"utf8":case"utf-8":return function(e,t,r,n){return A(w(t,e.length-r),e,r,n)}(this,e,t,r);case"ascii":return l(this,e,t,r);case"latin1":case"binary":return function(e,t,r,n){return l(e,t,r,n)}(this,e,t,r);case"base64":return function(e,t,r,n){return A(k(t),e,r,n)}(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(e,t,r,n){return A(function(e,t){for(var r,n,i=[],s=0;e.length>s&&(t-=2)>=0;++s)r=e.charCodeAt(s),n=r>>8,i.push(r%256),i.push(n);return i}(t,e.length-r),e,r,n)}(this,e,t,r);default:if(s)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),s=!0}},n.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var U=4096;n.prototype.slice=function(e,t){var r=this.length;e=~~e,t=void 0===t?r:~~t,0>e?0>(e+=r)&&(e=0):e>r&&(e=r),0>t?0>(t+=r)&&(t=0):t>r&&(t=r),e>t&&(t=e);var i=this.subarray(e,t);return i.__proto__=n.prototype,i},n.prototype.readUIntLE=function(e,t,r){e>>>=0,t>>>=0,r||d(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return n},n.prototype.readUIntBE=function(e,t,r){e>>>=0,t>>>=0,r||d(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},n.prototype.readUInt8=function(e,t){return e>>>=0,t||d(e,1,this.length),this[e]},n.prototype.readUInt16LE=function(e,t){return e>>>=0,t||d(e,2,this.length),this[e]|this[e+1]<<8},n.prototype.readUInt16BE=function(e,t){return e>>>=0,t||d(e,2,this.length),this[e]<<8|this[e+1]},n.prototype.readUInt32LE=function(e,t){return e>>>=0,t||d(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},n.prototype.readUInt32BE=function(e,t){return e>>>=0,t||d(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},n.prototype.readIntLE=function(e,t,r){e>>>=0,t>>>=0,r||d(e,t,this.length);for(var n=this[e],i=1,s=0;++s<t&&(i*=256);)n+=this[e+s]*i;return(i*=128)>n||(n-=Math.pow(2,8*t)),n},n.prototype.readIntBE=function(e,t,r){e>>>=0,t>>>=0,r||d(e,t,this.length);for(var n=t,i=1,s=this[e+--n];n>0&&(i*=256);)s+=this[e+--n]*i;return(i*=128)>s||(s-=Math.pow(2,8*t)),s},n.prototype.readInt8=function(e,t){return e>>>=0,t||d(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},n.prototype.readInt16LE=function(e,t){e>>>=0,t||d(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},n.prototype.readInt16BE=function(e,t){e>>>=0,t||d(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},n.prototype.readInt32LE=function(e,t){return e>>>=0,t||d(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},n.prototype.readInt32BE=function(e,t){return e>>>=0,t||d(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},n.prototype.readFloatLE=function(e,t){return e>>>=0,t||d(e,4,this.length),v.read(this,e,!0,23,4)},n.prototype.readFloatBE=function(e,t){return e>>>=0,t||d(e,4,this.length),v.read(this,e,!1,23,4)},n.prototype.readDoubleLE=function(e,t){return e>>>=0,t||d(e,8,this.length),v.read(this,e,!0,52,8)},n.prototype.readDoubleBE=function(e,t){return e>>>=0,t||d(e,8,this.length),v.read(this,e,!1,52,8)},n.prototype.writeUIntLE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){g(this,e,t,r,Math.pow(2,8*r)-1,0)}var i=1,s=0;for(this[t]=255&e;++s<r&&(i*=256);)this[t+s]=e/i&255;return t+r},n.prototype.writeUIntBE=function(e,t,r,n){if(e=+e,t>>>=0,r>>>=0,!n){g(this,e,t,r,Math.pow(2,8*r)-1,0)}var i=r-1,s=1;for(this[t+i]=255&e;--i>=0&&(s*=256);)this[t+i]=e/s&255;return t+r},n.prototype.writeUInt8=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,1,255,0),this[t]=255&e,t+1},n.prototype.writeUInt16LE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},n.prototype.writeUInt16BE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},n.prototype.writeUInt32LE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},n.prototype.writeUInt32BE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},n.prototype.writeIntLE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);g(this,e,t,r,i-1,-i)}var s=0,o=1,u=0;for(this[t]=255&e;++s<r&&(o*=256);)0>e&&0===u&&0!==this[t+s-1]&&(u=1),this[t+s]=(e/o>>0)-u&255;return t+r},n.prototype.writeIntBE=function(e,t,r,n){if(e=+e,t>>>=0,!n){var i=Math.pow(2,8*r-1);g(this,e,t,r,i-1,-i)}var s=r-1,o=1,u=0;for(this[t+s]=255&e;--s>=0&&(o*=256);)0>e&&0===u&&0!==this[t+s+1]&&(u=1),this[t+s]=(e/o>>0)-u&255;return t+r},n.prototype.writeInt8=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,1,127,-128),0>e&&(e=255+e+1),this[t]=255&e,t+1},n.prototype.writeInt16LE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},n.prototype.writeInt16BE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},n.prototype.writeInt32LE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},n.prototype.writeInt32BE=function(e,t,r){return e=+e,t>>>=0,r||g(this,e,t,4,2147483647,-2147483648),0>e&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},n.prototype.writeFloatLE=function(e,t,r){return y(this,e,t,!0,r)},n.prototype.writeFloatBE=function(e,t,r){return y(this,e,t,!1,r)},n.prototype.writeDoubleLE=function(e,t,r){return q(this,e,t,!0,r)},n.prototype.writeDoubleBE=function(e,t,r){return q(this,e,t,!1,r)},n.prototype.copy=function(e,t,r,n){if(r||(r=0),n||0===n||(n=this.length),e.length>t||(t=e.length),t||(t=0),n>0&&r>n&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(0>t)throw new RangeError("targetStart out of bounds");if(0>r||r>=this.length)throw new RangeError("sourceStart out of bounds");if(0>n)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),n-r>e.length-t&&(n=e.length-t+r);var i,s=n-r;if(this===e&&t>r&&n>t)for(i=s-1;i>=0;--i)e[i+t]=this[i+r];else if(1e3>s)for(i=0;s>i;++i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+s),t);return s},n.prototype.fill=function(e,t,r,i){if("string"==typeof e){if("string"==typeof t?(i=t,t=0,r=this.length):"string"==typeof r&&(i=r,r=this.length),1===e.length){var s=e.charCodeAt(0);256>s&&(e=s)}if(void 0!==i&&"string"!=typeof i)throw new TypeError("encoding must be a string");if("string"==typeof i&&!n.isEncoding(i))throw new TypeError("Unknown encoding: "+i)}else"number"==typeof e&&(e&=255);if(0>t||t>this.length||r>this.length)throw new RangeError("Out of range index");if(t>=r)return this;t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0);var o;if("number"==typeof e)for(o=t;r>o;++o)this[o]=e;else{var u=n.isBuffer(e)?e:new n(e,i),a=u.length;for(o=0;r-t>o;++o)this[o+t]=u[o%a]}return this};var R=/[^+/0-9A-Za-z-_]/g}).Buffer;"function"!=typeof Object.assign&&(Object.assign=function(e){var t,r,n,i;if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(t=Object(e),r=1;arguments.length>r;r++)if(void 0!==(n=arguments[r])&&null!==n)for(i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);return t}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var r=Object(this),n=r.length>>>0;if(0===n)return!1;for(var i=0|t,s=Math.max(0>i?n-Math.abs(i):i,0);n>s;){if(function(e,t){return e===t||"number"==typeof e&&"number"==typeof t&&isNaN(e)&&isNaN(t)}(r[s],e))return!0;s++}return!1}});var q=function(){function n(e){s(this,n),this.accessToken=(e=e||{}).accessToken,this.clientId=e.clientId,this.clientSecret=e.clientSecret,this.selectUser=e.selectUser,this.selectAdmin=e.selectAdmin,this.fetch=e.fetch||fetch,this.pathRoot=e.pathRoot,e.fetch||console.warn("Global fetch is deprecated and will be unsupported in a future version. Please pass fetch function as option when instantiating dropbox instance: new Dropbox({fetch})")}return o(n,[{key:"setAccessToken",value:function(e){this.accessToken=e}},{key:"getAccessToken",value:function(){return this.accessToken}},{key:"setClientId",value:function(e){this.clientId=e}},{key:"getClientId",value:function(){return this.clientId}},{key:"setClientSecret",value:function(e){this.clientSecret=e}},{key:"getClientSecret",value:function(){return this.clientSecret}},{key:"getAuthenticationUrl",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"token",n=this.getClientId(),i="https://www.dropbox.com/oauth2/authorize";if(!n)throw Error("A client id is required. You can set the client id using .setClientId().");if("code"!==r&&!e)throw Error("A redirect uri is required.");if(!["code","token"].includes(r))throw Error("Authorization type must be code or token");var s=void 0;return s="code"===r?i+"?response_type=code&client_id="+n:i+"?response_type=token&client_id="+n,e&&(s+="&redirect_uri="+e),t&&(s+="&state="+t),s}},{key:"getAccessTokenFromCode",value:function(e,t){var r=this.getClientId(),n=this.getClientSecret();if(!r)throw Error("A client id is required. You can set the client id using .setClientId().");if(!n)throw Error("A client secret is required. You can set the client id using .setClientSecret().");return this.fetch("https://api.dropboxapi.com/oauth2/token?code="+t+"&grant_type=authorization_code&redirect_uri="+e+"&client_id="+r+"&client_secret="+n,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(function(e){return function(e){var t=e.clone();return new Promise(function(r){e.json().then(function(e){return r(e)}).catch(function(){return t.text().then(function(e){return r(e)})})}).then(function(t){return[e,t]})}(e)}).then(function(e){var t=c(e,2),r=t[0],n=t[1];if(!r.ok)throw{error:n,response:r,status:r.status};return n.access_token})}},{key:"authenticateWithCordova",value:function(e,t){function r(e){-999!==e.code&&(window.setTimeout(function(){u.close()},10),t())}function n(r){if(r.url.indexOf("&error=")>-1)window.setTimeout(function(){u.close()},10),t();else{var n=r.url.indexOf("#access_token="),i=r.url.indexOf("&token_type=");if(n>-1){n+=14,window.setTimeout(function(){u.close()},10);var s=r.url.substring(n,i);e(s)}}}function i(){o||(u.removeEventListener("loaderror",r),u.removeEventListener("loadstop",n),u.removeEventListener("exit",i),o=!0)}var s=this.getAuthenticationUrl("https://www.dropbox.com/1/oauth2/redirect_receiver"),o=!1,u=window.open(s,"_blank");u.addEventListener("loaderror",r),u.addEventListener("loadstop",n),u.addEventListener("exit",i)}},{key:"request",value:function(e,t,r,n,i){var s=null;switch(i){case"rpc":s=this.getRpcRequest();break;case"download":s=this.getDownloadRequest();break;case"upload":s=this.getUploadRequest();break;default:throw Error("Invalid request style: "+i)}var o={selectUser:this.selectUser,selectAdmin:this.selectAdmin,clientId:this.getClientId(),clientSecret:this.getClientSecret(),pathRoot:this.pathRoot};return s(e,t,r,n,this.getAccessToken(),o)}},{key:"setRpcRequest",value:function(e){this.rpcRequest=e}},{key:"getRpcRequest",value:function(){return void 0===this.rpcRequest&&(this.rpcRequest=function(e){return function(r,n,i,s,o,u){var a={method:"POST",body:n?JSON.stringify(n):null},p={};n&&(p["Content-Type"]="application/json");var f="";switch(i){case"app":if(!u.clientId||!u.clientSecret)throw Error("A client id and secret is required for this function");f=new y(u.clientId+":"+u.clientSecret).toString("base64"),p.Authorization="Basic "+f;break;case"team":case"user":p.Authorization="Bearer "+o;break;case"noauth":break;default:throw Error("Unhandled auth type: "+i)}return u&&(u.selectUser&&(p["Dropbox-API-Select-User"]=u.selectUser),u.selectAdmin&&(p["Dropbox-API-Select-Admin"]=u.selectAdmin),u.pathRoot&&(p["Dropbox-API-Path-Root"]=u.pathRoot)),a.headers=p,e(t(s)+r,a).then(function(e){return function(e){return"application/json"===e.headers.get("Content-Type")?e.json().then(function(t){return[e,t]}):e.text().then(function(t){return[e,t]})}(e)}).then(function(e){var t=c(e,2),r=t[0],n=t[1];if(!r.ok)throw{error:n,response:r,status:r.status};return n})}}(this.fetch)),this.rpcRequest}},{key:"setDownloadRequest",value:function(e){this.downloadRequest=e}},{key:"getDownloadRequest",value:function(){return void 0===this.downloadRequest&&(this.downloadRequest=function(n){return function(i,s,o,u,a,p){if("user"!==o)throw Error("Unexpected auth type: "+o);var f={method:"POST",headers:{Authorization:"Bearer "+a,"Dropbox-API-Arg":r(s)}};return p&&(p.selectUser&&(f.headers["Dropbox-API-Select-User"]=p.selectUser),p.selectAdmin&&(f.headers["Dropbox-API-Select-Admin"]=p.selectAdmin),p.pathRoot&&(f.headers["Dropbox-API-Path-Root"]=p.pathRoot)),n(t(u)+i,f).then(function(t){return function(t){return t.ok?e()?t.blob():t.buffer():t.text()}(t).then(function(e){return[t,e]})}).then(function(t){var r=c(t,2);return function(t,r){if(!t.ok)throw{error:r,response:t,status:t.status};var n=JSON.parse(t.headers.get("dropbox-api-result"));return e()?n.fileBlob=r:n.fileBinary=r,n}(r[0],r[1])})}}(this.fetch)),this.downloadRequest}},{key:"setUploadRequest",value:function(e){this.uploadRequest=e}},{key:"getUploadRequest",value:function(){return void 0===this.uploadRequest&&(this.uploadRequest=function(e){return function(n,i,s,o,u,a){if("user"!==s)throw Error("Unexpected auth type: "+s);var p=i.contents;delete i.contents;var f={body:p,method:"POST",headers:{Authorization:"Bearer "+u,"Content-Type":"application/octet-stream","Dropbox-API-Arg":r(i)}};return a&&(a.selectUser&&(f.headers["Dropbox-API-Select-User"]=a.selectUser),a.selectAdmin&&(f.headers["Dropbox-API-Select-Admin"]=a.selectAdmin),a.pathRoot&&(f.headers["Dropbox-API-Path-Root"]=a.pathRoot)),e(t(o)+n,f).then(function(e){return function(e){var t=e.clone();return new Promise(function(r){e.json().then(function(e){return r(e)}).catch(function(){return t.text().then(function(e){return r(e)})})}).then(function(t){return[e,t]})}(e)}).then(function(e){var t=c(e,2),r=t[0],n=t[1];if(!r.ok)throw{error:n,response:r,status:r.status};return n})}}(this.fetch)),this.uploadRequest}}]),n}(),w=function(e){function t(e){s(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return Object.assign(r,i),r}return u(t,q),o(t,[{key:"filesGetSharedLinkFile",value:function(e){return this.request("sharing/get_shared_link_file",e,"api","download")}}]),t}(),k=Object.freeze({Dropbox:w}),A={};A.teamDevicesListMemberDevices=function(e){return this.request("team/devices/list_member_devices",e,"team","api","rpc")},A.teamDevicesListMembersDevices=function(e){return this.request("team/devices/list_members_devices",e,"team","api","rpc")},A.teamDevicesListTeamDevices=function(e){return this.request("team/devices/list_team_devices",e,"team","api","rpc")},A.teamDevicesRevokeDeviceSession=function(e){return this.request("team/devices/revoke_device_session",e,"team","api","rpc")},A.teamDevicesRevokeDeviceSessionBatch=function(e){return this.request("team/devices/revoke_device_session_batch",e,"team","api","rpc")},A.teamFeaturesGetValues=function(e){return this.request("team/features/get_values",e,"team","api","rpc")},A.teamGetInfo=function(e){return this.request("team/get_info",e,"team","api","rpc")},A.teamGroupsCreate=function(e){return this.request("team/groups/create",e,"team","api","rpc")},A.teamGroupsDelete=function(e){return this.request("team/groups/delete",e,"team","api","rpc")},A.teamGroupsGetInfo=function(e){return this.request("team/groups/get_info",e,"team","api","rpc")},A.teamGroupsJobStatusGet=function(e){return this.request("team/groups/job_status/get",e,"team","api","rpc")},A.teamGroupsList=function(e){return this.request("team/groups/list",e,"team","api","rpc")},A.teamGroupsListContinue=function(e){return this.request("team/groups/list/continue",e,"team","api","rpc")},A.teamGroupsMembersAdd=function(e){return this.request("team/groups/members/add",e,"team","api","rpc")},A.teamGroupsMembersList=function(e){return this.request("team/groups/members/list",e,"team","api","rpc")},A.teamGroupsMembersListContinue=function(e){return this.request("team/groups/members/list/continue",e,"team","api","rpc")},A.teamGroupsMembersRemove=function(e){return this.request("team/groups/members/remove",e,"team","api","rpc")},A.teamGroupsMembersSetAccessType=function(e){return this.request("team/groups/members/set_access_type",e,"team","api","rpc")},A.teamGroupsUpdate=function(e){return this.request("team/groups/update",e,"team","api","rpc")},A.teamLinkedAppsListMemberLinkedApps=function(e){return this.request("team/linked_apps/list_member_linked_apps",e,"team","api","rpc")},A.teamLinkedAppsListMembersLinkedApps=function(e){return this.request("team/linked_apps/list_members_linked_apps",e,"team","api","rpc")},A.teamLinkedAppsListTeamLinkedApps=function(e){return this.request("team/linked_apps/list_team_linked_apps",e,"team","api","rpc")},A.teamLinkedAppsRevokeLinkedApp=function(e){return this.request("team/linked_apps/revoke_linked_app",e,"team","api","rpc")},A.teamLinkedAppsRevokeLinkedAppBatch=function(e){return this.request("team/linked_apps/revoke_linked_app_batch",e,"team","api","rpc")},A.teamMemberSpaceLimitsExcludedUsersAdd=function(e){return this.request("team/member_space_limits/excluded_users/add",e,"team","api","rpc")},A.teamMemberSpaceLimitsExcludedUsersList=function(e){return this.request("team/member_space_limits/excluded_users/list",e,"team","api","rpc")},A.teamMemberSpaceLimitsExcludedUsersListContinue=function(e){return this.request("team/member_space_limits/excluded_users/list/continue",e,"team","api","rpc")},A.teamMemberSpaceLimitsExcludedUsersRemove=function(e){return this.request("team/member_space_limits/excluded_users/remove",e,"team","api","rpc")},A.teamMemberSpaceLimitsGetCustomQuota=function(e){return this.request("team/member_space_limits/get_custom_quota",e,"team","api","rpc")},A.teamMemberSpaceLimitsRemoveCustomQuota=function(e){return this.request("team/member_space_limits/remove_custom_quota",e,"team","api","rpc")},A.teamMemberSpaceLimitsSetCustomQuota=function(e){return this.request("team/member_space_limits/set_custom_quota",e,"team","api","rpc")},A.teamMembersAdd=function(e){return this.request("team/members/add",e,"team","api","rpc")},A.teamMembersAddJobStatusGet=function(e){return this.request("team/members/add/job_status/get",e,"team","api","rpc")},A.teamMembersGetInfo=function(e){return this.request("team/members/get_info",e,"team","api","rpc")},A.teamMembersList=function(e){return this.request("team/members/list",e,"team","api","rpc")},A.teamMembersListContinue=function(e){return this.request("team/members/list/continue",e,"team","api","rpc")},A.teamMembersMoveFormerMemberFiles=function(e){return this.request("team/members/move_former_member_files",e,"team","api","rpc")},A.teamMembersMoveFormerMemberFilesJobStatusCheck=function(e){return this.request("team/members/move_former_member_files/job_status/check",e,"team","api","rpc")},A.teamMembersRecover=function(e){return this.request("team/members/recover",e,"team","api","rpc")},A.teamMembersRemove=function(e){return this.request("team/members/remove",e,"team","api","rpc")},A.teamMembersRemoveJobStatusGet=function(e){return this.request("team/members/remove/job_status/get",e,"team","api","rpc")},A.teamMembersSendWelcomeEmail=function(e){return this.request("team/members/send_welcome_email",e,"team","api","rpc")},A.teamMembersSetAdminPermissions=function(e){return this.request("team/members/set_admin_permissions",e,"team","api","rpc")},A.teamMembersSetProfile=function(e){return this.request("team/members/set_profile",e,"team","api","rpc")},A.teamMembersSuspend=function(e){return this.request("team/members/suspend",e,"team","api","rpc")},A.teamMembersUnsuspend=function(e){return this.request("team/members/unsuspend",e,"team","api","rpc")},A.teamNamespacesList=function(e){return this.request("team/namespaces/list",e,"team","api","rpc")},A.teamNamespacesListContinue=function(e){return this.request("team/namespaces/list/continue",e,"team","api","rpc")},A.teamPropertiesTemplateAdd=function(e){return this.request("team/properties/template/add",e,"team","api","rpc")},A.teamPropertiesTemplateGet=function(e){return this.request("team/properties/template/get",e,"team","api","rpc")},A.teamPropertiesTemplateList=function(e){return this.request("team/properties/template/list",e,"team","api","rpc")},A.teamPropertiesTemplateUpdate=function(e){return this.request("team/properties/template/update",e,"team","api","rpc")},A.teamReportsGetActivity=function(e){return this.request("team/reports/get_activity",e,"team","api","rpc")},A.teamReportsGetDevices=function(e){return this.request("team/reports/get_devices",e,"team","api","rpc")},A.teamReportsGetMembership=function(e){return this.request("team/reports/get_membership",e,"team","api","rpc")},A.teamReportsGetStorage=function(e){return this.request("team/reports/get_storage",e,"team","api","rpc")},A.teamTeamFolderActivate=function(e){return this.request("team/team_folder/activate",e,"team","api","rpc")},A.teamTeamFolderArchive=function(e){return this.request("team/team_folder/archive",e,"team","api","rpc")},A.teamTeamFolderArchiveCheck=function(e){return this.request("team/team_folder/archive/check",e,"team","api","rpc")},A.teamTeamFolderCreate=function(e){return this.request("team/team_folder/create",e,"team","api","rpc")},A.teamTeamFolderGetInfo=function(e){return this.request("team/team_folder/get_info",e,"team","api","rpc")},A.teamTeamFolderList=function(e){return this.request("team/team_folder/list",e,"team","api","rpc")},A.teamTeamFolderListContinue=function(e){return this.request("team/team_folder/list/continue",e,"team","api","rpc")},A.teamTeamFolderPermanentlyDelete=function(e){return this.request("team/team_folder/permanently_delete",e,"team","api","rpc")},A.teamTeamFolderRename=function(e){return this.request("team/team_folder/rename",e,"team","api","rpc")},A.teamTeamFolderUpdateSyncSettings=function(e){return this.request("team/team_folder/update_sync_settings",e,"team","api","rpc")},A.teamTokenGetAuthenticatedAdmin=function(e){return this.request("team/token/get_authenticated_admin",e,"team","api","rpc")};var S=function(e){function t(e){s(this,t);var r=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return Object.assign(r,A),r}return u(t,q),o(t,[{key:"actAsUser",value:function(e){return new w({accessToken:this.accessToken,clientId:this.clientId,selectUser:e})}}]),t}(),L=Object.freeze({DropboxTeam:S});return{Dropbox:k.Dropbox,DropboxTeam:L.DropboxTeam}});

},{}],40:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":41}],41:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.WHATWGFetch = {})));
}(this, (function (exports) { 'use strict';

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob:
      'FileReader' in self &&
      'Blob' in self &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = self.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.onabort = function() {
        reject(new exports.DOMException('Aborted', 'AbortError'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!self.fetch) {
    self.fetch = fetch;
    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9icm93c2VyLmVzNiIsImVzNi9jb21tYW5kLmVzNiIsImVzNi9jb25maWctZGVmYXVsdC5lczYiLCJlczYvY29uZmlnLmVzNiIsImVzNi9kaWFsb2cuZXM2IiwiZXM2L2RpdmlkZXIuZXM2IiwiZXM2L2ZsYXNoLmVzNiIsImVzNi9oaXN0b3J5LWJ1dHRvbi5lczYiLCJlczYvaHRtbC1kcm9wZG93bi5lczYiLCJlczYvaHRtbC1tZW51LmVzNiIsImVzNi9sb2NhbGUuZXM2IiwiZXM2L21haW4tdmlldy5lczYiLCJlczYvbWVudS1idXR0b24uZXM2IiwiZXM2L21lbnUtdGVtcGxhdGUuZXM2IiwiZXM2L21lbnUuZXM2IiwiZXM2L21lc3NhZ2UtYm94LmVzNiIsImVzNi9uYW1lbm90ZS5lczYiLCJlczYvb3Blbi1uZXctZGlhbG9nLmVzNiIsImVzNi9wYWdlLXZpZXcuZXM2IiwiZXM2L3BhZ2UuZXM2IiwiZXM2L3Byb2plY3QtbWFuYWdlci5lczYiLCJlczYvcHJvamVjdC5lczYiLCJlczYvcmVjZW50LXVybC5lczYiLCJlczYvc2hvcnRjdXQtZGVmYXVsdC5lczYiLCJlczYvc2hvcnRjdXQuZXM2IiwiZXM2L3NpZGUtYmFyLXRhYi5lczYiLCJlczYvc2lkZS1iYXIuZXM2IiwiZXM2L3RhYmxldC1zZXR0aW5ncy1kaWFsb2cuZXM2IiwiZXM2L3RleHQtdmlldy5lczYiLCJlczYvdGl0bGUuZXM2IiwiZXM2L3Rvb2wtYmFyLmVzNiIsImVzNi90b29sLWJ1dHRvbi5lczYiLCJlczYvdWkuZXM2IiwiZXM2L3ZpZXctYnV0dG9uLmVzNiIsImVzNi92aWV3LmVzNiIsImVzNi93aWRnZXQuZXM2IiwianMvbGliL2RpY3Rpb25hcnkuanMiLCJub2RlX21vZHVsZXMvZHJvcGJveC9kaXN0L0Ryb3Bib3gtc2RrLm1pbi5qcyIsIm5vZGVfbW9kdWxlcy9pc29tb3JwaGljLWZldGNoL2ZldGNoLW5wbS1icm93c2VyaWZ5LmpzIiwibm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9kaXN0L2ZldGNoLnVtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7SUFFTSxXOzs7QUFDSix5QkFBYztBQUFBOztBQUNaLFNBQUssRUFBTCxHQUFVLGNBQVY7QUFDQSxTQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7Ozs7eUJBRUksTyxFQUFTO0FBQUE7O0FBQ1osYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQU0sT0FBTyxHQUFHLEVBQWhCO0FBQ0EsUUFBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUQsQ0FBRixDQUFQLEdBQW1CLE9BQW5COztBQUVBLFlBQU0sTUFBTSxHQUFHLGVBQU8sYUFBUCxtSUFJQyxtQkFBUyxPQUpWLDRGQUFmOztBQVNBLFFBQUEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFOLENBQUQsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckI7QUFDQSxRQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTixDQUFELENBQWdCLE1BQWhCLENBQXVCO0FBQ3JCLFVBQUEsUUFBUSxFQUFFLEtBRFc7QUFFckIsVUFBQSxRQUFRLEVBQUU7QUFBRSxZQUFBLEVBQUUsRUFBQyxlQUFMO0FBQXNCLFlBQUEsRUFBRSxFQUFDO0FBQXpCLFdBRlc7QUFHckIsVUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGdCQUFELENBSGE7QUFJckIsVUFBQSxLQUFLLEVBQUUsSUFKYztBQUtyQixVQUFBLEtBQUssRUFBRSxHQUxjO0FBTXJCLFVBQUEsT0FBTyxFQUFFO0FBTlksU0FBdkI7QUFRRCxPQXRCTSxDQUFQO0FBdUJEOzs7Ozs7QUFHSCxJQUFNLFdBQVcsR0FBRyxJQUFJLFdBQUosRUFBcEI7Ozs7QUN6Q0E7O0FBRUE7O0FBQ0E7O0FBR0EsTUFBTSxDQUFDLFFBQVAsR0FBa0Isa0JBQWxCO0FBQ0EsTUFBTSxDQUFDLENBQVAsR0FBVyxlQUFPLFNBQWxCOztBQUNBLE1BQU0sQ0FBQyxFQUFQLEdBQVksVUFBQyxDQUFEO0FBQUEsU0FBTyxDQUFDLEdBQUcsSUFBWDtBQUFBLENBQVo7O0FBRUEsTUFBTSxDQUFDLEdBQVAsR0FBYSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVosQ0FBaUIsTUFBTSxDQUFDLE9BQXhCLENBQWI7QUFDQSxNQUFNLENBQUMsSUFBUCxHQUFjLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBYixDQUFrQixNQUFNLENBQUMsT0FBekIsQ0FBZDtBQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsT0FBTyxDQUFDLEtBQVIsQ0FBYyxJQUFkLENBQW1CLE1BQU0sQ0FBQyxPQUExQixDQUFmO0FBRUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVO0FBQ3RELHFCQUFTLElBQVQ7QUFDRCxDQUZEOzs7QUNkQTs7Ozs7OztBQUVBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU0sUUFBUSxHQUFHLFNBQVgsUUFBVyxDQUFDLE9BQUQsRUFBVSxJQUFWLEVBQW1CO0FBQ2xDLE1BQUksbUJBQVMsR0FBYixFQUFrQjtBQUNoQixJQUFBLEdBQUcsQ0FBQyxTQUFELEVBQVksT0FBWixFQUFxQixJQUFyQixDQUFIOztBQUNBLHVCQUFTLEdBQVQsQ0FBYSxPQUFiLENBQXFCLE9BQXJCLEVBQThCLElBQTlCO0FBRUQsR0FKRCxNQUlPO0FBQ0wsSUFBQSxHQUFHLFdBQUksT0FBSiw4Q0FBSDtBQUNEO0FBQ0YsQ0FSRCxDLENBVUE7OztJQUVNLE87OztBQUNKLHFCQUFjO0FBQUE7QUFDYjs7OzsyQkFFTTtBQUNMLE1BQUEsR0FBRyxDQUFDLE1BQUQsQ0FBSDtBQUNEOzs7MkJBRU07QUFDTCxNQUFBLEdBQUcsQ0FBQyxNQUFELENBQUg7QUFDRDs7O3lCQUVJLE8sRUFBUztBQUNaLHFCQUFPLElBQVAsQ0FBWSxzQkFBWixFQUF3QjtBQUN0QixRQUFBLEtBQUssRUFBRSxjQURlO0FBRXRCLFFBQUEsT0FBTyxFQUFFLDBEQUZhO0FBR3RCLFFBQUEsRUFBRSxFQUFFLG9CQUhrQjtBQUl0QixRQUFBLE1BQU0sRUFBRTtBQUpjLE9BQXhCLEVBTUcsSUFOSCxDQU1RLFVBQUMsUUFBRCxFQUFjO0FBQ3BCLHVCQUFPLE9BQVAsQ0FBZSxZQUFmLENBQTRCLENBQUMsQ0FBQyxnQkFBRCxDQUE3Qjs7QUFDQSxZQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBRCxDQUFQLENBQW1CLE9BQWpDOztBQUNBLFlBQUksR0FBRyxHQUFHLElBQUksT0FBSixDQUFZO0FBQUUsVUFBQSxRQUFRLEVBQUU7QUFBWixTQUFaLENBQVY7QUFDQSxZQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsb0JBQUosQ0FBeUIscUNBQXpCLENBQWQ7O0FBRUEscUJBQU0sSUFBTixDQUFXLE9BQVg7O0FBQ0EsUUFBQSxRQUFRLENBQUMsSUFBVCxHQUFnQixPQUFoQjtBQUVELE9BZkQsRUFlRyxLQWZILENBZVMsVUFBQyxLQUFELEVBQVc7QUFDbEIsWUFBSSxLQUFKLEVBQVcsZUFBTyxJQUFQLENBQVksc0JBQVosRUFBd0I7QUFBRSxVQUFBLElBQUksRUFBRSxPQUFSO0FBQWlCLFVBQUEsT0FBTyxFQUFFO0FBQTFCLFNBQXhCO0FBQ1osT0FqQkQ7QUFrQkQ7Ozs0QkFFTztBQUNOLHFCQUFPLElBQVAsQ0FBWSx3QkFBWixFQUF5QixJQUF6QixDQUE4QixZQUFNO0FBQ2xDLHVCQUFPLEtBQVA7QUFDRCxPQUZEO0FBR0Q7Ozt3QkFFRyxDLEVBQUc7QUFDTCxNQUFBLEdBQUcsQ0FBQyxLQUFELENBQUg7O0FBQ0EsNkJBQVcsTUFBWCxDQUFrQixLQUFsQjtBQUNEOzs7MkJBRU0sQyxFQUFHO0FBQ1IsTUFBQSxHQUFHLENBQUMsUUFBRCxDQUFIOztBQUNBLDZCQUFXLE1BQVgsQ0FBa0IsUUFBbEI7QUFDRDs7O3lCQUVJLEMsRUFBRztBQUNOLE1BQUEsR0FBRyxDQUFDLE1BQUQsQ0FBSDs7QUFDQSw2QkFBVyxNQUFYLENBQWtCLE1BQWxCO0FBQ0Q7Ozs4QkFFUztBQUNSLE1BQUEsR0FBRyxDQUFDLFNBQUQsQ0FBSDs7QUFDQSx1QkFBUSxNQUFSO0FBQ0Q7OzttQ0FFYztBQUNiLE1BQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixJQUFoQjtBQUNBLE1BQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixJQUFoQjs7QUFDQSw2QkFBVyxNQUFYLENBQWtCLE1BQWxCO0FBQ0Q7OzttQ0FFYztBQUNiLE1BQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixJQUFoQjtBQUNBLE1BQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixJQUFoQjs7QUFDQSw2QkFBVyxNQUFYLENBQWtCLE1BQWxCO0FBQ0Q7OztvQ0FFZTtBQUNkLHFCQUFPLElBQVAsQ0FBWSw2QkFBWixFQUEyQixJQUEzQixDQUFnQyxZQUFNO0FBQ3BDLHVCQUFPLEtBQVA7QUFFRCxPQUhELEVBR0csS0FISCxDQUdTLFVBQUMsS0FBRCxFQUFXO0FBQ2xCLFlBQUksS0FBSixFQUFXO0FBQ1QseUJBQU8sSUFBUCxDQUFZLHNCQUFaLEVBQXdCO0FBQUUsWUFBQSxJQUFJLEVBQUUsT0FBUjtBQUFpQixZQUFBLE9BQU8sRUFBRTtBQUExQixXQUF4QixFQUEyRCxJQUEzRCxDQUFnRSxZQUFNO0FBQ3BFLDJCQUFPLEtBQVA7QUFDRCxXQUZEO0FBR0Q7QUFDRixPQVREO0FBVUQ7OztpQ0FFWTtBQUNYLFVBQUksbUJBQVMsR0FBYixFQUFrQjtBQUNoQiwyQkFBUyxHQUFULENBQWEsVUFBYixHQUEwQixJQUExQixDQUErQixVQUFDLEdBQUQsRUFBUztBQUN0QyxVQUFBLElBQUksdUJBQWdCLEdBQWhCLFVBQUo7O0FBQ0EseUNBQWUsSUFBZixDQUFvQixHQUFwQjtBQUVELFNBSkQsRUFJRyxJQUpILENBSVEsVUFBQyxPQUFELEVBQWE7QUFDbkIsVUFBQSxJQUFJLENBQUMsV0FBRCxFQUFjLE9BQWQsQ0FBSjtBQUVELFNBUEQsRUFPRyxLQVBILENBT1MsVUFBQyxLQUFELEVBQVc7QUFDbEIsY0FBSSxLQUFKLEVBQVcsZUFBTyxJQUFQLENBQVksc0JBQVosRUFBd0I7QUFBRSxZQUFBLElBQUksRUFBRSxPQUFSO0FBQWlCLFlBQUEsT0FBTyxFQUFFO0FBQTFCLFdBQXhCO0FBQ1osU0FURDtBQVdELE9BWkQsTUFZTztBQUNMLFlBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxPQUFiLENBQXFCLG9CQUFyQixDQUFwQjs7QUFFQSxZQUFJLFdBQUosRUFBaUI7QUFDZixjQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQUQsQ0FBbkIsQ0FEZSxDQUMwQjs7O0FBQ3pDLGNBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFELENBQVAsQ0FBbUIsT0FBakM7O0FBQ0EsY0FBSSxHQUFHLEdBQUcsSUFBSSxPQUFKLENBQVk7QUFDcEIsWUFBQSxLQUFLLEVBQUUsS0FEYTtBQUVwQixZQUFBLFdBQVcsRUFBRTtBQUZPLFdBQVosQ0FBVjtBQUtBLFVBQUEsR0FBRyxDQUFDLGVBQUosQ0FBb0I7QUFBQyxZQUFBLElBQUksRUFBRTtBQUFQLFdBQXBCLEVBQWdDLElBQWhDLENBQXFDLFVBQUMsUUFBRCxFQUFjO0FBQ2pELFlBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0QsV0FGRCxFQUVHLEtBRkgsQ0FFUyxVQUFDLEtBQUQsRUFBVztBQUNsQixZQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWjtBQUNELFdBSkQ7QUFLQSxpQkFiZSxDQWNmO0FBRUQsU0FoQkQsTUFnQk87QUFDTCxpQkFBTyxLQUFLLElBQUwsQ0FBVSxDQUFDLFlBQUQsQ0FBVixDQUFQO0FBQ0Q7QUFDRjtBQUNGOzs7eUJBRUksRyxFQUFLO0FBQ1IsVUFBSSxtQkFBUyxHQUFiLEVBQWtCO0FBQ2hCLFFBQUEsSUFBSSxpQkFBVSxHQUFWLFVBQUo7O0FBQ0EsdUNBQWUsSUFBZixDQUFvQixHQUFwQixFQUF5QixJQUF6QixDQUE4QixVQUFDLE9BQUQsRUFBYTtBQUN6QyxVQUFBLElBQUksQ0FBQyxXQUFELEVBQWMsT0FBZCxDQUFKO0FBRUQsU0FIRCxFQUdHLEtBSEgsQ0FHUyxVQUFDLEtBQUQsRUFBVztBQUNsQixjQUFJLEtBQUosRUFBVyxlQUFPLElBQVAsQ0FBWSxzQkFBWixFQUF3QjtBQUFFLFlBQUEsSUFBSSxFQUFFLE9BQVI7QUFBaUIsWUFBQSxPQUFPLEVBQUU7QUFBMUIsV0FBeEI7QUFDWixTQUxEO0FBT0QsT0FURCxNQVNPO0FBQ0wsZUFBTyxLQUFLLElBQUwsQ0FBVSxDQUFDLE1BQUQsRUFBUyxHQUFULENBQVYsQ0FBUDtBQUNEO0FBQ0Y7Ozs0QkFFTztBQUNOLHFDQUFlLEtBQWY7QUFDRDs7OzJCQUVNO0FBQ0wsTUFBQSxHQUFHLENBQUMsTUFBRCxDQUFIO0FBQ0Q7Ozs2QkFFUTtBQUNQLE1BQUEsR0FBRyxDQUFDLFFBQUQsQ0FBSDtBQUNEOzs7K0JBRVU7QUFDVCx1QkFBUSxXQUFSLENBQW9CLE1BQXBCO0FBQ0Q7OztnQ0FFVztBQUNWLHVCQUFRLFdBQVIsQ0FBb0IsT0FBcEI7QUFDRDs7O3FDQUVnQixDQUFFOzs7cUNBRUY7QUFDZixxQkFBTyxJQUFQLENBQVksMENBQVosRUFBa0MsSUFBbEMsQ0FBdUMsWUFBTTtBQUMzQyx1QkFBTyxLQUFQO0FBRUQsT0FIRCxFQUdHLEtBSEgsQ0FHUyxZQUFNO0FBQ2IsdUJBQU8sS0FBUDtBQUNELE9BTEQ7QUFNRCxLLENBRUQ7Ozs7d0JBRUcsSSxFQUFNLEksRUFBTTtBQUNiLFVBQUksSUFBSSxJQUFJLEtBQUssSUFBTCxDQUFaLEVBQXdCO0FBQ3RCLGFBQUssSUFBTCxFQUFXLElBQVg7QUFDRDtBQUNGLEssQ0FFRDs7OztxQ0FFaUI7QUFDZixNQUFBLFFBQVEsQ0FBQyxnQkFBRCxDQUFSO0FBQ0Q7OztpQ0FFWTtBQUNYLFVBQUksbUJBQVMsR0FBYixFQUFrQjtBQUNoQixRQUFBLFFBQVEsQ0FBQyxZQUFELENBQVI7QUFDRCxPQUZELE1BRU87QUFDTCxRQUFBLFFBQVEsQ0FBQyxlQUFULENBQXlCLGlCQUF6QjtBQUNEO0FBQ0Y7OzsyQkFFTTtBQUNMLE1BQUEsUUFBUSxDQUFDLE1BQUQsQ0FBUjtBQUNEOzs7NkJBRVE7QUFDUCxNQUFBLFFBQVEsQ0FBQyxNQUFUO0FBQ0Q7Ozs7OztBQUdILElBQU0sT0FBTyxHQUFHLElBQUksT0FBSixFQUFoQjs7OztBQ25PQTs7Ozs7O0FBRUEsSUFBTSxhQUFhLEdBQUc7QUFDcEIsRUFBQSxPQUFPLEVBQUUsSUFEVztBQUVwQixFQUFBLE9BQU8sRUFBRSxLQUZXO0FBR3BCLEVBQUEsWUFBWSxFQUFFLEdBSE07QUFJcEIsRUFBQSxlQUFlLEVBQUUsT0FKRztBQU1wQixFQUFBLFdBQVcsRUFBRSxJQU5PO0FBT3BCLEVBQUEsV0FBVyxFQUFFLElBUE87QUFRcEIsRUFBQSxhQUFhLEVBQUU7QUFSSyxDQUF0Qjs7OztBQ0ZBOzs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU0sTTs7O0FBQ0osb0JBQWM7QUFBQTs7QUFDWixTQUFLLElBQUwsR0FBWSxFQUFaO0FBQ0Q7Ozs7MkJBRU07QUFDTCxVQUFNLElBQUksR0FBRyxZQUFZLENBQUMsT0FBYixDQUFxQixpQkFBckIsQ0FBYjtBQUNBLFdBQUssSUFBTCxHQUFhLElBQUQsR0FBUyxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsQ0FBVCxHQUE0QixDQUFDLENBQUMsTUFBRixDQUFTLElBQVQsRUFBZSxFQUFmLEVBQW1CLDRCQUFuQixDQUF4QztBQUNEOzs7MkJBRU07QUFDTCxVQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBTCxDQUFlLEtBQUssSUFBcEIsQ0FBYjtBQUNBLE1BQUEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsaUJBQXJCLEVBQXdDLElBQXhDO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUssSUFBTCxHQUFZLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxFQUFrQiw0QkFBbEIsQ0FBWjtBQUNBLFdBQUssSUFBTDtBQUNEOzs7NkJBRVEsRyxFQUFLLFksRUFBYztBQUMxQixVQUFJLEtBQUssSUFBTCxDQUFVLEdBQVYsTUFBbUIsU0FBdkIsRUFBa0M7QUFDaEMsZUFBTyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQVA7QUFFRCxPQUhELE1BR087QUFDTCxlQUFPLFlBQVA7QUFDRDtBQUNGOzs7Ozs7QUFHSCxJQUFNLE1BQU0sR0FBRyxJQUFJLE1BQUosRUFBZjs7OztBQ2xDQTs7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNKLG9CQUFjO0FBQUE7O0FBQ1osU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNEOzs7OzJCQUVNLENBQ047Ozs2QkFFUTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNQLDZCQUFxQixDQUFDLENBQUMsb0JBQUQsQ0FBdEIsOEhBQThDO0FBQUEsY0FBbkMsTUFBbUM7O0FBQzVDLGNBQUksQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLE1BQVYsQ0FBaUIsUUFBakIsQ0FBSixFQUFnQztBQUNyQyxtQkFBTyxJQUFQO0FBQ007QUFDRjtBQUxNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBTVAsYUFBTyxLQUFQO0FBQ0Q7Ozt5QkFFSSxNLEVBQVEsTyxFQUFTO0FBQ3BCLFVBQUksS0FBSyxPQUFULEVBQWtCLEtBQUssS0FBTDtBQUNsQixXQUFLLE9BQUwsR0FBZSxNQUFmOztBQUVBLFVBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixFQUFxQjtBQUNuQixZQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLFFBQUEsT0FBTyxDQUFDLEVBQVIsR0FBYSxNQUFNLENBQUMsRUFBcEI7QUFDQSxRQUFBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLFFBQXBCO0FBQ0EsUUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsR0FBb0IsR0FBcEI7QUFDQSxRQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxDQUFWLEVBQWEsV0FBYixDQUF5QixPQUF6QjtBQUNBLFFBQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FBakI7QUFDRDs7QUFFRCxNQUFBLFVBQVUsQ0FBQyxZQUFXO0FBQ3BCLFFBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFSLENBQUQsQ0FBa0IsTUFBbEIsQ0FBeUIsTUFBekI7QUFDRCxPQUZTLEVBRVAsR0FGTyxDQUFWO0FBSUEsYUFBTyxNQUFNLENBQUMsSUFBUCxDQUFZLE9BQVosQ0FBUDtBQUNEOzs7NEJBRU87QUFDTixVQUFNLE1BQU0sR0FBRyxLQUFLLE9BQXBCO0FBQ0EsVUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQXZCOztBQUNBLFVBQUksT0FBSixFQUFhO0FBQ1gsUUFBQSxDQUFDLENBQUMsTUFBTSxNQUFNLENBQUMsRUFBZCxDQUFELENBQW1CLE1BQW5CLENBQTBCLE9BQTFCO0FBQ0EsUUFBQSxPQUFPLENBQUMsVUFBUixDQUFtQixXQUFuQixDQUErQixPQUEvQjtBQUNEOztBQUNELE1BQUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsSUFBakI7QUFDQSxXQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7Ozs7OztBQUdILElBQU0sTUFBTSxHQUFHLElBQUksTUFBSixFQUFmOzs7O0FDbkRBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSSxRQUFRLEdBQUcsR0FBZixDLENBRUE7O0lBRU0sTzs7O0FBQ0oscUJBQWM7QUFBQTtBQUNiOzs7OzJCQUVNO0FBQUE7O0FBQ0wsTUFBQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLFNBQWpCO0FBQ0EsTUFBQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEVBQWpCLENBQW9CLGdCQUFwQixFQUFzQyxVQUFDLENBQUQsRUFBTztBQUFFO0FBQzdDLFFBQUEsS0FBSSxDQUFDLGdCQUFMO0FBQ0QsT0FGRDtBQUdBLFdBQUssV0FBTDtBQUNEOzs7MkJBRU0sSyxFQUFPO0FBQ1osTUFBQSxHQUFHLENBQUMsVUFBRCxDQUFIO0FBRUEsVUFBSSxLQUFLLElBQUksU0FBYixFQUF3QixLQUFLLEdBQUcsZUFBTyxJQUFQLENBQVksT0FBcEI7QUFDeEIscUJBQU8sSUFBUCxDQUFZLE9BQVosR0FBc0IsS0FBdEI7O0FBQ0EscUJBQU8sSUFBUDs7QUFFQSxVQUFJLEtBQUssR0FBSSxLQUFELEdBQVUsZUFBTyxJQUFQLENBQVksWUFBdEIsR0FBcUMsQ0FBakQ7O0FBQ0EsVUFBSSxlQUFPLElBQVAsQ0FBWSxlQUFaLElBQStCLE9BQW5DLEVBQTRDO0FBQzFDLFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsS0FBakIsS0FBMkIsS0FBM0IsR0FBbUMsQ0FBM0M7QUFDRDs7QUFFRCxVQUFJLEtBQUosRUFBVztBQUNULFlBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsS0FBakIsS0FBMkIsUUFBM0IsR0FBc0MsQ0FBdkQ7QUFDQSxZQUFJLEtBQUssR0FBRyxRQUFaLEVBQXNCLEtBQUssR0FBRyxRQUFSO0FBQ3RCLFlBQUksS0FBSyxHQUFHLFFBQVosRUFBc0IsS0FBSyxHQUFHLFFBQVI7QUFDdkI7O0FBRUQsTUFBQSxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLFNBQWpCLENBQTJCLG9CQUEzQixFQUFpRCxLQUFqRDs7QUFDQSw2QkFBVyxNQUFYO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUssTUFBTCxDQUFZLENBQUMsZUFBTyxJQUFQLENBQVksT0FBekI7QUFDRDs7O2dDQUVXLEssRUFBTztBQUNqQixVQUFJLEtBQUssSUFBSSxTQUFiLEVBQXdCLEtBQUssR0FBRyxlQUFPLElBQVAsQ0FBWSxlQUFwQjtBQUN4QixxQkFBTyxJQUFQLENBQVksZUFBWixHQUE4QixLQUE5Qjs7QUFDQSxxQkFBTyxJQUFQOztBQUVBLFVBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxZQUFELENBQWxCO0FBQ0EsVUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFVBQUQsQ0FBakI7O0FBRUEsVUFBSSxLQUFLLElBQUksTUFBYixFQUFxQjtBQUNuQixRQUFBLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCLE1BQXJCLENBQTRCLE9BQTVCO0FBQ0EsUUFBQSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixNQUF0QixDQUE2QixRQUE3QjtBQUVELE9BSkQsTUFJTztBQUNMLFFBQUEsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0IsTUFBdEIsQ0FBNkIsT0FBN0I7QUFDQSxRQUFBLENBQUMsQ0FBQyxpQkFBRCxDQUFELENBQXFCLE1BQXJCLENBQTRCLFFBQTVCO0FBQ0Q7O0FBQ0QsV0FBSyxNQUFMO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsTUFBQSxHQUFHLENBQUMsb0JBQUQsQ0FBSDtBQUNBLFVBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxLQUFkLEVBQVo7QUFFQSxVQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCLEtBQWpCLEtBQTJCLFFBQTNCLEdBQXNDLENBQXZEO0FBQ0EsVUFBSSxLQUFLLEdBQUcsUUFBWixFQUFzQixLQUFLLEdBQUcsUUFBUjtBQUN0QixVQUFJLEtBQUssR0FBRyxRQUFaLEVBQXNCLEtBQUssR0FBRyxRQUFSO0FBRXRCLHFCQUFPLElBQVAsQ0FBWSxZQUFaLEdBQTJCLFFBQVEsQ0FBQyxLQUFELENBQW5DO0FBQ0EscUJBQU8sSUFBUCxDQUFZLE9BQVosR0FBc0IsSUFBdEI7O0FBQ0EscUJBQU8sSUFBUDs7QUFDQSxXQUFLLE1BQUw7QUFDRDs7Ozs7O0FBR0gsSUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFKLEVBQWhCOzs7O0FDakZBOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUVNLEs7OztBQUNKLG1CQUFjO0FBQUE7QUFDYjs7Ozt5QkFFSSxJLEVBQU0sSSxFQUFNO0FBQ2YsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQUwsQ0FBZSxDQUFDLElBQUQsRUFBTyxJQUFQLENBQWYsQ0FBYjtBQUNBLE1BQUEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsZ0JBQXJCLEVBQXVDLElBQXZDO0FBQ0Q7OzsyQkFFTTtBQUNMLFVBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFiLENBQXFCLGdCQUFyQixDQUFiO0FBQ0EsTUFBQSxZQUFZLENBQUMsVUFBYixDQUF3QixnQkFBeEI7O0FBRUEsVUFBSSxJQUFKLEVBQVU7QUFDUixZQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBTCxDQUFXLElBQVgsQ0FBaEI7O0FBQ0EseUJBQVEsRUFBUiw0Q0FBYyxPQUFkO0FBQ0Q7QUFDRjs7Ozs7O0FBR0gsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFKLEVBQWQ7Ozs7QUMxQkE7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLFVBQUo7QUFDQSxJQUFJLFVBQUosQyxDQUVBOztJQUVNLGE7OztBQUNKLDJCQUFjO0FBQUE7QUFDYjs7OzsyQkFFTTtBQUNMLE1BQUEsVUFBVSxHQUFHLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsV0FBbEIsQ0FBOEI7QUFDekMsUUFBQSxHQUFHLEVBQUUscUJBRG9DO0FBRXpDLFFBQUEsS0FBSyxFQUFFLE1BRmtDO0FBR3pDLFFBQUEsUUFBUSxFQUFFLElBSCtCO0FBSXpDLFFBQUEsS0FBSyxFQUFFLGVBQVMsQ0FBVCxFQUFZO0FBQ2pCLDJCQUFRLElBQVI7QUFDRDtBQU53QyxPQUE5QixFQU9WLENBUFUsQ0FBYjtBQVNBLE1BQUEsVUFBVSxHQUFHLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsV0FBbEIsQ0FBOEI7QUFDekMsUUFBQSxHQUFHLEVBQUUscUJBRG9DO0FBRXpDLFFBQUEsS0FBSyxFQUFFLE1BRmtDO0FBR3pDLFFBQUEsUUFBUSxFQUFFLElBSCtCO0FBSXpDLFFBQUEsS0FBSyxFQUFFLGVBQVMsQ0FBVCxFQUFZO0FBQ2pCLDJCQUFRLElBQVI7QUFDRDtBQU53QyxPQUE5QixFQU9WLENBUFUsQ0FBYjtBQVFEOzs7NkJBRVE7QUFDUCxVQUFNLE9BQU8sR0FBRywrQkFBZSxPQUEvQjs7QUFFQSxVQUFJLE9BQUosRUFBYTtBQUNYLFlBQU0sT0FBTyxHQUFJLE9BQUQsR0FBWSxPQUFPLENBQUMsT0FBUixDQUFnQixPQUFoQixFQUFaLEdBQXdDLEtBQXhEO0FBQ0EsWUFBTSxPQUFPLEdBQUksT0FBRCxHQUFZLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE9BQWhCLEVBQVosR0FBd0MsS0FBeEQ7QUFDQSxRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxXQUFkLENBQTBCLFVBQTFCLEVBQXNDLENBQUMsT0FBdkM7QUFDQSxRQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxXQUFkLENBQTBCLFVBQTFCLEVBQXNDLENBQUMsT0FBdkMsRUFKVyxDQU1qQjtBQUNLO0FBQ0Y7Ozs7OztBQUdILElBQU0sYUFBYSxHQUFHLElBQUksYUFBSixFQUF0Qjs7OztBQ2hEQSxhLENBRUE7Ozs7Ozs7Ozs7Ozs7SUFFTSxZOzs7QUFDSiwwQkFBYztBQUFBO0FBQ2I7Ozs7MkJBRU0sQ0FDTjs7O3lCQUVJLE8sRUFBUztBQUNaLE1BQUEsR0FBRyxDQUFDLE1BQUQsRUFBUyxPQUFULENBQUg7QUFDQSxNQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixPQUF4QjtBQUNEOzs7MEJBRUssTyxFQUFTO0FBQ2IsTUFBQSxHQUFHLENBQUMsT0FBRCxDQUFIO0FBQ0EsTUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLE9BQWQsR0FBd0IsTUFBeEI7QUFDRDs7O3lCQUVJLFEsRUFBVSxFLEVBQUk7QUFDakIsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxNQUFBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLGtCQUFwQjtBQUNBLE1BQUEsT0FBTyxDQUFDLEVBQVIsR0FBYSxFQUFFLEdBQUcsV0FBbEI7QUFFQSxNQUFBLE9BQU8sQ0FBQyxTQUFSLGNBQXdCLEVBQXhCO0FBQ0EsYUFBTyxPQUFQO0FBQ0Q7Ozs7OztBQUdILElBQU0sWUFBWSxHQUFHLElBQUksWUFBSixFQUFyQjs7OztBQy9CQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQUksT0FBTyxHQUFHLEVBQWQ7QUFDQSxJQUFJLE1BQU0sR0FBRyxFQUFiO0FBQ0EsSUFBSSxTQUFTLEdBQUcsR0FBaEI7O0FBRUEsSUFBTSxRQUFRLEdBQUcsU0FBWCxRQUFXLENBQUMsSUFBRCxFQUFPLEtBQVAsRUFBaUI7QUFDaEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQURnQztBQUFBO0FBQUE7O0FBQUE7QUFHaEMseUJBQWlCLEtBQWpCLDhIQUF3QjtBQUFBLFVBQWYsSUFBZTtBQUN0QixVQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0EsVUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBWjs7QUFDQSxVQUFJLElBQUksQ0FBQyxLQUFULEVBQWdCO0FBQ2QsUUFBQSxHQUFHLENBQUMsU0FBSixHQUFnQixTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFOLENBQUYsRUFBZ0IsSUFBSSxDQUFDLFdBQXJCLENBQXpCO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsUUFBQSxHQUFHLENBQUMsU0FBSixHQUFnQixHQUFoQjtBQUNEOztBQUNELE1BQUEsRUFBRSxDQUFDLFdBQUgsQ0FBZSxlQUFlLENBQUMsR0FBRCxFQUFNLElBQUksQ0FBQyxLQUFYLEVBQWtCLElBQUksQ0FBQyxLQUF2QixDQUE5Qjs7QUFDQSxVQUFJLElBQUksQ0FBQyxPQUFULEVBQWtCO0FBQ2hCLFFBQUEsUUFBUSxDQUFDLEVBQUQsRUFBSyxJQUFJLENBQUMsT0FBVixDQUFSO0FBQ0Q7O0FBRUQsTUFBQSxFQUFFLENBQUMsV0FBSCxDQUFlLEVBQWY7QUFDQSxNQUFBLElBQUksQ0FBQyxXQUFMLENBQWlCLEVBQWpCO0FBQ0Q7QUFsQitCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQmpDLENBbkJEOztBQXFCQSxJQUFNLGVBQWUsR0FBRyxTQUFsQixlQUFrQixDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksS0FBWixFQUFzQjtBQUM1QyxNQUFJLElBQUosRUFBVTtBQUNSLFFBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEdBQXZCLENBQVY7QUFDQSxJQUFBLENBQUMsQ0FBQyxTQUFGLEdBQWMsSUFBZDtBQUNBLElBQUEsQ0FBQyxDQUFDLEtBQUYsR0FBVSxLQUFLLElBQUksRUFBbkI7QUFDQSxJQUFBLENBQUMsQ0FBQyxLQUFGLENBQVEsT0FBUixHQUFrQixNQUFsQjtBQUNBLElBQUEsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsQ0FBaEI7QUFDRDs7QUFDRCxTQUFPLEdBQVA7QUFDRCxDQVREOztBQVdBLElBQU0sU0FBUyxHQUFHLFNBQVosU0FBWSxDQUFDLE1BQUQsRUFBUyxHQUFULEVBQWMsS0FBZCxFQUF3QjtBQUN4QyxFQUFBLEtBQUssR0FBSSxLQUFELEdBQVUsVUFBVixHQUF1QixFQUEvQjtBQUNBLEVBQUEsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFELENBQVYsSUFBbUIsUUFBekI7QUFFQSxNQUFNLE1BQU0sc0NBQ1csS0FEWCw0Q0FFVyxNQUZYLDBDQUdTLEdBSFQsV0FBWjtBQUlBLFNBQU8sTUFBUDtBQUNELENBVEQ7O0FBV0EsSUFBTSxVQUFVLEdBQUcsU0FBYixVQUFhLENBQUMsR0FBRCxFQUFTO0FBQzFCLE1BQUksR0FBSixFQUFTO0FBQ1AsUUFBSSxDQUFDLG1CQUFTLEtBQVQsRUFBTCxFQUF1QjtBQUNyQixVQUFJLEdBQUcsQ0FBQyxPQUFKLENBQVksZ0JBQVosS0FBaUMsQ0FBckMsRUFBd0MsT0FBTyxFQUFQO0FBRXhDLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksV0FBWixFQUF5QixhQUF6QixDQUFOO0FBQ0EsTUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxXQUFaLEVBQXlCLGNBQXpCLENBQU47QUFDQSxNQUFBLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBSixDQUFZLGFBQVosRUFBMkIsT0FBM0IsQ0FBTjtBQUNBLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksZ0JBQVosRUFBOEIsV0FBOUIsQ0FBTjtBQUNBLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksaUJBQVosRUFBK0IsTUFBL0IsQ0FBTjtBQUNBLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFKLEVBQU47QUFFRCxLQVZELE1BVU87QUFDTCxNQUFBLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBSixDQUFZLFdBQVosRUFBeUIsR0FBekIsQ0FBTjtBQUNBLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksV0FBWixFQUF5QixHQUF6QixDQUFOO0FBQ0EsTUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxhQUFaLEVBQTJCLFNBQTNCLENBQU47QUFDQSxNQUFBLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBSixDQUFZLGdCQUFaLEVBQThCLGdCQUE5QixDQUFOO0FBQ0EsTUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQUosQ0FBWSxpQkFBWixFQUErQixnQkFBL0IsQ0FBTjtBQUNBLE1BQUEsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFKLENBQVksU0FBWixFQUF1QixTQUF2QixDQUFOO0FBQ0EsTUFBQSxHQUFHLEdBQUcsR0FBRyxDQUFDLFdBQUosRUFBTjtBQUNEO0FBQ0Y7O0FBQ0QsU0FBTyxHQUFQO0FBQ0QsQ0F2QkQsQyxDQXlCQTs7O0lBRU0sUTs7O0FBQ0osc0JBQWM7QUFBQTtBQUNiOzs7OzJCQUVNLENBQ047Ozt5QkFFSSxPLEVBQVM7QUFDWixNQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixHQUF4QjtBQUNBLE1BQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0Q7OzswQkFFSyxPLEVBQVM7QUFDYixNQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsT0FBZCxHQUF3QixNQUF4QjtBQUNEOzs7eUJBRUksUSxFQUFVLEUsRUFBSTtBQUFBOztBQUNqQixVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBLE1BQUEsT0FBTyxDQUFDLFNBQVIsR0FBb0Isa0JBQXBCO0FBQ0EsTUFBQSxPQUFPLENBQUMsRUFBUixHQUFhLEVBQUUsR0FBRyxXQUFsQjtBQUVBLE1BQUEsUUFBUSxDQUFDLE9BQUQsRUFBVSxRQUFWLENBQVI7QUFDQSxNQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2YsUUFBQSxLQUFJLENBQUMsUUFBTCxDQUFjLE9BQU8sQ0FBQyxVQUFSLENBQW1CLENBQW5CLENBQWQsRUFBcUMsRUFBckM7QUFDRCxPQUZTLEVBRVAsQ0FGTyxDQUFWO0FBSUEsYUFBTyxPQUFQO0FBQ0Q7Ozs2QkFFUSxJLEVBQU0sRSxFQUFJO0FBQUE7O0FBQ2pCLE1BQUEsSUFBSSxDQUFDLEVBQUwsR0FBVSxFQUFFLEdBQUcsT0FBZjtBQUNBLE1BQUEsT0FBTyxDQUFDLEVBQUQsQ0FBUCxHQUFjLENBQUMsQ0FBQyxNQUFNLEVBQU4sR0FBVyxjQUFaLENBQWY7QUFDQSxNQUFBLE1BQU0sQ0FBQyxFQUFELENBQU4sR0FBYSxJQUFiO0FBRUEsTUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsSUFBUixDQUFhO0FBQ1gsUUFBQSxNQUFNLEVBQUUsVUFBUyxLQUFULEVBQWdCLEVBQWhCLEVBQW9CO0FBQzFCLGNBQUksS0FBSyxNQUFMLENBQVksS0FBWixFQUFtQixFQUFuQixDQUFKLEVBQTRCO0FBQzFCLGlCQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLEVBQXBCO0FBQ0EsWUFBQSxPQUFPLENBQUMsRUFBRCxDQUFQLENBQVksV0FBWixDQUF3QixRQUF4QixFQUFrQyxLQUFsQztBQUNEO0FBQ0YsU0FMTyxDQUtOLElBTE0sQ0FLRCxJQUxDO0FBREcsT0FBYjtBQVNBLE1BQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLEVBQVIsQ0FBVyxXQUFYLEVBQXdCLFlBQU07QUFDNUIsUUFBQSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUQsQ0FBUCxDQUFaO0FBQ0QsT0FGRDtBQUlBLE1BQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLEVBQVIsQ0FBVyxVQUFYLEVBQXVCLFlBQU07QUFDM0IsWUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFELENBQVAsQ0FBWSxXQUFaLENBQXdCLFFBQXhCLENBQUwsRUFBd0M7QUFDeEMsUUFBQSxNQUFNLENBQUMsRUFBRCxDQUFOLEdBQWEsVUFBVSxDQUFDLFlBQU07QUFDNUIsVUFBQSxNQUFJLENBQUMsUUFBTCxDQUFjLElBQWQsRUFBb0IsRUFBcEI7QUFDRCxTQUZzQixFQUVwQixTQUZvQixDQUF2QjtBQUdELE9BTEQ7QUFNRDs7OzZCQUVRLEksRUFBTSxFLEVBQUk7QUFBQTs7QUFDakIsTUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsSUFBUixDQUFhLGFBQWIsRUFBNEIsSUFBNUIsRUFBa0MsSUFBbEM7QUFDQSxNQUFBLElBQUksQ0FBQyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLE9BQXRCLEdBQWdDLE1BQWhDO0FBQ0EsTUFBQSxVQUFVLENBQUMsWUFBTTtBQUNmLFFBQUEsTUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsVUFBaEI7O0FBQ0EsUUFBQSxPQUFPLENBQUMsRUFBRCxDQUFQLENBQVksV0FBWixDQUF3QixRQUF4QixFQUFrQyxLQUFsQztBQUNELE9BSFMsRUFHUCxHQUhPLENBQVY7QUFJRCxLLENBRUQ7Ozs7MkJBRU8sTyxFQUFTO0FBQ2QsVUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVIsQ0FBbUIsQ0FBbkIsQ0FBYjtBQUNBLFVBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxFQUFSLENBQVcsT0FBWCxDQUFtQixNQUFuQixFQUEyQixFQUEzQixDQUFYLENBRmMsQ0FHbEI7O0FBRUksVUFBSSxFQUFFLElBQUksTUFBVixFQUFrQjtBQUNoQixhQUFLLGFBQUwsQ0FBbUIsSUFBbkI7QUFDRDs7QUFDRCxXQUFLLFlBQUwsQ0FBa0IsSUFBbEI7QUFDQSxNQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxJQUFSLENBQWEsU0FBYjtBQUNEOzs7Z0NBRVcsSSxFQUFNO0FBQ2hCLFVBQUksSUFBSixFQUFVO0FBQ1IsWUFBSSxJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixLQUFzQixJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixFQUFtQixTQUFuQixJQUFnQyxHQUExRCxFQUErRDtBQUM3RCxpQkFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFDRCxhQUFPLElBQVA7QUFDRDs7O2tDQUVhLEksRUFBTTtBQUNsQixhQUFPLENBQUMsS0FBSyxXQUFMLENBQWlCLElBQUksQ0FBQyxVQUFMLENBQWdCLENBQWhCLENBQWpCLENBQVIsRUFBOEM7QUFDNUMsUUFBQSxJQUFJLENBQUMsV0FBTCxDQUFpQixJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUFqQjtBQUNEOztBQUVELFVBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFYO0FBTGtCO0FBQUE7QUFBQTs7QUFBQTtBQU1sQiw4QkFBbUIscUJBQVUsSUFBN0IsbUlBQW1DO0FBQUEsY0FBeEIsSUFBd0I7QUFDakMsY0FBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBLGNBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLEtBQXZCLENBQVo7QUFDQSxVQUFBLEdBQUcsQ0FBQyxTQUFKLEdBQWdCLCtDQUErQyxJQUEvRDtBQUNBLFVBQUEsRUFBRSxDQUFDLFdBQUgsQ0FBZSxlQUFlLENBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxNQUFaLENBQTlCO0FBQ0EsVUFBQSxFQUFFLENBQUMsV0FBSCxDQUFlLEVBQWY7QUFDRCxTQVppQixDQWFsQjs7QUFia0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjbEIsTUFBQSxJQUFJLENBQUMsWUFBTCxDQUFrQixFQUFsQixFQUFzQixJQUFJLENBQUMsVUFBTCxDQUFnQixDQUFoQixDQUF0QjtBQUNEOzs7aUNBRVksSSxFQUFNO0FBQ2pCLFVBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxJQUFSLENBQWEsSUFBYixDQUFkO0FBRGlCO0FBQUE7QUFBQTs7QUFBQTtBQUVqQiw4QkFBbUIsS0FBbkIsbUlBQTBCO0FBQUEsY0FBZixJQUFlO0FBQ3hCLGNBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxJQUFSLENBQWEsR0FBYixDQUFiOztBQUNBLGNBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFMLElBQWUsQ0FBM0IsRUFBOEI7QUFDNUIsZ0JBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUSxTQUF0Qjs7QUFDQSxnQkFBTSxLQUFLLEdBQUcsV0FBVyxRQUFYLENBQW9CLEtBQXBCLENBQWQ7O0FBQ0EsZ0JBQUksS0FBSyxLQUFLLFNBQWQsRUFBeUI7QUFDdkIsa0JBQUksS0FBSixFQUFXO0FBQ1QsZ0JBQUEsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmLENBQXNCLG1CQUF0QjtBQUNELGVBRkQsTUFFTztBQUNMLGdCQUFBLElBQUksQ0FBQyxTQUFMLENBQWUsR0FBZixDQUFtQixtQkFBbkI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQWZnQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0JsQixLLENBRUQ7Ozs7MkJBRU8sSyxFQUFPLEUsRUFBSTtBQUNoQixVQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSCxDQUFRLENBQVIsS0FBYyxFQUFFLENBQUMsSUFBSCxDQUFRLENBQVIsRUFBVyxvQkFBWCxDQUFnQyxHQUFoQyxFQUFxQyxDQUFyQyxDQUF4Qjs7QUFDQSxVQUFJLENBQUosRUFBTztBQUNMLFlBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxTQUFmO0FBQ0EsWUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQWhCOztBQUVBLFlBQUksS0FBSixFQUFXO0FBQ1QsVUFBQSxHQUFHLFdBQUksS0FBSixhQUFnQixJQUFoQixFQUFIOztBQUNBLDJCQUFRLEVBQVIsV0FBYyxLQUFkLGFBQTBCLElBQTFCOztBQUNBLGlCQUFPLElBQVA7QUFDRDtBQUNGOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7Ozs7QUFHSCxJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQUosRUFBakI7Ozs7QUM3TkEsYSxDQUVBOzs7Ozs7Ozs7Ozs7O0lBRU0sTTs7O0FBQ0osb0JBQWM7QUFBQTs7QUFBQTs7QUFDWixRQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMseUJBQUQsQ0FBUCxDQUFtQyxVQUF0RDs7QUFFQSxTQUFLLElBQUksR0FBVCxJQUFnQixVQUFoQixFQUE0QjtBQUMxQixVQUFJLFNBQVMsQ0FBQyxRQUFWLENBQW1CLE9BQW5CLENBQTJCLEdBQTNCLEtBQW1DLENBQW5DLElBQXdDLFVBQVUsQ0FBQyxHQUFELENBQXRELEVBQTZEO0FBQUE7QUFDM0QsY0FBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUQsQ0FBdkI7O0FBQ0EsVUFBQSxLQUFJLENBQUMsU0FBTCxHQUFpQixVQUFDLE1BQUQsRUFBWTtBQUMzQixtQkFBTyxJQUFJLENBQUMsTUFBRCxDQUFKLElBQWdCLE1BQXZCO0FBQ0QsV0FGRDs7QUFHQTtBQUwyRDs7QUFBQSw4QkFLM0Q7QUFDRDtBQUNGO0FBQ0Y7Ozs7OEJBRVMsTSxFQUFRO0FBQ2hCLGFBQU8sTUFBUDtBQUNEOzs7a0NBRWEsSSxFQUFNO0FBQUE7O0FBQ2xCLGFBQU8sSUFBSSxDQUFDLE9BQUwsQ0FBYSxhQUFiLEVBQTRCLFVBQUMsR0FBRCxFQUFNLEtBQU4sRUFBZ0I7QUFDakQsZUFBTyxNQUFJLENBQUMsU0FBTCxDQUFlLEtBQWYsQ0FBUDtBQUNELE9BRk0sQ0FBUDtBQUdEOzs7Ozs7QUFHSCxJQUFNLE1BQU0sR0FBRyxJQUFJLE1BQUosRUFBZjs7OztBQzlCQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBRUE7SUFFTSxROzs7OztBQUNKLG9CQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFDbkIsa0ZBQU0sT0FBTjs7QUFDQSxVQUFLLElBQUw7O0FBRm1CO0FBR3BCOzs7OzJCQUVNO0FBQ0wsV0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUVKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDRzs7OzZCQUVRLENBQ1I7OzsrQkFFVSxPLEVBQVM7QUFDbEIsV0FBSyxPQUFMLEdBQWUsT0FBZjs7QUFDQSxVQUFJLE9BQUosRUFBYSxDQUNaLENBREQsTUFDTyxDQUNOOztBQUNELFdBQUssTUFBTDtBQUNEOzs7O0VBcERvQixVOzs7OztBQ1R2Qjs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7OztBQUlBLElBQUksVUFBSjtBQUNBLElBQUksV0FBSjtBQUNBLElBQUksYUFBSixDLENBRUE7O0lBRU0sVTs7O0FBQ0osd0JBQWM7QUFBQTs7QUFDWixTQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0Q7Ozs7MkJBRU07QUFDTCxNQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QixXQUF2QixDQUFtQztBQUM5QyxRQUFBLEdBQUcsRUFBRSxxQkFEeUM7QUFFOUMsUUFBQSxLQUFLLEVBQUUsTUFGdUM7QUFHOUMsUUFBQSxLQUFLLEVBQUUsVUFBUyxDQUFULEVBQVk7QUFBRSxlQUFLLE1BQUwsQ0FBWSxDQUFaO0FBQWdCLFNBQTlCLENBQStCLElBQS9CLENBQW9DLElBQXBDLENBSHVDO0FBSTlDLFFBQUEsT0FBTyxFQUFFLG1CQUFTLElBQVQsQ0FBYyw4QkFBZCxFQUFnQyxNQUFoQztBQUpxQyxPQUFuQyxFQUtWLENBTFUsQ0FBYjtBQU1KOzs7Ozs7Ozs7QUFRSSxNQUFBLGFBQWEsR0FBRyxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQixXQUExQixDQUFzQztBQUNwRCxRQUFBLEdBQUcsRUFBRSxxQkFEK0M7QUFFcEQsUUFBQSxLQUFLLEVBQUUsT0FGNkM7QUFHcEQsUUFBQSxLQUFLLEVBQUUsVUFBUyxDQUFULEVBQVk7QUFBRSxlQUFLLE1BQUwsQ0FBWSxDQUFaO0FBQWdCLFNBQTlCLENBQStCLElBQS9CLENBQW9DLElBQXBDLENBSDZDO0FBSXBELFFBQUEsT0FBTyxFQUFFLG1CQUFTLElBQVQsQ0FBYyxpQ0FBZCxFQUFtQyxTQUFuQyxDQUoyQztBQUtwRCxRQUFBLGFBQWEsRUFBRSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsQ0FBVjtBQUxxQyxPQUF0QyxFQU1iLENBTmEsQ0FBaEI7QUFRQSxXQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLFVBQWxCLEVBQThCLGFBQTlCO0FBQ0Q7Ozs2QkFFUSxDQUNSOzs7MkJBRU0sQyxFQUFHO0FBQ1IsVUFBSSxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsQ0FBbUIsT0FBbkIsQ0FBMkIsWUFBM0IsSUFBMkMsQ0FBL0MsRUFBa0Q7QUFDbEQsVUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFdBQVosQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUZqQztBQUFBO0FBQUE7O0FBQUE7QUFJUiw2QkFBcUIsS0FBSyxPQUExQiw4SEFBbUM7QUFBQSxjQUF4QixNQUF3QjtBQUNqQyxjQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsV0FBVixDQUFzQixRQUF0QixDQUFmO0FBQ0EsY0FBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLFdBQVYsQ0FBc0IsVUFBdEIsQ0FBakI7QUFDQSxjQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FBVCxDQUFpQixPQUFsQzs7QUFFQSxjQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBUCxJQUFhLENBQUMsQ0FBQyxNQUFGLENBQVMsRUFBcEMsRUFBd0M7QUFDdEMsZ0JBQUksQ0FBQyxNQUFMLEVBQWE7QUFDWCxpQ0FBUyxNQUFULENBQWdCLFFBQWhCOztBQUVBLGNBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLFdBQVYsQ0FBc0IsUUFBdEIsRUFBZ0MsSUFBaEM7O0FBQ0Esa0JBQUksUUFBUSxDQUFDLE9BQVQsQ0FBaUIsYUFBckIsRUFBb0M7QUFDbEMsZ0JBQUEsUUFBUSxDQUFDLHFCQUFUO0FBQ0Q7O0FBQ0QsaUNBQVMsSUFBVCxDQUFjLFFBQWQ7QUFFRCxhQVRELE1BU087QUFDTCxjQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxXQUFWLENBQXNCLFFBQXRCLEVBQWdDLEtBQWhDOztBQUNBLGlDQUFTLEtBQVQsQ0FBZSxRQUFmO0FBQ0Q7QUFFRixXQWZELE1BZU87QUFDTCxnQkFBSSxNQUFKLEVBQVk7QUFDVixjQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxXQUFWLENBQXNCLFFBQXRCLEVBQWdDLEtBQWhDOztBQUNBLGlDQUFTLEtBQVQsQ0FBZSxRQUFmO0FBQ0Q7QUFDRjtBQUNGO0FBOUJPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUErQlQ7Ozs7OztBQUdILElBQU0sVUFBVSxHQUFHLElBQUksVUFBSixFQUFuQjs7OztBQ3JGQTs7Ozs7O0FBRUEsSUFBTSxZQUFZLEdBQUcsQ0FDbkI7QUFBRSxFQUFBLEtBQUssRUFBRSxVQUFUO0FBQ0UsRUFBQSxPQUFPLEVBQUUsQ0FDUDtBQUFFLElBQUEsS0FBSyxFQUFFLG9CQUFUO0FBQStCLElBQUEsS0FBSyxFQUFFO0FBQXRDLEdBRE8sRUFFUDtBQUFFLElBQUEsSUFBSSxFQUFFO0FBQVIsR0FGTyxFQUdQO0FBQUUsSUFBQSxLQUFLLEVBQUUsY0FBVDtBQUF5QixJQUFBLEtBQUssRUFBRTtBQUFoQyxHQUhPLEVBSVA7QUFBRSxJQUFBLEtBQUssRUFBRSxxQkFBVDtBQUFnQyxJQUFBLEtBQUssRUFBRTtBQUF2QyxHQUpPLEVBS1A7QUFBRSxJQUFBLElBQUksRUFBRTtBQUFSLEdBTE8sRUFNUDtBQUFFLElBQUEsS0FBSyxFQUFFLGVBQVQ7QUFBMEIsSUFBQSxLQUFLLEVBQUU7QUFBakMsR0FOTztBQURYLENBRG1CLEVBaUJuQjtBQUFFLEVBQUEsS0FBSyxFQUFFLE1BQVQ7QUFDRSxFQUFBLE9BQU8sRUFBRSxDQUNQO0FBQUUsSUFBQSxLQUFLLEVBQUUsU0FBVDtBQUFvQixJQUFBLEtBQUssRUFBRTtBQUEzQixHQURPLEVBRVA7QUFBRSxJQUFBLEtBQUssRUFBRSxVQUFUO0FBQXFCLElBQUEsS0FBSyxFQUFFO0FBQTVCLEdBRk8sRUFHUDtBQUFFLElBQUEsS0FBSyxFQUFFLGFBQVQ7QUFBd0IsSUFBQSxPQUFPLEVBQUU7QUFBakMsR0FITyxFQUtQO0FBQUUsSUFBQSxJQUFJLEVBQUU7QUFBUixHQUxPLEVBTWI7QUFDQTtBQUVBO0FBQ0E7QUFFTTtBQUFFLElBQUEsS0FBSyxFQUFFLHNCQUFUO0FBQWlDLElBQUEsS0FBSyxFQUFFO0FBQXhDLEdBWk8sRUFhUDtBQUFFLElBQUEsSUFBSSxFQUFFO0FBQVIsR0FiTyxFQWViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTTtBQUFFLElBQUEsS0FBSyxFQUFFLFFBQVQ7QUFDTCxJQUFBLE9BQU8sRUFBRSxDQUNQO0FBQUUsTUFBQSxLQUFLLEVBQUUsb0NBQVQ7QUFBK0MsTUFBQSxLQUFLLEVBQUU7QUFBdEQsS0FETyxFQUVQO0FBQUUsTUFBQSxLQUFLLEVBQUUsZ0JBQVQ7QUFBMkIsTUFBQSxLQUFLLEVBQUU7QUFBbEMsS0FGTztBQURKLEdBcEJPO0FBRFgsQ0FqQm1CLEVBOENuQjtBQUFFLEVBQUEsS0FBSyxFQUFFLE1BQVQ7QUFDRSxFQUFBLE9BQU8sRUFBRSxDQUNQO0FBQUUsSUFBQSxLQUFLLEVBQUUsTUFBVDtBQUFpQixJQUFBLFFBQVEsRUFBRSxPQUEzQjtBQUFvQyxJQUFBLEtBQUssRUFBRTtBQUEzQyxHQURPLEVBRVA7QUFBRSxJQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCLElBQUEsUUFBUSxFQUFFLE9BQTNCO0FBQW9DLElBQUEsS0FBSyxFQUFFO0FBQTNDLEdBRk8sRUFHUDtBQUFFLElBQUEsSUFBSSxFQUFFO0FBQVIsR0FITyxFQUlQO0FBQUUsSUFBQSxLQUFLLEVBQUUsS0FBVDtBQUFnQixJQUFBLFFBQVEsRUFBRTtBQUExQixHQUpPLEVBS1A7QUFBRSxJQUFBLEtBQUssRUFBRSxNQUFUO0FBQWlCLElBQUEsUUFBUSxFQUFFO0FBQTNCLEdBTE8sRUFNUDtBQUFFLElBQUEsS0FBSyxFQUFFLE9BQVQ7QUFBa0IsSUFBQSxRQUFRLEVBQUU7QUFBNUIsR0FOTyxFQVFQO0FBQUUsSUFBQSxLQUFLLEVBQUUsWUFBVDtBQUF1QixJQUFBLFFBQVEsRUFBRSxZQUFqQztBQUErQyxJQUFBLEtBQUssRUFBRTtBQUF0RCxHQVJPO0FBRFgsQ0E5Q21CLEVBMERuQjtBQUFFLEVBQUEsS0FBSyxFQUFFLE1BQVQ7QUFDRSxFQUFBLE9BQU8sRUFBRSxDQUNQO0FBQUUsSUFBQSxLQUFLLEVBQUUsS0FBVDtBQUFnQixJQUFBLEtBQUssRUFBRTtBQUF2QixHQURPLEVBRVA7QUFBRSxJQUFBLEtBQUssRUFBRSxjQUFUO0FBQXlCLElBQUEsS0FBSyxFQUFFO0FBQWhDLEdBRk8sRUFHUDtBQUFFLElBQUEsS0FBSyxFQUFFLGVBQVQ7QUFBMEIsSUFBQSxLQUFLLEVBQUU7QUFBakMsR0FITyxFQUlQO0FBQUUsSUFBQSxJQUFJLEVBQUU7QUFBUixHQUpPLEVBS1A7QUFBRSxJQUFBLEtBQUssRUFBRSxnQkFBVDtBQUEyQixJQUFBLEtBQUssRUFBRTtBQUFsQyxHQUxPLEVBTVA7QUFBRSxJQUFBLEtBQUssRUFBRSxzQkFBVDtBQUFpQyxJQUFBLEtBQUssRUFBRTtBQUF4QyxHQU5PLEVBT1A7QUFBRSxJQUFBLEtBQUssRUFBRSxjQUFUO0FBQXlCLElBQUEsS0FBSyxFQUFFO0FBQWhDLEdBUE8sRUFRYjtBQUNBO0FBQ007QUFBRSxJQUFBLElBQUksRUFBRTtBQUFSLEdBVk8sRUFXUDtBQUFFLElBQUEsS0FBSyxFQUFFLGNBQVQ7QUFBeUIsSUFBQSxLQUFLLEVBQUU7QUFBaEMsR0FYTyxFQVlQO0FBQUUsSUFBQSxLQUFLLEVBQUUsbUJBQVQ7QUFBOEIsSUFBQSxLQUFLLEVBQUU7QUFBckMsR0FaTztBQURYLENBMURtQixFQTBFbkI7QUFBRSxFQUFBLEtBQUssRUFBRSxNQUFUO0FBQ0UsRUFBQSxPQUFPLEVBQUUsQ0FDUDtBQUFFLElBQUEsS0FBSyxFQUFFLGFBQVQ7QUFBd0IsSUFBQSxLQUFLLEVBQUU7QUFBL0IsR0FETyxFQUViO0FBQ007QUFBRSxJQUFBLEtBQUssRUFBRSxVQUFUO0FBQXFCLElBQUEsS0FBSyxFQUFFO0FBQTVCLEdBSE8sRUFJUDtBQUFFLElBQUEsS0FBSyxFQUFFLGlCQUFUO0FBQTRCLElBQUEsS0FBSyxFQUFFO0FBQW5DLEdBSk8sRUFLUDtBQUFFLElBQUEsSUFBSSxFQUFFO0FBQVIsR0FMTyxFQU1QO0FBQUUsSUFBQSxLQUFLLEVBQUUsU0FBVDtBQUFvQixJQUFBLEtBQUssRUFBRTtBQUEzQixHQU5PLEVBT1A7QUFBRSxJQUFBLEtBQUssRUFBRSxVQUFUO0FBQXFCLElBQUEsS0FBSyxFQUFFO0FBQTVCLEdBUE8sRUFRUDtBQUFFLElBQUEsSUFBSSxFQUFFO0FBQVIsR0FSTyxFQVNQO0FBQUUsSUFBQSxLQUFLLEVBQUUsYUFBVDtBQUF3QixJQUFBLEtBQUssRUFBRTtBQUEvQixHQVRPLEVBVVA7QUFBRSxJQUFBLEtBQUssRUFBRSx5QkFBVDtBQUNMLElBQUEsT0FBTyxFQUFFLENBQ1A7QUFBRSxNQUFBLEtBQUssRUFBRSxHQUFUO0FBQWMsTUFBQSxLQUFLLEVBQUU7QUFBckIsS0FETyxFQUVQO0FBQUUsTUFBQSxLQUFLLEVBQUUsR0FBVDtBQUFjLE1BQUEsS0FBSyxFQUFFO0FBQXJCLEtBRk8sRUFHUDtBQUFFLE1BQUEsS0FBSyxFQUFFLEdBQVQ7QUFBYyxNQUFBLEtBQUssRUFBRTtBQUFyQixLQUhPLEVBSVA7QUFBRSxNQUFBLEtBQUssRUFBRSxHQUFUO0FBQWMsTUFBQSxLQUFLLEVBQUU7QUFBckIsS0FKTztBQURKLEdBVk87QUFEWCxDQTFFbUIsQ0FBckI7O0FBaUdBLElBQU0sZ0JBQWdCLEdBQUcsQ0FDdkI7QUFBRSxFQUFBLEtBQUssRUFBRSxTQUFUO0FBQW9CLEVBQUEsS0FBSyxFQUFFO0FBQTNCLENBRHVCLEVBRXZCO0FBQUUsRUFBQSxLQUFLLEVBQUUsVUFBVDtBQUFxQixFQUFBLEtBQUssRUFBRTtBQUE1QixDQUZ1QixFQUd2QjtBQUFFLEVBQUEsSUFBSSxFQUFFO0FBQVIsQ0FIdUIsRUFJdkI7QUFBRSxFQUFBLEtBQUssRUFBRSxNQUFUO0FBQ0UsRUFBQSxPQUFPLEVBQUUsQ0FDYjtBQUNBO0FBQ007QUFBRSxJQUFBLEtBQUssRUFBRSxzQkFBVDtBQUFpQyxJQUFBLEtBQUssRUFBRTtBQUF4QyxHQUhPLEVBSVA7QUFBRSxJQUFBLElBQUksRUFBRTtBQUFSLEdBSk8sRUFNYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ007QUFBRSxJQUFBLEtBQUssRUFBRSxRQUFUO0FBQ0wsSUFBQSxPQUFPLEVBQUUsQ0FDUDtBQUFFLE1BQUEsS0FBSyxFQUFFLG9DQUFUO0FBQStDLE1BQUEsS0FBSyxFQUFFO0FBQXRELEtBRE8sRUFFUDtBQUFFLE1BQUEsS0FBSyxFQUFFLGdCQUFUO0FBQTJCLE1BQUEsS0FBSyxFQUFFO0FBQWxDLEtBRk87QUFESixHQVhPO0FBRFgsQ0FKdUIsRUF3QnZCO0FBQUUsRUFBQSxLQUFLLEVBQUUsTUFBVDtBQUNFLEVBQUEsT0FBTyxFQUFFLENBQ1A7QUFBRSxJQUFBLEtBQUssRUFBRSxLQUFUO0FBQWdCLElBQUEsS0FBSyxFQUFFO0FBQXZCLEdBRE8sRUFFUDtBQUFFLElBQUEsS0FBSyxFQUFFLGNBQVQ7QUFBeUIsSUFBQSxLQUFLLEVBQUU7QUFBaEMsR0FGTyxFQUdQO0FBQUUsSUFBQSxLQUFLLEVBQUUsZUFBVDtBQUEwQixJQUFBLEtBQUssRUFBRTtBQUFqQyxHQUhPLEVBSVA7QUFBRSxJQUFBLElBQUksRUFBRTtBQUFSLEdBSk8sRUFLUDtBQUFFLElBQUEsS0FBSyxFQUFFLGdCQUFUO0FBQTJCLElBQUEsS0FBSyxFQUFFO0FBQWxDLEdBTE8sRUFNUDtBQUFFLElBQUEsS0FBSyxFQUFFLHNCQUFUO0FBQWlDLElBQUEsS0FBSyxFQUFFO0FBQXhDLEdBTk8sRUFPUDtBQUFFLElBQUEsS0FBSyxFQUFFLGNBQVQ7QUFBeUIsSUFBQSxLQUFLLEVBQUU7QUFBaEMsR0FQTyxFQVFQO0FBQUUsSUFBQSxJQUFJLEVBQUU7QUFBUixHQVJPLEVBU1A7QUFBRSxJQUFBLEtBQUssRUFBRSxjQUFUO0FBQXlCLElBQUEsS0FBSyxFQUFFO0FBQWhDLEdBVE8sRUFVUDtBQUFFLElBQUEsS0FBSyxFQUFFLG1CQUFUO0FBQThCLElBQUEsS0FBSyxFQUFFO0FBQXJDLEdBVk87QUFEWCxDQXhCdUIsRUFzQ3ZCO0FBQUUsRUFBQSxLQUFLLEVBQUUsTUFBVDtBQUNFLEVBQUEsT0FBTyxFQUFFLENBQ1A7QUFBRSxJQUFBLEtBQUssRUFBRSxhQUFUO0FBQXdCLElBQUEsS0FBSyxFQUFFO0FBQS9CLEdBRE8sRUFFUDtBQUFFLElBQUEsS0FBSyxFQUFFLFVBQVQ7QUFBcUIsSUFBQSxLQUFLLEVBQUU7QUFBNUIsR0FGTyxFQUdQO0FBQUUsSUFBQSxLQUFLLEVBQUUsaUJBQVQ7QUFBNEIsSUFBQSxLQUFLLEVBQUU7QUFBbkMsR0FITyxFQUlQO0FBQUUsSUFBQSxJQUFJLEVBQUU7QUFBUixHQUpPLEVBS1A7QUFBRSxJQUFBLEtBQUssRUFBRSxTQUFUO0FBQW9CLElBQUEsS0FBSyxFQUFFO0FBQTNCLEdBTE8sRUFNUDtBQUFFLElBQUEsS0FBSyxFQUFFLFVBQVQ7QUFBcUIsSUFBQSxLQUFLLEVBQUU7QUFBNUIsR0FOTyxFQU9QO0FBQUUsSUFBQSxJQUFJLEVBQUU7QUFBUixHQVBPLEVBUVA7QUFBRSxJQUFBLEtBQUssRUFBRSxhQUFUO0FBQXdCLElBQUEsS0FBSyxFQUFFO0FBQS9CLEdBUk8sRUFTUDtBQUFFLElBQUEsS0FBSyxFQUFFLHlCQUFUO0FBQ0wsSUFBQSxPQUFPLEVBQUUsQ0FDUDtBQUFFLE1BQUEsS0FBSyxFQUFFLEdBQVQ7QUFBYyxNQUFBLEtBQUssRUFBRTtBQUFyQixLQURPLEVBRVA7QUFBRSxNQUFBLEtBQUssRUFBRSxHQUFUO0FBQWMsTUFBQSxLQUFLLEVBQUU7QUFBckIsS0FGTyxFQUdQO0FBQUUsTUFBQSxLQUFLLEVBQUUsR0FBVDtBQUFjLE1BQUEsS0FBSyxFQUFFO0FBQXJCLEtBSE8sRUFJUDtBQUFFLE1BQUEsS0FBSyxFQUFFLEdBQVQ7QUFBYyxNQUFBLEtBQUssRUFBRTtBQUFyQixLQUpPO0FBREosR0FUTztBQURYLENBdEN1QixFQTBEdkI7QUFBRSxFQUFBLElBQUksRUFBRTtBQUFSLENBMUR1QixFQTJEdkI7QUFBRSxFQUFBLEtBQUssRUFBRSxjQUFUO0FBQXlCLEVBQUEsS0FBSyxFQUFFO0FBQWhDLENBM0R1QixFQTREdkI7QUFBRSxFQUFBLEtBQUssRUFBRSxxQkFBVDtBQUFnQyxFQUFBLEtBQUssRUFBRTtBQUF2QyxDQTVEdUIsRUE2RHZCO0FBQUUsRUFBQSxLQUFLLEVBQUUsb0JBQVQ7QUFBK0IsRUFBQSxLQUFLLEVBQUU7QUFBdEMsQ0E3RHVCLENBQXpCOztBQWdFQSxJQUFNLG1CQUFtQixHQUFHLENBQzFCO0FBQUUsRUFBQSxLQUFLLEVBQUUsVUFBVDtBQUNFLEVBQUEsT0FBTyxFQUFFLENBQ1A7QUFBRSxJQUFBLEtBQUssRUFBRSxHQUFUO0FBQWMsSUFBQSxLQUFLLEVBQUU7QUFBckIsR0FETyxFQUVQO0FBQUUsSUFBQSxLQUFLLEVBQUUsR0FBVDtBQUFjLElBQUEsS0FBSyxFQUFFO0FBQXJCLEdBRk87QUFEWCxDQUQwQixDQUE1Qjs7OztBQ25LQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQUksUUFBSjtBQUNBLElBQUksTUFBTSxHQUFHLEVBQWI7O0FBRUEsSUFBTSxXQUFXLEdBQUcsU0FBZCxXQUFjLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDdkMseUJBQW1CLFFBQW5CLDhIQUE2QjtBQUFBLFVBQWxCLElBQWtCOztBQUMzQixVQUFJLElBQUksQ0FBQyxLQUFMLElBQWMsS0FBbEIsRUFBeUI7QUFDdkIsZUFBTyxJQUFQO0FBQ0Q7O0FBQ0QsVUFBSSxJQUFJLENBQUMsT0FBVCxFQUFrQjtBQUNoQixZQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU4sRUFBZSxLQUFmLENBQTFCO0FBQ0EsWUFBSSxNQUFKLEVBQVksT0FBTyxNQUFQO0FBQ2I7QUFDRjtBQVRzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQVV2QyxTQUFPLElBQVA7QUFDRCxDQVhEOztBQWFBLElBQU0sUUFBUSxHQUFHLFNBQVgsUUFBVyxDQUFDLFFBQUQsRUFBVyxLQUFYLEVBQWtCLEtBQWxCLEVBQTRCO0FBQzNDLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUF4Qjs7QUFDQSxNQUFJLElBQUosRUFBVTtBQUNSLElBQUEsS0FBSyxHQUFJLEtBQUQsR0FBVSxJQUFWLEdBQWlCLEtBQXpCO0FBRUEsSUFBQSxJQUFJLENBQUMsT0FBTCxHQUFlLEtBQWY7O0FBQ0EsUUFBSSxJQUFJLENBQUMsT0FBVCxFQUFrQjtBQUNoQixVQUFJLENBQUMsS0FBTCxFQUFZLE9BQU8sSUFBSSxDQUFDLE9BQVo7QUFDYjs7QUFDRCxJQUFBLE1BQU0sQ0FBQyxLQUFELENBQU4sR0FBZ0IsS0FBaEI7QUFDRDtBQUNGLENBWEQsQyxDQWFBOzs7SUFFTSxJOzs7QUFDSixrQkFBYztBQUFBO0FBQ2I7Ozs7MkJBRU07QUFDTCxXQUFLLE1BQUw7QUFDRDs7OzZCQUVRO0FBQ1AsTUFBQSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFJLENBQUMsU0FBTCxDQUFlLDBCQUFmLENBQVgsQ0FBWDtBQUNBLE1BQUEsTUFBTSxHQUFHLEVBQVQ7QUFFQSxXQUFLLGFBQUwsQ0FBbUIsUUFBbkI7QUFDQSxXQUFLLFlBQUwsQ0FBa0IsUUFBbEI7QUFDQSxXQUFLLE9BQUwsQ0FBYSxRQUFiO0FBQ0Q7Ozs0QkFFTyxRLEVBQVU7QUFDaEIsVUFBSSxtQkFBUyxHQUFiLEVBQWtCO0FBQ2hCLDJCQUFTLEdBQVQsQ0FBYSxXQUFiLENBQXlCLFFBQXpCO0FBQ0Q7QUFDRjs7O2tDQUVhLFEsRUFBVTtBQUN0QixVQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsUUFBRCxFQUFXLGFBQVgsQ0FBWCxDQUFxQyxPQUFyRDtBQURzQjtBQUFBO0FBQUE7O0FBQUE7QUFFdEIsOEJBQW1CLHFCQUFVLElBQTdCLG1JQUFtQztBQUFBLGNBQXhCLElBQXdCO0FBQ2pDLFVBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYTtBQUNYLFlBQUEsS0FBSyxFQUFFLElBREk7QUFDRSxZQUFBLElBQUksRUFBRSxJQURSO0FBQ2MsWUFBQSxLQUFLLEVBQUU7QUFEckIsV0FBYjtBQUdEO0FBTnFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPdkI7OztpQ0FFWSxRLEVBQVU7QUFDckIsVUFBTSxLQUFLLEdBQUksbUJBQVMsR0FBVixHQUFpQixJQUFqQixHQUF3QixLQUF0QztBQUNBLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxhQUFYLEVBQTBCLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBMUMsQ0FBUjtBQUNBLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxpQkFBWCxFQUE4QixLQUE5QixDQUFSLENBSHFCLENBSXpCOztBQUVJLFVBQU0sT0FBTyxHQUFHLCtCQUFlLE9BQS9CO0FBQ0EsVUFBTSxTQUFTLEdBQUksT0FBRCxHQUFZLElBQVosR0FBbUIsS0FBckM7QUFDQSxNQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsT0FBWCxFQUFvQixTQUFwQixDQUFSO0FBQ0EsTUFBQSxRQUFRLENBQUMsUUFBRCxFQUFXLFdBQVgsRUFBd0IsU0FBeEIsQ0FBUjtBQUNBLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxzQkFBWCxFQUFtQyxTQUFuQyxDQUFSO0FBQ0EsTUFBQSxRQUFRLENBQUMsUUFBRCxFQUFXLHVCQUFYLEVBQW9DLFNBQXBDLENBQVI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsb0NBQVgsRUFBaUQsU0FBakQsQ0FBUjtBQUNBLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxnQkFBWCxFQUE2QixTQUE3QixDQUFSO0FBRUEsTUFBQSxRQUFRLENBQUMsUUFBRCxFQUFXLEtBQVgsRUFBa0IsU0FBbEIsQ0FBUjtBQUNBLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxnQkFBWCxFQUE2QixTQUE3QixDQUFSO0FBQ0EsTUFBQSxRQUFRLENBQUMsUUFBRCxFQUFXLHNCQUFYLEVBQW1DLFNBQW5DLENBQVI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixTQUEzQixDQUFSO0FBQ0EsTUFBQSxRQUFRLENBQUMsUUFBRCxFQUFXLGNBQVgsRUFBMkIsU0FBM0IsQ0FBUjtBQUNBLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxlQUFYLEVBQTRCLFNBQTVCLENBQVI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixTQUEzQixDQUFSO0FBQ0EsTUFBQSxRQUFRLENBQUMsUUFBRCxFQUFXLG1CQUFYLEVBQWdDLFNBQWhDLENBQVI7QUFFQSxNQUFBLFFBQVEsQ0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixTQUFuQixDQUFSLENBeEJxQixDQXdCaUI7O0FBQ3RDLE1BQUEsUUFBUSxDQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLFNBQW5CLENBQVIsQ0F6QnFCLENBeUJpQjtBQUN2Qzs7OzZCQUVRLEssRUFBTztBQUNkLGFBQU8sTUFBTSxDQUFDLEtBQUQsQ0FBYjtBQUNEOzs7Ozs7QUFHSCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUosRUFBYjs7OztBQ3hHQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU0sV0FBVyxHQUFHO0FBQ2xCLEVBQUEsT0FBTyxFQUFFLG1CQURTO0FBRWxCLEVBQUEsS0FBSyxFQUFFLDRCQUZXLENBS3BCOztBQUxvQixDQUFwQjs7SUFPTSxVOzs7QUFDSix3QkFBYztBQUFBOztBQUNaLFNBQUssRUFBTCxHQUFVLGFBQVY7QUFDQSxTQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7Ozs7eUJBRUksTyxFQUFTO0FBQUE7O0FBQ1osTUFBQSxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQXJCO0FBRUEsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQU0sT0FBTyxHQUFHLEVBQWhCO0FBQ0EsUUFBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFSLElBQWMsSUFBZixDQUFGLENBQVAsR0FBaUMsT0FBakM7O0FBQ0EsWUFBSSxPQUFPLENBQUMsTUFBWixFQUFvQjtBQUNsQixVQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQVIsSUFBa0IsUUFBbkIsQ0FBRixDQUFQLEdBQXlDLE1BQXpDO0FBQ0Q7O0FBRUQsWUFBTSxNQUFNLEdBQUcsZUFBTyxhQUFQLDZEQUVULEtBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUZTLHlCQUdULEtBQUksQ0FBQyxVQUFMLENBQWdCLE9BQWhCLENBSFMsc0VBQWY7O0FBT0EsUUFBQSxDQUFDLENBQUMsS0FBSSxDQUFDLE9BQU4sQ0FBRCxDQUFnQixJQUFoQixDQUFxQixNQUFyQjtBQUNBLFFBQUEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFOLENBQUQsQ0FBZ0IsTUFBaEIsQ0FBdUI7QUFDckIsVUFBQSxRQUFRLEVBQUUsS0FEVztBQUVyQixVQUFBLFFBQVEsRUFBRTtBQUFFLFlBQUEsRUFBRSxFQUFDLGVBQUw7QUFBc0IsWUFBQSxFQUFFLEVBQUM7QUFBekIsV0FGVztBQUdyQixVQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQVIsSUFBaUIsRUFBbEIsQ0FIYTtBQUlyQixVQUFBLEtBQUssRUFBRSxJQUpjO0FBS3JCLFVBQUEsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFSLElBQWlCLEdBTEg7QUFNckIsVUFBQSxPQUFPLEVBQUU7QUFOWSxTQUF2QjtBQVFELE9BdkJNLENBQVA7QUF3QkQ7OzsrQkFFVSxPLEVBQVM7QUFDbEIsYUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQVQsQ0FBRCxJQUFzQixFQUE3QjtBQUNEOzs7OEJBRVMsTyxFQUFTO0FBQ2pCLFVBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFULENBQWYsRUFBK0I7QUFDN0Isb0NBQW9CLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBVCxDQUEvQjtBQUVELE9BSEQsTUFHTztBQUNMLGVBQU8sRUFBUDtBQUNEO0FBQ0Y7OztpQ0FFWSxPLEVBQVM7QUFDcEIsVUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssT0FBTixDQUFELENBQWdCLElBQWhCLENBQXFCLGlCQUFyQixDQUFaO0FBQ0EsTUFBQSxHQUFHLENBQUMsSUFBSixDQUFTLE9BQVQ7QUFDRDs7Ozs7O0FBR0gsSUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFKLEVBQW5COzs7O0FDbkVBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7O0FBRUE7SUFFTSxROzs7QUFDSixzQkFBYztBQUFBOztBQUNaLFNBQUssT0FBTCxHQUFlLHFCQUFmO0FBQ0EsU0FBSyxLQUFMLEdBQWEsS0FBYjtBQUVBLFNBQUssTUFBTCxHQUFjLGNBQWQ7QUFDQSxTQUFLLFFBQUwsR0FBZ0Isa0JBQWhCO0FBQ0EsU0FBSyxTQUFMLEdBQWlCLG9CQUFqQjtBQUNBLFNBQUssT0FBTCxHQUFlLGdCQUFmO0FBQ0EsU0FBSyxFQUFMLEdBQVUsTUFBVjtBQUNBLFNBQUssY0FBTCxHQUFzQiw4QkFBdEI7QUFDRDs7OzsyQkFFTTtBQUNMLHFCQUFPLElBQVA7O0FBQ0EseUJBQVMsSUFBVDs7QUFDQSwyQkFBVSxJQUFWOztBQUVBLGFBQUcsSUFBSDs7QUFFQSxXQUFLLGdCQUFMO0FBQ0EsV0FBSyxRQUFMLEdBQWdCLElBQUksa0JBQUosQ0FBYSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCLENBQWhCLENBQWIsQ0FBaEI7QUFDQSxXQUFLLFFBQUwsR0FBZ0IsSUFBSSxrQkFBSixDQUFhLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsQ0FBaEIsQ0FBYixDQUFoQjtBQUNBLFdBQUssUUFBTCxHQUFnQixJQUFJLGtCQUFKLENBQWEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixDQUFoQixDQUFiLENBQWhCOztBQUVBLG1CQUFNLElBQU47QUFDRDs7O3VDQUVrQjtBQUNqQixNQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLFVBQUMsQ0FBRCxFQUFPO0FBQ3ZCLFFBQUEsVUFBVSxDQUFDLFlBQVc7QUFDcEIsVUFBQSxHQUFHLENBQUMsVUFBRCxFQUNDLFFBQVEsQ0FBQyxJQUFULENBQWMsV0FEZixFQUVDLFFBQVEsQ0FBQyxJQUFULENBQWMsWUFGZixDQUFIOztBQUdBLGlCQUFHLE1BQUg7QUFDRCxTQUxTLEVBS1AsR0FMTyxDQUFWO0FBTUQsT0FQRDs7QUFTQSxNQUFBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFVBQUMsQ0FBRCxFQUFPO0FBQzVCLFFBQUEsR0FBRyxDQUFDLGFBQUQsQ0FBSDtBQUNBLGVBQU8sS0FBUDtBQUNELE9BSEQ7QUFJRDs7OzRCQUVPO0FBQ04sYUFBTyxTQUFTLENBQUMsUUFBVixDQUFtQixPQUFuQixDQUEyQixLQUEzQixDQUFQO0FBQ0Q7Ozs7OztBQUdILElBQU0sUUFBUSxHQUFHLElBQUksUUFBSixFQUFqQjs7OztBQ25FQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBO0lBRU0sYTs7O0FBQ0osMkJBQWM7QUFBQTs7QUFDWixTQUFLLEVBQUwsR0FBVSxpQkFBVjtBQUNBLFNBQUssT0FBTCxHQUFlLElBQWY7QUFDRDs7OzsyQkFFTTtBQUFBOztBQUNMLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QyxZQUFNLE9BQU8sR0FBRyxFQUFoQjtBQUNBLFFBQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFELENBQUYsQ0FBUCxHQUFtQixPQUFuQjtBQUNBLFFBQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFELENBQUYsQ0FBUCxHQUF1QixNQUF2Qjs7QUFFQSxZQUFNLE1BQU0sR0FBRyxlQUFPLGFBQVAsbW1DQUFmOztBQTRCQSxRQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTixDQUFELENBQWdCLElBQWhCLCtCQUE0QyxNQUE1QztBQUNBLFFBQUEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFOLENBQUQsQ0FBZ0IsTUFBaEIsQ0FBdUI7QUFDckIsVUFBQSxRQUFRLEVBQUUsS0FEVztBQUVyQixVQUFBLFFBQVEsRUFBRTtBQUFFLFlBQUEsRUFBRSxFQUFDLGVBQUw7QUFBc0IsWUFBQSxFQUFFLEVBQUM7QUFBekIsV0FGVztBQUdyQixVQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBRCxDQUhhO0FBSXJCLFVBQUEsS0FBSyxFQUFFLElBSmM7QUFLckIsVUFBQSxLQUFLLEVBQUUsR0FMYztBQU1yQixVQUFBLE9BQU8sRUFBRTtBQU5ZLFNBQXZCO0FBUUQsT0ExQ00sQ0FBUDtBQTJDRDs7O2lDQUVZLENBQUU7Ozs7OztBQUdqQixJQUFNLGFBQWEsR0FBRyxJQUFJLGFBQUosRUFBdEI7Ozs7QUMvREE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUVNLFE7Ozs7O0FBQ0osb0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUFBOztBQUNuQixrRkFBTSxPQUFOOztBQUNBLFVBQUssSUFBTDs7QUFGbUI7QUFHcEI7Ozs7MkJBRU0sQ0FDTjs7OztFQVBvQixVOzs7OztBQ052QixhLENBRUE7Ozs7Ozs7Ozs7Ozs7SUFFTSxJOzs7QUFDSixrQkFBYztBQUFBOztBQUNaLFNBQUssR0FBTCxHQUFXLENBQVg7QUFDRDs7OztpQ0FFWTtBQUNYLE1BQUEsR0FBRyxDQUFDLGlCQUFELEVBQW9CLEtBQUssR0FBekIsQ0FBSDtBQUNEOzs7Ozs7Ozs7QUNYSDs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7OztBQUVBO0lBRU0sYzs7O0FBQ0osNEJBQWM7QUFBQTs7QUFDWixTQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxTQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7Ozs7MkJBRU0sTyxFQUFTO0FBQ2QsVUFBSSxPQUFKLEVBQWE7QUFDWCxZQUFNLEtBQUssR0FBRyxLQUFLLFNBQUwsQ0FBZSxPQUFPLENBQUMsR0FBdkIsQ0FBZDs7QUFDQSxZQUFJLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDYixlQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLE9BQW5CO0FBQ0Q7O0FBQ0QsNkJBQVUsR0FBVixDQUFjLE9BQU8sQ0FBQyxHQUF0QjtBQUNEOztBQUVELFdBQUssT0FBTCxHQUFlLE9BQWY7O0FBQ0EseUJBQVMsVUFBVCxDQUFvQixPQUFwQjs7QUFDQSxtQkFBTSxHQUFOLENBQVUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFSLEVBQUgsR0FBb0IsSUFBckM7O0FBRUEsaUJBQUssTUFBTDs7QUFDQSw2QkFBVyxNQUFYO0FBQ0Q7Ozs4QkFFUyxHLEVBQUs7QUFDYixXQUFLLElBQUksQ0FBQyxHQUFHLENBQWIsRUFBZ0IsQ0FBQyxHQUFHLEtBQUssUUFBTCxDQUFjLE1BQWxDLEVBQTBDLENBQUMsRUFBM0MsRUFBK0M7QUFDN0MsWUFBSSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLEdBQWpCLElBQXdCLEdBQTVCLEVBQWlDO0FBQy9CLGlCQUFPLENBQVA7QUFDRDtBQUNGOztBQUNELGFBQU8sQ0FBQyxDQUFSO0FBQ0Q7Ozt5QkFFSSxHLEVBQUs7QUFDUixVQUFNLEtBQUssR0FBRyxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQWQ7QUFDQSxVQUFNLE9BQU8sR0FBSSxLQUFLLElBQUksQ0FBVixHQUFlLEtBQUssUUFBTCxDQUFjLEtBQWQsQ0FBZixHQUFzQyxJQUFJLGdCQUFKLENBQVksR0FBWixDQUF0RDtBQUVBLFdBQUssTUFBTCxDQUFZLE9BQVo7QUFDQSxhQUFPLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE9BQWhCLENBQVA7QUFDRDs7OzBCQUVLLE8sRUFBUztBQUNiLE1BQUEsSUFBSSxDQUFDLFNBQUQsRUFBWSxPQUFaLENBQUo7QUFDQSxVQUFJLENBQUMsT0FBTCxFQUFjLE9BQU8sR0FBRyxLQUFLLE9BQWY7QUFDZCxVQUFJLENBQUMsT0FBTCxFQUFjO0FBRWQsVUFBTSxLQUFLLEdBQUcsS0FBSyxTQUFMLENBQWUsT0FBTyxDQUFDLEdBQXZCLENBQWQ7O0FBQ0EsVUFBSSxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNkLGFBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsS0FBckIsRUFBNEIsQ0FBNUI7O0FBQ0EsWUFBSSxPQUFPLElBQUksS0FBSyxPQUFwQixFQUE2QjtBQUMzQixlQUFLLE1BQUwsQ0FBWSxLQUFLLFFBQUwsQ0FBYyxLQUFLLFFBQUwsQ0FBYyxNQUFkLEdBQXVCLENBQXJDLENBQVo7QUFDRDs7QUFDRCxRQUFBLE9BQU8sQ0FBQyxVQUFSO0FBQ0Q7QUFDRjs7Ozs7O0FBR0gsSUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFKLEVBQXZCOzs7O0FDcEVBOzs7Ozs7O0FBRUE7Ozs7Ozs7O0FBRUE7SUFFTSxPOzs7QUFDSixtQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQ2YsU0FBSyxHQUFMLEdBQVcsR0FBRyxDQUFDLE9BQUosQ0FBWSxLQUFaLEVBQW1CLEdBQW5CLENBQVg7QUFFQSxTQUFLLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNEOzs7O2lDQUVZO0FBQ1gsTUFBQSxHQUFHLENBQUMsb0JBQUQsRUFBdUIsS0FBSyxHQUE1QixDQUFIO0FBRUEsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixVQUFBLElBQUksRUFBSTtBQUN6QixRQUFBLElBQUksQ0FBQyxVQUFMO0FBQ0QsT0FGRDtBQUdEOzs7OEJBRVMsSSxFQUFNO0FBQ2QsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFiLEVBQWdCLENBQUMsR0FBRyxLQUFLLEtBQUwsQ0FBVyxNQUEvQixFQUF1QyxDQUFDLEVBQXhDLEVBQTRDO0FBQzFDLFlBQUksS0FBSyxLQUFMLENBQVcsQ0FBWCxFQUFjLEdBQWQsSUFBcUIsSUFBSSxDQUFDLEdBQTlCLEVBQW1DO0FBQ2pDLGlCQUFPLENBQVA7QUFDRDtBQUNGOztBQUNELGFBQU8sQ0FBQyxDQUFSO0FBQ0Q7OzsyQkFFTTtBQUNMLGFBQVEsS0FBSyxHQUFOLEdBQWEsS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixPQUFqQixFQUEwQixFQUExQixDQUFiLEdBQTZDLENBQUMsQ0FBQyxVQUFELENBQXJEO0FBQ0Q7Ozs7Ozs7OztBQ2pDSDs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7OztBQUVBLElBQU0sR0FBRyxHQUFHLEVBQVosQyxDQUVBOztJQUVNLFM7OztBQUNKLHVCQUFjO0FBQUE7O0FBQ1osU0FBSyxJQUFMLEdBQVksRUFBWjtBQUNEOzs7OzJCQUVNO0FBQ0wsVUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQWIsQ0FBcUIscUJBQXJCLENBQWI7QUFDQSxXQUFLLElBQUwsR0FBYSxJQUFELEdBQVMsSUFBSSxDQUFDLEtBQUwsQ0FBVyxJQUFYLENBQVQsR0FBNEIsRUFBeEM7QUFDRDs7OzJCQUVNO0FBQ0wsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFLLElBQXBCLENBQWI7QUFDQSxNQUFBLFlBQVksQ0FBQyxPQUFiLENBQXFCLHFCQUFyQixFQUE0QyxJQUE1QztBQUNEOzs7bUNBRWM7QUFDYixXQUFLLElBQUwsR0FBWSxFQUFaO0FBQ0EsV0FBSyxJQUFMLEdBRmEsQ0FJakI7O0FBQ0ksaUJBQUssTUFBTCxHQUxhLENBTWpCOztBQUNHOzs7d0JBRUcsRyxFQUFLO0FBQ1AsV0FBSyxJQUFMLEdBQVksS0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixVQUFDLEtBQUQ7QUFBQSxlQUFXLEtBQUssSUFBSSxHQUFwQjtBQUFBLE9BQWpCLENBQVo7QUFDQSxXQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLEdBQWxCOztBQUVBLFVBQUksS0FBSyxJQUFMLENBQVUsTUFBVixHQUFtQixHQUF2QixFQUE0QjtBQUMxQixhQUFLLElBQUwsQ0FBVSxNQUFWLEdBQW1CLEdBQW5CO0FBQ0Q7O0FBQ0QsV0FBSyxJQUFMO0FBQ0Q7Ozs7OztBQUdILElBQU0sU0FBUyxHQUFHLElBQUksU0FBSixFQUFsQjs7OztBQzVDQTs7Ozs7O0FBRUEsSUFBTSxlQUFlLEdBQUc7QUFDdEIsRUFBQSxJQUFJLEVBQUUsQ0FBQyxXQUFELEVBQWMsUUFBZCxFQUF3QixNQUF4QixFQUFnQyxHQUFoQyxDQURnQjtBQUV0QixFQUFBLElBQUksRUFBRSxDQUFDLFdBQUQsRUFBYyxRQUFkLEVBQXdCLE1BQXhCLEVBQWdDLEdBQWhDLENBRmdCO0FBR3RCLEVBQUEsSUFBSSxFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxTQUFYLENBSGdCO0FBSXRCLEVBQUEsTUFBTSxFQUFFLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxVQUFYLENBSmM7QUFLdEIsRUFBQSxVQUFVLEVBQUUsQ0FBQyxHQUFELEVBQU0sTUFBTixFQUFjLEdBQWQsQ0FMVTtBQU90QixFQUFBLGFBQWEsRUFBRSxDQUFDLFdBQUQsRUFBYyxPQUFkLENBUE87QUFRdEIsRUFBQSxVQUFVLEVBQUUsQ0FBQyxXQUFELEVBQWMsT0FBZCxDQVJVO0FBVXRCLEVBQUEsS0FBSyxFQUFFLENBQUMsV0FBRCxFQUFjLE9BQWQsQ0FWZTtBQVd0QixFQUFBLElBQUksRUFBRSxDQUFDLFdBQUQsRUFBYyxPQUFkLENBWGdCO0FBWXRCLEVBQUEsTUFBTSxFQUFFLENBQUMsaUJBQUQsQ0FaYztBQWN0QixFQUFBLGdCQUFnQixFQUFFLENBQUMsV0FBRCxFQUFjLE9BQWQsQ0FkSTtBQWV0QixFQUFBLGVBQWUsRUFBRSxDQUFDLGlCQUFELEVBQW9CLGFBQXBCLENBZks7QUFnQnRCLEVBQUEsZ0JBQWdCLEVBQUUsQ0FBQyxpQkFBRCxFQUFvQixhQUFwQixDQWhCSTtBQWlCdEIsRUFBQSxhQUFhLEVBQUUsQ0FBQyxXQUFELEVBQWMsT0FBZCxDQWpCTztBQWtCdEIsRUFBQSxXQUFXLEVBQUUsQ0FBQyxXQUFELEVBQWMsT0FBZCxDQWxCUztBQW9CdEI7QUFFQSxFQUFBLFFBQVEsRUFBRSxNQXRCWTtBQXVCdEIsRUFBQSxTQUFTLEVBQUUsT0F2Qlc7QUF3QnRCLEVBQUEsTUFBTSxFQUFFLElBeEJjO0FBeUJ0QixFQUFBLFFBQVEsRUFBRSxNQXpCWTtBQTJCdEIsRUFBQSxTQUFTLEVBQUUsUUEzQlc7QUE0QnRCLEVBQUEsUUFBUSxFQUFFLFFBNUJZO0FBNkJ0QixFQUFBLFNBQVMsRUFBRSxRQTdCVztBQStCdEIsRUFBQSxPQUFPLEVBQUUsR0EvQmE7QUFnQ3RCLEVBQUEsY0FBYyxFQUFFLGVBaENNO0FBaUN0QixFQUFBLE9BQU8sRUFBRSxlQWpDYTtBQW1DdEIsRUFBQSxHQUFHLEVBQUUsR0FuQ2lCO0FBb0N0QixFQUFBLE1BQU0sRUFBRSxHQXBDYztBQXFDdEIsRUFBQSxJQUFJLEVBQUUsR0FyQ2dCO0FBdUN0QjtBQUNBO0FBQ0E7QUFFQSxFQUFBLFVBQVUsRUFBRSxTQTNDVTtBQTRDdEIsRUFBQSxhQUFhLEVBQUUsU0E1Q087QUE4Q3RCLEVBQUEsVUFBVSxFQUFFLEdBOUNVO0FBK0N4QjtBQUNFLEVBQUEsVUFBVSxFQUFFLFNBaERVO0FBaUR0QixFQUFBLE9BQU8sRUFBRSxTQWpEYTtBQWtEdEIsRUFBQSxTQUFTLEVBQUUsU0FsRFc7QUFtRHRCLEVBQUEsU0FBUyxFQUFFLFNBbkRXO0FBb0R0QixFQUFBLFlBQVksRUFBRSxHQXBEUTtBQXFEdEIsRUFBQSxhQUFhLEVBQUUsR0FyRE87QUFzRHRCLEVBQUEsSUFBSSxFQUFFLFNBdERnQjtBQXVEdEIsRUFBQSxJQUFJLEVBQUUsU0F2RGdCO0FBd0R0QixFQUFBLElBQUksRUFBRSxTQXhEZ0I7QUF5RHRCLEVBQUEsSUFBSSxFQUFFLFNBekRnQjtBQTJEdEI7QUFDQTtBQUNBO0FBRUEsRUFBQSxjQUFjLEVBQUUsUUEvRE07QUFnRXRCLEVBQUEsV0FBVyxFQUFFLFFBaEVTO0FBaUV0QixFQUFBLGdCQUFnQixFQUFFLFFBakVJO0FBa0V0QixFQUFBLGVBQWUsRUFBRSxRQWxFSztBQW1FdEIsRUFBQSxPQUFPLEVBQUUsV0FuRWE7QUFvRXRCLEVBQUEsUUFBUSxFQUFFLEtBcEVZO0FBcUV0QixFQUFBLFFBQVEsRUFBRTtBQXJFWSxDQUF4Qjs7OztBQ0ZBLGEsQ0FFQTs7Ozs7OztBQUNBOztBQUNBOztBQU9BOzs7Ozs7OztJQUVNLFE7OztBQUNKLHNCQUFjO0FBQUE7O0FBQ1osU0FBSyxJQUFMLEdBQVksRUFBWjtBQUVBLElBQUEsU0FBUyxDQUFDLFdBQVYsQ0FBc0I7QUFDcEIsV0FBSyxTQURlO0FBRXBCLFdBQUssVUFGZTtBQUdwQixXQUFLLE1BSGU7QUFJcEIsV0FBSyxNQUplO0FBS3BCLFdBQUs7QUFMZSxLQUF0Qjs7QUFRQSxJQUFBLFNBQVMsQ0FBQyxTQUFWLENBQW9CLFlBQXBCLEdBQW1DLFVBQVMsQ0FBVCxFQUFZLE9BQVosRUFBcUIsS0FBckIsRUFBNEI7QUFDbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCSyxLQXRCRDtBQXVCRDs7OzsyQkFFTTtBQUNMLFVBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFiLENBQXFCLG1CQUFyQixDQUFiO0FBQ0EsV0FBSyxJQUFMLEdBQVksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBWCxDQUFILEdBQXNCLE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZCxFQUFrQixnQ0FBbEIsQ0FBdEM7QUFDQSxXQUFLLElBQUw7QUFDRDs7OzJCQUVNO0FBQ0wsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFLLElBQXBCLENBQWI7QUFDQSxNQUFBLFlBQVksQ0FBQyxPQUFiLENBQXFCLG1CQUFyQixFQUEwQyxJQUExQztBQUNEOzs7bUNBRWM7QUFDYixXQUFLLElBQUwsR0FBWSxNQUFNLENBQUMsTUFBUCxDQUFjLEVBQWQsRUFBa0IsZ0NBQWxCLENBQVo7QUFDQSxXQUFLLElBQUw7QUFFQSxNQUFBLFNBQVMsQ0FBQyxLQUFWO0FBQ0EsV0FBSyxJQUFMO0FBQ0Q7OzsyQkFFTTtBQUFBOztBQUFBLGlDQUNJLElBREo7QUFFSCxZQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsQ0FBWjtBQUNBLFlBQU0sT0FBTyxHQUFHLGlCQUFRLElBQVIsQ0FBaEI7QUFFQSxZQUFJLElBQUksSUFBSSxnQkFBWixFQUE4Qjs7QUFFOUIsWUFBSSxPQUFKLEVBQWE7QUFDbEIsVUFBQSxHQUFHLFlBQUssSUFBTCxFQUFIO0FBRUEsVUFBQSxTQUFTLENBQUMsSUFBVixDQUFlLEdBQWYsRUFBb0IsVUFBQyxDQUFELEVBQU87QUFDekIsNkJBQVEsSUFBUixHQUFlLGlCQUFRLE9BQXZCO0FBQ0EsNkJBQVEsT0FBUixHQUFrQixJQUFsQjs7QUFFTyxnQkFBSSxDQUFDLGVBQU8sTUFBUCxFQUFMLEVBQXNCO0FBQzNCLGNBQUEsR0FBRyxZQUFLLElBQUwsT0FBSDtBQUNPLGNBQUEsT0FBTztBQUNSOztBQUNELG1CQUFPLEtBQVAsQ0FSa0IsQ0FTNUI7QUFDQTtBQUVFLFdBWkQsRUFZRyxTQVpIO0FBY00sU0FqQkQsTUFpQk87QUFDWixVQUFBLEdBQUcsWUFBSyxJQUFMLHdCQUFIO0FBQ007QUExQkU7O0FBQ0wsV0FBSyxJQUFJLElBQVQsSUFBaUIsS0FBSyxJQUF0QixFQUE0QjtBQUFBLHlCQUFuQixJQUFtQjs7QUFBQSxpQ0FJSTtBQXNCL0IsT0EzQkksQ0E2QlQ7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNHOzs7Ozs7QUFHSCxJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQUosRUFBakI7Ozs7QUN0SEE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFJLFVBQUo7QUFDQSxJQUFJLFVBQUosQyxDQUVBOztJQUVNLFU7OztBQUNKLHdCQUFjO0FBQUE7O0FBQ1osU0FBSyxPQUFMLEdBQWUsRUFBZjtBQUNEOzs7OzJCQUVNO0FBQ0wsTUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUIsVUFBdkIsQ0FBa0M7QUFDN0MsUUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQUQsQ0FEc0M7QUFFN0MsUUFBQSxNQUFNLEVBQUUsSUFGcUM7QUFHN0MsUUFBQSxLQUFLLEVBQUUsVUFBUyxDQUFULEVBQVk7QUFDakIsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFVBQVosQ0FBdUIsVUFBdkIsQ0FBSixFQUF3QztBQUN0Qyw2QkFBUSxZQUFSO0FBQ0Q7QUFDRixTQUpNLENBSUwsSUFKSyxDQUlBLElBSkE7QUFIc0MsT0FBbEMsRUFRVixDQVJVLENBQWI7QUFVQSxNQUFBLFVBQVUsR0FBRyxDQUFDLENBQUMsbUJBQUQsQ0FBRCxDQUF1QixVQUF2QixDQUFrQztBQUM3QyxRQUFBLElBQUksRUFBRSxDQUFDLENBQUMsT0FBRCxDQURzQztBQUU3QyxRQUFBLEtBQUssRUFBRSxVQUFTLENBQVQsRUFBWTtBQUNqQixjQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSCxDQUFELENBQVksVUFBWixDQUF1QixVQUF2QixDQUFKLEVBQXdDO0FBQ3RDLDZCQUFRLFlBQVI7QUFDRDtBQUNGLFNBSk0sQ0FJTCxJQUpLLENBSUEsSUFKQTtBQUZzQyxPQUFsQyxFQU9WLENBUFUsQ0FBYjtBQVNBLFdBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsVUFBbEIsRUFBOEIsVUFBOUI7QUFDRDs7OzZCQUVRLENBQ1I7OzsyQkFFTSxJLEVBQU07QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDWCw2QkFBcUIsS0FBSyxPQUExQiw4SEFBbUM7QUFBQSxjQUF4QixNQUF3QjtBQUNqQyxjQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUsVUFBVixDQUFxQixRQUFyQixDQUFmOztBQUVBLGNBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFQLENBQVUsT0FBVixDQUFrQixJQUFsQixLQUEyQixDQUF6QyxFQUE0QztBQUMxQyxnQkFBSSxDQUFDLE1BQUwsRUFBYTtBQUNYLGNBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLFVBQVYsQ0FBcUIsUUFBckIsRUFBK0IsSUFBL0I7QUFDRDtBQUNGLFdBSkQsTUFJTztBQUNMLGdCQUFJLE1BQUosRUFBWTtBQUNWLGNBQUEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLFVBQVYsQ0FBcUIsUUFBckIsRUFBK0IsS0FBL0I7QUFDRDtBQUNGO0FBQ0Y7QUFiVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBY1o7Ozs7OztBQUdILElBQU0sVUFBVSxHQUFHLElBQUksVUFBSixFQUFuQjs7OztBQ3pEQTs7Ozs7OztBQUVBOzs7Ozs7OztBQUVBO0lBRU0sTzs7O0FBQ0oscUJBQWM7QUFBQTtBQUNiOzs7OzJCQUVNO0FBQ0wsNkJBQVcsSUFBWDtBQUNEOzs7MkJBRU0sSyxFQUFPO0FBQ1osNkJBQVcsTUFBWDtBQUNEOzs7Ozs7QUFHSCxJQUFNLE9BQU8sR0FBRyxJQUFJLE9BQUosRUFBaEI7Ozs7QUNuQkE7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNLEtBQUssR0FBRyxHQUFkO0FBQ0EsSUFBTSxDQUFDLEdBQUcsRUFBVjs7QUFFQSxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsRUFBZ0M7QUFDOUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQVAsQ0FBYSxHQUFiLENBQWQ7QUFDQSxNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUQsQ0FBTCxJQUFZLENBQWIsQ0FBcEI7QUFDQSxNQUFNLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUQsQ0FBTCxJQUFZLENBQWIsQ0FBcEI7QUFDQSxTQUFPO0FBQUUsSUFBQSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUwsR0FBYyxDQUFyQjtBQUF3QixJQUFBLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBUCxJQUFZLEtBQWIsR0FBc0I7QUFBbEQsR0FBUDtBQUNEOztBQUVELFNBQVMsY0FBVCxDQUF3QixFQUF4QixFQUE0QjtBQUMxQixNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixFQUF4QixDQUFWO0FBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUYsQ0FBUSxJQUFSLElBQWdCLENBQWpCLENBQVYsR0FBZ0MsQ0FBakMsSUFBc0MsS0FBaEQ7QUFDQSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBRixDQUFRLEdBQVIsSUFBZSxDQUFoQixDQUFWLEdBQStCLENBQWhDLElBQXFDLEtBQS9DO0FBQ0EsbUJBQVUsQ0FBVixjQUFlLE1BQU0sQ0FBckI7QUFDRCxDLENBRUQ7OztJQUVNLG9COzs7QUFDSixrQ0FBYztBQUFBOztBQUNaLFNBQUssRUFBTCxHQUFVLHdCQUFWO0FBQ0EsU0FBSyxPQUFMLEdBQWUsSUFBZjtBQUNEOzs7OzJCQUVNO0FBQUE7O0FBQ0wsYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQU0sT0FBTyxHQUFHLEVBQWhCO0FBQ0EsUUFBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUQsQ0FBRixDQUFQLEdBQW1CLE9BQW5CO0FBQ0EsUUFBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQUQsQ0FBRixDQUFQLEdBQXVCLE1BQXZCOztBQUVBLFlBQU0sTUFBTSxHQUFHLGVBQU8sYUFBUCxnTEFHMEIsS0FIMUIsMkJBRzhDLEtBSDlDLGdDQUd1RSxLQUh2RSx3QkFHMEYsS0FIMUYsKzhCQUFmOztBQXFCQSxRQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTixDQUFELENBQWdCLElBQWhCLHNDQUFtRCxNQUFuRDtBQUNBLFFBQUEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFOLENBQUQsQ0FBZ0IsTUFBaEIsQ0FBdUI7QUFDckIsVUFBQSxRQUFRLEVBQUUsS0FEVztBQUVyQixVQUFBLFFBQVEsRUFBRTtBQUFFLFlBQUEsRUFBRSxFQUFDLGVBQUw7QUFBc0IsWUFBQSxFQUFFLEVBQUM7QUFBekIsV0FGVztBQUdyQixVQUFBLEtBQUssRUFBRSxDQUFDLENBQUMsaUJBQUQsQ0FIYTtBQUlyQixVQUFBLEtBQUssRUFBRSxJQUpjO0FBS3JCLFVBQUEsS0FBSyxFQUFFLEdBTGM7QUFNckIsVUFBQSxPQUFPLEVBQUUsT0FOWTtBQU9yQixVQUFBLElBQUksRUFBRSxnQkFBVztBQUNmLFlBQUEsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRLE1BQVIsR0FBaUIsSUFBakIsQ0FBc0IscUJBQXRCLEVBQTZDLEtBQTdDO0FBQ0Q7QUFUb0IsU0FBdkI7QUFZRCxPQXZDTSxDQUFQO0FBd0NEOzs7aUNBRVksQ0FBRTs7Ozs7O0FBR2pCLElBQU0sb0JBQW9CLEdBQUcsSUFBSSxvQkFBSixFQUE3QjtBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0lBRU0sUTs7Ozs7QUFDSixvQkFBWSxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ25CLGtGQUFNLE9BQU47O0FBQ0EsVUFBSyxJQUFMOztBQUZtQjtBQUdwQjs7OzsyQkFFTSxDQUNOOzs7O0VBUG9CLFU7Ozs7O0FDUHZCOzs7Ozs7O0FBRUE7Ozs7Ozs7O0lBRU0sSzs7O0FBQ0osbUJBQWU7QUFBQTtBQUNkOzs7OzJCQUVNO0FBQ0wsV0FBSyxHQUFMO0FBQ0Q7Ozt3QkFFRyxLLEVBQU87QUFDVCxVQUFJLENBQUMsS0FBTCxFQUFZO0FBQ1YsUUFBQSxLQUFLLEdBQUksbUJBQVMsS0FBVixhQUFzQixDQUFDLENBQUMsVUFBRCxDQUF2QixjQUF1QyxDQUFDLENBQUMsT0FBRCxDQUF4QyxJQUFzRCxDQUFDLENBQUMsVUFBRCxDQUEvRDtBQUNEOztBQUNELFVBQUksbUJBQVMsR0FBYixFQUFrQjtBQUNoQiwyQkFBUyxHQUFULENBQWEsUUFBYixDQUFzQixLQUF0QjtBQUNELE9BRkQsTUFFTztBQUNMLFFBQUEsUUFBUSxDQUFDLEtBQVQsR0FBaUIsS0FBakI7QUFDRDtBQUNGOzs7Ozs7QUFHSCxJQUFNLEtBQUssR0FBRyxJQUFJLEtBQUosRUFBZDs7OztBQ3hCQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVNLE87OztBQUNKLHFCQUFjO0FBQUE7QUFDYjs7OzsyQkFFTTtBQUNMLDZCQUFXLElBQVg7O0FBQ0EsbUNBQWMsSUFBZDs7QUFDQSw2QkFBVyxJQUFYOztBQUNBLDZCQUFXLElBQVg7O0FBRUEsV0FBSyxNQUFMO0FBQ0EsV0FBSyxhQUFMO0FBQ0Q7OztvQ0FFZTtBQUNkLDZCQUFXLE1BQVg7O0FBQ0EsbUNBQWMsTUFBZDs7QUFDQSw2QkFBVyxNQUFYOztBQUNBLDZCQUFXLE1BQVg7QUFDRDs7OzJCQUVNLEssRUFBTztBQUNaLFVBQUksS0FBSyxJQUFJLFNBQWIsRUFBd0IsS0FBSyxHQUFHLGVBQU8sSUFBUCxDQUFZLE9BQXBCO0FBQ3hCLHFCQUFPLElBQVAsQ0FBWSxPQUFaLEdBQXNCLEtBQXRCOztBQUNBLHFCQUFPLElBQVA7O0FBRUEsTUFBQSxDQUFDLENBQUMsVUFBRCxDQUFELENBQWMsR0FBZCxDQUFrQixTQUFsQixFQUE2QixLQUFLLEdBQUcsT0FBSCxHQUFhLE1BQS9DO0FBQ0EsTUFBQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsR0FBWCxDQUFlLFFBQWYsRUFBeUIsS0FBSyxHQUFHLG1CQUFILEdBQXlCLE1BQXZEO0FBQ0EsTUFBQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsR0FBWCxDQUFlLEtBQWYsRUFBc0IsS0FBSyxHQUFHLE1BQUgsR0FBWSxHQUF2QyxFQVBZLENBU1o7QUFDRDs7OzZCQUVRO0FBQ1AsV0FBSyxNQUFMLENBQVksQ0FBQyxlQUFPLElBQVAsQ0FBWSxPQUF6QjtBQUNEOzs7Ozs7QUFHSCxJQUFNLE9BQU8sR0FBRyxJQUFJLE9BQUosRUFBaEI7Ozs7QUM5Q0E7Ozs7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLFNBQUo7QUFDQSxJQUFJLFlBQUo7QUFDQSxJQUFJLFVBQUosQyxDQUVBOztJQUVNLFU7OztBQUNKLHdCQUFjO0FBQUE7O0FBQ1osU0FBSyxPQUFMLEdBQWUsRUFBZjtBQUNEOzs7OzJCQUVNO0FBQ0wsTUFBQSxTQUFTLEdBQUcsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQixXQUFqQixDQUE2QjtBQUN2QyxRQUFBLEdBQUcsRUFBRSxvQkFEa0M7QUFFdkMsUUFBQSxNQUFNLEVBQUUsSUFGK0I7QUFHdkMsUUFBQSxLQUFLLEVBQUUsTUFIZ0M7QUFJdkMsUUFBQSxLQUFLLEVBQUUsVUFBUyxDQUFULEVBQVk7QUFDakIsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFdBQVosQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUN2QyxpQkFBSyxNQUFMLENBQVksS0FBWjtBQUNEO0FBQ0YsU0FKTSxDQUlMLElBSkssQ0FJQSxJQUpBLENBSmdDO0FBU3ZDLFFBQUEsT0FBTyxFQUFFLDJCQUFhLElBQWIsQ0FBa0IsYUFBbEIsRUFBaUMsS0FBakM7QUFUOEIsT0FBN0IsRUFVVCxDQVZTLENBQVo7QUFZQSxNQUFBLFlBQVksR0FBRyxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQixXQUFwQixDQUFnQztBQUM3QyxRQUFBLEdBQUcsRUFBRSx1QkFEd0M7QUFFN0MsUUFBQSxLQUFLLEVBQUUsTUFGc0M7QUFHN0MsUUFBQSxLQUFLLEVBQUUsVUFBUyxDQUFULEVBQVk7QUFDakIsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFdBQVosQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUN2QyxpQkFBSyxNQUFMLENBQVksUUFBWjtBQUNEO0FBQ0YsU0FKTSxDQUlMLElBSkssQ0FJQSxJQUpBLENBSHNDO0FBUTdDLFFBQUEsT0FBTyxFQUFFLDJCQUFhLElBQWIsQ0FBa0IsZ0JBQWxCLEVBQW9DLFFBQXBDO0FBUm9DLE9BQWhDLEVBU1osQ0FUWSxDQUFmO0FBV0EsTUFBQSxVQUFVLEdBQUcsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixXQUFsQixDQUE4QjtBQUN6QyxRQUFBLEdBQUcsRUFBRSxxQkFEb0M7QUFFekMsUUFBQSxLQUFLLEVBQUUsTUFGa0M7QUFHekMsUUFBQSxLQUFLLEVBQUUsVUFBUyxDQUFULEVBQVk7QUFDakIsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUgsQ0FBRCxDQUFZLFdBQVosQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUN2QyxpQkFBSyxNQUFMLENBQVksTUFBWjtBQUNEO0FBQ0YsU0FKTSxDQUlMLElBSkssQ0FJQSxJQUpBLENBSGtDO0FBUXpDLFFBQUEsT0FBTyxFQUFFLDJCQUFhLElBQWIsQ0FBa0IsY0FBbEIsRUFBa0MsTUFBbEM7QUFSZ0MsT0FBOUIsRUFTVixDQVRVLENBQWI7QUFXQSxXQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLFNBQWxCLEVBQTZCLFlBQTdCLEVBQTJDLFVBQTNDO0FBQ0Q7Ozs2QkFFUSxDQUNSOzs7MkJBRU0sSSxFQUFNO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ1gsNkJBQXFCLEtBQUssT0FBMUIsOEhBQW1DO0FBQUEsY0FBeEIsTUFBd0I7QUFDakMsY0FBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVLFdBQVYsQ0FBc0IsUUFBdEIsQ0FBZjs7QUFFQSxjQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBUCxDQUFVLE9BQVYsQ0FBa0IsSUFBbEIsS0FBMkIsQ0FBekMsRUFBNEM7QUFDMUMsZ0JBQUksQ0FBQyxNQUFMLEVBQWE7QUFDWCxjQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxXQUFWLENBQXNCLFFBQXRCLEVBQWdDLElBQWhDO0FBQ0Q7QUFDRixXQUpELE1BSU87QUFDTCxnQkFBSSxNQUFKLEVBQVk7QUFDVixjQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVSxXQUFWLENBQXNCLFFBQXRCLEVBQWdDLEtBQWhDO0FBQ0Q7QUFDRjtBQUNGO0FBYlU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWNaOzs7Ozs7QUFHSCxJQUFNLFVBQVUsR0FBRyxJQUFJLFVBQUosRUFBbkI7Ozs7QUMxRUE7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7SUFFTSxFOzs7QUFDSixnQkFBYztBQUFBOztBQUNaLFNBQUssSUFBTCxHQUFZLFVBQVo7QUFDQSxTQUFLLE9BQUwsR0FBZSxnQkFBZjtBQUNBLFNBQUssTUFBTCxHQUFjLGNBQWQ7QUFFQSxTQUFLLE9BQUwsR0FBZSxnQkFBZjtBQUNBLFNBQUssT0FBTCxHQUFlLGdCQUFmO0FBQ0Q7Ozs7MkJBRU07QUFDTCxpQkFBSyxJQUFMOztBQUNBLG1CQUFNLElBQU47O0FBQ0EsdUJBQVEsSUFBUjs7QUFDQSxxQkFBTyxJQUFQOztBQUVBLHVCQUFRLElBQVI7O0FBQ0EsdUJBQVEsSUFBUjs7QUFFQSxNQUFBLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsR0FBakIsQ0FBcUIsU0FBckIsRUFBZ0MsQ0FBaEM7QUFDRDs7OzZCQUVRO0FBQ1AsTUFBQSxJQUFJLENBQUMsYUFBRCxDQUFKOztBQUNBLHVCQUFRLE1BQVIsR0FGTyxDQUlYO0FBQ0E7QUFFQTs7QUFDRzs7Ozs7O0FBR0gsSUFBTSxFQUFFLEdBQUcsSUFBSSxFQUFKLEVBQVg7Ozs7QUM1Q0E7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJLGVBQUo7QUFDQSxJQUFJLFVBQUo7QUFDQSxJQUFJLFlBQUo7QUFDQSxJQUFJLFdBQUosQyxDQUVBOztJQUVNLFU7OztBQUNKLHdCQUFjO0FBQUE7QUFDYjs7OzsyQkFFTTtBQUNMLE1BQUEsZUFBZSxHQUFHLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUIsV0FBakIsQ0FBNkI7QUFDN0MsUUFBQSxHQUFHLEVBQUUsMEJBRHdDO0FBRTdDLFFBQUEsS0FBSyxFQUFFLE9BRnNDO0FBRzdDLFFBQUEsS0FBSyxFQUFFLGVBQVMsQ0FBVCxFQUFZO0FBQUUsMkJBQVEsU0FBUjtBQUFxQjtBQUhHLE9BQTdCLEVBSWYsQ0FKZSxDQUFsQjtBQU1BLE1BQUEsVUFBVSxHQUFHLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsV0FBbEIsQ0FBOEI7QUFDekMsUUFBQSxHQUFHLEVBQUUscUJBRG9DO0FBRXpDLFFBQUEsUUFBUSxFQUFFLElBRitCO0FBR3pDLFFBQUEsS0FBSyxFQUFFLE9BSGtDO0FBSXpDLFFBQUEsS0FBSyxFQUFFLGVBQVMsQ0FBVCxFQUFZO0FBQUUsMkJBQVEsSUFBUjtBQUFnQjtBQUpJLE9BQTlCLEVBS1YsQ0FMVSxDQUFiO0FBT0EsTUFBQSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0IsV0FBcEIsQ0FBZ0M7QUFDN0MsUUFBQSxHQUFHLEVBQUUsdUJBRHdDO0FBRTdDLFFBQUEsUUFBUSxFQUFFLElBRm1DO0FBRzdDLFFBQUEsS0FBSyxFQUFFLE9BSHNDO0FBSTdDLFFBQUEsS0FBSyxFQUFFLGVBQVMsQ0FBVCxFQUFZO0FBQUUsMkJBQVEsTUFBUjtBQUFrQjtBQUpNLE9BQWhDLEVBS1osQ0FMWSxDQUFmO0FBT0EsTUFBQSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixXQUFuQixDQUErQjtBQUMzQyxRQUFBLEdBQUcsRUFBRSx1QkFEc0M7QUFFM0MsUUFBQSxLQUFLLEVBQUUsT0FGb0M7QUFHM0MsUUFBQSxLQUFLLEVBQUUsZUFBUyxDQUFULEVBQVk7QUFBRSwyQkFBUSxPQUFSO0FBQW1CO0FBSEcsT0FBL0IsRUFJWCxDQUpXLENBQWQ7QUFLRDs7OzZCQUVRO0FBQ1AsVUFBTSxPQUFPLEdBQUcsK0JBQWUsT0FBL0I7QUFDQSxVQUFNLFNBQVMsR0FBRyxPQUFsQixDQUZPLENBRW1COztBQUUxQixNQUFBLENBQUMsQ0FBQyxVQUFELENBQUQsQ0FBYyxXQUFkLENBQTBCLFVBQTFCLEVBQXNDLENBQUMsT0FBdkM7QUFDQSxNQUFBLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0IsV0FBaEIsQ0FBNEIsVUFBNUIsRUFBd0MsQ0FBQyxPQUF6QztBQUNBLE1BQUEsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixXQUFuQixDQUErQixVQUEvQixFQUEyQyxDQUFDLE9BQTVDO0FBRUEsTUFBQSxDQUFDLENBQUMsZUFBRCxDQUFELENBQW1CLFdBQW5CLENBQStCLFFBQS9CLEVBQXlDLFNBQXpDO0FBQ0EsTUFBQSxDQUFDLENBQUMsV0FBRCxDQUFELENBQWUsV0FBZixDQUEyQixRQUEzQixFQUFxQyxlQUFPLElBQVAsQ0FBWSxPQUFqRDtBQUNEOzs7Ozs7QUFHSCxJQUFNLFVBQVUsR0FBRyxJQUFJLFVBQUosRUFBbkI7Ozs7QUMxREEsYSxDQUVBOzs7Ozs7Ozs7Ozs7O0lBRU0sSTs7O0FBQ0osZ0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUNuQixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0EsU0FBSyxtQkFBTDtBQUNEOzs7OzBDQUVxQjtBQUNwQixXQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBSyxLQUFMLEdBQWEsQ0FBYjtBQUVBLFVBQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLE9BQU4sQ0FBRCxDQUFnQixNQUFoQixFQUFqQjtBQUNBLE1BQUEsUUFBUSxDQUFDLEVBQVQsQ0FBWSxZQUFaLEVBQTBCLFVBQVMsQ0FBVCxFQUFZO0FBQ3BDLGFBQUssS0FBTCxHQUFhLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBVixFQUFhLE9BQTFCO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFWLEVBQWEsT0FBMUI7QUFDRCxPQUh5QixDQUd4QixJQUh3QixDQUduQixJQUhtQixDQUExQjtBQUtBLE1BQUEsUUFBUSxDQUFDLEVBQVQsQ0FBWSxXQUFaLEVBQXlCLFVBQVMsQ0FBVCxFQUFZO0FBQ25DLFlBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFGLENBQVUsQ0FBVixFQUFhLE9BQXZCO0FBQ0EsWUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFWLEVBQWEsT0FBdkI7QUFFQSxZQUFNLEtBQUssR0FBRyxLQUFLLE9BQUwsQ0FBYSxXQUEzQjtBQUNBLFlBQU0sTUFBTSxHQUFHLEtBQUssT0FBTCxDQUFhLFlBQTVCO0FBRUEsWUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFILENBQUQsQ0FBbUIsU0FBbkIsRUFBbEI7QUFDQSxZQUFNLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQUgsQ0FBRCxDQUFtQixVQUFuQixFQUFuQjtBQUNBLFlBQU0sSUFBSSxHQUFJLEtBQUssS0FBTCxHQUFhLENBQWQsR0FBbUIsQ0FBbkIsR0FBdUIsSUFBdkIsR0FBNkIsTUFBMUM7QUFDQSxZQUFNLElBQUksR0FBSSxLQUFLLEtBQUwsR0FBYSxDQUFkLEdBQW1CLENBQW5CLEdBQXVCLE1BQXZCLEdBQStCLE9BQTVDOztBQUVBLFlBQUksU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ25CLGNBQUksSUFBSSxLQUFLLElBQWIsRUFBbUIsQ0FBQyxDQUFDLGNBQUY7QUFFcEIsU0FIRCxNQUdPLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxhQUFGLENBQWdCLFlBQWhCLEdBQStCLE1BQWhELEVBQXdEO0FBQzdELGNBQUksSUFBSSxLQUFLLE1BQWIsRUFBcUIsQ0FBQyxDQUFDLGNBQUY7QUFDdEI7O0FBQ0QsWUFBSSxVQUFVLEtBQUssQ0FBbkIsRUFBc0I7QUFDcEIsY0FBSSxJQUFJLEtBQUssTUFBYixFQUFxQixDQUFDLENBQUMsY0FBRjtBQUV0QixTQUhELE1BR08sSUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDLGFBQUYsQ0FBZ0IsV0FBaEIsR0FBOEIsS0FBaEQsRUFBdUQ7QUFDNUQsY0FBSSxJQUFJLEtBQUssT0FBYixFQUFzQixDQUFDLENBQUMsY0FBRjtBQUN2Qjs7QUFDRCxhQUFLLEtBQUwsR0FBYSxDQUFiO0FBQ0EsYUFBSyxLQUFMLEdBQWEsQ0FBYjtBQUNELE9BMUJ3QixDQTBCdkIsSUExQnVCLENBMEJsQixJQTFCa0IsQ0FBekI7QUEyQkQ7Ozs7Ozs7OztBQy9DSDs7Ozs7Ozs7Ozs7OztJQUVNLE07OztBQUNKLG9CQUFjO0FBQUE7O0FBQ1osU0FBSyxlQUFMO0FBQ0EsU0FBSyxjQUFMO0FBQ0Q7Ozs7cUNBRWdCO0FBQ2YsTUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLHFCQUFULEVBQWdDO0FBQzlCLFFBQUEsT0FBTyxFQUFFO0FBQ1AsVUFBQSxLQUFLLEVBQUUsTUFEQTtBQUVQLFVBQUEsTUFBTSxFQUFFLE1BRkQ7QUFHUCxVQUFBLE1BQU0sRUFBRTtBQUhELFNBRHFCO0FBTzlCLFFBQUEsT0FBTyxFQUFFLG1CQUFXO0FBQ2xCLGVBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsYUFBdEI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLE9BQWpCLEVBQTBCLEtBQUssT0FBTCxDQUFhLEtBQXZDO0FBQ0EsZUFBSyxNQUFMLENBQVksS0FBSyxPQUFMLENBQWEsTUFBekI7QUFDQSxlQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCLEtBQUssT0FBTCxDQUFhLElBQS9CO0FBRUEsY0FBTSxLQUFLLEdBQUcsS0FBSyxPQUFMLENBQWEsS0FBM0I7QUFDQSxjQUFJLEtBQUosRUFBVyxLQUFLLE9BQUwsQ0FBYSxFQUFiLENBQWdCLE9BQWhCLEVBQXlCLEtBQXpCO0FBQ1osU0FmNkI7QUFpQjlCLFFBQUEsTUFBTSxFQUFFLGdCQUFTLEtBQVQsRUFBZ0I7QUFDdEIsY0FBSSxLQUFLLEtBQUssU0FBZCxFQUF5QixPQUFPLEtBQUssT0FBTCxDQUFhLE1BQXBCO0FBRXpCLGVBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsS0FBdEI7O0FBQ0EsY0FBSSxLQUFKLEVBQVc7QUFDVCxpQkFBSyxPQUFMLENBQWEsUUFBYixDQUFzQixRQUF0QjtBQUNELFdBRkQsTUFFTztBQUNMLGlCQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLFFBQXpCO0FBQ0Q7QUFDRjtBQTFCNkIsT0FBaEM7QUE0QkQ7OztzQ0FFaUI7QUFDaEIsTUFBQSxDQUFDLENBQUMsTUFBRixDQUFTLHNCQUFULEVBQWlDO0FBQy9CLFFBQUEsT0FBTyxFQUFFO0FBQ1AsVUFBQSxLQUFLLEVBQUUsTUFEQTtBQUVQLFVBQUEsS0FBSyxFQUFFLE1BRkE7QUFHUCxVQUFBLE1BQU0sRUFBRSxNQUhEO0FBSVAsVUFBQSxNQUFNLEVBQUUsS0FKRDtBQUtQLFVBQUEsUUFBUSxFQUFFO0FBTEgsU0FEc0I7QUFTL0IsUUFBQSxPQUFPLEVBQUUsbUJBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ1EsZUFBSyxPQUFMLENBQWEsR0FBYixDQUFpQixPQUFqQixFQUEwQixLQUFLLE9BQUwsQ0FBYSxLQUF2QztBQUNBLGVBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsT0FBakIsRUFBMEIsS0FBSyxPQUFMLENBQWEsS0FBdkM7QUFDQSxlQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLFFBQWpCLEVBQTJCLEtBQUssT0FBTCxDQUFhLE1BQXhDO0FBRUEsZUFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixPQUFsQixFQUEyQixDQUFDLENBQUMsS0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixPQUFsQixDQUFELENBQTVCO0FBRUEsZUFBSyxPQUFMLENBQWEsSUFBYixxQkFBK0IsS0FBSyxPQUFMLENBQWEsR0FBNUMsV0FWa0IsQ0FXMUI7O0FBRVEsZUFBSyxNQUFMLENBQVksS0FBSyxPQUFMLENBQWEsTUFBekI7QUFDQSxlQUFLLFFBQUwsQ0FBYyxLQUFLLE9BQUwsQ0FBYSxRQUEzQjs7QUFFQSxjQUFJLEtBQUssT0FBTCxDQUFhLE9BQWpCLEVBQTBCO0FBQ3hCLGdCQUFNLE9BQU8sR0FBRyxLQUFLLE9BQUwsQ0FBYSxPQUE3QjtBQUNBLFlBQUEsT0FBTyxDQUFDLEtBQVIsR0FBZ0IsRUFBaEI7O0FBQ0EsZ0JBQUksS0FBSyxPQUFMLENBQWEsS0FBYixJQUFzQixPQUExQixFQUFtQztBQUNqQyxjQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsS0FBZCxHQUFzQixHQUF0QjtBQUNEOztBQUNELGdCQUFNLE1BQU0sR0FBRyxLQUFLLE9BQUwsQ0FBYSxhQUFiLElBQThCLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBN0M7QUFDQSxZQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLE9BQW5COztBQUVBLGdCQUFJLEtBQUssT0FBTCxDQUFhLGFBQWpCLEVBQWdDLENBQzlCO0FBQ0Q7QUFDRjs7QUFFRCxjQUFNLEtBQUssR0FBRyxLQUFLLE9BQUwsQ0FBYSxLQUEzQjtBQUNBLGNBQUksS0FBSixFQUFXLEtBQUssT0FBTCxDQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsS0FBekI7QUFDWixTQXpDOEI7QUEyQy9CLFFBQUEsTUFBTSxFQUFFLGdCQUFTLEtBQVQsRUFBZ0I7QUFDdEIsY0FBSSxLQUFLLEtBQUssU0FBZCxFQUF5QixPQUFPLEtBQUssT0FBTCxDQUFhLE1BQXBCO0FBRXpCLGVBQUssT0FBTCxDQUFhLE1BQWIsR0FBc0IsS0FBdEI7O0FBQ0EsY0FBSSxLQUFKLEVBQVc7QUFDaEIsaUJBQUssT0FBTCxDQUFhLFFBQWIsQ0FBc0IsUUFBdEI7QUFDTSxXQUZELE1BRU87QUFDWixpQkFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixRQUF6QjtBQUNNO0FBQ0YsU0FwRDhCO0FBc0QvQixRQUFBLFFBQVEsRUFBRSxrQkFBUyxLQUFULEVBQWdCO0FBQ3hCLGNBQUksS0FBSyxLQUFLLFNBQWQsRUFBeUIsT0FBTyxLQUFLLE9BQUwsQ0FBYSxRQUFwQjtBQUV6QixlQUFLLE9BQUwsQ0FBYSxRQUFiLEdBQXdCLEtBQXhCOztBQUNBLGNBQUksS0FBSixFQUFXO0FBQ2hCLGlCQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLEtBQXRCO0FBQ00sV0FGRCxNQUVPO0FBQ1osaUJBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsS0FBekI7QUFDTTtBQUNGLFNBL0Q4QjtBQWlFL0IsUUFBQSxxQkFBcUIsRUFBRSxpQ0FBVztBQUNoQyxjQUFNLElBQUksR0FBRyxLQUFLLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLHFCQUFoQixFQUFiO0FBQ0EsY0FBTSxPQUFPLEdBQUcsS0FBSyxPQUFMLENBQWEsT0FBN0I7QUFDQSxjQUFNLFlBQVksR0FBRyxLQUFLLE9BQUwsQ0FBYSxZQUFiLElBQTZCLEdBQWxEO0FBRUEsY0FBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQVQsQ0FBYyxXQUE1QjtBQUNBLGNBQU0sSUFBSSxHQUFJLElBQUksQ0FBQyxDQUFMLEdBQVMsWUFBVixHQUEwQixLQUExQixHQUFrQyxJQUFJLENBQUMsQ0FBdkMsR0FBMkMsS0FBSyxHQUFHLFlBQWhFO0FBQ0EsVUFBQSxPQUFPLENBQUMsS0FBUixDQUFjLElBQWQsR0FBc0IsSUFBSSxHQUFHLENBQVIsR0FBYSxJQUFsQztBQUNBLFVBQUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxHQUFkLEdBQXFCLEtBQUssQ0FBTixHQUFXLElBQS9CO0FBQ0Q7QUExRThCLE9BQWpDO0FBNEVEOzs7Ozs7QUFHSCxJQUFNLE1BQU0sR0FBRyxJQUFJLE1BQUosRUFBZjs7OztBQ3ZIQTs7Ozs7O0FBRUEsSUFBTSxVQUFVLEdBQUc7QUFDakI7QUFDRSxnQkFBWSxVQURkO0FBRUUsc0JBQWtCLGVBRnBCO0FBR0UsMEJBQXNCLG1CQUh4QjtBQUlFLFlBQVEsS0FKVjtBQUtFLGdCQUFZLE1BTGQ7QUFNRSxvQkFBZ0IsVUFObEI7QUFPRSx1QkFBbUIsTUFQckI7QUFRRSwyQkFBdUIsVUFSekI7QUFTRSxxQkFBaUIsY0FUbkI7QUFVRSxZQUFRLEtBVlY7QUFXRSxZQUFRLE1BWFY7QUFZRSxnQkFBWSxRQVpkO0FBYUUsWUFBUSxRQWJWO0FBY0UsZUFBVyxRQWRiO0FBZUUsV0FBTyxPQWZUO0FBZ0JFLGFBQVMsS0FoQlg7QUFpQkUsaUJBQWEsU0FqQmY7QUFrQkUseUJBQXFCLFdBbEJ2QjtBQW1CRSxjQUFVLE1BbkJaO0FBb0JFLGNBQVUsTUFwQlo7QUFxQkUsMENBQXNDLGlDQXJCeEM7QUFzQkUsc0JBQWtCLGdCQXRCcEI7QUF1QkUsNkJBQXlCLHFCQXZCM0I7QUF3QkUsWUFBUSxJQXhCVjtBQXlCRSxtQkFBZSxjQXpCakI7QUEwQkUsZUFBVyxVQTFCYjtBQTJCRSw0QkFBd0IsZUEzQjFCO0FBNEJFLFlBQVEsSUE1QlY7QUE2QkUsWUFBUSxNQTdCVjtBQThCRSxZQUFRLE1BOUJWO0FBK0JFLFdBQU8sTUEvQlQ7QUFnQ0UsWUFBUSxLQWhDVjtBQWlDRSxhQUFTLE1BakNYO0FBa0NFLGtCQUFjLFFBbENoQjtBQW9DRSxZQUFRLEtBcENWO0FBcUNFLFdBQU8sSUFyQ1Q7QUFzQ0Usc0JBQWtCLFVBdENwQjtBQXVDRSw0QkFBd0IsVUF2QzFCO0FBd0NFLG9CQUFnQixXQXhDbEI7QUF5Q0UsaUJBQWEsT0F6Q2Y7QUEwQ0Usb0JBQWdCLE1BMUNsQjtBQTJDRSxxQkFBaUIsT0EzQ25CO0FBNENFLFlBQVEsVUE1Q1Y7QUE2Q0UseUJBQXFCLGFBN0N2QjtBQThDRSxrQkFBYyxTQTlDaEI7QUFnREUsZ0JBQVksT0FoRGQ7QUFpREUsWUFBUSxJQWpEVjtBQWtERSxnQkFBWSxPQWxEZDtBQW1ERSxnQkFBWSxPQW5EZDtBQW9ERSx1QkFBbUIsWUFwRHJCO0FBcURFLG1CQUFlLFNBckRqQjtBQXNERSxtQkFBZSxJQXREakI7QUF1REUsK0JBQTJCLFlBdkQ3QjtBQXlERSxjQUFVLE9BekRaO0FBMERFLG9CQUFnQixTQTFEbEI7QUEyREUsbUJBQWUsY0EzRGpCO0FBNERFLDhCQUEwQjtBQTVENUIsc0NBNkRjLE9BN0RkLHdCQThERSxpQkE5REYsRUE4RHFCLGtCQTlEckIsd0JBK0RFLGdCQS9ERixFQStEb0IsWUEvRHBCLHdCQWlFRSwwREFqRUYsRUFpRThELDJDQWpFOUQsd0JBa0VFLGNBbEVGLEVBa0VrQixJQWxFbEIsd0JBbUVFLG9CQW5FRixFQW1Fd0IsYUFuRXhCLHdCQW9FRSxRQXBFRixFQW9FWSxPQXBFWix3QkFxRUUsZ0JBckVGLEVBcUVvQixTQXJFcEIsd0JBdUVFLE9BdkVGLEVBdUVXLE1BdkVYLHdCQXlFRSxtQkF6RUYsRUF5RXVCLFVBekV2Qix3QkEwRUUsTUExRUYsRUEwRVUsR0ExRVYsd0JBMkVFLE9BM0VGLEVBMkVXLEdBM0VYLHdCQTZFRSxHQTdFRixFQTZFTyxHQTdFUCx3QkE4RUUsR0E5RUYsRUE4RU8sR0E5RVAsd0JBK0VFLEdBL0VGLEVBK0VPLEdBL0VQLHdCQWdGRSxVQWhGRixFQWdGYyxJQWhGZCx3QkFpRkUsVUFqRkYsRUFpRmMsS0FqRmQsd0JBa0ZFLFlBbEZGLEVBa0ZnQixLQWxGaEIsd0JBb0ZFLGNBcEZGLEVBb0ZrQixPQXBGbEIsd0JBcUZFLGVBckZGLEVBcUZtQixNQXJGbkIsd0JBc0ZFLFFBdEZGLEVBc0ZZLEtBdEZaLHdCQXVGRSxrQkF2RkYsRUF1RnNCLE9BdkZ0Qix3QkF3RkUsaUJBeEZGLEVBd0ZxQixNQXhGckIsd0JBeUZFLFVBekZGLEVBeUZjLFFBekZkLHdCQTBGRSxPQTFGRixFQTBGVyxJQTFGWCx3QkEyRkUsZUEzRkYsRUEyRm1CLE9BM0ZuQix3QkE0RkUsY0E1RkYsRUE0RmtCLE1BNUZsQix3QkE2RkUsZUE3RkYsRUE2Rm1CLE1BN0ZuQix3QkE4RkUsWUE5RkYsRUE4RmdCLE9BOUZoQix3QkErRkUsV0EvRkYsRUErRmUsTUEvRmYsd0JBZ0dFLFlBaEdGLEVBZ0dnQixNQWhHaEIsd0JBaUdFLE9BakdGLEVBaUdXLEtBakdYLHdCQWtHRSxLQWxHRixFQWtHUyxLQWxHVCx3QkFtR0UsY0FuR0YsRUFtR2tCLFVBbkdsQix3QkFvR0UsT0FwR0YsRUFvR1csTUFwR1gsd0JBcUdFLE9BckdGLEVBcUdXLE9BckdYLHdCQXNHRSxRQXRHRixFQXNHWSxNQXRHWix3QkF1R0UsWUF2R0YsRUF1R2dCLFFBdkdoQix3QkF3R0UsTUF4R0YsRUF3R1UsMEJBeEdWLHdCQXlHRSxLQXpHRixFQXlHUywwQkF6R1Qsd0JBMEdFLHlCQTFHRixFQTBHNkIsdUJBMUc3Qix3QkE0R0UsK0JBNUdGLEVBNEdtQyxxQkE1R25DLHdCQTZHRSxZQTdHRixFQTZHZ0IsU0E3R2hCLHdCQThHRSxtQkE5R0YsRUE4R3VCLFVBOUd2Qix3QkErR0UsMkJBL0dGLEVBK0crQixTQS9HL0Isd0JBaUhFLFdBakhGLEVBaUhlLE9BakhmLHdCQWtIRSxzQkFsSEYsRUFrSDBCLGdCQWxIMUIsd0JBbUhFLHNCQW5IRixFQW1IMEIsaUJBbkgxQix3QkFvSEUsaUJBcEhGLEVBb0hxQixlQXBIckIsd0JBcUhFLGtCQXJIRixFQXFIc0IsZUFySHRCLHdCQXNIRSxhQXRIRixFQXNIaUIsV0F0SGpCLHdCQXVIRSx1QkF2SEYsRUF1SDJCLG1CQXZIM0Isd0JBd0hFLGFBeEhGLEVBd0hpQixLQXhIakIsd0JBeUhFLFdBekhGLEVBeUhlLEtBekhmLHdCQTJIRSxRQTNIRixFQTJIWSxRQTNIWix3QkE0SEUsZ0JBNUhGLEVBNEhvQixJQTVIcEIsd0JBNkhFLG1CQTdIRixFQTZIdUIsTUE3SHZCLHdCQThIRSxnQkE5SEYsRUE4SG9CLE1BOUhwQix3QkErSEUsYUEvSEYsRUErSGlCLE1BL0hqQix3QkFnSUUsZ0JBaElGLEVBZ0lvQixZQWhJcEIsd0JBa0lFLE9BbElGLEVBa0lXLEtBbElYLHdCQW1JRSxzREFuSUYsRUFtSTBELElBbkkxRCx3QkFvSUUsZUFwSUYsRUFvSW1CLDBCQXBJbkIsd0JBcUlFLGlEQXJJRixFQXFJcUQsMkJBcklyRCx3QkF1SUUsMkJBdklGLEVBdUkrQix1QkF2SS9CLHdCQXdJRSxlQXhJRixFQXdJb0IsaUJBeElwQix3QkF5SUUsdUJBeklGLEVBeUkyQixpQkF6STNCLHdCQTBJRSw0QkExSUYsRUEwSWdDLGtCQTFJaEMsd0JBMklFLHVDQTNJRixFQTJJMkMsZUEzSTNDLHdCQTRJRSxjQTVJRixFQTRJa0IsSUE1SWxCLHdCQTZJRSxRQTdJRixFQTZJWSxJQTdJWix3QkErSUUsTUEvSUYsRUErSVUsTUEvSVYsd0JBZ0pFLEtBaEpGLEVBZ0pTLElBaEpULHdCQWlKRSxRQWpKRixFQWlKWSxNQWpKWix3QkFrSkUsTUFsSkYsRUFrSlUsTUFsSlYsd0JBbUpFLFNBbkpGLEVBbUphLE9BbkpiLHdCQW9KRSxVQXBKRixFQW9KYyxRQXBKZCx3QkFxSkUsWUFySkYsRUFxSmdCLFNBckpoQix3QkF1SkUseUJBdkpGLEVBdUo2QixrQkF2SjdCO0FBRGlCLENBQW5CO0FBNEpBLE9BQU8sQ0FBQyxVQUFSLEdBQXFCLFVBQXJCOzs7QUM5SkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEFib3V0RGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZCA9ICdhYm91dC1kaWFsb2cnXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCh2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB7fVxuICAgICAgYnV0dG9uc1tUKCdPaycpXSA9IHJlc29sdmVcbiAgICBcbiAgICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsZS50cmFuc2xhdGVIVE1MKGBcbiAgICAgICAgPGNlbnRlcj5cbiAgICAgICAgICA8aW1nIHNyYz0nLi9pbWcvbmFtZW5vdGUxMDI0LnBuZycgd2lkdGg9XCIxMDBweFwiIC8+XG4gICAgICAgICAgPGJyPlxuICAgICAgICAgIE5hbWVub3RlIHYke25hbWVub3RlLnZlcnNpb259XG4gICAgICAgICAgPGJyPjxicj5cbiAgICAgICAgICA8c21hbGw+Q29weXJpZ2h0IChjKSBGdW5pZ2U8L3NtYWxsPlxuICAgICAgICA8L2NlbnRlcj5gKVxuXG4gICAgICAkKHRoaXMuZWxlbWVudCkuaHRtbChzdHJpbmcpXG4gICAgICAkKHRoaXMuZWxlbWVudCkuZGlhbG9nKHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBwb3NpdGlvbjogeyBteTonY2VudGVyIGNlbnRlcicsIGF0OidjZW50ZXIgY2VudGVyJyB9LFxuICAgICAgICB0aXRsZTogVCgnQWJvdXQgTmFtZW5vdGUnKSxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIHdpZHRoOiA2MDAsXG4gICAgICAgIGJ1dHRvbnM6IGJ1dHRvbnMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgYWJvdXREaWFsb2cgPSBuZXcgQWJvdXREaWFsb2coKVxuXG5leHBvcnQgeyBhYm91dERpYWxvZyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcblxuXG53aW5kb3cubmFtZW5vdGUgPSBuYW1lbm90ZVxud2luZG93LlQgPSBsb2NhbGUudHJhbnNsYXRlXG53aW5kb3cuUFggPSAoeCkgPT4geCArICdweCdcblxud2luZG93LkxPRyA9IGNvbnNvbGUubG9nLmJpbmQod2luZG93LmNvbnNvbGUpXG53aW5kb3cuV0FSTiA9IGNvbnNvbGUud2Fybi5iaW5kKHdpbmRvdy5jb25zb2xlKVxud2luZG93LkVSUk9SID0gY29uc29sZS5lcnJvci5iaW5kKHdpbmRvdy5jb25zb2xlKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xuICBuYW1lbm90ZS5pbml0KClcbn0pXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5cbmltcG9ydCB7IGRpdmlkZXIgfSBmcm9tICcuL2RpdmlkZXIuZXM2J1xuaW1wb3J0IHsgdG9vbEJ1dHRvbiB9IGZyb20gJy4vdG9vbC1idXR0b24uZXM2J1xuaW1wb3J0IHsgc2lkZUJhclRhYiB9IGZyb20gJy4vc2lkZS1iYXItdGFiLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgZmxhc2ggfSBmcm9tICcuL2ZsYXNoLmVzNidcblxuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuaW1wb3J0IHsgYWJvdXREaWFsb2cgfSBmcm9tICcuL2Fib3V0LWRpYWxvZy5lczYnXG5pbXBvcnQgeyBtZXNzYWdlQm94IH0gZnJvbSAnLi9tZXNzYWdlLWJveC5lczYnXG5pbXBvcnQgeyBvcGVuTmV3RGlhbG9nIH0gZnJvbSAnLi9vcGVuLW5ldy1kaWFsb2cuZXM2J1xuaW1wb3J0IHsgdGFibGV0U2V0dGluZ3NEaWFsb2cgfSBmcm9tICcuL3RhYmxldC1zZXR0aW5ncy1kaWFsb2cuZXM2J1xuXG5jb25zdCBfcnVuTWFpbiA9IChtZXNzYWdlLCBkYXRhKSA9PiB7XG4gIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICBMT0coJ3J1bk1haW4nLCBtZXNzYWdlLCBkYXRhKVxuICAgIG5hbWVub3RlLmFwcC5ydW5NYWluKG1lc3NhZ2UsIGRhdGEpXG5cbiAgfSBlbHNlIHtcbiAgICBMT0coYCR7bWVzc2FnZX06IGNhblxcYHQgZXhlY3V0ZSB0aGlzIGNvbW1hbmQgb24gYnJvd3Nlci5gKVxuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgQ29tbWFuZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgdW5kbygpIHtcbiAgICBMT0coJ3VuZG8nKVxuICB9XG5cbiAgcmVkbygpIHtcbiAgICBMT0coJ3JlZG8nKVxuICB9XG5cbiAgYXV0aChvcHRpb25zKSB7XG4gICAgZGlhbG9nLm9wZW4obWVzc2FnZUJveCwge1xuICAgICAgdGl0bGU6ICdBdXRoZW50aWNhdGUnLFxuICAgICAgbWVzc2FnZTogJ05hbWVub3RlIHdvdWxkIGxpa2UgYWNjZXNzIHRvIHRoZSBmaWxlcyBpbiB5b3VyIERyb3Bib3guJyxcbiAgICAgIG9rOiAnQ29ubmVjdCB0byBEcm9wYm94JyxcbiAgICAgIGNhbmNlbDogJ0NhbmNlbCcsXG5cbiAgICB9KS50aGVuKChyZXNwb25jZSkgPT4ge1xuICAgICAgZGlhbG9nLmN1cnJlbnQuc2hvd1Byb2dyZXNzKFQoJ0Nvbm5lY3RpbmcgLi4uJykpXG4gICAgICB2YXIgRHJvcGJveCA9IHJlcXVpcmUoJ2Ryb3Bib3gnKS5Ecm9wYm94O1xuICAgICAgdmFyIGRieCA9IG5ldyBEcm9wYm94KHsgY2xpZW50SWQ6ICdjZXg1dmtveGQ5bndqNDgnfSlcbiAgICAgIHZhciBhdXRoVXJsID0gZGJ4LmdldEF1dGhlbnRpY2F0aW9uVXJsKCdodHRwOi8vbG9jYWxob3N0OjgwODAvbmFtZW5vdGUvYXV0aCcpO1xuXG4gICAgICBmbGFzaC5zYXZlKG9wdGlvbnMpXG4gICAgICBsb2NhdGlvbi5ocmVmID0gYXV0aFVybFxuXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIGRpYWxvZy5vcGVuKG1lc3NhZ2VCb3gsIHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogZXJyb3IgfSlcbiAgICB9KVxuICB9XG4gIFxuICBhYm91dCgpIHtcbiAgICBkaWFsb2cub3BlbihhYm91dERpYWxvZykudGhlbigoKSA9PiB7XG4gICAgICBkaWFsb2cuY2xvc2UoKVxuICAgIH0pXG4gIH1cblxuICBwZW4oZSkge1xuICAgIExPRygncGVuJylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgncGVuJylcbiAgfVxuXG4gIGVyYXNlcihlKSB7XG4gICAgTE9HKCdlcmFzZXInKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCdlcmFzZXInKVxuICB9XG5cbiAgdGV4dChlKSB7XG4gICAgTE9HKCd0ZXh0JylcbiAgICB0b29sQnV0dG9uLnNlbGVjdCgndGV4dCcpXG4gIH1cblxuICBzaWRlQmFyKCkge1xuICAgIExPRygnc2lkZUJhcicpXG4gICAgZGl2aWRlci50b2dnbGUoKVxuICB9XG5cbiAgc2hvd1BhZ2VWaWV3KCkge1xuICAgICQoJy5wYWdlLXZpZXcnKS5zaG93KClcbiAgICAkKCcudGV4dC12aWV3JykuaGlkZSgpXG4gICAgc2lkZUJhclRhYi5zZWxlY3QoJ3BhZ2UnKVxuICB9XG5cbiAgc2hvd1RleHRWaWV3KCkge1xuICAgICQoJy5wYWdlLXZpZXcnKS5oaWRlKClcbiAgICAkKCcudGV4dC12aWV3Jykuc2hvdygpXG4gICAgc2lkZUJhclRhYi5zZWxlY3QoJ3RleHQnKVxuICB9XG4gIFxuICBvcGVuTmV3RGlhbG9nKCkge1xuICAgIGRpYWxvZy5vcGVuKG9wZW5OZXdEaWFsb2cpLnRoZW4oKCkgPT4ge1xuICAgICAgZGlhbG9nLmNsb3NlKClcblxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGRpYWxvZy5vcGVuKG1lc3NhZ2VCb3gsIHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogZXJyb3IgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgZGlhbG9nLmNsb3NlKClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIFxuICBvcGVuRGlhbG9nKCkge1xuICAgIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICAgIG5hbWVub3RlLmFwcC5vcGVuRGlhbG9nKCkudGhlbigodXJsKSA9PiB7XG4gICAgICAgIFdBUk4oYG9wZW5EaWFsb2cgJyR7dXJsfScuLi5gKVxuICAgICAgICBwcm9qZWN0TWFuYWdlci5vcGVuKHVybClcblxuICAgICAgfSkudGhlbigocHJvamVjdCkgPT4ge1xuICAgICAgICBXQVJOKCdbcHJvamVjdF0nLCBwcm9qZWN0KVxuICAgICAgICBcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIGRpYWxvZy5vcGVuKG1lc3NhZ2VCb3gsIHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogZXJyb3IgfSlcbiAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZW5vdGUvcmF3X3Rva2VuJylcblxuICAgICAgaWYgKGFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHZhciBmZXRjaCA9IHJlcXVpcmUoJ2lzb21vcnBoaWMtZmV0Y2gnKTsgLy8gb3IgYW5vdGhlciBsaWJyYXJ5IG9mIGNob2ljZS5cbiAgICAgICAgdmFyIERyb3Bib3ggPSByZXF1aXJlKCdkcm9wYm94JykuRHJvcGJveDtcbiAgICAgICAgdmFyIGRieCA9IG5ldyBEcm9wYm94KHtcbiAgICAgICAgICBmZXRjaDogZmV0Y2gsXG4gICAgICAgICAgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuXG4gICAgICAgIH0pXG5cbiAgICAgICAgZGJ4LmZpbGVzTGlzdEZvbGRlcih7cGF0aDogJyd9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRoKFsnb3BlbkRpYWxvZyddKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9wZW4odXJsKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgV0FSTihgb3BlbiAnJHt1cmx9Jy4uLmApXG4gICAgICBwcm9qZWN0TWFuYWdlci5vcGVuKHVybCkudGhlbigocHJvamVjdCkgPT4ge1xuICAgICAgICBXQVJOKCdbcHJvamVjdF0nLCBwcm9qZWN0KVxuICAgICAgICBcbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIGRpYWxvZy5vcGVuKG1lc3NhZ2VCb3gsIHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogZXJyb3IgfSlcbiAgICAgIH0pXG4gICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuYXV0aChbJ29wZW4nLCB1cmxdKVxuICAgIH1cbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHByb2plY3RNYW5hZ2VyLmNsb3NlKClcbiAgfVxuXG4gIHpvb20oKSB7XG4gICAgTE9HKCd6b29tJylcbiAgfVxuXG4gIHVuem9vbSgpIHtcbiAgICBMT0coJ3Vuem9vbScpXG4gIH1cblxuICBkb2NrTGVmdCgpIHtcbiAgICBkaXZpZGVyLnNldFBvc2l0aW9uKCdsZWZ0JylcbiAgfVxuXG4gIGRvY2tSaWdodCgpIHtcbiAgICBkaXZpZGVyLnNldFBvc2l0aW9uKCdyaWdodCcpXG4gIH1cbiAgXG4gIHRvZ2dsZUVkaXRNb2RlKCkge31cblxuICB0YWJsZXRTZXR0aW5ncygpIHtcbiAgICBkaWFsb2cub3Blbih0YWJsZXRTZXR0aW5nc0RpYWxvZykudGhlbigoKSA9PiB7XG4gICAgICBkaWFsb2cuY2xvc2UoKVxuXG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgZGlhbG9nLmNsb3NlKClcbiAgICB9KVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy9cbiAgXG4gIGRvKGl0ZW0sIGRhdGEpIHtcbiAgICBpZiAoaXRlbSAmJiB0aGlzW2l0ZW1dKSB7XG4gICAgICB0aGlzW2l0ZW1dKGRhdGEpXG4gICAgfVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vLy9cblxuICBkZXZlbG9wZXJUb29scygpIHtcbiAgICBfcnVuTWFpbignZGV2ZWxvcGVyVG9vbHMnKVxuICB9XG4gIFxuICBmdWxsU2NyZWVuKCkge1xuICAgIGlmIChuYW1lbm90ZS5hcHApIHtcbiAgICAgIF9ydW5NYWluKCdmdWxsU2NyZWVuJylcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9XG4gIH1cbiAgXG4gIHF1aXQoKSB7XG4gICAgX3J1bk1haW4oJ3F1aXQnKVxuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gIH1cbn1cblxuY29uc3QgY29tbWFuZCA9IG5ldyBDb21tYW5kKClcblxuZXhwb3J0IHsgY29tbWFuZCB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgY29uZmlnRGVmYXVsdCA9IHtcbiAgdG9vbEJhcjogdHJ1ZSxcbiAgc2lkZUJhcjogZmFsc2UsXG4gIHNpZGVCYXJXaWR0aDogMjAwLFxuICBzaWRlQmFyUG9zaXRpb246ICdyaWdodCcsXG4gIFxuICBkZWZhdWx0UGF0aDogbnVsbCxcbiAgZGVmYXVsdE5hbWU6IG51bGwsXG4gIGRlZmF1bHRBdXRob3I6IG51bGwsXG59XG5cblxuZXhwb3J0IHsgY29uZmlnRGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnRGVmYXVsdCB9IGZyb20gJy4vY29uZmlnLWRlZmF1bHQuZXM2J1xuXG5jbGFzcyBDb25maWcge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL2NvbmZpZycpXG4gICAgdGhpcy5kYXRhID0gKGpzb24pID8gSlNPTi5wYXJzZShqc29uKSA6ICQuZXh0ZW5kKHRydWUsIHt9LCBjb25maWdEZWZhdWx0KVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9jb25maWcnLCBqc29uKVxuICB9XG5cbiAgcmVzZXRTdG9yYWdlKCkge1xuICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ0RlZmF1bHQpXG4gICAgdGhpcy5zYXZlKClcbiAgfVxuXG4gIGdldFZhbHVlKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFba2V5XVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWVcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgY29uZmlnID0gbmV3IENvbmZpZygpXG5cbmV4cG9ydCB7IGNvbmZpZyB9XG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgRGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuICBcbiAgaXNPcGVuKCkge1xuICAgIGZvciAoY29uc3Qgd2lkZ2V0IG9mICQoJy51aS1kaWFsb2ctY29udGVudCcpKSB7XG4gICAgICBpZiAoJCh3aWRnZXQpLmRpYWxvZygnaXNPcGVuJykpIHtcblx0cmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgXG4gIG9wZW4od2lkZ2V0LCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudCkgdGhpcy5jbG9zZSgpXG4gICAgdGhpcy5jdXJyZW50ID0gd2lkZ2V0XG4gICAgXG4gICAgaWYgKCF3aWRnZXQuZWxlbWVudCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICBlbGVtZW50LmlkID0gd2lkZ2V0LmlkXG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdkaWFsb2cnXG4gICAgICBlbGVtZW50LnN0eWxlLnRvcCA9ICcwJztcbiAgICAgICQoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICAgICAgd2lkZ2V0LmVsZW1lbnQgPSBlbGVtZW50XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICQod2lkZ2V0LmVsZW1lbnQpLmRpYWxvZygnb3BlbicpXG4gICAgfSwgMjAwKVxuXG4gICAgcmV0dXJuIHdpZGdldC5pbml0KG9wdGlvbnMpXG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICBjb25zdCB3aWRnZXQgPSB0aGlzLmN1cnJlbnRcbiAgICBjb25zdCBlbGVtZW50ID0gd2lkZ2V0LmVsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgJCgnIycgKyB3aWRnZXQuaWQpLmRpYWxvZygnY2xvc2UnKVxuICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gICAgfVxuICAgIHdpZGdldC5lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxufVxuXG5jb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKClcblxuZXhwb3J0IHsgZGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyB2aWV3QnV0dG9uIH0gZnJvbSAnLi92aWV3LWJ1dHRvbi5lczYnXG5cbmxldCBtaW5XaWR0aCA9IDE4MFxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIERpdmlkZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgJCgnLnNwbGl0LXBhbmUnKS5zcGxpdFBhbmUoKVxuICAgICQoJy5zcGxpdC1wYW5lJykub24oJ2RpdmlkZXJkcmFnZW5kJywgKGUpID0+IHsgLy8gb3IgJ3NwbGl0cGFuZXJlc2l6ZSdcbiAgICAgIHRoaXMub25EaXZpZGVyRHJhZ0VuZCgpXG4gICAgfSlcbiAgICB0aGlzLnNldFBvc2l0aW9uKClcbiAgfVxuXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIExPRygnW3VwZGF0ZV0nKVxuICAgIFxuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEuc2lkZUJhclxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXIgPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGxldCB3aWR0aCA9ICh2YWx1ZSkgPyBjb25maWcuZGF0YS5zaWRlQmFyV2lkdGggOiAwXG4gICAgaWYgKGNvbmZpZy5kYXRhLnNpZGVCYXJQb3NpdGlvbiA9PSAncmlnaHQnKSB7XG4gICAgICB3aWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIHdpZHRoICsgMVxuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgbWF4V2lkdGggPSAkKCcuc3BsaXQtcGFuZScpLndpZHRoKCkgLSBtaW5XaWR0aCAtIDFcbiAgICAgIGlmICh3aWR0aCA8IG1pbldpZHRoKSB3aWR0aCA9IG1pbldpZHRoXG4gICAgICBpZiAod2lkdGggPiBtYXhXaWR0aCkgd2lkdGggPSBtYXhXaWR0aFxuICAgIH1cblxuICAgICQoJy5zcGxpdC1wYW5lJykuc3BsaXRQYW5lKCdmaXJzdENvbXBvbmVudFNpemUnLCB3aWR0aClcbiAgICB2aWV3QnV0dG9uLnVwZGF0ZSgpXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGUoIWNvbmZpZy5kYXRhLnNpZGVCYXIpXG4gIH1cblxuICBzZXRQb3NpdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uID0gdmFsdWVcbiAgICBjb25maWcuc2F2ZSgpXG5cbiAgICBjb25zdCBtYWluVmlldyA9ICQoJy5tYWluLXZpZXcnKVxuICAgIGNvbnN0IHNpZGVCYXIgPSAkKCcuc2lkZWJhcicpXG5cbiAgICBpZiAodmFsdWUgPT0gJ2xlZnQnKSB7XG4gICAgICAkKCcjbGVmdC1jb21wb25lbnQnKS5hcHBlbmQoc2lkZUJhcilcbiAgICAgICQoJyNyaWdodC1jb21wb25lbnQnKS5hcHBlbmQobWFpblZpZXcpXG5cbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI3JpZ2h0LWNvbXBvbmVudCcpLmFwcGVuZChzaWRlQmFyKVxuICAgICAgJCgnI2xlZnQtY29tcG9uZW50JykuYXBwZW5kKG1haW5WaWV3KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIG9uRGl2aWRlckRyYWdFbmQoKSB7XG4gICAgTE9HKFwiW2RpdmlkZXIgZHJhZyBlbmRdXCIpXG4gICAgbGV0IHdpZHRoID0gJCgnLnNpZGViYXInKS53aWR0aCgpXG5cbiAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgIGlmICh3aWR0aCA8IG1pbldpZHRoKSB3aWR0aCA9IG1pbldpZHRoXG4gICAgaWYgKHdpZHRoID4gbWF4V2lkdGgpIHdpZHRoID0gbWF4V2lkdGhcblxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA9IHBhcnNlSW50KHdpZHRoKVxuICAgIGNvbmZpZy5kYXRhLnNpZGVCYXIgPSB0cnVlXG4gICAgY29uZmlnLnNhdmUoKVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCBkaXZpZGVyID0gbmV3IERpdmlkZXIoKVxuXG5leHBvcnQgeyBkaXZpZGVyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBGbGFzaCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgc2F2ZShpdGVtLCBkYXRhKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KFtpdGVtLCBkYXRhXSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvZmxhc2gnLCBqc29uKVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL2ZsYXNoJylcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbmFtZW5vdGUvZmxhc2gnKVxuXG4gICAgaWYgKGpzb24pIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBKU09OLnBhcnNlKGpzb24pXG4gICAgICBjb21tYW5kLmRvKC4uLm9wdGlvbnMpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGZsYXNoID0gbmV3IEZsYXNoKClcblxuZXhwb3J0IHsgZmxhc2ggfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCB1bmRvQnV0dG9uXG5sZXQgcmVkb0J1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEhpc3RvcnlCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdW5kb0J1dHRvbiA9ICQoJyN1bmRvLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy91bmRvLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29tbWFuZC51bmRvKClcbiAgICAgIH1cbiAgICB9KVswXVxuXG4gICAgcmVkb0J1dHRvbiA9ICQoJyNyZWRvLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9yZWRvLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGRpc2FibGVkOiB0cnVlLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29tbWFuZC5yZWRvKClcbiAgICAgIH1cbiAgICB9KVswXVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5jdXJyZW50XG4gICAgXG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIGNvbnN0IGhhc1VuZG8gPSAocHJvamVjdCkgPyBwcm9qZWN0Lmhpc3RvcnkuaGFzVW5kbygpIDogZmFsc2VcbiAgICAgIGNvbnN0IGhhc1JlZG8gPSAocHJvamVjdCkgPyBwcm9qZWN0Lmhpc3RvcnkuaGFzUmVkbygpIDogZmFsc2VcbiAgICAgICQodW5kb0J1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIWhhc1VuZG8pXG4gICAgICAkKHJlZG9CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFoYXNSZWRvKVxuXG4vLyAgICBNZW51LnVwZGF0ZUhpc3RvcnkoKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBoaXN0b3J5QnV0dG9uID0gbmV3IEhpc3RvcnlCdXR0b24oKVxuXG5leHBvcnQgeyBoaXN0b3J5QnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEhUTUxEcm9wZG93biB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIGxvZygnb3BlbicsIGVsZW1lbnQpXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICB9XG5cbiAgY2xvc2UoZWxlbWVudCkge1xuICAgIGxvZygnY2xvc2UnKVxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9XG4gIFxuICBtYWtlKHRlbXBsYXRlLCBpZCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duLWNvbnRlbnQnXG4gICAgY29udGVudC5pZCA9IGlkICsgJy1kcm9wZG93bidcbiAgICBcbiAgICBjb250ZW50LmlubmVySFRNTCA9IGBbJHtpZH1dYFxuICAgIHJldHVybiBjb250ZW50XG4gIH1cbn1cblxuY29uc3QgaHRtbERyb3Bkb3duID0gbmV3IEhUTUxEcm9wZG93bigpXG5cbmV4cG9ydCB7IGh0bWxEcm9wZG93biB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IG1lbnUgYXMgbmF0aXZlTWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmxldCBidXR0b25zID0ge31cbmxldCB0aW1lcnMgPSB7fVxubGV0IGJsdXJEZWxheSA9IDUwMFxuXG5jb25zdCBhZGRJdGVtcyA9IChub2RlLCBpdGVtcykgPT4ge1xuICBjb25zdCB1bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICBmb3IgKGxldCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBpZiAoaXRlbS5sYWJlbCkge1xuICAgICAgZGl2LmlubmVySFRNTCA9IGFwcGVuZEtleShUKGl0ZW0ubGFiZWwpLCBpdGVtLmFjY2VsZXJhdG9yKVxuICAgIH0gZWxzZSB7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJy0nXG4gICAgfVxuICAgIGxpLmFwcGVuZENoaWxkKGFwcGVuZEF0dHJpYnV0ZShkaXYsIGl0ZW0ubGFiZWwsIGl0ZW0uY2xpY2spKVxuICAgIGlmIChpdGVtLnN1Ym1lbnUpIHtcbiAgICAgIGFkZEl0ZW1zKGxpLCBpdGVtLnN1Ym1lbnUpIFxuICAgIH1cblxuICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgIG5vZGUuYXBwZW5kQ2hpbGQodWwpXG4gIH1cbn1cblxuY29uc3QgYXBwZW5kQXR0cmlidXRlID0gKGRpdiwgZGF0YSwgY2xpY2spID0+IHtcbiAgaWYgKGRhdGEpIHtcbiAgICBjb25zdCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgcC5pbm5lckhUTUwgPSBkYXRhXG4gICAgcC50aXRsZSA9IGNsaWNrIHx8ICcnXG4gICAgcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgZGl2LmFwcGVuZENoaWxkKHApXG4gIH1cbiAgcmV0dXJuIGRpdlxufVxuXG5jb25zdCBhcHBlbmRLZXkgPSAoc3RyaW5nLCBrZXksIGNoZWNrKSA9PiB7XG4gIGNoZWNrID0gKGNoZWNrKSA/ICcmI3gyNzE0OycgOiAnJ1xuICBrZXkgPSBjb252ZXJ0S2V5KGtleSkgfHwgJyZuYnNwOycgXG5cbiAgY29uc3QgcmVzdWx0ID0gYFxuICAgIDxkaXYgY2xhc3M9J2NoZWNrJz4ke2NoZWNrfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9J2xhYmVsJz4ke3N0cmluZ308L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPSdrZXknPiR7a2V5fTwvZGl2PmBcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBjb252ZXJ0S2V5ID0gKGtleSkgPT4ge1xuICBpZiAoa2V5KSB7XG4gICAgaWYgKCFuYW1lbm90ZS5pc01hYygpKSB7XG4gICAgICBpZiAoa2V5LmluZGV4T2YoJ0NvbW1hbmQrQ3RybCtGJykgPj0gMCkgcmV0dXJuICcnXG4gICAgICBcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLC8sICdTaGlmdCtDb21tYScpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXC4vLCAnU2hpZnQrUGVyaW9kJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9DbWRPckN0cmxcXCsvLCAnQ3RybCsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtBbHRcXCsvLCAnQ3RybCtBbHQrJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9Db21tYW5kXFwrQ3RybFxcKy8sICc/Pz8rJylcbiAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpXG5cbiAgICB9IGVsc2Uge1xuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwsLywgJzwnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwuLywgJz4nKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NtZE9yQ3RybFxcKy8sICcmIzg5ODQ7JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9Db21tYW5kXFwrQWx0XFwrLywgJyYjODk5NzsmIzg5ODQ7JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9Db21tYW5kXFwrQ3RybFxcKy8sICcmIzg5NjM7JiM4OTg0OycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCsvLCAnJiM4Njc5OycpXG4gICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKVxuICAgIH1cbiAgfVxuICByZXR1cm4ga2V5XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSFRNTE1lbnUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cblxuICBvcGVuKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIH1cblxuICBjbG9zZShlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgXG4gIG1ha2UodGVtcGxhdGUsIGlkKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tY29udGVudCdcbiAgICBjb250ZW50LmlkID0gaWQgKyAnLWRyb3Bkb3duJ1xuXG4gICAgYWRkSXRlbXMoY29udGVudCwgdGVtcGxhdGUpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFjdGl2YXRlKGNvbnRlbnQuY2hpbGROb2Rlc1swXSwgaWQpXG4gICAgfSwgMSlcbiAgIFxuICAgIHJldHVybiBjb250ZW50XG4gIH1cblxuICBhY3RpdmF0ZShtZW51LCBpZCkge1xuICAgIG1lbnUuaWQgPSBpZCArICctbWVudSdcbiAgICBidXR0b25zW2lkXSA9ICQoJyMnICsgaWQgKyAnLW1lbnUtYnV0dG9uJylcbiAgICB0aW1lcnNbaWRdID0gbnVsbFxuXG4gICAgJChtZW51KS5tZW51KHtcbiAgICAgIHNlbGVjdDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdChldmVudCwgdWkpKSB7XG4gICAgICAgICAgdGhpcy5jb2xsYXBzZShtZW51LCBpZClcbiAgICAgICAgICBidXR0b25zW2lkXS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVxuXG4gICAgJChtZW51KS5vbignbWVudWZvY3VzJywgKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyc1tpZF0pXG4gICAgfSlcbiAgICBcbiAgICAkKG1lbnUpLm9uKCdtZW51Ymx1cicsICgpID0+IHtcbiAgICAgIGlmICghYnV0dG9uc1tpZF0uaW1hZ2VCdXR0b24oJ2xvY2tlZCcpKSByZXR1cm5cbiAgICAgIHRpbWVyc1tpZF0gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZShtZW51LCBpZClcbiAgICAgIH0sIGJsdXJEZWxheSlcbiAgICB9KVxuICB9XG5cbiAgY29sbGFwc2UobWVudSwgaWQpIHtcbiAgICAkKG1lbnUpLm1lbnUoJ2NvbGxhcHNlQWxsJywgbnVsbCwgdHJ1ZSlcbiAgICBtZW51LnBhcmVudE5vZGUuc3R5bGUub3BhY2l0eSA9ICcwLjAxJ1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbG9zZShtZW51LnBhcmVudE5vZGUpXG4gICAgICBidXR0b25zW2lkXS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgfSwgNTAwKVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG5cbiAgdXBkYXRlKGVsZW1lbnQpIHtcbiAgICBjb25zdCBtZW51ID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdXG4gICAgY29uc3QgaWQgPSBlbGVtZW50LmlkLnJlcGxhY2UoLy0uKiQvLCAnJylcbi8vICB3YXJuKCdbaHRtbCBtZW51IHVwZGF0ZV0nLCBpZClcblxuICAgIGlmIChpZCA9PSAnZmlsZScpIHtcbiAgICAgIHRoaXMudXBkYXRlUmVjZW50cyhtZW51KVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyhtZW51KVxuICAgICQobWVudSkubWVudSgncmVmcmVzaCcpXG4gIH1cblxuICBpc1NlcGFyYXRvcihpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtLmNoaWxkTm9kZXNbMF0gJiYgaXRlbS5jaGlsZE5vZGVzWzBdLmlubmVySFRNTCAhPSAnLScpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgXG4gIHVwZGF0ZVJlY2VudHMobWVudSkge1xuICAgIHdoaWxlICghdGhpcy5pc1NlcGFyYXRvcihtZW51LmNoaWxkTm9kZXNbMl0pKSB7XG4gICAgICBtZW51LnJlbW92ZUNoaWxkKG1lbnUuY2hpbGROb2Rlc1syXSlcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZGYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGRpdi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ1aS1pY29uIHVpLWljb24tbm90ZVwiPjwvc3Bhbj4nICsgaXRlbVxuICAgICAgbGkuYXBwZW5kQ2hpbGQoYXBwZW5kQXR0cmlidXRlKGRpdiwgaXRlbSwgJ29wZW4nKSlcbiAgICAgIGRmLmFwcGVuZENoaWxkKGxpKVxuICAgIH1cbiAgICAvLyAgbWVudS5hcHBlbmRDaGlsZChkZilcbiAgICBtZW51Lmluc2VydEJlZm9yZShkZiwgbWVudS5jaGlsZE5vZGVzWzJdKVxuICB9XG5cbiAgdXBkYXRlU3RhdGVzKG1lbnUpIHtcbiAgICBjb25zdCBpdGVtcyA9ICQobWVudSkuZmluZCgnbGknKVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgY29uc3QgbmFtZSA9ICQoaXRlbSkuZmluZCgncCcpXG4gICAgICBpZiAobmFtZSAmJiBuYW1lLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gbmFtZVswXS5pbm5lckhUTUxcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBuYXRpdmVNZW51LmdldFN0YXRlKGxhYmVsKVxuICAgICAgICBpZiAoc3RhdGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCd1aS1zdGF0ZS1kaXNhYmxlZCcpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgndWktc3RhdGUtZGlzYWJsZWQnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLy8vLy8vLy8vLy8vLy8vL1xuICBcbiAgc2VsZWN0KGV2ZW50LCB1aSkge1xuICAgIGNvbnN0IHAgPSB1aS5pdGVtWzBdICYmIHVpLml0ZW1bMF0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3AnKVswXVxuICAgIGlmIChwKSB7XG4gICAgICBjb25zdCBkYXRhID0gcC5pbm5lckhUTUxcbiAgICAgIGNvbnN0IGNsaWNrID0gcC50aXRsZVxuXG4gICAgICBpZiAoY2xpY2spIHtcbiAgICAgICAgTE9HKGAke2NsaWNrfWAsIGAke2RhdGF9YClcbiAgICAgICAgY29tbWFuZC5kbyhgJHtjbGlja31gLCBgJHtkYXRhfWApXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGh0bWxNZW51ID0gbmV3IEhUTUxNZW51KClcblxuZXhwb3J0IHsgaHRtbE1lbnUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTG9jYWxlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZGljdGlvbmFyeSA9IHJlcXVpcmUoJy4uL2pzL2xpYi9kaWN0aW9uYXJ5LmpzJykuZGljdGlvbmFyeVxuICAgIFxuICAgIGZvciAobGV0IGtleSBpbiBkaWN0aW9uYXJ5KSB7XG4gICAgICBpZiAobmF2aWdhdG9yLmxhbmd1YWdlLmluZGV4T2Yoa2V5KSA9PSAwICYmIGRpY3Rpb25hcnlba2V5XSkge1xuICAgICAgICBjb25zdCBkaWN0ID0gZGljdGlvbmFyeVtrZXldXG4gICAgICAgIHRoaXMudHJhbnNsYXRlID0gKHN0cmluZykgPT4ge1xuICAgICAgICAgIHJldHVybiBkaWN0W3N0cmluZ10gfHwgc3RyaW5nXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB0cmFuc2xhdGUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZ1xuICB9XG4gIFxuICB0cmFuc2xhdGVIVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gaHRtbC5yZXBsYWNlKC9UXFwoKC4qPylcXCkvZywgKGFsbCwgbWF0Y2gpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZShtYXRjaClcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGxvY2FsZSA9IG5ldyBMb2NhbGUoKVxuXG5leHBvcnQgeyBsb2NhbGUgfVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldy5lczYnXG5cbi8vICQoJy5tYWluLXZpZXcnKVswXS5wYXJlbnROb2RlLnNjcm9sbFRvcCA9IC4uLlxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1haW5WaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2NhbGUgPSAxXG5cbi8qICAgIFxuICAgIGNvbnN0IHBhZ2VXaWR0aCA9IDEwMDBcbiAgICBjb25zdCBwYWdlSGVpZ2h0ID0gNzY4XG5cbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcGFnZS5zdHlsZS53aWR0aCA9IFBYKHBhZ2VXaWR0aClcbiAgICAgICAgcGFnZS5zdHlsZS5oZWlnaHQgPSBQWChwYWdlSGVpZ2h0KVxuICAgICAgICBwYWdlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwid2hpdGVcIlxuICAgICAgICBwYWdlLnN0eWxlLm91dGxpbmUgPSBcIjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMylcIlxuXG4gICAgICAgIGNvbnN0IHggPSBpICogKHBhZ2VXaWR0aCArIDUwKSArIDUwXG4gICAgICAgIGNvbnN0IHkgPSBqICogKHBhZ2VIZWlnaHQgKyA1MCkgKyA1MFxuICAgICAgICBwYWdlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBwYWdlLnN0eWxlLmxlZnQgPSBQWCh4KVxuICAgICAgICBwYWdlLnN0eWxlLnRvcCA9IFBYKHkpXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gXCJ0b3AgbGVmdFwiXG4gICAgICAgIHBhZ2Uuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxLjApXCJcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBhZ2VOdW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBwYWdlTnVtYmVyLmlubmVySFRNTCA9IChqICogMTAgKyBpICsgMSkgKyBcIuODmuODvOOCuFwiXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUuZm9udFNpemUgPSAnMTJweCcgLy8gMTFweOS7peS4i+OBr+WkieOCj+OCieOBquOBhFxuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLmxlZnQgPSBQWChwYWdlV2lkdGggLyAyKVxuICAgICAgICBwYWdlTnVtYmVyLnN0eWxlLnRvcCA9IFBYKHBhZ2VIZWlnaHQgKyAyMClcblxuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKHBhZ2VOdW1iZXIpXG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChwYWdlKVxuICAgIH1cbiAgICB9XG4qL1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG4gIFxuICBzZXRQcm9qZWN0KHByb2plY3QpIHtcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICB9IGVsc2Uge1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpXG4gIH1cbn1cblxuZXhwb3J0IHsgTWFpblZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBodG1sTWVudSB9IGZyb20gJy4vaHRtbC1tZW51LmVzNidcbmltcG9ydCB7IG1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuXG5pbXBvcnQgeyBmaWxlTWVudVRlbXBsYXRlLFxuICAgICAgICAgb3RoZXJNZW51VGVtcGxhdGUsXG4gICAgICAgICBzaWRlYmFyTWVudVRlbXBsYXRlIH0gZnJvbSAnLi9tZW51LXRlbXBsYXRlLmVzNidcblxubGV0IGZpbGVCdXR0b25cbmxldCBvdGhlckJ1dHRvblxubGV0IHNpZGViYXJCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBNZW51QnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgZmlsZUJ1dHRvbiA9ICQoJyNmaWxlLW1lbnUtYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL2ZpbGUtYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShmaWxlTWVudVRlbXBsYXRlLCAnZmlsZScpXG4gICAgfSlbMF1cbi8qXG4gICAgb3RoZXJCdXR0b24gPSAkKCcjb3RoZXItbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWVudS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShvdGhlck1lbnVUZW1wbGF0ZSwgJ290aGVyJylcbiAgICB9KVswXVxuKi9cbiAgICBzaWRlYmFyQnV0dG9uID0gJCgnI3NpZGViYXItbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWVudS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgdGhpcy5zZWxlY3QoZSkgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbE1lbnUubWFrZShzaWRlYmFyTWVudVRlbXBsYXRlLCAnc2lkZWJhcicpLFxuICAgICAgY29udGVudFBhcmVudDogJCgnYm9keScpWzBdXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKGZpbGVCdXR0b24sIHNpZGViYXJCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cbiAgXG4gIHNlbGVjdChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCdpbWctYnV0dG9uJykgPCAwKSByZXR1cm5cbiAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJykpIHJldHVyblxuXG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBjb25zdCBsb2NrZWQgPSAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcpXG4gICAgICBjb25zdCBpbnN0YW5jZSA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKVxuICAgICAgY29uc3QgZHJvcGRvd24gPSBpbnN0YW5jZS5vcHRpb25zLmNvbnRlbnRcbiAgICAgIFxuICAgICAgaWYgKGJ1dHRvbiAmJiBidXR0b24uaWQgPT0gZS50YXJnZXQuaWQpIHtcbiAgICAgICAgaWYgKCFsb2NrZWQpIHtcbiAgICAgICAgICBodG1sTWVudS51cGRhdGUoZHJvcGRvd24pXG4gICAgICAgICAgXG4gICAgICAgICAgJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICAgIGlmIChpbnN0YW5jZS5vcHRpb25zLmNvbnRlbnRQYXJlbnQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnVwZGF0ZUNvbnRlbnRQb3NpdGlvbigpXG4gICAgICAgICAgfVxuICAgICAgICAgIGh0bWxNZW51Lm9wZW4oZHJvcGRvd24pXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIGh0bWxNZW51LmNsb3NlKGRyb3Bkb3duKVxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICAgIGh0bWxNZW51LmNsb3NlKGRyb3Bkb3duKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG1lbnVCdXR0b24gPSBuZXcgTWVudUJ1dHRvbigpXG5cbmV4cG9ydCB7IG1lbnVCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IG1lbnVUZW1wbGF0ZSA9IFtcbiAgeyBsYWJlbDogJ05hbWVub3RlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQWJvdXQgTmFtZW5vdGUgLi4uJywgY2xpY2s6ICdhYm91dCcgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdTZXR0aW5ncyAuLi4nLCBjbGljazogJ3NldHRpbmdzJyB9LFxuICAgICAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1F1aXQgTmFtZW5vdGUnLCBjbGljazogJ3F1aXQnIH0sXG4gICAgICBcbi8vICAgIHsgbGFiZWw6ICdTZXR0aW5ncycsXG4vL1x0c3VibWVudTogW1xuLy9cdCAgeyBsYWJlbDogJ1Jlc2V0IFNldHRpbmdzIHRvIERlZmF1bHQnLCBjbGljazogJ3Jlc2V0U2V0dGluZ3MnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ05vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdOZXcgLi4uJywgY2xpY2s6ICdvcGVuTmV3RGlhbG9nJyB9LFxuICAgICAgeyBsYWJlbDogJ09wZW4gLi4uJywgY2xpY2s6ICdvcGVuRGlhbG9nJyB9LFxuICAgICAgeyBsYWJlbDogJ09wZW4gUmVjZW50Jywgc3VibWVudTogW10gfSxcblxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuLy8gICAgeyBsYWJlbDogJ0Nsb3NlJywgY2xpY2s6ICdjbG9zZScgfSxcbi8vICAgIHsgbGFiZWw6ICdDbG9zZSBBbGwnLCBjbGljazogJ2Nsb3NlQWxsJyB9LFxuXHRcbi8vICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbi8vICAgIHsgbGFiZWw6ICdOb3RlIFNldHRpbmdzIC4uLicsIGNsaWNrOiAnbm90ZVNldHRpbmdzJyB9LFxuXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBjbGljazogJ3NuYXBzaG90JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuXG4vLyAgICB7IGxhYmVsOiAnSW1wb3J0Jyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnLnR4dCAoUGxhaW4gVGV4dCkgLi4uJywgY2xpY2s6ICdpbXBvcnRUZXh0RGlhbG9nJyB9LFxuLy9cdF0sXG4vLyAgICB9LFxuICAgICAgeyBsYWJlbDogJ0V4cG9ydCcsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLicsIGNsaWNrOiAnZXhwb3J0Q1NORkRpYWxvZycgfSxcblx0ICB7IGxhYmVsOiAnLnBkZiAoUERGKSAuLi4nLCBjbGljazogJ2V4cG9ydFBERkRpYWxvZycgfSxcblx0XSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogXCJFZGl0XCIsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogXCJVbmRvXCIsIHNlbGVjdG9yOiBcInVuZG86XCIsIGNsaWNrOiAndW5kbycgfSxcbiAgICAgIHsgbGFiZWw6IFwiUmVkb1wiLCBzZWxlY3RvcjogXCJyZWRvOlwiLCBjbGljazogJ3JlZG8nIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6IFwiQ3V0XCIsIHNlbGVjdG9yOiBcImN1dDpcIiB9LFxuICAgICAgeyBsYWJlbDogXCJDb3B5XCIsIHNlbGVjdG9yOiBcImNvcHk6XCIgfSxcbiAgICAgIHsgbGFiZWw6IFwiUGFzdGVcIiwgc2VsZWN0b3I6IFwicGFzdGU6XCIgfSxcblxuICAgICAgeyBsYWJlbDogXCJTZWxlY3QgQWxsXCIsIHNlbGVjdG9yOiBcInNlbGVjdEFsbDpcIiwgY2xpY2s6ICdzZWxlY3RBbGwnIH0sXG4gICAgXVxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGNsaWNrOiAnYXBwZW5kUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEZvcndhcmQnLCBjbGljazogJ21vdmVQYWdlRm9yd2FyZCcgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEJhY2t3YXJkJywgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBjbGljazogJ2N1dFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBjbGljazogJ3Bhc3RlUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdFbXB0eSBCdWZmZXInLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbi8vICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuLy8gICAgeyBsYWJlbDogJ0ZsaXAnLCBjbGljazogJ2ZsaXBQYWdlJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnRXh0cmFjdCBUZXh0JywgY2xpY2s6ICdleHRyYWN0VGV4dCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIEltYWdlIEFzIC4uLicsIGNsaWNrOiAnc2F2ZVBhZ2VJbWFnZScgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnVmlldycsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0Z1bGwgU2NyZWVuJywgY2xpY2s6ICdmdWxsU2NyZWVuJyB9LCBcbi8vICAgIHsgbGFiZWw6ICdUb29sIEJhcicsIGNsaWNrOiAndG9vbEJhcicgfSxcbiAgICAgIHsgbGFiZWw6ICdTaWRlIEJhcicsIGNsaWNrOiAnc2lkZUJhcicgfSwgXG4gICAgICB7IGxhYmVsOiAnRGV2ZWxvcGVyIFRvb2xzJywgY2xpY2s6ICdkZXZlbG9wZXJUb29scycgfSxcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdab29tIEluJywgY2xpY2s6ICd6b29tJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdab29tIE91dCcsIGNsaWNrOiAndW56b29tJyB9LCBcbiAgICAgIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgICAgIHsgbGFiZWw6ICdQYWdlIE1hcmdpbicsIGNsaWNrOiAnc2hvd01hcmdpbicgfSxcbiAgICAgIHsgbGFiZWw6ICdOdW1iZXIgb2YgUGFnZXMgcGVyIFJvdycsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnMicsIGNsaWNrOiAncm93MScgfSxcblx0ICB7IGxhYmVsOiAnNCcsIGNsaWNrOiAncm93MicgfSxcblx0ICB7IGxhYmVsOiAnNicsIGNsaWNrOiAncm93MycgfSxcblx0ICB7IGxhYmVsOiAnOCcsIGNsaWNrOiAncm93NCcgfSxcblx0XSxcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuXVxuXG5jb25zdCBmaWxlTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmV3IC4uLicsIGNsaWNrOiAnb3Blbk5ld0RpYWxvZycgfSxcbiAgeyBsYWJlbDogJ09wZW4gLi4uJywgY2xpY2s6ICdvcGVuRGlhbG9nJyB9LFxuICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gIHsgbGFiZWw6ICdOb3RlJyxcbiAgICBzdWJtZW51OiBbXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UnLCBjbGljazogJ2Nsb3NlJyB9LFxuLy8gICAgeyBsYWJlbDogJ0Nsb3NlIEFsbCcsIGNsaWNrOiAnY2xvc2VBbGwnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBjbGljazogJ3NuYXBzaG90JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuXG4vLyAgICB7IGxhYmVsOiAnSW1wb3J0Jyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnLnR4dCAoUGxhaW4gVGV4dCkgLi4uJywgY2xpY2s6ICdpbXBvcnRUZXh0RGlhbG9nJyB9LFxuLy9cdF0sXG4vLyAgICB9LFxuICAgICAgeyBsYWJlbDogJ0V4cG9ydCcsXG5cdHN1Ym1lbnU6IFtcblx0ICB7IGxhYmVsOiAnLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLicsIGNsaWNrOiAnZXhwb3J0Q1NORkRpYWxvZycgfSxcblx0ICB7IGxhYmVsOiAnLnBkZiAoUERGKSAuLi4nLCBjbGljazogJ2V4cG9ydFBERkRpYWxvZycgfSxcblx0XSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1BhZ2UnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBZGQnLCBjbGljazogJ2FwcGVuZFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBGb3J3YXJkJywgY2xpY2s6ICdtb3ZlUGFnZUZvcndhcmQnIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSBCYWNrd2FyZCcsIGNsaWNrOiAnbW92ZVBhZ2VCYWNrd2FyZCcgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgdG8gQnVmZmVyJywgY2xpY2s6ICdjdXRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ1B1dCBCYWNrIGZyb20gQnVmZmVyJywgY2xpY2s6ICdwYXN0ZVBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnRW1wdHkgQnVmZmVyJywgY2xpY2s6ICdlbXB0eVBhZ2UnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdFeHRyYWN0IFRleHQnLCBjbGljazogJ2V4dHJhY3RUZXh0JyB9LFxuICAgICAgeyBsYWJlbDogJ1NhdmUgSW1hZ2UgQXMgLi4uJywgY2xpY2s6ICdzYXZlUGFnZUltYWdlJyB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6ICdWaWV3JyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnRnVsbCBTY3JlZW4nLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBjbGljazogJ2RldmVsb3BlclRvb2xzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1pvb20gSW4nLCBjbGljazogJ3pvb20nIH0sIFxuICAgICAgeyBsYWJlbDogJ1pvb20gT3V0JywgY2xpY2s6ICd1bnpvb20nIH0sIFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1BhZ2UgTWFyZ2luJywgY2xpY2s6ICdzaG93TWFyZ2luJyB9LFxuICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBQYWdlcyBwZXIgUm93Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcyJywgY2xpY2s6ICdyb3cxJyB9LFxuXHQgIHsgbGFiZWw6ICc0JywgY2xpY2s6ICdyb3cyJyB9LFxuXHQgIHsgbGFiZWw6ICc2JywgY2xpY2s6ICdyb3czJyB9LFxuXHQgIHsgbGFiZWw6ICc4JywgY2xpY2s6ICdyb3c0JyB9LFxuXHRdLFxuICAgICAgfVxuICAgIF0sXG4gIH0sXG4gIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICB7IGxhYmVsOiAnU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdzZXR0aW5ncycgfSxcbiAgeyBsYWJlbDogJ1RhYmxldCBTZXR0aW5ncyAuLi4nLCBjbGljazogJ3RhYmxldFNldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnQWJvdXQgTmFtZW5vdGUgLi4uJywgY2xpY2s6ICdhYm91dCcgfSxcbl1cblxuY29uc3Qgc2lkZWJhck1lbnVUZW1wbGF0ZSA9IFtcbiAgeyBsYWJlbDogJ+OCteOCpOODieODkOODvOOBruS9jee9ricsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ+W3picsIGNsaWNrOiAnZG9ja0xlZnQnIH0sXG4gICAgICB7IGxhYmVsOiAn5Y+zJywgY2xpY2s6ICdkb2NrUmlnaHQnIH0sXG4gICAgXSxcbiAgfSxcbl1cblxuZXhwb3J0IHsgbWVudVRlbXBsYXRlLCBmaWxlTWVudVRlbXBsYXRlLCBzaWRlYmFyTWVudVRlbXBsYXRlIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbWVudVRlbXBsYXRlIH0gZnJvbSAnLi9tZW51LXRlbXBsYXRlLmVzNidcbmltcG9ydCB7IHJlY2VudFVSTCB9IGZyb20gJy4vcmVjZW50LXVybC5lczYnXG5pbXBvcnQgeyBodG1sTWVudSB9IGZyb20gJy4vaHRtbC1tZW51LmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuXG5sZXQgdGVtcGxhdGVcbmxldCBzdGF0ZXMgPSB7fVxuXG5jb25zdCBmaW5kU3VibWVudSA9ICh0ZW1wbGF0ZSwgbGFiZWwpID0+IHtcbiAgZm9yIChjb25zdCBpdGVtIG9mIHRlbXBsYXRlKSB7XG4gICAgaWYgKGl0ZW0ubGFiZWwgPT0gbGFiZWwpIHtcbiAgICAgIHJldHVybiBpdGVtXG4gICAgfVxuICAgIGlmIChpdGVtLnN1Ym1lbnUpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbmRTdWJtZW51KGl0ZW0uc3VibWVudSwgbGFiZWwpXG4gICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbmNvbnN0IHNldFN0YXRlID0gKHRlbXBsYXRlLCBsYWJlbCwgdmFsdWUpID0+IHtcbiAgY29uc3QgaXRlbSA9IGZpbmRTdWJtZW51KHRlbXBsYXRlLCBsYWJlbClcbiAgaWYgKGl0ZW0pIHtcbiAgICB2YWx1ZSA9ICh2YWx1ZSkgPyB0cnVlIDogZmFsc2VcblxuICAgIGl0ZW0uZW5hYmxlZCA9IHZhbHVlXG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgaWYgKCF2YWx1ZSkgZGVsZXRlKGl0ZW0uc3VibWVudSlcbiAgICB9XG4gICAgc3RhdGVzW2xhYmVsXSA9IHZhbHVlXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBNZW51IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0ZW1wbGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobWVudVRlbXBsYXRlKSlcbiAgICBzdGF0ZXMgPSB7fVxuICAgIFxuICAgIHRoaXMudXBkYXRlUmVjZW50cyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSlcbiAgICB0aGlzLnJlYnVpbGQodGVtcGxhdGUpXG4gIH1cblxuICByZWJ1aWxkKHRlbXBsYXRlKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnJlYnVpbGRNZW51KHRlbXBsYXRlKVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJlY2VudHModGVtcGxhdGUpIHtcbiAgICBjb25zdCByZWNlbnRzID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsICdPcGVuIFJlY2VudCcpLnN1Ym1lbnVcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgcmVjZW50VVJMLmRhdGEpIHtcbiAgICAgIHJlY2VudHMucHVzaCh7XG4gICAgICAgIGxhYmVsOiBpdGVtLCBkYXRhOiBpdGVtLCBjbGljazogJ29wZW5VUkwnXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlcyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IGlzQXBwID0gKG5hbWVub3RlLmFwcCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Z1bGwgU2NyZWVuJywgaXNBcHAgfHwgd2luZG93LmNocm9tZSlcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0RldmVsb3BlciBUb29scycsIGlzQXBwKVxuLy8gIHNldFN0YXRlKHRlbXBsYXRlLCAnT3BlbiAuLi4nLCBpc0FwcClcblxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5jdXJyZW50XG4gICAgY29uc3QgaXNQcm9qZWN0ID0gKHByb2plY3QpID8gdHJ1ZSA6IGZhbHNlXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdDbG9zZScsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Nsb3NlIEFsbCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1NhdmUgU25hcHNob3QgQXMgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLnR4dCAoUGxhaW4gVGV4dCkgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJy5wZGYgKFBERikgLi4uJywgaXNQcm9qZWN0KVxuICAgIFxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQWRkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSB0byBCdWZmZXInLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0VtcHR5IEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ01vdmUgRm9yd2FyZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ01vdmUgQmFja3dhcmQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdFeHRyYWN0IFRleHQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdTYXZlIEltYWdlIEFzIC4uLicsIGlzUHJvamVjdClcblxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnVW5kbycsIGlzUHJvamVjdCkgLy8gJiYgcHJvamVjdC5oaXN0b3J5Lmhhc1VuZG8oKSlcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1JlZG8nLCBpc1Byb2plY3QpIC8vICYmIHByb2plY3QuaGlzdG9yeS5oYXNSZWRvKCkpXG4gIH1cblxuICBnZXRTdGF0ZShsYWJlbCkge1xuICAgIHJldHVybiBzdGF0ZXNbbGFiZWxdXG4gIH1cbn1cblxuY29uc3QgbWVudSA9IG5ldyBNZW51KClcblxuZXhwb3J0IHsgbWVudSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcblxuY29uc3QgaGVhZGVySW1hZ2UgPSB7XG4gIGNvbmZpcm06ICcuL2ltZy9jaGVja2VkLnBuZycsXG4gIGVycm9yOiAnLi9pbWcvZXhjbGFtYXRpb24tbWFyay5wbmcnLFxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lc3NhZ2VCb3gge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlkID0gJ21lc3NhZ2UtYm94J1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9ucyA9IHt9XG4gICAgICBidXR0b25zW1Qob3B0aW9ucy5vayB8fCAnT2snKV0gPSByZXNvbHZlXG4gICAgICBpZiAob3B0aW9ucy5jYW5jZWwpIHtcbiAgICAgICAgYnV0dG9uc1tUKG9wdGlvbnMuY2FuY2VsIHx8ICdDYW5jZWwnKV0gPSByZWplY3RcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29uc3Qgc3RyaW5nID0gbG9jYWxlLnRyYW5zbGF0ZUhUTUwoYFxuICAgICAgICA8ZGl2IGNsYXNzPSdtZXNzYWdlLWJveCc+PHA+XG4gICAgICAgICAgJHt0aGlzLmdldEhlYWRlcihvcHRpb25zKX1cbiAgICAgICAgICAke3RoaXMuZ2V0TWVzc2FnZShvcHRpb25zKX1cbiAgICAgICAgPC9wPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdkaWFsb2ctbWVzc2FnZSc+PC9kaXY+YClcbiAgICAgIFxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmh0bWwoc3RyaW5nKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmRpYWxvZyh7XG4gICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcbiAgICAgICAgcG9zaXRpb246IHsgbXk6J2NlbnRlciBjZW50ZXInLCBhdDonY2VudGVyIGNlbnRlcicgfSxcbiAgICAgICAgdGl0bGU6IFQob3B0aW9ucy50aXRsZSB8fCAnJyksXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICB3aWR0aDogb3B0aW9ucy53aWR0aCB8fCAzNTAsXG4gICAgICAgIGJ1dHRvbnM6IGJ1dHRvbnMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBnZXRNZXNzYWdlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gVChvcHRpb25zLm1lc3NhZ2UpIHx8ICcnXG4gIH1cbiAgXG4gIGdldEhlYWRlcihvcHRpb25zKSB7XG4gICAgaWYgKGhlYWRlckltYWdlW29wdGlvbnMudHlwZV0pIHtcbiAgICAgIHJldHVybiBgPGltZyBzcmM9XCIke2hlYWRlckltYWdlW29wdGlvbnMudHlwZV19XCIgd2lkdGg9XCI0OHB4XCIgLz48YnI+PGJyPmBcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJydcbiAgICB9XG4gIH1cblxuICBzaG93UHJvZ3Jlc3MobWVzc2FnZSkge1xuICAgIGNvbnN0IGRpdiA9ICQodGhpcy5lbGVtZW50KS5maW5kKCcuZGlhbG9nLW1lc3NhZ2UnKVxuICAgIGRpdi5odG1sKG1lc3NhZ2UpXG4gIH1cbn1cblxuY29uc3QgbWVzc2FnZUJveCA9IG5ldyBNZXNzYWdlQm94KClcblxuZXhwb3J0IHsgbWVzc2FnZUJveCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXQgfSBmcm9tICcuL3Nob3J0Y3V0LmVzNidcbmltcG9ydCB7IHJlY2VudFVSTCB9IGZyb20gJy4vcmVjZW50LXVybC5lczYnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgdWkgfSBmcm9tICcuL3VpLmVzNidcbmltcG9ydCB7IGZsYXNoIH0gZnJvbSAnLi9mbGFzaC5lczYnXG5cbmltcG9ydCB7IE1haW5WaWV3IH0gZnJvbSAnLi9tYWluLXZpZXcuZXM2J1xuaW1wb3J0IHsgUGFnZVZpZXcgfSBmcm9tICcuL3BhZ2Utdmlldy5lczYnXG5pbXBvcnQgeyBUZXh0VmlldyB9IGZyb20gJy4vdGV4dC12aWV3LmVzNidcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTmFtZW5vdGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZlcnNpb24gPSBcIjIuMC4wLWFscGhhLjMtZGVidWdcIlxuICAgIHRoaXMudHJpYWwgPSBmYWxzZVxuXG4gICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB0aGlzLnNob3J0Y3V0ID0gc2hvcnRjdXRcbiAgICB0aGlzLnJlY2VudFVSTCA9IHJlY2VudFVSTFxuICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmRcbiAgICB0aGlzLnVpID0gdWlcbiAgICB0aGlzLnByb2plY3RNYW5hZ2VyID0gcHJvamVjdE1hbmFnZXJcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uZmlnLmxvYWQoKVxuICAgIHNob3J0Y3V0LmxvYWQoKVxuICAgIHJlY2VudFVSTC5sb2FkKClcblxuICAgIHVpLmluaXQoKVxuXG4gICAgdGhpcy5pbml0QmFzZUhhbmRsZXJzKClcbiAgICB0aGlzLm1haW5WaWV3ID0gbmV3IE1haW5WaWV3KCQoJy5tYWluLXZpZXcnKVswXSlcbiAgICB0aGlzLnBhZ2VWaWV3ID0gbmV3IFBhZ2VWaWV3KCQoJy5wYWdlLXZpZXcnKVswXSlcbiAgICB0aGlzLnRleHRWaWV3ID0gbmV3IFRleHRWaWV3KCQoJy50ZXh0LXZpZXcnKVswXSlcblxuICAgIGZsYXNoLmxvYWQoKVxuICB9XG5cbiAgaW5pdEJhc2VIYW5kbGVycygpIHtcbiAgICB3aW5kb3cub25yZXNpemUgPSAoZSkgPT4ge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgTE9HKCdvbnJlc2l6ZScsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQpO1xuICAgICAgICB1aS51cGRhdGUoKVxuICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIHdpbmRvdy5vbmNvbnRleHRtZW51ID0gKGUpID0+IHtcbiAgICAgIExPRygnY29udGV4dG1lbnUnKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaXNNYWMoKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci5wbGF0Zm9ybS5pbmRleE9mKCdNYWMnKVxuICB9XG59XG5cbmNvbnN0IG5hbWVub3RlID0gbmV3IE5hbWVub3RlKClcblxuZXhwb3J0IHsgbmFtZW5vdGUgfVxuICAgIFxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBsb2NhbGUgfSBmcm9tICcuL2xvY2FsZS5lczYnXG5pbXBvcnQgeyBkaWFsb2cgfSBmcm9tICcuL2RpYWxvZy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgT3Blbk5ld0RpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSAnb3Blbi1uZXctZGlhbG9nJ1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB7fVxuICAgICAgYnV0dG9uc1tUKCdPaycpXSA9IHJlc29sdmVcbiAgICAgIGJ1dHRvbnNbVCgnQ2FuY2VsJyldID0gcmVqZWN0XG4gICAgICBcbiAgICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsZS50cmFuc2xhdGVIVE1MKGBcbiAgICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0cj48dGQ+VChOb3RlYm9vayBuYW1lKTpcbiAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT0nbmFtZScgY2xhc3M9J25hbWUnIHR5cGU9J3RleHQnIHZhbHVlPScnIC8+XG5cdCAgXG4gICAgICAgICAgPHRyPjx0ZD5UKEZvbGRlcik6XG4gICAgICAgICAgICA8dGQ+PGlucHV0IG5hbWU9J2RpcicgY2xhc3M9J2RpcicgdHlwZT0ndGV4dCcgdmFsdWU9JycgZGlzYWJsZWQgLz5cblx0ICAgIDxpbnB1dCBuYW1lPSdyZWYnIGNsYXNzPSdyZWYnIHR5cGU9J2J1dHRvbicgdmFsdWU9J1QoQ2hvb3NlIGZvbGRlci4uLiknIC8+XG5cbiAgICAgICAgICA8dHI+PHRkPlQoTnVtYmVyIG9mIHBhZ2VzKTpcbiAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT0nY291bnQnIGNsYXNzPSdjb3VudCcgdHlwZT0ndGV4dCcgdmFsdWU9OCAvPjxicj5cblxuICAgICAgICAgIDx0cj48dGQgc3R5bGU9J2hlaWdodDogMWVtOyc+XG4gICAgICAgICAgPHRyPjx0ZD5UKFRlbXBsYXRlKTpcblx0ICAgIDx0ZD48c2VsZWN0IG5hbWU9J3RtcGwnIGNsYXNzPSd0bXBsJz5cblx0ICAgICAgPG9wdGlvbiB2YWx1ZT0nTWFuZ2EnPlQoTWFuZ2EpPC9zZWxlY3Q+XG5cbiAgICAgICAgICA8dHI+PHRkPlQoQmluZGluZyBwb2ludCk6XG4gICAgICAgICAgICA8dGQ+PGxhYmVsPjxpbnB1dCBuYW1lPSdiaW5kJyB0eXBlPSdyYWRpbycgdmFsdWU9MD5UKExlZnQgYmluZGluZyk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCBuYW1lPSdiaW5kJyB0eXBlPSdyYWRpbycgY2hlY2tlZCB2YWx1ZT0xPlQoUmlnaHQgYmluZGluZyk8L2xhYmVsPlxuXG4gICAgICAgICAgPHRyPjx0ZD5UKFN0YXJ0IHBhZ2UpOlxuICAgICAgICAgICAgPHRkPjxsYWJlbD48aW5wdXQgbmFtZT0nc3RhcnQnIHR5cGU9J3JhZGlvJyB2YWx1ZT0wIGNoZWNrZWQ+VChGcm9tIGxlZnQpPC9sYWJlbD5cblx0ICAgIDxsYWJlbD48aW5wdXQgbmFtZT0nc3RhcnQnIHR5cGU9J3JhZGlvJyB2YWx1ZT0xPlQoRnJvbSByaWdodCk8L2xhYmVsPlxuXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBzdHlsZT0nZGlzcGxheTogbm9uZScgLz5cbiAgICAgICAgPC90YWJsZT5gKVxuICAgICAgXG4gICAgICAkKHRoaXMuZWxlbWVudCkuaHRtbChgPGZvcm0gaWQ9J29wZW4tbmV3Jz4ke3N0cmluZ308L2Zvcm0+YClcbiAgICAgICQodGhpcy5lbGVtZW50KS5kaWFsb2coe1xuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXG4gICAgICAgIHBvc2l0aW9uOiB7IG15OidjZW50ZXIgY2VudGVyJywgYXQ6J2NlbnRlciBjZW50ZXInIH0sXG4gICAgICAgIHRpdGxlOiBUKCdOZXcnKSxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIHdpZHRoOiA1NTAsXG4gICAgICAgIGJ1dHRvbnM6IGJ1dHRvbnMsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBzYXZlUGFyYW1zKCkge31cbn1cblxuY29uc3Qgb3Blbk5ld0RpYWxvZyA9IG5ldyBPcGVuTmV3RGlhbG9nKClcblxuZXhwb3J0IHsgb3Blbk5ld0RpYWxvZyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZVZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cbn1cblxuZXhwb3J0IHsgUGFnZVZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUGFnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGlkID0gMFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3BhZ2UgZGVzdHJ1Y3RvcicsIHRoaXMucGlkKVxuICB9XG59XG5cbmV4cG9ydCB7IFBhZ2UgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuL3Byb2plY3QuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IG1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuaW1wb3J0IHsgdGl0bGUgfSBmcm9tICcuL3RpdGxlLmVzNidcbmltcG9ydCB7IHZpZXdCdXR0b24gfSBmcm9tICcuL3ZpZXctYnV0dG9uLmVzNidcblxuaW1wb3J0IHsgbWFpblZpZXcgfSBmcm9tICcuL21haW4tdmlldy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdE1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb2plY3RzID0gW11cbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cblxuICBzZWxlY3QocHJvamVjdCkge1xuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHByb2plY3QudXJsKVxuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICB0aGlzLnByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICAgIH1cbiAgICAgIHJlY2VudFVSTC5hZGQocHJvamVjdC51cmwpXG4gICAgfVxuICAgIFxuICAgIHRoaXMuY3VycmVudCA9IHByb2plY3RcbiAgICBtYWluVmlldy5zZXRQcm9qZWN0KHByb2plY3QpXG4gICAgdGl0bGUuc2V0KHByb2plY3QgPyBwcm9qZWN0Lm5hbWUoKSA6IG51bGwpXG5cbiAgICBtZW51LnVwZGF0ZSgpXG4gICAgdmlld0J1dHRvbi51cGRhdGUoKVxuICB9XG5cbiAgZmluZEluZGV4KHVybCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRoaXMucHJvamVjdHNbaV0udXJsID09IHVybCkge1xuICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTFcbiAgfVxuICBcbiAgb3Blbih1cmwpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHVybClcbiAgICBjb25zdCBwcm9qZWN0ID0gKGluZGV4ID49IDApID8gdGhpcy5wcm9qZWN0c1tpbmRleF0gOiBuZXcgUHJvamVjdCh1cmwpXG5cbiAgICB0aGlzLnNlbGVjdChwcm9qZWN0KVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJvamVjdClcbiAgfVxuICBcbiAgY2xvc2UocHJvamVjdCkge1xuICAgIHdhcm4oJ1tjbG9zZV0nLCBwcm9qZWN0KVxuICAgIGlmICghcHJvamVjdCkgcHJvamVjdCA9IHRoaXMuY3VycmVudFxuICAgIGlmICghcHJvamVjdCkgcmV0dXJuXG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmluZEluZGV4KHByb2plY3QudXJsKVxuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICB0aGlzLnByb2plY3RzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGlmIChwcm9qZWN0ID09IHRoaXMuY3VycmVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLnByb2plY3RzW3RoaXMucHJvamVjdHMubGVuZ3RoIC0gMV0pXG4gICAgICB9XG4gICAgICBwcm9qZWN0LmRlc3RydWN0b3IoKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcm9qZWN0TWFuYWdlciA9IG5ldyBQcm9qZWN0TWFuYWdlclxuXG5leHBvcnQgeyBwcm9qZWN0TWFuYWdlciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJy4vcGFnZS5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUHJvamVjdCB7XG4gIGNvbnN0cnVjdG9yKHVybCkge1xuICAgIHRoaXMudXJsID0gdXJsLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuXG4gICAgdGhpcy5wYWdlcyA9IFtdXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG5cbiAgZGVzdHJ1Y3RvcigpIHtcbiAgICBsb2coJ3Byb2plY3QgZGVzdHJ1Y3RvcicsIHRoaXMudXJsKVxuICAgIFxuICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcbiAgICAgIHBhZ2UuZGVzdHJ1Y3RvcigpXG4gICAgfSlcbiAgfVxuXG4gIGZpbmRJbmRleChwYWdlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wYWdlc1tpXS5waWQgPT0gcGFnZS5waWQpIHtcbiAgICAgICAgcmV0dXJuIGlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBuYW1lKCkge1xuICAgIHJldHVybiAodGhpcy51cmwpID8gdGhpcy51cmwucmVwbGFjZSgvXi4qXFwvLywgJycpIDogVCgnVW50aXRsZWQnKVxuICB9XG59XG5cbmV4cG9ydCB7IFByb2plY3QgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmNvbnN0IG1heCA9IDEwXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgUmVjZW50VVJMIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgfVxuXG4gIGxvYWQoKSB7XG4gICAgY29uc3QganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJylcbiAgICB0aGlzLmRhdGEgPSAoanNvbikgPyBKU09OLnBhcnNlKGpzb24pIDogW11cbiAgfVxuXG4gIHNhdmUoKSB7XG4gICAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZW5vdGUvcmVjZW50LXVybCcsIGpzb24pXG4gIH1cblxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gW11cbiAgICB0aGlzLnNhdmUoKVxuXG4vLyAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgbWVudS51cGRhdGUoKVxuLy8gIH0sIDUwMClcbiAgfVxuXG4gIGFkZCh1cmwpIHtcbiAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCh2YWx1ZSkgPT4gdmFsdWUgIT0gdXJsKVxuICAgIHRoaXMuZGF0YS51bnNoaWZ0KHVybClcblxuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gbWF4KSB7XG4gICAgICB0aGlzLmRhdGEubGVuZ3RoID0gbWF4XG4gICAgfVxuICAgIHRoaXMuc2F2ZSgpXG4gIH1cbn1cblxuY29uc3QgcmVjZW50VVJMID0gbmV3IFJlY2VudFVSTCgpXG5cbmV4cG9ydCB7IHJlY2VudFVSTCB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3Qgc2hvcnRjdXREZWZhdWx0ID0ge1xuICB1bmRvOiBbJ2NvbW1hbmQreicsICdjdHJsK3onLCAnbnVtLycsICcsJ10sXG4gIHJlZG86IFsnY29tbWFuZCt5JywgJ2N0cmwreScsICdudW0qJywgJy4nXSxcbiAgem9vbTogWydbJywgJ3EnLCAnbnVtcGx1cyddLFxuICB1bnpvb206IFsnXScsICdhJywgJ251bW1pbnVzJ10sXG4gIHRvZ2dsZVRvb2w6IFsneCcsICdudW0uJywgJy8nXSxcblxuICBvcGVuTmV3RGlhbG9nOiBbJ2NvbW1hbmQrbicsICdhbHQrbiddLFxuICBvcGVuRGlhbG9nOiBbJ2NvbW1hbmQrbycsICdhbHQrbyddLFxuICBcbiAgY2xvc2U6IFsnY29tbWFuZCt3JywgJ2FsdCt3J10sXG4gIHF1aXQ6IFsnY29tbWFuZCtxJywgJ2FsdCtxJ10sXG4gIHJlbG9hZDogWydjb21tYW5kK3NoaWZ0K3InXSxcblxuICBleHBvcnRDU05GRGlhbG9nOiBbJ2NvbW1hbmQrcCcsICdhbHQrcCddLFxuICBleHBvcnRQREZEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtwJywgJ2FsdCtzaGlmdCtwJ10sXG4gIGltcG9ydFRleHREaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIHNhdmVQYWdlSW1hZ2U6IFsnY29tbWFuZCstJywgJ2FsdCstJ10sXG4gIGV4dHJhY3RUZXh0OiBbJ2NvbW1hbmQrdCcsICdhbHQrdCddLFxuXG4gIC8vbWFyZ2luU2V0dGluZ3NEaWFsb2c6IFsnY29tbWFuZCtzaGlmdCtpJywgJ2FsdCtzaGlmdCtpJ10sXG4gIFxuICBwYWdlTGVmdDogJ2xlZnQnLFxuICBwYWdlUmlnaHQ6ICdyaWdodCcsXG4gIHBhZ2VVcDogJ3VwJywgICAgICBcbiAgcGFnZURvd246ICdkb3duJywgIFxuXG4gIHNlbGVjdEFsbDogJ2N0cmwrYScsXG4gIHVuc2VsZWN0OiAnY3RybCtkJyxcbiAgbWVyZ2VUZXh0OiAnY3RybCtlJyxcbiAgXG4gIHNpZGVCYXI6ICcxJyxcbiAgZGV2ZWxvcGVyVG9vbHM6ICdjb21tYW5kK2FsdCtqJyxcbiAgdG9vbEJhcjogJ2NvbW1hbmQrYWx0K2gnLFxuXG4gIHBlbjogJ3AnLFxuICBlcmFzZXI6ICdlJyxcbiAgdGV4dDogJ3QnLFxuXG4gIC8vXG4gIC8vIFBhZ2Ugc2hvcnRjdXRzXG4gIC8vXG4gIFxuICBpbnNlcnRQYWdlOiAnc2hpZnQraScsXG4gIGR1cGxpY2F0ZVBhZ2U6ICdzaGlmdCtkJyxcblxuICBzaG93TWFyZ2luOiAncicsXG4vL2ZsaXBQYWdlOiAnaCcsXG4gIGFwcGVuZFBhZ2U6ICdzaGlmdCthJyxcbiAgY3V0UGFnZTogJ3NoaWZ0K2snLFxuICBwYXN0ZVBhZ2U6ICdzaGlmdCt5JyxcbiAgZW1wdHlQYWdlOiAnc2hpZnQrMCcsXG4gIG1vdmVQYWdlTGVmdDogJzwnLFxuICBtb3ZlUGFnZVJpZ2h0OiAnPicsXG4gIHJvdzE6ICdzaGlmdCsxJyxcbiAgcm93MjogJ3NoaWZ0KzInLFxuICByb3czOiAnc2hpZnQrMycsXG4gIHJvdzQ6ICdzaGlmdCs0JyxcblxuICAvL1xuICAvLyBUZXh0IHNob3J0Y3V0cyAoY2FuIGJlIHVzZWQgd2hpbGUgdGV4dCBlZGl0aW5nKVxuICAvL1xuICBcbiAgdG9nZ2xlRWRpdE1vZGU6ICdjdHJsK2cnLFxuICBhZGRGb250U2l6ZTogJ2N0cmwrLicsXG4gIHN1YnRyYWN0Rm9udFNpemU6ICdjdHJsKywnLFxuICB0b2dnbGVEaXJlY3Rpb246ICdjdHJsK10nLFxuICBjdXRUZXh0OiAnYmFja3NwYWNlJyxcbiAgbmV4dFRleHQ6ICd0YWInLFxuICBwcmV2VGV4dDogJ3NoaWZ0K3RhYicsXG59XG5cbmV4cG9ydCB7IHNob3J0Y3V0RGVmYXVsdCB9XG4iLCIndXNlIHN0cmljdCdcblxuLy9pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgc2hvcnRjdXREZWZhdWx0IH0gZnJvbSAnLi9zaG9ydGN1dC1kZWZhdWx0LmVzNidcbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG4vKlxuaW1wb3J0IHsgVGV4dCB9IGZyb20gJy4vdGV4dC5lczYnXG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9jb250cm9sbGVyLmVzNidcbiovXG5cbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcblxuY2xhc3MgU2hvcnRjdXQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuXG4gICAgTW91c2V0cmFwLmFkZEtleWNvZGVzKHtcbiAgICAgIDEwNzogJ251bXBsdXMnLFxuICAgICAgMTA5OiAnbnVtbWludXMnLFxuICAgICAgMTEwOiAnbnVtLicsXG4gICAgICAxMTE6ICdudW0vJyxcbiAgICAgIDEwNjogJ251bSonLFxuICAgIH0pXG5cbiAgICBNb3VzZXRyYXAucHJvdG90eXBlLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKGUsIGVsZW1lbnQsIGNvbWJvKSB7XG4vKlxuICAgICAgaWYgKFRleHQuaXNFZGl0YWJsZShlbGVtZW50KSkge1xuICAgICAgICBMT0coJ2tleWNvZGU9JywgZS5rZXlDb2RlLCBlKVxuXG5cdGlmIChlLmN0cmxLZXkgJiYgIWUuc2hpZnRLZXkgJiYgIWUubWV0YUtleSkge1xuXHQgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG5cdCAgY2FzZSA3MTogIC8vIGN0cmwrZ1xuXHQgIGNhc2UgMTg4OiAvLyBjdHJsKyxcblx0ICBjYXNlIDE5MDogLy8gY3RybCsuXG5cdCAgY2FzZSAyMjE6IC8vIGN0cmwrXVxuXHQgICAgcmV0dXJuIGZhbHNlXG5cdCAgfVxuXHR9XG5cblx0aWYgKGUua2V5Q29kZSA9PSA5KSB7IC8vIFRBQlxuXHQgIHJldHVybiBmYWxzZVxuXHR9XG5cdHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2VcbiovXG4gICAgfVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL3Nob3J0Y3V0JylcbiAgICB0aGlzLmRhdGEgPSBqc29uID8gSlNPTi5wYXJzZShqc29uKSA6IE9iamVjdC5hc3NpZ24oe30sIHNob3J0Y3V0RGVmYXVsdClcbiAgICB0aGlzLmJpbmQoKVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9zaG9ydGN1dCcsIGpzb24pXG4gIH1cbiAgXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBzaG9ydGN1dERlZmF1bHQpXG4gICAgdGhpcy5zYXZlKClcblxuICAgIE1vdXNldHJhcC5yZXNldCgpXG4gICAgdGhpcy5iaW5kKClcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgZm9yIChsZXQgaXRlbSBpbiB0aGlzLmRhdGEpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZGF0YVtpdGVtXVxuICAgICAgY29uc3QgaGFuZGxlciA9IGNvbW1hbmRbaXRlbV1cblxuICAgICAgaWYgKGl0ZW0gPT0gJ2RldmVsb3BlclRvb2xzJykgY29udGludWVcblxuICAgICAgaWYgKGhhbmRsZXIpIHtcblx0TE9HKGAnJHtpdGVtfWApXG4gICAgICAgIFxuXHRNb3VzZXRyYXAuYmluZChrZXksIChlKSA9PiB7XG5cdCAgY29tbWFuZC5wcmV2ID0gY29tbWFuZC5jdXJyZW50XG5cdCAgY29tbWFuZC5jdXJyZW50ID0gaXRlbVxuXG4gICAgICAgICAgaWYgKCFkaWFsb2cuaXNPcGVuKCkpIHtcblx0ICAgIExPRyhgKiR7aXRlbX0qYClcbiAgICAgICAgICAgIGhhbmRsZXIoKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2Vcbi8vXHQgIGhhbmRsZXIoKVxuLy9cdCAgcmV0dXJuIChkaWFsb2cuaXNPcGVuKCkpID8gdHJ1ZSA6IGZhbHNlXG5cblx0fSwgJ2tleWRvd24nKVxuXG4gICAgICB9IGVsc2Uge1xuXHRMT0coYCcke2l0ZW19Jzogbm8gc3VjaCBjb21tYW5kYClcbiAgICAgIH1cbiAgICB9XG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgQ29udHJvbGxlci5jbGVhck1vdmUoKVxuLy8gICAgcmV0dXJuIGZhbHNlO1xuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnZW50ZXInLCAoZSkgPT4ge1xuLy8gICAgaWYgKGRpYWxvZy5pc09wZW4oKSkgcmV0dXJuIHRydWVcbi8vICAgIGNvbW1hbmQucXVpY2tab29tKClcbi8vICAgIHJldHVybiBmYWxzZVxuLy8gIH0pXG5cbi8vICBNb3VzZXRyYXAuYmluZCgnc3BhY2UnLCAoZSkgPT4ge1xuLy8gICAgaWYgKCFDb250cm9sbGVyLmlzTW92ZWQoKSkge1xuLy9cdGNvbW1hbmQucXVpY2tab29tKCk7XG4vLyAgICB9XG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSwgJ2tleXVwJylcbiAgfVxufVxuXG5jb25zdCBzaG9ydGN1dCA9IG5ldyBTaG9ydGN1dCgpXG5cbmV4cG9ydCB7IHNob3J0Y3V0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcblxubGV0IHBhZ2VCdXR0b25cbmxldCB0ZXh0QnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2lkZUJhclRhYiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYnV0dG9ucyA9IFtdXG4gIH1cblxuICBpbml0KCkge1xuICAgIHBhZ2VCdXR0b24gPSAkKCcjcGFnZS12aWV3LWJ1dHRvbicpLnRleHRCdXR0b24oe1xuICAgICAgdGV4dDogVCgnUGFnZXMnKSxcbiAgICAgIGxvY2tlZDogdHJ1ZSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS50ZXh0QnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgY29tbWFuZC5zaG93UGFnZVZpZXcoKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlbMF1cblxuICAgIHRleHRCdXR0b24gPSAkKCcjdGV4dC12aWV3LWJ1dHRvbicpLnRleHRCdXR0b24oe1xuICAgICAgdGV4dDogVCgnVGV4dHMnKSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS50ZXh0QnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgY29tbWFuZC5zaG93VGV4dFZpZXcoKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKHBhZ2VCdXR0b24sIHRleHRCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cblxuICBzZWxlY3QobmFtZSkge1xuICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgY29uc3QgbG9ja2VkID0gJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcpXG5cbiAgICAgIGlmIChidXR0b24gJiYgYnV0dG9uLmlkLmluZGV4T2YobmFtZSkgPT0gMCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS50ZXh0QnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHNpZGVCYXJUYWIgPSBuZXcgU2lkZUJhclRhYigpXG5cbmV4cG9ydCB7IHNpZGVCYXJUYWIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHNpZGVCYXJUYWIgfSBmcm9tICcuL3NpZGUtYmFyLXRhYi5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgU2lkZUJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBzaWRlQmFyVGFiLmluaXQoKVxuICB9XG4gIFxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBzaWRlQmFyVGFiLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhciA9IG5ldyBTaWRlQmFyKClcblxuZXhwb3J0IHsgc2lkZUJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcblxuY29uc3Qgd2lkdGggPSAyMDBcbmNvbnN0IGQgPSAxNVxuXG5mdW5jdGlvbiBkZWNvZGVQb3NpdGlvbihzdHJpbmcpIHtcbiAgY29uc3QgYXJyYXkgPSBzdHJpbmcuc3BsaXQoJywnKVxuICBjb25zdCB4ID0gcGFyc2VGbG9hdChhcnJheVswXSB8fCAwKVxuICBjb25zdCB5ID0gcGFyc2VGbG9hdChhcnJheVsxXSB8fCAwKVxuICByZXR1cm4geyBsZWZ0Oih4ICogd2lkdGgpIC0gZCwgdG9wOigoMS4wIC0geSkgKiB3aWR0aCkgLSBkIH1cbn1cblxuZnVuY3Rpb24gZW5jb2RlUG9zaXRpb24oaWQpIHtcbiAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICBjb25zdCB4ID0gKHBhcnNlRmxvYXQoZS5zdHlsZS5sZWZ0IHx8IDApICsgZCkgLyB3aWR0aFxuICBjb25zdCB5ID0gKHBhcnNlRmxvYXQoZS5zdHlsZS50b3AgfHwgMCkgKyBkKSAvIHdpZHRoXG4gIHJldHVybiBgJHt4fSwkezEuMCAtIHl9YFxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFRhYmxldFNldHRpbmdzRGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZCA9ICd0YWJsZXQtc2V0dGluZ3MtZGlhbG9nJ1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB7fVxuICAgICAgYnV0dG9uc1tUKCdPaycpXSA9IHJlc29sdmVcbiAgICAgIGJ1dHRvbnNbVCgnQ2FuY2VsJyldID0gcmVqZWN0XG5cbiAgICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsZS50cmFuc2xhdGVIVE1MKGBcbiAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOjMwMHB4OyBoZWlnaHQ6MjUwcHg7IGZvbnQtc2l6ZToxMnB4O1wiPlxuICAgICAgICAgIDxkaXYgaWQ9XCJ0YWJsZXQtY3VydmUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8Y2FudmFzIGlkPVwidGFibGV0LWN1cnZlXCIgd2lkdGg9XCIke3dpZHRofXB4XCIgaGVpZ2h0PVwiJHt3aWR0aH1weFwiIHN0eWxlPVwid2lkdGg6JHt3aWR0aH1weDsgaGVpZ2h0OiR7d2lkdGh9cHg7IGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrXCI+PC9jYW52YXM+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ0b3A6LTE1cHg7IGxlZnQ6LTIwNXB4OyB3aWR0aDogMjAwcHg7IHRleHQtYWxpZ246cmlnaHQ7XCI+MTAwJTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRvcDo4NXB4OyBsZWZ0Oi0yMDVweDsgd2lkdGg6IDIwMHB4OyB0ZXh0LWFsaWduOnJpZ2h0O1wiPlQoT3V0cHV0KTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRvcDoxODVweDsgbGVmdDotMjA1cHg7IHdpZHRoOiAyMDBweDsgdGV4dC1hbGlnbjpyaWdodDtcIj4wJTwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwibGVmdDowcHg7IHRvcDoyMDBweDtcIj4wJTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6MTAwcHg7IHRvcDoyMDBweDtcIj5UKFBlbiBwcmVzc3VyZSk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OjIwMHB4OyB0b3A6MjAwcHg7XCI+MTAwJTwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1wb2ludFwiIGlkPVwidGFibGV0LWN1cnZlLWxlZnRcIj48ZGl2PjwvZGl2PjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtcG9pbnRcIiBpZD1cInRhYmxldC1jdXJ2ZS1yaWdodFwiPjxkaXY+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1wb2ludFwiIGlkPVwidGFibGV0LWN1cnZlLWNlbnRlclwiPjxkaXY+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBzdHlsZT0nZGlzcGxheTogbm9uZScgLz5cbiAgICAgICAgPGlucHV0IG5hbWU9J3Jlc2V0JyBjbGFzcz0ncmVzZXQnIHR5cGU9J2J1dHRvbicgdmFsdWU9J1QoUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdCknIC8+YClcbiAgICAgIFxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmh0bWwoYDxmb3JtIGlkPSd0YWJsZXQtc2V0dGluZ3MnPiR7c3RyaW5nfTwvZm9ybT5gKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmRpYWxvZyh7XG4gICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcbiAgICAgICAgcG9zaXRpb246IHsgbXk6J2NlbnRlciBjZW50ZXInLCBhdDonY2VudGVyIGNlbnRlcicgfSxcbiAgICAgICAgdGl0bGU6IFQoJ1RhYmxldCBTZXR0aW5ncycpLFxuICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IDM2MCxcbiAgICAgICAgYnV0dG9uczogYnV0dG9ucyxcbiAgICAgICAgb3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b246bnRoLWNoaWxkKDEpJykuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIH0pXG4gIH1cblxuICBzYXZlUGFyYW1zKCkge31cbn1cblxuY29uc3QgdGFibGV0U2V0dGluZ3NEaWFsb2cgPSBuZXcgVGFibGV0U2V0dGluZ3NEaWFsb2coKVxuXG5leHBvcnQgeyB0YWJsZXRTZXR0aW5nc0RpYWxvZyB9XG5cbi8qXG5jb25zdCB0YWJsZXRTZXR0aW5nc0RpYWxvZyA9IHtcbiAgXG4gIGluaXQ6ICgpID0+IHtcbiAgICAkKCcjdGFibGV0LXNldHRpbmdzLWRpYWxvZycpLmRpYWxvZyh7XG4gICAgICBhdXRvT3BlbjogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiB7IGF0OidjZW50ZXIgdG9wKzE1MHB4JyB9LFxuICAgICAgdGl0bGU6IFQoJ1RhYmxldCBTZXR0aW5ncycpLFxuICAgICAgbW9kYWw6IHRydWUsXG4gICAgICB3aWR0aDogMzYwLFxuICAgICAgYnV0dG9uczogeyBPazogdGFibGV0U2V0dGluZ3NEaWFsb2cub2ssIENhbmNlbDogdGFibGV0U2V0dGluZ3NEaWFsb2cuY2FuY2VsIH0sXG4gICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdidXR0b246bnRoLWNoaWxkKDEpJykuZm9jdXMoKTtcbiAgICAgIH1cbm8gICAgfSlcblxuICAgIGNvbnN0IHN0cmluZyA9IGxvY2FsZS50cmFuc2xhdGVIVE1MKGBcbiAgICA8ZGl2IHN0eWxlPVwid2lkdGg6MzAwcHg7IGhlaWdodDoyNTBweDsgZm9udC1zaXplOjEycHg7XCI+XG4gICAgICA8ZGl2IGlkPVwidGFibGV0LWN1cnZlLWNvbnRhaW5lclwiPlxuICAgICAgICA8Y2FudmFzIGlkPVwidGFibGV0LWN1cnZlXCIgd2lkdGg9XCIke3dpZHRofXB4XCIgaGVpZ2h0PVwiJHt3aWR0aH1weFwiIHN0eWxlPVwid2lkdGg6JHt3aWR0aH1weDsgaGVpZ2h0OiR7d2lkdGh9cHg7IGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrXCI+PC9jYW52YXM+XG5cbiAgICAgICAgPGRpdiBzdHlsZT1cInRvcDotMTVweDsgbGVmdDotMjA1cHg7IHdpZHRoOiAyMDBweDsgdGV4dC1hbGlnbjpyaWdodDtcIj4xMDAlPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJ0b3A6ODVweDsgbGVmdDotMjA1cHg7IHdpZHRoOiAyMDBweDsgdGV4dC1hbGlnbjpyaWdodDtcIj5UKE91dHB1dCk8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cInRvcDoxODVweDsgbGVmdDotMjA1cHg7IHdpZHRoOiAyMDBweDsgdGV4dC1hbGlnbjpyaWdodDtcIj4wJTwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OjBweDsgdG9wOjIwMHB4O1wiPjAlPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OjEwMHB4OyB0b3A6MjAwcHg7XCI+VChQZW4gcHJlc3N1cmUpPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OjIwMHB4OyB0b3A6MjAwcHg7XCI+MTAwJTwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXBvaW50XCIgaWQ9XCJ0YWJsZXQtY3VydmUtbGVmdFwiIHN0eWxlPVwibGVmdDoxMDBweDsgdG9wOi0xMHB4XCI+PGRpdj48L2Rpdj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtcG9pbnRcIiBpZD1cInRhYmxldC1jdXJ2ZS1yaWdodFwiIHN0eWxlPVwibGVmdDoyMDBweDsgdG9wOi0yMHB4O1wiPjxkaXY+PC9kaXY+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXBvaW50XCIgaWQ9XCJ0YWJsZXQtY3VydmUtY2VudGVyXCIgc3R5bGU9XCJsZWZ0OjBweDsgdG9wOjBweFwiPjxkaXY+PC9kaXY+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8aW5wdXQgdHlwZT0nc3VibWl0JyBzdHlsZT0nZGlzcGxheTogbm9uZScgLz5cbiAgICA8aW5wdXQgbmFtZT0ncmVzZXQnIGNsYXNzPSdyZXNldCcgdHlwZT0nYnV0dG9uJyB2YWx1ZT0nVChSZXNldCBTZXR0aW5ncyB0byBEZWZhdWx0KScgLz5cbiAgICBgKVxuXG4gICAgJCgnI3RhYmxldC1zZXR0aW5ncy1kaWFsb2cnKS5odG1sKGA8Zm9ybSBpZD0ndGFibGV0Jz4ke3N0cmluZ308L2Zvcm0+YClcbiAgICAkKCcjdGFibGV0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKCkgeyByZXR1cm4gdGFibGV0U2V0dGluZ3NEaWFsb2cub2soKSB9KVxuICAgIGRvY3VtZW50LmZvcm1zWyd0YWJsZXQnXS5yZXNldC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgdGFibGV0U2V0dGluZ3NEaWFsb2cucmVzZXRTZXR0aW5ncygpXG4gICAgfVxuICAgIFxuICAgICQoJyN0YWJsZXQtY3VydmUtbGVmdCcpLmRyYWdnYWJsZSh7XG4gICAgICBheGlzOiBcInlcIixcbiAgICAgIGRyYWc6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICB1aS5wb3NpdGlvbi50b3AgPSBoZWxwZXIubGltaXQodWkucG9zaXRpb24udG9wLCAtIGQsIHdpZHRoIC0gZClcbiAgICAgICAgdGFibGV0U2V0dGluZ3NEaWFsb2cudXBkYXRlQ2FudmFzKClcbiAgICAgIH1cbiAgICB9KVxuICAgICQoJyN0YWJsZXQtY3VydmUtcmlnaHQnKS5kcmFnZ2FibGUoe1xuICAgICAgYXhpczogXCJ5XCIsXG4gICAgICBkcmFnOiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgdWkucG9zaXRpb24udG9wID0gaGVscGVyLmxpbWl0KHVpLnBvc2l0aW9uLnRvcCwgLWQsIHdpZHRoIC0gZClcbiAgICAgICAgdGFibGV0U2V0dGluZ3NEaWFsb2cudXBkYXRlQ2FudmFzKClcbiAgICAgIH1cbiAgICB9KVxuICAgICQoJyN0YWJsZXQtY3VydmUtY2VudGVyJykuZHJhZ2dhYmxlKHtcbiAgICAgIGRyYWc6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICB1aS5wb3NpdGlvbi50b3AgPSBoZWxwZXIubGltaXQodWkucG9zaXRpb24udG9wLCAtZCwgd2lkdGggLSBkKVxuICAgICAgICB1aS5wb3NpdGlvbi5sZWZ0ID0gaGVscGVyLmxpbWl0KHVpLnBvc2l0aW9uLmxlZnQsIC1kLCB3aWR0aCAtIGQpXG4gICAgICAgIHRhYmxldFNldHRpbmdzRGlhbG9nLnVwZGF0ZUNhbnZhcygpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHRhYmxldFNldHRpbmdzRGlhbG9nLmluaXRGb3JtKClcbiAgfSxcblxuICBvazogKCkgPT4ge1xuICAgIGNvbnN0IGN1cnZlTGVmdCA9IGVuY29kZVBvc2l0aW9uKCd0YWJsZXQtY3VydmUtbGVmdCcpXG4gICAgY29uc3QgY3VydmVSaWdodCA9IGVuY29kZVBvc2l0aW9uKCd0YWJsZXQtY3VydmUtcmlnaHQnKVxuICAgIGNvbnN0IGN1cnZlQ2VudGVyID0gZW5jb2RlUG9zaXRpb24oJ3RhYmxldC1jdXJ2ZS1jZW50ZXInKVxuICAgIGNvbmZpZy5kYXRhLnRhYmxldEN1cnZlTGVmdCA9IGN1cnZlTGVmdFxuICAgIGNvbmZpZy5kYXRhLnRhYmxldEN1cnZlUmlnaHQgPSBjdXJ2ZVJpZ2h0XG4gICAgY29uZmlnLmRhdGEudGFibGV0Q3VydmVDZW50ZXIgPSBjdXJ2ZUNlbnRlclxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGNvbmZpZy5wcmVjYWxjdWxhdGVQcmVzc3VyZSgpO1xuICAgIFxuICAgIGhlbHBlci5jbG9zZURpYWxvZyh0YWJsZXRTZXR0aW5nc0RpYWxvZylcbiAgICAvLyQodGFibGV0U2V0dGluZ3NEaWFsb2cuZWxlbWVudCkuZGlhbG9nKCdjbG9zZScpXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0sXG5cbiAgY2FuY2VsOiAoKSA9PiB7XG4gICAgaGVscGVyLmNsb3NlRGlhbG9nKHRhYmxldFNldHRpbmdzRGlhbG9nKVxuICAgIC8vJCh0YWJsZXRTZXR0aW5nc0RpYWxvZy5lbGVtZW50KS5kaWFsb2coJ2Nsb3NlJylcbiAgfSxcblxuICBpbml0Rm9ybTogKCkgPT4ge1xuICAgIGNvbnN0IGN1cnZlTGVmdCA9IGNvbmZpZy5nZXRWYWx1ZSgndGFibGV0Q3VydmVMZWZ0JywgJzAsMCcpXG4gICAgY29uc3QgY3VydmVSaWdodCA9IGNvbmZpZy5nZXRWYWx1ZSgndGFibGV0Q3VydmVSaWdodCcsICcxLDEnKVxuICAgIGNvbnN0IGN1cnZlQ2VudGVyID0gY29uZmlnLmdldFZhbHVlKCd0YWJsZXRDdXJ2ZUNlbnRlcicsICcwLjUsMC41JylcbiAgICAkKCcjdGFibGV0LWN1cnZlLWxlZnQnKS5jc3MoZGVjb2RlUG9zaXRpb24oY3VydmVMZWZ0KSlcbiAgICAkKCcjdGFibGV0LWN1cnZlLXJpZ2h0JykuY3NzKGRlY29kZVBvc2l0aW9uKGN1cnZlUmlnaHQpKVxuICAgICQoJyN0YWJsZXQtY3VydmUtY2VudGVyJykuY3NzKGRlY29kZVBvc2l0aW9uKGN1cnZlQ2VudGVyKSlcbiAgICB0YWJsZXRTZXR0aW5nc0RpYWxvZy51cGRhdGVDYW52YXMoKVxuICB9LFxuXG4gIHJlc2V0U2V0dGluZ3M6ICgpID0+IHtcbiAgICBjb25maWcuZGF0YS50YWJsZXRDdXJ2ZUxlZnQgPSAnMCwwJ1xuICAgIGNvbmZpZy5kYXRhLnRhYmxldEN1cnZlUmlnaHQgPSAnMSwxJ1xuICAgIGNvbmZpZy5kYXRhLnRhYmxldEN1cnZlQ2VudGVyID0gJzAuNSwwLjUnXG4gICAgY29uZmlnLnNhdmUoKVxuICAgIFxuICAgIHRhYmxldFNldHRpbmdzRGlhbG9nLmluaXRGb3JtKClcbiAgfSxcbiAgXG4gIHNob3c6ICgpID0+IHtcbiAgICBoZWxwZXIub3BlbkRpYWxvZyh0YWJsZXRTZXR0aW5nc0RpYWxvZylcbiAgfSxcblxuICB1cGRhdGVDYW52YXM6ICgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSAkKCcjdGFibGV0LWN1cnZlJylbMF1cbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgY29uc3QgbGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZXQtY3VydmUtbGVmdCcpXG4gICAgY29uc3QgcmlnaHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGV0LWN1cnZlLXJpZ2h0JylcbiAgICBjb25zdCBjZW50ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGV0LWN1cnZlLWNlbnRlcicpXG4gICAgY29uc3QgeDAgPSBwYXJzZUZsb2F0KGxlZnQuc3R5bGUubGVmdCkgKyBkXG4gICAgY29uc3QgeTAgPSBwYXJzZUZsb2F0KGxlZnQuc3R5bGUudG9wKSArIGRcbiAgICBjb25zdCB4MSA9IHBhcnNlRmxvYXQoY2VudGVyLnN0eWxlLmxlZnQpICsgZFxuICAgIGNvbnN0IHkxID0gcGFyc2VGbG9hdChjZW50ZXIuc3R5bGUudG9wKSArIGRcbiAgICBjb25zdCB4MiA9IHBhcnNlRmxvYXQocmlnaHQuc3R5bGUubGVmdCkgKyBkXG4gICAgY29uc3QgeTIgPSBwYXJzZUZsb2F0KHJpZ2h0LnN0eWxlLnRvcCkgKyBkXG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCB3aWR0aClcbiAgICBjdHgubGluZVdpZHRoID0gMVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyNjY2MnXG4gICAgY3R4Lm1vdmVUbyh4MCwgeTApXG4gICAgY3R4LmxpbmVUbyh4MSwgeTEpXG4gICAgY3R4LmxpbmVUbyh4MiwgeTIpXG4gICAgY3R4LnN0cm9rZSgpXG4gICAgXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ2JsYWNrJ1xuICAgIGN0eC5tb3ZlVG8oeDAsIHkwKVxuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgxLCB5MSwgeDIsIHkyKVxuICAgIGN0eC5zdHJva2UoKVxuICB9LFxufVxuXG5cbmV4cG9ydCB7IHRhYmxldFNldHRpbmdzRGlhbG9nIH1cbiovXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IFZpZXcgfSBmcm9tICcuL3ZpZXcuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFRleHRWaWV3IGV4dGVuZHMgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0KCkge1xuICB9XG59XG5cbmV4cG9ydCB7IFRleHRWaWV3IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG5jbGFzcyBUaXRsZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXQoKVxuICB9XG4gIFxuICBzZXQodGl0bGUpIHtcbiAgICBpZiAoIXRpdGxlKSB7XG4gICAgICB0aXRsZSA9IChuYW1lbm90ZS50cmlhbCkgPyBgJHtUKCdOYW1lbm90ZScpfSAke1QoJ1RyaWFsJyl9YCA6IFQoJ05hbWVub3RlJylcbiAgICB9XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLnNldFRpdGxlKHRpdGxlKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRpdGxlID0gbmV3IFRpdGxlKClcblxuZXhwb3J0IHsgdGl0bGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcbmltcG9ydCB7IHZpZXdCdXR0b24gfSBmcm9tICcuL3ZpZXctYnV0dG9uLmVzNidcbmltcG9ydCB7IGhpc3RvcnlCdXR0b24gfSBmcm9tICcuL2hpc3RvcnktYnV0dG9uLmVzNidcbmltcG9ydCB7IHRvb2xCdXR0b24gfSBmcm9tICcuL3Rvb2wtYnV0dG9uLmVzNidcbmltcG9ydCB7IG1lbnVCdXR0b24gfSBmcm9tICcuL21lbnUtYnV0dG9uLmVzNidcblxuY2xhc3MgVG9vbEJhciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB2aWV3QnV0dG9uLmluaXQoKVxuICAgIGhpc3RvcnlCdXR0b24uaW5pdCgpXG4gICAgdG9vbEJ1dHRvbi5pbml0KClcbiAgICBtZW51QnV0dG9uLmluaXQoKVxuXG4gICAgdGhpcy51cGRhdGUoKVxuICAgIHRoaXMudXBkYXRlQnV0dG9ucygpXG4gIH1cbiAgXG4gIHVwZGF0ZUJ1dHRvbnMoKSB7XG4gICAgdmlld0J1dHRvbi51cGRhdGUoKVxuICAgIGhpc3RvcnlCdXR0b24udXBkYXRlKClcbiAgICB0b29sQnV0dG9uLnVwZGF0ZSgpXG4gICAgbWVudUJ1dHRvbi51cGRhdGUoKVxuICB9XG4gIFxuICB1cGRhdGUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkKSB2YWx1ZSA9IGNvbmZpZy5kYXRhLnRvb2xCYXJcbiAgICBjb25maWcuZGF0YS50b29sQmFyID0gdmFsdWVcbiAgICBjb25maWcuc2F2ZSgpXG5cbiAgICAkKCcjdG9vbGJhcicpLmNzcygnZGlzcGxheScsIHZhbHVlID8gJ2Jsb2NrJyA6ICdub25lJylcbiAgICAkKCcjbWFpbicpLmNzcygnaGVpZ2h0JywgdmFsdWUgPyAnY2FsYygxMDAlIC0gMzdweCknIDogJzEwMCUnKVxuICAgICQoJyNtYWluJykuY3NzKCd0b3AnLCB2YWx1ZSA/ICczN3B4JyA6ICcwJylcblxuICAgIC8vVmlldy5vblJlc2l6ZSgpXG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy51cGRhdGUoIWNvbmZpZy5kYXRhLnRvb2xCYXIpXG4gIH1cbn1cblxuY29uc3QgdG9vbEJhciA9IG5ldyBUb29sQmFyKCk7XG5cbmV4cG9ydCB7IHRvb2xCYXIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuaW1wb3J0IHsgaHRtbERyb3Bkb3duIH0gZnJvbSAnLi9odG1sLWRyb3Bkb3duLmVzNidcblxubGV0IHBlbkJ1dHRvblxubGV0IGVyYXNlckJ1dHRvblxubGV0IHRleHRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBUb29sQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcGVuQnV0dG9uID0gJCgnI3Blbi1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvcGVuLWJ1dHRvbi5wbmcnLFxuICAgICAgbG9ja2VkOiB0cnVlLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KCdwZW4nKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgncGVuRHJvcERvd24nLCAncGVuJylcbiAgICB9KVswXVxuICAgIFxuICAgIGVyYXNlckJ1dHRvbiA9ICQoJyNlcmFzZXItYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL2VyYXNlci1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdCgnZXJhc2VyJylcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbERyb3Bkb3duLm1ha2UoJ2VyYXNlckRyb3BEb3duJywgJ2VyYXNlcicpXG4gICAgfSlbMF1cblxuICAgIHRleHRCdXR0b24gPSAkKCcjdGV4dC1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdGV4dC1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaW1hZ2VCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdCgndGV4dCcpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCd0ZXh0RHJvcERvd24nLCAndGV4dCcpXG4gICAgfSlbMF1cblxuICAgIHRoaXMuYnV0dG9ucy5wdXNoKHBlbkJ1dHRvbiwgZXJhc2VyQnV0dG9uLCB0ZXh0QnV0dG9uKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICB9XG5cbiAgc2VsZWN0KG5hbWUpIHtcbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJylcbiAgICAgIFxuICAgICAgaWYgKGJ1dHRvbiAmJiBidXR0b24uaWQuaW5kZXhPZihuYW1lKSA9PSAwKSB7XG4gICAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCB0b29sQnV0dG9uID0gbmV3IFRvb2xCdXR0b24oKVxuXG5leHBvcnQgeyB0b29sQnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyB3aWRnZXQgfSBmcm9tICcuL3dpZGdldC5lczYnXG5pbXBvcnQgeyBkaXZpZGVyIH0gZnJvbSAnLi9kaXZpZGVyLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcbmltcG9ydCB7IG1lbnUgfSBmcm9tICcuL21lbnUuZXM2J1xuaW1wb3J0IHsgdGl0bGUgfSBmcm9tICcuL3RpdGxlLmVzNidcblxuaW1wb3J0IHsgdG9vbEJhciB9IGZyb20gJy4vdG9vbC1iYXIuZXM2J1xuaW1wb3J0IHsgc2lkZUJhciB9IGZyb20gJy4vc2lkZS1iYXIuZXM2J1xuXG5jbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWVudSA9IG1lbnVcbiAgICB0aGlzLmRpdmlkZXIgPSBkaXZpZGVyXG4gICAgdGhpcy5kaWFsb2cgPSBkaWFsb2dcblxuICAgIHRoaXMudG9vbEJhciA9IHRvb2xCYXJcbiAgICB0aGlzLnNpZGVCYXIgPSBzaWRlQmFyXG4gIH1cbiAgXG4gIGluaXQoKSB7XG4gICAgbWVudS5pbml0KClcbiAgICB0aXRsZS5pbml0KClcbiAgICBkaXZpZGVyLmluaXQoKVxuICAgIGRpYWxvZy5pbml0KClcblxuICAgIHRvb2xCYXIuaW5pdCgpXG4gICAgc2lkZUJhci5pbml0KClcblxuICAgICQoJy5zcGxpdC1wYW5lJykuY3NzKCdvcGFjaXR5JywgMSlcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBXQVJOKCdbdWkgdXBkYXRlXScpXG4gICAgZGl2aWRlci51cGRhdGUoKVxuICAgIFxuLy8gIHRvb2xCYXIudXBkYXRlKClcbi8vICBzaWRlQmFyLnVwZGF0ZSgpXG5cbi8vICBkaXZpZGVyLnVwZGF0ZSgpXG4gIH1cbn1cblxuY29uc3QgdWkgPSBuZXcgVUkoKVxuXG5leHBvcnQgeyB1aSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcblxubGV0IHF1aWNrWm9vbUJ1dHRvblxubGV0IHpvb21CdXR0b25cbmxldCB1bnpvb21CdXR0b25cbmxldCBzcGxpdEJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFZpZXdCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcXVpY2tab29tQnV0dG9uID0gJCgnI3Jvdy1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvbWFnbmlmaWVyLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyBjb21tYW5kLnF1aWNrWm9vbSgpIH1cbiAgICB9KVswXVxuXG4gICAgem9vbUJ1dHRvbiA9ICQoJyN6b29tLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy96b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQuem9vbSgpIH1cbiAgICB9KVswXVxuXG4gICAgdW56b29tQnV0dG9uID0gJCgnI3Vuem9vbS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW56b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQudW56b29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICBzcGxpdEJ1dHRvbiA9ICQoJyNzcGxpdC1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvdW56b29tLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyBjb21tYW5kLnNpZGVCYXIoKSB9XG4gICAgfSlbMF1cbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdE1hbmFnZXIuY3VycmVudFxuICAgIGNvbnN0IHF1aWNrWm9vbSA9IHByb2plY3QgLy8ocHJvamVjdCkgPyBwcm9qZWN0LnZpZXcucXVpY2tab29tIDogZmFsc2VcbiAgICBcbiAgICAkKHpvb21CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFwcm9qZWN0KVxuICAgICQodW56b29tQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhcHJvamVjdClcbiAgICAkKHF1aWNrWm9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG5cbiAgICAkKHF1aWNrWm9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHF1aWNrWm9vbSlcbiAgICAkKHNwbGl0QnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgY29uZmlnLmRhdGEuc2lkZUJhcilcbiAgfVxufVxuXG5jb25zdCB2aWV3QnV0dG9uID0gbmV3IFZpZXdCdXR0b24oKVxuXG5leHBvcnQgeyB2aWV3QnV0dG9uIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMucHJldmVudFNjcm9sbEZyZWV6ZSgpXG4gIH1cblxuICBwcmV2ZW50U2Nyb2xsRnJlZXplKCkge1xuICAgIHRoaXMubGFzdFggPSAwXG4gICAgdGhpcy5sYXN0WSA9IDBcblxuICAgIGNvbnN0IHNjcm9sbGVyID0gJCh0aGlzLmVsZW1lbnQpLnBhcmVudCgpXG4gICAgc2Nyb2xsZXIub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4gICAgICB0aGlzLmxhc3RYID0gZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgIHRoaXMubGFzdFkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuICAgIH0uYmluZCh0aGlzKSlcbiAgICBcbiAgICBzY3JvbGxlci5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgY29uc3QgeCA9IGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICBjb25zdCB5ID0gZS50b3VjaGVzWzBdLmNsaWVudFlcblxuICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGhcbiAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHRcblxuICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gJChlLmN1cnJlbnRUYXJnZXQpLnNjcm9sbFRvcCgpXG4gICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gJChlLmN1cnJlbnRUYXJnZXQpLnNjcm9sbExlZnQoKVxuICAgICAgY29uc3QgZGlyWSA9ICh0aGlzLmxhc3RZIC0geSkgPCAwID8gJ3VwJzogJ2Rvd24nXG4gICAgICBjb25zdCBkaXJYID0gKHRoaXMubGFzdFggLSB4KSA8IDAgPyAnbGVmdCc6ICdyaWdodCdcblxuICAgICAgaWYgKHNjcm9sbFRvcCA9PT0gMCkge1xuICAgICAgICBpZiAoZGlyWSA9PT0gXCJ1cFwiKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoc2Nyb2xsVG9wID49IGUuY3VycmVudFRhcmdldC5zY3JvbGxIZWlnaHQgLSBoZWlnaHQpIHtcbiAgICAgICAgaWYgKGRpclkgPT09IFwiZG93blwiKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBpZiAoc2Nyb2xsTGVmdCA9PT0gMCkge1xuICAgICAgICBpZiAoZGlyWCA9PT0gXCJsZWZ0XCIpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgfSBlbHNlIGlmIChzY3JvbGxMZWZ0ID49IGUuY3VycmVudFRhcmdldC5zY3JvbGxXaWR0aCAtIHdpZHRoKSB7XG4gICAgICAgIGlmIChkaXJYID09PSBcInJpZ2h0XCIpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGFzdFggPSB4O1xuICAgICAgdGhpcy5sYXN0WSA9IHk7XG4gICAgfS5iaW5kKHRoaXMpKVxuICB9XG59XG5cbmV4cG9ydCB7IFZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIFdpZGdldCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdEltYWdlQnV0dG9uKClcbiAgICB0aGlzLmluaXRUZXh0QnV0dG9uKClcbiAgfVxuXG4gIGluaXRUZXh0QnV0dG9uKCkge1xuICAgICQud2lkZ2V0KCduYW1lbm90ZS50ZXh0QnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICBoZWlnaHQ6ICcyNHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgIH0sXG5cbiAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ3RleHQtYnV0dG9uJylcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnZmxvYXQnLCB0aGlzLm9wdGlvbnMuZmxvYXQpXG4gICAgICAgIHRoaXMubG9ja2VkKHRoaXMub3B0aW9ucy5sb2NrZWQpXG4gICAgICAgIHRoaXMuZWxlbWVudC50ZXh0KHRoaXMub3B0aW9ucy50ZXh0KVxuXG4gICAgICAgIGNvbnN0IGNsaWNrID0gdGhpcy5vcHRpb25zLmNsaWNrXG4gICAgICAgIGlmIChjbGljaykgdGhpcy5lbGVtZW50Lm9uKCdjbGljaycsIGNsaWNrKVxuICAgICAgfSxcblxuICAgICAgbG9ja2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5sb2NrZWRcblxuICAgICAgICB0aGlzLm9wdGlvbnMubG9ja2VkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KVxuICB9XG4gIFxuICBpbml0SW1hZ2VCdXR0b24oKSB7XG4gICAgJC53aWRnZXQoJ25hbWVub3RlLmltYWdlQnV0dG9uJywge1xuICAgICAgb3B0aW9uczoge1xuICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICB3aWR0aDogJzI4cHgnLFxuICAgICAgICBoZWlnaHQ6ICcyOHB4JyxcbiAgICAgICAgbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgXG4gICAgICBfY3JlYXRlOiBmdW5jdGlvbigpIHtcbi8vICAgICAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdpbWctYnV0dG9uJylcbi8vICAgICAgdGhpcy5lbGVtZW50LmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoJHt0aGlzLm9wdGlvbnMuc3JjfSlgKVxuLy8gICAgICB0aGlzLmVsZW1lbnQuY3NzKCdiYWNrZ3JvdW5kJywgJyNlZWZmZGQnKVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCdmbG9hdCcsIHRoaXMub3B0aW9ucy5mbG9hdClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnd2lkdGgnLCB0aGlzLm9wdGlvbnMud2lkdGgpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2hlaWdodCcsIHRoaXMub3B0aW9ucy5oZWlnaHQpXG5cbiAgICAgICAgdGhpcy5lbGVtZW50LmF0dHIoJ3RpdGxlJywgVCh0aGlzLmVsZW1lbnQuYXR0cigndGl0bGUnKSkpXG5cbiAgICAgICAgdGhpcy5lbGVtZW50Lmh0bWwoYDxpbWcgc3JjPScke3RoaXMub3B0aW9ucy5zcmN9JyAvPmApXG4vLyAgICAgIFdBUk4odGhpcy5lbGVtZW50Lmh0bWwoKSlcbiAgICAgICAgXG4gICAgICAgIHRoaXMubG9ja2VkKHRoaXMub3B0aW9ucy5sb2NrZWQpXG4gICAgICAgIHRoaXMuZGlzYWJsZWQodGhpcy5vcHRpb25zLmRpc2FibGVkKVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5jb250ZW50KSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50XG4gICAgICAgICAgY29udGVudC50aXRsZSA9IFwiXCJcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmZsb2F0ID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUucmlnaHQgPSBcIjBcIlxuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLm9wdGlvbnMuY29udGVudFBhcmVudCB8fCB0aGlzLmVsZW1lbnRbMF1cbiAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY29udGVudClcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnRQYXJlbnQpIHtcbiAgICAgICAgICAgIC8vIFNob3VsZCByZWNhbGMgbWVudSBwb3N0aW9uIG9uIG9wZW5cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjbGljayA9IHRoaXMub3B0aW9ucy5jbGlja1xuICAgICAgICBpZiAoY2xpY2spIHRoaXMuZWxlbWVudC5vbignY2xpY2snLCBjbGljaylcbiAgICAgIH0sXG5cbiAgICAgIGxvY2tlZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnMubG9ja2VkXG5cbiAgICAgICAgdGhpcy5vcHRpb25zLmxvY2tlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuXHQgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfSBlbHNlIHtcblx0ICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2xvY2tlZCcpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGRpc2FibGVkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXNhYmxlZFxuICAgICAgXG4gICAgICAgIHRoaXMub3B0aW9ucy5kaXNhYmxlZCA9IHZhbHVlXG4gICAgICAgIGlmICh2YWx1ZSkge1xuXHQgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygnb2ZmJylcbiAgICAgICAgfSBlbHNlIHtcblx0ICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ29mZicpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHVwZGF0ZUNvbnRlbnRQb3NpdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0aGlzLmVsZW1lbnRbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50XG4gICAgICAgIGNvbnN0IGNvbnRlbnRXaWR0aCA9IHRoaXMub3B0aW9ucy5jb250ZW50V2lkdGggfHwgMTUwXG5cbiAgICAgICAgY29uc3Qgd2lkdGggPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoXG4gICAgICAgIGNvbnN0IGxlZnQgPSAocmVjdC54ICsgY29udGVudFdpZHRoKSA8IHdpZHRoID8gcmVjdC54IDogd2lkdGggLSBjb250ZW50V2lkdGhcbiAgICAgICAgY29udGVudC5zdHlsZS5sZWZ0ID0gKGxlZnQgLSAyKSArICdweCdcbiAgICAgICAgY29udGVudC5zdHlsZS50b3AgPSAoNjQgKyAyKSArICdweCdcbiAgICAgIH0sXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCB3aWRnZXQgPSBuZXcgV2lkZ2V0KClcblxuZXhwb3J0IHsgd2lkZ2V0IH1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZGljdGlvbmFyeSA9IHtcbiAgXCJqYVwiOiB7XG4gICAgXCJOYW1lbm90ZVwiOiBcIk5hbWVub3RlXCIsXG4gICAgXCJBYm91dCBOYW1lbm90ZVwiOiBcIk5hbWVub3RlIOOBq+OBpOOBhOOBplwiLFxuICAgIFwiQWJvdXQgTmFtZW5vdGUgLi4uXCI6IFwiTmFtZW5vdGUg44Gr44Gk44GE44GmIC4uLlwiLFxuICAgIFwiSGVscFwiOiBcIuODmOODq+ODl1wiLFxuICAgIFwiU2V0dGluZ3NcIjogXCLnkrDlooPoqK3lrppcIixcbiAgICBcIlNldHRpbmdzIC4uLlwiOiBcIueSsOWig+ioreWumiAuLi5cIixcbiAgICBcIlRhYmxldCBTZXR0aW5nc1wiOiBcIuethuWcp+iqv+aVtFwiLFxuICAgIFwiVGFibGV0IFNldHRpbmdzIC4uLlwiOiBcIuethuWcp+iqv+aVtCAuLi5cIixcbiAgICBcIlF1aXQgTmFtZW5vdGVcIjogXCJOYW1lbm90ZSDjgpLntYLkuoZcIixcbiAgICBcIk5vdGVcIjogXCLjg47jg7zjg4hcIixcbiAgICBcIkZpbGVcIjogXCLjg5XjgqHjgqTjg6tcIixcbiAgICBcIk9wZW4gLi4uXCI6IFwi6ZaL44GPIC4uLlwiLFxuICAgIFwiT3BlblwiOiBcIuODjuODvOODiOOCkumWi+OBj1wiLFxuICAgIFwiTmV3IC4uLlwiOiBcIuaWsOimjyAuLi5cIixcbiAgICBcIk5ld1wiOiBcIuaWsOimj+ODjuODvOODiFwiLFxuICAgIFwiQ2xvc2VcIjogXCLplonjgZjjgotcIixcbiAgICBcIkNsb3NlIEFsbFwiOiBcIuOBmeOBueOBpuOCkumWieOBmOOCi1wiLFxuICAgIFwiTm90ZSBTZXR0aW5ncyAuLi5cIjogXCLjg47jg7zjg4joqK3lrpogLi4uXCIsXG4gICAgXCJFeHBvcnRcIjogXCLmm7jjgY3lh7rjgZdcIixcbiAgICBcIkltcG9ydFwiOiBcIuiqreOBv+i+vOOBv1wiLFxuICAgIFwiLmNzbmYgKENMSVAgU1RVRElPIFN0b3J5Ym9hcmQpIC4uLlwiOiBcIi5jc25mIChDTElQIFNUVURJTyDjg43jg7zjg6Djg5XjgqHjgqTjg6spIC4uLlwiLFxuICAgIFwiLnBkZiAoUERGKSAuLi5cIjogXCIucGRmIChQREYpIC4uLlwiLFxuICAgIFwiLnR4dCAoUGxhaW4gVGV4dCkgLi4uXCI6IFwiLnR4dCAo44OG44Kt44K544OI44OV44Kh44Kk44OrKSAuLi5cIixcbiAgICBcIlNhdmVcIjogXCLkv53lrZhcIixcbiAgICBcIlNhdmUgQXMgLi4uXCI6IFwi5ZCN5YmN44KS44Gk44GR44Gm5L+d5a2YIC4uLlwiLFxuICAgIFwiU2F2ZSBBc1wiOiBcIuWQjeWJjeOCkuOBpOOBkeOBpuS/neWtmFwiLFxuICAgIFwiU2F2ZSBTbmFwc2hvdCBBcyAuLi5cIjogXCLjg5Djg4Pjgq/jgqLjg4Pjg5fjgpLkv53lrZggLi4uXCIsXG4gICAgXCJFZGl0XCI6IFwi57eo6ZuGXCIsXG4gICAgXCJVbmRvXCI6IFwi5Y+W44KK5raI44GXXCIsXG4gICAgXCJSZWRvXCI6IFwi44KE44KK55u044GXXCIsXG4gICAgXCJDdXRcIjogXCLliIfjgorlj5bjgopcIixcbiAgICBcIkNvcHlcIjogXCLjgrPjg5Tjg7xcIixcbiAgICBcIlBhc3RlXCI6IFwi6LK844KK5LuY44GRXCIsXG4gICAgXCJTZWxlY3QgQWxsXCI6IFwi44GZ44G544Gm44KS6YG45oqeXCIsXG5cbiAgICBcIlBhZ2VcIjogXCLjg5rjg7zjgrhcIixcbiAgICBcIkFkZFwiOiBcIui/veWKoFwiLFxuICAgIFwiTW92ZSB0byBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgavlhaXjgozjgotcIixcbiAgICBcIlB1dCBCYWNrIGZyb20gQnVmZmVyXCI6IFwi44OQ44OD44OV44Kh44GL44KJ5oi744GZXCIsXG4gICAgXCJFbXB0eSBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgpLnqbrjgavjgZnjgotcIixcbiAgICBcIkR1cGxpY2F0ZVwiOiBcIuikh+ijveOCkui/veWKoFwiLFxuICAgIFwiTW92ZSBGb3J3YXJkXCI6IFwi5YmN44Gr56e75YuVXCIsXG4gICAgXCJNb3ZlIEJhY2t3YXJkXCI6IFwi5b6M44KN44Gr56e75YuVXCIsXG4gICAgXCJGbGlwXCI6IFwi5bem5Y+z5Y+N6Lui44GX44Gm6KGo56S6XCIsXG4gICAgXCJTYXZlIEltYWdlIEFzIC4uLlwiOiBcIuOCpOODoeODvOOCuOOCkuS/neWtmCAuLi5cIixcbiAgICBcIlNhdmUgSW1hZ2VcIjogXCLjgqTjg6Hjg7zjgrjjgpLkv53lrZhcIixcbiAgICBcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJWaWV3XCI6IFwi6KGo56S6XCIsXG4gICAgXCJUb29sIEJhclwiOiBcIuODhOODvOODq+ODkOODvFwiLFxuICAgIFwiU2lkZSBCYXJcIjogXCLjgrXjgqTjg4njg5Djg7xcIixcbiAgICBcIkRldmVsb3BlciBUb29sc1wiOiBcIuODh+ODmeODreODg+ODkeODvCDjg4Tjg7zjg6tcIixcbiAgICBcIkZ1bGwgU2NyZWVuXCI6IFwi44OV44Or44K544Kv44Oq44O844OzXCIsXG4gICAgXCJQYWdlIE1hcmdpblwiOiBcIuS9meeZvVwiLFxuICAgIFwiTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3dcIjogXCIx6KGM44GC44Gf44KK44Gu44Oa44O844K45pWwXCIsXG4gICAgXG4gICAgXCJXaW5kb3dcIjogXCLjgqbjgqPjg7Pjg4njgqZcIixcbiAgICBcIkV4dHJhY3QgVGV4dFwiOiBcIuODhuOCreOCueODiOOCkuaKveWHulwiLFxuICAgIFwiT3BlbiBSZWNlbnRcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjgpLplovjgY9cIixcbiAgICBcIkNsZWFyIFJlY2VudCBOb3RlIExpc3RcIjogXCLmnIDov5Hkvb/nlKjjgZfjgZ/jg47jg7zjg4jjga7jg6rjgrnjg4jjgpLmtojljrtcIixcbiAgICBcIlVudGl0bGVkXCI6IFwi5ZCN56ew5pyq6Kit5a6aXCIsXG4gICAgXCJNYWtpbmcgQ1NORiAuLi5cIjogXCJDU05G44OV44Kh44Kk44Or44KS5L2c5oiQ5LitIC4uLlwiLFxuICAgIFwiT25saW5lIFN0b3JhZ2VcIjogXCLjgqrjg7Pjg6njgqTjg7Pjgrnjg4jjg6zjg7zjgrhcIixcblxuICAgIFwiTmFtZW5vdGUgd291bGQgbGlrZSBhY2Nlc3MgdG8gdGhlIGZpbGVzIGluIHlvdXIgRHJvcGJveC5cIjogXCJOYW1lbm90ZSDjga8gRHJvcGJveCDjgavjg4fjg7zjgr/jgpLkv53lrZjjgZfjgb7jgZnjgII8YnI+5o6l57aa44GX44G+44GZ44GL77yfXCIsXG4gICAgXCJBdXRoZW50aWNhdGVcIjogXCLoqo3oqLxcIixcbiAgICBcIkNvbm5lY3QgdG8gRHJvcGJveFwiOiBcIkRyb3Bib3gg44Gr5o6l57aaXCIsXG4gICAgXCJDYW5jZWxcIjogXCLjgq3jg6Pjg7Pjgrvjg6tcIixcbiAgICBcIkNvbm5lY3RpbmcgLi4uXCI6IFwi5o6l57aa5LitIC4uLlwiLFxuICAgIFxuICAgIFwiVGV4dHNcIjogXCLjg4bjgq3jgrnjg4hcIixcblxuICAgIFwiU2lkZSBCYXIgUG9zaXRpb25cIjogXCLjgrXjgqTjg4njg5Djg7zjga7kvY3nva5cIixcbiAgICBcIkxlZnRcIjogXCLlt6ZcIixcbiAgICBcIlJpZ2h0XCI6IFwi5Y+zXCIsXG4gICAgXG4gICAgXCJTXCI6IFwi5bCPXCIsXG4gICAgXCJNXCI6IFwi5LitXCIsXG4gICAgXCJMXCI6IFwi5aSnXCIsXG4gICAgXCJQcmVzc3VyZVwiOiBcIuethuWcp1wiLFxuICAgIFwiVmVydGljYWxcIjogXCLnuKbmm7jjgY1cIixcbiAgICBcIkhvcml6b250YWxcIjogXCLmqKrmm7jjgY1cIixcblxuICAgIFwiTmV3IG5vdGVib29rXCI6IFwi5paw6KaP44OO44O844OIXCIsXG4gICAgXCJOb3RlYm9vayBuYW1lXCI6IFwi44OO44O844OI5ZCNXCIsXG4gICAgXCJGb2xkZXJcIjogXCLkv53lrZjlhYhcIixcbiAgICBcIkNob29zZSBmb2xkZXIuLi5cIjogXCLlj4LnhacuLi5cIixcbiAgICBcIk51bWJlciBvZiBwYWdlc1wiOiBcIuODmuODvOOCuOaVsFwiLFxuICAgIFwiVGVtcGxhdGVcIjogXCLjg4bjg7Pjg5fjg6zjg7zjg4hcIixcbiAgICBcIk1hbmdhXCI6IFwi5ryr55S7XCIsXG4gICAgXCJCaW5kaW5nIHBvaW50XCI6IFwi57a044GY44KL5L2N572uXCIsXG4gICAgXCJMZWZ0IGJpbmRpbmdcIjogXCLlt6bntrTjgZjjgIBcIixcbiAgICBcIlJpZ2h0IGJpbmRpbmdcIjogXCLlj7PntrTjgZjjgIBcIixcbiAgICBcIlN0YXJ0IHBhZ2VcIjogXCLplovlp4vjg5rjg7zjgrhcIixcbiAgICBcIkZyb20gbGVmdFwiOiBcIuW3puODmuODvOOCuFwiLFxuICAgIFwiRnJvbSByaWdodFwiOiBcIuWPs+ODmuODvOOCuFwiLFxuICAgIFwiUGFnZXNcIjogXCLjg5rjg7zjgrhcIixcbiAgICBcIkFsbFwiOiBcIuOBmeOBueOBplwiLFxuICAgIFwiQ3VycmVudCBwYWdlXCI6IFwi6YG45oqe44GV44KM44Gf44Oa44O844K4XCIsXG4gICAgXCJSYW5nZVwiOiBcIuevhOWbsuaMh+WumlwiLFxuICAgIFwiU2NhbGVcIjogXCLmi6HlpKcv57iu5bCPXCIsXG4gICAgXCJDdXN0b21cIjogXCLjgqvjgrnjgr/jg6BcIixcbiAgICBcIlRleHQgY29sb3JcIjogXCLjg4bjgq3jgrnjg4jjga7oibJcIixcbiAgICBcIjEwMCVcIjogXCJCNeWVhualreiqjOeUqChCNOOCteOCpOOCuuWOn+eov+eUqOe0mS9BNOS7leS4iuOBjOOCiilcIixcbiAgICBcIjgyJVwiOiBcIkE15ZCM5Lq66KqM55SoKEE044K144Kk44K65Y6f56i/55So57SZL0I15LuV5LiK44GM44KKKVwiLFxuICAgIFwiTmFtZSBjaGFuZ2VyIGNvbXBhdGlibGVcIjogXCLjgrnjg4jjg7zjg6rjg7zjgqjjg4fjgqPjgr/nlKjjg43jg7zjg6Djg4Hjgqfjg7Pjgrjjg6Pjg7zkupLmj5tcIixcblxuICAgIFwiRXhwb3J0IENMSVAgU1RVRElPIFN0b3J5Ym9hcmRcIjogXCJDTElQIFNUVURJTyDjg43jg7zjg6Dmm7jjgY3lh7rjgZdcIixcbiAgICBcIkV4cG9ydCBQREZcIjogXCJQREbmm7jjgY3lh7rjgZdcIixcbiAgICBcIkltcG9ydCBQbGFpbiBUZXh0XCI6IFwi44OG44Kt44K544OI6Kqt44G/6L6844G/XCIsXG4gICAgXCJSZXNldCBTZXR0aW5ncyB0byBEZWZhdWx0XCI6IFwi5Yid5pyf6Kit5a6a44Gr5oi744GZXCIsXG5cbiAgICBcIkZpbGUgbmFtZVwiOiBcIuODleOCoeOCpOODq+WQjVwiLFxuICAgIFwiRHVwbGljYXRlIG5vdGUgbmFtZS5cIjogXCLlkIzjgZjlkI3liY3jga7jg47jg7zjg4jjgYzjgYLjgorjgb7jgZnjgIJcIixcbiAgICBcIkR1cGxpY2F0ZSBmaWxlIG5hbWUuXCI6IFwi5ZCM44GY5ZCN5YmN44Gu44OV44Kh44Kk44Or44GM44GC44KK44G+44GZ44CCXCIsXG4gICAgXCJGaWxlIG5vdCBmb3VuZC5cIjogXCLjg5XjgqHjgqTjg6vjgYzopovjgaTjgYvjgorjgb7jgZvjgpPjgIJcIixcbiAgICBcIkZpbGUgb3BlbiBlcnJvci5cIjogXCLjgZPjga7jg5XjgqHjgqTjg6vjga/plovjgZHjgb7jgZvjgpPjgIJcIixcbiAgICBcIlNhdmUgZXJyb3IuXCI6IFwi44K744O844OW44Gn44GN44G+44Gb44KT44CCXCIsXG4gICAgXCJTZWxlY3QgZmlsZSB0byBpbXBvcnRcIjogXCLoqq3jgb/ovrzjgoDjg5XjgqHjgqTjg6vjgpLpgbjmip7jgZfjgabjgY/jgaDjgZXjgYRcIixcbiAgICBcIkNvbXByZXNzaW5nXCI6IFwi5Zyn57iu5LitXCIsXG4gICAgXCJSZW5kZXJpbmdcIjogXCLkvZzmiJDkuK1cIixcblxuICAgIFwiRm9ybWF0XCI6IFwi44OV44Kp44O844Oe44OD44OIXCIsXG4gICAgXCJMaW5lIHNlcGFyYXRvclwiOiBcIuaUueihjFwiLFxuICAgIFwiQmFsbG9vbiBzZXBhcmF0b3JcIjogXCLmlLnjgrvjg6rjg5VcIixcbiAgICBcIlBhZ2Ugc2VwYXJhdG9yXCI6IFwi5pS544Oa44O844K4XCIsXG4gICAgXCJDb21tZW50IGtleVwiOiBcIuOCs+ODoeODs+ODiFwiLFxuICAgIFwiQ2hvb3NlIGZpbGUuLi5cIjogXCLjg5XjgqHjgqTjg6vjgpLpgbjmip4uLi5cIixcbiAgICBcbiAgICBcIlRyaWFsXCI6IFwi6Kmm55So54mIXCIsXG4gICAgXCJXZWxjb21lIHRvIHRoZSB0cmlhbCB2ZXJzaW9uIG9mIE5hbWVub3RlLlxcbllvdSBoYXZlIFwiOiBcIuOBguOBqFwiLFxuICAgIFwiIGRheShzKSBsZWZ0LlwiOiBcIuaXpeOBkOOCieOBhOippueUqOOBp+OBjeOBvuOBmeOAglxcbuOBguOCiuOBjOOBqOOBhuOBlOOBluOBhOOBvuOBme+8gVwiLCBcbiAgICBcIldlJ3JlIHNvcnJ5LCBidXQgeW91ciB0cmlhbCBwZXJpb2QgaGFzIGV4cGlyZWQuXCI6IFwi6Kmm55So5pyf6ZaT57WC5LqG44GX44G+44GX44Gf44CCXFxu44GC44KK44GM44Go44GG44GU44GW44GE44G+44GX44Gf77yBXCIsIFxuXG4gICAgXCJab29tIHNtYWxsIHRleHRzIG9uIGlucHV0XCI6IFwi5bCP44GV44GE44OG44Kt44K544OI44KS57eo6ZuG44GZ44KL44Go44GN44Gv5ouh5aSn6KGo56S644GZ44KLXCIsXG4gICAgXCJVc2UgUXVpY2tsaW5lXCIgOiBcIumVt+aKvOOBl+OBp+ebtOe3muODhOODvOODq+OBq+WIh+OCiuabv+OBiOOCi1wiLFxuICAgIFwiRGlzYWJsZSB3aW50YWIgZHJpdmVyXCI6IFwiV2ludGFi44OJ44Op44Kk44OQ44KS5L2/44KP44Gq44GEXCIsXG4gICAgXCJEaXNhYmxlIG1vdXNlIHdoZWVsIHNjcm9sbFwiOiBcIuODnuOCpuOCueODm+OCpOODvOODq+OBp+OCueOCr+ODreODvOODq+OBl+OBquOBhFwiLFxuICAgIFwiQ2xpY2sgT0sgdG8gcmVzdG9yZSBkZWZhdWx0IHNldHRpbmdzLlwiOiBcIuODh+ODleOCqeODq+ODiOOBruioreWumuOBq+aIu+OBl+OBvuOBmVwiLFxuICAgIFwiUGVuIHByZXNzdXJlXCI6IFwi562G5ZynXCIsXG4gICAgXCJPdXRwdXRcIjogXCLlh7rliptcIixcblxuICAgIFwiTWVudVwiOiBcIuODoeODi+ODpeODvFwiLFxuICAgIFwiUGVuXCI6IFwi44Oa44OzXCIsXG4gICAgXCJFcmFzZXJcIjogXCLmtojjgZfjgrTjg6BcIixcbiAgICBcIlRleHRcIjogXCLjg4bjgq3jgrnjg4hcIixcbiAgICBcIlpvb20gSW5cIjogXCLjgrrjg7zjg6DjgqTjg7NcIixcbiAgICBcIlpvb20gT3V0XCI6IFwi44K644O844Og44Ki44Km44OIXCIsXG4gICAgXCJRdWljayBab29tXCI6IFwi44Kv44Kk44OD44Kv44K644O844OgXCIsXG4gICAgXG4gICAgXCJFbmFibGUgSmFwYW5lc2UgT3B0aW9uc1wiOiBcIuaXpeacrOiqnueUqOOBruOCquODl+OCt+ODp+ODs+OCkuacieWKueOBq+OBmeOCi1wiXG4gIH1cbn1cblxuZXhwb3J0cy5kaWN0aW9uYXJ5ID0gZGljdGlvbmFyeVxuIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6ZS5Ecm9wYm94PXQoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoKXtyZXR1cm5cInVuZGVmaW5lZFwiIT10eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUmJnNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZXx8XCJ1bmRlZmluZWRcIj09dHlwZW9mIG1vZHVsZXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvd31mdW5jdGlvbiB0KGUpe3JldHVyblwiaHR0cHM6Ly9cIitlK1wiLmRyb3Bib3hhcGkuY29tLzIvXCJ9ZnVuY3Rpb24gcihlKXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoZSkucmVwbGFjZSgvW1xcdTAwN2YtXFx1ZmZmZl0vZyxmdW5jdGlvbihlKXtyZXR1cm5cIlxcXFx1XCIrKFwiMDAwXCIrZS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpfSl9ZnVuY3Rpb24gbihlKXt2YXIgdD1lLmxlbmd0aDtpZih0JTQ+MCl0aHJvdyBFcnJvcihcIkludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDRcIik7cmV0dXJuXCI9XCI9PT1lW3QtMl0/MjpcIj1cIj09PWVbdC0xXT8xOjB9dmFyIGk9e307aS5hdXRoVG9rZW5Gcm9tT2F1dGgxPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJhdXRoL3Rva2VuL2Zyb21fb2F1dGgxXCIsZSxcImFwcFwiLFwiYXBpXCIsXCJycGNcIil9LGkuYXV0aFRva2VuUmV2b2tlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJhdXRoL3Rva2VuL3Jldm9rZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5jb250YWN0c0RlbGV0ZU1hbnVhbENvbnRhY3RzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJjb250YWN0cy9kZWxldGVfbWFudWFsX2NvbnRhY3RzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmNvbnRhY3RzRGVsZXRlTWFudWFsQ29udGFjdHNCYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiY29udGFjdHMvZGVsZXRlX21hbnVhbF9jb250YWN0c19iYXRjaFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1Byb3BlcnRpZXNBZGQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy9wcm9wZXJ0aWVzL2FkZFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1Byb3BlcnRpZXNPdmVyd3JpdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy9wcm9wZXJ0aWVzL292ZXJ3cml0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1Byb3BlcnRpZXNSZW1vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy9wcm9wZXJ0aWVzL3JlbW92ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1Byb3BlcnRpZXNTZWFyY2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy9wcm9wZXJ0aWVzL3NlYXJjaFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1Byb3BlcnRpZXNTZWFyY2hDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3Byb3BlcnRpZXMvc2VhcmNoL2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzUHJvcGVydGllc1VwZGF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3Byb3BlcnRpZXMvdXBkYXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzQWRkRm9yVGVhbT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9hZGRfZm9yX3RlYW1cIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNBZGRGb3JVc2VyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvdGVtcGxhdGVzL2FkZF9mb3JfdXNlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1RlbXBsYXRlc0dldEZvclRlYW09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy90ZW1wbGF0ZXMvZ2V0X2Zvcl90ZWFtXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzR2V0Rm9yVXNlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9nZXRfZm9yX3VzZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNMaXN0Rm9yVGVhbT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9saXN0X2Zvcl90ZWFtXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzTGlzdEZvclVzZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy90ZW1wbGF0ZXMvbGlzdF9mb3JfdXNlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1RlbXBsYXRlc1JlbW92ZUZvclRlYW09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy90ZW1wbGF0ZXMvcmVtb3ZlX2Zvcl90ZWFtXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzUmVtb3ZlRm9yVXNlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9yZW1vdmVfZm9yX3VzZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNVcGRhdGVGb3JUZWFtPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvdGVtcGxhdGVzL3VwZGF0ZV9mb3JfdGVhbVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1RlbXBsYXRlc1VwZGF0ZUZvclVzZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy90ZW1wbGF0ZXMvdXBkYXRlX2Zvcl91c2VyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVSZXF1ZXN0c0NyZWF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9yZXF1ZXN0cy9jcmVhdGVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVJlcXVlc3RzR2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3JlcXVlc3RzL2dldFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUmVxdWVzdHNMaXN0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3JlcXVlc3RzL2xpc3RcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVJlcXVlc3RzVXBkYXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3JlcXVlc3RzL3VwZGF0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0FscGhhR2V0TWV0YWRhdGE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2FscGhhL2dldF9tZXRhZGF0YVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0FscGhhVXBsb2FkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9hbHBoYS91cGxvYWRcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwidXBsb2FkXCIpfSxpLmZpbGVzQ29weVYyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5X3YyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY29weVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0NvcHlCYXRjaFYyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5X2JhdGNoX3YyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weUJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5X2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weUJhdGNoQ2hlY2tWMj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY29weV9iYXRjaC9jaGVja192MlwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0NvcHlCYXRjaENoZWNrPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5X2JhdGNoL2NoZWNrXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weVJlZmVyZW5jZUdldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY29weV9yZWZlcmVuY2UvZ2V0XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weVJlZmVyZW5jZVNhdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2NvcHlfcmVmZXJlbmNlL3NhdmVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDcmVhdGVGb2xkZXJWMj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY3JlYXRlX2ZvbGRlcl92MlwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0NyZWF0ZUZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY3JlYXRlX2ZvbGRlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0NyZWF0ZUZvbGRlckJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jcmVhdGVfZm9sZGVyX2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ3JlYXRlRm9sZGVyQmF0Y2hDaGVjaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY3JlYXRlX2ZvbGRlcl9iYXRjaC9jaGVja1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0RlbGV0ZVYyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9kZWxldGVfdjJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNEZWxldGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2RlbGV0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0RlbGV0ZUJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9kZWxldGVfYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNEZWxldGVCYXRjaENoZWNrPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9kZWxldGVfYmF0Y2gvY2hlY2tcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNEb3dubG9hZD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZG93bmxvYWRcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwiZG93bmxvYWRcIil9LGkuZmlsZXNEb3dubG9hZFppcD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZG93bmxvYWRfemlwXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcImRvd25sb2FkXCIpfSxpLmZpbGVzR2V0TWV0YWRhdGE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2dldF9tZXRhZGF0YVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0dldFByZXZpZXc9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2dldF9wcmV2aWV3XCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcImRvd25sb2FkXCIpfSxpLmZpbGVzR2V0VGVtcG9yYXJ5TGluaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZ2V0X3RlbXBvcmFyeV9saW5rXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzR2V0VGVtcG9yYXJ5VXBsb2FkTGluaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZ2V0X3RlbXBvcmFyeV91cGxvYWRfbGlua1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0dldFRodW1ibmFpbD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZ2V0X3RodW1ibmFpbFwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJkb3dubG9hZFwiKX0saS5maWxlc0dldFRodW1ibmFpbEJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9nZXRfdGh1bWJuYWlsX2JhdGNoXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcInJwY1wiKX0saS5maWxlc0xpc3RGb2xkZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2xpc3RfZm9sZGVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzTGlzdEZvbGRlckNvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9saXN0X2ZvbGRlci9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0xpc3RGb2xkZXJHZXRMYXRlc3RDdXJzb3I9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2xpc3RfZm9sZGVyL2dldF9sYXRlc3RfY3Vyc29yXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzTGlzdEZvbGRlckxvbmdwb2xsPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9saXN0X2ZvbGRlci9sb25ncG9sbFwiLGUsXCJub2F1dGhcIixcIm5vdGlmeVwiLFwicnBjXCIpfSxpLmZpbGVzTGlzdFJldmlzaW9ucz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbGlzdF9yZXZpc2lvbnNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNNb3ZlVjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL21vdmVfdjJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNNb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9tb3ZlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzTW92ZUJhdGNoVjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL21vdmVfYmF0Y2hfdjJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNNb3ZlQmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL21vdmVfYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNNb3ZlQmF0Y2hDaGVja1YyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9tb3ZlX2JhdGNoL2NoZWNrX3YyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzTW92ZUJhdGNoQ2hlY2s9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL21vdmVfYmF0Y2gvY2hlY2tcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNQZXJtYW5lbnRseURlbGV0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvcGVybWFuZW50bHlfZGVsZXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzUHJvcGVydGllc0FkZD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvcHJvcGVydGllcy9hZGRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNQcm9wZXJ0aWVzT3ZlcndyaXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9wcm9wZXJ0aWVzL292ZXJ3cml0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1Byb3BlcnRpZXNSZW1vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3Byb3BlcnRpZXMvcmVtb3ZlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzUHJvcGVydGllc1RlbXBsYXRlR2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9wcm9wZXJ0aWVzL3RlbXBsYXRlL2dldFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1Byb3BlcnRpZXNUZW1wbGF0ZUxpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3Byb3BlcnRpZXMvdGVtcGxhdGUvbGlzdFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1Byb3BlcnRpZXNVcGRhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3Byb3BlcnRpZXMvdXBkYXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzUmVzdG9yZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvcmVzdG9yZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1NhdmVVcmw9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3NhdmVfdXJsXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzU2F2ZVVybENoZWNrSm9iU3RhdHVzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9zYXZlX3VybC9jaGVja19qb2Jfc3RhdHVzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzU2VhcmNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9zZWFyY2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNVcGxvYWQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3VwbG9hZFwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJ1cGxvYWRcIil9LGkuZmlsZXNVcGxvYWRTZXNzaW9uQXBwZW5kVjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3VwbG9hZF9zZXNzaW9uL2FwcGVuZF92MlwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJ1cGxvYWRcIil9LGkuZmlsZXNVcGxvYWRTZXNzaW9uQXBwZW5kPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy91cGxvYWRfc2Vzc2lvbi9hcHBlbmRcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwidXBsb2FkXCIpfSxpLmZpbGVzVXBsb2FkU2Vzc2lvbkZpbmlzaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvdXBsb2FkX3Nlc3Npb24vZmluaXNoXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcInVwbG9hZFwiKX0saS5maWxlc1VwbG9hZFNlc3Npb25GaW5pc2hCYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvdXBsb2FkX3Nlc3Npb24vZmluaXNoX2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzVXBsb2FkU2Vzc2lvbkZpbmlzaEJhdGNoQ2hlY2s9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3VwbG9hZF9zZXNzaW9uL2ZpbmlzaF9iYXRjaC9jaGVja1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1VwbG9hZFNlc3Npb25TdGFydD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvdXBsb2FkX3Nlc3Npb24vc3RhcnRcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwidXBsb2FkXCIpfSxpLnBhcGVyRG9jc0FyY2hpdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvYXJjaGl2ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NDcmVhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvY3JlYXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwidXBsb2FkXCIpfSxpLnBhcGVyRG9jc0Rvd25sb2FkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL2Rvd25sb2FkXCIsZSxcInVzZXJcIixcImFwaVwiLFwiZG93bmxvYWRcIil9LGkucGFwZXJEb2NzRm9sZGVyVXNlcnNMaXN0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL2ZvbGRlcl91c2Vycy9saXN0XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc0ZvbGRlclVzZXJzTGlzdENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL2ZvbGRlcl91c2Vycy9saXN0L2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc0dldEZvbGRlckluZm89ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvZ2V0X2ZvbGRlcl9pbmZvXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvbGlzdFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvbGlzdC9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NQZXJtYW5lbnRseURlbGV0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9wZXJtYW5lbnRseV9kZWxldGVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzU2hhcmluZ1BvbGljeUdldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9zaGFyaW5nX3BvbGljeS9nZXRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzU2hhcmluZ1BvbGljeVNldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9zaGFyaW5nX3BvbGljeS9zZXRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzVXBkYXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3VwZGF0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInVwbG9hZFwiKX0saS5wYXBlckRvY3NVc2Vyc0FkZD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy91c2Vycy9hZGRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzVXNlcnNMaXN0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3VzZXJzL2xpc3RcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzVXNlcnNMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvdXNlcnMvbGlzdC9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NVc2Vyc1JlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy91c2Vycy9yZW1vdmVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0FkZEZpbGVNZW1iZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvYWRkX2ZpbGVfbWVtYmVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdBZGRGb2xkZXJNZW1iZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvYWRkX2ZvbGRlcl9tZW1iZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0NoYW5nZUZpbGVNZW1iZXJBY2Nlc3M9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvY2hhbmdlX2ZpbGVfbWVtYmVyX2FjY2Vzc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nQ2hlY2tKb2JTdGF0dXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvY2hlY2tfam9iX3N0YXR1c1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nQ2hlY2tSZW1vdmVNZW1iZXJKb2JTdGF0dXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvY2hlY2tfcmVtb3ZlX21lbWJlcl9qb2Jfc3RhdHVzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdDaGVja1NoYXJlSm9iU3RhdHVzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2NoZWNrX3NoYXJlX2pvYl9zdGF0dXNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0NyZWF0ZVNoYXJlZExpbms9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvY3JlYXRlX3NoYXJlZF9saW5rXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdDcmVhdGVTaGFyZWRMaW5rV2l0aFNldHRpbmdzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2NyZWF0ZV9zaGFyZWRfbGlua193aXRoX3NldHRpbmdzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdHZXRGaWxlTWV0YWRhdGE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvZ2V0X2ZpbGVfbWV0YWRhdGFcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0dldEZpbGVNZXRhZGF0YUJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2dldF9maWxlX21ldGFkYXRhL2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdHZXRGb2xkZXJNZXRhZGF0YT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9nZXRfZm9sZGVyX21ldGFkYXRhXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdHZXRTaGFyZWRMaW5rRmlsZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9nZXRfc2hhcmVkX2xpbmtfZmlsZVwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJkb3dubG9hZFwiKX0saS5zaGFyaW5nR2V0U2hhcmVkTGlua01ldGFkYXRhPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2dldF9zaGFyZWRfbGlua19tZXRhZGF0YVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nR2V0U2hhcmVkTGlua3M9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvZ2V0X3NoYXJlZF9saW5rc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdEZpbGVNZW1iZXJzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfZmlsZV9tZW1iZXJzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0RmlsZU1lbWJlcnNCYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X2ZpbGVfbWVtYmVycy9iYXRjaFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdEZpbGVNZW1iZXJzQ29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9maWxlX21lbWJlcnMvY29udGludWVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RGb2xkZXJNZW1iZXJzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfZm9sZGVyX21lbWJlcnNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RGb2xkZXJNZW1iZXJzQ29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9mb2xkZXJfbWVtYmVycy9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdEZvbGRlcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9mb2xkZXJzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0Rm9sZGVyc0NvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfZm9sZGVycy9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdE1vdW50YWJsZUZvbGRlcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9tb3VudGFibGVfZm9sZGVyc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdE1vdW50YWJsZUZvbGRlcnNDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X21vdW50YWJsZV9mb2xkZXJzL2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0UmVjZWl2ZWRGaWxlcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X3JlY2VpdmVkX2ZpbGVzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0UmVjZWl2ZWRGaWxlc0NvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfcmVjZWl2ZWRfZmlsZXMvY29udGludWVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RTaGFyZWRMaW5rcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X3NoYXJlZF9saW5rc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTW9kaWZ5U2hhcmVkTGlua1NldHRpbmdzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL21vZGlmeV9zaGFyZWRfbGlua19zZXR0aW5nc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTW91bnRGb2xkZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbW91bnRfZm9sZGVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdSZWxpbnF1aXNoRmlsZU1lbWJlcnNoaXA9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvcmVsaW5xdWlzaF9maWxlX21lbWJlcnNoaXBcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1JlbGlucXVpc2hGb2xkZXJNZW1iZXJzaGlwPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3JlbGlucXVpc2hfZm9sZGVyX21lbWJlcnNoaXBcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1JlbW92ZUZpbGVNZW1iZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvcmVtb3ZlX2ZpbGVfbWVtYmVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdSZW1vdmVGaWxlTWVtYmVyMj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9yZW1vdmVfZmlsZV9tZW1iZXJfMlwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nUmVtb3ZlRm9sZGVyTWVtYmVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3JlbW92ZV9mb2xkZXJfbWVtYmVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdSZXZva2VTaGFyZWRMaW5rPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3Jldm9rZV9zaGFyZWRfbGlua1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nU2V0QWNjZXNzSW5oZXJpdGFuY2U9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvc2V0X2FjY2Vzc19pbmhlcml0YW5jZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nU2hhcmVGb2xkZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvc2hhcmVfZm9sZGVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdUcmFuc2ZlckZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy90cmFuc2Zlcl9mb2xkZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1VubW91bnRGb2xkZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvdW5tb3VudF9mb2xkZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1Vuc2hhcmVGaWxlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3Vuc2hhcmVfZmlsZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nVW5zaGFyZUZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy91bnNoYXJlX2ZvbGRlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nVXBkYXRlRmlsZU1lbWJlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy91cGRhdGVfZmlsZV9tZW1iZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1VwZGF0ZUZvbGRlck1lbWJlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy91cGRhdGVfZm9sZGVyX21lbWJlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nVXBkYXRlRm9sZGVyUG9saWN5PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3VwZGF0ZV9mb2xkZXJfcG9saWN5XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnRlYW1Mb2dHZXRFdmVudHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW1fbG9nL2dldF9ldmVudHNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LGkudGVhbUxvZ0dldEV2ZW50c0NvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtX2xvZy9nZXRfZXZlbnRzL2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxpLnVzZXJzR2V0QWNjb3VudD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidXNlcnMvZ2V0X2FjY291bnRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkudXNlcnNHZXRBY2NvdW50QmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInVzZXJzL2dldF9hY2NvdW50X2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnVzZXJzR2V0Q3VycmVudEFjY291bnQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInVzZXJzL2dldF9jdXJyZW50X2FjY291bnRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkudXNlcnNHZXRTcGFjZVVzYWdlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ1c2Vycy9nZXRfc3BhY2VfdXNhZ2VcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9O2Zvcih2YXIgcz1mdW5jdGlvbihlLHQpe2lmKCEoZSBpbnN0YW5jZW9mIHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9LG89ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKGUsdCl7Zm9yKHZhciByPTA7dC5sZW5ndGg+cjtyKyspe3ZhciBuPXRbcl07bi5lbnVtZXJhYmxlPW4uZW51bWVyYWJsZXx8ITEsbi5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gbiYmKG4ud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLG4ua2V5LG4pfX1yZXR1cm4gZnVuY3Rpb24odCxyLG4pe3JldHVybiByJiZlKHQucHJvdG90eXBlLHIpLG4mJmUodCxuKSx0fX0oKSx1PWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCYmbnVsbCE9PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIrdHlwZW9mIHQpO2UucHJvdG90eXBlPU9iamVjdC5jcmVhdGUodCYmdC5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTplLGVudW1lcmFibGU6ITEsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pLHQmJihPYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LnNldFByb3RvdHlwZU9mKGUsdCk6ZS5fX3Byb3RvX189dCl9LGE9ZnVuY3Rpb24oZSx0KXtpZighZSl0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7cmV0dXJuIXR8fFwib2JqZWN0XCIhPXR5cGVvZiB0JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0P2U6dH0sYz1mdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihlLHQpe2lmKEFycmF5LmlzQXJyYXkoZSkpcmV0dXJuIGU7aWYoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChlKSlyZXR1cm4gZnVuY3Rpb24oZSx0KXt2YXIgcj1bXSxuPSEwLGk9ITEscz12b2lkIDA7dHJ5e2Zvcih2YXIgbyx1PWVbU3ltYm9sLml0ZXJhdG9yXSgpOyEobj0obz11Lm5leHQoKSkuZG9uZSkmJihyLnB1c2goby52YWx1ZSksIXR8fHIubGVuZ3RoIT09dCk7bj0hMCk7fWNhdGNoKGUpe2k9ITAscz1lfWZpbmFsbHl7dHJ5eyFuJiZ1LnJldHVybiYmdS5yZXR1cm4oKX1maW5hbGx5e2lmKGkpdGhyb3cgc319cmV0dXJuIHJ9KGUsdCk7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIil9fSgpLHA9ZnVuY3Rpb24oZSl7cmV0dXJuIDMqZS5sZW5ndGgvNC1uKGUpfSxmPWZ1bmN0aW9uKGUpe3ZhciB0LHIsaSxzLG8sdT1lLmxlbmd0aDtzPW4oZSksbz1uZXcgZCgzKnUvNC1zKSxyPXM+MD91LTQ6dTt2YXIgYT0wO2Zvcih0PTA7cj50O3QrPTQpaT1tW2UuY2hhckNvZGVBdCh0KV08PDE4fG1bZS5jaGFyQ29kZUF0KHQrMSldPDwxMnxtW2UuY2hhckNvZGVBdCh0KzIpXTw8NnxtW2UuY2hhckNvZGVBdCh0KzMpXSxvW2ErK109aT4+MTYmMjU1LG9bYSsrXT1pPj44JjI1NSxvW2ErK109MjU1Jmk7cmV0dXJuIDI9PT1zPyhpPW1bZS5jaGFyQ29kZUF0KHQpXTw8MnxtW2UuY2hhckNvZGVBdCh0KzEpXT4+NCxvW2ErK109MjU1JmkpOjE9PT1zJiYoaT1tW2UuY2hhckNvZGVBdCh0KV08PDEwfG1bZS5jaGFyQ29kZUF0KHQrMSldPDw0fG1bZS5jaGFyQ29kZUF0KHQrMildPj4yLG9bYSsrXT1pPj44JjI1NSxvW2ErK109MjU1JmkpLG99LGg9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHI9ZS5sZW5ndGgsbj1yJTMsaT1cIlwiLHM9W10sbz0wLHU9ci1uO3U+bztvKz0xNjM4MylzLnB1c2goZnVuY3Rpb24oZSx0LHIpe2Zvcih2YXIgbj1bXSxpPXQ7cj5pO2krPTMpbi5wdXNoKGZ1bmN0aW9uKGUpe3JldHVybiBsW2U+PjE4JjYzXStsW2U+PjEyJjYzXStsW2U+PjYmNjNdK2xbNjMmZV19KChlW2ldPDwxNikrKGVbaSsxXTw8OCkrZVtpKzJdKSk7cmV0dXJuIG4uam9pbihcIlwiKX0oZSxvLG8rMTYzODM+dT91Om8rMTYzODMpKTtyZXR1cm4gMT09PW4/KGkrPWxbKHQ9ZVtyLTFdKT4+Ml0saSs9bFt0PDw0JjYzXSxpKz1cIj09XCIpOjI9PT1uJiYoaSs9bFsodD0oZVtyLTJdPDw4KStlW3ItMV0pPj4xMF0saSs9bFt0Pj40JjYzXSxpKz1sW3Q8PDImNjNdLGkrPVwiPVwiKSxzLnB1c2goaSkscy5qb2luKFwiXCIpfSxsPVtdLG09W10sZD1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheT9VaW50OEFycmF5OkFycmF5LGc9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIsXz0wOzY0Pl87KytfKWxbX109Z1tfXSxtW2cuY2hhckNvZGVBdChfKV09XzttWzQ1XT02MixtWzk1XT02Mzt2YXIgYj17Ynl0ZUxlbmd0aDpwLHRvQnl0ZUFycmF5OmYsZnJvbUJ5dGVBcnJheTpofSx2PXtyZWFkOmZ1bmN0aW9uKGUsdCxyLG4saSl7dmFyIHMsbyx1PTgqaS1uLTEsYT0oMTw8dSktMSxjPWE+PjEscD0tNyxmPXI/aS0xOjAsaD1yPy0xOjEsbD1lW3QrZl07Zm9yKGYrPWgscz1sJigxPDwtcCktMSxsPj49LXAscCs9dTtwPjA7cz0yNTYqcytlW3QrZl0sZis9aCxwLT04KTtmb3Iobz1zJigxPDwtcCktMSxzPj49LXAscCs9bjtwPjA7bz0yNTYqbytlW3QrZl0sZis9aCxwLT04KTtpZigwPT09cylzPTEtYztlbHNle2lmKHM9PT1hKXJldHVybiBvP05hTjoxLzAqKGw/LTE6MSk7bys9TWF0aC5wb3coMixuKSxzLT1jfXJldHVybihsPy0xOjEpKm8qTWF0aC5wb3coMixzLW4pfSx3cml0ZTpmdW5jdGlvbihlLHQscixuLGkscyl7dmFyIG8sdSxhLGM9OCpzLWktMSxwPSgxPDxjKS0xLGY9cD4+MSxoPTIzPT09aT81Ljk2MDQ2NDQ3NzUzOTA2MmUtODowLGw9bj8wOnMtMSxtPW4/MTotMSxkPTA+dHx8MD09PXQmJjA+MS90PzE6MDtmb3IodD1NYXRoLmFicyh0KSxpc05hTih0KXx8dD09PTEvMD8odT1pc05hTih0KT8xOjAsbz1wKToobz1NYXRoLmZsb29yKE1hdGgubG9nKHQpL01hdGguTE4yKSwxPnQqKGE9TWF0aC5wb3coMiwtbykpJiYoby0tLGEqPTIpLDI+KHQrPTE+bytmP2gqTWF0aC5wb3coMiwxLWYpOmgvYSkqYXx8KG8rKyxhLz0yKSxwPm8rZj8xPm8rZj8odT10Kk1hdGgucG93KDIsZi0xKSpNYXRoLnBvdygyLGkpLG89MCk6KHU9KHQqYS0xKSpNYXRoLnBvdygyLGkpLG8rPWYpOih1PTAsbz1wKSk7aT49ODtlW3IrbF09MjU1JnUsbCs9bSx1Lz0yNTYsaS09OCk7Zm9yKG89bzw8aXx1LGMrPWk7Yz4wO2VbcitsXT0yNTUmbyxsKz1tLG8vPTI1NixjLT04KTtlW3IrbC1tXXw9MTI4KmR9fSx5PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ9e2V4cG9ydHM6e319LGUodCx0LmV4cG9ydHMpLHQuZXhwb3J0c30oZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiByKGUpe2lmKGU+Qyl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoXCIpO3ZhciB0PW5ldyBVaW50OEFycmF5KGUpO3JldHVybiB0Ll9fcHJvdG9fXz1uLnByb3RvdHlwZSx0fWZ1bmN0aW9uIG4oZSx0LHIpe2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgdCl0aHJvdyBFcnJvcihcIklmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nXCIpO3JldHVybiBvKGUpfXJldHVybiBpKGUsdCxyKX1mdW5jdGlvbiBpKGUsdCxpKXtpZihcIm51bWJlclwiPT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtyZXR1cm4gUyhlKT9mdW5jdGlvbihlLHQscil7aWYoMD50fHx0PmUuYnl0ZUxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIidvZmZzZXQnIGlzIG91dCBvZiBib3VuZHNcIik7aWYodCsocnx8MCk+ZS5ieXRlTGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwiJ2xlbmd0aCcgaXMgb3V0IG9mIGJvdW5kc1wiKTt2YXIgaTtpPXZvaWQgMD09PXQmJnZvaWQgMD09PXI/bmV3IFVpbnQ4QXJyYXkoZSk6dm9pZCAwPT09cj9uZXcgVWludDhBcnJheShlLHQpOm5ldyBVaW50OEFycmF5KGUsdCxyKTtyZXR1cm4gaS5fX3Byb3RvX189bi5wcm90b3R5cGUsaX0oZSx0LGkpOlwic3RyaW5nXCI9PXR5cGVvZiBlP2Z1bmN0aW9uKGUsdCl7XCJzdHJpbmdcIj09dHlwZW9mIHQmJlwiXCIhPT10fHwodD1cInV0ZjhcIik7aWYoIW4uaXNFbmNvZGluZyh0KSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpO3ZhciBpPTB8YyhlLHQpLHM9cihpKSxvPXMud3JpdGUoZSx0KTtvIT09aSYmKHM9cy5zbGljZSgwLG8pKTtyZXR1cm4gc30oZSx0KTpmdW5jdGlvbihlKXtpZihuLmlzQnVmZmVyKGUpKXt2YXIgdD0wfGEoZS5sZW5ndGgpLGk9cih0KTtyZXR1cm4gMD09PWkubGVuZ3RoP2k6KGUuY29weShpLDAsMCx0KSxpKX1pZihlKXtpZihMKGUpfHxcImxlbmd0aFwiaW4gZSlyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgZS5sZW5ndGh8fEUoZS5sZW5ndGgpP3IoMCk6dShlKTtpZihcIkJ1ZmZlclwiPT09ZS50eXBlJiZBcnJheS5pc0FycmF5KGUuZGF0YSkpcmV0dXJuIHUoZS5kYXRhKX10aHJvdyBuZXcgVHlwZUVycm9yKFwiRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LlwiKX0oZSl9ZnVuY3Rpb24gcyhlKXtpZihcIm51bWJlclwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJyk7aWYoMD5lKXRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpfWZ1bmN0aW9uIG8oZSl7cmV0dXJuIHMoZSkscigwPmU/MDowfGEoZSkpfWZ1bmN0aW9uIHUoZSl7Zm9yKHZhciB0PTA+ZS5sZW5ndGg/MDowfGEoZS5sZW5ndGgpLG49cih0KSxpPTA7dD5pO2krPTEpbltpXT0yNTUmZVtpXTtyZXR1cm4gbn1mdW5jdGlvbiBhKGUpe2lmKGU+PUMpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtIHNpemU6IDB4XCIrQy50b1N0cmluZygxNikrXCIgYnl0ZXNcIik7cmV0dXJuIDB8ZX1mdW5jdGlvbiBjKGUsdCl7aWYobi5pc0J1ZmZlcihlKSlyZXR1cm4gZS5sZW5ndGg7aWYoTChlKXx8UyhlKSlyZXR1cm4gZS5ieXRlTGVuZ3RoO1wic3RyaW5nXCIhPXR5cGVvZiBlJiYoZT1cIlwiK2UpO3ZhciByPWUubGVuZ3RoO2lmKDA9PT1yKXJldHVybiAwO2Zvcih2YXIgaT0hMTs7KXN3aXRjaCh0KXtjYXNlXCJhc2NpaVwiOmNhc2VcImxhdGluMVwiOmNhc2VcImJpbmFyeVwiOnJldHVybiByO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2Ugdm9pZCAwOnJldHVybiB3KGUpLmxlbmd0aDtjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4gMipyO2Nhc2VcImhleFwiOnJldHVybiByPj4+MTtjYXNlXCJiYXNlNjRcIjpyZXR1cm4gayhlKS5sZW5ndGg7ZGVmYXVsdDppZihpKXJldHVybiB3KGUpLmxlbmd0aDt0PShcIlwiK3QpLnRvTG93ZXJDYXNlKCksaT0hMH19ZnVuY3Rpb24gcChlLHQscil7dmFyIG49ZVt0XTtlW3RdPWVbcl0sZVtyXT1ufWZ1bmN0aW9uIGYoZSx0LHIsaSxzKXtpZigwPT09ZS5sZW5ndGgpcmV0dXJuLTE7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHI/KGk9cixyPTApOnI+MjE0NzQ4MzY0Nz9yPTIxNDc0ODM2NDc6LTIxNDc0ODM2NDg+ciYmKHI9LTIxNDc0ODM2NDgpLHI9K3IsRShyKSYmKHI9cz8wOmUubGVuZ3RoLTEpLDA+ciYmKHI9ZS5sZW5ndGgrciksZS5sZW5ndGg+cil7aWYoMD5yKXtpZighcylyZXR1cm4tMTtyPTB9fWVsc2V7aWYocylyZXR1cm4tMTtyPWUubGVuZ3RoLTF9aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PW4uZnJvbSh0LGkpKSxuLmlzQnVmZmVyKHQpKXJldHVybiAwPT09dC5sZW5ndGg/LTE6aChlLHQscixpLHMpO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KXJldHVybiB0Jj0yNTUsXCJmdW5jdGlvblwiPT10eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZj9zP1VpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChlLHQscik6VWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChlLHQscik6aChlLFt0XSxyLGkscyk7dGhyb3cgbmV3IFR5cGVFcnJvcihcInZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlclwiKX1mdW5jdGlvbiBoKGUsdCxyLG4saSl7ZnVuY3Rpb24gcyhlLHQpe3JldHVybiAxPT09bz9lW3RdOmUucmVhZFVJbnQxNkJFKHQqbyl9dmFyIG89MSx1PWUubGVuZ3RoLGE9dC5sZW5ndGg7aWYodm9pZCAwIT09biYmKFwidWNzMlwiPT09KG49KG4rXCJcIikudG9Mb3dlckNhc2UoKSl8fFwidWNzLTJcIj09PW58fFwidXRmMTZsZVwiPT09bnx8XCJ1dGYtMTZsZVwiPT09bikpe2lmKDI+ZS5sZW5ndGh8fDI+dC5sZW5ndGgpcmV0dXJuLTE7bz0yLHUvPTIsYS89MixyLz0yfXZhciBjO2lmKGkpe3ZhciBwPS0xO2ZvcihjPXI7dT5jO2MrKylpZihzKGUsYyk9PT1zKHQsLTE9PT1wPzA6Yy1wKSl7aWYoLTE9PT1wJiYocD1jKSxjLXArMT09PWEpcmV0dXJuIHAqb31lbHNlLTEhPT1wJiYoYy09Yy1wKSxwPS0xfWVsc2UgZm9yKHIrYT51JiYocj11LWEpLGM9cjtjPj0wO2MtLSl7Zm9yKHZhciBmPSEwLGg9MDthPmg7aCsrKWlmKHMoZSxjK2gpIT09cyh0LGgpKXtmPSExO2JyZWFrfWlmKGYpcmV0dXJuIGN9cmV0dXJuLTF9ZnVuY3Rpb24gbChlLHQscixuKXtyZXR1cm4gQShmdW5jdGlvbihlKXtmb3IodmFyIHQ9W10scj0wO2UubGVuZ3RoPnI7KytyKXQucHVzaCgyNTUmZS5jaGFyQ29kZUF0KHIpKTtyZXR1cm4gdH0odCksZSxyLG4pfWZ1bmN0aW9uIG0oZSx0LHIpe3I9TWF0aC5taW4oZS5sZW5ndGgscik7Zm9yKHZhciBuPVtdLGk9dDtyPmk7KXt2YXIgcz1lW2ldLG89bnVsbCx1PXM+MjM5PzQ6cz4yMjM/MzpzPjE5MT8yOjE7aWYocj49aSt1KXt2YXIgYSxjLHAsZjtzd2l0Y2godSl7Y2FzZSAxOjEyOD5zJiYobz1zKTticmVhaztjYXNlIDI6MTI4PT0oMTkyJihhPWVbaSsxXSkpJiYoZj0oMzEmcyk8PDZ8NjMmYSk+MTI3JiYobz1mKTticmVhaztjYXNlIDM6Yz1lW2krMl0sMTI4PT0oMTkyJihhPWVbaSsxXSkpJiYxMjg9PSgxOTImYykmJihmPSgxNSZzKTw8MTJ8KDYzJmEpPDw2fDYzJmMpPjIwNDcmJig1NTI5Nj5mfHxmPjU3MzQzKSYmKG89Zik7YnJlYWs7Y2FzZSA0OmM9ZVtpKzJdLHA9ZVtpKzNdLDEyOD09KDE5MiYoYT1lW2krMV0pKSYmMTI4PT0oMTkyJmMpJiYxMjg9PSgxOTImcCkmJihmPSgxNSZzKTw8MTh8KDYzJmEpPDwxMnwoNjMmYyk8PDZ8NjMmcCk+NjU1MzUmJjExMTQxMTI+ZiYmKG89Zil9fW51bGw9PT1vPyhvPTY1NTMzLHU9MSk6bz42NTUzNSYmKG4ucHVzaCgoby09NjU1MzYpPj4+MTAmMTAyM3w1NTI5Niksbz01NjMyMHwxMDIzJm8pLG4ucHVzaChvKSxpKz11fXJldHVybiBmdW5jdGlvbihlKXt2YXIgdD1lLmxlbmd0aDtpZihVPj10KXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZyxlKTt2YXIgcj1cIlwiLG49MDtmb3IoO3Q+bjspcis9U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsZS5zbGljZShuLG4rPVUpKTtyZXR1cm4gcn0obil9ZnVuY3Rpb24gZChlLHQscil7aWYoZSUxIT0wfHwwPmUpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJvZmZzZXQgaXMgbm90IHVpbnRcIik7aWYoZSt0PnIpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoXCIpfWZ1bmN0aW9uIGcoZSx0LHIsaSxzLG8pe2lmKCFuLmlzQnVmZmVyKGUpKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpO2lmKHQ+c3x8bz50KXRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpO2lmKHIraT5lLmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkluZGV4IG91dCBvZiByYW5nZVwiKX1mdW5jdGlvbiBfKGUsdCxyLG4saSxzKXtpZihyK24+ZS5sZW5ndGgpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbmRleCBvdXQgb2YgcmFuZ2VcIik7aWYoMD5yKXRocm93IG5ldyBSYW5nZUVycm9yKFwiSW5kZXggb3V0IG9mIHJhbmdlXCIpfWZ1bmN0aW9uIHkoZSx0LHIsbixpKXtyZXR1cm4gdD0rdCxyPj4+PTAsaXx8XyhlLDAsciw0KSx2LndyaXRlKGUsdCxyLG4sMjMsNCkscis0fWZ1bmN0aW9uIHEoZSx0LHIsbixpKXtyZXR1cm4gdD0rdCxyPj4+PTAsaXx8XyhlLDAsciw4KSx2LndyaXRlKGUsdCxyLG4sNTIsOCkscis4fWZ1bmN0aW9uIHcoZSx0KXt0PXR8fDEvMDtmb3IodmFyIHIsbj1lLmxlbmd0aCxpPW51bGwscz1bXSxvPTA7bj5vOysrbyl7aWYoKHI9ZS5jaGFyQ29kZUF0KG8pKT41NTI5NSYmNTczNDQ+cil7aWYoIWkpe2lmKHI+NTYzMTkpeyh0LT0zKT4tMSYmcy5wdXNoKDIzOSwxOTEsMTg5KTtjb250aW51ZX1pZihvKzE9PT1uKXsodC09Myk+LTEmJnMucHVzaCgyMzksMTkxLDE4OSk7Y29udGludWV9aT1yO2NvbnRpbnVlfWlmKDU2MzIwPnIpeyh0LT0zKT4tMSYmcy5wdXNoKDIzOSwxOTEsMTg5KSxpPXI7Y29udGludWV9cj02NTUzNisoaS01NTI5Njw8MTB8ci01NjMyMCl9ZWxzZSBpJiYodC09Myk+LTEmJnMucHVzaCgyMzksMTkxLDE4OSk7aWYoaT1udWxsLDEyOD5yKXtpZigwPih0LT0xKSlicmVhaztzLnB1c2gocil9ZWxzZSBpZigyMDQ4PnIpe2lmKDA+KHQtPTIpKWJyZWFrO3MucHVzaChyPj42fDE5Miw2MyZyfDEyOCl9ZWxzZSBpZig2NTUzNj5yKXtpZigwPih0LT0zKSlicmVhaztzLnB1c2gocj4+MTJ8MjI0LHI+PjYmNjN8MTI4LDYzJnJ8MTI4KX1lbHNle2lmKHI+PTExMTQxMTIpdGhyb3cgRXJyb3IoXCJJbnZhbGlkIGNvZGUgcG9pbnRcIik7aWYoMD4odC09NCkpYnJlYWs7cy5wdXNoKHI+PjE4fDI0MCxyPj4xMiY2M3wxMjgscj4+NiY2M3wxMjgsNjMmcnwxMjgpfX1yZXR1cm4gc31mdW5jdGlvbiBrKGUpe3JldHVybiBiLnRvQnl0ZUFycmF5KGZ1bmN0aW9uKGUpe2lmKDI+KGU9ZS50cmltKCkucmVwbGFjZShSLFwiXCIpKS5sZW5ndGgpcmV0dXJuXCJcIjtmb3IoO2UubGVuZ3RoJTQhPTA7KWUrPVwiPVwiO3JldHVybiBlfShlKSl9ZnVuY3Rpb24gQShlLHQscixuKXtmb3IodmFyIGk9MDtuPmkmJihpK3I8dC5sZW5ndGgmJmk8ZS5sZW5ndGgpOysraSl0W2krcl09ZVtpXTtyZXR1cm4gaX1mdW5jdGlvbiBTKGUpe3JldHVybiBlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXJ8fG51bGwhPWUmJm51bGwhPWUuY29uc3RydWN0b3ImJlwiQXJyYXlCdWZmZXJcIj09PWUuY29uc3RydWN0b3IubmFtZSYmXCJudW1iZXJcIj09dHlwZW9mIGUuYnl0ZUxlbmd0aH1mdW5jdGlvbiBMKGUpe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyYmQXJyYXlCdWZmZXIuaXNWaWV3KGUpfWZ1bmN0aW9uIEUoZSl7cmV0dXJuIGUhPWV9dC5CdWZmZXI9bix0LlNsb3dCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuK2UhPWUmJihlPTApLG4uYWxsb2MoK2UpfSx0LklOU1BFQ1RfTUFYX0JZVEVTPTUwO3ZhciBDPTIxNDc0ODM2NDc7dC5rTWF4TGVuZ3RoPUMsKG4uVFlQRURfQVJSQVlfU1VQUE9SVD1mdW5jdGlvbigpe3RyeXt2YXIgZT1uZXcgVWludDhBcnJheSgxKTtyZXR1cm4gZS5fX3Byb3RvX189e19fcHJvdG9fXzpVaW50OEFycmF5LnByb3RvdHlwZSxmb286ZnVuY3Rpb24oKXtyZXR1cm4gNDJ9fSw0Mj09PWUuZm9vKCl9Y2F0Y2goZSl7cmV0dXJuITF9fSgpKXx8dm9pZCAwPT09Y29uc29sZXx8XCJmdW5jdGlvblwiIT10eXBlb2YgY29uc29sZS5lcnJvcnx8Y29uc29sZS5lcnJvcihcIlRoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSBgYnVmZmVyYCB2NS54LiBVc2UgYGJ1ZmZlcmAgdjQueCBpZiB5b3UgcmVxdWlyZSBvbGQgYnJvd3NlciBzdXBwb3J0LlwiKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuc3BlY2llcyYmbltTeW1ib2wuc3BlY2llc109PT1uJiZPYmplY3QuZGVmaW5lUHJvcGVydHkobixTeW1ib2wuc3BlY2llcyx7dmFsdWU6bnVsbCxjb25maWd1cmFibGU6ITAsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMX0pLG4ucG9vbFNpemU9ODE5MixuLmZyb209ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBpKGUsdCxyKX0sbi5wcm90b3R5cGUuX19wcm90b19fPVVpbnQ4QXJyYXkucHJvdG90eXBlLG4uX19wcm90b19fPVVpbnQ4QXJyYXksbi5hbGxvYz1mdW5jdGlvbihlLHQsbil7cmV0dXJuIGZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gcyhlKSxlPjAmJnZvaWQgMCE9PXQ/XCJzdHJpbmdcIj09dHlwZW9mIG4/cihlKS5maWxsKHQsbik6cihlKS5maWxsKHQpOnIoZSl9KGUsdCxuKX0sbi5hbGxvY1Vuc2FmZT1mdW5jdGlvbihlKXtyZXR1cm4gbyhlKX0sbi5hbGxvY1Vuc2FmZVNsb3c9ZnVuY3Rpb24oZSl7cmV0dXJuIG8oZSl9LG4uaXNCdWZmZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIG51bGwhPWUmJiEwPT09ZS5faXNCdWZmZXJ9LG4uY29tcGFyZT1mdW5jdGlvbihlLHQpe2lmKCFuLmlzQnVmZmVyKGUpfHwhbi5pc0J1ZmZlcih0KSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJndW1lbnRzIG11c3QgYmUgQnVmZmVyc1wiKTtpZihlPT09dClyZXR1cm4gMDtmb3IodmFyIHI9ZS5sZW5ndGgsaT10Lmxlbmd0aCxzPTAsbz1NYXRoLm1pbihyLGkpO28+czsrK3MpaWYoZVtzXSE9PXRbc10pe3I9ZVtzXSxpPXRbc107YnJlYWt9cmV0dXJuIGk+cj8tMTpyPmk/MTowfSxuLmlzRW5jb2Rpbmc9ZnVuY3Rpb24oZSl7c3dpdGNoKChlK1wiXCIpLnRvTG93ZXJDYXNlKCkpe2Nhc2VcImhleFwiOmNhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOmNhc2VcImFzY2lpXCI6Y2FzZVwibGF0aW4xXCI6Y2FzZVwiYmluYXJ5XCI6Y2FzZVwiYmFzZTY0XCI6Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuITA7ZGVmYXVsdDpyZXR1cm4hMX19LG4uY29uY2F0PWZ1bmN0aW9uKGUsdCl7aWYoIUFycmF5LmlzQXJyYXkoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJyk7aWYoMD09PWUubGVuZ3RoKXJldHVybiBuLmFsbG9jKDApO3ZhciByO2lmKHZvaWQgMD09PXQpZm9yKHQ9MCxyPTA7ZS5sZW5ndGg+cjsrK3IpdCs9ZVtyXS5sZW5ndGg7dmFyIGk9bi5hbGxvY1Vuc2FmZSh0KSxzPTA7Zm9yKHI9MDtlLmxlbmd0aD5yOysrcil7dmFyIG89ZVtyXTtpZighbi5pc0J1ZmZlcihvKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKTtvLmNvcHkoaSxzKSxzKz1vLmxlbmd0aH1yZXR1cm4gaX0sbi5ieXRlTGVuZ3RoPWMsbi5wcm90b3R5cGUuX2lzQnVmZmVyPSEwLG4ucHJvdG90eXBlLnN3YXAxNj1mdW5jdGlvbigpe3ZhciBlPXRoaXMubGVuZ3RoO2lmKGUlMiE9MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzXCIpO2Zvcih2YXIgdD0wO2U+dDt0Kz0yKXAodGhpcyx0LHQrMSk7cmV0dXJuIHRoaXN9LG4ucHJvdG90eXBlLnN3YXAzMj1mdW5jdGlvbigpe3ZhciBlPXRoaXMubGVuZ3RoO2lmKGUlNCE9MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzXCIpO2Zvcih2YXIgdD0wO2U+dDt0Kz00KXAodGhpcyx0LHQrMykscCh0aGlzLHQrMSx0KzIpO3JldHVybiB0aGlzfSxuLnByb3RvdHlwZS5zd2FwNjQ9ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmxlbmd0aDtpZihlJTghPTApdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0c1wiKTtmb3IodmFyIHQ9MDtlPnQ7dCs9OClwKHRoaXMsdCx0KzcpLHAodGhpcyx0KzEsdCs2KSxwKHRoaXMsdCsyLHQrNSkscCh0aGlzLHQrMyx0KzQpO3JldHVybiB0aGlzfSxuLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3ZhciBlPXRoaXMubGVuZ3RoO3JldHVybiAwPT09ZT9cIlwiOjA9PT1hcmd1bWVudHMubGVuZ3RoP20odGhpcywwLGUpOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj0hMTtpZigodm9pZCAwPT09dHx8MD50KSYmKHQ9MCksdD50aGlzLmxlbmd0aClyZXR1cm5cIlwiO2lmKCh2b2lkIDA9PT1yfHxyPnRoaXMubGVuZ3RoKSYmKHI9dGhpcy5sZW5ndGgpLDA+PXIpcmV0dXJuXCJcIjtpZihyPj4+PTAsKHQ+Pj49MCk+PXIpcmV0dXJuXCJcIjtmb3IoZXx8KGU9XCJ1dGY4XCIpOzspc3dpdGNoKGUpe2Nhc2VcImhleFwiOnJldHVybiBmdW5jdGlvbihlLHQscil7dmFyIG49ZS5sZW5ndGg7dCYmdD49MHx8KHQ9MCksKCFyfHwwPnJ8fHI+bikmJihyPW4pO2Zvcih2YXIgaT1cIlwiLHM9dDtyPnM7KytzKWkrPWZ1bmN0aW9uKGUpe3JldHVybiAxNj5lP1wiMFwiK2UudG9TdHJpbmcoMTYpOmUudG9TdHJpbmcoMTYpfShlW3NdKTtyZXR1cm4gaX0odGhpcyx0LHIpO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOnJldHVybiBtKHRoaXMsdCxyKTtjYXNlXCJhc2NpaVwiOnJldHVybiBmdW5jdGlvbihlLHQscil7dmFyIG49XCJcIjtyPU1hdGgubWluKGUubGVuZ3RoLHIpO2Zvcih2YXIgaT10O3I+aTsrK2kpbis9U3RyaW5nLmZyb21DaGFyQ29kZSgxMjcmZVtpXSk7cmV0dXJuIG59KHRoaXMsdCxyKTtjYXNlXCJsYXRpbjFcIjpjYXNlXCJiaW5hcnlcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIpe3ZhciBuPVwiXCI7cj1NYXRoLm1pbihlLmxlbmd0aCxyKTtmb3IodmFyIGk9dDtyPmk7KytpKW4rPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtpXSk7cmV0dXJuIG59KHRoaXMsdCxyKTtjYXNlXCJiYXNlNjRcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIpe3JldHVybiBiLmZyb21CeXRlQXJyYXkoMD09PXQmJnI9PT1lLmxlbmd0aD9lOmUuc2xpY2UodCxyKSl9KHRoaXMsdCxyKTtjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIpe2Zvcih2YXIgbj1lLnNsaWNlKHQsciksaT1cIlwiLHM9MDtuLmxlbmd0aD5zO3MrPTIpaSs9U3RyaW5nLmZyb21DaGFyQ29kZShuW3NdKzI1NipuW3MrMV0pO3JldHVybiBpfSh0aGlzLHQscik7ZGVmYXVsdDppZihuKXRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmtub3duIGVuY29kaW5nOiBcIitlKTtlPShlK1wiXCIpLnRvTG93ZXJDYXNlKCksbj0hMH19LmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sbi5wcm90b3R5cGUuZXF1YWxzPWZ1bmN0aW9uKGUpe2lmKCFuLmlzQnVmZmVyKGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyXCIpO3JldHVybiB0aGlzPT09ZXx8MD09PW4uY29tcGFyZSh0aGlzLGUpfSxuLnByb3RvdHlwZS5pbnNwZWN0PWZ1bmN0aW9uKCl7dmFyIGU9XCJcIixyPXQuSU5TUEVDVF9NQVhfQllURVM7cmV0dXJuIHRoaXMubGVuZ3RoPjAmJihlPXRoaXMudG9TdHJpbmcoXCJoZXhcIiwwLHIpLm1hdGNoKC8uezJ9L2cpLmpvaW4oXCIgXCIpLHRoaXMubGVuZ3RoPnImJihlKz1cIiAuLi4gXCIpKSxcIjxCdWZmZXIgXCIrZStcIj5cIn0sbi5wcm90b3R5cGUuY29tcGFyZT1mdW5jdGlvbihlLHQscixpLHMpe2lmKCFuLmlzQnVmZmVyKGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyXCIpO2lmKHZvaWQgMD09PXQmJih0PTApLHZvaWQgMD09PXImJihyPWU/ZS5sZW5ndGg6MCksdm9pZCAwPT09aSYmKGk9MCksdm9pZCAwPT09cyYmKHM9dGhpcy5sZW5ndGgpLDA+dHx8cj5lLmxlbmd0aHx8MD5pfHxzPnRoaXMubGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwib3V0IG9mIHJhbmdlIGluZGV4XCIpO2lmKGk+PXMmJnQ+PXIpcmV0dXJuIDA7aWYoaT49cylyZXR1cm4tMTtpZih0Pj1yKXJldHVybiAxO2lmKHQ+Pj49MCxyPj4+PTAsaT4+Pj0wLHM+Pj49MCx0aGlzPT09ZSlyZXR1cm4gMDtmb3IodmFyIG89cy1pLHU9ci10LGE9TWF0aC5taW4obyx1KSxjPXRoaXMuc2xpY2UoaSxzKSxwPWUuc2xpY2UodCxyKSxmPTA7YT5mOysrZilpZihjW2ZdIT09cFtmXSl7bz1jW2ZdLHU9cFtmXTticmVha31yZXR1cm4gdT5vPy0xOm8+dT8xOjB9LG4ucHJvdG90eXBlLmluY2x1ZGVzPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4tMSE9PXRoaXMuaW5kZXhPZihlLHQscil9LG4ucHJvdG90eXBlLmluZGV4T2Y9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBmKHRoaXMsZSx0LHIsITApfSxuLnByb3RvdHlwZS5sYXN0SW5kZXhPZj1mdW5jdGlvbihlLHQscil7cmV0dXJuIGYodGhpcyxlLHQsciwhMSl9LG4ucHJvdG90eXBlLndyaXRlPWZ1bmN0aW9uKGUsdCxyLG4pe2lmKHZvaWQgMD09PXQpbj1cInV0ZjhcIixyPXRoaXMubGVuZ3RoLHQ9MDtlbHNlIGlmKHZvaWQgMD09PXImJlwic3RyaW5nXCI9PXR5cGVvZiB0KW49dCxyPXRoaXMubGVuZ3RoLHQ9MDtlbHNle2lmKCFpc0Zpbml0ZSh0KSl0aHJvdyBFcnJvcihcIkJ1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkXCIpO3Q+Pj49MCxpc0Zpbml0ZShyKT8ocj4+Pj0wLHZvaWQgMD09PW4mJihuPVwidXRmOFwiKSk6KG49cixyPXZvaWQgMCl9dmFyIGk9dGhpcy5sZW5ndGgtdDtpZigodm9pZCAwPT09cnx8cj5pKSYmKHI9aSksZS5sZW5ndGg+MCYmKDA+cnx8MD50KXx8dD50aGlzLmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkF0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzXCIpO258fChuPVwidXRmOFwiKTtmb3IodmFyIHM9ITE7Oylzd2l0Y2gobil7Y2FzZVwiaGV4XCI6cmV0dXJuIGZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpPWUubGVuZ3RoLShyPStyfHwwKTtuPyhuPStuKT5pJiYobj1pKTpuPWk7dmFyIHM9dC5sZW5ndGg7aWYocyUyIT0wKXRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGhleCBzdHJpbmdcIik7bj5zLzImJihuPXMvMik7Zm9yKHZhciBvPTA7bj5vOysrbyl7dmFyIHU9cGFyc2VJbnQodC5zdWJzdHIoMipvLDIpLDE2KTtpZihFKHUpKXJldHVybiBvO2VbcitvXT11fXJldHVybiBvfSh0aGlzLGUsdCxyKTtjYXNlXCJ1dGY4XCI6Y2FzZVwidXRmLThcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIsbil7cmV0dXJuIEEodyh0LGUubGVuZ3RoLXIpLGUscixuKX0odGhpcyxlLHQscik7Y2FzZVwiYXNjaWlcIjpyZXR1cm4gbCh0aGlzLGUsdCxyKTtjYXNlXCJsYXRpbjFcIjpjYXNlXCJiaW5hcnlcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIsbil7cmV0dXJuIGwoZSx0LHIsbil9KHRoaXMsZSx0LHIpO2Nhc2VcImJhc2U2NFwiOnJldHVybiBmdW5jdGlvbihlLHQscixuKXtyZXR1cm4gQShrKHQpLGUscixuKX0odGhpcyxlLHQscik7Y2FzZVwidWNzMlwiOmNhc2VcInVjcy0yXCI6Y2FzZVwidXRmMTZsZVwiOmNhc2VcInV0Zi0xNmxlXCI6cmV0dXJuIGZ1bmN0aW9uKGUsdCxyLG4pe3JldHVybiBBKGZ1bmN0aW9uKGUsdCl7Zm9yKHZhciByLG4saT1bXSxzPTA7ZS5sZW5ndGg+cyYmKHQtPTIpPj0wOysrcylyPWUuY2hhckNvZGVBdChzKSxuPXI+PjgsaS5wdXNoKHIlMjU2KSxpLnB1c2gobik7cmV0dXJuIGl9KHQsZS5sZW5ndGgtciksZSxyLG4pfSh0aGlzLGUsdCxyKTtkZWZhdWx0OmlmKHMpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gZW5jb2Rpbmc6IFwiK24pO249KFwiXCIrbikudG9Mb3dlckNhc2UoKSxzPSEwfX0sbi5wcm90b3R5cGUudG9KU09OPWZ1bmN0aW9uKCl7cmV0dXJue3R5cGU6XCJCdWZmZXJcIixkYXRhOkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2Fycnx8dGhpcywwKX19O3ZhciBVPTQwOTY7bi5wcm90b3R5cGUuc2xpY2U9ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzLmxlbmd0aDtlPX5+ZSx0PXZvaWQgMD09PXQ/cjp+fnQsMD5lPzA+KGUrPXIpJiYoZT0wKTplPnImJihlPXIpLDA+dD8wPih0Kz1yKSYmKHQ9MCk6dD5yJiYodD1yKSxlPnQmJih0PWUpO3ZhciBpPXRoaXMuc3ViYXJyYXkoZSx0KTtyZXR1cm4gaS5fX3Byb3RvX189bi5wcm90b3R5cGUsaX0sbi5wcm90b3R5cGUucmVhZFVJbnRMRT1mdW5jdGlvbihlLHQscil7ZT4+Pj0wLHQ+Pj49MCxyfHxkKGUsdCx0aGlzLmxlbmd0aCk7Zm9yKHZhciBuPXRoaXNbZV0saT0xLHM9MDsrK3M8dCYmKGkqPTI1Nik7KW4rPXRoaXNbZStzXSppO3JldHVybiBufSxuLnByb3RvdHlwZS5yZWFkVUludEJFPWZ1bmN0aW9uKGUsdCxyKXtlPj4+PTAsdD4+Pj0wLHJ8fGQoZSx0LHRoaXMubGVuZ3RoKTtmb3IodmFyIG49dGhpc1tlKy0tdF0saT0xO3Q+MCYmKGkqPTI1Nik7KW4rPXRoaXNbZSstLXRdKmk7cmV0dXJuIG59LG4ucHJvdG90eXBlLnJlYWRVSW50OD1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDEsdGhpcy5sZW5ndGgpLHRoaXNbZV19LG4ucHJvdG90eXBlLnJlYWRVSW50MTZMRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDIsdGhpcy5sZW5ndGgpLHRoaXNbZV18dGhpc1tlKzFdPDw4fSxuLnByb3RvdHlwZS5yZWFkVUludDE2QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSwyLHRoaXMubGVuZ3RoKSx0aGlzW2VdPDw4fHRoaXNbZSsxXX0sbi5wcm90b3R5cGUucmVhZFVJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsNCx0aGlzLmxlbmd0aCksKHRoaXNbZV18dGhpc1tlKzFdPDw4fHRoaXNbZSsyXTw8MTYpKzE2Nzc3MjE2KnRoaXNbZSszXX0sbi5wcm90b3R5cGUucmVhZFVJbnQzMkJFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsNCx0aGlzLmxlbmd0aCksMTY3NzcyMTYqdGhpc1tlXSsodGhpc1tlKzFdPDwxNnx0aGlzW2UrMl08PDh8dGhpc1tlKzNdKX0sbi5wcm90b3R5cGUucmVhZEludExFPWZ1bmN0aW9uKGUsdCxyKXtlPj4+PTAsdD4+Pj0wLHJ8fGQoZSx0LHRoaXMubGVuZ3RoKTtmb3IodmFyIG49dGhpc1tlXSxpPTEscz0wOysrczx0JiYoaSo9MjU2KTspbis9dGhpc1tlK3NdKmk7cmV0dXJuKGkqPTEyOCk+bnx8KG4tPU1hdGgucG93KDIsOCp0KSksbn0sbi5wcm90b3R5cGUucmVhZEludEJFPWZ1bmN0aW9uKGUsdCxyKXtlPj4+PTAsdD4+Pj0wLHJ8fGQoZSx0LHRoaXMubGVuZ3RoKTtmb3IodmFyIG49dCxpPTEscz10aGlzW2UrLS1uXTtuPjAmJihpKj0yNTYpOylzKz10aGlzW2UrLS1uXSppO3JldHVybihpKj0xMjgpPnN8fChzLT1NYXRoLnBvdygyLDgqdCkpLHN9LG4ucHJvdG90eXBlLnJlYWRJbnQ4PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsMSx0aGlzLmxlbmd0aCksMTI4JnRoaXNbZV0/LTEqKDI1NS10aGlzW2VdKzEpOnRoaXNbZV19LG4ucHJvdG90eXBlLnJlYWRJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7ZT4+Pj0wLHR8fGQoZSwyLHRoaXMubGVuZ3RoKTt2YXIgcj10aGlzW2VdfHRoaXNbZSsxXTw8ODtyZXR1cm4gMzI3Njgmcj80Mjk0OTAxNzYwfHI6cn0sbi5wcm90b3R5cGUucmVhZEludDE2QkU9ZnVuY3Rpb24oZSx0KXtlPj4+PTAsdHx8ZChlLDIsdGhpcy5sZW5ndGgpO3ZhciByPXRoaXNbZSsxXXx0aGlzW2VdPDw4O3JldHVybiAzMjc2OCZyPzQyOTQ5MDE3NjB8cjpyfSxuLnByb3RvdHlwZS5yZWFkSW50MzJMRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDQsdGhpcy5sZW5ndGgpLHRoaXNbZV18dGhpc1tlKzFdPDw4fHRoaXNbZSsyXTw8MTZ8dGhpc1tlKzNdPDwyNH0sbi5wcm90b3R5cGUucmVhZEludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw0LHRoaXMubGVuZ3RoKSx0aGlzW2VdPDwyNHx0aGlzW2UrMV08PDE2fHRoaXNbZSsyXTw8OHx0aGlzW2UrM119LG4ucHJvdG90eXBlLnJlYWRGbG9hdExFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsNCx0aGlzLmxlbmd0aCksdi5yZWFkKHRoaXMsZSwhMCwyMyw0KX0sbi5wcm90b3R5cGUucmVhZEZsb2F0QkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw0LHRoaXMubGVuZ3RoKSx2LnJlYWQodGhpcyxlLCExLDIzLDQpfSxuLnByb3RvdHlwZS5yZWFkRG91YmxlTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw4LHRoaXMubGVuZ3RoKSx2LnJlYWQodGhpcyxlLCEwLDUyLDgpfSxuLnByb3RvdHlwZS5yZWFkRG91YmxlQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw4LHRoaXMubGVuZ3RoKSx2LnJlYWQodGhpcyxlLCExLDUyLDgpfSxuLnByb3RvdHlwZS53cml0ZVVJbnRMRT1mdW5jdGlvbihlLHQscixuKXtpZihlPStlLHQ+Pj49MCxyPj4+PTAsIW4pe2codGhpcyxlLHQscixNYXRoLnBvdygyLDgqciktMSwwKX12YXIgaT0xLHM9MDtmb3IodGhpc1t0XT0yNTUmZTsrK3M8ciYmKGkqPTI1Nik7KXRoaXNbdCtzXT1lL2kmMjU1O3JldHVybiB0K3J9LG4ucHJvdG90eXBlLndyaXRlVUludEJFPWZ1bmN0aW9uKGUsdCxyLG4pe2lmKGU9K2UsdD4+Pj0wLHI+Pj49MCwhbil7Zyh0aGlzLGUsdCxyLE1hdGgucG93KDIsOCpyKS0xLDApfXZhciBpPXItMSxzPTE7Zm9yKHRoaXNbdCtpXT0yNTUmZTstLWk+PTAmJihzKj0yNTYpOyl0aGlzW3QraV09ZS9zJjI1NTtyZXR1cm4gdCtyfSxuLnByb3RvdHlwZS53cml0ZVVJbnQ4PWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCwxLDI1NSwwKSx0aGlzW3RdPTI1NSZlLHQrMX0sbi5wcm90b3R5cGUud3JpdGVVSW50MTZMRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGU9K2UsdD4+Pj0wLHJ8fGcodGhpcyxlLHQsMiw2NTUzNSwwKSx0aGlzW3RdPTI1NSZlLHRoaXNbdCsxXT1lPj4+OCx0KzJ9LG4ucHJvdG90eXBlLndyaXRlVUludDE2QkU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlPStlLHQ+Pj49MCxyfHxnKHRoaXMsZSx0LDIsNjU1MzUsMCksdGhpc1t0XT1lPj4+OCx0aGlzW3QrMV09MjU1JmUsdCsyfSxuLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCw0LDQyOTQ5NjcyOTUsMCksdGhpc1t0KzNdPWU+Pj4yNCx0aGlzW3QrMl09ZT4+PjE2LHRoaXNbdCsxXT1lPj4+OCx0aGlzW3RdPTI1NSZlLHQrNH0sbi5wcm90b3R5cGUud3JpdGVVSW50MzJCRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGU9K2UsdD4+Pj0wLHJ8fGcodGhpcyxlLHQsNCw0Mjk0OTY3Mjk1LDApLHRoaXNbdF09ZT4+PjI0LHRoaXNbdCsxXT1lPj4+MTYsdGhpc1t0KzJdPWU+Pj44LHRoaXNbdCszXT0yNTUmZSx0KzR9LG4ucHJvdG90eXBlLndyaXRlSW50TEU9ZnVuY3Rpb24oZSx0LHIsbil7aWYoZT0rZSx0Pj4+PTAsIW4pe3ZhciBpPU1hdGgucG93KDIsOCpyLTEpO2codGhpcyxlLHQscixpLTEsLWkpfXZhciBzPTAsbz0xLHU9MDtmb3IodGhpc1t0XT0yNTUmZTsrK3M8ciYmKG8qPTI1Nik7KTA+ZSYmMD09PXUmJjAhPT10aGlzW3Qrcy0xXSYmKHU9MSksdGhpc1t0K3NdPShlL28+PjApLXUmMjU1O3JldHVybiB0K3J9LG4ucHJvdG90eXBlLndyaXRlSW50QkU9ZnVuY3Rpb24oZSx0LHIsbil7aWYoZT0rZSx0Pj4+PTAsIW4pe3ZhciBpPU1hdGgucG93KDIsOCpyLTEpO2codGhpcyxlLHQscixpLTEsLWkpfXZhciBzPXItMSxvPTEsdT0wO2Zvcih0aGlzW3Qrc109MjU1JmU7LS1zPj0wJiYobyo9MjU2KTspMD5lJiYwPT09dSYmMCE9PXRoaXNbdCtzKzFdJiYodT0xKSx0aGlzW3Qrc109KGUvbz4+MCktdSYyNTU7cmV0dXJuIHQrcn0sbi5wcm90b3R5cGUud3JpdGVJbnQ4PWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCwxLDEyNywtMTI4KSwwPmUmJihlPTI1NStlKzEpLHRoaXNbdF09MjU1JmUsdCsxfSxuLnByb3RvdHlwZS53cml0ZUludDE2TEU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlPStlLHQ+Pj49MCxyfHxnKHRoaXMsZSx0LDIsMzI3NjcsLTMyNzY4KSx0aGlzW3RdPTI1NSZlLHRoaXNbdCsxXT1lPj4+OCx0KzJ9LG4ucHJvdG90eXBlLndyaXRlSW50MTZCRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGU9K2UsdD4+Pj0wLHJ8fGcodGhpcyxlLHQsMiwzMjc2NywtMzI3NjgpLHRoaXNbdF09ZT4+PjgsdGhpc1t0KzFdPTI1NSZlLHQrMn0sbi5wcm90b3R5cGUud3JpdGVJbnQzMkxFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCw0LDIxNDc0ODM2NDcsLTIxNDc0ODM2NDgpLHRoaXNbdF09MjU1JmUsdGhpc1t0KzFdPWU+Pj44LHRoaXNbdCsyXT1lPj4+MTYsdGhpc1t0KzNdPWU+Pj4yNCx0KzR9LG4ucHJvdG90eXBlLndyaXRlSW50MzJCRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGU9K2UsdD4+Pj0wLHJ8fGcodGhpcyxlLHQsNCwyMTQ3NDgzNjQ3LC0yMTQ3NDgzNjQ4KSwwPmUmJihlPTQyOTQ5NjcyOTUrZSsxKSx0aGlzW3RdPWU+Pj4yNCx0aGlzW3QrMV09ZT4+PjE2LHRoaXNbdCsyXT1lPj4+OCx0aGlzW3QrM109MjU1JmUsdCs0fSxuLnByb3RvdHlwZS53cml0ZUZsb2F0TEU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiB5KHRoaXMsZSx0LCEwLHIpfSxuLnByb3RvdHlwZS53cml0ZUZsb2F0QkU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiB5KHRoaXMsZSx0LCExLHIpfSxuLnByb3RvdHlwZS53cml0ZURvdWJsZUxFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gcSh0aGlzLGUsdCwhMCxyKX0sbi5wcm90b3R5cGUud3JpdGVEb3VibGVCRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIHEodGhpcyxlLHQsITEscil9LG4ucHJvdG90eXBlLmNvcHk9ZnVuY3Rpb24oZSx0LHIsbil7aWYocnx8KHI9MCksbnx8MD09PW58fChuPXRoaXMubGVuZ3RoKSxlLmxlbmd0aD50fHwodD1lLmxlbmd0aCksdHx8KHQ9MCksbj4wJiZyPm4mJihuPXIpLG49PT1yKXJldHVybiAwO2lmKDA9PT1lLmxlbmd0aHx8MD09PXRoaXMubGVuZ3RoKXJldHVybiAwO2lmKDA+dCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInRhcmdldFN0YXJ0IG91dCBvZiBib3VuZHNcIik7aWYoMD5yfHxyPj10aGlzLmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInNvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHNcIik7aWYoMD5uKXRocm93IG5ldyBSYW5nZUVycm9yKFwic291cmNlRW5kIG91dCBvZiBib3VuZHNcIik7bj50aGlzLmxlbmd0aCYmKG49dGhpcy5sZW5ndGgpLG4tcj5lLmxlbmd0aC10JiYobj1lLmxlbmd0aC10K3IpO3ZhciBpLHM9bi1yO2lmKHRoaXM9PT1lJiZ0PnImJm4+dClmb3IoaT1zLTE7aT49MDstLWkpZVtpK3RdPXRoaXNbaStyXTtlbHNlIGlmKDFlMz5zKWZvcihpPTA7cz5pOysraSllW2krdF09dGhpc1tpK3JdO2Vsc2UgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoZSx0aGlzLnN1YmFycmF5KHIscitzKSx0KTtyZXR1cm4gc30sbi5wcm90b3R5cGUuZmlsbD1mdW5jdGlvbihlLHQscixpKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQ/KGk9dCx0PTAscj10aGlzLmxlbmd0aCk6XCJzdHJpbmdcIj09dHlwZW9mIHImJihpPXIscj10aGlzLmxlbmd0aCksMT09PWUubGVuZ3RoKXt2YXIgcz1lLmNoYXJDb2RlQXQoMCk7MjU2PnMmJihlPXMpfWlmKHZvaWQgMCE9PWkmJlwic3RyaW5nXCIhPXR5cGVvZiBpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nXCIpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBpJiYhbi5pc0VuY29kaW5nKGkpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmtub3duIGVuY29kaW5nOiBcIitpKX1lbHNlXCJudW1iZXJcIj09dHlwZW9mIGUmJihlJj0yNTUpO2lmKDA+dHx8dD50aGlzLmxlbmd0aHx8cj50aGlzLmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIk91dCBvZiByYW5nZSBpbmRleFwiKTtpZih0Pj1yKXJldHVybiB0aGlzO3Q+Pj49MCxyPXZvaWQgMD09PXI/dGhpcy5sZW5ndGg6cj4+PjAsZXx8KGU9MCk7dmFyIG87aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpZm9yKG89dDtyPm87KytvKXRoaXNbb109ZTtlbHNle3ZhciB1PW4uaXNCdWZmZXIoZSk/ZTpuZXcgbihlLGkpLGE9dS5sZW5ndGg7Zm9yKG89MDtyLXQ+bzsrK28pdGhpc1tvK3RdPXVbbyVhXX1yZXR1cm4gdGhpc307dmFyIFI9L1teKy8wLTlBLVphLXotX10vZ30pLkJ1ZmZlcjtcImZ1bmN0aW9uXCIhPXR5cGVvZiBPYmplY3QuYXNzaWduJiYoT2JqZWN0LmFzc2lnbj1mdW5jdGlvbihlKXt2YXIgdCxyLG4saTtpZih2b2lkIDA9PT1lfHxudWxsPT09ZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNvbnZlcnQgdW5kZWZpbmVkIG9yIG51bGwgdG8gb2JqZWN0XCIpO2Zvcih0PU9iamVjdChlKSxyPTE7YXJndW1lbnRzLmxlbmd0aD5yO3IrKylpZih2b2lkIDAhPT0obj1hcmd1bWVudHNbcl0pJiZudWxsIT09bilmb3IoaSBpbiBuKW4uaGFzT3duUHJvcGVydHkoaSkmJih0W2ldPW5baV0pO3JldHVybiB0fSksQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzfHxPYmplY3QuZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLFwiaW5jbHVkZXNcIix7dmFsdWU6ZnVuY3Rpb24oZSx0KXtpZihudWxsPT10aGlzKXRocm93IG5ldyBUeXBlRXJyb3IoJ1widGhpc1wiIGlzIG51bGwgb3Igbm90IGRlZmluZWQnKTt2YXIgcj1PYmplY3QodGhpcyksbj1yLmxlbmd0aD4+PjA7aWYoMD09PW4pcmV0dXJuITE7Zm9yKHZhciBpPTB8dCxzPU1hdGgubWF4KDA+aT9uLU1hdGguYWJzKGkpOmksMCk7bj5zOyl7aWYoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT09PXR8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm51bWJlclwiPT10eXBlb2YgdCYmaXNOYU4oZSkmJmlzTmFOKHQpfShyW3NdLGUpKXJldHVybiEwO3MrK31yZXR1cm4hMX19KTt2YXIgcT1mdW5jdGlvbigpe2Z1bmN0aW9uIG4oZSl7cyh0aGlzLG4pLHRoaXMuYWNjZXNzVG9rZW49KGU9ZXx8e30pLmFjY2Vzc1Rva2VuLHRoaXMuY2xpZW50SWQ9ZS5jbGllbnRJZCx0aGlzLmNsaWVudFNlY3JldD1lLmNsaWVudFNlY3JldCx0aGlzLnNlbGVjdFVzZXI9ZS5zZWxlY3RVc2VyLHRoaXMuc2VsZWN0QWRtaW49ZS5zZWxlY3RBZG1pbix0aGlzLmZldGNoPWUuZmV0Y2h8fGZldGNoLHRoaXMucGF0aFJvb3Q9ZS5wYXRoUm9vdCxlLmZldGNofHxjb25zb2xlLndhcm4oXCJHbG9iYWwgZmV0Y2ggaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSB1bnN1cHBvcnRlZCBpbiBhIGZ1dHVyZSB2ZXJzaW9uLiBQbGVhc2UgcGFzcyBmZXRjaCBmdW5jdGlvbiBhcyBvcHRpb24gd2hlbiBpbnN0YW50aWF0aW5nIGRyb3Bib3ggaW5zdGFuY2U6IG5ldyBEcm9wYm94KHtmZXRjaH0pXCIpfXJldHVybiBvKG4sW3trZXk6XCJzZXRBY2Nlc3NUb2tlblwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuYWNjZXNzVG9rZW49ZX19LHtrZXk6XCJnZXRBY2Nlc3NUb2tlblwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYWNjZXNzVG9rZW59fSx7a2V5Olwic2V0Q2xpZW50SWRcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLmNsaWVudElkPWV9fSx7a2V5OlwiZ2V0Q2xpZW50SWRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsaWVudElkfX0se2tleTpcInNldENsaWVudFNlY3JldFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY2xpZW50U2VjcmV0PWV9fSx7a2V5OlwiZ2V0Q2xpZW50U2VjcmV0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGllbnRTZWNyZXR9fSx7a2V5OlwiZ2V0QXV0aGVudGljYXRpb25VcmxcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcInRva2VuXCIsbj10aGlzLmdldENsaWVudElkKCksaT1cImh0dHBzOi8vd3d3LmRyb3Bib3guY29tL29hdXRoMi9hdXRob3JpemVcIjtpZighbil0aHJvdyBFcnJvcihcIkEgY2xpZW50IGlkIGlzIHJlcXVpcmVkLiBZb3UgY2FuIHNldCB0aGUgY2xpZW50IGlkIHVzaW5nIC5zZXRDbGllbnRJZCgpLlwiKTtpZihcImNvZGVcIiE9PXImJiFlKXRocm93IEVycm9yKFwiQSByZWRpcmVjdCB1cmkgaXMgcmVxdWlyZWQuXCIpO2lmKCFbXCJjb2RlXCIsXCJ0b2tlblwiXS5pbmNsdWRlcyhyKSl0aHJvdyBFcnJvcihcIkF1dGhvcml6YXRpb24gdHlwZSBtdXN0IGJlIGNvZGUgb3IgdG9rZW5cIik7dmFyIHM9dm9pZCAwO3JldHVybiBzPVwiY29kZVwiPT09cj9pK1wiP3Jlc3BvbnNlX3R5cGU9Y29kZSZjbGllbnRfaWQ9XCIrbjppK1wiP3Jlc3BvbnNlX3R5cGU9dG9rZW4mY2xpZW50X2lkPVwiK24sZSYmKHMrPVwiJnJlZGlyZWN0X3VyaT1cIitlKSx0JiYocys9XCImc3RhdGU9XCIrdCksc319LHtrZXk6XCJnZXRBY2Nlc3NUb2tlbkZyb21Db2RlXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzLmdldENsaWVudElkKCksbj10aGlzLmdldENsaWVudFNlY3JldCgpO2lmKCFyKXRocm93IEVycm9yKFwiQSBjbGllbnQgaWQgaXMgcmVxdWlyZWQuIFlvdSBjYW4gc2V0IHRoZSBjbGllbnQgaWQgdXNpbmcgLnNldENsaWVudElkKCkuXCIpO2lmKCFuKXRocm93IEVycm9yKFwiQSBjbGllbnQgc2VjcmV0IGlzIHJlcXVpcmVkLiBZb3UgY2FuIHNldCB0aGUgY2xpZW50IGlkIHVzaW5nIC5zZXRDbGllbnRTZWNyZXQoKS5cIik7cmV0dXJuIHRoaXMuZmV0Y2goXCJodHRwczovL2FwaS5kcm9wYm94YXBpLmNvbS9vYXV0aDIvdG9rZW4/Y29kZT1cIit0K1wiJmdyYW50X3R5cGU9YXV0aG9yaXphdGlvbl9jb2RlJnJlZGlyZWN0X3VyaT1cIitlK1wiJmNsaWVudF9pZD1cIityK1wiJmNsaWVudF9zZWNyZXQ9XCIrbix7bWV0aG9kOlwiUE9TVFwiLGhlYWRlcnM6e1wiQ29udGVudC1UeXBlXCI6XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIn19KS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgdD1lLmNsb25lKCk7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHIpe2UuanNvbigpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9KS5jYXRjaChmdW5jdGlvbigpe3JldHVybiB0LnRleHQoKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiByKGUpfSl9KX0pLnRoZW4oZnVuY3Rpb24odCl7cmV0dXJuW2UsdF19KX0oZSl9KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PWMoZSwyKSxyPXRbMF0sbj10WzFdO2lmKCFyLm9rKXRocm93e2Vycm9yOm4scmVzcG9uc2U6cixzdGF0dXM6ci5zdGF0dXN9O3JldHVybiBuLmFjY2Vzc190b2tlbn0pfX0se2tleTpcImF1dGhlbnRpY2F0ZVdpdGhDb3Jkb3ZhXCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiByKGUpey05OTkhPT1lLmNvZGUmJih3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3UuY2xvc2UoKX0sMTApLHQoKSl9ZnVuY3Rpb24gbihyKXtpZihyLnVybC5pbmRleE9mKFwiJmVycm9yPVwiKT4tMSl3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3UuY2xvc2UoKX0sMTApLHQoKTtlbHNle3ZhciBuPXIudXJsLmluZGV4T2YoXCIjYWNjZXNzX3Rva2VuPVwiKSxpPXIudXJsLmluZGV4T2YoXCImdG9rZW5fdHlwZT1cIik7aWYobj4tMSl7bis9MTQsd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXt1LmNsb3NlKCl9LDEwKTt2YXIgcz1yLnVybC5zdWJzdHJpbmcobixpKTtlKHMpfX19ZnVuY3Rpb24gaSgpe298fCh1LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkZXJyb3JcIixyKSx1LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RvcFwiLG4pLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImV4aXRcIixpKSxvPSEwKX12YXIgcz10aGlzLmdldEF1dGhlbnRpY2F0aW9uVXJsKFwiaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vMS9vYXV0aDIvcmVkaXJlY3RfcmVjZWl2ZXJcIiksbz0hMSx1PXdpbmRvdy5vcGVuKHMsXCJfYmxhbmtcIik7dS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVycm9yXCIsciksdS5hZGRFdmVudExpc3RlbmVyKFwibG9hZHN0b3BcIixuKSx1LmFkZEV2ZW50TGlzdGVuZXIoXCJleGl0XCIsaSl9fSx7a2V5OlwicmVxdWVzdFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCxyLG4saSl7dmFyIHM9bnVsbDtzd2l0Y2goaSl7Y2FzZVwicnBjXCI6cz10aGlzLmdldFJwY1JlcXVlc3QoKTticmVhaztjYXNlXCJkb3dubG9hZFwiOnM9dGhpcy5nZXREb3dubG9hZFJlcXVlc3QoKTticmVhaztjYXNlXCJ1cGxvYWRcIjpzPXRoaXMuZ2V0VXBsb2FkUmVxdWVzdCgpO2JyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJJbnZhbGlkIHJlcXVlc3Qgc3R5bGU6IFwiK2kpfXZhciBvPXtzZWxlY3RVc2VyOnRoaXMuc2VsZWN0VXNlcixzZWxlY3RBZG1pbjp0aGlzLnNlbGVjdEFkbWluLGNsaWVudElkOnRoaXMuZ2V0Q2xpZW50SWQoKSxjbGllbnRTZWNyZXQ6dGhpcy5nZXRDbGllbnRTZWNyZXQoKSxwYXRoUm9vdDp0aGlzLnBhdGhSb290fTtyZXR1cm4gcyhlLHQscixuLHRoaXMuZ2V0QWNjZXNzVG9rZW4oKSxvKX19LHtrZXk6XCJzZXRScGNSZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5ycGNSZXF1ZXN0PWV9fSx7a2V5OlwiZ2V0UnBjUmVxdWVzdFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMD09PXRoaXMucnBjUmVxdWVzdCYmKHRoaXMucnBjUmVxdWVzdD1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24ocixuLGkscyxvLHUpe3ZhciBhPXttZXRob2Q6XCJQT1NUXCIsYm9keTpuP0pTT04uc3RyaW5naWZ5KG4pOm51bGx9LHA9e307biYmKHBbXCJDb250ZW50LVR5cGVcIl09XCJhcHBsaWNhdGlvbi9qc29uXCIpO3ZhciBmPVwiXCI7c3dpdGNoKGkpe2Nhc2VcImFwcFwiOmlmKCF1LmNsaWVudElkfHwhdS5jbGllbnRTZWNyZXQpdGhyb3cgRXJyb3IoXCJBIGNsaWVudCBpZCBhbmQgc2VjcmV0IGlzIHJlcXVpcmVkIGZvciB0aGlzIGZ1bmN0aW9uXCIpO2Y9bmV3IHkodS5jbGllbnRJZCtcIjpcIit1LmNsaWVudFNlY3JldCkudG9TdHJpbmcoXCJiYXNlNjRcIikscC5BdXRob3JpemF0aW9uPVwiQmFzaWMgXCIrZjticmVhaztjYXNlXCJ0ZWFtXCI6Y2FzZVwidXNlclwiOnAuQXV0aG9yaXphdGlvbj1cIkJlYXJlciBcIitvO2JyZWFrO2Nhc2VcIm5vYXV0aFwiOmJyZWFrO2RlZmF1bHQ6dGhyb3cgRXJyb3IoXCJVbmhhbmRsZWQgYXV0aCB0eXBlOiBcIitpKX1yZXR1cm4gdSYmKHUuc2VsZWN0VXNlciYmKHBbXCJEcm9wYm94LUFQSS1TZWxlY3QtVXNlclwiXT11LnNlbGVjdFVzZXIpLHUuc2VsZWN0QWRtaW4mJihwW1wiRHJvcGJveC1BUEktU2VsZWN0LUFkbWluXCJdPXUuc2VsZWN0QWRtaW4pLHUucGF0aFJvb3QmJihwW1wiRHJvcGJveC1BUEktUGF0aC1Sb290XCJdPXUucGF0aFJvb3QpKSxhLmhlYWRlcnM9cCxlKHQocykrcixhKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm5cImFwcGxpY2F0aW9uL2pzb25cIj09PWUuaGVhZGVycy5nZXQoXCJDb250ZW50LVR5cGVcIik/ZS5qc29uKCkudGhlbihmdW5jdGlvbih0KXtyZXR1cm5bZSx0XX0pOmUudGV4dCgpLnRoZW4oZnVuY3Rpb24odCl7cmV0dXJuW2UsdF19KX0oZSl9KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PWMoZSwyKSxyPXRbMF0sbj10WzFdO2lmKCFyLm9rKXRocm93e2Vycm9yOm4scmVzcG9uc2U6cixzdGF0dXM6ci5zdGF0dXN9O3JldHVybiBufSl9fSh0aGlzLmZldGNoKSksdGhpcy5ycGNSZXF1ZXN0fX0se2tleTpcInNldERvd25sb2FkUmVxdWVzdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuZG93bmxvYWRSZXF1ZXN0PWV9fSx7a2V5OlwiZ2V0RG93bmxvYWRSZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwPT09dGhpcy5kb3dubG9hZFJlcXVlc3QmJih0aGlzLmRvd25sb2FkUmVxdWVzdD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oaSxzLG8sdSxhLHApe2lmKFwidXNlclwiIT09byl0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgYXV0aCB0eXBlOiBcIitvKTt2YXIgZj17bWV0aG9kOlwiUE9TVFwiLGhlYWRlcnM6e0F1dGhvcml6YXRpb246XCJCZWFyZXIgXCIrYSxcIkRyb3Bib3gtQVBJLUFyZ1wiOnIocyl9fTtyZXR1cm4gcCYmKHAuc2VsZWN0VXNlciYmKGYuaGVhZGVyc1tcIkRyb3Bib3gtQVBJLVNlbGVjdC1Vc2VyXCJdPXAuc2VsZWN0VXNlcikscC5zZWxlY3RBZG1pbiYmKGYuaGVhZGVyc1tcIkRyb3Bib3gtQVBJLVNlbGVjdC1BZG1pblwiXT1wLnNlbGVjdEFkbWluKSxwLnBhdGhSb290JiYoZi5oZWFkZXJzW1wiRHJvcGJveC1BUEktUGF0aC1Sb290XCJdPXAucGF0aFJvb3QpKSxuKHQodSkraSxmKS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gdC5vaz9lKCk/dC5ibG9iKCk6dC5idWZmZXIoKTp0LnRleHQoKX0odCkudGhlbihmdW5jdGlvbihlKXtyZXR1cm5bdCxlXX0pfSkudGhlbihmdW5jdGlvbih0KXt2YXIgcj1jKHQsMik7cmV0dXJuIGZ1bmN0aW9uKHQscil7aWYoIXQub2spdGhyb3d7ZXJyb3I6cixyZXNwb25zZTp0LHN0YXR1czp0LnN0YXR1c307dmFyIG49SlNPTi5wYXJzZSh0LmhlYWRlcnMuZ2V0KFwiZHJvcGJveC1hcGktcmVzdWx0XCIpKTtyZXR1cm4gZSgpP24uZmlsZUJsb2I9cjpuLmZpbGVCaW5hcnk9cixufShyWzBdLHJbMV0pfSl9fSh0aGlzLmZldGNoKSksdGhpcy5kb3dubG9hZFJlcXVlc3R9fSx7a2V5Olwic2V0VXBsb2FkUmVxdWVzdFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMudXBsb2FkUmVxdWVzdD1lfX0se2tleTpcImdldFVwbG9hZFJlcXVlc3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB2b2lkIDA9PT10aGlzLnVwbG9hZFJlcXVlc3QmJih0aGlzLnVwbG9hZFJlcXVlc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKG4saSxzLG8sdSxhKXtpZihcInVzZXJcIiE9PXMpdGhyb3cgRXJyb3IoXCJVbmV4cGVjdGVkIGF1dGggdHlwZTogXCIrcyk7dmFyIHA9aS5jb250ZW50cztkZWxldGUgaS5jb250ZW50czt2YXIgZj17Ym9keTpwLG1ldGhvZDpcIlBPU1RcIixoZWFkZXJzOntBdXRob3JpemF0aW9uOlwiQmVhcmVyIFwiK3UsXCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFwiRHJvcGJveC1BUEktQXJnXCI6cihpKX19O3JldHVybiBhJiYoYS5zZWxlY3RVc2VyJiYoZi5oZWFkZXJzW1wiRHJvcGJveC1BUEktU2VsZWN0LVVzZXJcIl09YS5zZWxlY3RVc2VyKSxhLnNlbGVjdEFkbWluJiYoZi5oZWFkZXJzW1wiRHJvcGJveC1BUEktU2VsZWN0LUFkbWluXCJdPWEuc2VsZWN0QWRtaW4pLGEucGF0aFJvb3QmJihmLmhlYWRlcnNbXCJEcm9wYm94LUFQSS1QYXRoLVJvb3RcIl09YS5wYXRoUm9vdCkpLGUodChvKStuLGYpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciB0PWUuY2xvbmUoKTtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocil7ZS5qc29uKCkudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gcihlKX0pLmNhdGNoKGZ1bmN0aW9uKCl7cmV0dXJuIHQudGV4dCgpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9KX0pfSkudGhlbihmdW5jdGlvbih0KXtyZXR1cm5bZSx0XX0pfShlKX0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9YyhlLDIpLHI9dFswXSxuPXRbMV07aWYoIXIub2spdGhyb3d7ZXJyb3I6bixyZXNwb25zZTpyLHN0YXR1czpyLnN0YXR1c307cmV0dXJuIG59KX19KHRoaXMuZmV0Y2gpKSx0aGlzLnVwbG9hZFJlcXVlc3R9fV0pLG59KCksdz1mdW5jdGlvbihlKXtmdW5jdGlvbiB0KGUpe3ModGhpcyx0KTt2YXIgcj1hKHRoaXMsKHQuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YodCkpLmNhbGwodGhpcyxlKSk7cmV0dXJuIE9iamVjdC5hc3NpZ24ocixpKSxyfXJldHVybiB1KHQscSksbyh0LFt7a2V5OlwiZmlsZXNHZXRTaGFyZWRMaW5rRmlsZVwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2dldF9zaGFyZWRfbGlua19maWxlXCIsZSxcImFwaVwiLFwiZG93bmxvYWRcIil9fV0pLHR9KCksaz1PYmplY3QuZnJlZXplKHtEcm9wYm94Ond9KSxBPXt9O0EudGVhbURldmljZXNMaXN0TWVtYmVyRGV2aWNlcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9kZXZpY2VzL2xpc3RfbWVtYmVyX2RldmljZXNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbURldmljZXNMaXN0TWVtYmVyc0RldmljZXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZGV2aWNlcy9saXN0X21lbWJlcnNfZGV2aWNlc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtRGV2aWNlc0xpc3RUZWFtRGV2aWNlcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9kZXZpY2VzL2xpc3RfdGVhbV9kZXZpY2VzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1EZXZpY2VzUmV2b2tlRGV2aWNlU2Vzc2lvbj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9kZXZpY2VzL3Jldm9rZV9kZXZpY2Vfc2Vzc2lvblwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtRGV2aWNlc1Jldm9rZURldmljZVNlc3Npb25CYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9kZXZpY2VzL3Jldm9rZV9kZXZpY2Vfc2Vzc2lvbl9iYXRjaFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtRmVhdHVyZXNHZXRWYWx1ZXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZmVhdHVyZXMvZ2V0X3ZhbHVlc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR2V0SW5mbz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9nZXRfaW5mb1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzQ3JlYXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9jcmVhdGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUdyb3Vwc0RlbGV0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9ncm91cHMvZGVsZXRlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNHZXRJbmZvPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9nZXRfaW5mb1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzSm9iU3RhdHVzR2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9qb2Jfc3RhdHVzL2dldFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9ncm91cHMvbGlzdFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzTGlzdENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9saXN0L2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNNZW1iZXJzQWRkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9tZW1iZXJzL2FkZFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzTWVtYmVyc0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL21lbWJlcnMvbGlzdFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzTWVtYmVyc0xpc3RDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9ncm91cHMvbWVtYmVycy9saXN0L2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNNZW1iZXJzUmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9tZW1iZXJzL3JlbW92ZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzTWVtYmVyc1NldEFjY2Vzc1R5cGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL21lbWJlcnMvc2V0X2FjY2Vzc190eXBlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNVcGRhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL3VwZGF0ZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTGlua2VkQXBwc0xpc3RNZW1iZXJMaW5rZWRBcHBzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2xpbmtlZF9hcHBzL2xpc3RfbWVtYmVyX2xpbmtlZF9hcHBzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1MaW5rZWRBcHBzTGlzdE1lbWJlcnNMaW5rZWRBcHBzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2xpbmtlZF9hcHBzL2xpc3RfbWVtYmVyc19saW5rZWRfYXBwc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTGlua2VkQXBwc0xpc3RUZWFtTGlua2VkQXBwcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9saW5rZWRfYXBwcy9saXN0X3RlYW1fbGlua2VkX2FwcHNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUxpbmtlZEFwcHNSZXZva2VMaW5rZWRBcHA9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbGlua2VkX2FwcHMvcmV2b2tlX2xpbmtlZF9hcHBcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUxpbmtlZEFwcHNSZXZva2VMaW5rZWRBcHBCYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9saW5rZWRfYXBwcy9yZXZva2VfbGlua2VkX2FwcF9iYXRjaFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyU3BhY2VMaW1pdHNFeGNsdWRlZFVzZXJzQWRkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcl9zcGFjZV9saW1pdHMvZXhjbHVkZWRfdXNlcnMvYWRkXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJTcGFjZUxpbWl0c0V4Y2x1ZGVkVXNlcnNMaXN0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcl9zcGFjZV9saW1pdHMvZXhjbHVkZWRfdXNlcnMvbGlzdFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyU3BhY2VMaW1pdHNFeGNsdWRlZFVzZXJzTGlzdENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcl9zcGFjZV9saW1pdHMvZXhjbHVkZWRfdXNlcnMvbGlzdC9jb250aW51ZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyU3BhY2VMaW1pdHNFeGNsdWRlZFVzZXJzUmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcl9zcGFjZV9saW1pdHMvZXhjbHVkZWRfdXNlcnMvcmVtb3ZlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJTcGFjZUxpbWl0c0dldEN1c3RvbVF1b3RhPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcl9zcGFjZV9saW1pdHMvZ2V0X2N1c3RvbV9xdW90YVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyU3BhY2VMaW1pdHNSZW1vdmVDdXN0b21RdW90YT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJfc3BhY2VfbGltaXRzL3JlbW92ZV9jdXN0b21fcXVvdGFcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlclNwYWNlTGltaXRzU2V0Q3VzdG9tUXVvdGE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVyX3NwYWNlX2xpbWl0cy9zZXRfY3VzdG9tX3F1b3RhXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzQWRkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvYWRkXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzQWRkSm9iU3RhdHVzR2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvYWRkL2pvYl9zdGF0dXMvZ2V0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzR2V0SW5mbz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL2dldF9pbmZvXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL2xpc3RcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9saXN0L2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzTW92ZUZvcm1lck1lbWJlckZpbGVzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvbW92ZV9mb3JtZXJfbWVtYmVyX2ZpbGVzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzTW92ZUZvcm1lck1lbWJlckZpbGVzSm9iU3RhdHVzQ2hlY2s9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9tb3ZlX2Zvcm1lcl9tZW1iZXJfZmlsZXMvam9iX3N0YXR1cy9jaGVja1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyc1JlY292ZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9yZWNvdmVyXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzUmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvcmVtb3ZlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzUmVtb3ZlSm9iU3RhdHVzR2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvcmVtb3ZlL2pvYl9zdGF0dXMvZ2V0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzU2VuZFdlbGNvbWVFbWFpbD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL3NlbmRfd2VsY29tZV9lbWFpbFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyc1NldEFkbWluUGVybWlzc2lvbnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9zZXRfYWRtaW5fcGVybWlzc2lvbnNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNTZXRQcm9maWxlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvc2V0X3Byb2ZpbGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNTdXNwZW5kPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvc3VzcGVuZFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyc1Vuc3VzcGVuZD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL3Vuc3VzcGVuZFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTmFtZXNwYWNlc0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbmFtZXNwYWNlcy9saXN0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1OYW1lc3BhY2VzTGlzdENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL25hbWVzcGFjZXMvbGlzdC9jb250aW51ZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtUHJvcGVydGllc1RlbXBsYXRlQWRkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3Byb3BlcnRpZXMvdGVtcGxhdGUvYWRkXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Qcm9wZXJ0aWVzVGVtcGxhdGVHZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcHJvcGVydGllcy90ZW1wbGF0ZS9nZXRcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVByb3BlcnRpZXNUZW1wbGF0ZUxpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcHJvcGVydGllcy90ZW1wbGF0ZS9saXN0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Qcm9wZXJ0aWVzVGVtcGxhdGVVcGRhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcHJvcGVydGllcy90ZW1wbGF0ZS91cGRhdGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVJlcG9ydHNHZXRBY3Rpdml0eT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9yZXBvcnRzL2dldF9hY3Rpdml0eVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtUmVwb3J0c0dldERldmljZXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcmVwb3J0cy9nZXRfZGV2aWNlc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtUmVwb3J0c0dldE1lbWJlcnNoaXA9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcmVwb3J0cy9nZXRfbWVtYmVyc2hpcFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtUmVwb3J0c0dldFN0b3JhZ2U9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcmVwb3J0cy9nZXRfc3RvcmFnZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtVGVhbUZvbGRlckFjdGl2YXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL2FjdGl2YXRlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyQXJjaGl2ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci9hcmNoaXZlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyQXJjaGl2ZUNoZWNrPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL2FyY2hpdmUvY2hlY2tcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVRlYW1Gb2xkZXJDcmVhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdGVhbV9mb2xkZXIvY3JlYXRlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyR2V0SW5mbz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci9nZXRfaW5mb1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtVGVhbUZvbGRlckxpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdGVhbV9mb2xkZXIvbGlzdFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtVGVhbUZvbGRlckxpc3RDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci9saXN0L2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyUGVybWFuZW50bHlEZWxldGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdGVhbV9mb2xkZXIvcGVybWFuZW50bHlfZGVsZXRlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyUmVuYW1lPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL3JlbmFtZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtVGVhbUZvbGRlclVwZGF0ZVN5bmNTZXR0aW5ncz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci91cGRhdGVfc3luY19zZXR0aW5nc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtVG9rZW5HZXRBdXRoZW50aWNhdGVkQWRtaW49ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdG9rZW4vZ2V0X2F1dGhlbnRpY2F0ZWRfYWRtaW5cIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9O3ZhciBTPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7cyh0aGlzLHQpO3ZhciByPWEodGhpcywodC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzLGUpKTtyZXR1cm4gT2JqZWN0LmFzc2lnbihyLEEpLHJ9cmV0dXJuIHUodCxxKSxvKHQsW3trZXk6XCJhY3RBc1VzZXJcIix2YWx1ZTpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IHcoe2FjY2Vzc1Rva2VuOnRoaXMuYWNjZXNzVG9rZW4sY2xpZW50SWQ6dGhpcy5jbGllbnRJZCxzZWxlY3RVc2VyOmV9KX19XSksdH0oKSxMPU9iamVjdC5mcmVlemUoe0Ryb3Bib3hUZWFtOlN9KTtyZXR1cm57RHJvcGJveDprLkRyb3Bib3gsRHJvcGJveFRlYW06TC5Ecm9wYm94VGVhbX19KTtcbiIsIi8vIHRoZSB3aGF0d2ctZmV0Y2ggcG9seWZpbGwgaW5zdGFsbHMgdGhlIGZldGNoKCkgZnVuY3Rpb25cbi8vIG9uIHRoZSBnbG9iYWwgb2JqZWN0ICh3aW5kb3cgb3Igc2VsZilcbi8vXG4vLyBSZXR1cm4gdGhhdCBhcyB0aGUgZXhwb3J0IGZvciB1c2UgaW4gV2VicGFjaywgQnJvd3NlcmlmeSBldGMuXG5yZXF1aXJlKCd3aGF0d2ctZmV0Y2gnKTtcbm1vZHVsZS5leHBvcnRzID0gc2VsZi5mZXRjaC5iaW5kKHNlbGYpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLldIQVRXR0ZldGNoID0ge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6XG4gICAgICAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJlxuICAgICAgJ0Jsb2InIGluIHNlbGYgJiZcbiAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBuZXcgQmxvYigpO1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfTtcblxuICBmdW5jdGlvbiBpc0RhdGFWaWV3KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdO1xuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID1cbiAgICAgIEFycmF5QnVmZmVyLmlzVmlldyB8fFxuICAgICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSk7XG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLl5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9O1xuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKTtcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXTtcbiAgICB0aGlzLm1hcFtuYW1lXSA9IG9sZFZhbHVlID8gb2xkVmFsdWUgKyAnLCAnICsgdmFsdWUgOiB2YWx1ZTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKTtcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2gobmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9O1xuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXM7XG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpO1xuICAgICAgfTtcbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpO1xuICAgICAgfTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpO1xuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYik7XG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aCk7XG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKTtcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHk7XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcik7XG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYm9keSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpO1xuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddO1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keTtcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmw7XG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHM7XG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kO1xuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZTtcbiAgICAgIHRoaXMuc2lnbmFsID0gaW5wdXQuc2lnbmFsO1xuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXQ7XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJztcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKTtcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGw7XG4gICAgdGhpcy5zaWduYWwgPSBvcHRpb25zLnNpZ25hbCB8fCB0aGlzLnNpZ25hbDtcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbDtcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSk7XG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7Ym9keTogdGhpcy5fYm9keUluaXR9KVxuICB9O1xuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgICBib2R5XG4gICAgICAudHJpbSgpXG4gICAgICAuc3BsaXQoJyYnKVxuICAgICAgLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKTtcbiAgICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gICAgLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcyMzAjc2VjdGlvbi0zLjJcbiAgICB2YXIgcHJlUHJvY2Vzc2VkSGVhZGVycyA9IHJhd0hlYWRlcnMucmVwbGFjZSgvXFxyP1xcbltcXHQgXSsvZywgJyAnKTtcbiAgICBwcmVQcm9jZXNzZWRIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6Jyk7XG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKCk7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBhcnRzLmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBCb2R5LmNhbGwoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMuc3RhdHVzID0gb3B0aW9ucy5zdGF0dXMgPT09IHVuZGVmaW5lZCA/IDIwMCA6IG9wdGlvbnMuc3RhdHVzO1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDA7XG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snO1xuICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycyk7XG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJztcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdCk7XG4gIH1cblxuICBCb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKTtcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9O1xuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSk7XG4gICAgcmVzcG9uc2UudHlwZSA9ICdlcnJvcic7XG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH07XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdO1xuXG4gIFJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCBzdGF0dXMgY29kZScpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG4gIH07XG5cbiAgZXhwb3J0cy5ET01FeGNlcHRpb24gPSBzZWxmLkRPTUV4Y2VwdGlvbjtcbiAgdHJ5IHtcbiAgICBuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24gPSBmdW5jdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgIHZhciBlcnJvciA9IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgdGhpcy5zdGFjayA9IGVycm9yLnN0YWNrO1xuICAgIH07XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuICAgIGV4cG9ydHMuRE9NRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGV4cG9ydHMuRE9NRXhjZXB0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KTtcblxuICAgICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgIGZ1bmN0aW9uIGFib3J0WGhyKCkge1xuICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgIH1cblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKTtcbiAgICAgICAgdmFyIGJvZHkgPSAncmVzcG9uc2UnIGluIHhociA/IHhoci5yZXNwb25zZSA6IHhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgZXhwb3J0cy5ET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKTtcbiAgICAgIH07XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdvbWl0Jykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIgJiYgc3VwcG9ydC5ibG9iKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwpIHtcbiAgICAgICAgcmVxdWVzdC5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG5cbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIHJlcXVlc3Quc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdCk7XG4gICAgfSlcbiAgfVxuXG4gIGZldGNoLnBvbHlmaWxsID0gdHJ1ZTtcblxuICBpZiAoIXNlbGYuZmV0Y2gpIHtcbiAgICBzZWxmLmZldGNoID0gZmV0Y2g7XG4gICAgc2VsZi5IZWFkZXJzID0gSGVhZGVycztcbiAgICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0O1xuICAgIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZTtcbiAgfVxuXG4gIGV4cG9ydHMuSGVhZGVycyA9IEhlYWRlcnM7XG4gIGV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gIGV4cG9ydHMuUmVzcG9uc2UgPSBSZXNwb25zZTtcbiAgZXhwb3J0cy5mZXRjaCA9IGZldGNoO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4iXX0=
