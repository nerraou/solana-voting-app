import { useQueryClient } from '@tanstack/react-query'
import { useSolanavotingappAccountsQueryKey } from './use-solanavotingapp-accounts-query-key'

export function useSolanavotingappAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useSolanavotingappAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
