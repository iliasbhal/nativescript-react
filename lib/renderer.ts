import * as React from 'react';
import * as reactReconciler from 'react-reconciler';
import * as application from "tns-core-modules/application";

import hostConfig from './hostConfig';
import { ContentView } from './nativescript-registery';

const reconciler = reactReconciler(hostConfig);

function renderReactNativeScriptApp(rootReactElement: React.ReactElement, rootNativeContainer, callback ){
    const reconcilerContainer = reconciler.createContainer(rootNativeContainer, false, false);
    reconciler.updateContainer(rootReactElement, reconcilerContainer, null, callback);
}

const AppRegistry = {
    runApplication: (
        rootReactElement: React.ReactElement, 
        callback?: () => any // Will be called after the component is rendered  updated
    ) => {
        application.run({
            create: () => {
                const rootNativeContainer = new ContentView();
                renderReactNativeScriptApp(rootReactElement, rootNativeContainer, callback)
                return rootNativeContainer;
            } 
        });
    }
}

export default AppRegistry;