import React, { useState } from "react";
import OrderStep from "../../components/OrderStep.jsx";
import {createOrderSteps} from "../../constant/orderConstant.js"
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import { addShippingInfo } from "../../redux/slice/orderSlice.js";
import { useDispatch } from "react-redux";

const ShippingPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [contryCode, setCountryCode] = useState("AF");
  const dispatch = useDispatch();

  const handelShippingInfo = (data) => {
    // console.log(data)
    dispatch(addShippingInfo(data));
    localStorage.setItem("shipingInfo", JSON.stringify(data))
    navigate("/order/confirm")
  };

  const handelState = (e) => {
    const selectCountry = Country.getAllCountries().find(
      (country) => country.name == e.target.value,
    );
    setCountryCode(selectCountry.isoCode);
  };

  return (
    <div className="mt-[100px]">
      <OrderStep active={0} steps={createOrderSteps}/>

      <form
        className="px-6 max-w-[800px] mt-16 lg:mx-auto"
        onSubmit={handleSubmit(handelShippingInfo)}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 bg-white px-6 pt-10">
            <h2 className="font-semibold leading-7 text-gray-900 text-center text-2xl">
              Shipping Information
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("address")}
                    type="text"
                    autoComplete="email"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    {...register("city")}
                    id="city"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("pincode")}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    {...register("phoneNumber")}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347] sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    {...register("country")}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347] sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => handelState(e)}
                  >
                    {Country.getAllCountries().map((country) => (
                      <option>{country.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <select
                    type="text"
                    {...register("state")}
                    id="region"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347] sm:text-sm sm:leading-6"
                  >
                    {
                      State.getStatesOfCountry(contryCode).map((state) => (
                        <option>{state.name}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingPage;
