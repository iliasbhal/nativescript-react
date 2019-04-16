// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

// Documentation from : https://blog.atulr.com/react-custom-renderer-2/

import { HostConfig, OpaqueHandle } from 'react-reconciler';

import { View } from 'tns-core-modules/ui/core/view/view';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base.d';

import * as NSElements from './nativescript-registery';
import getUpdateInstructions from './utils/getUpdateInstructions';
import createPropUpdater, { PROP_LIFECYCLE } from './utils/createPropUpdater';

import { CustomHostConfig } from './hostConfig.d';

const hostConfig: CustomHostConfig = {
    getPublicInstance(instance) { return instance; },
    getRootHostContext(rootContainerInstance) { return rootContainerInstance; }, 
    getChildHostContext(parentHostContext, type, rootContainerInstance) { return parentHostContext; },

    // in Nativescript there is no "text" you should use Label component
    // so we deactivated the react text capability
    shouldSetTextContent: (type, props) =>  false, // typeof props.children === 'string' || typeof props.children === 'number';,
    createTextInstance( text, rootContainerInstance, hostContext, internalInstanceHandle) {},
    commitTextUpdate(textInstance, oldText, newText) {},
    resetTextContent(instance) {},

    // This function is called when we have made a in-memory render tree of all the views (Remember we are yet to attach it the the actual root dom node).
    // Here we can do any preparation that needs to be done on the rootContainer before attaching the in memory render tree.
    // For example: In the case of react-dom, it keeps track of all the currently focused elements, disabled events temporarily, etc.
    prepareForCommit(rootContainerInstance) {},
    
    // @returns A boolean value which decides if commitMount() for this element needs to be called.
    finalizeInitialChildren(parentInstance, type, props, rootContainerInstance, hostContext ) { return false; },

    // This function is called for every element that has set the return value of finalizeInitialChildren() to true. This method is called after all the steps are done (ie after resetAfterCommit), meaning the entire tree has been attached to the dom.
    // This method is mainly used in react-dom for implementing autofocus. This method exists in react-dom only and not in react-native.
    commitMount( instance, type, newProps, internalInstanceHandle) {},


    // This function gets executed after the inmemory tree has been attached to the root dom element. Here we can do any post attach operations that needs to be done.
    // For example: react-dom re-enabled events which were temporarily disabled in prepareForCommit and refocuses elements, etc.
    resetAfterCommit(rootContainerInstance) {},

    // This function is used to deprioritize rendering of some subtrees. Mostly used in cases where the subtree is hidden or offscreen.
    shouldDeprioritizeSubtree(type, props) {
        return !!props.hidden 
            || props.display === 'none'
            || props.visibility === 'hidden'
            || props.opacity === 0
    },

    scheduleDeferredCallback: ( callback, options?: { timeout: number }, ) => setTimeout(callback, options && options.timeout || 0),
    cancelDeferredCallback: (callbackID) => clearTimeout(callbackID),
    setTimeout: (handler, timeout) => setTimeout(handler, timeout),
    clearTimeout: (handle) => clearTimeout(handle),
    
    noTimeout: null,
    now: Date.now,
    isPrimaryRenderer: true,
    supportsMutation: true, 
    supportsPersistence: false,
    supportsHydration: false,

    createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
        const NSElement = NSElements[type];
        if (!NSElement) { return null; }
        
        const instance = new NSElement();
        const updatePayload = hostConfig.prepareUpdate(instance, type, null, props, rootContainerInstance, hostContext);
        hostConfig.commitUpdate(instance, updatePayload, type, null, props, internalInstanceHandle)

        return instance;
    },

    // This function should return a payload object. Can be anything
    // Payload is a Javascript object that can contain information on what needs to be changed on this host element.
    prepareUpdate( instance, type, oldProps, newProps, rootContainerInstance, hostContext ) {
        return true;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle): void {
        const propUpdateInstructions = getUpdateInstructions(oldProps, newProps);

        const onCreateProps = createPropUpdater(PROP_LIFECYCLE.ON_CREATE, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
        const onUpdateProps = createPropUpdater(PROP_LIFECYCLE.ON_UPDATE, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);
        const onDeleteProps = createPropUpdater(PROP_LIFECYCLE.ON_REMOVE, instance, updatePayload, type, oldProps, newProps, internalInstanceHandle);

        propUpdateInstructions.propsToCreate.forEach(onCreateProps);
        propUpdateInstructions.propsToUpdate.forEach(onUpdateProps);
        propUpdateInstructions.propsToRemove.forEach(onDeleteProps);
    },

    insertBefore(parentInstance, child, beforeChild): void { hostConfig.appendChildToParent(parentInstance, child, { beforeChild }) },
    insertInContainerBefore(container, child, beforeChild): void {  hostConfig.appendChildToParent(container, child, { beforeChild }) },
    appendChildToContainer(container, child): void { hostConfig.appendChildToParent(container, child); },
    appendInitialChild(parentInstance, child) { hostConfig.appendChildToParent(parentInstance, child); },
    appendChild(parentInstance, child): void { hostConfig.appendChildToParent(parentInstance, child); },

    // Custom function 
    appendChildToParent(parentInstance, child, options?: { beforeChild }){
        if(parentInstance instanceof NSElements.ContentView){
            // These elements were originally designed to hold one element only
            // TODO: for elements that can only take one child, add a FlexView or something in between so that the "children" api will always be consistent
            // the direct child should be a FlexView and we would add things to the flexView; 
            parentInstance.content = (child);
             
        } else if ( parentInstance instanceof LayoutBase ) {
            
            if( options && options.beforeChild ){
                const childIndex = parentInstance.getChildIndex(options.beforeChild);
                parentInstance.insertChild(child, childIndex)
            } else {
                parentInstance.addChild(child);
            }

        } else {
          parentInstance._addView(child);
        }
    },

    removeChildFromContainer(container, child): void { hostConfig.removeChild(container, child); }, 
    removeChild(parentInstance, child): void {
        if(parentInstance instanceof NSElements.ContentView){ 
             parentInstance.content = null;
        } else if ( parentInstance instanceof LayoutBase ) {
            parentInstance.removeChild(child);
        } else {
          parentInstance._removeView(child);
        }
    },
}

export default hostConfig;

