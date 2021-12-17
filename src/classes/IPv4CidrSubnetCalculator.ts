import IpAddress from './IpAddress';
import SubnetMask from './SubnetMask';

export default class IPv4SubnetCalculator {
  private ipAddress: IpAddress;
  private subnetMask: SubnetMask;

  constructor(ip: string, sm: string) {
    this.ipAddress = new IpAddress(ip);
    this.subnetMask = new SubnetMask(sm);
  }

  public ipAddressInfo() {
    return {
      ip: this.ipAddress.toString(),
      int: this.ipAddress.toInteger(),
      hex: this.ipAddress.toHex(),
    };
  }

  public subnetMaskInfo() {
    return {
      ip: this.subnetMask.toString(),
      int: this.subnetMask.toInteger(),
      hex: this.subnetMask.toHex(),
      mask: this.subnetMask.toMaskBits(),
    };
  }

  public subnetID(): string {
    const ipAddressOctets = this.ipAddress.getOctets()
    const subnetMaskOctets = this.subnetMask.getOctets()
    let subnetID = '';
    ipAddressOctets.forEach((octet, i) => {
      subnetID += (octet & subnetMaskOctets[i]).toString() + '.'
    })

    return subnetID.substring(0, subnetID.length - 1)
  }

  public broadcastAddress(): string {
    const ipBitString = this.ipAddress.toBinary();
    const smBitString = this.subnetMask.toBinary();
    let broadCastString = ''
    ipBitString.split('').forEach((el, i) => {
      broadCastString += this.bitWiseOr(el, this.bitWiseNot(smBitString[i]))
    })    
    return IpAddress.intToString(parseInt(broadCastString, 2))
  }

  public hostRange(): string {
    const firstHost = new IpAddress(this.subnetID()).toInteger() + 1
    const lastHost = new IpAddress(this.broadcastAddress()).toInteger() - 1

    return IpAddress.intToString(firstHost) + ' - ' + IpAddress.intToString(lastHost)
  }

  public maxHosts(): number {
    return new IpAddress(this.broadcastAddress()).toInteger() - new IpAddress(this.subnetID()).toInteger() - 1
  }

  public maxSubnets(): number {
    return new IpAddress(this.broadcastAddress()).toInteger() - new IpAddress(this.subnetID()).toInteger() + 1
  }
  
  private bitWiseNot(c: string): string {
    if(c === '1') {
      return '0'
    }
    return '1'
  }

  private bitWiseOr(a: string, b: string): string {
    if(a === '1' || b === '1') {
      return '1'
    }
    return '0'
  }

  public subnetCalculatorInfo() {
    return {
      ipAddressCidr: this.ipAddress.toString() + "/" + this.subnetMask.toMaskBits(),
      subnetID: this.subnetID(),
      broadcast: this.broadcastAddress(),
      hostRange: this.hostRange(),
      maxHosts: this.maxHosts(),
      maxSubnets: this.maxSubnets()
    }
  }


}
