import { appendFile } from "fs/promises";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import chalk from "chalk";

const mnemonics = process.env.MNEMONICS!
const addressPath = "address.txt";
const pkPath = "pk.txt";

async function generate(index: number) {
    try {
        const derivePath = `m/44'/784'/1'/0'/${index}'`
        console.log(derivePath)
        const wallet = Ed25519Keypair.deriveKeypair(mnemonics, derivePath);
        console.log(chalk.green("Wallet created:"), wallet.toSuiAddress());
        console.log(chalk.red("Private key:"), wallet.getSecretKey());
        await appendFile(addressPath, wallet.toSuiAddress() + "\n");
        await appendFile(pkPath, wallet.getSecretKey() + "\n");
    } catch (err) {
        console.log(err);
    }
}

for (let i = 0; i < 100; i++) {
    generate(i);
}

