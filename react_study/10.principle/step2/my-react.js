function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(
        child => typeof child === 'object'
        ? child
        : createTextElement(child)
      )
    }
  }
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ?
    document.createTextNode('') :
    document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);
  return dom;
}

const isEvent = key => key.startsWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps = {}, nextProps) {
  // remove old events or changed events of old
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key))
    .forEach(key => {
      const eventType = key.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[key]);
    });
  // remove old props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(key => {
      dom[key] = ''
    });
  // add new props or changed props
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(key => {
      dom[key] = nextProps[key]
    });
  // add new events or changed events 
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(key => {
      const eventType = key.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[key]);
    });
}
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
function commitWork(fiber) {
  if(!fiber) return;
  const domParent = fiber.parent.dom;
  const tag = fiber.effectTag
  if(fiber.dom) {
    if(tag === 'UPDATE') {
      updateDom(fiber.dom, fiber.alternate?.props, fiber.props);
    } else if(tag === 'PLACEMENT') {
      domParent.appendChild(fiber.dom);
    } else if(tag === 'DELETION') {
      domParent.removeChild(fiber.dom);
    }
  }
  
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot,
  }
  nextUnitOfWork = wipRoot;
  deletions = [];
}

let wipRoot = null;
let currentRoot = null;
let nextUnitOfWork = null;
let deletions = null;

function workLoop(deadline) {
  let shouldYield = false;
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if(!nextUnitOfWork && wipRoot) {
    commitRoot()
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  fiber.dom ??= createDom(fiber);
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
  if(fiber.child) return fiber.child;
  let nextFiber = fiber;
  while(nextFiber) {
    if(nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let prevSibling = null;
  let oldFiber = wipFiber.alternate?.child;
  while(index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber;
    const sameType = element && oldFiber && element.type === oldFiber.type;
    if(sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    } else if(element) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    } else if(oldFiber) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }
    oldFiber = oldFiber?.sibling;
    if(index === 0) {
      wipFiber.child = newFiber
    } else if(element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++;
  }
}

const Didact = {
  createElement,
  render,
};

export default Didact;
