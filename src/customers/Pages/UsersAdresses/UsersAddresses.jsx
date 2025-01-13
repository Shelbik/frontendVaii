import React from "react";
import AddressCard from "../../components/Address/AddressCard";
import { useSelector } from "react-redux";

const UsersAddresses = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div>
      <div className="flex items-center flex-col lg:px-10">
        <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>
        <div className="flex justify-center flex-wrap gap-3">
          {/* Check if auth.user and auth.user.addresses are defined and not empty */}
          {auth?.user?.addresses?.length > 0 ? (
            auth.user.addresses.map((item, index) => (
              <AddressCard key={index} item={item} />
            ))
          ) : (
            <p>No addresses available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersAddresses;
