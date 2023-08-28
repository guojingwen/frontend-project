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

    var isObject = function (val) {
        return val !== null && typeof val === 'object';
    };
    var isString = function (val) { return typeof val === 'string'; };
    var isOn = function (key) { return /^on[^a-z]/.test(key); };

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
            getter = function () { return traverse(source); };
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
    // 遍历代理对象，完成依赖收集
    function traverse(value) {
        if (!isObject(value)) {
            return value;
        }
        for (var key in value) {
            // 触发 get 触发依赖收集啊
            traverse(value[key]);
        }
        return value;
    }

    function normalizeClass(value) {
        var res = '';
        if (typeof value === 'string') {
            res = value;
        }
        else if (Array.isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                var normalized = normalizeClass(value[i]);
                if (normalized) {
                    res += normalized + ' ';
                }
            }
        }
        else if (Reflect.toString.call(value) === '[object Object]') {
            for (var name_1 in value) {
                if (value[name_1]) {
                    res += name_1 + ' ';
                }
            }
        }
        return res.trim();
    }

    var Fragment = Symbol('Fragment');
    var Text = Symbol('Text');
    function isVNode(value) {
        return value ? value.__v_isVNode === true : false;
    }
    function createVNode(type, props, children) {
        var shapeFlag = typeof type === 'string'
            ? 1 /* ShapeFlags.ELEMENT */
            : Reflect.toString.call(type) === '[object Object]'
                ? 4 /* ShapeFlags.STATEFUL_COMPONENT */
                : 0;
        if (props) {
            // 处理 class
            var klass = props.class; props.style;
            if (klass && typeof klass !== 'string') {
                props.class = normalizeClass(klass);
            }
            // todo style处理与class处理很像， 这里偷懒不写了
            /* if (kstyle  && typeof kstyle !== 'string') {
              props.style = normalizeStyle(kstyle)
            } */
        }
        return createBaseVNode(type, props, children, shapeFlag);
    }
    function createBaseVNode(type, props, children, shapeFlag) {
        var vnode = {
            __v_isVNode: true,
            type: type,
            props: props,
            shapeFlag: shapeFlag,
            key: (props === null || props === void 0 ? void 0 : props.key) || null
        };
        normalizeChildren(vnode, children);
        return vnode;
    }
    function normalizeChildren(vnode, children) {
        var type = 0;
        if (children == null) {
            children = null;
        }
        else if (Array.isArray(children)) {
            type = 16 /* ShapeFlags.ARRAY_CHILDREN */;
        }
        else if (typeof children === 'object') ;
        else if (typeof children === 'function') ;
        else {
            children = String(children);
            type = 8 /* ShapeFlags.TEXT_CHILDREN */;
        }
        vnode.children = children;
        vnode.shapeFlag |= type; // 从父节点就能推断出子节点的类型
    }
    function isSameVNodeType(n1, n2) {
        return n1.type === n2.type && n1.key === n2.key;
    }

    /**
     * h函数只做了参数标准化的事情
     * 其他工作都交给了createVNode函数
     */
    function h(type, propsOrChildren, children) {
        var l = arguments.length;
        if (l === 2) {
            if (isObject(propsOrChildren) && !Array.isArray(propsOrChildren)) {
                if (isVNode(propsOrChildren)) {
                    return createVNode(type, null, [propsOrChildren]);
                }
                return createVNode(type, propsOrChildren);
            }
            return createVNode(type, null, propsOrChildren);
        }
        else {
            if (l > 3) {
                children = Array.prototype.slice.call(arguments, 2);
            }
            else if (l === 3 && isVNode(children)) {
                children = [children];
            }
            return createVNode(type, propsOrChildren, children);
        }
    }

    var uid = 0;
    function createComponentInstance(vnode) {
        var instance = {
            uid: uid++,
            vnode: vnode,
            type: vnode.type,
            /**
             * subTree  render函数的返回值
             * 对应要渲染的DOM节点
             **/
            subTree: null,
            effect: null,
            update: null,
            render: null,
            isMounted: false,
            data: null
        };
        return instance;
    }

    function createRenderer(options) {
        var _a = options, hostInsert = _a.insert, hostCreateElement = _a.createElement, hostSetElementText = _a.setElementText, hostPatchProp = _a.patchProp, hostRemove = _a.remove, hostCreateText = _a.createText, hostSetText = _a.setText, hostCreateComment = _a.createComment;
        return {
            render: render
        };
        function render(vnode, container) {
            var _a;
            if (vnode === null) {
                var node = (_a = container._vnode) === null || _a === void 0 ? void 0 : _a.el;
                hostRemove(node);
            }
            else {
                // 打补丁
                patch(container._vnode, vnode, container);
            }
            // 更新旧节点
            container._vnode = vnode;
        }
        function patch(oldVNode, newVNode, container, anchor) {
            if (anchor === void 0) { anchor = null; }
            if (oldVNode === newVNode)
                return;
            if (oldVNode && !isSameVNodeType(oldVNode, newVNode)) {
                hostRemove(container._vnode.el);
                oldVNode = null;
            }
            var type = newVNode.type, shapeFlag = newVNode.shapeFlag;
            switch (type) {
                case Text:
                    processText(oldVNode, newVNode, container, anchor);
                    break;
                case Comment:
                    processCommentNode(oldVNode, newVNode, container, anchor);
                    break;
                case Fragment:
                    processFragment(oldVNode, newVNode, container, anchor);
                    break;
                default:
                    if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
                        processElement(oldVNode, newVNode, container, anchor);
                    }
                    else if (shapeFlag & 6 /* ShapeFlags.COMPONENT */) {
                        processComponent(oldVNode, newVNode, container, anchor);
                    }
            }
        }
        function processComponent(oldVNode, newVNode, container, anchor) {
            if (oldVNode == null) {
                mountComponent(newVNode, container, anchor);
            }
        }
        function mountComponent(initialVNode, container, anchor) {
            initialVNode.component = createComponentInstance(initialVNode);
            var instance = initialVNode.component;
            var Component = initialVNode.type;
            instance.render = Component.render;
            // 设置组件渲染
            setupRenderEffect(instance, initialVNode, container, anchor);
            console.log((window._vnode = initialVNode));
        }
        function setupRenderEffect(instance, initialVNode, container, anchor) {
            var componentUpdateFn = function () {
                if (!instance.isMounted) {
                    var render_1 = instance.render;
                    var subTree = (instance.subTree = render_1 === null || render_1 === void 0 ? void 0 : render_1());
                    patch(null, subTree, container, anchor);
                    initialVNode.el = subTree.el;
                    instance.isMounted = true;
                }
            };
            var effect = (instance.effect = new ReactiveEffect(componentUpdateFn));
            var update = (instance.update = function () { return effect.run(); });
            update();
        }
        function processText(oldVNode, newVNode, container, anchor) {
            if (oldVNode == null) {
                newVNode.el = hostCreateText(newVNode.children);
                hostInsert(newVNode.el, container, anchor);
            }
            else {
                var el = (newVNode.el = oldVNode.el);
                if (newVNode.children !== oldVNode.children) {
                    hostSetText(el, newVNode.children);
                }
            }
        }
        function processCommentNode(oldVNode, newVNode, container, anchor) {
            if (oldVNode == null) {
                newVNode.el = hostCreateComment(newVNode.children || '');
                hostInsert(newVNode.el, container, anchor);
            }
            else {
                newVNode.el = oldVNode.el;
            }
        }
        function processFragment(oldVNode, newVNode, container, anchor) {
            if (oldVNode == null) {
                mountChildren(__spreadArray([], __read(newVNode.children), false), container, anchor);
            }
            else {
                patchChildren(oldVNode, newVNode, container, anchor);
            }
        }
        function processElement(oldVNode, newVNode, container, anchor) {
            if (oldVNode == null) {
                mountElement(newVNode, container, anchor);
            }
            else {
                patchElement(oldVNode, newVNode);
            }
        }
        function patchElement(oldVNode, newVNode) {
            var el = (newVNode.el = oldVNode.el);
            var oldProps = oldVNode.props || {};
            var newProps = newVNode.props || {};
            patchChildren(oldVNode, newVNode, el, null);
            patchProps(el, newVNode, oldProps, newProps);
        }
        function patchChildren(oldVNode, newVNode, container, anchor) {
            var c1 = oldVNode === null || oldVNode === void 0 ? void 0 : oldVNode.children;
            var c2 = newVNode === null || newVNode === void 0 ? void 0 : newVNode.children;
            var prevShapeFlag = (oldVNode === null || oldVNode === void 0 ? void 0 : oldVNode.shapeFlag) || 0;
            var shapeFlag = newVNode.shapeFlag;
            // 子节点有三种情况 文本节点、多节点、无子节点
            if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
                // 新Node的子节点是文本
                if (prevShapeFlag & prevShapeFlag.ARRAY_CHILDREN) ;
                if (c2 !== c1) {
                    hostSetElementText(container, c2);
                }
            }
            else {
                // 新Node的子节点是多节点 或 无子节点
                if (prevShapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) ;
                else {
                    // 旧Node的子节点是文本节点 或 无子节点
                    if (prevShapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
                        // 旧Node的子节点是文本节点
                        hostSetElementText(container, '');
                    } /* else {
                      // 旧Node 无子节点 什么都不做
                    } */
                    if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                        mountChildren(c2, container, anchor);
                    } /* else {
                      // 新Node 无子节点 什么都不做
                    } */
                }
            }
        }
        function patchProps(el, vnode, oldProps, newProps) {
            if (oldProps !== newProps) {
                for (var key in newProps) {
                    var prev = oldProps[key];
                    var next = newProps[key];
                    if (next !== prev) {
                        hostPatchProp(el, key, prev, next);
                    }
                }
            }
            if (oldProps) {
                for (var key in oldProps) {
                    if (!(key in newProps)) {
                        hostPatchProp(el, key, oldProps[key], null);
                    }
                }
            }
        }
        function mountElement(vnode, container, anchor) {
            var type = vnode.type, shapeFlag = vnode.shapeFlag, props = vnode.props;
            // 1. 创建元素
            var el = (vnode.el = hostCreateElement(type));
            if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
                // 2. 设置文本
                hostSetElementText(el, vnode.children);
            }
            else if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                mountChildren(vnode.children, el, anchor);
            }
            // 3. 设置props
            if (props) {
                for (var key in props) {
                    hostPatchProp(el, key, null, props[key]);
                }
            }
            // 4. 插入
            hostInsert(el, container, anchor);
        }
        function mountChildren(children, container, anchor) {
            children.forEach(function (child, index) {
                if (!isVNode(child)) {
                    children[index] = createVNode(Text, null, String(child));
                }
                patch(null, children[index], container, anchor);
            });
        }
    }

    var nodeOps = {
        insert: function (child, parent, anchor) {
            parent.insertBefore(child, anchor || null);
        },
        createElement: function (tag) {
            var el = document.createElement(tag);
            return el;
        },
        setElementText: function (el, text) {
            el.textContent = text;
        },
        remove: function (child) {
            var parent = child.parentNode;
            parent === null || parent === void 0 ? void 0 : parent.removeChild(child);
        },
        createText: function (text) { return document.createTextNode(text); },
        setText: function (node, text) { return (node.nodeValue = text); },
        createComment: function (text) { return document.createComment(text); }
    };

    function patchClass(el, value) {
        if (value === null) {
            el.removeAttribute('class');
        }
        else {
            el.className = value;
        }
    }

    function patchStyle(el, prev, next) {
        var style = el.style;
        var isCssString = isString(next);
        if (next && !isCssString) {
            for (var key in next) {
                // 设置新样式
                setStyle(style, key, next[key]);
            }
            // TODO 清理旧样式
        }
    }
    function setStyle(style, name, val) {
        style[name] = val;
    }

    function patchDOMProp(el, key, value) {
        try {
            el[key] = value;
        }
        catch (e) { }
    }

    function patchAttr(el, key, value) {
        if (value == null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, value);
        }
    }

    function patchEvent(el, rawName, prevValue, nextValue) {
        var invokers = el._vei || (el._vei = {});
        var existingInvoker = invokers[rawName];
        if (nextValue && existingInvoker) {
            existingInvoker.value = nextValue;
        }
        else {
            var name_1 = rawName.slice(2).toLowerCase();
            if (nextValue) {
                var invoker = (invokers[rawName] = createInvoker(nextValue));
                el.addEventListener(name_1, invoker);
            }
            else if (existingInvoker) {
                el.removeEventListener(name_1, existingInvoker);
                invokers[rawName] = undefined;
            }
        }
    }
    function createInvoker(initialVal) {
        var invoker = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (_a = invoker.value) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([invoker], __read(args), false));
        };
        invoker.value = initialVal;
        return invoker;
    }

    var patchProp = function (el, key, prevValue, nextValue) {
        if (key === 'class') {
            patchClass(el, nextValue);
        }
        else if (key === 'style') {
            patchStyle(el, prevValue, nextValue);
        }
        else if (isOn(key)) {
            patchEvent(el, key, prevValue, nextValue);
        }
        else if (shouldSetAsProp(el, key)) {
            // 通过 DOM Properties 指定
            patchDOMProp(el, key, nextValue);
        }
        else {
            patchAttr(el, key, nextValue);
        }
    };
    /**
     * 判断指定元素的指定属性是否可以通过 DOM Properties 指定
     * 从源码中copy过来， 了解即可不用背
     */
    function shouldSetAsProp(el, key) {
        // 各种边缘情况处理
        if (['spellcheck', 'draggable', 'translate'].includes(key)) {
            return false;
        }
        // #1787, #2840 表单元素的表单属性是只读的，必须设置为属性 attribute
        if (key === 'form') {
            return false;
        }
        // #1526 <input list> 必须设置为属性 attribute
        if (key === 'list' && el.tagName === 'INPUT') {
            return false;
        }
        // #2766 <textarea type> 必须设置为属性 attribute
        if (key === 'type' && el.tagName === 'TEXTAREA') {
            return false;
        }
        return key in el;
    }

    var renderer;
    var rendererOptions = Object.assign({ patchProp: patchProp }, nodeOps);
    // 这里是一种设计模式 叫**依赖注入**，通过参数的形式注入依赖
    function render() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // 缓存renderer实例
        renderer !== null && renderer !== void 0 ? renderer : (renderer = createRenderer(rendererOptions));
        return renderer.render.apply(renderer, __spreadArray([], __read(args), false));
    }

    exports.ComputedRefImpl = ComputedRefImpl;
    exports.Fragment = Fragment;
    exports.ReactiveEffect = ReactiveEffect;
    exports.Text = Text;
    exports.computed = computed;
    exports.createElementVNode = createVNode;
    exports.createRenderer = createRenderer;
    exports.createVNode = createVNode;
    exports.effect = effect;
    exports.h = h;
    exports.isObject = isObject;
    exports.isOn = isOn;
    exports.isReactive = isReactive;
    exports.isSameVNodeType = isSameVNodeType;
    exports.isString = isString;
    exports.isVNode = isVNode;
    exports.normalizeChildren = normalizeChildren;
    exports.queuePostFlushCb = queuePostFlushCb;
    exports.reactive = reactive;
    exports.reactiveMap = reactiveMap;
    exports.ref = ref;
    exports.render = render;
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
