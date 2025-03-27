import { Users } from "lucide-react";

interface CardProps {
  title: string;
  value: number;
}

function Card({
  title,
  value
}: CardProps) {
  return ( 
    <div className="border border-[#DDD] p-4 rounded-md space-y-5 w-fit shadow-sm">
      <div className="flex gap-4 items-center">
        <Users size={32} />
        <p className="font-semibold">{title}</p>
      </div>
      <p className="font-bold text-4xl">{value}</p>
    </div>
  );
}

export default Card;