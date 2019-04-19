export interface PropUpdater {
  shouldUseUpdater(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle): boolean;
  onPropCreate(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle): void;
  onPropUpdate(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle): void;
  onPropRemove(propKey, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle): void;
}