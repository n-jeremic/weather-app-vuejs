import { shallowMount, createLocalVue } from '@vue/test-utils'
import SubmitFormBtn from '../../../../../src/components/form/SubmitFormBtn.vue'
import { EventBus } from '../../../../../src/eventBus'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const globalWrapper = shallowMount(SubmitFormBtn, {
  propsData: {
    cityNameInput: '',
    numOfDays: ''
  }
})

const createMockedModuleForStore = (moduleProp, methodName, spy = true, returnValue) => {
  const moduleObj = {}
  moduleObj.namespaced = true
  moduleObj[moduleProp] = {}
  if (spy) {
    moduleObj[moduleProp][methodName] = sinon.spy()
  } else {
    moduleObj[moduleProp][methodName] = function() {
      return returnValue
    }
  }

  return moduleObj
}

describe('submitFormBtn', () => {
  it('should set loadingData to true if same event emitted', () => {
    EventBus.$emit('loadingData')
    expect(globalWrapper.vm.loadingData).to.equal(true)
  })
  it('should disable button if "loadingData" event emitted', async () => {
    await globalWrapper.vm.$nextTick()
    expect(globalWrapper.find('button').element.disabled).to.equal(true)
  })

  it('should set loadingData to false if "loadingDataFinished" event emitted', () => {
    EventBus.$emit('loadingDataFinished')
    expect(globalWrapper.vm.loadingData).to.equal(false)
  })
  it('should enable button if "loadingDataFinished" event emitted', async () => {
    await globalWrapper.vm.$nextTick()
    expect(globalWrapper.find('button').element.disabled).to.equal(false)
  })


  it('validation should fail on invalid input', () => {
    expect(globalWrapper.vm.validateForm()).to.equal(false)
  })
  it('validation should pass on valid input', async () => {
    await globalWrapper.setProps({
      cityNameInput: 'london',
      numOfDays: '4'
    })
    expect(globalWrapper.vm.validateForm()).to.equal(true)
  })
  it('should trigger validate form method on button click', async () => {
    const wrapper = shallowMount(SubmitFormBtn, {
      propsData: {
        cityNameInput: '',
        numOfDays: ''
      }
    })

    const sandbox = sinon.createSandbox()
    sandbox.spy(wrapper.vm, 'validateForm')
    await wrapper.trigger('click')
    expect(wrapper.vm.validateForm.calledOnce).to.equal(true)
  })

  it('should dispatch action from store with correct arguments', async () => {
    const forecastData = createMockedModuleForStore('actions', 'fetchForecastData')
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
      modules: {
        forecastData
      }
    })
    const wrapper = shallowMount(SubmitFormBtn, {
      propsData: {
        cityNameInput: 'london',
        numOfDays: '3'
      },
      store,
      localVue
    })

    wrapper.trigger('click')
    await flushPromises()
    expect(forecastData.actions.fetchForecastData.args[0][1].cityNameInput).to.equal('london')
    expect(forecastData.actions.fetchForecastData.args[0][1].numOfDays).to.equal('3')
  })

  it('should dispatch timeout fn if previous method was successfull', async () => {
    const forecastData = createMockedModuleForStore('actions', 'fetchForecastData', false, 'success')
    const backgroundJobs = createMockedModuleForStore('actions', 'setForecastRefreshTimeout')
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        forecastData,
        backgroundJobs
      }
    })

    const wrapper = shallowMount(SubmitFormBtn, {
      propsData: {
        cityNameInput: 'london',
        numOfDays: '4'
      },
      store,
      localVue
    })

    wrapper.trigger('click')
    await flushPromises()
    expect(backgroundJobs.actions.setForecastRefreshTimeout.calledOnce)
      .to.equal(true)
  })

  it('should not dispatch timeout fn if previous method failed', async () => {
    const forecastData = createMockedModuleForStore('actions', 'fetchForecastData', false, 'failure')
    const backgroundJobs = createMockedModuleForStore('actions', 'setForecastRefreshTimeout')
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        forecastData,
        backgroundJobs
      }
    })

    const wrapper = shallowMount(SubmitFormBtn, {
      propsData: {
        cityNameInput: 'london',
        numOfDays: '4'
      },
      store,
      localVue
    })

    wrapper.trigger('click')
    await flushPromises()
    expect(backgroundJobs.actions.setForecastRefreshTimeout.calledOnce)
      .to.equal(false)
  })
})