import { shallowMount } from '@vue/test-utils'
import CityInputField from '../../../../../src/components/form/CityInputField.vue'
import { EventBus } from '../../../../../src/eventBus'

const wrapper = shallowMount(CityInputField, {
  propsData: {
    value: ''
  }
})

describe('should update input value based on value prop', async () => {
  await wrapper.setProps({
    value: 'test input'
  })

  it('input should have correct value displayed', () => {
    expect(wrapper.find('#cityInput').element.value).to.equal('test input')
  })
})

describe('should generate and display error message on empty input event', () => {
  EventBus.$emit('emptyCityInput')

  it('should generate error message', () => {
    expect(wrapper.vm.invalidInputMessage).to.equal('This field is required.')
  })

  it('should attach invalid class on input field', () => {
    expect(wrapper.find('#cityInput').element.classList.contains('is-invalid')).to.equal(true)
  })

  it('should display error message in dom', () => {
    expect(wrapper.find('.invalid-feedback').exists()).to.equal(true)
  })
})

describe('on input event component should emit same event to the parent', async () => {
  await wrapper.find('#cityInput').trigger('input')

  it('should emit input event', () => {
    expect(wrapper.emitted().input).to.exist
  })
})


