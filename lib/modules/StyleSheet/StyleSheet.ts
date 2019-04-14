import { StyleSheetObject } from './StyleSheet.d';

export default class StyleSheet {
  static styleMap = new Map();

  static create(styleSheetObject: StyleSheetObject){
    return Object.keys(styleSheetObject)
      .reduce((styleRefObject, styleIdentifier: string) => {
        const styleId = StyleSheet.styleMap.size;
        const styleObject = styleSheetObject[styleIdentifier];
        this.styleMap.set(styleId, styleObject);

        return Object.assign(styleRefObject, { [styleIdentifier]: styleId })
      }, {})
  }

  static flush() {
    StyleSheet.styleMap.clear()
  }

  static get(styleId: number){
    return this.styleMap.get(styleId);
  }

  static flatten = StyleSheet.nomalizeStyleProp;
  static hairlineWidth = 1;

  // recursive function that normalize the style Prop
  static nomalizeStyleProp(styleProp: any){
    if (Array.isArray(styleProp)) {
      return styleProp.reduce(( styleObject, currentStyle)=>{
        return Object.assign(styleObject, StyleSheet.nomalizeStyleProp(currentStyle));
      },{})
    }

    if (typeof styleProp === 'number') {
      return StyleSheet.get(styleProp);
    }

    if (typeof styleProp === 'object') {
      return styleProp;
    }

    return {};
  }
}
