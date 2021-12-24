export default class IpAddress {
    protected firstOctet = 0;
    protected secondOctet = 0;
    protected thirdOctet = 0;
    protected fourthOctet = 0;
  
    constructor(protected ipAddress: string) {
      this.parse();
    }
  
    protected validate(): boolean {
      const octets = this.ipAddress.split('.');
      if (octets.length != 4) return false;
      for (const octet of octets) {
        if (
          isNaN(parseInt(octet)) ||
          parseInt(octet) < 0 ||
          parseInt(octet) > 255
        ) {
          return false;
        }
      }
      return true;
    }
  
    protected parse(): void {
      if (this.validate()) {
        const [first, second, third, fourth] = this.ipAddress.split('.');
        this.firstOctet = parseInt(first);
        this.secondOctet = parseInt(second);
        this.thirdOctet = parseInt(third);
        this.fourthOctet = parseInt(fourth);
      } else {
        throw new Error('Not a valid IP address!');
      }
    }
  
    public toString(): string {
      return this.ipAddress;
    }
  
    public toInteger(): number {
      return (
        this.firstOctet * 256 ** 3 +
        this.secondOctet * 256 ** 2 +
        this.thirdOctet * 256 +
        this.fourthOctet
      );
    }
  
    public toHex(): string {
      return '0x' + this.toInteger().toString(16).toUpperCase();
    }
  
    public toBinary(): string {
      return this.toInteger().toString(2);
    }
  
    static intToString(int: number): string {
      int = Math.abs(int);
      const first = Math.floor(int / 256 ** 3);
      int = int % 256 ** 3;
      const second = Math.floor(int / 256 ** 2);
      int = int % 256 ** 2;
      const third = Math.floor(int / 256);
      const fourth = int % 256;
  
      return [first, second, third, fourth].join('.');
    }
  
    public getOctets(): number[] {
      return [
        this.firstOctet,
        this.secondOctet,
        this.thirdOctet,
        this.fourthOctet,
      ];
    }
  
    public info(): string {
      console.log(`String: ${this.ipAddress}
                   Octets: ${this.firstOctet}, ${this.secondOctet}, ${
        this.thirdOctet
      }, ${this.fourthOctet}
                   Integer Value: ${this.toInteger()}
                   Hex Value: ${this.toHex()}`);
  
      return `String: ${this.ipAddress}
              <br />Integer Value: ${this.toInteger()}
              <br />Hex Value: ${this.toHex()} `;
    }
  }
  