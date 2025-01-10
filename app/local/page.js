import Canvas from "@/components/Canvas";
import Link from "next/link";

const page = () => {
  return (
    <div className='container'>
      <Link href='/'>Home</Link>
      <Canvas />
    </div>
  );
};
export default page;
