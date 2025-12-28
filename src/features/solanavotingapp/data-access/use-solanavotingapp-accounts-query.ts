import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getSolanavotingappProgramAccounts } from '@project/anchor'
import { useSolanavotingappAccountsQueryKey } from './use-solanavotingapp-accounts-query-key'

export function useSolanavotingappAccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useSolanavotingappAccountsQueryKey(),
    queryFn: async () => await getSolanavotingappProgramAccounts(client.rpc),
  })
}
