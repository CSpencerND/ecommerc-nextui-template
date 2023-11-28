import { section, title } from "@/components/primitives";
import { ColorSwatchGroup, ColorSwatch } from "@collections/components/color-swatch";
import { MotionListItem } from "@collections/components/motion";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { ProductPreview } from "@collections/components/product-image";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getFakeData } from "@/faker/faker-functions";

import card from "@/styles/product-card";

export default async function CollectionPage() {
    const { name, description, items } = await getFakeData("collection");

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>{name}</h1>
                <p>{description}</p>
            </header>
            <menu className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
                {items.map((item, i) => (
                    <Card
                        as={MotionListItem}
                        key={i}
                        index={i}
                        isFooterBlurred
                        isPressable
                        className={card.root({ radius: "xl" })}
                    >
                        <CardBody>
                            <ProductPreview
                                images={item.images}
                                altTag={item.name}
                            />
                            {/* <Image */}
                            {/*     as={NextImage} */}
                            {/*     src={item.images[0]} */}
                            {/*     alt={item.name} */}
                            {/*     width={192} */}
                            {/*     height={192} */}
                            {/*     className={card.image()} */}
                            {/*     isZoomed */}
                            {/* /> */}
                            <CardFooter className={card.title({ hasPadding: true })}>
                                <h3>{item.name}</h3>
                            </CardFooter>
                        </CardBody>
                        <footer className="flex flex-col justify-center gap-3 px-3 pb-3">
                            <ColorSwatchGroup
                                defaultValue={item.colors[0]}
                                isSquared
                            >
                                {item.colors.map((color, c) => (
                                    <ColorSwatch
                                        key={c}
                                        value={c.toString()}
                                        color={color}
                                        isSquared
                                    />
                                ))}
                            </ColorSwatchGroup>
                        </footer>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
