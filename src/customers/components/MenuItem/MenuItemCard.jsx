import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../State/Customers/Cart/cart.action";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MenuItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  // Debug logs
  console.log("Current item:", item);
  console.log("Item ingredients:", item?.ingredients);

  const handleCheckboxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };
  
  const handleAddItemToCart = (e) => {
    e.preventDefault(); 
    const data = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        menuItemId: item.id,
        quantity: 1,
        ingredients: selectedIngredients
      },
    };
    dispatch(addItemToCart(data));
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:space-x-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt={item.name}
            />

            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>${item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            <div className="pr-5">
              <Typography variant="h6" className="mb-2">
                Ingredients
              </Typography>
              <FormGroup>
                {item?.ingredients?.map((ingredient, index) => (
                  <FormControlLabel
                    key={ingredient.id || index}
                    control={
                      <Checkbox
                        checked={selectedIngredients.includes(ingredient.name)}
                        onChange={() => handleCheckboxChange(ingredient.name)}
                        disabled={!ingredient.inStoke}
                      />
                    }
                    label={
                      <Typography>
                        {ingredient.name}
                        {!ingredient.inStoke && 
                          <span className="text-red-500 ml-2">(Out of stock)</span>
                        }
                      </Typography>
                    }
                  />
                ))}
              </FormGroup>
            </div>
          </div>

          <div className="pt-5">
            <Button 
              variant="contained" 
              disabled={!item.available} 
              type="submit"
              color="primary"
              fullWidth
            >
              {item.available ? "Add To Cart" : "Out of stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuItemCard;