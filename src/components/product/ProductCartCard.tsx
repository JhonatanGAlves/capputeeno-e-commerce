import Image from "next/image";
import { Minus, Plus, Trash } from "@phosphor-icons/react";

import { formatCentsToDollar } from "@/utils/utils";

interface ProductCartCardProps extends ShoppingCartTypes {
  updateItemFromCart: (
    id: string,
    operation?: "DEC" | "INC",
    value?: number
  ) => void;
  deleteItemFromCart: (id: string) => void;
}

export default function ProductCartCard({
  id,
  name,
  description,
  totalPrice,
  unit,
  image_url,
  updateItemFromCart,
  deleteItemFromCart,
}: ProductCartCardProps) {
  return (
    <div className="flex items-center gap-4 bg-[--white] rounded-lg">
      <Image
        className="rounded-tl-lg rounded-bl-lg"
        src={image_url}
        alt="Image product"
        width={256}
        height={211}
      />
      <div className="flex flex-col p-4">
        <div className="flex justify-between items-center">
          <h2 className="font-light text-xl text-[--gray-800]">{name}</h2>
          <button onClick={() => deleteItemFromCart(id)}>
            <Trash size={20} color="var(--red-700)" />
          </button>
        </div>
        <p className="mt-3 mb-6 text-xs text-[--gray-800]">{description}</p>
        <div className="flex justify-between items-center">
          <div className="w-fit flex justify-between items-center border border-solid border-[--gray-600] bg-[--gray-100] rounded-lg">
            <button
              onClick={() => updateItemFromCart(id, "DEC", undefined)}
              className="px-3 py-2"
            >
              <Minus size={16} />
            </button>
            <input
              className="text-center outline-none w-8 bg-transparent"
              type="text"
              value={unit}
              onChange={(e) =>
                updateItemFromCart(id, undefined, Number(e.target.value))
              }
            />
            <button
              onClick={() => updateItemFromCart(id, "INC", undefined)}
              className="px-3 py-2"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="font-semibold text-[--gray-1000]">
            {formatCentsToDollar(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
