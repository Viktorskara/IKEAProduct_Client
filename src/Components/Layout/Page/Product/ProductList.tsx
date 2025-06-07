import React, { useEffect } from "react";
import { productModel } from "../../../../Interfaces";
import { colourMap } from "../../../../Assets";
import { useGetProductsQuery } from "../../../../Apis/productApi";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../../Redux/productSlice";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductsQuery(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.result) {
      dispatch(setProduct(data.result));
    }
  }, [isLoading, data?.result, dispatch]);

  const skeletonRows = Array.from({ length: 5 });

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="text-black">Product List</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate("/createProduct")}
        >
          Add New Product
        </button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Type</th>
              <th scope="col">Colours</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              skeletonRows.map((_, index) => (
                <tr key={index} className="animate-pulse">
                  {[...Array(4)].map((__, i) => (
                    <td key={i} className="px-4 py-4">
                      <div className="w-4 h-4 bg-gray-300 rounded border border-gray-400" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data?.result?.length > 0 ? (
              data.result.map((product: productModel, index: number) => (
                <tr key={index}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.productType.name}</td>
                  <td>
                    {product.colours?.map((colour, idx) => {
                      const hexColor = colourMap[colour.name] || colour.name;
                      return (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: hexColor,
                              width: "16px",
                              height: "16px",
                              borderRadius: "4px",
                              marginRight: "8px",
                              border: "1px solid #ccc",
                            }}
                          />
                          <span>{colour.name}</span>
                        </div>
                      );
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
