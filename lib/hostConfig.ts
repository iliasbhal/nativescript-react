// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />
// <reference path="./node_modules/tns-platform-declarations/android.d.ts" />

import { HostConfig, OpaqueHandle } from 'react-reconciler';

import { View } from 'tns-core-modules/ui/core/view/view';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';

import * as NSElements from './nativescript-registery';

type Type = keyof typeof NSElements; ;
type Props = Record<string, any>;
type Container = LayoutBase; // The root node of the app. Typically Frame, but View is more flexible.
type Instance = View; // We may extend this to Observable in future, to allow the tree to contain non-visual components.
type TextInstance = NSElements.TextView;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any;
type TimeoutHandle = number; // Actually strictly should be Node-style timeout
type NoTimeout = any;

export type ConfiguredHostConfig = HostConfig<Type, Props, Container, Instance, TextInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout>;

export const hostConfig: ConfiguredHostConfig = {
    getPublicInstance(instance) { return instance; },
    getRootHostContext(rootContainerInstance) { return rootContainerInstance; }, 
    getChildHostContext(parentHostContext, type, rootContainerInstance) { return parentHostContext; },

    // in Nativescript there is no "text" you should use Label component
    // so we deactivated the react text capability
    shouldSetTextContent: (type, props) =>  false, // typeof props.children === 'string' || typeof props.children === 'number';,
    createTextInstance( text, rootContainerInstance, hostContext, internalInstanceHandle: OpaqueHandle) {},
    commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string): void {},
    resetTextContent(instance: Instance): void {},

    // This function is called when we have made a in-memory render tree of all the views (Remember we are yet to attach it the the actual root dom node).
    // Here we can do any preparation that needs to be done on the rootContainer before attaching the in memory render tree.
    // For example: In the case of react-dom, it keeps track of all the currently focused elements, disabled events temporarily, etc.
    prepareForCommit(rootContainerInstance) {
        // TODO
    },
    
    // @returns A boolean value which decides if commitMount() for this element needs to be called.
    finalizeInitialChildren(parentInstance, type, props, rootContainerInstance, hostContext ) { return false; },

    // This function is called for every element that has set the return value of finalizeInitialChildren() to true. This method is called after all the steps are done (ie after resetAfterCommit), meaning the entire tree has been attached to the dom.
    // This method is mainly used in react-dom for implementing autofocus. This method exists in react-dom only and not in react-native.
    commitMount( instance, type, newProps, internalInstanceHandle: OpaqueHandle): void {},


    // This function gets executed after the inmemory tree has been attached to the root dom element. Here we can do any post attach operations that needs to be done.
    // For example: react-dom re-enabled events which were temporarily disabled in prepareForCommit and refocuses elements, etc.
    resetAfterCommit(rootContainerInstance) {
        // TODO
    },

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
    supportsMutation: true, // TODO
    supportsPersistence: false,
    supportsHydration: false,

    createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle: OpaqueHandle ) {
        const NSElement = NSElements[type];
        if (!NSElement) { return null; }
        
        const view = new NSElement();
        const updatePayload = hostConfig.prepareUpdate(view, type, null, props, rootContainerInstance, hostContext);
        hostConfig.commitUpdate(view, updatePayload, type, null, props)

        return view;
    },

    // This function should return a payload object. Can be anything
    // Payload is a Javascript object that can contain information on what needs to be changed on this host element.
    prepareUpdate( instance, type, oldProps, newProps, rootContainerInstance, hostContext ) {
        // TODO
        return true;
    },

    commitUpdate(instance: Instance, updatePayload, type, oldProps, newProps, internalInstanceHandle: OpaqueHandle ): void {
        Object.keys(newProps).forEach((propName: string) => { 
            if( propName === 'children'){ return; }
            
            // will compare old props and new props and apply update only if needed
            const oldProp = oldProps && oldProps[propName];
            const newProp = newProps[propName];

            const propDidChange = oldProp !== newProp;
            if(!propDidChange){
                return;
            }

            // if prop is an event listerner
            if(typeof newProp === 'function'){                
                const eventName = propName.startsWith('on')
                    && propName.slice(2).toLowerCase(); // transform onTap => tap
                
                instance.off(eventName) // remove old event listener
                instance.on(eventName, newProp, instance); // add new event listerner
            } else {
                instance.set(propName, newProp);
            }

            instance.notifyPropertyChange(propName, newProp, oldProp);  // e.g.: https://github.com/NativeScript/NativeScript/blob/master/tns-core-modules/data/observable/observable.ts#L53
        })
    },


    /* Mutation (optional) */
    insertBefore(parentInstance, child, beforeChild): void { hostConfig.appendChild(parentInstance, child, { beforeChild }) },
    insertInContainerBefore(container, child, beforeChild): void {  hostConfig.appendChild(container, child, { beforeChild }) },
    appendChildToContainer(container, child): void { hostConfig.appendChild(container, child); },
    appendInitialChild(parentInstance, child) { hostConfig.appendChild(parentInstance, child) },
    appendChild(parentInstance: Instance, child: Instance, options?: { beforeChild: Instance }): void {
        if(parentInstance instanceof NSElements.ContentView){
            // These elements were originally designed to hold one element only
            // TODO: for elements that can only take one child, add a FlexView or something in between so that the "children" api will always be consistent
            // the direct child should be a FlexView and we would add things to the flexView; 
            parentInstance.content = (child);
             
        } else if ( parentInstance instanceof LayoutBase ) {
            
            if( options && options.beforeChild ){
                const childIndex = parentInstance.getChildIndex(options.beforeChild);
                parentInstance.insertChild(child, childIndex)
                return 
            } else {
                parentInstance.addChild(child);
            }

        } else {
          parentInstance._addView(child);
        }
    },

    removeChildFromContainer(container, child): void { hostConfig.removeChild(container, child); }, 
    removeChild(parentInstance: Instance, child: Instance): void {
        if(parentInstance instanceof NSElements.ContentView){ 
             parentInstance.content = null;
        } else if ( parentInstance instanceof LayoutBase ) {
            parentInstance.removeChild(child);
        } else {
          parentInstance._removeView(child);
        }
    },
}
