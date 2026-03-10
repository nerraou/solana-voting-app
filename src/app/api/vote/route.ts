import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS, createPostResponse } from '@solana/actions'
import { Connection, PublicKey, Transaction } from '@solana/web3.js'
import { BN, Program } from '@coral-xyz/anchor'

import { Solanavotingapp } from '../../../../anchor/target/types/solanavotingapp'
import IDL from '../../../../anchor/target/idl/solanavotingapp.json'

export const OPTIONS = GET

export async function GET(request: Request) {
  const actionMetadata: ActionGetResponse = {
    icon: 'https://i.ytimg.com/vi/q5RmW6vhMVM/maxresdefault.jpg',
    title: 'vote for your favorite color',
    description: 'vote between Red or blue ',
    label: 'vote',
    links: {
      actions: [
        {
          label: 'vote for Red',
          href: '/api/vote?candidate=Red',
          type: 'transaction',
        },
        {
          label: 'vote for Blue',
          href: '/api/vote?candidate=Blue',
          type: 'transaction',
        },
      ],
    },
  }
  return Response.json(actionMetadata, { headers: ACTIONS_CORS_HEADERS })
}

export async function POST(request: Request) {
  const url = new URL(request.url)
  const candidate = url.searchParams.get('candidate')

  if (candidate != 'Red' && candidate != 'Blue') {
    return new Response('invalide candidate', { status: 400 })
  }

  const connection = new Connection('http://127.0.0.1:8899', 'confirmed')

  console.log('connection print ', connection)

  const program: Program<Solanavotingapp> = new Program(IDL as Solanavotingapp, { connection })

  const body: ActionPostRequest = await request.json()

  let voter

  try {
    voter = new PublicKey(body.account)
  } catch (error) {
    return new Response('invalide account', { status: 400 })
  }

  const instruction = await program.methods
    .vote(candidate, new BN(1))
    .accounts({
      signer: voter,
    })
    .instruction()

  const blockhash = await connection.getLatestBlockhash()

  const transaction = new Transaction({
    feePayer: voter,
    blockhash: blockhash.blockhash,
    lastValidBlockHeight: blockhash.lastValidBlockHeight,
  }).add(instruction)

  const response = await createPostResponse({
    fields: {
      transaction: transaction,
      type: 'transaction',
    },
  })

  return Response.json(response, { headers: ACTIONS_CORS_HEADERS })
}
