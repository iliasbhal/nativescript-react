
const reactEventHandlerToNSEventHandler = new Map([
    ['onTap', 'tap'], 
    ['onPan', 'pan']
]);

export const isNSReactEventHandler = (propKey) => {
    return reactEventHandlerToNSEventHandler.has(propKey);
}

export const getNSEventHandlerName = (propKey) => {
    return reactEventHandlerToNSEventHandler.get(propKey);
}