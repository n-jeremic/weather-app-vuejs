import { mount } from '@vue/test-utils'
import Form from '../../../../../src/components/form/Form.vue'
import store from '../../../../../src/store/store'

const wrapper = mount(Form, {
  store
})

describe('Form', () => {
  it('should update cityInput prop when user types something in input field', async () => {
    wrapper.find('#cityInput').element.value = 'paris'
    await wrapper.find('#cityInput').trigger('input')
    expect(wrapper.vm.cityInput).to.equal('paris')
  })

  it('should update numOfDaysInput prop when user types something in input field', async () => {
    wrapper.find('#numOfDaysInput').element.value = '5'
    await wrapper.find('#numOfDaysInput').trigger('input')
    expect(wrapper.vm.numOfDaysInput).to.equal('5')
  })

  it('should update cityInput prop when appFavouritesDropwdown emits an event', async () => {
    wrapper.vm.$refs.favouritesDropdown.$emit('favouriteCitySelected', 'london')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.cityInput).to.equal('london')
  })
})

