'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var construct$7 = {exports: {}};

var construct$6 = {exports: {}};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$d =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var fails$i = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$h = fails$i;

var functionBindNative = !fails$h(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$4 = functionBindNative;

var FunctionPrototype$3 = Function.prototype;
var apply$3 = FunctionPrototype$3.apply;
var call$c = FunctionPrototype$3.call;

// eslint-disable-next-line es-x/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$4 ? call$c.bind(apply$3) : function () {
  return call$c.apply(apply$3, arguments);
});

var NATIVE_BIND$3 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind$d = FunctionPrototype$2.bind;
var call$b = FunctionPrototype$2.call;
var uncurryThis$j = NATIVE_BIND$3 && bind$d.bind(call$b, call$b);

var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
  return fn && uncurryThis$j(fn);
} : function (fn) {
  return fn && function () {
    return call$b.apply(fn, arguments);
  };
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$f = function (argument) {
  return typeof argument == 'function';
};

var objectGetOwnPropertyDescriptor = {};

var fails$g = fails$i;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$g(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var NATIVE_BIND$2 = functionBindNative;

var call$a = Function.prototype.call;

var functionCall = NATIVE_BIND$2 ? call$a.bind(call$a) : function () {
  return call$a.apply(call$a, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var uncurryThis$i = functionUncurryThis;

var toString$d = uncurryThis$i({}.toString);
var stringSlice$1 = uncurryThis$i(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$1(toString$d(it), 8, -1);
};

var uncurryThis$h = functionUncurryThis;
var fails$f = fails$i;
var classof$8 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$h(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$f(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$8(it) == 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

var $TypeError$9 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$5 = function (it) {
  if (it == undefined) throw $TypeError$9("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$4 = requireObjectCoercible$5;

var toIndexedObject$8 = function (it) {
  return IndexedObject$1(requireObjectCoercible$4(it));
};

var isCallable$e = isCallable$f;

var isObject$b = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$e(it);
};

var path$c = {};

var path$b = path$c;
var global$c = global$d;
var isCallable$d = isCallable$f;

var aFunction = function (variable) {
  return isCallable$d(variable) ? variable : undefined;
};

var getBuiltIn$9 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path$b[namespace]) || aFunction(global$c[namespace])
    : path$b[namespace] && path$b[namespace][method] || global$c[namespace] && global$c[namespace][method];
};

var uncurryThis$g = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$g({}.isPrototypeOf);

var getBuiltIn$8 = getBuiltIn$9;

var engineUserAgent = getBuiltIn$8('navigator', 'userAgent') || '';

var global$b = global$d;
var userAgent = engineUserAgent;

var process = global$b.process;
var Deno = global$b.Deno;
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

var V8_VERSION$2 = engineV8Version;
var fails$e = fails$i;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$e(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$5 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$5
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$7 = getBuiltIn$9;
var isCallable$c = isCallable$f;
var isPrototypeOf$5 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$6 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$7('Symbol');
  return isCallable$c($Symbol) && isPrototypeOf$5($Symbol.prototype, $Object$3(it));
};

var $String$3 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$b = isCallable$f;
var tryToString$3 = tryToString$4;

var $TypeError$8 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$4 = function (argument) {
  if (isCallable$b(argument)) return argument;
  throw $TypeError$8(tryToString$3(argument) + ' is not a function');
};

var aCallable$3 = aCallable$4;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$3 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$3(func);
};

var call$9 = functionCall;
var isCallable$a = isCallable$f;
var isObject$a = isObject$b;

var $TypeError$7 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$a(fn = input.toString) && !isObject$a(val = call$9(fn, input))) return val;
  if (isCallable$a(fn = input.valueOf) && !isObject$a(val = call$9(fn, input))) return val;
  if (pref !== 'string' && isCallable$a(fn = input.toString) && !isObject$a(val = call$9(fn, input))) return val;
  throw $TypeError$7("Can't convert object to primitive value");
};

var shared$6 = {exports: {}};

var global$a = global$d;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$a = Object.defineProperty;

var defineGlobalProperty$1 = function (key, value) {
  try {
    defineProperty$a(global$a, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$a[key] = value;
  } return value;
};

var global$9 = global$d;
var defineGlobalProperty = defineGlobalProperty$1;

var SHARED = '__core-js_shared__';
var store$3 = global$9[SHARED] || defineGlobalProperty(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$6.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.24.0',
  mode: 'pure' ,
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.24.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$3 = requireObjectCoercible$5;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$8 = function (argument) {
  return $Object$2(requireObjectCoercible$3(argument));
};

var uncurryThis$f = functionUncurryThis;
var toObject$7 = toObject$8;

var hasOwnProperty$1 = uncurryThis$f({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty$1(toObject$7(it), key);
};

var uncurryThis$e = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$c = uncurryThis$e(1.0.toString);

var uid$3 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$c(++id + postfix, 36);
};

var global$8 = global$d;
var shared$5 = shared$6.exports;
var hasOwn$c = hasOwnProperty_1;
var uid$2 = uid$3;
var NATIVE_SYMBOL$4 = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore$1 = shared$5('wks');
var Symbol$5 = global$8.Symbol;
var symbolFor = Symbol$5 && Symbol$5['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$5 : Symbol$5 && Symbol$5.withoutSetter || uid$2;

var wellKnownSymbol$h = function (name) {
  if (!hasOwn$c(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$4 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL$4 && hasOwn$c(Symbol$5, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$5[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore$1[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore$1[name];
};

var call$8 = functionCall;
var isObject$9 = isObject$b;
var isSymbol$5 = isSymbol$6;
var getMethod$2 = getMethod$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$g = wellKnownSymbol$h;

var $TypeError$6 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$g('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$9(input) || isSymbol$5(input)) return input;
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$8(exoticToPrim, input, pref);
    if (!isObject$9(result) || isSymbol$5(result)) return result;
    throw $TypeError$6("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$4 = isSymbol$6;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$4 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$4(key) ? key : key + '';
};

var global$7 = global$d;
var isObject$8 = isObject$b;

var document$1 = global$7.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$8(document$1) && isObject$8(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$9 = descriptors;
var fails$d = fails$i;
var createElement = documentCreateElement$1;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$9 && !fails$d(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$8 = descriptors;
var call$7 = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var toIndexedObject$7 = toIndexedObject$8;
var toPropertyKey$3 = toPropertyKey$4;
var hasOwn$b = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$8 ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$7(O);
  P = toPropertyKey$3(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$2(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$7(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var fails$c = fails$i;
var isCallable$9 = isCallable$f;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$9(detection) ? fails$c(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = 'N';
var POLYFILL = isForced$1.POLYFILL = 'P';

var isForced_1 = isForced$1;

var uncurryThis$d = functionUncurryThis;
var aCallable$2 = aCallable$4;
var NATIVE_BIND$1 = functionBindNative;

var bind$c = uncurryThis$d(uncurryThis$d.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$2(fn);
  return that === undefined ? fn : NATIVE_BIND$1 ? bind$c(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var objectDefineProperty = {};

var DESCRIPTORS$7 = descriptors;
var fails$b = fails$i;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$7 && fails$b(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$7 = isObject$b;

var $String$2 = String;
var $TypeError$5 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$9 = function (argument) {
  if (isObject$7(argument)) return argument;
  throw $TypeError$5($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$6 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$8 = anObject$9;
var toPropertyKey$2 = toPropertyKey$4;

var $TypeError$4 = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$6 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$8(O);
  P = toPropertyKey$2(P);
  anObject$8(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty$1(O, P, Attributes);
} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject$8(O);
  P = toPropertyKey$2(P);
  anObject$8(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$4('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$5 = descriptors;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var createNonEnumerableProperty$5 = DESCRIPTORS$5 ? function (object, key, value) {
  return definePropertyModule$3.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var global$6 = global$d;
var apply$2 = functionApply;
var uncurryThis$c = functionUncurryThis;
var isCallable$8 = isCallable$f;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var isForced = isForced_1;
var path$a = path$c;
var bind$b = functionBindContext;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$a = hasOwnProperty_1;

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return apply$2(NativeConstructor, this, arguments);
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

  var nativeSource = GLOBAL ? global$6 : STATIC ? global$6[TARGET] : (global$6[TARGET] || {}).prototype;

  var target = GLOBAL ? path$a : path$a[TARGET] || createNonEnumerableProperty$4(path$a, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn$a(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind$b(sourceProperty, global$6);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && isCallable$8(sourceProperty)) resultProperty = uncurryThis$c(sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$4(resultProperty, 'sham', true);
    }

    createNonEnumerableProperty$4(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!hasOwn$a(path$a, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty$4(path$a, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty$4(path$a[VIRTUAL_PROTOTYPE], key, sourceProperty);
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty$4(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var uncurryThis$b = functionUncurryThis;

var arraySlice$3 = uncurryThis$b([].slice);

var uncurryThis$a = functionUncurryThis;
var aCallable$1 = aCallable$4;
var isObject$6 = isObject$b;
var hasOwn$9 = hasOwnProperty_1;
var arraySlice$2 = arraySlice$3;
var NATIVE_BIND = functionBindNative;

var $Function = Function;
var concat = uncurryThis$a([].concat);
var join = uncurryThis$a([].join);
var factories = {};

var construct$5 = function (C, argsLength, args) {
  if (!hasOwn$9(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
  var F = aCallable$1(this);
  var Prototype = F.prototype;
  var partArgs = arraySlice$2(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = concat(partArgs, arraySlice$2(arguments));
    return this instanceof boundFunction ? construct$5(F, args.length, args) : F.apply(that, args);
  };
  if (isObject$6(Prototype)) boundFunction.prototype = Prototype;
  return boundFunction;
};

var wellKnownSymbol$f = wellKnownSymbol$h;

var TO_STRING_TAG$3 = wellKnownSymbol$f('toStringTag');
var test = {};

test[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$7 = isCallable$f;
var classofRaw = classofRaw$1;
var wellKnownSymbol$e = wellKnownSymbol$h;

var TO_STRING_TAG$2 = wellKnownSymbol$e('toStringTag');
var $Object$1 = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$7 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
};

var uncurryThis$9 = functionUncurryThis;
var isCallable$6 = isCallable$f;
var store$1 = sharedStore;

var functionToString = uncurryThis$9(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$6(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$2 = store$1.inspectSource;

var uncurryThis$8 = functionUncurryThis;
var fails$a = fails$i;
var isCallable$5 = isCallable$f;
var classof$6 = classof$7;
var getBuiltIn$6 = getBuiltIn$9;
var inspectSource$1 = inspectSource$2;

var noop = function () { /* empty */ };
var empty = [];
var construct$4 = getBuiltIn$6('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$8(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$5(argument)) return false;
  try {
    construct$4(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$5(argument)) return false;
  switch (classof$6(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$4 = !construct$4 || fails$a(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor$3 = isConstructor$4;
var tryToString$2 = tryToString$4;

var $TypeError$3 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor$3(argument)) return argument;
  throw $TypeError$3(tryToString$2(argument) + ' is not a constructor');
};

var objectDefineProperties = {};

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
var toIntegerOrInfinity$6 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$5 = toIntegerOrInfinity$6;

var max$2 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$3 = function (index, length) {
  var integer = toIntegerOrInfinity$5(index);
  return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity$4 = toIntegerOrInfinity$6;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity$4(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$7 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$6 = toIndexedObject$8;
var toAbsoluteIndex$2 = toAbsoluteIndex$3;
var lengthOfArrayLike$6 = lengthOfArrayLike$7;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$6($this);
    var length = lengthOfArrayLike$6(O);
    var index = toAbsoluteIndex$2(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var hiddenKeys$5 = {};

var uncurryThis$7 = functionUncurryThis;
var hasOwn$8 = hasOwnProperty_1;
var toIndexedObject$5 = toIndexedObject$8;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$4 = hiddenKeys$5;

var push$3 = uncurryThis$7([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$5(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$8(hiddenKeys$4, key) && hasOwn$8(O, key) && push$3(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$8(O, key = names[i++])) {
    ~indexOf(result, key) || push$3(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys$1(O, enumBugKeys$2);
};

var DESCRIPTORS$4 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$7 = anObject$9;
var toIndexedObject$4 = toIndexedObject$8;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$4 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$7(O);
  var props = toIndexedObject$4(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$5 = getBuiltIn$9;

var html$1 = getBuiltIn$5('document', 'documentElement');

var shared$4 = shared$6.exports;
var uid$1 = uid$3;

var keys = shared$4('keys');

var sharedKey$4 = function (key) {
  return keys[key] || (keys[key] = uid$1(key));
};

/* global ActiveXObject -- old IE, WSH */

var anObject$6 = anObject$9;
var definePropertiesModule$1 = objectDefineProperties;
var enumBugKeys$1 = enumBugKeys$3;
var hiddenKeys$3 = hiddenKeys$5;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey$3 = sharedKey$4;

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$3('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys$1.length;
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
  return NullProtoObject();
};

hiddenKeys$3[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject$6(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
};

var $$j = _export;
var getBuiltIn$4 = getBuiltIn$9;
var apply$1 = functionApply;
var bind$a = functionBind;
var aConstructor = aConstructor$1;
var anObject$5 = anObject$9;
var isObject$5 = isObject$b;
var create$9 = objectCreate;
var fails$9 = fails$i;

var nativeConstruct = getBuiltIn$4('Reflect', 'construct');
var ObjectPrototype$2 = Object.prototype;
var push$2 = [].push;

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails$9(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});

var ARGS_BUG = !fails$9(function () {
  nativeConstruct(function () { /* empty */ });
});

var FORCED$3 = NEW_TARGET_BUG || ARGS_BUG;

$$j({ target: 'Reflect', stat: true, forced: FORCED$3, sham: FORCED$3 }, {
  construct: function construct(Target, args /* , newTarget */) {
    aConstructor(Target);
    anObject$5(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      apply$1(push$2, $args, args);
      return new (apply$1(bind$a, Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create$9(isObject$5(proto) ? proto : ObjectPrototype$2);
    var result = apply$1(Target, instance, args);
    return isObject$5(result) ? result : instance;
  }
});

var path$9 = path$c;

var construct$3 = path$9.Reflect.construct;

var parent$F = construct$3;

var construct$2 = parent$F;

var parent$E = construct$2;

var construct$1 = parent$E;

var parent$D = construct$1;

var construct = parent$D;

(function (module) {
	module.exports = construct;
} (construct$6));

(function (module) {
	module.exports = construct$6.exports;
} (construct$7));

var _Reflect$construct = /*@__PURE__*/getDefaultExportFromCjs(construct$7.exports);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var defineProperty$9 = {exports: {}};

var defineProperty$8 = {exports: {}};

var defineProperty$7 = {exports: {}};

var $$i = _export;
var DESCRIPTORS$3 = descriptors;
var defineProperty$6 = objectDefineProperty.f;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
$$i({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$6, sham: !DESCRIPTORS$3 }, {
  defineProperty: defineProperty$6
});

var path$8 = path$c;

var Object$2 = path$8.Object;

var defineProperty$5 = defineProperty$7.exports = function defineProperty(it, key, desc) {
  return Object$2.defineProperty(it, key, desc);
};

if (Object$2.defineProperty.sham) defineProperty$5.sham = true;

var parent$C = defineProperty$7.exports;

var defineProperty$4 = parent$C;

var parent$B = defineProperty$4;

var defineProperty$3 = parent$B;

var parent$A = defineProperty$3;

var defineProperty$2 = parent$A;

(function (module) {
	module.exports = defineProperty$2;
} (defineProperty$8));

(function (module) {
	module.exports = defineProperty$8.exports;
} (defineProperty$9));

var _Object$defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty$9.exports);

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);

  _Object$defineProperty(Constructor, "prototype", {
    writable: false
  });

  return Constructor;
}

var create$8 = {exports: {}};

var create$7 = {exports: {}};

// TODO: Remove from `core-js@4`
var $$h = _export;
var DESCRIPTORS$2 = descriptors;
var create$6 = objectCreate;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
$$h({ target: 'Object', stat: true, sham: !DESCRIPTORS$2 }, {
  create: create$6
});

var path$7 = path$c;

var Object$1 = path$7.Object;

var create$5 = function create(P, D) {
  return Object$1.create(P, D);
};

var parent$z = create$5;

var create$4 = parent$z;

var parent$y = create$4;

var create$3 = parent$y;

var parent$x = create$3;

var create$2 = parent$x;

(function (module) {
	module.exports = create$2;
} (create$7));

(function (module) {
	module.exports = create$7.exports;
} (create$8));

var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(create$8.exports);

var setPrototypeOf$6 = {exports: {}};

var setPrototypeOf$5 = {exports: {}};

var isCallable$4 = isCallable$f;

var $String$1 = String;
var $TypeError$2 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$4(argument)) return argument;
  throw $TypeError$2("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$6 = functionUncurryThis;
var anObject$4 = anObject$9;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$6(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$4(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$g = _export;
var setPrototypeOf$4 = objectSetPrototypeOf;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
$$g({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf$4
});

var path$6 = path$c;

var setPrototypeOf$3 = path$6.Object.setPrototypeOf;

var parent$w = setPrototypeOf$3;

var setPrototypeOf$2 = parent$w;

var parent$v = setPrototypeOf$2;

var setPrototypeOf$1 = parent$v;

var parent$u = setPrototypeOf$1;

var setPrototypeOf = parent$u;

(function (module) {
	module.exports = setPrototypeOf;
} (setPrototypeOf$5));

(function (module) {
	module.exports = setPrototypeOf$5.exports;
} (setPrototypeOf$6));

var _Object$setPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(setPrototypeOf$6.exports);

var bind$9 = {exports: {}};

var bind$8 = {exports: {}};

// TODO: Remove from `core-js@4`
var $$f = _export;
var bind$7 = functionBind;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
$$f({ target: 'Function', proto: true, forced: Function.bind !== bind$7 }, {
  bind: bind$7
});

var path$5 = path$c;

var entryVirtual$6 = function (CONSTRUCTOR) {
  return path$5[CONSTRUCTOR + 'Prototype'];
};

var entryVirtual$5 = entryVirtual$6;

var bind$6 = entryVirtual$5('Function').bind;

var isPrototypeOf$4 = objectIsPrototypeOf;
var method$2 = bind$6;

var FunctionPrototype$1 = Function.prototype;

var bind$5 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype$1 || (isPrototypeOf$4(FunctionPrototype$1, it) && own === FunctionPrototype$1.bind) ? method$2 : own;
};

var parent$t = bind$5;

var bind$4 = parent$t;

var parent$s = bind$4;

var bind$3 = parent$s;

var parent$r = bind$3;

var bind$2 = parent$r;

(function (module) {
	module.exports = bind$2;
} (bind$8));

(function (module) {
	module.exports = bind$8.exports;
} (bind$9));

var _bindInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(bind$9.exports);

function _setPrototypeOf(o, p) {
  var _context;

  _setPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$setPrototypeOf).call(_context) : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });

  _Object$defineProperty(subClass, "prototype", {
    writable: false
  });

  if (superClass) _setPrototypeOf(subClass, superClass);
}

var symbol$5 = {exports: {}};

var symbol$4 = {exports: {}};

var classof$5 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
var isArray$d = Array.isArray || function isArray(argument) {
  return classof$5(argument) == 'Array';
};

var $TypeError$1 = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$1 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$1('Maximum allowed index exceeded');
  return it;
};

var toPropertyKey$1 = toPropertyKey$4;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;

var createProperty$4 = function (object, key, value) {
  var propertyKey = toPropertyKey$1(key);
  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$2(0, value));
  else object[propertyKey] = value;
};

var isArray$c = isArray$d;
var isConstructor$2 = isConstructor$4;
var isObject$4 = isObject$b;
var wellKnownSymbol$d = wellKnownSymbol$h;

var SPECIES$2 = wellKnownSymbol$d('species');
var $Array$3 = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$c(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor$2(C) && (C === $Array$3 || isArray$c(C.prototype))) C = undefined;
    else if (isObject$4(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array$3 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var fails$8 = fails$i;
var wellKnownSymbol$c = wellKnownSymbol$h;
var V8_VERSION$1 = engineV8Version;

var SPECIES$1 = wellKnownSymbol$c('species');

var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$8(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$e = _export;
var fails$7 = fails$i;
var isArray$b = isArray$d;
var isObject$3 = isObject$b;
var toObject$6 = toObject$8;
var lengthOfArrayLike$5 = lengthOfArrayLike$7;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
var createProperty$3 = createProperty$4;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
var wellKnownSymbol$b = wellKnownSymbol$h;
var V8_VERSION = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol$b('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$7(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$3(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$b(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$e({ target: 'Array', proto: true, arity: 1, forced: FORCED$2 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$6(this);
    var A = arraySpeciesCreate$1(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike$5(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty$3(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty$3(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var classof$4 = classof$7;

var $String = String;

var toString$b = function (argument) {
  if (classof$4(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var objectGetOwnPropertyNames = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$3;

var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys$2);
};

var objectGetOwnPropertyNamesExternal = {};

var toAbsoluteIndex$1 = toAbsoluteIndex$3;
var lengthOfArrayLike$4 = lengthOfArrayLike$7;
var createProperty$2 = createProperty$4;

var $Array$2 = Array;
var max$1 = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$4(O);
  var k = toAbsoluteIndex$1(start, length);
  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
  var result = $Array$2(max$1(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
  result.length = n;
  return result;
};

/* eslint-disable es-x/no-object-getownpropertynames -- safe */

var classof$3 = classofRaw$1;
var toIndexedObject$3 = toIndexedObject$8;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var arraySlice$1 = arraySliceSimple;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return arraySlice$1(windowNames);
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  return windowNames && classof$3(it) == 'Window'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject$3(it));
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;

var defineBuiltIn$4 = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty$3(target, key, value);
  return target;
};

var wellKnownSymbolWrapped = {};

var wellKnownSymbol$a = wellKnownSymbol$h;

wellKnownSymbolWrapped.f = wellKnownSymbol$a;

var path$4 = path$c;
var hasOwn$7 = hasOwnProperty_1;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol$m = function (NAME) {
  var Symbol = path$4.Symbol || (path$4.Symbol = {});
  if (!hasOwn$7(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule$1.f(NAME)
  });
};

var call$6 = functionCall;
var getBuiltIn$3 = getBuiltIn$9;
var wellKnownSymbol$9 = wellKnownSymbol$h;
var defineBuiltIn$3 = defineBuiltIn$4;

var symbolDefineToPrimitive = function () {
  var Symbol = getBuiltIn$3('Symbol');
  var SymbolPrototype = Symbol && Symbol.prototype;
  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
  var TO_PRIMITIVE = wellKnownSymbol$9('toPrimitive');

  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    // eslint-disable-next-line no-unused-vars -- required for .length
    defineBuiltIn$3(SymbolPrototype, TO_PRIMITIVE, function (hint) {
      return call$6(valueOf, this);
    }, { arity: 1 });
  }
};

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$2 = classof$7;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString$2 = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof$2(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineProperty = objectDefineProperty.f;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var hasOwn$6 = hasOwnProperty_1;
var toString$a = objectToString$2;
var wellKnownSymbol$8 = wellKnownSymbol$h;

var TO_STRING_TAG$1 = wellKnownSymbol$8('toStringTag');

var setToStringTag$5 = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!hasOwn$6(target, TO_STRING_TAG$1)) {
      defineProperty(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty$2(target, 'toString', toString$a);
    }
  }
};

var global$5 = global$d;
var isCallable$3 = isCallable$f;
var inspectSource = inspectSource$2;

var WeakMap$1 = global$5.WeakMap;

var nativeWeakMap = isCallable$3(WeakMap$1) && /native code/.test(inspectSource(WeakMap$1));

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$4 = global$d;
var uncurryThis$5 = functionUncurryThis;
var isObject$2 = isObject$b;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var hasOwn$5 = hasOwnProperty_1;
var shared$3 = sharedStore;
var sharedKey$2 = sharedKey$4;
var hiddenKeys$1 = hiddenKeys$5;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$2 = global$4.TypeError;
var WeakMap = global$4.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$3.state) {
  var store = shared$3.state || (shared$3.state = new WeakMap());
  var wmget = uncurryThis$5(store.get);
  var wmhas = uncurryThis$5(store.has);
  var wmset = uncurryThis$5(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$1[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$5(it, STATE)) throw new TypeError$2(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$1(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$5(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$5(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var bind$1 = functionBindContext;
var uncurryThis$4 = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject$5 = toObject$8;
var lengthOfArrayLike$3 = lengthOfArrayLike$7;
var arraySpeciesCreate = arraySpeciesCreate$2;

var push$1 = uncurryThis$4([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$5($this);
    var self = IndexedObject(O);
    var boundFunction = bind$1(callbackfn, that);
    var length = lengthOfArrayLike$3(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$1(7)
};

var $$d = _export;
var global$3 = global$d;
var call$5 = functionCall;
var uncurryThis$3 = functionUncurryThis;
var DESCRIPTORS$1 = descriptors;
var NATIVE_SYMBOL$3 = nativeSymbol;
var fails$6 = fails$i;
var hasOwn$4 = hasOwnProperty_1;
var isPrototypeOf$3 = objectIsPrototypeOf;
var anObject$3 = anObject$9;
var toIndexedObject$2 = toIndexedObject$8;
var toPropertyKey = toPropertyKey$4;
var $toString = toString$b;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;
var nativeObjectCreate = objectCreate;
var objectKeys = objectKeys$2;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule = objectDefineProperty;
var definePropertiesModule = objectDefineProperties;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var defineBuiltIn$2 = defineBuiltIn$4;
var shared$2 = shared$6.exports;
var sharedKey$1 = sharedKey$4;
var hiddenKeys = hiddenKeys$5;
var uid = uid$3;
var wellKnownSymbol$7 = wellKnownSymbol$h;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$l = defineWellKnownSymbol$m;
var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
var setToStringTag$4 = setToStringTag$5;
var InternalStateModule$2 = internalState;
var $forEach = arrayIteration.forEach;

var HIDDEN = sharedKey$1('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';

var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$2 = InternalStateModule$2.getterFor(SYMBOL);

var ObjectPrototype$1 = Object[PROTOTYPE];
var $Symbol = global$3.Symbol;
var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
var TypeError$1 = global$3.TypeError;
var QObject = global$3.QObject;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var push = uncurryThis$3([].push);

var AllSymbols = shared$2('symbols');
var ObjectPrototypeSymbols = shared$2('op-symbols');
var WellKnownSymbolsStore = shared$2('wks');

// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS$1 && fails$6(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
  setInternalState$2(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS$1) symbol.description = description;
  return symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject$3(O);
  var key = toPropertyKey(P);
  anObject$3(Attributes);
  if (hasOwn$4(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn$4(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn$4(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject$3(O);
  var properties = toIndexedObject$2(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS$1 || call$5($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPropertyKey(V);
  var enumerable = call$5(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype$1 && hasOwn$4(AllSymbols, P) && !hasOwn$4(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !hasOwn$4(this, P) || !hasOwn$4(AllSymbols, P) || hasOwn$4(this, HIDDEN) && this[HIDDEN][P]
    ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject$2(O);
  var key = toPropertyKey(P);
  if (it === ObjectPrototype$1 && hasOwn$4(AllSymbols, key) && !hasOwn$4(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && hasOwn$4(AllSymbols, key) && !(hasOwn$4(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$2(O));
  var result = [];
  $forEach(names, function (key) {
    if (!hasOwn$4(AllSymbols, key) && !hasOwn$4(hiddenKeys, key)) push(result, key);
  });
  return result;
};

var $getOwnPropertySymbols = function (O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$2(O));
  var result = [];
  $forEach(names, function (key) {
    if (hasOwn$4(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$4(ObjectPrototype$1, key))) {
      push(result, AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL$3) {
  $Symbol = function Symbol() {
    if (isPrototypeOf$3(SymbolPrototype, this)) throw TypeError$1('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype$1) call$5(setter, ObjectPrototypeSymbols, value);
      if (hasOwn$4(this, HIDDEN) && hasOwn$4(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
    };
    if (DESCRIPTORS$1 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  SymbolPrototype = $Symbol[PROTOTYPE];

  defineBuiltIn$2(SymbolPrototype, 'toString', function toString() {
    return getInternalState$2(this).tag;
  });

  defineBuiltIn$2($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol$7(name), name);
  };

  if (DESCRIPTORS$1) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$2(this).description;
      }
    });
  }
}

$$d({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$3, sham: !NATIVE_SYMBOL$3 }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol$l(name);
});

$$d({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$3 }, {
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$$d({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3, sham: !DESCRIPTORS$1 }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$$d({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3 }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive$1();

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$4($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;

var NATIVE_SYMBOL$2 = nativeSymbol;

/* eslint-disable es-x/no-symbol -- safe */
var nativeSymbolRegistry = NATIVE_SYMBOL$2 && !!Symbol['for'] && !!Symbol.keyFor;

var $$c = _export;
var getBuiltIn$2 = getBuiltIn$9;
var hasOwn$3 = hasOwnProperty_1;
var toString$9 = toString$b;
var shared$1 = shared$6.exports;
var NATIVE_SYMBOL_REGISTRY$1 = nativeSymbolRegistry;

var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');

// `Symbol.for` method
// https://tc39.es/ecma262/#sec-symbol.for
$$c({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
  'for': function (key) {
    var string = toString$9(key);
    if (hasOwn$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = getBuiltIn$2('Symbol')(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry$1[symbol] = string;
    return symbol;
  }
});

var $$b = _export;
var hasOwn$2 = hasOwnProperty_1;
var isSymbol$3 = isSymbol$6;
var tryToString$1 = tryToString$4;
var shared = shared$6.exports;
var NATIVE_SYMBOL_REGISTRY = nativeSymbolRegistry;

var SymbolToStringRegistry = shared('symbol-to-string-registry');

// `Symbol.keyFor` method
// https://tc39.es/ecma262/#sec-symbol.keyfor
$$b({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol$3(sym)) throw TypeError(tryToString$1(sym) + ' is not a symbol');
    if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  }
});

var $$a = _export;
var getBuiltIn$1 = getBuiltIn$9;
var apply = functionApply;
var call$4 = functionCall;
var uncurryThis$2 = functionUncurryThis;
var fails$5 = fails$i;
var isArray$a = isArray$d;
var isCallable$2 = isCallable$f;
var isObject$1 = isObject$b;
var isSymbol$2 = isSymbol$6;
var arraySlice = arraySlice$3;
var NATIVE_SYMBOL$1 = nativeSymbol;

var $stringify = getBuiltIn$1('JSON', 'stringify');
var exec = uncurryThis$2(/./.exec);
var charAt$4 = uncurryThis$2(''.charAt);
var charCodeAt$1 = uncurryThis$2(''.charCodeAt);
var replace = uncurryThis$2(''.replace);
var numberToString = uncurryThis$2(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$1 || fails$5(function () {
  var symbol = getBuiltIn$1('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails$5(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = replacer;
  if (!isObject$1(replacer) && it === undefined || isSymbol$2(it)) return; // IE8 returns string on undefined
  if (!isArray$a(replacer)) replacer = function (key, value) {
    if (isCallable$2($replacer)) value = call$4($replacer, this, key, value);
    if (!isSymbol$2(value)) return value;
  };
  args[1] = replacer;
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt$4(string, offset - 1);
  var next = charAt$4(string, offset + 1);
  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
    return '\\u' + numberToString(charCodeAt$1(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $$a({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}

var $$9 = _export;
var NATIVE_SYMBOL = nativeSymbol;
var fails$4 = fails$i;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var toObject$4 = toObject$8;

// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FORCED$1 = !NATIVE_SYMBOL || fails$4(function () { getOwnPropertySymbolsModule.f(1); });

// `Object.getOwnPropertySymbols` method
// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
$$9({ target: 'Object', stat: true, forced: FORCED$1 }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$4(it)) : [];
  }
});

var defineWellKnownSymbol$k = defineWellKnownSymbol$m;

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol$k('asyncIterator');

var defineWellKnownSymbol$j = defineWellKnownSymbol$m;

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol$j('hasInstance');

var defineWellKnownSymbol$i = defineWellKnownSymbol$m;

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol$i('isConcatSpreadable');

var defineWellKnownSymbol$h = defineWellKnownSymbol$m;

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol$h('iterator');

var defineWellKnownSymbol$g = defineWellKnownSymbol$m;

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol$g('match');

var defineWellKnownSymbol$f = defineWellKnownSymbol$m;

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol$f('matchAll');

var defineWellKnownSymbol$e = defineWellKnownSymbol$m;

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol$e('replace');

var defineWellKnownSymbol$d = defineWellKnownSymbol$m;

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol$d('search');

var defineWellKnownSymbol$c = defineWellKnownSymbol$m;

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol$c('species');

var defineWellKnownSymbol$b = defineWellKnownSymbol$m;

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol$b('split');

var defineWellKnownSymbol$a = defineWellKnownSymbol$m;
var defineSymbolToPrimitive = symbolDefineToPrimitive;

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol$a('toPrimitive');

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
defineSymbolToPrimitive();

var getBuiltIn = getBuiltIn$9;
var defineWellKnownSymbol$9 = defineWellKnownSymbol$m;
var setToStringTag$3 = setToStringTag$5;

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol$9('toStringTag');

// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag$3(getBuiltIn('Symbol'), 'Symbol');

var defineWellKnownSymbol$8 = defineWellKnownSymbol$m;

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol$8('unscopables');

var global$2 = global$d;
var setToStringTag$2 = setToStringTag$5;

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag$2(global$2.JSON, 'JSON', true);

var path$3 = path$c;

var symbol$3 = path$3.Symbol;

var iterators = {};

var DESCRIPTORS = descriptors;
var hasOwn$1 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$1(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var fails$3 = fails$i;

var correctPrototypeGetter = !fails$3(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn = hasOwnProperty_1;
var isCallable$1 = isCallable$f;
var toObject$3 = toObject$8;
var sharedKey = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER$1 ? $Object.getPrototypeOf : function (O) {
  var object = toObject$3(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$1(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};

var fails$2 = fails$i;
var isCallable = isCallable$f;
var create$1 = objectCreate;
var getPrototypeOf$7 = objectGetPrototypeOf;
var defineBuiltIn$1 = defineBuiltIn$4;
var wellKnownSymbol$6 = wellKnownSymbol$h;

var ITERATOR$4 = wellKnownSymbol$6('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$7(getPrototypeOf$7(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$1 == undefined || fails$2(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$1[ITERATOR$4].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
else IteratorPrototype$1 = create$1(IteratorPrototype$1);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype$1[ITERATOR$4])) {
  defineBuiltIn$1(IteratorPrototype$1, ITERATOR$4, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$1,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype = iteratorsCore.IteratorPrototype;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$5;
var setToStringTag$1 = setToStringTag$5;
var Iterators$5 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators$5[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$8 = _export;
var call$3 = functionCall;
var FunctionName = functionName;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf$6 = objectGetPrototypeOf;
var setToStringTag = setToStringTag$5;
var defineBuiltIn = defineBuiltIn$4;
var wellKnownSymbol$5 = wellKnownSymbol$h;
var Iterators$4 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$3 = wellKnownSymbol$5('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$2 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$3]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$6(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      Iterators$4[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$3(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$8({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR$3, defaultIterator, { name: DEFAULT });
  }
  Iterators$4[NAME] = defaultIterator;

  return methods;
};

var toIndexedObject$1 = toIndexedObject$8;
var Iterators$3 = iterators;
var InternalStateModule$1 = internalState;
objectDefineProperty.f;
var defineIterator$1 = defineIterator$2;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$1(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators$3.Arguments = Iterators$3.Array;

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var DOMIterables = domIterables;
var global$1 = global$d;
var classof$1 = classof$7;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var Iterators$2 = iterators;
var wellKnownSymbol$4 = wellKnownSymbol$h;

var TO_STRING_TAG = wellKnownSymbol$4('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof$1(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators$2[COLLECTION_NAME] = Iterators$2.Array;
}

var parent$q = symbol$3;


var symbol$2 = parent$q;

var parent$p = symbol$2;

var symbol$1 = parent$p;

var defineWellKnownSymbol$7 = defineWellKnownSymbol$m;

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol$7('asyncDispose');

var defineWellKnownSymbol$6 = defineWellKnownSymbol$m;

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol$6('dispose');

var defineWellKnownSymbol$5 = defineWellKnownSymbol$m;

// `Symbol.matcher` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol$5('matcher');

var defineWellKnownSymbol$4 = defineWellKnownSymbol$m;

// `Symbol.metadataKey` well-known symbol
// https://github.com/tc39/proposal-decorator-metadata
defineWellKnownSymbol$4('metadataKey');

var defineWellKnownSymbol$3 = defineWellKnownSymbol$m;

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol$3('observable');

// TODO: Remove from `core-js@4`
var defineWellKnownSymbol$2 = defineWellKnownSymbol$m;

// `Symbol.metadata` well-known symbol
// https://github.com/tc39/proposal-decorators
defineWellKnownSymbol$2('metadata');

// TODO: remove from `core-js@4`
var defineWellKnownSymbol$1 = defineWellKnownSymbol$m;

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol$1('patternMatch');

// TODO: remove from `core-js@4`
var defineWellKnownSymbol = defineWellKnownSymbol$m;

defineWellKnownSymbol('replaceAll');

var parent$o = symbol$1;





// TODO: Remove from `core-js@4`




var symbol = parent$o;

(function (module) {
	module.exports = symbol;
} (symbol$4));

(function (module) {
	module.exports = symbol$4.exports;
} (symbol$5));

var _Symbol$1 = /*@__PURE__*/getDefaultExportFromCjs(symbol$5.exports);

var iterator$5 = {exports: {}};

var iterator$4 = {exports: {}};

var uncurryThis$1 = functionUncurryThis;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$6;
var toString$8 = toString$b;
var requireObjectCoercible$2 = requireObjectCoercible$5;

var charAt$3 = uncurryThis$1(''.charAt);
var charCodeAt = uncurryThis$1(''.charCodeAt);
var stringSlice = uncurryThis$1(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$8(requireObjectCoercible$2($this));
    var position = toIntegerOrInfinity$3(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$3(S, position)
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

var charAt$2 = stringMultibyte.charAt;
var toString$7 = toString$b;
var InternalStateModule = internalState;
var defineIterator = defineIterator$2;

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString$7(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt$2(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;

var iterator$3 = WrappedWellKnownSymbolModule.f('iterator');

var parent$n = iterator$3;


var iterator$2 = parent$n;

var parent$m = iterator$2;

var iterator$1 = parent$m;

var parent$l = iterator$1;

var iterator = parent$l;

(function (module) {
	module.exports = iterator;
} (iterator$4));

(function (module) {
	module.exports = iterator$4.exports;
} (iterator$5));

var _Symbol$iterator = /*@__PURE__*/getDefaultExportFromCjs(iterator$5.exports);

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof _Symbol$1 && "symbol" == typeof _Symbol$iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof _Symbol$1 && obj.constructor === _Symbol$1 && obj !== _Symbol$1.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

var getPrototypeOf$5 = {exports: {}};

var getPrototypeOf$4 = {exports: {}};

var $$7 = _export;
var fails$1 = fails$i;
var toObject$2 = toObject$8;
var nativeGetPrototypeOf = objectGetPrototypeOf;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var FAILS_ON_PRIMITIVES = fails$1(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$$7({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject$2(it));
  }
});

var path$2 = path$c;

var getPrototypeOf$3 = path$2.Object.getPrototypeOf;

var parent$k = getPrototypeOf$3;

var getPrototypeOf$2 = parent$k;

var parent$j = getPrototypeOf$2;

var getPrototypeOf$1 = parent$j;

var parent$i = getPrototypeOf$1;

var getPrototypeOf = parent$i;

(function (module) {
	module.exports = getPrototypeOf;
} (getPrototypeOf$4));

(function (module) {
	module.exports = getPrototypeOf$4.exports;
} (getPrototypeOf$5));

var _Object$getPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(getPrototypeOf$5.exports);

function _getPrototypeOf(o) {
  var _context;

  _getPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$getPrototypeOf).call(_context) : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal || freeSelf || Function('return this')();

var _root = root$1;

var root = _root;

/** Built-in value references. */
var Symbol$4 = root.Symbol;

var _Symbol = Symbol$4;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$1;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$9 = Array.isArray;

var isArray_1 = isArray$9;

var Symbol$3 = _Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$2 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$1(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$1(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$1;

var baseGetTag = _baseGetTag,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol$1(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol$1;

var Symbol$1 = _Symbol,
    arrayMap = _arrayMap,
    isArray$8 = isArray_1,
    isSymbol = isSymbol_1;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString$1(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$8(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString$1) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString$1;

var baseToString = _baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$6(value) {
  return value == null ? '' : baseToString(value);
}

var toString_1 = toString$6;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */

function baseSlice$1(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

var _baseSlice = baseSlice$1;

var baseSlice = _baseSlice;

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice$1(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

var _castSlice = castSlice$1;

/** Used to compose unicode character classes. */

var rsAstralRange$2 = '\\ud800-\\udfff',
    rsComboMarksRange$3 = '\\u0300-\\u036f',
    reComboHalfMarksRange$3 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$3 = '\\u20d0-\\u20ff',
    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
    rsVarRange$2 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$2 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$2 + rsAstralRange$2  + rsComboRange$3 + rsVarRange$2 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$2(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode$2;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray$1(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */

var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$2 = '\\u0300-\\u036f',
    reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange$1 + ']',
    rsCombo$2 = '[' + rsComboRange$2 + ']',
    rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$1 + ']',
    rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ$1 = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$1 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray$1;

var asciiToArray = _asciiToArray,
    hasUnicode$1 = _hasUnicode,
    unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
  return hasUnicode$1(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

var _stringToArray = stringToArray$1;

var castSlice = _castSlice,
    hasUnicode = _hasUnicode,
    stringToArray = _stringToArray,
    toString$5 = toString_1;

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst$1(methodName) {
  return function(string) {
    string = toString$5(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

var _createCaseFirst = createCaseFirst$1;

var createCaseFirst = _createCaseFirst;

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst$1 = createCaseFirst('toUpperCase');

var upperFirst_1 = upperFirst$1;

var toString$4 = toString_1,
    upperFirst = upperFirst_1;

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize$1(string) {
  return upperFirst(toString$4(string).toLowerCase());
}

var capitalize_1 = capitalize$1;

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */

function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

var _arrayReduce = arrayReduce$1;

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyOf$1(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

var _basePropertyOf = basePropertyOf$1;

var basePropertyOf = _basePropertyOf;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 's'
};

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter$1 = basePropertyOf(deburredLetters);

var _deburrLetter = deburrLetter$1;

var deburrLetter = _deburrLetter,
    toString$3 = toString_1;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;

/** Used to compose unicode capture groups. */
var rsCombo$1 = '[' + rsComboRange$1 + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo$1, 'g');

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr$1(string) {
  string = toString$3(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

var deburr_1 = deburr$1;

/** Used to match words composed of alphanumeric characters. */

var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords$1(string) {
  return string.match(reAsciiWord) || [];
}

var _asciiWords = asciiWords$1;

/** Used to detect strings that need a more robust regexp to match words. */

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord$1(string) {
  return reHasUnicodeWord.test(string);
}

var _hasUnicodeWord = hasUnicodeWord$1;

/** Used to compose unicode character classes. */

var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos$1 = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos$1 + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos$1 + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
  rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
  rsUpper + '+' + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords$1(string) {
  return string.match(reUnicodeWord) || [];
}

var _unicodeWords = unicodeWords$1;

var asciiWords = _asciiWords,
    hasUnicodeWord = _hasUnicodeWord,
    toString$2 = toString_1,
    unicodeWords = _unicodeWords;

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words$1(string, pattern, guard) {
  string = toString$2(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

var words_1 = words$1;

var arrayReduce = _arrayReduce,
    deburr = deburr_1,
    words = words_1;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]";

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder$1(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

var _createCompounder = createCompounder$1;

var capitalize = capitalize_1,
    createCompounder = _createCompounder;

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

var camelCase_1 = camelCase;

var at$7 = {exports: {}};

var at$6 = {exports: {}};

var $$6 = _export;
var toObject$1 = toObject$8;
var lengthOfArrayLike$2 = lengthOfArrayLike$7;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$6;

// `Array.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$6({ target: 'Array', proto: true }, {
  at: function at(index) {
    var O = toObject$1(this);
    var len = lengthOfArrayLike$2(O);
    var relativeIndex = toIntegerOrInfinity$2(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : O[k];
  }
});

var entryVirtual$4 = entryVirtual$6;

var at$5 = entryVirtual$4('Array').at;

var parent$h = at$5;

var at$4 = parent$h;

var parent$g = at$4;

var at$3 = parent$g;

var parent$f = at$3;

// TODO: Remove from `core-js@4`


var at$2 = parent$f;

var $$5 = _export;
var uncurryThis = functionUncurryThis;
var requireObjectCoercible$1 = requireObjectCoercible$5;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$6;
var toString$1 = toString$b;
var fails = fails$i;

var charAt$1 = uncurryThis(''.charAt);

var FORCED = fails(function () {
  // eslint-disable-next-line es-x/no-array-string-prototype-at -- safe
  return '𠮷'.at(-2) !== '\uD842';
});

// `String.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
$$5({ target: 'String', proto: true, forced: FORCED }, {
  at: function at(index) {
    var S = toString$1(requireObjectCoercible$1(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity$1(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt$1(S, k);
  }
});

var entryVirtual$3 = entryVirtual$6;

entryVirtual$3('String').at;

// TODO: Remove from `core-js@4`
var $$4 = _export;
var charAt = stringMultibyte.charAt;
var requireObjectCoercible = requireObjectCoercible$5;
var toIntegerOrInfinity = toIntegerOrInfinity$6;
var toString = toString$b;

// `String.prototype.at` method
// https://github.com/mathiasbynens/String.prototype.at
$$4({ target: 'String', proto: true, forced: true }, {
  at: function at(index) {
    var S = toString(requireObjectCoercible(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return (k < 0 || k >= len) ? undefined : charAt(S, k);
  }
});

// TODO: Remove from `core-js@4`

var entryVirtual$2 = entryVirtual$6;

var at$1 = entryVirtual$2('String').at;

var isPrototypeOf$2 = objectIsPrototypeOf;
var arrayMethod = at$2;
var stringMethod = at$1;

var ArrayPrototype$3 = Array.prototype;
var StringPrototype = String.prototype;

var at = function (it) {
  var own = it.at;
  if (it === ArrayPrototype$3 || (isPrototypeOf$2(ArrayPrototype$3, it) && own === ArrayPrototype$3.at)) return arrayMethod;
  if (typeof it == 'string' || it === StringPrototype || (isPrototypeOf$2(StringPrototype, it) && own === StringPrototype.at)) {
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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var filter$6 = {exports: {}};

var filter$5 = {exports: {}};

var $$3 = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var entryVirtual$1 = entryVirtual$6;

var filter$4 = entryVirtual$1('Array').filter;

var isPrototypeOf$1 = objectIsPrototypeOf;
var method$1 = filter$4;

var ArrayPrototype$2 = Array.prototype;

var filter$3 = function (it) {
  var own = it.filter;
  return it === ArrayPrototype$2 || (isPrototypeOf$1(ArrayPrototype$2, it) && own === ArrayPrototype$2.filter) ? method$1 : own;
};

var parent$e = filter$3;

var filter$2 = parent$e;

var parent$d = filter$2;

var filter$1 = parent$d;

var parent$c = filter$1;

var filter = parent$c;

(function (module) {
	module.exports = filter;
} (filter$5));

(function (module) {
	module.exports = filter$5.exports;
} (filter$6));

var _filterInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(filter$6.exports);

var EventEmmiter = /*#__PURE__*/function () {
  function EventEmmiter() {
    _classCallCheck(this, EventEmmiter);

    _defineProperty(this, "events", {});
  }

  _createClass(EventEmmiter, [{
    key: "on",
    value: function on(eventName, callback) {
      var _this$events, _this$events$eventNam;

      var events = (_this$events$eventNam = (_this$events = this.events)[eventName]) !== null && _this$events$eventNam !== void 0 ? _this$events$eventNam : _this$events[eventName] = [];
      events.push(callback);
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var _this$events2, _this$events2$eventNa;

      for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
      }

      var events = (_this$events2$eventNa = (_this$events2 = this.events)[eventName]) !== null && _this$events2$eventNa !== void 0 ? _this$events2$eventNa : _this$events2[eventName] = [];
      events.forEach(function (cb) {
        return cb.apply(void 0, rest);
      });
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      var _this$events3, _this$events3$eventNa;

      var events = (_this$events3$eventNa = (_this$events3 = this.events)[eventName]) !== null && _this$events3$eventNa !== void 0 ? _this$events3$eventNa : _this$events3[eventName] = [];

      if (!callback) {
        this.events[eventName].length = 0;
      } else {
        this.events[eventName] = _filterInstanceProperty(events).call(events, function (item) {
          return item != callback && item.cb !== callback;
        });
      }
    }
  }, {
    key: "once",
    value: function once(eventName, callback) {
      var _this = this;

      var once = function once() {
        callback.apply(void 0, arguments);

        _this.off(eventName, once);
      };

      once.cb = callback;
      this.on(eventName, once);
    }
  }]);

  return EventEmmiter;
}();

var isArray$7 = {exports: {}};

var isArray$6 = {exports: {}};

var $$2 = _export;
var isArray$5 = isArray$d;

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
$$2({ target: 'Array', stat: true }, {
  isArray: isArray$5
});

var path$1 = path$c;

var isArray$4 = path$1.Array.isArray;

var parent$b = isArray$4;

var isArray$3 = parent$b;

var parent$a = isArray$3;

var isArray$2 = parent$a;

var parent$9 = isArray$2;

var isArray$1 = parent$9;

(function (module) {
	module.exports = isArray$1;
} (isArray$6));

(function (module) {
	module.exports = isArray$6.exports;
} (isArray$7));

var _Array$isArray = /*@__PURE__*/getDefaultExportFromCjs(isArray$7.exports);

function _arrayWithHoles(arr) {
  if (_Array$isArray(arr)) return arr;
}

var getIteratorMethod$8 = {exports: {}};

var getIteratorMethod$7 = {exports: {}};

var classof = classof$7;
var getMethod$1 = getMethod$3;
var Iterators$1 = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$h;

var ITERATOR$2 = wellKnownSymbol$3('iterator');

var getIteratorMethod$6 = function (it) {
  if (it != undefined) return getMethod$1(it, ITERATOR$2)
    || getMethod$1(it, '@@iterator')
    || Iterators$1[classof(it)];
};

var getIteratorMethod$5 = getIteratorMethod$6;

var getIteratorMethod_1 = getIteratorMethod$5;

var parent$8 = getIteratorMethod_1;


var getIteratorMethod$4 = parent$8;

var parent$7 = getIteratorMethod$4;

var getIteratorMethod$3 = parent$7;

var parent$6 = getIteratorMethod$3;

var getIteratorMethod$2 = parent$6;

(function (module) {
	module.exports = getIteratorMethod$2;
} (getIteratorMethod$7));

(function (module) {
	module.exports = getIteratorMethod$7.exports;
} (getIteratorMethod$8));

var _getIteratorMethod = /*@__PURE__*/getDefaultExportFromCjs(getIteratorMethod$8.exports);

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof _Symbol$1 !== "undefined" && _getIteratorMethod(arr) || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var slice$6 = {exports: {}};

var slice$5 = {exports: {}};

var $$1 = _export;
var isArray = isArray$d;
var isConstructor$1 = isConstructor$4;
var isObject = isObject$b;
var toAbsoluteIndex = toAbsoluteIndex$3;
var lengthOfArrayLike$1 = lengthOfArrayLike$7;
var toIndexedObject = toIndexedObject$8;
var createProperty$1 = createProperty$4;
var wellKnownSymbol$2 = wellKnownSymbol$h;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
var un$Slice = arraySlice$3;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol$2('species');
var $Array$1 = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike$1(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array$1 || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array$1 : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var entryVirtual = entryVirtual$6;

var slice$4 = entryVirtual('Array').slice;

var isPrototypeOf = objectIsPrototypeOf;
var method = slice$4;

var ArrayPrototype$1 = Array.prototype;

var slice$3 = function (it) {
  var own = it.slice;
  return it === ArrayPrototype$1 || (isPrototypeOf(ArrayPrototype$1, it) && own === ArrayPrototype$1.slice) ? method : own;
};

var parent$5 = slice$3;

var slice$2 = parent$5;

var parent$4 = slice$2;

var slice$1 = parent$4;

var parent$3 = slice$1;

var slice = parent$3;

(function (module) {
	module.exports = slice;
} (slice$5));

(function (module) {
	module.exports = slice$5.exports;
} (slice$6));

var _sliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(slice$6.exports);

var from$6 = {exports: {}};

var from$5 = {exports: {}};

var call$2 = functionCall;
var anObject$2 = anObject$9;
var getMethod = getMethod$3;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$2(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$2(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$2(innerResult);
  return value;
};

var anObject$1 = anObject$9;
var iteratorClose = iteratorClose$1;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject$1(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var wellKnownSymbol$1 = wellKnownSymbol$h;
var Iterators = iterators;

var ITERATOR$1 = wellKnownSymbol$1('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$1] === it);
};

var call$1 = functionCall;
var aCallable = aCallable$4;
var anObject = anObject$9;
var tryToString = tryToString$4;
var getIteratorMethod$1 = getIteratorMethod$6;

var $TypeError = TypeError;

var getIterator$1 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call$1(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};

var bind = functionBindContext;
var call = functionCall;
var toObject = toObject$8;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var isConstructor = isConstructor$4;
var lengthOfArrayLike = lengthOfArrayLike$7;
var createProperty = createProperty$4;
var getIterator = getIterator$1;
var getIteratorMethod = getIteratorMethod$6;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var wellKnownSymbol = wellKnownSymbol$h;

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var $ = _export;
var from$4 = arrayFrom;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es-x/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from$4
});

var path = path$c;

var from$3 = path.Array.from;

var parent$2 = from$3;

var from$2 = parent$2;

var parent$1 = from$2;

var from$1 = parent$1;

var parent = from$1;

var from = parent;

(function (module) {
	module.exports = from;
} (from$5));

(function (module) {
	module.exports = from$5.exports;
} (from$6));

var _Array$from = /*@__PURE__*/getDefaultExportFromCjs(from$6.exports);

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);

  var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return _Array$from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var initProcessor = {
  receive: function receive(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        data = _ref2[0],
        socket = _ref2[1];

    return [data, socket];
  },
  send: function send(_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        component = _ref4[0],
        socket = _ref4[1];

    return [component, socket];
  }
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Chat = /*#__PURE__*/function (_EventEmmiter) {
  _inherits(Chat, _EventEmmiter);

  var _super = _createSuper(Chat);

  function Chat() {
    var _context;

    var _this;

    _classCallCheck(this, Chat);

    _this = _super.call(this);
    _this.processors = [];
    console.log('es2022', _atInstanceProperty(_context = [1, 2, 3]).call(_context, -1));
    console.log('camelCase', camelCase_1('abc-xyz-nnn'));
    return _this;
  }

  _createClass(Chat, [{
    key: "test",
    value: function test() {
      console.log('test', this.processors);
    }
  }]);

  return Chat;
}(EventEmmiter);

exports["default"] = Chat;
exports.initProcessor = initProcessor;
