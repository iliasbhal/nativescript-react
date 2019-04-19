import * as chai from 'chai';
const { expect } = chai;

import StyleSheet from './StyleSheet';

describe('StyleSheet', () => {

  beforeEach(()=>{
    StyleSheet.flush();
  })

  it('should create an object referencing the styleIDs for each key', ()=>{
    
    const style = StyleSheet.create({
      wrapper: {},
      inner: {},
      card: {}
    })

    const styleIds = Object.keys(style);
    expect(styleIds.length).to.equal(3);
  })

  it('should be able to retrieve the styleObject by styleID for each key', () => {
    const styles = {
      wrapper: { width: 3 },
      inner: { width: 2},
      card: { width: 1}
    }
    
    const stylesheet = StyleSheet.create(styles)

    Object.keys(stylesheet).forEach((styleName) => {
      expect(StyleSheet.get(stylesheet[styleName])).to.equal(styles[styleName])
    })
  })

  it('should work across different stylesheets', () => {

    const styles = {
      wrapper: { width: 3 },
      inner: { width: 2},
      card: { width: 1}
    }

    const styles2 = {
      wrapper: { width: 6 },
      inner: { width: 5},
      card: { width: 4}
    }
    
    const stylesheet = StyleSheet.create(styles)
    const stylesheet2 = StyleSheet.create(styles2)

    // @ts-ignore
    const noStyles = StyleSheet.create();
    expect(noStyles).to.deep.equal({});

    Object.keys(stylesheet).forEach((styleName) => {
      expect(StyleSheet.get(stylesheet[styleName])).to.equal(styles[styleName])
    })

    Object.keys(stylesheet2).forEach((styleName) => {
      expect(StyleSheet.get(stylesheet2[styleName])).to.equal(styles2[styleName])
    })
  })

  it('should remove all style references if .flush is called', () => {

    const styles = {
      wrapper: { width: 3 },
      inner: { width: 2},
      card: { width: 1}
    }
    
    const style = StyleSheet.create(styles)
    StyleSheet.flush();

    Object.keys(style).forEach((styleName) => {
      expect(StyleSheet.get(style[styleName])).to.equal(undefined)
    })

  })

  it('should give the hairlineWidth', ()=>{
    expect(StyleSheet.hairlineWidth).to.equal(1);
  })

  describe('flatten / nomalizeStyleProp', () => {

    it('should expose flatten as an alias of nomalizeStyleProp', ()=>{
      expect(StyleSheet.flatten).to.equal(StyleSheet.nomalizeStyleProp);
    })
    it('should return style objects', () => {
      const style = StyleSheet.flatten({ opacity: 1 });
      expect(style).to.deep.equal({
        opacity: 1,
      });
    });
  
    it('should merge style objects', () => {
      const style = StyleSheet.flatten([{ opacity: 1 }, { order: 2 }]);
      expect(style).to.deep.equal({
        opacity: 1,
        order: 2,
      });
    });
  
    it('should override style properties', () => {
      const style = StyleSheet.flatten([
        { backgroundColor: '#000', order: 1 },
        { backgroundColor: '#023c69', order: null }
      ]);
      expect(style).to.deep.equal({
        backgroundColor: '#023c69', 
        order: null,
      });
    });
  
    it('should overwrite properties with `undefined`', () => {
      const style = StyleSheet.flatten([{ backgroundColor: '#000' }, { backgroundColor: undefined }]);
      expect(style).to.deep.equal({
        backgroundColor: undefined,
      });
    });
  
    it('should not fail on falsy/ empty values, should return empty object', () => {
      // @ts-ignore
      expect(StyleSheet.flatten()).to.deep.equal({});
      expect(StyleSheet.flatten(false)).to.deep.equal({});
      expect(StyleSheet.flatten([null, false, undefined])).to.deep.equal({});
      expect(StyleSheet.flatten([])).to.deep.equal({});
    });
  
    it('should retrieve and normalize mapped stylesheets', () => {
      const styles = {
        wrapper: { width: 3 },
        inner: { width: 2},
        card: { width: 1}
      }
      
      const stylesheet = StyleSheet.create(styles)
      const style = StyleSheet.flatten(stylesheet.wrapper);
      
      expect(style).to.deep.equal(styles.wrapper);
    })

    it('should recursively flatten arrays', () => {
      const style = StyleSheet.flatten([null, [], [{ order: 2 }, [{ opacity: 1 }]], { order: 3 }]);
      expect(style).to.deep.equal({
        opacity: 1,
        order: 3,
      });
    });

  })

});
