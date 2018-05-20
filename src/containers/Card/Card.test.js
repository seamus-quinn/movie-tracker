import { Card, mapStateToProps, mapDispatchToProps }from './Card'
import { shallow } from 'enzyme'
import React from 'react'
import * as apiCalls from '../../apiCalls';

describe('Card', () => {

  it('matches the snapshot', () => {
    const mockProps = {
      movieId: 2342342,
      title: 'The Mighty Gasbag',
      rating: 100,
      image: 'www.flatulence.com/image/123132.png',
      favorite: false 
    }
    const wrapper = shallow(<Card {...mockProps} />)

    expect(wrapper).toMatchSnapshot();
  })

  describe('handleClick', () => {

    it('calls apiCalls.postFavorite with the correct arguments if favorite is false', () => {
       
    })

    it('calls props.addFavorite with the correct arguments if favorite is false', () => {

    })

    it('calls apiCalls.removeFavorite with the correct arguments if favorite is true', () => {

    })

    it('calls props.removeFavorite with the correct arguments if favorite is true', () => {

    })
  })

  describe('mapStateToProps', () => {
  
    it('updates the currentUser props from state', () => {
      const mockState = {
        currentUser: 1,
        fakeProp: 'burritos'
      }

      const expected =  { userId: mockState.currentUser };
      const result = mapStateToProps(mockState);

      expect(result).toEqual(expected);
    })
  })

  describe('mapDispatchToProps', () => {

  })
})
