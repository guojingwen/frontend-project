const {tokenizer, parse, traverser, codeGenerator} = require('./ast');
/**
 * 将 '(add 2 (substract 4 2))' 使用ast转换成 'add(2 substract(4 2))'
 * 1. string    -->     转换成tokens    代码的本质就是字符串
 * 2. tokens    -->     ast
 * 3. ast       -->     newAst  访问者模式
 * 4. newAst    -->     string
 */
const input = `(add 2 (substract 4 2))`;
//  1. 解析为令牌
/* [
    { type: 'paren', value: '(' },
    { type: 'name', value: 'add' },
    { type: 'number', value: '2' },
    { type: 'paren', value: '(' },
    { type: 'name', value: 'substract' },
    { type: 'number', value: '4' },
    { type: 'number', value: '2' },
    { type: 'paren', value: ')' },
    { type: 'paren', value: ')' },
] */
const tokens = tokenizer(input);
// console.log(tokens);

// 2. 将tokens解析为ast
/*  {
    type: 'Program',
    body: [
        {
            type: 'CallExpression',
            name: 'add',
            params: [
                { type: 'NumberLiteral', value: '2' },
                {
                    type: 'CallExpression',
                    name: 'substract',
                    params: [
                        { type: 'NumberLiteral', value: '4'  },
                        { type: 'NumberLiteral', value: '2'  },
                    ]
                }
            ]
        }
    ]
} */
const ast = parse(tokens);
// console.log(ast.body[0].params[1].params);

// 3 将ast转换成newAst
/* {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'add'
                },
                arguments: [
                    { type: 'NumberLiteral', value: '2' },
                    {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'substract'
                        },
                        arguments: [
                            { type: 'NumberLiteral', value: '4'  },
                            { type: 'NumberLiteral', value: '2'  },
                        ]
                    }
                ],
            }
        }
    ]
} */
const newAst = {
    type: 'Program',
    body: [],
}
ast._context = newAst.body;
traverser(ast, {
    CallExpression: {
        enter(node, parent) {
            let expression = {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: node.name,
                },
                arguments: [],
            }
            node._context = expression.arguments;
            if(parent.type !== 'CallExpression') {
                expression = {
                    type: 'ExpressionStatement',
                    expression,
                }
            }
            parent._context.push(expression);
        }
    },
    NumberLiteral: {
        enter(node, parent) {
            parent._context.push({
                type: 'NumberLiteral',
                value: node.value,
            })
        }
    },
});
// console.log(newAst.body[0].expression.arguments[1]);
// 4. 生成目标代码
// `add(2, substract(4, 2));`
const output = codeGenerator(newAst);
console.log(output);

