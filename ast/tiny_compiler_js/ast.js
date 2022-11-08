function tokenizer (input) {
    const tokens = [];
    let current = 0;
    let char = input[current];
    while(current < input.length) {
        if(char === '(') {
            tokens.push({ type: 'paren', value: '('});
            char = input[++current];
            continue;
        }
        if(char === ')') {
            tokens.push({ type: 'paren', value: ')'});
            char = input[++current];
            continue;
        }
        const WHITESPACE = /\s/;
        if(WHITESPACE.test(char)) {
            char = input[++current];
            continue;
        }
        const LITERALS = /[a-z]/i;
        if(LITERALS.test(char)) {
            let value = '';
            while(LITERALS.test(char)) {
                value+= char;
                char = input[++current];
            }
            tokens.push({ type: 'name', value });
            continue;
        }
        const NUMBERS = /\d/;
        if(NUMBERS.test(char)) {
            let value = '';
            while(NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'number', value });
            continue;
        }
        throw new Error('I donnot know this charactor');
    }
    return tokens;
}
function parse(tokens) {
    let current = 0;
    const ast = {
        type: 'Program',
        body: []
    };
    while(current < tokens.length) {
        ast.body.push(walk());
    }
    return ast;
    function walk () {
        let token = tokens[current];
        if(token.type === 'paren' && token.value === '(') {
            token = tokens[++current];
            const node = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            }
            token = tokens[++current];
            while(!(token.type === 'paren' && token.value === ')')) {
                node.params.push(walk());
                token = tokens[current];
                continue;
            }
            current++;
            return node;
        }
        if(token.type === 'number') {
            current++;
            return {
                type: 'NumberLiteral',
                value: token.value,
            }
        }
        throw new TypeError(token.name);
    }
}
function traverser(ast, visitor) {
    return traverserNode(ast, null);
    function traverserArray(array, parent){
        array.forEach(child => {
            traverserNode(child, parent);
        })
    }
    function traverserNode(node, parent) {
        const methods = visitor[node.type];
        methods?.enter?.(node, parent);
        switch(node.type) {
            case 'Program':
                traverserArray(node.body, node);
                break;
            case 'CallExpression':
                traverserArray(node.params, node);
                break;
            case 'NumberLiteral':
                break;
            default:
                throw new TypeError(node.type);

        }
        methods?.exit?.(node, parent);
    }
}
function codeGenerator(ast) {
    let output = '';
    walk(ast);
    return output;
    function walk(node) {
        if(node.type === 'Program') {
          output += node.body.map(child => walk(child)).join('\n');
          return;
        }
        if(node.type === 'ExpressionStatement') {
          return `${walk(node.expression)};`;
        }
        if(node.type === 'CallExpression') {
          return `${node.callee.name}(${node.arguments.map(walk).join(', ')})`;
        }
        if(node.type === 'NumberLiteral') {
          return node.value; 
        }
        return new TypeError(node.type);
    }
}

module.exports = {
    tokenizer,
    parse,
    traverser,
    codeGenerator
}
