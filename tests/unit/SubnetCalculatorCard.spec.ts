import { assert } from 'chai'
import { mount } from '@vue/test-utils'
import SubnetCalculatorCard from '@/components/SubnetCalculatorCard.vue'

function mountComponent () {
    return mount(SubnetCalculatorCard,  {
        props: {
            title: 'Test'
        }
    })
}

describe('SubnetCalculatorCard Testing', () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let wrapper: any;

    beforeEach(() => {
        wrapper = mountComponent()
    })

    it('should render SubnetCalculatorCard', () => {
        assert.isTrue(wrapper.exists())
        const wraperHtml = wrapper.html()
        assert.ok(wraperHtml.includes('Test'))
        assert.isTrue(wrapper.findComponent('[data-testid="ipaddress"]').exists())
        assert.isTrue(wrapper.findComponent('[data-testid="subnetmask"]').exists())
        assert.isTrue(wrapper.findComponent('[data-testid="maskbits"]').exists())
        assert.isTrue(wrapper.findComponent('[data-testid="subnetid"]').exists())
        assert.isTrue(wrapper.findComponent('[data-testid="broadcast"]').exists())
        assert.isTrue(wrapper.findComponent('[data-testid="maxhosts"]').exists())
        assert.isTrue(wrapper.findComponent('[data-testid="maxsubnets"]').exists())   
    })

    it('should render error message on IPAddress input (invalid input)', async () => {
        const input = wrapper.findComponent('[data-testid="ipaddress"]')
        await input.setValue('omer')
        await input.trigger('change')
        assert.isTrue(wrapper.html().includes('IP Address is invalid'))
    })
    
    it('should render error message on subnetMask input (invalid input)', async () => {
        const input = wrapper.findComponent('[data-testid="subnetmask"]')
        await input.setValue('omer')
        await input.trigger('change')
        assert.isTrue(wrapper.html().includes('Subnet Mask is invalid'))
    })

    it('should automatically set mask bits fieled when subnet mask is valid', async () => {
        const input = wrapper.findComponent('[data-testid="subnetmask"]')
        await input.setValue('255.255.255.0')
        await input.trigger('change')
        const maskbitsselect = wrapper.findComponent('[data-testid="maskbits"]').get('select')
        assert.equal(parseInt(maskbitsselect.element.value), 24)
    })

    it('should automatically set subnet mask input when maskbits select is changed', async () => {
        const maskbitsselect = wrapper.findComponent('[data-testid="maskbits"]')
        await maskbitsselect.setValue(24)
        await maskbitsselect.trigger('input')
        const input = wrapper.findComponent('[data-testid="subnetmask"]')
        assert.equal(input.get('input').element.value, '255.255.255.0')
    })

    it('should calcaulate subnet id, broadcast, max hosts and max subnets', async () => {
        const ip = wrapper.findComponent('[data-testid="ipaddress"]')
        const sm = wrapper.findComponent('[data-testid="subnetmask"]')
        const sid = wrapper.findComponent('[data-testid="subnetid"]')
        const br = wrapper.findComponent('[data-testid="broadcast"]')
        const mh = wrapper.findComponent('[data-testid="maxhosts"]')
        const ms = wrapper.findComponent('[data-testid="maxsubnets"]')
        await ip.setValue('192.168.6.1')
        await sm.setValue('255.255.255.0')
        await ip.trigger('change')
        assert.equal(sid.get('input').element.value, '192.168.6.0')
        assert.equal(br.get('input').element.value, '192.168.6.255')
        assert.equal(mh.get('input').element.value, '254')
        assert.equal(ms.get('input').element.value, '256')
    })

    it('should calcaulate subnet id, broadcast, max hosts and max subnets', async () => {
        const ip = wrapper.findComponent('[data-testid="ipaddress"]')
        const mb = wrapper.findComponent('[data-testid="maskbits"]')
        const sid = wrapper.findComponent('[data-testid="subnetid"]')
        const br = wrapper.findComponent('[data-testid="broadcast"]')
        const mh = wrapper.findComponent('[data-testid="maxhosts"]')
        const ms = wrapper.findComponent('[data-testid="maxsubnets"]')
        await ip.setValue('192.168.6.1')
        await mb.setValue('25')
        await ip.trigger('change')
        await mb.trigger('change')
        assert.equal(sid.get('input').element.value, '192.168.6.0')
        assert.equal(br.get('input').element.value, '192.168.6.127')
        assert.equal(mh.get('input').element.value, '126')
        assert.equal(ms.get('input').element.value, '128')
    })
})