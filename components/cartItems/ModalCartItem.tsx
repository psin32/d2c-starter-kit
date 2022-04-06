import React, { useState, useEffect, useMemo } from "react";
import { getHierarchies } from "../../services/navigation";
import QuantityHandler from "../quantityHandler/QuantityHandler";
import {
  Text,
  Button,
  useColorModeValue,
  Grid,
  GridItem,
  Heading,
  Divider,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { useCartData } from "../../context/state";
import Image from "next/image";

export default function ModalCartItems() {
  const { cartData } = useCartData();

  return (
    <>
      {cartData && cartData.length > 0 ? (
        <>
          {cartData.map((item, index) => (
            <>
              <Grid my="4" templateColumns="1fr 3fr" gap={1}>
                <GridItem alignSelf="center">
                  {item.image && item.image.href && (
                    <Image
                      src={item.image.href}
                      alt="Vercel Logo"
                      width={56}
                      height={56}
                      objectFit="fill"
                    />
                  )}
                </GridItem>
                <GridItem>
                  <Heading size="xs" mb="4px">
                    {item.name}
                  </Heading>
                  <Text mb="4px">
                    {item.meta.display_price.without_tax.value.formatted}
                  </Text>
                  <QuantityHandler item={item} size="xs" />
                </GridItem>
              </Grid>
              <Divider />
            </>
          ))}
        </>
      ) : (
        <Flex
          flexDirection="column"
          gap={4}
          justifyContent="center"
          height="100%"
        >
          <Text textAlign="center">You have no items in your cart!</Text>
          <Link href={"/"}>
            <Button
              _hover={{
                color: "blue.700",
                boxShadow: "lg",
              }}
              width="100%"
              colorScheme={useColorModeValue("blue.900", "blue.50")}
              variant="outline"
            >
              Start Shopping
            </Button>
          </Link>
        </Flex>
      )}
    </>
  );
}