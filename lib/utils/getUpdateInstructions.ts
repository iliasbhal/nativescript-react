export default function getUpdateInstructions(oldProps: object, newProps: object){
  const updateInstructions = {
      propsToRemove: [],
      propsToCreate: [],
      propsToUpdate: [],
  }

  const newPropKeys = Object.keys(newProps);
  const oldPropKeys = Object.keys(oldProps);

  const isOnlyNewProps = !oldProps || oldPropKeys.length === 0;
  if(isOnlyNewProps){
      updateInstructions.propsToCreate = newPropKeys;
      return updateInstructions;
  }

  newPropKeys.forEach((newPropKey) => {
      const propDidNotChange = newProps[newPropKey] === oldProps[newPropKey]
      if (propDidNotChange) { 
          return;
      }

      const isNewProp = !oldProps.hasOwnProperty(newPropKey);
      if (isNewProp) {
          updateInstructions.propsToCreate.push(newPropKey);
      }
      
      // new Prop has to be updated;
      updateInstructions.propsToUpdate.push(newProps);
  })

  // because all keys have already been checked
  const skipDetectPropToDelete = oldPropKeys.length === newPropKeys.length;
  if(skipDetectPropToDelete){
      oldPropKeys.forEach((oldPropKey) => {
          const isNewProp = !newProps.hasOwnProperty(oldPropKey);
          if (isNewProp) {
              updateInstructions.propsToRemove.push(oldPropKey);
          }
      })
  }

  return updateInstructions;
}