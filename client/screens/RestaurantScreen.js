import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import { Feather, Ionicons } from "@expo/vector-icons";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      image,
      name,
      rating,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        image,
        name,
        rating,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View>
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 rounded-full bg-gray-100"
          >
            <Ionicons name="arrow-back" size={20} color="#E33342" />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="star" size={22} opacity={0.5} color="#fcc203" />
                <Text className="text-xs text-gray-500">
                  <Text className="text-yellow-500">{rating}</Text> • Offers
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Ionicons
                  name="location-outline"
                  size={22}
                  opacity={0.4}
                  color="gray"
                />
                <Text className="text-xs text-gray-500">
                  Nearby • {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <Ionicons
              name="help-circle-outline"
              size={20}
              opacity={0.6}
              color="gray"
            />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <Feather name="chevron-right" size={20} color="#E33342" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-3 mb-3 font-bold text-xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow key={dish._id} id={dish._id} {...dish} />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
