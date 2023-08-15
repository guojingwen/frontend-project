// log.mjs 
// 测试  node log.mjs
import { parse } from "@babel/parser";
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import types from '@babel/types'

const sourceCode = `function add(a, b) {
	console.log(a, b);
	return a+b;
}`;

// https://astexplorer.net/  查看ast树结构
// 对照着 方便编写Visiter对象方法
const ast = parse(sourceCode, {
	sourceType: 'script'
});

// 要修改的节点
// ast.program.body[0].body.body[0] // CallExpression

traverse.default(ast, {
	CallExpression(path, state) {
		debugger
		// path.node // 这个就是真实的ast节点， 可以参考 https://astexplorer.net
		const calleeName = generate.default(path.node.callee).code; // console.log
		if (calleeName === 'console.log') {
				const { line, column } = path.node.loc.start;
				path.node.arguments.unshift(
						types.stringLiteral(`第${line}行第${column}列`)
				);
		}
	}
})
// console.log 参数已经改变
// console.log(ast.program.body[0].body.body[0].expression.arguments);

// ast 代码转目标代码
const { code, map } = generate.default(ast);
console.log(code);
