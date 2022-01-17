import { mount } from '@vue/test-utils'
import AlchemyGame from './AlchemyGame.vue'

describe('AlchemyGame', () => {
  it('should display header text', () => {
    const wrapper = mount(AlchemyGame, { props: { } })

    expect(wrapper.find('h1').text()).toEqual('The Alchemist\'s Cottage')
  })
})
