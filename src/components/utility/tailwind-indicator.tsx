export function TailwindIndicator() {
    if (process.env.NODE_ENV === "production") return null;

    return (
        <div className="fixed bottom-1 left-1 z-[9999] grid size-6 place-items-center rounded-icon bg-foreground font-mono text-tiny font-bold text-background">
            <div className="block sm:hidden">xs</div>
            <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                sm
            </div>
            <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">
                md
            </div>
            <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden 2xl:block">2xl</div>
        </div>
    );
}
