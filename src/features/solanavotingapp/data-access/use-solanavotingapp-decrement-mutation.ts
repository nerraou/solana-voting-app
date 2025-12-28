import { SolanavotingappAccount, getDecrementInstruction } from '@project/anchor'
import { useMutation } from '@tanstack/react-query'
import { UiWalletAccount, useWalletUiSigner } from '@wallet-ui/react'
import { useWalletUiSignAndSend } from '@wallet-ui/react-gill'
import { toastTx } from '@/components/toast-tx'
import { useSolanavotingappAccountsInvalidate } from './use-solanavotingapp-accounts-invalidate'

export function useSolanavotingappDecrementMutation({
  account,
  solanavotingapp,
}: {
  account: UiWalletAccount
  solanavotingapp: SolanavotingappAccount
}) {
  const invalidateAccounts = useSolanavotingappAccountsInvalidate()
  const signer = useWalletUiSigner({ account })
  const signAndSend = useWalletUiSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ solanavotingapp: solanavotingapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}
