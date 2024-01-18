import { Button } from "@components/ui"
import { SOUND_OPEN_APP } from "@constants/index"

function OpenAppButton() {
  return (
    <Button
      href='/gems'
      icon='carbon:text-mining-applier'
      pathSoundClick={SOUND_OPEN_APP}
    >
      Launch App
    </Button>
  )
}

export default OpenAppButton
