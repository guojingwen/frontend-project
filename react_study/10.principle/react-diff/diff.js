var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * react diff
 * 1. abcd -> acdb
 * 2. abcd -> dabc
 */
export function diffChildren(newStr, oldStr) {
    // 第一轮循环 找出头部无变更的元素
    var lastPlaceIndex = 0;
    var result = [];
    for (var i = 0; i < newStr.length; i++) {
        if (newStr[i] && oldStr[i] && newStr[i] === oldStr[i]) {
            lastPlaceIndex = i + 1;
        }
        else {
            break;
        }
    }
    if (lastPlaceIndex === newStr.length &&
        lastPlaceIndex === oldStr.length) {
        result.push("第一轮遍历结束，全部节点都可以复用");
        return result;
    }
    if (lastPlaceIndex === oldStr.length) {
        result.push("第一轮遍历结束, 新children有剩余");
        result.push("\u5C06\u5269\u4F59\u7684\u65B0\u8282\u70B9".concat(newStr.slice(lastPlaceIndex), "\u63D2\u5165\u5C3E\u90E8"));
        return result;
    }
    if (lastPlaceIndex === newStr.length) {
        result.push("第一轮遍历结束, 旧children有剩余");
        result.push("\u5C06\u5269\u4F59\u7684\u65B0\u8282\u70B9".concat(oldStr.slice(lastPlaceIndex), "\u5220\u9664"));
        return result;
    }
    result.push("\u7B2C\u4E00\u8F6E\u904D\u5386\u7ED3\u675F\u65B0\u65E7children\u90FD\u6709\u5269\u4F59\u7684\u60C5\u51B5");
    // 第二轮循环
    var restOfOld = [...oldStr.slice(lastPlaceIndex)]; 
    var _a = restOfOld.reduce(function (_a, item, index) {
        var map1 = _a[0], map2 = _a[1];
        map1[item] = index + lastPlaceIndex;
        var map2Index = index + lastPlaceIndex + '';
        map2[map2Index] = true;
        return [map1, map2];
    }, [{}, {}]), map = _a[0], deletionsMap = _a[1];
    var restOfNew = [...newStr.slice(lastPlaceIndex)];
    for (var j = 0; j < restOfNew.length; j++) {
        var oldIndex = map[restOfNew[j]];
        if (oldIndex !== undefined) {
            deletionsMap[oldIndex] = false;
        }
        if (oldIndex === undefined) {
            result.push("\u5C06\u65B0\u5143\u7D20".concat(restOfNew[j], "\u63D2\u5165\u5230\u5C3E\u90E8"));
            lastPlaceIndex = Math.max(oldStr.length, lastPlaceIndex) + 1;
        }
        else if (oldIndex > lastPlaceIndex) {
            lastPlaceIndex = oldIndex;
        }
        else if (oldIndex < lastPlaceIndex) {
            result.push("\u5C06".concat(restOfNew[j], "\u79FB\u52A8\u5230\u5C3E\u90E8"));
        }
    }
    Object.keys(deletionsMap)
        .filter(function (index) { return deletionsMap[index]; })
        .forEach(function (index) {
        console.log("\u5220\u9664".concat(oldStr[index]));
        result.push("\u5220\u9664".concat(oldStr[index]));
    });
    return result;
}
