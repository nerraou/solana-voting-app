import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { SolanavotingappUiButtonInitialize } from './ui/solanavotingapp-ui-button-initialize'
import { SolanavotingappUiList } from './ui/solanavotingapp-ui-list'
import { SolanavotingappUiProgramExplorerLink } from './ui/solanavotingapp-ui-program-explorer-link'
import { SolanavotingappUiProgramGuard } from './ui/solanavotingapp-ui-program-guard'

export default function SolanavotingappFeature() {
  const { account } = useSolana()

  return (
    <SolanavotingappUiProgramGuard>
      <AppHero
        title="Solanavotingapp"
        subtitle={
          account
            ? "Initialize a new solanavotingapp onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <SolanavotingappUiProgramExplorerLink />
        </p>
        {account ? (
          <SolanavotingappUiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <SolanavotingappUiList account={account} /> : null}
    </SolanavotingappUiProgramGuard>
  )
}
