import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../Components/Layout/Helpers";
import { useCreateProductMutation, useGetProductsQuery } from "../Apis/productApi";
import { useDispatch } from "react-redux";
import { setProduct } from "../Redux/productSlice";
import { ColourTagsInput } from "../Components/Layout/Page/Product/CreateProduct";
import { apiResponse } from "../Interfaces";
import { useNavigate } from "react-router-dom";
import { useGetColoursQuery } from "../Apis/colourApi";
import { useGetProductTypesQuery } from "../Apis/productTypeApi";

const productData = {
  name: "",
  productTypeId: "",
  colourIds: [],
};

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createProduct] = useCreateProductMutation();
  const [loading, setLoading] = useState(false);
  const [productInputs, setProductInput] = useState(productData);
  const [productTypes, setProductTypes] = useState<{ id: number; name: string }[]>([]);
  const [colours, setColours] = useState<{ id: number; name: string }[]>([]);
  const [selectedColourNames, setSelectedColourNames] = useState<string[]>([]);
  const { data: productsData } = useGetProductsQuery(null);
  const { data: coloursData } = useGetColoursQuery(null);
  const { data: productTypesData } = useGetProductTypesQuery(null);


  useEffect(() => {
    if (productsData?.result && coloursData?.result && productTypesData?.result) {
      dispatch(setProduct(productsData.result));
      setColours(coloursData);
      setProductTypes(productTypesData);

      console.log(productsData.result);
      console.log(coloursData.result);
      console.log(productTypesData.result);
      
      setProductTypes(Array.from(productTypesData.result.values()));
      setColours(Array.from(coloursData.result.values()));
    }
  }, [productsData, dispatch, coloursData, productTypesData]);

  const handleProductInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tempData = inputHelper(e, productInputs);
    setProductInput(tempData);
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response : apiResponse = await createProduct({
      name: productInputs.name,
      productTypeId: productInputs.productTypeId,
      colourIds: selectedColourNames
    });
    if(response.data) {
      toastNotify("Item added successfully!");
      navigate("/");
    } else if (response.error) {
      const errorMessages = response.error.data?.ErrorMessages ?? ["Something went wrong."];
      const message = Array.isArray(errorMessages) ? errorMessages[0] : String(errorMessages);
      toastNotify(message, "error");
    }
    setLoading(false);
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="offset-2 px-2 text-black">Add Product</h3>
      <form method="post" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={productInputs.name}
              onChange={handleProductInput}
            />
            <select
              className="form-control mt-3 form-select"
              required
              name="productTypeId"
              value={productInputs.productTypeId}
              onChange={handleProductInput}
            >
              <option value="" disabled>
                -- Select Product Type --
              </option>
              {productTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <div className="mt-3">
                <ColourTagsInput
                  onChange={setSelectedColourNames}
                  options={colours}
                />
            </div>            
            <div className="text-center">
              <button
                type="submit"
                style={{ width: "50%" }}
                className="btn btn-success mt-5"
                disabled={loading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
