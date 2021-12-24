import {assert } from 'chai'
import IPv4SubnetCalculator  from '@/classes/IPv4CidrSubnetCalculator'

describe('Testing SubnetCalculator Class', () => {

    it('should create SubnetCalculator object', () => {
        const sc = new IPv4SubnetCalculator('192.168.6.1', '255.255.255.0')
        assert.isObject(sc)
    })

    it('should not create SubnetCalculator object, wrong ip address', () => {
        try {
            new IPv4SubnetCalculator('omer', '255.255.255.0')
        } catch(e) {
            if(e instanceof Error) assert.isString(e.message)
        }
    })

    it('should not create SubnetCalculator object, wrong subnet mask', () => {
        try {
            new IPv4SubnetCalculator('192.168.6.1', '255.fwqe.255.0')
        } catch(e) {
            if(e instanceof Error) assert.isString(e.message)
        }
    })

    it('should return subnet id string', () => {
        const sc = new IPv4SubnetCalculator('192.168.6.1', '255.255.255.0')
        assert.isString(sc.subnetID());
        assert.equal(sc.subnetID(), '192.168.6.0')
    })

    it('should return broadcast address string', () => {
        const sc = new IPv4SubnetCalculator('192.168.6.1', '255.255.255.0')
        assert.isString(sc.broadcastAddress());
        assert.equal(sc.broadcastAddress(), '192.168.6.255')
    })

    it('should return host range string', () => {
        const sc = new IPv4SubnetCalculator('192.168.6.1', '255.255.255.0')
        assert.isString(sc.hostRange());
    })

    it('should return max hosts', () => {
        const sc = new IPv4SubnetCalculator('192.168.6.1', '255.255.255.0')
        assert.isNumber(sc.maxHosts());
        assert.equal(sc.maxHosts(), 254)
    })

    it('should return max subnets', () => {
        const sc = new IPv4SubnetCalculator('192.168.6.1', '255.255.255.0')
        assert.isNumber(sc.maxSubnets());
        assert.equal(sc.maxSubnets(), 256)
    })

})