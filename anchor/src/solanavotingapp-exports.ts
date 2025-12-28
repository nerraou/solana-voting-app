// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Solanavotingapp, SOLANAVOTINGAPP_DISCRIMINATOR, SOLANAVOTINGAPP_PROGRAM_ADDRESS, getSolanavotingappDecoder } from './client/js'
import SolanavotingappIDL from '../target/idl/solanavotingapp.json'

export type SolanavotingappAccount = Account<Solanavotingapp, string>

// Re-export the generated IDL and type
export { SolanavotingappIDL }

export * from './client/js'

export function getSolanavotingappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getSolanavotingappDecoder(),
    filter: getBase58Decoder().decode(SOLANAVOTINGAPP_DISCRIMINATOR),
    programAddress: SOLANAVOTINGAPP_PROGRAM_ADDRESS,
  })
}
