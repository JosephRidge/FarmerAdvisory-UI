import { CardTile } from "./components/ui/card"
import { Text } from "./components/ui/text"
import { Badge } from "./components/ui/badge"
import {ChatInput} from "./components/ui/chat"
import { WELCOME_TEXT } from "./lib/constants"

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <Text>
            {WELCOME_TEXT}
          </Text>
        </div>
        {/* chat history */}
        <CardTile variant={"query"}  >
          <Badge className="flex">Question</Badge>
          <Text variant={"small"} className="text-black"> Lorem pore nihil nesciunt esse tempora repellat quis ratione quae. </Text>
        </CardTile>

        {/* <input */}

<ChatInput> 
</ChatInput>
</main>
    </div>
  );
}
