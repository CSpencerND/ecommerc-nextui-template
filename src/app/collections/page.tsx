import { section, title } from "@/components/primitives";
import { MotionListItem } from "@collections/components/motion";
import { Card, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

import { Image } from "@nextui-org/image";
import NextImage from "next/image";

import { getFakeData } from "@/faker/faker-functions";

import card from "@/styles/product-card";

export default async function CollectionDirectoryPage() {
    const collections = await getFakeData("collection-directory");

    return (
        <section className={section()}>
            <header className="prose px-6 dark:prose-invert max-lg:text-center">
                <h1 className={title()}>Collection Directory</h1>
            </header>
            <menu className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-6">
                {collections.map(({ image, name }, i) => (
                    <Card
                        as={MotionListItem}
                        key={i}
                        index={i}
                        isFooterBlurred
                        isPressable
                        className={card.root()}
                    >
                        <Link href="/collections/[slug]">
                            <Image
                                as={NextImage}
                                src={image}
                                alt={name}
                                width={192}
                                height={192}
                                className={card.image()}
                                isZoomed
                            />
                            <CardFooter className={card.title()}>
                                <h3 className="text-large">{name}</h3>
                            </CardFooter>
                        </Link>
                    </Card>
                ))}
            </menu>
        </section>
    );
}
