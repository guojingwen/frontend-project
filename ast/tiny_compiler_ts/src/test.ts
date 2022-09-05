/**
 * 1. string --> tokens
 * 2. tokens --> ast
 * 3. ast  --> newAst
 * 4. newAst --> code
 * // Literal Identifier Statement Expression 
 */
import { tokenizer, parse, traverser, codeGenerator } from './ast';
import { NewAst, NewAstNode, Visiter } from './ast';

const input = `(add 2 (substract 4 2))`;
// 1. string --> tokens
/* [
    {type: 'paren', value: '('},
    {type: 'name', value: 'add'},
    {type: 'number', value: '2'},
    {type: 'paren', value: '('},
    {type: 'name', value: 'substract'},
    {type: 'number', value: '4'},
    {type: 'number', value: '2'},
    {type: 'paren', value: ')'},
    {type: 'paren', value: ')'},
] */
const tokens = tokenizer(input);
// console.log('1.', tokens);

// 2. tokens --> ast
/* {
    type: 'Program',
    body: [
        {
            type: 'CallExpression',
            name: 'add',
            params: [
                {type: 'NumberLiteral', value: '2'},
                {
                    type: 'CallExpression',
                    name: 'substract',
                    params: [
                        {type: 'NumberLiteral', value: '4'},
                        {type: 'NumberLiteral', value: '2'},
                    ]
                }
            ]
        }
    ]
} */
const ast = parse(tokens);
// console.log(ast.body[0].params![1].params);

// 3. ast -> newAst
/* var myNewAst = {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'add',
                },
                arguments:[
                    {type: 'NumberLiteral', value: '2'},
                    {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'substract',
                        },
                        arguments: [
                            {type: 'NumberLiteral', value: '4'},
                            {type: 'NumberLiteral', value: '2'},
                        ]
                    }
                ]
            }
        }
    ]
} */
const newAst: NewAst = {
    type: 'Program',
    body: []
}
ast._context = newAst.body;
traverser(ast, {
    CallExpression: {
        entry(node, parent){
            let expression: NewAstNode = {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: node.name!,
                },
                arguments: []
            }
            node._context = expression.arguments;
            if(parent.type !== 'CallExpression') {
                expression = {
                    type: 'ExpressionStatement',
                    expression,
                }
            }
            parent._context?.push(expression);
        }
    },
    NumberLiteral: {
        entry(node, parent) {
            parent._context?.push(node);
        }
    }
} as Visiter/* visiter */, );
console.log(newAst.body[0].expression?.arguments![1])

// 4. newAst --> code
// add(2, substract(4, 2));
const output = codeGenerator(newAst);
console.log('output', output);