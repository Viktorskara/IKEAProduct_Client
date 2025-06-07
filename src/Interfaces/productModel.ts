import Colour from "./ColourModel"
import productTypeModel from "./productTypeModel"

export default interface productModel {
  id: number
  name: string
  productType: productTypeModel
  colours: Colour[]
  createdDate: string
}
