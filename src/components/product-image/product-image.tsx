import { Image, type ImageProps } from "@nextui-org/react";
import NextImage from "next/image";

import { isImageUnoptimized } from "@/site.config";

import { tv, type VariantProps } from "tailwind-variants";

const imageSizes = {
    preview: "144, (min-width: 376px) 192px",
    full: "279px, (min-width: 376px) 332px, (min-width: 429px) 384px",
};

export type ProductImageProps = ImageProps &
    ProductImageVariants & {
        /** @prop Will apply `sizes`, `width`, and `height` */
        size?: "preview" | "full";
    };

export function ProductImage(props: ProductImageProps) {
    const { src, alt, size, isBgStriped, isBordered, isZoomed, className } = props;

    const getDimensions = (axis: "width" | "height") => {
        switch (size) {
            case "preview":
                return 192;
            case "full":
                return 384;
            default:
                return props[axis];
        }
    };

    return (
        <Image
            as={NextImage}
            src={src}
            alt={alt}
            width={getDimensions("width")}
            height={getDimensions("height")}
            sizes={size ? imageSizes[size] : props.sizes}
            classNames={{
                wrapper: imageWrapper({ isBgStriped, isBordered, className }),
            }}
            isZoomed={isZoomed}
            unoptimized={isImageUnoptimized}
            {...props}
        />
    );
}

const imageWrapper = tv({
    variants: {
        /** @prop Use when image bg is transparent */
        isBgStriped: {
            true: "data-[loaded=true]:bg-stripe-gradient",
        },
        isBordered: {
            true: "ring-1 ring-default/40",
        },
    },
});

export type ProductImageVariants = VariantProps<typeof imageWrapper>;
