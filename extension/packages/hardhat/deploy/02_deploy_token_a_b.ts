import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "TokenA" and "TokenB" using the deployer account
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployTokenA_B: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("TokenA", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const tokenAContract = await hre.ethers.getContract<Contract>("TokenA", deployer);
  console.log("TokenA total supply:", await tokenAContract.totalSupply());

  await deploy("TokenB", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const tokenBContract = await hre.ethers.getContract<Contract>("TokenB", deployer);
  console.log("TokenB total supply:", await tokenAContract.totalSupply());
};

export default deployTokenA_B;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployTokenA_B.tags = ["TokenA", "TokenB"];
