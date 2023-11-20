// Transcrypt'ed from Python, 2023-11-21 14:18:33
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
var __left0__ = tuple ([window.grist, window.monaco, window.pug, window.sessionStorage, window.JSON]);
export var grist = __left0__ [0];
export var monaco = __left0__ [1];
export var pug = __left0__ [2];
export var sessionStorage = __left0__ [3];
export var JSON = __left0__ [4];
export var urlParams = new window.URLSearchParams (window.location.search);
export var widget_id = urlParams.get ('id') || window.crypto.randomUUID ();
export var models = {};
export var widget = {'installed': false, 'isEditor': false};
export var _memory = dict ({});
export var memory = function (py_name) {
	var key = '__{}_{}'.format (widget_id, py_name);
	try {
		if (_memory [key]) {
			return _memory [key];
		}
	}
	catch (__except0__) {
		if (isinstance (__except0__, KeyError)) {
			// pass;
		}
		else {
			throw __except0__;
		}
	}
	var fn = function (arg) {
		if (typeof arg == 'undefined' || (arg != null && arg.hasOwnProperty ("__kwargtrans__"))) {;
			var arg = null;
		};
		if (arg === null) {
			var value = sessionStorage.getItem (key);
			return (value ? JSON.parse (value) : value);
		}
		else {
			sessionStorage.setItem (key, JSON.stringify (arg));
		}
	};
	_memory [key] = fn;
	return fn;
};
export var changeModel = function (el) {
	widget.editor.setModel (models [el.id]);
	for (var tab of document.querySelectorAll ('._tab')) {
		tab.style.background = 'transparent';
	}
	el.style.background = 'lightgreen';
};
export var buildEditor = function () {
	for (var tab of document.querySelectorAll ('._tab')) {
		var __left0__ = tuple ([tab.id, tab.dataset.type, tab.children [1].innerHTML.py_replace ('&lt;', '<')]);
		var _id = __left0__ [0];
		var _type = __left0__ [1];
		var _content = __left0__ [2];
		var model = monaco.editor.createModel (memory (_id) () || _content, _type);
		model.onDidChangeContent ((function __lambda__ () {
			var args = tuple ([].slice.apply (arguments).slice (0));
			return memory (_id) (model.getValue ());
		}));
		model._type = _type;
		models [_id] = model;
		tab.addEventListener ('click', (function __lambda__ (e) {
			var args = tuple ([].slice.apply (arguments).slice (1));
			return changeModel (e.target);
		}));
	}
	var editor = monaco.editor.create (document.getElementById ('container'), dict ({'model': models.pug, 'automaticLayout': true, 'fontSize': '13px', 'wordWrap': 'on', 'minimap': dict ({'enabled': false}), 'lineNumbers': 'on', 'glyphMargin': false, 'folding': false}));
	editor.getModel ().updateOptions (dict ({'tabSize': 2}));
	editor.updateOptions (dict ({'scrollBeyondLastLine': false}));
	widget.editor = editor;
};
export var purge = function (el) {
	while (el.firstChild) {
		el.removeChild (el.firstChild);
	}
};
export var showPreview = function () {
	for (var k in models) {
		var model = models [k];
		var code = model.getValue ();
		if (model._type == 'pug') {
			var fnPug = pug.compile (code);
			var lastListener = null;
			var render_pug = function () {
				var data = tuple ([].slice.apply (arguments).slice (0));
				var page_widget = document.getElementById ('page_widget');
				var wFrame = document.createElement ('iframe');
				purge (page_widget);
				page_widget.appendChild (wFrame);
				var widgetWindow = wFrame.contentWindow;
				if (lastListener) {
					window.removeEventListener ('message', lastListener);
				}
				var lastListener = function (e) {
					if (e.source == widgetWindow) {
						window.parent.postMessage (e.data, '*');
					}
					else if (e.source == window.parent) {
						widgetWindow.postMessage (e.data, '*');
					}
				};
				window.addEventListener ('message', lastListener);
				var content = wFrame.contentWindow;
				content.document.open ();
				content.document.write (fnPug (...data));
				content.document.close ();
			};
			window.render_pug = render_pug;
		}
		else if (model._type == 'python') {
			var pyscript = document.createElement ('script');
			pyscript.type = 'text/python';
			pyscript.innerHTML = code;
			document.head.appendChild (pyscript);
		}
		else if (model._type == 'javascript') {
			var jsscript = document.createElement ('script');
			jsscript.innerHTML = code;
			document.head.appendChild (jsscript);
		}
	}
	document.getElementById ('page_editor').style.display = 'none';
	document.getElementById ('page_widget').style.display = 'block';
	for (var py_selector of tuple (['._tab', '._btn'])) {
		for (var e of document.querySelectorAll (py_selector)) {
			e.style.display = 'none';
		}
	}
	document.getElementById ('install').style.display = 'inline-block';
	document.getElementById ('editor').style.display = 'inline-block';
	memory ('preview') (true);
};
export var showEditor = function () {
	document.getElementById ('_bar').style.display = 'flex';
	document.getElementById ('page_widget').style.display = 'none';
	document.getElementById ('page_editor').style.display = 'block';
	memory ('preview') (false);
	for (var e of document.querySelectorAll ('._tab')) {
		e.style.display = 'inline-block';
	}
	for (var e of document.querySelectorAll ('._button')) {
		e.style.display = 'none';
	}
	document.getElementById ('preview').style.display = 'inline-block';
};
export var onOptions = function (clb) {
	var listen = true;
	var callback = function () {
		var data = tuple ([].slice.apply (arguments).slice (0));
		if (listen) {
			clb (...data);
		}
	};
	var cancel = function () {
		var listen = false;
	};
	grist.onOptions (callback);
	return cancel;
};
export var callback = function (options) {
	var args = tuple ([].slice.apply (arguments).slice (1));
	if (widget.installed) {
		return ;
	}
	if (options && options._installed) {
		var installed = true;
		document.getElementById ('_bar').style.display = 'none';
		for (var tab of document.querySelectorAll ('._tab')) {
			memory (tab.id) (options ['_{}'.format (tab.id)]);
		}
		buildEditor ();
		showPreview ();
		document.getElementById ('install').style.display = 'none';
		var cb = function (options) {
			var _ = tuple ([].slice.apply (arguments).slice (1));
			if (!(options)) {
				memory ('preview') (false);
				window.location.reload ();
			}
		};
		onOptions (cb);
	}
	else if (!(widget.isEditor)) {
		var isEditor = true;
		buildEditor ();
		if (memory ('preview') ()) {
			showPreview ();
		}
		else {
			showEditor ();
		}
	}
};
onOptions (callback);
export var install = function () {
	var options = {'_installed': true};
	for (var _id in models) {
		options ['_{}'.format (_id)] = models [_id].getValue ();
	}
	grist.setOptions (options).then (window.location.reload ());
};
grist.ready ({'onEditOptions': showEditor});
document.getElementById ('install').onclick = install;
document.getElementById ('preview').onclick = showPreview;
document.getElementById ('editor').onclick = showEditor;

//# sourceMappingURL=api.map