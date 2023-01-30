import { ethers, upgrades } from 'hardhat';

const tokenName = "";
const tokenSymbol = "";
const totalSupply = 0;
const feeCollector = "";
const defaultFee = 0;
const precision = 0;
const multiSig = "";

async function main() {
    const galaxyArenaTokenFactory = await ethers.getContractFactory('GalaxyArenaToken');
    const galaxyArenaToken = await upgrades.deployProxy(galaxyArenaTokenFactory, [tokenName, tokenSymbol, totalSupply, defaultFee, precision, feeCollector]);
    await galaxyArenaToken.deployed();
    console.log('GalaxyArena token proxy deployed to:', galaxyArenaToken.address);
    
    const admin = await upgrades.admin.getInstance();
    console.log('Proxy admin: ', admin.address);

    const galaxyArenaTokenImplementation = await admin.getProxyImplementation(galaxyArenaToken.address);
    console.log('GalaxyArena token implementation: ', galaxyArenaTokenImplementation);

    await admin.transferOwnership(multiSig);
    console.log("ProxyAdmin ownership successfully transfered to multisig.");

    await galaxyArenaToken.transferOwnership(multiSig);
    console.log("Token ownership successfully transfered to multisig.");

    await galaxyArenaToken.transfer(multiSig, totalSupply);
    console.log("Total supply transfered to multisig.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });