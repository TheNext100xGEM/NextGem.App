import Sprite from '@components/Sprite'
import { Button } from '@components/ui'
import { BUY_URL, TOKEN_NAME } from '@constants/index'

function BuyNextGemButton() {
  return (
    <Button 
      href={BUY_URL}
      blank={true}
      sprite={
        <Sprite id="uniswap" viewBox="0 0 16 16" width="1em" height="1em" />
      }
      >
      Buy {TOKEN_NAME}
    </Button>
  )
}

export default BuyNextGemButton