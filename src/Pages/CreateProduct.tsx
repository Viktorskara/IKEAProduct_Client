import React, { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../Components/Layout/Helpers";
import { useCreateProductMutation, useGetProductsQuery } from "../Apis/productApi";
import { useDispatch } from "react-redux";
import { setProduct } from "../Redux/productSlice";
import { ColourTagsInput } from "../Components/Layout/Page/Product/CreateProduct";
import { apiResponse } from "../Interfaces";
import { useNavigate } from "react-router-dom";

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
  const [productTypes, setProductTypes] = useState<
    { id: number; name: string }[]
  >([]);
  const [colours, setColours] = useState<{ id: number; name: string }[]>([]);
  const [selectedColourNames, setSelectedColourNames] = useState<string[]>([]);
  const { data } = useGetProductsQuery(null);

  useEffect(() => {
    if (data && data?.result) {
      dispatch(setProduct(data.result));

      console.log(data.result);

      const types = data.result.map((product: any) => product.productType);
      const uniqueTypesMap = new Map<number, { id: number; name: string }>();
      types.forEach((type: { id: number; name: string }) => {
        if (type && !uniqueTypesMap.has(type.id)) {
          uniqueTypesMap.set(type.id, type);
        }
      });
      setProductTypes(Array.from(uniqueTypesMap.values()));

      setColours(data.result.colours || []);
      console.log(data.result.colours);
    }
  }, [data]);

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
      name: productData.name,
      productTypeId: productInputs.productTypeId,
      colourIds: selectedColourNames
    });
    if(response.data) {
      toastNotify("Item added successfully!");
      navigate("/Home");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
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
              value={productData.name}
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
                <ColourTagsInput onChange={setSelectedColourNames} />
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
