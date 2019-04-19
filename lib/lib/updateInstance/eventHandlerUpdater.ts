import { PropUpdater } from './propUpdaters';
import { getNSEventHandlerName, isNSReactEventHandler} from './lib/reactEventToNSEventHandlerName';

const eventHandlerUpdater: PropUpdater = {
  shouldUseUpdater: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      return isNSReactEventHandler(propKey);
  },
  onPropCreate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const eventName = getNSEventHandlerName(propKey);
      instance.addEventListener(eventName, newProps[propKey], instance)
  },
  onPropUpdate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const eventName = getNSEventHandlerName(propKey)
      instance.removeEventListener(eventName);
      instance.addEventListener(eventName, newProps[propKey], instance);
  },
  onPropRemove: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const eventName = getNSEventHandlerName(propKey)
      instance.removeEventListener(eventName);
  },
};

export default eventHandlerUpdater;