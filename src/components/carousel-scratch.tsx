"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Pagination } from "@nextui-org/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useHydrated } from "@/hooks/use-hydrated";
import { useMemo } from "react";

import { cn } from "@nextui-org/react";
import { create } from "zustand";

export type CarouselStore = {
    numSlides: number;
    setNumSlides: (n: number) => void;
    currentSlideIndex: number;
    setCurrentSlideIndex: (i: number) => void;
    getCurrentSlideNumber: () => number;
    scrollNext: () => void;
    scrollPrev: () => void;
};

export const useCarousel = create<CarouselStore>()((set, get) => ({
    numSlides: 0,
    setNumSlides: (n: number) => set({ numSlides: n }),
    currentSlideIndex: 0,
    setCurrentSlideIndex: (i) => set({ currentSlideIndex: i }),
    getCurrentSlideNumber: () => get().currentSlideIndex + 1,
    scrollNext: () => set(({ currentSlideIndex: i }) => ({ currentSlideIndex: i + 1 })),
    scrollPrev: () => set(({ currentSlideIndex: i }) => ({ currentSlideIndex: i - 1 })),
}));

export type CarouselProps = {
    children: React.ReactNode[];
    className?: string;
    numSlides: number;
    loop?: boolean;
};

export function Carousel({ children, className, numSlides, loop }: CarouselProps) {
    const setNumSlides = useCarousel((s) => s.setNumSlides);
    useMemo(() => setNumSlides(numSlides), [numSlides, setNumSlides]);

    const hydrated = useHydrated();
    if (!hydrated) return null;

    return (
        <Card className="max-w-prose rounded-xlarge">
            <CardBody
                id="carousel"
                as="ul"
                className={cn("flex-row gap-3 overflow-hidden cursor-grab active:cursor-grabbing", className)}
            >
                {children.map((child, i) => (
                    <CarouselItem key={i}>{child}</CarouselItem>
                ))}
            </CardBody>
            <CardFooter className="justify-center gap-6">
                <CarouselPagination loop={loop} />
                <CarouselControls loop={loop} />
            </CardFooter>
        </Card>
    );
}

export type CarouselItemProps = React.PropsWithChildren & {};

export function CarouselItem({ children }: CarouselItemProps) {
    const currentSlideIndex = useCarousel((s) => s.currentSlideIndex);

    return (
        <Card
            as="li"
            shadow="none"
            className="flex-none"
            style={{
                translate: `calc(-${100 * currentSlideIndex}% - ${12 * currentSlideIndex}px)`,
                transition: "translate 300ms ease-in-out",
            }}
        >
            {children}
        </Card>
    );
}

export type CarouselControlsProps = {
    loop?: boolean;
};

export function CarouselControls({ loop }: CarouselControlsProps) {
    const numSlides = useCarousel((s) => s.numSlides);
    const currentSlideNumber = useCarousel((s) => s.getCurrentSlideNumber());
    const setSlideIndex = useCarousel((s) => s.setCurrentSlideIndex);
    const scrollNext = useCarousel((s) => s.scrollNext);
    const scrollPrev = useCarousel((s) => s.scrollPrev);

    const scrollPrevSlide = () => {
        if (loop && currentSlideNumber === 1) {
            setSlideIndex(numSlides - 1);
        } else if (currentSlideNumber !== 1) {
            scrollPrev();
        }
    };

    const scrollNextSlide = () => {
        if (loop && currentSlideNumber === numSlides) {
            setSlideIndex(0);
        } else if (currentSlideNumber !== numSlides) {
            scrollNext();
        }
    };

    return (
        <>
            <ButtonGroup
                aria-controls="carousel"
                size="sm"
                radius="full"
                isIconOnly
                className="rounded-medium"
            >
                <Button
                    aria-label="Go To Previous Slide"
                    onPress={scrollPrevSlide}
                    className="bg-content2 hover:bg-content4"
                >
                    <ChevronLeft size={14} />
                </Button>
                <Button
                    aria-label="Go To Next Slide"
                    onPress={scrollNextSlide}
                    className="bg-content2 hover:bg-content4"
                >
                    <ChevronRight size={14} />
                </Button>
            </ButtonGroup>
        </>
    );
}

export type CarouselPaginationProps = {
    loop?: boolean;
};

export function CarouselPagination({ loop }: CarouselPaginationProps) {
    const numSlides = useCarousel((s) => s.numSlides);
    const setCurrentSlideIndex = useCarousel((s) => s.setCurrentSlideIndex);
    const currentSlideNumber = useCarousel((s) => s.getCurrentSlideNumber());

    return (
        <Pagination
            aria-controls="carousel"
            // tabIndex={0}
            total={numSlides}
            size="sm"
            radius="full"
            color="default"
            loop={loop}
            isCompact
            page={currentSlideNumber}
            onChange={(i) => setCurrentSlideIndex(i - 1)}
            classNames={{
                // base: "rounded-full p-0 outline-none outline-offset-2 outline-offset-transparent focus-visible:outline-2 focus-visible:outline-primary",
                item: "relative after:absolute after:h-2 after:w-2 after:bg-content1 after:rounded-full text-transparent",
                cursor: "text-transparent rounded-full w-2 h-2 ml-3 bg-default-600",
            }}
        />
    );
}
