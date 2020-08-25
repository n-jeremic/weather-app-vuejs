import { shallowMount } from '@vue/test-utils'
import ErrorOutput from '../../../../../src/components/error/FetchErrorMessage.vue'

const wrapper = shallowMount(ErrorOutput, {
  propsData: {
    errorMsg: 'test error message'
  }
})

it('should display error message in the dom', () => {
  expect(wrapper.find('h4').element.innerText).to.equal('test error message')
})