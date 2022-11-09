import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  addToBasket,
  selectBasketItemsWithId,
} from "../slices/basketSlice";

const DishRow = ({ id, name, short_description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, short_description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed((curr) => !curr)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{short_description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="INR" />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={!items.length}
            >
              <AntDesign
                name="minuscircle"
                color={items.length > 0 ? "#E33342" : "gray"}
                size={30}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <AntDesign name="pluscircle" color="#E33342" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
