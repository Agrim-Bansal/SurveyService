import Image from "next/image";
import Link from "next/link";

export function Coffee() {
    return (
    <Link
      className="buyButton"
      target="_blank"
      href="https://buymeacoffee.com/agrimbansal12"
    >
      <Image
        className="coffeeImage w-full h-full"
        src="/bmc-button.svg"
        alt="Buy me a coffee"
        width='60'
        height='217'
      />

    </Link>
     );
    }
