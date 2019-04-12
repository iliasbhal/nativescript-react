import * as ReactReconciler from 'react-reconciler';
import * as application from "tns-core-modules/application";

import { hostConfig } from './hostConfig';
import { ContentView } from './nativescript-registery';

const reactReconcilerInst = ReactReconciler(hostConfig);

const renderer = {
    render(reactElement: ReactReconciler.ReactNodeList, rootContainer, callback ){
        const container = reactReconcilerInst.createContainer(rootContainer, false, false);
        reactReconcilerInst.updateContainer(reactElement, container, null, callback);
    },
};

const AppRegistry = {
    runApplication: (
        reactElement: ReactReconciler.ReactNodeList, // <App />
        callback?: () => any // Called after the component is rendered or updated
    ) => {
        application.run({
            create: () => {
                const rootContainer = new ContentView();
                renderer.render(reactElement, rootContainer, callback)
                return rootContainer;
            } 
        });
    }
}

export default AppRegistry;