function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(
        child => typeof child === 'object' ? child : createTextElement(child),
      )
    }
  }
}

function createTextElement(value) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: value,
      children: [],
    }
  }
}

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ?
  document.createTextNode('') :
  document.createElement(fiber.type);
  updateDom(fiber.dom, {}, fiber.props);
  return dom;
}

const isEvent = key => key.startsWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps, nextProps) {
  // remove old events or changed event
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key))
    .forEach(key => {
      dom.removeEventListener(
        key.toLowerCase().substring(2),
        prevProps[key],
      );
    });
  // remover old props
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(key => dom[key] = '');
  // set new or changed prop
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(key => dom[key] = nextProps[key])

  // add new event orchanged props
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(key => {
      dom.addEventListener(
        key.toLowerCase().substring(2),
        nextProps[key],
      );
    });
}

function commitRoot () {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}
function commitWork(fiber) {
  if(!fiber) return;
  const domParent = fiber.dom.parent;
  if(!fiber.effectTag == 'REPLACEMENT' && fiber.dom) {
    domParent.appendChild(fiber.dom)
  } else if(fiber.effectTag == 'UPDATE' && fiber.dom) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if(fiber.effectTag == 'DELETION' && fiber.dom) {
    domParent.removeChild(fiber.dom);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot
  }
  deletions = [];
  nextUnitOfWork = wipRoot;
}

let currentRoot = null;
let wipRoot = null;
let deletions = null;
let nextUnitOfWork = null;

function workLoop(deadline) {
  let shouldYield = false;
  while(nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeReming() < 1
  }
  if(!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if(!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
  if(fiber.child) {
    return fiber.child
  }
  let nextFiber = fiber.sibling;
  while(nextFiber) {
    if(nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }
}
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let oldFiber = wipFiber.alternate?.child;
  while(index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    const sameType = oldFiber && element && element.type == oldFiber.type;

    if(sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    if(!sameType && element) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT',
      }
    }
    if(oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION"
      deletions.push(oldFiber)
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }
    if(index === 0) {
      wipFiber.child = newFiber
    } else if(element) {
      prevSibling.sibling = newFiber
    }
    prevSibling = newFiber
    index++
  }
}


const Didact = {
  createElement,
  render,
}

export default Didact;
