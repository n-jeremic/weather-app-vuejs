<template>
  <div class="row shadow-sm" id="form">
    <div class="col-xl-4 col-lg-6 col-sm-12">
      <app-city-input-field v-model="cityInput"/>
    </div>
    <div class="col-xl-2 col-lg-6 col-sm-12">
      <app-num-of-days-input-field v-model="numOfDaysInput"/>
    </div>
    <div class="col-xl-3 col-lg-8 col-sm-12">
      <app-favourites-dropdown @favouriteCitySelected="cityInput = $event" />
    </div>
    <div class="col-xl-3 col-lg-4 col-sm-12">
      <app-submit-form-btn
        :cityNameInput="cityInput"
        :numOfDays="numOfDaysInput"
      />
    </div>
  </div>
</template>

<script>
import FavouritesDropdown from './FavouritesDropdown.vue'
import SubmitFormBtn from './SubmitFormBtn.vue'
import CityInputField from './CityInputField.vue'
import NumOfDaysInputField from './NumOfDaysInputField.vue'

export default {
  components: {
    appFavouritesDropdown: FavouritesDropdown,
    appSubmitFormBtn: SubmitFormBtn,
    appCityInputField: CityInputField,
    appNumOfDaysInputField: NumOfDaysInputField
  },
  data() {
    return {
      cityInput: '',
      numOfDaysInput: ''
    }
  } 
}
</script>

<style scoped>
#form {
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  padding: 15px 0;
  margin: 0;
}

.btn {
  margin-top: 2rem;
}
</style>