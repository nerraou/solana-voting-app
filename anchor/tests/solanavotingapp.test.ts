import { BankrunProvider, startAnchor } from 'anchor-bankrun'
import { Solanavotingapp } from '../target/types/solanavotingapp'

import { BN, Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { expect, beforeAll } from 'vitest'
import IDL from '../target/idl/solanavotingapp.json'

const votingAddress = new PublicKey('Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe')

describe('solanavotingapp', () => {
  let context
  let provider
  let solanavotingappProgram: Program<Solanavotingapp>

  beforeAll(async () => {
    context = await startAnchor('', [{ name: 'solanavotingapp', programId: votingAddress }], [])
    provider = new BankrunProvider(context)
    solanavotingappProgram = new Program<Solanavotingapp>(IDL, provider)
  })

  it('Initialize Poll', async () => {
    console.log('start anchor')

    await solanavotingappProgram.methods
      .initializePoll(new BN(1), new BN(0), new BN(1967368969), 'What is your favorite color?')
      .rpc()

    const [pollAddress] = PublicKey.findProgramAddressSync([new BN(1).toArrayLike(Buffer, 'le', 8)], votingAddress)

    const poll = await solanavotingappProgram.account.poll.fetch(pollAddress)

    expect(poll.pollId.toNumber()).toEqual(1)
    expect(poll.description).toEqual('What is your favorite color?')
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber())
  })

  it('initialize candidate', async () => {
    await solanavotingappProgram.methods.initializeCandidate('Red', new BN(1)).rpc()
    await solanavotingappProgram.methods.initializeCandidate('Blue', new BN(1)).rpc()

    const [redAddress] = PublicKey.findProgramAddressSync(
      [new BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from('Red')],
      votingAddress,
    )

    const redCandidate = await solanavotingappProgram.account.candidate.fetch(redAddress)

    console.log(redCandidate)
    expect(redCandidate.candidateVote.toNumber()).toEqual(0)

    const [blueAddress] = PublicKey.findProgramAddressSync(
      [new BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from('Blue')],
      votingAddress,
    )

    const blueCandidate = await solanavotingappProgram.account.candidate.fetch(blueAddress)

    console.log(blueCandidate)
    expect(blueCandidate.candidateVote.toNumber()).toEqual(0)
  })

  it('vote', async () => {
    await solanavotingappProgram.methods.vote('Red', new BN(1)).rpc()

    const [redAddress] = PublicKey.findProgramAddressSync(
      [new BN(1).toArrayLike(Buffer, 'le', 8), Buffer.from('Red')],
      votingAddress,
    )
    const redCandidate = await solanavotingappProgram.account.candidate.fetch(redAddress)

    console.log(redCandidate)
    expect(redCandidate.candidateVote.toNumber()).toEqual(1)
  })
})
