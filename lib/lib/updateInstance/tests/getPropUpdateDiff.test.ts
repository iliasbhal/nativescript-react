import * as chai from 'chai';
const { expect } = chai;

import getUpdateInstruction from '../lib/getPropUpdateDiff';
describe('createPropUpdater', () => {

  it('should return empty arrays if nothing is different', () => {
    const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({}, {})

    expect(propsToCreate).to.have.lengthOf(0);
    expect(propsToRemove).to.have.lengthOf(0);
    expect(propsToUpdate).to.have.lengthOf(0);
  })

  it('should return which props to create', () => {
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({}, {key1: 0})
      expect(propsToCreate).to.have.lengthOf(1);
      expect(propsToCreate[0]).to.equal('key1');
    }
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction(null, {key1: 0})
      expect(propsToCreate).to.have.lengthOf(1);
      expect(propsToCreate[0]).to.equal('key1');
    }
  })

  it('should return which props to remove', () => {
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 0, key2: 1}, {key2: 0})
      expect(propsToRemove).to.have.lengthOf(1);
      expect(propsToRemove[0]).to.equal('key1');
    }
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 0}, null)
      expect(propsToRemove).to.have.lengthOf(1);
      expect(propsToRemove[0]).to.equal('key1');
    }
  })

  it('should return which props to update', () => {
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 0}, {key1: 1})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
    
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 0, key2: 0}, {key1: 1, key2: 0})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }

    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 0, key2: 0}, {key1: 1, key2: 0})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
  })

  it('should tag a key to update only if the key wasn\'t defined', () => {
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key2: 0}, {key1: 1, key2: 0})
      expect(propsToUpdate).to.have.lengthOf(0);
    }
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: undefined, key2: 0}, {key1: 1, key2: 0})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
  })

  it('should strictly compare functions by reference', () => {
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: () => {}}, {key1: () => {}})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
    {
      const customFunction = () => {};
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: customFunction}, {key1: customFunction})
      expect(propsToUpdate).to.have.lengthOf(0);
    }
  })

  it('should strictly compare primitives by reference', () => {
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 1}, {key1: '1'})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: 0}, {key1: false})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: ''}, {key1: false})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
    {
      const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction({key1: undefined}, {key1: null})
      expect(propsToUpdate).to.have.lengthOf(1);
      expect(propsToUpdate[0]).to.equal('key1');
    }
  })

  it('should give intructions for each prop keys to update', () => {
    const oldProp = {
      key1: 'test',
      key2: 1,
      key3: 1,
    };

    const newProp = {
      key1: 'test',
      key2: 2,
      key4: 1,
    }

    const { propsToCreate, propsToRemove, propsToUpdate } = getUpdateInstruction(oldProp, newProp)
    expect(propsToCreate).to.have.lengthOf(1);
    expect(propsToCreate[0]).to.equal('key4');

    expect(propsToRemove).to.have.lengthOf(1);
    expect(propsToRemove[0]).to.equal('key3');

    expect(propsToUpdate).to.have.lengthOf(1);
    expect(propsToUpdate[0]).to.equal('key2');
  })
});
