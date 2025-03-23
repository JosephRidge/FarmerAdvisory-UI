import Image from "next/image";
import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"
import {ChatInput} from "./components/ui/chat"

export default function Home() {
  return (
    <div>
      <main>
        {/* chat history */}
        <CardTile variant={"query"}  >
          <Badge className="flex">Question</Badge>
          <Text variant={"small"} className="text-black"> Lorem pore nihil nesciunt esse tempora repellat quis ratione quae. </Text>
        </CardTile>

        {/* <input */}

<ChatInput onSend={()=>{console.log("hellow World")}}>

</ChatInput>
</main>
    </div>
  );
}
