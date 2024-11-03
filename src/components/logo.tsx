import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/image-removebg-preview.png"
      width={60}
      height={60}
      alt="logo"
    />
  );
}
