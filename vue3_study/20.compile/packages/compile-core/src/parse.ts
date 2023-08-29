import { ElementTypes, NodeTypes } from './ast'

export function baseParse(content: string) {
  const context = createParserContent(content)
  const children = parseChildren(context, [])
  console.log(children)
  return {}
}

function createParserContent(content): ParserContext {
  return {
    source: content
  }
}
export interface ParserContext {
  source: string
}
const enum TagType {
  Start,
  End
}
function parseChildren(context: ParserContext, ancestors) {
  const nodes: any[] = []
  while (!isEnd(context, ancestors)) {
    const s = context.source
    let node
    if (s.startsWith('{{')) {
      // TODO
    } else if (s[0] === '<') {
      if (/[a-z]/i.test(s[1])) {
        node = parseElement(context, ancestors)
      }
    }
    if (!node) {
      node = parseText(context)
    }
    nodes.push(node)
  }
  return nodes
}

function parseElement(context: ParserContext, ancestors) {
  const element = parseTag(context, TagType.Start)
  ancestors.push(element)
  const children = parseChildren(context, ancestors)

  ancestors.pop()

  element.children = children

  if (context.source.startsWith(element.tag)) {
    parseTag(context, TagType.End)
  }
  return element
}
function parseTag(context: ParserContext, type: TagType) {
  const match: any = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  const tag = match[1]

  advanceBy(context, match[0].length)

  let isSelfCloseing = context.source.startsWith('/>')
  advanceBy(context, isSelfCloseing ? 2 : 1)

  return {
    type: NodeTypes.ELEMENT,
    tag,
    TagType: ElementTypes.ELEMENT,
    children: [] as any[],
    props: []
  }
}
function parseText(context: ParserContext) {
  const endTokens = ['<', '{{']
  let endIndex = context.source.length
  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i], 1)
    if (index !== -1 && endIndex > index) {
      endIndex = index
      break
    }
  }
  const content = parseTextData(context, endIndex)
  return {
    type: NodeTypes.TEXT,
    content
  }
}

function parseTextData(context: ParserContext, length: number) {
  const rawText = context.source.slice(0, length)

  advanceBy(context, length)
  return rawText
}

function isEnd(context: ParserContext, ancestors) {
  const s = context.source
  if (s.startsWith('</')) {
    for (let i = ancestors.length - 1; i >= 0; --i) {
      if (startsWithEndTagOpen(s, ancestors[i].tag)) {
        return true
      }
    }
  }

  return !s
}
/**
 * 判断当前是否为《标签结束的开始》。比如 </div> 就是 div 标签结束的开始
 * @param source 模板。例如：</div>
 * @param tag 标签。例如：div
 * @returns
 */
function startsWithEndTagOpen(source: string, tag: string): boolean {
  return source.startsWith('</')
  /* return (
		source.startsWith('</') &&
		source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() &&
		/[\t\r\n\f />]/.test(source[2 + tag.length] || '>')
	) */
}
function advanceBy(context: ParserContext, numberOfCharacters: number) {
  const { source } = context
  context.source = source.slice(numberOfCharacters)
}
