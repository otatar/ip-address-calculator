import {assert } from 'chai'
import IpAddress  from '@/classes/IpAddress'

describe('Testing IpAddress Class', () => {

    it('should create IpAddress object', () => {
        const ip = new IpAddress('192.168.6.1')
        assert.typeOf(ip, 'object');
    })

    it('should not create IpAddress object, input: omer', () => {
        try {
            new IpAddress('omer')
        } catch(e) {
            if(e instanceof Error) {
                assert.isString(e.message)
                assert.match(e.message, /^Not a valid/)
            }
        }
    })

    it('should not create IpAddress object, input: ', () => {
        try {
            new IpAddress('')
        } catch(e) {
            if(e instanceof Error) {
                assert.isString(e.message)
                assert.match(e.message, /^Not a valid/)
            }
        }
    })

    it('should not create IpAddress object, input: 192.168.a', () => {
        try {
            new IpAddress('')
        } catch(e) {
            if(e instanceof Error) {
                assert.isString(e.message)
                assert.match(e.message, /^Not a valid/)
            }
        }
    })

    it('should return ip address string', () => {
        const ip = new IpAddress("192.168.6.1")
        assert.isString(ip.toString())
        assert.equal(ip.toString(), '192.168.6.1')
    })

    it('should return ip address integer', () => {
        const ip = new IpAddress("192.168.6.1")
        assert.isNumber(ip.toInteger())
        assert.equal(ip.toInteger(), 3232237057)
    })

    it('should return ip address hex', () => {
        const ip = new IpAddress("192.168.6.1")
        assert.isString(ip.toHex())
        assert.equal(ip.toHex(), '0xC0A80601')
    })

    it('should return ip address binary', () => {
        const ip = new IpAddress("192.168.6.1")
        assert.isString(ip.toBinary())
        assert.lengthOf(ip.toBinary(), 32)
    })

    it('should convert integer to ip address string: 3232237057', () => {
        const ip = IpAddress.intToString(3232237057)
        assert.isString(ip)
        assert.equal(ip, '192.168.6.1')
    })

    it('should convert integer to ip address string: 0', () => {
        const ip = IpAddress.intToString(0)
        assert.isString(ip)
        assert.equal(ip, '0.0.0.0')
    })

    it('should convert integer to ip address string: 1', () => {
        const ip = IpAddress.intToString(1)
        assert.isString(ip)
        assert.equal(ip, '0.0.0.1')
    })

    it('should convert integer to ip address string: -45', () => {
        const ip = IpAddress.intToString(-45)
        assert.isString(ip)
        assert.equal(ip, '0.0.0.45')
    })
    
})