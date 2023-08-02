function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
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

	fiber.dom = dom;
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
	deletions.forEach(commitWork);
	commitWork(wipRoot.child);
	currentRoot = wipRoot;
	wipRoot = null;
}

function commitWork(fiber) {
	if (!fiber) return;
	let parentFiber = fiber.parent;
	while(!parentFiber.dom) {
		parentFiber = parentFiber.parent;
	}
	const domParent = parentFiber.dom;
	if (fiber.effectTag === 'UPDATE' && fiber.dom) {
		updateDom(fiber.dom, fiber.alternate.props, fiber.props);
	} else if(fiber.effectTag === 'PLACEMENT' && fiber.dom) {
		domParent.appendChild(fiber.dom);
	} else if(fiber.effectTag === 'DELETION' && fiber.dom) {
		commitDeletion(fiber, domParent);
		// domParent.removeChild(fiber.dom);
	}
	commitWork(fiber.child);
	commitWork(fiber.sibling);
}

function commitDeletion(fiber, domParent) {
	if(fiber.dom) {
		domParent.removeChild(fiber.dom);
	} else {
		commitDeletion(fiber.child, domParent);
	}
}

function render(element, container) {
	wipRoot = {
		dom: container,
		props: {
      children: [element],
    },
		alternate: currentRoot,
	};
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
		commitRoot();
	}
	requestIdleCallback(workLoop);
}
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
	const isFunComp = fiber.type instanceof Function;
	if(isFunComp) {
		updateFuncComp(fiber)
	} else {
		updateHostComponent(fiber);
	}

	if (fiber.child) return fiber.child;
	let nextFiber = fiber;
	while(nextFiber) {
		if(nextFiber.sibling) return nextFiber.sibling;
		nextFiber = nextFiber.parent;
	}
}

function updateHostComponent (fiber) {
	if(!fiber.dom) {
		fiber.dom = createDom(fiber);
	}
	const elements = fiber.props.children;
	reconcileChildren(elements, fiber);
}

let hookIndex = null;
let wipFiber = null;
function updateFuncComp (fiber) {
	wipFiber = fiber;
	hookIndex = 0;
	wipFiber.hooks = [];
	const elements = [fiber.type(fiber.props)];
	reconcileChildren(elements, fiber);
}

function useState(initial) {
	const oldHook = wipFiber.alternate?.hooks?.[hookIndex];
	const hook = {
		state: oldHook ? oldHook.state : initial,
		queue: [],
	}
	oldHook?.queue.forEach((action) => {
		hook.state = action(hook.state);
	})
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
	return [hook.state, setState];
}

function reconcileChildren(elements, wipFiber) {
	let index = 0;
	let oldFiber = wipFiber.alternate?.child;
	let prevSibling = null;
	while(index < elements.length || oldFiber) {
		let newFiber = null;
		const element = elements[index];
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
			wipFiber.child = newFiber;
		} else if (element) {
			prevSibling.sibling = newFiber
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