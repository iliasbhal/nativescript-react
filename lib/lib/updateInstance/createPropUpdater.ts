import eventHandlerUpdater from './eventHandlerUpdater';
import stylePropUpdater from './stylePropUpdater';
import defaultPropUpdater from './defaultPropUpdater';

export enum PROP_LIFECYCLE {
  ON_CREATE = 'onPropCreate',
  ON_UPDATE = 'onPropUpdate',
  ON_REMOVE = 'onPropRemove',
}

const updaters = [stylePropUpdater, eventHandlerUpdater, defaultPropUpdater];

function createUpdater(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    return (updateLifecycleHook: PROP_LIFECYCLE) => (propKey) => {
      if( propKey === 'children'){ return; }

      for (let propUpdater of updaters) {
          const shouldUseUpdater = propUpdater.shouldUseUpdater(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
          const updateProp = propUpdater[updateLifecycleHook];

          if (shouldUseUpdater && updateProp) {
              updateProp(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
              return;
          }
      }
  }
}

export default createUpdater;