import StyleSheet from '../../modules/StyleSheet/StyleSheet';
import getPropUpdateDiff from './lib/getPropUpdateDiff';

import { PropUpdater } from './propUpdaters';

const styleUpdater: PropUpdater = {
  shouldUseUpdater: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      return propKey === 'style';
  },
  onPropCreate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
    styleUpdater.onPropUpdate(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle)
  },
  onPropUpdate: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
      const oldNormalizedStyleProp = oldProps && StyleSheet.nomalizeStyleProp(oldProps['style'])
      const newNormalizedStyleProp = newProps && StyleSheet.nomalizeStyleProp(newProps['style']);

      const styleToUpdateInstructions = getPropUpdateDiff(oldNormalizedStyleProp, newNormalizedStyleProp);

      styleToUpdateInstructions.propsToCreate.forEach((stylepropKey) => {
          instance.set(stylepropKey, newNormalizedStyleProp[stylepropKey]);
      })

      styleToUpdateInstructions.propsToUpdate.forEach((stylepropKey) => {
          instance.set(stylepropKey, newNormalizedStyleProp[stylepropKey]);
      })

      styleToUpdateInstructions.propsToRemove.forEach((stylepropKey) => {
        instance.set(stylepropKey, undefined);
      })
  },
  onPropRemove: (propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) => {
    styleUpdater.onPropUpdate(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle)
  },
};

export default styleUpdater;