import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[50vh] ">
      <Image 
        src="spinner.svg" 
        alt="Loading..." 
        width={200} 
        height={200} 
        priority
      />
    </div>
  );
}