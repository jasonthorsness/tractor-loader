import Image from "next/image";
import cat1 from "../cat.jpg?crop=0,0,0,0,40p,45p&width=600&aspect=1200:630&tractor";
import cat2 from "../cat.jpg?crop=o-40p,o-40p,o40p,o40p,40p,45p&width=600&aspect=1200:630&tractor";
import cat3 from "../cat.jpg?crop=o-30p,o-30p,o30p,o30p,40p,45p&width=600&aspect=1200:630&tractor";
import cat4 from "../cat.jpg?crop=o-20p,o-20p,o20p,o20p,40p,45p&width=600&aspect=1200:630&tractor";

export default function Social() {
  return (
    <div
      className="absolute top-0 left-0 relative bg-black overflow-hidden"
      style={{ width: 1200, height: 630 }}
    >
      <div className="grid grid-cols-2 grid-rows-2" style={{ height: "630px" }}>
        <div>
          <Image src={cat1} alt="" />
        </div>
        <div>
          <Image src={cat2} alt="" />
        </div>
        <div>
          <Image src={cat3} alt="" />
        </div>
        <div>
          <Image src={cat4} alt="" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1
          className="-rotate-6 whitespace-nowrap text-black font-bold bg-white bg-opacity-50 text-center"
          style={{ fontSize: "96px", width: "1400px" }}
        >
          <strong>🚜 Tractor Loader</strong>
        </h1>
      </div>
    </div>
  );
}
