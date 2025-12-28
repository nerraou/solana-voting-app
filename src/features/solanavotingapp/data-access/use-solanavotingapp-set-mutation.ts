import { SolanavotingappAccount, getSetInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useSolanavotingappAccountsInvalidate } from './use-solanavotingapp-accounts-invalidate'

export function useSolanavotingappSetMutation({ account, solanavotingapp }: { account: UiWalletAccount; solanavotingapp: SolanavotingappAccount }) {
  const invalidateAccounts = useSolanavotingappAccountsInvalidate()
  const signAndSend = useWalletUiSignAndSend()
  const signer = useWalletUiSigner({ account })

  return useMutation({
    mutationFn: async (value: number) =>
      await signAndSend(
        getSetInstruction({
          solanavotingapp: solanavotingapp.address,
          value,
        }),
        signer,
      ),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
