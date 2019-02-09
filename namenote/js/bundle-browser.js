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
        var authUrl = location.href.indexOf('localhost') < 0 ? 'https://funige.github.io/namenote/auth' : 'http://localhost:8080/namenote/auth';

        _flash.flash.save(options);

        location.href = dbx.getAuthenticationUrl(authUrl);
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
      }).catch(function (error) {
        if (error) _dialog.dialog.open(_messageBox.messageBox, {
          type: 'error',
          message: error
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvYWJvdXQtZGlhbG9nLmVzNiIsImVzNi9icm93c2VyLmVzNiIsImVzNi9jb21tYW5kLmVzNiIsImVzNi9jb25maWctZGVmYXVsdC5lczYiLCJlczYvY29uZmlnLmVzNiIsImVzNi9kaWFsb2cuZXM2IiwiZXM2L2RpdmlkZXIuZXM2IiwiZXM2L2ZsYXNoLmVzNiIsImVzNi9oaXN0b3J5LWJ1dHRvbi5lczYiLCJlczYvaHRtbC1kcm9wZG93bi5lczYiLCJlczYvaHRtbC1tZW51LmVzNiIsImVzNi9sb2NhbGUuZXM2IiwiZXM2L21haW4tdmlldy5lczYiLCJlczYvbWVudS1idXR0b24uZXM2IiwiZXM2L21lbnUtdGVtcGxhdGUuZXM2IiwiZXM2L21lbnUuZXM2IiwiZXM2L21lc3NhZ2UtYm94LmVzNiIsImVzNi9uYW1lbm90ZS5lczYiLCJlczYvb3Blbi1uZXctZGlhbG9nLmVzNiIsImVzNi9wYWdlLXZpZXcuZXM2IiwiZXM2L3BhZ2UuZXM2IiwiZXM2L3Byb2plY3QtbWFuYWdlci5lczYiLCJlczYvcHJvamVjdC5lczYiLCJlczYvcmVjZW50LXVybC5lczYiLCJlczYvc2hvcnRjdXQtZGVmYXVsdC5lczYiLCJlczYvc2hvcnRjdXQuZXM2IiwiZXM2L3NpZGUtYmFyLXRhYi5lczYiLCJlczYvc2lkZS1iYXIuZXM2IiwiZXM2L3RhYmxldC1zZXR0aW5ncy1kaWFsb2cuZXM2IiwiZXM2L3RleHQtdmlldy5lczYiLCJlczYvdGl0bGUuZXM2IiwiZXM2L3Rvb2wtYmFyLmVzNiIsImVzNi90b29sLWJ1dHRvbi5lczYiLCJlczYvdWkuZXM2IiwiZXM2L3ZpZXctYnV0dG9uLmVzNiIsImVzNi92aWV3LmVzNiIsImVzNi93aWRnZXQuZXM2IiwianMvbGliL2RpY3Rpb25hcnkuanMiLCJub2RlX21vZHVsZXMvZHJvcGJveC9kaXN0L0Ryb3Bib3gtc2RrLm1pbi5qcyIsIm5vZGVfbW9kdWxlcy9pc29tb3JwaGljLWZldGNoL2ZldGNoLW5wbS1icm93c2VyaWZ5LmpzIiwibm9kZV9tb2R1bGVzL3doYXR3Zy1mZXRjaC9kaXN0L2ZldGNoLnVtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBRUE7SUFFTSxXOzs7QUFDSix5QkFBYztBQUFBOztBQUNaLFNBQUssRUFBTCxHQUFVLGNBQVY7QUFDQSxTQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7Ozs7eUJBRUksTyxFQUFTO0FBQUE7O0FBQ1osYUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLFlBQU0sT0FBTyxHQUFHLEVBQWhCO0FBQ0EsUUFBQSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUQsQ0FBRixDQUFQLEdBQW1CLE9BQW5COztBQUVBLFlBQU0sTUFBTSxHQUFHLGVBQU8sYUFBUCxtSUFJQyxtQkFBUyxPQUpWLDRGQUFmOztBQVNBLFFBQUEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFOLENBQUQsQ0FBZ0IsSUFBaEIsQ0FBcUIsTUFBckI7QUFDQSxRQUFBLENBQUMsQ0FBQyxLQUFJLENBQUMsT0FBTixDQUFELENBQWdCLE1BQWhCLENBQXVCO0FBQ3JCLFVBQUEsUUFBUSxFQUFFLEtBRFc7QUFFckIsVUFBQSxRQUFRLEVBQUU7QUFBRSxZQUFBLEVBQUUsRUFBQyxlQUFMO0FBQXNCLFlBQUEsRUFBRSxFQUFDO0FBQXpCLFdBRlc7QUFHckIsVUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGdCQUFELENBSGE7QUFJckIsVUFBQSxLQUFLLEVBQUUsSUFKYztBQUtyQixVQUFBLEtBQUssRUFBRSxHQUxjO0FBTXJCLFVBQUEsT0FBTyxFQUFFO0FBTlksU0FBdkI7QUFRRCxPQXRCTSxDQUFQO0FBdUJEOzs7Ozs7QUFHSCxJQUFNLFdBQVcsR0FBRyxJQUFJLFdBQUosRUFBcEI7Ozs7QUN6Q0E7O0FBRUE7O0FBQ0E7O0FBR0EsTUFBTSxDQUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBBYm91dERpYWxvZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSAnYWJvdXQtZGlhbG9nJ1xuICAgIHRoaXMuZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIGluaXQodmVyc2lvbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBidXR0b25zID0ge31cbiAgICAgIGJ1dHRvbnNbVCgnT2snKV0gPSByZXNvbHZlXG4gICAgXG4gICAgICBjb25zdCBzdHJpbmcgPSBsb2NhbGUudHJhbnNsYXRlSFRNTChgXG4gICAgICAgIDxjZW50ZXI+XG4gICAgICAgICAgPGltZyBzcmM9Jy4vaW1nL25hbWVub3RlMTAyNC5wbmcnIHdpZHRoPVwiMTAwcHhcIiAvPlxuICAgICAgICAgIDxicj5cbiAgICAgICAgICBOYW1lbm90ZSB2JHtuYW1lbm90ZS52ZXJzaW9ufVxuICAgICAgICAgIDxicj48YnI+XG4gICAgICAgICAgPHNtYWxsPkNvcHlyaWdodCAoYykgRnVuaWdlPC9zbWFsbD5cbiAgICAgICAgPC9jZW50ZXI+YClcblxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmh0bWwoc3RyaW5nKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmRpYWxvZyh7XG4gICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcbiAgICAgICAgcG9zaXRpb246IHsgbXk6J2NlbnRlciBjZW50ZXInLCBhdDonY2VudGVyIGNlbnRlcicgfSxcbiAgICAgICAgdGl0bGU6IFQoJ0Fib3V0IE5hbWVub3RlJyksXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICB3aWR0aDogNjAwLFxuICAgICAgICBidXR0b25zOiBidXR0b25zLFxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGFib3V0RGlhbG9nID0gbmV3IEFib3V0RGlhbG9nKClcblxuZXhwb3J0IHsgYWJvdXREaWFsb2cgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBsb2NhbGUgfSBmcm9tICcuL2xvY2FsZS5lczYnXG5cblxud2luZG93Lm5hbWVub3RlID0gbmFtZW5vdGVcbndpbmRvdy5UID0gbG9jYWxlLnRyYW5zbGF0ZVxud2luZG93LlBYID0gKHgpID0+IHggKyAncHgnXG5cbndpbmRvdy5MT0cgPSBjb25zb2xlLmxvZy5iaW5kKHdpbmRvdy5jb25zb2xlKVxud2luZG93LldBUk4gPSBjb25zb2xlLndhcm4uYmluZCh3aW5kb3cuY29uc29sZSlcbndpbmRvdy5FUlJPUiA9IGNvbnNvbGUuZXJyb3IuYmluZCh3aW5kb3cuY29uc29sZSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcbiAgbmFtZW5vdGUuaW5pdCgpXG59KVxuXG5cblxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuXG5pbXBvcnQgeyBkaXZpZGVyIH0gZnJvbSAnLi9kaXZpZGVyLmVzNidcbmltcG9ydCB7IHRvb2xCdXR0b24gfSBmcm9tICcuL3Rvb2wtYnV0dG9uLmVzNidcbmltcG9ydCB7IHNpZGVCYXJUYWIgfSBmcm9tICcuL3NpZGUtYmFyLXRhYi5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcbmltcG9ydCB7IGZsYXNoIH0gZnJvbSAnLi9mbGFzaC5lczYnXG5cbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcbmltcG9ydCB7IGFib3V0RGlhbG9nIH0gZnJvbSAnLi9hYm91dC1kaWFsb2cuZXM2J1xuaW1wb3J0IHsgbWVzc2FnZUJveCB9IGZyb20gJy4vbWVzc2FnZS1ib3guZXM2J1xuaW1wb3J0IHsgb3Blbk5ld0RpYWxvZyB9IGZyb20gJy4vb3Blbi1uZXctZGlhbG9nLmVzNidcbmltcG9ydCB7IHRhYmxldFNldHRpbmdzRGlhbG9nIH0gZnJvbSAnLi90YWJsZXQtc2V0dGluZ3MtZGlhbG9nLmVzNidcblxuY29uc3QgX3J1bk1haW4gPSAobWVzc2FnZSwgZGF0YSkgPT4ge1xuICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgTE9HKCdydW5NYWluJywgbWVzc2FnZSwgZGF0YSlcbiAgICBuYW1lbm90ZS5hcHAucnVuTWFpbihtZXNzYWdlLCBkYXRhKVxuXG4gIH0gZWxzZSB7XG4gICAgTE9HKGAke21lc3NhZ2V9OiBjYW5cXGB0IGV4ZWN1dGUgdGhpcyBjb21tYW5kIG9uIGJyb3dzZXIuYClcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIENvbW1hbmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIHVuZG8oKSB7XG4gICAgTE9HKCd1bmRvJylcbiAgfVxuXG4gIHJlZG8oKSB7XG4gICAgTE9HKCdyZWRvJylcbiAgfVxuXG4gIGF1dGgob3B0aW9ucykge1xuICAgIGRpYWxvZy5vcGVuKG1lc3NhZ2VCb3gsIHtcbiAgICAgIHRpdGxlOiAnQXV0aGVudGljYXRlJyxcbiAgICAgIG1lc3NhZ2U6ICdOYW1lbm90ZSB3b3VsZCBsaWtlIGFjY2VzcyB0byB0aGUgZmlsZXMgaW4geW91ciBEcm9wYm94LicsXG4gICAgICBvazogJ0Nvbm5lY3QgdG8gRHJvcGJveCcsXG4gICAgICBjYW5jZWw6ICdDYW5jZWwnLFxuXG4gICAgfSkudGhlbigocmVzcG9uY2UpID0+IHtcbiAgICAgIGRpYWxvZy5jdXJyZW50LnNob3dQcm9ncmVzcyhUKCdDb25uZWN0aW5nIC4uLicpKVxuICAgICAgdmFyIERyb3Bib3ggPSByZXF1aXJlKCdkcm9wYm94JykuRHJvcGJveDtcbiAgICAgIHZhciBkYnggPSBuZXcgRHJvcGJveCh7IGNsaWVudElkOiAnY2V4NXZrb3hkOW53ajQ4J30pXG4gICAgICB2YXIgYXV0aFVybCA9IChsb2NhdGlvbi5ocmVmLmluZGV4T2YoJ2xvY2FsaG9zdCcpIDwgMCkgP1xuICAgICAgICAgICdodHRwczovL2Z1bmlnZS5naXRodWIuaW8vbmFtZW5vdGUvYXV0aCc6XG4gICAgICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9uYW1lbm90ZS9hdXRoJ1xuXG4gICAgICBmbGFzaC5zYXZlKG9wdGlvbnMpXG4gICAgICBsb2NhdGlvbi5ocmVmID0gZGJ4LmdldEF1dGhlbnRpY2F0aW9uVXJsKGF1dGhVcmwpXG5cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvcikgZGlhbG9nLm9wZW4obWVzc2FnZUJveCwgeyB0eXBlOiAnZXJyb3InLCBtZXNzYWdlOiBlcnJvciB9KVxuICAgIH0pXG4gIH1cbiAgXG4gIGFib3V0KCkge1xuICAgIGRpYWxvZy5vcGVuKGFib3V0RGlhbG9nKS50aGVuKCgpID0+IHtcbiAgICAgIGRpYWxvZy5jbG9zZSgpXG4gICAgfSlcbiAgfVxuXG4gIHBlbihlKSB7XG4gICAgTE9HKCdwZW4nKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCdwZW4nKVxuICB9XG5cbiAgZXJhc2VyKGUpIHtcbiAgICBMT0coJ2VyYXNlcicpXG4gICAgdG9vbEJ1dHRvbi5zZWxlY3QoJ2VyYXNlcicpXG4gIH1cblxuICB0ZXh0KGUpIHtcbiAgICBMT0coJ3RleHQnKVxuICAgIHRvb2xCdXR0b24uc2VsZWN0KCd0ZXh0JylcbiAgfVxuXG4gIHNpZGVCYXIoKSB7XG4gICAgTE9HKCdzaWRlQmFyJylcbiAgICBkaXZpZGVyLnRvZ2dsZSgpXG4gIH1cblxuICBzaG93UGFnZVZpZXcoKSB7XG4gICAgJCgnLnBhZ2UtdmlldycpLnNob3coKVxuICAgICQoJy50ZXh0LXZpZXcnKS5oaWRlKClcbiAgICBzaWRlQmFyVGFiLnNlbGVjdCgncGFnZScpXG4gIH1cblxuICBzaG93VGV4dFZpZXcoKSB7XG4gICAgJCgnLnBhZ2UtdmlldycpLmhpZGUoKVxuICAgICQoJy50ZXh0LXZpZXcnKS5zaG93KClcbiAgICBzaWRlQmFyVGFiLnNlbGVjdCgndGV4dCcpXG4gIH1cbiAgXG4gIG9wZW5OZXdEaWFsb2coKSB7XG4gICAgZGlhbG9nLm9wZW4ob3Blbk5ld0RpYWxvZykudGhlbigoKSA9PiB7XG4gICAgICBkaWFsb2cuY2xvc2UoKVxuXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgZGlhbG9nLm9wZW4obWVzc2FnZUJveCwgeyB0eXBlOiAnZXJyb3InLCBtZXNzYWdlOiBlcnJvciB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgXG4gIG9wZW5EaWFsb2coKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgbmFtZW5vdGUuYXBwLm9wZW5EaWFsb2coKS50aGVuKCh1cmwpID0+IHtcbiAgICAgICAgV0FSTihgb3BlbkRpYWxvZyAnJHt1cmx9Jy4uLmApXG4gICAgICAgIHByb2plY3RNYW5hZ2VyLm9wZW4odXJsKVxuXG4gICAgICB9KS50aGVuKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIFdBUk4oJ1twcm9qZWN0XScsIHByb2plY3QpXG4gICAgICAgIFxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikgZGlhbG9nLm9wZW4obWVzc2FnZUJveCwgeyB0eXBlOiAnZXJyb3InLCBtZXNzYWdlOiBlcnJvciB9KVxuICAgICAgfSlcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lbm90ZS9yYXdfdG9rZW4nKVxuXG4gICAgICBpZiAoYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgdmFyIGZldGNoID0gcmVxdWlyZSgnaXNvbW9ycGhpYy1mZXRjaCcpOyAvLyBvciBhbm90aGVyIGxpYnJhcnkgb2YgY2hvaWNlLlxuICAgICAgICB2YXIgRHJvcGJveCA9IHJlcXVpcmUoJ2Ryb3Bib3gnKS5Ecm9wYm94O1xuICAgICAgICB2YXIgZGJ4ID0gbmV3IERyb3Bib3goe1xuICAgICAgICAgIGZldGNoOiBmZXRjaCxcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW5cbiAgICAgICAgfSlcblxuICAgICAgICBkYnguZmlsZXNMaXN0Rm9sZGVyKHtwYXRoOiAnJ30pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1dGgoWydvcGVuRGlhbG9nJ10pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb3Blbih1cmwpIHtcbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBXQVJOKGBvcGVuICcke3VybH0nLi4uYClcbiAgICAgIHByb2plY3RNYW5hZ2VyLm9wZW4odXJsKS50aGVuKChwcm9qZWN0KSA9PiB7XG4gICAgICAgIFdBUk4oJ1twcm9qZWN0XScsIHByb2plY3QpXG4gICAgICAgIFxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikgZGlhbG9nLm9wZW4obWVzc2FnZUJveCwgeyB0eXBlOiAnZXJyb3InLCBtZXNzYWdlOiBlcnJvciB9KVxuICAgICAgfSlcbiAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hdXRoKFsnb3BlbicsIHVybF0pXG4gICAgfVxuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgcHJvamVjdE1hbmFnZXIuY2xvc2UoKVxuICB9XG5cbiAgem9vbSgpIHtcbiAgICBMT0coJ3pvb20nKVxuICB9XG5cbiAgdW56b29tKCkge1xuICAgIExPRygndW56b29tJylcbiAgfVxuXG4gIGRvY2tMZWZ0KCkge1xuICAgIGRpdmlkZXIuc2V0UG9zaXRpb24oJ2xlZnQnKVxuICB9XG5cbiAgZG9ja1JpZ2h0KCkge1xuICAgIGRpdmlkZXIuc2V0UG9zaXRpb24oJ3JpZ2h0JylcbiAgfVxuICBcbiAgdG9nZ2xlRWRpdE1vZGUoKSB7fVxuXG4gIHRhYmxldFNldHRpbmdzKCkge1xuICAgIGRpYWxvZy5vcGVuKHRhYmxldFNldHRpbmdzRGlhbG9nKS50aGVuKCgpID0+IHtcbiAgICAgIGRpYWxvZy5jbG9zZSgpXG5cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvcikgZGlhbG9nLm9wZW4obWVzc2FnZUJveCwgeyB0eXBlOiAnZXJyb3InLCBtZXNzYWdlOiBlcnJvciB9KVxuICAgIH0pXG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vL1xuICBcbiAgZG8oaXRlbSwgZGF0YSkge1xuICAgIGlmIChpdGVtICYmIHRoaXNbaXRlbV0pIHtcbiAgICAgIHRoaXNbaXRlbV0oZGF0YSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIGRldmVsb3BlclRvb2xzKCkge1xuICAgIF9ydW5NYWluKCdkZXZlbG9wZXJUb29scycpXG4gIH1cbiAgXG4gIGZ1bGxTY3JlZW4oKSB7XG4gICAgaWYgKG5hbWVub3RlLmFwcCkge1xuICAgICAgX3J1bk1haW4oJ2Z1bGxTY3JlZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbiAgfVxuICBcbiAgcXVpdCgpIHtcbiAgICBfcnVuTWFpbigncXVpdCcpXG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgbG9jYXRpb24ucmVsb2FkKClcbiAgfVxufVxuXG5jb25zdCBjb21tYW5kID0gbmV3IENvbW1hbmQoKVxuXG5leHBvcnQgeyBjb21tYW5kIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBjb25maWdEZWZhdWx0ID0ge1xuICB0b29sQmFyOiB0cnVlLFxuICBzaWRlQmFyOiBmYWxzZSxcbiAgc2lkZUJhcldpZHRoOiAyMDAsXG4gIHNpZGVCYXJQb3NpdGlvbjogJ3JpZ2h0JyxcbiAgXG4gIGRlZmF1bHRQYXRoOiBudWxsLFxuICBkZWZhdWx0TmFtZTogbnVsbCxcbiAgZGVmYXVsdEF1dGhvcjogbnVsbCxcbn1cblxuXG5leHBvcnQgeyBjb25maWdEZWZhdWx0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWdEZWZhdWx0IH0gZnJvbSAnLi9jb25maWctZGVmYXVsdC5lczYnXG5cbmNsYXNzIENvbmZpZyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YSA9IFtdXG4gIH1cblxuICBsb2FkKCkge1xuICAgIGNvbnN0IGpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZW5vdGUvY29uZmlnJylcbiAgICB0aGlzLmRhdGEgPSAoanNvbikgPyBKU09OLnBhcnNlKGpzb24pIDogJC5leHRlbmQodHJ1ZSwge30sIGNvbmZpZ0RlZmF1bHQpXG4gIH1cblxuICBzYXZlKCkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWVub3RlL2NvbmZpZycsIGpzb24pXG4gIH1cblxuICByZXNldFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnRGVmYXVsdClcbiAgICB0aGlzLnNhdmUoKVxuICB9XG5cbiAgZ2V0VmFsdWUoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICBpZiAodGhpcy5kYXRhW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVtrZXldXG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBjb25maWcgPSBuZXcgQ29uZmlnKClcblxuZXhwb3J0IHsgY29uZmlnIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBEaWFsb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cblxuICBpbml0KCkge1xuICB9XG4gIFxuICBpc09wZW4oKSB7XG4gICAgZm9yIChjb25zdCB3aWRnZXQgb2YgJCgnLnVpLWRpYWxvZy1jb250ZW50JykpIHtcbiAgICAgIGlmICgkKHdpZGdldCkuZGlhbG9nKCdpc09wZW4nKSkge1xuXHRyZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBcbiAgb3Blbih3aWRnZXQsIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50KSB0aGlzLmNsb3NlKClcbiAgICB0aGlzLmN1cnJlbnQgPSB3aWRnZXRcbiAgICBcbiAgICBpZiAoIXdpZGdldC5lbGVtZW50KSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgIGVsZW1lbnQuaWQgPSB3aWRnZXQuaWRcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2RpYWxvZydcbiAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gJzAnO1xuICAgICAgJCgnYm9keScpWzBdLmFwcGVuZENoaWxkKGVsZW1lbnQpXG4gICAgICB3aWRnZXQuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgJCh3aWRnZXQuZWxlbWVudCkuZGlhbG9nKCdvcGVuJylcbiAgICB9LCAyMDApXG5cbiAgICByZXR1cm4gd2lkZ2V0LmluaXQob3B0aW9ucylcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIGNvbnN0IHdpZGdldCA9IHRoaXMuY3VycmVudFxuICAgIGNvbnN0IGVsZW1lbnQgPSB3aWRnZXQuZWxlbWVudFxuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAkKCcjJyArIHdpZGdldC5pZCkuZGlhbG9nKCdjbG9zZScpXG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudClcbiAgICB9XG4gICAgd2lkZ2V0LmVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5jdXJyZW50ID0gbnVsbFxuICB9XG59XG5cbmNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coKVxuXG5leHBvcnQgeyBkaWFsb2cgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnLmVzNidcbmltcG9ydCB7IHZpZXdCdXR0b24gfSBmcm9tICcuL3ZpZXctYnV0dG9uLmVzNidcblxubGV0IG1pbldpZHRoID0gMTgwXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgRGl2aWRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICAkKCcuc3BsaXQtcGFuZScpLnNwbGl0UGFuZSgpXG4gICAgJCgnLnNwbGl0LXBhbmUnKS5vbignZGl2aWRlcmRyYWdlbmQnLCAoZSkgPT4geyAvLyBvciAnc3BsaXRwYW5lcmVzaXplJ1xuICAgICAgdGhpcy5vbkRpdmlkZXJEcmFnRW5kKClcbiAgICB9KVxuICAgIHRoaXMuc2V0UG9zaXRpb24oKVxuICB9XG5cbiAgdXBkYXRlKHZhbHVlKSB7XG4gICAgTE9HKCdbdXBkYXRlXScpXG4gICAgXG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhciA9IHZhbHVlXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgbGV0IHdpZHRoID0gKHZhbHVlKSA/IGNvbmZpZy5kYXRhLnNpZGVCYXJXaWR0aCA6IDBcbiAgICBpZiAoY29uZmlnLmRhdGEuc2lkZUJhclBvc2l0aW9uID09ICdyaWdodCcpIHtcbiAgICAgIHdpZHRoID0gJCgnLnNwbGl0LXBhbmUnKS53aWR0aCgpIC0gd2lkdGggKyAxXG4gICAgfVxuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBtYXhXaWR0aCA9ICQoJy5zcGxpdC1wYW5lJykud2lkdGgoKSAtIG1pbldpZHRoIC0gMVxuICAgICAgaWYgKHdpZHRoIDwgbWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGhcbiAgICAgIGlmICh3aWR0aCA+IG1heFdpZHRoKSB3aWR0aCA9IG1heFdpZHRoXG4gICAgfVxuXG4gICAgJCgnLnNwbGl0LXBhbmUnKS5zcGxpdFBhbmUoJ2ZpcnN0Q29tcG9uZW50U2l6ZScsIHdpZHRoKVxuICAgIHZpZXdCdXR0b24udXBkYXRlKClcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZSghY29uZmlnLmRhdGEuc2lkZUJhcilcbiAgfVxuXG4gIHNldFBvc2l0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkgdmFsdWUgPSBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb25cbiAgICBjb25maWcuZGF0YS5zaWRlQmFyUG9zaXRpb24gPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgIGNvbnN0IG1haW5WaWV3ID0gJCgnLm1haW4tdmlldycpXG4gICAgY29uc3Qgc2lkZUJhciA9ICQoJy5zaWRlYmFyJylcblxuICAgIGlmICh2YWx1ZSA9PSAnbGVmdCcpIHtcbiAgICAgICQoJyNsZWZ0LWNvbXBvbmVudCcpLmFwcGVuZChzaWRlQmFyKVxuICAgICAgJCgnI3JpZ2h0LWNvbXBvbmVudCcpLmFwcGVuZChtYWluVmlldylcblxuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjcmlnaHQtY29tcG9uZW50JykuYXBwZW5kKHNpZGVCYXIpXG4gICAgICAkKCcjbGVmdC1jb21wb25lbnQnKS5hcHBlbmQobWFpblZpZXcpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxuICBcbiAgb25EaXZpZGVyRHJhZ0VuZCgpIHtcbiAgICBMT0coXCJbZGl2aWRlciBkcmFnIGVuZF1cIilcbiAgICBsZXQgd2lkdGggPSAkKCcuc2lkZWJhcicpLndpZHRoKClcblxuICAgIGNvbnN0IG1heFdpZHRoID0gJCgnLnNwbGl0LXBhbmUnKS53aWR0aCgpIC0gbWluV2lkdGggLSAxXG4gICAgaWYgKHdpZHRoIDwgbWluV2lkdGgpIHdpZHRoID0gbWluV2lkdGhcbiAgICBpZiAod2lkdGggPiBtYXhXaWR0aCkgd2lkdGggPSBtYXhXaWR0aFxuXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhcldpZHRoID0gcGFyc2VJbnQod2lkdGgpXG4gICAgY29uZmlnLmRhdGEuc2lkZUJhciA9IHRydWVcbiAgICBjb25maWcuc2F2ZSgpXG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG59XG5cbmNvbnN0IGRpdmlkZXIgPSBuZXcgRGl2aWRlcigpXG5cbmV4cG9ydCB7IGRpdmlkZXIgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIEZsYXNoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBzYXZlKGl0ZW0sIGRhdGEpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoW2l0ZW0sIGRhdGFdKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9mbGFzaCcsIGpzb24pXG4gIH1cblxuICBsb2FkKCkge1xuICAgIGNvbnN0IGpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZW5vdGUvZmxhc2gnKVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCduYW1lbm90ZS9mbGFzaCcpXG5cbiAgICBpZiAoanNvbikge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IEpTT04ucGFyc2UoanNvbilcbiAgICAgIGNvbW1hbmQuZG8oLi4ub3B0aW9ucylcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgZmxhc2ggPSBuZXcgRmxhc2goKVxuXG5leHBvcnQgeyBmbGFzaCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcblxubGV0IHVuZG9CdXR0b25cbmxldCByZWRvQnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSGlzdG9yeUJ1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB1bmRvQnV0dG9uID0gJCgnI3VuZG8tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3VuZG8tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb21tYW5kLnVuZG8oKVxuICAgICAgfVxuICAgIH0pWzBdXG5cbiAgICByZWRvQnV0dG9uID0gJCgnI3JlZG8tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3JlZG8tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgZGlzYWJsZWQ6IHRydWUsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkge1xuICAgICAgICBjb21tYW5kLnJlZG8oKVxuICAgICAgfVxuICAgIH0pWzBdXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBcbiAgICBpZiAocHJvamVjdCkge1xuICAgICAgY29uc3QgaGFzVW5kbyA9IChwcm9qZWN0KSA/IHByb2plY3QuaGlzdG9yeS5oYXNVbmRvKCkgOiBmYWxzZVxuICAgICAgY29uc3QgaGFzUmVkbyA9IChwcm9qZWN0KSA/IHByb2plY3QuaGlzdG9yeS5oYXNSZWRvKCkgOiBmYWxzZVxuICAgICAgJCh1bmRvQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhaGFzVW5kbylcbiAgICAgICQocmVkb0J1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIWhhc1JlZG8pXG5cbi8vICAgIE1lbnUudXBkYXRlSGlzdG9yeSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhpc3RvcnlCdXR0b24gPSBuZXcgSGlzdG9yeUJ1dHRvbigpXG5cbmV4cG9ydCB7IGhpc3RvcnlCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgSFRNTERyb3Bkb3duIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICB9XG5cbiAgb3BlbihlbGVtZW50KSB7XG4gICAgbG9nKCdvcGVuJywgZWxlbWVudClcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gIH1cblxuICBjbG9zZShlbGVtZW50KSB7XG4gICAgbG9nKCdjbG9zZScpXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cbiAgXG4gIG1ha2UodGVtcGxhdGUsIGlkKSB7XG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY29udGVudC5jbGFzc05hbWUgPSAnZHJvcGRvd24tY29udGVudCdcbiAgICBjb250ZW50LmlkID0gaWQgKyAnLWRyb3Bkb3duJ1xuICAgIFxuICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gYFske2lkfV1gXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxufVxuXG5jb25zdCBodG1sRHJvcGRvd24gPSBuZXcgSFRNTERyb3Bkb3duKClcblxuZXhwb3J0IHsgaHRtbERyb3Bkb3duIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSBhcyBuYXRpdmVNZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxubGV0IGJ1dHRvbnMgPSB7fVxubGV0IHRpbWVycyA9IHt9XG5sZXQgYmx1ckRlbGF5ID0gNTAwXG5cbmNvbnN0IGFkZEl0ZW1zID0gKG5vZGUsIGl0ZW1zKSA9PiB7XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGlmIChpdGVtLmxhYmVsKSB7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gYXBwZW5kS2V5KFQoaXRlbS5sYWJlbCksIGl0ZW0uYWNjZWxlcmF0b3IpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSAnLSdcbiAgICB9XG4gICAgbGkuYXBwZW5kQ2hpbGQoYXBwZW5kQXR0cmlidXRlKGRpdiwgaXRlbS5sYWJlbCwgaXRlbS5jbGljaykpXG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgYWRkSXRlbXMobGksIGl0ZW0uc3VibWVudSkgXG4gICAgfVxuXG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgbm9kZS5hcHBlbmRDaGlsZCh1bClcbiAgfVxufVxuXG5jb25zdCBhcHBlbmRBdHRyaWJ1dGUgPSAoZGl2LCBkYXRhLCBjbGljaykgPT4ge1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJylcbiAgICBwLmlubmVySFRNTCA9IGRhdGFcbiAgICBwLnRpdGxlID0gY2xpY2sgfHwgJydcbiAgICBwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBkaXYuYXBwZW5kQ2hpbGQocClcbiAgfVxuICByZXR1cm4gZGl2XG59XG5cbmNvbnN0IGFwcGVuZEtleSA9IChzdHJpbmcsIGtleSwgY2hlY2spID0+IHtcbiAgY2hlY2sgPSAoY2hlY2spID8gJyYjeDI3MTQ7JyA6ICcnXG4gIGtleSA9IGNvbnZlcnRLZXkoa2V5KSB8fCAnJm5ic3A7JyBcblxuICBjb25zdCByZXN1bHQgPSBgXG4gICAgPGRpdiBjbGFzcz0nY2hlY2snPiR7Y2hlY2t9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz0nbGFiZWwnPiR7c3RyaW5nfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9J2tleSc+JHtrZXl9PC9kaXY+YFxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGNvbnZlcnRLZXkgPSAoa2V5KSA9PiB7XG4gIGlmIChrZXkpIHtcbiAgICBpZiAoIW5hbWVub3RlLmlzTWFjKCkpIHtcbiAgICAgIGlmIChrZXkuaW5kZXhPZignQ29tbWFuZCtDdHJsK0YnKSA+PSAwKSByZXR1cm4gJydcbiAgICAgIFxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1NoaWZ0XFwrXFwsLywgJ1NoaWZ0K0NvbW1hJylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcK1xcLi8sICdTaGlmdCtQZXJpb2QnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NtZE9yQ3RybFxcKy8sICdDdHJsKycpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ29tbWFuZFxcK0FsdFxcKy8sICdDdHJsK0FsdCsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJz8/PysnKVxuICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKClcblxuICAgIH0gZWxzZSB7XG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXCwvLCAnPCcpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvU2hpZnRcXCtcXC4vLCAnPicpXG4gICAgICBrZXkgPSBrZXkucmVwbGFjZSgvQ21kT3JDdHJsXFwrLywgJyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtBbHRcXCsvLCAnJiM4OTk3OyYjODk4NDsnKVxuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL0NvbW1hbmRcXCtDdHJsXFwrLywgJyYjODk2MzsmIzg5ODQ7JylcbiAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9TaGlmdFxcKy8sICcmIzg2Nzk7JylcbiAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpXG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBIVE1MTWVudSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxuXG4gIG9wZW4oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgfVxuXG4gIGNsb3NlKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgfVxuICBcbiAgbWFrZSh0ZW1wbGF0ZSwgaWQpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjb250ZW50LmNsYXNzTmFtZSA9ICdkcm9wZG93bi1jb250ZW50J1xuICAgIGNvbnRlbnQuaWQgPSBpZCArICctZHJvcGRvd24nXG5cbiAgICBhZGRJdGVtcyhjb250ZW50LCB0ZW1wbGF0ZSlcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZhdGUoY29udGVudC5jaGlsZE5vZGVzWzBdLCBpZClcbiAgICB9LCAxKVxuICAgXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxuXG4gIGFjdGl2YXRlKG1lbnUsIGlkKSB7XG4gICAgbWVudS5pZCA9IGlkICsgJy1tZW51J1xuICAgIGJ1dHRvbnNbaWRdID0gJCgnIycgKyBpZCArICctbWVudS1idXR0b24nKVxuICAgIHRpbWVyc1tpZF0gPSBudWxsXG5cbiAgICAkKG1lbnUpLm1lbnUoe1xuICAgICAgc2VsZWN0OiBmdW5jdGlvbihldmVudCwgdWkpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0KGV2ZW50LCB1aSkpIHtcbiAgICAgICAgICB0aGlzLmNvbGxhcHNlKG1lbnUsIGlkKVxuICAgICAgICAgIGJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgIH0pXG5cbiAgICAkKG1lbnUpLm9uKCdtZW51Zm9jdXMnLCAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJzW2lkXSlcbiAgICB9KVxuICAgIFxuICAgICQobWVudSkub24oJ21lbnVibHVyJywgKCkgPT4ge1xuICAgICAgaWYgKCFidXR0b25zW2lkXS5pbWFnZUJ1dHRvbignbG9ja2VkJykpIHJldHVyblxuICAgICAgdGltZXJzW2lkXSA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbGxhcHNlKG1lbnUsIGlkKVxuICAgICAgfSwgYmx1ckRlbGF5KVxuICAgIH0pXG4gIH1cblxuICBjb2xsYXBzZShtZW51LCBpZCkge1xuICAgICQobWVudSkubWVudSgnY29sbGFwc2VBbGwnLCBudWxsLCB0cnVlKVxuICAgIG1lbnUucGFyZW50Tm9kZS5zdHlsZS5vcGFjaXR5ID0gJzAuMDEnXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNsb3NlKG1lbnUucGFyZW50Tm9kZSlcbiAgICAgIGJ1dHRvbnNbaWRdLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBmYWxzZSlcbiAgICB9LCA1MDApXG4gIH1cbiAgXG4gIC8vLy8vLy8vLy8vLy8vLy9cblxuICB1cGRhdGUoZWxlbWVudCkge1xuICAgIGNvbnN0IG1lbnUgPSBlbGVtZW50LmNoaWxkTm9kZXNbMF1cbiAgICBjb25zdCBpZCA9IGVsZW1lbnQuaWQucmVwbGFjZSgvLS4qJC8sICcnKVxuLy8gIHdhcm4oJ1todG1sIG1lbnUgdXBkYXRlXScsIGlkKVxuXG4gICAgaWYgKGlkID09ICdmaWxlJykge1xuICAgICAgdGhpcy51cGRhdGVSZWNlbnRzKG1lbnUpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlU3RhdGVzKG1lbnUpXG4gICAgJChtZW51KS5tZW51KCdyZWZyZXNoJylcbiAgfVxuXG4gIGlzU2VwYXJhdG9yKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgaWYgKGl0ZW0uY2hpbGROb2Rlc1swXSAmJiBpdGVtLmNoaWxkTm9kZXNbMF0uaW5uZXJIVE1MICE9ICctJykge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBcbiAgdXBkYXRlUmVjZW50cyhtZW51KSB7XG4gICAgd2hpbGUgKCF0aGlzLmlzU2VwYXJhdG9yKG1lbnUuY2hpbGROb2Rlc1syXSkpIHtcbiAgICAgIG1lbnUucmVtb3ZlQ2hpbGQobWVudS5jaGlsZE5vZGVzWzJdKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNlbnRVUkwuZGF0YSkge1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgZGl2LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInVpLWljb24gdWktaWNvbi1ub3RlXCI+PC9zcGFuPicgKyBpdGVtXG4gICAgICBsaS5hcHBlbmRDaGlsZChhcHBlbmRBdHRyaWJ1dGUoZGl2LCBpdGVtLCAnb3BlbicpKVxuICAgICAgZGYuYXBwZW5kQ2hpbGQobGkpXG4gICAgfVxuICAgIC8vICBtZW51LmFwcGVuZENoaWxkKGRmKVxuICAgIG1lbnUuaW5zZXJ0QmVmb3JlKGRmLCBtZW51LmNoaWxkTm9kZXNbMl0pXG4gIH1cblxuICB1cGRhdGVTdGF0ZXMobWVudSkge1xuICAgIGNvbnN0IGl0ZW1zID0gJChtZW51KS5maW5kKCdsaScpXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICBjb25zdCBuYW1lID0gJChpdGVtKS5maW5kKCdwJylcbiAgICAgIGlmIChuYW1lICYmIG5hbWUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBuYW1lWzBdLmlubmVySFRNTFxuICAgICAgICBjb25zdCBzdGF0ZSA9IG5hdGl2ZU1lbnUuZ2V0U3RhdGUobGFiZWwpXG4gICAgICAgIGlmIChzdGF0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXN0YXRlLWRpc2FibGVkJylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCd1aS1zdGF0ZS1kaXNhYmxlZCcpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICAvLy8vLy8vLy8vLy8vLy8vXG4gIFxuICBzZWxlY3QoZXZlbnQsIHVpKSB7XG4gICAgY29uc3QgcCA9IHVpLml0ZW1bMF0gJiYgdWkuaXRlbVswXS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncCcpWzBdXG4gICAgaWYgKHApIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBwLmlubmVySFRNTFxuICAgICAgY29uc3QgY2xpY2sgPSBwLnRpdGxlXG5cbiAgICAgIGlmIChjbGljaykge1xuICAgICAgICBMT0coYCR7Y2xpY2t9YCwgYCR7ZGF0YX1gKVxuICAgICAgICBjb21tYW5kLmRvKGAke2NsaWNrfWAsIGAke2RhdGF9YClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgaHRtbE1lbnUgPSBuZXcgSFRNTE1lbnUoKVxuXG5leHBvcnQgeyBodG1sTWVudSB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBMb2NhbGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBkaWN0aW9uYXJ5ID0gcmVxdWlyZSgnLi4vanMvbGliL2RpY3Rpb25hcnkuanMnKS5kaWN0aW9uYXJ5XG4gICAgXG4gICAgZm9yIChsZXQga2V5IGluIGRpY3Rpb25hcnkpIHtcbiAgICAgIGlmIChuYXZpZ2F0b3IubGFuZ3VhZ2UuaW5kZXhPZihrZXkpID09IDAgJiYgZGljdGlvbmFyeVtrZXldKSB7XG4gICAgICAgIGNvbnN0IGRpY3QgPSBkaWN0aW9uYXJ5W2tleV1cbiAgICAgICAgdGhpcy50cmFuc2xhdGUgPSAoc3RyaW5nKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRpY3Rbc3RyaW5nXSB8fCBzdHJpbmdcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRyYW5zbGF0ZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nXG4gIH1cbiAgXG4gIHRyYW5zbGF0ZUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBodG1sLnJlcGxhY2UoL1RcXCgoLio/KVxcKS9nLCAoYWxsLCBtYXRjaCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlKG1hdGNoKVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgbG9jYWxlID0gbmV3IExvY2FsZSgpXG5cbmV4cG9ydCB7IGxvY2FsZSB9XG5cblxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3LmVzNidcblxuLy8gJCgnLm1haW4tdmlldycpWzBdLnBhcmVudE5vZGUuc2Nyb2xsVG9wID0gLi4uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWFpblZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zY2FsZSA9IDFcblxuLyogICAgXG4gICAgY29uc3QgcGFnZVdpZHRoID0gMTAwMFxuICAgIGNvbnN0IHBhZ2VIZWlnaHQgPSA3NjhcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBwYWdlLnN0eWxlLndpZHRoID0gUFgocGFnZVdpZHRoKVxuICAgICAgICBwYWdlLnN0eWxlLmhlaWdodCA9IFBYKHBhZ2VIZWlnaHQpXG4gICAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJ3aGl0ZVwiXG4gICAgICAgIHBhZ2Uuc3R5bGUub3V0bGluZSA9IFwiMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4zKVwiXG5cbiAgICAgICAgY29uc3QgeCA9IGkgKiAocGFnZVdpZHRoICsgNTApICsgNTBcbiAgICAgICAgY29uc3QgeSA9IGogKiAocGFnZUhlaWdodCArIDUwKSArIDUwXG4gICAgICAgIHBhZ2Uuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHBhZ2Uuc3R5bGUubGVmdCA9IFBYKHgpXG4gICAgICAgIHBhZ2Uuc3R5bGUudG9wID0gUFgoeSlcbiAgICAgICAgcGFnZS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBcInRvcCBsZWZ0XCJcbiAgICAgICAgcGFnZS5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDEuMClcIlxuICAgICAgICBcbiAgICAgICAgY29uc3QgcGFnZU51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHBhZ2VOdW1iZXIuaW5uZXJIVE1MID0gKGogKiAxMCArIGkgKyAxKSArIFwi44Oa44O844K4XCJcbiAgICAgICAgcGFnZU51bWJlci5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JyAvLyAxMXB45Lul5LiL44Gv5aSJ44KP44KJ44Gq44GEXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUubGVmdCA9IFBYKHBhZ2VXaWR0aCAvIDIpXG4gICAgICAgIHBhZ2VOdW1iZXIuc3R5bGUudG9wID0gUFgocGFnZUhlaWdodCArIDIwKVxuXG4gICAgICAgIHBhZ2UuYXBwZW5kQ2hpbGQocGFnZU51bWJlcilcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHBhZ2UpXG4gICAgfVxuICAgIH1cbiovXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cbiAgXG4gIHNldFByb2plY3QocHJvamVjdCkge1xuICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RcbiAgICBpZiAocHJvamVjdCkge1xuICAgIH0gZWxzZSB7XG4gICAgfVxuICAgIHRoaXMudXBkYXRlKClcbiAgfVxufVxuXG5leHBvcnQgeyBNYWluVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5cbmltcG9ydCB7IGZpbGVNZW51VGVtcGxhdGUsXG4gICAgICAgICBvdGhlck1lbnVUZW1wbGF0ZSxcbiAgICAgICAgIHNpZGViYXJNZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuXG5sZXQgZmlsZUJ1dHRvblxubGV0IG90aGVyQnV0dG9uXG5sZXQgc2lkZWJhckJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnVCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBmaWxlQnV0dG9uID0gJCgnI2ZpbGUtbWVudS1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZmlsZS1idXR0b24ucG5nJyxcbiAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKGZpbGVNZW51VGVtcGxhdGUsICdmaWxlJylcbiAgICB9KVswXVxuLypcbiAgICBvdGhlckJ1dHRvbiA9ICQoJyNvdGhlci1tZW51LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9tZW51LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKG90aGVyTWVudVRlbXBsYXRlLCAnb3RoZXInKVxuICAgIH0pWzBdXG4qL1xuICAgIHNpZGViYXJCdXR0b24gPSAkKCcjc2lkZWJhci1tZW51LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9tZW51LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdyaWdodCcsXG4gICAgICBjbGljazogZnVuY3Rpb24oZSkgeyB0aGlzLnNlbGVjdChlKSB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sTWVudS5tYWtlKHNpZGViYXJNZW51VGVtcGxhdGUsICdzaWRlYmFyJyksXG4gICAgICBjb250ZW50UGFyZW50OiAkKCdib2R5JylbMF1cbiAgICB9KVswXVxuXG4gICAgdGhpcy5idXR0b25zLnB1c2goZmlsZUJ1dHRvbiwgc2lkZWJhckJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuICBcbiAgc2VsZWN0KGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoJ2ltZy1idXR0b24nKSA8IDApIHJldHVyblxuICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICBmb3IgKGNvbnN0IGJ1dHRvbiBvZiB0aGlzLmJ1dHRvbnMpIHtcbiAgICAgIGNvbnN0IGxvY2tlZCA9ICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJylcbiAgICAgIGNvbnN0IGluc3RhbmNlID0gJChidXR0b24pLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpXG4gICAgICBjb25zdCBkcm9wZG93biA9IGluc3RhbmNlLm9wdGlvbnMuY29udGVudFxuICAgICAgXG4gICAgICBpZiAoYnV0dG9uICYmIGJ1dHRvbi5pZCA9PSBlLnRhcmdldC5pZCkge1xuICAgICAgICBpZiAoIWxvY2tlZCkge1xuICAgICAgICAgIGh0bWxNZW51LnVwZGF0ZShkcm9wZG93bilcbiAgICAgICAgICBcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgICAgaWYgKGluc3RhbmNlLm9wdGlvbnMuY29udGVudFBhcmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudXBkYXRlQ29udGVudFBvc2l0aW9uKClcbiAgICAgICAgICB9XG4gICAgICAgICAgaHRtbE1lbnUub3Blbihkcm9wZG93bilcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgICAgaHRtbE1lbnUuY2xvc2UoZHJvcGRvd24pXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxvY2tlZCkge1xuICAgICAgICAgICQoYnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgICAgaHRtbE1lbnUuY2xvc2UoZHJvcGRvd24pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgbWVudUJ1dHRvbiA9IG5ldyBNZW51QnV0dG9uKClcblxuZXhwb3J0IHsgbWVudUJ1dHRvbiB9XG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgbWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAnTmFtZW5vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdBYm91dCBOYW1lbm90ZSAuLi4nLCBjbGljazogJ2Fib3V0JyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1NldHRpbmdzIC4uLicsIGNsaWNrOiAnc2V0dGluZ3MnIH0sXG4gICAgICB7IGxhYmVsOiAnVGFibGV0IFNldHRpbmdzIC4uLicsIGNsaWNrOiAndGFibGV0U2V0dGluZ3MnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUXVpdCBOYW1lbm90ZScsIGNsaWNrOiAncXVpdCcgfSxcbiAgICAgIFxuLy8gICAgeyBsYWJlbDogJ1NldHRpbmdzJyxcbi8vXHRzdWJtZW51OiBbXG4vL1x0ICB7IGxhYmVsOiAnUmVzZXQgU2V0dGluZ3MgdG8gRGVmYXVsdCcsIGNsaWNrOiAncmVzZXRTZXR0aW5ncycgfSxcbi8vXHRdLFxuLy8gICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnTm90ZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ05ldyAuLi4nLCBjbGljazogJ29wZW5OZXdEaWFsb2cnIH0sXG4gICAgICB7IGxhYmVsOiAnT3BlbiAuLi4nLCBjbGljazogJ29wZW5EaWFsb2cnIH0sXG4gICAgICB7IGxhYmVsOiAnT3BlbiBSZWNlbnQnLCBzdWJtZW51OiBbXSB9LFxuXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UnLCBjbGljazogJ2Nsb3NlJyB9LFxuLy8gICAgeyBsYWJlbDogJ0Nsb3NlIEFsbCcsIGNsaWNrOiAnY2xvc2VBbGwnIH0sXG5cdFxuLy8gICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuLy8gICAgeyBsYWJlbDogJ05vdGUgU2V0dGluZ3MgLi4uJywgY2xpY2s6ICdub3RlU2V0dGluZ3MnIH0sXG5cbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGNsaWNrOiAnc25hcHNob3QnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiBcIkVkaXRcIixcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiBcIlVuZG9cIiwgc2VsZWN0b3I6IFwidW5kbzpcIiwgY2xpY2s6ICd1bmRvJyB9LFxuICAgICAgeyBsYWJlbDogXCJSZWRvXCIsIHNlbGVjdG9yOiBcInJlZG86XCIsIGNsaWNrOiAncmVkbycgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogXCJDdXRcIiwgc2VsZWN0b3I6IFwiY3V0OlwiIH0sXG4gICAgICB7IGxhYmVsOiBcIkNvcHlcIiwgc2VsZWN0b3I6IFwiY29weTpcIiB9LFxuICAgICAgeyBsYWJlbDogXCJQYXN0ZVwiLCBzZWxlY3RvcjogXCJwYXN0ZTpcIiB9LFxuXG4gICAgICB7IGxhYmVsOiBcIlNlbGVjdCBBbGxcIiwgc2VsZWN0b3I6IFwic2VsZWN0QWxsOlwiLCBjbGljazogJ3NlbGVjdEFsbCcgfSxcbiAgICBdXG4gIH0sXG4gIHsgbGFiZWw6ICdQYWdlJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnQWRkJywgY2xpY2s6ICdhcHBlbmRQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgRm9yd2FyZCcsIGNsaWNrOiAnbW92ZVBhZ2VGb3J3YXJkJyB9LFxuICAgICAgeyBsYWJlbDogJ01vdmUgQmFja3dhcmQnLCBjbGljazogJ21vdmVQYWdlQmFja3dhcmQnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIHRvIEJ1ZmZlcicsIGNsaWNrOiAnY3V0UGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdQdXQgQmFjayBmcm9tIEJ1ZmZlcicsIGNsaWNrOiAncGFzdGVQYWdlJyB9LFxuICAgICAgeyBsYWJlbDogJ0VtcHR5IEJ1ZmZlcicsIGNsaWNrOiAnZW1wdHlQYWdlJyB9LFxuLy8gICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4vLyAgICB7IGxhYmVsOiAnRmxpcCcsIGNsaWNrOiAnZmxpcFBhZ2UnIH0sXG4gICAgICB7IHR5cGU6IFwic2VwYXJhdG9yXCIgfSxcbiAgICAgIHsgbGFiZWw6ICdFeHRyYWN0IFRleHQnLCBjbGljazogJ2V4dHJhY3RUZXh0JyB9LFxuICAgICAgeyBsYWJlbDogJ1NhdmUgSW1hZ2UgQXMgLi4uJywgY2xpY2s6ICdzYXZlUGFnZUltYWdlJyB9LFxuICAgIF0sXG4gIH0sXG4gIHsgbGFiZWw6ICdWaWV3JyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAnRnVsbCBTY3JlZW4nLCBjbGljazogJ2Z1bGxTY3JlZW4nIH0sIFxuLy8gICAgeyBsYWJlbDogJ1Rvb2wgQmFyJywgY2xpY2s6ICd0b29sQmFyJyB9LFxuICAgICAgeyBsYWJlbDogJ1NpZGUgQmFyJywgY2xpY2s6ICdzaWRlQmFyJyB9LCBcbiAgICAgIHsgbGFiZWw6ICdEZXZlbG9wZXIgVG9vbHMnLCBjbGljazogJ2RldmVsb3BlclRvb2xzJyB9LFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1pvb20gSW4nLCBjbGljazogJ3pvb20nIH0sIFxuICAgICAgeyBsYWJlbDogJ1pvb20gT3V0JywgY2xpY2s6ICd1bnpvb20nIH0sIFxuICAgICAgeyB0eXBlOiAnc2VwYXJhdG9yJyB9LFxuICAgICAgeyBsYWJlbDogJ1BhZ2UgTWFyZ2luJywgY2xpY2s6ICdzaG93TWFyZ2luJyB9LFxuICAgICAgeyBsYWJlbDogJ051bWJlciBvZiBQYWdlcyBwZXIgUm93Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcyJywgY2xpY2s6ICdyb3cxJyB9LFxuXHQgIHsgbGFiZWw6ICc0JywgY2xpY2s6ICdyb3cyJyB9LFxuXHQgIHsgbGFiZWw6ICc2JywgY2xpY2s6ICdyb3czJyB9LFxuXHQgIHsgbGFiZWw6ICc4JywgY2xpY2s6ICdyb3c0JyB9LFxuXHRdLFxuICAgICAgfVxuICAgIF0sXG4gIH0sXG5dXG5cbmNvbnN0IGZpbGVNZW51VGVtcGxhdGUgPSBbXG4gIHsgbGFiZWw6ICdOZXcgLi4uJywgY2xpY2s6ICdvcGVuTmV3RGlhbG9nJyB9LFxuICB7IGxhYmVsOiAnT3BlbiAuLi4nLCBjbGljazogJ29wZW5EaWFsb2cnIH0sXG4gIHsgdHlwZTogJ3NlcGFyYXRvcicgfSxcbiAgeyBsYWJlbDogJ05vdGUnLFxuICAgIHN1Ym1lbnU6IFtcbi8vICAgIHsgbGFiZWw6ICdDbG9zZScsIGNsaWNrOiAnY2xvc2UnIH0sXG4vLyAgICB7IGxhYmVsOiAnQ2xvc2UgQWxsJywgY2xpY2s6ICdjbG9zZUFsbCcgfSxcbiAgICAgIHsgbGFiZWw6ICdTYXZlIFNuYXBzaG90IEFzIC4uLicsIGNsaWNrOiAnc25hcHNob3QnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG5cbi8vICAgIHsgbGFiZWw6ICdJbXBvcnQnLFxuLy9cdHN1Ym1lbnU6IFtcbi8vXHQgIHsgbGFiZWw6ICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBjbGljazogJ2ltcG9ydFRleHREaWFsb2cnIH0sXG4vL1x0XSxcbi8vICAgIH0sXG4gICAgICB7IGxhYmVsOiAnRXhwb3J0Jyxcblx0c3VibWVudTogW1xuXHQgIHsgbGFiZWw6ICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgY2xpY2s6ICdleHBvcnRDU05GRGlhbG9nJyB9LFxuXHQgIHsgbGFiZWw6ICcucGRmIChQREYpIC4uLicsIGNsaWNrOiAnZXhwb3J0UERGRGlhbG9nJyB9LFxuXHRdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7IGxhYmVsOiAnUGFnZScsXG4gICAgc3VibWVudTogW1xuICAgICAgeyBsYWJlbDogJ0FkZCcsIGNsaWNrOiAnYXBwZW5kUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEZvcndhcmQnLCBjbGljazogJ21vdmVQYWdlRm9yd2FyZCcgfSxcbiAgICAgIHsgbGFiZWw6ICdNb3ZlIEJhY2t3YXJkJywgY2xpY2s6ICdtb3ZlUGFnZUJhY2t3YXJkJyB9LFxuICAgICAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gICAgICB7IGxhYmVsOiAnTW92ZSB0byBCdWZmZXInLCBjbGljazogJ2N1dFBhZ2UnIH0sXG4gICAgICB7IGxhYmVsOiAnUHV0IEJhY2sgZnJvbSBCdWZmZXInLCBjbGljazogJ3Bhc3RlUGFnZScgfSxcbiAgICAgIHsgbGFiZWw6ICdFbXB0eSBCdWZmZXInLCBjbGljazogJ2VtcHR5UGFnZScgfSxcbiAgICAgIHsgdHlwZTogXCJzZXBhcmF0b3JcIiB9LFxuICAgICAgeyBsYWJlbDogJ0V4dHJhY3QgVGV4dCcsIGNsaWNrOiAnZXh0cmFjdFRleHQnIH0sXG4gICAgICB7IGxhYmVsOiAnU2F2ZSBJbWFnZSBBcyAuLi4nLCBjbGljazogJ3NhdmVQYWdlSW1hZ2UnIH0sXG4gICAgXSxcbiAgfSxcbiAgeyBsYWJlbDogJ1ZpZXcnLFxuICAgIHN1Ym1lbnU6IFtcbiAgICAgIHsgbGFiZWw6ICdGdWxsIFNjcmVlbicsIGNsaWNrOiAnZnVsbFNjcmVlbicgfSwgXG4gICAgICB7IGxhYmVsOiAnU2lkZSBCYXInLCBjbGljazogJ3NpZGVCYXInIH0sIFxuICAgICAgeyBsYWJlbDogJ0RldmVsb3BlciBUb29scycsIGNsaWNrOiAnZGV2ZWxvcGVyVG9vbHMnIH0sXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnWm9vbSBJbicsIGNsaWNrOiAnem9vbScgfSwgXG4gICAgICB7IGxhYmVsOiAnWm9vbSBPdXQnLCBjbGljazogJ3Vuem9vbScgfSwgXG4gICAgICB7IHR5cGU6ICdzZXBhcmF0b3InIH0sXG4gICAgICB7IGxhYmVsOiAnUGFnZSBNYXJnaW4nLCBjbGljazogJ3Nob3dNYXJnaW4nIH0sXG4gICAgICB7IGxhYmVsOiAnTnVtYmVyIG9mIFBhZ2VzIHBlciBSb3cnLFxuXHRzdWJtZW51OiBbXG5cdCAgeyBsYWJlbDogJzInLCBjbGljazogJ3JvdzEnIH0sXG5cdCAgeyBsYWJlbDogJzQnLCBjbGljazogJ3JvdzInIH0sXG5cdCAgeyBsYWJlbDogJzYnLCBjbGljazogJ3JvdzMnIH0sXG5cdCAgeyBsYWJlbDogJzgnLCBjbGljazogJ3JvdzQnIH0sXG5cdF0sXG4gICAgICB9XG4gICAgXSxcbiAgfSxcbiAgeyB0eXBlOiBcInNlcGFyYXRvclwiIH0sXG4gIHsgbGFiZWw6ICdTZXR0aW5ncyAuLi4nLCBjbGljazogJ3NldHRpbmdzJyB9LFxuICB7IGxhYmVsOiAnVGFibGV0IFNldHRpbmdzIC4uLicsIGNsaWNrOiAndGFibGV0U2V0dGluZ3MnIH0sXG4gIHsgbGFiZWw6ICdBYm91dCBOYW1lbm90ZSAuLi4nLCBjbGljazogJ2Fib3V0JyB9LFxuXVxuXG5jb25zdCBzaWRlYmFyTWVudVRlbXBsYXRlID0gW1xuICB7IGxhYmVsOiAn44K144Kk44OJ44OQ44O844Gu5L2N572uJyxcbiAgICBzdWJtZW51OiBbXG4gICAgICB7IGxhYmVsOiAn5bemJywgY2xpY2s6ICdkb2NrTGVmdCcgfSxcbiAgICAgIHsgbGFiZWw6ICflj7MnLCBjbGljazogJ2RvY2tSaWdodCcgfSxcbiAgICBdLFxuICB9LFxuXVxuXG5leHBvcnQgeyBtZW51VGVtcGxhdGUsIGZpbGVNZW51VGVtcGxhdGUsIHNpZGViYXJNZW51VGVtcGxhdGUgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBtZW51VGVtcGxhdGUgfSBmcm9tICcuL21lbnUtdGVtcGxhdGUuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcbmltcG9ydCB7IGh0bWxNZW51IH0gZnJvbSAnLi9odG1sLW1lbnUuZXM2J1xuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5cbmxldCB0ZW1wbGF0ZVxubGV0IHN0YXRlcyA9IHt9XG5cbmNvbnN0IGZpbmRTdWJtZW51ID0gKHRlbXBsYXRlLCBsYWJlbCkgPT4ge1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGVtcGxhdGUpIHtcbiAgICBpZiAoaXRlbS5sYWJlbCA9PSBsYWJlbCkge1xuICAgICAgcmV0dXJuIGl0ZW1cbiAgICB9XG4gICAgaWYgKGl0ZW0uc3VibWVudSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZFN1Ym1lbnUoaXRlbS5zdWJtZW51LCBsYWJlbClcbiAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuY29uc3Qgc2V0U3RhdGUgPSAodGVtcGxhdGUsIGxhYmVsLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpdGVtID0gZmluZFN1Ym1lbnUodGVtcGxhdGUsIGxhYmVsKVxuICBpZiAoaXRlbSkge1xuICAgIHZhbHVlID0gKHZhbHVlKSA/IHRydWUgOiBmYWxzZVxuXG4gICAgaXRlbS5lbmFibGVkID0gdmFsdWVcbiAgICBpZiAoaXRlbS5zdWJtZW51KSB7XG4gICAgICBpZiAoIXZhbHVlKSBkZWxldGUoaXRlbS5zdWJtZW51KVxuICAgIH1cbiAgICBzdGF0ZXNbbGFiZWxdID0gdmFsdWVcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIE1lbnUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy51cGRhdGUoKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRlbXBsYXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtZW51VGVtcGxhdGUpKVxuICAgIHN0YXRlcyA9IHt9XG4gICAgXG4gICAgdGhpcy51cGRhdGVSZWNlbnRzKHRlbXBsYXRlKVxuICAgIHRoaXMudXBkYXRlU3RhdGVzKHRlbXBsYXRlKVxuICAgIHRoaXMucmVidWlsZCh0ZW1wbGF0ZSlcbiAgfVxuXG4gIHJlYnVpbGQodGVtcGxhdGUpIHtcbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBuYW1lbm90ZS5hcHAucmVidWlsZE1lbnUodGVtcGxhdGUpXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUmVjZW50cyh0ZW1wbGF0ZSkge1xuICAgIGNvbnN0IHJlY2VudHMgPSBmaW5kU3VibWVudSh0ZW1wbGF0ZSwgJ09wZW4gUmVjZW50Jykuc3VibWVudVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNlbnRVUkwuZGF0YSkge1xuICAgICAgcmVjZW50cy5wdXNoKHtcbiAgICAgICAgbGFiZWw6IGl0ZW0sIGRhdGE6IGl0ZW0sIGNsaWNrOiAnb3BlblVSTCdcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU3RhdGVzKHRlbXBsYXRlKSB7XG4gICAgY29uc3QgaXNBcHAgPSAobmFtZW5vdGUuYXBwKSA/IHRydWUgOiBmYWxzZVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRnVsbCBTY3JlZW4nLCBpc0FwcCB8fCB3aW5kb3cuY2hyb21lKVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRGV2ZWxvcGVyIFRvb2xzJywgaXNBcHApXG4vLyAgc2V0U3RhdGUodGVtcGxhdGUsICdPcGVuIC4uLicsIGlzQXBwKVxuXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RNYW5hZ2VyLmN1cnJlbnRcbiAgICBjb25zdCBpc1Byb2plY3QgPSAocHJvamVjdCkgPyB0cnVlIDogZmFsc2VcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0Nsb3NlJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnQ2xvc2UgQWxsJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnU2F2ZSBTbmFwc2hvdCBBcyAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcudHh0IChQbGFpbiBUZXh0KSAuLi4nLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICcuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnLnBkZiAoUERGKSAuLi4nLCBpc1Byb2plY3QpXG4gICAgXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdBZGQnLCBpc1Byb2plY3QpXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdNb3ZlIHRvIEJ1ZmZlcicsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1B1dCBCYWNrIGZyb20gQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnRW1wdHkgQnVmZmVyJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSBGb3J3YXJkJywgaXNQcm9qZWN0KVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnTW92ZSBCYWNrd2FyZCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ0V4dHJhY3QgVGV4dCcsIGlzUHJvamVjdClcbiAgICBzZXRTdGF0ZSh0ZW1wbGF0ZSwgJ1NhdmUgSW1hZ2UgQXMgLi4uJywgaXNQcm9qZWN0KVxuXG4gICAgc2V0U3RhdGUodGVtcGxhdGUsICdVbmRvJywgaXNQcm9qZWN0KSAvLyAmJiBwcm9qZWN0Lmhpc3RvcnkuaGFzVW5kbygpKVxuICAgIHNldFN0YXRlKHRlbXBsYXRlLCAnUmVkbycsIGlzUHJvamVjdCkgLy8gJiYgcHJvamVjdC5oaXN0b3J5Lmhhc1JlZG8oKSlcbiAgfVxuXG4gIGdldFN0YXRlKGxhYmVsKSB7XG4gICAgcmV0dXJuIHN0YXRlc1tsYWJlbF1cbiAgfVxufVxuXG5jb25zdCBtZW51ID0gbmV3IE1lbnUoKVxuXG5leHBvcnQgeyBtZW51IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuXG5jb25zdCBoZWFkZXJJbWFnZSA9IHtcbiAgY29uZmlybTogJy4vaW1nL2NoZWNrZWQucG5nJyxcbiAgZXJyb3I6ICcuL2ltZy9leGNsYW1hdGlvbi1tYXJrLnBuZycsXG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgTWVzc2FnZUJveCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaWQgPSAnbWVzc2FnZS1ib3gnXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdChvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBidXR0b25zID0ge31cbiAgICAgIGJ1dHRvbnNbVChvcHRpb25zLm9rIHx8ICdPaycpXSA9IHJlc29sdmVcbiAgICAgIGlmIChvcHRpb25zLmNhbmNlbCkge1xuICAgICAgICBidXR0b25zW1Qob3B0aW9ucy5jYW5jZWwgfHwgJ0NhbmNlbCcpXSA9IHJlamVjdFxuICAgICAgfVxuICAgICAgXG4gICAgICBjb25zdCBzdHJpbmcgPSBsb2NhbGUudHJhbnNsYXRlSFRNTChgXG4gICAgICAgIDxkaXYgY2xhc3M9J21lc3NhZ2UtYm94Jz48cD5cbiAgICAgICAgICAke3RoaXMuZ2V0SGVhZGVyKG9wdGlvbnMpfVxuICAgICAgICAgICR7dGhpcy5nZXRNZXNzYWdlKG9wdGlvbnMpfVxuICAgICAgICA8L3A+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9J2RpYWxvZy1tZXNzYWdlJz48L2Rpdj5gKVxuICAgICAgXG4gICAgICAkKHRoaXMuZWxlbWVudCkuaHRtbChzdHJpbmcpXG4gICAgICAkKHRoaXMuZWxlbWVudCkuZGlhbG9nKHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBwb3NpdGlvbjogeyBteTonY2VudGVyIGNlbnRlcicsIGF0OidjZW50ZXIgY2VudGVyJyB9LFxuICAgICAgICB0aXRsZTogVChvcHRpb25zLnRpdGxlIHx8ICcnKSxcbiAgICAgICAgbW9kYWw6IHRydWUsXG4gICAgICAgIHdpZHRoOiBvcHRpb25zLndpZHRoIHx8IDM1MCxcbiAgICAgICAgYnV0dG9uczogYnV0dG9ucyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGdldE1lc3NhZ2Uob3B0aW9ucykge1xuICAgIHJldHVybiBUKG9wdGlvbnMubWVzc2FnZSkgfHwgJydcbiAgfVxuICBcbiAgZ2V0SGVhZGVyKG9wdGlvbnMpIHtcbiAgICBpZiAoaGVhZGVySW1hZ2Vbb3B0aW9ucy50eXBlXSkge1xuICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7aGVhZGVySW1hZ2Vbb3B0aW9ucy50eXBlXX1cIiB3aWR0aD1cIjQ4cHhcIiAvPjxicj48YnI+YFxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cbiAgfVxuXG4gIHNob3dQcm9ncmVzcyhtZXNzYWdlKSB7XG4gICAgY29uc3QgZGl2ID0gJCh0aGlzLmVsZW1lbnQpLmZpbmQoJy5kaWFsb2ctbWVzc2FnZScpXG4gICAgZGl2Lmh0bWwobWVzc2FnZSlcbiAgfVxufVxuXG5jb25zdCBtZXNzYWdlQm94ID0gbmV3IE1lc3NhZ2VCb3goKVxuXG5leHBvcnQgeyBtZXNzYWdlQm94IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZy5lczYnXG5pbXBvcnQgeyBzaG9ydGN1dCB9IGZyb20gJy4vc2hvcnRjdXQuZXM2J1xuaW1wb3J0IHsgcmVjZW50VVJMIH0gZnJvbSAnLi9yZWNlbnQtdXJsLmVzNidcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyB1aSB9IGZyb20gJy4vdWkuZXM2J1xuaW1wb3J0IHsgZmxhc2ggfSBmcm9tICcuL2ZsYXNoLmVzNidcblxuaW1wb3J0IHsgTWFpblZpZXcgfSBmcm9tICcuL21haW4tdmlldy5lczYnXG5pbXBvcnQgeyBQYWdlVmlldyB9IGZyb20gJy4vcGFnZS12aWV3LmVzNidcbmltcG9ydCB7IFRleHRWaWV3IH0gZnJvbSAnLi90ZXh0LXZpZXcuZXM2J1xuXG5pbXBvcnQgeyBwcm9qZWN0TWFuYWdlciB9IGZyb20gJy4vcHJvamVjdC1tYW5hZ2VyLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBOYW1lbm90ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyc2lvbiA9IFwiMi4wLjAtYWxwaGEuMy1kZWJ1Z1wiXG4gICAgdGhpcy50cmlhbCA9IGZhbHNlXG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ1xuICAgIHRoaXMuc2hvcnRjdXQgPSBzaG9ydGN1dFxuICAgIHRoaXMucmVjZW50VVJMID0gcmVjZW50VVJMXG4gICAgdGhpcy5jb21tYW5kID0gY29tbWFuZFxuICAgIHRoaXMudWkgPSB1aVxuICAgIHRoaXMucHJvamVjdE1hbmFnZXIgPSBwcm9qZWN0TWFuYWdlclxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25maWcubG9hZCgpXG4gICAgc2hvcnRjdXQubG9hZCgpXG4gICAgcmVjZW50VVJMLmxvYWQoKVxuXG4gICAgdWkuaW5pdCgpXG5cbiAgICB0aGlzLmluaXRCYXNlSGFuZGxlcnMoKVxuICAgIHRoaXMubWFpblZpZXcgPSBuZXcgTWFpblZpZXcoJCgnLm1haW4tdmlldycpWzBdKVxuICAgIHRoaXMucGFnZVZpZXcgPSBuZXcgUGFnZVZpZXcoJCgnLnBhZ2UtdmlldycpWzBdKVxuICAgIHRoaXMudGV4dFZpZXcgPSBuZXcgVGV4dFZpZXcoJCgnLnRleHQtdmlldycpWzBdKVxuXG4gICAgZmxhc2gubG9hZCgpXG4gIH1cblxuICBpbml0QmFzZUhhbmRsZXJzKCkge1xuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IChlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBMT0coJ29ucmVzaXplJyxcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCk7XG4gICAgICAgIHVpLnVwZGF0ZSgpXG4gICAgICB9LCAxMDApXG4gICAgfVxuXG4gICAgd2luZG93Lm9uY29udGV4dG1lbnUgPSAoZSkgPT4ge1xuICAgICAgTE9HKCdjb250ZXh0bWVudScpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpc01hYygpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLnBsYXRmb3JtLmluZGV4T2YoJ01hYycpXG4gIH1cbn1cblxuY29uc3QgbmFtZW5vdGUgPSBuZXcgTmFtZW5vdGUoKVxuXG5leHBvcnQgeyBuYW1lbm90ZSB9XG4gICAgXG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgbmFtZW5vdGUgfSBmcm9tICcuL25hbWVub3RlLmVzNidcbmltcG9ydCB7IGxvY2FsZSB9IGZyb20gJy4vbG9jYWxlLmVzNidcbmltcG9ydCB7IGRpYWxvZyB9IGZyb20gJy4vZGlhbG9nLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBPcGVuTmV3RGlhbG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZCA9ICdvcGVuLW5ldy1kaWFsb2cnXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9ucyA9IHt9XG4gICAgICBidXR0b25zW1QoJ09rJyldID0gcmVzb2x2ZVxuICAgICAgYnV0dG9uc1tUKCdDYW5jZWwnKV0gPSByZWplY3RcbiAgICAgIFxuICAgICAgY29uc3Qgc3RyaW5nID0gbG9jYWxlLnRyYW5zbGF0ZUhUTUwoYFxuICAgICAgICA8dGFibGU+XG4gICAgICAgICAgPHRyPjx0ZD5UKE5vdGVib29rIG5hbWUpOlxuICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPSduYW1lJyBjbGFzcz0nbmFtZScgdHlwZT0ndGV4dCcgdmFsdWU9JycgLz5cblx0ICBcbiAgICAgICAgICA8dHI+PHRkPlQoRm9sZGVyKTpcbiAgICAgICAgICAgIDx0ZD48aW5wdXQgbmFtZT0nZGlyJyBjbGFzcz0nZGlyJyB0eXBlPSd0ZXh0JyB2YWx1ZT0nJyBkaXNhYmxlZCAvPlxuXHQgICAgPGlucHV0IG5hbWU9J3JlZicgY2xhc3M9J3JlZicgdHlwZT0nYnV0dG9uJyB2YWx1ZT0nVChDaG9vc2UgZm9sZGVyLi4uKScgLz5cblxuICAgICAgICAgIDx0cj48dGQ+VChOdW1iZXIgb2YgcGFnZXMpOlxuICAgICAgICAgICAgPHRkPjxpbnB1dCBuYW1lPSdjb3VudCcgY2xhc3M9J2NvdW50JyB0eXBlPSd0ZXh0JyB2YWx1ZT04IC8+PGJyPlxuXG4gICAgICAgICAgPHRyPjx0ZCBzdHlsZT0naGVpZ2h0OiAxZW07Jz5cbiAgICAgICAgICA8dHI+PHRkPlQoVGVtcGxhdGUpOlxuXHQgICAgPHRkPjxzZWxlY3QgbmFtZT0ndG1wbCcgY2xhc3M9J3RtcGwnPlxuXHQgICAgICA8b3B0aW9uIHZhbHVlPSdNYW5nYSc+VChNYW5nYSk8L3NlbGVjdD5cblxuICAgICAgICAgIDx0cj48dGQ+VChCaW5kaW5nIHBvaW50KTpcbiAgICAgICAgICAgIDx0ZD48bGFiZWw+PGlucHV0IG5hbWU9J2JpbmQnIHR5cGU9J3JhZGlvJyB2YWx1ZT0wPlQoTGVmdCBiaW5kaW5nKTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IG5hbWU9J2JpbmQnIHR5cGU9J3JhZGlvJyBjaGVja2VkIHZhbHVlPTE+VChSaWdodCBiaW5kaW5nKTwvbGFiZWw+XG5cbiAgICAgICAgICA8dHI+PHRkPlQoU3RhcnQgcGFnZSk6XG4gICAgICAgICAgICA8dGQ+PGxhYmVsPjxpbnB1dCBuYW1lPSdzdGFydCcgdHlwZT0ncmFkaW8nIHZhbHVlPTAgY2hlY2tlZD5UKEZyb20gbGVmdCk8L2xhYmVsPlxuXHQgICAgPGxhYmVsPjxpbnB1dCBuYW1lPSdzdGFydCcgdHlwZT0ncmFkaW8nIHZhbHVlPTE+VChGcm9tIHJpZ2h0KTwvbGFiZWw+XG5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSdzdWJtaXQnIHN0eWxlPSdkaXNwbGF5OiBub25lJyAvPlxuICAgICAgICA8L3RhYmxlPmApXG4gICAgICBcbiAgICAgICQodGhpcy5lbGVtZW50KS5odG1sKGA8Zm9ybSBpZD0nb3Blbi1uZXcnPiR7c3RyaW5nfTwvZm9ybT5gKVxuICAgICAgJCh0aGlzLmVsZW1lbnQpLmRpYWxvZyh7XG4gICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcbiAgICAgICAgcG9zaXRpb246IHsgbXk6J2NlbnRlciBjZW50ZXInLCBhdDonY2VudGVyIGNlbnRlcicgfSxcbiAgICAgICAgdGl0bGU6IFQoJ05ldycpLFxuICAgICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IDU1MCxcbiAgICAgICAgYnV0dG9uczogYnV0dG9ucyxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHNhdmVQYXJhbXMoKSB7fVxufVxuXG5jb25zdCBvcGVuTmV3RGlhbG9nID0gbmV3IE9wZW5OZXdEaWFsb2coKVxuXG5leHBvcnQgeyBvcGVuTmV3RGlhbG9nIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAnLi92aWV3LmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQYWdlVmlldyBleHRlbmRzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudClcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgfVxufVxuXG5leHBvcnQgeyBQYWdlVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5waWQgPSAwXG4gIH1cblxuICBkZXN0cnVjdG9yKCkge1xuICAgIGxvZygncGFnZSBkZXN0cnVjdG9yJywgdGhpcy5waWQpXG4gIH1cbn1cblxuZXhwb3J0IHsgUGFnZSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4vcHJvamVjdC5lczYnXG5pbXBvcnQgeyByZWNlbnRVUkwgfSBmcm9tICcuL3JlY2VudC11cmwuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5pbXBvcnQgeyB0aXRsZSB9IGZyb20gJy4vdGl0bGUuZXM2J1xuaW1wb3J0IHsgdmlld0J1dHRvbiB9IGZyb20gJy4vdmlldy1idXR0b24uZXM2J1xuXG5pbXBvcnQgeyBtYWluVmlldyB9IGZyb20gJy4vbWFpbi12aWV3LmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0TWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvamVjdHMgPSBbXVxuICAgIHRoaXMuY3VycmVudCA9IG51bGxcbiAgfVxuXG4gIHNlbGVjdChwcm9qZWN0KSB7XG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgocHJvamVjdC51cmwpXG4gICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMucHJvamVjdHMucHVzaChwcm9qZWN0KVxuICAgICAgfVxuICAgICAgcmVjZW50VVJMLmFkZChwcm9qZWN0LnVybClcbiAgICB9XG4gICAgXG4gICAgdGhpcy5jdXJyZW50ID0gcHJvamVjdFxuICAgIG1haW5WaWV3LnNldFByb2plY3QocHJvamVjdClcbiAgICB0aXRsZS5zZXQocHJvamVjdCA/IHByb2plY3QubmFtZSgpIDogbnVsbClcblxuICAgIG1lbnUudXBkYXRlKClcbiAgICB2aWV3QnV0dG9uLnVwZGF0ZSgpXG4gIH1cblxuICBmaW5kSW5kZXgodXJsKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5wcm9qZWN0c1tpXS51cmwgPT0gdXJsKSB7XG4gICAgICAgIHJldHVybiBpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMVxuICB9XG4gIFxuICBvcGVuKHVybCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgodXJsKVxuICAgIGNvbnN0IHByb2plY3QgPSAoaW5kZXggPj0gMCkgPyB0aGlzLnByb2plY3RzW2luZGV4XSA6IG5ldyBQcm9qZWN0KHVybClcblxuICAgIHRoaXMuc2VsZWN0KHByb2plY3QpXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcm9qZWN0KVxuICB9XG4gIFxuICBjbG9zZShwcm9qZWN0KSB7XG4gICAgd2FybignW2Nsb3NlXScsIHByb2plY3QpXG4gICAgaWYgKCFwcm9qZWN0KSBwcm9qZWN0ID0gdGhpcy5jdXJyZW50XG4gICAgaWYgKCFwcm9qZWN0KSByZXR1cm5cblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgocHJvamVjdC51cmwpXG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHRoaXMucHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgaWYgKHByb2plY3QgPT0gdGhpcy5jdXJyZW50KSB7XG4gICAgICAgIHRoaXMuc2VsZWN0KHRoaXMucHJvamVjdHNbdGhpcy5wcm9qZWN0cy5sZW5ndGggLSAxXSlcbiAgICAgIH1cbiAgICAgIHByb2plY3QuZGVzdHJ1Y3RvcigpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHByb2plY3RNYW5hZ2VyID0gbmV3IFByb2plY3RNYW5hZ2VyXG5cbmV4cG9ydCB7IHByb2plY3RNYW5hZ2VyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAnLi9wYWdlLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgdGhpcy51cmwgPSB1cmwucmVwbGFjZSgvXFxcXC9nLCAnLycpXG5cbiAgICB0aGlzLnBhZ2VzID0gW11cbiAgICB0aGlzLmN1cnJlbnQgPSBudWxsXG4gIH1cblxuICBkZXN0cnVjdG9yKCkge1xuICAgIGxvZygncHJvamVjdCBkZXN0cnVjdG9yJywgdGhpcy51cmwpXG4gICAgXG4gICAgdGhpcy5wYWdlcy5mb3JFYWNoKHBhZ2UgPT4ge1xuICAgICAgcGFnZS5kZXN0cnVjdG9yKClcbiAgICB9KVxuICB9XG5cbiAgZmluZEluZGV4KHBhZ2UpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLnBhZ2VzW2ldLnBpZCA9PSBwYWdlLnBpZCkge1xuICAgICAgICByZXR1cm4gaVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIG5hbWUoKSB7XG4gICAgcmV0dXJuICh0aGlzLnVybCkgPyB0aGlzLnVybC5yZXBsYWNlKC9eLipcXC8vLCAnJykgOiBUKCdVbnRpdGxlZCcpXG4gIH1cbn1cblxuZXhwb3J0IHsgUHJvamVjdCB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgcHJvamVjdE1hbmFnZXIgfSBmcm9tICcuL3Byb2plY3QtbWFuYWdlci5lczYnXG5pbXBvcnQgeyBtZW51IH0gZnJvbSAnLi9tZW51LmVzNidcblxuY29uc3QgbWF4ID0gMTBcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBSZWNlbnRVUkwge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICB9XG5cbiAgbG9hZCgpIHtcbiAgICBjb25zdCBqc29uID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWVub3RlL3JlY2VudC11cmwnKVxuICAgIHRoaXMuZGF0YSA9IChqc29uKSA/IEpTT04ucGFyc2UoanNvbikgOiBbXVxuICB9XG5cbiAgc2F2ZSgpIHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lbm90ZS9yZWNlbnQtdXJsJywganNvbilcbiAgfVxuXG4gIHJlc2V0U3RvcmFnZSgpIHtcbiAgICB0aGlzLmRhdGEgPSBbXVxuICAgIHRoaXMuc2F2ZSgpXG5cbi8vICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBtZW51LnVwZGF0ZSgpXG4vLyAgfSwgNTAwKVxuICB9XG5cbiAgYWRkKHVybCkge1xuICAgIHRoaXMuZGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSAhPSB1cmwpXG4gICAgdGhpcy5kYXRhLnVuc2hpZnQodXJsKVxuXG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiBtYXgpIHtcbiAgICAgIHRoaXMuZGF0YS5sZW5ndGggPSBtYXhcbiAgICB9XG4gICAgdGhpcy5zYXZlKClcbiAgfVxufVxuXG5jb25zdCByZWNlbnRVUkwgPSBuZXcgUmVjZW50VVJMKClcblxuZXhwb3J0IHsgcmVjZW50VVJMIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBzaG9ydGN1dERlZmF1bHQgPSB7XG4gIHVuZG86IFsnY29tbWFuZCt6JywgJ2N0cmwreicsICdudW0vJywgJywnXSxcbiAgcmVkbzogWydjb21tYW5kK3knLCAnY3RybCt5JywgJ251bSonLCAnLiddLFxuICB6b29tOiBbJ1snLCAncScsICdudW1wbHVzJ10sXG4gIHVuem9vbTogWyddJywgJ2EnLCAnbnVtbWludXMnXSxcbiAgdG9nZ2xlVG9vbDogWyd4JywgJ251bS4nLCAnLyddLFxuXG4gIG9wZW5OZXdEaWFsb2c6IFsnY29tbWFuZCtuJywgJ2FsdCtuJ10sXG4gIG9wZW5EaWFsb2c6IFsnY29tbWFuZCtvJywgJ2FsdCtvJ10sXG4gIFxuICBjbG9zZTogWydjb21tYW5kK3cnLCAnYWx0K3cnXSxcbiAgcXVpdDogWydjb21tYW5kK3EnLCAnYWx0K3EnXSxcbiAgcmVsb2FkOiBbJ2NvbW1hbmQrc2hpZnQrciddLFxuXG4gIGV4cG9ydENTTkZEaWFsb2c6IFsnY29tbWFuZCtwJywgJ2FsdCtwJ10sXG4gIGV4cG9ydFBERkRpYWxvZzogWydjb21tYW5kK3NoaWZ0K3AnLCAnYWx0K3NoaWZ0K3AnXSxcbiAgaW1wb3J0VGV4dERpYWxvZzogWydjb21tYW5kK3NoaWZ0K2knLCAnYWx0K3NoaWZ0K2knXSxcbiAgc2F2ZVBhZ2VJbWFnZTogWydjb21tYW5kKy0nLCAnYWx0Ky0nXSxcbiAgZXh0cmFjdFRleHQ6IFsnY29tbWFuZCt0JywgJ2FsdCt0J10sXG5cbiAgLy9tYXJnaW5TZXR0aW5nc0RpYWxvZzogWydjb21tYW5kK3NoaWZ0K2knLCAnYWx0K3NoaWZ0K2knXSxcbiAgXG4gIHBhZ2VMZWZ0OiAnbGVmdCcsXG4gIHBhZ2VSaWdodDogJ3JpZ2h0JyxcbiAgcGFnZVVwOiAndXAnLCAgICAgIFxuICBwYWdlRG93bjogJ2Rvd24nLCAgXG5cbiAgc2VsZWN0QWxsOiAnY3RybCthJyxcbiAgdW5zZWxlY3Q6ICdjdHJsK2QnLFxuICBtZXJnZVRleHQ6ICdjdHJsK2UnLFxuICBcbiAgc2lkZUJhcjogJzEnLFxuICBkZXZlbG9wZXJUb29sczogJ2NvbW1hbmQrYWx0K2onLFxuICB0b29sQmFyOiAnY29tbWFuZCthbHQraCcsXG5cbiAgcGVuOiAncCcsXG4gIGVyYXNlcjogJ2UnLFxuICB0ZXh0OiAndCcsXG5cbiAgLy9cbiAgLy8gUGFnZSBzaG9ydGN1dHNcbiAgLy9cbiAgXG4gIGluc2VydFBhZ2U6ICdzaGlmdCtpJyxcbiAgZHVwbGljYXRlUGFnZTogJ3NoaWZ0K2QnLFxuXG4gIHNob3dNYXJnaW46ICdyJyxcbi8vZmxpcFBhZ2U6ICdoJyxcbiAgYXBwZW5kUGFnZTogJ3NoaWZ0K2EnLFxuICBjdXRQYWdlOiAnc2hpZnQraycsXG4gIHBhc3RlUGFnZTogJ3NoaWZ0K3knLFxuICBlbXB0eVBhZ2U6ICdzaGlmdCswJyxcbiAgbW92ZVBhZ2VMZWZ0OiAnPCcsXG4gIG1vdmVQYWdlUmlnaHQ6ICc+JyxcbiAgcm93MTogJ3NoaWZ0KzEnLFxuICByb3cyOiAnc2hpZnQrMicsXG4gIHJvdzM6ICdzaGlmdCszJyxcbiAgcm93NDogJ3NoaWZ0KzQnLFxuXG4gIC8vXG4gIC8vIFRleHQgc2hvcnRjdXRzIChjYW4gYmUgdXNlZCB3aGlsZSB0ZXh0IGVkaXRpbmcpXG4gIC8vXG4gIFxuICB0b2dnbGVFZGl0TW9kZTogJ2N0cmwrZycsXG4gIGFkZEZvbnRTaXplOiAnY3RybCsuJyxcbiAgc3VidHJhY3RGb250U2l6ZTogJ2N0cmwrLCcsXG4gIHRvZ2dsZURpcmVjdGlvbjogJ2N0cmwrXScsXG4gIGN1dFRleHQ6ICdiYWNrc3BhY2UnLFxuICBuZXh0VGV4dDogJ3RhYicsXG4gIHByZXZUZXh0OiAnc2hpZnQrdGFiJyxcbn1cblxuZXhwb3J0IHsgc2hvcnRjdXREZWZhdWx0IH1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vL2ltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5pbXBvcnQgeyBzaG9ydGN1dERlZmF1bHQgfSBmcm9tICcuL3Nob3J0Y3V0LWRlZmF1bHQuZXM2J1xuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5cbi8qXG5pbXBvcnQgeyBUZXh0IH0gZnJvbSAnLi90ZXh0LmVzNidcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuZXM2J1xuKi9cblxuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuXG5jbGFzcyBTaG9ydGN1dCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZGF0YSA9IFtdXG5cbiAgICBNb3VzZXRyYXAuYWRkS2V5Y29kZXMoe1xuICAgICAgMTA3OiAnbnVtcGx1cycsXG4gICAgICAxMDk6ICdudW1taW51cycsXG4gICAgICAxMTA6ICdudW0uJyxcbiAgICAgIDExMTogJ251bS8nLFxuICAgICAgMTA2OiAnbnVtKicsXG4gICAgfSlcblxuICAgIE1vdXNldHJhcC5wcm90b3R5cGUuc3RvcENhbGxiYWNrID0gZnVuY3Rpb24oZSwgZWxlbWVudCwgY29tYm8pIHtcbi8qXG4gICAgICBpZiAoVGV4dC5pc0VkaXRhYmxlKGVsZW1lbnQpKSB7XG4gICAgICAgIExPRygna2V5Y29kZT0nLCBlLmtleUNvZGUsIGUpXG5cblx0aWYgKGUuY3RybEtleSAmJiAhZS5zaGlmdEtleSAmJiAhZS5tZXRhS2V5KSB7XG5cdCAgc3dpdGNoIChlLmtleUNvZGUpIHtcblx0ICBjYXNlIDcxOiAgLy8gY3RybCtnXG5cdCAgY2FzZSAxODg6IC8vIGN0cmwrLFxuXHQgIGNhc2UgMTkwOiAvLyBjdHJsKy5cblx0ICBjYXNlIDIyMTogLy8gY3RybCtdXG5cdCAgICByZXR1cm4gZmFsc2Vcblx0ICB9XG5cdH1cblxuXHRpZiAoZS5rZXlDb2RlID09IDkpIHsgLy8gVEFCXG5cdCAgcmV0dXJuIGZhbHNlXG5cdH1cblx0cmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZVxuKi9cbiAgICB9XG4gIH1cblxuICBsb2FkKCkge1xuICAgIGNvbnN0IGpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZW5vdGUvc2hvcnRjdXQnKVxuICAgIHRoaXMuZGF0YSA9IGpzb24gPyBKU09OLnBhcnNlKGpzb24pIDogT2JqZWN0LmFzc2lnbih7fSwgc2hvcnRjdXREZWZhdWx0KVxuICAgIHRoaXMuYmluZCgpXG4gIH1cblxuICBzYXZlKCkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWVub3RlL3Nob3J0Y3V0JywganNvbilcbiAgfVxuICBcbiAgcmVzZXRTdG9yYWdlKCkge1xuICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIHNob3J0Y3V0RGVmYXVsdClcbiAgICB0aGlzLnNhdmUoKVxuXG4gICAgTW91c2V0cmFwLnJlc2V0KClcbiAgICB0aGlzLmJpbmQoKVxuICB9XG5cbiAgYmluZCgpIHtcbiAgICBmb3IgKGxldCBpdGVtIGluIHRoaXMuZGF0YSkge1xuICAgICAgY29uc3Qga2V5ID0gdGhpcy5kYXRhW2l0ZW1dXG4gICAgICBjb25zdCBoYW5kbGVyID0gY29tbWFuZFtpdGVtXVxuXG4gICAgICBpZiAoaXRlbSA9PSAnZGV2ZWxvcGVyVG9vbHMnKSBjb250aW51ZVxuXG4gICAgICBpZiAoaGFuZGxlcikge1xuXHRMT0coYCcke2l0ZW19YClcbiAgICAgICAgXG5cdE1vdXNldHJhcC5iaW5kKGtleSwgKGUpID0+IHtcblx0ICBjb21tYW5kLnByZXYgPSBjb21tYW5kLmN1cnJlbnRcblx0ICBjb21tYW5kLmN1cnJlbnQgPSBpdGVtXG5cbiAgICAgICAgICBpZiAoIWRpYWxvZy5pc09wZW4oKSkge1xuXHQgICAgTE9HKGAqJHtpdGVtfSpgKVxuICAgICAgICAgICAgaGFuZGxlcigpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuLy9cdCAgaGFuZGxlcigpXG4vL1x0ICByZXR1cm4gKGRpYWxvZy5pc09wZW4oKSkgPyB0cnVlIDogZmFsc2VcblxuXHR9LCAna2V5ZG93bicpXG5cbiAgICAgIH0gZWxzZSB7XG5cdExPRyhgJyR7aXRlbX0nOiBubyBzdWNoIGNvbW1hbmRgKVxuICAgICAgfVxuICAgIH1cblxuLy8gIE1vdXNldHJhcC5iaW5kKCdzcGFjZScsIChlKSA9PiB7XG4vLyAgICBDb250cm9sbGVyLmNsZWFyTW92ZSgpXG4vLyAgICByZXR1cm4gZmFsc2U7XG4vLyAgfSlcblxuLy8gIE1vdXNldHJhcC5iaW5kKCdlbnRlcicsIChlKSA9PiB7XG4vLyAgICBpZiAoZGlhbG9nLmlzT3BlbigpKSByZXR1cm4gdHJ1ZVxuLy8gICAgY29tbWFuZC5xdWlja1pvb20oKVxuLy8gICAgcmV0dXJuIGZhbHNlXG4vLyAgfSlcblxuLy8gIE1vdXNldHJhcC5iaW5kKCdzcGFjZScsIChlKSA9PiB7XG4vLyAgICBpZiAoIUNvbnRyb2xsZXIuaXNNb3ZlZCgpKSB7XG4vL1x0Y29tbWFuZC5xdWlja1pvb20oKTtcbi8vICAgIH1cbi8vICAgIHJldHVybiBmYWxzZTtcbi8vICB9LCAna2V5dXAnKVxuICB9XG59XG5cbmNvbnN0IHNob3J0Y3V0ID0gbmV3IFNob3J0Y3V0KClcblxuZXhwb3J0IHsgc2hvcnRjdXQgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IGNvbW1hbmQgfSBmcm9tICcuL2NvbW1hbmQuZXM2J1xuXG5sZXQgcGFnZUJ1dHRvblxubGV0IHRleHRCdXR0b25cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBTaWRlQmFyVGFiIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5idXR0b25zID0gW11cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgcGFnZUJ1dHRvbiA9ICQoJyNwYWdlLXZpZXctYnV0dG9uJykudGV4dEJ1dHRvbih7XG4gICAgICB0ZXh0OiBUKCdQYWdlcycpLFxuICAgICAgbG9ja2VkOiB0cnVlLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnRleHRCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICBjb21tYW5kLnNob3dQYWdlVmlldygpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVswXVxuXG4gICAgdGV4dEJ1dHRvbiA9ICQoJyN0ZXh0LXZpZXctYnV0dG9uJykudGV4dEJ1dHRvbih7XG4gICAgICB0ZXh0OiBUKCdUZXh0cycpLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLnRleHRCdXR0b24oJ2luc3RhbmNlJykpIHtcbiAgICAgICAgICBjb21tYW5kLnNob3dUZXh0VmlldygpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICB9KVswXVxuXG4gICAgdGhpcy5idXR0b25zLnB1c2gocGFnZUJ1dHRvbiwgdGV4dEJ1dHRvbilcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgfVxuXG4gIHNlbGVjdChuYW1lKSB7XG4gICAgZm9yIChjb25zdCBidXR0b24gb2YgdGhpcy5idXR0b25zKSB7XG4gICAgICBjb25zdCBsb2NrZWQgPSAkKGJ1dHRvbikudGV4dEJ1dHRvbignbG9ja2VkJylcblxuICAgICAgaWYgKGJ1dHRvbiAmJiBidXR0b24uaWQuaW5kZXhPZihuYW1lKSA9PSAwKSB7XG4gICAgICAgIGlmICghbG9ja2VkKSB7XG4gICAgICAgICAgJChidXR0b24pLnRleHRCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikudGV4dEJ1dHRvbignbG9ja2VkJywgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2lkZUJhclRhYiA9IG5ldyBTaWRlQmFyVGFiKClcblxuZXhwb3J0IHsgc2lkZUJhclRhYiB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgc2lkZUJhclRhYiB9IGZyb20gJy4vc2lkZS1iYXItdGFiLmVzNidcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBTaWRlQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHNpZGVCYXJUYWIuaW5pdCgpXG4gIH1cbiAgXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIHNpZGVCYXJUYWIudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCBzaWRlQmFyID0gbmV3IFNpZGVCYXIoKVxuXG5leHBvcnQgeyBzaWRlQmFyIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgbG9jYWxlIH0gZnJvbSAnLi9sb2NhbGUuZXM2J1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuXG5jb25zdCB3aWR0aCA9IDIwMFxuY29uc3QgZCA9IDE1XG5cbmZ1bmN0aW9uIGRlY29kZVBvc2l0aW9uKHN0cmluZykge1xuICBjb25zdCBhcnJheSA9IHN0cmluZy5zcGxpdCgnLCcpXG4gIGNvbnN0IHggPSBwYXJzZUZsb2F0KGFycmF5WzBdIHx8IDApXG4gIGNvbnN0IHkgPSBwYXJzZUZsb2F0KGFycmF5WzFdIHx8IDApXG4gIHJldHVybiB7IGxlZnQ6KHggKiB3aWR0aCkgLSBkLCB0b3A6KCgxLjAgLSB5KSAqIHdpZHRoKSAtIGQgfVxufVxuXG5mdW5jdGlvbiBlbmNvZGVQb3NpdGlvbihpZCkge1xuICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG4gIGNvbnN0IHggPSAocGFyc2VGbG9hdChlLnN0eWxlLmxlZnQgfHwgMCkgKyBkKSAvIHdpZHRoXG4gIGNvbnN0IHkgPSAocGFyc2VGbG9hdChlLnN0eWxlLnRvcCB8fCAwKSArIGQpIC8gd2lkdGhcbiAgcmV0dXJuIGAke3h9LCR7MS4wIC0geX1gXG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVGFibGV0U2V0dGluZ3NEaWFsb2cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlkID0gJ3RhYmxldC1zZXR0aW5ncy1kaWFsb2cnXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYnV0dG9ucyA9IHt9XG4gICAgICBidXR0b25zW1QoJ09rJyldID0gcmVzb2x2ZVxuICAgICAgYnV0dG9uc1tUKCdDYW5jZWwnKV0gPSByZWplY3RcblxuICAgICAgY29uc3Qgc3RyaW5nID0gbG9jYWxlLnRyYW5zbGF0ZUhUTUwoYFxuICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6MzAwcHg7IGhlaWdodDoyNTBweDsgZm9udC1zaXplOjEycHg7XCI+XG4gICAgICAgICAgPGRpdiBpZD1cInRhYmxldC1jdXJ2ZS1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxjYW52YXMgaWQ9XCJ0YWJsZXQtY3VydmVcIiB3aWR0aD1cIiR7d2lkdGh9cHhcIiBoZWlnaHQ9XCIke3dpZHRofXB4XCIgc3R5bGU9XCJ3aWR0aDoke3dpZHRofXB4OyBoZWlnaHQ6JHt3aWR0aH1weDsgYm9yZGVyOiAxcHggc29saWQgYmxhY2tcIj48L2NhbnZhcz5cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cInRvcDotMTVweDsgbGVmdDotMjA1cHg7IHdpZHRoOiAyMDBweDsgdGV4dC1hbGlnbjpyaWdodDtcIj4xMDAlPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwidG9wOjg1cHg7IGxlZnQ6LTIwNXB4OyB3aWR0aDogMjAwcHg7IHRleHQtYWxpZ246cmlnaHQ7XCI+VChPdXRwdXQpPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwidG9wOjE4NXB4OyBsZWZ0Oi0yMDVweDsgd2lkdGg6IDIwMHB4OyB0ZXh0LWFsaWduOnJpZ2h0O1wiPjAlPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJsZWZ0OjBweDsgdG9wOjIwMHB4O1wiPjAlPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwibGVmdDoxMDBweDsgdG9wOjIwMHB4O1wiPlQoUGVuIHByZXNzdXJlKTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6MjAwcHg7IHRvcDoyMDBweDtcIj4xMDAlPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXBvaW50XCIgaWQ9XCJ0YWJsZXQtY3VydmUtbGVmdFwiPjxkaXY+PC9kaXY+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1wb2ludFwiIGlkPVwidGFibGV0LWN1cnZlLXJpZ2h0XCI+PGRpdj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXBvaW50XCIgaWQ9XCJ0YWJsZXQtY3VydmUtY2VudGVyXCI+PGRpdj48L2Rpdj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxpbnB1dCB0eXBlPSdzdWJtaXQnIHN0eWxlPSdkaXNwbGF5OiBub25lJyAvPlxuICAgICAgICA8aW5wdXQgbmFtZT0ncmVzZXQnIGNsYXNzPSdyZXNldCcgdHlwZT0nYnV0dG9uJyB2YWx1ZT0nVChSZXNldCBTZXR0aW5ncyB0byBEZWZhdWx0KScgLz5gKVxuICAgICAgXG4gICAgICAkKHRoaXMuZWxlbWVudCkuaHRtbChgPGZvcm0gaWQ9J3RhYmxldC1zZXR0aW5ncyc+JHtzdHJpbmd9PC9mb3JtPmApXG4gICAgICAkKHRoaXMuZWxlbWVudCkuZGlhbG9nKHtcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxuICAgICAgICBwb3NpdGlvbjogeyBteTonY2VudGVyIGNlbnRlcicsIGF0OidjZW50ZXIgY2VudGVyJyB9LFxuICAgICAgICB0aXRsZTogVCgnVGFibGV0IFNldHRpbmdzJyksXG4gICAgICAgIG1vZGFsOiB0cnVlLFxuICAgICAgICB3aWR0aDogMzYwLFxuICAgICAgICBidXR0b25zOiBidXR0b25zLFxuICAgICAgICBvcGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbjpudGgtY2hpbGQoMSknKS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSlcbiAgfVxuXG4gIHNhdmVQYXJhbXMoKSB7fVxufVxuXG5jb25zdCB0YWJsZXRTZXR0aW5nc0RpYWxvZyA9IG5ldyBUYWJsZXRTZXR0aW5nc0RpYWxvZygpXG5cbmV4cG9ydCB7IHRhYmxldFNldHRpbmdzRGlhbG9nIH1cblxuLypcbmNvbnN0IHRhYmxldFNldHRpbmdzRGlhbG9nID0ge1xuICBcbiAgaW5pdDogKCkgPT4ge1xuICAgICQoJyN0YWJsZXQtc2V0dGluZ3MtZGlhbG9nJykuZGlhbG9nKHtcbiAgICAgIGF1dG9PcGVuOiB0cnVlLFxuICAgICAgcG9zaXRpb246IHsgYXQ6J2NlbnRlciB0b3ArMTUwcHgnIH0sXG4gICAgICB0aXRsZTogVCgnVGFibGV0IFNldHRpbmdzJyksXG4gICAgICBtb2RhbDogdHJ1ZSxcbiAgICAgIHdpZHRoOiAzNjAsXG4gICAgICBidXR0b25zOiB7IE9rOiB0YWJsZXRTZXR0aW5nc0RpYWxvZy5vaywgQ2FuY2VsOiB0YWJsZXRTZXR0aW5nc0RpYWxvZy5jYW5jZWwgfSxcbiAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2J1dHRvbjpudGgtY2hpbGQoMSknKS5mb2N1cygpO1xuICAgICAgfVxubyAgICB9KVxuXG4gICAgY29uc3Qgc3RyaW5nID0gbG9jYWxlLnRyYW5zbGF0ZUhUTUwoYFxuICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDozMDBweDsgaGVpZ2h0OjI1MHB4OyBmb250LXNpemU6MTJweDtcIj5cbiAgICAgIDxkaXYgaWQ9XCJ0YWJsZXQtY3VydmUtY29udGFpbmVyXCI+XG4gICAgICAgIDxjYW52YXMgaWQ9XCJ0YWJsZXQtY3VydmVcIiB3aWR0aD1cIiR7d2lkdGh9cHhcIiBoZWlnaHQ9XCIke3dpZHRofXB4XCIgc3R5bGU9XCJ3aWR0aDoke3dpZHRofXB4OyBoZWlnaHQ6JHt3aWR0aH1weDsgYm9yZGVyOiAxcHggc29saWQgYmxhY2tcIj48L2NhbnZhcz5cblxuICAgICAgICA8ZGl2IHN0eWxlPVwidG9wOi0xNXB4OyBsZWZ0Oi0yMDVweDsgd2lkdGg6IDIwMHB4OyB0ZXh0LWFsaWduOnJpZ2h0O1wiPjEwMCU8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cInRvcDo4NXB4OyBsZWZ0Oi0yMDVweDsgd2lkdGg6IDIwMHB4OyB0ZXh0LWFsaWduOnJpZ2h0O1wiPlQoT3V0cHV0KTwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPVwidG9wOjE4NXB4OyBsZWZ0Oi0yMDVweDsgd2lkdGg6IDIwMHB4OyB0ZXh0LWFsaWduOnJpZ2h0O1wiPjAlPC9kaXY+XG5cbiAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6MHB4OyB0b3A6MjAwcHg7XCI+MCU8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6MTAwcHg7IHRvcDoyMDBweDtcIj5UKFBlbiBwcmVzc3VyZSk8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImxlZnQ6MjAwcHg7IHRvcDoyMDBweDtcIj4xMDAlPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtcG9pbnRcIiBpZD1cInRhYmxldC1jdXJ2ZS1sZWZ0XCIgc3R5bGU9XCJsZWZ0OjEwMHB4OyB0b3A6LTEwcHhcIj48ZGl2PjwvZGl2PjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC1wb2ludFwiIGlkPVwidGFibGV0LWN1cnZlLXJpZ2h0XCIgc3R5bGU9XCJsZWZ0OjIwMHB4OyB0b3A6LTIwcHg7XCI+PGRpdj48L2Rpdj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtcG9pbnRcIiBpZD1cInRhYmxldC1jdXJ2ZS1jZW50ZXJcIiBzdHlsZT1cImxlZnQ6MHB4OyB0b3A6MHB4XCI+PGRpdj48L2Rpdj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbnB1dCB0eXBlPSdzdWJtaXQnIHN0eWxlPSdkaXNwbGF5OiBub25lJyAvPlxuICAgIDxpbnB1dCBuYW1lPSdyZXNldCcgY2xhc3M9J3Jlc2V0JyB0eXBlPSdidXR0b24nIHZhbHVlPSdUKFJlc2V0IFNldHRpbmdzIHRvIERlZmF1bHQpJyAvPlxuICAgIGApXG5cbiAgICAkKCcjdGFibGV0LXNldHRpbmdzLWRpYWxvZycpLmh0bWwoYDxmb3JtIGlkPSd0YWJsZXQnPiR7c3RyaW5nfTwvZm9ybT5gKVxuICAgICQoJyN0YWJsZXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oKSB7IHJldHVybiB0YWJsZXRTZXR0aW5nc0RpYWxvZy5vaygpIH0pXG4gICAgZG9jdW1lbnQuZm9ybXNbJ3RhYmxldCddLnJlc2V0Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICB0YWJsZXRTZXR0aW5nc0RpYWxvZy5yZXNldFNldHRpbmdzKClcbiAgICB9XG4gICAgXG4gICAgJCgnI3RhYmxldC1jdXJ2ZS1sZWZ0JykuZHJhZ2dhYmxlKHtcbiAgICAgIGF4aXM6IFwieVwiLFxuICAgICAgZHJhZzogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgIHVpLnBvc2l0aW9uLnRvcCA9IGhlbHBlci5saW1pdCh1aS5wb3NpdGlvbi50b3AsIC0gZCwgd2lkdGggLSBkKVxuICAgICAgICB0YWJsZXRTZXR0aW5nc0RpYWxvZy51cGRhdGVDYW52YXMoKVxuICAgICAgfVxuICAgIH0pXG4gICAgJCgnI3RhYmxldC1jdXJ2ZS1yaWdodCcpLmRyYWdnYWJsZSh7XG4gICAgICBheGlzOiBcInlcIixcbiAgICAgIGRyYWc6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgICAgICB1aS5wb3NpdGlvbi50b3AgPSBoZWxwZXIubGltaXQodWkucG9zaXRpb24udG9wLCAtZCwgd2lkdGggLSBkKVxuICAgICAgICB0YWJsZXRTZXR0aW5nc0RpYWxvZy51cGRhdGVDYW52YXMoKVxuICAgICAgfVxuICAgIH0pXG4gICAgJCgnI3RhYmxldC1jdXJ2ZS1jZW50ZXInKS5kcmFnZ2FibGUoe1xuICAgICAgZHJhZzogZnVuY3Rpb24oZXZlbnQsIHVpKSB7XG4gICAgICAgIHVpLnBvc2l0aW9uLnRvcCA9IGhlbHBlci5saW1pdCh1aS5wb3NpdGlvbi50b3AsIC1kLCB3aWR0aCAtIGQpXG4gICAgICAgIHVpLnBvc2l0aW9uLmxlZnQgPSBoZWxwZXIubGltaXQodWkucG9zaXRpb24ubGVmdCwgLWQsIHdpZHRoIC0gZClcbiAgICAgICAgdGFibGV0U2V0dGluZ3NEaWFsb2cudXBkYXRlQ2FudmFzKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGFibGV0U2V0dGluZ3NEaWFsb2cuaW5pdEZvcm0oKVxuICB9LFxuXG4gIG9rOiAoKSA9PiB7XG4gICAgY29uc3QgY3VydmVMZWZ0ID0gZW5jb2RlUG9zaXRpb24oJ3RhYmxldC1jdXJ2ZS1sZWZ0JylcbiAgICBjb25zdCBjdXJ2ZVJpZ2h0ID0gZW5jb2RlUG9zaXRpb24oJ3RhYmxldC1jdXJ2ZS1yaWdodCcpXG4gICAgY29uc3QgY3VydmVDZW50ZXIgPSBlbmNvZGVQb3NpdGlvbigndGFibGV0LWN1cnZlLWNlbnRlcicpXG4gICAgY29uZmlnLmRhdGEudGFibGV0Q3VydmVMZWZ0ID0gY3VydmVMZWZ0XG4gICAgY29uZmlnLmRhdGEudGFibGV0Q3VydmVSaWdodCA9IGN1cnZlUmlnaHRcbiAgICBjb25maWcuZGF0YS50YWJsZXRDdXJ2ZUNlbnRlciA9IGN1cnZlQ2VudGVyXG4gICAgY29uZmlnLnNhdmUoKVxuXG4gICAgY29uZmlnLnByZWNhbGN1bGF0ZVByZXNzdXJlKCk7XG4gICAgXG4gICAgaGVscGVyLmNsb3NlRGlhbG9nKHRhYmxldFNldHRpbmdzRGlhbG9nKVxuICAgIC8vJCh0YWJsZXRTZXR0aW5nc0RpYWxvZy5lbGVtZW50KS5kaWFsb2coJ2Nsb3NlJylcbiAgICByZXR1cm4gZmFsc2VcbiAgfSxcblxuICBjYW5jZWw6ICgpID0+IHtcbiAgICBoZWxwZXIuY2xvc2VEaWFsb2codGFibGV0U2V0dGluZ3NEaWFsb2cpXG4gICAgLy8kKHRhYmxldFNldHRpbmdzRGlhbG9nLmVsZW1lbnQpLmRpYWxvZygnY2xvc2UnKVxuICB9LFxuXG4gIGluaXRGb3JtOiAoKSA9PiB7XG4gICAgY29uc3QgY3VydmVMZWZ0ID0gY29uZmlnLmdldFZhbHVlKCd0YWJsZXRDdXJ2ZUxlZnQnLCAnMCwwJylcbiAgICBjb25zdCBjdXJ2ZVJpZ2h0ID0gY29uZmlnLmdldFZhbHVlKCd0YWJsZXRDdXJ2ZVJpZ2h0JywgJzEsMScpXG4gICAgY29uc3QgY3VydmVDZW50ZXIgPSBjb25maWcuZ2V0VmFsdWUoJ3RhYmxldEN1cnZlQ2VudGVyJywgJzAuNSwwLjUnKVxuICAgICQoJyN0YWJsZXQtY3VydmUtbGVmdCcpLmNzcyhkZWNvZGVQb3NpdGlvbihjdXJ2ZUxlZnQpKVxuICAgICQoJyN0YWJsZXQtY3VydmUtcmlnaHQnKS5jc3MoZGVjb2RlUG9zaXRpb24oY3VydmVSaWdodCkpXG4gICAgJCgnI3RhYmxldC1jdXJ2ZS1jZW50ZXInKS5jc3MoZGVjb2RlUG9zaXRpb24oY3VydmVDZW50ZXIpKVxuICAgIHRhYmxldFNldHRpbmdzRGlhbG9nLnVwZGF0ZUNhbnZhcygpXG4gIH0sXG5cbiAgcmVzZXRTZXR0aW5nczogKCkgPT4ge1xuICAgIGNvbmZpZy5kYXRhLnRhYmxldEN1cnZlTGVmdCA9ICcwLDAnXG4gICAgY29uZmlnLmRhdGEudGFibGV0Q3VydmVSaWdodCA9ICcxLDEnXG4gICAgY29uZmlnLmRhdGEudGFibGV0Q3VydmVDZW50ZXIgPSAnMC41LDAuNSdcbiAgICBjb25maWcuc2F2ZSgpXG4gICAgXG4gICAgdGFibGV0U2V0dGluZ3NEaWFsb2cuaW5pdEZvcm0oKVxuICB9LFxuICBcbiAgc2hvdzogKCkgPT4ge1xuICAgIGhlbHBlci5vcGVuRGlhbG9nKHRhYmxldFNldHRpbmdzRGlhbG9nKVxuICB9LFxuXG4gIHVwZGF0ZUNhbnZhczogKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9ICQoJyN0YWJsZXQtY3VydmUnKVswXVxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBjb25zdCBsZWZ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxldC1jdXJ2ZS1sZWZ0JylcbiAgICBjb25zdCByaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZXQtY3VydmUtcmlnaHQnKVxuICAgIGNvbnN0IGNlbnRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZXQtY3VydmUtY2VudGVyJylcbiAgICBjb25zdCB4MCA9IHBhcnNlRmxvYXQobGVmdC5zdHlsZS5sZWZ0KSArIGRcbiAgICBjb25zdCB5MCA9IHBhcnNlRmxvYXQobGVmdC5zdHlsZS50b3ApICsgZFxuICAgIGNvbnN0IHgxID0gcGFyc2VGbG9hdChjZW50ZXIuc3R5bGUubGVmdCkgKyBkXG4gICAgY29uc3QgeTEgPSBwYXJzZUZsb2F0KGNlbnRlci5zdHlsZS50b3ApICsgZFxuICAgIGNvbnN0IHgyID0gcGFyc2VGbG9hdChyaWdodC5zdHlsZS5sZWZ0KSArIGRcbiAgICBjb25zdCB5MiA9IHBhcnNlRmxvYXQocmlnaHQuc3R5bGUudG9wKSArIGRcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgd2lkdGgsIHdpZHRoKVxuICAgIGN0eC5saW5lV2lkdGggPSAxXG5cbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2NjYydcbiAgICBjdHgubW92ZVRvKHgwLCB5MClcbiAgICBjdHgubGluZVRvKHgxLCB5MSlcbiAgICBjdHgubGluZVRvKHgyLCB5MilcbiAgICBjdHguc3Ryb2tlKClcbiAgICBcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnYmxhY2snXG4gICAgY3R4Lm1vdmVUbyh4MCwgeTApXG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeDEsIHkxLCB4MiwgeTIpXG4gICAgY3R4LnN0cm9rZSgpXG4gIH0sXG59XG5cblxuZXhwb3J0IHsgdGFibGV0U2V0dGluZ3NEaWFsb2cgfVxuKi9cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBuYW1lbm90ZSB9IGZyb20gJy4vbmFtZW5vdGUuZXM2J1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4vdmlldy5lczYnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVGV4dFZpZXcgZXh0ZW5kcyBWaWV3IHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQoKSB7XG4gIH1cbn1cblxuZXhwb3J0IHsgVGV4dFZpZXcgfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IG5hbWVub3RlIH0gZnJvbSAnLi9uYW1lbm90ZS5lczYnXG5cbmNsYXNzIFRpdGxlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldCgpXG4gIH1cbiAgXG4gIHNldCh0aXRsZSkge1xuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHRpdGxlID0gKG5hbWVub3RlLnRyaWFsKSA/IGAke1QoJ05hbWVub3RlJyl9ICR7VCgnVHJpYWwnKX1gIDogVCgnTmFtZW5vdGUnKVxuICAgIH1cbiAgICBpZiAobmFtZW5vdGUuYXBwKSB7XG4gICAgICBuYW1lbm90ZS5hcHAuc2V0VGl0bGUodGl0bGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGVcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgdGl0bGUgPSBuZXcgVGl0bGUoKVxuXG5leHBvcnQgeyB0aXRsZSB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuaW1wb3J0IHsgdmlld0J1dHRvbiB9IGZyb20gJy4vdmlldy1idXR0b24uZXM2J1xuaW1wb3J0IHsgaGlzdG9yeUJ1dHRvbiB9IGZyb20gJy4vaGlzdG9yeS1idXR0b24uZXM2J1xuaW1wb3J0IHsgdG9vbEJ1dHRvbiB9IGZyb20gJy4vdG9vbC1idXR0b24uZXM2J1xuaW1wb3J0IHsgbWVudUJ1dHRvbiB9IGZyb20gJy4vbWVudS1idXR0b24uZXM2J1xuXG5jbGFzcyBUb29sQmFyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHZpZXdCdXR0b24uaW5pdCgpXG4gICAgaGlzdG9yeUJ1dHRvbi5pbml0KClcbiAgICB0b29sQnV0dG9uLmluaXQoKVxuICAgIG1lbnVCdXR0b24uaW5pdCgpXG5cbiAgICB0aGlzLnVwZGF0ZSgpXG4gICAgdGhpcy51cGRhdGVCdXR0b25zKClcbiAgfVxuICBcbiAgdXBkYXRlQnV0dG9ucygpIHtcbiAgICB2aWV3QnV0dG9uLnVwZGF0ZSgpXG4gICAgaGlzdG9yeUJ1dHRvbi51cGRhdGUoKVxuICAgIHRvb2xCdXR0b24udXBkYXRlKClcbiAgICBtZW51QnV0dG9uLnVwZGF0ZSgpXG4gIH1cbiAgXG4gIHVwZGF0ZSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHZhbHVlID0gY29uZmlnLmRhdGEudG9vbEJhclxuICAgIGNvbmZpZy5kYXRhLnRvb2xCYXIgPSB2YWx1ZVxuICAgIGNvbmZpZy5zYXZlKClcblxuICAgICQoJyN0b29sYmFyJykuY3NzKCdkaXNwbGF5JywgdmFsdWUgPyAnYmxvY2snIDogJ25vbmUnKVxuICAgICQoJyNtYWluJykuY3NzKCdoZWlnaHQnLCB2YWx1ZSA/ICdjYWxjKDEwMCUgLSAzN3B4KScgOiAnMTAwJScpXG4gICAgJCgnI21haW4nKS5jc3MoJ3RvcCcsIHZhbHVlID8gJzM3cHgnIDogJzAnKVxuXG4gICAgLy9WaWV3Lm9uUmVzaXplKClcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZSghY29uZmlnLmRhdGEudG9vbEJhcilcbiAgfVxufVxuXG5jb25zdCB0b29sQmFyID0gbmV3IFRvb2xCYXIoKTtcblxuZXhwb3J0IHsgdG9vbEJhciB9XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgY29tbWFuZCB9IGZyb20gJy4vY29tbWFuZC5lczYnXG5pbXBvcnQgeyBodG1sRHJvcGRvd24gfSBmcm9tICcuL2h0bWwtZHJvcGRvd24uZXM2J1xuXG5sZXQgcGVuQnV0dG9uXG5sZXQgZXJhc2VyQnV0dG9uXG5sZXQgdGV4dEJ1dHRvblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmNsYXNzIFRvb2xCdXR0b24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXVxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBwZW5CdXR0b24gPSAkKCcjcGVuLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9wZW4tYnV0dG9uLnBuZycsXG4gICAgICBsb2NrZWQ6IHRydWUsXG4gICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmltYWdlQnV0dG9uKCdpbnN0YW5jZScpKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3QoJ3BlbicpXG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGNvbnRlbnQ6IGh0bWxEcm9wZG93bi5tYWtlKCdwZW5Ecm9wRG93bicsICdwZW4nKVxuICAgIH0pWzBdXG4gICAgXG4gICAgZXJhc2VyQnV0dG9uID0gJCgnI2VyYXNlci1idXR0b24nKS5pbWFnZUJ1dHRvbih7XG4gICAgICBzcmM6ICdpbWcvZXJhc2VyLWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KCdlcmFzZXInKVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBjb250ZW50OiBodG1sRHJvcGRvd24ubWFrZSgnZXJhc2VyRHJvcERvd24nLCAnZXJhc2VyJylcbiAgICB9KVswXVxuXG4gICAgdGV4dEJ1dHRvbiA9ICQoJyN0ZXh0LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy90ZXh0LWJ1dHRvbi5wbmcnLFxuICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5pbWFnZUJ1dHRvbignaW5zdGFuY2UnKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0KCd0ZXh0JylcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgY29udGVudDogaHRtbERyb3Bkb3duLm1ha2UoJ3RleHREcm9wRG93bicsICd0ZXh0JylcbiAgICB9KVswXVxuXG4gICAgdGhpcy5idXR0b25zLnB1c2gocGVuQnV0dG9uLCBlcmFzZXJCdXR0b24sIHRleHRCdXR0b24pXG4gIH1cblxuICB1cGRhdGUoKSB7XG4gIH1cblxuICBzZWxlY3QobmFtZSkge1xuICAgIGZvciAoY29uc3QgYnV0dG9uIG9mIHRoaXMuYnV0dG9ucykge1xuICAgICAgY29uc3QgbG9ja2VkID0gJChidXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnKVxuICAgICAgXG4gICAgICBpZiAoYnV0dG9uICYmIGJ1dHRvbi5pZC5pbmRleE9mKG5hbWUpID09IDApIHtcbiAgICAgICAgaWYgKCFsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsb2NrZWQpIHtcbiAgICAgICAgICAkKGJ1dHRvbikuaW1hZ2VCdXR0b24oJ2xvY2tlZCcsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHRvb2xCdXR0b24gPSBuZXcgVG9vbEJ1dHRvbigpXG5cbmV4cG9ydCB7IHRvb2xCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHdpZGdldCB9IGZyb20gJy4vd2lkZ2V0LmVzNidcbmltcG9ydCB7IGRpdmlkZXIgfSBmcm9tICcuL2RpdmlkZXIuZXM2J1xuaW1wb3J0IHsgZGlhbG9nIH0gZnJvbSAnLi9kaWFsb2cuZXM2J1xuaW1wb3J0IHsgbWVudSB9IGZyb20gJy4vbWVudS5lczYnXG5pbXBvcnQgeyB0aXRsZSB9IGZyb20gJy4vdGl0bGUuZXM2J1xuXG5pbXBvcnQgeyB0b29sQmFyIH0gZnJvbSAnLi90b29sLWJhci5lczYnXG5pbXBvcnQgeyBzaWRlQmFyIH0gZnJvbSAnLi9zaWRlLWJhci5lczYnXG5cbmNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tZW51ID0gbWVudVxuICAgIHRoaXMuZGl2aWRlciA9IGRpdmlkZXJcbiAgICB0aGlzLmRpYWxvZyA9IGRpYWxvZ1xuXG4gICAgdGhpcy50b29sQmFyID0gdG9vbEJhclxuICAgIHRoaXMuc2lkZUJhciA9IHNpZGVCYXJcbiAgfVxuICBcbiAgaW5pdCgpIHtcbiAgICBtZW51LmluaXQoKVxuICAgIHRpdGxlLmluaXQoKVxuICAgIGRpdmlkZXIuaW5pdCgpXG4gICAgZGlhbG9nLmluaXQoKVxuXG4gICAgdG9vbEJhci5pbml0KClcbiAgICBzaWRlQmFyLmluaXQoKVxuXG4gICAgJCgnLnNwbGl0LXBhbmUnKS5jc3MoJ29wYWNpdHknLCAxKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIFdBUk4oJ1t1aSB1cGRhdGVdJylcbiAgICBkaXZpZGVyLnVwZGF0ZSgpXG4gICAgXG4vLyAgdG9vbEJhci51cGRhdGUoKVxuLy8gIHNpZGVCYXIudXBkYXRlKClcblxuLy8gIGRpdmlkZXIudXBkYXRlKClcbiAgfVxufVxuXG5jb25zdCB1aSA9IG5ldyBVSSgpXG5cbmV4cG9ydCB7IHVpIH1cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgeyBjb21tYW5kIH0gZnJvbSAnLi9jb21tYW5kLmVzNidcbmltcG9ydCB7IHByb2plY3RNYW5hZ2VyIH0gZnJvbSAnLi9wcm9qZWN0LW1hbmFnZXIuZXM2J1xuaW1wb3J0IHsgY29uZmlnIH0gZnJvbSAnLi9jb25maWcuZXM2J1xuXG5sZXQgcXVpY2tab29tQnV0dG9uXG5sZXQgem9vbUJ1dHRvblxubGV0IHVuem9vbUJ1dHRvblxubGV0IHNwbGl0QnV0dG9uXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVmlld0J1dHRvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBxdWlja1pvb21CdXR0b24gPSAkKCcjcm93LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy9tYWduaWZpZXItYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQucXVpY2tab29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICB6b29tQnV0dG9uID0gJCgnI3pvb20tYnV0dG9uJykuaW1hZ2VCdXR0b24oe1xuICAgICAgc3JjOiAnaW1nL3pvb20tYnV0dG9uLnBuZycsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC56b29tKCkgfVxuICAgIH0pWzBdXG5cbiAgICB1bnpvb21CdXR0b24gPSAkKCcjdW56b29tLWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy91bnpvb20tYnV0dG9uLnBuZycsXG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGZsb2F0OiAncmlnaHQnLFxuICAgICAgY2xpY2s6IGZ1bmN0aW9uKGUpIHsgY29tbWFuZC51bnpvb20oKSB9XG4gICAgfSlbMF1cblxuICAgIHNwbGl0QnV0dG9uID0gJCgnI3NwbGl0LWJ1dHRvbicpLmltYWdlQnV0dG9uKHtcbiAgICAgIHNyYzogJ2ltZy91bnpvb20tYnV0dG9uLnBuZycsXG4gICAgICBmbG9hdDogJ3JpZ2h0JyxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbihlKSB7IGNvbW1hbmQuc2lkZUJhcigpIH1cbiAgICB9KVswXVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0TWFuYWdlci5jdXJyZW50XG4gICAgY29uc3QgcXVpY2tab29tID0gcHJvamVjdCAvLyhwcm9qZWN0KSA/IHByb2plY3Qudmlldy5xdWlja1pvb20gOiBmYWxzZVxuICAgIFxuICAgICQoem9vbUJ1dHRvbikuaW1hZ2VCdXR0b24oJ2Rpc2FibGVkJywgIXByb2plY3QpXG4gICAgJCh1bnpvb21CdXR0b24pLmltYWdlQnV0dG9uKCdkaXNhYmxlZCcsICFwcm9qZWN0KVxuICAgICQocXVpY2tab29tQnV0dG9uKS5pbWFnZUJ1dHRvbignZGlzYWJsZWQnLCAhcHJvamVjdClcblxuICAgICQocXVpY2tab29tQnV0dG9uKS5pbWFnZUJ1dHRvbignbG9ja2VkJywgcXVpY2tab29tKVxuICAgICQoc3BsaXRCdXR0b24pLmltYWdlQnV0dG9uKCdsb2NrZWQnLCBjb25maWcuZGF0YS5zaWRlQmFyKVxuICB9XG59XG5cbmNvbnN0IHZpZXdCdXR0b24gPSBuZXcgVmlld0J1dHRvbigpXG5cbmV4cG9ydCB7IHZpZXdCdXR0b24gfVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5wcmV2ZW50U2Nyb2xsRnJlZXplKClcbiAgfVxuXG4gIHByZXZlbnRTY3JvbGxGcmVlemUoKSB7XG4gICAgdGhpcy5sYXN0WCA9IDBcbiAgICB0aGlzLmxhc3RZID0gMFxuXG4gICAgY29uc3Qgc2Nyb2xsZXIgPSAkKHRoaXMuZWxlbWVudCkucGFyZW50KClcbiAgICBzY3JvbGxlci5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHRoaXMubGFzdFggPSBlLnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgdGhpcy5sYXN0WSA9IGUudG91Y2hlc1swXS5jbGllbnRZXG4gICAgfS5iaW5kKHRoaXMpKVxuICAgIFxuICAgIHNjcm9sbGVyLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBjb25zdCB4ID0gZS50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgIGNvbnN0IHkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuXG4gICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aFxuICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodFxuXG4gICAgICBjb25zdCBzY3JvbGxUb3AgPSAkKGUuY3VycmVudFRhcmdldCkuc2Nyb2xsVG9wKClcbiAgICAgIGNvbnN0IHNjcm9sbExlZnQgPSAkKGUuY3VycmVudFRhcmdldCkuc2Nyb2xsTGVmdCgpXG4gICAgICBjb25zdCBkaXJZID0gKHRoaXMubGFzdFkgLSB5KSA8IDAgPyAndXAnOiAnZG93bidcbiAgICAgIGNvbnN0IGRpclggPSAodGhpcy5sYXN0WCAtIHgpIDwgMCA/ICdsZWZ0JzogJ3JpZ2h0J1xuXG4gICAgICBpZiAoc2Nyb2xsVG9wID09PSAwKSB7XG4gICAgICAgIGlmIChkaXJZID09PSBcInVwXCIpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgfSBlbHNlIGlmIChzY3JvbGxUb3AgPj0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbEhlaWdodCAtIGhlaWdodCkge1xuICAgICAgICBpZiAoZGlyWSA9PT0gXCJkb3duXCIpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChzY3JvbGxMZWZ0ID09PSAwKSB7XG4gICAgICAgIGlmIChkaXJYID09PSBcImxlZnRcIikgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB9IGVsc2UgaWYgKHNjcm9sbExlZnQgPj0gZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFdpZHRoIC0gd2lkdGgpIHtcbiAgICAgICAgaWYgKGRpclggPT09IFwicmlnaHRcIikgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0WCA9IHg7XG4gICAgICB0aGlzLmxhc3RZID0geTtcbiAgICB9LmJpbmQodGhpcykpXG4gIH1cbn1cblxuZXhwb3J0IHsgVmlldyB9XG4iLCIndXNlIHN0cmljdCdcblxuY2xhc3MgV2lkZ2V0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0SW1hZ2VCdXR0b24oKVxuICAgIHRoaXMuaW5pdFRleHRCdXR0b24oKVxuICB9XG5cbiAgaW5pdFRleHRCdXR0b24oKSB7XG4gICAgJC53aWRnZXQoJ25hbWVub3RlLnRleHRCdXR0b24nLCB7XG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICAgIGhlaWdodDogJzI0cHgnLFxuICAgICAgICBsb2NrZWQ6IGZhbHNlLFxuICAgICAgfSxcblxuICAgICAgX2NyZWF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRDbGFzcygndGV4dC1idXR0b24nKVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCdmbG9hdCcsIHRoaXMub3B0aW9ucy5mbG9hdClcbiAgICAgICAgdGhpcy5sb2NrZWQodGhpcy5vcHRpb25zLmxvY2tlZClcbiAgICAgICAgdGhpcy5lbGVtZW50LnRleHQodGhpcy5vcHRpb25zLnRleHQpXG5cbiAgICAgICAgY29uc3QgY2xpY2sgPSB0aGlzLm9wdGlvbnMuY2xpY2tcbiAgICAgICAgaWYgKGNsaWNrKSB0aGlzLmVsZW1lbnQub24oJ2NsaWNrJywgY2xpY2spXG4gICAgICB9LFxuXG4gICAgICBsb2NrZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5vcHRpb25zLmxvY2tlZFxuXG4gICAgICAgIHRoaXMub3B0aW9ucy5sb2NrZWQgPSB2YWx1ZVxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ2xvY2tlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pXG4gIH1cbiAgXG4gIGluaXRJbWFnZUJ1dHRvbigpIHtcbiAgICAkLndpZGdldCgnbmFtZW5vdGUuaW1hZ2VCdXR0b24nLCB7XG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICAgIHdpZHRoOiAnMjhweCcsXG4gICAgICAgIGhlaWdodDogJzI4cHgnLFxuICAgICAgICBsb2NrZWQ6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICBcbiAgICAgIF9jcmVhdGU6IGZ1bmN0aW9uKCkge1xuLy8gICAgICB0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ2ltZy1idXR0b24nKVxuLy8gICAgICB0aGlzLmVsZW1lbnQuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgke3RoaXMub3B0aW9ucy5zcmN9KWApXG4vLyAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2JhY2tncm91bmQnLCAnI2VlZmZkZCcpXG4gICAgICAgIHRoaXMuZWxlbWVudC5jc3MoJ2Zsb2F0JywgdGhpcy5vcHRpb25zLmZsb2F0KVxuICAgICAgICB0aGlzLmVsZW1lbnQuY3NzKCd3aWR0aCcsIHRoaXMub3B0aW9ucy53aWR0aClcbiAgICAgICAgdGhpcy5lbGVtZW50LmNzcygnaGVpZ2h0JywgdGhpcy5vcHRpb25zLmhlaWdodClcblxuICAgICAgICB0aGlzLmVsZW1lbnQuYXR0cigndGl0bGUnLCBUKHRoaXMuZWxlbWVudC5hdHRyKCd0aXRsZScpKSlcblxuICAgICAgICB0aGlzLmVsZW1lbnQuaHRtbChgPGltZyBzcmM9JyR7dGhpcy5vcHRpb25zLnNyY30nIC8+YClcbi8vICAgICAgV0FSTih0aGlzLmVsZW1lbnQuaHRtbCgpKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5sb2NrZWQodGhpcy5vcHRpb25zLmxvY2tlZClcbiAgICAgICAgdGhpcy5kaXNhYmxlZCh0aGlzLm9wdGlvbnMuZGlzYWJsZWQpXG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNvbnRlbnQpIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgICBjb250ZW50LnRpdGxlID0gXCJcIlxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuZmxvYXQgPT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgY29udGVudC5zdHlsZS5yaWdodCA9IFwiMFwiXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMub3B0aW9ucy5jb250ZW50UGFyZW50IHx8IHRoaXMuZWxlbWVudFswXVxuICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChjb250ZW50KVxuICAgICAgICAgIFxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY29udGVudFBhcmVudCkge1xuICAgICAgICAgICAgLy8gU2hvdWxkIHJlY2FsYyBtZW51IHBvc3Rpb24gb24gb3BlblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsaWNrID0gdGhpcy5vcHRpb25zLmNsaWNrXG4gICAgICAgIGlmIChjbGljaykgdGhpcy5lbGVtZW50Lm9uKCdjbGljaycsIGNsaWNrKVxuICAgICAgfSxcblxuICAgICAgbG9ja2VkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9ucy5sb2NrZWRcblxuICAgICAgICB0aGlzLm9wdGlvbnMubG9ja2VkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdsb2NrZWQnKVxuICAgICAgICB9IGVsc2Uge1xuXHQgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnbG9ja2VkJylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgZGlzYWJsZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5vcHRpb25zLmRpc2FibGVkXG4gICAgICBcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc2FibGVkID0gdmFsdWVcbiAgICAgICAgaWYgKHZhbHVlKSB7XG5cdCAgdGhpcy5lbGVtZW50LmFkZENsYXNzKCdvZmYnKVxuICAgICAgICB9IGVsc2Uge1xuXHQgIHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnb2ZmJylcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlQ29udGVudFBvc2l0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMuZWxlbWVudFswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBjb25zdCBjb250ZW50ID0gdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICAgICAgY29uc3QgY29udGVudFdpZHRoID0gdGhpcy5vcHRpb25zLmNvbnRlbnRXaWR0aCB8fCAxNTBcblxuICAgICAgICBjb25zdCB3aWR0aCA9IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGhcbiAgICAgICAgY29uc3QgbGVmdCA9IChyZWN0LnggKyBjb250ZW50V2lkdGgpIDwgd2lkdGggPyByZWN0LnggOiB3aWR0aCAtIGNvbnRlbnRXaWR0aFxuICAgICAgICBjb250ZW50LnN0eWxlLmxlZnQgPSAobGVmdCAtIDIpICsgJ3B4J1xuICAgICAgICBjb250ZW50LnN0eWxlLnRvcCA9ICg2NCArIDIpICsgJ3B4J1xuICAgICAgfSxcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IHdpZGdldCA9IG5ldyBXaWRnZXQoKVxuXG5leHBvcnQgeyB3aWRnZXQgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBkaWN0aW9uYXJ5ID0ge1xuICBcImphXCI6IHtcbiAgICBcIk5hbWVub3RlXCI6IFwiTmFtZW5vdGVcIixcbiAgICBcIkFib3V0IE5hbWVub3RlXCI6IFwiTmFtZW5vdGUg44Gr44Gk44GE44GmXCIsXG4gICAgXCJBYm91dCBOYW1lbm90ZSAuLi5cIjogXCJOYW1lbm90ZSDjgavjgaTjgYTjgaYgLi4uXCIsXG4gICAgXCJIZWxwXCI6IFwi44OY44Or44OXXCIsXG4gICAgXCJTZXR0aW5nc1wiOiBcIueSsOWig+ioreWumlwiLFxuICAgIFwiU2V0dGluZ3MgLi4uXCI6IFwi55Kw5aKD6Kit5a6aIC4uLlwiLFxuICAgIFwiVGFibGV0IFNldHRpbmdzXCI6IFwi562G5Zyn6Kq/5pW0XCIsXG4gICAgXCJUYWJsZXQgU2V0dGluZ3MgLi4uXCI6IFwi562G5Zyn6Kq/5pW0IC4uLlwiLFxuICAgIFwiUXVpdCBOYW1lbm90ZVwiOiBcIk5hbWVub3RlIOOCkue1guS6hlwiLFxuICAgIFwiTm90ZVwiOiBcIuODjuODvOODiFwiLFxuICAgIFwiRmlsZVwiOiBcIuODleOCoeOCpOODq1wiLFxuICAgIFwiT3BlbiAuLi5cIjogXCLplovjgY8gLi4uXCIsXG4gICAgXCJPcGVuXCI6IFwi44OO44O844OI44KS6ZaL44GPXCIsXG4gICAgXCJOZXcgLi4uXCI6IFwi5paw6KaPIC4uLlwiLFxuICAgIFwiTmV3XCI6IFwi5paw6KaP44OO44O844OIXCIsXG4gICAgXCJDbG9zZVwiOiBcIumWieOBmOOCi1wiLFxuICAgIFwiQ2xvc2UgQWxsXCI6IFwi44GZ44G544Gm44KS6ZaJ44GY44KLXCIsXG4gICAgXCJOb3RlIFNldHRpbmdzIC4uLlwiOiBcIuODjuODvOODiOioreWumiAuLi5cIixcbiAgICBcIkV4cG9ydFwiOiBcIuabuOOBjeWHuuOBl1wiLFxuICAgIFwiSW1wb3J0XCI6IFwi6Kqt44G/6L6844G/XCIsXG4gICAgXCIuY3NuZiAoQ0xJUCBTVFVESU8gU3Rvcnlib2FyZCkgLi4uXCI6IFwiLmNzbmYgKENMSVAgU1RVRElPIOODjeODvOODoOODleOCoeOCpOODqykgLi4uXCIsXG4gICAgXCIucGRmIChQREYpIC4uLlwiOiBcIi5wZGYgKFBERikgLi4uXCIsXG4gICAgXCIudHh0IChQbGFpbiBUZXh0KSAuLi5cIjogXCIudHh0ICjjg4bjgq3jgrnjg4jjg5XjgqHjgqTjg6spIC4uLlwiLFxuICAgIFwiU2F2ZVwiOiBcIuS/neWtmFwiLFxuICAgIFwiU2F2ZSBBcyAuLi5cIjogXCLlkI3liY3jgpLjgaTjgZHjgabkv53lrZggLi4uXCIsXG4gICAgXCJTYXZlIEFzXCI6IFwi5ZCN5YmN44KS44Gk44GR44Gm5L+d5a2YXCIsXG4gICAgXCJTYXZlIFNuYXBzaG90IEFzIC4uLlwiOiBcIuODkOODg+OCr+OCouODg+ODl+OCkuS/neWtmCAuLi5cIixcbiAgICBcIkVkaXRcIjogXCLnt6jpm4ZcIixcbiAgICBcIlVuZG9cIjogXCLlj5bjgormtojjgZdcIixcbiAgICBcIlJlZG9cIjogXCLjgoTjgornm7TjgZdcIixcbiAgICBcIkN1dFwiOiBcIuWIh+OCiuWPluOCilwiLFxuICAgIFwiQ29weVwiOiBcIuOCs+ODlOODvFwiLFxuICAgIFwiUGFzdGVcIjogXCLosrzjgorku5jjgZFcIixcbiAgICBcIlNlbGVjdCBBbGxcIjogXCLjgZnjgbnjgabjgpLpgbjmip5cIixcblxuICAgIFwiUGFnZVwiOiBcIuODmuODvOOCuFwiLFxuICAgIFwiQWRkXCI6IFwi6L+95YqgXCIsXG4gICAgXCJNb3ZlIHRvIEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOBq+WFpeOCjOOCi1wiLFxuICAgIFwiUHV0IEJhY2sgZnJvbSBCdWZmZXJcIjogXCLjg5Djg4Pjg5XjgqHjgYvjgonmiLvjgZlcIixcbiAgICBcIkVtcHR5IEJ1ZmZlclwiOiBcIuODkOODg+ODleOCoeOCkuepuuOBq+OBmeOCi1wiLFxuICAgIFwiRHVwbGljYXRlXCI6IFwi6KSH6KO944KS6L+95YqgXCIsXG4gICAgXCJNb3ZlIEZvcndhcmRcIjogXCLliY3jgavnp7vli5VcIixcbiAgICBcIk1vdmUgQmFja3dhcmRcIjogXCLlvozjgo3jgavnp7vli5VcIixcbiAgICBcIkZsaXBcIjogXCLlt6blj7Plj43ou6LjgZfjgabooajnpLpcIixcbiAgICBcIlNhdmUgSW1hZ2UgQXMgLi4uXCI6IFwi44Kk44Oh44O844K444KS5L+d5a2YIC4uLlwiLFxuICAgIFwiU2F2ZSBJbWFnZVwiOiBcIuOCpOODoeODvOOCuOOCkuS/neWtmFwiLFxuICAgIFxuICAgIFwiVW50aXRsZWRcIjogXCLlkI3np7DmnKroqK3lrppcIixcbiAgICBcIlZpZXdcIjogXCLooajnpLpcIixcbiAgICBcIlRvb2wgQmFyXCI6IFwi44OE44O844Or44OQ44O8XCIsXG4gICAgXCJTaWRlIEJhclwiOiBcIuOCteOCpOODieODkOODvFwiLFxuICAgIFwiRGV2ZWxvcGVyIFRvb2xzXCI6IFwi44OH44OZ44Ot44OD44OR44O8IOODhOODvOODq1wiLFxuICAgIFwiRnVsbCBTY3JlZW5cIjogXCLjg5Xjg6vjgrnjgq/jg6rjg7zjg7NcIixcbiAgICBcIlBhZ2UgTWFyZ2luXCI6IFwi5L2Z55m9XCIsXG4gICAgXCJOdW1iZXIgb2YgUGFnZXMgcGVyIFJvd1wiOiBcIjHooYzjgYLjgZ/jgorjga7jg5rjg7zjgrjmlbBcIixcbiAgICBcbiAgICBcIldpbmRvd1wiOiBcIuOCpuOCo+ODs+ODieOCplwiLFxuICAgIFwiRXh0cmFjdCBUZXh0XCI6IFwi44OG44Kt44K544OI44KS5oq95Ye6XCIsXG4gICAgXCJPcGVuIFJlY2VudFwiOiBcIuacgOi/keS9v+eUqOOBl+OBn+ODjuODvOODiOOCkumWi+OBj1wiLFxuICAgIFwiQ2xlYXIgUmVjZW50IE5vdGUgTGlzdFwiOiBcIuacgOi/keS9v+eUqOOBl+OBn+ODjuODvOODiOOBruODquOCueODiOOCkua2iOWOu1wiLFxuICAgIFwiVW50aXRsZWRcIjogXCLlkI3np7DmnKroqK3lrppcIixcbiAgICBcIk1ha2luZyBDU05GIC4uLlwiOiBcIkNTTkbjg5XjgqHjgqTjg6vjgpLkvZzmiJDkuK0gLi4uXCIsXG4gICAgXCJPbmxpbmUgU3RvcmFnZVwiOiBcIuOCquODs+ODqeOCpOODs+OCueODiOODrOODvOOCuFwiLFxuXG4gICAgXCJOYW1lbm90ZSB3b3VsZCBsaWtlIGFjY2VzcyB0byB0aGUgZmlsZXMgaW4geW91ciBEcm9wYm94LlwiOiBcIk5hbWVub3RlIOOBryBEcm9wYm94IOOBq+ODh+ODvOOCv+OCkuS/neWtmOOBl+OBvuOBmeOAgjxicj7mjqXntprjgZfjgb7jgZnjgYvvvJ9cIixcbiAgICBcIkF1dGhlbnRpY2F0ZVwiOiBcIuiqjeiovFwiLFxuICAgIFwiQ29ubmVjdCB0byBEcm9wYm94XCI6IFwiRHJvcGJveCDjgavmjqXntppcIixcbiAgICBcIkNhbmNlbFwiOiBcIuOCreODo+ODs+OCu+ODq1wiLFxuICAgIFwiQ29ubmVjdGluZyAuLi5cIjogXCLmjqXntprkuK0gLi4uXCIsXG4gICAgXG4gICAgXCJUZXh0c1wiOiBcIuODhuOCreOCueODiFwiLFxuXG4gICAgXCJTaWRlIEJhciBQb3NpdGlvblwiOiBcIuOCteOCpOODieODkOODvOOBruS9jee9rlwiLFxuICAgIFwiTGVmdFwiOiBcIuW3plwiLFxuICAgIFwiUmlnaHRcIjogXCLlj7NcIixcbiAgICBcbiAgICBcIlNcIjogXCLlsI9cIixcbiAgICBcIk1cIjogXCLkuK1cIixcbiAgICBcIkxcIjogXCLlpKdcIixcbiAgICBcIlByZXNzdXJlXCI6IFwi562G5ZynXCIsXG4gICAgXCJWZXJ0aWNhbFwiOiBcIue4puabuOOBjVwiLFxuICAgIFwiSG9yaXpvbnRhbFwiOiBcIuaoquabuOOBjVwiLFxuXG4gICAgXCJOZXcgbm90ZWJvb2tcIjogXCLmlrDopo/jg47jg7zjg4hcIixcbiAgICBcIk5vdGVib29rIG5hbWVcIjogXCLjg47jg7zjg4jlkI1cIixcbiAgICBcIkZvbGRlclwiOiBcIuS/neWtmOWFiFwiLFxuICAgIFwiQ2hvb3NlIGZvbGRlci4uLlwiOiBcIuWPgueFpy4uLlwiLFxuICAgIFwiTnVtYmVyIG9mIHBhZ2VzXCI6IFwi44Oa44O844K45pWwXCIsXG4gICAgXCJUZW1wbGF0ZVwiOiBcIuODhuODs+ODl+ODrOODvOODiFwiLFxuICAgIFwiTWFuZ2FcIjogXCLmvKvnlLtcIixcbiAgICBcIkJpbmRpbmcgcG9pbnRcIjogXCLntrTjgZjjgovkvY3nva5cIixcbiAgICBcIkxlZnQgYmluZGluZ1wiOiBcIuW3pue2tOOBmOOAgFwiLFxuICAgIFwiUmlnaHQgYmluZGluZ1wiOiBcIuWPs+e2tOOBmOOAgFwiLFxuICAgIFwiU3RhcnQgcGFnZVwiOiBcIumWi+Wni+ODmuODvOOCuFwiLFxuICAgIFwiRnJvbSBsZWZ0XCI6IFwi5bem44Oa44O844K4XCIsXG4gICAgXCJGcm9tIHJpZ2h0XCI6IFwi5Y+z44Oa44O844K4XCIsXG4gICAgXCJQYWdlc1wiOiBcIuODmuODvOOCuFwiLFxuICAgIFwiQWxsXCI6IFwi44GZ44G544GmXCIsXG4gICAgXCJDdXJyZW50IHBhZ2VcIjogXCLpgbjmip7jgZXjgozjgZ/jg5rjg7zjgrhcIixcbiAgICBcIlJhbmdlXCI6IFwi56+E5Zuy5oyH5a6aXCIsXG4gICAgXCJTY2FsZVwiOiBcIuaLoeWkpy/nuK7lsI9cIixcbiAgICBcIkN1c3RvbVwiOiBcIuOCq+OCueOCv+ODoFwiLFxuICAgIFwiVGV4dCBjb2xvclwiOiBcIuODhuOCreOCueODiOOBruiJslwiLFxuICAgIFwiMTAwJVwiOiBcIkI15ZWG5qWt6KqM55SoKEI044K144Kk44K65Y6f56i/55So57SZL0E05LuV5LiK44GM44KKKVwiLFxuICAgIFwiODIlXCI6IFwiQTXlkIzkurroqoznlKgoQTTjgrXjgqTjgrrljp/nqL/nlKjntJkvQjXku5XkuIrjgYzjgoopXCIsXG4gICAgXCJOYW1lIGNoYW5nZXIgY29tcGF0aWJsZVwiOiBcIuOCueODiOODvOODquODvOOCqOODh+OCo+OCv+eUqOODjeODvOODoOODgeOCp+ODs+OCuOODo+ODvOS6kuaPm1wiLFxuXG4gICAgXCJFeHBvcnQgQ0xJUCBTVFVESU8gU3Rvcnlib2FyZFwiOiBcIkNMSVAgU1RVRElPIOODjeODvOODoOabuOOBjeWHuuOBl1wiLFxuICAgIFwiRXhwb3J0IFBERlwiOiBcIlBERuabuOOBjeWHuuOBl1wiLFxuICAgIFwiSW1wb3J0IFBsYWluIFRleHRcIjogXCLjg4bjgq3jgrnjg4joqq3jgb/ovrzjgb9cIixcbiAgICBcIlJlc2V0IFNldHRpbmdzIHRvIERlZmF1bHRcIjogXCLliJ3mnJ/oqK3lrprjgavmiLvjgZlcIixcblxuICAgIFwiRmlsZSBuYW1lXCI6IFwi44OV44Kh44Kk44Or5ZCNXCIsXG4gICAgXCJEdXBsaWNhdGUgbm90ZSBuYW1lLlwiOiBcIuWQjOOBmOWQjeWJjeOBruODjuODvOODiOOBjOOBguOCiuOBvuOBmeOAglwiLFxuICAgIFwiRHVwbGljYXRlIGZpbGUgbmFtZS5cIjogXCLlkIzjgZjlkI3liY3jga7jg5XjgqHjgqTjg6vjgYzjgYLjgorjgb7jgZnjgIJcIixcbiAgICBcIkZpbGUgbm90IGZvdW5kLlwiOiBcIuODleOCoeOCpOODq+OBjOimi+OBpOOBi+OCiuOBvuOBm+OCk+OAglwiLFxuICAgIFwiRmlsZSBvcGVuIGVycm9yLlwiOiBcIuOBk+OBruODleOCoeOCpOODq+OBr+mWi+OBkeOBvuOBm+OCk+OAglwiLFxuICAgIFwiU2F2ZSBlcnJvci5cIjogXCLjgrvjg7zjg5bjgafjgY3jgb7jgZvjgpPjgIJcIixcbiAgICBcIlNlbGVjdCBmaWxlIHRvIGltcG9ydFwiOiBcIuiqreOBv+i+vOOCgOODleOCoeOCpOODq+OCkumBuOaKnuOBl+OBpuOBj+OBoOOBleOBhFwiLFxuICAgIFwiQ29tcHJlc3NpbmdcIjogXCLlnKfnuK7kuK1cIixcbiAgICBcIlJlbmRlcmluZ1wiOiBcIuS9nOaIkOS4rVwiLFxuXG4gICAgXCJGb3JtYXRcIjogXCLjg5Xjgqnjg7zjg57jg4Pjg4hcIixcbiAgICBcIkxpbmUgc2VwYXJhdG9yXCI6IFwi5pS56KGMXCIsXG4gICAgXCJCYWxsb29uIHNlcGFyYXRvclwiOiBcIuaUueOCu+ODquODlVwiLFxuICAgIFwiUGFnZSBzZXBhcmF0b3JcIjogXCLmlLnjg5rjg7zjgrhcIixcbiAgICBcIkNvbW1lbnQga2V5XCI6IFwi44Kz44Oh44Oz44OIXCIsXG4gICAgXCJDaG9vc2UgZmlsZS4uLlwiOiBcIuODleOCoeOCpOODq+OCkumBuOaKni4uLlwiLFxuICAgIFxuICAgIFwiVHJpYWxcIjogXCLoqabnlKjniYhcIixcbiAgICBcIldlbGNvbWUgdG8gdGhlIHRyaWFsIHZlcnNpb24gb2YgTmFtZW5vdGUuXFxuWW91IGhhdmUgXCI6IFwi44GC44GoXCIsXG4gICAgXCIgZGF5KHMpIGxlZnQuXCI6IFwi5pel44GQ44KJ44GE6Kmm55So44Gn44GN44G+44GZ44CCXFxu44GC44KK44GM44Go44GG44GU44GW44GE44G+44GZ77yBXCIsIFxuICAgIFwiV2UncmUgc29ycnksIGJ1dCB5b3VyIHRyaWFsIHBlcmlvZCBoYXMgZXhwaXJlZC5cIjogXCLoqabnlKjmnJ/plpPntYLkuobjgZfjgb7jgZfjgZ/jgIJcXG7jgYLjgorjgYzjgajjgYbjgZTjgZbjgYTjgb7jgZfjgZ/vvIFcIiwgXG5cbiAgICBcIlpvb20gc21hbGwgdGV4dHMgb24gaW5wdXRcIjogXCLlsI/jgZXjgYTjg4bjgq3jgrnjg4jjgpLnt6jpm4bjgZnjgovjgajjgY3jga/mi6HlpKfooajnpLrjgZnjgotcIixcbiAgICBcIlVzZSBRdWlja2xpbmVcIiA6IFwi6ZW35oq844GX44Gn55u057ea44OE44O844Or44Gr5YiH44KK5pu/44GI44KLXCIsXG4gICAgXCJEaXNhYmxlIHdpbnRhYiBkcml2ZXJcIjogXCJXaW50YWLjg4njg6njgqTjg5DjgpLkvb/jgo/jgarjgYRcIixcbiAgICBcIkRpc2FibGUgbW91c2Ugd2hlZWwgc2Nyb2xsXCI6IFwi44Oe44Km44K544Ob44Kk44O844Or44Gn44K544Kv44Ot44O844Or44GX44Gq44GEXCIsXG4gICAgXCJDbGljayBPSyB0byByZXN0b3JlIGRlZmF1bHQgc2V0dGluZ3MuXCI6IFwi44OH44OV44Kp44Or44OI44Gu6Kit5a6a44Gr5oi744GX44G+44GZXCIsXG4gICAgXCJQZW4gcHJlc3N1cmVcIjogXCLnrYblnKdcIixcbiAgICBcIk91dHB1dFwiOiBcIuWHuuWKm1wiLFxuXG4gICAgXCJNZW51XCI6IFwi44Oh44OL44Ol44O8XCIsXG4gICAgXCJQZW5cIjogXCLjg5rjg7NcIixcbiAgICBcIkVyYXNlclwiOiBcIua2iOOBl+OCtOODoFwiLFxuICAgIFwiVGV4dFwiOiBcIuODhuOCreOCueODiFwiLFxuICAgIFwiWm9vbSBJblwiOiBcIuOCuuODvOODoOOCpOODs1wiLFxuICAgIFwiWm9vbSBPdXRcIjogXCLjgrrjg7zjg6DjgqLjgqbjg4hcIixcbiAgICBcIlF1aWNrIFpvb21cIjogXCLjgq/jgqTjg4Pjgq/jgrrjg7zjg6BcIixcbiAgICBcbiAgICBcIkVuYWJsZSBKYXBhbmVzZSBPcHRpb25zXCI6IFwi5pel5pys6Kqe55So44Gu44Kq44OX44K344On44Oz44KS5pyJ5Yq544Gr44GZ44KLXCJcbiAgfVxufVxuXG5leHBvcnRzLmRpY3Rpb25hcnkgPSBkaWN0aW9uYXJ5XG4iLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTplLkRyb3Bib3g9dCgpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZSgpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSYmc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlfHxcInVuZGVmaW5lZFwiPT10eXBlb2YgbW9kdWxlfHxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93fWZ1bmN0aW9uIHQoZSl7cmV0dXJuXCJodHRwczovL1wiK2UrXCIuZHJvcGJveGFwaS5jb20vMi9cIn1mdW5jdGlvbiByKGUpe3JldHVybiBKU09OLnN0cmluZ2lmeShlKS5yZXBsYWNlKC9bXFx1MDA3Zi1cXHVmZmZmXS9nLGZ1bmN0aW9uKGUpe3JldHVyblwiXFxcXHVcIisoXCIwMDBcIitlLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCl9KX1mdW5jdGlvbiBuKGUpe3ZhciB0PWUubGVuZ3RoO2lmKHQlND4wKXRocm93IEVycm9yKFwiSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNFwiKTtyZXR1cm5cIj1cIj09PWVbdC0yXT8yOlwiPVwiPT09ZVt0LTFdPzE6MH12YXIgaT17fTtpLmF1dGhUb2tlbkZyb21PYXV0aDE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImF1dGgvdG9rZW4vZnJvbV9vYXV0aDFcIixlLFwiYXBwXCIsXCJhcGlcIixcInJwY1wiKX0saS5hdXRoVG9rZW5SZXZva2U9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImF1dGgvdG9rZW4vcmV2b2tlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmNvbnRhY3RzRGVsZXRlTWFudWFsQ29udGFjdHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImNvbnRhY3RzL2RlbGV0ZV9tYW51YWxfY29udGFjdHNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuY29udGFjdHNEZWxldGVNYW51YWxDb250YWN0c0JhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJjb250YWN0cy9kZWxldGVfbWFudWFsX2NvbnRhY3RzX2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzUHJvcGVydGllc0FkZD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3Byb3BlcnRpZXMvYWRkXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzUHJvcGVydGllc092ZXJ3cml0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3Byb3BlcnRpZXMvb3ZlcndyaXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzUHJvcGVydGllc1JlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3Byb3BlcnRpZXMvcmVtb3ZlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzUHJvcGVydGllc1NlYXJjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3Byb3BlcnRpZXMvc2VhcmNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzUHJvcGVydGllc1NlYXJjaENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvcHJvcGVydGllcy9zZWFyY2gvY29udGludWVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNQcm9wZXJ0aWVzVXBkYXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvcHJvcGVydGllcy91cGRhdGVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNBZGRGb3JUZWFtPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvdGVtcGxhdGVzL2FkZF9mb3JfdGVhbVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1RlbXBsYXRlc0FkZEZvclVzZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy90ZW1wbGF0ZXMvYWRkX2Zvcl91c2VyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzR2V0Rm9yVGVhbT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9nZXRfZm9yX3RlYW1cIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNHZXRGb3JVc2VyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvdGVtcGxhdGVzL2dldF9mb3JfdXNlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1RlbXBsYXRlc0xpc3RGb3JUZWFtPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvdGVtcGxhdGVzL2xpc3RfZm9yX3RlYW1cIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNMaXN0Rm9yVXNlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9saXN0X2Zvcl91c2VyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzUmVtb3ZlRm9yVGVhbT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy9yZW1vdmVfZm9yX3RlYW1cIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVByb3BlcnRpZXNUZW1wbGF0ZXNSZW1vdmVGb3JVc2VyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3Byb3BlcnRpZXMvdGVtcGxhdGVzL3JlbW92ZV9mb3JfdXNlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUHJvcGVydGllc1RlbXBsYXRlc1VwZGF0ZUZvclRlYW09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcHJvcGVydGllcy90ZW1wbGF0ZXMvdXBkYXRlX2Zvcl90ZWFtXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVQcm9wZXJ0aWVzVGVtcGxhdGVzVXBkYXRlRm9yVXNlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZV9wcm9wZXJ0aWVzL3RlbXBsYXRlcy91cGRhdGVfZm9yX3VzZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZVJlcXVlc3RzQ3JlYXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlX3JlcXVlc3RzL2NyZWF0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUmVxdWVzdHNHZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcmVxdWVzdHMvZ2V0XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVSZXF1ZXN0c0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcmVxdWVzdHMvbGlzdFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlUmVxdWVzdHNVcGRhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVfcmVxdWVzdHMvdXBkYXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQWxwaGFHZXRNZXRhZGF0YT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvYWxwaGEvZ2V0X21ldGFkYXRhXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQWxwaGFVcGxvYWQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2FscGhhL3VwbG9hZFwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJ1cGxvYWRcIil9LGkuZmlsZXNDb3B5VjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2NvcHlfdjJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDb3B5PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weUJhdGNoVjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2NvcHlfYmF0Y2hfdjJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDb3B5QmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2NvcHlfYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDb3B5QmF0Y2hDaGVja1YyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5X2JhdGNoL2NoZWNrX3YyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ29weUJhdGNoQ2hlY2s9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2NvcHlfYmF0Y2gvY2hlY2tcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDb3B5UmVmZXJlbmNlR2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jb3B5X3JlZmVyZW5jZS9nZXRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDb3B5UmVmZXJlbmNlU2F2ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvY29weV9yZWZlcmVuY2Uvc2F2ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0NyZWF0ZUZvbGRlclYyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jcmVhdGVfZm9sZGVyX3YyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ3JlYXRlRm9sZGVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jcmVhdGVfZm9sZGVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzQ3JlYXRlRm9sZGVyQmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2NyZWF0ZV9mb2xkZXJfYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNDcmVhdGVGb2xkZXJCYXRjaENoZWNrPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9jcmVhdGVfZm9sZGVyX2JhdGNoL2NoZWNrXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzRGVsZXRlVjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2RlbGV0ZV92MlwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0RlbGV0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZGVsZXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzRGVsZXRlQmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2RlbGV0ZV9iYXRjaFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0RlbGV0ZUJhdGNoQ2hlY2s9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2RlbGV0ZV9iYXRjaC9jaGVja1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc0Rvd25sb2FkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9kb3dubG9hZFwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJkb3dubG9hZFwiKX0saS5maWxlc0Rvd25sb2FkWmlwPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9kb3dubG9hZF96aXBcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwiZG93bmxvYWRcIil9LGkuZmlsZXNHZXRNZXRhZGF0YT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZ2V0X21ldGFkYXRhXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzR2V0UHJldmlldz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvZ2V0X3ByZXZpZXdcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwiZG93bmxvYWRcIil9LGkuZmlsZXNHZXRUZW1wb3JhcnlMaW5rPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9nZXRfdGVtcG9yYXJ5X2xpbmtcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNHZXRUZW1wb3JhcnlVcGxvYWRMaW5rPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9nZXRfdGVtcG9yYXJ5X3VwbG9hZF9saW5rXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzR2V0VGh1bWJuYWlsPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9nZXRfdGh1bWJuYWlsXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcImRvd25sb2FkXCIpfSxpLmZpbGVzR2V0VGh1bWJuYWlsQmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2dldF90aHVtYm5haWxfYmF0Y2hcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwicnBjXCIpfSxpLmZpbGVzTGlzdEZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbGlzdF9mb2xkZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNMaXN0Rm9sZGVyQ29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2xpc3RfZm9sZGVyL2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzTGlzdEZvbGRlckdldExhdGVzdEN1cnNvcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbGlzdF9mb2xkZXIvZ2V0X2xhdGVzdF9jdXJzb3JcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNMaXN0Rm9sZGVyTG9uZ3BvbGw9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL2xpc3RfZm9sZGVyL2xvbmdwb2xsXCIsZSxcIm5vYXV0aFwiLFwibm90aWZ5XCIsXCJycGNcIil9LGkuZmlsZXNMaXN0UmV2aXNpb25zPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9saXN0X3JldmlzaW9uc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc01vdmVWMj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbW92ZV92MlwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc01vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL21vdmVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNNb3ZlQmF0Y2hWMj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbW92ZV9iYXRjaF92MlwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc01vdmVCYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbW92ZV9iYXRjaFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc01vdmVCYXRjaENoZWNrVjI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL21vdmVfYmF0Y2gvY2hlY2tfdjJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNNb3ZlQmF0Y2hDaGVjaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvbW92ZV9iYXRjaC9jaGVja1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1Blcm1hbmVudGx5RGVsZXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9wZXJtYW5lbnRseV9kZWxldGVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNQcm9wZXJ0aWVzQWRkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9wcm9wZXJ0aWVzL2FkZFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1Byb3BlcnRpZXNPdmVyd3JpdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3Byb3BlcnRpZXMvb3ZlcndyaXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzUHJvcGVydGllc1JlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvcHJvcGVydGllcy9yZW1vdmVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNQcm9wZXJ0aWVzVGVtcGxhdGVHZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3Byb3BlcnRpZXMvdGVtcGxhdGUvZ2V0XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzUHJvcGVydGllc1RlbXBsYXRlTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvcHJvcGVydGllcy90ZW1wbGF0ZS9saXN0XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzUHJvcGVydGllc1VwZGF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvcHJvcGVydGllcy91cGRhdGVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNSZXN0b3JlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy9yZXN0b3JlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzU2F2ZVVybD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvc2F2ZV91cmxcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNTYXZlVXJsQ2hlY2tKb2JTdGF0dXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3NhdmVfdXJsL2NoZWNrX2pvYl9zdGF0dXNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNTZWFyY2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3NlYXJjaFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5maWxlc1VwbG9hZD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvdXBsb2FkXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcInVwbG9hZFwiKX0saS5maWxlc1VwbG9hZFNlc3Npb25BcHBlbmRWMj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvdXBsb2FkX3Nlc3Npb24vYXBwZW5kX3YyXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcInVwbG9hZFwiKX0saS5maWxlc1VwbG9hZFNlc3Npb25BcHBlbmQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcImZpbGVzL3VwbG9hZF9zZXNzaW9uL2FwcGVuZFwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJ1cGxvYWRcIil9LGkuZmlsZXNVcGxvYWRTZXNzaW9uRmluaXNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy91cGxvYWRfc2Vzc2lvbi9maW5pc2hcIixlLFwidXNlclwiLFwiY29udGVudFwiLFwidXBsb2FkXCIpfSxpLmZpbGVzVXBsb2FkU2Vzc2lvbkZpbmlzaEJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy91cGxvYWRfc2Vzc2lvbi9maW5pc2hfYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuZmlsZXNVcGxvYWRTZXNzaW9uRmluaXNoQmF0Y2hDaGVjaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwiZmlsZXMvdXBsb2FkX3Nlc3Npb24vZmluaXNoX2JhdGNoL2NoZWNrXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLmZpbGVzVXBsb2FkU2Vzc2lvblN0YXJ0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJmaWxlcy91cGxvYWRfc2Vzc2lvbi9zdGFydFwiLGUsXCJ1c2VyXCIsXCJjb250ZW50XCIsXCJ1cGxvYWRcIil9LGkucGFwZXJEb2NzQXJjaGl2ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9hcmNoaXZlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc0NyZWF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9jcmVhdGVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJ1cGxvYWRcIil9LGkucGFwZXJEb2NzRG93bmxvYWQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvZG93bmxvYWRcIixlLFwidXNlclwiLFwiYXBpXCIsXCJkb3dubG9hZFwiKX0saS5wYXBlckRvY3NGb2xkZXJVc2Vyc0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvZm9sZGVyX3VzZXJzL2xpc3RcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzRm9sZGVyVXNlcnNMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvZm9sZGVyX3VzZXJzL2xpc3QvY29udGludWVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzR2V0Rm9sZGVySW5mbz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9nZXRfZm9sZGVyX2luZm9cIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkucGFwZXJEb2NzTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9saXN0XCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc0xpc3RDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy9saXN0L2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc1Blcm1hbmVudGx5RGVsZXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3Blcm1hbmVudGx5X2RlbGV0ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NTaGFyaW5nUG9saWN5R2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3NoYXJpbmdfcG9saWN5L2dldFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NTaGFyaW5nUG9saWN5U2V0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3NoYXJpbmdfcG9saWN5L3NldFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NVcGRhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvdXBkYXRlXCIsZSxcInVzZXJcIixcImFwaVwiLFwidXBsb2FkXCIpfSxpLnBhcGVyRG9jc1VzZXJzQWRkPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3VzZXJzL2FkZFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NVc2Vyc0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInBhcGVyL2RvY3MvdXNlcnMvbGlzdFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5wYXBlckRvY3NVc2Vyc0xpc3RDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwicGFwZXIvZG9jcy91c2Vycy9saXN0L2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnBhcGVyRG9jc1VzZXJzUmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJwYXBlci9kb2NzL3VzZXJzL3JlbW92ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nQWRkRmlsZU1lbWJlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9hZGRfZmlsZV9tZW1iZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0FkZEZvbGRlck1lbWJlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9hZGRfZm9sZGVyX21lbWJlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nQ2hhbmdlRmlsZU1lbWJlckFjY2Vzcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9jaGFuZ2VfZmlsZV9tZW1iZXJfYWNjZXNzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdDaGVja0pvYlN0YXR1cz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9jaGVja19qb2Jfc3RhdHVzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdDaGVja1JlbW92ZU1lbWJlckpvYlN0YXR1cz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9jaGVja19yZW1vdmVfbWVtYmVyX2pvYl9zdGF0dXNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0NoZWNrU2hhcmVKb2JTdGF0dXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvY2hlY2tfc2hhcmVfam9iX3N0YXR1c1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nQ3JlYXRlU2hhcmVkTGluaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9jcmVhdGVfc2hhcmVkX2xpbmtcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0NyZWF0ZVNoYXJlZExpbmtXaXRoU2V0dGluZ3M9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvY3JlYXRlX3NoYXJlZF9saW5rX3dpdGhfc2V0dGluZ3NcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0dldEZpbGVNZXRhZGF0YT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9nZXRfZmlsZV9tZXRhZGF0YVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nR2V0RmlsZU1ldGFkYXRhQmF0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvZ2V0X2ZpbGVfbWV0YWRhdGEvYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0dldEZvbGRlck1ldGFkYXRhPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2dldF9mb2xkZXJfbWV0YWRhdGFcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0dldFNoYXJlZExpbmtGaWxlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2dldF9zaGFyZWRfbGlua19maWxlXCIsZSxcInVzZXJcIixcImNvbnRlbnRcIixcImRvd25sb2FkXCIpfSxpLnNoYXJpbmdHZXRTaGFyZWRMaW5rTWV0YWRhdGE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvZ2V0X3NoYXJlZF9saW5rX21ldGFkYXRhXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdHZXRTaGFyZWRMaW5rcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9nZXRfc2hhcmVkX2xpbmtzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0RmlsZU1lbWJlcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9maWxlX21lbWJlcnNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RGaWxlTWVtYmVyc0JhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfZmlsZV9tZW1iZXJzL2JhdGNoXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0RmlsZU1lbWJlcnNDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X2ZpbGVfbWVtYmVycy9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdEZvbGRlck1lbWJlcnM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9mb2xkZXJfbWVtYmVyc1wiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdEZvbGRlck1lbWJlcnNDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X2ZvbGRlcl9tZW1iZXJzL2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0Rm9sZGVycz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X2ZvbGRlcnNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RGb2xkZXJzQ29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9mb2xkZXJzL2NvbnRpbnVlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0TW91bnRhYmxlRm9sZGVycz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9saXN0X21vdW50YWJsZV9mb2xkZXJzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdMaXN0TW91bnRhYmxlRm9sZGVyc0NvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfbW91bnRhYmxlX2ZvbGRlcnMvY29udGludWVcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RSZWNlaXZlZEZpbGVzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3RfcmVjZWl2ZWRfZmlsZXNcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ0xpc3RSZWNlaXZlZEZpbGVzQ29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbGlzdF9yZWNlaXZlZF9maWxlcy9jb250aW51ZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nTGlzdFNoYXJlZExpbmtzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL2xpc3Rfc2hhcmVkX2xpbmtzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdNb2RpZnlTaGFyZWRMaW5rU2V0dGluZ3M9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvbW9kaWZ5X3NoYXJlZF9saW5rX3NldHRpbmdzXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdNb3VudEZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9tb3VudF9mb2xkZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1JlbGlucXVpc2hGaWxlTWVtYmVyc2hpcD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9yZWxpbnF1aXNoX2ZpbGVfbWVtYmVyc2hpcFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nUmVsaW5xdWlzaEZvbGRlck1lbWJlcnNoaXA9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvcmVsaW5xdWlzaF9mb2xkZXJfbWVtYmVyc2hpcFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nUmVtb3ZlRmlsZU1lbWJlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9yZW1vdmVfZmlsZV9tZW1iZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1JlbW92ZUZpbGVNZW1iZXIyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3JlbW92ZV9maWxlX21lbWJlcl8yXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdSZW1vdmVGb2xkZXJNZW1iZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvcmVtb3ZlX2ZvbGRlcl9tZW1iZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1Jldm9rZVNoYXJlZExpbms9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvcmV2b2tlX3NoYXJlZF9saW5rXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdTZXRBY2Nlc3NJbmhlcml0YW5jZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9zZXRfYWNjZXNzX2luaGVyaXRhbmNlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdTaGFyZUZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy9zaGFyZV9mb2xkZXJcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkuc2hhcmluZ1RyYW5zZmVyRm9sZGVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3RyYW5zZmVyX2ZvbGRlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nVW5tb3VudEZvbGRlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwic2hhcmluZy91bm1vdW50X2ZvbGRlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nVW5zaGFyZUZpbGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvdW5zaGFyZV9maWxlXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdVbnNoYXJlRm9sZGVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3Vuc2hhcmVfZm9sZGVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdVcGRhdGVGaWxlTWVtYmVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3VwZGF0ZV9maWxlX21lbWJlclwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS5zaGFyaW5nVXBkYXRlRm9sZGVyTWVtYmVyPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJzaGFyaW5nL3VwZGF0ZV9mb2xkZXJfbWVtYmVyXCIsZSxcInVzZXJcIixcImFwaVwiLFwicnBjXCIpfSxpLnNoYXJpbmdVcGRhdGVGb2xkZXJQb2xpY3k9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvdXBkYXRlX2ZvbGRlcl9wb2xpY3lcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkudGVhbUxvZ0dldEV2ZW50cz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbV9sb2cvZ2V0X2V2ZW50c1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0saS50ZWFtTG9nR2V0RXZlbnRzQ29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW1fbG9nL2dldF9ldmVudHMvY29udGludWVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LGkudXNlcnNHZXRBY2NvdW50PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ1c2Vycy9nZXRfYWNjb3VudFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS51c2Vyc0dldEFjY291bnRCYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidXNlcnMvZ2V0X2FjY291bnRfYmF0Y2hcIixlLFwidXNlclwiLFwiYXBpXCIsXCJycGNcIil9LGkudXNlcnNHZXRDdXJyZW50QWNjb3VudD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidXNlcnMvZ2V0X2N1cnJlbnRfYWNjb3VudFwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX0saS51c2Vyc0dldFNwYWNlVXNhZ2U9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInVzZXJzL2dldF9zcGFjZV91c2FnZVwiLGUsXCJ1c2VyXCIsXCJhcGlcIixcInJwY1wiKX07Zm9yKHZhciBzPWZ1bmN0aW9uKGUsdCl7aWYoIShlIGluc3RhbmNlb2YgdCkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0sbz1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtmb3IodmFyIHI9MDt0Lmxlbmd0aD5yO3IrKyl7dmFyIG49dFtyXTtuLmVudW1lcmFibGU9bi5lbnVtZXJhYmxlfHwhMSxuLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiBuJiYobi53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsbi5rZXksbil9fXJldHVybiBmdW5jdGlvbih0LHIsbil7cmV0dXJuIHImJmUodC5wcm90b3R5cGUsciksbiYmZSh0LG4pLHR9fSgpLHU9ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0JiZudWxsIT09dCl0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIit0eXBlb2YgdCk7ZS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZSh0JiZ0LnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOmUsZW51bWVyYWJsZTohMSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksdCYmKE9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3Quc2V0UHJvdG90eXBlT2YoZSx0KTplLl9fcHJvdG9fXz10KX0sYT1mdW5jdGlvbihlLHQpe2lmKCFlKXRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtyZXR1cm4hdHx8XCJvYmplY3RcIiE9dHlwZW9mIHQmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQ/ZTp0fSxjPWZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUsdCl7aWYoQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gZTtpZihTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGUpKXJldHVybiBmdW5jdGlvbihlLHQpe3ZhciByPVtdLG49ITAsaT0hMSxzPXZvaWQgMDt0cnl7Zm9yKHZhciBvLHU9ZVtTeW1ib2wuaXRlcmF0b3JdKCk7IShuPShvPXUubmV4dCgpKS5kb25lKSYmKHIucHVzaChvLnZhbHVlKSwhdHx8ci5sZW5ndGghPT10KTtuPSEwKTt9Y2F0Y2goZSl7aT0hMCxzPWV9ZmluYWxseXt0cnl7IW4mJnUucmV0dXJuJiZ1LnJldHVybigpfWZpbmFsbHl7aWYoaSl0aHJvdyBzfX1yZXR1cm4gcn0oZSx0KTt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKX19KCkscD1mdW5jdGlvbihlKXtyZXR1cm4gMyplLmxlbmd0aC80LW4oZSl9LGY9ZnVuY3Rpb24oZSl7dmFyIHQscixpLHMsbyx1PWUubGVuZ3RoO3M9bihlKSxvPW5ldyBkKDMqdS80LXMpLHI9cz4wP3UtNDp1O3ZhciBhPTA7Zm9yKHQ9MDtyPnQ7dCs9NClpPW1bZS5jaGFyQ29kZUF0KHQpXTw8MTh8bVtlLmNoYXJDb2RlQXQodCsxKV08PDEyfG1bZS5jaGFyQ29kZUF0KHQrMildPDw2fG1bZS5jaGFyQ29kZUF0KHQrMyldLG9bYSsrXT1pPj4xNiYyNTUsb1thKytdPWk+PjgmMjU1LG9bYSsrXT0yNTUmaTtyZXR1cm4gMj09PXM/KGk9bVtlLmNoYXJDb2RlQXQodCldPDwyfG1bZS5jaGFyQ29kZUF0KHQrMSldPj40LG9bYSsrXT0yNTUmaSk6MT09PXMmJihpPW1bZS5jaGFyQ29kZUF0KHQpXTw8MTB8bVtlLmNoYXJDb2RlQXQodCsxKV08PDR8bVtlLmNoYXJDb2RlQXQodCsyKV0+PjIsb1thKytdPWk+PjgmMjU1LG9bYSsrXT0yNTUmaSksb30saD1mdW5jdGlvbihlKXtmb3IodmFyIHQscj1lLmxlbmd0aCxuPXIlMyxpPVwiXCIscz1bXSxvPTAsdT1yLW47dT5vO28rPTE2MzgzKXMucHVzaChmdW5jdGlvbihlLHQscil7Zm9yKHZhciBuPVtdLGk9dDtyPmk7aSs9MyluLnB1c2goZnVuY3Rpb24oZSl7cmV0dXJuIGxbZT4+MTgmNjNdK2xbZT4+MTImNjNdK2xbZT4+NiY2M10rbFs2MyZlXX0oKGVbaV08PDE2KSsoZVtpKzFdPDw4KStlW2krMl0pKTtyZXR1cm4gbi5qb2luKFwiXCIpfShlLG8sbysxNjM4Mz51P3U6bysxNjM4MykpO3JldHVybiAxPT09bj8oaSs9bFsodD1lW3ItMV0pPj4yXSxpKz1sW3Q8PDQmNjNdLGkrPVwiPT1cIik6Mj09PW4mJihpKz1sWyh0PShlW3ItMl08PDgpK2Vbci0xXSk+PjEwXSxpKz1sW3Q+PjQmNjNdLGkrPWxbdDw8MiY2M10saSs9XCI9XCIpLHMucHVzaChpKSxzLmpvaW4oXCJcIil9LGw9W10sbT1bXSxkPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5P1VpbnQ4QXJyYXk6QXJyYXksZz1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIixfPTA7NjQ+XzsrK18pbFtfXT1nW19dLG1bZy5jaGFyQ29kZUF0KF8pXT1fO21bNDVdPTYyLG1bOTVdPTYzO3ZhciBiPXtieXRlTGVuZ3RoOnAsdG9CeXRlQXJyYXk6Zixmcm9tQnl0ZUFycmF5Omh9LHY9e3JlYWQ6ZnVuY3Rpb24oZSx0LHIsbixpKXt2YXIgcyxvLHU9OCppLW4tMSxhPSgxPDx1KS0xLGM9YT4+MSxwPS03LGY9cj9pLTE6MCxoPXI/LTE6MSxsPWVbdCtmXTtmb3IoZis9aCxzPWwmKDE8PC1wKS0xLGw+Pj0tcCxwKz11O3A+MDtzPTI1NipzK2VbdCtmXSxmKz1oLHAtPTgpO2ZvcihvPXMmKDE8PC1wKS0xLHM+Pj0tcCxwKz1uO3A+MDtvPTI1NipvK2VbdCtmXSxmKz1oLHAtPTgpO2lmKDA9PT1zKXM9MS1jO2Vsc2V7aWYocz09PWEpcmV0dXJuIG8/TmFOOjEvMCoobD8tMToxKTtvKz1NYXRoLnBvdygyLG4pLHMtPWN9cmV0dXJuKGw/LTE6MSkqbypNYXRoLnBvdygyLHMtbil9LHdyaXRlOmZ1bmN0aW9uKGUsdCxyLG4saSxzKXt2YXIgbyx1LGEsYz04KnMtaS0xLHA9KDE8PGMpLTEsZj1wPj4xLGg9MjM9PT1pPzUuOTYwNDY0NDc3NTM5MDYyZS04OjAsbD1uPzA6cy0xLG09bj8xOi0xLGQ9MD50fHwwPT09dCYmMD4xL3Q/MTowO2Zvcih0PU1hdGguYWJzKHQpLGlzTmFOKHQpfHx0PT09MS8wPyh1PWlzTmFOKHQpPzE6MCxvPXApOihvPU1hdGguZmxvb3IoTWF0aC5sb2codCkvTWF0aC5MTjIpLDE+dCooYT1NYXRoLnBvdygyLC1vKSkmJihvLS0sYSo9MiksMj4odCs9MT5vK2Y/aCpNYXRoLnBvdygyLDEtZik6aC9hKSphfHwobysrLGEvPTIpLHA+bytmPzE+bytmPyh1PXQqTWF0aC5wb3coMixmLTEpKk1hdGgucG93KDIsaSksbz0wKToodT0odCphLTEpKk1hdGgucG93KDIsaSksbys9Zik6KHU9MCxvPXApKTtpPj04O2VbcitsXT0yNTUmdSxsKz1tLHUvPTI1NixpLT04KTtmb3Iobz1vPDxpfHUsYys9aTtjPjA7ZVtyK2xdPTI1NSZvLGwrPW0sby89MjU2LGMtPTgpO2VbcitsLW1dfD0xMjgqZH19LHk9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD17ZXhwb3J0czp7fX0sZSh0LHQuZXhwb3J0cyksdC5leHBvcnRzfShmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIHIoZSl7aWYoZT5DKXRocm93IG5ldyBSYW5nZUVycm9yKFwiSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGhcIik7dmFyIHQ9bmV3IFVpbnQ4QXJyYXkoZSk7cmV0dXJuIHQuX19wcm90b19fPW4ucHJvdG90eXBlLHR9ZnVuY3Rpb24gbihlLHQscil7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXRocm93IEVycm9yKFwiSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmdcIik7cmV0dXJuIG8oZSl9cmV0dXJuIGkoZSx0LHIpfWZ1bmN0aW9uIGkoZSx0LGkpe2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO3JldHVybiBTKGUpP2Z1bmN0aW9uKGUsdCxyKXtpZigwPnR8fHQ+ZS5ieXRlTGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwiJ29mZnNldCcgaXMgb3V0IG9mIGJvdW5kc1wiKTtpZih0KyhyfHwwKT5lLmJ5dGVMZW5ndGgpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCInbGVuZ3RoJyBpcyBvdXQgb2YgYm91bmRzXCIpO3ZhciBpO2k9dm9pZCAwPT09dCYmdm9pZCAwPT09cj9uZXcgVWludDhBcnJheShlKTp2b2lkIDA9PT1yP25ldyBVaW50OEFycmF5KGUsdCk6bmV3IFVpbnQ4QXJyYXkoZSx0LHIpO3JldHVybiBpLl9fcHJvdG9fXz1uLnByb3RvdHlwZSxpfShlLHQsaSk6XCJzdHJpbmdcIj09dHlwZW9mIGU/ZnVuY3Rpb24oZSx0KXtcInN0cmluZ1wiPT10eXBlb2YgdCYmXCJcIiE9PXR8fCh0PVwidXRmOFwiKTtpZighbi5pc0VuY29kaW5nKHQpKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJyk7dmFyIGk9MHxjKGUsdCkscz1yKGkpLG89cy53cml0ZShlLHQpO28hPT1pJiYocz1zLnNsaWNlKDAsbykpO3JldHVybiBzfShlLHQpOmZ1bmN0aW9uKGUpe2lmKG4uaXNCdWZmZXIoZSkpe3ZhciB0PTB8YShlLmxlbmd0aCksaT1yKHQpO3JldHVybiAwPT09aS5sZW5ndGg/aTooZS5jb3B5KGksMCwwLHQpLGkpfWlmKGUpe2lmKEwoZSl8fFwibGVuZ3RoXCJpbiBlKXJldHVyblwibnVtYmVyXCIhPXR5cGVvZiBlLmxlbmd0aHx8RShlLmxlbmd0aCk/cigwKTp1KGUpO2lmKFwiQnVmZmVyXCI9PT1lLnR5cGUmJkFycmF5LmlzQXJyYXkoZS5kYXRhKSlyZXR1cm4gdShlLmRhdGEpfXRocm93IG5ldyBUeXBlRXJyb3IoXCJGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuXCIpfShlKX1mdW5jdGlvbiBzKGUpe2lmKFwibnVtYmVyXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKTtpZigwPmUpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJyl9ZnVuY3Rpb24gbyhlKXtyZXR1cm4gcyhlKSxyKDA+ZT8wOjB8YShlKSl9ZnVuY3Rpb24gdShlKXtmb3IodmFyIHQ9MD5lLmxlbmd0aD8wOjB8YShlLmxlbmd0aCksbj1yKHQpLGk9MDt0Pmk7aSs9MSluW2ldPTI1NSZlW2ldO3JldHVybiBufWZ1bmN0aW9uIGEoZSl7aWYoZT49Qyl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkF0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gc2l6ZTogMHhcIitDLnRvU3RyaW5nKDE2KStcIiBieXRlc1wiKTtyZXR1cm4gMHxlfWZ1bmN0aW9uIGMoZSx0KXtpZihuLmlzQnVmZmVyKGUpKXJldHVybiBlLmxlbmd0aDtpZihMKGUpfHxTKGUpKXJldHVybiBlLmJ5dGVMZW5ndGg7XCJzdHJpbmdcIiE9dHlwZW9mIGUmJihlPVwiXCIrZSk7dmFyIHI9ZS5sZW5ndGg7aWYoMD09PXIpcmV0dXJuIDA7Zm9yKHZhciBpPSExOzspc3dpdGNoKHQpe2Nhc2VcImFzY2lpXCI6Y2FzZVwibGF0aW4xXCI6Y2FzZVwiYmluYXJ5XCI6cmV0dXJuIHI7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6Y2FzZSB2b2lkIDA6cmV0dXJuIHcoZSkubGVuZ3RoO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiAyKnI7Y2FzZVwiaGV4XCI6cmV0dXJuIHI+Pj4xO2Nhc2VcImJhc2U2NFwiOnJldHVybiBrKGUpLmxlbmd0aDtkZWZhdWx0OmlmKGkpcmV0dXJuIHcoZSkubGVuZ3RoO3Q9KFwiXCIrdCkudG9Mb3dlckNhc2UoKSxpPSEwfX1mdW5jdGlvbiBwKGUsdCxyKXt2YXIgbj1lW3RdO2VbdF09ZVtyXSxlW3JdPW59ZnVuY3Rpb24gZihlLHQscixpLHMpe2lmKDA9PT1lLmxlbmd0aClyZXR1cm4tMTtpZihcInN0cmluZ1wiPT10eXBlb2Ygcj8oaT1yLHI9MCk6cj4yMTQ3NDgzNjQ3P3I9MjE0NzQ4MzY0NzotMjE0NzQ4MzY0OD5yJiYocj0tMjE0NzQ4MzY0OCkscj0rcixFKHIpJiYocj1zPzA6ZS5sZW5ndGgtMSksMD5yJiYocj1lLmxlbmd0aCtyKSxlLmxlbmd0aD5yKXtpZigwPnIpe2lmKCFzKXJldHVybi0xO3I9MH19ZWxzZXtpZihzKXJldHVybi0xO3I9ZS5sZW5ndGgtMX1pZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9bi5mcm9tKHQsaSkpLG4uaXNCdWZmZXIodCkpcmV0dXJuIDA9PT10Lmxlbmd0aD8tMTpoKGUsdCxyLGkscyk7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpcmV0dXJuIHQmPTI1NSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mP3M/VWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGUsdCxyKTpVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGUsdCxyKTpoKGUsW3RdLHIsaSxzKTt0aHJvdyBuZXcgVHlwZUVycm9yKFwidmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyXCIpfWZ1bmN0aW9uIGgoZSx0LHIsbixpKXtmdW5jdGlvbiBzKGUsdCl7cmV0dXJuIDE9PT1vP2VbdF06ZS5yZWFkVUludDE2QkUodCpvKX12YXIgbz0xLHU9ZS5sZW5ndGgsYT10Lmxlbmd0aDtpZih2b2lkIDAhPT1uJiYoXCJ1Y3MyXCI9PT0obj0obitcIlwiKS50b0xvd2VyQ2FzZSgpKXx8XCJ1Y3MtMlwiPT09bnx8XCJ1dGYxNmxlXCI9PT1ufHxcInV0Zi0xNmxlXCI9PT1uKSl7aWYoMj5lLmxlbmd0aHx8Mj50Lmxlbmd0aClyZXR1cm4tMTtvPTIsdS89MixhLz0yLHIvPTJ9dmFyIGM7aWYoaSl7dmFyIHA9LTE7Zm9yKGM9cjt1PmM7YysrKWlmKHMoZSxjKT09PXModCwtMT09PXA/MDpjLXApKXtpZigtMT09PXAmJihwPWMpLGMtcCsxPT09YSlyZXR1cm4gcCpvfWVsc2UtMSE9PXAmJihjLT1jLXApLHA9LTF9ZWxzZSBmb3IocithPnUmJihyPXUtYSksYz1yO2M+PTA7Yy0tKXtmb3IodmFyIGY9ITAsaD0wO2E+aDtoKyspaWYocyhlLGMraCkhPT1zKHQsaCkpe2Y9ITE7YnJlYWt9aWYoZilyZXR1cm4gY31yZXR1cm4tMX1mdW5jdGlvbiBsKGUsdCxyLG4pe3JldHVybiBBKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1bXSxyPTA7ZS5sZW5ndGg+cjsrK3IpdC5wdXNoKDI1NSZlLmNoYXJDb2RlQXQocikpO3JldHVybiB0fSh0KSxlLHIsbil9ZnVuY3Rpb24gbShlLHQscil7cj1NYXRoLm1pbihlLmxlbmd0aCxyKTtmb3IodmFyIG49W10saT10O3I+aTspe3ZhciBzPWVbaV0sbz1udWxsLHU9cz4yMzk/NDpzPjIyMz8zOnM+MTkxPzI6MTtpZihyPj1pK3Upe3ZhciBhLGMscCxmO3N3aXRjaCh1KXtjYXNlIDE6MTI4PnMmJihvPXMpO2JyZWFrO2Nhc2UgMjoxMjg9PSgxOTImKGE9ZVtpKzFdKSkmJihmPSgzMSZzKTw8Nnw2MyZhKT4xMjcmJihvPWYpO2JyZWFrO2Nhc2UgMzpjPWVbaSsyXSwxMjg9PSgxOTImKGE9ZVtpKzFdKSkmJjEyOD09KDE5MiZjKSYmKGY9KDE1JnMpPDwxMnwoNjMmYSk8PDZ8NjMmYyk+MjA0NyYmKDU1Mjk2PmZ8fGY+NTczNDMpJiYobz1mKTticmVhaztjYXNlIDQ6Yz1lW2krMl0scD1lW2krM10sMTI4PT0oMTkyJihhPWVbaSsxXSkpJiYxMjg9PSgxOTImYykmJjEyOD09KDE5MiZwKSYmKGY9KDE1JnMpPDwxOHwoNjMmYSk8PDEyfCg2MyZjKTw8Nnw2MyZwKT42NTUzNSYmMTExNDExMj5mJiYobz1mKX19bnVsbD09PW8/KG89NjU1MzMsdT0xKTpvPjY1NTM1JiYobi5wdXNoKChvLT02NTUzNik+Pj4xMCYxMDIzfDU1Mjk2KSxvPTU2MzIwfDEwMjMmbyksbi5wdXNoKG8pLGkrPXV9cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciB0PWUubGVuZ3RoO2lmKFU+PXQpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLGUpO3ZhciByPVwiXCIsbj0wO2Zvcig7dD5uOylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZyxlLnNsaWNlKG4sbis9VSkpO3JldHVybiByfShuKX1mdW5jdGlvbiBkKGUsdCxyKXtpZihlJTEhPTB8fDA+ZSl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIm9mZnNldCBpcyBub3QgdWludFwiKTtpZihlK3Q+cil0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIlRyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGhcIil9ZnVuY3Rpb24gZyhlLHQscixpLHMsbyl7aWYoIW4uaXNCdWZmZXIoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJyk7aWYodD5zfHxvPnQpdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJyk7aWYocitpPmUubGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwiSW5kZXggb3V0IG9mIHJhbmdlXCIpfWZ1bmN0aW9uIF8oZSx0LHIsbixpLHMpe2lmKHIrbj5lLmxlbmd0aCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkluZGV4IG91dCBvZiByYW5nZVwiKTtpZigwPnIpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJJbmRleCBvdXQgb2YgcmFuZ2VcIil9ZnVuY3Rpb24geShlLHQscixuLGkpe3JldHVybiB0PSt0LHI+Pj49MCxpfHxfKGUsMCxyLDQpLHYud3JpdGUoZSx0LHIsbiwyMyw0KSxyKzR9ZnVuY3Rpb24gcShlLHQscixuLGkpe3JldHVybiB0PSt0LHI+Pj49MCxpfHxfKGUsMCxyLDgpLHYud3JpdGUoZSx0LHIsbiw1Miw4KSxyKzh9ZnVuY3Rpb24gdyhlLHQpe3Q9dHx8MS8wO2Zvcih2YXIgcixuPWUubGVuZ3RoLGk9bnVsbCxzPVtdLG89MDtuPm87KytvKXtpZigocj1lLmNoYXJDb2RlQXQobykpPjU1Mjk1JiY1NzM0ND5yKXtpZighaSl7aWYocj41NjMxOSl7KHQtPTMpPi0xJiZzLnB1c2goMjM5LDE5MSwxODkpO2NvbnRpbnVlfWlmKG8rMT09PW4peyh0LT0zKT4tMSYmcy5wdXNoKDIzOSwxOTEsMTg5KTtjb250aW51ZX1pPXI7Y29udGludWV9aWYoNTYzMjA+cil7KHQtPTMpPi0xJiZzLnB1c2goMjM5LDE5MSwxODkpLGk9cjtjb250aW51ZX1yPTY1NTM2KyhpLTU1Mjk2PDwxMHxyLTU2MzIwKX1lbHNlIGkmJih0LT0zKT4tMSYmcy5wdXNoKDIzOSwxOTEsMTg5KTtpZihpPW51bGwsMTI4PnIpe2lmKDA+KHQtPTEpKWJyZWFrO3MucHVzaChyKX1lbHNlIGlmKDIwNDg+cil7aWYoMD4odC09MikpYnJlYWs7cy5wdXNoKHI+PjZ8MTkyLDYzJnJ8MTI4KX1lbHNlIGlmKDY1NTM2PnIpe2lmKDA+KHQtPTMpKWJyZWFrO3MucHVzaChyPj4xMnwyMjQscj4+NiY2M3wxMjgsNjMmcnwxMjgpfWVsc2V7aWYocj49MTExNDExMil0aHJvdyBFcnJvcihcIkludmFsaWQgY29kZSBwb2ludFwiKTtpZigwPih0LT00KSlicmVhaztzLnB1c2gocj4+MTh8MjQwLHI+PjEyJjYzfDEyOCxyPj42JjYzfDEyOCw2MyZyfDEyOCl9fXJldHVybiBzfWZ1bmN0aW9uIGsoZSl7cmV0dXJuIGIudG9CeXRlQXJyYXkoZnVuY3Rpb24oZSl7aWYoMj4oZT1lLnRyaW0oKS5yZXBsYWNlKFIsXCJcIikpLmxlbmd0aClyZXR1cm5cIlwiO2Zvcig7ZS5sZW5ndGglNCE9MDspZSs9XCI9XCI7cmV0dXJuIGV9KGUpKX1mdW5jdGlvbiBBKGUsdCxyLG4pe2Zvcih2YXIgaT0wO24+aSYmKGkrcjx0Lmxlbmd0aCYmaTxlLmxlbmd0aCk7KytpKXRbaStyXT1lW2ldO3JldHVybiBpfWZ1bmN0aW9uIFMoZSl7cmV0dXJuIGUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcnx8bnVsbCE9ZSYmbnVsbCE9ZS5jb25zdHJ1Y3RvciYmXCJBcnJheUJ1ZmZlclwiPT09ZS5jb25zdHJ1Y3Rvci5uYW1lJiZcIm51bWJlclwiPT10eXBlb2YgZS5ieXRlTGVuZ3RofWZ1bmN0aW9uIEwoZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3JiZBcnJheUJ1ZmZlci5pc1ZpZXcoZSl9ZnVuY3Rpb24gRShlKXtyZXR1cm4gZSE9ZX10LkJ1ZmZlcj1uLHQuU2xvd0J1ZmZlcj1mdW5jdGlvbihlKXtyZXR1cm4rZSE9ZSYmKGU9MCksbi5hbGxvYygrZSl9LHQuSU5TUEVDVF9NQVhfQllURVM9NTA7dmFyIEM9MjE0NzQ4MzY0Nzt0LmtNYXhMZW5ndGg9Qywobi5UWVBFRF9BUlJBWV9TVVBQT1JUPWZ1bmN0aW9uKCl7dHJ5e3ZhciBlPW5ldyBVaW50OEFycmF5KDEpO3JldHVybiBlLl9fcHJvdG9fXz17X19wcm90b19fOlVpbnQ4QXJyYXkucHJvdG90eXBlLGZvbzpmdW5jdGlvbigpe3JldHVybiA0Mn19LDQyPT09ZS5mb28oKX1jYXRjaChlKXtyZXR1cm4hMX19KCkpfHx2b2lkIDA9PT1jb25zb2xlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBjb25zb2xlLmVycm9yfHxjb25zb2xlLmVycm9yKFwiVGhpcyBicm93c2VyIGxhY2tzIHR5cGVkIGFycmF5IChVaW50OEFycmF5KSBzdXBwb3J0IHdoaWNoIGlzIHJlcXVpcmVkIGJ5IGBidWZmZXJgIHY1LnguIFVzZSBgYnVmZmVyYCB2NC54IGlmIHlvdSByZXF1aXJlIG9sZCBicm93c2VyIHN1cHBvcnQuXCIpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5zcGVjaWVzJiZuW1N5bWJvbC5zcGVjaWVzXT09PW4mJk9iamVjdC5kZWZpbmVQcm9wZXJ0eShuLFN5bWJvbC5zcGVjaWVzLHt2YWx1ZTpudWxsLGNvbmZpZ3VyYWJsZTohMCxlbnVtZXJhYmxlOiExLHdyaXRhYmxlOiExfSksbi5wb29sU2l6ZT04MTkyLG4uZnJvbT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGkoZSx0LHIpfSxuLnByb3RvdHlwZS5fX3Byb3RvX189VWludDhBcnJheS5wcm90b3R5cGUsbi5fX3Byb3RvX189VWludDhBcnJheSxuLmFsbG9jPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gZnVuY3Rpb24oZSx0LG4pe3JldHVybiBzKGUpLGU+MCYmdm9pZCAwIT09dD9cInN0cmluZ1wiPT10eXBlb2Ygbj9yKGUpLmZpbGwodCxuKTpyKGUpLmZpbGwodCk6cihlKX0oZSx0LG4pfSxuLmFsbG9jVW5zYWZlPWZ1bmN0aW9uKGUpe3JldHVybiBvKGUpfSxuLmFsbG9jVW5zYWZlU2xvdz1mdW5jdGlvbihlKXtyZXR1cm4gbyhlKX0sbi5pc0J1ZmZlcj1mdW5jdGlvbihlKXtyZXR1cm4gbnVsbCE9ZSYmITA9PT1lLl9pc0J1ZmZlcn0sbi5jb21wYXJlPWZ1bmN0aW9uKGUsdCl7aWYoIW4uaXNCdWZmZXIoZSl8fCFuLmlzQnVmZmVyKHQpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzXCIpO2lmKGU9PT10KXJldHVybiAwO2Zvcih2YXIgcj1lLmxlbmd0aCxpPXQubGVuZ3RoLHM9MCxvPU1hdGgubWluKHIsaSk7bz5zOysrcylpZihlW3NdIT09dFtzXSl7cj1lW3NdLGk9dFtzXTticmVha31yZXR1cm4gaT5yPy0xOnI+aT8xOjB9LG4uaXNFbmNvZGluZz1mdW5jdGlvbihlKXtzd2l0Y2goKGUrXCJcIikudG9Mb3dlckNhc2UoKSl7Y2FzZVwiaGV4XCI6Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6Y2FzZVwiYXNjaWlcIjpjYXNlXCJsYXRpbjFcIjpjYXNlXCJiaW5hcnlcIjpjYXNlXCJiYXNlNjRcIjpjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4hMDtkZWZhdWx0OnJldHVybiExfX0sbi5jb25jYXQ9ZnVuY3Rpb24oZSx0KXtpZighQXJyYXkuaXNBcnJheShlKSl0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKTtpZigwPT09ZS5sZW5ndGgpcmV0dXJuIG4uYWxsb2MoMCk7dmFyIHI7aWYodm9pZCAwPT09dClmb3IodD0wLHI9MDtlLmxlbmd0aD5yOysrcil0Kz1lW3JdLmxlbmd0aDt2YXIgaT1uLmFsbG9jVW5zYWZlKHQpLHM9MDtmb3Iocj0wO2UubGVuZ3RoPnI7KytyKXt2YXIgbz1lW3JdO2lmKCFuLmlzQnVmZmVyKG8pKXRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpO28uY29weShpLHMpLHMrPW8ubGVuZ3RofXJldHVybiBpfSxuLmJ5dGVMZW5ndGg9YyxuLnByb3RvdHlwZS5faXNCdWZmZXI9ITAsbi5wcm90b3R5cGUuc3dhcDE2PWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5sZW5ndGg7aWYoZSUyIT0wKXRocm93IG5ldyBSYW5nZUVycm9yKFwiQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHNcIik7Zm9yKHZhciB0PTA7ZT50O3QrPTIpcCh0aGlzLHQsdCsxKTtyZXR1cm4gdGhpc30sbi5wcm90b3R5cGUuc3dhcDMyPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5sZW5ndGg7aWYoZSU0IT0wKXRocm93IG5ldyBSYW5nZUVycm9yKFwiQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHNcIik7Zm9yKHZhciB0PTA7ZT50O3QrPTQpcCh0aGlzLHQsdCszKSxwKHRoaXMsdCsxLHQrMik7cmV0dXJuIHRoaXN9LG4ucHJvdG90eXBlLnN3YXA2ND1mdW5jdGlvbigpe3ZhciBlPXRoaXMubGVuZ3RoO2lmKGUlOCE9MCl0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkJ1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzXCIpO2Zvcih2YXIgdD0wO2U+dDt0Kz04KXAodGhpcyx0LHQrNykscCh0aGlzLHQrMSx0KzYpLHAodGhpcyx0KzIsdCs1KSxwKHRoaXMsdCszLHQrNCk7cmV0dXJuIHRoaXN9LG4ucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5sZW5ndGg7cmV0dXJuIDA9PT1lP1wiXCI6MD09PWFyZ3VtZW50cy5sZW5ndGg/bSh0aGlzLDAsZSk6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPSExO2lmKCh2b2lkIDA9PT10fHwwPnQpJiYodD0wKSx0PnRoaXMubGVuZ3RoKXJldHVyblwiXCI7aWYoKHZvaWQgMD09PXJ8fHI+dGhpcy5sZW5ndGgpJiYocj10aGlzLmxlbmd0aCksMD49cilyZXR1cm5cIlwiO2lmKHI+Pj49MCwodD4+Pj0wKT49cilyZXR1cm5cIlwiO2ZvcihlfHwoZT1cInV0ZjhcIik7Oylzd2l0Y2goZSl7Y2FzZVwiaGV4XCI6cmV0dXJuIGZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1lLmxlbmd0aDt0JiZ0Pj0wfHwodD0wKSwoIXJ8fDA+cnx8cj5uKSYmKHI9bik7Zm9yKHZhciBpPVwiXCIscz10O3I+czsrK3MpaSs9ZnVuY3Rpb24oZSl7cmV0dXJuIDE2PmU/XCIwXCIrZS50b1N0cmluZygxNik6ZS50b1N0cmluZygxNil9KGVbc10pO3JldHVybiBpfSh0aGlzLHQscik7Y2FzZVwidXRmOFwiOmNhc2VcInV0Zi04XCI6cmV0dXJuIG0odGhpcyx0LHIpO2Nhc2VcImFzY2lpXCI6cmV0dXJuIGZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1cIlwiO3I9TWF0aC5taW4oZS5sZW5ndGgscik7Zm9yKHZhciBpPXQ7cj5pOysraSluKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDEyNyZlW2ldKTtyZXR1cm4gbn0odGhpcyx0LHIpO2Nhc2VcImxhdGluMVwiOmNhc2VcImJpbmFyeVwiOnJldHVybiBmdW5jdGlvbihlLHQscil7dmFyIG49XCJcIjtyPU1hdGgubWluKGUubGVuZ3RoLHIpO2Zvcih2YXIgaT10O3I+aTsrK2kpbis9U3RyaW5nLmZyb21DaGFyQ29kZShlW2ldKTtyZXR1cm4gbn0odGhpcyx0LHIpO2Nhc2VcImJhc2U2NFwiOnJldHVybiBmdW5jdGlvbihlLHQscil7cmV0dXJuIGIuZnJvbUJ5dGVBcnJheSgwPT09dCYmcj09PWUubGVuZ3RoP2U6ZS5zbGljZSh0LHIpKX0odGhpcyx0LHIpO2Nhc2VcInVjczJcIjpjYXNlXCJ1Y3MtMlwiOmNhc2VcInV0ZjE2bGVcIjpjYXNlXCJ1dGYtMTZsZVwiOnJldHVybiBmdW5jdGlvbihlLHQscil7Zm9yKHZhciBuPWUuc2xpY2UodCxyKSxpPVwiXCIscz0wO24ubGVuZ3RoPnM7cys9MilpKz1TdHJpbmcuZnJvbUNoYXJDb2RlKG5bc10rMjU2Km5bcysxXSk7cmV0dXJuIGl9KHRoaXMsdCxyKTtkZWZhdWx0OmlmKG4pdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gZW5jb2Rpbmc6IFwiK2UpO2U9KGUrXCJcIikudG9Mb3dlckNhc2UoKSxuPSEwfX0uYXBwbHkodGhpcyxhcmd1bWVudHMpfSxuLnByb3RvdHlwZS5lcXVhbHM9ZnVuY3Rpb24oZSl7aWYoIW4uaXNCdWZmZXIoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXJcIik7cmV0dXJuIHRoaXM9PT1lfHwwPT09bi5jb21wYXJlKHRoaXMsZSl9LG4ucHJvdG90eXBlLmluc3BlY3Q9ZnVuY3Rpb24oKXt2YXIgZT1cIlwiLHI9dC5JTlNQRUNUX01BWF9CWVRFUztyZXR1cm4gdGhpcy5sZW5ndGg+MCYmKGU9dGhpcy50b1N0cmluZyhcImhleFwiLDAscikubWF0Y2goLy57Mn0vZykuam9pbihcIiBcIiksdGhpcy5sZW5ndGg+ciYmKGUrPVwiIC4uLiBcIikpLFwiPEJ1ZmZlciBcIitlK1wiPlwifSxuLnByb3RvdHlwZS5jb21wYXJlPWZ1bmN0aW9uKGUsdCxyLGkscyl7aWYoIW4uaXNCdWZmZXIoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXJcIik7aWYodm9pZCAwPT09dCYmKHQ9MCksdm9pZCAwPT09ciYmKHI9ZT9lLmxlbmd0aDowKSx2b2lkIDA9PT1pJiYoaT0wKSx2b2lkIDA9PT1zJiYocz10aGlzLmxlbmd0aCksMD50fHxyPmUubGVuZ3RofHwwPml8fHM+dGhpcy5sZW5ndGgpdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJvdXQgb2YgcmFuZ2UgaW5kZXhcIik7aWYoaT49cyYmdD49cilyZXR1cm4gMDtpZihpPj1zKXJldHVybi0xO2lmKHQ+PXIpcmV0dXJuIDE7aWYodD4+Pj0wLHI+Pj49MCxpPj4+PTAscz4+Pj0wLHRoaXM9PT1lKXJldHVybiAwO2Zvcih2YXIgbz1zLWksdT1yLXQsYT1NYXRoLm1pbihvLHUpLGM9dGhpcy5zbGljZShpLHMpLHA9ZS5zbGljZSh0LHIpLGY9MDthPmY7KytmKWlmKGNbZl0hPT1wW2ZdKXtvPWNbZl0sdT1wW2ZdO2JyZWFrfXJldHVybiB1Pm8/LTE6bz51PzE6MH0sbi5wcm90b3R5cGUuaW5jbHVkZXM9ZnVuY3Rpb24oZSx0LHIpe3JldHVybi0xIT09dGhpcy5pbmRleE9mKGUsdCxyKX0sbi5wcm90b3R5cGUuaW5kZXhPZj1mdW5jdGlvbihlLHQscil7cmV0dXJuIGYodGhpcyxlLHQsciwhMCl9LG4ucHJvdG90eXBlLmxhc3RJbmRleE9mPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZih0aGlzLGUsdCxyLCExKX0sbi5wcm90b3R5cGUud3JpdGU9ZnVuY3Rpb24oZSx0LHIsbil7aWYodm9pZCAwPT09dCluPVwidXRmOFwiLHI9dGhpcy5sZW5ndGgsdD0wO2Vsc2UgaWYodm9pZCAwPT09ciYmXCJzdHJpbmdcIj09dHlwZW9mIHQpbj10LHI9dGhpcy5sZW5ndGgsdD0wO2Vsc2V7aWYoIWlzRmluaXRlKHQpKXRocm93IEVycm9yKFwiQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWRcIik7dD4+Pj0wLGlzRmluaXRlKHIpPyhyPj4+PTAsdm9pZCAwPT09biYmKG49XCJ1dGY4XCIpKToobj1yLHI9dm9pZCAwKX12YXIgaT10aGlzLmxlbmd0aC10O2lmKCh2b2lkIDA9PT1yfHxyPmkpJiYocj1pKSxlLmxlbmd0aD4wJiYoMD5yfHwwPnQpfHx0PnRoaXMubGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwiQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHNcIik7bnx8KG49XCJ1dGY4XCIpO2Zvcih2YXIgcz0hMTs7KXN3aXRjaChuKXtjYXNlXCJoZXhcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9ZS5sZW5ndGgtKHI9K3J8fDApO24/KG49K24pPmkmJihuPWkpOm49aTt2YXIgcz10Lmxlbmd0aDtpZihzJTIhPTApdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgaGV4IHN0cmluZ1wiKTtuPnMvMiYmKG49cy8yKTtmb3IodmFyIG89MDtuPm87KytvKXt2YXIgdT1wYXJzZUludCh0LnN1YnN0cigyKm8sMiksMTYpO2lmKEUodSkpcmV0dXJuIG87ZVtyK29dPXV9cmV0dXJuIG99KHRoaXMsZSx0LHIpO2Nhc2VcInV0ZjhcIjpjYXNlXCJ1dGYtOFwiOnJldHVybiBmdW5jdGlvbihlLHQscixuKXtyZXR1cm4gQSh3KHQsZS5sZW5ndGgtciksZSxyLG4pfSh0aGlzLGUsdCxyKTtjYXNlXCJhc2NpaVwiOnJldHVybiBsKHRoaXMsZSx0LHIpO2Nhc2VcImxhdGluMVwiOmNhc2VcImJpbmFyeVwiOnJldHVybiBmdW5jdGlvbihlLHQscixuKXtyZXR1cm4gbChlLHQscixuKX0odGhpcyxlLHQscik7Y2FzZVwiYmFzZTY0XCI6cmV0dXJuIGZ1bmN0aW9uKGUsdCxyLG4pe3JldHVybiBBKGsodCksZSxyLG4pfSh0aGlzLGUsdCxyKTtjYXNlXCJ1Y3MyXCI6Y2FzZVwidWNzLTJcIjpjYXNlXCJ1dGYxNmxlXCI6Y2FzZVwidXRmLTE2bGVcIjpyZXR1cm4gZnVuY3Rpb24oZSx0LHIsbil7cmV0dXJuIEEoZnVuY3Rpb24oZSx0KXtmb3IodmFyIHIsbixpPVtdLHM9MDtlLmxlbmd0aD5zJiYodC09Mik+PTA7KytzKXI9ZS5jaGFyQ29kZUF0KHMpLG49cj4+OCxpLnB1c2gociUyNTYpLGkucHVzaChuKTtyZXR1cm4gaX0odCxlLmxlbmd0aC1yKSxlLHIsbil9KHRoaXMsZSx0LHIpO2RlZmF1bHQ6aWYocyl0aHJvdyBuZXcgVHlwZUVycm9yKFwiVW5rbm93biBlbmNvZGluZzogXCIrbik7bj0oXCJcIituKS50b0xvd2VyQ2FzZSgpLHM9ITB9fSxuLnByb3RvdHlwZS50b0pTT049ZnVuY3Rpb24oKXtyZXR1cm57dHlwZTpcIkJ1ZmZlclwiLGRhdGE6QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyfHx0aGlzLDApfX07dmFyIFU9NDA5NjtuLnByb3RvdHlwZS5zbGljZT1mdW5jdGlvbihlLHQpe3ZhciByPXRoaXMubGVuZ3RoO2U9fn5lLHQ9dm9pZCAwPT09dD9yOn5+dCwwPmU/MD4oZSs9cikmJihlPTApOmU+ciYmKGU9ciksMD50PzA+KHQrPXIpJiYodD0wKTp0PnImJih0PXIpLGU+dCYmKHQ9ZSk7dmFyIGk9dGhpcy5zdWJhcnJheShlLHQpO3JldHVybiBpLl9fcHJvdG9fXz1uLnByb3RvdHlwZSxpfSxuLnByb3RvdHlwZS5yZWFkVUludExFPWZ1bmN0aW9uKGUsdCxyKXtlPj4+PTAsdD4+Pj0wLHJ8fGQoZSx0LHRoaXMubGVuZ3RoKTtmb3IodmFyIG49dGhpc1tlXSxpPTEscz0wOysrczx0JiYoaSo9MjU2KTspbis9dGhpc1tlK3NdKmk7cmV0dXJuIG59LG4ucHJvdG90eXBlLnJlYWRVSW50QkU9ZnVuY3Rpb24oZSx0LHIpe2U+Pj49MCx0Pj4+PTAscnx8ZChlLHQsdGhpcy5sZW5ndGgpO2Zvcih2YXIgbj10aGlzW2UrLS10XSxpPTE7dD4wJiYoaSo9MjU2KTspbis9dGhpc1tlKy0tdF0qaTtyZXR1cm4gbn0sbi5wcm90b3R5cGUucmVhZFVJbnQ4PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsMSx0aGlzLmxlbmd0aCksdGhpc1tlXX0sbi5wcm90b3R5cGUucmVhZFVJbnQxNkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsMix0aGlzLmxlbmd0aCksdGhpc1tlXXx0aGlzW2UrMV08PDh9LG4ucHJvdG90eXBlLnJlYWRVSW50MTZCRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDIsdGhpcy5sZW5ndGgpLHRoaXNbZV08PDh8dGhpc1tlKzFdfSxuLnByb3RvdHlwZS5yZWFkVUludDMyTEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw0LHRoaXMubGVuZ3RoKSwodGhpc1tlXXx0aGlzW2UrMV08PDh8dGhpc1tlKzJdPDwxNikrMTY3NzcyMTYqdGhpc1tlKzNdfSxuLnByb3RvdHlwZS5yZWFkVUludDMyQkU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw0LHRoaXMubGVuZ3RoKSwxNjc3NzIxNip0aGlzW2VdKyh0aGlzW2UrMV08PDE2fHRoaXNbZSsyXTw8OHx0aGlzW2UrM10pfSxuLnByb3RvdHlwZS5yZWFkSW50TEU9ZnVuY3Rpb24oZSx0LHIpe2U+Pj49MCx0Pj4+PTAscnx8ZChlLHQsdGhpcy5sZW5ndGgpO2Zvcih2YXIgbj10aGlzW2VdLGk9MSxzPTA7KytzPHQmJihpKj0yNTYpOyluKz10aGlzW2Urc10qaTtyZXR1cm4oaSo9MTI4KT5ufHwobi09TWF0aC5wb3coMiw4KnQpKSxufSxuLnByb3RvdHlwZS5yZWFkSW50QkU9ZnVuY3Rpb24oZSx0LHIpe2U+Pj49MCx0Pj4+PTAscnx8ZChlLHQsdGhpcy5sZW5ndGgpO2Zvcih2YXIgbj10LGk9MSxzPXRoaXNbZSstLW5dO24+MCYmKGkqPTI1Nik7KXMrPXRoaXNbZSstLW5dKmk7cmV0dXJuKGkqPTEyOCk+c3x8KHMtPU1hdGgucG93KDIsOCp0KSksc30sbi5wcm90b3R5cGUucmVhZEludDg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSwxLHRoaXMubGVuZ3RoKSwxMjgmdGhpc1tlXT8tMSooMjU1LXRoaXNbZV0rMSk6dGhpc1tlXX0sbi5wcm90b3R5cGUucmVhZEludDE2TEU9ZnVuY3Rpb24oZSx0KXtlPj4+PTAsdHx8ZChlLDIsdGhpcy5sZW5ndGgpO3ZhciByPXRoaXNbZV18dGhpc1tlKzFdPDw4O3JldHVybiAzMjc2OCZyPzQyOTQ5MDE3NjB8cjpyfSxuLnByb3RvdHlwZS5yZWFkSW50MTZCRT1mdW5jdGlvbihlLHQpe2U+Pj49MCx0fHxkKGUsMix0aGlzLmxlbmd0aCk7dmFyIHI9dGhpc1tlKzFdfHRoaXNbZV08PDg7cmV0dXJuIDMyNzY4JnI/NDI5NDkwMTc2MHxyOnJ9LG4ucHJvdG90eXBlLnJlYWRJbnQzMkxFPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGU+Pj49MCx0fHxkKGUsNCx0aGlzLmxlbmd0aCksdGhpc1tlXXx0aGlzW2UrMV08PDh8dGhpc1tlKzJdPDwxNnx0aGlzW2UrM108PDI0fSxuLnByb3RvdHlwZS5yZWFkSW50MzJCRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDQsdGhpcy5sZW5ndGgpLHRoaXNbZV08PDI0fHRoaXNbZSsxXTw8MTZ8dGhpc1tlKzJdPDw4fHRoaXNbZSszXX0sbi5wcm90b3R5cGUucmVhZEZsb2F0TEU9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZT4+Pj0wLHR8fGQoZSw0LHRoaXMubGVuZ3RoKSx2LnJlYWQodGhpcyxlLCEwLDIzLDQpfSxuLnByb3RvdHlwZS5yZWFkRmxvYXRCRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDQsdGhpcy5sZW5ndGgpLHYucmVhZCh0aGlzLGUsITEsMjMsNCl9LG4ucHJvdG90eXBlLnJlYWREb3VibGVMRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDgsdGhpcy5sZW5ndGgpLHYucmVhZCh0aGlzLGUsITAsNTIsOCl9LG4ucHJvdG90eXBlLnJlYWREb3VibGVCRT1mdW5jdGlvbihlLHQpe3JldHVybiBlPj4+PTAsdHx8ZChlLDgsdGhpcy5sZW5ndGgpLHYucmVhZCh0aGlzLGUsITEsNTIsOCl9LG4ucHJvdG90eXBlLndyaXRlVUludExFPWZ1bmN0aW9uKGUsdCxyLG4pe2lmKGU9K2UsdD4+Pj0wLHI+Pj49MCwhbil7Zyh0aGlzLGUsdCxyLE1hdGgucG93KDIsOCpyKS0xLDApfXZhciBpPTEscz0wO2Zvcih0aGlzW3RdPTI1NSZlOysrczxyJiYoaSo9MjU2KTspdGhpc1t0K3NdPWUvaSYyNTU7cmV0dXJuIHQrcn0sbi5wcm90b3R5cGUud3JpdGVVSW50QkU9ZnVuY3Rpb24oZSx0LHIsbil7aWYoZT0rZSx0Pj4+PTAscj4+Pj0wLCFuKXtnKHRoaXMsZSx0LHIsTWF0aC5wb3coMiw4KnIpLTEsMCl9dmFyIGk9ci0xLHM9MTtmb3IodGhpc1t0K2ldPTI1NSZlOy0taT49MCYmKHMqPTI1Nik7KXRoaXNbdCtpXT1lL3MmMjU1O3JldHVybiB0K3J9LG4ucHJvdG90eXBlLndyaXRlVUludDg9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlPStlLHQ+Pj49MCxyfHxnKHRoaXMsZSx0LDEsMjU1LDApLHRoaXNbdF09MjU1JmUsdCsxfSxuLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCwyLDY1NTM1LDApLHRoaXNbdF09MjU1JmUsdGhpc1t0KzFdPWU+Pj44LHQrMn0sbi5wcm90b3R5cGUud3JpdGVVSW50MTZCRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGU9K2UsdD4+Pj0wLHJ8fGcodGhpcyxlLHQsMiw2NTUzNSwwKSx0aGlzW3RdPWU+Pj44LHRoaXNbdCsxXT0yNTUmZSx0KzJ9LG4ucHJvdG90eXBlLndyaXRlVUludDMyTEU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlPStlLHQ+Pj49MCxyfHxnKHRoaXMsZSx0LDQsNDI5NDk2NzI5NSwwKSx0aGlzW3QrM109ZT4+PjI0LHRoaXNbdCsyXT1lPj4+MTYsdGhpc1t0KzFdPWU+Pj44LHRoaXNbdF09MjU1JmUsdCs0fSxuLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCw0LDQyOTQ5NjcyOTUsMCksdGhpc1t0XT1lPj4+MjQsdGhpc1t0KzFdPWU+Pj4xNix0aGlzW3QrMl09ZT4+PjgsdGhpc1t0KzNdPTI1NSZlLHQrNH0sbi5wcm90b3R5cGUud3JpdGVJbnRMRT1mdW5jdGlvbihlLHQscixuKXtpZihlPStlLHQ+Pj49MCwhbil7dmFyIGk9TWF0aC5wb3coMiw4KnItMSk7Zyh0aGlzLGUsdCxyLGktMSwtaSl9dmFyIHM9MCxvPTEsdT0wO2Zvcih0aGlzW3RdPTI1NSZlOysrczxyJiYobyo9MjU2KTspMD5lJiYwPT09dSYmMCE9PXRoaXNbdCtzLTFdJiYodT0xKSx0aGlzW3Qrc109KGUvbz4+MCktdSYyNTU7cmV0dXJuIHQrcn0sbi5wcm90b3R5cGUud3JpdGVJbnRCRT1mdW5jdGlvbihlLHQscixuKXtpZihlPStlLHQ+Pj49MCwhbil7dmFyIGk9TWF0aC5wb3coMiw4KnItMSk7Zyh0aGlzLGUsdCxyLGktMSwtaSl9dmFyIHM9ci0xLG89MSx1PTA7Zm9yKHRoaXNbdCtzXT0yNTUmZTstLXM+PTAmJihvKj0yNTYpOykwPmUmJjA9PT11JiYwIT09dGhpc1t0K3MrMV0mJih1PTEpLHRoaXNbdCtzXT0oZS9vPj4wKS11JjI1NTtyZXR1cm4gdCtyfSxuLnByb3RvdHlwZS53cml0ZUludDg9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlPStlLHQ+Pj49MCxyfHxnKHRoaXMsZSx0LDEsMTI3LC0xMjgpLDA+ZSYmKGU9MjU1K2UrMSksdGhpc1t0XT0yNTUmZSx0KzF9LG4ucHJvdG90eXBlLndyaXRlSW50MTZMRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGU9K2UsdD4+Pj0wLHJ8fGcodGhpcyxlLHQsMiwzMjc2NywtMzI3NjgpLHRoaXNbdF09MjU1JmUsdGhpc1t0KzFdPWU+Pj44LHQrMn0sbi5wcm90b3R5cGUud3JpdGVJbnQxNkJFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCwyLDMyNzY3LC0zMjc2OCksdGhpc1t0XT1lPj4+OCx0aGlzW3QrMV09MjU1JmUsdCsyfSxuLnByb3RvdHlwZS53cml0ZUludDMyTEU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlPStlLHQ+Pj49MCxyfHxnKHRoaXMsZSx0LDQsMjE0NzQ4MzY0NywtMjE0NzQ4MzY0OCksdGhpc1t0XT0yNTUmZSx0aGlzW3QrMV09ZT4+PjgsdGhpc1t0KzJdPWU+Pj4xNix0aGlzW3QrM109ZT4+PjI0LHQrNH0sbi5wcm90b3R5cGUud3JpdGVJbnQzMkJFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZT0rZSx0Pj4+PTAscnx8Zyh0aGlzLGUsdCw0LDIxNDc0ODM2NDcsLTIxNDc0ODM2NDgpLDA+ZSYmKGU9NDI5NDk2NzI5NStlKzEpLHRoaXNbdF09ZT4+PjI0LHRoaXNbdCsxXT1lPj4+MTYsdGhpc1t0KzJdPWU+Pj44LHRoaXNbdCszXT0yNTUmZSx0KzR9LG4ucHJvdG90eXBlLndyaXRlRmxvYXRMRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIHkodGhpcyxlLHQsITAscil9LG4ucHJvdG90eXBlLndyaXRlRmxvYXRCRT1mdW5jdGlvbihlLHQscil7cmV0dXJuIHkodGhpcyxlLHQsITEscil9LG4ucHJvdG90eXBlLndyaXRlRG91YmxlTEU9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBxKHRoaXMsZSx0LCEwLHIpfSxuLnByb3RvdHlwZS53cml0ZURvdWJsZUJFPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gcSh0aGlzLGUsdCwhMSxyKX0sbi5wcm90b3R5cGUuY29weT1mdW5jdGlvbihlLHQscixuKXtpZihyfHwocj0wKSxufHwwPT09bnx8KG49dGhpcy5sZW5ndGgpLGUubGVuZ3RoPnR8fCh0PWUubGVuZ3RoKSx0fHwodD0wKSxuPjAmJnI+biYmKG49ciksbj09PXIpcmV0dXJuIDA7aWYoMD09PWUubGVuZ3RofHwwPT09dGhpcy5sZW5ndGgpcmV0dXJuIDA7aWYoMD50KXRocm93IG5ldyBSYW5nZUVycm9yKFwidGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kc1wiKTtpZigwPnJ8fHI+PXRoaXMubGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwic291cmNlU3RhcnQgb3V0IG9mIGJvdW5kc1wiKTtpZigwPm4pdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJzb3VyY2VFbmQgb3V0IG9mIGJvdW5kc1wiKTtuPnRoaXMubGVuZ3RoJiYobj10aGlzLmxlbmd0aCksbi1yPmUubGVuZ3RoLXQmJihuPWUubGVuZ3RoLXQrcik7dmFyIGkscz1uLXI7aWYodGhpcz09PWUmJnQ+ciYmbj50KWZvcihpPXMtMTtpPj0wOy0taSllW2krdF09dGhpc1tpK3JdO2Vsc2UgaWYoMWUzPnMpZm9yKGk9MDtzPmk7KytpKWVbaSt0XT10aGlzW2krcl07ZWxzZSBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChlLHRoaXMuc3ViYXJyYXkocixyK3MpLHQpO3JldHVybiBzfSxuLnByb3RvdHlwZS5maWxsPWZ1bmN0aW9uKGUsdCxyLGkpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgdD8oaT10LHQ9MCxyPXRoaXMubGVuZ3RoKTpcInN0cmluZ1wiPT10eXBlb2YgciYmKGk9cixyPXRoaXMubGVuZ3RoKSwxPT09ZS5sZW5ndGgpe3ZhciBzPWUuY2hhckNvZGVBdCgwKTsyNTY+cyYmKGU9cyl9aWYodm9pZCAwIT09aSYmXCJzdHJpbmdcIiE9dHlwZW9mIGkpdGhyb3cgbmV3IFR5cGVFcnJvcihcImVuY29kaW5nIG11c3QgYmUgYSBzdHJpbmdcIik7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGkmJiFuLmlzRW5jb2RpbmcoaSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVua25vd24gZW5jb2Rpbmc6IFwiK2kpfWVsc2VcIm51bWJlclwiPT10eXBlb2YgZSYmKGUmPTI1NSk7aWYoMD50fHx0PnRoaXMubGVuZ3RofHxyPnRoaXMubGVuZ3RoKXRocm93IG5ldyBSYW5nZUVycm9yKFwiT3V0IG9mIHJhbmdlIGluZGV4XCIpO2lmKHQ+PXIpcmV0dXJuIHRoaXM7dD4+Pj0wLHI9dm9pZCAwPT09cj90aGlzLmxlbmd0aDpyPj4+MCxlfHwoZT0wKTt2YXIgbztpZihcIm51bWJlclwiPT10eXBlb2YgZSlmb3Iobz10O3I+bzsrK28pdGhpc1tvXT1lO2Vsc2V7dmFyIHU9bi5pc0J1ZmZlcihlKT9lOm5ldyBuKGUsaSksYT11Lmxlbmd0aDtmb3Iobz0wO3ItdD5vOysrbyl0aGlzW28rdF09dVtvJWFdfXJldHVybiB0aGlzfTt2YXIgUj0vW14rLzAtOUEtWmEtei1fXS9nfSkuQnVmZmVyO1wiZnVuY3Rpb25cIiE9dHlwZW9mIE9iamVjdC5hc3NpZ24mJihPYmplY3QuYXNzaWduPWZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpO2lmKHZvaWQgMD09PWV8fG51bGw9PT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3RcIik7Zm9yKHQ9T2JqZWN0KGUpLHI9MTthcmd1bWVudHMubGVuZ3RoPnI7cisrKWlmKHZvaWQgMCE9PShuPWFyZ3VtZW50c1tyXSkmJm51bGwhPT1uKWZvcihpIGluIG4pbi5oYXNPd25Qcm9wZXJ0eShpKSYmKHRbaV09bltpXSk7cmV0dXJuIHR9KSxBcnJheS5wcm90b3R5cGUuaW5jbHVkZXN8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsXCJpbmNsdWRlc1wiLHt2YWx1ZTpmdW5jdGlvbihlLHQpe2lmKG51bGw9PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ0aGlzXCIgaXMgbnVsbCBvciBub3QgZGVmaW5lZCcpO3ZhciByPU9iamVjdCh0aGlzKSxuPXIubGVuZ3RoPj4+MDtpZigwPT09bilyZXR1cm4hMTtmb3IodmFyIGk9MHx0LHM9TWF0aC5tYXgoMD5pP24tTWF0aC5hYnMoaSk6aSwwKTtuPnM7KXtpZihmdW5jdGlvbihlLHQpe3JldHVybiBlPT09dHx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwibnVtYmVyXCI9PXR5cGVvZiB0JiZpc05hTihlKSYmaXNOYU4odCl9KHJbc10sZSkpcmV0dXJuITA7cysrfXJldHVybiExfX0pO3ZhciBxPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbihlKXtzKHRoaXMsbiksdGhpcy5hY2Nlc3NUb2tlbj0oZT1lfHx7fSkuYWNjZXNzVG9rZW4sdGhpcy5jbGllbnRJZD1lLmNsaWVudElkLHRoaXMuY2xpZW50U2VjcmV0PWUuY2xpZW50U2VjcmV0LHRoaXMuc2VsZWN0VXNlcj1lLnNlbGVjdFVzZXIsdGhpcy5zZWxlY3RBZG1pbj1lLnNlbGVjdEFkbWluLHRoaXMuZmV0Y2g9ZS5mZXRjaHx8ZmV0Y2gsdGhpcy5wYXRoUm9vdD1lLnBhdGhSb290LGUuZmV0Y2h8fGNvbnNvbGUud2FybihcIkdsb2JhbCBmZXRjaCBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHVuc3VwcG9ydGVkIGluIGEgZnV0dXJlIHZlcnNpb24uIFBsZWFzZSBwYXNzIGZldGNoIGZ1bmN0aW9uIGFzIG9wdGlvbiB3aGVuIGluc3RhbnRpYXRpbmcgZHJvcGJveCBpbnN0YW5jZTogbmV3IERyb3Bib3goe2ZldGNofSlcIil9cmV0dXJuIG8obixbe2tleTpcInNldEFjY2Vzc1Rva2VuXCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5hY2Nlc3NUb2tlbj1lfX0se2tleTpcImdldEFjY2Vzc1Rva2VuXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hY2Nlc3NUb2tlbn19LHtrZXk6XCJzZXRDbGllbnRJZFwiLHZhbHVlOmZ1bmN0aW9uKGUpe3RoaXMuY2xpZW50SWQ9ZX19LHtrZXk6XCJnZXRDbGllbnRJZFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xpZW50SWR9fSx7a2V5Olwic2V0Q2xpZW50U2VjcmV0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5jbGllbnRTZWNyZXQ9ZX19LHtrZXk6XCJnZXRDbGllbnRTZWNyZXRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsaWVudFNlY3JldH19LHtrZXk6XCJnZXRBdXRoZW50aWNhdGlvblVybFwiLHZhbHVlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0/YXJndW1lbnRzWzJdOlwidG9rZW5cIixuPXRoaXMuZ2V0Q2xpZW50SWQoKSxpPVwiaHR0cHM6Ly93d3cuZHJvcGJveC5jb20vb2F1dGgyL2F1dGhvcml6ZVwiO2lmKCFuKXRocm93IEVycm9yKFwiQSBjbGllbnQgaWQgaXMgcmVxdWlyZWQuIFlvdSBjYW4gc2V0IHRoZSBjbGllbnQgaWQgdXNpbmcgLnNldENsaWVudElkKCkuXCIpO2lmKFwiY29kZVwiIT09ciYmIWUpdGhyb3cgRXJyb3IoXCJBIHJlZGlyZWN0IHVyaSBpcyByZXF1aXJlZC5cIik7aWYoIVtcImNvZGVcIixcInRva2VuXCJdLmluY2x1ZGVzKHIpKXRocm93IEVycm9yKFwiQXV0aG9yaXphdGlvbiB0eXBlIG11c3QgYmUgY29kZSBvciB0b2tlblwiKTt2YXIgcz12b2lkIDA7cmV0dXJuIHM9XCJjb2RlXCI9PT1yP2krXCI/cmVzcG9uc2VfdHlwZT1jb2RlJmNsaWVudF9pZD1cIituOmkrXCI/cmVzcG9uc2VfdHlwZT10b2tlbiZjbGllbnRfaWQ9XCIrbixlJiYocys9XCImcmVkaXJlY3RfdXJpPVwiK2UpLHQmJihzKz1cIiZzdGF0ZT1cIit0KSxzfX0se2tleTpcImdldEFjY2Vzc1Rva2VuRnJvbUNvZGVcIix2YWx1ZTpmdW5jdGlvbihlLHQpe3ZhciByPXRoaXMuZ2V0Q2xpZW50SWQoKSxuPXRoaXMuZ2V0Q2xpZW50U2VjcmV0KCk7aWYoIXIpdGhyb3cgRXJyb3IoXCJBIGNsaWVudCBpZCBpcyByZXF1aXJlZC4gWW91IGNhbiBzZXQgdGhlIGNsaWVudCBpZCB1c2luZyAuc2V0Q2xpZW50SWQoKS5cIik7aWYoIW4pdGhyb3cgRXJyb3IoXCJBIGNsaWVudCBzZWNyZXQgaXMgcmVxdWlyZWQuIFlvdSBjYW4gc2V0IHRoZSBjbGllbnQgaWQgdXNpbmcgLnNldENsaWVudFNlY3JldCgpLlwiKTtyZXR1cm4gdGhpcy5mZXRjaChcImh0dHBzOi8vYXBpLmRyb3Bib3hhcGkuY29tL29hdXRoMi90b2tlbj9jb2RlPVwiK3QrXCImZ3JhbnRfdHlwZT1hdXRob3JpemF0aW9uX2NvZGUmcmVkaXJlY3RfdXJpPVwiK2UrXCImY2xpZW50X2lkPVwiK3IrXCImY2xpZW50X3NlY3JldD1cIituLHttZXRob2Q6XCJQT1NUXCIsaGVhZGVyczp7XCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwifX0pLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciB0PWUuY2xvbmUoKTtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocil7ZS5qc29uKCkudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gcihlKX0pLmNhdGNoKGZ1bmN0aW9uKCl7cmV0dXJuIHQudGV4dCgpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHIoZSl9KX0pfSkudGhlbihmdW5jdGlvbih0KXtyZXR1cm5bZSx0XX0pfShlKX0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9YyhlLDIpLHI9dFswXSxuPXRbMV07aWYoIXIub2spdGhyb3d7ZXJyb3I6bixyZXNwb25zZTpyLHN0YXR1czpyLnN0YXR1c307cmV0dXJuIG4uYWNjZXNzX3Rva2VufSl9fSx7a2V5OlwiYXV0aGVudGljYXRlV2l0aENvcmRvdmFcIix2YWx1ZTpmdW5jdGlvbihlLHQpe2Z1bmN0aW9uIHIoZSl7LTk5OSE9PWUuY29kZSYmKHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dS5jbG9zZSgpfSwxMCksdCgpKX1mdW5jdGlvbiBuKHIpe2lmKHIudXJsLmluZGV4T2YoXCImZXJyb3I9XCIpPi0xKXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dS5jbG9zZSgpfSwxMCksdCgpO2Vsc2V7dmFyIG49ci51cmwuaW5kZXhPZihcIiNhY2Nlc3NfdG9rZW49XCIpLGk9ci51cmwuaW5kZXhPZihcIiZ0b2tlbl90eXBlPVwiKTtpZihuPi0xKXtuKz0xNCx3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3UuY2xvc2UoKX0sMTApO3ZhciBzPXIudXJsLnN1YnN0cmluZyhuLGkpO2Uocyl9fX1mdW5jdGlvbiBpKCl7b3x8KHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRlcnJvclwiLHIpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRzdG9wXCIsbiksdS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXhpdFwiLGkpLG89ITApfXZhciBzPXRoaXMuZ2V0QXV0aGVudGljYXRpb25VcmwoXCJodHRwczovL3d3dy5kcm9wYm94LmNvbS8xL29hdXRoMi9yZWRpcmVjdF9yZWNlaXZlclwiKSxvPSExLHU9d2luZG93Lm9wZW4ocyxcIl9ibGFua1wiKTt1LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZXJyb3JcIixyKSx1LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2Fkc3RvcFwiLG4pLHUuYWRkRXZlbnRMaXN0ZW5lcihcImV4aXRcIixpKX19LHtrZXk6XCJyZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0LHIsbixpKXt2YXIgcz1udWxsO3N3aXRjaChpKXtjYXNlXCJycGNcIjpzPXRoaXMuZ2V0UnBjUmVxdWVzdCgpO2JyZWFrO2Nhc2VcImRvd25sb2FkXCI6cz10aGlzLmdldERvd25sb2FkUmVxdWVzdCgpO2JyZWFrO2Nhc2VcInVwbG9hZFwiOnM9dGhpcy5nZXRVcGxvYWRSZXF1ZXN0KCk7YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcIkludmFsaWQgcmVxdWVzdCBzdHlsZTogXCIraSl9dmFyIG89e3NlbGVjdFVzZXI6dGhpcy5zZWxlY3RVc2VyLHNlbGVjdEFkbWluOnRoaXMuc2VsZWN0QWRtaW4sY2xpZW50SWQ6dGhpcy5nZXRDbGllbnRJZCgpLGNsaWVudFNlY3JldDp0aGlzLmdldENsaWVudFNlY3JldCgpLHBhdGhSb290OnRoaXMucGF0aFJvb3R9O3JldHVybiBzKGUsdCxyLG4sdGhpcy5nZXRBY2Nlc3NUb2tlbigpLG8pfX0se2tleTpcInNldFJwY1JlcXVlc3RcIix2YWx1ZTpmdW5jdGlvbihlKXt0aGlzLnJwY1JlcXVlc3Q9ZX19LHtrZXk6XCJnZXRScGNSZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdm9pZCAwPT09dGhpcy5ycGNSZXF1ZXN0JiYodGhpcy5ycGNSZXF1ZXN0PWZ1bmN0aW9uKGUpe3JldHVybiBmdW5jdGlvbihyLG4saSxzLG8sdSl7dmFyIGE9e21ldGhvZDpcIlBPU1RcIixib2R5Om4/SlNPTi5zdHJpbmdpZnkobik6bnVsbH0scD17fTtuJiYocFtcIkNvbnRlbnQtVHlwZVwiXT1cImFwcGxpY2F0aW9uL2pzb25cIik7dmFyIGY9XCJcIjtzd2l0Y2goaSl7Y2FzZVwiYXBwXCI6aWYoIXUuY2xpZW50SWR8fCF1LmNsaWVudFNlY3JldCl0aHJvdyBFcnJvcihcIkEgY2xpZW50IGlkIGFuZCBzZWNyZXQgaXMgcmVxdWlyZWQgZm9yIHRoaXMgZnVuY3Rpb25cIik7Zj1uZXcgeSh1LmNsaWVudElkK1wiOlwiK3UuY2xpZW50U2VjcmV0KS50b1N0cmluZyhcImJhc2U2NFwiKSxwLkF1dGhvcml6YXRpb249XCJCYXNpYyBcIitmO2JyZWFrO2Nhc2VcInRlYW1cIjpjYXNlXCJ1c2VyXCI6cC5BdXRob3JpemF0aW9uPVwiQmVhcmVyIFwiK287YnJlYWs7Y2FzZVwibm9hdXRoXCI6YnJlYWs7ZGVmYXVsdDp0aHJvdyBFcnJvcihcIlVuaGFuZGxlZCBhdXRoIHR5cGU6IFwiK2kpfXJldHVybiB1JiYodS5zZWxlY3RVc2VyJiYocFtcIkRyb3Bib3gtQVBJLVNlbGVjdC1Vc2VyXCJdPXUuc2VsZWN0VXNlciksdS5zZWxlY3RBZG1pbiYmKHBbXCJEcm9wYm94LUFQSS1TZWxlY3QtQWRtaW5cIl09dS5zZWxlY3RBZG1pbiksdS5wYXRoUm9vdCYmKHBbXCJEcm9wYm94LUFQSS1QYXRoLVJvb3RcIl09dS5wYXRoUm9vdCkpLGEuaGVhZGVycz1wLGUodChzKStyLGEpLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVyblwiYXBwbGljYXRpb24vanNvblwiPT09ZS5oZWFkZXJzLmdldChcIkNvbnRlbnQtVHlwZVwiKT9lLmpzb24oKS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybltlLHRdfSk6ZS50ZXh0KCkudGhlbihmdW5jdGlvbih0KXtyZXR1cm5bZSx0XX0pfShlKX0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9YyhlLDIpLHI9dFswXSxuPXRbMV07aWYoIXIub2spdGhyb3d7ZXJyb3I6bixyZXNwb25zZTpyLHN0YXR1czpyLnN0YXR1c307cmV0dXJuIG59KX19KHRoaXMuZmV0Y2gpKSx0aGlzLnJwY1JlcXVlc3R9fSx7a2V5Olwic2V0RG93bmxvYWRSZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy5kb3dubG9hZFJlcXVlc3Q9ZX19LHtrZXk6XCJnZXREb3dubG9hZFJlcXVlc3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB2b2lkIDA9PT10aGlzLmRvd25sb2FkUmVxdWVzdCYmKHRoaXMuZG93bmxvYWRSZXF1ZXN0PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbihpLHMsbyx1LGEscCl7aWYoXCJ1c2VyXCIhPT1vKXRocm93IEVycm9yKFwiVW5leHBlY3RlZCBhdXRoIHR5cGU6IFwiK28pO3ZhciBmPXttZXRob2Q6XCJQT1NUXCIsaGVhZGVyczp7QXV0aG9yaXphdGlvbjpcIkJlYXJlciBcIithLFwiRHJvcGJveC1BUEktQXJnXCI6cihzKX19O3JldHVybiBwJiYocC5zZWxlY3RVc2VyJiYoZi5oZWFkZXJzW1wiRHJvcGJveC1BUEktU2VsZWN0LVVzZXJcIl09cC5zZWxlY3RVc2VyKSxwLnNlbGVjdEFkbWluJiYoZi5oZWFkZXJzW1wiRHJvcGJveC1BUEktU2VsZWN0LUFkbWluXCJdPXAuc2VsZWN0QWRtaW4pLHAucGF0aFJvb3QmJihmLmhlYWRlcnNbXCJEcm9wYm94LUFQSS1QYXRoLVJvb3RcIl09cC5wYXRoUm9vdCkpLG4odCh1KStpLGYpLnRoZW4oZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiB0Lm9rP2UoKT90LmJsb2IoKTp0LmJ1ZmZlcigpOnQudGV4dCgpfSh0KS50aGVuKGZ1bmN0aW9uKGUpe3JldHVyblt0LGVdfSl9KS50aGVuKGZ1bmN0aW9uKHQpe3ZhciByPWModCwyKTtyZXR1cm4gZnVuY3Rpb24odCxyKXtpZighdC5vayl0aHJvd3tlcnJvcjpyLHJlc3BvbnNlOnQsc3RhdHVzOnQuc3RhdHVzfTt2YXIgbj1KU09OLnBhcnNlKHQuaGVhZGVycy5nZXQoXCJkcm9wYm94LWFwaS1yZXN1bHRcIikpO3JldHVybiBlKCk/bi5maWxlQmxvYj1yOm4uZmlsZUJpbmFyeT1yLG59KHJbMF0sclsxXSl9KX19KHRoaXMuZmV0Y2gpKSx0aGlzLmRvd25sb2FkUmVxdWVzdH19LHtrZXk6XCJzZXRVcGxvYWRSZXF1ZXN0XCIsdmFsdWU6ZnVuY3Rpb24oZSl7dGhpcy51cGxvYWRSZXF1ZXN0PWV9fSx7a2V5OlwiZ2V0VXBsb2FkUmVxdWVzdFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHZvaWQgMD09PXRoaXMudXBsb2FkUmVxdWVzdCYmKHRoaXMudXBsb2FkUmVxdWVzdD1mdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24obixpLHMsbyx1LGEpe2lmKFwidXNlclwiIT09cyl0aHJvdyBFcnJvcihcIlVuZXhwZWN0ZWQgYXV0aCB0eXBlOiBcIitzKTt2YXIgcD1pLmNvbnRlbnRzO2RlbGV0ZSBpLmNvbnRlbnRzO3ZhciBmPXtib2R5OnAsbWV0aG9kOlwiUE9TVFwiLGhlYWRlcnM6e0F1dGhvcml6YXRpb246XCJCZWFyZXIgXCIrdSxcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXCJEcm9wYm94LUFQSS1BcmdcIjpyKGkpfX07cmV0dXJuIGEmJihhLnNlbGVjdFVzZXImJihmLmhlYWRlcnNbXCJEcm9wYm94LUFQSS1TZWxlY3QtVXNlclwiXT1hLnNlbGVjdFVzZXIpLGEuc2VsZWN0QWRtaW4mJihmLmhlYWRlcnNbXCJEcm9wYm94LUFQSS1TZWxlY3QtQWRtaW5cIl09YS5zZWxlY3RBZG1pbiksYS5wYXRoUm9vdCYmKGYuaGVhZGVyc1tcIkRyb3Bib3gtQVBJLVBhdGgtUm9vdFwiXT1hLnBhdGhSb290KSksZSh0KG8pK24sZikudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jbG9uZSgpO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyKXtlLmpzb24oKS50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiByKGUpfSkuY2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4gdC50ZXh0KCkudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gcihlKX0pfSl9KS50aGVuKGZ1bmN0aW9uKHQpe3JldHVybltlLHRdfSl9KGUpfSkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1jKGUsMikscj10WzBdLG49dFsxXTtpZighci5vayl0aHJvd3tlcnJvcjpuLHJlc3BvbnNlOnIsc3RhdHVzOnIuc3RhdHVzfTtyZXR1cm4gbn0pfX0odGhpcy5mZXRjaCkpLHRoaXMudXBsb2FkUmVxdWVzdH19XSksbn0oKSx3PWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoZSl7cyh0aGlzLHQpO3ZhciByPWEodGhpcywodC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSkuY2FsbCh0aGlzLGUpKTtyZXR1cm4gT2JqZWN0LmFzc2lnbihyLGkpLHJ9cmV0dXJuIHUodCxxKSxvKHQsW3trZXk6XCJmaWxlc0dldFNoYXJlZExpbmtGaWxlXCIsdmFsdWU6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInNoYXJpbmcvZ2V0X3NoYXJlZF9saW5rX2ZpbGVcIixlLFwiYXBpXCIsXCJkb3dubG9hZFwiKX19XSksdH0oKSxrPU9iamVjdC5mcmVlemUoe0Ryb3Bib3g6d30pLEE9e307QS50ZWFtRGV2aWNlc0xpc3RNZW1iZXJEZXZpY2VzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2RldmljZXMvbGlzdF9tZW1iZXJfZGV2aWNlc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtRGV2aWNlc0xpc3RNZW1iZXJzRGV2aWNlcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9kZXZpY2VzL2xpc3RfbWVtYmVyc19kZXZpY2VzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1EZXZpY2VzTGlzdFRlYW1EZXZpY2VzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2RldmljZXMvbGlzdF90ZWFtX2RldmljZXNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbURldmljZXNSZXZva2VEZXZpY2VTZXNzaW9uPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2RldmljZXMvcmV2b2tlX2RldmljZV9zZXNzaW9uXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1EZXZpY2VzUmV2b2tlRGV2aWNlU2Vzc2lvbkJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2RldmljZXMvcmV2b2tlX2RldmljZV9zZXNzaW9uX2JhdGNoXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1GZWF0dXJlc0dldFZhbHVlcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9mZWF0dXJlcy9nZXRfdmFsdWVzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1HZXRJbmZvPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dldF9pbmZvXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNDcmVhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL2NyZWF0ZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtR3JvdXBzRGVsZXRlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9kZWxldGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUdyb3Vwc0dldEluZm89ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL2dldF9pbmZvXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNKb2JTdGF0dXNHZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL2pvYl9zdGF0dXMvZ2V0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNMaXN0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9saXN0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL2xpc3QvY29udGludWVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUdyb3Vwc01lbWJlcnNBZGQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL21lbWJlcnMvYWRkXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNNZW1iZXJzTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9ncm91cHMvbWVtYmVycy9saXN0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNNZW1iZXJzTGlzdENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2dyb3Vwcy9tZW1iZXJzL2xpc3QvY29udGludWVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUdyb3Vwc01lbWJlcnNSZW1vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vZ3JvdXBzL21lbWJlcnMvcmVtb3ZlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Hcm91cHNNZW1iZXJzU2V0QWNjZXNzVHlwZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9ncm91cHMvbWVtYmVycy9zZXRfYWNjZXNzX3R5cGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUdyb3Vwc1VwZGF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9ncm91cHMvdXBkYXRlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1MaW5rZWRBcHBzTGlzdE1lbWJlckxpbmtlZEFwcHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbGlua2VkX2FwcHMvbGlzdF9tZW1iZXJfbGlua2VkX2FwcHNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbUxpbmtlZEFwcHNMaXN0TWVtYmVyc0xpbmtlZEFwcHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbGlua2VkX2FwcHMvbGlzdF9tZW1iZXJzX2xpbmtlZF9hcHBzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1MaW5rZWRBcHBzTGlzdFRlYW1MaW5rZWRBcHBzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2xpbmtlZF9hcHBzL2xpc3RfdGVhbV9saW5rZWRfYXBwc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTGlua2VkQXBwc1Jldm9rZUxpbmtlZEFwcD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9saW5rZWRfYXBwcy9yZXZva2VfbGlua2VkX2FwcFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTGlua2VkQXBwc1Jldm9rZUxpbmtlZEFwcEJhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL2xpbmtlZF9hcHBzL3Jldm9rZV9saW5rZWRfYXBwX2JhdGNoXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJTcGFjZUxpbWl0c0V4Y2x1ZGVkVXNlcnNBZGQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVyX3NwYWNlX2xpbWl0cy9leGNsdWRlZF91c2Vycy9hZGRcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlclNwYWNlTGltaXRzRXhjbHVkZWRVc2Vyc0xpc3Q9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVyX3NwYWNlX2xpbWl0cy9leGNsdWRlZF91c2Vycy9saXN0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJTcGFjZUxpbWl0c0V4Y2x1ZGVkVXNlcnNMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVyX3NwYWNlX2xpbWl0cy9leGNsdWRlZF91c2Vycy9saXN0L2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJTcGFjZUxpbWl0c0V4Y2x1ZGVkVXNlcnNSZW1vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVyX3NwYWNlX2xpbWl0cy9leGNsdWRlZF91c2Vycy9yZW1vdmVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlclNwYWNlTGltaXRzR2V0Q3VzdG9tUXVvdGE9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVyX3NwYWNlX2xpbWl0cy9nZXRfY3VzdG9tX3F1b3RhXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJTcGFjZUxpbWl0c1JlbW92ZUN1c3RvbVF1b3RhPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcl9zcGFjZV9saW1pdHMvcmVtb3ZlX2N1c3RvbV9xdW90YVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyU3BhY2VMaW1pdHNTZXRDdXN0b21RdW90YT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJfc3BhY2VfbGltaXRzL3NldF9jdXN0b21fcXVvdGFcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNBZGQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9hZGRcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNBZGRKb2JTdGF0dXNHZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9hZGQvam9iX3N0YXR1cy9nZXRcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNHZXRJbmZvPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvZ2V0X2luZm9cIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNMaXN0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvbGlzdFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyc0xpc3RDb250aW51ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL2xpc3QvY29udGludWVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNNb3ZlRm9ybWVyTWVtYmVyRmlsZXM9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9tb3ZlX2Zvcm1lcl9tZW1iZXJfZmlsZXNcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNNb3ZlRm9ybWVyTWVtYmVyRmlsZXNKb2JTdGF0dXNDaGVjaz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL21vdmVfZm9ybWVyX21lbWJlcl9maWxlcy9qb2Jfc3RhdHVzL2NoZWNrXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzUmVjb3Zlcj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL3JlY292ZXJcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNSZW1vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9yZW1vdmVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNSZW1vdmVKb2JTdGF0dXNHZXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9yZW1vdmUvam9iX3N0YXR1cy9nZXRcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU1lbWJlcnNTZW5kV2VsY29tZUVtYWlsPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvc2VuZF93ZWxjb21lX2VtYWlsXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzU2V0QWRtaW5QZXJtaXNzaW9ucz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9tZW1iZXJzL3NldF9hZG1pbl9wZXJtaXNzaW9uc1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyc1NldFByb2ZpbGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9zZXRfcHJvZmlsZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtTWVtYmVyc1N1c3BlbmQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbWVtYmVycy9zdXNwZW5kXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1NZW1iZXJzVW5zdXNwZW5kPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL21lbWJlcnMvdW5zdXNwZW5kXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1OYW1lc3BhY2VzTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9uYW1lc3BhY2VzL2xpc3RcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbU5hbWVzcGFjZXNMaXN0Q29udGludWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vbmFtZXNwYWNlcy9saXN0L2NvbnRpbnVlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Qcm9wZXJ0aWVzVGVtcGxhdGVBZGQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vcHJvcGVydGllcy90ZW1wbGF0ZS9hZGRcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVByb3BlcnRpZXNUZW1wbGF0ZUdldD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9wcm9wZXJ0aWVzL3RlbXBsYXRlL2dldFwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtUHJvcGVydGllc1RlbXBsYXRlTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9wcm9wZXJ0aWVzL3RlbXBsYXRlL2xpc3RcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVByb3BlcnRpZXNUZW1wbGF0ZVVwZGF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9wcm9wZXJ0aWVzL3RlbXBsYXRlL3VwZGF0ZVwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtUmVwb3J0c0dldEFjdGl2aXR5PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3JlcG9ydHMvZ2V0X2FjdGl2aXR5XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1SZXBvcnRzR2V0RGV2aWNlcz1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9yZXBvcnRzL2dldF9kZXZpY2VzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1SZXBvcnRzR2V0TWVtYmVyc2hpcD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9yZXBvcnRzL2dldF9tZW1iZXJzaGlwXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1SZXBvcnRzR2V0U3RvcmFnZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS9yZXBvcnRzL2dldF9zdG9yYWdlXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyQWN0aXZhdGU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdGVhbV9mb2xkZXIvYWN0aXZhdGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVRlYW1Gb2xkZXJBcmNoaXZlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL2FyY2hpdmVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVRlYW1Gb2xkZXJBcmNoaXZlQ2hlY2s9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdGVhbV9mb2xkZXIvYXJjaGl2ZS9jaGVja1wiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX0sQS50ZWFtVGVhbUZvbGRlckNyZWF0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci9jcmVhdGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVRlYW1Gb2xkZXJHZXRJbmZvPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL2dldF9pbmZvXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyTGlzdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci9saXN0XCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyTGlzdENvbnRpbnVlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL2xpc3QvY29udGludWVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVRlYW1Gb2xkZXJQZXJtYW5lbnRseURlbGV0ZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90ZWFtX2ZvbGRlci9wZXJtYW5lbnRseV9kZWxldGVcIixlLFwidGVhbVwiLFwiYXBpXCIsXCJycGNcIil9LEEudGVhbVRlYW1Gb2xkZXJSZW5hbWU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMucmVxdWVzdChcInRlYW0vdGVhbV9mb2xkZXIvcmVuYW1lXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1UZWFtRm9sZGVyVXBkYXRlU3luY1NldHRpbmdzPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnJlcXVlc3QoXCJ0ZWFtL3RlYW1fZm9sZGVyL3VwZGF0ZV9zeW5jX3NldHRpbmdzXCIsZSxcInRlYW1cIixcImFwaVwiLFwicnBjXCIpfSxBLnRlYW1Ub2tlbkdldEF1dGhlbnRpY2F0ZWRBZG1pbj1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5yZXF1ZXN0KFwidGVhbS90b2tlbi9nZXRfYXV0aGVudGljYXRlZF9hZG1pblwiLGUsXCJ0ZWFtXCIsXCJhcGlcIixcInJwY1wiKX07dmFyIFM9ZnVuY3Rpb24oZSl7ZnVuY3Rpb24gdChlKXtzKHRoaXMsdCk7dmFyIHI9YSh0aGlzLCh0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpKS5jYWxsKHRoaXMsZSkpO3JldHVybiBPYmplY3QuYXNzaWduKHIsQSkscn1yZXR1cm4gdSh0LHEpLG8odCxbe2tleTpcImFjdEFzVXNlclwiLHZhbHVlOmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgdyh7YWNjZXNzVG9rZW46dGhpcy5hY2Nlc3NUb2tlbixjbGllbnRJZDp0aGlzLmNsaWVudElkLHNlbGVjdFVzZXI6ZX0pfX1dKSx0fSgpLEw9T2JqZWN0LmZyZWV6ZSh7RHJvcGJveFRlYW06U30pO3JldHVybntEcm9wYm94OmsuRHJvcGJveCxEcm9wYm94VGVhbTpMLkRyb3Bib3hUZWFtfX0pO1xuIiwiLy8gdGhlIHdoYXR3Zy1mZXRjaCBwb2x5ZmlsbCBpbnN0YWxscyB0aGUgZmV0Y2goKSBmdW5jdGlvblxuLy8gb24gdGhlIGdsb2JhbCBvYmplY3QgKHdpbmRvdyBvciBzZWxmKVxuLy9cbi8vIFJldHVybiB0aGF0IGFzIHRoZSBleHBvcnQgZm9yIHVzZSBpbiBXZWJwYWNrLCBCcm93c2VyaWZ5IGV0Yy5cbnJlcXVpcmUoJ3doYXR3Zy1mZXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBzZWxmLmZldGNoLmJpbmQoc2VsZik7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChmYWN0b3J5KChnbG9iYWwuV0hBVFdHRmV0Y2ggPSB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjpcbiAgICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgICAnQmxvYicgaW4gc2VsZiAmJlxuICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIG5ldyBCbG9iKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRGF0YVZpZXcob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF07XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgICAgQXJyYXlCdWZmZXIuaXNWaWV3IHx8XG4gICAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKTtcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKTtcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge307XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdO1xuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBkZWxldGUgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV07XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpO1xuICAgIHJldHVybiB0aGlzLmhhcyhuYW1lKSA/IHRoaXMubWFwW25hbWVdIDogbnVsbFxuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfTtcblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICB9O1xuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChuYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW107XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpdGVtcy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKTtcbiAgICB9KTtcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH07XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdCk7XG4gICAgICB9O1xuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcik7XG4gICAgICB9O1xuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcik7XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpO1xuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKTtcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKTtcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2U7XG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keTtcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5O1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keTtcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKTtcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSk7XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChib2R5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcyk7XG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ107XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5O1xuXG4gICAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybDtcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFscztcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2Q7XG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlO1xuICAgICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWw7XG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdDtcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnc2FtZS1vcmlnaW4nO1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpO1xuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbDtcbiAgICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsO1xuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KTtcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHtib2R5OiB0aGlzLl9ib2R5SW5pdH0pXG4gIH07XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGJvZHlcbiAgICAgIC50cmltKClcbiAgICAgIC5zcGxpdCgnJicpXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpO1xuICAgICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgIC8vIFJlcGxhY2UgaW5zdGFuY2VzIG9mIFxcclxcbiBhbmQgXFxuIGZvbGxvd2VkIGJ5IGF0IGxlYXN0IG9uZSBzcGFjZSBvciBob3Jpem9udGFsIHRhYiB3aXRoIGEgc3BhY2VcbiAgICAvLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzIzMCNzZWN0aW9uLTMuMlxuICAgIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpO1xuICAgIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJzonKTtcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKTtcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbiAgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXM7XG4gICAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMDtcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSyc7XG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKTtcbiAgICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KTtcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4gIFJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UodGhpcy5fYm9keUluaXQsIHtcbiAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh0aGlzLmhlYWRlcnMpLFxuICAgICAgdXJsOiB0aGlzLnVybFxuICAgIH0pXG4gIH07XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KTtcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJztcbiAgICByZXR1cm4gcmVzcG9uc2VcbiAgfTtcblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF07XG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfTtcblxuICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uO1xuICB0cnkge1xuICAgIG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbiA9IGZ1bmN0aW9uKG1lc3NhZ2UsIG5hbWUpIHtcbiAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSk7XG4gICAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2s7XG4gICAgfTtcbiAgICBleHBvcnRzLkRPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG4gICAgZXhwb3J0cy5ET01FeGNlcHRpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gZXhwb3J0cy5ET01FeGNlcHRpb247XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaChpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gICAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgICB9XG5cbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgZnVuY3Rpb24gYWJvcnRYaHIoKSB7XG4gICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgfVxuXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBoZWFkZXJzOiBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKVxuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpO1xuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSk7XG4gICAgICB9O1xuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBleHBvcnRzLkRPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpO1xuICAgICAgfTtcblxuICAgICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKTtcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAocmVxdWVzdC5jcmVkZW50aWFscyA9PT0gJ29taXQnKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIH1cblxuICAgICAgcmVxdWVzdC5oZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKTtcblxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gRE9ORSAoc3VjY2VzcyBvciBmYWlsdXJlKVxuICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KTtcbiAgICB9KVxuICB9XG5cbiAgZmV0Y2gucG9seWZpbGwgPSB0cnVlO1xuXG4gIGlmICghc2VsZi5mZXRjaCkge1xuICAgIHNlbGYuZmV0Y2ggPSBmZXRjaDtcbiAgICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzO1xuICAgIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3Q7XG4gICAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICB9XG5cbiAgZXhwb3J0cy5IZWFkZXJzID0gSGVhZGVycztcbiAgZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcbiAgZXhwb3J0cy5SZXNwb25zZSA9IFJlc3BvbnNlO1xuICBleHBvcnRzLmZldGNoID0gZmV0Y2g7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcbiJdfQ==
