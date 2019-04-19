import { PropUpdater } from './propUpdaters';

const defaultUpdater: PropUpdater = {
  shouldUseUpdater: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      return true;
  },
  onPropCreate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      instance.set(propKey, newProps[propKey]);
  },
  onPropUpdate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      instance.set(propKey, newProps[propKey]);
  },
  onPropRemove: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      instance.set(propKey, undefined);
  },
};

export default defaultUpdater;