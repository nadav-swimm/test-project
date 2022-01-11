import '@/components/atoms/'
import '@/components/molecules/'

import { mount, shallowMount } from '@vue/test-utils';

import Component from '../src/components/templates/step1.vue';

let wrapper;
let __mockGetters = {
  error: '',
  isUrlEmpty: false,
  isUrlValid: false,
  isLoading: false,
  url: '',
  robotWhiteIcon: '',
  googleFormsIcon: '',
  closeIcon: ''
}



describe('URLs', () => {
  test('url is empty by default', () => {
    wrapper = mount(Component, {
      mocks: {
        $store: {
          getters: {
            ...__mockGetters,
            isUrlEmpty: true,
          }
        }

      }   
    });
      expect(wrapper.find(".form-instruction-title").text()).toBe('Enter your Google form url');
  });

  test('invalid URL', () => {
    wrapper = mount(Component, {
      mocks: {
        $store: {
          getters: {
            ...__mockGetters,
            error: 'Paste or type a valid Google form url here',
            isUrlEmpty: false,
            url: 'xoxo',
          }
        }

      }   
    });
      expect(wrapper.find(".cb-invalid-message").classes()).toContain('cb-invalid-message');
  });

  test('valid URL', () => {
    wrapper = mount(Component, {
      mocks: {
        $store: {
          getters: {
            ...__mockGetters,
            isUrlEmpty: false,
            isUrlValid: true,
            url: 'https://docs.google.com/forms/d/1koeuPnVQiLFpISCK8ndS1jTarVGFbIVJw6alcNvZypI/edit',
          }
        }

      }   
    });
      expect(wrapper.find("#form-to-chat__form").classes()).toContain('cb-success');
  });

  test('clearing a URL',async () => {
    wrapper = mount(Component, {
      mocks: {
        $store: {
          getters: {
            ...__mockGetters,
          }
        }

      }   
    });
      await wrapper.find(".cb-form-input").setValue("booo")
      await wrapper.vm.$nextTick()
      await wrapper.find('.form-to-chat__form-clear-input-button').trigger('click')
      expect(wrapper.find(".cb-form-input").element.value).toContain('cb');
  });

});