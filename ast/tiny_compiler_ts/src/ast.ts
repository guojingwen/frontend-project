interface Token {
    type: string;
    value: string;
}
export function tokenizer(input: string) {
    // (add 2 (substract 4 2))
    const tokens: Token[] = [];
    let current = 0;
    while(current < input.length) {
        let char = input[current];
        if(char === '(') {
            tokens.push({type: 'paren', value: char});
            current++;
            continue;
        }
        if(char === ')') {
            tokens.push({type: 'paren', value: char});
            current++;
            continue;
        }

        const LITERALS = /[a-z]/i;
        if(LITERALS.test(char)) {
            let value = '';
            while(LITERALS.test(char)) {
                value+= char;
                char = input[++current];
                continue;
            }
            tokens.push({type: 'name', value});
            continue;
        }

        const SPACE = /\s/;
        if(SPACE.test(char)) {
            current++;
            continue;
        }

        const NUMBERS = /\d/;
        if(NUMBERS.test(char)) {
            let value = '';
            while(NUMBERS.test(char)) {
                value+= char;
                char = input[++current];
                continue;
            }
            tokens.push({type: 'number', value});
            continue;
        }
        throw new Error('I donot know this charactor ' + char);
    }
    return tokens;
}

export interface Ast {
    type: 'Program';
    body: AstNode[];
}
export interface AstNode {
    type: string;
    value?: string;
    name?: string;
    params?: Array<AstNode>;
}
export function parse(tokens: Token[]): Ast{
    const ast: Ast = {
        type: 'Program',
        body: []
    }
    let current = 0;
    while(current < tokens.length) {
        ast.body.push(walk());
    }
    return ast;
    function walk(): AstNode {
        let token = tokens[current];
        if(token.type === 'paren' && token.value === '(') {
            token = tokens[++current];
            let expression: AstNode = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            }
            token = tokens[++current];
            while(!(token.type === 'paren' && token.value === ')')) {
                expression.params!.push(walk());
                token = tokens[current];
            }
            current++;
            return expression;
        }
        if(token.type === 'number') {
            current++;
            return {
                type: 'NumberLiteral',
                value: token.value,
            }
        }
        throw new TypeError(token.type);
    }
}
export interface NewAst {
    type: 'Program';
    body: NewAstNode[];
}
export interface NewAstNode {
    type: string;
    // 1
    value?: string;
    // 2
    name?: string;
    callee?: {
        type: string;
        name: string;
    },
    // 3
    arguments?: Array<NewAstNode>;

    expression?: NewAstNode;
}
export interface Ast {
    _context?: NewAstNode[];
}
export interface AstNode {
    _context?: NewAstNode[];
}
export interface Visiter {
    [key: string]: {
        entry?: (node: AstNode, parent: AstNode | Ast) => void;
        exit?: (node: AstNode, parent: AstNode | Ast) => void;
    }
}
export function traverser(ast: Ast, visitor: Visiter) {
    traverserNode(ast, null);
    return ast;
    function traverserArray(array: AstNode[], parent: AstNode | null) {
        array.forEach(child => traverserNode(child, parent));
    }
    function traverserNode(node: Ast | AstNode, parent: null | AstNode) {
        const methods = visitor[node.type];
        methods?.entry?.(node, parent!);
        switch(node.type) {
            case 'Program': 
                traverserArray((node as Ast).body, node);
                break;
            case 'CallExpression': {
                traverserArray(node.params!, node)
                break;
            }
            case 'NumberLiteral': 
                break;
            default : 
                throw new TypeError(node.type);
        }
        methods?.exit?.(node, parent!);
    }
}

export function codeGenerator(newAst: NewAst): string {
    let output = '';
    newAst.body.forEach(child => {
        output += walk(child);
    })
    return output;
    function walk (node: NewAstNode): string {
        if(node.type === 'ExpressionStatement') {
            return walk(node.expression!) + ';';
        }
        if(node.type === 'CallExpression') {
            return `${node.callee!.name}(${node.arguments!.map(walk).join(', ')})`;
        }
        if(node.type === 'NumberLiteral') {
            return node.value!;
        }
        throw new TypeError(node.type);
    }
}