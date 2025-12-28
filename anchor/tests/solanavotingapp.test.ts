import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchSolanavotingapp,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('solanavotingapp', () => {
  let payer: KeyPairSigner
  let solanavotingapp: KeyPairSigner

  beforeAll(async () => {
    solanavotingapp = await generateKeyPairSigner()
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('Initialize Solanavotingapp', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getInitializeInstruction({ payer: payer, solanavotingapp: solanavotingapp })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentSolanavotingapp = await fetchSolanavotingapp(rpc, solanavotingapp.address)
    expect(currentSolanavotingapp.data.count).toEqual(0)
  })

  it('Increment Solanavotingapp', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({
      solanavotingapp: solanavotingapp.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchSolanavotingapp(rpc, solanavotingapp.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Increment Solanavotingapp Again', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({ solanavotingapp: solanavotingapp.address })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchSolanavotingapp(rpc, solanavotingapp.address)
    expect(currentCount.data.count).toEqual(2)
  })

  it('Decrement Solanavotingapp', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getDecrementInstruction({
      solanavotingapp: solanavotingapp.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchSolanavotingapp(rpc, solanavotingapp.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Set solanavotingapp value', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getSetInstruction({ solanavotingapp: solanavotingapp.address, value: 42 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchSolanavotingapp(rpc, solanavotingapp.address)
    expect(currentCount.data.count).toEqual(42)
  })

  it('Set close the solanavotingapp account', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getCloseInstruction({
      payer: payer,
      solanavotingapp: solanavotingapp.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchSolanavotingapp(rpc, solanavotingapp.address)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      expect(e.message).toEqual(`Account not found at address: ${solanavotingapp.address}`)
    }
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
