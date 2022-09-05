/**
 * 1. string --> tokens
 * 2. tokens --> ast
 * 3. ast  --> newAst
 * 4. newAst --> code
 * // Literal Identifier Statement Expression 
 */
 import { tokenizer, parse, traverser, codeGenerator } from './ast';
 
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
 const newAst = {
     type: 'Program',
     body: []
 }
 ast._context = newAst.body;
 traverser(ast, {
     CallExpression: {
         entry(node: any, parent: any){
             // ...
         }
     },
     NumberLiteral: {
         entry(node: any, parent: any) {
            // ... 同上
         }
     }
 }/* visiter */, );
 
 // 4. newAst --> code
 // add(2, substract(4, 2));
 const output = codeGenerator(newAst);
 console.log('output', output);