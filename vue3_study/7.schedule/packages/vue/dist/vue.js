var Vue = (function (exports) {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    function effect(fn, options) {
        var _effect = new ReactiveEffect(fn);
        if (options) {
            Object.assign(_effect, options);
        }
        if (!options || !options.lazy) {
            _effect.run();
        }
        var runner = _effect.run.bind(_effect);
        return runner;
    }
    /**
     * targetMap 大致结构如下
     * {target: Map<{key: Set<Effect>}>}
     *  target | depsMap
     *  	obj  |   key  |  Dep
     * 						 k1   | effect1,effect2...
     * 						 k2   | effect3,effect4...
     */
    var targetMap = new WeakMap();
    exports.activeEffect = void 0;
    var ReactiveEffect = /** @class */ (function () {
        function ReactiveEffect(fn, scheduler) {
            if (scheduler === void 0) { scheduler = null; }
            this.fn = fn;
            this.scheduler = scheduler;
            // ts会自动添加以下两行代码
            // this.fn = fn
            // this.scheduler = scheduler
        }
        ReactiveEffect.prototype.run = function () {
            exports.activeEffect = this;
            return this.fn();
        };
        ReactiveEffect.prototype.stop = function () {
            // todo
        };
        return ReactiveEffect;
    }());
    function track(target, p) {
        // if (!activeEffect) return
        var depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        var dep = depsMap.get(p);
        if (!dep) {
            depsMap.set(p, (dep = new Set()));
        }
        dep.add(exports.activeEffect);
    }
    function trigger(target, p) {
        var depsMap = targetMap.get(target);
        if (!depsMap)
            return;
        var dep = depsMap.get(p);
        if (!dep)
            return;
        triggerEffects(dep);
    }
    function triggerEffects(effects) {
        var e_1, _a, e_2, _b;
        try {
            // 让 ComputedRefImpl 实例的副作用先执行，利用dirty标志避免死循环
            for (var effects_1 = __values(effects), effects_1_1 = effects_1.next(); !effects_1_1.done; effects_1_1 = effects_1.next()) {
                var effect_1 = effects_1_1.value;
                if (effect_1.computed) {
                    triggerEffect(effect_1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (effects_1_1 && !effects_1_1.done && (_a = effects_1.return)) _a.call(effects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var effects_2 = __values(effects), effects_2_1 = effects_2.next(); !effects_2_1.done; effects_2_1 = effects_2.next()) {
                var effect_2 = effects_2_1.value;
                if (!effect_2.computed) {
                    triggerEffect(effect_2);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (effects_2_1 && !effects_2_1.done && (_b = effects_2.return)) _b.call(effects_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    function triggerEffect(effect) {
        (effect === null || effect === void 0 ? void 0 : effect.scheduler) ? effect.scheduler() : effect.run();
    }

    // Map缓存 obj:observed
    var reactiveMap = new WeakMap();
    function reactive(target) {
        if (reactiveMap.has(target)) {
            return reactiveMap.get(target);
        }
        var observed = new Proxy(target, {
            get: function (target, p, receiver) {
                var res = Reflect.get(target, p, receiver);
                track(target, p);
                return res;
            },
            set: function (target, p, value, receiver) {
                var res = Reflect.set(target, p, value, receiver);
                trigger(target, p);
                return res;
            }
        });
        observed.__v_isReactive = true;
        reactiveMap.set(target, observed);
        return observed;
    }
    var isReactive = function (value) { return !!(value === null || value === void 0 ? void 0 : value.__v_isReactive); };

    /**
     * 判断是否为一个对象
     */
    var isObject = function (val) {
        return val !== null && typeof val === 'object';
    };

    function ref(value) {
        return new RefImpl(value);
    }
    var RefImpl = /** @class */ (function () {
        function RefImpl(value) {
            this.dep = undefined;
            this._value = toReactive(value);
            this._rawValue = value;
        }
        Object.defineProperty(RefImpl.prototype, "value", {
            get: function () {
                var _a;
                // 收集依赖
                if (exports.activeEffect) {
                    (_a = this.dep) !== null && _a !== void 0 ? _a : (this.dep = new Set());
                    this.dep.add(exports.activeEffect);
                }
                return this._value;
            },
            set: function (newVal) {
                if (!Object.is(newVal, this._rawValue)) {
                    this._rawValue = newVal;
                    this._value = toReactive(newVal);
                    // 触发依赖
                    if (this.dep) {
                        triggerEffects(this.dep);
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return RefImpl;
    }());
    var toReactive = function (value) {
        return isObject(value) ? reactive(value) : value;
    };

    function computed(getterOrOptions) {
        // 这里只考虑简单情况 即 getterOrOptions 为 getter
        var getter = getterOrOptions;
        return new ComputedRefImpl(getter);
    }
    var ComputedRefImpl = /** @class */ (function () {
        function ComputedRefImpl(getter) {
            var _this = this;
            this.dep = undefined;
            this._dirty = true;
            this.effect = new ReactiveEffect(getter, function () {
                if (!_this._dirty) {
                    _this._dirty = true;
                    _this.dep && triggerEffects(_this.dep);
                }
            });
            this.effect.computed = this;
        }
        Object.defineProperty(ComputedRefImpl.prototype, "value", {
            get: function () {
                var _a;
                (_a = this.dep) !== null && _a !== void 0 ? _a : (this.dep = new Set());
                this.dep.add(exports.activeEffect);
                if (this._dirty) {
                    this._dirty = false;
                    // this.effect.run 指向的就是computed()的参数1
                    this._value = this.effect.run();
                }
                return this._value;
            },
            enumerable: false,
            configurable: true
        });
        return ComputedRefImpl;
    }());

    var cbs = [];
    function queuePostFlushCb(cb) {
        cbs.push(cb);
        queueFlush();
    }
    var isFlushPending = false;
    function queueFlush() {
        return __awaiter(this, void 0, void 0, function () {
            var _cbs, _cbs_1, _cbs_1_1, cb;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!isFlushPending) return [3 /*break*/, 2];
                        isFlushPending = true;
                        return [4 /*yield*/, Promise.resolve()];
                    case 1:
                        _b.sent();
                        _cbs = __spreadArray([], __read(new Set(cbs)), false);
                        try {
                            for (_cbs_1 = __values(_cbs), _cbs_1_1 = _cbs_1.next(); !_cbs_1_1.done; _cbs_1_1 = _cbs_1.next()) {
                                cb = _cbs_1_1.value;
                                cb();
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_cbs_1_1 && !_cbs_1_1.done && (_a = _cbs_1.return)) _a.call(_cbs_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        cbs.length = 0;
                        isFlushPending = false;
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }

    function watch(source, cb, _a) {
        var _b = _a === void 0 ? {} : _a, immediate = _b.immediate, deep = _b.deep;
        var getter;
        if (isReactive(source)) {
            getter = function () { return source; };
            deep = true;
        }
        else {
            getter = function () { };
        }
        if (deep) {
            var baseGetter_1 = getter;
            getter = function () { return traverse(baseGetter_1()); };
        }
        var oldValue = {};
        var job = function () {
            var newValue = effect.run();
            if (deep || Object.is(newValue, oldValue)) {
                cb(newValue, oldValue);
                oldValue = newValue;
            }
        };
        var scheduler = function () { return queuePostFlushCb(job); };
        var effect = new ReactiveEffect(getter, scheduler);
        if (immediate) {
            job();
        }
        else {
            oldValue = effect.run();
        }
        return function () { return effect.stop(); };
    }
    function traverse(value) {
        if (!isObject(value)) {
            return value;
        }
        for (var key in value) {
            traverse(value[key]);
        }
        return value;
    }

    exports.ComputedRefImpl = ComputedRefImpl;
    exports.ReactiveEffect = ReactiveEffect;
    exports.computed = computed;
    exports.effect = effect;
    exports.isObject = isObject;
    exports.isReactive = isReactive;
    exports.queuePostFlushCb = queuePostFlushCb;
    exports.reactive = reactive;
    exports.reactiveMap = reactiveMap;
    exports.ref = ref;
    exports.toReactive = toReactive;
    exports.track = track;
    exports.traverse = traverse;
    exports.trigger = trigger;
    exports.triggerEffect = triggerEffect;
    exports.triggerEffects = triggerEffects;
    exports.watch = watch;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=vue.js.map
