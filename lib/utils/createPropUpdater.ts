import StyleSheet from '../modules/StyleSheet/StyleSheet';

import { getNSEventHandlerName, isNSReactEventHandler} from './reactEventToNSEventHandlerName';
import getUpdateInstructions from './getUpdateInstructions';

export const functionUpdater = {
  shouldUseUpdater: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      return isNSReactEventHandler(propKey);
  },
  onPropCreate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const eventName = getNSEventHandlerName(propKey)
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

export const styleUpdater = {
  shouldUseUpdater: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      return propKey === 'style';
  },
  onPropCreate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const newStyleProp = StyleSheet.nomalizeStyleProp(newProps[propKey]);
      instance.set('prevStyleProp', newStyleProp);
      Object.keys(newStyleProp).forEach((styleKey)=>{
          instance.set(styleKey, newStyleProp[styleKey]);
      })
  },
  onPropUpdate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const oldStyleProp = instance.get('prevStyleProp');
      const newStyleProp = StyleSheet.nomalizeStyleProp(newProps[propKey]);
      instance.set('prevStyleProp', newStyleProp);

      const styleToUpdateInstructions = getUpdateInstructions(oldStyleProp, newStyleProp);

      styleToUpdateInstructions.propsToCreate.forEach((stylepropKey) => {
          instance.set(stylepropKey, newStyleProp[stylepropKey]);
      })

      styleToUpdateInstructions.propsToUpdate.forEach((stylepropKey) => {
          instance.set(stylepropKey, newStyleProp[stylepropKey]);
      })

      styleToUpdateInstructions.propsToRemove.forEach((stylepropKey) => {
          instance.set(stylepropKey, undefined);
      })
  },
  onPropRemove: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const styleProp = StyleSheet.nomalizeStyleProp(oldProps[propKey]);
      instance.set('prevStyleProp', undefined);
      Object.keys(styleProp).forEach((styleKey)=>{
          instance.set(styleKey, undefined);
      })
  },
};

export const defaultUpdater = {
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

export enum PROP_LIFECYCLE {
  ON_CREATE = 'onPropCreate',
  ON_UPDATE = 'onPropUpdate',
  ON_REMOVE = 'onPropRemove',
}

function createUpdater(updateLifecycleHook: PROP_LIFECYCLE, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
  return (propKey) => {
      if( propKey === 'children'){ return; }

      for (let propUpdater of [styleUpdater, functionUpdater, defaultUpdater]) {
          const shouldUseUpdater = propUpdater.shouldUseUpdater(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
          
          if (shouldUseUpdater) {
              const updateProp = propUpdater[updateLifecycleHook];
              return updateProp(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
          }
      }
  }
} 
export default createUpdater;