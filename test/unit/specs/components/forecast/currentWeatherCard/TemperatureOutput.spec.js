import { shallowMount } from '@vue/test-utils'
import TemperatureOutput from '../../../../../../src/components/forecast/singleOutputs/TemperatureOutput.vue'

describe('component should output percentage string', () => {
  const wrapper = shallowMount(TemperatureOutput, {
    propsData: {
      temperature: 301.43
    }
  })

  it('output property should have number and celsius in a string', () => {
   expect(wrapper.vm.output).to.equal('30 ℃')
  })

  it('should render output property in dom', () => {
    expect(wrapper.find('.form-control').element.value).to.equal(wrapper.vm.output)
  })
})