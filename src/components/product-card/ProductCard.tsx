import Link from "next/link";
import Image from "next/image";

import { formatCentsToDollar } from "@/utils/utils";

export default function ProductCard({
  id,
  name,
  price_in_cents,
  image_url,
}: Product) {
  return (
    <div className="flex flex-col w-64 xl:w-full">
      <Link href={`product/${id}`}>
        <Image
          className="w-64 xl:w-full h-[18.75rem] rounded-tl-lg rounded-tr-lg"
          src={image_url}
          alt="Product image"
          width={256}
          height={300}
        />
      </Link>
      <div className="flex flex-col gap-2 px-3 py-2 bg-[--white] rounded-bl-lg rounded-br-lg">
        <Link href={`product/${id}`}>
          <span className="font-light text-[--gray-800]">{name}</span>
        </Link>
        <div className="w-full h-px bg-[--gray-300]" />
        <span className="font-semibold text-sm text-[--gray-1000]">
          {formatCentsToDollar(price_in_cents)}
        </span>
      </div>
    </div>
  );
}
