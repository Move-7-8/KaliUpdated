import Image from "next/image";

type ILogo = {
    className?: string;
};

export const Logo = ({ className }: ILogo) => {
    return (
        <>
            <Image
                src="/images/logo/logo-dark.png"
                alt="Kali Software logo"
                width={200}
                height={40}
                className={`hidden h-5 w-auto dark:inline ${className ?? ""}`}
                priority
            />
            <Image
                src="/images/logo/logo-light.png"
                alt="Kali Software logo"
                width={200}
                height={40}
                className={`h-5 w-auto dark:hidden ${className ?? ""}`}
                priority
            />
        </>
    );
};
