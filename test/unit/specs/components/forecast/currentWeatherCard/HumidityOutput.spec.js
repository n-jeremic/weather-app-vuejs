import { shallowMount } from '@vue/test-utils'
import HumidityOutput from '../../../../../../src/components/forecast/singleOutputs/HumidityOutput.vue'

describe('component should output percentage string', () => {
  const wrapper = shallowMount(HumidityOutput, {
    propsData: {
      humidity: 55
    }
  })

  it('output property should have number and percentage in a string', () => {
   expect(wrapper.vm.output).to.equal('55 %')
  })

  it('should render output property in dom', () => {
    expect(wrapper.find('.form-control').element.value).to.equal(wrapper.vm.output)
  })
})