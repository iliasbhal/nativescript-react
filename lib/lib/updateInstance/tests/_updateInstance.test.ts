import chai from 'chai';
import sinon from 'sinon';

const { expect } = chai;

import updateInstance, { } from '..';
import console = require('console');

class TestInstance {
  props = new Map();
  eventListerners = new Map();

  get = (key) => {
    return this.props.get('key');
  }
  set = (key, value) => {
    this.props.set(key, value);
  }

  addEventListener = (eventName, eventListerner, _this) => {
    this.eventListerners.set(eventName, eventListerner);
  }
  on = this.addEventListener;

  removeEventListener = (eventName) => {
    this.eventListerners.delete(eventName);
  }
  off = this.removeEventListener;
}

function runUpdates(instance, arrayOfNewProps, callback?: (newProps: any, updateIndex: number) => void){
  arrayOfNewProps.forEach((newProps, index)=>{
    const oldProps = index > 0 ? arrayOfNewProps[index - 1] : null;
    updateInstance(instance, null, null, oldProps, newProps, null);
    callback && callback(newProps, index);
  })
}

describe('hostConfig.updateInstance', () => {

  it('should update generic props', () => {
    const instance = new TestInstance();

    const propUpdates = [
      { backgroundColor: 'red'},
      { backgroundColor: 'blue'},
      { backgroundColor: 'orange'},
      { backgroundColor: 'yellow'},
      {},
    ]

    runUpdates(instance, propUpdates, (updateNumber) => {
      switch(updateNumber){
        case 0: 
          expect(instance.props.get('backgroundColor')).to.equal('red');
          break;
        case 1: 
          expect(instance.props.get('backgroundColor')).to.equal('blue');
          break;
        case 2: 
          expect(instance.props.get('backgroundColor')).to.equal('orange');
          break;
        case 3:
          expect(instance.props.get('backgroundColor')).to.equal('yellow');
          break;
        case 3:
          expect(instance.props.get('backgroundColor')).to.equal(undefined);
          break;
      }
    });

  })

  it('should update style props', () => {
    const instance = new TestInstance();

    const propUpdates = [
      { style: { backgroundColor: 'red', marginTop: 5}},
      { style: { backgroundColor: 'blue' }},
      { style: { backgroundColor: 'orange', marginTop: 3}},
      { style: { backgroundColor: 'yellow' }},
    ]

    runUpdates(instance, propUpdates);

    expect(instance.props.get('backgroundColor')).to.equal('yellow');
    expect(instance.props.get('marginTop')).to.be.undefined;
  })

  it('should keep style up to date on each instance update', () => {
    const instance = new TestInstance();

    const propUpdates = [
      { style: { backgroundColor: 'red', marginTop: 5}},
      { style: { backgroundColor: 'blue' }},
      { style: { backgroundColor: 'orange', marginTop: 3}},
      { }
    ]

    runUpdates(instance, propUpdates, (newProps, updateNumber) => {

      switch(updateNumber){
        case 0: 
          expect(instance.props.get('backgroundColor')).to.equal('red');
          expect(instance.props.get('marginTop')).to.equal(5);
          break;
        case 1: 
          expect(instance.props.get('backgroundColor')).to.equal('blue');
          expect(instance.props.get('marginTop')).to.be.undefined;
          break;
        case 2: 
          expect(instance.props.get('backgroundColor')).to.equal('orange');
          expect(instance.props.get('marginTop')).to.equal(3);
          break;
        case 3:
          expect(instance.props.get('backgroundColor')).to.be.undefined;
          expect(instance.props.get('marginTop')).to.be.undefined;
          break;
      }
    });
  })

  it('should automatically add event listeners', () => {
    const instance = new TestInstance();

    const eventListernerA = () => {};
    const eventListernerB = () => {};
    const eventListernerC = () => {};
    const eventListernerD = () => {};
    const eventListernerE = () => {};

    const propUpdates = [
      { onTap: eventListernerA, onPan: eventListernerD},
      { onTap: eventListernerB},
      { },
      { onTap: eventListernerC, onPan: eventListernerE},
      { }
    ]

    expect(instance.eventListerners.get('tap')).to.equal(undefined);
    expect(instance.eventListerners.get('pan')).to.equal(undefined);

    runUpdates(instance, propUpdates, (newProps, updateNumber) => {
      switch(updateNumber){
        case 0: 
          expect(instance.eventListerners.get('tap')).to.equal(eventListernerA);
          expect(instance.eventListerners.get('pan')).to.equal(eventListernerD);
          break;
        case 1: 
          expect(instance.eventListerners.get('tap')).to.equal(eventListernerB);
          expect(instance.eventListerners.get('pan')).to.equal(undefined);
          break;
        case 2: 
          expect(instance.eventListerners.get('tap')).to.equal(undefined);
          expect(instance.eventListerners.get('pan')).to.equal(undefined);
          break;
        case 3: 
          expect(instance.eventListerners.get('tap')).to.equal(eventListernerC);
          expect(instance.eventListerners.get('pan')).to.equal(eventListernerE);
          break;
        case 4: 
          expect(instance.eventListerners.get('tap')).to.equal(undefined);
          expect(instance.eventListerners.get('pan')).to.equal(undefined);
          break;
      }
    });
  })

  it('should not hanlde children prop, should do nothing to instance', () => {
    let hasBeenAccesed = false
    const instance = new Proxy(new TestInstance(), {
      get: (target, p) => {
        hasBeenAccesed = true;
        return target[p];
      }
    })

    const propUpdates = [
      { children: []},
    ]

    runUpdates(instance, propUpdates, (newProps, updateNumber) => {
      switch(updateNumber){
        case 0: 
          expect(hasBeenAccesed).to.equal(false);
          break;
      }
    });
  })
});
