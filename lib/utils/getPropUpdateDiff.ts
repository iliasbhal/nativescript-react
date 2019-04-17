export default function getUpdateInstructions(oldProps: object, newProps: object){
  const updateInstructions = {
      propsToRemove: [],
      propsToCreate: [],
      propsToUpdate: [],
  }

  const prevProps = oldProps || {};
  const nextProps = newProps || {};

  const oldPropKeys = Object.keys(prevProps);
  const newPropKeys = Object.keys(nextProps);

  const isOnlyNewProps = !prevProps || oldPropKeys.length === 0;
  if(isOnlyNewProps){
      updateInstructions.propsToCreate = newPropKeys;
      return updateInstructions;
  }

  newPropKeys.forEach((newPropKey) => {
      const propDidNotChange = nextProps[newPropKey] === prevProps[newPropKey]
      if (propDidNotChange) { 
          return;
      }

      const isNewProp = !prevProps.hasOwnProperty(newPropKey);
      if (isNewProp) {
          updateInstructions.propsToCreate.push(newPropKey);
          return;
      }
      
      // new Prop has to be updated;
      updateInstructions.propsToUpdate.push(newPropKey);
  })
  
  oldPropKeys.forEach((oldPropKey) => {
      const isNewProp = !nextProps.hasOwnProperty(oldPropKey);
      if (isNewProp) {
          updateInstructions.propsToRemove.push(oldPropKey);
      }
  })

  return updateInstructions;
}