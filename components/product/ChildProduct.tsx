import { Stack, SimpleGrid } from "@chakra-ui/react";
import type { File, ProductResponse, Variation } from "@moltin/sdk";
import { VariationSkuLookup } from "../../services/helper";
import CartActions from "./CartActions";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
import ProductSummary from "./ProductSummary";
import ProductVariations from "./ProductVariations";

interface IChildProductDetail {
  product: ProductResponse;
  baseProduct: ProductResponse;
  main_image: File | null;
  otherImages: File[];
  optionLookupObj: { [key: string]: string };
  skuLookup: VariationSkuLookup;
  handleAddToCart: () => void;
  variations: Variation[];
}

const ChildProductDetail = ({
  product,
  main_image,
  otherImages,
  handleAddToCart,
  optionLookupObj,
  baseProduct,
  skuLookup,
  variations,
}: IChildProductDetail): JSX.Element => {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      {main_image && (
        <ProductCarousel images={otherImages} mainImage={main_image} />
      )}
      <Stack spacing={{ base: 6, md: 10 }}>
        <ProductSummary product={product} />
        <ProductDetails product={product} />
        {variations && (
          <ProductVariations
            variations={variations}
            optionLookupDict={optionLookupObj}
            skuLookup={skuLookup}
            baseProductSlug={baseProduct.attributes.slug}
            currentSkuId={product.id}
          />
        )}
        <CartActions handleAddToCart={handleAddToCart} />
      </Stack>
    </SimpleGrid>
  );
};

export default ChildProductDetail;
