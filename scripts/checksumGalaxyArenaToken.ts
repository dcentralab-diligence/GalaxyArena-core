import { ethers } from 'hardhat';

const proxyAdminAddress = ""; //plug this after the running the deploy script
const tokenProxyAddress = ""; //plug this after the running the deploy script

const multiSig = ""; //the gnosis multisig owner

async function main() {
    const admin = await ethers.getContractAt("OwnableUpgradeable", proxyAdminAddress);
    console.log("Is proxy admin owner multisig?", await admin.owner() === multiSig);
    
    const galaxyArenaToken = await ethers.getContractAt("GalaxyArenaToken", tokenProxyAddress);
    console.log("Is GalaxyArena token admin multisig?", await galaxyArenaToken.owner() === multiSig);
    console.log("Token attributes:");
    console.log("Name:", await galaxyArenaToken.name());
    console.log("Symbol:", await galaxyArenaToken.symbol());
    console.log("Decimals:", await galaxyArenaToken.decimals());
    console.log("Supply:", await galaxyArenaToken.totalSupply());
    console.log("Precision:", await galaxyArenaToken.precision());
    console.log("Default Fee:", await galaxyArenaToken.defaultFee());
    console.log("FeeCollector:", await galaxyArenaToken.feeCollector());
    console.log("MultiSig balance:", await galaxyArenaToken.balanceOf(multiSig));
    // Check override fee value for an address
    // console.log(`Fee override value for <address>: ${await galaxyArenaToken.feeOverride(<address>)}`);
    // Check if an address is blocked
    // console.log(`Is <address> blocked? ${await galaxyArenaToken.isBlocked(<address>)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
