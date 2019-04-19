import { HostConfig, OpaqueHandle } from 'react-reconciler';

import { View } from 'tns-core-modules/ui/core/view/view';
import { LayoutBase } from 'tns-core-modules/ui/layouts/layout-base';

import * as NSElements from './nativescript-registery';
import StyleSheet from './modules/StyleSheet/StyleSheet';

type Type = keyof typeof NSElements;
type Props = Record<string, any>;
type Container = LayoutBase; 
type Instance = View; 
type TextInstance = any; // NSElements.TextView;
type HydratableInstance = any;
type PublicInstance = any;
type HostContext = any;
type UpdatePayload = any;
type ChildSet = any;
type TimeoutHandle = number; 
type NoTimeout = any;

export interface CustomHostConfig extends HostConfig<Type, Props, Container, Instance, TextInstance, HydratableInstance, PublicInstance, HostContext, UpdatePayload, ChildSet, TimeoutHandle, NoTimeout> {
    appendChildToParent(parentInstance: Instance, child: Instance, options?: { beforeChild: Instance }) : void
}