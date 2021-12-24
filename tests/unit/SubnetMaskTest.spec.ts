import {assert } from 'chai'
import SubnetMask  from '@/classes/SubnetMask'

describe('Testing SubnetMask Class', () => {

    it('should create SbubnetMask object', () => {
        const sm = new SubnetMask('255.255.255.0')
        assert.typeOf(sm, 'object');
    })

    it('should not create SubnetMask object, input: omer', () => {
        try {
            new SubnetMask('omer')
        } catch(e) {
            if(e instanceof Error) {
                assert.isString(e.message)
                assert.match(e.message, /^Not a valid/)
            }
        }
    })

    it('should not create SubnetMask object, input: 192.168.6.1', () => {
        try {
            new SubnetMask('192.168.6.1')
        } catch(e) {
            if(e instanceof Error) {
                assert.isString(e.message)
                assert.match(e.message, /^Not a valid/)
            }
        }
    })

    it('should not create SubnetMask object, input: ', () => {
        try {
            new SubnetMask('')
        } catch(e) {
            if(e instanceof Error) {
                assert.isString(e.message)
                assert.match(e.message, /^Not a valid/)
            }
        }
    })

    it('should return mask bits number: 24', () => {
        const sm = new SubnetMask('255.255.255.0')
        assert.isNumber(sm.toMaskBits());
        assert.equal(sm.toMaskBits(), 24)
    })

    it('should return mask bits number: 27', () => {
        const sm = new SubnetMask('255.255.255.224')
        assert.isNumber(sm.toMaskBits());
        assert.equal(sm.toMaskBits(), 27)
    })

})
