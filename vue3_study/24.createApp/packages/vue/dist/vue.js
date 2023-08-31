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
    /**
     * 用于将 {{ Interpolation }} 值转换为显示的字符串。
     * @private
     */
    var toDisplayString = function (val) {
        return String(val);
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

    // ElementTypes、NodeTypes 是两个常数枚举，copy自源码
    function baseParse(content) {
        var context = {
            source: content
        };
        var children = parseChildren(context, []);
        return createRoot(children);
    }
    function createRoot(children) {
        return {
            type: 0 /* NodeTypes.ROOT */,
            children: children,
            loc: {}
        };
    }
    function parseChildren(context, ancestors) {
        var nodes = [];
        while (!isEnd(context, ancestors)) {
            var s = context.source;
            var node = void 0;
            if (s.startsWith('{{')) {
                node = parseInterpolation(context);
            }
            else if (s[0] === '<') {
                if (/[a-z]/i.test(s[1])) {
                    node = parseElement(context, ancestors);
                }
            }
            if (!node) {
                node = parseText(context);
            }
            nodes.push(node);
        }
        return nodes;
    }
    // 解析插值表达式 {{ xxx }}
    function parseInterpolation(context) {
        var _a = __read(['{{', '}}'], 2), open = _a[0], close = _a[1];
        advanceBy(context, open.length);
        var closeIndex = context.source.indexOf(close, open.length);
        var preTrimContent = parseTextData(context, closeIndex);
        var content = preTrimContent.trim();
        advanceBy(context, close.length);
        return {
            type: 5 /* NodeTypes.INTERPOLATION */,
            content: {
                type: 4 /* NodeTypes.SIMPLE_EXPRESSION */,
                isStatic: false,
                content: content
            }
        };
    }
    function parseElement(context, ancestors) {
        var element = parseTag(context);
        ancestors.push(element);
        var children = parseChildren(context, ancestors);
        ancestors.pop();
        element.children = children;
        if (startsWithEndTagOpen(context.source, element.tag)) {
            parseTag(context);
        }
        return element;
    }
    function parseTag(context, type) {
        var match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
        var tag = match[1];
        advanceBy(context, match[0].length);
        var isSelfCloseing = context.source.startsWith('/>');
        advanceBy(context, isSelfCloseing ? 2 : 1);
        return {
            type: 1 /* NodeTypes.ELEMENT */,
            tag: tag,
            tagType: 0 /* ElementTypes.ELEMENT */,
            children: [],
            props: []
        };
    }
    function parseText(context) {
        var endTokens = ['<', '{{'];
        var endIndex = context.source.length;
        for (var i = 0; i < endTokens.length; i++) {
            var index = context.source.indexOf(endTokens[i], 1);
            if (index !== -1 && endIndex > index) {
                endIndex = index;
            }
        }
        var content = parseTextData(context, endIndex);
        return {
            type: 2 /* NodeTypes.TEXT */,
            content: content
        };
    }
    function parseTextData(context, length) {
        var rawText = context.source.slice(0, length);
        advanceBy(context, length);
        return rawText;
    }
    function isEnd(context, ancestors) {
        var s = context.source;
        if (s.startsWith('</')) {
            for (var i = ancestors.length - 1; i >= 0; --i) {
                if (startsWithEndTagOpen(s, ancestors[i].tag)) {
                    return true;
                }
            }
        }
        return !s;
    }
    /**
     * 判断当前是否为《标签结束的开始》。比如 </div> 就是 div 标签结束的开始
     * @param source 模板。例如：</div>
     * @param tag 标签。例如：div
     * @returns
     */
    function startsWithEndTagOpen(source, tag) {
        // return source.startsWith('</')
        return (source.startsWith('</') &&
            source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() &&
            /[\t\r\n\f />]/.test(source[2 + tag.length] || '>'));
    }
    function advanceBy(context, numberOfCharacters) {
        var source = context.source;
        context.source = source.slice(numberOfCharacters);
    }

    function isSingleElementRoot(root, child) {
        var children = root.children;
        return children.length === 1 && child.type === 1 /* NodeTypes.ELEMENT */;
    }

    var _a;
    var CREATE_ELEMENT_VNODE = Symbol('createElementVNode');
    var CREATE_VNODE = Symbol('createVNode');
    var TO_DISPLAY_STRING = Symbol('toDisplayString');
    var helperNameMap = (_a = {},
        _a[CREATE_ELEMENT_VNODE] = 'createElementVNode',
        _a[CREATE_VNODE] = 'createVNode',
        _a[TO_DISPLAY_STRING] = 'toDisplayString',
        _a);

    function createTransformContext(root, _a) {
        var _b = _a.nodeTransforms, nodeTransforms = _b === void 0 ? [] : _b;
        // 记录AST --> JS AST 转换过程的状态
        // 会不断访问和修改该对象下的属性
        var context = {
            nodeTransforms: nodeTransforms,
            root: root,
            helpers: new Map(),
            currentNode: root,
            parent: null,
            childIndex: 0,
            helper: function (name) {
                var count = context.helpers.get(name) || 0;
                context.helpers.set(name, count + 1);
                return name;
            }
        };
        return context;
    }
    function transform(root, options) {
        var context = createTransformContext(root, options);
        traverseNode(root, context);
        createRootCodegen(root);
        root.helpers = __spreadArray([], __read(context.helpers.keys()), false);
        // 这些属性本阶段用不到还是注释吧，方面上手
        /* root.components = []
        root.directives = []
        root.imports = []
        root.hoists = []
        root.temps = []
        root.cached = [] */
    }
    function traverseNode(node, context) {
        context.currentNode = node;
        var nodeTransforms = context.nodeTransforms;
        var existFns = [];
        for (var i_1 = 0; i_1 < nodeTransforms.length; i_1++) {
            var onExit = nodeTransforms[i_1](node, context);
            if (onExit) {
                existFns.push(onExit);
            }
        }
        switch (node.type) {
            case 1 /* NodeTypes.ELEMENT */:
            case 0 /* NodeTypes.ROOT */:
                traverseChildren(node, context);
                break;
            // 处理插值表达式 {{}}
            case 5 /* NodeTypes.INTERPOLATION */:
                context.helper(TO_DISPLAY_STRING);
                break;
        }
        context.currentNode = node;
        var i = existFns.length;
        while (i--) {
            existFns[i]();
        }
    }
    function traverseChildren(parent, context) {
        parent.children.forEach(function (node, index) {
            context.parent = parent;
            context.childIndex = index;
            traverseNode(node, context);
        });
    }
    function createRootCodegen(root) {
        var children = root.children;
        // Vue2 仅支持单个根节点
        if (children.length === 1) {
            var child = children[0];
            if (isSingleElementRoot(root, child) && child.codegenNode) {
                root.codegenNode = child.codegenNode;
            }
        }
    }

    function createVNodeCall(context, tag, props, children) {
        if (context) {
            // 往Map对象context.helper中函数标志，在generate阶段使用
            context.helper(CREATE_ELEMENT_VNODE);
        }
        return {
            type: 13 /* NodeTypes.VNODE_CALL */,
            tag: tag,
            props: props,
            children: children
        };
    }
    function createCompoundExpression(children, loc) {
        return {
            type: 8 /* NodeTypes.COMPOUND_EXPRESSION */,
            loc: loc,
            children: children
        };
    }

    var transformElement = function (node, context) {
        return function postTransformElement() {
            node = context.currentNode;
            if (node.type !== 1 /* NodeTypes.ELEMENT */) {
                return;
            }
            var tag = node.tag;
            var vnodeTag = "\"".concat(tag, "\"");
            var vnodeProps = [];
            var vnodeChildren = node.children;
            node.codegenNode = createVNodeCall(context, vnodeTag, vnodeProps, vnodeChildren);
        };
    };

    function isText(node) {
        return [5 /* NodeTypes.INTERPOLATION */, 2 /* NodeTypes.TEXT */].includes(node.type);
    }

    /**
     * 将相邻的文本节点和表达式合并为一个表达式。
     *
     * 例如:
     * <div>hello {{ msg }}</div>
     * 上述模板包含两个节点：
     * 1. hello：TEXT 文本节点
     * 2. {{ msg }}：INTERPOLATION 表达式节点
     * 这两个节点在生成 render 函数时，需要被合并： 'hello' + _toDisplayString(_ctx.msg)
     * 那么在合并时就要多出来这个 + 加号。
     * 例如：
     * children:[
     * 	{ TEXT 文本节点 },
     *  " + ",
     *  { INTERPOLATION 表达式节点 }
     * ]
     */
    var transformText = function (node, context) {
        if ([
            0 /* NodeTypes.ROOT */,
            1 /* NodeTypes.ELEMENT */,
        ].includes(node.type)) {
            return function () {
                var children = node.children;
                var currentContainer;
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (!isText(child)) {
                        continue;
                    }
                    for (var j = i + 1; j < children.length; j++) {
                        var next = children[j];
                        if (!isText(next)) {
                            currentContainer = undefined;
                            break;
                        }
                        if (!currentContainer) {
                            currentContainer = children[i] = createCompoundExpression([child], child.loc);
                        }
                        // 在 当前节点 child 和 下一个节点 next 中间，插入 "+" 号
                        currentContainer.children.push(" + ", next);
                        // 把下一个删除
                        children.splice(j, 1);
                        j--;
                    }
                }
            };
        }
    };

    /**
     * 先按照这个拼接
    const _Vue = Vue
    return function render(_ctx, _cache) {
      with (_ctx) {
        const { createElementVNode: _createElementVNode } = _Vue
        return _createElementVNode(
          "div",
          [],
          ["hello world"]
        )
      }
    }
     */
    var aliasHelper = function (s) { return "".concat(helperNameMap[s], ": _").concat(helperNameMap[s]); };
    function generate(ast) {
        var context = createCodegenContext(ast);
        var push = context.push, newline = context.newline, indent = context.indent, deindent = context.deindent, runtimeGlobalName = context.runtimeGlobalName;
        genFunctionPreamble(context);
        push("function render(_ctx, _cache){");
        indent();
        push("with(_ctx){");
        indent();
        var hasHelpers = ast.helpers.length > 0;
        if (hasHelpers) {
            var varStrs = ast.helpers.map(aliasHelper).join(',');
            push("const { ".concat(varStrs, " } = _").concat(runtimeGlobalName));
        }
        newline();
        push("return ");
        // 还剩 _createElementVNode("div", [], ["hello world"])
        if (ast.codegenNode) {
            genNode(ast.codegenNode, context);
        }
        else {
            push('null');
        }
        deindent();
        push("}");
        deindent();
        push("}");
        console.log(context.code);
        return {
            ast: ast,
            code: context.code
        };
    }
    function createCodegenContext(ast) {
        var context = {
            code: "",
            runtimeGlobalName: 'Vue',
            source: ast.loc.source,
            indentLevel: 0,
            helper: function (key) {
                return "_".concat(helperNameMap[key]);
            },
            push: function (code) {
                context.code += code;
            },
            newline: function () {
                newline(context.indentLevel);
            },
            // 增加锁进+换行
            indent: function () {
                newline(++context.indentLevel);
            },
            // 减少锁进和换行
            deindent: function () {
                newline(--context.indentLevel);
            }
        };
        function newline(n) {
            context.code += "\n" + " ".repeat(n);
        }
        return context;
    }
    function genFunctionPreamble(context) {
        var push = context.push, newline = context.newline, runtimeGlobalName = context.runtimeGlobalName;
        push("const _".concat(runtimeGlobalName, " = ").concat(runtimeGlobalName));
        newline();
        push('return ');
    }
    // 表达式处理  4
    function genExpression(node, context) {
        var content = node.content, isStatic = node.isStatic;
        context.push(isStatic ? JSON.stringify(content) : content, node);
    }
    // {{}} 处理 5
    function genInterpolation(node, context) {
        var push = context.push, helper = context.helper;
        push("".concat(helper(TO_DISPLAY_STRING), "("));
        genNode(node.content, context);
        push(")");
    }
    // 复合表达式处理 8
    function genCompoundExpression(node, context) {
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            if (typeof child === 'string') {
                context.push(child);
            }
            else {
                genNode(child, context);
            }
        }
    }
    function genNode(node, context) {
        switch (node.type) {
            case 13 /* NodeTypes.VNODE_CALL */: // 13
                genVNodeCall(node, context);
                break;
            case 1 /* NodeTypes.ELEMENT */: // 1
                genNode(node.codegenNode, context);
                break;
            case 2 /* NodeTypes.TEXT */: // 2
                genText(node, context);
                break;
            // 复合表达式处理 4
            case 4 /* NodeTypes.SIMPLE_EXPRESSION */:
                genExpression(node, context);
                break;
            // 表达式处理 5
            case 5 /* NodeTypes.INTERPOLATION */:
                genInterpolation(node, context);
                break;
            // {{}} 处理 8
            case 8 /* NodeTypes.COMPOUND_EXPRESSION */:
                genCompoundExpression(node, context);
                break;
        }
    }
    function genVNodeCall(node, context) {
        var push = context.push, helper = context.helper;
        var tag = node.tag, props = node.props, children = node.children, isComponent = node.isComponent;
        var callHelper = isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
        push("".concat(helper(callHelper), "("));
        var args = [tag, props, children].map(function (arg) { return arg || null; });
        genNodeList(args, context);
        push(")");
    }
    function genText(node, context) {
        context.push(JSON.stringify(node.content));
    }
    function genNodeList(nodes, context) {
        var push = context.push;
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (typeof node === 'string') {
                push(node);
            }
            else if (Array.isArray(node)) {
                context.push("[");
                genNodeList(node, context);
                context.push("]");
            }
            else {
                genNode(node, context);
            }
            if (i < nodes.length - 1) {
                push(', ');
            }
        }
    }

    function baseCompile(template, options) {
        if (options === void 0) { options = {}; }
        var ast = baseParse(template);
        transform(ast, Object.assign(options, {
            nodeTransforms: [transformElement, transformText]
        }));
        // console.log(JSON.stringify(ast))
        var code = generate(ast).code;
        return new Function(code)();
    }

    function compile(template, options) {
        return baseCompile(template, options);
    }

    var uid = 0;
    function createComponentInstance(vnode) {
        var type = vnode.type;
        var _a = type.beforeCreate, beforeCreate = _a === void 0 ? null : _a, _b = type.created, created = _b === void 0 ? null : _b, _c = type.beforeMount, beforeMount = _c === void 0 ? null : _c, _d = type.mounted, mounted = _d === void 0 ? null : _d, _e = type.template, template = _e === void 0 ? null : _e, _f = type.data, data = _f === void 0 ? {} : _f;
        var instance = {
            uid: uid++,
            vnode: vnode,
            type: type,
            /**
             * subTree  render函数的返回值
             * 对应要渲染的DOM节点
             **/
            subTree: null,
            effect: null,
            update: null,
            render: null,
            isMounted: false,
            data: data,
            template: template,
            // 生命周期相关
            beforeCreate: beforeCreate,
            created: created,
            beforeMount: beforeMount,
            mounted: mounted
        };
        return instance;
    }
    function finishComponentSetup(instance) {
        if (!instance.render) {
            instance.render = instance.type.render;
        }
        var beforeCreate = instance.beforeCreate, created = instance.created;
        if (beforeCreate) {
            callHook(beforeCreate, null);
        }
        applyOptions(instance);
        if (created) {
            callHook(created, instance.data);
        }
    }
    function setupComponent(instance) {
        var Component = instance.type;
        var setup = Component.setup;
        if (setup) {
            var setupResult = setup();
            if (typeof setupResult === 'function') {
                instance.render = setupResult;
            }
            else if (typeof setupResult === 'object' && setupResult) {
                instance.data = setupResult;
                instance.render = compile(instance.template);
            }
            finishComponentSetup(instance);
        }
        else {
            finishComponentSetup(instance);
        }
    }
    function callHook(hook, proxy) {
        hook.bind(proxy)();
    }
    function applyOptions(instance) {
        var dataOptions = instance.type.data;
        if (dataOptions) {
            var data = dataOptions();
            if (data && typeof data === 'object') {
                instance.data = reactive(data);
            }
        }
    }

    function createAppAPI(render) {
        return function createApp(rootComponent, rootProps) {
            var app = {
                _component: rootComponent,
                _container: null,
                mount: function (rootContainer) {
                    var vnode = createVNode(rootComponent, rootProps);
                    render(vnode, rootContainer);
                }
            };
            return app;
        };
    }

    function createRenderer(options) {
        var _a = options, hostInsert = _a.insert, hostCreateElement = _a.createElement, hostSetElementText = _a.setElementText, hostPatchProp = _a.patchProp, hostRemove = _a.remove, hostCreateText = _a.createText, hostSetText = _a.setText, hostCreateComment = _a.createComment;
        return {
            render: render,
            createApp: createAppAPI(render)
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
            // 标准化组件实例
            setupComponent(instance);
            // 设置组件渲染
            setupRenderEffect(instance, initialVNode, container, anchor);
            // console.log(((window as any)._vnode = initialVNode))
        }
        function setupRenderEffect(instance, initialVNode, container, anchor) {
            var componentUpdateFn = function () {
                if (!instance.isMounted) {
                    var render_1 = instance.render, data = instance.data, beforeMount = instance.beforeMount, mounted = instance.mounted;
                    if (beforeMount) {
                        callHook(beforeMount, instance.data);
                    }
                    var subTree = (instance.subTree = render_1 === null || render_1 === void 0 ? void 0 : render_1.call(data, data));
                    patch(null, subTree, container, anchor);
                    initialVNode.el = subTree.el;
                    instance.isMounted = true;
                    if (mounted) {
                        callHook(mounted, instance.data);
                    }
                }
                // 非首次通过schedule()放入微任务在调用run()
                else {
                    var next = instance.vnode, data = instance.data, render_2 = instance.render, prevTree = instance.subTree;
                    var nextTree = render_2.call(data, data);
                    instance.subTree = nextTree;
                    next.el = nextTree.el;
                    patch(prevTree, nextTree, container, anchor);
                }
            };
            var effect = (instance.effect = new ReactiveEffect(componentUpdateFn, function () { return queuePostFlushCb(update); }));
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
                if (prevShapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                    // 旧Node有多个子节点
                    if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
                        patchKeyedChildren(c1, c2, container, anchor);
                    }
                }
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
        function patchKeyedChildren(oldChildren, newChildren, container, parentAnchor) {
            var i = 0;
            var newChildrenLength = newChildren.length;
            var oldChildrenEnd = oldChildren.length - 1;
            var newChildrenEnd = newChildrenLength - 1;
            var normalizeVNode = function (child) {
                return typeof child === 'object' ? child : createVNode(Text, null, String(child));
            };
            // 1. 自前向后比对
            // (a b) c
            // (a b) d e
            while (i <= oldChildrenEnd && i <= newChildrenEnd) {
                var oldVNode = oldChildren[i];
                var newVNode = normalizeVNode(newChildren[i]);
                if (isSameVNodeType(oldVNode, newVNode)) {
                    patch(oldVNode, newVNode, container, null);
                }
                else {
                    break;
                }
                i++;
            }
            // 2. 自后向前比对
            // a (b c)
            // d e (b c)
            while (i <= oldChildrenEnd && i <= newChildrenEnd) {
                var oldVNode = oldChildren[oldChildrenEnd];
                var newVNode = normalizeVNode(newChildren[newChildrenEnd]);
                if (isSameVNodeType(oldVNode, newVNode)) {
                    patch(oldVNode, newVNode, container, null);
                }
                else {
                    break;
                }
                oldChildrenEnd--;
                newChildrenEnd--;
            }
            // 3. 新节点多于旧节点时的 diff 比对。
            if (i > oldChildrenEnd && i <= newChildrenEnd) {
                var nextPos = newChildrenEnd + 1;
                var anchor = nextPos < newChildrenLength ? newChildren[nextPos].el : parentAnchor;
                while (i <= newChildrenEnd) {
                    patch(null, normalizeVNode(newChildren[i]), container, anchor);
                    i++;
                }
            }
            // 4. 旧节点多于新节点时的 diff 比对。
            else if (i > newChildrenEnd && i <= oldChildrenEnd) {
                while (i <= oldChildrenEnd) {
                    hostRemove(oldChildren[i].el);
                    i++;
                }
            }
            // 5. 乱序的 diff 比对
            /**
             * 举个例子
             * 旧子节点： a     b     c     d     e
             * 新子节点： new-a new-c new-b new-f new-e
             * 0. 初始状态：索引 `i=0` 旧节点结束索引`e1=4` 新节点结束索引`e2=4`
             * 1. 经过场景1 自前到后比对： 索引 `i=1` 旧节点结束索引`e1=4` 新节点结束索引`e2=4`
             * 2. 经过场景2 自后到前比对： 索引 `i=1` 旧节点结束索引`e1=3` 新节点结束索引`e2=3`
             * 3. 新节点和旧节点都存在 跳过场景三和四
             * 4. 进入场景五 剩余元素为
             *    旧子节点： b     c     d
             *    新子节点： new-c new-b new-f
             */
            else {
                // 5.1 创建字典 keyToNewIndexMap {旧子节点索引 => 新子节点索引}
                var oldStartIndex = i;
                var newStartIndex = i;
                var keyToNewIndexMap = new Map();
                for (i = newStartIndex; i <= newChildrenEnd; i++) {
                    var nextChild = normalizeVNode(newChildren[i]);
                    if (nextChild.key != null) {
                        keyToNewIndexMap.set(nextChild.key, i);
                    }
                }
                // console.log(keyToNewIndexMap)
                // 这时 keyToNewIndexMap 值为
                // Map(3) {3 => 1, 2 => 2, 6 => 3}
                // 5.2 循环 oldChildren ，并尝试进行 patch（打补丁）或 unmount（删除）旧节点
                var j = 0;
                // 已经修复的新节点数量, 有三个新节点需要修复，现在都还没修复
                var patched = 0;
                // 新节点待修补的数量 = newChildrenEnd - newChildrenStart + 1
                var toBePatched = newChildrenEnd - newStartIndex + 1;
                // 标记位：节点是否需要移动
                var moved = false;
                // 配合 moved 进行使用，它始终保存当前最大的 index 值
                var maxNewIndexSoFar = 0;
                // map字典 {新子节点索引 => 旧子节点索引}
                // 注意 旧子节点索引不包含已处理的节点
                var newIndexToOldIndexMap = new Array(toBePatched).fill(0);
                for (i = oldStartIndex; i <= oldChildrenEnd; i++) {
                    var prevChild = oldChildren[i];
                    // 如果当前 已经处理的节点数量 > 待处理的节点数量
                    // 那么就说明，所有的节点都已经更新完成
                    // 剩余的旧节点全部删除即可
                    if (patched >= toBePatched) {
                        // 所有的节点都已经更新完成，剩余的旧节点全部删除即可
                        hostRemove(prevChild.el);
                        continue;
                    }
                    // 新节点需要存在的位置，需要根据旧节点来进行寻找（包含已处理的节点。即：new-c 被认为是 1）
                    var newIndex = void 0;
                    if (prevChild.key != null) {
                        // 根据旧节点的 key，从 keyToNewIndexMap 中可以获取到新节点对应的位置
                        newIndex = keyToNewIndexMap.get(prevChild.key);
                    }
                    if (newIndex === undefined) {
                        // 说明该旧子节点不存在， 直接删除
                        hostRemove(prevChild.el);
                        // 这里会删除 `d`
                    }
                    else {
                        // 该子节点在新旧VNode中都存在
                        // 新子节点索引都不包含已计算的元素，即索引从0开始
                        // 旧子节点索引+1 有特殊作用
                        newIndexToOldIndexMap[newIndex - newStartIndex] = i + 1;
                        // maxNewIndexSoFar 会存储当前最大的 newIndex，它应该是一个递增的，如果没有递增，则证明有节点需要移动
                        if (newIndex >= maxNewIndexSoFar) {
                            // 持续递增
                            maxNewIndexSoFar = newIndex;
                        }
                        else {
                            // 没有递增，则需要移动，moved = true
                            moved = true;
                        }
                        // 打补丁
                        patch(prevChild, newChildren[newIndex], container, null);
                        // 自增已处理的节点数量
                        patched++;
                    }
                }
                // 5.2会循环3次 得到的 newIndexToOldIndexMap
                // {  1:2,  0:3,         2:0 } // 依次执行的结果
                // 即  b    c   d被删除   最后一个是初始值
                // moved=true 因为遍历 c 的时候算出来它需要移动位置
                // maxNewIndexSoFar=2  只遍历了 b、c、d 它们在新的VNode中b的索引最大，值为2
                // 5.3 针对移动和挂载的处理
                // 仅当节点需要移动的时候，我们才需要生成最长递增子序列，否则只需要有一个空数组即可
                // increasingNewIndexSequence 最大上升子序列索引，如果元素在该数组中则不需要移动
                var increasingNewIndexSequence = moved
                    ? getSequence(newIndexToOldIndexMap)
                    : [];
                // console.log(increasingNewIndexSequence)
                // 针对当前场景 increasingNewIndexSequence 值为 [2]
                // 也就是说 new-b 元素不需要移动
                // 还剩下 new-c 和 new-f需要处理
                // j >= 0 表示：初始值为 最长递增子序列的最后下标
                // j < 0 表示：《不存在》最长递增子序列。
                j = increasingNewIndexSequence.length - 1;
                // 倒序循环，以便我们可以使用最后修补的节点作为锚点
                // 这里是先处理 new-f 再处理 new-c
                for (i = toBePatched - 1; i >= 0; i--) {
                    // nextIndex（需要更新的新节点下标） = newChildrenStart + i
                    var nextIndex = newStartIndex + i;
                    // 根据 nextIndex 拿到要处理的 新节点
                    var nextChild = newChildren[nextIndex];
                    // 获取锚点（是否超过了最长长度）
                    // parent.insertBefore(child, anchor) 将 child插入到next前面
                    // 如果 anchor为 null 表示插入到parent容器的最下面
                    var anchor = nextIndex + 1 < newChildrenLength
                        ? newChildren[nextIndex + 1].el
                        : parentAnchor;
                    // 如果 newIndexToOldIndexMap 中保存的 value = 0，则表示：新节点没有用对应的旧节点，此时需要挂载新节点
                    if (newIndexToOldIndexMap[i] === 0) {
                        // 挂载新节点
                        patch(null, nextChild, container, anchor);
                    }
                    else if (moved) {
                        /* if (j >= 0 && nextIndex === increasingNewIndexSequence[j]) {
                          // 如果索引在最大上升子序列中，则不需要移动位置
                          j--
                          console.log('不需要移动的元素', nextChild.el)
                        } else {
                          hostInsert(nextChild.el!, container, anchor)
                        } */
                        if (j < 0 || i !== increasingNewIndexSequence[j]) {
                            hostInsert(nextChild.el, container, anchor);
                        }
                        else {
                            j--;
                            // console.log('不需要移动的元素', nextChild.el)
                        }
                    }
                }
            }
            /**
             * 总结 patch过程
             * 旧子节点： a     b     c     d     e
             * 新子节点： new-a new-c new-b new-f new-e
             * 1. 更新 a  为 new-a
             * 2. 更新 e  为 new-e
             * 3. 更新 b  为 new-b
             * 4. 更新 c  为 new-c
             * 5. 删除 d
             * 6. 将 new-f 插入到 new-e 前面
             * 7. new-b 在最大上升子序列中， 不需要移动
             * 8. 将 new-c 插入到 new-b 前面
             */
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
    function getSequence(arr) {
        if (!arr.length)
            return [];
        if (arr.length < 2)
            return [0];
        var preIndexs = arr.slice();
        var i, j, start, end, center;
        var len = arr.length;
        // result存放的是最大上升子序列的下表
        var result = [0];
        for (i = 1; i < len; i++) {
            j = result.at(-1);
            var arrI = arr[i];
            if (arrI === 0)
                continue; // 0表示新增的元素
            var lastIndex = result.at(-1);
            if (arrI > arr[lastIndex]) {
                preIndexs[i] = j;
                result.push(i);
                continue;
            }
            start = 0;
            end = result.length;
            while (start < end) {
                //  >> 右移运算符
                // 等于 Math.floor((u+v)/2);
                // 使用二进制运算可以大幅提高计算效率
                center = (start + end) >> 1;
                if (arrI > arr[result[center]]) {
                    start = center + 1;
                }
                else {
                    end = center;
                }
            }
            if (arrI < arr[result[start]]) {
                if (start > 0) {
                    preIndexs[i] = result[start - 1];
                }
            }
            result[start] = i;
        }
        // console.log(preIndexs);
        end = result.length;
        var temp = result[end - 1];
        while (end--) {
            result[end] = temp;
            temp = preIndexs[temp];
        }
        return result;
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
    function ensureRenderer(rendererOptions) {
        // 缓存renderer实例
        return (renderer !== null && renderer !== void 0 ? renderer : (renderer = createRenderer(rendererOptions)));
    }
    var rendererOptions = Object.assign({ patchProp: patchProp }, nodeOps);
    function render() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (_a = ensureRenderer(rendererOptions)).render.apply(_a, __spreadArray([], __read(args), false));
    }
    var createApp = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var app = (_a = ensureRenderer(rendererOptions)).createApp.apply(_a, __spreadArray([], __read(args), false));
        var mount = app.mount;
        // 对该方法进行重构，标准化 container，在重新触发 mount 进行挂载
        app.mount = function (containerOrSelector) {
            var container = normalizeContainer(containerOrSelector);
            if (!container)
                return;
            mount(container);
        };
        return app;
    };
    function normalizeContainer(container) {
        if (typeof container === 'string') {
            return document.querySelector(container);
        }
        return container;
    }

    exports.ComputedRefImpl = ComputedRefImpl;
    exports.Fragment = Fragment;
    exports.ReactiveEffect = ReactiveEffect;
    exports.Text = Text;
    exports.baseCompile = baseCompile;
    exports.baseParse = baseParse;
    exports.compile = compile;
    exports.computed = computed;
    exports.createApp = createApp;
    exports.createCompoundExpression = createCompoundExpression;
    exports.createElementVNode = createVNode;
    exports.createRenderer = createRenderer;
    exports.createRoot = createRoot;
    exports.createVNode = createVNode;
    exports.createVNodeCall = createVNodeCall;
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
    exports.toDisplayString = toDisplayString;
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
