import * as React from 'react';
import * as NSElements from './nativescript-registery'

type NSIntrinsicElements = keyof typeof NSElements;
type ReactPartialProps<P> = Partial<React.Props<any> & P & {}>;

function createNSReactElementFactory<T>(type: NSIntrinsicElements){
  return React.forwardRef((props: Partial<React.Props<T> & T>, ref: any) => {
    return React.createElement(type, { ...props, ref });
  })
}

export const AbsoluteLayout = createNSReactElementFactory<NSElements.AbsoluteLayout>('AbsoluteLayout');
export const ActionBar = createNSReactElementFactory<NSElements.ActionBar>('ActionBar');
export const ActivityIndicator = createNSReactElementFactory<NSElements.ActivityIndicator>('ActivityIndicator');
export const Button = createNSReactElementFactory<NSElements.Button>('Button');
export const ContentView = createNSReactElementFactory<NSElements.ContentView>('ContentView');
export const DatePicker = createNSReactElementFactory<NSElements.DatePicker>('DatePicker');
export const DockLayout = createNSReactElementFactory<NSElements.DockLayout>('DockLayout');
export const EditableTextBase = createNSReactElementFactory<NSElements.EditableTextBase>('EditableTextBase');
export const FlexboxLayout = createNSReactElementFactory<NSElements.FlexboxLayout>('FlexboxLayout');
export const Frame = createNSReactElementFactory<NSElements.Frame>('Frame');
export const HtmlView = createNSReactElementFactory<NSElements.HtmlView>('HtmlView');
export const Image = createNSReactElementFactory<NSElements.Image>('Image');
export const Label = createNSReactElementFactory<NSElements.Label>('Label');
export const LayoutBase = createNSReactElementFactory<NSElements.LayoutBase>('LayoutBase');
export const ListPicker = createNSReactElementFactory<NSElements.ListPicker>('ListPicker');
export const ListView = createNSReactElementFactory<NSElements.ListView>('ListView');
export const Page = createNSReactElementFactory<NSElements.Page>('Page');
export const Placeholder = createNSReactElementFactory<NSElements.Placeholder>('Placeholder');
export const Progress = createNSReactElementFactory<NSElements.Progress>('Progress');
export const ProxyViewContainer = createNSReactElementFactory<NSElements.ProxyViewContainer>('ProxyViewContainer');
export const Repeater = createNSReactElementFactory<NSElements.Repeater>('Repeater');
export const ScrollView = createNSReactElementFactory<NSElements.ScrollView>('ScrollView');
export const SearchBar = createNSReactElementFactory<NSElements.SearchBar>('SearchBar');
export const SegmentedBar = createNSReactElementFactory<NSElements.SegmentedBar>('SegmentedBar');
export const Slider = createNSReactElementFactory<NSElements.Slider>('Slider');
export const StackLayout = createNSReactElementFactory<NSElements.StackLayout>('StackLayout');
export const Switch = createNSReactElementFactory<NSElements.Switch>('Switch');
export const TabView = createNSReactElementFactory<NSElements.TabView>('TabView');
export const TextField = createNSReactElementFactory<NSElements.TextField>('TextField');
export const TextView = createNSReactElementFactory<NSElements.TextView>('TextView');
export const TimePicker = createNSReactElementFactory<NSElements.TimePicker>('TimePicker');
export const WebView = createNSReactElementFactory<NSElements.WebView>('WebView');
export const WrapLayout = createNSReactElementFactory<NSElements.WrapLayout>('WrapLayout');

type GetNSType<T> = (props: ReactPartialProps<T>) => NSIntrinsicElements;
type GetNSProps<T,P> = (props: ReactPartialProps<T>) => ReactPartialProps<P>;

// T is the NSComponent;
// P is the props API you want to expose;
function createNSAliasReactElementFactory<P, T>(config: { getNSType: GetNSType<P>, getNSProps: GetNSProps<P,T>}){
  return React.forwardRef((props: Partial<React.Props<P> & P>, ref: any) => {
    const nsType = config.getNSType(props);
    const nsProps = config.getNSProps(props);

    return React.createElement(nsType, { ...nsProps, ref })
  })
};

export const View = createNSAliasReactElementFactory({
  getNSType: (props) => 'FlexboxLayout',
  getNSProps: (props) => props
})

export const Text = createNSAliasReactElementFactory({
  getNSType: (props) => 'Label',
  getNSProps: (props) => props
})