export function tokenizer(input: string) {
    const tokens: any[] = [];
    // ...
    return tokens;
}

export function parse(tokens: any[]): any {
    const ast = {
        type: 'Program',
        body: []
    }
    // ...
    return ast;
}

export function traverser(ast: any, visitor: any) {
    // ...
    return ast;
}

export function codeGenerator(newAst: any): string {
    let output = '';
    // ...
    return output;
}