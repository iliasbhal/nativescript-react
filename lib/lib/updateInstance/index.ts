import getUpdateInstructions from './lib/getPropUpdateDiff';
import createPropUpdater, { PROP_LIFECYCLE } from './createPropUpdater';

export default function updateInstance(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle): void {
  const propUpdateInstructions = getUpdateInstructions(oldProps, newProps);
  const propUpdater = createPropUpdater(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
  
  propUpdateInstructions.propsToCreate.forEach(propUpdater(PROP_LIFECYCLE.ON_CREATE));
  propUpdateInstructions.propsToUpdate.forEach(propUpdater(PROP_LIFECYCLE.ON_UPDATE));
  propUpdateInstructions.propsToRemove.forEach(propUpdater(PROP_LIFECYCLE.ON_REMOVE));
}