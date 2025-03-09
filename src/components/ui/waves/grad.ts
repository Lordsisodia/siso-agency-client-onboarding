
/**
 * Grad class for Perlin noise gradient calculations
 */
export class Grad {
  x: number
  y: number 
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  dot2(x: number, y: number) {
    return this.x * x + this.y * y
  }
}
