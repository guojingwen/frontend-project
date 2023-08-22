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

    function effect(fn) {
        var _effect = new ReactiveEffect(fn);
        _effect.run();
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
        function ReactiveEffect(fn) {
            this.fn = fn;
            this.fn = fn;
        }
        ReactiveEffect.prototype.run = function () {
            exports.activeEffect = this;
            this.fn();
        };
        return ReactiveEffect;
    }());
    function track(target, p) {
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
        var e_1, _a;
        try {
            for (var effects_1 = __values(effects), effects_1_1 = effects_1.next(); !effects_1_1.done; effects_1_1 = effects_1.next()) {
                var effect_1 = effects_1_1.value;
                effect_1.run();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (effects_1_1 && !effects_1_1.done && (_a = effects_1.return)) _a.call(effects_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
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
        reactiveMap.set(target, observed);
        return observed;
    }

    exports.ReactiveEffect = ReactiveEffect;
    exports.effect = effect;
    exports.reactive = reactive;
    exports.reactiveMap = reactiveMap;
    exports.track = track;
    exports.trigger = trigger;
    exports.triggerEffects = triggerEffects;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=vue.js.map
