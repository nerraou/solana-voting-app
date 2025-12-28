import { useSolana } from '@/components/solana/use-solana'

export function useSolanavotingappAccountsQueryKey() {
  const { cluster } = useSolana()

  return ['solanavotingapp', 'accounts', { cluster }]
}
