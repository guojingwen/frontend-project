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
        document.createTextNode(''):
        document.createElement(fiber.type);

    updateDom(dom, {}, fiber.props);
    return dom;
}

const isEvent = key => key.startsWith('on');
const isProperty = key => key !== 'children' && !isEvent(key);
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);
function updateDom(dom, prevProps, nextProps) {
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
  /**
   * mutation前 
   *  变量、状态重置工作
   *  处理dom渲染 删除autofocus blur
   *  getSnapShotBeforeUpdate useEffect
   */
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  /**
   * mutation 操作dom
   * 删除dom willunMount  useEffect
   * ref处理
   */
  if(!fiber) return;
  // const domParent = fiber.parent.dom;
  let parentFiber = fiber.parent;
  while(!parentFiber.dom) {
    parentFiber = parentFiber.parent
  }
  const domParent = parentFiber.dom;
  if(fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    domParent.appendChild(fiber.dom);
  } else if(fiber.effectTag === 'UPDATE' && fiber.dom) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if(fiber.effectTag === 'DELETION') {
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber, domParent)
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
  /**
   * layout
   * useEffect\ DidMount DidUpdate
   */
}

function commitDeletion(fiber, domParent) {
  if(fiber.dom) {
    domParent.removeChild(fiber);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
}
//--------------------- render阶段----
let currentRoot = null;
let wipRoot = null;
let nextUnitOfWork = null;
let deletions = null;

function workLoop(deadline) { // beforeWork 返回下一个工作单元
    let shouldYield = false;
    while(nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        shouldYield = deadline.timeRemaining() < 1;
    }
    if(!nextUnitOfWork && wipRoot) {
        commitRoot();
    }
    requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function performUnitOfWork (fiber) { // complateWork  处理tag 处理props
  const isFunComp = fiber.type instanceof Function;
  if(isFunComp) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber)
  }
  if (fiber.child) return fiber.child
  let nextFiber = fiber;
  while(nextFiber) {
    if(nextFiber.sibling) return nextFiber.sibling;
    nextFiber = nextFiber.parent;
  }
}

let wipFiber = null;
let hookIndex = null;
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
function useState(initial) {
  let oldHook = wipFiber.alternate?.hooks?.[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }
  oldHook?.queue?.forEach(action => {
    hook.state = action(hook.state);
  });
  
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot,
    }
    nextUnitOfWork = wipRoot;
    deletions = [];
  }
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState]
}


function updateHostComponent(fiber) {
  if(!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let prevSibling = null;
  let oldFiber = wipFiber.alternate?.child;
  while(index < elements.length || oldFiber) {
    const element = elements[index];
    const sameType = element && oldFiber && oldFiber.type === element.type;
    let newFiber = null;
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
        effectTag: 'PLACEMENT'
      }
    }
    if(!sameType && oldFiber) {
      oldFiber.effectTag = 'DELETION';
      deletions.push(oldFiber);
    }
    oldFiber = oldFiber?.sibling;
    if(index === 0) {
      wipFiber.child = newFiber
    } else if(element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
}

const Didact = {
    createElement,
    render,
    useState,
}

export default Didact;
