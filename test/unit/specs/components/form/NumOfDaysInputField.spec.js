import { shallowMount } from '@vue/test-utils'
import NumOfDaysInputField from '../../../../../src/components/form/NumOfDaysInputField.vue'
import { EventBus } from '../../../../../src/eventBus'

const wrapper = shallowMount(NumOfDaysInputField, {
  propsData: {
    value: ''
  }
})

const emitInputEvent = () => {
  return wrapper.find('#numOfDaysInput').trigger('input')
}

const setValueProp = value => {
  return wrapper.setProps({
    value: `${value}`
  })
}

describe('numOfDaysInputField', async () => {
  EventBus.$emit('emptyNumOfDaysInput')
  it('should generate error message on empty input event', () => {
    expect(wrapper.vm.invalidInputMessage).to.equal('This field is required.')
  })
  it('should attach proper class on input field', () => {
    expect(wrapper.find('#numOfDaysInput').element.classList.contains('is-invalid')).to.equal(true)
  })
  it('should display error message div in the dom', () => {
    expect(wrapper.find('.invalid-feedback').exists()).to.equal(true)
  })


  it('should update input field based on value prop', async () => {
    await setValueProp(1)
    expect(wrapper.find('#numOfDaysInput').element.value).to.equal('1')
  })


  it('on input event component should emit the same one to the parent', async () => {
    await emitInputEvent()
    expect(wrapper.emitted().input).to.exist
  })
  it('should send proper data with emitted event', async () => {
    await setValueProp(5)
    await emitInputEvent()
    expect(wrapper.emitted().input[1][0]).to.equal('5')
  })
  it('should generate proper message when input is lower than 1', async () => {
    await setValueProp(-5)
    await emitInputEvent()
    expect(wrapper.vm.invalidInputMessage).to.equal('Minimum value is 1.')
  })
  it('should generate proper message when input is higher than 7', async () => {
    await setValueProp(10)
    await emitInputEvent()
    expect(wrapper.vm.invalidInputMessage).to.equal('Maximum value is 7.')
  })
  it('should set invalidInputMessage to null if input is valid', async () => {
    await setValueProp(4)
    await emitInputEvent()
    expect(wrapper.vm.invalidInputMessage).to.equal(null)
  })
  it('should remove "is-invalid" class on input field if input is valid', async () => {
    await setValueProp(4)
    await emitInputEvent()
    expect(wrapper.find('#numOfDaysInput').element.classList.contains('is-invalid')).to.equal(false)
  })
  it('should remove error message div in the dom if input is valid', async () => {
    await setValueProp(4)
    await emitInputEvent()
    expect(wrapper.find('.invalid-feedback').exists()).to.equal(false)
  })
})