import IpAddress from './IpAddress';
import subnetMaskOptions from './subnet-mask-options';

export default class SubnetMask extends IpAddress {
  protected validate(): boolean {
    if (subnetMaskOptions.filter((sm) => sm.mask == this.ipAddress).length) {
      return true;
    }
    return false;
  }

  protected parse(): void {
    if (this.validate()) {
      const [first, second, third, fourth] = this.ipAddress.split('.');
      this.firstOctet = parseInt(first);
      this.secondOctet = parseInt(second);
      this.thirdOctet = parseInt(third);
      this.fourthOctet = parseInt(fourth);
    } else {
      throw new Error('Not a valid address of subnet mask!');
    }
  }

  public toMaskBits(): number {
    return subnetMaskOptions.filter((sm) => sm.mask == this.ipAddress)[0].maskBits
  }
}
