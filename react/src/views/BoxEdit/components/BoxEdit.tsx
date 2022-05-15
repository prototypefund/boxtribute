import {
  Box,
  List,
  ListItem,
  Heading,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import { Select, OptionBase, GroupBase } from "chakra-react-select";

import React, { useState } from "react";
import {
  BoxByLabelIdentifierAndAllProductsQuery,
  UpdateLocationOfBoxMutation,
} from "types/generated/graphql";
import { Control, Controller, useForm } from "react-hook-form";
import useToggle from "utils/helper-hooks";

interface BoxEditProps {
  boxData:
    | BoxByLabelIdentifierAndAllProductsQuery["box"]
    | UpdateLocationOfBoxMutation["updateBox"];
  allProducts:
    | BoxByLabelIdentifierAndAllProductsQuery["products"]["elements"];
}

// const ProductsDropdown = ({products, control}: {products: BoxByLabelIdentifierAndAllProductsQuery["products"]["elements"], control: Control<{ products: BoxByLabelIdentifierAndAllProductsQuery["products"]["elements"]; }, any>}) => {

//   return (
//     <Controller
//     control={control}
//     name="products"
//     rules={{ required: "Please enter at least one food group." }}
//     render={({
//       field: { onChange, onBlur, value, name, ref },
//       fieldState: { invalid, error }
//     }) => (
//       <FormControl py={4} isInvalid={invalid} id="products">
//         <FormLabel>Products</FormLabel>

//         <Select
//           isMulti
//           name={name}
//           ref={ref}
//           onChange={onChange}
//           onBlur={onBlur}
//           value={value}
//           options={products}
//           placeholder="Food Groups"
//           closeMenuOnSelect={false}
//         />

//         <FormErrorMessage>{error && error.message}</FormErrorMessage>
//       </FormControl>
//     )}
//   />
//   )
// }


const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);


const BoxEdit = ({
  boxData,
  allProducts,
}: // onMoveToLocationClick: moveToLocationClick,
BoxEditProps) => {
  interface ProductOptionsGroup extends OptionBase {
    value: string;
    label: string;
  }

  interface FormValues {
    size?: string | null;
    productsForDropdown: ProductOptionsGroup;
  }

  const productsGroupedByCategory = groupBy(allProducts, (product) => product.category.name);

  const productsForDropdownGroups = Object.keys(productsGroupedByCategory).map((key) => {
     const productsForCurrentGroup = productsGroupedByCategory[key];
    return {
      label: key,
      options: productsForCurrentGroup.map((product) => ({
        value: product.id,
        // label: `${product.category.name}: ${product.name}`,
        label: `${product.name}`,
      })).sort((a, b) => a.label.localeCompare(b.label)),
    };
  }).sort((a, b) => a.label.localeCompare(b.label));

  
  // .map((group, key) => ({
  //   value: key,
  //   label: group.,
  // })
    
  //   .map((p) => ({
  //   value: p.id,
  //   label: p.gender != null ? `${p.name} (${p.gender})` : p.name,
  // }));


  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      size: boxData?.size,
      productsForDropdown: productsForDropdownGroups?.flatMap(i => i.options)
      .find(
        (p) => p.value === boxData?.product?.id
      ),
    },
  });

  const onSubmitEditForm = (values) => {
    alert(JSON.stringify(values));
  };

  if (boxData == null) {
    console.error("BoxDetails Component: boxData is null");
    return <Box>No data found for a box with this id</Box>;
  }

  if (productsForDropdownGroups == null) {
    console.error("BoxDetails Component: allProducts is null");
    return (
      <Box>
        There was an error: the available products to choose from couldn't be
        loaded!
      </Box>
    );
  }

  return (
    <Box>
      <Text
        fontSize={{ base: "16px", lg: "18px" }}
        fontWeight={"500"}
        textTransform={"uppercase"}
        mb={"4"}
      >
        Box Details
      </Text>

      <form onSubmit={handleSubmit(onSubmitEditForm)}>
        <List spacing={2}>
          <ListItem>
            <Text as={"span"} fontWeight={"bold"}>
              Box Label:
            </Text>{" "}
            {boxData.labelIdentifier}
          </ListItem>
          <ListItem>
            <Controller
              control={control}
              name="productsForDropdown"
              rules={{ required: "Please enter at least one food group." }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, error },
              }) => (
                <FormControl py={4} isInvalid={invalid} id="products">
                  <FormLabel>Products</FormLabel>

                  <Select
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={productsForDropdownGroups}
                    placeholder="Product"
                    // searchable={true}
                    // closeMenuOnSelect={false}
                  />

                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </ListItem>
          <ListItem>
            <FormControl isInvalid={!!errors?.size}>
              <FormLabel htmlFor="size" fontWeight={"bold"}>
                Size:
              </FormLabel>
              <Input
                id="size"
                // ref={register}
                {...register("size", {
                  required: "This is required",
                })}
              />
              <FormErrorMessage>
                {errors.size && errors.size.message}
              </FormErrorMessage>
            </FormControl>
          </ListItem>
          <ListItem>
            <Text as={"span"} fontWeight={"bold"}>
              Items:
            </Text>{" "}
            {boxData.items}
          </ListItem>
          <ListItem>
            <Text as={"span"} fontWeight={"bold"}>
              Location:
            </Text>{" "}
            {boxData.location?.name}
          </ListItem>
        </List>
        {/* </Flex> */}
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Update Box
        </Button>
      </form>
    </Box>
  );
};

export default BoxEdit;
