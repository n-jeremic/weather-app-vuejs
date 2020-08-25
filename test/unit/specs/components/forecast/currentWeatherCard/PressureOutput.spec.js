import { shallowMount } from '@vue/test-utils'
import PressureOutput from '../../../../../../src/components/forecast/singleOutputs/PressureOutput.vue'

describe('component should output percentage string', () => {
  const wrapper = shallowMount(PressureOutput, {
    propsData: {
      pressure: 1003
    }
  })

  it('output property should have number and mbar in a string', () => {
   expect(wrapper.vm.output).to.equal('1003 mbar')
  })

  it('should render output property in dom', () => {
    expect(wrapper.find('.form-control').element.value).to.equal(wrapper.vm.output)
  })
})