import { assert } from 'chai'
import { mount } from '@vue/test-utils'
import  BaseInput  from '@/components/BaseInput.vue'

describe('BaseInput Component Testing', () => {

    it('should create default component in DOM', () => {
        const wrapper = mount(BaseInput);
        assert.exists(wrapper.find('input'))
    })

    it('should create component with label in DOM', () => {
        const wrapper = mount(BaseInput, {
            props: {
                label: 'Label'
            }
        });
        assert.exists(wrapper.find('label'))
        assert.equal(wrapper.find('label').text(), 'Label')
        assert.isFalse(wrapper.findComponent('span').exists())
    })

    it('should create component with error span in DOM', () => {
        const wrapper = mount(BaseInput, {
            props: {
                error: 'Error'
            }
        });
        assert.exists(wrapper.find('span'))
        assert.equal(wrapper.find('span').text(), 'Error')
    })


    
})