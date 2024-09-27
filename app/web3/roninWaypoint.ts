import { WaypointProvider } from '@sky-mavis/waypoint'
import { ethers } from 'ethers'


const clientId = "3742c950-c8dd-4f29-a5a6-a004fef464c9"
const waypointOrigin="https://id.skymavis.one"
const chainId = 2021

export const roninWaypointWalletProvider = WaypointProvider.create({
  clientId,
  waypointOrigin,
  chainId,
})

export const roninWaypointProvider = new ethers.providers.Web3Provider(
  roninWaypointWalletProvider
)
