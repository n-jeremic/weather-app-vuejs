import { shallowMount } from '@vue/test-utils'
import WindOutput from '../../../../../../src/components/forecast/singleOutputs/WindOutput.vue'

describe('component should output percentage string', () => {
  const wrapper = shallowMount(WindOutput, {
    propsData: {
      windSpeed: 21.5
    }
  })

  it('output property should have number and km/h in a string', () => {
   expect(wrapper.vm.output).to.equal('21.5 km/h')
  })

  it('should render output property in dom', () => {
    expect(wrapper.find('.form-control').element.value).to.equal(wrapper.vm.output)
  })
})