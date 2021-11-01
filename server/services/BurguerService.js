
import { BadRequest } from '../utils/Errors'

const fakeShack = {
  burguers: [
    {
      id: 1,
      name: 'Monster Burguer',
      pattys: '4',
      bacon: 'A lot',
      price: 15
    },
    {
      id: 2,
      name: 'Girly Burguer',
      pattys: 'half',
      bacon: '2 pieces',
      price: 5
    },
    {
      id: 3,
      name: 'Vegan',
      pattys: '0',
      bacon: '0',
      price: 3
    },
    {
      id: 4,
      name: 'Classic',
      pattys: '2',
      bacon: 'Satisfying Amount',
      price: 9
    }
  ]
}
class BurguerService {
  async getAllBurguers() {
    const burguers = await fakeShack
    return burguers
  }

  async createBurguer(burguerData) {
    burguerData.id = fakeShack.burguers.length.toString()
    await fakeShack.burguers.push(burguerData)
    return burguerData
  }

  async editBurguer(id, updatedBurguer) {
    const burguerIndex = await fakeShack.burguers.findIndex(b => b.id === id)
    if (burguerIndex === -1) { throw new BadRequest("there's no burguer with this ID") }
    fakeShack.burguers.splice(burguerIndex, 1, updatedBurguer)
    return updatedBurguer
  }

  async removeBurguer(id) {
    const burguerIndex = await fakeShack.burguers.findIndex(b => b.id === id)
    if (burguerIndex === -1) { throw new BadRequest("there's no burguer with this ID") }
    fakeShack.burguers.splice(burguerIndex, 1)
    return 'Burguer Removed'
  }
}

export const burguerService = new BurguerService()
