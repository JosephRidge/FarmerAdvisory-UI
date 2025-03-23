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
          <Text variant={"small"} className="text-black"> Lorem pore nihil nesciunt esse tempora repellat quis ratione quae. </Text>
        </CardTile>


      </main>
    </div>
  );
}
