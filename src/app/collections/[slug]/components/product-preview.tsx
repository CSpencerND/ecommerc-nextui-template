"use client";

import { MotionListItem, type MotionListItemProps } from "@/components/motion";
import { Card, CardBody, CardFooter, type CardProps } from "@nextui-org/card";
import { Image, type ImageProps } from "@nextui-org/image";
import NextImage from "next/image";

import { useDeepCompareMemo } from "@react-hookz/web/esm/useDeepCompareMemo";
import { ProductPreviewProvider, useProductPreview } from "./product-preview-context";

import { card } from "@/styles";

export type ProductPreviewCardProps = CardProps & MotionListItemProps;

export function ProductPreviewCard(props: ProductPreviewCardProps) {
    const { className, children } = props;

    return (
        <Card
            as={MotionListItem}
            isFooterBlurred
            isPressable
            className={card.root({ radius: "xl", className })}
            {...props}
        >
            <ProductPreviewProvider>{children}</ProductPreviewProvider>
        </Card>
    );
}

export type ProductPreviewImageProps = {
    images: { src: string; alt: string }[];
};

export function ProductPreviewImages({ images }: ProductPreviewImageProps) {
    const { activeIndex } = useProductPreview();

    const imageComponents = useDeepCompareMemo(() => {
        return images.map((image, i) => (
            <Image
                key={i}
                as={NextImage}
                src={image.src}
                alt={image.alt}
                width={192}
                height={192}
                className={card.image()}
                isZoomed
            />
        ));
    }, [images]);

    return imageComponents[activeIndex] ?? null;
}

export type ProductPreviewBodyProps = ImageProps & {
    title?: string;
};

export function ProductPreviewBody({ title, children }: ProductPreviewBodyProps) {
    return (
        <CardBody>
            {children}
            <CardFooter className={card.title({ hasPadding: true })}>
                <h3>{title}</h3>
            </CardFooter>
        </CardBody>
    );
}

export function ProductPreviewFooter(props: React.ComponentPropsWithoutRef<"footer">) {
    return (
        <footer
            className="flex flex-col justify-center gap-3 px-3 pb-3"
            {...props}
        />
    );
}