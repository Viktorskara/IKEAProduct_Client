import productTypeModel from "./productType"

export default interface productModel {
  id: number
  name: string
  productType: productTypeModel
  colours: string[]
  createdDate: string
}
