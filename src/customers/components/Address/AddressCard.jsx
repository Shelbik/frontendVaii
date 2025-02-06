import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

const AddressCard = ({ item, handleSelectAddress, showButton }) => {
  return (
      <Card className="flex flex-col justify-center p-5 w-64">
          <div className="space-y-3">
              <p className="font-semibold">{item.fullName}</p>
              <p>{item.streetAddress}</p>
              <p>{item.city}, {item.state}</p>
              <p>{item.postalCode}</p>
              {showButton && (
                  <Button
                      onClick={() => handleSelectAddress(item)}
                      variant="contained"
                      fullWidth
                  >
                      Deliver Here
                  </Button>
              )}
          </div>
      </Card>
  );
};

export default AddressCard;
