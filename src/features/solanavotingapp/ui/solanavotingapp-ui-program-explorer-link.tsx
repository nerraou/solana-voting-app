import { SOLANAVOTINGAPP_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function SolanavotingappUiProgramExplorerLink() {
  return <AppExplorerLink address={SOLANAVOTINGAPP_PROGRAM_ADDRESS} label={ellipsify(SOLANAVOTINGAPP_PROGRAM_ADDRESS)} />
}
