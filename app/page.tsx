import Image from "next/image";
import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"

export default function Home() {
  return (
    <div>
      <main>
        {/* chat history */}
        <CardTile variant={"query"}  >
          <Badge className="flex">Question</Badge>
          <Text variant={"small"} className="text-black"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ad voluptatum, culpa blanditiis sint similique iure officiis molestiae praesentium exercitationem beatae tempore nihil nesciunt esse tempora repellat quis ratione quae. </Text>
        </CardTile>


      </main>
    </div>
  );
}
