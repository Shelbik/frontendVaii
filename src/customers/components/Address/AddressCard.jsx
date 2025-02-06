import { Button, Card } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
    return (
      <Card className="flex flex-col justify-between p-5 w-64 min-h-[200px]">
        <div className="space-y-3">
          <p className="font-semibold">{item.fullName}</p>
          <p>{item.streetAddress}</p>
          <p>{item.city}, {item.state}</p>
          <p>{item.postalCode}</p>
          <p>{item.country}</p>
        </div>
        {showButton && (
          <Button 
            variant="contained" 
            onClick={() => handleSelectAddress(item)}
            sx={{ marginTop: "1rem" }}
          >
            Deliver Here
          </Button>
        )}
      </Card>
    );
  };

export default AddressCard;
