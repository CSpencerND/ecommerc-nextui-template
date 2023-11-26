"use client";

import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";

type ColorSwatchProps = {
    colors: string[];
};

export function ColorSwatch({ colors }: ColorSwatchProps) {
    return (
        <RadioGroup
            as="menu"
            aria-label="Select A Color"
            orientation="horizontal"
            size="lg"
            classNames={{
                wrapper:
                    "justify-around flex-nowrap gap-0.5 overflow-x-scroll p-1 scrollbar-hide",
            }}
        >
            {colors.map((c, i) => (
                <Radio
                    key={i}
                    value={i.toString()}
                    defaultValue={i.toString()}
                    defaultChecked
                    color="default"
                    classNames={{
                        wrapper: "hover:bg-opacity-80 h-7 w-7 sm:h-8 sm:w-8",
                        base: "grid place-items-center",
                        control: "bg-transparent",
                    }}
                    style={{
                        backgroundColor: colors[i]
                    }}
                />
            ))}
        </RadioGroup>
    );
}
