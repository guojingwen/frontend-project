(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('element-plus')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue', 'element-plus'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MyVue3UI = {}, global.Vue, global.ElementPlus));
})(this, (function (exports, vue, elementPlus) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var at$7 = {exports: {}};

	var at$6 = {exports: {}};

	var fails$8 = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$7 = fails$8;

	var functionBindNative = !fails$7(function () {
	  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$1 = Function.prototype;
	var bind$2 = FunctionPrototype$1.bind;
	var call$5 = FunctionPrototype$1.call;
	var uncurryThis$9 = NATIVE_BIND$3 && bind$2.bind(call$5, call$5);

	var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
	  return fn && uncurryThis$9(fn);
	} : function (fn) {
	  return fn && function () {
	    return call$5.apply(fn, arguments);
	  };
	};

	var uncurryThis$8 = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf);

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$8 =
	  // eslint-disable-next-line es-x/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var NATIVE_BIND$2 = functionBindNative;

	var FunctionPrototype = Function.prototype;
	var apply$1 = FunctionPrototype.apply;
	var call$4 = FunctionPrototype.call;

	// eslint-disable-next-line es-x/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$2 ? call$4.bind(apply$1) : function () {
	  return call$4.apply(apply$1, arguments);
	});

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$8 = function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor = {};

	var fails$6 = fails$8;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$6(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var NATIVE_BIND$1 = functionBindNative;

	var call$3 = Function.prototype.call;

	var functionCall = NATIVE_BIND$1 ? call$3.bind(call$3) : function () {
	  return call$3.apply(call$3, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var createPropertyDescriptor$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$7 = functionUncurryThis;

	var toString$5 = uncurryThis$7({}.toString);
	var stringSlice$1 = uncurryThis$7(''.slice);

	var classofRaw$1 = function (it) {
	  return stringSlice$1(toString$5(it), 8, -1);
	};

	var uncurryThis$6 = functionUncurryThis;
	var fails$5 = fails$8;
	var classof$2 = classofRaw$1;

	var $Object$3 = Object;
	var split = uncurryThis$6(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$5(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$2(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$5 = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$5 = function (it) {
	  if (isNullOrUndefined$1(it)) throw $TypeError$5("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = indexedObject;
	var requireObjectCoercible$4 = requireObjectCoercible$5;

	var toIndexedObject$1 = function (it) {
	  return IndexedObject(requireObjectCoercible$4(it));
	};

	var isCallable$7 = isCallable$8;

	var documentAll = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var SPECIAL_DOCUMENT_ALL = typeof documentAll == 'undefined' && documentAll !== undefined;

	var isObject$4 = SPECIAL_DOCUMENT_ALL ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$7(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$7(it);
	};

	var path$3 = {};

	var path$2 = path$3;
	var global$7 = global$8;
	var isCallable$6 = isCallable$8;

	var aFunction = function (variable) {
	  return isCallable$6(variable) ? variable : undefined;
	};

	var getBuiltIn$2 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path$2[namespace]) || aFunction(global$7[namespace])
	    : path$2[namespace] && path$2[namespace][method] || global$7[namespace] && global$7[namespace][method];
	};

	var getBuiltIn$1 = getBuiltIn$2;

	var engineUserAgent = getBuiltIn$1('navigator', 'userAgent') || '';

	var global$6 = global$8;
	var userAgent = engineUserAgent;

	var process = global$6.process;
	var Deno = global$6.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es-x/no-symbol -- required for testing */

	var V8_VERSION = engineV8Version;
	var fails$4 = fails$8;

	// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$4(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	/* eslint-disable es-x/no-symbol -- required for testing */

	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn = getBuiltIn$2;
	var isCallable$5 = isCallable$8;
	var isPrototypeOf$1 = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$2 = Object;

	var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn('Symbol');
	  return isCallable$5($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$2(it));
	};

	var $String$2 = String;

	var tryToString$1 = function (argument) {
	  try {
	    return $String$2(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$4 = isCallable$8;
	var tryToString = tryToString$1;

	var $TypeError$4 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$2 = function (argument) {
	  if (isCallable$4(argument)) return argument;
	  throw $TypeError$4(tryToString(argument) + ' is not a function');
	};

	var aCallable$1 = aCallable$2;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable$1(func);
	};

	var call$2 = functionCall;
	var isCallable$3 = isCallable$8;
	var isObject$3 = isObject$4;

	var $TypeError$3 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$3(fn = input.toString) && !isObject$3(val = call$2(fn, input))) return val;
	  if (isCallable$3(fn = input.valueOf) && !isObject$3(val = call$2(fn, input))) return val;
	  if (pref !== 'string' && isCallable$3(fn = input.toString) && !isObject$3(val = call$2(fn, input))) return val;
	  throw $TypeError$3("Can't convert object to primitive value");
	};

	var shared$1 = {exports: {}};

	var global$5 = global$8;

	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	var defineGlobalProperty$1 = function (key, value) {
	  try {
	    defineProperty(global$5, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$5[key] = value;
	  } return value;
	};

	var global$4 = global$8;
	var defineGlobalProperty = defineGlobalProperty$1;

	var SHARED = '__core-js_shared__';
	var store$1 = global$4[SHARED] || defineGlobalProperty(SHARED, {});

	var sharedStore = store$1;

	var store = sharedStore;

	(shared$1.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.25.0',
	  mode: 'pure' ,
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.25.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var requireObjectCoercible$3 = requireObjectCoercible$5;

	var $Object$1 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$2 = function (argument) {
	  return $Object$1(requireObjectCoercible$3(argument));
	};

	var uncurryThis$5 = functionUncurryThis;
	var toObject$1 = toObject$2;

	var hasOwnProperty = uncurryThis$5({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es-x/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$1(it), key);
	};

	var uncurryThis$4 = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$4 = uncurryThis$4(1.0.toString);

	var uid$1 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$4(++id + postfix, 36);
	};

	var global$3 = global$8;
	var shared = shared$1.exports;
	var hasOwn$2 = hasOwnProperty_1;
	var uid = uid$1;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global$3.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol$3 = function (name) {
	  if (!hasOwn$2(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (NATIVE_SYMBOL && hasOwn$2(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else if (USE_SYMBOL_AS_UID && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var call$1 = functionCall;
	var isObject$2 = isObject$4;
	var isSymbol$1 = isSymbol$2;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$2 = wellKnownSymbol$3;

	var $TypeError$2 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$1 = function (input, pref) {
	  if (!isObject$2(input) || isSymbol$1(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$1(exoticToPrim, input, pref);
	    if (!isObject$2(result) || isSymbol$1(result)) return result;
	    throw $TypeError$2("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive = toPrimitive$1;
	var isSymbol = isSymbol$2;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$2 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var global$2 = global$8;
	var isObject$1 = isObject$4;

	var document$1 = global$2.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject$1(document$1) && isObject$1(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$4 = descriptors;
	var fails$3 = fails$8;
	var createElement = documentCreateElement;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$4 && !fails$3(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$3 = descriptors;
	var call = functionCall;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$2;
	var toIndexedObject = toIndexedObject$1;
	var toPropertyKey$1 = toPropertyKey$2;
	var hasOwn$1 = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$3 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey$1(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$1(O, P)) return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};

	var fails$2 = fails$8;
	var isCallable$2 = isCallable$8;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$2(detection) ? fails$2(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var uncurryThis$3 = functionUncurryThis;
	var aCallable = aCallable$2;
	var NATIVE_BIND = functionBindNative;

	var bind$1 = uncurryThis$3(uncurryThis$3.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$2 = descriptors;
	var fails$1 = fails$8;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$2 && fails$1(function () {
	  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject = isObject$4;

	var $String$1 = String;
	var $TypeError$1 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$1 = function (argument) {
	  if (isObject(argument)) return argument;
	  throw $TypeError$1($String$1(argument) + ' is not an object');
	};

	var DESCRIPTORS$1 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var anObject = anObject$1;
	var toPropertyKey = toPropertyKey$2;

	var $TypeError = TypeError;
	// eslint-disable-next-line es-x/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$1 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS = descriptors;
	var definePropertyModule = objectDefineProperty;
	var createPropertyDescriptor = createPropertyDescriptor$2;

	var createNonEnumerableProperty$1 = DESCRIPTORS ? function (object, key, value) {
	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$1 = global$8;
	var apply = functionApply;
	var uncurryThis$2 = functionUncurryThis;
	var isCallable$1 = isCallable$8;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var isForced = isForced_1;
	var path$1 = path$3;
	var bind = functionBindContext;
	var createNonEnumerableProperty = createNonEnumerableProperty$1;
	var hasOwn = hasOwnProperty_1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply(NativeConstructor, this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$1 : path$1[TARGET] || createNonEnumerableProperty(path$1, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global$1);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$1(sourceProperty)) resultProperty = uncurryThis$2(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn(path$1, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path$1, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty(path$1[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es-x/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$5 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$1 = function (argument) {
	  return argument > 0 ? min(toIntegerOrInfinity$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength = toLength$1;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$1 = function (obj) {
	  return toLength(obj.length);
	};

	var $$2 = _export;
	var toObject = toObject$2;
	var lengthOfArrayLike = lengthOfArrayLike$1;
	var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

	// `Array.prototype.at` method
	// https://github.com/tc39/proposal-relative-indexing-method
	$$2({ target: 'Array', proto: true }, {
	  at: function at(index) {
	    var O = toObject(this);
	    var len = lengthOfArrayLike(O);
	    var relativeIndex = toIntegerOrInfinity$3(index);
	    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	    return (k < 0 || k >= len) ? undefined : O[k];
	  }
	});

	var path = path$3;

	var entryVirtual$3 = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$2 = entryVirtual$3;

	var at$5 = entryVirtual$2('Array').at;

	var parent$2 = at$5;

	var at$4 = parent$2;

	var parent$1 = at$4;

	var at$3 = parent$1;

	var parent = at$3;

	// TODO: Remove from `core-js@4`


	var at$2 = parent;

	var wellKnownSymbol$1 = wellKnownSymbol$3;

	var TO_STRING_TAG$1 = wellKnownSymbol$1('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var isCallable = isCallable$8;
	var classofRaw = classofRaw$1;
	var wellKnownSymbol = wellKnownSymbol$3;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};

	var classof = classof$1;

	var $String = String;

	var toString$3 = function (argument) {
	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};

	var $$1 = _export;
	var uncurryThis$1 = functionUncurryThis;
	var requireObjectCoercible$2 = requireObjectCoercible$5;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
	var toString$2 = toString$3;
	var fails = fails$8;

	var charAt$2 = uncurryThis$1(''.charAt);

	var FORCED = fails(function () {
	  // eslint-disable-next-line es-x/no-array-string-prototype-at -- safe
	  return '𠮷'.at(-2) !== '\uD842';
	});

	// `String.prototype.at` method
	// https://github.com/tc39/proposal-relative-indexing-method
	$$1({ target: 'String', proto: true, forced: FORCED }, {
	  at: function at(index) {
	    var S = toString$2(requireObjectCoercible$2(this));
	    var len = S.length;
	    var relativeIndex = toIntegerOrInfinity$2(index);
	    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	    return (k < 0 || k >= len) ? undefined : charAt$2(S, k);
	  }
	});

	var entryVirtual$1 = entryVirtual$3;

	entryVirtual$1('String').at;

	var uncurryThis = functionUncurryThis;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
	var toString$1 = toString$3;
	var requireObjectCoercible$1 = requireObjectCoercible$5;

	var charAt$1 = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var stringSlice = uncurryThis(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$1(requireObjectCoercible$1($this));
	    var position = toIntegerOrInfinity$1(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$1(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};

	// TODO: Remove from `core-js@4`
	var $ = _export;
	var charAt = stringMultibyte.charAt;
	var requireObjectCoercible = requireObjectCoercible$5;
	var toIntegerOrInfinity = toIntegerOrInfinity$5;
	var toString = toString$3;

	// `String.prototype.at` method
	// https://github.com/mathiasbynens/String.prototype.at
	$({ target: 'String', proto: true, forced: true }, {
	  at: function at(index) {
	    var S = toString(requireObjectCoercible(this));
	    var len = S.length;
	    var relativeIndex = toIntegerOrInfinity(index);
	    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
	    return (k < 0 || k >= len) ? undefined : charAt(S, k);
	  }
	});

	// TODO: Remove from `core-js@4`

	var entryVirtual = entryVirtual$3;

	var at$1 = entryVirtual('String').at;

	var isPrototypeOf = objectIsPrototypeOf;
	var arrayMethod = at$2;
	var stringMethod = at$1;

	var ArrayPrototype = Array.prototype;
	var StringPrototype = String.prototype;

	var at = function (it) {
	  var own = it.at;
	  if (it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.at)) return arrayMethod;
	  if (typeof it == 'string' || it === StringPrototype || (isPrototypeOf(StringPrototype, it) && own === StringPrototype.at)) {
	    return stringMethod;
	  } return own;
	};

	(function (module) {
		module.exports = at;
	} (at$6));

	(function (module) {
		module.exports = at$6.exports;
	} (at$7));

	var _atInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(at$7.exports);

	var script$1 = vue.defineComponent({
	  setup() {
	    var arr = [1, 2, 3, 4];

	    var last = _atInstanceProperty(arr).call(arr, -1);

	    console.log(last);
	    var msg = vue.ref('');
	    return {
	      msg
	    };
	  }

	});

	var _hoisted_1$1 = /*#__PURE__*/vue.createElementVNode("h2", null, "compiler vue3 components by rollup", -1
	/* HOISTED */
	);

	function render$1(_ctx, _cache, $props, $setup, $data, $options) {
	  return vue.openBlock(), vue.createElementBlock("div", null, [_hoisted_1$1, vue.withDirectives(vue.createElementVNode("input", {
	    type: "text",
	    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
	      return _ctx.msg = $event;
	    }),
	    placeholder: "请输入内容"
	  }, null, 512
	  /* NEED_PATCH */
	  ), [[vue.vModelText, _ctx.msg]]), vue.createElementVNode("p", null, vue.toDisplayString(_ctx.msg), 1
	  /* TEXT */
	  )]);
	}

	script$1.render = render$1;
	script$1.__file = "src/Hello.vue";

	var script = vue.defineComponent({
	  components: {
	    ElTable: elementPlus.ElTable,
	    ElTableColumn: elementPlus.ElTableColumn
	  },

	  setup() {
	    return {
	      tableData: [{
	        id: 1,
	        name: 'zs',
	        age: 18
	      }, {
	        id: 1,
	        name: 'zs',
	        age: 19
	      }]
	    };
	  }

	});

	var _hoisted_1 = {
	  class: "my-table"
	};

	var _hoisted_2 = /*#__PURE__*/vue.createElementVNode("p", {
	  class: "test"
	}, "AAA", -1
	/* HOISTED */
	);

	function render(_ctx, _cache, $props, $setup, $data, $options) {
	  var _component_el_table_column = vue.resolveComponent("el-table-column");

	  var _component_el_table = vue.resolveComponent("el-table");

	  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [_hoisted_2, vue.createVNode(_component_el_table, {
	    data: _ctx.tableData,
	    border: ""
	  }, {
	    default: vue.withCtx(function () {
	      return [vue.createVNode(_component_el_table_column, {
	        label: "ID",
	        prop: "id"
	      }), vue.createVNode(_component_el_table_column, {
	        label: "姓名",
	        prop: "name"
	      }), vue.createVNode(_component_el_table_column, {
	        label: "年龄",
	        prop: "age"
	      })];
	    }),
	    _: 1
	    /* STABLE */

	  }, 8
	  /* PROPS */
	  , ["data"])]);
	}

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css_248z = ".my-table{background-color:#f0f8ff;padding:20px}.my-table .test{color:rgba(18,52,86,.471);font-size:20px}";
	styleInject(css_248z);

	script.render = render;
	script.__file = "src/MyTable.vue";

	exports.Hello = script$1;
	exports.MyTable = script;
	exports["default"] = script$1;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
